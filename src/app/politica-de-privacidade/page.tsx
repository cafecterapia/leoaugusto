"use client";

export default function PoliticaDePrivacidade() {
  const handleBackToHome = () => {
    // Navigate back to home and scroll to top
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Voltar à página inicial"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Voltar ao início</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Política de Privacidade
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            <strong>Última atualização:</strong> Junho de 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Informações que Coletamos
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Em nosso site de advocacia militar, coletamos apenas as
              informações essenciais para prestar nossos serviços jurídicos:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Dados de Contato:</strong> Nome, e-mail e telefone
                fornecidos através do formulário de contato
              </li>
              <li>
                <strong>Serviços de Interesse:</strong> Informações sobre os
                serviços jurídicos que você seleciona
              </li>
              <li>
                <strong>Mensagens:</strong> Conteúdo das mensagens enviadas
                através do formulário
              </li>
              <li>
                <strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador
                e informações de acesso (apenas para segurança)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Como Utilizamos suas Informações
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Utilizamos suas informações exclusivamente para:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>Responder às suas consultas jurídicas</li>
              <li>
                Fornecer informações sobre nossos serviços de advocacia militar
              </li>
              <li>Agendar consultas e atendimentos</li>
              <li>Manter comunicação profissional sobre seus casos</li>
              <li>Cumprir obrigações legais da profissão advocatícia</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Áreas de Atuação
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nossos serviços especializados incluem:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>Ressarcimento de Preterição</li>
              <li>
                Acompanhamento de procedimentos administrativos (Sindicância e
                IPM) e judiciais
              </li>
              <li>Conselho de Disciplina e Conselho de Justificação</li>
              <li>Remoção/Movimentação com ou sem ônus</li>
              <li>Reintegração/Reinclusão ao SAM, EB e FAB</li>
              <li>
                Impedimentos a Cursos de Formação de Cabo, Sargento e Oficiais
              </li>
              <li>Reforma de Militares na Esfera Administrativa/Judicial</li>
              <li>Descontos e/ou cobranças indevidas</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Proteção de Dados
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Como advogado inscrito na OAB RJ 266.250, mantemos o mais rigoroso
              sigilo profissional:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                Todas as comunicações são protegidas pelo sigilo advocatício
              </li>
              <li>
                Utilizamos conexões seguras (HTTPS) para transmissão de dados
              </li>
              <li>
                Não compartilhamos informações com terceiros, exceto quando
                exigido por lei
              </li>
              <li>
                Implementamos medidas de segurança técnicas e organizacionais
                adequadas
              </li>
              <li>
                Cumprimos rigorosamente a Lei Geral de Proteção de Dados (LGPD)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Cookies e Tecnologias
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nosso site utiliza:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Cookies essenciais:</strong> Para funcionamento básico
                do site
              </li>
              <li>
                <strong>reCAPTCHA:</strong> Para proteção contra spam no
                formulário de contato
              </li>
              <li>
                <strong>Scroll suave:</strong> Para melhor experiência de
                navegação
              </li>
              <li>Não utilizamos cookies de rastreamento ou publicidade</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Seus Direitos
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Conforme a LGPD, você tem direito a:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>Confirmação da existência de tratamento de dados</li>
              <li>Acesso aos seus dados pessoais</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>
                Eliminação de dados desnecessários ou tratados em
                desconformidade
              </li>
              <li>Informações sobre compartilhamento de dados</li>
              <li>Revogação do consentimento quando aplicável</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Retenção de Dados
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Mantemos seus dados pessoais apenas pelo tempo necessário para:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>Prestar os serviços advocatícios solicitados</li>
              <li>
                Cumprir obrigações legais da profissão (conforme Código de Ética
                da OAB)
              </li>
              <li>Exercer direitos em processos judiciais</li>
              <li>Atender determinações de órgãos fiscalizadores</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Contato
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta
                política:
              </p>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Dr. Leonardo Augusto</strong>
                </p>
                <p>
                  <strong>OAB RJ 266.250</strong>
                </p>
                <p>
                  <strong>E-mail:</strong> Imf.advocaciamilitar@gmail.com
                </p>
                <p>
                  <strong>WhatsApp:</strong> +55 21 97126-2427
                </p>
                <p>
                  <strong>Endereço:</strong> Rua Teófilo Otoni, 52 Sala 201,
                  Centro RJ
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Alterações na Política
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Esta política pode ser atualizada periodicamente. Recomendamos
              revisar regularmente para se manter informado sobre como
              protegemos suas informações. A data da última atualização está
              indicada no início deste documento.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Voltar à página inicial
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
