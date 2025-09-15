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
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex-[0_0_90%] sm:flex-[0_0_45%] md:flex-[0_0_30%] px-2"
          >
            <ProductCard />
          </div>
        ))}
      </div>
    </div>
  );
}
