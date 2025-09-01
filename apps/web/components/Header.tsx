import {
  BellIcon,
  Handbag,
  HomeIcon,
  SearchIcon,
  ShoppingBag,
} from 'lucide-react';
import React from 'react';

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <span className="text-2xl font-bold">I4sale</span>
          <span className="text-blue-400 font-semibold">.co</span>
        </div>
        <div className="p-2 rounded-full border flex items-center justify-between px-4 border-gray-300 relative">
          <div className="flex relative">
            <input
              type="text"
              placeholder="Search product"
              className=" w-full outline-none"
            />
            <div className="absolute right-0">
              <SearchIcon size={20} />
            </div>
          </div>
        </div>
        <BellIcon />
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-1">
          <ShoppingBag />
          <span className="font-medium">Cart</span>
        </div>
        <div className="bg-blue-400 rounded-full flex items-center justify-center w-30 h-12">
          <span className="text-white font-bold">Login</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
