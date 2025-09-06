'use client';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '../lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <Image
        src={
          'https://i.pinimg.com/736x/c4/fc/82/c4fc82b6f8e10d16447e0548fd122202.jpg'
        }
        alt="hero image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images?.map((image, index) => (
          <div
            key={image}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === index && 'border-orange-500',
            )}
            onClick={() => setCurrent(index)}
          >
            <Image src={image} alt={'image'} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
