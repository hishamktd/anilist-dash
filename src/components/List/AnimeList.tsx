"use client";

import { Star, Check, Plus, Trash2 } from "lucide-react";

interface AnimeListProps {
  entries: any[];
  status: string;
}

export function AnimeList({ entries, status }: AnimeListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white capitalize">{status} List</h2>
        <span className="text-gray-400">{entries.length} entries</span>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="group relative overflow-hidden rounded-lg bg-gray-900 shadow-md transition-transform hover:scale-105"
          >
            <div className="aspect-[2/3] w-full overflow-hidden">
              <img
                src={entry.media.coverImage.large}
                alt={entry.media.title.romaji}
                className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <h3 className="line-clamp-2 text-sm font-semibold text-white">
                {entry.media.title.romaji}
              </h3>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{entry.score || "-"}</span>
                </div>
                <span>
                  {entry.progress} / {entry.media.episodes || "?"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
