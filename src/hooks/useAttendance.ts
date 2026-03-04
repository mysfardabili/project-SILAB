"use client";

import { useFetch } from "./useFetch";
import { useState } from "react";

export function useAttendanceStats(courseId?: string) {
  const url = courseId ? `/api/attendance?courseId=${courseId}` : "/api/attendance";
  const { data, isLoading, error, refetch, mutate } = useFetch<any>(url);

  return {
    data,
    isLoading,
    error,
    refetch,
    mutate
  };
}

export function useSubmitAttendance() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (courseId: string, code: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/attendance/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, code })
      });
      return await res.json();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting };
}
