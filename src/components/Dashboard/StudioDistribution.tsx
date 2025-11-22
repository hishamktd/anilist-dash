"use client";

import { Building2 } from "lucide-react";

interface StudioStat {
  studio: {
    name: string;
  };
  count: number;
  meanScore: number;
}

interface StudioDistributionProps {
  studios: StudioStat[];
}

export function StudioDistribution({ studios }: StudioDistributionProps) {
  // Sort by count and take top 10
  const topStudios = [...studios]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const maxCount = topStudios[0]?.count || 1;

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="h-5 w-5 text-purple-500" />
        <h3 className="text-xl font-bold text-white">Top Studios</h3>
      </div>
      <div className="space-y-3">
        {topStudios.map((studio, index) => {
          const percentage = (studio.count / maxCount) * 100;

          return (
            <div key={studio.studio.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono text-xs w-6">#{index + 1}</span>
                  <span className="text-gray-300 font-medium">{studio.studio.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">{studio.count}</span>
                  <span className="text-yellow-500 font-semibold w-12 text-right">
                    {studio.meanScore > 0 ? `★ ${studio.meanScore.toFixed(0)}` : '—'}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
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
