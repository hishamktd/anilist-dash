"use client";

import { Calendar } from "lucide-react";

export function EmptyState() {
  return (
    <div className="glass-card rounded-xl p-12 text-center">
      <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">No Timeline Data</h3>
      <p className="text-sm text-gray-400">
        Start dates are needed to display anime on the timeline. Make sure to update your
        start dates on AniList.
      </p>
    </div>
  );
}
