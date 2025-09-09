import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ popular }: { popular?: boolean }) => {
  return (
    <Link href={'/4'}>
      <div
        key={'learning'}
        className={` bg-white rounded-lg ${popular ? 'md:w-[250px]' : 'w-full'} shadow-md flex-shrink-0 overflow-hidden border hover:shadow-2xl transition-shadow duration-300`}
      >
        <div className="relative w-full md:h-64 h-52 bg-gray-100">
          <Image
            src="https://i.pinimg.com/736x/fd/f3/4c/fdf34c1e3d18ac99ce44acfe4d9f45aa.jpg"
            alt="iPhone 15 Pro"
            layout="fill"
            className="object-cover rounded-lg rounded-b-none"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            iPhone 15 Pro
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            True Tone · 85% 🔋 · 32GB
          </p>

          <p className="text-sm text-gray-500 mb-3">Refurbished · Face ID</p>

          <div className="text-lg font-semibold text-gray-800 mb-4">N457k</div>

          {/* Colors
          <div className="hidden items-center gap-2 mb-4 md:flex">
            <span className="text-sm text-gray-600 mr-2">Colors:</span>
            <span className="w-5 h-5 rounded-full bg-gray-900 border border-gray-300"></span>
            <span className="w-5 h-5 rounded-full bg-blue-500 border border-gray-300"></span>
            <span className="w-5 h-5 rounded-full bg-white border border-gray-300"></span>
            <span className="w-5 h-5 rounded-full bg-orange-400 border border-gray-300"></span>
          </div> */}

          {/* CTA */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Buy Now
          </button>
          {/* </div> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
