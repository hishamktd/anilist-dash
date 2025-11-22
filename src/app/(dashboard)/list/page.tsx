import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GRAPHQL_QUERIES, setAnilistToken, rateLimitedRequest } from "@/lib/anilist";
import { AnimeListView } from "@/components/List/AnimeListView";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAllAnimeLists(accessToken: string) {
  setAnilistToken(accessToken);

  const viewerData: any = await rateLimitedRequest(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  // Fetch all anime lists at once
  const allListsData: any = await rateLimitedRequest(GRAPHQL_QUERIES.MEDIA_LIST, {
    userId,
    type: "ANIME",
  });

  // Combine all entries from all lists
  const allEntries = allListsData.MediaListCollection.lists.flatMap(
    (list: any) => list.entries || []
  );

  return {
    user: viewerData.Viewer,
    entries: allEntries,
  };
}

export default async function ListPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // @ts-ignore
  const accessToken = session.accessToken;

  try {
    const { user, entries } = await getAllAnimeLists(accessToken);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            My Anime List
          </h1>
          <p className="text-gray-400 mt-2">
            Browse and filter your entire anime collection
          </p>
        </div>

        <AnimeListView entries={entries} />
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching anime lists:", error);
    const isRateLimit = error?.message?.includes('Rate limit');

    return (
      <div className="glass-card rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            {isRateLimit ? 'Rate Limit Exceeded' : 'Error Loading List'}
          </h2>
          <p className="text-gray-400">
            {isRateLimit
              ? 'You\'re making too many requests. Please wait a moment and refresh the page.'
              : 'There was an error loading your anime list. Please try again later.'
            }
          </p>
          {isRateLimit && (
            <p className="text-sm text-gray-500 mt-2">
              Tip: Data is cached for 5 minutes to reduce API calls.
            </p>
          )}
        </div>
      </div>
    );
  }
}
