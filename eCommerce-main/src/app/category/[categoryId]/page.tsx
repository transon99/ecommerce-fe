"use client";

import productApi from "@/apis/productApi";
import ProductListing from "@/components/ProductListing";
import ProductReel from "@/components/ProductReel";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";

type CategoryPageProps = {};

const CategoryPage = (props: CategoryPageProps) => {
  const [products, setProducts] = useState<ProductResponse[]>();
  const searchParam = useSearchParams();
  const categoryId = searchParam.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const productsRes = await productApi.getProductByCategory(categoryId);
      setProducts(products);
    };
    fetchData();
  }, []);

  return (
    <>
      <MaxWidthWrapper>
        <Filter />
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products?.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default CategoryPage;
