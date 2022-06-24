#![warn(clippy::all, clippy::cargo, clippy::nursery, rust_2018_idioms)]
#![allow(clippy::future_not_send, clippy::wildcard_imports)]

use kv::KvStore;
use percent_encoding::percent_decode_str;
use worker::*;

mod macros;

#[allow(clippy::missing_errors_doc)]
#[event(fetch)]
pub async fn handler(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();

    Router::new()
        .get_async("/", website)
        .get_async("/search", search)
        .or_else_any_method("/*fallback", fallback)
        .run(req, env)
        .await
}

async fn website(_req: Request, _: RouteContext<()>) -> Result<Response> {
    let kv = KvStore::create("home-website_preview").unwrap();
    let html = kv
        .get("index.5328025083.html")
        .text()
        .await
        .unwrap()
        .unwrap();

    Response::ok(html)
        .map(|res| res.with_headers(Headers::from_iter([("Content-Type", "text/html")])))
}

#[allow(clippy::needless_pass_by_value)]
async fn search(req: Request, _: RouteContext<()>) -> Result<Response> {
    let url = unwrap_or_500!(req.url());

    match url.query() {
        Some(query) => match percent_decode_str(query).decode_utf8() {
            Ok(val) => Response::ok(val),
            Err(e) => return_500!(e),
        },
        None => Response::redirect_with_status(Url::parse("https://duckduckgo.com/").unwrap(), 303),
    }
}

#[allow(clippy::needless_pass_by_value)]
fn fallback(req: Request, _: RouteContext<()>) -> Result<Response> {
    match req.method() {
        Method::Get => {
            let mut url = unwrap_or_500!(req.url());
            url.set_path("");
            Response::redirect(url)
        }
        _ => Response::error("Method Not Allowed", 405)
            .map(|res| res.with_headers(Headers::from_iter([("Allow", "GET")]))),
    }
}
