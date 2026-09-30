// src/layout/footer/index.js
import "./footer.css" // Carrega somente o estilo do rodapé.

// Gera o rodapé e atualiza o ano automaticamente.
export function Footer() {
  const year = new Date().getFullYear() // Evita deixar o ano fixo no código.

  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p>© ${year} Leno App</p>
        <a href="/#inicio" data-link>Voltar ao início ↑</a>
      </div>
    </footer>
  `
}
