'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './product-card';
import useSWR from 'swr';
import { SkeletonCard } from '../Skeleton-card';

const ProductDiscovery = () => {
  const [cursor, setCursor] = useState(null);

  const { data, error } = useSWR(
    cursor ? `/products?cursor=${cursor}&limit=20` : `/products?limit=20`,
  );

  const isLoading = !data && !error;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="font-bold text-xl">Discovery</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center lg:justify-items-stretch">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-full max-w-[250px]">
                <SkeletonCard />
              </div>
            ))
          : data?.data?.products?.map((product) => (
              <div key={product.id} className="w-full max-w-[250px]">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductDiscovery;
