"use client";

import { Tag } from "lucide-react";

interface TagStat {
  tag: {
    name: string;
  };
  count: number;
  meanScore: number;
}

interface TagsCloudProps {
  tags: TagStat[];
}

export function TagsCloud({ tags }: TagsCloudProps) {
  // Sort by count and take top 15
  const topTags = [...tags]
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const maxCount = topTags[0]?.count || 1;
  const minCount = topTags[topTags.length - 1]?.count || 1;

  // Calculate font size based on count
  const getFontSize = (count: number) => {
    const normalized = (count - minCount) / (maxCount - minCount);
    return 12 + normalized * 12; // Range from 12px to 24px
  };

  // Get color based on score
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-400 hover:text-green-300";
    if (score >= 70) return "text-blue-400 hover:text-blue-300";
    if (score >= 60) return "text-yellow-400 hover:text-yellow-300";
    return "text-gray-400 hover:text-gray-300";
  };

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-pink-500" />
        <h3 className="text-xl font-bold text-white">Popular Tags</h3>
      </div>
      <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
        {topTags.map((tag) => {
          const fontSize = getFontSize(tag.count);
          const colorClass = getColor(tag.meanScore);

          return (
            <div
              key={tag.tag.name}
              className={`${colorClass} font-semibold transition-all cursor-default group relative`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {tag.tag.name}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-gray-700">
                {tag.count} anime • ★ {tag.meanScore.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
