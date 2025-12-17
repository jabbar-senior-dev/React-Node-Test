import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useCartStore } from '@/store/cartStore';
import { SHIPPING_OPTIONS } from '@/utils/constants';

interface OrderSummaryProps {
  shippingMethod?: string;
}

export function OrderSummary({ shippingMethod = 'standard' }: OrderSummaryProps) {
  const { items, getTotal } = useCartStore();

  const subtotal = getTotal();
  const selectedShipping = SHIPPING_OPTIONS.find(opt => opt.id === shippingMethod);
  const shipping = selectedShipping?.price || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product._id} className="flex gap-3">
              <ImageWithFallback
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
                eager={true}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
                <p className="text-sm font-medium mt-1">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Shipping ({selectedShipping?.name})
            </span>
            <span className="font-medium">
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

