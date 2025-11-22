"use client";

import { Calendar } from "lucide-react";

interface YearStat {
  releaseYear: number;
  count: number;
  meanScore: number;
}

interface ReleaseYearChartProps {
  years: YearStat[];
}

export function ReleaseYearChart({ years }: ReleaseYearChartProps) {
  // Sort by year and filter out any invalid years
  const sortedYears = [...years]
    .filter(y => y.releaseYear > 1950 && y.releaseYear <= new Date().getFullYear())
    .sort((a, b) => a.releaseYear - b.releaseYear);

  const maxCount = Math.max(...sortedYears.map(y => y.count), 1);

  // Group by decades for better visualization
  const decadeData = new Map<number, { count: number; totalScore: number; scoreCount: number }>();

  sortedYears.forEach(year => {
    const decade = Math.floor(year.releaseYear / 10) * 10;
    const existing = decadeData.get(decade) || { count: 0, totalScore: 0, scoreCount: 0 };
    decadeData.set(decade, {
      count: existing.count + year.count,
      totalScore: existing.totalScore + (year.meanScore * year.count),
      scoreCount: existing.scoreCount + year.count
    });
  });

  const decades = Array.from(decadeData.entries())
    .map(([decade, data]) => ({
      decade,
      count: data.count,
      meanScore: data.totalScore / data.scoreCount
    }))
    .sort((a, b) => a.decade - b.decade);

  const maxDecadeCount = Math.max(...decades.map(d => d.count), 1);

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-cyan-500" />
        <h3 className="text-xl font-bold text-white">Release Years</h3>
      </div>
      <div className="space-y-4">
        {decades.map((decade) => {
          const percentage = (decade.count / maxDecadeCount) * 100;

          return (
            <div key={decade.decade} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300 font-semibold">{decade.decade}s</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">{decade.count} anime</span>
                  <span className="text-yellow-500 font-semibold w-12 text-right">
                    {decade.meanScore > 0 ? `★ ${decade.meanScore.toFixed(0)}` : '—'}
                  </span>
                </div>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
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
