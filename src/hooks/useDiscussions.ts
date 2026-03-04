"use client";

import { useFetch } from "./useFetch";

export function useDiscussions() {
  const { data, isLoading, error, refetch, mutate } = useFetch<any>("/api/discussions");

  return {
    discussions: data || [],
    isLoading,
    error,
    refetch,
    mutate
  };
}
