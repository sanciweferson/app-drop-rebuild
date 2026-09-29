// src/core/render.js
import { routes } from "@/routes.js"
import { getPage, savePage } from "@core/cache.js"

export function normalizePath(pathname) {
  const path = pathname.split("?")[0].split("#")[0]
  return path.length > 1 ? path.replace(/\/+$/, "") : "/"
}

export function resolveRoute(pathname) {
  const path = normalizePath(pathname)
  return routes.find((route) => route.path === path)
    ?? routes.find((route) => route.path === "*")
}

export function renderPage(pathname = window.location.pathname) {
  const path = normalizePath(pathname)
  const cachedHtml = getPage(path)
  if (cachedHtml !== undefined) return cachedHtml

  const route = resolveRoute(path)
  const html = route.component()
  savePage(path, html)
  return html
}

export function updatePage(pathname = window.location.pathname) {
  const outlet = document.querySelector("#page-outlet")
  if (!outlet) {
    console.error('[render] Elemento "#page-outlet" não encontrado.')
    return null
  }

  const route = resolveRoute(pathname)
  outlet.innerHTML = renderPage(pathname)
  document.title = `${route.title} | Leno App`
  return route
}
