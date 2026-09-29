// src/app/notifications.js
// Liga os eventos do storage ao banner. É o único lugar que conhece os dois.
import { showBanner } from "@components/banner/banner.js"
import { STORAGE_EVENTS } from "@core/storage/storage.events.js"

// Retorna uma função de limpeza. Útil nos testes (evita ouvintes duplicados
// entre um teste e outro) e se um dia o app precisar se "desligar".
export function initNotifications() {
  const controller = new AbortController()
  const options = { signal: controller.signal }

  document.addEventListener(
    STORAGE_EVENTS.ERROR,
    (event) => showBanner(event.detail.message, "error"),
    options,
  )
  document.addEventListener(
    STORAGE_EVENTS.SUCCESS,
    (event) => showBanner(event.detail.message, "success"),
    options,
  )

  // abort() remove os dois ouvintes de uma vez.
  return () => controller.abort()
}
