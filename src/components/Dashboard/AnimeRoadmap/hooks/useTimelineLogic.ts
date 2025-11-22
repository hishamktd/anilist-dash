"use client";

import { useMemo, useState } from "react";
import type {
  MediaEntry,
  TimelineEntry,
  ZoomLevel,
  StatusFilter,
  TimelineCalculations,
} from "../types";
import {
  calculateDateRange,
  calculateTimelineWidth,
  generateTimelineLabels,
  calculateRowAssignments,
  getPixelsPerDay,
  processTimelineEntries,
  filterEntriesByStatus,
} from "../lib";
import { ZOOM_LEVELS, STATUS_FILTERS } from "../config";

interface UseTimelineLogicProps {
  entries: MediaEntry[];
}

interface UseTimelineLogicReturn {
  // State
  selectedStatus: StatusFilter;
  setSelectedStatus: (status: StatusFilter) => void;
  zoomLevel: ZoomLevel;
  setZoomLevel: (zoom: ZoomLevel) => void;

  // Processed data
  timelineEntries: TimelineEntry[];
  filteredEntries: TimelineEntry[];

  // Calculations
  calculations: TimelineCalculations;
  pixelsPerDay: number;
}

export function useTimelineLogic({ entries }: UseTimelineLogicProps): UseTimelineLogicReturn {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>(
    STATUS_FILTERS.ALL as StatusFilter
  );
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(ZOOM_LEVELS.NORMAL as ZoomLevel);

  // Process and normalize entries
  const timelineEntries = useMemo(() => {
    return processTimelineEntries(entries);
  }, [entries]);

  // Filter entries based on selected status
  const filteredEntries = useMemo(() => {
    return filterEntriesByStatus(timelineEntries, selectedStatus);
  }, [timelineEntries, selectedStatus]);

  // Calculate pixels per day based on zoom level
  const pixelsPerDay = useMemo(() => {
    return getPixelsPerDay(zoomLevel);
  }, [zoomLevel]);

  // Calculate date range
  const dateRange = useMemo(() => {
    return calculateDateRange(filteredEntries);
  }, [filteredEntries]);

  // Calculate timeline width
  const timelineWidth = useMemo(() => {
    return calculateTimelineWidth(dateRange, pixelsPerDay);
  }, [dateRange, pixelsPerDay]);

  // Generate timeline labels
  const timelineLabels = useMemo(() => {
    return generateTimelineLabels(dateRange, zoomLevel);
  }, [dateRange, zoomLevel]);

  // Calculate row assignments
  const rowAssignments = useMemo(() => {
    return calculateRowAssignments(filteredEntries, dateRange, zoomLevel);
  }, [filteredEntries, dateRange, zoomLevel]);

  const calculations: TimelineCalculations = {
    dateRange,
    timelineWidth,
    timelineLabels,
    rowAssignments,
  };

  return {
    selectedStatus,
    setSelectedStatus,
    zoomLevel,
    setZoomLevel,
    timelineEntries,
    filteredEntries,
    calculations,
    pixelsPerDay,
  };
}
