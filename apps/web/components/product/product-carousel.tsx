'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {Array.from({ length: 10 }).map((_) => (
          <div
            key={11}
            className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.3333%] px-2"
          >
            <ProductCard />
          </div>
        ))}
      </div>
    </div>
  );
}
