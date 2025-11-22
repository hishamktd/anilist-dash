import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GRAPHQL_QUERIES, setAnilistToken, rateLimitedRequest } from "@/lib/anilist";
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
import { WatchTimeStats } from "@/components/Dashboard/WatchTimeStats";
import { CompletionRateWidget } from "@/components/Dashboard/CompletionRateWidget";
import { VoiceActorWidget } from "@/components/Dashboard/VoiceActorWidget";
import { AnimeLengthDistribution } from "@/components/Dashboard/AnimeLengthDistribution";
import { SeasonalDistribution } from "@/components/Dashboard/SeasonalDistribution";
import { AnimeMilestones } from "@/components/Dashboard/AnimeMilestones";
import { ScoreComparison } from "@/components/Dashboard/ScoreComparison";
import { StaffWidget } from "@/components/Dashboard/StaffWidget";
import { MonthlyActivityChart } from "@/components/Dashboard/MonthlyActivityChart";
import { LandingPage } from "@/components/LandingPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getDashboardData(accessToken: string) {
  setAnilistToken(accessToken);

  // Fetch Viewer and Stats first
  const viewerData: any = await rateLimitedRequest(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch remaining data sequentially to avoid rate limiting
  const activityData: any = await rateLimitedRequest(GRAPHQL_QUERIES.USER_ACTIVITY, {
    userId,
    page: 1,
    perPage: 500,
  }).catch(() => ({ Page: { activities: [] } }));

  const favoriteCharacters: any = await rateLimitedRequest(GRAPHQL_QUERIES.FAVORITE_CHARACTERS, { userId })
    .catch(() => ({ User: { favourites: { characters: { nodes: [] } } } }));

  const currentWatching: any = await rateLimitedRequest(GRAPHQL_QUERIES.CURRENT_WATCHING, { userId })
    .catch(() => ({ MediaListCollection: { lists: [] } }));

  const trendingAnime: any = await rateLimitedRequest(GRAPHQL_QUERIES.TRENDING_ANIME, { page: 1, perPage: 10 })
    .catch(() => ({ Page: { media: [] } }));

  const recommendations: any = await rateLimitedRequest(GRAPHQL_QUERIES.RECOMMENDATIONS, { userId })
    .catch(() => ({ User: { recommendations: { nodes: [] } } }));

  return {
    user: viewerData.Viewer,
    activities: activityData.Page?.activities || [],
    favoriteCharacters: favoriteCharacters.User?.favourites?.characters?.nodes || [],
    currentWatching: currentWatching.MediaListCollection?.lists?.[0]?.entries || [],
    trendingAnime: trendingAnime.Page?.media || [],
    recommendations: recommendations.User?.recommendations?.nodes || [],
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
    return <LandingPage />;
  }

  // @ts-ignore
  const accessToken = session.accessToken;
  
  try {
    const { user, activities, favoriteCharacters, currentWatching, trendingAnime, recommendations } = await getDashboardData(accessToken);
    const heatmapData = processActivityForHeatmap(activities);

    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="text-gradient">{user.name}</span>
            </h2>
            <p className="text-gray-400">Here's what's happening with your anime list.</p>
          </div>
        </div>

        <div className="animate-fade-in-up delay-100">
          <StatsCards stats={user.statistics} />
        </div>


        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Next Episode Queue */}
            {currentWatching && currentWatching.length > 0 && (
              <div className="animate-fade-in-up delay-200">
                <NextEpisodeQueue entries={currentWatching} />
              </div>
            )}

            {/* Favorite Characters */}
            {favoriteCharacters && favoriteCharacters.length > 0 && (
              <div className="animate-fade-in-up delay-300">
                <FavoriteCharacters characters={favoriteCharacters} />
              </div>
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 && (
              <div className="animate-fade-in-up delay-300">
                <RecommendationsWidget recommendations={recommendations} />
              </div>
            )}

            {/* New Premium Stats Widgets */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-fade-in-up delay-400">
              <WatchTimeStats
                minutesWatched={user.statistics.anime.minutesWatched}
                episodesWatched={user.statistics.anime.episodesWatched}
              />
              <CompletionRateWidget statuses={user.statistics.anime.statuses || []} />
              <SeasonalDistribution years={user.statistics.anime.startYears || []} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up delay-400">
              <StatusOverview statuses={user.statistics.anime.statuses || []} />
              <FormatBreakdown formats={user.statistics.anime.formats || []} />
            </div>

            <div className="animate-fade-in-up delay-400">
              <ActivityHeatmap data={heatmapData} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up delay-500">
              <GenreDonutChart genres={user.statistics.anime.genres || []} />
              <GenreDistribution genres={user.statistics.anime.genres || []} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up delay-500">
              <AnimeLengthDistribution lengths={user.statistics.anime.lengths || []} />
              <VoiceActorWidget voiceActors={user.statistics.anime.voiceActors || []} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up delay-500">
              <StudioDistribution studios={user.statistics.anime.studios || []} />
              <ScoreDistribution scores={user.statistics.anime.scores || []} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up delay-500">
              <ReleaseYearChart years={user.statistics.anime.releaseYears || []} />
              <CountryDistribution countries={user.statistics.anime.countries || []} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up delay-600">
              <StaffWidget staff={user.statistics.anime.staff || []} />
              <ScoreComparison
                genres={user.statistics.anime.genres || []}
                userMeanScore={user.statistics.anime.meanScore || 0}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-fade-in-up delay-600">
              <AnimeMilestones
                animeCount={user.statistics.anime.count}
                episodesWatched={user.statistics.anime.episodesWatched}
              />
              <MonthlyActivityChart data={heatmapData} />
            </div>

            <div className="animate-fade-in-up delay-700">
              <TagsCloud tags={user.statistics.anime.tags || []} />
            </div>
          </div>

          {/* Right Column - Timeline & Trending */}
          <div className="xl:col-span-1 animate-fade-in-up delay-300">
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

