"use client";

import { useState } from "react";
import { formatAniListDate } from "@/lib/anilist";
import type { TimelineEntry as TimelineEntryType, ZoomLevel } from "../types";
import { ENTRY_STYLES, getZoomConfig } from "../config";

interface TimelineEntryProps {
  entry: TimelineEntryType;
  leftPx: number;
  widthPx: number;
  topPx: number;
  zoomLevel: ZoomLevel;
}

export function TimelineEntry({ entry, leftPx, widthPx, topPx, zoomLevel }: TimelineEntryProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const isCompleted = entry.status === "COMPLETED";
  const isCurrent = entry.status === "CURRENT";
  const style = isCompleted ? ENTRY_STYLES.COMPLETED : ENTRY_STYLES.CURRENT;

  // Get zoom-level configuration
  const zoomConfig = getZoomConfig(zoomLevel);

  // Calculate days (to complete for finished, since start for currently watching)
  // Add 1 to include both start and end days
  const dayCount = entry.startDate
    ? Math.ceil(
        ((entry.endDate || new Date()).getTime() - entry.startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTooltipPosition({ x, y });
  };

  return (
    <div
      className="absolute group pr-2"
      style={{
        top: `${topPx}px`,
        left: `${leftPx}px`,
        width: `${widthPx}px`,
        height: `${zoomConfig.heightPx}px`,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Anime Bar */}
      <div
        className={`h-full w-full rounded-lg shadow-xl cursor-pointer transition-all duration-300 hover:z-10 hover:shadow-2xl overflow-visible relative border ${style.gradient} ${style.border} ${style.hoverShadow} ${style.hoverBorder}`}
      >
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none transition-opacity duration-300 group-hover:from-white/30 rounded-lg" />

        {/* Indicator for currently watching (ongoing) */}
        {isCurrent && !entry.endDate && (
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50 rounded-r-lg" />
        )}

        <div className="flex items-center h-full gap-2 relative">
          {/* Sticky Header Section */}
          <div className="sticky -left-4 flex items-center gap-2 bg-gradient-to-r from-[#0f172a20] to-transparent pr-8 pl-2 py-2 rounded-l-lg z-10 max-w-[280px] overflow-hidden">
            <img
              src={entry.coverImage}
              alt={entry.title}
              className="h-10 w-7 object-cover rounded shadow-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate leading-tight">
                {entry.title}
              </p>
              <p className="text-[10px] text-white/80 truncate leading-tight">
                {isCurrent
                  ? `${entry.progress}/${entry.episodes || "?"}`
                  : `${entry.episodes || "?"} eps`}
              </p>
            </div>
          </div>

          {/* Right-aligned Badges */}
          <div className="absolute right-2 flex gap-1.5 flex-shrink-0">
            {dayCount !== null && (
              <div className="bg-white/20 rounded px-1.5 py-0.5">
                <span className="text-[10px] font-bold text-white">{dayCount}</span>
              </div>
            )}
            {entry.score > 0 && (
              <div className="bg-white/20 rounded px-1.5 py-0.5">
                <span className="text-[10px] font-bold text-white">{entry.score}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tooltip on Hover - Positioned near cursor */}
      <div
        className="absolute z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          left: `${tooltipPosition.x + 10}px`,
          top: `${tooltipPosition.y + 10}px`,
        }}
      >
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
            {dayCount !== null && (
              <p>
                <span className="text-gray-400">
                  {isCurrent ? "Days watching:" : "Days to complete:"}
                </span>{" "}
                <span className="text-white font-medium">{dayCount}</span>
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
}
