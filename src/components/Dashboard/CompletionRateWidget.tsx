"use client";

import { CheckCircle2, Target } from "lucide-react";

interface StatusCount {
  status: string;
  count: number;
}

interface CompletionRateWidgetProps {
  statuses: StatusCount[];
}

export function CompletionRateWidget({ statuses }: CompletionRateWidgetProps) {
  const completed = statuses.find(s => s.status === 'COMPLETED')?.count || 0;
  const total = statuses.reduce((sum, s) => sum + s.count, 0);
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  const current = statuses.find(s => s.status === 'CURRENT')?.count || 0;
  const dropped = statuses.find(s => s.status === 'DROPPED')?.count || 0;
  const paused = statuses.find(s => s.status === 'PAUSED')?.count || 0;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Target className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Completion Rate</h3>
            <p className="text-sm text-gray-400">Your achievement progress</p>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-white/5"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="url(#completionGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="completionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {completionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400 mt-1">Completed</div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-green-400">{completed}</div>
            <div className="text-xs text-gray-500">Done</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-blue-400">{current}</div>
            <div className="text-xs text-gray-500">Watching</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-orange-400">{dropped + paused}</div>
            <div className="text-xs text-gray-500">Paused</div>
          </div>
        </div>

        {/* Achievement badge */}
        {completionRate >= 50 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <div className="text-sm text-green-300 font-medium">
              {completionRate >= 75 ? 'Completionist Master!' : 'Great Progress!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
