use std::collections::HashMap;

use serde::{Deserialize, Deserializer};

/// Server, search, and shortcut configuration.
#[derive(Debug, Clone, Deserialize)]
pub struct Config {
    /// The local port to bind to.
    port: u16,
    /// Default URL if no input is provided.
    pub default: &'static str,
    /// Default search URL if no shortcut was used.
    pub search: &'static str,
    /// Shortcut prefix.
    #[serde(deserialize_with = "deserialize_prefix", default)]
    pub prefix: Option<&'static str>,
    /// Map of shortcuts to URLs.
    pub shortcuts: HashMap<&'static str, Shortcut>,
}

/// Shortcut to one or more URLs.
#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
pub enum Shortcut {
    /// Table with shortcut definitions for multiple URLs.
    Table(ShortcutTable),
    /// Shortcut to a URL.
    Value(&'static str),
}

/// Shortcut definitions for multiple URLs.
#[derive(Debug, Clone, Deserialize)]
pub struct ShortcutTable {
    /// Default URL if no more arguments were passed to the shortcut.
    pub default: &'static str,
    /// Default search URL for the shortcut.
    pub search: &'static str,
    /// Shortcut extension to a specific URL. Optionally may contain `{}`.
    pub ext: Option<HashMap<&'static str, &'static str>>,
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

impl Config {
    /// Returns the local port for the server bind to.
    pub const fn port(&self) -> u16 {
        self.port
    }
}
