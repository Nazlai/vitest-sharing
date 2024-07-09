import { Carousel } from "@/src/components/carousel"

export function SlideScreen(props: {
  list: { id: number; img: string; alt: string }[]
}) {
  return (
    <Carousel list={props.list}>
      {(item) => {
        return <img key={item.id} src={item.img} alt={item.alt} />
      }}
    </Carousel>
  )
}
