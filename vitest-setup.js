import { expect, afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"
import * as matchers from "@testing-library/jest-dom/matchers"

expect.extend(matchers)

// testing library uses jest for fake timers, override here
// ref: https://github.com/testing-library/react-testing-library/issues/1197
// ref: https://github.com/vitest-dev/vitest/issues/3117
globalThis.jest = {
  ...globalThis.jest,
  advanceTimersByTime: vi.advanceTimersByTime,
}

afterEach(() => {
  cleanup()
})
