"use client";

import { Mic2, Star } from "lucide-react";

interface VoiceActorStat {
  voiceActor: {
    name: {
      full: string;
    };
  };
  count: number;
  meanScore: number;
}

interface VoiceActorWidgetProps {
  voiceActors: VoiceActorStat[];
}

export function VoiceActorWidget({ voiceActors }: VoiceActorWidgetProps) {
  const topActors = [...voiceActors]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  if (topActors.length === 0) {
    return null;
  }

  const maxCount = topActors[0]?.count || 1;

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-pink-500/10">
            <Mic2 className="h-5 w-5 text-pink-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Top Voice Actors</h3>
            <p className="text-sm text-gray-400">Most featured in your list</p>
          </div>
        </div>

        <div className="space-y-3">
          {topActors.map((actor, index) => {
            const percentage = (actor.count / maxCount) * 100;
            const isTop3 = index < 3;

            return (
              <div
                key={actor.voiceActor.name.full}
                className="group relative"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                    'bg-white/5 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-semibold truncate ${
                        isTop3 ? 'text-white' : 'text-gray-300'
                      }`}>
                        {actor.voiceActor.name.full}
                      </span>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-xs text-gray-400">{actor.count} roles</span>
                        {actor.meanScore > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-semibold text-yellow-400">
                              {actor.meanScore.toFixed(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                          index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                          index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                          'bg-gradient-to-r from-pink-500 to-purple-500'
                        }`}
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
