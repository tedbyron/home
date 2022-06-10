#![warn(clippy::all, clippy::nursery, rust_2018_idioms)]
#![doc = include_str!("../README.md")]

use std::net::{Ipv4Addr, SocketAddrV4};
use std::process::ExitCode;
use std::{env, fs};

use anyhow::{bail, Context, Result};
use axum::handler::Handler;
use axum::http::StatusCode;
use axum::routing::get;
use axum::{Router, Server};
use tokio::sync::oneshot;
use tracing::{debug, error};
use tracing_subscriber::filter::{EnvFilter, LevelFilter};

mod config;
mod search;

use config::Config;

#[tokio::main]
async fn main() -> ExitCode {
    match run().await {
        Ok(_) => ExitCode::SUCCESS,
        Err(e) => {
            error!("{e}");
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

    let cfg_buf = fs::read_to_string(&cfg_path)
        .with_context(|| format!("failed to read config file {}", cfg_path.display()))?;
    let cfg: Config<'_> = toml::from_str(&cfg_buf)
        .with_context(|| format!("failed to deserialize config file {}", cfg_path.display()))?;

    debug!(cfg = %format!("{:#?}", cfg));

    let (shutdown_tx, shutdown_rx) = oneshot::channel::<()>();
    tokio::spawn(async move {
        if tokio::signal::ctrl_c().await.is_ok() {
            let _ = shutdown_tx.send(());
        }
    });

    let app = Router::new()
        .route("/search", get(search::handler))
        .fallback((|| async { StatusCode::NOT_FOUND }).into_service());
    let addr = SocketAddrV4::new(Ipv4Addr::LOCALHOST, cfg.port);

    Server::bind(&addr.into())
        .serve(app.into_make_service())
        .with_graceful_shutdown(async {
            let _ = shutdown_rx.await;
        })
        .await
        .unwrap();

    Ok(())
}
