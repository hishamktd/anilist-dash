export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-10 bg-gray-800 rounded-lg w-64 mb-2" />
        <div className="h-6 bg-gray-800/50 rounded-lg w-96" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl bg-gray-900 p-6 border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-800 p-3 w-12 h-12" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-800 rounded w-24 mb-2" />
                  <div className="h-8 bg-gray-800 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl bg-gray-900 p-6 border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-800 p-3 w-12 h-12" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-800 rounded w-24 mb-2" />
                  <div className="h-8 bg-gray-800 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
        {/* Main Content Skeleton */}
        <div className="xl:col-span-3 space-y-8">
          {/* Widget Skeletons */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-gray-900 p-6 border border-gray-800">
              <div className="h-6 bg-gray-800 rounded w-48 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-20 bg-gray-800/50 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Skeleton */}
        <div className="xl:col-span-1">
          <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
            <div className="h-6 bg-gray-800 rounded w-32 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-16 h-20 bg-gray-800 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-full" />
                    <div className="h-3 bg-gray-800/50 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay with Spinner */}
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin" />
            <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full [animation:spin-reverse_1.5s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            </div>
          </div>
          <p className="text-white text-lg font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    </div>
  );
}
