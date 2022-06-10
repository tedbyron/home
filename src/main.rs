#![warn(clippy::all, clippy::nursery, rust_2018_idioms)]
#![doc = include_str!("../README.md")]

use std::collections::HashMap;
use std::net::{Ipv4Addr, SocketAddrV4};
use std::process::ExitCode;
use std::sync::Arc;
use std::{env, fs};

use anyhow::{bail, Context, Result};
use axum::handler::Handler;
use axum::http::StatusCode;
use axum::routing::get;
use axum::{Extension, Router, Server};
use once_cell::sync::OnceCell;
use regex::Regex;
use tokio::sync::oneshot;
use tracing::{debug, error, info};
use tracing_subscriber::filter::{EnvFilter, LevelFilter};

mod config;
mod search;

use config::Config;

use crate::config::Shortcut;

/// String buffer for config file data.
pub static CFG_BUF: OnceCell<String> = OnceCell::new();
/// Map of shortcuts to extension patterns.
pub static EXT_PATTERNS: OnceCell<HashMap<&str, Regex>> = OnceCell::new();

#[tokio::main]
async fn main() -> ExitCode {
    match run().await {
        Ok(_) => ExitCode::SUCCESS,
        Err(e) => {
            error!("{e:?}");
            ExitCode::FAILURE
        }
    }
}

async fn run() -> Result<()> {
    tracing_subscriber::fmt()
        .with_target(false)
        .with_env_filter(
            EnvFilter::builder()
                .with_default_directive(LevelFilter::INFO.into())
                .with_env_var("HOME_LOG")
                .from_env_lossy(),
        )
        .init();

    let mut cfg_path = env::current_exe()?.join("config.toml");
    if !cfg_path.is_file() {
        cfg_path = env::current_dir()?.join("config.toml");

        if !cfg_path.is_file() {
            bail!("config not found in the executable's directory or the current directory");
        }
    }

    debug!(cfg_path = %cfg_path.display());

    CFG_BUF
        .set(
            fs::read_to_string(&cfg_path)
                .with_context(|| format!("failed to read config file {}", cfg_path.display()))?,
        )
        .unwrap();
    let cfg = toml::from_str::<Config>(CFG_BUF.get().unwrap())
        .with_context(|| format!("failed to deserialize config file {}", cfg_path.display()))?;
    cfg.shortcuts.iter().filter(|&(_, s)| match s {
        Shortcut::Table(table) => table.ext.is_some(),
        Shortcut::Value(_) => false,
    });
    let cfg = Arc::new(cfg);

    if LevelFilter::current() <= LevelFilter::DEBUG {
        info!(?cfg);
    } else {
        debug!(cfg = %format!("{cfg:#?}"));
    }

    let app = Router::new()
        .route("/search", get(search::handler))
        .fallback((|| async { StatusCode::NOT_FOUND }).into_service())
        .layer(Extension(cfg.clone()));
    let addr = SocketAddrV4::new(Ipv4Addr::LOCALHOST, cfg.port());

    let (shutdown_tx, shutdown_rx) = oneshot::channel::<()>();
    tokio::spawn(async move {
        if tokio::signal::ctrl_c().await.is_ok() {
            let _ = shutdown_tx.send(());
        }
    });

    info!("listening on {addr}");

    Server::bind(&addr.into())
        .serve(app.into_make_service())
        .with_graceful_shutdown(async {
            let _ = shutdown_rx.await;
        })
        .await
        .unwrap();

    Ok(())
}
