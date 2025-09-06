import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCarousel from './product-carousel';

const ProductCategory = ({ label }: { label: string }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="gap-4 flex flex-col">
      <span className="font-semibold text-xl">{label}</span>
      <ProductCarousel />
    </div>
  );
};

export default ProductCategory;
