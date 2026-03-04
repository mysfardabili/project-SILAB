"use client";

import { useState, useEffect, useCallback } from "react";

interface FetchOptions extends RequestInit {}

export function useFetch<T>(
  url: string | null,
  options?: FetchOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || `Error ${res.status}`);
      }

      setData(json.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mutate = useCallback((mutatedData: T) => {
    setData(mutatedData);
  }, []);

  return { data, isLoading, error, mutate, refetch: fetchData };
}
