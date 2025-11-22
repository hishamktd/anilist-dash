"use client";

import { useRef } from "react";
import { Calendar } from "lucide-react";
import type { MediaEntry } from "./types";
import { useTimelineLogic } from "./hooks";
import {
  TimelineControls,
  TimelineGrid,
  TimelineSummary,
  EmptyState,
} from "./components";

interface AnimeRoadmapProps {
  entries: MediaEntry[];
}

export function AnimeRoadmap({ entries }: AnimeRoadmapProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const {
    selectedStatus,
    setSelectedStatus,
    zoomLevel,
    setZoomLevel,
    timelineEntries,
    filteredEntries,
    calculations,
    pixelsPerDay,
  } = useTimelineLogic({ entries });

  if (filteredEntries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <TimelineControls
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
      />

      {/* Timeline Container */}
      <div ref={timelineRef} className="glass-card rounded-xl p-6 overflow-x-auto relative">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-300">No anime found</p>
          </div>
        ) : (
          <TimelineGrid
            entries={filteredEntries}
            dateRange={calculations.dateRange}
            timelineWidth={calculations.timelineWidth}
            timelineLabels={calculations.timelineLabels}
            rowAssignments={calculations.rowAssignments}
            pixelsPerDay={pixelsPerDay}
            zoomLevel={zoomLevel}
          />
        )}
      </div>

      {/* Summary Stats */}
      <TimelineSummary entries={timelineEntries} />
    </div>
  );
}
