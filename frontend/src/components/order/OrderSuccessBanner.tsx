import { CheckCircle2 } from 'lucide-react';
import type { Order } from '@/types/Product';

interface OrderSuccessBannerProps {
  order: Order;
}

export function OrderSuccessBanner({ order }: OrderSuccessBannerProps) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="rounded-full bg-white/20 backdrop-blur-sm p-4">
            <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            🎉 Order Successfully Placed!
          </h1>
          <p className="text-green-50 text-base md:text-lg">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-medium">Order ID:</span>
              <span className="text-sm font-bold">#{order._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm font-bold capitalize">{order.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

