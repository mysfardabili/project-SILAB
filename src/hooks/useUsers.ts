"use client";

import { useFetch } from "./useFetch";
import type { User } from "@/lib/mockData";

export function useUsers({ role, status, search }: { role?: string; status?: string; search?: string } = {}) {
  const params = new URLSearchParams();
  if (role && role !== "all") params.append("role", role);
  if (status && status !== "all") params.append("status", status);
  if (search) params.append("search", search);

  const query = params.toString();
  const url = `/api/users${query ? `?${query}` : ""}`;

  const { data, isLoading, error, refetch, mutate } = useFetch<User[]>(url);

  return {
    users: data || [],
    isLoading,
    error,
    refetch,
    mutate
  };
}
