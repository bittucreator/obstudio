export default function PortfolioSkeleton() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter Tabs Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-9 w-20 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse hidden sm:block" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-4/3 bg-gray-200 rounded-lg mb-3" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
