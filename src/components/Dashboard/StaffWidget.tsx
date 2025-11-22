"use client";

import { Clapperboard, Star } from "lucide-react";

interface StaffStat {
  staff: {
    name: {
      full: string;
    };
  };
  count: number;
  meanScore: number;
}

interface StaffWidgetProps {
  staff: StaffStat[];
}

export function StaffWidget({ staff }: StaffWidgetProps) {
  const topStaff = [...staff]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  if (topStaff.length === 0) {
    return null;
  }

  const maxCount = topStaff[0]?.count || 1;

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Clapperboard className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Top Directors & Staff</h3>
            <p className="text-sm text-gray-400">Most featured creators</p>
          </div>
        </div>

        <div className="space-y-2">
          {topStaff.map((person, index) => {
            const percentage = (person.count / maxCount) * 100;

            return (
              <div
                key={person.staff.name.full}
                className="group"
              >
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white truncate">
                        {person.staff.name.full}
                      </span>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-xs text-gray-400">{person.count}</span>
                        {person.meanScore > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-semibold text-yellow-400">
                              {person.meanScore.toFixed(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
