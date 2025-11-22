"use client";

import { useRef, useEffect } from "react";
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

  // Scroll to show current date (today) on mount and when data changes
  useEffect(() => {
    if (timelineRef.current && filteredEntries.length > 0 && calculations.dateRange) {
      // Delay scroll to ensure content is rendered
      setTimeout(() => {
        if (timelineRef.current && calculations.dateRange) {
          const today = new Date();
          const startDate = calculations.dateRange.start;
          const endDate = calculations.dateRange.end;

          // Calculate position of today
          const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
          const daysFromStart = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

          // Calculate scroll position to center today on screen
          const todayPosition = (daysFromStart / totalDays) * calculations.timelineWidth;
          const containerWidth = timelineRef.current.clientWidth;

          // Scroll so today is visible on the right side of the viewport
          timelineRef.current.scrollLeft = todayPosition - containerWidth + 300;
        }
      }, 100);
    }
  }, [filteredEntries, zoomLevel, calculations.timelineWidth, calculations.dateRange]);

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
