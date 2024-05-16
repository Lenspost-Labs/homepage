import { cn } from '@/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-blue-600/20', className)}
      {...props}
    />
  );
}

export { Skeleton };
