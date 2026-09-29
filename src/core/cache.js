// src/core/cache.js
// Guarda por alguns minutos o HTML de páginas já montadas.

// Máximo de páginas guardadas ao mesmo tempo.
const MAX_ENTRIES = 10

// Tempo de validade: 5 minutos convertidos para milissegundos.
const TTL_MS = 5 * 60 * 1000

// Map armazena pares: caminho da página -> HTML e horário em que foi guardado.
const pageCache = new Map()

// Procura uma página no cache e devolve seu HTML.
export function getPage(path) {
  const entry = pageCache.get(path) // Busca a entrada pelo caminho.

  if (!entry) return undefined // undefined significa que não há conteúdo salvo.

  // Calcula se já passaram 5 minutos desde que esta entrada foi guardada.
  if (Date.now() - entry.createdAt >= TTL_MS) {
    pageCache.delete(path) // Apaga a entrada vencida.
    return undefined // A renderização deverá criar o HTML novamente.
  }

  // Mover a entrada para o final mantém a ordem LRU:
  // páginas usadas recentemente ficam por último no Map.
  pageCache.delete(path)
  pageCache.set(path, entry)

  return entry.html // Devolve o HTML que estava salvo.
}

// Guarda o HTML de uma página no cache.
export function savePage(path, html) {
  if (pageCache.has(path)) {
    pageCache.delete(path) // Remove antes de salvar para atualizar sua posição.
  } else if (pageCache.size >= MAX_ENTRIES) {
    // Quando lotar, remove a primeira entrada, que é a menos usada recentemente.
    const oldestPath = pageCache.keys().next().value
    pageCache.delete(oldestPath)
  }

  // Salva o HTML e o horário atual para poder verificar a validade depois.
  pageCache.set(path, { html, createdAt: Date.now() })
}

// Limpa uma página específica ou o cache inteiro.
export function clearCache(path) {
  if (path === undefined) {
    pageCache.clear() // Sem caminho informado, apaga todas as entradas.
    return
  }

  pageCache.delete(path) // Com caminho informado, apaga somente essa entrada.
}
