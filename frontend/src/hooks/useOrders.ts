import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
} from "../services/api";
import type { Order } from "@/types/Product";

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters?: { userId?: string; status?: string }) =>
    [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

export function useOrders(filters?: { userId?: string; status?: string }) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: async () => {
      const response = await getOrders(filters);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch orders");
      }
      return response.data as Order[];
    },
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: async () => {
      const response = await getOrder(id);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch order");
      }
      return response.data as Order;
    },
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: {
      userId: string;
      items: Array<{ productId: string; quantity: number }>;
      shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
    }) => {
      const response = await createOrder(orderData);
      if (!response.success) {
        throw new Error(response.message || "Failed to create order");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await updateOrderStatus(id, status);
      if (!response.success) {
        throw new Error(response.message || "Failed to update order status");
      }
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}
