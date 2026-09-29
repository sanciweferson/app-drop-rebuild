// src/routes.js
// Tabela única que associa cada URL ao conteúdo e ao título da página.
import { HomePage } from "@/pages/home/index.js"
import { DetailsPage } from "@/pages/details/index.js"
import { NotFoundPage } from "@/pages/not-found/index.js"

export const routes = [
  { path: "/", title: "Início", component: HomePage },
  { path: "/details", title: "Detalhes", component: DetailsPage },
  { path: "*", title: "Página não encontrada", component: NotFoundPage },
]
