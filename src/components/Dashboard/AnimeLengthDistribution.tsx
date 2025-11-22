"use client";

import { BarChart3, Film } from "lucide-react";

interface LengthStat {
  length: string;
  count: number;
}

interface AnimeLengthDistributionProps {
  lengths: LengthStat[];
}

const lengthLabels: Record<string, { label: string; color: string; icon: string }> = {
  '<10': { label: 'Short (< 10 min)', color: 'from-cyan-400 to-blue-400', icon: '⚡' },
  '10-30': { label: 'Standard (10-30 min)', color: 'from-blue-400 to-indigo-400', icon: '📺' },
  '>30': { label: 'Long (> 30 min)', color: 'from-indigo-400 to-purple-400', icon: '🎬' },
};

export function AnimeLengthDistribution({ lengths }: AnimeLengthDistributionProps) {
  const total = lengths.reduce((sum, l) => sum + l.count, 0);

  const processedLengths = lengths.map(length => ({
    ...length,
    percentage: (length.count / total) * 100,
    ...lengthLabels[length.length] || { label: length.length, color: 'from-gray-400 to-gray-500', icon: '📊' }
  })).sort((a, b) => b.count - a.count);

  if (total === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-indigo-500/10">
            <Film className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Episode Length</h3>
            <p className="text-sm text-gray-400">Distribution by duration</p>
          </div>
        </div>

        <div className="space-y-4">
          {processedLengths.map((length) => (
            <div key={length.length} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{length.icon}</span>
                  <span className="text-sm font-medium text-gray-300">{length.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">{length.count} anime</span>
                  <span className="text-sm font-bold text-white min-w-[3rem] text-right">
                    {length.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${length.color} rounded-full transition-all duration-500`}
                  style={{ width: `${length.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-400" />
              <span className="text-sm text-gray-400">Total Anime</span>
            </div>
            <span className="text-lg font-bold text-white">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
