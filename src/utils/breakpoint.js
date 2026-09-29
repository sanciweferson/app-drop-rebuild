// src/utils/breakpoint.js
// Antes, menu e tema repetiam este código. Agora existe um só lugar.
// Lê --container-md do CSS (fonte única da verdade) e cria a media query.
export function createMobileQuery() {
  const breakpoint = getComputedStyle(document.documentElement)
    .getPropertyValue("--container-md")
    .trim()

  if (!breakpoint) {
    console.error("O token CSS --container-md não foi encontrado.")
    return null
  }

  return window.matchMedia(`(max-width: ${breakpoint})`)
}
