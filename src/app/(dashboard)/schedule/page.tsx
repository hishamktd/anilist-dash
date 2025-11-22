import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GRAPHQL_QUERIES, setAnilistToken, rateLimitedRequest } from "@/lib/anilist";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";

async function getAiringSchedule(accessToken: string) {
  setAnilistToken(accessToken);

  const now = Math.floor(Date.now() / 1000);
  const weekFromNow = now + 7 * 24 * 60 * 60;

  const data: any = await rateLimitedRequest(GRAPHQL_QUERIES.AIRING_SCHEDULE, {
    airingAt_greater: now,
    airingAt_lesser: weekFromNow,
    page: 1,
    perPage: 50,
  });

  return data.Page.airingSchedules;
}

function formatAiringTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `in ${days}d ${hours}h`;
  if (hours > 0) return `in ${hours}h ${minutes}m`;
  if (minutes > 0) return `in ${minutes}m`;
  return "Airing now";
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // @ts-ignore
  const accessToken = session.accessToken;

  try {
    const schedule = await getAiringSchedule(accessToken);

    // Group by day
    const groupedByDay = schedule.reduce((acc: any, item: any) => {
      const date = new Date(item.airingAt * 1000);
      const dayKey = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });

      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }
      acc[dayKey].push(item);
      return acc;
    }, {});

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Calendar className="h-8 w-8 text-blue-500" />
            Airing Schedule
          </h2>
          <p className="text-gray-400">Upcoming episodes for the next 7 days</p>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedByDay).map(([day, items]: [string, any]) => (
            <div key={day} className="rounded-xl bg-gray-900 p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">{day}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative w-16 h-24 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={item.media.coverImage.large}
                          alt={item.media.title.romaji}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                          {item.media.title.english || item.media.title.romaji}
                        </h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-blue-400">
                            <span className="font-semibold">Episode {item.episode}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-cyan-400">
                            <Clock className="h-3 w-3" />
                            <span>{formatAiringTime(item.airingAt)}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(item.airingAt)}
                          </div>
                          {item.media.averageScore && (
                            <div className="text-xs text-yellow-500 font-semibold">
                              ★ {item.media.averageScore}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {schedule.length === 0 && (
          <div className="rounded-xl bg-gray-900 p-12 border border-gray-800 text-center">
            <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No episodes airing in the next 7 days</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching airing schedule:", error);
    return (
      <div className="p-4 text-red-500">
        Error loading airing schedule. Please try again later.
      </div>
    );
  }
}
