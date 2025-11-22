import { GraphQLClient } from 'graphql-request';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export const anilistClient = new GraphQLClient(ANILIST_API_URL);

export const setAnilistToken = (token: string) => {
  anilistClient.setHeader('Authorization', `Bearer ${token}`);
};

// Simple in-memory cache with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

// Helper to create cache key
const getCacheKey = (query: string, variables?: any): string => {
  return `${query}-${JSON.stringify(variables || {})}`;
};

// Rate-limited request wrapper
export const rateLimitedRequest = async <T>(
  query: string,
  variables?: any
): Promise<T> => {
  const cacheKey = getCacheKey(query, variables);

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Returning cached data for:', cacheKey.substring(0, 50));
    return cached.data as T;
  }

  // Rate limiting
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const delay = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Rate limiting: waiting ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  lastRequestTime = Date.now();

  try {
    const data = await anilistClient.request<T>(query, variables);

    // Cache the result
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error: any) {
    // If rate limited, throw a more specific error
    if (error?.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }
    throw error;
  }
};

// Clear cache (useful for forcing refresh)
export const clearCache = () => {
  cache.clear();
};

// Helper type for AniList date format
export interface AniListDate {
  year?: number | null;
  month?: number | null;
  day?: number | null;
}

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

export const GRAPHQL_QUERIES = {
  VIEWER: `
    query Viewer {
      Viewer {
        id
        name
        avatar {
          large
        }
        bannerImage
        favourites {
          anime {
            nodes {
              id
            }
          }
        }
        statistics {
          anime {
            count
            minutesWatched
            episodesWatched
            meanScore
            standardDeviation
            statuses {
              status
              count
            }
            formats {
              format
              count
            }
            genres {
              genre
              count
              meanScore
            }
            studios {
              studio {
                name
              }
              count
              meanScore
            }
            staff {
              staff {
                name {
                  full
                }
              }
              count
              meanScore
            }
            releaseYears {
              releaseYear
              count
              meanScore
            }
            startYears {
              startYear
              count
              meanScore
            }
            scores {
              score
              count
            }
            lengths {
              length
              count
            }
            countries {
              country
              count
              meanScore
            }
            tags {
              tag {
                name
              }
              count
              meanScore
            }
            voiceActors {
              voiceActor {
                name {
                  full
                }
              }
              count
              meanScore
            }
          }
          manga {
            count
            chaptersRead
            volumesRead
            meanScore
            standardDeviation
            statuses {
              status
              count
            }
            formats {
              format
              count
            }
            genres {
              genre
              count
              meanScore
            }
          }
        }
      }
    }
  `,
  MEDIA_LIST: `
    query MediaList($userId: Int, $type: MediaType, $status: MediaListStatus) {
      MediaListCollection(userId: $userId, type: $type, status: $status) {
        lists {
          name
          entries {
            id
            startedAt {
              year
              month
              day
            }
            completedAt {
              year
              month
              day
            }
            media {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              episodes
              chapters
              format
              status
              averageScore
              genres
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              season
              seasonYear
              duration
            }
            status
            score
            progress
            updatedAt
          }
        }
      }
    }
  `,
  USER_ACTIVITY: `
    query UserActivity($userId: Int, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        activities(userId: $userId, sort: ID_DESC) {
          ... on ListActivity {
            id
            type
            createdAt
            status
            progress
            media {
              id
              title {
                romaji
              }
              coverImage {
                medium
              }
            }
          }
        }
      }
    }
  `,
  FAVORITE_CHARACTERS: `
    query FavoriteCharacters($userId: Int) {
      User(id: $userId) {
        favourites {
          characters {
            nodes {
              id
              name {
                full
              }
              image {
                large
              }
              favourites
              media {
                nodes {
                  id
                  title {
                    romaji
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  CURRENT_WATCHING: `
    query CurrentWatching($userId: Int) {
      MediaListCollection(userId: $userId, type: ANIME, status: CURRENT) {
        lists {
          entries {
            id
            progress
            media {
              id
              title {
                romaji
                english
              }
              episodes
              nextAiringEpisode {
                episode
                airingAt
                timeUntilAiring
              }
              coverImage {
                large
                color
              }
              bannerImage
            }
          }
        }
      }
    }
  `,
  TRENDING_ANIME: `
    query TrendingAnime($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
            color
          }
          trending
          averageScore
          format
          status
        }
      }
    }
  `,
  AIRING_SCHEDULE: `
    query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        airingSchedules(airingAt_greater: $airingAt_greater, airingAt_lesser: $airingAt_lesser, sort: TIME) {
          id
          airingAt
          episode
          timeUntilAiring
          media {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
              color
            }
            bannerImage
            format
            status
            averageScore
          }
        }
      }
    }
  `,
  RECOMMENDATIONS: `
    query Recommendations($userId: Int) {
      User(id: $userId) {
        id
        recommendations(sort: RATING_DESC, perPage: 10) {
          nodes {
            id
            rating
            mediaRecommendation {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
                color
              }
              averageScore
              format
              status
              genres
            }
          }
        }
      }
    }
  `,
  USER_ANIME_LIST: `
    query UserAnimeList($userId: Int) {
      MediaListCollection(userId: $userId, type: ANIME) {
        lists {
          name
          status
          entries {
            id
            status
            score
            progress
            repeat
            startedAt {
              year
              month
              day
            }
            completedAt {
              year
              month
              day
            }
            media {
              id
              title {
                romaji
                english
              }
              format
              status
              episodes
              duration
              seasonYear
              startDate {
                year
                month
                day
              }
              genres
              countryOfOrigin
              studios {
                nodes {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `
};
