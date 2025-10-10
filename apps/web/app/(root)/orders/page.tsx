'use client';

import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import useOrder from '@/store/order';
import { useRouter } from 'next/navigation';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  'on-delivery': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const OrderCard = ({ order }: { order: any }) => (
  <div className="flex items-start gap-4 p-4 border rounded-md mb-4 shadow-sm bg-white">
    <Image
      src={order?.items[0].product.images[0]}
      alt={'order product'}
      width={80}
      height={80}
      className="rounded-md object-cover"
    />
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-lg">{order.items[0].product.name}</h3>
        <p className="text-sm text-muted-foreground">
          ₦{Number(order?.total_amount).toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">
          Date: {formatDate(order?.updatedAt)}
        </p>
      </div>

      <div className="ml-4">
        <Badge className={`mt-1 w-fit ${statusColor[order?.delivery_status]}`}>
          {order?.delivery_status.replace('-', ' ').toUpperCase()}
        </Badge>
      </div>
    </div>
  </div>
);

const OrdersTabs = () => {
  const { data, error, isLoading } = useSWR('/orders');
  const [orders, setOrders] = useState([]);
  const setOrderDetail = useOrder((state: any) => state.setOrderDetail);
  const router = useRouter();

  useEffect(() => {
    setOrders(data?.data);
  }, [data]);

  const viewOrder = (order) => {
    router.push(`/orders/${order.id}`);

    setOrderDetail(order);
  };

  return (
    <Tabs defaultValue="pending" className="w-full max-w-xl mx-auto mt-8">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="on delivery">On Delivery</TabsTrigger>
        <TabsTrigger value="delivered">Completed</TabsTrigger>
      </TabsList>

      {['pending', 'on delivery', 'completed'].map((status) => (
        <TabsContent key={status} value={status}>
          {orders?.filter((order: any) => order?.delivery_status === status)
            .length === 0 ? (
            <p className="text-sm text-center text-muted-foreground py-8">
              No {status.replace('-', ' ')} orders yet.
            </p>
          ) : (
            orders
              ?.filter((order) => order?.delivery_status === status)
              .map((order) => {
                return (
                  <div onClick={() => viewOrder(order)}>
                    <OrderCard key={order?.id} order={order} />
                  </div>
                );
              })
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default OrdersTabs;
