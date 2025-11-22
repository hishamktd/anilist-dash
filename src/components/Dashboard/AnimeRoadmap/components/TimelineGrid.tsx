"use client";

import type { TimelineEntry as TimelineEntryType, DateRange, RowAssignments, ZoomLevel } from "../types";
import { TimelineEntry } from "./TimelineEntry";
import { getPositionPx, getWidthPx, formatTimelineLabel } from "../lib";
import { getZoomConfig } from "../config";

interface TimelineGridProps {
  entries: TimelineEntryType[];
  dateRange: DateRange | null;
  timelineWidth: number;
  timelineLabels: Date[];
  rowAssignments: RowAssignments;
  pixelsPerDay: number;
  zoomLevel: ZoomLevel;
}

export function TimelineGrid({
  entries,
  dateRange,
  timelineWidth,
  timelineLabels,
  rowAssignments,
  pixelsPerDay,
  zoomLevel,
}: TimelineGridProps) {
  const zoomConfig = getZoomConfig(zoomLevel);

  return (
    <>
      {/* Timeline Headers */}
      <div
        className="relative h-8 mb-4 border-b border-white/10"
        style={{ width: `${timelineWidth}px` }}
      >
        {timelineLabels.map((label, index) => {
          const positionPx = getPositionPx(label, dateRange, pixelsPerDay);
          return (
            <div
              key={index}
              className="absolute text-xs font-medium text-gray-400"
              style={{ left: `${positionPx}px`, transform: "translateX(-50%)" }}
            >
              {formatTimelineLabel(label, zoomLevel)}
            </div>
          );
        })}
      </div>

      {/* Timeline Entries with Smart Row Stacking */}
      <div
        className="relative"
        style={{
          width: `${timelineWidth}px`,
          height: `${Math.max(rowAssignments.totalRows * zoomConfig.rowHeightPx, zoomConfig.rowHeightPx)}px`,
        }}
      >
        {/* Vertical Grid Lines */}
        {timelineLabels.map((label, index) => {
          const positionPx = getPositionPx(label, dateRange, pixelsPerDay);
          return (
            <div
              key={`line-${index}`}
              className="absolute top-0 bottom-0 w-px bg-white/5"
              style={{ left: `${positionPx}px` }}
            />
          );
        })}

        {/* Timeline Entries */}
        {entries.map((entry) => {
          const leftPx = getPositionPx(entry.startDate, dateRange, pixelsPerDay);
          const widthPx = getWidthPx(entry.startDate, entry.endDate, dateRange, pixelsPerDay, zoomLevel);
          const row = rowAssignments.assignments.get(entry.id) || 0;
          const topPx = row * zoomConfig.rowHeightPx;

          return (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              leftPx={leftPx}
              widthPx={widthPx}
              topPx={topPx}
              zoomLevel={zoomLevel}
            />
          );
        })}
      </div>
    </>
  );
}
