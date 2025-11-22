"use client";

import { Play, CheckCircle2, ZoomIn, ZoomOut } from "lucide-react";
import type { ZoomLevel, StatusFilter } from "../types";
import { ZOOM_LEVELS, STATUS_FILTERS } from "../config";

interface TimelineControlsProps {
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  zoomLevel: ZoomLevel;
  onZoomChange: (zoom: ZoomLevel) => void;
}

const ZOOM_OPTIONS: { value: ZoomLevel; label: string }[] = [
  { value: ZOOM_LEVELS.COMPACT as ZoomLevel, label: "Compact" },
  { value: ZOOM_LEVELS.NORMAL as ZoomLevel, label: "Normal" },
  { value: ZOOM_LEVELS.DETAILED as ZoomLevel, label: "Detailed" },
  { value: ZOOM_LEVELS.EXPANDED as ZoomLevel, label: "Expanded" },
  { value: ZOOM_LEVELS.BY_DAYS as ZoomLevel, label: "By Days" },
];

export function TimelineControls({
  selectedStatus,
  onStatusChange,
  zoomLevel,
  onZoomChange,
}: TimelineControlsProps) {
  const currentZoomIndex = ZOOM_OPTIONS.findIndex((opt) => opt.value === zoomLevel);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    onZoomChange(ZOOM_OPTIONS[index].value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
      {/* Status Filter */}
      <div className="flex gap-2 flex-wrap">
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

      {/* Zoom Slider */}
      <div className="flex items-center gap-3 w-full sm:w-auto">

        <div className="relative flex-1 sm:flex-none">
          {/* Sliding Background */}
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/50"
            style={{
              left: `${(currentZoomIndex / (ZOOM_OPTIONS.length - 1)) * 100}%`,
              width: `${100 / ZOOM_OPTIONS.length}%`,
              transform: `translateX(-${(currentZoomIndex / (ZOOM_OPTIONS.length - 1)) * 100}%)`,
            }}
          />

          {/* Tabs */}
          <div className="relative flex bg-white/5 rounded-lg p-1 border border-white/10">
            {ZOOM_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => onZoomChange(option.value)}
                className={`relative px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 flex-1 whitespace-nowrap ${
                  index === currentZoomIndex
                    ? "text-white z-10"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Hidden slider for accessibility */}
          <input
            type="range"
            min="0"
            max={ZOOM_OPTIONS.length - 1}
            step="1"
            value={currentZoomIndex}
            onChange={handleSliderChange}
            className="sr-only"
            aria-label="Zoom level"
          />
        </div>

      </div>
    </div>
  );
}
