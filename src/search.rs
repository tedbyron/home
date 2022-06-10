use axum::extract::Query;
use serde::Deserialize;

/// URL search parameters.
#[derive(Debug, Deserialize)]
pub struct Search {
    pub q: String,
}

#[tracing::instrument(skip_all, fields(query = %q))]
pub async fn handler(Query(Search { q }): Query<Search>) -> String {
    let trimmed = q.trim();

    if trimmed.is_empty() {
        return "".to_string();
    }

    let args = trimmed.split_whitespace().collect::<Vec<_>>();

    args[0].into()
}
