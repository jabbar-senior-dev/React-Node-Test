import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct } from "../services/api";
import type { Product } from "@/types/Product";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: {
    category?: string;
    featured?: boolean;
    search?: string;
  }) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export function useProducts(filters?: {
  category?: string;
  featured?: boolean;
  search?: string;
}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async () => {
      const response = await getProducts(filters);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch products");
      }
      return response.data as Product[];
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const response = await getProduct(id);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch product");
      }
      return response.data as Product;
    },
    enabled: !!id,
  });
}
