'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdStar } from 'react-icons/io';

import { cn } from '@/lib/utils';
import ImageSlider from './ImageSlider';
import { Skeleton } from './ui/skeleton';
import { formatPrice } from '@/lib/formatPrice';
import { convertRate } from '@/utils/convertRate';
import { truncateText } from '@/utils/truncatText';
interface ProductListingProps {
  product: ProductResponse | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  console.log('product', product);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  if (isVisible && product) {
    return (
      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer group/main rounded-xl border border-gray-200 bg-white p-6 shadow-lg',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={`/product/${product.id}`}
      >
        <div className="flex flex-col w-full ">
          <ImageSlider urls={product.imageUrls} />
          <div className="flex justify-between">
            <div className="flex flex-col w-full">
              <div className="flex justify-between mt-4">
                <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                  {truncateText(product.name)}
                </h3>
                <div className="flex justify-center items-center">
                  <IoMdStar />
                  <p>{convertRate(product?.rate) || 0}</p>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {product?.categoryDTO?.name}
              </p>
              <p className="mt-1 font-medium text-sm text-gray-900 dark:text-gray-50">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductListing;
