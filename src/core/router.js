// src/core/router.js
// Controla os links internos, o histórico do navegador e a renderização.
import { updatePage } from "@core/render.js"

let removeListeners = null

function scrollToHash(hash) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "auto" })
    return
  }

  requestAnimationFrame(() => {
    let id
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
      id = hash.slice(1)
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    })
  })
}

export function navigate(url) {
  const target = new URL(url, window.location.href)
  if (target.origin !== window.location.origin) return

  const currentPath = window.location.pathname
  const currentSearch = window.location.search
  const samePage = target.pathname === currentPath && target.search === currentSearch

  if (samePage && !target.hash) return

  window.history.pushState({}, "", target.href)

  if (!samePage) updatePage(target.pathname)

  scrollToHash(target.hash)
}

function handleClick(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  if (!(event.target instanceof Element)) return
  const link = event.target.closest("a[data-link]")
  if (!link || link.target || link.hasAttribute("download")) return

  const target = new URL(link.href, window.location.href)
  if (target.origin !== window.location.origin) return

  event.preventDefault()
  navigate(target.href)
}

function handlePopState() {
  updatePage(window.location.pathname)
  scrollToHash(window.location.hash)
}

export function initRouter() {
  removeListeners?.()

  const controller = new AbortController()
  document.addEventListener("click", handleClick, { signal: controller.signal })
  window.addEventListener("popstate", handlePopState, { signal: controller.signal })

  updatePage(window.location.pathname)
  scrollToHash(window.location.hash)

  removeListeners = () => controller.abort()
  return removeListeners
}
