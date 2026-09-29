// src/utils/icons.js
// Cada ícone é uma string SVG, inserida com innerHTML pelo menu.js e pelo theme.ui.js.
//
// Decisões:
// - stroke="currentColor": o ícone herda a cor do texto do botão, então troca
//   sozinho entre tema claro e escuro (sem precisar de um SVG por tema).
// - width/height fixos: sem eles, um SVG sem tamanho pode esticar até o
//   máximo do container (o reset.css deixa svg com display: block).
// - aria-hidden no <span> que envolve o SVG já está no HTML; o nome acessível
//   do botão vem do aria-label, por isso os SVGs não têm <title>.

const svg = (paths) => /* html */ `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    focusable="false"
  >${paths}</svg>
`

export const icons = {
  // Três linhas: menu fechado (clicar abre).
  menuOpen: svg(`
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  `),

  // X: menu aberto (clicar fecha).
  menuClose: svg(`
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  `),

  // Sol: aparece no tema escuro (clicar ativa o claro).
  sun: svg(`
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
  `),

  // Lua: aparece no tema claro (clicar ativa o escuro).
  moon: svg(`
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  `),
}
