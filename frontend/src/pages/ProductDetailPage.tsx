import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { ProductImage } from '../components/product/ProductImage';
import { ProductInfo } from '../components/product/ProductInfo';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { ProductActions } from '../components/product/ProductActions';
import { ProductMeta } from '../components/product/ProductMeta';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { data: product, isLoading, error } = useProduct(id || '');
  const { addItem, getItemQuantity } = useCartStore();
  const currentQuantity = product ? getItemQuantity(product._id) : 0;
  const maxAvailable = product ? product.stock - currentQuantity : 0;
  const isOutOfStock = maxAvailable <= 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxAvailable) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product || isOutOfStock) {
      toast({ variant: 'destructive', title: 'Out of stock' });
      return;
    }
    addItem(product, quantity);
    setAddedToCart(true);
    toast({ variant: 'success', title: 'Added to cart', description: `${quantity} × ${product.name} added to your cart.` });
    setTimeout(() => { setAddedToCart(false); setQuantity(1); }, 2000);
  };

  const handleBuyNow = () => {
    if (!product || isOutOfStock) {
      toast({ variant: 'destructive', title: 'Out of stock' });
      return;
    }
    addItem(product, quantity);
    navigate('/checkout');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-2xl font-bold text-destructive">Error Loading Product</h1>
          <p className="text-muted-foreground">{error instanceof Error ? error.message : 'Failed to load product details'}</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImage product={product} isOutOfStock={isOutOfStock} />
          <div className="space-y-6">
            <ProductInfo product={product} maxAvailable={maxAvailable} currentQuantity={currentQuantity} isOutOfStock={isOutOfStock} />
            {!isOutOfStock && <QuantitySelector quantity={quantity} maxAvailable={maxAvailable} onQuantityChange={handleQuantityChange} />}
            <ProductActions isOutOfStock={isOutOfStock} addedToCart={addedToCart} currentQuantity={currentQuantity} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onViewCart={() => navigate('/cart')} />
            <ProductMeta product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
