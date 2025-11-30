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
