import { Hero } from '@/components/Hero';
import ProductCategory from '@/components/product/product-category';
import ProductDiscovery from '@/components/product/product-discovery';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <ProductCategory label="Popular Product" />
      <ProductDiscovery />
    </div>
  );
};

export default page;
