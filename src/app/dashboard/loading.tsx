import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
      <LoadingSpinner size="lg" variant="primary" />
      <p className="text-gray-500 font-medium animate-pulse">Loading dashboard data...</p>
    </div>
  );
}
