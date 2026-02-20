import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "muted";
}

export function LoadingSpinner({
  className,
  size = "md",
  variant = "primary",
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
    xl: "w-12 h-12 border-4",
  };

  const variantClasses = {
    primary: "border-gray-200 border-t-indigo-600",
    secondary: "border-indigo-100 border-t-white",
    muted: "border-gray-100 border-t-gray-400",
  };

  return (
    <div className={cn("flex justify-center items-center", className)} {...props}>
      <div
        className={cn(
          "rounded-full animate-spin",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
    </div>
  );
}
