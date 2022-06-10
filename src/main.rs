#![warn(clippy::all, clippy::nursery, rust_2018_idioms)]
#![doc = include_str!("../README.md")]

use std::net::SocketAddr;
use std::process::ExitCode;
use std::time::Duration;
use std::{env, fs};

use anyhow::{bail, Context, Result};
use axum::handler::Handler;
use axum::http::StatusCode;
use axum::response::Response;
use axum::routing::get;
use axum::{Extension, Router, Server};
use once_cell::sync::OnceCell;
use regex::Regex;
use tokio::sync::oneshot;
use tower_http::classify::ServerErrorsFailureClass;
use tower_http::trace::TraceLayer;
use tracing::{debug, error, info, Span};
use tracing_subscriber::filter::{EnvFilter, LevelFilter};
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

mod config;
mod search;

use config::{Config, Shortcut};

/// String buffer for config file data.
pub static CFG_BUF: OnceCell<String> = OnceCell::new();

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
    tracing_subscriber::registry()
        .with(
            EnvFilter::builder()
                .with_default_directive(LevelFilter::INFO.into())
                .with_env_var("HOME_LOG")
                .from_env_lossy(),
        )
        .with(tracing_subscriber::fmt::layer())
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
    let re = cfg
        .shortcuts
        .iter()
        .filter_map(|(_, s)| match s {
            Shortcut::Table(table) => table
                .ext
                .as_ref()
                .map(|ext| ext.iter().map(|(&k, &v)| (Regex::new(k).unwrap(), v))),
            Shortcut::Value(_) => None,
        })
        .flatten()
        .collect::<Vec<_>>();
    let cfg = cfg;

    debug!(?cfg);

    let (shutdown_tx, shutdown_rx) = oneshot::channel::<()>();
    tokio::spawn(async move {
        if tokio::signal::ctrl_c().await.is_ok() {
            let _ = shutdown_tx.send(());
        }
    });

    let port = cfg.port();
    let app = Router::new()
        .route("/search", get(search::handler))
        .fallback((|| async { StatusCode::NOT_FOUND }).into_service())
        .layer(Extension(cfg))
        .layer(Extension(re))
        .layer(
            TraceLayer::new_for_http()
                .on_request(())
                .on_response(|res: &Response, latency: Duration, _span: &Span| {
                    debug!(
                        latency = %format!("{}ms", latency.as_millis()),
                        status = %res.status(),
                        headers = ?{
                            let mut headers = res.headers().clone();
                            headers.remove("content-length");
                            headers
                        },
                    )
                })
                .on_failure(
                    |e: ServerErrorsFailureClass, _latency: Duration, _span: &Span| error!(%e),
                ),
        );

    info!("listening on localhost:{port}");
    info!("make requests to http://localhost:{port}/search/?q=");

    Server::try_bind(&SocketAddr::from(([127, 0, 0, 1], port)))?
        .serve(app.into_make_service())
        .with_graceful_shutdown(async {
            let _ = shutdown_rx.await;
        })
        .await?;

    Ok(())
}
