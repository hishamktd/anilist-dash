"use client";

import { Tag, Star, TrendingUp } from "lucide-react";

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
  // Sort by count and take top 20
  const topTags = [...tags]
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const maxCount = topTags[0]?.count || 1;

  // Get gradient and size based on count
  const getTagStyle = (count: number, score: number) => {
    const popularity = (count / maxCount) * 100;

    if (popularity >= 75) {
      return {
        gradient: "from-pink-500 to-rose-500",
        textGradient: "from-pink-400 to-rose-400",
        shadow: "shadow-pink-500/30",
        size: "text-base px-4 py-2.5",
      };
    } else if (popularity >= 50) {
      return {
        gradient: "from-purple-500 to-violet-500",
        textGradient: "from-purple-400 to-violet-400",
        shadow: "shadow-purple-500/30",
        size: "text-sm px-3.5 py-2",
      };
    } else if (popularity >= 25) {
      return {
        gradient: "from-blue-500 to-cyan-500",
        textGradient: "from-blue-400 to-cyan-400",
        shadow: "shadow-blue-500/30",
        size: "text-sm px-3 py-2",
      };
    } else {
      return {
        gradient: "from-gray-600 to-gray-500",
        textGradient: "from-gray-400 to-gray-300",
        shadow: "shadow-gray-500/20",
        size: "text-xs px-3 py-1.5",
      };
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 p-2 shadow-lg shadow-pink-500/30">
          <Tag className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          Popular Tags
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 justify-start items-center min-h-[200px]">
        {topTags.map((tag) => {
          const style = getTagStyle(tag.count, tag.meanScore);

          return (
            <div
              key={tag.tag.name}
              className={`group relative bg-gradient-to-r ${style.gradient} ${style.size} rounded-full font-semibold text-white shadow-lg ${style.shadow} hover:shadow-2xl transition-all duration-300 cursor-default`}
            >
              <span className="relative z-10">{tag.tag.name}</span>

              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 rounded-full pointer-events-none transition-opacity group-hover:opacity-60" />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 glass-card rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-xl">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-blue-400">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-semibold">{tag.count}</span>
                    <span className="text-gray-400">anime</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-3 w-3 fill-yellow-400" />
                    <span className="font-semibold">{tag.meanScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {topTags.length === 0 && (
        <div className="text-center py-12">
          <Tag className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No tags data available</p>
        </div>
      )}
    </div>
  );
}
