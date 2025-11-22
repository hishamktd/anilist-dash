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

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg shadow-blue-500/30">
              <Play className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Anime Watched</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{stats.anime.count}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg shadow-purple-500/30">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Days Watched</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{daysWatched}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg shadow-green-500/30">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Manga Read</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{stats.manga.count}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-orange-500 to-red-500 p-3 shadow-lg shadow-orange-500/30">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Episodes</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{stats.anime.episodesWatched}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 p-3 shadow-lg shadow-yellow-500/30">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Mean Score</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">{stats.anime.meanScore.toFixed(1)}</p>
              <p className="text-xs text-gray-400">±{stats.anime.standardDeviation.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-3 shadow-lg shadow-cyan-500/30">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Watching</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{watching}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-3 shadow-lg shadow-pink-500/30">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Planning</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">{planning}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 p-3 shadow-lg shadow-emerald-500/30">
              <ListChecks className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Completed</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{completed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
