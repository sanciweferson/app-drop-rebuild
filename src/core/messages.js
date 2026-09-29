// src/core/messages.js
// Todos os textos de erro e sucesso do app ficam aqui.
// Para mudar uma mensagem, mexa só neste arquivo.
// Quando a mensagem depende do estado (claro/escuro, aberto/fechado),
// ela é uma função que recebe esse estado.

export const MESSAGES = {
  theme: {
    loadError:
      "Não foi possível carregar seu tema. Usando o padrão do sistema.",
    saveError: (isDark) =>
      `Não foi possível salvar o tema ${isDark ? "escuro" : "claro"}.`,
    // Coloque null aqui se não quiser banner verde a cada troca de tema.
    saved: (isDark) => `Tema ${isDark ? "escuro" : "claro"} ativado!`,
    missingElements: "Não foi possível inicializar o tema: elementos ausentes.",
  },

  menu: {
    loadError: "Não foi possível carregar o estado do menu.",
    saveOpenError: "Não foi possível salvar o menu como aberto.",
    saveCloseError: "Não foi possível salvar o menu como fechado.",
    missingElements: "Não foi possível inicializar o menu: elementos ausentes.",
  },
}
