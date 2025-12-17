import { Badge } from '../ui/badge';
import type { Product } from '@/types/Product';

interface ProductInfoProps {
  product: Product;
  maxAvailable: number;
  currentQuantity: number;
  isOutOfStock: boolean;
}

export function ProductInfo({ product, maxAvailable, currentQuantity, isOutOfStock }: ProductInfoProps) {
  return (
    <>
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-muted-foreground capitalize">{product.category}</p>
      </div>

      <div className="border-y py-4">
        <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>
      </div>

      <div>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Availability:</span>
        {isOutOfStock ? (
          <Badge variant="destructive">Out of Stock</Badge>
        ) : (
          <Badge variant="outline" className="text-green-600 border-green-600">
            {maxAvailable} available
            {currentQuantity > 0 && ` (${currentQuantity} in cart)`}
          </Badge>
        )}
      </div>
    </>
  );
}

