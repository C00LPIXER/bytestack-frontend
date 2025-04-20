import { Skeleton } from "@/components/ui/skeleton";

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="pt-8 mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
      <div className="flex flex-row items-start gap-8 mb-1">
        {/* Avatar Skeleton */}
        <div className="flex justify-start">
          <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
        </div>

        {/* Info Skeleton */}
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  );
};
