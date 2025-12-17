import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Order } from '@/types/Product';

interface OrderShippingCardProps {
  order: Order;
}

export function OrderShippingCard({ order }: OrderShippingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
            {order.shippingAddress.zipCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>
      </CardContent>
    </Card>
  );
}

