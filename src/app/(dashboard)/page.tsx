import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { anilistClient, GRAPHQL_QUERIES, setAnilistToken } from "@/lib/anilist";
import { StatsCards } from "@/components/Dashboard/StatsCards";
import { ActivityHeatmap } from "@/components/Dashboard/ActivityHeatmap";
import { Timeline } from "@/components/Dashboard/Timeline";
import { GenreDistribution } from "@/components/Dashboard/GenreDistribution";
import { FormatBreakdown } from "@/components/Dashboard/FormatBreakdown";
import { StudioDistribution } from "@/components/Dashboard/StudioDistribution";
import { ReleaseYearChart } from "@/components/Dashboard/ReleaseYearChart";
import { ScoreDistribution } from "@/components/Dashboard/ScoreDistribution";
import { StatusOverview } from "@/components/Dashboard/StatusOverview";
import { TagsCloud } from "@/components/Dashboard/TagsCloud";
import { CountryDistribution } from "@/components/Dashboard/CountryDistribution";
import { FavoriteCharacters } from "@/components/Dashboard/FavoriteCharacters";
import { NextEpisodeQueue } from "@/components/Dashboard/NextEpisodeQueue";
import { GenreDonutChart } from "@/components/Dashboard/GenreDonutChart";
import { RecommendationsWidget } from "@/components/Dashboard/RecommendationsWidget";
import { TrendingAnimeBoard } from "@/components/Dashboard/TrendingAnimeBoard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getDashboardData(accessToken: string) {
  setAnilistToken(accessToken);

  // Fetch Viewer and Stats
  const viewerData: any = await anilistClient.request(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch all data in parallel for better performance
  const [activityData, favoriteCharacters, currentWatching, trendingAnime, recommendations] = await Promise.all([
    anilistClient.request(GRAPHQL_QUERIES.USER_ACTIVITY, {
      userId,
      page: 1,
      perPage: 50,
    }),
    anilistClient.request(GRAPHQL_QUERIES.FAVORITE_CHARACTERS, { userId }).catch(() => ({ User: { favourites: { characters: { nodes: [] } } } })),
    anilistClient.request(GRAPHQL_QUERIES.CURRENT_WATCHING, { userId }).catch(() => ({ MediaListCollection: { lists: [] } })),
    anilistClient.request(GRAPHQL_QUERIES.TRENDING_ANIME, { page: 1, perPage: 10 }).catch(() => ({ Page: { media: [] } })),
    anilistClient.request(GRAPHQL_QUERIES.RECOMMENDATIONS, { userId }).catch(() => ({ User: { recommendations: { nodes: [] } } })),
  ]);

  return {
    user: viewerData.Viewer,
    activities: (activityData as any).Page.activities,
    favoriteCharacters: (favoriteCharacters as any).User?.favourites?.characters?.nodes || [],
    currentWatching: (currentWatching as any).MediaListCollection?.lists?.[0]?.entries || [],
    trendingAnime: (trendingAnime as any).Page?.media || [],
    recommendations: (recommendations as any).User?.recommendations?.nodes || [],
  };
}

function processActivityForHeatmap(activities: any[]) {
  // This is a simplified version. Real implementation would need more data points.
  // We'll map recent activities to dates.
  const dateMap = new Map<string, number>();
  
  activities.forEach(act => {
    const date = new Date(act.createdAt * 1000).toISOString().split('T')[0];
    dateMap.set(date, (dateMap.get(date) || 0) + 1);
  });

  const heatmapData = Array.from(dateMap.entries()).map(([date, count]) => ({
    date,
    count,
    level: Math.min(count, 4), // Simple level calculation
  })).sort((a, b) => a.date.localeCompare(b.date));

  return heatmapData;
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Welcome to AniDash</h1>
        <p className="text-gray-400">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  // @ts-ignore
  const accessToken = session.accessToken;
  
  try {
    const { user, activities, favoriteCharacters, currentWatching, trendingAnime, recommendations } = await getDashboardData(accessToken);
    const heatmapData = processActivityForHeatmap(activities);

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Welcome back, {user.name}</h2>
          <p className="text-gray-400">Here's what's happening with your anime list.</p>
        </div>

        <StatsCards stats={user.statistics} />

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Next Episode Queue */}
            {currentWatching && currentWatching.length > 0 && (
              <NextEpisodeQueue entries={currentWatching} />
            )}

            {/* Favorite Characters */}
            {favoriteCharacters && favoriteCharacters.length > 0 && (
              <FavoriteCharacters characters={favoriteCharacters} />
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 && (
              <RecommendationsWidget recommendations={recommendations} />
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <StatusOverview statuses={user.statistics.anime.statuses || []} />
              <FormatBreakdown formats={user.statistics.anime.formats || []} />
            </div>

            <ActivityHeatmap data={heatmapData} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <GenreDonutChart genres={user.statistics.anime.genres || []} />
              <GenreDistribution genres={user.statistics.anime.genres || []} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <StudioDistribution studios={user.statistics.anime.studios || []} />
              <ScoreDistribution scores={user.statistics.anime.scores || []} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ReleaseYearChart years={user.statistics.anime.releaseYears || []} />
              <CountryDistribution countries={user.statistics.anime.countries || []} />
            </div>

            <TagsCloud tags={user.statistics.anime.tags || []} />
          </div>

          {/* Right Column - Timeline & Trending */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-8">
              <Timeline items={activities} />
              {trendingAnime && trendingAnime.length > 0 && (
                <TrendingAnimeBoard trendingAnime={trendingAnime} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return (
      <div className="p-4 text-red-500">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }
}
