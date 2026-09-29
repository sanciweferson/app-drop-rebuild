// tests/banner.test.js
// Testa o banner (tempo de vida, troca) e a ligação evento -> banner.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { BANNER_DURATION_MS, showBanner } from "@components/banner/banner.js"
import { initNotifications } from "@/app/notifications.js"
import { setItem } from "@core/storage/storage.js"
const getBanner = () => document.querySelector(".banner")

beforeEach(() => {
  // Relógio falso: "avançamos" o tempo sem esperar 6 segundos de verdade.
  vi.useFakeTimers()
  document.body.innerHTML = ""
})

afterEach(() => vi.useRealTimers())

describe("showBanner", () => {
  it("mostra a mensagem com a classe e o role corretos", () => {
    showBanner("Deu ruim", "error")
    expect(getBanner().textContent).toBe("Deu ruim")
    expect(getBanner().classList.contains("banner--error")).toBe(true)
    expect(getBanner().getAttribute("role")).toBe("alert")

    showBanner("Deu bom", "success")
    expect(getBanner().getAttribute("role")).toBe("status")
  })

  it("some sozinho depois do tempo definido", () => {
    showBanner("x")
    vi.advanceTimersByTime(BANNER_DURATION_MS - 1)
    expect(getBanner()).not.toBeNull() // ainda na tela
    vi.advanceTimersByTime(1)
    expect(getBanner()).toBeNull() // sumiu
  })

  it("mantém só um banner e reinicia o tempo ao trocar", () => {
    showBanner("A")
    vi.advanceTimersByTime(3000)
    showBanner("B")

    expect(document.querySelectorAll(".banner")).toHaveLength(1)

    // Passaram 3000 + 3500 ms desde o A: o timer velho já teria disparado.
    vi.advanceTimersByTime(3500)
    expect(getBanner()?.textContent).toBe("B")

    vi.advanceTimersByTime(BANNER_DURATION_MS)
    expect(getBanner()).toBeNull()
  })

  it("não interpreta HTML na mensagem", () => {
    showBanner("<img src=x onerror=alert(1)>")
    expect(getBanner().querySelector("img")).toBeNull()
  })
})

describe("initNotifications (integração)", () => {
  it("mostra banner de erro e de sucesso vindos do storage", () => {
    const stop = initNotifications()

    setItem("k", 1, { successMessage: "Salvo com sucesso!" })
    expect(getBanner().classList.contains("banner--success")).toBe(true)

    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("falha")
    })
    vi.spyOn(console, "error").mockImplementation(() => {})
    setItem("k", 1, { errorMessage: "Erro ao salvar" })
    expect(getBanner().classList.contains("banner--error")).toBe(true)
    expect(getBanner().textContent).toBe("Erro ao salvar")

    stop()
  })

  it("para de ouvir depois da função de limpeza", () => {
    const stop = initNotifications()
    stop()
    setItem("k", 1, { successMessage: "não deve aparecer" })
    expect(getBanner()).toBeNull()
  })
})
