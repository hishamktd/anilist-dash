import { normalizeAniListDate } from "@/lib/anilist";
import type { MediaEntry, TimelineEntry } from "../types";

/**
 * Process and normalize media entries into timeline entries
 */
export function processTimelineEntries(entries: MediaEntry[]): TimelineEntry[] {
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
}

/**
 * Filter timeline entries by status
 */
export function filterEntriesByStatus(
  entries: TimelineEntry[],
  status: "all" | "CURRENT" | "COMPLETED"
): TimelineEntry[] {
  if (status === "all") return entries;
  return entries.filter((entry) => entry.status === status);
}
