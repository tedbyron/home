use std::collections::HashMap;

/// Server, search, and shortcuts configuration.
#[derive(Debug, serde::Deserialize)]
pub struct Config<'a> {
    /// The local address to bind to.
    #[serde(default = "default_port")]
    pub port: u16,
    /// Default search engine URL with `%s` in place of the search query. This is used when the
    /// search query is not a valid shortcut.
    #[serde(default = "default_search")]
    pub default_search: &'a str,
    /// Map of shortcuts to URLs.
    pub shortcuts: HashMap<&'a str, Shortcut<'a>>,
}

/// Shortcut to one or more URLs.
#[derive(Debug, serde::Deserialize)]
#[serde(untagged)]
pub enum Shortcut<'a> {
    /// Table with shortcut definitions for multiple URLs.
    Table(ShortcutTable<'a>),
    /// Shortcut to a URL.
    Value(&'a str),
}

/// Shortcut definitions for multiple URLs.
#[derive(Debug, serde::Deserialize)]
pub struct ShortcutTable<'a> {
    /// Default URL if no more arguments are passed to the shortcut.
    pub default: &'a str,
    /// Search URL with `%s` in place of the search query.
    pub search: &'a str,
    /// Shortcut extension to a specific URL. May contain `%s`.
    pub ext: Option<HashMap<&'a str, &'a str>>,
}

const fn default_port() -> u16 {
    8072
}

const fn default_search() -> &'static str {
    "https://www.google.com/search?q=%s"
}
