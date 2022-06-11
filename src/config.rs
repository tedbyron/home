use std::collections::HashMap;
use std::{env, fs};

use anyhow::{bail, Context, Result};
use once_cell::sync::OnceCell;
use regex::Regex;
use serde::de;
use serde::{Deserialize, Deserializer};
use tracing::debug;

/// Buffer for config file data.
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
    /// Map of shortcut names to values.
    pub shortcuts: HashMap<&'static str, Shortcut>,
}

/// Shortcut to one or more URLs.
#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
pub enum Shortcut {
    /// Shortcut definitions for multiple URLs.
    Table(ShortcutGroup),
    /// Shortcut to a URL.
    Value(&'static str),
}

/// Shortcut definitions for multiple URLs.
#[derive(Debug, Clone, Deserialize)]
pub struct ShortcutGroup {
    /// Default URL if no more arguments were passed to the shortcut.
    pub default: &'static str,
    /// Default search URL for the shortcut.
    pub search: &'static str,
    /// Shortcut extensions to specific URLs.
    pub ext: Option<Vec<ShortcutExtension>>,
}

/// Types of shortcut extensions.
#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
pub enum ShortcutExtension {
    /// A regex shortcut extension.
    Regex {
        #[serde(deserialize_with = "deserialize_regex")]
        /// The regex to match; compiled at runtime.
        regex: Regex,
        /// Shortcut URL with a regex replacement pattern.
        url: &'static str,
    },
    /// A string shortcut extension.
    Value {
        /// The string to match.
        value: &'static str,
        /// Shortcut URL.
        url: &'static str,
    },
}

fn deserialize_prefix<'de, D>(deserializer: D) -> Result<Option<&'de str>, D::Error>
where
    D: Deserializer<'de>,
{
    match Option::<&str>::deserialize(deserializer).ok().flatten() {
        Some(s) if s.is_empty() || s.contains(char::is_whitespace) => {
            Err(de::Error::custom("invalid value"))
        }
        Some(s) => Ok(Some(s)),
        None => Ok(None),
    }
}

fn deserialize_regex<'de, D>(deserializer: D) -> Result<Regex, D::Error>
where
    D: Deserializer<'de>,
{
    let s = <&str>::deserialize(deserializer)?;
    Regex::new(s).map_err(|_| de::Error::custom("invalid regex"))
}

impl Config {
    /// Returns the local port to bind to.
    pub const fn port(&self) -> u16 {
        self.port
    }
}

/// Load the config. Checks the current directory or the executable's directory for a
/// `config.toml` file.
#[tracing::instrument]
pub fn load() -> Result<Config> {
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
            fs::read_to_string(&cfg_path)
                .with_context(|| format!("failed to read config file {}", cfg_path.display()))?,
        )
        .unwrap();
    let cfg = toml::from_str(CFG_BUF.get().unwrap())
        .with_context(|| format!("failed to deserialize config file {}", cfg_path.display()))?;

    debug!(?cfg);

    Ok(cfg)
}
