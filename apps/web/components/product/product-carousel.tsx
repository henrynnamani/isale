'use client';
import Image from 'next/image';
import { useRef } from 'react';
import ProductCard from './product-card';

const products = [
  { id: 1, name: 'Product 1', image: '/product1.jpg', price: '$19.99' },
  { id: 2, name: 'Product 2', image: '/product2.jpg', price: '$24.99' },
  { id: 3, name: 'Product 3', image: '/product3.jpg', price: '$14.99' },
  { id: 4, name: 'Product 4', image: '/product4.jpg', price: '$29.99' },
  { id: 5, name: 'Product 5', image: '/product5.jpg', price: '$9.99' },
  { id: 6, name: 'Product 6', image: '/product5.jpg', price: '$9.99' },
  { id: 7, name: 'Product 7', image: '/product5.jpg', price: '$9.99' },
  { id: 8, name: 'Product 8', image: '/product5.jpg', price: '$9.99' },
  { id: 9, name: 'Product 9', image: '/product5.jpg', price: '$9.99' },
];

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {products.map((product) => (
          <ProductCard />
        ))}
      </div>
    </div>
  );
}
