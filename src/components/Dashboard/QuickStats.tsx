"use client";

import { Flame, Sparkles, Heart, Crown } from "lucide-react";

interface QuickStatsProps {
  animeCount: number;
  meanScore: number;
  daysWatched: number;
  genres: Array<{ genre: string; count: number }>;
}

export function QuickStats({ animeCount, meanScore, daysWatched, genres }: QuickStatsProps) {
  const topGenre = genres.sort((a, b) => b.count - a.count)[0]?.genre || 'Action';

  const stats = [
    {
      icon: Crown,
      label: "Anime Watched",
      value: animeCount,
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-500/10",
      suffix: "",
    },
    {
      icon: Heart,
      label: "Mean Score",
      value: meanScore,
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-500/10",
      suffix: "/100",
    },
    {
      icon: Flame,
      label: "Days Watched",
      value: Math.floor(daysWatched),
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-500/10",
      suffix: "d",
    },
    {
      icon: Sparkles,
      label: "Top Genre",
      value: topGenre.slice(0, 10),
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-500/10",
      suffix: "",
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden group hover:scale-105 transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" style={{ filter: 'brightness(1.5)' }} />
              </div>

              <div className="mb-2">
                {stat.isText ? (
                  <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent truncate`}>
                    {stat.value}
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    {stat.suffix && (
                      <span className="text-sm text-gray-400">{stat.suffix}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="text-sm font-medium text-gray-400">{stat.label}</div>
            </div>

            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full`} />
          </div>
        );
      })}
    </div>
  );
}
