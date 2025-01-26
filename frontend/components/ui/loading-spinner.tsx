import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className='inline-flex items-center'>
        <div className='h-6 w-6 animate-spin rounded-full border-3 border-teal-500 border-t-transparent' />
        <span className='ml-2 text-teal-600'>Loading...</span>
      </div>
    </div>
  );
}
