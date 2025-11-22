import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { anilistClient, GRAPHQL_QUERIES, setAnilistToken } from "@/lib/anilist";
import { AnimeRoadmap } from "@/components/Dashboard/AnimeRoadmap";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Calendar } from "lucide-react";

async function getTimelineData(accessToken: string) {
  setAnilistToken(accessToken);

  // Fetch Viewer to get userId
  const viewerData: any = await anilistClient.request(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch both watching and completed anime
  const [watchingData, completedData]: [any, any] = await Promise.all([
    anilistClient.request(GRAPHQL_QUERIES.MEDIA_LIST, {
      userId,
      type: "ANIME",
      status: "CURRENT",
    }),
    anilistClient.request(GRAPHQL_QUERIES.MEDIA_LIST, {
      userId,
      type: "ANIME",
      status: "COMPLETED",
    }),
  ]);

  // Combine entries from both lists
  const watchingEntries =
    watchingData.MediaListCollection.lists[0]?.entries || [];
  const completedEntries =
    completedData.MediaListCollection.lists[0]?.entries || [];

  return {
    user: viewerData.Viewer,
    entries: [...watchingEntries, ...completedEntries],
  };
}

export default async function TimelinePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // @ts-ignore
  const accessToken = session.accessToken;

  try {
    const { user, entries } = await getTimelineData(accessToken);

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-purple-500/10 p-3 text-purple-500">
            <Calendar className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Anime Timeline</h1>
            <p className="text-gray-400">
              Visual roadmap of your watching and completed anime
            </p>
          </div>
        </div>

        {/* Timeline Component */}
        <AnimeRoadmap entries={entries} />

        {/* Info Section */}
        <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-2">About Timeline View</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <span className="text-blue-400 font-medium">Blue bars</span> represent anime
                you're currently watching
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>
                <span className="text-green-400 font-medium">Green bars</span> represent
                completed anime
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>
                Hover over any anime to see detailed information including start/completion
                dates, progress, and genres
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>
                Make sure to update your start and completion dates on AniList for anime to
                appear on the timeline
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching timeline data:", error);
    return (
      <div className="rounded-xl bg-gray-900 p-8 border border-red-800/50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Error Loading Timeline
          </h2>
          <p className="text-gray-400">
            There was an error loading your timeline data. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
