"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ActivityHeatmap } from "./ActivityHeatmap";

interface ActivityItem {
  id: number;
  createdAt: number; // Unix timestamp in seconds
  status: string;
  progress: string;
  media: {
    title: {
      romaji: string;
    };
  };
}

interface DailyActivityChartsProps {
  activities: ActivityItem[];
}

export function DailyActivityCharts({ activities }: DailyActivityChartsProps) {
  const { dailyData, hourlyData, weekDayData, heatmapData } = useMemo(() => {
    const dayMap = new Map<string, number>();
    const hourMap = new Map<number, number>();
    const weekDayMap = new Map<number, number>();
    const dateMap = new Map<string, number>();

    // Initialize hour map (0-23)
    for (let i = 0; i < 24; i++) {
      hourMap.set(i, 0);
    }

    // Initialize weekday map (0-6, Sunday-Saturday)
    for (let i = 0; i < 7; i++) {
      weekDayMap.set(i, 0);
    }

    activities.forEach((act) => {
      const date = new Date(act.createdAt * 1000);
      const dateStr = date.toISOString().split("T")[0];
      const hour = date.getHours();
      const day = date.getDay();

      // Daily counts for bar chart (last 30 days mainly, but we process all)
      dayMap.set(dateStr, (dayMap.get(dateStr) || 0) + 1);

      // Hourly counts
      hourMap.set(hour, (hourMap.get(hour) || 0) + 1);

      // Weekday counts
      weekDayMap.set(day, (weekDayMap.get(day) || 0) + 1);

      // Heatmap data
      dateMap.set(dateStr, (dateMap.get(dateStr) || 0) + 1);
    });

    // Process Daily Data (Sort by date)
    const dailyData = Array.from(dayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Process Hourly Data
    const hourlyData = Array.from(hourMap.entries())
      .map(([hour, count]) => ({
        hour: `${hour}:00`,
        count,
        rawHour: hour,
      }))
      .sort((a, b) => a.rawHour - b.rawHour);

    // Process Weekday Data
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekDayData = Array.from(weekDayMap.entries())
      .map(([day, count]) => ({
        day: days[day],
        count,
        rawDay: day,
      }))
      .sort((a, b) => {
        // Sort starting from Monday (1) to Sunday (0) -> Mon, Tue, ..., Sun
        // 1, 2, 3, 4, 5, 6, 0
        const aVal = a.rawDay === 0 ? 7 : a.rawDay;
        const bVal = b.rawDay === 0 ? 7 : b.rawDay;
        return aVal - bVal;
      });

    // Process Heatmap Data
    const heatmapData = Array.from(dateMap.entries())
      .map(([date, count]) => ({
        date,
        count,
        level: Math.min(count, 4),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return { dailyData, hourlyData, weekDayData, heatmapData };
  }, [activities]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-md p-3 rounded-lg border border-white/10 shadow-xl">
          <p className="text-gray-300 font-medium mb-1">{label}</p>
          <p className="text-blue-400 font-bold">
            {payload[0].value} Activities
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Activity Heatmap */}
      <div className="animate-fade-in-up">
        <h3 className="text-xl font-bold text-white mb-4">Activity Heatmap</h3>
        <ActivityHeatmap data={heatmapData} />
      </div>

      {/* Activity Over Time */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 animate-fade-in-up delay-100">
        <h3 className="text-xl font-bold text-white mb-6">Activity History</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData.slice(-30)}> {/* Show last 30 active days */}
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {dailyData.slice(-30).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity by Hour */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 animate-fade-in-up delay-200">
          <h3 className="text-xl font-bold text-white mb-6">Activity by Hour</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  interval={2}
                />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {hourlyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(${210 + (index * 2)}, 80%, 60%)`} 
                      fillOpacity={0.8} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity by Day of Week */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 animate-fade-in-up delay-300">
          <h3 className="text-xl font-bold text-white mb-6">Activity by Day</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {weekDayData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(${260 + (index * 10)}, 80%, 60%)`} 
                      fillOpacity={0.8} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
