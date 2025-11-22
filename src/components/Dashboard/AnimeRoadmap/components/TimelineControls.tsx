"use client";

import { Play, CheckCircle2 } from "lucide-react";
import type { ZoomLevel, StatusFilter } from "../types";
import { ZOOM_LEVELS, STATUS_FILTERS } from "../config";

interface TimelineControlsProps {
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  zoomLevel: ZoomLevel;
  onZoomChange: (zoom: ZoomLevel) => void;
}

export function TimelineControls({
  selectedStatus,
  onStatusChange,
  zoomLevel,
  onZoomChange,
}: TimelineControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      {/* Status Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange(STATUS_FILTERS.ALL as StatusFilter)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            selectedStatus === STATUS_FILTERS.ALL
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          All
        </button>
        <button
          onClick={() => onStatusChange(STATUS_FILTERS.CURRENT as StatusFilter)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            selectedStatus === STATUS_FILTERS.CURRENT
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          <Play className="h-4 w-4" />
          Watching
        </button>
        <button
          onClick={() => onStatusChange(STATUS_FILTERS.COMPLETED as StatusFilter)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            selectedStatus === STATUS_FILTERS.COMPLETED
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </button>
      </div>

      {/* Zoom Level Selector */}
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-300 mr-2">Zoom:</span>
        <button
          onClick={() => onZoomChange(ZOOM_LEVELS.COMPACT as ZoomLevel)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            zoomLevel === ZOOM_LEVELS.COMPACT
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          Compact
        </button>
        <button
          onClick={() => onZoomChange(ZOOM_LEVELS.NORMAL as ZoomLevel)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            zoomLevel === ZOOM_LEVELS.NORMAL
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => onZoomChange(ZOOM_LEVELS.DETAILED as ZoomLevel)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            zoomLevel === ZOOM_LEVELS.DETAILED
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          Detailed
        </button>
        <button
          onClick={() => onZoomChange(ZOOM_LEVELS.EXPANDED as ZoomLevel)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            zoomLevel === ZOOM_LEVELS.EXPANDED
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          Expanded
        </button>
      </div>
    </div>
  );
}
