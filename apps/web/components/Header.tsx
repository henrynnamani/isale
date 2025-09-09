'use client';

import {
  BellIcon,
  Building,
  Handbag,
  HomeIcon,
  List,
  Package,
  SearchIcon,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';

const Header = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro Max Case',
      image:
        'https://i.pinimg.com/736x/9e/76/f4/9e76f441c0eef4abcea123c05f4b2ea5.jpg',
      price: 29.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'USB-C Fast Charger',
      image:
        'https://i.pinimg.com/736x/4d/51/87/4d518753caf4aab1be81fbc94ac431ad.jpg',
      price: 19.99,
      quantity: 1,
    },
  ]);

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <div>
          <span className="text-2xl font-bold">Graey</span>
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
        <BellIcon size={18} />
      </div>
      <div className="gap-5 items-center  hidden md:flex">
        <div className="flex gap-5">
          <Sheet>
            <SheetTrigger className="border p-2 rounded-full flex items-center gap-2">
              <ShoppingBag />
              <span className="font-medium">Cart</span>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cart</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[60vh]">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4 relative"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="text-right font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {cartItems.length > 0 && (
                <SheetFooter className="mt-4">
                  <Button type="submit" className="w-full">
                    Checkout
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
          <Link
            href={'/orders'}
            className="border p-2 rounded-full flex items-center gap-2"
          >
            <Package />
            <span className="font-medium">Order</span>
          </Link>
        </div>
        <div className="bg-blue-400 rounded-full items-center justify-center w-30 h-12 hidden md:flex">
          <span className="text-white font-bold">Login</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
