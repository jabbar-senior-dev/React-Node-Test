import { useParams, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrder } from '@/hooks/useOrders';
import { OrderSuccessBanner } from '@/components/order/OrderSuccessBanner';
import { OrderStatusCard } from '@/components/order/OrderStatusCard';
import { OrderShippingCard } from '@/components/order/OrderShippingCard';
import { OrderItemsCard } from '@/components/order/OrderItemsCard';

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, error } = useOrder(orderId || '');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-6">
              <Package className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Order Not Found</h1>
            <p className="text-muted-foreground">{error instanceof Error ? error.message : 'We could not find the order you are looking for.'}</p>
          </div>
          <Button asChild size="lg"><Link to="/products">Continue Shopping</Link></Button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <OrderSuccessBanner order={order} />
        <OrderStatusCard order={order} />
        <OrderShippingCard order={order} />
        <OrderItemsCard order={order} />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="outline"><Link to="/products">Continue Shopping</Link></Button>
          <Button asChild size="lg"><Link to="/">Back to Home</Link></Button>
        </div>
      </div>
    </div>
  );
}
