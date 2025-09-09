// app/cart/page.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function page() {
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

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] border rounded p-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
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
                  <button
                    onClick={() => {}}
                    className="p-1 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-6 space-y-4">
            <div className="text-lg font-semibold text-right">
              Total: ${getTotal().toFixed(2)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="w-full">Proceed to Checkout</Button>
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
