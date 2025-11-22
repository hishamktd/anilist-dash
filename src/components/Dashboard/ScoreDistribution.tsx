"use client";

import { BarChart3 } from "lucide-react";

interface ScoreStat {
  score: number;
  count: number;
}

interface ScoreDistributionProps {
  scores: ScoreStat[];
}

export function ScoreDistribution({ scores }: ScoreDistributionProps) {
  // Filter out 0 scores (unrated) and sort by score
  const sortedScores = [...scores]
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const maxCount = Math.max(...sortedScores.map(s => s.count), 1);
  const totalRated = sortedScores.reduce((sum, s) => sum + s.count, 0);

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 85) return "from-green-500 to-emerald-500";
    if (score >= 70) return "from-blue-500 to-cyan-500";
    if (score >= 55) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 55) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-blue-500" />
        <h3 className="text-xl font-bold text-white">Score Distribution</h3>
      </div>
      <div className="space-y-2">
        {sortedScores.map((scoreStat) => {
          const percentage = (scoreStat.count / maxCount) * 100;
          const countPercentage = ((scoreStat.count / totalRated) * 100).toFixed(1);

          return (
            <div key={scoreStat.score} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className={`font-bold ${getScoreTextColor(scoreStat.score)}`}>
                  {scoreStat.score}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{scoreStat.count}</span>
                  <span className="text-gray-500 text-xs w-12 text-right">
                    {countPercentage}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreColor(scoreStat.score)} rounded-full transition-all duration-500`}
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
