'use client';

import productApi from '@/apis/productApi';
import Filter from '@/components/Filter';
import ProductListing from '@/components/ProductListing';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type SearchPageProps = {};

const SearchPage = (props: SearchPageProps) => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || '');
  const [products, setProducts] = useState<ProductResponse[]>();

  useEffect(() => {
    const fetchData = async () => {
      const param = {
        searchText: encodedSearchQuery,
        offset: 0,
        pageSize: 5,
        sortStr: '',
      };
      try {
        const productResponse = await productApi.getByConditionAndPagination(
          param
        );
        console.log('productResponse', productResponse);
        setProducts(productResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [encodedSearchQuery]);

  console.log('productResponse', products);

  if (!encodedSearchQuery) {
    router.push('/');
  }

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

export default SearchPage;
