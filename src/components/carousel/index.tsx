import { Swiper, SwiperSlide } from "swiper/react"
import { CarouselButtonProps, CarouselProps } from "./types"
import { useSwiper } from "@/hooks/useSwiper"
import "swiper/css"
import BackButton from "../../assets/btn_back.svg"
import NextButton from "../../assets/btn_next.svg"

function PreviousSlide(props: CarouselButtonProps) {
  return (
    <button
      className="absolute z-[2] left-4 top-1/2 -translate-y-1/2"
      type="button"
      onClick={props.onClick}
    >
      <img src={BackButton} alt="previous photo" />
    </button>
  )
}

function NextSlide(props: CarouselButtonProps) {
  return (
    <button
      className="absolute z-[2] right-4 top-1/2 -translate-y-1/2"
      type="button"
      onClick={props.onClick}
    >
      <img src={NextButton} alt="next photo" />
    </button>
  )
}

export function Carousel<T extends { id: number }>(props: CarouselProps<T>) {
  const { swipes, setSwipes, setCurrentIndex } = useSwiper()

  return (
    <div className="relative">
      {!swipes?.isBeginning ? (
        <PreviousSlide onClick={() => swipes?.slidePrev()} />
      ) : null}
      <div className="overflow-hidden">
        <Swiper
          onSwiper={setSwipes}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          spaceBetween={8}
          slidesPerView={1.5}
        >
          {props.list.map((item) => (
            <SwiperSlide key={item.id}>
              {(slideData) => props.children(item, slideData)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!swipes?.isEnd ? (
        <NextSlide onClick={() => swipes?.slideNext()} />
      ) : null}
    </div>
  )
}
