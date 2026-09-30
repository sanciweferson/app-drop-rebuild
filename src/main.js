// src/main.js — ponto de entrada da aplicação.
// Este arquivo monta o layout e inicializa os módulos principais.
import "@styles/style.css" // Carrega os estilos globais.
import { initNotifications } from "@/app/notifications.js" // Liga os avisos de storage.
import { initMenu } from "@core/menu/menu.js" // Liga o menu responsivo.
import { initTheme } from "@core/theme/theme.ui.js" // Liga a troca de tema.
import { Layout } from "@layout/index.js" // Gera cabeçalho, área principal e rodapé.
import { initRouter } from "@core/router.js" // Liga a navegação entre rotas.

const app = document.querySelector("#app") // Encontra o elemento raiz do index.html.

if (!app) {
  throw new Error('Elemento raiz "#app" não encontrado.') // Interrompe se a raiz faltar.
}

// Monta o layout uma vez; o roteador troca só o conteúdo de #page-outlet.
app.innerHTML = Layout({
  children: '<div id="page-outlet"></div>',
})

// Inicializamos os módulos depois da montagem para que encontrem seus elementos.
initNotifications()
initMenu()
initTheme()
initRouter()

// Importa a ferramenta de demonstração somente durante o desenvolvimento local.
if (import.meta.env.DEV) import("@/dev/storage-demo.js")
