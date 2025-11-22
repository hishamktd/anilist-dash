import type { AniListDate } from "@/lib/anilist";

/**
 * Timeline Types and Interfaces
 */

export interface MediaEntry {
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

export interface TimelineEntry {
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

export interface DateRange {
  start: Date;
  end: Date;
}

export interface RowAssignments {
  assignments: Map<number, number>;
  totalRows: number;
}

export type ZoomLevel = "compact" | "normal" | "detailed" | "expanded";

export type StatusFilter = "all" | "CURRENT" | "COMPLETED";

export interface TimelineConfig {
  zoomLevel: ZoomLevel;
  statusFilter: StatusFilter;
  pixelsPerDay: number;
  timelineWidth: number;
}

export interface TimelineCalculations {
  dateRange: DateRange | null;
  timelineWidth: number;
  timelineLabels: Date[];
  rowAssignments: RowAssignments;
}
