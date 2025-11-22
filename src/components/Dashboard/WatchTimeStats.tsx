"use client";

import { Clock, Calendar, Zap, TrendingUp } from "lucide-react";

interface WatchTimeStatsProps {
  minutesWatched: number;
  episodesWatched: number;
}

export function WatchTimeStats({ minutesWatched, episodesWatched }: WatchTimeStatsProps) {
  const daysWatched = Math.floor(minutesWatched / 1440);
  const hoursWatched = Math.floor((minutesWatched % 1440) / 60);
  const totalHours = Math.floor(minutesWatched / 60);
  const avgMinutesPerDay = Math.floor(minutesWatched / 365);
  const avgHoursPerDay = (avgMinutesPerDay / 60).toFixed(1);

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 animate-gradient" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Clock className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Watch Time</h3>
            <p className="text-sm text-gray-400">Your viewing statistics</p>
          </div>
        </div>

        {/* Main stat - Days watched */}
        <div className="mb-6">
          <div className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {daysWatched}
          </div>
          <div className="text-gray-400 text-sm">
            Days of anime watched
            {hoursWatched > 0 && (
              <span className="text-purple-400 ml-2">+ {hoursWatched}h</span>
            )}
          </div>
        </div>

        {/* Grid stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Total Hours</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalHours.toLocaleString()}</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Episodes</span>
            </div>
            <div className="text-2xl font-bold text-white">{episodesWatched.toLocaleString()}</div>
          </div>
        </div>

        {/* Daily average */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Daily Average</span>
            </div>
            <div className="text-lg font-bold text-purple-400">{avgHoursPerDay}h</div>
          </div>
        </div>
      </div>
    </div>
  );
}
