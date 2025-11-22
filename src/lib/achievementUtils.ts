import { Achievement, ALL_ACHIEVEMENTS } from '@/data/achievements';

export interface UserAchievementStats {
  totalAnimeCount: number;
  completedCount: number;
  watchingCount: number;
  episodesWatched: number;
  watchTimeMinutes: number;
  meanScore: number;
  genreCounts: Record<string, number>;
  studioCounts: number;
  perfectScores: number;
  yearSpan: number;
  favoritesCount: number;
  rewatches: number;
  droppedCount: number;
  planningCount: number;
  pausedCount: number;
  activityCount: number;
  seasonalCurrent: number;
  formatCounts: {
    tv: number;
    movie: number;
    ova: number;
    special: number;
  };
  countryCounts: {
    japan: number;
    china: number;
    korea: number;
  };
  sameDayCompletion: number;
}

export interface UnlockedAchievement {
  achievement: Achievement;
  unlockedAt: Date;
  progress: number; // 0-100
}

export const checkAchievementUnlock = (
  achievement: Achievement,
  stats: UserAchievementStats
): { unlocked: boolean; progress: number } => {
  const { requirement } = achievement;
  let currentValue = 0;
  let targetValue = requirement.value;

  // Get current value based on requirement type
  switch (requirement.type) {
    case 'total_anime_count':
      currentValue = stats.totalAnimeCount;
      break;
    case 'completed_count':
      currentValue = stats.completedCount;
      break;
    case 'watching_count':
      currentValue = stats.watchingCount;
      break;
    case 'episodes_watched':
      currentValue = stats.episodesWatched;
      break;
    case 'watch_time_minutes':
      currentValue = stats.watchTimeMinutes;
      break;
    case 'mean_score':
      currentValue = stats.meanScore;
      break;
    case 'genre_count':
      if (requirement.field) {
        currentValue = stats.genreCounts[requirement.field] || 0;
      }
      break;
    case 'studio_count':
      currentValue = stats.studioCounts;
      break;
    case 'perfect_scores':
      currentValue = stats.perfectScores;
      break;
    case 'year_span':
      currentValue = stats.yearSpan;
      break;
    case 'favorites_count':
      currentValue = stats.favoritesCount;
      break;
    case 'rewatches':
      currentValue = stats.rewatches;
      break;
    case 'dropped_count':
      currentValue = stats.droppedCount;
      break;
    case 'planning_count':
      currentValue = stats.planningCount;
      break;
    case 'paused_count':
      currentValue = stats.pausedCount;
      break;
    case 'activity_count':
      currentValue = stats.activityCount;
      break;
    case 'seasonal_current':
      currentValue = stats.seasonalCurrent;
      break;
    case 'format_tv':
      currentValue = stats.formatCounts.tv;
      break;
    case 'format_movie':
      currentValue = stats.formatCounts.movie;
      break;
    case 'format_ova':
      currentValue = stats.formatCounts.ova;
      break;
    case 'format_special':
      currentValue = stats.formatCounts.special;
      break;
    case 'country_japan':
      currentValue = stats.countryCounts.japan;
      break;
    case 'country_china':
      currentValue = stats.countryCounts.china;
      break;
    case 'country_korea':
      currentValue = stats.countryCounts.korea;
      break;
    case 'same_day_completion':
      currentValue = stats.sameDayCompletion;
      break;
  }

  // Check if unlocked based on comparison type
  let unlocked = false;
  const comparison = requirement.comparison || 'gte';

  switch (comparison) {
    case 'gte':
      unlocked = currentValue >= targetValue;
      break;
    case 'lte':
      unlocked = currentValue <= targetValue;
      break;
    case 'eq':
      unlocked = Math.abs(currentValue - targetValue) < 0.1; // For floating point comparison
      break;
  }

  // Calculate progress (0-100)
  let progress = 0;
  if (comparison === 'gte') {
    progress = Math.min(100, (currentValue / targetValue) * 100);
  } else if (comparison === 'lte') {
    // For "less than" requirements, progress is inverted
    progress = currentValue <= targetValue ? 100 : 0;
  } else if (comparison === 'eq') {
    // For "equals" requirements, it's all or nothing
    progress = unlocked ? 100 : 0;
  }

  return { unlocked, progress };
};

export const getAllAchievements = () => ALL_ACHIEVEMENTS;

export const getUnlockedAchievements = (
  stats: UserAchievementStats
): UnlockedAchievement[] => {
  const unlocked: UnlockedAchievement[] = [];

  for (const achievement of ALL_ACHIEVEMENTS) {
    const { unlocked: isUnlocked, progress } = checkAchievementUnlock(achievement, stats);

    if (isUnlocked) {
      unlocked.push({
        achievement,
        unlockedAt: new Date(), // In a real app, you'd store this
        progress: 100
      });
    }
  }

  return unlocked;
};

export const getAchievementsByCategory = (category?: string) => {
  if (!category) return ALL_ACHIEVEMENTS;
  return ALL_ACHIEVEMENTS.filter(a => a.category === category);
};

export const getAchievementsByTier = (tier?: string) => {
  if (!tier) return ALL_ACHIEVEMENTS;
  return ALL_ACHIEVEMENTS.filter(a => a.tier === tier);
};

export const getAchievementProgress = (
  achievement: Achievement,
  stats: UserAchievementStats
) => {
  return checkAchievementUnlock(achievement, stats);
};

export const getTotalPoints = (stats: UserAchievementStats): number => {
  const unlocked = getUnlockedAchievements(stats);
  return unlocked.reduce((sum, u) => sum + u.achievement.points, 0);
};

export const getAchievementStats = (stats: UserAchievementStats) => {
  const unlocked = getUnlockedAchievements(stats);
  const total = ALL_ACHIEVEMENTS.length;
  const points = getTotalPoints(stats);

  const byCategory: Record<string, number> = {};
  const byTier: Record<string, number> = {};

  for (const u of unlocked) {
    byCategory[u.achievement.category] = (byCategory[u.achievement.category] || 0) + 1;
    byTier[u.achievement.tier] = (byTier[u.achievement.tier] || 0) + 1;
  }

  return {
    unlocked: unlocked.length,
    total,
    points,
    percentage: (unlocked.length / total) * 100,
    byCategory,
    byTier
  };
};
