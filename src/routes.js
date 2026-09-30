// src/routes.js
// Este arquivo é a tabela que liga endereços a páginas.
// Mantendo a lista em um lugar só, fica fácil ver quais caminhos existem.
import { HomePage } from "@/pages/home/index.js" // Importa a página inicial.
import { DetailsPage } from "@/pages/details/index.js" // Importa a página de detalhes.
import { NotFoundPage } from "@/pages/not-found/index.js" // Importa a página para caminhos inválidos.

export const routes = [
  // "path" é o caminho na URL; "component" é a função que gera o HTML.
  { path: "/", title: "Início", component: HomePage },

  // Esta rota abre ao visitar /details.
  { path: "/details", title: "Detalhes", component: DetailsPage },

  // "*" é o caminho reserva para qualquer URL que não esteja acima.
  { path: "*", title: "Página não encontrada", component: NotFoundPage },
]
