// src/pages/not-found/index.js
import "../home/pages.css" // Usa os estilos compartilhados de botões e tipografia.

// Página exibida para qualquer endereço sem rota correspondente.
export function NotFoundPage() {
  return `
    <section class="not-found" aria-labelledby="not-found-title">
      <p class="eyebrow">ERRO 404</p>
      <h1 id="not-found-title">Essa página não foi encontrada.</h1>
      <p>Confira o endereço ou volte para a página inicial.</p>
      <a class="button button--primary" href="/" data-link>Voltar à Home</a>
    </section>
  `
}
