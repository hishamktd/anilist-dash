"use client";

import { Play, Star, TrendingUp } from "lucide-react";
import { MediaListEntry } from "@/types/anilist";

interface AnimeGridItemProps {
  entry: MediaListEntry;
}

export function AnimeGridItem({ entry }: AnimeGridItemProps) {
  const progressPercent = entry.media.episodes
    ? (entry.progress / entry.media.episodes) * 100
    : 0;
  const scoreDiff =
    entry.score && entry.media.averageScore
      ? entry.score - entry.media.averageScore / 10
      : null;

  return (
    <div className="glass-card rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border border-white/5 hover:border-blue-400/40">
      <div className="relative aspect-[2/3]">
        {/* Cover Image */}
        <img
          src={entry.media.coverImage.large}
          alt={entry.media.title.romaji}
          className="w-full h-full object-cover"
        />

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md ${
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
            {entry.status === "CURRENT" ? "WATCHING" : entry.status}
          </span>
        </div>

        {/* Format Badge */}
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
            {entry.media.format}
          </span>
        </div>

        {/* Gradient Overlay - Always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent pointer-events-none" />

        {/* Info Overlay - Always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
          {/* Progress Bar */}
          {entry.media.episodes && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-white font-medium">
                <div className="flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  <span>
                    {entry.progress}/{entry.media.episodes}
                  </span>
                </div>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Score Section */}
          <div className="flex items-center justify-between gap-2">
            {entry.score > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-500/30">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-yellow-400">
                  {entry.score}
                </span>
              </div>
            )}

            {entry.media.averageScore && (
              <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
                <TrendingUp className="h-3 w-3 text-gray-300" />
                <span className="text-xs font-medium text-gray-300">
                  {(entry.media.averageScore / 10).toFixed(1)}
                </span>
              </div>
            )}

            {scoreDiff !== null && Math.abs(scoreDiff) >= 0.5 && (
              <div
                className={`text-[10px] font-bold ${
                  scoreDiff > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {scoreDiff > 0 ? "+" : ""}
                {scoreDiff.toFixed(1)}
              </div>
            )}
          </div>

          {/* Additional Info - Only visible on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1">
            {entry.media.season && entry.media.seasonYear && (
              <div className="text-[10px] text-gray-300 font-medium">
                {entry.media.season} {entry.media.seasonYear}
              </div>
            )}

            {entry.media.duration && (
              <div className="text-[10px] text-gray-300">
                {entry.media.duration} min/ep
              </div>
            )}

            {entry.media.genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {entry.media.genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre}
                    className="text-[9px] px-1.5 py-0.5 bg-purple-500/30 text-purple-200 rounded border border-purple-400/30"
                  >
                    {genre}
                  </span>
                ))}
                {entry.media.genres.length > 2 && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-white/10 text-gray-300 rounded">
                    +{entry.media.genres.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
          {entry.media.title.english || entry.media.title.romaji}
        </h3>
      </div>
    </div>
  );
}
