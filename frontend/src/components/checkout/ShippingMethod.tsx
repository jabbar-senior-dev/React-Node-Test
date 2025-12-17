import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Truck, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SHIPPING_OPTIONS } from '@/utils/constants';

interface ShippingMethodProps {
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  disabled?: boolean;
}

export function ShippingMethod({ selectedMethod, onMethodChange, disabled }: ShippingMethodProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Shipping Method
        </CardTitle>
        {disabled && (
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
            <Info className="h-4 w-4" />
            Please complete shipping information first
          </p>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod} onValueChange={onMethodChange} disabled={disabled}>
          <div className="space-y-3">
            {SHIPPING_OPTIONS.map((option) => (
              <div
                key={option.id}
                className={cn(
                  'flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all',
                  selectedMethod === option.id
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => !disabled && onMethodChange(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor={option.id}
                    className={cn(
                      'font-semibold cursor-pointer',
                      disabled && 'cursor-not-allowed'
                    )}
                  >
                    {option.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>

        <p className="text-xs text-muted-foreground mt-4">
          Disclaimer: Packages may arrive earlier or later than the estimated delivery date. Weather, holiday season, and other factors can affect availability.
        </p>
      </CardContent>
    </Card>
  );
}

