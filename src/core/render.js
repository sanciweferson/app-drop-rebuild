// src/core/render.js
// Decide qual página corresponde à URL e coloca seu HTML no espaço principal.
import { routes } from "@/routes.js" // Tabela de caminhos disponíveis.
import { getPage, savePage } from "@core/cache.js" // Funções do cache de páginas.

// Padroniza o caminho para evitar diferenças como /details e /details/.
export function normalizePath(pathname) {
  const path = pathname.split("?")[0].split("#")[0] // Remove query string e hash.

  // Remove barras finais, exceto na Home, cujo caminho é "/".
  return path.length > 1 ? path.replace(/\/+$/, "") : "/"
}

// Encontra a configuração da rota que corresponde ao caminho.
export function resolveRoute(pathname) {
  const path = normalizePath(pathname) // Compara sempre caminhos padronizados.

  // Primeiro tenta achar uma rota exata; se não achar, usa a rota "*".
  return routes.find((route) => route.path === path)
    ?? routes.find((route) => route.path === "*")
}

// Gera o HTML da rota ou reaproveita o HTML que já está no cache.
export function renderPage(pathname = window.location.pathname) {
  const path = normalizePath(pathname) // Usa somente o caminho, sem query ou hash.
  const cachedHtml = getPage(path) // Tenta recuperar uma versão salva.

  if (cachedHtml !== undefined) return cachedHtml // Cache válido: não recria o HTML.

  const route = resolveRoute(path) // Descobre qual função de página usar.
  const html = route.component() // Executa a função e recebe a marcação HTML.
  savePage(path, html) // Guarda o resultado para uma próxima navegação.

  return html // Entrega o HTML ao chamador.
}

// Atualiza somente a área interna; cabeçalho e rodapé continuam montados.
export function updatePage(pathname = window.location.pathname) {
  const outlet = document.querySelector("#page-outlet") // Localiza a área de páginas.

  if (!outlet) {
    console.error('[render] Elemento "#page-outlet" não encontrado.')
    return null // Sem essa área não há onde colocar a página.
  }

  const route = resolveRoute(pathname) // Também usamos a rota para definir o título.
  outlet.innerHTML = renderPage(pathname) // Mostra o HTML no navegador.
  document.title = `${route.title} | Leno App` // Atualiza o título da aba.

  return route // Informa qual rota foi mostrada.
}
