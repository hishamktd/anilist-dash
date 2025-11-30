"use client";

import { Search, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface AnimeListFiltersProps {
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  statusOptions: { value: string; label: string; count: number }[];
  selectedFormat: string;
  setSelectedFormat: Dispatch<SetStateAction<string>>;
  allFormats: string[];
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  allGenres: string[];
  minScore: number;
  setMinScore: Dispatch<SetStateAction<number>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<any>>;
  clearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export function AnimeListFilters({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  selectedStatus,
  setSelectedStatus,
  statusOptions,
  selectedFormat,
  setSelectedFormat,
  allFormats,
  selectedGenres,
  toggleGenre,
  allGenres,
  minScore,
  setMinScore,
  sortBy,
  setSortBy,
  clearFilters,
  filteredCount,
  totalCount,
}: AnimeListFiltersProps) {
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
                  onClick={() => setSortBy(option.value)}
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
          Showing {filteredCount} of {totalCount} anime
        </span>
      </div>
    </div>
  );
}
