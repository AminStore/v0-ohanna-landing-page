export default function ProductSkeleton() {
  return (
    <div className="bg-[#FDF8EF] dark:bg-[#1A1410] border-2 border-[#1B1B1B]/12 dark:border-[#FDF8EF]/8 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-[#E4D5B7] dark:bg-[#2A1E14]" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-[#E4D5B7] dark:bg-[#2A1E14] rounded w-1/4" />
        <div className="h-4 bg-[#E4D5B7] dark:bg-[#2A1E14] rounded w-3/4" />
        <div className="h-3 bg-[#E4D5B7] dark:bg-[#2A1E14] rounded w-full" />
        <div className="h-3 bg-[#E4D5B7] dark:bg-[#2A1E14] rounded w-2/3" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-[#E4D5B7] dark:bg-[#2A1E14] rounded w-1/3" />
          <div className="h-8 bg-[#E4D5B7] dark:bg-[#2A1E14] rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
