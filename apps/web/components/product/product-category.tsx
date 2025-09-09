import React from 'react';
import ProductCarousel from './product-carousel';

const ProductCategory = ({ label }: { label: string }) => {
  return (
    <div className="gap-4 flex flex-col">
      <span className="font-semibold text-xl">{label}</span>
      <ProductCarousel />
    </div>
  );
};

export default ProductCategory;
