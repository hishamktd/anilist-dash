/**
 * Timeline Configuration Constants
 */

/**
 * Zoom-level specific configuration
 * Each zoom level has its own item appearance settings
 */
export interface ZoomLevelConfig {
  /** Pixels per day for this zoom level */
  pixelsPerDay: number;

  /** Minimum duration for short entries (in days) */
  minDurationDays: number;

  /** Padding between entries in the same row (in days) */
  paddingDays: number;

  /** Minimum width for timeline entries (in pixels) */
  minWidthPx: number;

  /** Height of timeline entries (in pixels) */
  heightPx: number;

  /** Row height including spacing (in pixels) */
  rowHeightPx: number;
}

/**
 * Global timeline constants that don't vary
 */
export const TIMELINE_CONSTANTS = {
  // Milliseconds per day (for date calculations)
  MS_PER_DAY: 24 * 60 * 60 * 1000,

  // Minimum timeline width (prevents timeline from being too narrow)
  MIN_TIMELINE_WIDTH_PX: 1000,
} as const;

export const ZOOM_LEVELS = {
  COMPACT: 'compact',
  NORMAL: 'normal',
  DETAILED: 'detailed',
  EXPANDED: 'expanded',
  BY_DAYS: 'by-days',
} as const;

/**
 * Configuration for each zoom level
 * Controls both visual density and item appearance
 */
export const ZOOM_CONFIG: Record<string, ZoomLevelConfig> = {
  [ZOOM_LEVELS.COMPACT]: {
    pixelsPerDay: 2,        // ~60px per month - very dense
    minDurationDays: 5,     // Short minimum
    paddingDays: 10,         // Tight spacing
    minWidthPx: 100,         // Smaller items
    heightPx: 56,           // Compact height
    rowHeightPx: 68,        // Tight rows
  },
  [ZOOM_LEVELS.NORMAL]: {
    pixelsPerDay: 6,        // ~180px per month - comfortable
    minDurationDays: 15,    // Standard minimum
    paddingDays: 8,         // Moderate spacing
    minWidthPx: 130,        // Standard items
    heightPx: 56,           // Standard height
    rowHeightPx: 68,        // Standard rows
  },
  [ZOOM_LEVELS.DETAILED]: {
    pixelsPerDay: 16,       // ~480px per month - spacious
    minDurationDays: 6,    // Longer minimum
    paddingDays: 5,        // More spacing
    minWidthPx: 160,        // Larger items
    heightPx: 56,           // Taller
    rowHeightPx: 68,        // More row spacing
  },
  [ZOOM_LEVELS.EXPANDED]: {
    pixelsPerDay: 32,       // ~960px per month - maximum detail
    minDurationDays: 4,    // Longest minimum
    paddingDays: 3,        // Maximum spacing
    minWidthPx: 200,        // Largest items
    heightPx: 56,           // Tallest
    rowHeightPx: 68,        // Maximum row spacing
  },
  [ZOOM_LEVELS.BY_DAYS]: {
    pixelsPerDay: 200,       // ~1500px per month - daily granularity
    minDurationDays: 1,     // Single day minimum
    paddingDays: 0,         // Minimal spacing (1 day)
    minWidthPx: 200,         // Minimum one day width
    heightPx: 56,           // Standard height
    rowHeightPx: 68,        // Standard row spacing
  },
} as const;

export const STATUS_FILTERS = {
  ALL: 'all',
  CURRENT: 'CURRENT',
  COMPLETED: 'COMPLETED',
} as const;

export const ENTRY_STYLES = {
  COMPLETED: {
    gradient: 'bg-gradient-to-r from-green-600 via-green-500 to-emerald-500',
    border: 'border-green-400/30',
    hoverBorder: 'hover:border-green-400/60',
    hoverShadow: 'hover:shadow-green-500/50',
  },
  CURRENT: {
    gradient: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500',
    border: 'border-blue-400/30',
    hoverBorder: 'hover:border-blue-400/60',
    hoverShadow: 'hover:shadow-blue-500/50',
  },
} as const;

/**
 * Get the configuration for a specific zoom level
 */
export function getZoomConfig(zoomLevel: string): ZoomLevelConfig {
  return ZOOM_CONFIG[zoomLevel] ?? ZOOM_CONFIG[ZOOM_LEVELS.NORMAL];
}
