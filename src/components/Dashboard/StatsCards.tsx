import { Play, BookOpen, Clock, Layers } from "lucide-react";

interface StatsProps {
  stats: {
    anime: {
      count: number;
      minutesWatched: number;
      episodesWatched: number;
    };
    manga: {
      count: number;
      chaptersRead: number;
      volumesRead: number;
    };
  };
}

export function StatsCards({ stats }: StatsProps) {
  const daysWatched = (stats.anime.minutesWatched / 1440).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
            <Play className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Anime Watched</p>
            <p className="text-2xl font-bold text-white">{stats.anime.count}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-purple-500/10 p-3 text-purple-500">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Days Watched</p>
            <p className="text-2xl font-bold text-white">{daysWatched}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-green-500/10 p-3 text-green-500">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Manga Read</p>
            <p className="text-2xl font-bold text-white">{stats.manga.count}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-orange-500/10 p-3 text-orange-500">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Episodes</p>
            <p className="text-2xl font-bold text-white">{stats.anime.episodesWatched}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
