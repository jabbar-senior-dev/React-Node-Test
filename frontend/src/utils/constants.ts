import type { Category, ShippingOption, PaymentOption } from "@/types/Product";

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Product Categories
export const CATEGORIES: Category[] = [
  { value: "all", label: "All Products" },
  { value: "fitness", label: "Fitness" },
  { value: "nutrition", label: "Nutrition" },
  { value: "equipment", label: "Equipment" },
  { value: "apparel", label: "Apparel" },
];

// Shipping Options
export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Estimated Delivery: Friday, December 20",
    price: 0,
    estimatedDays: "5-7 business days",
  },
  {
    id: "express",
    name: "Express",
    description: "Estimated Delivery: Wednesday, December 18",
    price: 17.5,
    estimatedDays: "2-3 business days",
  },
  {
    id: "priority",
    name: "Priority",
    description: "Estimated Delivery: Friday, December 19",
    price: 25.0,
    estimatedDays: "1-2 business days",
  },
];

// Payment Options
export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "paypal",
    name: "PayPal",
    description: "Fast and secure payment with PayPal",
    icon: "paypal",
  },
  {
    id: "klarna",
    name: "Klarna",
    description: "4 interest-free payments",
    icon: "klarna",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Pay securely with your credit or debit card",
    icon: "card",
  },
];
