import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ProductCardImage } from './product/ProductCardImage';
import { ProductCardContent } from './product/ProductCardContent';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/types/Product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, getItemQuantity } = useCartStore();
  const { toast } = useToast();
  const currentQuantity = getItemQuantity(product._id);
  const isOutOfStock = currentQuantity >= product.stock || product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) {
      toast({ variant: 'destructive', title: 'Out of stock', description: 'This product is currently out of stock.' });
      return;
    }
    addItem(product, 1);
    setAddedToCart(true);
    toast({ variant: 'success', title: 'Added to cart', description: `${product.name} has been added to your cart.` });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Link to={`/products/${product._id}`} className="group block">
      <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
        <CardHeader className="p-0">
          <ProductCardImage product={product} isOutOfStock={isOutOfStock} />
          <div className="p-4 pb-0">
            <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{product.name}</CardTitle>
            <CardDescription className="mt-1">{product.category}</CardDescription>
          </div>
        </CardHeader>
        <ProductCardContent product={product} currentQuantity={currentQuantity} isOutOfStock={isOutOfStock} addedToCart={addedToCart} onAddToCart={handleAddToCart} />
      </Card>
    </Link>
  );
}
