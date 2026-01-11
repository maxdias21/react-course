import './globals.css'

// Aqui estão algumas informações importantes sobre o metadata:
// O "title" define o título da página. Em HTML, ele aparece assim:
// <title>My Title</title>
// O "description" ajuda os mecanismos de busca (como o Google) a entender melhor do que se trata sua página.
// Ele é usado para gerar esta meta tag no HTML:
// <meta name="description" content="Your first NextJS app!">
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

// Isso é compartilhado com o arquivo page.js, algo semelhante ao "extends" do Django.
// Não precisamos criar a tag <head> manualmente, pois o Next.js já cria a estrutura de metadata para nós.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
