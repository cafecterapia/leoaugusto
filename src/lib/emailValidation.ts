/**
 * Email validation utilities
 */

// Basic email regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// More comprehensive email validation with common domain checks
const COMMON_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "protonmail.com",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br",
  "ig.com.br",
  "globo.com",
  "r7.com",
];

// Disposable email domains (commonly used for spam)
const DISPOSABLE_DOMAINS = [
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "tempmail.org",
  "temp-mail.org",
  "getnada.com",
  "throwaway.email",
  "mohmal.com",
];

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Basic email format validation
 */
export function isValidEmailFormat(email: string): boolean {
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}

/**
 * Check if email domain is from a disposable email provider
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.includes(domain) : false;
}

/**
 * Comprehensive email validation
 */
export function validateEmail(email: string): EmailValidationResult {
  const trimmedEmail = email.trim().toLowerCase();

  // Check if email is empty
  if (!trimmedEmail) {
    return {
      isValid: false,
      error: "Email é obrigatório.",
    };
  }

  // Check basic format
  if (!isValidEmailFormat(trimmedEmail)) {
    return {
      isValid: false,
      error: "Por favor, insira um email válido.",
    };
  }

  // Check for disposable emails
  if (isDisposableEmail(trimmedEmail)) {
    return {
      isValid: false,
      error: "Por favor, use um email pessoal válido (não temporário).",
    };
  }

  // Check for minimum length
  if (trimmedEmail.length < 5) {
    return {
      isValid: false,
      error: "Email muito curto.",
    };
  }

  // Check for maximum length
  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      error: "Email muito longo.",
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Real-time email validation for input feedback
 */
export function getEmailInputFeedback(email: string): {
  isValid: boolean;
  message?: string;
  type?: "error" | "warning" | "success";
} {
  if (!email.trim()) {
    return { isValid: false };
  }

  const validation = validateEmail(email);

  if (!validation.isValid) {
    return {
      isValid: false,
      message: validation.error || "Email inválido",
      type: "error",
    };
  }

  const domain = email.split("@")[1]?.toLowerCase();

  // Give feedback for common domains
  if (domain && COMMON_DOMAINS.includes(domain)) {
    return {
      isValid: true,
      message: "Email válido",
      type: "success",
    };
  }

  return {
    isValid: true,
    message: "Email formatado corretamente",
    type: "success",
  };
}
