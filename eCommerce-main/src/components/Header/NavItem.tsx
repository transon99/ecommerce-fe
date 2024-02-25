"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Navigation } from ".";
import Link from "next/link";

interface NavItemProps {
  category: Navigation;
  selected?: boolean;
}

const NavItem = ({ category, selected }: NavItemProps) => {
  const router = useRouter();
  const params = useSearchParams();
  // const handleClick = useCallback(() => {
  //   router.push({
  //     pathname:
  //   });
  // }, [category.label, params, router]);
  return (
    // <div className="flex">
    //   <div className="relative flex items-center">
    //     <Button
    //       className="gap-1.5"
    //       onClick={handleOpen}
    //       variant={isOpen ? "secondary" : "ghost"}
    //     >
    //       {category.name}
    //       <ChevronDown
    //         className={cn("h-4 w-4 transition-all text-muted-foreground", {
    //           "-rotate-180": isOpen,
    //         })}
    //       />
    //     </Button>
    //   </div>

    //   {isOpen ? (
    //     <div
    //       onClick={() => close()}
    //       className={cn(
    //         "absolute inset-x-0 top-full text-sm text-muted-foreground",
    //         {
    //           "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
    //         }
    //       )}
    //     >
    //       <div className="absolute inset-0 top-1/2 shadow" aria-hidden="true" />

    //       <div className="relative ">
    //         <div className="mx-auto max-w-7xl px-8">
    //           <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
    //             <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
    //               {category?.children?.map((item) => (
    //                 <div
    //                   onClick={() => close}
    //                   key={item.name}
    //                   className="group relative text-base sm:text-sm"
    //                 >
    //                   <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
    //                     <Image
    //                       src={item.imageUrls[0].thumbnailUrl}
    //                       alt="product category image"
    //                       fill
    //                       className="object-cover object-center"
    //                     />
    //                   </div>

    //                   <Link
    //                     href={item.name}
    //                     className="mt-6 block font-medium "
    //                   >
    //                     {item.name}
    //                   </Link>
    //                   <p className="mt-1" aria-hidden="true">
    //                     Shop now
    //                   </p>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //           <Image
    //             src={category.imageUrls[0].thumbnailUrl}
    //             alt="product category image"
    //             fill
    //             className="object-cover object-center"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   ) : null}
    // </div>
    <Link
      href={{
        pathname: `category/${category.name}`,
        query: { id: category.href },
      }}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 cursor-pointer ${
        selected
          ? "border-b-slate-800 text:slate-800"
          : "border-transparent text-slate-500"
      }`}
    >
      <Image src={category.icon} alt={category.label} width={20} height={20} />
      <div className="font-medium text-sm">{category.label}</div>
    </Link>
  );
};

export default NavItem;
