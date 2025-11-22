"use client";

import { TrendingUp, Star } from "lucide-react";
import Image from "next/image";

interface TrendingAnime {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    large: string;
    color: string | null;
  };
  trending: number;
  averageScore: number | null;
  format: string;
  status: string;
}

interface TrendingAnimeBoardProps {
  trendingAnime: TrendingAnime[];
}

export function TrendingAnimeBoard({ trendingAnime }: TrendingAnimeBoardProps) {
  const topTrending = trendingAnime.slice(0, 10);

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-orange-500" />
        <h3 className="text-xl font-bold text-white">Trending Now</h3>
      </div>
      <div className="space-y-3">
        {topTrending.map((anime, index) => (
          <div
            key={anime.id}
            className="group flex gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-orange-500 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold text-sm flex-shrink-0">
              #{index + 1}
            </div>
            <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm line-clamp-1 mb-1">
                {anime.title.english || anime.title.romaji}
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">{anime.format}</span>
                {anime.averageScore && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-3 w-3 fill-yellow-500" />
                    <span className="font-semibold">{anime.averageScore}%</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>{anime.trending}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
