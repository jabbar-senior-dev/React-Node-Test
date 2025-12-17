import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface QuantitySelectorProps {
  quantity: number;
  maxAvailable: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, maxAvailable, onQuantityChange }: QuantitySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Quantity:</label>
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="h-12 w-12 rounded-r-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="h-12 w-16 flex items-center justify-center border-x text-lg font-medium">
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(quantity + 1)}
            disabled={quantity >= maxAvailable}
            className="h-12 w-12 rounded-l-none"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          Max: {maxAvailable}
        </span>
      </div>
    </div>
  );
}

