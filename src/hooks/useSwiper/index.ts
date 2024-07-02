import { useState } from "react"
import Swiper from "swiper"

export function useSwiper() {
  const [swipes, setSwipes] = useState<Swiper>()
  const [currentIndex, setCurrentIndex] = useState(0)

  return { swipes, setSwipes, currentIndex, setCurrentIndex }
}
