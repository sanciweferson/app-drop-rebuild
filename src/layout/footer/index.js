// src/layout/footer/index.js
import "./footer.css"

export function Footer() {
  const year = new Date().getFullYear()

  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p>© ${year} App Drop</p>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  `
}
