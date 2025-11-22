"use client";

import { CheckCircle2, PlayCircle, PauseCircle, XCircle, Clock, RotateCcw } from "lucide-react";

interface StatusCount {
  status: string;
  count: number;
}

interface StatusOverviewProps {
  statuses: StatusCount[];
}

const statusConfig: Record<string, { label: string; icon: any; color: string; bgColor: string }> = {
  CURRENT: {
    label: "Watching",
    icon: PlayCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  PLANNING: {
    label: "Planning",
    icon: Clock,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  PAUSED: {
    label: "Paused",
    icon: PauseCircle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  DROPPED: {
    label: "Dropped",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  REPEATING: {
    label: "Rewatching",
    icon: RotateCcw,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  }
};

export function StatusOverview({ statuses }: StatusOverviewProps) {
  const total = statuses.reduce((sum, s) => sum + s.count, 0);

  // Order statuses by priority
  const orderedStatuses = ['CURRENT', 'PLANNING', 'COMPLETED', 'PAUSED', 'DROPPED', 'REPEATING']
    .map(status => statuses.find(s => s.status === status))
    .filter(Boolean) as StatusCount[];

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Status Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {orderedStatuses.map((status) => {
          const config = statusConfig[status.status];
          if (!config) return null;

          const Icon = config.icon;
          const percentage = total > 0 ? ((status.count / total) * 100).toFixed(1) : '0';

          return (
            <div
              key={status.status}
              className="rounded-lg bg-gray-800/50 p-4 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`rounded-full p-2 ${config.bgColor}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">{config.label}</p>
                  <p className="text-xs text-gray-500">{percentage}%</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{status.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
