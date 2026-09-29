// src/components/banner/banner.js
import "./banner.css"

export const BANNER_DURATION_MS = 6000

// Guardamos o id do timer FORA da função. Sem isso, o timer do banner antigo
// continuaria vivo e poderia remover o banner novo antes da hora.
let hideTimer = null

// Mostra um aviso. type: "error" | "success".
export function showBanner(message, type = "error") {
  // Cancela o timer anterior e remove o banner anterior (nunca empilha).
  window.clearTimeout(hideTimer)
  document.querySelector(".banner")?.remove()

  const banner = document.createElement("div")
  banner.classList.add("banner", `banner--${type}`)

  // textContent insere texto puro: HTML na mensagem não é interpretado (evita XSS).
  banner.textContent = message

  // "alert" interrompe o leitor de tela (erro); "status" espera (sucesso).
  banner.setAttribute("role", type === "error" ? "alert" : "status")

  document.body.appendChild(banner)

  hideTimer = window.setTimeout(() => banner.remove(), BANNER_DURATION_MS)
}
