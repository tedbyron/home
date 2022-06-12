use axum::extract::Query;
use axum::response::{IntoResponse, Redirect, Response};
use axum::Extension;
use serde::Deserialize;

use crate::config::{Config, Shortcut, ShortcutExtension, ShortcutGroup};

/// Search page URL string parameters.
#[derive(Debug, Deserialize)]
pub struct Search {
    /// Parameter for the search query.
    q: String,
}

/// Handle search a search query using the config file.
#[allow(clippy::unused_async)]
pub async fn handler(query: Option<Query<Search>>, Extension(cfg): Extension<Config>) -> Response {
    if let Some(Query(Search { ref q })) = query {
        handle_search(q, cfg).into_response()
    } else {
        // TODO: serve static HTML page
        "todo".into_response()
    }
}

fn handle_search(q: &str, cfg: Config) -> Redirect {
    let split = q.split_whitespace().collect::<Vec<_>>();

    match split.first() {
        Some(shortcut) => match cfg.shortcuts.get(shortcut) {
            Some(shortcut_type) => {
                let args = &split[1..];

                match shortcut_type {
                    Shortcut::Table(table) => match &table.exts {
                        Some(ext) => match_ext(args, table, ext),
                        None => {
                            if args.is_empty() {
                                Redirect::to(table.default)
                            } else {
                                Redirect::to(&table.search.replace("{}", &args.join(" ")))
                            }
                        }
                    },
                    Shortcut::Value(url) => Redirect::to(&url.replace("{}", &args.join(" "))),
                }
            }
            None => Redirect::to(&cfg.search.replace("{}", q)),
        },
        None => Redirect::to(cfg.default),
    }
}

/// Handle a shortcut that has extensions.
fn match_ext(args: &[&str], table: &ShortcutGroup, exts: &[ShortcutExtension]) -> Redirect {
    match args.first() {
        Some(arg) => {
            let joined = &args.join(" ");

            exts.iter()
                .find_map(|ext| match ext {
                    ShortcutExtension::Regex { regex, url } => {
                        if regex.is_match(joined) {
                            Some(Redirect::to(&regex.replace(joined, *url)))
                        } else {
                            None
                        }
                    }
                    ShortcutExtension::Value { value, url } => {
                        if value == arg {
                            Some(Redirect::to(url))
                        } else {
                            None
                        }
                    }
                })
                .unwrap_or_else(|| Redirect::to(&table.search.replace("{}", joined)))
        }
        None => Redirect::to(table.default),
    }
}
