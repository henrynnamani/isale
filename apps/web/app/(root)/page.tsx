'use client';

import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import ProductCategory from '@/components/product/product-category';
import ProductDiscovery from '@/components/product/product-discovery';
import useSWR from 'swr';

const page = () => {
  const [discountProducts, setDiscountProducts] = useState([]);
  const { data, error } = useSWR(`/products?limit=20`);

  useEffect(() => {
    const products = data?.data?.filter(
      (product) => product.onDiscount !== false,
    );

    setDiscountProducts(products);
  }, [data]);

  const isLoading = !data && !error;

  return (
    <div className="gap-8 space-y-8">
      <Hero />
      <ProductCategory
        label="Discount Product"
        products={discountProducts}
        isLoading={isLoading}
      />
      <ProductDiscovery
        isLoading={isLoading}
        products={data && data?.data}
      />
    </div>
  );
};

export default page;
