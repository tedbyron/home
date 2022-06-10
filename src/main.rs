#![warn(clippy::all, clippy::nursery, rust_2018_idioms)]
#![doc = include_str!("../README.md")]

use std::net::{Ipv4Addr, SocketAddrV4};
use std::{env, fs};

use anyhow::{bail, Context, Result};
use axum::{routing, Router, Server};
use tokio::sync::oneshot;

mod config;

use config::Config;

#[tokio::main]
async fn main() -> Result<()> {
    let mut cfg_path = env::current_exe()?.join("config.toml");

    if !cfg_path.is_file() {
        cfg_path = env::current_dir()?.join("config.toml");

        if !cfg_path.is_file() {
            bail!("config not found in the executable's directory or the current directory");
        }
    }

    let cfg_buf = fs::read_to_string(&cfg_path)
        .with_context(|| format!("failed to read config file {}", cfg_path.display()))?;
    let cfg: Config<'_> = toml::from_str(&cfg_buf)
        .with_context(|| format!("failed to deserialize config file {}", cfg_path.display()))?;
    let addr = SocketAddrV4::new(Ipv4Addr::LOCALHOST, cfg.port);
    let (shutdown_tx, shutdown_rx) = oneshot::channel::<()>();

    tokio::spawn(async move {
        if tokio::signal::ctrl_c().await.is_ok() {
            let _ = shutdown_tx.send(());
        }
    });

    Server::bind(&addr.into())
        .serve(app().into_make_service())
        .with_graceful_shutdown(async {
            let _ = shutdown_rx.await;
        })
        .await
        .unwrap();

    Ok(())
}

fn app() -> Router {
    Router::new().route("/search", routing::get(handler))
}

async fn handler() -> String {
    "Hello, world!".to_string()
}
