"use client";

import { CloudSnow, Sun, Flower2, Leaf } from "lucide-react";

interface YearStat {
  startYear: number;
  count: number;
  meanScore: number;
}

interface SeasonalDistributionProps {
  years: YearStat[];
}

export function SeasonalDistribution({ years }: SeasonalDistributionProps) {
  // Group by recent years (last 5 years)
  const currentYear = new Date().getFullYear();
  const recentYears = years
    .filter(y => y.startYear >= currentYear - 4)
    .sort((a, b) => b.startYear - a.startYear)
    .slice(0, 5);

  const maxCount = Math.max(...recentYears.map(y => y.count), 1);

  const seasons = [
    { name: 'Winter', icon: CloudSnow, color: 'from-cyan-400 to-blue-400', emoji: '❄️' },
    { name: 'Spring', icon: Flower2, color: 'from-pink-400 to-rose-400', emoji: '🌸' },
    { name: 'Summer', icon: Sun, color: 'from-yellow-400 to-orange-400', emoji: '☀️' },
    { name: 'Fall', icon: Leaf, color: 'from-orange-400 to-red-400', emoji: '🍁' },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Sun className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Recent Years</h3>
            <p className="text-sm text-gray-400">Anime by year</p>
          </div>
        </div>

        <div className="space-y-4">
          {recentYears.map((year) => {
            const percentage = (year.count / maxCount) * 100;
            const isCurrentYear = year.startYear === currentYear;

            return (
              <div
                key={year.startYear}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${
                      isCurrentYear ? 'text-blue-400' : 'text-gray-300'
                    }`}>
                      {year.startYear}
                    </span>
                    {isCurrentYear && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{year.count} anime</span>
                    {year.meanScore > 0 && (
                      <span className="text-sm font-bold text-yellow-400">
                        ★ {year.meanScore.toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCurrentYear
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Seasons info card */}
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="text-xs text-gray-500 mb-3 font-medium">ANIME SEASONS</div>
          <div className="grid grid-cols-4 gap-2">
            {seasons.map((season) => {
              const Icon = season.icon;
              return (
                <div
                  key={season.name}
                  className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl">{season.emoji}</span>
                  <span className="text-xs text-gray-400">{season.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
