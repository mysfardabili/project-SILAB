"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard caught error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 max-w-md mb-8">
        We encountered an unexpected error while trying to load this section of the dashboard.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={() => reset()} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/dashboard/home'}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
}
