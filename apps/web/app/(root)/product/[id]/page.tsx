'use client';

import { BadgeCheck, Star } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { Marquee } from '@/components/magicui/marquee';
import { cn } from '@/components/lib/utils';
import ProductCarousel from '@/components/product/product-carousel';
import useProduct from '@/store/product';
import { useRouter } from 'next/navigation';

const images = [
  'https://i.pinimg.com/736x/af/da/f0/afdaf06687561353091785825a3a7e78.jpg',
  'https://i.pinimg.com/736x/35/00/70/3500706066b664e9db01c51d4bf92261.jpg',
  'https://i.pinimg.com/736x/c4/fc/82/c4fc82b6f8e10d16447e0548fd122202.jpg',
];

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Jane',
    username: '@jane',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'James',
    username: '@james',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/james',
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const page = () => {
  const product = useProduct((state) => state.product);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const router = useRouter();
  const saveProductDetail = useProduct((state) => state.saveProductDetail);

  const checkoutPage = (product: any) => {
    saveProductDetail(product);
    router.push(`/checkout`);
  };

  return (
    <div className="gap-8 flex flex-col mt-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/docs/components">Detail</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.product?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:col-span-2 p-4 gap-10">
        <div className="flex-1 flex flex-col">
          <div className="w-full">
            <Image
              src={product?.product?.images[0]}
              alt="Product detail"
              className="w-full h-[400px] object-cover rounded-sm"
              width={1920}
              height={1080}
            />
          </div>
          <div className={`flex gap-4 mt-4`}>
            {product?.product?.images?.map((image) => (
              <img
                src={image}
                alt={`image-${1283}`}
                loading="eager"
                width={40}
                height={50}
                className={`w-20 h-20 rounded-sm ${selectedImage === image ? 'border-3 border-gray-500' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="gap-3 flex flex-col">
            <span className="font-semibold md:text-xl text-lg">
              {product?.product?.name}
            </span>
            <div className="flex gap-5 items-center">
              <span className="text-sm">@{product?.product?.vendor?.name}</span>
              {product?.product?.vendor?.isVerified && (
                <BadgeCheck size={18} color="blue" />
              )}
            </div>
            <span className="font-bold md:text-2xl text-lg">
              N{parseInt(product?.product?.price).toLocaleString()}
            </span>
          </div>
          <hr />
          <div className="flex gap-5 items-center">
            <div>
              <span className="text-sm font-medium text-gray-600">
                Condition
              </span>
              :{' '}
              <span className="text-sm border p-2 rounded-full">
                {product?.product?.condition}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">RAM</span>:{' '}
              <span className="text-sm border p-2 rounded-full">
                {product?.product?.rams[0].size}gb
              </span>
            </div>
          </div>
          <div className="flex gap-5 mt-3 items-center">
            <div>
              <span className="text-sm font-medium text-gray-600 rounded-full border p-2">
                {product?.product?.trueTone ? '✅' : '🚫'} True Tone
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 rounded-full border p-2">
                {product?.product?.trueTone ? '✅' : '🚫'} Face ID
              </span>
            </div>
            <div
              className={`p-3 border rounded-full`}
              style={{ backgroundColor: `#${product?.product?.colors[0].hex}` }}
            ></div>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <ul className="list-disc pl-5">
                  {Object.entries(
                    JSON.parse(product?.product?.specification),
                  ).map(([key, value]) => (
                    <li
                      key={key}
                    >{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping Details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We offer country-wide shipping through trusted courier
                  partners. Standard delivery takes 3-5 business days, while
                  express shipping ensures delivery within 1-2 business days.
                </p>
                <p>
                  All orders are carefully packaged and fully insured. Track
                  your shipment in real-time through our dedicated tracking
                  portal.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We stand behind our products with a comprehensive 30-day
                  return policy. If you&apos;re not completely satisfied, simply
                  return the item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping
                  and full refunds processed within 48 hours of receiving the
                  returned item.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center gap-3">
            <div
              onClick={() => checkoutPage(product)}
              className="rounded-full cursor-pointer flex-1 md:px-8 md:py-2 px-8 py-4 bg-black text-white font-bold text-center text-sm md:text-lg"
            >
              BUY NOW
            </div>
            <div className="rounded-full cursor-pointer flex-1 border md:px-8 md:py-2 px-8 py-4 text-center font-semibold border-gray-500 text-sm md:text-lg">
              ADD TO CART
            </div>
          </div>
          <hr />
          <div>
            <span>Share:</span>
            <span></span>
          </div>
        </div>
      </div>

      <div>
        <span className="text-lg font-medium">Ratings and Reviews</span>
        <div className="flex items-center space-x-8 justify-between">
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-semibold text-lg">4.8</span> out of 5
            </span>
            <div className="flex gap-3">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <span className="text-sm text-gray-500">(201 Reviews)</span>
          </div>
          <div className="h-[80px] w-[0.5px] bg-gray-200"></div>
          <div>
            <span className="font-medium text-lg">Vendor</span>
            <div className="flex gap-3">@ Vintech Store</div>
          </div>
        </div>
        <div className="mt-5">
          <span className="font-medium text-lg">Reviews</span>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </div>

      {/** Similar Product */}
      <div className="space-y-5 flex flex-col">
        <span className="font-semibold text-lg">Similar Product</span>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default page;
