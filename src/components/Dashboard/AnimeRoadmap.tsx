"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { normalizeAniListDate, formatAniListDate, type AniListDate } from "@/lib/anilist";
import { Calendar, CheckCircle2, Play, ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfWeek,
  endOfWeek,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachDayOfInterval,
  subYears,
  addYears,
  subMonths,
  addMonths,
  subWeeks,
  addWeeks,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";

interface MediaEntry {
  id: number;
  startedAt?: AniListDate | null;
  completedAt?: AniListDate | null;
  status: string;
  score: number;
  progress: number;
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
    averageScore?: number | null;
    genres: string[];
  };
}

interface AnimeRoadmapProps {
  entries: MediaEntry[];
}

interface TimelineEntry {
  id: number;
  title: string;
  coverImage: string;
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  progress: number;
  episodes?: number | null;
  score: number;
  genres: string[];
}

type ZoomLevel = "compact" | "normal" | "detailed" | "expanded";

export function AnimeRoadmap({ entries }: AnimeRoadmapProps) {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "CURRENT" | "COMPLETED">("all");
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("normal");
  const timelineRef = useRef<HTMLDivElement>(null);

  // Process and normalize entries
  const timelineEntries: TimelineEntry[] = useMemo(() => {
    return entries
      .map((entry) => ({
        id: entry.id,
        title: entry.media.title.english || entry.media.title.romaji,
        coverImage: entry.media.coverImage.large,
        startDate: normalizeAniListDate(entry.startedAt),
        endDate: normalizeAniListDate(entry.completedAt),
        status: entry.status,
        progress: entry.progress,
        episodes: entry.media.episodes,
        score: entry.score,
        genres: entry.media.genres,
      }))
      .filter((entry) => entry.startDate !== null) // Only show entries with start dates
      .sort((a, b) => {
        if (!a.startDate || !b.startDate) return 0;
        return a.startDate.getTime() - b.startDate.getTime();
      });
  }, [entries]);

  // Filter entries based on selected status
  const filteredEntries = useMemo(() => {
    if (selectedStatus === "all") return timelineEntries;
    return timelineEntries.filter((entry) => entry.status === selectedStatus);
  }, [timelineEntries, selectedStatus]);

  // Calculate overall date range for the entire timeline
  const dateRange = useMemo(() => {
    if (filteredEntries.length === 0) return null;

    const dates = filteredEntries
      .flatMap((entry) => [entry.startDate, entry.endDate || new Date()])
      .filter((date): date is Date => date !== null);

    if (dates.length === 0) return null;

    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    return { start: startOfMonth(minDate), end: endOfMonth(maxDate) };
  }, [filteredEntries]);

  // All filtered entries are visible in continuous scroll mode
  const visibleEntries = filteredEntries;

  // Pixel width per day based on zoom level
  const pixelsPerDay = useMemo(() => {
    switch (zoomLevel) {
      case "compact": return 2;     // ~60px per month
      case "normal": return 4;       // ~120px per month
      case "detailed": return 8;     // ~240px per month
      case "expanded": return 16;    // ~480px per month
      default: return 4;
    }
  }, [zoomLevel]);

  // Calculate total timeline width in pixels
  const timelineWidth = useMemo(() => {
    if (!dateRange) return 1000;
    const totalDays = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (24 * 60 * 60 * 1000));
    return Math.max(1000, totalDays * pixelsPerDay);
  }, [dateRange, pixelsPerDay]);

  // Generate timeline labels based on zoom level
  const timelineLabels = useMemo(() => {
    if (!dateRange) return [];

    if (zoomLevel === "expanded" || zoomLevel === "detailed") {
      return eachWeekOfInterval({ start: dateRange.start, end: dateRange.end });
    } else {
      return eachMonthOfInterval({ start: dateRange.start, end: dateRange.end });
    }
  }, [dateRange, zoomLevel]);

  // Smart row assignment - stack overlapping anime
  const rowAssignments = useMemo(() => {
    const assignments = new Map<number, number>();
    const rows: Array<{ endTime: number }> = [];

    // Sort entries by start date for proper stacking
    const sortedEntries = [...visibleEntries].sort((a, b) => {
      if (!a.startDate || !b.startDate) return 0;
      return a.startDate.getTime() - b.startDate.getTime();
    });

    sortedEntries.forEach((entry) => {
      if (!entry.startDate) return;

      const startTime = entry.startDate.getTime();
      // For currently watching anime without end date, use a far future date for layout
      const endTime = entry.endDate
        ? entry.endDate.getTime()
        : (dateRange?.end.getTime() || new Date().getTime());

      // Add small padding (1 day) between anime for better visual separation
      const paddedEndTime = endTime + (24 * 60 * 60 * 1000);

      // Find the first row where this entry doesn't overlap
      let assignedRow = -1;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].endTime <= startTime) {
          assignedRow = i;
          rows[i].endTime = paddedEndTime;
          break;
        }
      }

      // If no suitable row found, create a new one
      if (assignedRow === -1) {
        assignedRow = rows.length;
        rows.push({ endTime: paddedEndTime });
      }

      assignments.set(entry.id, assignedRow);
    });

    return { assignments, totalRows: rows.length };
  }, [visibleEntries, dateRange]);

  // Calculate position in pixels
  const getPositionPx = (date: Date | null) => {
    if (!date || !dateRange) return 0;
    const daysSinceStart = (date.getTime() - dateRange.start.getTime()) / (24 * 60 * 60 * 1000);
    return daysSinceStart * pixelsPerDay;
  };

  // Calculate width in pixels
  const getWidthPx = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !dateRange) return 100; // Minimum width

    // For ongoing anime (no end date), extend to current date
    const effectiveEnd = endDate || new Date();

    const durationDays = (effectiveEnd.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
    return Math.max(100, durationDays * pixelsPerDay); // Minimum 100px width
  };

  // Format label based on zoom level
  const formatTimelineLabel = (date: Date) => {
    if (zoomLevel === "expanded" || zoomLevel === "detailed") {
      return format(date, "MMM d");
    }
    return format(date, "MMM yyyy");
  };


  if (filteredEntries.length === 0) {
    return (
      <div className="glass-card rounded-xl p-12 text-center">
        <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No Timeline Data</h3>
        <p className="text-sm text-gray-400">
          Start dates are needed to display anime on the timeline. Make sure to update your start dates on AniList.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* Status Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedStatus === "all"
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus("CURRENT")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedStatus === "CURRENT"
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Play className="h-4 w-4" />
            Watching
          </button>
          <button
            onClick={() => setSelectedStatus("COMPLETED")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedStatus === "COMPLETED"
                ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/50"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </button>
        </div>

        {/* Zoom Level Selector */}
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-300 mr-2">Zoom:</span>
          <button
            onClick={() => setZoomLevel("compact")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              zoomLevel === "compact"
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            Compact
          </button>
          <button
            onClick={() => setZoomLevel("normal")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              zoomLevel === "normal"
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setZoomLevel("detailed")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              zoomLevel === "detailed"
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            Detailed
          </button>
          <button
            onClick={() => setZoomLevel("expanded")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              zoomLevel === "expanded"
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            Expanded
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div
        ref={timelineRef}
        className="glass-card rounded-xl p-6 overflow-x-auto relative"
      >
        {visibleEntries.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-300">No anime found</p>
          </div>
        ) : (
          <>
            {/* Timeline Headers */}
            <div className="relative h-8 mb-4 border-b border-white/10" style={{ width: `${timelineWidth}px` }}>
              {timelineLabels.map((label, index) => {
                const positionPx = getPositionPx(label);
                return (
                  <div
                    key={index}
                    className="absolute text-xs font-medium text-gray-400"
                    style={{ left: `${positionPx}px`, transform: "translateX(-50%)" }}
                  >
                    {formatTimelineLabel(label)}
                  </div>
                );
              })}
            </div>

            {/* Timeline Entries with Smart Row Stacking */}
            <div
              className="relative"
              style={{
                width: `${timelineWidth}px`,
                height: `${Math.max(rowAssignments.totalRows * 68, 68)}px`
              }}
            >
              {visibleEntries.map((entry) => {
                const leftPx = getPositionPx(entry.startDate);
                const widthPx = getWidthPx(entry.startDate, entry.endDate);
                const isCompleted = entry.status === "COMPLETED";
                const isCurrent = entry.status === "CURRENT";
                const row = rowAssignments.assignments.get(entry.id) || 0;

                return (
                  <div
                    key={entry.id}
                    className="absolute h-14 group"
                    style={{
                      top: `${row * 68}px`,
                      left: `${leftPx}px`,
                      width: `${widthPx}px`,
                    }}
                  >
                    {/* Anime Bar */}
                    <div
                      className={`h-full w-full rounded-lg shadow-xl cursor-pointer transition-all duration-300 hover:z-10 hover:shadow-2xl hover:scale-105 overflow-hidden relative border ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 border-green-400/30 hover:shadow-green-500/50"
                          : "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 border-blue-400/30 hover:shadow-blue-500/50"
                      }`}
                    >
                      {/* Glossy overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none" />

                      {/* Indicator for currently watching (ongoing) */}
                      {isCurrent && !entry.endDate && (
                        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50" />
                      )}
                      <div className="flex items-center h-full px-2 gap-2">
                        <img
                          src={entry.coverImage}
                          alt={entry.title}
                          className="h-10 w-7 object-cover rounded shadow-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <p className="text-xs font-medium text-white truncate leading-tight">
                            {entry.title}
                          </p>
                          <p className="text-[10px] text-white/80 truncate leading-tight">
                            {isCurrent
                              ? `${entry.progress}/${entry.episodes || "?"}`
                              : `${entry.episodes || "?"} eps`}
                          </p>
                        </div>
                        {entry.score > 0 && (
                          <div className="bg-white/20 rounded px-1.5 py-0.5 flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">{entry.score}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute left-0 top-16 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 shadow-xl min-w-[250px]">
                        <p className="font-medium text-white mb-2">{entry.title}</p>
                        <div className="space-y-1 text-xs text-gray-300">
                          <p>
                            <span className="text-gray-400">Started:</span>{" "}
                            {formatAniListDate(
                              entry.startDate
                                ? {
                                    year: entry.startDate.getFullYear(),
                                    month: entry.startDate.getMonth() + 1,
                                    day: entry.startDate.getDate(),
                                  }
                                : null
                            )}
                          </p>
                          {entry.endDate && (
                            <p>
                              <span className="text-gray-400">Completed:</span>{" "}
                              {formatAniListDate({
                                year: entry.endDate.getFullYear(),
                                month: entry.endDate.getMonth() + 1,
                                day: entry.endDate.getDate(),
                              })}
                            </p>
                          )}
                          <p>
                            <span className="text-gray-400">Progress:</span> {entry.progress}/
                            {entry.episodes || "?"}
                          </p>
                          {entry.genres.length > 0 && (
                            <p>
                              <span className="text-gray-400">Genres:</span>{" "}
                              {entry.genres.slice(0, 3).join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg shadow-blue-500/30">
              <Play className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Currently Watching</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {timelineEntries.filter((e) => e.status === "CURRENT").length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg shadow-green-500/30">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Completed</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {timelineEntries.filter((e) => e.status === "COMPLETED").length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg shadow-purple-500/30">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Total Tracked</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {timelineEntries.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
