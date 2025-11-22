"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ActivityItem {
  date: string;
  count: number;
  level: number;
}

interface ActivityHeatmapProps {
  data: ActivityItem[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  return (
    <div className="rounded-xl bg-gray-900 p-6 shadow-sm border border-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-white">Activity</h3>
      <div className="w-full overflow-x-auto">
        <ActivityCalendar
          data={data}
          theme={{
            light: ["#1f2937", "#374151", "#60a5fa", "#3b82f6", "#2563eb"],
            dark: ["#1f2937", "#374151", "#60a5fa", "#3b82f6", "#2563eb"],
          }}
          labels={{
            legend: {
              less: "Less",
              more: "More",
            },
            months: [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            weekdays: [
              "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
            ],
            totalCount: "{{count}} activities in the last year",
          }}
          renderBlock={(block, activity) => (
            <div
              {...block}
              data-tooltip-id="activity-tooltip"
              data-tooltip-content={`${activity.count} activities on ${activity.date}`}
            />
          )}
        />
        <ReactTooltip id="activity-tooltip" />
      </div>
    </div>
  );
}
