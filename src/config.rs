use std::fs::File;
use std::io::prelude::*;
use std::net::SocketAddr;

#[derive(Debug, serde::Deserialize)]
pub struct Config {
    /// The local address to bind to.
    local_address: SocketAddr,
    /// Default search engine URL with `%s` in place of the search query.
    default_engine: &'static str,
}
