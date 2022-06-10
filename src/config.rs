use std::collections::HashMap;

use serde::{Deserialize, Deserializer};

/// Server, search, and shortcuts configuration.
#[derive(Debug, Deserialize)]
pub struct Config<'a> {
    /// The local address to bind to.
    pub port: u16,
    /// Default URL if no input is provided.
    pub default_empty: &'a str,
    /// Default search URL if no shortcut was used.
    pub default_search: &'a str,
    /// Shortcut prefix.
    #[serde(deserialize_with = "deserialize_prefix", default)]
    pub prefix: Option<&'a str>,
    /// Map of shortcuts to URLs.
    pub shortcuts: HashMap<&'a str, Shortcut<'a>>,
}

/// Shortcut to one or more URLs.
#[derive(Debug, Deserialize)]
#[serde(untagged)]
pub enum Shortcut<'a> {
    /// Table with shortcut definitions for multiple URLs.
    Table(ShortcutTable<'a>),
    /// Shortcut to a URL.
    Value(&'a str),
}

/// Shortcut definitions for multiple URLs.
#[derive(Debug, Deserialize)]
pub struct ShortcutTable<'a> {
    /// Default URL if no more arguments are passed to the shortcut.
    pub default: &'a str,
    /// Search URL.
    pub search: &'a str,
    /// Shortcut extension to a specific URL. Optionally may contain `{}`.
    pub ext: Option<HashMap<&'a str, &'a str>>,
}

fn deserialize_prefix<'de, D>(deserializer: D) -> Result<Option<&'de str>, D::Error>
where
    D: Deserializer<'de>,
{
    match Option::<&str>::deserialize(deserializer).ok().flatten() {
        Some(s) if s.is_empty() || s.contains(char::is_whitespace) => Ok(None),
        Some(s) => Ok(Some(s)),
        None => Ok(None),
    }
}
