"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface GenreStat {
  genre: string;
  count: number;
  meanScore: number;
}

interface ScoreComparisonProps {
  genres: GenreStat[];
  userMeanScore: number;
}

export function ScoreComparison({ genres, userMeanScore }: ScoreComparisonProps) {
  const topGenres = [...genres]
    .filter(g => g.count >= 5) // Only genres with 5+ anime
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const getScoreDiff = (genreScore: number) => {
    return genreScore - userMeanScore;
  };

  const getDiffIcon = (diff: number) => {
    if (diff > 2) return TrendingUp;
    if (diff < -2) return TrendingDown;
    return Minus;
  };

  const getDiffColor = (diff: number) => {
    if (diff > 2) return "text-green-400";
    if (diff < -2) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-indigo-500/10">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Score Insights</h3>
            <p className="text-sm text-gray-400">Genre preferences analysis</p>
          </div>
        </div>

        {/* Your average */}
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Your Average Score</span>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {userMeanScore.toFixed(1)}
              </div>
              <span className="text-sm text-gray-400">/ 100</span>
            </div>
          </div>
        </div>

        {/* Genre comparisons */}
        <div className="space-y-3">
          {topGenres.map((genre) => {
            const diff = getScoreDiff(genre.meanScore);
            const Icon = getDiffIcon(diff);
            const colorClass = getDiffColor(diff);

            return (
              <div
                key={genre.genre}
                className="p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white mb-1">{genre.genre}</div>
                    <div className="text-xs text-gray-400">{genre.count} anime</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{genre.meanScore.toFixed(0)}</div>
                      <div className={`text-xs font-semibold flex items-center gap-1 ${colorClass}`}>
                        <Icon className="h-3 w-3" />
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${genre.meanScore}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/5">
          <div className="text-xs text-gray-400 text-center">
            {topGenres.filter(g => getScoreDiff(g.meanScore) > 2).length > 0 && (
              <span className="text-green-400 font-semibold">
                ✨ You rate {topGenres.find(g => getScoreDiff(g.meanScore) > 2)?.genre} higher than average
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
