import "@testing-library/jest-dom"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { SlideScreen } from ".."
import { list } from "@/src/mocks/slides"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterEach } from "node:test"

const server = setupServer(
  http.get("/cat", () => {
    return HttpResponse.json({ name: "persian" })
  })
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe("test SlideScreen component", () => {
  it("renders slides", () => {
    const screen = render(<SlideScreen list={list} />)

    expect(screen.getByRole("button", { name: /next photo/i })).toBeVisible()

    expect(screen.getByAltText("beaver on grass")).toBeVisible()
  })
})
