'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import ProductCard from './product-card';

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
