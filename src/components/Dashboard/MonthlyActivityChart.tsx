"use client";

import { Calendar, Activity } from "lucide-react";
import { useMemo } from "react";

interface ActivityItem {
  date: string;
  count: number;
  level: number;
}

interface MonthlyActivityChartProps {
  data: ActivityItem[];
}

export function MonthlyActivityChart({ data }: MonthlyActivityChartProps) {
  const monthlyData = useMemo(() => {
    const months = new Map<string, number>();

    data.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.set(monthKey, (months.get(monthKey) || 0) + item.count);
    });

    // Get last 12 months
    const result = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      result.push({
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        count: months.get(key) || 0,
        monthKey: key
      });
    }

    return result;
  }, [data]);

  const maxCount = Math.max(...monthlyData.map(m => m.count), 1);
  const totalActivity = monthlyData.reduce((sum, m) => sum + m.count, 0);
  const avgActivity = (totalActivity / 12).toFixed(1);

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10">
              <Activity className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Monthly Activity</h3>
              <p className="text-sm text-gray-400">Last 12 months</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-teal-400">{avgActivity}</div>
            <div className="text-xs text-gray-400">avg/month</div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end justify-between gap-2 h-40 mb-4">
          {monthlyData.map((month, index) => {
            const height = maxCount > 0 ? (month.count / maxCount) * 100 : 0;
            const isCurrentMonth = index === monthlyData.length - 1;

            return (
              <div key={month.monthKey} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end" style={{ height: '100%' }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group ${
                      isCurrentMonth
                        ? 'bg-gradient-to-t from-teal-500 to-cyan-400'
                        : 'bg-gradient-to-t from-blue-500/50 to-purple-500/50'
                    }`}
                    style={{ height: `${height}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {month.count} activities
                    </div>
                  </div>
                </div>
                <div className={`text-xs font-medium ${
                  isCurrentMonth ? 'text-teal-400' : 'text-gray-500'
                }`}>
                  {month.month}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-teal-400">{totalActivity}</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-blue-400">{Math.max(...monthlyData.map(m => m.count))}</div>
            <div className="text-xs text-gray-400">Peak</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-purple-400">{monthlyData[monthlyData.length - 1]?.count || 0}</div>
            <div className="text-xs text-gray-400">This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
