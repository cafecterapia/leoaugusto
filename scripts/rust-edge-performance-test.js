import https from "https";
import { performance } from "perf_hooks";

// Performance monitoring for Rust Edge Function hero image delivery
class RustEdgePerformanceMonitor {
  constructor() {
    this.metrics = {
      totalRequests: 0,
      averageResponseTime: 0,
      cacheHitRate: 0,
      edgeLocations: new Set(),
      errors: 0,
    };
  }

  async testEndpoint(url, iterations = 10) {
    console.log(`🚀 Testing Rust Edge Function: ${url}`);
    console.log(`📊 Running ${iterations} iterations...\n`);

    const results = [];

    for (let i = 0; i < iterations; i++) {
      try {
        const result = await this.singleTest(url);
        results.push(result);

        // Log real-time results
        console.log(
          `Test ${i + 1}/${iterations}: ${result.responseTime.toFixed(2)}ms ${result.cached ? "(cached)" : "(miss)"} - Edge: ${result.edgeLocation || "unknown"}`
        );

        // Small delay to avoid overwhelming
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Test ${i + 1} failed:`, error.message);
        this.metrics.errors++;
      }
    }

    this.analyzeResults(results);
  }

  async singleTest(url) {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();

      const req = https.get(url, (res) => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        // Extract performance headers
        const cached =
          res.headers["x-vercel-cache"] === "HIT" ||
          res.headers["cf-cache-status"] === "HIT" ||
          res.headers["cache-control"]?.includes("max-age");

        const edgeLocation =
          res.headers["x-vercel-edge"] ||
          res.headers["cf-ray"] ||
          res.headers["x-served-by"];

        // Consume response data
        let data = Buffer.alloc(0);
        res.on("data", (chunk) => {
          data = Buffer.concat([data, chunk]);
        });

        res.on("end", () => {
          resolve({
            responseTime,
            statusCode: res.statusCode,
            cached,
            edgeLocation,
            contentLength: parseInt(res.headers["content-length"] || "0"),
            contentType: res.headers["content-type"],
            headers: res.headers,
          });
        });
      });

      req.on("error", reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error("Request timeout"));
      });
    });
  }

  analyzeResults(results) {
    if (results.length === 0) {
      console.log("❌ No successful tests to analyze");
      return;
    }

    const responseTimes = results.map((r) => r.responseTime);
    const cached = results.filter((r) => r.cached).length;
    const edgeLocations = new Set(
      results.map((r) => r.edgeLocation).filter(Boolean)
    );

    console.log("\n📈 RUST EDGE FUNCTION PERFORMANCE ANALYSIS");
    console.log("=====================================");
    console.log(
      `🎯 Average Response Time: ${(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)}ms`
    );
    console.log(
      `⚡ Fastest Response: ${Math.min(...responseTimes).toFixed(2)}ms`
    );
    console.log(
      `🐌 Slowest Response: ${Math.max(...responseTimes).toFixed(2)}ms`
    );
    console.log(
      `💾 Cache Hit Rate: ${((cached / results.length) * 100).toFixed(1)}%`
    );
    console.log(`🌍 Edge Locations: ${edgeLocations.size} unique`);
    console.log(
      `📊 Success Rate: ${((results.length / (results.length + this.metrics.errors)) * 100).toFixed(1)}%`
    );

    // Performance goals validation
    const avgResponseTime =
      responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const fastestTime = Math.min(...responseTimes);

    console.log("\n🎯 PERFORMANCE GOALS VALIDATION");
    console.log("==============================");
    console.log(
      `✅ Sub-100ms average: ${avgResponseTime < 100 ? "PASS" : "FAIL"} (${avgResponseTime.toFixed(2)}ms)`
    );
    console.log(
      `✅ Sub-50ms fastest: ${fastestTime < 50 ? "PASS" : "FAIL"} (${fastestTime.toFixed(2)}ms)`
    );
    console.log(
      `✅ Cache efficiency: ${cached > results.length * 0.8 ? "PASS" : "FAIL"} (${cached}/${results.length})`
    );

    // Rust Edge Function specific metrics
    const rustEdgeResponses = results.filter(
      (r) => r.headers["x-vercel-edge"] === "rust"
    );
    console.log(
      `🦀 Rust Edge Responses: ${rustEdgeResponses.length}/${results.length}`
    );

    if (avgResponseTime < 50) {
      console.log("\n🚀 RUST EDGE FUNCTION STATUS: BLAZINGLY FAST! 🔥");
    } else if (avgResponseTime < 100) {
      console.log("\n⚡ RUST EDGE FUNCTION STATUS: FAST 👍");
    } else {
      console.log("\n⚠️  RUST EDGE FUNCTION STATUS: NEEDS OPTIMIZATION");
    }
  }
}

// Test different scenarios
async function runPerformanceTests() {
  const monitor = new RustEdgePerformanceMonitor();

  console.log("🦀 RUST EDGE FUNCTION HERO IMAGE PERFORMANCE TEST");
  console.log("================================================\n");

  // Test the Rust Edge Function endpoint
  await monitor.testEndpoint(
    "https://your-domain.vercel.app/api/hero-image?format=avif&q=90",
    15
  );

  console.log("\n🔄 Testing different formats...\n");

  // Test WebP fallback
  await monitor.testEndpoint(
    "https://your-domain.vercel.app/api/hero-image?format=webp&q=85",
    5
  );

  // Test different quality settings
  await monitor.testEndpoint(
    "https://your-domain.vercel.app/api/hero-image?format=avif&q=75",
    5
  );
}

// Export for use in other scripts
module.exports = { RustEdgePerformanceMonitor };

// Run if called directly
if (require.main === module) {
  runPerformanceTests().catch(console.error);
}
