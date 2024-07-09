import { useState, useEffect, useRef } from "react"

export function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef<() => void>(() => {})

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => {
        callbackRef.current()
      }, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [delay])
}

export function useCountdown(seconds = 8) {
  const [remainingTime, setRemainingTime] = useState(seconds)

  useInterval(
    () => {
      setRemainingTime((time) => time - 1)
    },
    remainingTime > 0 ? 1000 : null
  )

  return remainingTime
}
