import { Plus, Check } from 'lucide-react';
import { Button } from '../ui/button';
import type { Product } from '@/types/Product';

interface ProductCardContentProps {
  product: Product;
  currentQuantity: number;
  isOutOfStock: boolean;
  addedToCart: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
}

export function ProductCardContent({ product, currentQuantity, isOutOfStock, addedToCart, onAddToCart }: ProductCardContentProps) {
  return (
    <div className="p-4 space-y-3">
      <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
        {product.description}
      </p>
      <div className="flex items-end justify-between gap-2">
        <div>
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <p className="text-xs text-muted-foreground mt-1">
            {product.stock > 0 ? (
              <>
                {product.stock - currentQuantity} available
                {currentQuantity > 0 && <span className="text-primary font-medium ml-1">({currentQuantity} in cart)</span>}
              </>
            ) : (
              'Out of stock'
            )}
          </p>
        </div>
      </div>
      <div className="pt-2">
        <Button size="sm" variant="outline" className="w-full" onClick={onAddToCart} disabled={isOutOfStock || addedToCart}>
          {addedToCart ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Added to Cart
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

