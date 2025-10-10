import React from 'react';
import ProductCarousel from './product-carousel';

const ProductCategory = ({
  label,
  products,
  isLoading,
}: {
  label: string;
  products: any;
  isLoading: boolean;
}) => {
  return (
    <div className="gap-4 flex flex-col">
      <span className="font-semibold text-xl">{label}</span>
      <ProductCarousel products={products} isLoading={isLoading} />
    </div>
  );
};

export default ProductCategory;
