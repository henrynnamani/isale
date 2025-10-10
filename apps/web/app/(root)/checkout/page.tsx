'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
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
import useCheckout from '@/store/checkout';
import { axiosInstance } from '@/app/layout';
import { toast } from 'sonner';

const DELIVERY_PRICE = 1000;

const page = () => {
  const products = useCheckout((state) => state.products);
  const [total, setTotal] = useState(0);
  const [billingDetail, setBillingDetail] = useState({});

  const [orderDetail, setOrderDetail] = useState<any>({
    userId: '87db2cbd-1900-4721-bd61-b7bb4cdbc6dd',
    vendorId: '36dad9a2-d9bc-4325-9880-6a13e5fa3ff8',
    items: [],
  });

  useEffect(() => {
    const items = products?.map((product) => ({
      productId: product.id,
      quantity: 1,
    }));

    const total = products?.reduce(
      (acc, current) => acc + Number(current.price),
      0,
    );

    setTotal(total);
    setOrderDetail({ ...orderDetail, items });
  }, [products]);

  const placeOrder = async () => {
    const order = await axiosInstance.post('orders', orderDetail);

    await axiosInstance
      .post('payments/fiat', {
        amount: (total / 1000) * 100,
        orderId: order?.data?.data?.id,
        billingDetail: billingDetail,
        email: 'henrynnamani12304@gmail.com', //TODO: change
      })
      .then((response) => {
        toast('Order has been placed.', {
          position: 'top-center',
        });

        console.log(response);

        window.location.href = response?.data?.data?.checkoutUrl;
        console.log(response);
      });
  };

  return (
    <div className="flex flex-col items-start justify-center md:flex-row md:col-span-2 p-4 gap-10">
      <div className="w-[70%] gap-5 flex flex-col border rounded-lg p-5">
        <span className="font-semibold text-lg ">Billing Address</span>
        <Input
          placeholder="Full name"
          onChange={(e) =>
            setBillingDetail({ ...billingDetail, full_name: e.target.value })
          }
        />
        <Input
          placeholder="Lodge name"
          onChange={(e) =>
            setBillingDetail({ ...billingDetail, lodge_name: e.target.value })
          }
        />
        <Input
          placeholder="Phone number"
          onChange={(e) =>
            setBillingDetail({ ...billingDetail, phone_number: e.target.value })
          }
        />
        <div className="flex gap-3">
          <Select
            autoComplete=""
            onValueChange={(value) =>
              setBillingDetail({
                ...billingDetail,
                location: value,
              })
            }
          >
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
            {total.toLocaleString()}
          </span>
          <span className="font-medium">
            <span className="font-semibold">Delivery fee:</span> N
            {DELIVERY_PRICE.toLocaleString()}
          </span>
          <hr />
          <div className="flex gap-2 items-center">
            <Checkbox value={'Door Delivery'} /> <span>Door Delivery</span>
          </div>
          <hr />
          <span className="font-medium">
            <span className="font-semibold">Total:</span> $
            {(total + DELIVERY_PRICE).toLocaleString()}
          </span>
          <Button onClick={placeOrder}>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
