// src/layout/index.js
import { Header } from "./header/index.js"
import { Footer } from "./footer/index.js"
import "./layout.css"

export function Layout({ children = "" } = {}) {
  return `
    <div class="site-layout">
      ${Header()}
      <main class="site-main" id="main-content" tabindex="-1">
        ${children}
      </main>
      ${Footer()}
    </div>
  `
}
