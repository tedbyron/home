#![warn(clippy::all, clippy::nursery, rust_2018_idioms)]

use std::net::SocketAddr;
use std::process::ExitCode;
use std::time::Duration;

use anyhow::Result;
use axum::handler::Handler;
use axum::response::Response;
use axum::routing::get;
use axum::{Extension, Router, Server};
use tokio::sync::oneshot;
use tower_http::classify::ServerErrorsFailureClass;
use tower_http::trace::TraceLayer;
use tracing::{debug, error, info, Span};
use tracing_subscriber::filter::{EnvFilter, LevelFilter};
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

mod config;
mod handler;

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
    tracing_subscriber::registry()
        .with(
            EnvFilter::builder()
                .with_default_directive(LevelFilter::INFO.into())
                .with_env_var("HOME_LOG")
                .from_env_lossy(),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let cfg = config::load()?;
    let port = cfg.port;
    let app = Router::new()
        .route("/", get(handler::handler))
        .fallback(handler::handler.into_service())
        .layer(Extension(cfg))
        .layer(
            TraceLayer::new_for_http()
                .on_request(())
                .on_response(|res: &Response, latency: Duration, _span: &Span| {
                    debug!(
                        latency = %format!("{}ms", latency.as_millis()),
                        status = %res.status().as_u16(),
                        location = ?res.headers().get("location"),
                    );
                })
                .on_failure(
                    |e: ServerErrorsFailureClass, _latency: Duration, _span: &Span| error!("{e}"),
                ),
        );

    let (shutdown_tx, shutdown_rx) = oneshot::channel::<()>();
    tokio::spawn(async move {
        let _ = tokio::signal::ctrl_c().await;
        let _ = shutdown_tx.send(());
    });

    let server =
        Server::try_bind(&SocketAddr::from(([127, 0, 0, 1], port)))?.serve(app.into_make_service());
    let port = server.local_addr().port();

    info!("listening on http://localhost:{port}");
    info!("make requests to http://localhost:{port}/?q=");

    server
        .with_graceful_shutdown(async {
            let _ = shutdown_rx.await;
        })
        .await?;

    Ok(())
}
