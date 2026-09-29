// src/core/theme/theme.ui.js
// Conecta o botão e os ícones à lógica do tema.
import { icons } from "@utils/icons.js"
import { createMobileQuery } from "@utils/breakpoint.js"
import { MESSAGES } from "@core/messages.js"
import {
  THEME_CHANGE_EVENT,
  applyTheme,
  getTheme,
  toggleTheme,
  watchSystemTheme,
} from "./theme.js"

export function initTheme() {
  const button = document.querySelector("#themeToggle")
  const sunIcon = document.querySelector("#iconSun")
  const moonIcon = document.querySelector("#iconMoon")

  if (!button || !sunIcon || !moonIcon) {
    // A mensagem vem do messages.js (só o console.error dentro do if, nunca solto no topo).
    console.error(MESSAGES.theme.missingElements)
    return
  }

  sunIcon.innerHTML = icons.sun
  moonIcon.innerHTML = icons.moon

  // O botão some no mobile.
  const mobileQuery = createMobileQuery()
  if (mobileQuery) {
    const updateVisibility = () => (button.hidden = mobileQuery.matches)
    mobileQuery.addEventListener("change", updateVisibility)
    updateVisibility()
  }

  // No escuro mostra o sol (clicar leva ao claro), e vice-versa.
  function updateIcons(event) {
    const isDark = event?.detail?.isDark ?? getTheme()
    sunIcon.hidden = !isDark
    moonIcon.hidden = isDark
    button.setAttribute(
      "aria-label",
      isDark ? "Ativar tema claro" : "Ativar tema escuro",
    )
  }

  document.addEventListener(THEME_CHANGE_EVENT, updateIcons)
  button.addEventListener("click", toggleTheme)

  watchSystemTheme()
  applyTheme() // dispara THEME_CHANGE_EVENT, que atualiza os ícones
}
