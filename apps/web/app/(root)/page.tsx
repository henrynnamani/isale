import React from 'react';
import Header from '../../components/Header';
import { Hero } from '@/components/Hero';
import ProductCategory from '@/components/product/product-category';
import ProductDiscovery from '@/components/product/product-discovery';

const page = () => {
  return (
    <div className="gap-8 space-y-8">
      <Hero />
      <ProductCategory label="Popular Product" />
      <ProductDiscovery />
    </div>
  );
};

export default page;
