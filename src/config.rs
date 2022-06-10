use std::{collections::HashMap, env, fs};

use anyhow::{bail, Context, Result};
use once_cell::sync::OnceCell;
use serde::{Deserialize, Deserializer};
use tracing::debug;

/// String buffer for config file data.
static CFG_BUF: OnceCell<String> = OnceCell::new();

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
    /// Load the config file.
    pub fn load() -> Result<Self> {
        let mut cfg_path = env::current_exe()?.join("config.toml");
        if !cfg_path.is_file() {
            cfg_path = env::current_dir()?.join("config.toml");

            if !cfg_path.is_file() {
                bail!("config not found in the executable's directory or the current directory");
            }
        }

        debug!(cfg_path = %cfg_path.display());

        CFG_BUF
            .set(
                fs::read_to_string(&cfg_path).with_context(|| {
                    format!("failed to read config file {}", cfg_path.display())
                })?,
            )
            .unwrap();
        let cfg = toml::from_str(CFG_BUF.get().unwrap())
            .with_context(|| format!("failed to deserialize config file {}", cfg_path.display()))?;
        debug!(?cfg);

        Ok(cfg)
    }

    /// Returns the local port for the server bind to.
    pub const fn port(&self) -> u16 {
        self.port
    }
}
