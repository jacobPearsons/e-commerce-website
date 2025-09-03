const cardContent = {
  title: "Lorem ipsum dolor",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum!",
}
const CardBody = ({ className = "" }) => (
  <div
    className={cn(
      "px-2 text-gray-100 sm:px-4 py-0 sm:pb-3 text-start",
      className
    )}
  >
    <h3 className="text-lg font-bold tracking-tighter mt-3 mb-1">
      {cardContent.title}
    </h3>
    <p className="text-sm leading-5">{cardContent.description}</p>
  </div>
)
type CardProps = {
  children?: React.ReactNode
}
//======================================
export const Card_with_image_v5 = () => {
  return (
    <div className="rounded-xl dark:bg-zinc-950 bg-zinc-50 overflow-hidden p-2 border pb-3 ">
      <div className="relative aspect-video">
        <Image
          fill
          className="rounded-xl shadow-[0px_0px_10px_#A1A1AA] dark:shadow-[0px_0px_12px_rgb(39,39,42,0.7)]"
          src="/lemons.jpeg"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
          alt="image"
        />
      </div>
      <CardBody className="text-gray-800 dark:text-gray-200 mb-2 relative" />
      <div className="px-2">
        <Button className="w-full rounded-lg" asChild>
          <Link href="/docs/cards-with-image-bg">Learn more</Link>
        </Button>
      </div>
    </div>
  )
}