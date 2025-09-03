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
  <p className="text-gray-700 dark:text-gray-400">{cardContent.description}</p>
</div>
)
 
type CardProps = {
children?: React.ReactNode
}
//======================================
export const MultilayerCardV_1 = ({children}: CardProps) => {
return (
 
<div className="py-14">
<div className="relative w-full">
<div className="absolute scale-x-95 inset-0 -rotate-[5deg] rounded-lg bg-gray-200 dark:bg-zinc-800 py-10" />
{children}
</div>
</div>
)
}
// usage
<MultilayerCardV_1>
 
  <CardBody className="px-6 py-10 relative mx-auto rounded-lg shadow dark:bg-zinc-900/90 backdrop-blur-xl" />
</MultilayerCardV_1>