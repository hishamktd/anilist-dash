"use client";

import { Sparkles, Star } from "lucide-react";
import Image from "next/image";

interface Recommendation {
  id: number;
  rating: number;
  mediaRecommendation: {
    id: number;
    title: {
      romaji: string;
      english: string | null;
    };
    coverImage: {
      large: string;
      color: string | null;
    };
    averageScore: number | null;
    format: string;
    status: string;
    genres: string[];
  };
}

interface RecommendationsWidgetProps {
  recommendations: Recommendation[];
}

export function RecommendationsWidget({ recommendations }: RecommendationsWidgetProps) {
  const topRecommendations = recommendations.slice(0, 6);

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <h3 className="text-xl font-bold text-white">Recommended For You</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {topRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="group relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-[2/3] relative">
              <Image
                src={rec.mediaRecommendation.coverImage.large}
                alt={rec.mediaRecommendation.title.romaji}
                fill
                className="object-cover"
              />
              {rec.mediaRecommendation.averageScore && (
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-white">
                    {rec.mediaRecommendation.averageScore}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white font-semibold text-xs line-clamp-2">
                  {rec.mediaRecommendation.title.english || rec.mediaRecommendation.title.romaji}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {rec.mediaRecommendation.genres.slice(0, 2).map((genre) => (
                    <span
                      key={genre}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800/80 text-gray-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
