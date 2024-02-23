'use client';

import productApi from '@/apis/productApi';
import { formatPrice } from '@/lib/formatPrice';
import { truncateText } from '@/utils/truncatText';
import { truncate } from 'fs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type OrderItemProps = {
  productId: string | undefined;
  qty: number | undefined;
};

const OrderItem = ({ productId, qty }: OrderItemProps) => {
  const [product, setProduct] = useState<ProductResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await productApi.getById(productId);
      setProduct(res.data);
    };
    fetchData();
  }, []);

  console.log('prouct', product);
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={product?.imageUrls[0].thumbnailUrl}
            alt={product?.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <div>{truncateText(product?.name)}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(product?.price)}</div>
      <div className="justify-self-center">{qty}</div>
      <div className="justify-self-end font-semibold">
        {formatPrice(product?.salePrice * product?.quantity)}
      </div>
    </div>
  );
};

export default OrderItem;
