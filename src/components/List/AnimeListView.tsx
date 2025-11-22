"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid3x3, List, Star, Calendar, Play, TrendingUp } from "lucide-react";

interface MediaEntry {
  id: number;
  status: string;
  score: number;
  progress: number;
  updatedAt: number;
  startedAt?: {
    year?: number | null;
    month?: number | null;
    day?: number | null;
  };
  completedAt?: {
    year?: number | null;
    month?: number | null;
    day?: number | null;
  };
  media: {
    id: number;
    title: {
      romaji: string;
      english?: string | null;
    };
    coverImage: {
      large: string;
    };
    episodes?: number | null;
    format: string;
    status: string;
    averageScore?: number | null;
    genres: string[];
    season?: string | null;
    seasonYear?: number | null;
    duration?: number | null;
  };
}

interface AnimeListViewProps {
  entries: MediaEntry[];
}

type ViewMode = "grid" | "list";
type SortOption = "title" | "score" | "progress" | "updated" | "episodes";

export function AnimeListView({ entries }: AnimeListViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [minScore, setMinScore] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const genreSet = new Set<string>();
    entries.forEach((entry) => {
      entry.media.genres.forEach((genre) => genreSet.add(genre));
    });
    return Array.from(genreSet).sort();
  }, [entries]);

  // Extract all unique formats
  const allFormats = useMemo(() => {
    const formatSet = new Set<string>();
    entries.forEach((entry) => {
      formatSet.add(entry.media.format);
    });
    return Array.from(formatSet).sort();
  }, [entries]);

  // Status options
  const statusOptions = [
    { value: "ALL", label: "All Status", count: entries.length },
    { value: "CURRENT", label: "Watching", count: entries.filter(e => e.status === "CURRENT").length },
    { value: "COMPLETED", label: "Completed", count: entries.filter(e => e.status === "COMPLETED").length },
    { value: "PLANNING", label: "Planning", count: entries.filter(e => e.status === "PLANNING").length },
    { value: "PAUSED", label: "Paused", count: entries.filter(e => e.status === "PAUSED").length },
    { value: "DROPPED", label: "Dropped", count: entries.filter(e => e.status === "DROPPED").length },
  ];

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    let filtered = entries;

    // Status filter
    if (selectedStatus !== "ALL") {
      filtered = filtered.filter((entry) => entry.status === selectedStatus);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((entry) => {
        const titleRomaji = entry.media.title.romaji.toLowerCase();
        const titleEnglish = entry.media.title.english?.toLowerCase() || "";
        return titleRomaji.includes(query) || titleEnglish.includes(query);
      });
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((entry) =>
        selectedGenres.every((genre) => entry.media.genres.includes(genre))
      );
    }

    // Format filter
    if (selectedFormat !== "ALL") {
      filtered = filtered.filter((entry) => entry.media.format === selectedFormat);
    }

    // Score filter
    if (minScore > 0) {
      filtered = filtered.filter((entry) => entry.score >= minScore);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.media.title.romaji.localeCompare(b.media.title.romaji);
        case "score":
          return (b.score || 0) - (a.score || 0);
        case "progress":
          return b.progress - a.progress;
        case "updated":
          return b.updatedAt - a.updatedAt;
        case "episodes":
          return (b.media.episodes || 0) - (a.media.episodes || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [entries, selectedStatus, searchQuery, selectedGenres, selectedFormat, minScore, sortBy]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStatus("ALL");
    setSelectedGenres([]);
    setSelectedFormat("ALL");
    setMinScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Search and View Controls */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Grid3x3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-lg transition-all ${
                showFilters
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass-card rounded-xl p-6 space-y-6">
          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedStatus === option.value
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>

          {/* Format Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Format</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFormat("ALL")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFormat === "ALL"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                All Formats
              </button>
              {allFormats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFormat === format
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">
              Genres {selectedGenres.length > 0 && `(${selectedGenres.length} selected)`}
            </h3>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedGenres.includes(genre)
                      ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/50"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Score Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">
              Minimum Score: {minScore > 0 ? minScore : "Any"}
            </h3>
            <input
              type="range"
              min="0"
              max="10"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>10</span>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "updated", label: "Recently Updated" },
                { value: "title", label: "Title" },
                { value: "score", label: "My Score" },
                { value: "progress", label: "Progress" },
                { value: "episodes", label: "Episodes" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as SortOption)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === option.value
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/50"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Showing {filteredEntries.length} of {entries.length} anime
        </span>
      </div>

      {/* Anime Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredEntries.map((entry) => {
            const progressPercent = entry.media.episodes
              ? (entry.progress / entry.media.episodes) * 100
              : 0;
            const scoreDiff = entry.score && entry.media.averageScore
              ? entry.score - entry.media.averageScore / 10
              : null;

            return (
              <div
                key={entry.id}
                className="glass-card rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border border-white/5 hover:border-blue-400/40"
              >
                <div className="relative aspect-[2/3]">
                  {/* Cover Image */}
                  <img
                    src={entry.media.coverImage.large}
                    alt={entry.media.title.romaji}
                    className="w-full h-full object-cover"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md ${
                      entry.status === "COMPLETED" ? "bg-green-500/80 text-white" :
                      entry.status === "CURRENT" ? "bg-blue-500/80 text-white" :
                      entry.status === "PLANNING" ? "bg-purple-500/80 text-white" :
                      entry.status === "PAUSED" ? "bg-yellow-500/80 text-white" :
                      "bg-red-500/80 text-white"
                    }`}>
                      {entry.status === "CURRENT" ? "WATCHING" : entry.status}
                    </span>
                  </div>

                  {/* Format Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                      {entry.media.format}
                    </span>
                  </div>

                  {/* Gradient Overlay - Always visible at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent pointer-events-none" />

                  {/* Info Overlay - Always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                    {/* Progress Bar */}
                    {entry.media.episodes && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-white font-medium">
                          <div className="flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            <span>{entry.progress}/{entry.media.episodes}</span>
                          </div>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Score Section */}
                    <div className="flex items-center justify-between gap-2">
                      {entry.score > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-500/30">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-yellow-400">{entry.score}</span>
                        </div>
                      )}

                      {entry.media.averageScore && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
                          <TrendingUp className="h-3 w-3 text-gray-300" />
                          <span className="text-xs font-medium text-gray-300">
                            {(entry.media.averageScore / 10).toFixed(1)}
                          </span>
                        </div>
                      )}

                      {scoreDiff !== null && Math.abs(scoreDiff) >= 0.5 && (
                        <div className={`text-[10px] font-bold ${
                          scoreDiff > 0 ? "text-green-400" : "text-red-400"
                        }`}>
                          {scoreDiff > 0 ? "+" : ""}{scoreDiff.toFixed(1)}
                        </div>
                      )}
                    </div>

                    {/* Additional Info - Only visible on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1">
                      {entry.media.season && entry.media.seasonYear && (
                        <div className="text-[10px] text-gray-300 font-medium">
                          {entry.media.season} {entry.media.seasonYear}
                        </div>
                      )}

                      {entry.media.duration && (
                        <div className="text-[10px] text-gray-300">
                          {entry.media.duration} min/ep
                        </div>
                      )}

                      {entry.media.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.media.genres.slice(0, 2).map((genre) => (
                            <span
                              key={genre}
                              className="text-[9px] px-1.5 py-0.5 bg-purple-500/30 text-purple-200 rounded border border-purple-400/30"
                            >
                              {genre}
                            </span>
                          ))}
                          {entry.media.genres.length > 2 && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-white/10 text-gray-300 rounded">
                              +{entry.media.genres.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title Section */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
                    {entry.media.title.english || entry.media.title.romaji}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((entry) => {
            const progressPercent = entry.media.episodes
              ? (entry.progress / entry.media.episodes) * 100
              : 0;
            const scoreDiff = entry.score && entry.media.averageScore
              ? entry.score - entry.media.averageScore / 10
              : null;

            return (
              <div
                key={entry.id}
                className="glass-card rounded-xl p-4 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border border-white/5 hover:border-blue-400/40 group"
              >
                <div className="flex gap-4">
                  {/* Cover Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={entry.media.coverImage.large}
                      alt={entry.media.title.romaji}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    {/* Status Badge on Image */}
                    <div className="absolute top-1 left-1">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-md ${
                        entry.status === "COMPLETED" ? "bg-green-500/80 text-white" :
                        entry.status === "CURRENT" ? "bg-blue-500/80 text-white" :
                        entry.status === "PLANNING" ? "bg-purple-500/80 text-white" :
                        entry.status === "PAUSED" ? "bg-yellow-500/80 text-white" :
                        "bg-red-500/80 text-white"
                      }`}>
                        {entry.status === "CURRENT" ? "WATCH" : entry.status.slice(0, 4)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Title & Format Row */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {entry.media.title.english || entry.media.title.romaji}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 font-medium">
                          {entry.media.format}
                        </span>
                        {entry.media.season && entry.media.seasonYear && (
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 font-medium">
                            {entry.media.season} {entry.media.seasonYear}
                          </span>
                        )}
                        {entry.media.duration && (
                          <span className="text-xs text-gray-400">
                            {entry.media.duration} min/ep
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {entry.media.episodes && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-300 font-medium">
                            <Play className="h-4 w-4" />
                            <span>
                              {entry.progress} / {entry.media.episodes} episodes
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Score & Genres Row */}
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      {/* Scores */}
                      <div className="flex items-center gap-3">
                        {entry.score > 0 && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-yellow-400">
                              {entry.score}
                            </span>
                            <span className="text-xs text-yellow-400/70">My Score</span>
                          </div>
                        )}

                        {entry.media.averageScore && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                            <TrendingUp className="h-4 w-4 text-gray-300" />
                            <span className="text-sm font-semibold text-gray-300">
                              {(entry.media.averageScore / 10).toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-400">Avg</span>
                          </div>
                        )}

                        {scoreDiff !== null && Math.abs(scoreDiff) >= 0.5 && (
                          <div className={`flex items-center px-2 py-1 rounded-lg ${
                            scoreDiff > 0
                              ? "bg-green-500/20 border border-green-500/30"
                              : "bg-red-500/20 border border-red-500/30"
                          }`}>
                            <span className={`text-sm font-bold ${
                              scoreDiff > 0 ? "text-green-400" : "text-red-400"
                            }`}>
                              {scoreDiff > 0 ? "+" : ""}{scoreDiff.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Genres */}
                      {entry.media.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.media.genres.slice(0, 3).map((genre) => (
                            <span
                              key={genre}
                              className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 font-medium"
                            >
                              {genre}
                            </span>
                          ))}
                          {entry.media.genres.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded border border-white/10">
                              +{entry.media.genres.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredEntries.length === 0 && (
        <div className="glass-card rounded-xl p-12 text-center">
          <TrendingUp className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No anime found</h3>
          <p className="text-sm text-gray-500">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
}
