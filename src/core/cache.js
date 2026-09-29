// src/core/cache.js
// Cache em memória para não recriar o HTML de páginas estáticas a cada visita.
const MAX_ENTRIES = 10
const TTL_MS = 5 * 60 * 1000
const pageCache = new Map()

export function getPage(path) {
  const entry = pageCache.get(path)
  if (!entry) return undefined

  if (Date.now() - entry.createdAt >= TTL_MS) {
    pageCache.delete(path)
    return undefined
  }

  // Reinsere a chave no fim para atualizar sua posição no LRU.
  pageCache.delete(path)
  pageCache.set(path, entry)
  return entry.html
}

export function savePage(path, html) {
  if (pageCache.has(path)) {
    pageCache.delete(path)
  } else if (pageCache.size >= MAX_ENTRIES) {
    const oldestPath = pageCache.keys().next().value
    pageCache.delete(oldestPath)
  }

  pageCache.set(path, { html, createdAt: Date.now() })
}

export function clearCache(path) {
  if (path === undefined) {
    pageCache.clear()
    return
  }

  pageCache.delete(path)
}
