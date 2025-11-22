import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { anilistClient, GRAPHQL_QUERIES, setAnilistToken } from "@/lib/anilist";
import { AnimeList } from "@/components/List/AnimeList";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PageProps {
  params: {
    status: string;
  };
}

async function getListData(accessToken: string, status: string) {
  setAnilistToken(accessToken);
  
  const viewerData: any = await anilistClient.request(GRAPHQL_QUERIES.VIEWER);
  const userId = viewerData.Viewer.id;

  let anilistStatus = status.toUpperCase();
  if (status === "watching") anilistStatus = "CURRENT";
  if (status === "completed") anilistStatus = "COMPLETED";
  if (status === "dropped") anilistStatus = "DROPPED";
  if (status === "planning") anilistStatus = "PLANNING";

  const listData: any = await anilistClient.request(GRAPHQL_QUERIES.MEDIA_LIST, {
    userId,
    type: "ANIME",
    status: anilistStatus,
  });

  // Flatten the lists (AniList returns a collection of lists, we just want the entries for the specific status)
  const entries = listData.MediaListCollection.lists.flatMap((list: any) => list.entries);
  return entries;
}

export default async function ListPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  // @ts-ignore
  const accessToken = session.accessToken;
  const { status } = await params;

  try {
    const entries = await getListData(accessToken, status);

    return (
      <div>
        <AnimeList entries={entries} status={status} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching list data:", error);
    return (
      <div className="p-4 text-red-500">
        Error loading list data. Please try again later.
      </div>
    );
  }
}
