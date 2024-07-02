import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { SlideScreen } from ".."
import { list } from ".."

describe("test SlideScreen component", () => {
  it("renders slides", () => {
    const screen = render(<SlideScreen list={list} />)

    expect(screen.getByRole("button", { name: /next photo/i })).toBeVisible()

    expect(screen.getByAltText("beaver on grass")).toBeVisible()
  })
})
