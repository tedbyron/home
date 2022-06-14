#![allow(clippy::future_not_send)]

use percent_encoding::percent_decode_str;
use worker::{
    event, Context, Env, Headers, Method, Request, Response, Result, RouteContext, Router, Url,
};

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();

    Router::with_data(())
        .get("/", get_handler)
        .or_else_any_method("/*fallback", fallback)
        .run(req, env)
        .await
}

fn get_handler(req: Request, _: RouteContext<()>) -> Result<Response> {
    let url = if let Ok(url) = req.url() {
        url
    } else {
        return Response::error("Bad Request: invalid UTF-8 in URL", 400);
    };

    match url.query() {
        Some(query) => match percent_decode_str(query).decode_utf8() {
            Ok(query) => Response::ok(query),
            Err(_) => Response::error("Bad Request: missing query string", 400),
        },
        None => Response::redirect_with_status(
            unsafe { Url::parse("https://duckduckgo.com/").unwrap_unchecked() },
            303,
        ),
    }
}

fn fallback(req: Request, _: RouteContext<()>) -> Result<Response> {
    match req.method() {
        Method::Get => Response::error("Not Found", 404),
        _ => Response::error("Method Not Allowed", 405)
            .map(|res| res.with_headers(Headers::from_iter([("Allow", "GET")]))),
    }
}
