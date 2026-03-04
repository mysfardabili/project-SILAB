"use client";

import { useFetch } from "./useFetch";
import type { Course } from "@/lib/mockData";

export function useCourses({ dosenId, status }: { dosenId?: string; status?: string } = {}) {
  const params = new URLSearchParams();
  if (dosenId) params.append("dosenId", dosenId);
  if (status) params.append("status", status);

  const query = params.toString();
  const url = `/api/courses${query ? `?${query}` : ""}`;

  const { data, isLoading, error, refetch, mutate } = useFetch<Course[]>(url);

  return {
    courses: data || [],
    isLoading,
    error,
    refetch,
    mutate
  };
}

export function useCourse(id: string) {
  const { data, isLoading, error, refetch, mutate } = useFetch<Course>(id ? `/api/courses/${id}` : null);

  return {
    course: data,
    isLoading,
    error,
    refetch,
    mutate
  };
}
