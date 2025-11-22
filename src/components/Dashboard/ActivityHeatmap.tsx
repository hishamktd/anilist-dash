"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

interface ActivityItem {
  date: string;
  count: number;
  level: number;
}

interface ActivityHeatmapProps {
  data: ActivityItem[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // Extract available years from data
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    data.forEach(item => {
      const year = new Date(item.date).getFullYear();
      years.add(year);
    });
    // Ensure current year is always available
    years.add(new Date().getFullYear());
    return Array.from(years).sort((a, b) => b - a);
  }, [data]);

  // Generate calendar for selected year
  const { weeks, months, totalActivities } = useMemo(() => {
    const startDate = new Date(selectedYear, 0, 1); // Jan 1st
    const endDate = new Date(selectedYear, 11, 31); // Dec 31st

    // Create a map of dates to activity counts
    const activityMap = new Map<string, number>();
    data.forEach(item => {
      activityMap.set(item.date, item.count);
    });

    // Generate all days for the selected year
    const days: { date: string; count: number; level: number }[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = activityMap.get(dateStr) || 0;
      const level = count === 0 ? 0 : Math.min(Math.ceil(count / 2), 4);

      days.push({
        date: dateStr,
        count,
        level
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Group days into weeks
    const weeks: { date: string; count: number; level: number }[][] = [];
    let currentWeek: { date: string; count: number; level: number }[] = [];

    // Pad the beginning with empty days if needed
    const firstDay = new Date(days[0].date).getDay();
    // Adjust for Monday start (0 = Sunday, 1 = Monday, ...)
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    
    for (let i = 0; i < startOffset; i++) {
      currentWeek.push({ date: '', count: 0, level: -1 });
    }

    days.forEach((day, index) => {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // Add remaining days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: -1 });
      }
      weeks.push(currentWeek);
    }

    // Calculate month positions
    const months: { label: string; offset: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.find(d => d.date);
      if (firstValidDay) {
        const date = new Date(firstValidDay.date);
        const month = date.getMonth();

        if (month !== lastMonth) {
          months.push({
            label: date.toLocaleDateString('en-US', { month: 'short' }),
            offset: weekIndex
          });
          lastMonth = month;
        }
      }
    });

    // Calculate total activities for the selected year
    const totalActivities = days.reduce((sum, day) => sum + day.count, 0);

    return { weeks, months, totalActivities };
  }, [data, selectedYear]);

  const getColor = (level: number) => {
    // Level -1: Invisible (padding)
    if (level === -1) return 'opacity-0';
    
    const colors = [
      'bg-white/5 hover:bg-white/10', // 0 - no activity
      'bg-blue-900/40 hover:bg-blue-800/50', // 1 - low
      'bg-blue-700/60 hover:bg-blue-600/70', // 2 - medium
      'bg-blue-500/80 hover:bg-blue-400/90', // 3 - high
      'bg-blue-400 hover:bg-blue-300', // 4 - very high
    ];
    return colors[level] || colors[0];
  };

  const handleMouseEnter = (e: React.MouseEvent, day: { date: string; count: number }) => {
    if (!day.date) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay({
      ...day,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 max-h-[500px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Calendar className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Activity</h3>
            <p className="text-sm text-gray-400">
              <span className="text-blue-400 font-semibold">{totalActivities}</span> activities in {selectedYear}
            </p>
          </div>
        </div>

        {/* Year Selector */}
        <div className="relative group">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="appearance-none bg-gray-800/50 border border-gray-700 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-gray-800 transition-colors"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="relative overflow-x-auto pb-2 scrollbar-hide">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex mb-2 ml-8 relative h-6">
            {months.map((month, index) => (
              <div
                key={index}
                className="absolute text-xs font-medium text-gray-500"
                style={{
                  left: `${month.offset * 14}px`,
                }}
              >
                {month.label}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] text-[10px] font-medium text-gray-500 pt-[1px]">
              <div className="h-[10px]"></div>
              <div className="h-[10px] leading-[10px]">Mon</div>
              <div className="h-[10px]"></div>
              <div className="h-[10px] leading-[10px]">Wed</div>
              <div className="h-[10px]"></div>
              <div className="h-[10px] leading-[10px]">Fri</div>
              <div className="h-[10px]"></div>
            </div>

            {/* Activity grid */}
            <div className="flex gap-[4px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[4px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-[10px] h-[10px] rounded-sm transition-all duration-200 ${getColor(day.level)}`}
                      onMouseEnter={(e) => handleMouseEnter(e, day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Tooltip using Portal-like positioning (simplified for this context) */}
        {hoveredDay && (
          <div 
            className="fixed pointer-events-none z-50 px-3 py-2 bg-gray-900/90 backdrop-blur-md text-white text-xs rounded-lg shadow-xl border border-white/10 whitespace-nowrap transform -translate-x-1/2 -translate-y-full mt-[-8px]"
            style={{ left: hoveredDay.x, top: hoveredDay.y }}
          >
            <div className="font-bold text-blue-400">
              {hoveredDay.count} {hoveredDay.count === 1 ? 'activity' : 'activities'}
            </div>
            <div className="text-gray-400">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-3 mt-6 text-xs font-medium text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[10px] h-[10px] rounded-sm ${getColor(level).split(' ')[0]}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
