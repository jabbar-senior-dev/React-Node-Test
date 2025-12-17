import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUser, createUser } from "../services/api";
import type { User } from "@/types/Product";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: () => [...userKeys.lists()] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const response = await getUsers();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch users");
      }
      return response.data as User[];
    },
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await getUser(id);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch user");
      }
      return response.data as User;
    },
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: {
      email: string;
      name: string;
      role?: string;
    }) => {
      const response = await createUser(userData);
      if (!response.success) {
        throw new Error(response.message || "Failed to create user");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
