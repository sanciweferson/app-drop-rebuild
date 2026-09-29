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

  let isOpen = mobileQuery.matches && getItem(MENU_STORAGE_KEY, {
    errorMessage: MESSAGES.menu.loadError,
  }) === true

  function saveState() {
    setItem(MENU_STORAGE_KEY, isOpen, {
      errorMessage: isOpen
        ? MESSAGES.menu.saveOpenError
        : MESSAGES.menu.saveCloseError,
    })
  }

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

  // Fecha o menu depois da escolha de uma rota no mobile.
  nav.addEventListener("click", (event) => {
    if (!mobileQuery.matches || !(event.target instanceof Element)) return
    if (!event.target.closest("a[data-link]")) return

    isOpen = false
    render()
    saveState()
  })

  mobileQuery.addEventListener("change", () => {
    isOpen = false
    render()
    saveState()
  })

  render()
}
