// src/layout/header/index.js
import { menuItems } from "@components/data/data.js"
import { getIcon } from "@components/icons/icons.js"
import "./header.css"

function renderNavItem(item) {
  const isRoute = item.href === "/" || item.href === "/details"
  const isSectionLink = item.href.startsWith("#")
  const href = isSectionLink ? `/${item.href}` : item.href
  const routeAttribute = isRoute || isSectionLink ? ' data-link' : ""

  return `
    <a class="site-nav__link site-nav__link--${item.id}" href="${href}"${routeAttribute}>
      ${getIcon(item.id)}
      <span>${item.label}</span>
    </a>
  `
}

export function Header() {
  return `
    <a class="skip-link" href="#main-content">Pular para o conteúdo</a>

    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-header__brand" href="/" data-link aria-label="Leno App — início">
          <img src="/assets/images/logo.svg" alt="Leno App" width="148" height="40">
        </a>

        <div class="site-header__actions">
          <button
            class="site-header__icon-button"
            id="themeToggle"
            type="button"
            aria-label="Ativar tema escuro"
          >
            <span id="iconSun" hidden></span>
            <span id="iconMoon"></span>
          </button>

          <button
            class="site-header__icon-button site-header__menu-toggle"
            id="menuToggle"
            type="button"
            aria-controls="navigationMenu"
            aria-expanded="false"
            aria-label="Abrir menu"
            hidden
          >
            <span class="open"></span>
            <span class="close" hidden></span>
          </button>
        </div>

        <nav class="site-nav" id="navigationMenu" aria-label="Navegação principal" hidden>
          ${menuItems.map(renderNavItem).join("")}
        </nav>
      </div>
    </header>
  `
}
