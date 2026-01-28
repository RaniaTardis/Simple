export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="relative aspect-square w-full bg-gray-200 rounded-[2.5rem]"></div>
      <div className="px-4 space-y-2">
        <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-100 rounded-md w-full"></div>
        <div className="h-4 bg-gray-100 rounded-md w-5/6"></div>
      </div>
    </div>
  );
}