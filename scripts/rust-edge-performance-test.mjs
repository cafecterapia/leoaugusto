// Rust Edge Function Performance Test
// Simple performance testing for hero image delivery

export class RustEdgePerformanceMonitor {
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

        console.log(
          `Test ${i + 1}/${iterations}: ${result.responseTime.toFixed(2)}ms ${
            result.cached ? "(cached)" : "(miss)"
          } - Edge: ${result.edgeLocation || "unknown"}`
        );

        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Test ${i + 1} failed:`, error.message);
        this.metrics.errors++;
      }
    }

    this.analyzeResults(results);
  }

  async singleTest(url) {
    const startTime = performance.now();

    try {
      const response = await fetch(url);
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      const cached =
        response.headers.get("x-vercel-cache") === "HIT" ||
        response.headers.get("cf-cache-status") === "HIT" ||
        response.headers.get("cache-control")?.includes("max-age");

      const edgeLocation =
        response.headers.get("x-vercel-edge") ||
        response.headers.get("cf-ray") ||
        response.headers.get("x-served-by");

      return {
        responseTime,
        statusCode: response.status,
        cached,
        edgeLocation,
        contentLength: parseInt(response.headers.get("content-length") || "0"),
        contentType: response.headers.get("content-type"),
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      throw new Error(`Network error: ${error.message}`);
    }
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
      `🎯 Average Response Time: ${(
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      ).toFixed(2)}ms`
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
      `📊 Success Rate: ${(
        (results.length / (results.length + this.metrics.errors)) *
        100
      ).toFixed(1)}%`
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

// Test runner function
export async function runRustEdgePerformanceTests() {
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
