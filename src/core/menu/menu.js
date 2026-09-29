// src/core/menu/menu.js
import { getItem, setItem } from "@core/storage/storage.js"
import { MESSAGES } from "@core/messages.js"
import { icons } from "@utils/icons.js"
import { createMobileQuery } from "@utils/breakpoint.js"

const MENU_STORAGE_KEY = "nav-menu-open"

export function initMenu() {
  const button = document.querySelector("#menuToggle")
  const nav = document.querySelector("#navigationMenu")
  const openIcon = button?.querySelector(".open")
  const closeIcon = button?.querySelector(".close")

  if (!button || !nav || !openIcon || !closeIcon) {
    console.error(MESSAGES.menu.missingElements)
    return
  }

  const mobileQuery = createMobileQuery()
  if (!mobileQuery) return

  openIcon.innerHTML = icons.menuOpen
  closeIcon.innerHTML = icons.menuClose

  // A mensagem de erro muda conforme o estado que estamos tentando salvar.
  const saveState = () =>
    setItem(MENU_STORAGE_KEY, isOpen, {
      errorMessage: isOpen
        ? MESSAGES.menu.saveOpenError
        : MESSAGES.menu.saveCloseError,
    })

  // Restaura o estado salvo só no mobile; no desktop os links já aparecem.
  const saved = getItem(MENU_STORAGE_KEY, {
    errorMessage: MESSAGES.menu.loadError,
  })
  let isOpen = mobileQuery.matches && saved === true
  if (!mobileQuery.matches && saved === true) saveState() // corrige "aberto" antigo

  // Fonte única de atualização da tela: muda o estado, chama render().
  function render() {
    const isMobile = mobileQuery.matches
    button.hidden = !isMobile
    openIcon.hidden = isOpen
    closeIcon.hidden = !isOpen
    button.setAttribute("aria-expanded", String(isMobile && isOpen))
    button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu")
    nav.hidden = isMobile && !isOpen
  }

  button.addEventListener("click", () => {
    isOpen = !isOpen
    render()
    saveState()
  })

  // Ao cruzar o breakpoint, volta para fechado.
  mobileQuery.addEventListener("change", () => {
    isOpen = false
    render()
    saveState()
  })

  render()
}
