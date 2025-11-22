"use client";

import { Tv, Film, Video, Radio } from "lucide-react";

interface FormatStat {
  format: string;
  count: number;
}

interface FormatBreakdownProps {
  formats: FormatStat[];
}

const formatIcons: Record<string, any> = {
  TV: Tv,
  MOVIE: Film,
  OVA: Video,
  ONA: Radio,
  SPECIAL: Video,
  MUSIC: Radio,
};

const formatColors: Record<string, string> = {
  TV: "bg-blue-500/10 text-blue-500",
  MOVIE: "bg-purple-500/10 text-purple-500",
  OVA: "bg-green-500/10 text-green-500",
  ONA: "bg-orange-500/10 text-orange-500",
  SPECIAL: "bg-pink-500/10 text-pink-500",
  MUSIC: "bg-cyan-500/10 text-cyan-500",
};

export function FormatBreakdown({ formats }: FormatBreakdownProps) {
  const sortedFormats = [...formats].sort((a, b) => b.count - a.count);
  const totalCount = sortedFormats.reduce((sum, f) => sum + f.count, 0);

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Format Breakdown</h3>
      <div className="grid grid-cols-2 gap-4">
        {sortedFormats.map((format) => {
          const Icon = formatIcons[format.format] || Video;
          const colorClass = formatColors[format.format] || "bg-gray-500/10 text-gray-500";
          const percentage = ((format.count / totalCount) * 100).toFixed(1);

          return (
            <div
              key={format.format}
              className="rounded-lg bg-gray-800/50 p-4 border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`rounded-full p-2 ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-300">
                    {format.format.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-gray-500">{percentage}%</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{format.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
