// src/main.js — monta a estrutura compartilhada e inicia os módulos.
import "@styles/style.css"
import { initNotifications } from "@/app/notifications.js"
import { initMenu } from "@core/menu/menu.js"
import { initTheme } from "@core/theme/theme.ui.js"
import { Layout } from "@layout/index.js"
import { initRouter } from "@core/router.js"

const app = document.querySelector("#app")

if (!app) {
  throw new Error('Elemento raiz "#app" não encontrado.')
}

app.innerHTML = Layout({
  children: '<div id="page-outlet"></div>',
})

// A marcação já existe, então menu e tema encontram seus elementos.
initNotifications()
initMenu()
initTheme()
initRouter()

// Ferramenta de teste manual: só entra no bundle em desenvolvimento.
if (import.meta.env.DEV) import("@/dev/storage-demo.js")
