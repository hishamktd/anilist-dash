"use client";

interface GenreStat {
  genre: string;
  count: number;
  meanScore: number;
}

interface GenreDistributionProps {
  genres: GenreStat[];
}

export function GenreDistribution({ genres }: GenreDistributionProps) {
  // Sort by count and take top 10
  const topGenres = [...genres]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const maxCount = topGenres[0]?.count || 1;

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Top Genres</h3>
      <div className="space-y-3">
        {topGenres.map((genre) => {
          const percentage = (genre.count / maxCount) * 100;

          return (
            <div key={genre.genre} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300 font-medium">{genre.genre}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">{genre.count} anime</span>
                  <span className="text-yellow-500 font-semibold">
                    {genre.meanScore > 0 ? `★ ${genre.meanScore.toFixed(1)}` : '—'}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
