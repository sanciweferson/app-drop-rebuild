// src/main.js — ponto de entrada. Só monta a página e liga os módulos.
import "@styles/style.css"
import { initNotifications } from "@/app/notifications.js"
import { initMenu } from "@core/menu/menu.js"
import { initTheme } from "@core/theme/theme.ui.js"

document.querySelector("#app").innerHTML = /* html */ `

`

// ORDEM IMPORTA:
// 1) ouvintes de notificação ANTES de qualquer uso do storage,
//    senão um erro na inicialização não gera banner;
// 2) o HTML já existe acima, então menu e tema encontram seus elementos.
initNotifications()
initMenu()
initTheme()

// Ferramenta de teste manual: só entra no bundle em desenvolvimento.
if (import.meta.env.DEV) import("@/dev/storage-demo.js")
