// tests/router.test.js
import { beforeEach, describe, expect, it, vi } from "vitest"
import { clearCache, getPage, savePage } from "@core/cache.js"
import { resolveRoute } from "@/core/render.js"

beforeEach(() => {
  clearCache()
  vi.useRealTimers()
})

describe("page cache", () => {
  it("saves and retrieves rendered HTML", () => {
    savePage("/", "<h1>Home</h1>")
    expect(getPage("/")).toBe("<h1>Home</h1>")
  })

  it("expires an entry after its time to live", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-09-29T12:00:00Z"))
    savePage("/details", "<h1>Details</h1>")

    vi.advanceTimersByTime(5 * 60 * 1000)
    expect(getPage("/details")).toBeUndefined()
  })
})

describe("route matching", () => {
  it("matches the Home and Details paths", () => {
    expect(resolveRoute("/").title).toBe("Início")
    expect(resolveRoute("/details/").title).toBe("Detalhes")
  })

  it("uses the not-found page for unknown paths", () => {
    expect(resolveRoute("/rota-inexistente").title).toBe("Página não encontrada")
  })
})
