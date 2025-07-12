use vercel_runtime::{run, Body, Error, Request, RequestExt, Response};
use image::{ImageFormat, ImageOutputFormat};
use std::io::Cursor;
use bytes::Bytes;

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let query = req.uri().query().unwrap_or("");
    let params: std::collections::HashMap<String, String> = url::form_urlencoded::parse(query.as_bytes())
        .into_owned()
        .collect();

    let format = params.get("format").unwrap_or(&"avif".to_string()).clone();
    let quality = params.get("q")
        .and_then(|q| q.parse::<u8>().ok())
        .unwrap_or(90);

    // In a real implementation, you would load your hero image from storage
    // For now, we'll return a simple response
    let hero_image_data = include_bytes!("../public/images/hero-photo.avif");
    
    let content_type = match format.as_str() {
        "avif" => "image/avif",
        "webp" => "image/webp", 
        "jpeg" | "jpg" => "image/jpeg",
        _ => "image/avif",
    };

    Ok(Response::builder()
        .status(200)
        .header("content-type", content_type)
        .header("cache-control", "public, max-age=31536000, s-maxage=31536000, immutable")
        .header("x-edge-runtime", "rust")
        .header("cross-origin-resource-policy", "cross-origin")
        .body(hero_image_data.to_vec().into())?)
}
