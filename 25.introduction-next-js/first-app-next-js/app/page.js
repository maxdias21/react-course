import Link from "next/link";

// O símbolo "@" é um alias configurado no Next.js para referir-se à raiz do projeto.
// Isso significa que, ao importar com "@", você não precisa escrever o caminho completo para a raiz.
import Header from "@/components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>

      {/* Evite usar <a> diretamente com URLs internas no React. Isso faz a página recarregar completamente, perdendo a vantagem de ser uma SPA. */}
      {/* Você pode notar isso ao clicar no link e ver a bolinha do navegador girando. */}
      {/* Exemplo de uso problemático: */}
      {/* <p><a href="/about">About Us</a></p> */}

      {/* Use o componente <Link> do Next.js para navegação interna. */}
      {/* Ele evita recarregar a página, mantendo os componentes e o estado atualizados. */}
      <p><Link href="/about">About Us</Link></p>

    </main>
  );
}
