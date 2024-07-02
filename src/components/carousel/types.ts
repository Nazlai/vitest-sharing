export interface CarouselButtonProps {
  onClick: () => void
}

interface SlideData {
  isActive: boolean
  isVisible: boolean
  isPrev: boolean
  isNext: boolean
}

export interface CarouselProps<T> {
  list: T[]
  children: (item: T, slideData: SlideData) => React.ReactNode
}
