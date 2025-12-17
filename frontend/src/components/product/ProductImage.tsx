import { Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Product } from '@/types/Product';

interface ProductImageProps {
  product: Product;
  isOutOfStock: boolean;
}

export function ProductImage({ product, isOutOfStock }: ProductImageProps) {
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.featured && (
          <Badge className="absolute top-4 right-4 gap-1">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </Badge>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-6 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

