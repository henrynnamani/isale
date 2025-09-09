import React from 'react';
import ProductCard from './product-card';

const ProductDiscovery = () => {
  return (
    <div className='flex flex-col gap-5'>
      <span className="font-bold text-xl">Discovery</span>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-7'>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard />
        ))}
      </div>
    </div>
  );
};

export default ProductDiscovery;
