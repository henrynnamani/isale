import React from 'react';
import Header from '../../components/Header';
import { Hero } from '@/components/Hero';
import ProductCategory from '@/components/product/product-category';

const page = () => {
  return (
    <div className="gap-8 space-y-8">
      <Header />
      <Hero />
      <ProductCategory label='Popular'/>
    </div>
  );
};

export default page;
