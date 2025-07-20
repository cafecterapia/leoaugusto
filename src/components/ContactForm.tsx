"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { validateEmail, getEmailInputFeedback } from "@/lib/emailValidation";
import { executeRecaptcha, initRecaptchaV3 } from "@/lib/recaptchaV3";

const subjects = [
  "Ressarcimento de Preterição",
  "Acompanhamento de procedimento administrativos (Sindicância e IPM) e judiciais",
  "Conselho de Disciplina e Conselho de Justificação",
  "Remoção/Movimentação com ou sem ônus",
  "Reintegração/Reinclusão ao SAM, EB e FAB",
  "Impedimentos a Cursos de Formação de Cabo, Sargento e Oficiais",
  "Reforma de Militares na Esfera Administrativa/Judicial",
  "Descontos e/ou cobranças indevidas",
];

interface ContactFormProps {
  email: string; // The email where messages should be sent
  preSelectedServices?: string[]; // Pre-selected services from ServiceBoxes
}

export default function ContactForm({
  email,
  preSelectedServices = [],
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [emailValidation, setEmailValidation] = useState<{
    isValid: boolean;
    message?: string;
    type?: "error" | "warning" | "success";
  }>({ isValid: false });
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Additional state for managing the message with pre-selected services
  const [messageValue, setMessageValue] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  // Get reCAPTCHA site key from environment variables
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Initialize reCAPTCHA v3 on component mount
  useEffect(() => {
    if (recaptchaSiteKey) {
      initRecaptchaV3(recaptchaSiteKey).then((success) => {
        setRecaptchaReady(success);
      });
    } else {
      // No reCAPTCHA configured - form will work without it
      // console.log(
      //   "reCAPTCHA v3 not configured - forms will work without verification"
      // );
      setRecaptchaReady(true);
    }
  }, [recaptchaSiteKey]);

  // Initialize subjects with pre-selected services (without touching message field)
  useEffect(() => {
    if (preSelectedServices.length > 0) {
      // Set selected subjects only
      setSelectedSubjects(preSelectedServices);
    }
  }, [preSelectedServices]);

  // Email validation handler
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value;
      setEmailValue(email);

      if (email.trim()) {
        const feedback = getEmailInputFeedback(email);
        setEmailValidation(feedback);
      } else {
        setEmailValidation({ isValid: false });
      }
    },
    []
  );

  // Name input handler
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameValue(e.target.value);
    },
    []
  );

  // Close dropdown when focusing on other inputs (except the dropdown trigger)
  const handleNonDropdownFocus = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  // Check if name and email are valid for enabling subjects
  const areBasicFieldsValid =
    nameValue.trim().length > 0 && emailValidation.isValid;

  // Subject selection handler for dropdown
  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".subjects-dropdown")) {
      setIsDropdownOpen(false);
    }
  }, []);

  // Prevent page scroll when scrolling inside dropdown - DISABLED FOR DEBUGGING
  const handleDropdownWheel = useCallback(() => {
    // const target = e.currentTarget as HTMLElement;
    // const { scrollTop, scrollHeight, clientHeight } = target;
    // const isScrollableContent = scrollHeight > clientHeight;

    // // Only prevent default scrolling if we're actually scrolling within the dropdown content
    // if (isScrollableContent) {
    //   const deltaY = e.deltaY;
    //   const isScrollingUp = deltaY < 0;
    //   const isScrollingDown = deltaY > 0;

    //   // Allow page scroll if we're at the boundaries of the dropdown
    //   const isAtTop = scrollTop === 0;
    //   const isAtBottom = scrollTop >= scrollHeight - clientHeight;

    //   if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom)) {
    //     // Only prevent page scroll if we're scrolling within the dropdown bounds
    //     e.preventDefault();
    //     e.stopPropagation();
    //     target.scrollTop += deltaY;
    //   }
    // }
    console.log("ContactForm handleDropdownWheel called (disabled)");
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isDropdownOpen, handleClickOutside]);
  const submitFormInBackground = async (
    formData: FormData,
    recaptchaToken?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Add reCAPTCHA token to form data if available
      if (recaptchaToken) {
        formData.set("g-recaptcha-response", recaptchaToken);
      }

      // Submit directly to formsubmit.co
      const response = await fetch(`https://formsubmit.co/${email}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // console.error("Form submission failed:", response.status);
        return {
          success: false,
          error: `Erro no envio: ${response.status}. Tente novamente.`,
        };
      } else {
        // console.log("Form submitted successfully");
        return { success: true };
      }
    } catch {
      // console.error("Form submission error:", error);
      return {
        success: false,
        error: "Erro de conexão. Verifique sua internet e tente novamente.",
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    // Get form data
    const formData = new FormData(e.currentTarget);

    // Basic client-side validation
    const name = formData.get("name") as string;
    const userEmail = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !userEmail || !message) {
      setSubmissionError("Por favor, preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    if (selectedSubjects.length === 0) {
      setSubmissionError("Por favor, selecione pelo menos um assunto.");
      setIsSubmitting(false);
      return;
    }

    // Add selected subjects to form data
    formData.set("assuntos", selectedSubjects.join(", "));

    // Validate email with our enhanced validation
    const emailValidationResult = validateEmail(userEmail);
    if (!emailValidationResult.isValid) {
      setSubmissionError(emailValidationResult.error || "Email inválido");
      setIsSubmitting(false);
      return;
    }

    let recaptchaToken: string | undefined;

    // Execute reCAPTCHA v3 if configured and ready
    if (recaptchaSiteKey && recaptchaReady) {
      const recaptchaResult = await executeRecaptcha(
        recaptchaSiteKey,
        "submit"
      );
      if (!recaptchaResult.success) {
        setSubmissionError(
          recaptchaResult.error ||
            "Falha na verificação de segurança. Tente novamente."
        );
        setIsSubmitting(false);
        return;
      }
      recaptchaToken = recaptchaResult.token;
    }

    // Submit form and wait for response
    const submissionResult = await submitFormInBackground(
      formData,
      recaptchaToken
    );

    if (submissionResult.success) {
      // Show success feedback only if submission was successful
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset form immediately
      if (formRef.current) {
        formRef.current.reset();
      }

      // Reset states
      setEmailValue("");
      setNameValue("");
      setMessageValue("");
      setSelectedSubjects([]);
      setEmailValidation({ isValid: false });
    } else {
      // Show error if submission failed
      setSubmissionError(
        submissionResult.error || "Erro ao enviar mensagem. Tente novamente."
      );
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="text-green-600 dark:text-green-400 mb-4">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Mensagem enviada!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Obrigado pelo contato. Retornaremos em breve.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Sua mensagem foi recebida e está sendo processada.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setEmailValue("");
            setNameValue("");
            setSelectedSubjects([]);
            setEmailValidation({ isValid: false });
          }}
          className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4"
    >
      {/* Show error message if validation fails */}
      {submissionError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded">
          {submissionError}
        </div>
      )}
      {/* Hidden fields for formsubmit.co configuration */}
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input
        type="hidden"
        name="_subject"
        value="Nova mensagem do site Leonardo Augusto"
      />
      <input type="hidden" name="_next" value="/contato?success=true" />

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={nameValue}
          onChange={handleNameChange}
          onFocus={handleNonDropdownFocus}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
          onFocus={handleNonDropdownFocus}
          required
          className={`w-full px-3 py-2 border focus:ring-2 focus:border-transparent outline-none transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
            emailValue && !emailValidation.isValid
              ? "border-red-300 dark:border-red-600 focus:ring-red-500"
              : emailValue && emailValidation.isValid
                ? "border-green-300 dark:border-green-600 focus:ring-green-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
          }`}
          placeholder="seu@email.com"
        />
        {emailValue && emailValidation.message && (
          <p
            className={`text-xs mt-1 ${
              emailValidation.type === "error"
                ? "text-red-600 dark:text-red-400"
                : emailValidation.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-yellow-600 dark:text-yellow-400"
            }`}
          >
            {emailValidation.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Telefone{" "}
          <span className="text-gray-400 dark:text-gray-500">(opcional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onFocus={handleNonDropdownFocus}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400"
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Assuntos <span className="text-red-500">*</span>
          {!areBasicFieldsValid && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              (preencha nome e email válido primeiro)
            </span>
          )}
        </label>
        <div className="subjects-dropdown relative">
          {/* Dropdown trigger that looks like a text input */}
          <button
            type="button"
            onClick={() =>
              areBasicFieldsValid && setIsDropdownOpen(!isDropdownOpen)
            }
            disabled={!areBasicFieldsValid}
            className={`w-full px-3 py-2 border text-left outline-none transition-colors flex items-center justify-between ${
              areBasicFieldsValid
                ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500"
                : "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            }`}
          >
            <span
              className={`text-sm flex-1 truncate ${
                areBasicFieldsValid
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {!areBasicFieldsValid
                ? "Preencha nome e email para selecionar assuntos"
                : selectedSubjects.length === 0
                  ? "Selecione os assuntos de interesse"
                  : selectedSubjects.length === 1
                    ? selectedSubjects[0]
                    : `${selectedSubjects.length} assuntos selecionados`}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${
                areBasicFieldsValid
                  ? `text-gray-400 dark:text-gray-500 ${isDropdownOpen ? "rotate-180" : ""}`
                  : "text-gray-300 dark:text-gray-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && areBasicFieldsValid && (
            <div
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto overscroll-contain"
              onWheel={handleDropdownWheel}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgb(156 163 175) rgb(249 250 251)",
              }}
            >
              {subjects.map((subject) => (
                <label
                  key={subject}
                  className="flex items-start gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="mt-1 w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                    style={{
                      accentColor: "#2563eb", // Ensure consistent checkbox color across themes
                    }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {subject}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
        {selectedSubjects.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Assuntos selecionados:
            </p>
            <div className="flex flex-wrap gap-1">
              {selectedSubjects.map((subject) => (
                <span
                  key={subject}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                >
                  {subject.length > 30
                    ? `${subject.substring(0, 30)}...`
                    : subject}
                  <button
                    type="button"
                    onClick={() => handleSubjectToggle(subject)}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full p-0.5 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          onFocus={handleNonDropdownFocus}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-vertical placeholder:text-gray-500 dark:placeholder:text-gray-400"
          placeholder="Descreva sua necessidade ou dúvida..."
        />
      </div>

      {/* reCAPTCHA v3 runs invisibly in the background */}
      {recaptchaSiteKey && !recaptchaReady && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Carregando verificação de segurança...
        </div>
      )}

      <button
        type="submit"
        disabled={
          isSubmitting ||
          !areBasicFieldsValid ||
          selectedSubjects.length === 0 ||
          (!!recaptchaSiteKey && !recaptchaReady)
        }
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg border border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Enviando...
          </div>
        ) : (
          "Enviar Mensagem"
        )}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Seus dados são protegidos e não serão compartilhados com terceiros.
        {recaptchaSiteKey && (
          <>
            <br />
            Este formulário é protegido por reCAPTCHA v3 para evitar spam.
          </>
        )}
      </p>
    </form>
  );
}
