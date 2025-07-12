use vercel_runtime::{run, Body, Error, Request, Response};

// Warmup function to keep hero image edge function hot
// Prevents cold starts for maximum performance
#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    // Simple warmup ping - keeps the edge function active
    let response = Response::builder()
        .status(200)
        .header("Content-Type", "application/json")
        .header("X-Warmup", "true")
        .header("Cache-Control", "no-cache")
        .body(Body::Text(r#"{"status":"warm","function":"hero-image","timestamp":""#.to_string() + &chrono::Utc::now().to_rfc3339() + r#""}"#))?;

    Ok(response)
}
