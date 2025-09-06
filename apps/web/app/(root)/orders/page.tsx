'use client';

import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// 🇳🇬 Mock order data (customized for Nigerian customers)
const orders = [
  {
    id: '1',
    product: 'iPhone 15 Pro',
    image:
      'https://i.pinimg.com/736x/16/53/9c/16539c3ad34be66f593eb6ade38be749.jpg',
    price: '₦1,200,000',
    status: 'pending',
    date: '2025-09-01',
    location: 'Lagos',
  },
  {
    id: '2',
    product: 'iPhone 14 Plus',
    image:
      'https://i.pinimg.com/736x/16/53/9c/16539c3ad34be66f593eb6ade38be749.jpg',
    price: '₦950,000',
    status: 'on-delivery',
    date: '2025-08-30',
    location: 'Abuja',
  },
  {
    id: '2',
    product: 'iPhone 15 Plus',
    image:
      'https://i.pinimg.com/736x/16/53/9c/16539c3ad34be66f593eb6ade38be749.jpg',
    price: '₦950,000',
    status: 'pending',
    date: '2025-08-30',
    location: 'Abuja',
  },
  {
    id: '3',
    product: 'iPhone 13 Mini',
    image:
      'https://i.pinimg.com/736x/16/53/9c/16539c3ad34be66f593eb6ade38be749.jpg',
    price: '₦850,000',
    status: 'completed',
    date: '2025-08-20',
    location: 'Port Harcourt',
  },
  {
    id: '4',
    product: 'iPhone 13 Mini',
    image:
      'https://i.pinimg.com/736x/16/53/9c/16539c3ad34be66f593eb6ade38be749.jpg',
    price: '₦850,000',
    status: 'completed',
    date: '2025-08-20',
    location: 'Port Harcourt',
  },
];

// Format date in Nigerian-friendly way
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

// Badge color based on order status
const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  'on-delivery': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const OrderCard = ({ order }: { order: (typeof orders)[0] }) => (
  <div className="flex items-start gap-4 p-4 border rounded-md mb-4 shadow-sm bg-white">
    <Image
      src={order.image}
      alt={order.product}
      width={80}
      height={80}
      className="rounded-md object-cover"
    />
    <div className="flex justify-between w-full">
      {/* Left section */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-lg">{order.product}</h3>
        <p className="text-sm text-muted-foreground">{order.price}</p>
        <p className="text-xs text-gray-500">Delivered to {order.location}</p>
        <p className="text-xs text-gray-400">Date: {formatDate(order.date)}</p>
      </div>

      {/* Right-aligned status badge */}
      <div className="ml-4">
        <Badge className={`mt-1 w-fit ${statusColor[order.status]}`}>
          {order.status.replace('-', ' ').toUpperCase()}
        </Badge>
      </div>
    </div>
  </div>
);

// Main tabbed orders component
const OrdersTabs = () => {
  return (
    <Tabs defaultValue="pending" className="w-full max-w-xl mx-auto mt-8">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="on-delivery">On Delivery</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      {['pending', 'on-delivery', 'completed'].map((status) => (
        <TabsContent key={status} value={status}>
          {orders.filter((order) => order.status === status).length === 0 ? (
            <p className="text-sm text-center text-muted-foreground py-8">
              No {status.replace('-', ' ')} orders yet.
            </p>
          ) : (
            orders
              .filter((order) => order.status === status)
              .map((order) => (
                <Link href={`/orders/2`}>
                  <OrderCard key={order.id} order={order} />
                </Link>
              ))
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default OrdersTabs;
