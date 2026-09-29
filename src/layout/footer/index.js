// src/layout/footer/index.js
import "./footer.css"

export function Footer() {
  const year = new Date().getFullYear()

  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p>© ${year} Leno App</p>
        <a href="/#inicio" data-link>Voltar ao início ↑</a>
      </div>
    </footer>
  `
}
