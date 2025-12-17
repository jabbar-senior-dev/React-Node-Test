import { Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Product } from '@/types/Product';

interface ProductCardImageProps {
  product: Product;
  isOutOfStock: boolean;
}

export function ProductCardImage({ product, isOutOfStock }: ProductCardImageProps) {
  return (
    <div className="aspect-square bg-muted rounded-t-lg overflow-hidden relative">
      <ImageWithFallback
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      {product.featured && (
        <Badge className="absolute top-2 right-2 gap-1">
          <Star className="h-3 w-3 fill-current" />
          Featured
        </Badge>
      )}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <Badge variant="destructive">Out of Stock</Badge>
        </div>
      )}
    </div>
  );
}

