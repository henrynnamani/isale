'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const images = [
    'https://i.pinimg.com/736x/9e/76/f4/9e76f441c0eef4abcea123c05f4b2ea5.jpg',
    'https://i.pinimg.com/736x/4b/d8/7f/4bd87f92a364162d23e1115adf3ec9d8.jpg',
    'https://i.pinimg.com/736x/9e/76/f4/9e76f441c0eef4abcea123c05f4b2ea5.jpg',
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-screen h-64 rounded-lg mt-5"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-62">
            <div className="p-1">
              <Image
                src={image}
                alt={`carousel-${index}`}
                fill
                className="rounded-lg object-fill"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="md:flex hidden" />
      <CarouselNext className="md:flex hidden" />
    </Carousel>
  );
}
