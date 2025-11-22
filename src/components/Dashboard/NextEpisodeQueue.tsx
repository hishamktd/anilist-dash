"use client";

import { Play, Clock } from "lucide-react";
import Image from "next/image";

interface MediaEntry {
  id: number;
  progress: number;
  media: {
    id: number;
    title: {
      romaji: string;
      english: string | null;
    };
    episodes: number | null;
    nextAiringEpisode: {
      episode: number;
      airingAt: number;
      timeUntilAiring: number;
    } | null;
    coverImage: {
      large: string;
      color: string | null;
    };
    bannerImage: string | null;
  };
}

interface NextEpisodeQueueProps {
  entries: MediaEntry[];
}

function formatTimeUntil(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function NextEpisodeQueue({ entries }: NextEpisodeQueueProps) {
  const sortedEntries = [...entries].sort((a, b) => {
    const aTime = a.media.nextAiringEpisode?.timeUntilAiring ?? Infinity;
    const bTime = b.media.nextAiringEpisode?.timeUntilAiring ?? Infinity;
    return aTime - bTime;
  });

  const nextToWatch = sortedEntries.filter(entry => {
    if (entry.media.nextAiringEpisode) {
      return entry.progress < entry.media.nextAiringEpisode.episode - 1;
    }
    return entry.media.episodes ? entry.progress < entry.media.episodes : false;
  }).slice(0, 5);

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Play className="h-5 w-5 text-green-500" />
        <h3 className="text-xl font-bold text-white">Up Next</h3>
      </div>
      <div className="space-y-3">
        {nextToWatch.map((entry) => {
          const nextEpisode = entry.progress + 1;
          const progressPercentage = entry.media.episodes
            ? (entry.progress / entry.media.episodes) * 100
            : 0;

          return (
            <div
              key={entry.id}
              className="group relative overflow-hidden rounded-lg bg-gray-800/50 border border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer"
            >
              <div className="flex gap-3 p-3">
                <div className="relative w-16 h-24 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={entry.media.coverImage.large}
                    alt={entry.media.title.romaji}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                    {entry.media.title.english || entry.media.title.romaji}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>Episode {nextEpisode}</span>
                    {entry.media.episodes && (
                      <span>/ {entry.media.episodes}</span>
                    )}
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  {entry.media.nextAiringEpisode && (
                    <div className="flex items-center gap-1 text-xs text-cyan-400">
                      <Clock className="h-3 w-3" />
                      <span>
                        Ep {entry.media.nextAiringEpisode.episode} in{" "}
                        {formatTimeUntil(entry.media.nextAiringEpisode.timeUntilAiring)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {nextToWatch.length === 0 && (
          <p className="text-gray-400 text-center py-8">No episodes to catch up on!</p>
        )}
      </div>
    </div>
  );
}
