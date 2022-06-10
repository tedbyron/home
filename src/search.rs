use axum::extract;

/// URL search parameters.
#[derive(Debug, serde::Deserialize)]
pub struct Search {
    pub q: String,
}

#[tracing::instrument]
pub async fn handler(extract::Query(search): extract::Query<Search>) -> String {
    search.q
}
