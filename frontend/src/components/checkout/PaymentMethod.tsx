import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PAYMENT_OPTIONS } from '@/utils/constants';
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVC,
  formatCardNumber,
  formatExpiryDate,
} from '@/utils/helper';

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  disabled?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const PaymentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'card':
      return <CreditCard className="h-5 w-5" />;
    case 'paypal':
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z" />
          <path d="M2.379 0h5.944a3.992 3.992 0 0 1 3.928 3.293l1.385 8.739a2.418 2.418 0 0 1-2.39 2.804H7.503L6.38 21.79a.967.967 0 0 1-.955.817H2.39a.483.483 0 0 1-.477-.558L3.853 3.617A3.992 3.992 0 0 1 7.78 0H2.38z" />
        </svg>
      );
    case 'klarna':
      return <Wallet className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

const CreditCardLogos = () => (
  <div className="flex items-center gap-2">
    {/* Visa */}
    <div className="h-6 w-10 bg-white rounded border flex items-center justify-center text-[10px] font-bold text-blue-800">
      VISA
    </div>
    {/* Mastercard */}
    <div className="h-6 w-10 bg-white rounded border flex items-center justify-center">
      <div className="flex -space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-orange-400 opacity-80" />
      </div>
    </div>
    {/* Amex */}
    <div className="h-6 w-10 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold text-white">
      AMEX
    </div>
    {/* Discover */}
    <div className="h-6 w-10 bg-orange-500 rounded flex items-center justify-center text-[8px] font-bold text-white">
      DISC
    </div>
    {/* JCB */}
    <div className="h-6 w-10 bg-white rounded border flex items-center justify-center text-[10px] font-bold text-blue-700">
      JCB
    </div>
  </div>
);

export function PaymentMethod({ selectedMethod, onMethodChange, disabled, onValidationChange }: PaymentMethodProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({ cardNumber: '', expiryDate: '', cvc: '' });

  useEffect(() => {
    if (onValidationChange) {
      if (selectedMethod === 'credit-card') {
        const isValid =
          cardNumber.trim() !== '' &&
          expiryDate.trim() !== '' &&
          cvc.trim() !== '' &&
          validateCardNumber(cardNumber) &&
          validateExpiryDate(expiryDate) &&
          validateCVC(cvc);
        onValidationChange(isValid);
      } else {
        onValidationChange(true);
      }
    }
  }, [selectedMethod, cardNumber, expiryDate, cvc, onValidationChange]);

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    if (value && !validateCardNumber(formatted)) {
      setErrors(prev => ({ ...prev, cardNumber: 'Invalid card number' }));
    } else {
      setErrors(prev => ({ ...prev, cardNumber: '' }));
    }
  };

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    setExpiryDate(formatted);

    if (formatted.length === 5 && !validateExpiryDate(formatted)) {
      setErrors(prev => ({ ...prev, expiryDate: 'Invalid or expired date' }));
    } else {
      setErrors(prev => ({ ...prev, expiryDate: '' }));
    }
  };

  const handleCVCChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setCvc(cleaned);
    if (value && !validateCVC(cleaned)) {
      setErrors(prev => ({ ...prev, cvc: 'Invalid CVC' }));
    } else {
      setErrors(prev => ({ ...prev, cvc: '' }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
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
            {PAYMENT_OPTIONS.map((option) => (
              <div key={option.id} className="space-y-4">
                <div
                  className={cn(
                    'flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all',
                    selectedMethod === option.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  onClick={() => !disabled && onMethodChange(option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                  <div className="flex items-center gap-3 flex-1 flex-wrap sm:flex-nowrap">
                    <div className="text-muted-foreground">
                      <PaymentIcon type={option.icon} />
                    </div>
                    <div className="flex-1 space-y-0.5">
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
                    {option.id === 'credit-card' && (
                      <div className="w-full sm:w-auto mt-2 sm:mt-0">
                        <CreditCardLogos />
                      </div>
                    )}
                  </div>
                </div>

                {/* Credit Card Form Fields */}
                {selectedMethod === 'credit-card' && option.id === 'credit-card' && (
                  <div className="pl-7 pr-4 pb-4 space-y-4 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        disabled={disabled}
                        maxLength={19}
                        className={errors.cardNumber ? 'border-red-500' : ''}
                      />
                      {errors.cardNumber && (
                        <p className="text-xs text-red-500">{errors.cardNumber}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiration Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => handleExpiryDateChange(e.target.value)}
                          disabled={disabled}
                          maxLength={5}
                          className={errors.expiryDate ? 'border-red-500' : ''}
                        />
                        {errors.expiryDate && (
                          <p className="text-xs text-red-500">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc" className="flex items-center gap-1">
                          CVC *
                          <div className="py-[6px]">
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => handleCVCChange(e.target.value)}
                          disabled={disabled}
                          maxLength={4}
                          type="password"
                          className={errors.cvc ? 'border-red-500' : ''}
                        />
                        {errors.cvc && (
                          <p className="text-xs text-red-500">{errors.cvc}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </RadioGroup>

        <p className="text-xs text-muted-foreground mt-4">
          By placing this order, you agree to The North Face Terms & Conditions and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
}

