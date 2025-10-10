'use client';

import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Verified } from 'lucide-react';
import Stepper from '@keyvaluesystems/react-stepper';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/Star';
import useOrder from '@/store/order';

const styles = {
  LineSeparator: () => ({
    backgroundColor: '#028A0F',
  }),
  ActiveNode: () => ({
    backgroundColor: '#028A0F',
  }),
  CompletedNode: () => ({
    backgroundColor: '#028A0F',
  }),
};

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  'on delivery': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const currentStepIndex = (status) => {
  return status == 'pending' ? 1 : status == 'on delivery' ? 2 : 3;
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const order = useOrder((state) => state.orderDetail);

  console.log(order);

  if (!order) {
    return <div className="p-8 text-center text-red-500">Order not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Back button */}
      <button
        className="text-sm text-blue-600 mb-6 hover:underline"
        onClick={() => history.back()}
      >
        ← Back to Orders
      </button>

      {/* Product Summary */}
      <div className="flex gap-6 bg-white shadow-sm rounded-lg p-4 mb-6 border flex-col md:flex-row">
        <div className="flex flex-1 gap-3 h-40 md:flex-row flex-col">
          <img
            src={order?.items[0].product.images[0]}
            alt={'order product'}
            className="rounded-md object-cover border w-full md:w-52 md:h-36 h-44"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">
              {order?.items[0].product.name}
            </h1>
            <div className="text-muted-foreground flex gap-2 items-center">
              <span>@Vintech</span>
              <Verified size={18} />
            </div>
            <p className="text-muted-foreground">{order?.totalAmount}</p>
          </div>
        </div>
        <div className="h-fit w-fit">
          <Badge className={`mt-2 w-fit ${statusColor[order.delivery_status]}`}>
            {order?.delivery_status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm border mb-6 space-y-2 text-sm">
        <p>
          <span className="font-medium">Order ID:</span> #{order.id}
        </p>
        <p>
          {/* <span className="font-medium">Location:</span> {order.location} */}
        </p>
        <p>
          <span className="font-medium">Ordered on:</span>{' '}
          {formatDate(order.updatedAt)}
        </p>
      </div>

      {/* Order Timeline */}
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3">Tracking Progress</h2>
        <Stepper
          orientation={'vertical'}
          styles={styles}
          steps={[
            {
              stepLabel: 'Pending',
              // stepDescription: 'This is Step 1',
              completed: true,
            },
            {
              stepLabel: 'On Delivery',
              // stepDescription: 'This is Step 2',
              completed: true,
            },
            {
              stepLabel: 'Completed',
              // stepDescription: 'This is Step 3',
              completed: true,
            },
          ]}
          currentStepIndex={currentStepIndex(order.delivery_status)}
        />
      </div>

      <h2 className="font-semibold text-lg mb-3">Rating and Review</h2>
      <StarRating rating={0} setRating={() => {}} />

      <div className="grid w-full gap-3 mt-3">
        <Textarea placeholder="Type your message here." />
        <Button>Send message</Button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
