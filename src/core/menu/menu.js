// src/core/menu/menu.js
// Controla abertura, fechamento e estado salvo do menu mobile.
import { getItem, setItem } from "@core/storage/storage.js" // Lê e grava o estado.
import { MESSAGES } from "@core/messages.js" // Textos centralizados para erros.
import { icons } from "@utils/icons.js" // Ícones SVG do menu.
import { createMobileQuery } from "@utils/breakpoint.js" // Breakpoint vindo do CSS.

const MENU_STORAGE_KEY = "nav-menu-open" // Chave usada no localStorage.

export function initMenu() {
  const button = document.querySelector("#menuToggle") // Botão abre/fecha.
  const nav = document.querySelector("#navigationMenu") // Lista de links.
  const openIcon = button?.querySelector(".open") // Ícone de menu fechado.
  const closeIcon = button?.querySelector(".close") // Ícone de menu aberto.

  if (!button || !nav || !openIcon || !closeIcon) {
    console.error(MESSAGES.menu.missingElements) // Avisa se faltar marcação esperada.
    return // Sem os elementos, não há como inicializar.
  }

  const mobileQuery = createMobileQuery() // Consulta se a tela está no breakpoint mobile.
  if (!mobileQuery) return // Sem breakpoint configurado, encerra com segurança.

  openIcon.innerHTML = icons.menuOpen // Coloca o SVG de abrir.
  closeIcon.innerHTML = icons.menuClose // Coloca o SVG de fechar.

  // No mobile, restaura se o menu ficou aberto; no desktop começa fechado.
  let isOpen = mobileQuery.matches && getItem(MENU_STORAGE_KEY, {
    errorMessage: MESSAGES.menu.loadError,
  }) === true

  function saveState() {
    // Persiste o estado booleano e escolhe a mensagem de erro adequada.
    setItem(MENU_STORAGE_KEY, isOpen, {
      errorMessage: isOpen
        ? MESSAGES.menu.saveOpenError
        : MESSAGES.menu.saveCloseError,
    })
  }

  function render() {
    const isMobile = mobileQuery.matches // O layout muda conforme a largura.

    button.hidden = !isMobile // O botão do menu aparece somente no mobile.
    openIcon.hidden = isOpen // Aberto: esconde o ícone de abrir.
    closeIcon.hidden = !isOpen // Fechado: esconde o ícone de fechar.
    button.setAttribute("aria-expanded", String(isMobile && isOpen)) // Informa o estado a tecnologias assistivas.
    button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu") // Nome acessível do botão.
    nav.hidden = isMobile && !isOpen // Esconde a lista no mobile quando fechada.
  }

  button.addEventListener("click", () => {
    isOpen = !isOpen // Inverte aberto/fechado.
    render() // Atualiza o que está visível.
    saveState() // Grava a escolha.
  })

  // Escolher um link interno fecha o menu para liberar a tela do celular.
  nav.addEventListener("click", (event) => {
    if (!mobileQuery.matches || !(event.target instanceof Element)) return
    if (!event.target.closest("a[data-link]")) return // Ignora cliques fora dos links de rota.

    isOpen = false // Fecha o menu.
    render() // Atualiza botão e lista.
    saveState() // Mantém salvo o estado fechado.
  })

  // Ao passar de mobile para desktop (ou o contrário), reseta o menu fechado.
  mobileQuery.addEventListener("change", () => {
    isOpen = false
    render()
    saveState()
  })

  render() // Desenha o estado inicial.
}
