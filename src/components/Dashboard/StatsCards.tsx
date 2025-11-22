import { Play, BookOpen, Clock, Layers, Star, TrendingUp, ListChecks, Calendar } from "lucide-react";

interface StatusCount {
  status: string;
  count: number;
}

interface StatsProps {
  stats: {
    anime: {
      count: number;
      minutesWatched: number;
      episodesWatched: number;
      meanScore: number;
      standardDeviation: number;
      statuses: StatusCount[];
    };
    manga: {
      count: number;
      chaptersRead: number;
      volumesRead: number;
      meanScore: number;
      standardDeviation: number;
      statuses: StatusCount[];
    };
  };
}

export function StatsCards({ stats }: StatsProps) {
  const daysWatched = (stats.anime.minutesWatched / 1440).toFixed(1);

  // Get status counts
  const watching = stats.anime.statuses?.find(s => s.status === 'CURRENT')?.count || 0;
  const planning = stats.anime.statuses?.find(s => s.status === 'PLANNING')?.count || 0;
  const completed = stats.anime.statuses?.find(s => s.status === 'COMPLETED')?.count || 0;

  const cards = [
    {
      label: "Anime Watched",
      value: stats.anime.count,
      icon: Play,
      gradient: "from-blue-500 to-cyan-500",
      textGradient: "from-blue-400 to-cyan-400",
    },
    {
      label: "Days Watched",
      value: daysWatched,
      icon: Clock,
      gradient: "from-purple-500 to-pink-500",
      textGradient: "from-purple-400 to-pink-400",
    },
    {
      label: "Manga Read",
      value: stats.manga.count,
      icon: BookOpen,
      gradient: "from-green-500 to-emerald-500",
      textGradient: "from-green-400 to-emerald-400",
    },
    {
      label: "Episodes",
      value: stats.anime.episodesWatched,
      icon: Layers,
      gradient: "from-orange-500 to-red-500",
      textGradient: "from-orange-400 to-red-400",
    },
    {
      label: "Mean Score",
      value: stats.anime.meanScore.toFixed(1),
      subValue: `±${stats.anime.standardDeviation.toFixed(1)}`,
      icon: Star,
      gradient: "from-yellow-500 to-amber-500",
      textGradient: "from-yellow-400 to-amber-400",
    },
    {
      label: "Watching",
      value: watching,
      icon: TrendingUp,
      gradient: "from-cyan-500 to-blue-500",
      textGradient: "from-cyan-400 to-blue-400",
    },
    {
      label: "Planning",
      value: planning,
      icon: Calendar,
      gradient: "from-pink-500 to-rose-500",
      textGradient: "from-pink-400 to-rose-400",
    },
    {
      label: "Completed",
      value: completed,
      icon: ListChecks,
      gradient: "from-emerald-500 to-teal-500",
      textGradient: "from-emerald-400 to-teal-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
        >
          <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:scale-150`} />
          
          <div className="flex items-center space-x-4">
            <div className={`rounded-xl bg-gradient-to-br ${card.gradient} p-3 shadow-lg`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">{card.label}</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-2xl font-bold bg-gradient-to-r ${card.textGradient} bg-clip-text text-transparent`}>
                  {card.value}
                </p>
                {card.subValue && (
                  <span className="text-xs text-gray-500">{card.subValue}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
