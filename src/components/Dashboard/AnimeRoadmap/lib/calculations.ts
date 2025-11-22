import {
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  eachWeekOfInterval,
  format,
} from "date-fns";
import type {
  TimelineEntry,
  DateRange,
  RowAssignments,
  ZoomLevel,
} from "../types";
import { TIMELINE_CONSTANTS, ZOOM_LEVELS, getZoomConfig } from "../config";

/**
 * Calculate the overall date range for the timeline
 */
export function calculateDateRange(entries: TimelineEntry[]): DateRange | null {
  if (entries.length === 0) return null;

  const dates = entries
    .flatMap((entry) => [entry.startDate, entry.endDate || new Date()])
    .filter((date): date is Date => date !== null);

  if (dates.length === 0) return null;

  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  return { start: startOfMonth(minDate), end: endOfMonth(maxDate) };
}

/**
 * Calculate total timeline width in pixels
 */
export function calculateTimelineWidth(
  dateRange: DateRange | null,
  pixelsPerDay: number
): number {
  if (!dateRange) return TIMELINE_CONSTANTS.MIN_TIMELINE_WIDTH_PX;

  const totalDays = Math.ceil(
    (dateRange.end.getTime() - dateRange.start.getTime()) / TIMELINE_CONSTANTS.MS_PER_DAY
  );

  return Math.max(TIMELINE_CONSTANTS.MIN_TIMELINE_WIDTH_PX, totalDays * pixelsPerDay);
}

/**
 * Generate timeline labels based on zoom level
 */
export function generateTimelineLabels(
  dateRange: DateRange | null,
  zoomLevel: ZoomLevel
): Date[] {
  if (!dateRange) return [];

  if (zoomLevel === ZOOM_LEVELS.EXPANDED || zoomLevel === ZOOM_LEVELS.DETAILED) {
    return eachWeekOfInterval({ start: dateRange.start, end: dateRange.end });
  } else {
    return eachMonthOfInterval({ start: dateRange.start, end: dateRange.end });
  }
}

/**
 * Calculate position in pixels from a date
 */
export function getPositionPx(
  date: Date | null,
  dateRange: DateRange | null,
  pixelsPerDay: number
): number {
  if (!date || !dateRange) return 0;

  const daysSinceStart =
    (date.getTime() - dateRange.start.getTime()) / TIMELINE_CONSTANTS.MS_PER_DAY;

  return daysSinceStart * pixelsPerDay;
}

/**
 * Calculate width in pixels for an entry
 * Uses zoom-level config
 */
export function getWidthPx(
  startDate: Date | null,
  endDate: Date | null,
  dateRange: DateRange | null,
  pixelsPerDay: number,
  zoomLevel: ZoomLevel
): number {
  const zoomConfig = getZoomConfig(zoomLevel);

  if (!startDate || !dateRange) return zoomConfig.minWidthPx;

  // For ongoing anime (no end date), extend to current date
  const effectiveEnd = endDate || new Date();

  const durationDays =
    (effectiveEnd.getTime() - startDate.getTime()) / TIMELINE_CONSTANTS.MS_PER_DAY;

  return Math.max(zoomConfig.minWidthPx, durationDays * pixelsPerDay);
}

/**
 * Format timeline label based on zoom level
 */
export function formatTimelineLabel(date: Date, zoomLevel: ZoomLevel): string {
  if (zoomLevel === ZOOM_LEVELS.EXPANDED || zoomLevel === ZOOM_LEVELS.DETAILED) {
    return format(date, "MMM d");
  }
  return format(date, "MMM yyyy");
}

/**
 * Assign rows to timeline entries with smart stacking
 * Ensures entries don't overlap and uses zoom-level spacing/padding
 */
export function calculateRowAssignments(
  entries: TimelineEntry[],
  dateRange: DateRange | null,
  zoomLevel: ZoomLevel
): RowAssignments {
  const assignments = new Map<number, number>();
  const rows: Array<{ endTime: number }> = [];

  // Get zoom-level configuration
  const zoomConfig = getZoomConfig(zoomLevel);

  // Sort entries by start date for proper stacking
  const sortedEntries = [...entries].sort((a, b) => {
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

    // Calculate the actual duration in days
    const durationDays = (endTime - startTime) / TIMELINE_CONSTANTS.MS_PER_DAY;

    // If duration is less than zoom's minimum, ensure next entry comes at least minDurationDays after start
    const effectiveEndTime =
      durationDays < zoomConfig.minDurationDays
        ? startTime + zoomConfig.minDurationDays * TIMELINE_CONSTANTS.MS_PER_DAY
        : endTime;

    // Add zoom-level padding between anime for visual separation
    const paddedEndTime =
      effectiveEndTime + zoomConfig.paddingDays * TIMELINE_CONSTANTS.MS_PER_DAY;

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
}

/**
 * Get pixels per day based on zoom level
 */
export function getPixelsPerDay(zoomLevel: ZoomLevel): number {
  const zoomConfig = getZoomConfig(zoomLevel);
  return zoomConfig.pixelsPerDay;
}
