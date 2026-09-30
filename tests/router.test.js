// tests/router.test.js
// Verifica o cache das páginas e a escolha da rota correspondente.
import { beforeEach, describe, expect, it, vi } from "vitest"
import { clearCache, getPage, savePage } from "@core/cache.js"
import { resolveRoute } from "@/core/render.js"

// Limpa dados e timers para que cada teste comece do zero.
beforeEach(() => {
  clearCache()
  vi.useRealTimers()
})

describe("page cache", () => {
  it("saves and retrieves rendered HTML", () => {
    savePage("/", "<h1>Home</h1>") // Guarda HTML de exemplo.
    expect(getPage("/")).toBe("<h1>Home</h1>") // Confirma que foi recuperado.
  })

  it("expires an entry after its time to live", () => {
    vi.useFakeTimers() // Permite avançar o relógio sem esperar cinco minutos.
    vi.setSystemTime(new Date("2026-09-29T12:00:00Z"))
    savePage("/details", "<h1>Details</h1>")

    vi.advanceTimersByTime(5 * 60 * 1000) // Avança exatamente o TTL configurado.
    expect(getPage("/details")).toBeUndefined() // Entrada vencida não é reutilizada.
  })
})

describe("route matching", () => {
  it("matches the Home and Details paths", () => {
    expect(resolveRoute("/").title).toBe("Início")
    expect(resolveRoute("/details/").title).toBe("Detalhes") // Barra final é normalizada.
  })

  it("uses the not-found page for unknown paths", () => {
    expect(resolveRoute("/rota-inexistente").title).toBe("Página não encontrada")
  })
})
