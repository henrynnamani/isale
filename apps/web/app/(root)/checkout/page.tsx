'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import useProduct from '@/store/product';

const DELIVERY_PRICE = 1000;

const page = () => {
  const product = useProduct((state) => state.product);

  const placeOrder = () => {

  }

  return (
    <div className="flex flex-col items-start justify-center md:flex-row md:col-span-2 p-4 gap-10">
      <div className="w-[70%] gap-5 flex flex-col border rounded-lg p-5">
        <span className="font-semibold text-lg ">Billing Address</span>
        <Input placeholder="Full name" />
        <Input placeholder="Location" />
        <Input placeholder="Phone number" />
        <div className="flex gap-3">
          <Select autoComplete="">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Drop Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                <SelectItem value="apple">Transformer, Hilltop</SelectItem>
                <SelectItem value="banana">Behind Flat</SelectItem>
                <SelectItem value="blueberry">Onuiyi</SelectItem>
                <SelectItem value="grapes">Odim</SelectItem>
                <SelectItem value="pineapple">Odenigwe</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className={`gap-4 mt-4 border p-4 flex-1 rounded-lg`}>
        <div className="flex flex-col gap-4">
          <span className="font-medium">
            <span className="font-semibold">Subtotal:</span> N
            {parseInt(product?.product?.price).toLocaleString()}
          </span>
          <hr />
          <div className="flex gap-2 items-center">
            <Checkbox value={'Door Delivery'} /> <span>Door Delivery</span>
          </div>
          <hr />
          <span className="font-medium">
            <span className="font-semibold">Total:</span> $
            {(Number(product?.product?.price) + DELIVERY_PRICE).toLocaleString()}
          </span>
          <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
