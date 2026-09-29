// src/core/storage/storage.events.js
// Nomes de eventos em constantes: um erro de digitação vira erro de import
// (visível na hora), em vez de um ouvinte que nunca dispara.
export const STORAGE_EVENTS = Object.freeze({
  ERROR: "storage:error",
  SUCCESS: "storage:success",
})

// Emite um evento no document para que outra parte do app reaja.
// Assim o storage não conhece o banner (baixo acoplamento).
export function notifyStorage(eventName, message, key) {
  // Sem mensagem, não há nada a mostrar.
  if (!message) return

  document.dispatchEvent(
    new CustomEvent(eventName, { detail: { message, key } }),
  )
}
