import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-8">Página não encontrada</h2>
        <p className="text-lg mb-8 text-gray-300">
          A página que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
