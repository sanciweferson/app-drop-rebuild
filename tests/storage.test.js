// tests/storage.test.js
// Testa o storage isolado: dados salvos, erros e eventos emitidos.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { getItem, removeItem, setItem } from "@core/storage/storage.js"
import { STORAGE_EVENTS } from "@core/storage/storage.events.js"

let controller // remove os ouvintes ao fim de cada teste

// Registra um ouvinte espião e devolve o espião, para checar se foi chamado.
function spyOnEvent(eventName) {
  const spy = vi.fn()
  document.addEventListener(eventName, spy, { signal: controller.signal })
  return spy
}

beforeEach(() => {
  controller = new AbortController()
  localStorage.clear()
  // Os erros são propositais: silenciamos o console para não poluir o teste.
  vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => controller.abort())

describe("setItem / getItem", () => {
  it("salva e lê tipos diferentes com o mesmo formato", () => {
    setItem("obj", { a: 1 })
    setItem("bool", false)
    expect(getItem("obj")).toEqual({ a: 1 })
    expect(getItem("bool")).toBe(false) // false NÃO pode virar null
  })

  it("devolve null quando a chave não existe, sem emitir erro", () => {
    const onError = spyOnEvent(STORAGE_EVENTS.ERROR)
    expect(getItem("nao-existe")).toBeNull()
    expect(onError).not.toHaveBeenCalled()
  })

  it("emite sucesso só quando há successMessage", () => {
    const onSuccess = spyOnEvent(STORAGE_EVENTS.SUCCESS)

    setItem("k", 1) // sem mensagem
    expect(onSuccess).not.toHaveBeenCalled()

    setItem("k", 1, { successMessage: "Salvo!" })
    expect(onSuccess).toHaveBeenCalledOnce()
    expect(onSuccess.mock.calls[0][0].detail).toEqual({ message: "Salvo!", key: "k" })
  })

  it("emite erro e retorna false quando a gravação falha", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("cota cheia")
    })
    const onError = spyOnEvent(STORAGE_EVENTS.ERROR)

    const result = setItem("k", 1, { errorMessage: "Falhou ao salvar" })

    expect(result).toBe(false)
    expect(onError.mock.calls[0][0].detail.message).toBe("Falhou ao salvar")
  })

  it("emite erro e devolve null quando o JSON está corrompido", () => {
    localStorage.setItem("theme", "{invalido") // grava direto, sem JSON válido
    const onError = spyOnEvent(STORAGE_EVENTS.ERROR)

    expect(getItem("theme", { errorMessage: "Leitura falhou" })).toBeNull()
    expect(onError.mock.calls[0][0].detail.message).toBe("Leitura falhou")
  })
})

describe("removeItem", () => {
  it("remove a chave e emite sucesso quando há mensagem", () => {
    setItem("k", 1)
    const onSuccess = spyOnEvent(STORAGE_EVENTS.SUCCESS)

    expect(removeItem("k", { successMessage: "Removido" })).toBe(true)
    expect(getItem("k")).toBeNull()
    expect(onSuccess).toHaveBeenCalledOnce()
  })

  it("emite erro quando a remoção falha", () => {
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("bloqueado")
    })
    const onError = spyOnEvent(STORAGE_EVENTS.ERROR)

    expect(removeItem("k")).toBe(false)
    expect(onError).toHaveBeenCalledOnce()
  })
})
