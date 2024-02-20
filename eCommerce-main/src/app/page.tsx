"use client";

import { Hero } from "@/components/Hero";
import ProductReel from "@/components/ProductReel";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

const data: Product[] = [
  {
    id: "id1",
    name: "Product 1",
    description: "desciption",
    imageUrls: [
      "https://kccshop.vn/media/product/75-5547-1.jpg",
      "https://kccshop.vn/media/product/75-5547-2.jpg",
      "https://kccshop.vn/media/product/75-5547-3.jpg",
      "https://kccshop.vn/media/product/75-5547-5.jpg",
    ],
    quantity: 10,
    category: {
      id: "id1",
      name: "Category 1",
      imageUrl: "",
    },
    brand: {
      id: "id1",
      name: "Brand 1",
      imageUrl: "",
    },
    price: 100,
    rate: 5,
  },
  {
    id: "id2",
    name: "Product 1",
    description: "desciption",
    imageUrls: ["", "", "", ""],
    quantity: 10,
    sku: "PR1",
    category: {
      id: "id1",
      name: "Category 1",
      imageUrl: "",
    },
    brand: {
      id: "id1",
      name: "Brand 1",
      imageUrl: "",
    },
    price: 100,
  },
  {
    id: "id1",
    name: "Product 1",
    description: "desciption",
    imageUrls: ["", "", "", ""],
    quantity: 10,
    sku: "PR1",
    category: {
      id: "id1",
      name: "Category 1",
      imageUrl: "",
    },
    brand: {
      id: "id1",
      name: "Brand 1",
      imageUrl: "",
    },
    price: 100,
  },
];

const heroData: string[] = ["", "", ""];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <Hero urls={heroData} />
        <ProductReel
          title="Featured Products"
          href="/collections/featured"
          products={data}
        />
      </MaxWidthWrapper>
    </>
  );
}
