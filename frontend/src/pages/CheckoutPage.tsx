import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { ShippingMethod } from '@/components/checkout/ShippingMethod';
import { PaymentMethod } from '@/components/checkout/PaymentMethod';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useCreateOrder } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import type { CheckoutFormData } from '@/types/Product';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, clearCart } = useCartStore();
  const { mutate: createOrder, isPending: isSubmitting } = useCreateOrder();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [isShippingFilled, setIsShippingFilled] = useState(false);
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);
  const handleSubmit = async (formData: CheckoutFormData) => {
    const userId = '000000000000000000000001';
    const orderData = {
      userId,
      items: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress: formData,
    };

    createOrder(orderData, {
      onSuccess: (order) => {
        navigate(`/order-confirmation/${order._id}`, { replace: true });
        setTimeout(() => {
          clearCart();
          toast({
            variant: 'success',
            title: 'Order placed successfully!',
            description: `Your order #${order._id.slice(-8).toUpperCase()} has been confirmed.`,
          });
        }, 100);
      },
      onError: (error) => {
        console.error('Order creation failed:', error);

        toast({
          variant: 'destructive',
          title: 'Order failed',
          description: error instanceof Error ? error.message : 'There was an error processing your order. Please try again.',
        });
      },
    });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground mt-2">
          {!isShippingFilled
            ? 'Please fill in your shipping information to continue'
            : !isPaymentValid
              ? 'Please complete your payment details to place order'
              : 'Complete your order by placing your order'}
        </p>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        {/* Order Summary - appears first on mobile, right side on desktop */}
        <div className="order-first lg:order-last lg:col-span-1">
          <div className="lg:sticky lg:top-4">
            <OrderSummary shippingMethod={shippingMethod} />
          </div>
        </div>
        {/* Checkout Form - appears second on mobile, left side on desktop */}
        <div className="lg:col-span-2 space-y-6">
          <CheckoutForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            formId="checkout-form"
            onValidationChange={setIsShippingFilled}
          />
          <div className={!isShippingFilled ? 'opacity-50 pointer-events-none' : ''}>
            <ShippingMethod
              selectedMethod={shippingMethod}
              onMethodChange={setShippingMethod}
              disabled={isSubmitting || !isShippingFilled}
            />
          </div>
          <div className={!isShippingFilled ? 'opacity-50 pointer-events-none' : ''}>
            <PaymentMethod
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
              disabled={isSubmitting || !isShippingFilled}
              onValidationChange={setIsPaymentValid}
            />
          </div>
          <Button
            type="submit"
            form="checkout-form"
            className="w-full"
            size="lg"
            disabled={isSubmitting || !isShippingFilled || !isPaymentValid}
          >
            {isSubmitting
              ? 'Processing...'
              : !isShippingFilled
                ? 'Complete Shipping Address First'
                : !isPaymentValid
                  ? 'Complete Payment Details'
                  : 'Place Order'}
          </Button>
        </div>
      </div>
    </div>
  );
}

