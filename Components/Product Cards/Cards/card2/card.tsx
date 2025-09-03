import { cn } from "@/lib/utils";
 
const cardContent = {
title: "Lorem ipsum dolor",
description:
"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum! Qui dicta debitis aliquid quo molestias explicabo iure!",
};
const CardBody = ({ className = "" }) => (
 
  <div className={cn(className)}>
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
      {cardContent.title}
    </h3>
    <p className="text-gray-700 dark:text-gray-400">
      {cardContent.description}
    </p>
  </div>
)
//======================================
export const MultilayerCardV_2 = ({
  children
}: CardProps) => {
  return (
    <div className="py-14">
      <div className="relative mx-auto h-72 sm:h-52">
        <div
          className="dark:bg-zinc-900 bg-zinc-100 absolute size-full rounded-3xl border border-neutral-200 dark:border-zinc-800 scale-y-[1.15] scale-x-90 -top-4"
          style={{
            transformOrigin: "top center",
          }}
        ></div>
        <div
          className="absolute dark:bg-zinc-950 bg-white size-full rounded-3xl p-2 md:p-4 shadow-[0px_0px_16px_#D4D4D8] border border-neutral-200 dark:border-zinc-800 center dark:shadow-[0px_0px_64px_rgba(39,39,42,0.6)]"
          style={{
            transformOrigin: "top center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}