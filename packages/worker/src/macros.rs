/// Unwraps a `Result` or returns a 500 response.
#[macro_export]
macro_rules! unwrap_or_500 {
    ( $res:expr ) => {
        match $res {
            Ok(val) => val,
            Err(e) => return_500!(e),
        }
    };
}

#[macro_export]
macro_rules! return_500 {
    ( $e:expr ) => {
        return Response::error(format!("Internal Server Error: {}", $e), 500)
    };
}
