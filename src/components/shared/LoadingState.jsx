import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState({ type = "text", lines = 3, className = "" }) {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className={`space-y-2 ${className}`}>
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-32 w-full" />
          </div>
        );
      case "list":
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        );
      default:
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-4"
                style={{ width: `${100 - i * 10}%` }}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      {renderSkeleton()}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
