#![allow(clippy::future_not_send)] // workers' handlers do not require `Send` futures

use worker::{event, Env, Request, Response, Result, Router};

#[event(fetch)]
pub async fn handler(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();

    Router::new()
        .get("/", |_, _| Response::ok("Hello from Workers!"))
        .or_else_any_method("*", |_, _| Response::error("Method Not Allowed", 405))
        .run(req, env)
        .await
}
