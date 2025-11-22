import { formatDistanceToNow } from "date-fns";

interface TimelineItem {
  id: number;
  type: string;
  status: string;
  progress: string;
  createdAt: number;
  media: {
    title: {
      romaji: string;
    };
    coverImage: {
      medium: string;
    };
  };
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-white">Recent Activity</h3>
      <div className="relative border-l border-gray-800 ml-3 space-y-8">
        {items.map((item) => (
          <div key={item.id} className="relative ml-6">
            <span className="absolute -left-[31px] flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 ring-4 ring-gray-900">
              <img
                src={item.media.coverImage.medium}
                alt={item.media.title.romaji}
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <div className="flex flex-col rounded-lg bg-gray-800/50 p-4 hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">
                  {item.status === "watched episode" && "Watched episode "}
                  {item.status === "read chapter" && "Read chapter "}
                  {item.status === "completed" && "Completed "}
                  {item.progress && <span className="text-blue-400">{item.progress}</span>}
                  {" of "}
                  <span className="text-blue-400">{item.media.title.romaji}</span>
                </h4>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(item.createdAt * 1000, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
