import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { anilistClient, GRAPHQL_QUERIES, setAnilistToken } from "@/lib/anilist";
import { StatsCards } from "@/components/Dashboard/StatsCards";
import { ActivityHeatmap } from "@/components/Dashboard/ActivityHeatmap";
import { Timeline } from "@/components/Dashboard/Timeline";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getDashboardData(accessToken: string) {
  setAnilistToken(accessToken);
  
  // Fetch Viewer and Stats
  const viewerData: any = await anilistClient.request(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch Recent Activity
  const activityData: any = await anilistClient.request(GRAPHQL_QUERIES.USER_ACTIVITY, {
    userId,
    page: 1,
    perPage: 50,
  });

  return {
    user: viewerData.Viewer,
    activities: activityData.Page.activities,
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
    const { user, activities } = await getDashboardData(accessToken);
    const heatmapData = processActivityForHeatmap(activities);

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Welcome back, {user.name}</h2>
          <p className="text-gray-400">Here's what's happening with your anime list.</p>
        </div>

        <StatsCards stats={user.statistics} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityHeatmap data={heatmapData} />
          </div>
          <div>
            <Timeline items={activities} />
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
