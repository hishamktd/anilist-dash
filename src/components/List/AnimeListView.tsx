"use client";

import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { MediaListEntry } from "@/types/anilist";
import { AnimeListFilters } from "./AnimeListFilters";
import { AnimeGridItem } from "./AnimeGridItem";
import { AnimeListItem } from "./AnimeListItem";

interface AnimeListViewProps {
  entries: MediaListEntry[];
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
      <AnimeListFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        statusOptions={statusOptions}
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
        allFormats={allFormats}
        selectedGenres={selectedGenres}
        toggleGenre={toggleGenre}
        allGenres={allGenres}
        minScore={minScore}
        setMinScore={setMinScore}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
        filteredCount={filteredEntries.length}
        totalCount={entries.length}
      />

      {/* Anime Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredEntries.map((entry) => (
            <AnimeGridItem key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <AnimeListItem key={entry.id} entry={entry} />
          ))}
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
