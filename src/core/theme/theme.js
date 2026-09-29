// src/core/theme/theme.js
// Lógica do tema, sem mexer em ícones ou botões (isso é do theme.ui.js).
import { getItem, setItem } from "@/core/storage/storage.js"
import { MESSAGES } from "@core/messages.js"

const THEME_STORAGE_KEY = "theme-preference"
export const THEME_CHANGE_EVENT = "theme:change"

// Opções de leitura: só a mensagem de erro (leitura não tem "sucesso").
const LOAD_OPTIONS = { errorMessage: MESSAGES.theme.loadError }

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

// true = escuro. Sem escolha salva, segue o sistema.
export function getTheme() {
  const saved = getItem(THEME_STORAGE_KEY, LOAD_OPTIONS)
  return saved === null ? getSystemTheme() : saved
}

export function applyTheme(isDark = getTheme()) {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
  document.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { isDark } }),
  )
}

// Inverte a partir do que está NA TELA (data-theme), não do storage.
// Assim o botão funciona mesmo se o localStorage estiver quebrado.
export function toggleTheme() {
  const isDarkNow =
    document.documentElement.getAttribute("data-theme") === "dark"
  const next = !isDarkNow

  // As mensagens são geradas aqui, porque dependem do tema NOVO (next).
  setItem(THEME_STORAGE_KEY, next, {
    errorMessage: MESSAGES.theme.saveError(next),
    successMessage: MESSAGES.theme.saved(next),
  })
  applyTheme(next) // o tema muda na tela mesmo que o salvamento falhe
}

// Acompanha o sistema operacional enquanto não houver escolha manual.
// Retorna a função de limpeza.
export function watchSystemTheme() {
  const query = window.matchMedia("(prefers-color-scheme: dark)")

  const onChange = (event) => {
    if (getItem(THEME_STORAGE_KEY, LOAD_OPTIONS) === null) {
      applyTheme(event.matches)
    }
  }

  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}
