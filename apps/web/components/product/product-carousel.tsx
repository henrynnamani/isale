'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import ProductCard from './product-card';
import { SkeletonCard } from '../Skeleton-card';

export default function ProductCarousel({ products, isLoading }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {!isLoading
          ? products?.map((product) => (
              <div
                key={product?.id}
                className="flex-[0_0_90%] sm:flex-[0_0_45%] md:flex-[0_0_30%] px-2"
              >
                <ProductCard product={product} />
              </div>
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-full max-w-[250px]">
                <SkeletonCard />
              </div>
            ))}
      </div>
    </div>
  );
}
