// src/core/router.js
// Cuida dos cliques em links internos e do histórico Voltar/Avançar.
import { updatePage } from "@core/render.js" // Função que troca o conteúdo da página.

let removeListeners = null // Guarda como desligar os eventos, se o roteador reiniciar.

// Rola até uma seção da página quando a URL contém um hash, como #features.
function scrollToHash(hash) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "auto" }) // Sem hash, volta para o início.
    return
  }

  // Espera o navegador inserir o HTML novo antes de procurar a seção.
  requestAnimationFrame(() => {
    let id // Aqui ficará o nome do id da seção.

    try {
      id = decodeURIComponent(hash.slice(1)) // Tira # e decodifica caracteres especiais.
    } catch {
      id = hash.slice(1) // Se a decodificação falhar, usa o texto original.
    }

    // Se a seção existir, rola até ela; respeita a preferência de movimento reduzido.
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    })
  })
}

// Faz uma navegação interna sem recarregar a página inteira.
export function navigate(url) {
  const target = new URL(url, window.location.href) // Converte a URL em um objeto completo.

  if (target.origin !== window.location.origin) return // Não controla sites externos.

  const currentPath = window.location.pathname // Caminho atual, como /details.
  const currentSearch = window.location.search // Query string atual, se houver.
  const samePage = target.pathname === currentPath && target.search === currentSearch

  // Se já estiver no mesmo caminho e não houver hash novo, não há troca a fazer.
  if (samePage && !target.hash) return

  window.history.pushState({}, "", target.href) // Atualiza o endereço sem recarregar.

  if (!samePage) updatePage(target.pathname) // Só troca o conteúdo se a rota mudou.

  scrollToHash(target.hash) // Depois da troca, rola para a seção indicada.
}

// Trata o clique em um link marcado com data-link.
function handleClick(event) {
  // Mantém o comportamento normal para cliques com teclas modificadoras e outros botões.
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

  if (!(event.target instanceof Element)) return // Só elementos podem conter links.

  const link = event.target.closest("a[data-link]") // Acha o link clicado ou um pai link.
  if (!link || link.target || link.hasAttribute("download")) return

  const target = new URL(link.href, window.location.href) // Resolve o endereço do link.
  if (target.origin !== window.location.origin) return // Deixa links externos ao navegador.

  event.preventDefault() // Evita a recarga normal do browser.
  navigate(target.href) // Usa o roteador para trocar caminho/seção.
}

// Restaura a tela quando a pessoa usa os botões Voltar e Avançar.
function handlePopState() {
  updatePage(window.location.pathname) // Mostra a rota que ficou ativa no histórico.
  scrollToHash(window.location.hash) // Também restaura a seção, quando houver hash.
}

// Registra os eventos e desenha a rota correspondente ao endereço atual.
export function initRouter() {
  removeListeners?.() // Evita registrar os mesmos eventos duas vezes.

  const controller = new AbortController() // Agrupa os eventos para removê-los depois.
  document.addEventListener("click", handleClick, { signal: controller.signal })
  window.addEventListener("popstate", handlePopState, { signal: controller.signal })

  updatePage(window.location.pathname) // Renderiza a rota ao abrir ou atualizar o site.
  scrollToHash(window.location.hash) // Abre diretamente na seção, se a URL pedir.

  removeListeners = () => controller.abort() // Cria a função de limpeza.
  return removeListeners // Permite desligar os eventos se necessário.
}
