"use client";

import { Play, Star, TrendingUp } from "lucide-react";
import { MediaListEntry } from "@/types/anilist";

interface AnimeListItemProps {
  entry: MediaListEntry;
}

export function AnimeListItem({ entry }: AnimeListItemProps) {
  const progressPercent = entry.media.episodes
    ? (entry.progress / entry.media.episodes) * 100
    : 0;
  const scoreDiff =
    entry.score && entry.media.averageScore
      ? entry.score - entry.media.averageScore / 10
      : null;

  return (
    <div className="glass-card rounded-xl p-4 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border border-white/5 hover:border-blue-400/40 group">
      <div className="flex gap-4">
        {/* Cover Image */}
        <div className="relative flex-shrink-0">
          <img
            src={entry.media.coverImage.large}
            alt={entry.media.title.romaji}
            className="w-20 h-28 object-cover rounded-lg"
          />
          {/* Status Badge on Image */}
          <div className="absolute top-1 left-1">
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-md ${
                entry.status === "COMPLETED"
                  ? "bg-green-500/80 text-white"
                  : entry.status === "CURRENT"
                  ? "bg-blue-500/80 text-white"
                  : entry.status === "PLANNING"
                  ? "bg-purple-500/80 text-white"
                  : entry.status === "PAUSED"
                  ? "bg-yellow-500/80 text-white"
                  : "bg-red-500/80 text-white"
              }`}
            >
              {entry.status === "CURRENT" ? "WATCH" : entry.status.slice(0, 4)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title & Format Row */}
          <div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {entry.media.title.english || entry.media.title.romaji}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 font-medium">
                {entry.media.format}
              </span>
              {entry.media.season && entry.media.seasonYear && (
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 font-medium">
                  {entry.media.season} {entry.media.seasonYear}
                </span>
              )}
              {entry.media.duration && (
                <span className="text-xs text-gray-400">
                  {entry.media.duration} min/ep
                </span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {entry.media.episodes && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                  <Play className="h-4 w-4" />
                  <span>
                    {entry.progress} / {entry.media.episodes} episodes
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Score & Genres Row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Scores */}
            <div className="flex items-center gap-3">
              {entry.score > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">
                    {entry.score}
                  </span>
                  <span className="text-xs text-yellow-400/70">My Score</span>
                </div>
              )}

              {entry.media.averageScore && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                  <TrendingUp className="h-4 w-4 text-gray-300" />
                  <span className="text-sm font-semibold text-gray-300">
                    {(entry.media.averageScore / 10).toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400">Avg</span>
                </div>
              )}

              {scoreDiff !== null && Math.abs(scoreDiff) >= 0.5 && (
                <div
                  className={`flex items-center px-2 py-1 rounded-lg ${
                    scoreDiff > 0
                      ? "bg-green-500/20 border border-green-500/30"
                      : "bg-red-500/20 border border-red-500/30"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      scoreDiff > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {scoreDiff > 0 ? "+" : ""}
                    {scoreDiff.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Genres */}
            {entry.media.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {entry.media.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 font-medium"
                  >
                    {genre}
                  </span>
                ))}
                {entry.media.genres.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded border border-white/10">
                    +{entry.media.genres.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
