use axum::extract::Query;
use axum::response::{IntoResponse, Redirect};
use axum::Extension;
use regex::Regex;
use serde::Deserialize;

use crate::config::{Config, Shortcut};

/// Search page URL string parameters.
#[derive(Debug, Deserialize)]
pub struct Search {
    /// Parameter for the search query.
    pub q: String,
}

pub async fn handler(
    Query(Search { ref q }): Query<Search>,
    Extension(cfg): Extension<Config>,
    Extension(re): Extension<Vec<(Regex, &str)>>,
) -> impl IntoResponse {
    let args = q.trim().split_whitespace().collect::<Vec<_>>();
    match args.get(0) {
        Some(s) => match cfg.shortcuts.get(s) {
            None => Redirect::to(&cfg.search.replace("{}", q)),
            Some(Shortcut::Table(table)) => match &table.ext {
                None => {
                    if args.len() > 1 {
                        Redirect::to(&table.search.replace("{}", q))
                    } else {
                        Redirect::to(table.default)
                    }
                }
                Some(ext) => {
                    if args.len() > 1 {
                        ext.get(args[1]).map_or_else(
                            || Redirect::to(&table.search.replace("{}", q)),
                            |s| match re.iter().find(|(re, _)| re.is_match(s)) {
                                Some((re, s)) => Redirect::to(&re.replace_all(s, args[1])),
                                None => Redirect::to(&table.search.replace("{}", q)),
                            },
                        )
                    } else {
                        Redirect::to(table.default)
                    }
                }
            },
            Some(Shortcut::Value(url)) => Redirect::to(&url.replace("{}", q)),
        },
        None => Redirect::to(cfg.default),
    }
}
