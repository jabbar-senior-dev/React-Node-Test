import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface ProductActionsProps {
  isOutOfStock: boolean;
  addedToCart: boolean;
  currentQuantity: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onViewCart: () => void;
}

export function ProductActions({
  isOutOfStock,
  addedToCart,
  currentQuantity,
  onAddToCart,
  onBuyNow,
  onViewCart,
}: ProductActionsProps) {
  return (
    <>
      <div className="space-y-3 pt-4">
        <Button
          size="lg"
          className="w-full h-14 text-lg"
          onClick={onAddToCart}
          disabled={isOutOfStock || addedToCart}
        >
          {addedToCart ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full h-14 text-lg"
          onClick={onBuyNow}
          disabled={isOutOfStock}
        >
          Buy Now
        </Button>
      </div>

      {currentQuantity > 0 && !isOutOfStock && (
        <div className="text-center pt-4 border-t">
          <Button
            variant="link"
            onClick={onViewCart}
            className="text-base"
          >
            View Cart ({currentQuantity} {currentQuantity === 1 ? 'item' : 'items'})
          </Button>
        </div>
      )}
    </>
  );
}

