export interface AniListDate {
  year?: number | null;
  month?: number | null;
  day?: number | null;
}

export interface MediaTitle {
  romaji: string;
  english?: string | null;
  native?: string | null;
}

export interface MediaCoverImage {
  large: string;
  medium?: string;
  color?: string;
}

export interface Media {
  id: number;
  title: MediaTitle;
  coverImage: MediaCoverImage;
  episodes?: number | null;
  chapters?: number | null;
  format: string;
  status: string;
  averageScore?: number | null;
  genres: string[];
  season?: string | null;
  seasonYear?: number | null;
  duration?: number | null;
  bannerImage?: string;
  nextAiringEpisode?: {
    episode: number;
    airingAt: number;
    timeUntilAiring: number;
  };
}

export interface MediaListEntry {
  id: number;
  status: string;
  score: number;
  progress: number;
  updatedAt: number;
  startedAt?: AniListDate;
  completedAt?: AniListDate;
  media: Media;
  repeat?: number;
}

export interface ActivityItem {
  id: number;
  type: string;
  createdAt: number;
  status?: string;
  progress?: string;
  media?: {
    id: number;
    title: {
      romaji: string;
    };
    coverImage?: {
      medium: string;
    };
  };
}

export interface UserStatistics {
  anime: {
    count: number;
    minutesWatched: number;
    episodesWatched: number;
    meanScore: number;
    standardDeviation: number;
    statuses: Array<{ status: string; count: number }>;
    formats: Array<{ format: string; count: number }>;
    genres: Array<{ genre: string; count: number; meanScore: number }>;
    studios: Array<{ studio: { name: string }; count: number; meanScore: number }>;
    staff: Array<{ staff: { name: { full: string } }; count: number; meanScore: number }>;
    releaseYears: Array<{ releaseYear: number; count: number; meanScore: number }>;
    startYears: Array<{ startYear: number; count: number; meanScore: number }>;
    scores: Array<{ score: number; count: number }>;
    lengths: Array<{ length: string; count: number }>;
    countries: Array<{ country: string; count: number; meanScore: number }>;
    tags: Array<{ tag: { name: string }; count: number; meanScore: number }>;
    voiceActors: Array<{ voiceActor: { name: { full: string } }; count: number; meanScore: number }>;
  };
  manga: {
    count: number;
    chaptersRead: number;
    volumesRead: number;
    meanScore: number;
    standardDeviation: number;
    statuses: Array<{ status: string; count: number }>;
    formats: Array<{ format: string; count: number }>;
    genres: Array<{ genre: string; count: number; meanScore: number }>;
  };
}

export interface User {
  id: number;
  name: string;
  avatar: {
    large: string;
  };
  bannerImage: string;
  statistics: UserStatistics;
}
