import { ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any items to your cart yet.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground mt-2">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
          {/* Continue Shopping - visible on desktop only */}
          <div className="pt-4 hidden lg:block">
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        {/* Cart Summary */}
        <div className="lg:col-span-1 space-y-4">
          <CartSummary showCheckoutButton={false} />
          {/* Checkout Button - visible on desktop */}
          <div className="hidden lg:block space-y-2">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        </div>
        {/* Checkout Button - visible on mobile only */}
        <div className="lg:hidden space-y-2">
          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Shipping and taxes calculated at checkout
          </p>
        </div>
        {/* Continue Shopping - visible on mobile only, at bottom */}
        <div className="lg:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

