import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GRAPHQL_QUERIES, setAnilistToken, rateLimitedRequest } from "@/lib/anilist";
import { DailyActivityCharts } from "@/components/Dashboard/DailyActivityCharts";
import { EpisodesWatchedChart } from "@/components/Dashboard/EpisodesWatchedChart";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LandingPage } from "@/components/LandingPage";

async function getActivityData(accessToken: string) {
  setAnilistToken(accessToken);

  const viewerData: any = await rateLimitedRequest(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch activity data - fetch multiple pages to get more historical data
  const allActivities: any[] = [];
  const maxPages = 20; // Fetch up to 20 pages (1000 activities) for better historical coverage
  
  for (let page = 1; page <= maxPages; page++) {
    try {
      const activityData: any = await rateLimitedRequest(GRAPHQL_QUERIES.USER_ACTIVITY, {
        userId,
        page,
        perPage: 50,
      });
      
      const activities = activityData.Page?.activities || [];
      if (activities.length === 0) break; // No more activities
      
      allActivities.push(...activities);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  // Fetch anime list to get actual episode progress
  const animeListData: any = await rateLimitedRequest(GRAPHQL_QUERIES.USER_ANIME_LIST, {
    userId,
  }).catch(() => ({ MediaListCollection: { lists: [] } }));

  return {
    user: viewerData.Viewer,
    activities: allActivities,
    animeList: animeListData.MediaListCollection?.lists || [],
  };
}

export default async function ActivityPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <LandingPage />;
  }

  // @ts-ignore
  const accessToken = session.accessToken;

  try {
    const { user, activities, animeList } = await getActivityData(accessToken);

    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Daily <span className="text-gradient">Activity</span>
            </h2>
            <p className="text-gray-400">Detailed breakdown of your anime and manga interactions.</p>
          </div>
        </div>

        <EpisodesWatchedChart activities={activities} animeList={animeList} />

        <DailyActivityCharts activities={activities} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching activity data:", error);
    return (
      <div className="p-4 text-red-500">
        Error loading activity data. Please try again later.
      </div>
    );
  }
}
