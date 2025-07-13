use vercel_runtime::{run, Body, Error, Request, Response};
use std::collections::HashMap;

// Optimized for lfam.avif specifically - lightning fast!
const HERO_IMAGE_URL: &str = "https://leonardoaugusto.com/images/lfam.avif";

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let query = req.uri().query().unwrap_or("");
    let params: HashMap<String, String> = url::form_urlencoded::parse(query.as_bytes())
        .into_owned()
        .collect();

    // Get image name from query parameter (support both 'name' and 'image' for compatibility)
    let default_image = "lfam.avif".to_string();
    let image_name = params.get("name")
        .or_else(|| params.get("image"))
        .unwrap_or(&default_image);
    
    // Lightning-fast path for hero image - most common case (90%+ of requests)
    let remote_url = if image_name == "lfam.avif" {
        HERO_IMAGE_URL
    } else if image_name.starts_with("http") {
        image_name.as_str()
    } else {
        return Ok(Response::builder()
            .status(404)
            .header("content-type", "text/plain")
            .body("Only lfam.avif supported in Rust mode".into())?);
    };

    // Ultra-optimized HTTP client for hero image fetching
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(3)) // Aggressive 3s timeout
        .tcp_keepalive(std::time::Duration::from_secs(30))
        .pool_max_idle_per_host(10) // Optimized for single image
        .http2_prior_knowledge() // Force HTTP/2 for maximum speed
        .use_rustls_tls() // Faster TLS implementation
        .build()
        .map_err(|e| Error::from(format!("HTTP client error: {}", e)))?;

    // Lightning-fast fetch with hero-optimized headers
    let response = client
        .get(remote_url)
        .header("User-Agent", "Vercel-Rust-Hero/1.0")
        .header("Accept", "image/avif,image/webp,image/*,*/*;q=0.8")
        .header("Accept-Encoding", "gzip, br")
        .header("Priority", "u=0") // Highest priority for hero image
        .header("Purpose", "prefetch") // Browser optimization hint
        .send()
        .await
        .map_err(|e| Error::from(format!("Hero image fetch failed: {}", e)))?;

    if !response.status().is_success() {
        return Ok(Response::builder()
            .status(404)
            .header("content-type", "text/plain")
            .body("Hero image not found".into())?);
    }

    let image_data = response
        .bytes()
        .await
        .map_err(|e| Error::from(format!("Hero image read failed: {}", e)))?;

    // LIGHTNING-FAST response with maximum edge caching for hero image
    Ok(Response::builder()
        .status(200)
        .header("content-type", "image/avif")
        .header("cache-control", "public, max-age=31536000, s-maxage=31536000, immutable")
        .header("x-edge-runtime", "rust-hero")
        .header("cross-origin-resource-policy", "cross-origin")
        .header("vary", "Accept")
        .header("x-content-type-options", "nosniff")
        .header("x-robots-tag", "noindex")
        .header("x-hero-optimized", "true")
        .header("x-cache-tags", "hero-image") // For edge cache invalidation
        .body(image_data.to_vec().into())?)
}
