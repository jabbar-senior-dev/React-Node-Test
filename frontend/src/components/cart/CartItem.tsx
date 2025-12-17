import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import type { CartItem as CartItemType } from '@/types/Product';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateQuantity(product._id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product._id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(product._id);
  };

  const itemTotal = product.price * quantity;

  return (
    <Card className="relative">
      {/* Delete button - top right corner of card */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive z-10"
        aria-label="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <CardContent className="p-4 pr-12">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <ImageWithFallback
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
              eager={true}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="min-w-0">
              <h3 className="font-semibold text-base sm:text-lg break-words">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {product.category}
              </p>
              <p className="text-sm font-medium mt-2">
                ${product.price.toFixed(2)} each
              </p>
            </div>
            <Separator className="my-3" />
            <div className="flex flex-wrap justify-center sm:justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="h-8 w-8"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 sm:w-12 text-center font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock}
                  className="h-8 w-8"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-lg font-bold">
                  ${itemTotal.toFixed(2)}
                </p>
              </div>
            </div>
            {quantity >= product.stock && (
              <p className="text-xs text-amber-600 mt-2">
                Maximum stock reached
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

