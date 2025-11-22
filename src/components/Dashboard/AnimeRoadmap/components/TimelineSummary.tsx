"use client";

import { Play, CheckCircle2, Calendar } from "lucide-react";
import type { TimelineEntry } from "../types";

interface TimelineSummaryProps {
  entries: TimelineEntry[];
}

export function TimelineSummary({ entries }: TimelineSummaryProps) {
  const currentCount = entries.filter((e) => e.status === "CURRENT").length;
  const completedCount = entries.filter((e) => e.status === "COMPLETED").length;
  const totalCount = entries.length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg shadow-blue-500/30">
            <Play className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">Currently Watching</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {currentCount}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg shadow-green-500/30">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">Completed</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {completedCount}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg shadow-purple-500/30">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">Total Tracked</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {totalCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
