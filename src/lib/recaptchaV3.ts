/**
 * reCAPTCHA v3 utilities for seamless background verification
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export interface RecaptchaV3Result {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * Load the reCAPTCHA v3 script dynamically
 */
export function loadRecaptchaV3Script(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.grecaptcha) {
      resolve();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(
      'script[src*="recaptcha/api.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () =>
        reject(new Error("Failed to load reCAPTCHA script"))
      );
      return;
    }

    // Create and load the script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));

    document.head.appendChild(script);
  });
}

/**
 * Execute reCAPTCHA v3 verification
 */
export async function executeRecaptcha(
  siteKey: string,
  action: string = "submit"
): Promise<RecaptchaV3Result> {
  try {
    // Ensure the script is loaded
    await loadRecaptchaV3Script(siteKey);

    // Wait for reCAPTCHA to be ready and execute
    return new Promise((resolve) => {
      if (!window.grecaptcha) {
        resolve({
          success: false,
          error: "reCAPTCHA não foi carregado corretamente.",
        });
        return;
      }

      window.grecaptcha.ready(async () => {
        try {
          if (!window.grecaptcha) {
            resolve({
              success: false,
              error: "reCAPTCHA não está disponível.",
            });
            return;
          }

          const token = await window.grecaptcha.execute(siteKey, { action });
          resolve({
            success: true,
            token,
          });
        } catch (error) {
          console.error("reCAPTCHA execution failed:", error);
          resolve({
            success: false,
            error: "Falha na verificação de segurança. Tente novamente.",
          });
        }
      });
    });
  } catch (error) {
    console.error("reCAPTCHA script loading failed:", error);
    return {
      success: false,
      error: "Erro ao carregar verificação de segurança.",
    };
  }
}

/**
 * Initialize reCAPTCHA v3 on page load
 */
export async function initRecaptchaV3(siteKey: string): Promise<boolean> {
  try {
    await loadRecaptchaV3Script(siteKey);
    return true;
  } catch (error) {
    console.error("Failed to initialize reCAPTCHA v3:", error);
    return false;
  }
}

/**
 * Clean up reCAPTCHA resources
 */
export function cleanupRecaptcha(): void {
  const script = document.querySelector('script[src*="recaptcha/api.js"]');
  if (script) {
    script.remove();
  }

  // Remove grecaptcha from window if it exists
  if (window.grecaptcha) {
    delete window.grecaptcha;
  }
}
