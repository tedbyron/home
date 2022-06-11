use axum::extract::Query;
use axum::response::Redirect;
use axum::Extension;
use serde::Deserialize;

use crate::config::{Config, Shortcut, ShortcutExtension, ShortcutGroup};

/// Search page URL string parameters.
#[derive(Debug, Deserialize)]
pub struct Search {
    /// Parameter for the search query.
    pub q: String,
}

/// Handle search a search query using the config file.
pub async fn handler(
    Query(Search { ref q }): Query<Search>,
    Extension(cfg): Extension<Config>,
) -> Redirect {
    let args = q.split_whitespace().collect::<Vec<_>>();

    match args.first() {
        Some(s) => match cfg.shortcuts.get(s) {
            None => Redirect::to(&cfg.search.replace("{}", q)),
            Some(Shortcut::Table(table)) => match &table.ext {
                None => {
                    if args.len() > 1 {
                        Redirect::to(&table.search.replace("{}", &args[1..].join(" ")))
                    } else {
                        Redirect::to(table.default)
                    }
                }
                Some(ext) => match_ext(&args, table, ext),
            },
            Some(Shortcut::Value(url)) => Redirect::to(&url.replace("{}", q)),
        },
        None => Redirect::to(cfg.default),
    }
}

/// Handle a shortcut that has extensions.
fn match_ext(args: &[&str], table: &ShortcutGroup, ext: &[ShortcutExtension]) -> Redirect {
    args.get(1).map_or_else(
        || Redirect::to(table.default),
        |arg| {
            ext.iter()
                .find_map(|ext| match ext {
                    ShortcutExtension::Regex { regex, url } => {
                        if regex.is_match(arg) {
                            Some(Redirect::to(&regex.replace(arg, *url)))
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
                .unwrap_or_else(|| Redirect::to(&table.search.replace("{}", &args[1..].join(" "))))
        },
    )
}
