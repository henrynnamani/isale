import React from 'react';
import data from '../../data/product.json';
import { ProductTable } from '../product-table';

const Products = () => {
  return (
    <div className='p-4'>
      <ProductTable data={data} />
    </div>
  );
};

export default Products;
