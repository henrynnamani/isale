import useProduct from '@/store/product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

const ProductCard = (product: any) => {
  const router = useRouter();
  const saveProductDetail = useProduct((state: any) => state.saveProductDetail);

  const viewProduct = (product: any) => {
    saveProductDetail(product?.product);
    router.push(`/product/${product.product.slug}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow duration-300"
      onClick={() => viewProduct(product)}
    >
      {/* Image */}
      <div className="relative w-full h-36 bg-gray-100">
        {product?.product?.images[0] ? (
          <Image
            src={product?.product?.images[0]} // Safely access the first image
            alt="iPhone 15 Pro"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {product?.product?.name}
        </h3>
        <p className="text-xs text-gray-500 mb-1">
          {product?.product?.trueTone ? '✅' : '🚫'} True Tone ·{' '}
          {product?.product?.battery}% 🔋 · {product?.product?.rams[0].size}GB
        </p>
        <p className="text-xs text-gray-500 mb-2">
          {product?.product?.condition} ·{' '}
          {product?.product?.faceId ? '✅' : '🚫'} Face ID
        </p>

        <div className="text-sm font-semibold text-gray-800 mb-3">
          N{parseInt(product?.product?.price).toLocaleString()}
        </div>

        {/* CTA */}
        {/* <button
          onClick={checkoutPage}
          className="w-full bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition"
        >
          Buy Now
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
