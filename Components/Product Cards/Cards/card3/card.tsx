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
type CardProps = {
  children?: React.ReactNode
}
//======================================
export const MultilayerCardV_4 = ({children}: CardProps) => {
  return (
    <div className="py-14">
      <div className="relative mx-auto h-72 sm:h-48">
        <div
          className="dark:bg-zinc-900/30 bg-zinc-50 absolute size-full rounded-3xl border border-neutral-200 dark:border-zinc-800 scale-[0.95] -top-6"
          style={{
            transformOrigin: "top center",
          }}
        ></div>
        <div
          className="dark:bg-zinc-900/40 bg-zinc-50 absolute size-full rounded-3xl border border-neutral-200 dark:border-zinc-800 scale-[0.97] -top-3"
          style={{
            transformOrigin: "top center",
          }}
        ></div>
        <div
          className="absolute dark:bg-zinc-950 bg-white size-full rounded-3xl p-2 md:p-4 shadow-xl border border-neutral-200 dark:border-zinc-800 shadow-black/[0.1] dark:shadow-white/[0.02] center"
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