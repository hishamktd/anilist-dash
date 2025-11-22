"use client";

import { PieChart } from "lucide-react";
import { useMemo } from "react";

interface GenreStat {
  genre: string;
  count: number;
  meanScore: number;
}

interface GenreDonutChartProps {
  genres: GenreStat[];
}

const COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#f59e0b", // orange
  "#10b981", // green
  "#06b6d4", // cyan
  "#f43f5e", // rose
  "#6366f1", // indigo
];

export function GenreDonutChart({ genres }: GenreDonutChartProps) {
  const topGenres = useMemo(() => {
    return [...genres].sort((a, b) => b.count - a.count).slice(0, 8);
  }, [genres]);

  const total = topGenres.reduce((sum, g) => sum + g.count, 0);

  // Calculate SVG donut segments
  const segments = useMemo(() => {
    let cumulativePercent = 0;
    const radius = 80;
    const innerRadius = 55;
    const center = 100;

    return topGenres.map((genre, index) => {
      const percentage = (genre.count / total) * 100;
      const startAngle = (cumulativePercent / 100) * 2 * Math.PI - Math.PI / 2;
      const endAngle = ((cumulativePercent + percentage) / 100) * 2 * Math.PI - Math.PI / 2;

      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const ix1 = center + innerRadius * Math.cos(startAngle);
      const iy1 = center + innerRadius * Math.sin(startAngle);
      const ix2 = center + innerRadius * Math.cos(endAngle);
      const iy2 = center + innerRadius * Math.sin(endAngle);

      const largeArcFlag = percentage > 50 ? 1 : 0;

      const path = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${ix2} ${iy2}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1}`,
        'Z'
      ].join(' ');

      cumulativePercent += percentage;

      return {
        path,
        color: COLORS[index % COLORS.length],
        genre: genre.genre,
        count: genre.count,
        percentage: percentage.toFixed(1)
      };
    });
  }, [topGenres, total]);

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="h-5 w-5 text-blue-500" />
        <h3 className="text-xl font-bold text-white">Genre Distribution</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut Chart */}
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
                className="transition-opacity hover:opacity-80 cursor-pointer"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{total}</p>
              <p className="text-xs text-gray-400">Total</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">{segment.genre}</p>
                <p className="text-xs text-gray-500">
                  {segment.count} ({segment.percentage}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
