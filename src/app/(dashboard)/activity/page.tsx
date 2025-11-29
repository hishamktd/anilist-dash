import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GRAPHQL_QUERIES, setAnilistToken, rateLimitedRequest } from "@/lib/anilist";
import { DailyActivityCharts } from "@/components/Dashboard/DailyActivityCharts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LandingPage } from "@/components/LandingPage";

async function getActivityData(accessToken: string) {
  setAnilistToken(accessToken);

  const viewerData: any = await rateLimitedRequest(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch activity data
  // We can try to fetch a bit more if needed, but let's start with one large page
  const activityData: any = await rateLimitedRequest(GRAPHQL_QUERIES.USER_ACTIVITY, {
    userId,
    page: 1,
    perPage: 500,
  }).catch(() => ({ Page: { activities: [] } }));

  return {
    user: viewerData.Viewer,
    activities: activityData.Page?.activities || [],
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
    const { user, activities } = await getActivityData(accessToken);

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
