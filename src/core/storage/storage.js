// src/core/storage/storage.js
// Camada única de acesso ao localStorage. Guarda JSON, nunca lança exceção
// para fora e avisa o app por eventos.
import { STORAGE_EVENTS, notifyStorage } from "./storage.events.js"

export const DEFAULT_ERROR_MESSAGE =
  "Não foi possível realizar a operação no armazenamento."

// Salva um valor. Retorna true se salvou, false se falhou.
// As mensagens vão num objeto de opções: setItem("k", v, { successMessage })
// é mais legível que setItem("k", v, undefined, "ok").
export function setItem(
  key,
  value,

  { errorMessage = DEFAULT_ERROR_MESSAGE, successMessage = null } = {},
) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    notifyStorage(STORAGE_EVENTS.SUCCESS, successMessage, key)
    return true
  } catch (error) {
    // Causas comuns: cota cheia, modo privado, JSON.stringify com ciclo.
    notifyStorage(STORAGE_EVENTS.ERROR, errorMessage, key)
    console.error(`[storage] Falha ao salvar "${key}":`, error)
    return false
  }
}

// Lê e converte de JSON. Devolve null se a chave não existe OU se falhar.
export function getItem(key, { errorMessage = DEFAULT_ERROR_MESSAGE } = {}) {
  try {
    const text = localStorage.getItem(key)
    if (text === null) return null
    return JSON.parse(text)
  } catch (error) {
    // Causas comuns: JSON corrompido ou acesso bloqueado pelo navegador.
    notifyStorage(STORAGE_EVENTS.ERROR, errorMessage, key)
    console.error(`[storage] Falha ao carregar "${key}":`, error)
    return null
  }
}

// Remove uma chave. Chave inexistente não é erro.
export function removeItem(
  key,
  { errorMessage = DEFAULT_ERROR_MESSAGE, successMessage = null } = {},
) {
  try {
    localStorage.removeItem(key)
    notifyStorage(STORAGE_EVENTS.SUCCESS, successMessage, key)
    return true
  } catch (error) {
    notifyStorage(STORAGE_EVENTS.ERROR, errorMessage, key)
    console.error(`[storage] Falha ao remover "${key}":`, error)
    return false
  }
}
