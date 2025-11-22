"use client";

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
  const isCompleted = entry.status === "COMPLETED";
  const isCurrent = entry.status === "CURRENT";
  const style = isCompleted ? ENTRY_STYLES.COMPLETED : ENTRY_STYLES.CURRENT;

  // Get zoom-level configuration
  const zoomConfig = getZoomConfig(zoomLevel);

  // Calculate days (to complete for finished, since start for currently watching)
  // Minimum is 1 day (same-day completion counts as 1 day)
  const dayCount = entry.startDate
    ? Math.max(
        1,
        Math.ceil(
          ((entry.endDate || new Date()).getTime() - entry.startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;

  return (
    <div
      className="absolute group"
      style={{
        top: `${topPx}px`,
        left: `${leftPx}px`,
        width: `${widthPx}px`,
        height: `${zoomConfig.heightPx}px`,
      }}
    >
      {/* Anime Bar */}
      <div
        className={`h-full w-full rounded-lg shadow-xl cursor-pointer transition-all duration-300 hover:z-10 hover:shadow-2xl overflow-hidden relative border ${style.gradient} ${style.border} ${style.hoverShadow} ${style.hoverBorder}`}
      >
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none transition-opacity duration-300 group-hover:from-white/30" />

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
          <div className="flex gap-1.5 flex-shrink-0">
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
