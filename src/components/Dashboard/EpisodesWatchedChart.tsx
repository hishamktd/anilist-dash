"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ActivityItem {
  id: number;
  createdAt: number; // Unix timestamp in seconds
  status: string;
  progress: string;
  media: {
    id: number;
    title: {
      romaji: string;
    };
  };
}

interface AnimeListEntry {
  id: number;
  status: string;
  progress: number;
  media: {
    id: number;
    episodes?: number;
  };
  updatedAt: number;
}

interface EpisodesWatchedChartProps {
  activities: ActivityItem[];
  animeList: Array<{ entries: AnimeListEntry[] }>;
}

type TimeFilter = "daily" | "weekly" | "monthly" | "yearly" | "overall";

// Helper function to format labels based on time filter
const formatLabel = (period: string, filter: TimeFilter): string => {
  if (filter === "overall") return "All Time";
  if (filter === "yearly") return period;
  if (filter === "monthly") {
    const [year, month] = period.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }
  if (filter === "weekly" || filter === "daily") {
    const date = new Date(period);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
  return period;
};

export function EpisodesWatchedChart({ activities, animeList }: EpisodesWatchedChartProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("daily");

  const chartData = useMemo(() => {
    // Create a map of media ID to progress history from activities
    const progressMap = new Map<number, Array<{ date: Date; progress: number }>>();
    
    // Filter and process watched episode activities
    const watchedActivities = activities.filter(
      (act) => act.status && act.status.toLowerCase().includes("watched") && act.progress && act.media
    );

    if (watchedActivities.length === 0) {
      console.log("No episode data found. Total activities:", activities.length);
      return [];
    }

    console.log(`Processing ${watchedActivities.length} watched activities out of ${activities.length} total activities`);

    // Build progress history for each anime
    watchedActivities.forEach((act) => {
      const match = act.progress.match(/(\d+)/);
      if (match) {
        const progress = parseInt(match[1], 10);
        const date = new Date(act.createdAt * 1000);
        const mediaId = act.media.id;
        
        if (!progressMap.has(mediaId)) {
          progressMap.set(mediaId, []);
        }
        progressMap.get(mediaId)!.push({ date, progress });
      }
    });

    // Sort each media's progress history by date
    progressMap.forEach((history) => {
      history.sort((a, b) => a.date.getTime() - b.date.getTime());
    });

    // Calculate episodes watched per time period
    const groupedData = new Map<string, number>();

    progressMap.forEach((history) => {
      let lastProgress = 0;
      
      for (let i = 0; i < history.length; i++) {
        const current = history[i];
        
        // Calculate episodes watched in this update
        let episodesWatched = current.progress - lastProgress;
        
        // Handle rewatches (progress decreased)
        if (episodesWatched < 0) {
          episodesWatched = current.progress;
          lastProgress = 0;
        }
        
        if (episodesWatched > 0) {
          const date = current.date;
          let key: string;

          switch (timeFilter) {
            case "daily":
              key = date.toISOString().split("T")[0];
              break;
            case "weekly":
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay());
              key = weekStart.toISOString().split("T")[0];
              break;
            case "monthly":
              key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
              break;
            case "yearly":
              key = `${date.getFullYear()}`;
              break;
            case "overall":
              key = "All Time";
              break;
          }

          groupedData.set(key, (groupedData.get(key) || 0) + episodesWatched);
        }
        
        lastProgress = current.progress;
      }
    });

    // Apply daily cap of 50 episodes per day to prevent unrealistic spikes
    if (timeFilter === "daily") {
      groupedData.forEach((count, key) => {
        if (count > 50) {
          groupedData.set(key, 50);
        }
      });
    }

    // Convert to array and format
    const result = Array.from(groupedData.entries())
      .map(([period, count]) => ({
        period,
        episodes: count,
        displayLabel: formatLabel(period, timeFilter),
      }))
      .sort((a, b) => a.period.localeCompare(b.period));

    if (result.length > 0) {
      console.log(`Date range: ${result[0].period} to ${result[result.length - 1].period} (${result.length} periods)`);
    }

    // For overall, just return total
    if (timeFilter === "overall") {
      const total = result.reduce((sum, item) => sum + item.episodes, 0);
      return [{ period: "All Time", episodes: total, displayLabel: "All Time" }];
    }

    // Limit data points for better visualization
    const maxPoints = timeFilter === "daily" ? 30 : timeFilter === "weekly" ? 12 : 24;
    return result.slice(-maxPoints);
  }, [activities, animeList, timeFilter]);

  const totalEpisodes = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.episodes, 0);
  }, [chartData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-md p-3 rounded-lg border border-white/10 shadow-xl">
          <p className="text-gray-300 font-medium mb-1">{payload[0].payload.displayLabel}</p>
          <p className="text-purple-400 font-bold">
            {payload[0].value} Episode{payload[0].value !== 1 ? "s" : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  const filterButtons: { label: string; value: TimeFilter }[] = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
    { label: "Overall", value: "overall" },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/5 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Episodes Watched</h3>
          <p className="text-sm text-gray-400 mt-1">
            Total: <span className="text-purple-400 font-semibold">{totalEpisodes}</span> episodes
            {timeFilter !== "overall" && chartData.length > 0 && (
              <span className="ml-2 text-gray-500">
                ({chartData.length} {timeFilter === "daily" ? "days" : timeFilter === "weekly" ? "weeks" : timeFilter === "monthly" ? "months" : "years"})
              </span>
            )}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterButtons.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTimeFilter(value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                timeFilter === value
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">No episode watching data available</p>
        </div>
      ) : timeFilter === "overall" ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-gradient mb-2">
              {totalEpisodes}
            </div>
            <p className="text-xl text-gray-400">Total Episodes Watched</p>
          </div>
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="episodesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis
                dataKey="displayLabel"
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                angle={timeFilter === "daily" ? -45 : 0}
                textAnchor={timeFilter === "daily" ? "end" : "middle"}
                height={timeFilter === "daily" ? 80 : 30}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#a855f7", strokeWidth: 2 }} />
              <Area
                type="monotone"
                dataKey="episodes"
                stroke="#a855f7"
                strokeWidth={2}
                fill="url(#episodesGradient)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
