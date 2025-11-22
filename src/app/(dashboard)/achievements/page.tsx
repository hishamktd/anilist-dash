import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GRAPHQL_QUERIES, setAnilistToken, rateLimitedRequest } from "@/lib/anilist";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AchievementsView } from "@/components/Achievements/AchievementsView";
import { UserAchievementStats } from "@/lib/achievementUtils";

async function getAchievementData(accessToken: string): Promise<UserAchievementStats> {
  setAnilistToken(accessToken);

  // Fetch user data
  const viewerData: any = await rateLimitedRequest(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch anime list
  const animeListData: any = await rateLimitedRequest(GRAPHQL_QUERIES.USER_ANIME_LIST, { userId });

  // Fetch activity data for activity count
  const activityData: any = await rateLimitedRequest(GRAPHQL_QUERIES.USER_ACTIVITY, {
    userId,
    page: 1,
    perPage: 500,
  }).catch(() => ({ Page: { activities: [] } }));

  // Process the data to calculate stats
  const lists = animeListData.MediaListCollection?.lists || [];
  const allEntries = lists.flatMap((list: any) => list.entries || []);

  // Filter to only count anime that have been started or completed (not just planning)
  // This gives a more accurate count of "anime watched"
  const watchedEntries = allEntries.filter((e: any) =>
    e.status === 'COMPLETED' ||
    e.status === 'CURRENT' ||
    e.status === 'DROPPED' ||
    e.status === 'PAUSED' ||
    e.status === 'REPEATING'
  );

  // Calculate basic counts
  const totalAnimeCount = watchedEntries.length; // Only count anime that have been started
  const completedCount = allEntries.filter((e: any) => e.status === 'COMPLETED').length;
  const watchingCount = allEntries.filter((e: any) => e.status === 'CURRENT').length;
  const droppedCount = allEntries.filter((e: any) => e.status === 'DROPPED').length;
  const planningCount = allEntries.filter((e: any) => e.status === 'PLANNING').length;
  const pausedCount = allEntries.filter((e: any) => e.status === 'PAUSED').length;

  // Calculate episodes watched - only count from started/completed anime
  const episodesWatched = watchedEntries.reduce((sum: number, entry: any) => {
    return sum + (entry.progress || 0);
  }, 0);

  // Calculate watch time (approximate: episodes * 24 minutes)
  const watchTimeMinutes = episodesWatched * 24;

  // Calculate mean score - only from watched anime
  const scoredEntries = watchedEntries.filter((e: any) => e.score > 0);
  const meanScore = scoredEntries.length > 0
    ? scoredEntries.reduce((sum: number, e: any) => sum + e.score, 0) / scoredEntries.length
    : 0;

  // Count perfect scores (10/10) - only from watched anime
  const perfectScores = watchedEntries.filter((e: any) => e.score === 10).length;

  // Count rewatches - only from watched anime
  const rewatches = watchedEntries.reduce((sum: number, entry: any) => {
    return sum + (entry.repeat || 0);
  }, 0);

  // Count genres - only from watched anime
  const genreCounts: Record<string, number> = {};
  watchedEntries.forEach((entry: any) => {
    const genres = entry.media?.genres || [];
    genres.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  // Count unique studios - only from watched anime
  const uniqueStudios = new Set<string>();
  watchedEntries.forEach((entry: any) => {
    const studios = entry.media?.studios?.nodes || [];
    studios.forEach((studio: any) => {
      if (studio?.name) uniqueStudios.add(studio.name);
    });
  });
  const studioCounts = uniqueStudios.size;

  // Calculate year span - only from watched anime
  const years = new Set<number>();
  watchedEntries.forEach((entry: any) => {
    const year = entry.media?.seasonYear || entry.media?.startDate?.year;
    if (year) years.add(year);
  });
  const sortedYears = Array.from(years).sort();
  const yearSpan = sortedYears.length > 0
    ? Math.ceil((sortedYears[sortedYears.length - 1] - sortedYears[0]) / 10)
    : 0;

  // Count favorites
  const favoritesCount = viewerData.Viewer.favourites?.anime?.nodes?.length || 0;

  // Count activities
  const activityCount = activityData.Page?.activities?.length || 0;

  // Count currently airing (seasonal) - from all entries since this includes current watching
  const seasonalCurrent = allEntries.filter((e: any) => {
    return e.media?.status === 'RELEASING' && e.status === 'CURRENT';
  }).length;

  // Count by format - only from watched anime
  const formatCounts = {
    tv: watchedEntries.filter((e: any) => e.media?.format === 'TV').length,
    movie: watchedEntries.filter((e: any) => e.media?.format === 'MOVIE').length,
    ova: watchedEntries.filter((e: any) => e.media?.format === 'OVA').length,
    special: watchedEntries.filter((e: any) => e.media?.format === 'SPECIAL').length,
  };

  // Count by country - only from watched anime
  const countryCounts = {
    japan: watchedEntries.filter((e: any) => e.media?.countryOfOrigin === 'JP').length,
    china: watchedEntries.filter((e: any) => e.media?.countryOfOrigin === 'CN').length,
    korea: watchedEntries.filter((e: any) => e.media?.countryOfOrigin === 'KR').length,
  };

  // Check for same-day completions (simplified - would need actual completion dates)
  const sameDayCompletion = 0; // Would need to check completion dates

  return {
    totalAnimeCount,
    completedCount,
    watchingCount,
    episodesWatched,
    watchTimeMinutes,
    meanScore,
    genreCounts,
    studioCounts,
    perfectScores,
    yearSpan,
    favoritesCount,
    rewatches,
    droppedCount,
    planningCount,
    pausedCount,
    activityCount,
    seasonalCurrent,
    formatCounts,
    countryCounts,
    sameDayCompletion,
  };
}

export default async function AchievementsPage() {
  const session: any = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/login");
  }

  const stats = await getAchievementData(session.accessToken as string);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Achievements
          </h1>
          <p className="text-gray-400">
            Track your anime watching milestones and accomplishments
          </p>
        </div>

        <AchievementsView stats={stats} />
      </div>
    </div>
  );
}
