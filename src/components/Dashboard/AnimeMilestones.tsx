"use client";

import { Award, Trophy, Target, Zap } from "lucide-react";

interface AnimeMilestonesProps {
  animeCount: number;
  episodesWatched: number;
}

export function AnimeMilestones({ animeCount, episodesWatched }: AnimeMilestonesProps) {
  const milestones = [
    {
      threshold: 100,
      icon: Trophy,
      title: "Century Club",
      description: "100 anime watched",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-500/10",
      achieved: animeCount >= 100,
    },
    {
      threshold: 500,
      icon: Award,
      title: "Half Legend",
      description: "500 anime watched",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500/10",
      achieved: animeCount >= 500,
    },
    {
      threshold: 1000,
      icon: Target,
      title: "Millennium Master",
      description: "1000 anime watched",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/10",
      achieved: animeCount >= 1000,
    },
    {
      threshold: 5000,
      icon: Zap,
      title: "Episode God",
      description: "5000 episodes watched",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      achieved: episodesWatched >= 5000,
    },
  ];

  const nextMilestone = milestones.find(m => !m.achieved);
  const achievedCount = milestones.filter(m => m.achieved).length;

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-purple-500/5 to-blue-500/5 animate-gradient" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Milestones</h3>
              <p className="text-sm text-gray-400">
                {achievedCount} of {milestones.length} unlocked
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {achievedCount}
            </div>
          </div>
        </div>

        {/* Milestones grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {milestones.map((milestone) => {
            const Icon = milestone.icon;
            return (
              <div
                key={milestone.title}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  milestone.achieved
                    ? 'bg-white/10 border-white/20 shadow-lg'
                    : 'bg-white/5 border-white/5 opacity-60'
                }`}
              >
                {milestone.achieved && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className={`w-10 h-10 rounded-lg ${milestone.bgColor} flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 bg-gradient-to-br ${milestone.color} bg-clip-text text-transparent`} style={{ filter: 'brightness(2)' }} />
                </div>
                <div className="text-sm font-bold text-white mb-1">{milestone.title}</div>
                <div className="text-xs text-gray-400">{milestone.description}</div>
              </div>
            );
          })}
        </div>

        {/* Next milestone progress */}
        {nextMilestone && (
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Next: {nextMilestone.title}</span>
              <span className="text-sm font-bold text-white">
                {nextMilestone.description.includes('episodes') ? episodesWatched : animeCount} / {nextMilestone.threshold}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${nextMilestone.color} rounded-full transition-all duration-500`}
                style={{
                  width: `${Math.min(
                    ((nextMilestone.description.includes('episodes') ? episodesWatched : animeCount) /
                      nextMilestone.threshold) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
