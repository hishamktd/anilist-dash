"use client";

import { useState, useMemo } from "react";
import { UserAchievementStats, getUnlockedAchievements, getAllAchievements, checkAchievementUnlock, getAchievementStats } from "@/lib/achievementUtils";
import { Achievement, AchievementCategory, AchievementTier } from "@/data/achievements";
import { Trophy, Award, Lock, Filter, Search, TrendingUp } from "lucide-react";
import clsx from "clsx";

interface AchievementsViewProps {
  stats: UserAchievementStats;
}

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  watching: 'Watching',
  completion: 'Completion',
  scores: 'Scores',
  genres: 'Genres',
  studios: 'Studios',
  time: 'Time',
  social: 'Social',
  collection: 'Collection',
  seasonal: 'Seasonal',
  special: 'Special',
  milestones: 'Milestones',
  dedication: 'Dedication',
};

const TIER_COLORS: Record<AchievementTier, { bg: string; border: string; text: string; glow: string }> = {
  bronze: {
    bg: 'from-orange-900/20 to-orange-800/20',
    border: 'border-orange-700/30',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_15px_rgba(251,146,60,0.3)]'
  },
  silver: {
    bg: 'from-gray-700/20 to-gray-600/20',
    border: 'border-gray-500/30',
    text: 'text-gray-300',
    glow: 'shadow-[0_0_15px_rgba(209,213,219,0.3)]'
  },
  gold: {
    bg: 'from-yellow-700/20 to-yellow-600/20',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    glow: 'shadow-[0_0_15px_rgba(250,204,21,0.3)]'
  },
  platinum: {
    bg: 'from-cyan-700/20 to-cyan-600/20',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]'
  },
  diamond: {
    bg: 'from-purple-700/20 to-pink-600/20',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]'
  },
};

function AchievementCard({ achievement, unlocked, progress }: { achievement: Achievement; unlocked: boolean; progress: number }) {
  const colors = TIER_COLORS[achievement.tier];
  const isHidden = achievement.hidden && !unlocked;

  return (
    <div
      className={clsx(
        "glass rounded-xl p-4 border transition-all duration-300",
        unlocked
          ? `bg-gradient-to-br ${colors.bg} ${colors.border} ${colors.glow} hover:scale-105`
          : "border-white/5 hover:border-white/10 opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={clsx(
          "text-4xl flex-shrink-0",
          !unlocked && "grayscale opacity-50"
        )}>
          {isHidden ? '❓' : achievement.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={clsx(
              "font-semibold",
              unlocked ? colors.text : "text-gray-400"
            )}>
              {isHidden ? '???' : achievement.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Trophy className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-yellow-400">{achievement.points}</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            {isHidden ? 'Hidden achievement' : achievement.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden border border-white/10 shadow-inner">
              <div
                className={clsx(
                  "h-full rounded-full transition-all duration-500 relative",
                  unlocked
                    ? `bg-gradient-to-r ${colors.bg.replace('/20', '')} shadow-lg`
                    : "bg-gradient-to-r from-gray-600 to-gray-500"
                )}
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/10 rounded-full" />
              </div>
            </div>
            <span className={clsx(
              "text-xs font-medium flex-shrink-0 min-w-[3rem] text-right",
              unlocked ? colors.text : "text-gray-500"
            )}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AchievementsView({ stats }: AchievementsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<AchievementTier | 'all'>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allAchievements = useMemo(() => getAllAchievements(), []);
  const achievementStats = useMemo(() => getAchievementStats(stats), [stats]);
  const unlockedSet = useMemo(() => {
    const unlocked = getUnlockedAchievements(stats);
    return new Set(unlocked.map(u => u.achievement.id));
  }, [stats]);

  const filteredAchievements = useMemo(() => {
    let filtered = allAchievements;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    // Filter by tier
    if (selectedTier !== 'all') {
      filtered = filtered.filter(a => a.tier === selectedTier);
    }

    // Filter by unlocked status
    if (showUnlockedOnly) {
      filtered = filtered.filter(a => unlockedSet.has(a.id));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allAchievements, selectedCategory, selectedTier, showUnlockedOnly, searchQuery, unlockedSet]);

  const achievementsWithProgress = useMemo(() => {
    return filteredAchievements.map(achievement => {
      const { unlocked, progress } = checkAchievementUnlock(achievement, stats);
      return { achievement, unlocked, progress };
    });
  }, [filteredAchievements, stats]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-white">
                {achievementStats.unlocked} / {achievementStats.total}
              </div>
              <div className="text-sm text-gray-400">Achievements</div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-white">
                {achievementStats.points.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Points</div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-white">
                {achievementStats.percentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Completion</div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-3">
            <Lock className="w-8 h-8 text-gray-500" />
            <div>
              <div className="text-2xl font-bold text-white">
                {achievementStats.total - achievementStats.unlocked}
              </div>
              <div className="text-sm text-gray-400">Locked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Tier Filter */}
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value as any)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="diamond">Diamond</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={showUnlockedOnly}
              onChange={(e) => setShowUnlockedOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-300">Show unlocked only</span>
          </label>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {filteredAchievements.length} Achievement{filteredAchievements.length !== 1 ? 's' : ''}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementsWithProgress.map(({ achievement, unlocked, progress }) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={unlocked}
              progress={progress}
            />
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No achievements found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
