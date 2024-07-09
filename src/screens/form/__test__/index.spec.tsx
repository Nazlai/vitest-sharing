import "@testing-library/jest-dom"
import { describe, expect, it, vi, afterEach } from "vitest"
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FormScreen } from "../"

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})

describe("test form screen", () => {
  it("should display a button with countdown after valid form input", async () => {
    vi.useFakeTimers()
    const mockSubmit = vi.fn()
    render(<FormScreen onSubmit={mockSubmit} />)
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    const nameInput = screen.getByLabelText(/username/i)
    await user.type(nameInput, "george washington")
    await user.click(screen.getByRole("button", { name: /submit/i }))

    expect(screen.getByText("(8) Looks good to me")).toBeVisible()
    expect(nameInput).not.toBeInTheDocument()

    act(() => vi.advanceTimersByTime(3000))

    const submitButton = screen.getByRole("button", {
      name: /\(5\) Looks good to me/i,
    })

    await user.click(submitButton)
    expect(mockSubmit).toHaveBeenCalledWith("george washington")
    expect(submitButton).not.toBeInTheDocument()
    expect(nameInput).not.toBeInTheDocument()
    expect(screen.getByText(/all done!/i)).toBeVisible()
  })

  it(
    'should fast forward to "all done!" after count down elapses',
    { timeout: 10000 },
    async () => {
      const mockSubmit = vi.fn()
      render(<FormScreen onSubmit={mockSubmit} />)
      const user = userEvent.setup()
      const nameInput = screen.getByLabelText(/username/i)
      await user.type(nameInput, "george washington")
      await user.click(screen.getByRole("button", { name: /submit/i }))

      await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1), {
        timeout: 9000,
      })
    }
  )

  it("should not submit form if input is empty", async () => {
    const mockSubmit = vi.fn()
    render(<FormScreen onSubmit={mockSubmit} />)

    const user = userEvent.setup()
    const submitButton = screen.getByRole("button", { name: /submit/i })

    expect(submitButton).toBeDisabled()

    await user.click(submitButton)

    expect(mockSubmit).not.toHaveBeenCalled()
  })
})
