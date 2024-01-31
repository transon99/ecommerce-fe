"use client";

import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import ProductListing from "@/components/ProductListing";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { formatPrice } from "@/lib/formatPrice";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const data: Product = {
  id: "id1",
  name: "Product 1",
  description: "desciption",
  imageUrls: [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "",
    "https://picsum.photos/200",
  ],
  quantity: 10,
  sku: "PR1",
  category: {
    id: "id1",
    name: "Category 1",
    imageUrls: [
      {
        id: "id2",
        thumbnailUrl: "",
      },
    ],
  },
  brand: {
    id: "id1",
    name: "Brand 1",
    imageUrl: "",
  },
  price: 100,
};

const ProductDetailPage = async ({ params }: PageProps) => {
  const { productId } = params;

  //   const product = await getProductById(productId);
  //   console.log(product);

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-3">
          <ol className="flex items-center space-x-2">
            {BREADCRUMBS.map((breadcrumb, i) => (
              <li key={breadcrumb.href}>
                <div className="flex items-center text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>
                  {i !== BREADCRUMBS.length - 1 ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 ">
            <div>
              <h1 className="text-xl font-semibold">{data.name}</h1>
            </div>
            <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />

            <div className="grid grid-cols-7">
              <div className="flex w-full h-full col-span-3">
                <ImageSlider urls={data.imageUrls} />
              </div>
              <div className="pl-10 col-span-4">
                <h1 className="">{data.name}</h1>
              </div>
            </div>
          </div>
          <div>sjf;kajsd</div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default ProductDetailPage;
