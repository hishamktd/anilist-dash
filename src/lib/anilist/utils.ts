import { AniListDate } from "@/types/anilist";

// Convert AniList date format to JavaScript Date
// Returns null if date is incomplete or invalid
export const normalizeAniListDate = (anilistDate?: AniListDate | null): Date | null => {
  if (!anilistDate?.year) return null;

  const year = anilistDate.year;
  const month = anilistDate.month ?? 1; // Default to January if month not provided
  const day = anilistDate.day ?? 1; // Default to 1st if day not provided

  return new Date(year, month - 1, day); // month is 0-indexed in JS Date
};

// Format AniList date to readable string
export const formatAniListDate = (anilistDate?: AniListDate | null): string | null => {
  const date = normalizeAniListDate(anilistDate);
  if (!date) return null;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
