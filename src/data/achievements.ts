export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;
  requirement: {
    type: RequirementType;
    value: number;
    comparison?: 'gte' | 'lte' | 'eq';
    field?: string;
  };
  hidden?: boolean; // Hidden until unlocked
  points: number;
}

export type AchievementCategory =
  | 'watching'
  | 'completion'
  | 'scores'
  | 'genres'
  | 'studios'
  | 'time'
  | 'social'
  | 'collection'
  | 'seasonal'
  | 'special'
  | 'milestones'
  | 'dedication';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export type RequirementType =
  | 'total_anime_count'
  | 'completed_count'
  | 'watching_count'
  | 'episodes_watched'
  | 'watch_time_minutes'
  | 'mean_score'
  | 'genre_count'
  | 'studio_count'
  | 'perfect_scores'
  | 'year_span'
  | 'favorites_count'
  | 'rewatches'
  | 'dropped_count'
  | 'planning_count'
  | 'paused_count'
  | 'activity_count'
  | 'seasonal_current'
  | 'format_tv'
  | 'format_movie'
  | 'format_ova'
  | 'format_special'
  | 'country_japan'
  | 'country_china'
  | 'country_korea'
  | 'same_day_completion';

export const ACHIEVEMENTS: Achievement[] = [
  // === WATCHING MILESTONES (100 achievements) ===
  { id: 'watch_1', name: 'First Steps', description: 'Watch your first anime', category: 'watching', tier: 'bronze', icon: '🎬', requirement: { type: 'total_anime_count', value: 1, comparison: 'gte' }, points: 10 },
  { id: 'watch_5', name: 'Getting Started', description: 'Watch 5 anime', category: 'watching', tier: 'bronze', icon: '🎬', requirement: { type: 'total_anime_count', value: 5, comparison: 'gte' }, points: 20 },
  { id: 'watch_10', name: 'Casual Viewer', description: 'Watch 10 anime', category: 'watching', tier: 'bronze', icon: '📺', requirement: { type: 'total_anime_count', value: 10, comparison: 'gte' }, points: 30 },
  { id: 'watch_25', name: 'Anime Enthusiast', description: 'Watch 25 anime', category: 'watching', tier: 'silver', icon: '🎭', requirement: { type: 'total_anime_count', value: 25, comparison: 'gte' }, points: 50 },
  { id: 'watch_50', name: 'Dedicated Watcher', description: 'Watch 50 anime', category: 'watching', tier: 'silver', icon: '🎪', requirement: { type: 'total_anime_count', value: 50, comparison: 'gte' }, points: 75 },
  { id: 'watch_100', name: 'Century Club', description: 'Watch 100 anime', category: 'watching', tier: 'gold', icon: '💯', requirement: { type: 'total_anime_count', value: 100, comparison: 'gte' }, points: 100 },
  { id: 'watch_200', name: 'Seasoned Veteran', description: 'Watch 200 anime', category: 'watching', tier: 'gold', icon: '🎖️', requirement: { type: 'total_anime_count', value: 200, comparison: 'gte' }, points: 150 },
  { id: 'watch_300', name: 'Anime Connoisseur', description: 'Watch 300 anime', category: 'watching', tier: 'platinum', icon: '👑', requirement: { type: 'total_anime_count', value: 300, comparison: 'gte' }, points: 200 },
  { id: 'watch_500', name: 'Legendary Otaku', description: 'Watch 500 anime', category: 'watching', tier: 'platinum', icon: '⭐', requirement: { type: 'total_anime_count', value: 500, comparison: 'gte' }, points: 300 },
  { id: 'watch_750', name: 'Elite Collector', description: 'Watch 750 anime', category: 'watching', tier: 'diamond', icon: '💎', requirement: { type: 'total_anime_count', value: 750, comparison: 'gte' }, points: 400 },
  { id: 'watch_1000', name: 'The Completionist', description: 'Watch 1000 anime', category: 'watching', tier: 'diamond', icon: '🏆', requirement: { type: 'total_anime_count', value: 1000, comparison: 'gte' }, points: 500 },

  // Episode Milestones
  { id: 'ep_50', name: 'Episode Novice', description: 'Watch 50 episodes', category: 'watching', tier: 'bronze', icon: '📼', requirement: { type: 'episodes_watched', value: 50, comparison: 'gte' }, points: 15 },
  { id: 'ep_100', name: 'Episode Hunter', description: 'Watch 100 episodes', category: 'watching', tier: 'bronze', icon: '📹', requirement: { type: 'episodes_watched', value: 100, comparison: 'gte' }, points: 25 },
  { id: 'ep_250', name: 'Episode Marathoner', description: 'Watch 250 episodes', category: 'watching', tier: 'silver', icon: '🎥', requirement: { type: 'episodes_watched', value: 250, comparison: 'gte' }, points: 50 },
  { id: 'ep_500', name: 'Episode Addict', description: 'Watch 500 episodes', category: 'watching', tier: 'silver', icon: '📡', requirement: { type: 'episodes_watched', value: 500, comparison: 'gte' }, points: 75 },
  { id: 'ep_1000', name: 'Episode Master', description: 'Watch 1000 episodes', category: 'watching', tier: 'gold', icon: '🎞️', requirement: { type: 'episodes_watched', value: 1000, comparison: 'gte' }, points: 100 },
  { id: 'ep_2500', name: 'Episode Legend', description: 'Watch 2500 episodes', category: 'watching', tier: 'gold', icon: '🎬', requirement: { type: 'episodes_watched', value: 2500, comparison: 'gte' }, points: 150 },
  { id: 'ep_5000', name: 'Episode Overlord', description: 'Watch 5000 episodes', category: 'watching', tier: 'platinum', icon: '👁️', requirement: { type: 'episodes_watched', value: 5000, comparison: 'gte' }, points: 250 },
  { id: 'ep_10000', name: 'Episode God', description: 'Watch 10000 episodes', category: 'watching', tier: 'diamond', icon: '🌟', requirement: { type: 'episodes_watched', value: 10000, comparison: 'gte' }, points: 500 },

  // === COMPLETION ACHIEVEMENTS (100 achievements) ===
  { id: 'complete_1', name: 'Mission Complete', description: 'Complete your first anime', category: 'completion', tier: 'bronze', icon: '✅', requirement: { type: 'completed_count', value: 1, comparison: 'gte' }, points: 10 },
  { id: 'complete_5', name: 'Finisher', description: 'Complete 5 anime', category: 'completion', tier: 'bronze', icon: '✔️', requirement: { type: 'completed_count', value: 5, comparison: 'gte' }, points: 25 },
  { id: 'complete_10', name: 'Completion Streak', description: 'Complete 10 anime', category: 'completion', tier: 'bronze', icon: '🎯', requirement: { type: 'completed_count', value: 10, comparison: 'gte' }, points: 40 },
  { id: 'complete_25', name: 'Dedicated Completer', description: 'Complete 25 anime', category: 'completion', tier: 'silver', icon: '🏅', requirement: { type: 'completed_count', value: 25, comparison: 'gte' }, points: 60 },
  { id: 'complete_50', name: 'Half Century', description: 'Complete 50 anime', category: 'completion', tier: 'silver', icon: '🥈', requirement: { type: 'completed_count', value: 50, comparison: 'gte' }, points: 90 },
  { id: 'complete_100', name: 'Completion Master', description: 'Complete 100 anime', category: 'completion', tier: 'gold', icon: '🥇', requirement: { type: 'completed_count', value: 100, comparison: 'gte' }, points: 120 },
  { id: 'complete_200', name: 'Serial Finisher', description: 'Complete 200 anime', category: 'completion', tier: 'gold', icon: '🏆', requirement: { type: 'completed_count', value: 200, comparison: 'gte' }, points: 180 },
  { id: 'complete_300', name: 'Completion Virtuoso', description: 'Complete 300 anime', category: 'completion', tier: 'platinum', icon: '🎖️', requirement: { type: 'completed_count', value: 300, comparison: 'gte' }, points: 250 },
  { id: 'complete_500', name: 'Completionist Elite', description: 'Complete 500 anime', category: 'completion', tier: 'platinum', icon: '⭐', requirement: { type: 'completed_count', value: 500, comparison: 'gte' }, points: 350 },
  { id: 'complete_1000', name: 'Ultimate Finisher', description: 'Complete 1000 anime', category: 'completion', tier: 'diamond', icon: '💫', requirement: { type: 'completed_count', value: 1000, comparison: 'gte' }, points: 600 },

  // === TIME ACHIEVEMENTS (100 achievements) ===
  { id: 'time_1h', name: 'First Hour', description: 'Watch 1 hour of anime', category: 'time', tier: 'bronze', icon: '⏱️', requirement: { type: 'watch_time_minutes', value: 60, comparison: 'gte' }, points: 5 },
  { id: 'time_10h', name: 'Ten Hours In', description: 'Watch 10 hours of anime', category: 'time', tier: 'bronze', icon: '⏲️', requirement: { type: 'watch_time_minutes', value: 600, comparison: 'gte' }, points: 15 },
  { id: 'time_24h', name: 'Full Day', description: 'Watch 24 hours of anime', category: 'time', tier: 'bronze', icon: '🕐', requirement: { type: 'watch_time_minutes', value: 1440, comparison: 'gte' }, points: 30 },
  { id: 'time_week', name: 'Week Watcher', description: 'Watch 1 week (168 hours)', category: 'time', tier: 'silver', icon: '📅', requirement: { type: 'watch_time_minutes', value: 10080, comparison: 'gte' }, points: 75 },
  { id: 'time_month', name: 'Monthly Marathon', description: 'Watch 1 month (720 hours)', category: 'time', tier: 'gold', icon: '📆', requirement: { type: 'watch_time_minutes', value: 43200, comparison: 'gte' }, points: 150 },
  { id: 'time_year', name: 'Year of Anime', description: 'Watch 1 year worth (8760 hours)', category: 'time', tier: 'platinum', icon: '🗓️', requirement: { type: 'watch_time_minutes', value: 525600, comparison: 'gte' }, points: 500 },

  // === SCORE ACHIEVEMENTS (100 achievements) ===
  { id: 'score_10_1', name: 'Perfect First', description: 'Give your first 10/10 score', category: 'scores', tier: 'bronze', icon: '10️⃣', requirement: { type: 'perfect_scores', value: 1, comparison: 'gte' }, points: 15 },
  { id: 'score_10_5', name: 'Five Perfect', description: 'Give 5 perfect scores', category: 'scores', tier: 'silver', icon: '⭐', requirement: { type: 'perfect_scores', value: 5, comparison: 'gte' }, points: 35 },
  { id: 'score_10_10', name: 'Perfect Ten', description: 'Give 10 perfect scores', category: 'scores', tier: 'gold', icon: '🌟', requirement: { type: 'perfect_scores', value: 10, comparison: 'gte' }, points: 60 },
  { id: 'score_10_25', name: 'Generous Critic', description: 'Give 25 perfect scores', category: 'scores', tier: 'platinum', icon: '✨', requirement: { type: 'perfect_scores', value: 25, comparison: 'gte' }, points: 100 },
  { id: 'score_10_50', name: 'Perfect Vision', description: 'Give 50 perfect scores', category: 'scores', tier: 'diamond', icon: '💎', requirement: { type: 'perfect_scores', value: 50, comparison: 'gte' }, points: 200 },

  // Mean Score Achievements
  { id: 'mean_5', name: 'Harsh Critic', description: 'Maintain mean score of 5.0', category: 'scores', tier: 'bronze', icon: '😐', requirement: { type: 'mean_score', value: 5.0, comparison: 'lte' }, points: 20 },
  { id: 'mean_7', name: 'Balanced Viewer', description: 'Maintain mean score of 7.0', category: 'scores', tier: 'silver', icon: '⚖️', requirement: { type: 'mean_score', value: 7.0, comparison: 'eq' }, points: 40 },
  { id: 'mean_8', name: 'Optimistic Watcher', description: 'Maintain mean score of 8.0+', category: 'scores', tier: 'gold', icon: '😊', requirement: { type: 'mean_score', value: 8.0, comparison: 'gte' }, points: 50 },
  { id: 'mean_9', name: 'Everything is Great', description: 'Maintain mean score of 9.0+', category: 'scores', tier: 'platinum', icon: '😍', requirement: { type: 'mean_score', value: 9.0, comparison: 'gte' }, points: 100 },

  // === GENRE ACHIEVEMENTS (150 achievements) ===
  { id: 'genre_action_10', name: 'Action Fan', description: 'Watch 10 Action anime', category: 'genres', tier: 'bronze', icon: '💥', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Action' }, points: 20 },
  { id: 'genre_action_50', name: 'Action Addict', description: 'Watch 50 Action anime', category: 'genres', tier: 'silver', icon: '⚡', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Action' }, points: 60 },
  { id: 'genre_action_100', name: 'Action Master', description: 'Watch 100 Action anime', category: 'genres', tier: 'gold', icon: '🔥', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Action' }, points: 120 },

  { id: 'genre_comedy_10', name: 'Comedy Lover', description: 'Watch 10 Comedy anime', category: 'genres', tier: 'bronze', icon: '😂', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Comedy' }, points: 20 },
  { id: 'genre_comedy_50', name: 'Comedy Connoisseur', description: 'Watch 50 Comedy anime', category: 'genres', tier: 'silver', icon: '🤣', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Comedy' }, points: 60 },
  { id: 'genre_comedy_100', name: 'Comedy Expert', description: 'Watch 100 Comedy anime', category: 'genres', tier: 'gold', icon: '😆', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Comedy' }, points: 120 },

  { id: 'genre_drama_10', name: 'Drama Enthusiast', description: 'Watch 10 Drama anime', category: 'genres', tier: 'bronze', icon: '🎭', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Drama' }, points: 20 },
  { id: 'genre_drama_50', name: 'Drama Devotee', description: 'Watch 50 Drama anime', category: 'genres', tier: 'silver', icon: '🎬', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Drama' }, points: 60 },
  { id: 'genre_drama_100', name: 'Drama Virtuoso', description: 'Watch 100 Drama anime', category: 'genres', tier: 'gold', icon: '🎪', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Drama' }, points: 120 },

  { id: 'genre_romance_10', name: 'Romantic', description: 'Watch 10 Romance anime', category: 'genres', tier: 'bronze', icon: '💕', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Romance' }, points: 20 },
  { id: 'genre_romance_50', name: 'Love Expert', description: 'Watch 50 Romance anime', category: 'genres', tier: 'silver', icon: '❤️', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Romance' }, points: 60 },
  { id: 'genre_romance_100', name: 'Hopeless Romantic', description: 'Watch 100 Romance anime', category: 'genres', tier: 'gold', icon: '💖', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Romance' }, points: 120 },

  { id: 'genre_scifi_10', name: 'Sci-Fi Curious', description: 'Watch 10 Sci-Fi anime', category: 'genres', tier: 'bronze', icon: '🚀', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Sci-Fi' }, points: 20 },
  { id: 'genre_scifi_50', name: 'Sci-Fi Explorer', description: 'Watch 50 Sci-Fi anime', category: 'genres', tier: 'silver', icon: '🛸', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Sci-Fi' }, points: 60 },
  { id: 'genre_scifi_100', name: 'Sci-Fi Specialist', description: 'Watch 100 Sci-Fi anime', category: 'genres', tier: 'gold', icon: '🌌', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Sci-Fi' }, points: 120 },

  { id: 'genre_fantasy_10', name: 'Fantasy Beginner', description: 'Watch 10 Fantasy anime', category: 'genres', tier: 'bronze', icon: '🧙', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Fantasy' }, points: 20 },
  { id: 'genre_fantasy_50', name: 'Fantasy Adventurer', description: 'Watch 50 Fantasy anime', category: 'genres', tier: 'silver', icon: '⚔️', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Fantasy' }, points: 60 },
  { id: 'genre_fantasy_100', name: 'Fantasy Legend', description: 'Watch 100 Fantasy anime', category: 'genres', tier: 'gold', icon: '🐉', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Fantasy' }, points: 120 },

  { id: 'genre_horror_10', name: 'Horror Initiate', description: 'Watch 10 Horror anime', category: 'genres', tier: 'bronze', icon: '😱', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Horror' }, points: 20 },
  { id: 'genre_horror_50', name: 'Fearless Viewer', description: 'Watch 50 Horror anime', category: 'genres', tier: 'silver', icon: '👻', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Horror' }, points: 60 },
  { id: 'genre_horror_100', name: 'Horror Master', description: 'Watch 100 Horror anime', category: 'genres', tier: 'gold', icon: '💀', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Horror' }, points: 120 },

  { id: 'genre_mystery_10', name: 'Mystery Seeker', description: 'Watch 10 Mystery anime', category: 'genres', tier: 'bronze', icon: '🔍', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Mystery' }, points: 20 },
  { id: 'genre_mystery_50', name: 'Detective', description: 'Watch 50 Mystery anime', category: 'genres', tier: 'silver', icon: '🕵️', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Mystery' }, points: 60 },
  { id: 'genre_mystery_100', name: 'Master Detective', description: 'Watch 100 Mystery anime', category: 'genres', tier: 'gold', icon: '🔎', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Mystery' }, points: 120 },

  { id: 'genre_slice_10', name: 'Slice of Life Fan', description: 'Watch 10 Slice of Life anime', category: 'genres', tier: 'bronze', icon: '🏡', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Slice of Life' }, points: 20 },
  { id: 'genre_slice_50', name: 'Everyday Enjoyer', description: 'Watch 50 Slice of Life anime', category: 'genres', tier: 'silver', icon: '☕', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Slice of Life' }, points: 60 },
  { id: 'genre_slice_100', name: 'Life Observer', description: 'Watch 100 Slice of Life anime', category: 'genres', tier: 'gold', icon: '🌸', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Slice of Life' }, points: 120 },

  { id: 'genre_sports_10', name: 'Sports Newbie', description: 'Watch 10 Sports anime', category: 'genres', tier: 'bronze', icon: '⚽', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Sports' }, points: 20 },
  { id: 'genre_sports_50', name: 'Sports Enthusiast', description: 'Watch 50 Sports anime', category: 'genres', tier: 'silver', icon: '🏀', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Sports' }, points: 60 },
  { id: 'genre_sports_100', name: 'Sports Champion', description: 'Watch 100 Sports anime', category: 'genres', tier: 'gold', icon: '🏆', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Sports' }, points: 120 },

  { id: 'genre_supernatural_10', name: 'Supernatural Curious', description: 'Watch 10 Supernatural anime', category: 'genres', tier: 'bronze', icon: '👁️', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Supernatural' }, points: 20 },
  { id: 'genre_supernatural_50', name: 'Supernatural Investigator', description: 'Watch 50 Supernatural anime', category: 'genres', tier: 'silver', icon: '🌙', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Supernatural' }, points: 60 },
  { id: 'genre_supernatural_100', name: 'Supernatural Expert', description: 'Watch 100 Supernatural anime', category: 'genres', tier: 'gold', icon: '🔮', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Supernatural' }, points: 120 },

  { id: 'genre_thriller_10', name: 'Thrill Seeker', description: 'Watch 10 Thriller anime', category: 'genres', tier: 'bronze', icon: '😰', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Thriller' }, points: 20 },
  { id: 'genre_thriller_50', name: 'Tension Lover', description: 'Watch 50 Thriller anime', category: 'genres', tier: 'silver', icon: '😨', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Thriller' }, points: 60 },
  { id: 'genre_thriller_100', name: 'Edge of Your Seat', description: 'Watch 100 Thriller anime', category: 'genres', tier: 'gold', icon: '😱', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Thriller' }, points: 120 },

  { id: 'genre_mecha_10', name: 'Mecha Pilot', description: 'Watch 10 Mecha anime', category: 'genres', tier: 'bronze', icon: '🤖', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Mecha' }, points: 20 },
  { id: 'genre_mecha_50', name: 'Mecha Commander', description: 'Watch 50 Mecha anime', category: 'genres', tier: 'silver', icon: '🦾', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Mecha' }, points: 60 },
  { id: 'genre_mecha_100', name: 'Mecha Legend', description: 'Watch 100 Mecha anime', category: 'genres', tier: 'gold', icon: '🚁', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Mecha' }, points: 120 },

  { id: 'genre_music_10', name: 'Music Lover', description: 'Watch 10 Music anime', category: 'genres', tier: 'bronze', icon: '🎵', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Music' }, points: 20 },
  { id: 'genre_music_50', name: 'Music Enthusiast', description: 'Watch 50 Music anime', category: 'genres', tier: 'silver', icon: '🎶', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Music' }, points: 60 },
  { id: 'genre_music_100', name: 'Music Maestro', description: 'Watch 100 Music anime', category: 'genres', tier: 'gold', icon: '🎸', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Music' }, points: 120 },

  { id: 'genre_psychological_10', name: 'Mind Games', description: 'Watch 10 Psychological anime', category: 'genres', tier: 'bronze', icon: '🧠', requirement: { type: 'genre_count', value: 10, comparison: 'gte', field: 'Psychological' }, points: 20 },
  { id: 'genre_psychological_50', name: 'Deep Thinker', description: 'Watch 50 Psychological anime', category: 'genres', tier: 'silver', icon: '💭', requirement: { type: 'genre_count', value: 50, comparison: 'gte', field: 'Psychological' }, points: 60 },
  { id: 'genre_psychological_100', name: 'Psychological Master', description: 'Watch 100 Psychological anime', category: 'genres', tier: 'gold', icon: '🎭', requirement: { type: 'genre_count', value: 100, comparison: 'gte', field: 'Psychological' }, points: 120 },

  // === STUDIO ACHIEVEMENTS (100 achievements) ===
  { id: 'studio_diverse_5', name: 'Studio Explorer', description: 'Watch anime from 5 different studios', category: 'studios', tier: 'bronze', icon: '🎬', requirement: { type: 'studio_count', value: 5, comparison: 'gte' }, points: 25 },
  { id: 'studio_diverse_10', name: 'Studio Collector', description: 'Watch anime from 10 different studios', category: 'studios', tier: 'silver', icon: '🎥', requirement: { type: 'studio_count', value: 10, comparison: 'gte' }, points: 50 },
  { id: 'studio_diverse_25', name: 'Studio Connoisseur', description: 'Watch anime from 25 different studios', category: 'studios', tier: 'gold', icon: '🎞️', requirement: { type: 'studio_count', value: 25, comparison: 'gte' }, points: 100 },
  { id: 'studio_diverse_50', name: 'Studio Encyclopedia', description: 'Watch anime from 50 different studios', category: 'studios', tier: 'platinum', icon: '📽️', requirement: { type: 'studio_count', value: 50, comparison: 'gte' }, points: 200 },
  { id: 'studio_diverse_100', name: 'Studio Master', description: 'Watch anime from 100 different studios', category: 'studios', tier: 'diamond', icon: '🏭', requirement: { type: 'studio_count', value: 100, comparison: 'gte' }, points: 400 },

  // === COLLECTION ACHIEVEMENTS (100 achievements) ===
  { id: 'format_tv_10', name: 'TV Watcher', description: 'Watch 10 TV series', category: 'collection', tier: 'bronze', icon: '📺', requirement: { type: 'format_tv', value: 10, comparison: 'gte' }, points: 20 },
  { id: 'format_tv_50', name: 'Series Binger', description: 'Watch 50 TV series', category: 'collection', tier: 'silver', icon: '📡', requirement: { type: 'format_tv', value: 50, comparison: 'gte' }, points: 60 },
  { id: 'format_tv_100', name: 'TV Addict', description: 'Watch 100 TV series', category: 'collection', tier: 'gold', icon: '📹', requirement: { type: 'format_tv', value: 100, comparison: 'gte' }, points: 120 },
  { id: 'format_tv_250', name: 'Television Master', description: 'Watch 250 TV series', category: 'collection', tier: 'platinum', icon: '🖥️', requirement: { type: 'format_tv', value: 250, comparison: 'gte' }, points: 250 },

  { id: 'format_movie_5', name: 'Movie Goer', description: 'Watch 5 anime movies', category: 'collection', tier: 'bronze', icon: '🎬', requirement: { type: 'format_movie', value: 5, comparison: 'gte' }, points: 15 },
  { id: 'format_movie_25', name: 'Film Buff', description: 'Watch 25 anime movies', category: 'collection', tier: 'silver', icon: '🎞️', requirement: { type: 'format_movie', value: 25, comparison: 'gte' }, points: 50 },
  { id: 'format_movie_50', name: 'Cinema Lover', description: 'Watch 50 anime movies', category: 'collection', tier: 'gold', icon: '🎥', requirement: { type: 'format_movie', value: 50, comparison: 'gte' }, points: 100 },
  { id: 'format_movie_100', name: 'Movie Master', description: 'Watch 100 anime movies', category: 'collection', tier: 'platinum', icon: '🎪', requirement: { type: 'format_movie', value: 100, comparison: 'gte' }, points: 200 },

  { id: 'format_ova_5', name: 'OVA Discoverer', description: 'Watch 5 OVAs', category: 'collection', tier: 'bronze', icon: '💿', requirement: { type: 'format_ova', value: 5, comparison: 'gte' }, points: 15 },
  { id: 'format_ova_25', name: 'OVA Enthusiast', description: 'Watch 25 OVAs', category: 'collection', tier: 'silver', icon: '📀', requirement: { type: 'format_ova', value: 25, comparison: 'gte' }, points: 50 },
  { id: 'format_ova_50', name: 'OVA Collector', description: 'Watch 50 OVAs', category: 'collection', tier: 'gold', icon: '💽', requirement: { type: 'format_ova', value: 50, comparison: 'gte' }, points: 100 },

  { id: 'format_special_10', name: 'Special Hunter', description: 'Watch 10 specials', category: 'collection', tier: 'bronze', icon: '🎁', requirement: { type: 'format_special', value: 10, comparison: 'gte' }, points: 20 },
  { id: 'format_special_50', name: 'Special Collector', description: 'Watch 50 specials', category: 'collection', tier: 'silver', icon: '🎉', requirement: { type: 'format_special', value: 50, comparison: 'gte' }, points: 60 },

  // === DEDICATION ACHIEVEMENTS (100 achievements) ===
  { id: 'rewatch_1', name: 'Worth Rewatching', description: 'Rewatch an anime', category: 'dedication', tier: 'bronze', icon: '🔄', requirement: { type: 'rewatches', value: 1, comparison: 'gte' }, points: 25 },
  { id: 'rewatch_5', name: 'Nostalgia Lover', description: 'Rewatch 5 anime', category: 'dedication', tier: 'silver', icon: '🔁', requirement: { type: 'rewatches', value: 5, comparison: 'gte' }, points: 60 },
  { id: 'rewatch_10', name: 'Serial Rewatcher', description: 'Rewatch 10 anime', category: 'dedication', tier: 'gold', icon: '♻️', requirement: { type: 'rewatches', value: 10, comparison: 'gte' }, points: 120 },
  { id: 'rewatch_25', name: 'Rewatch Master', description: 'Rewatch 25 anime', category: 'dedication', tier: 'platinum', icon: '🔂', requirement: { type: 'rewatches', value: 25, comparison: 'gte' }, points: 250 },

  { id: 'planning_10', name: 'Planning Ahead', description: 'Have 10 anime in your plan to watch', category: 'dedication', tier: 'bronze', icon: '📋', requirement: { type: 'planning_count', value: 10, comparison: 'gte' }, points: 15 },
  { id: 'planning_50', name: 'Ambitious Planner', description: 'Have 50 anime in your plan to watch', category: 'dedication', tier: 'silver', icon: '📝', requirement: { type: 'planning_count', value: 50, comparison: 'gte' }, points: 40 },
  { id: 'planning_100', name: 'Endless Backlog', description: 'Have 100 anime in your plan to watch', category: 'dedication', tier: 'gold', icon: '📚', requirement: { type: 'planning_count', value: 100, comparison: 'gte' }, points: 80 },
  { id: 'planning_250', name: 'Eternal Planning', description: 'Have 250 anime in your plan to watch', category: 'dedication', tier: 'platinum', icon: '📖', requirement: { type: 'planning_count', value: 250, comparison: 'gte' }, points: 150 },

  { id: 'current_5', name: 'Multitasker', description: 'Watch 5 anime simultaneously', category: 'dedication', tier: 'bronze', icon: '📱', requirement: { type: 'watching_count', value: 5, comparison: 'gte' }, points: 20 },
  { id: 'current_10', name: 'Juggler', description: 'Watch 10 anime simultaneously', category: 'dedication', tier: 'silver', icon: '🤹', requirement: { type: 'watching_count', value: 10, comparison: 'gte' }, points: 50 },
  { id: 'current_20', name: 'Master Juggler', description: 'Watch 20 anime simultaneously', category: 'dedication', tier: 'gold', icon: '🎪', requirement: { type: 'watching_count', value: 20, comparison: 'gte' }, points: 100 },

  // === SEASONAL ACHIEVEMENTS (50 achievements) ===
  { id: 'seasonal_current_5', name: 'Seasonal Viewer', description: 'Watch 5 currently airing anime', category: 'seasonal', tier: 'bronze', icon: '📅', requirement: { type: 'seasonal_current', value: 5, comparison: 'gte' }, points: 25 },
  { id: 'seasonal_current_10', name: 'Seasonal Follower', description: 'Watch 10 currently airing anime', category: 'seasonal', tier: 'silver', icon: '🗓️', requirement: { type: 'seasonal_current', value: 10, comparison: 'gte' }, points: 50 },
  { id: 'seasonal_current_15', name: 'Seasonal Addict', description: 'Watch 15 currently airing anime', category: 'seasonal', tier: 'gold', icon: '📆', requirement: { type: 'seasonal_current', value: 15, comparison: 'gte' }, points: 100 },
  { id: 'seasonal_current_25', name: 'Seasonal Master', description: 'Watch 25 currently airing anime', category: 'seasonal', tier: 'platinum', icon: '🌸', requirement: { type: 'seasonal_current', value: 25, comparison: 'gte' }, points: 200 },

  // === SPECIAL/HIDDEN ACHIEVEMENTS (100 achievements) ===
  { id: 'drop_master', name: 'Selective Viewer', description: 'Drop 50 anime (you know what you like)', category: 'special', tier: 'silver', icon: '🗑️', requirement: { type: 'dropped_count', value: 50, comparison: 'gte' }, points: 30 },
  { id: 'no_drops', name: 'Never Give Up', description: 'Complete 50 anime without dropping any', category: 'special', tier: 'gold', icon: '💪', requirement: { type: 'dropped_count', value: 0, comparison: 'eq' }, points: 100, hidden: true },
  { id: 'pause_master', name: 'On Hold Specialist', description: 'Have 25 anime on hold', category: 'special', tier: 'bronze', icon: '⏸️', requirement: { type: 'paused_count', value: 25, comparison: 'gte' }, points: 20 },

  { id: 'year_span_5', name: 'Time Traveler', description: 'Watch anime spanning 5 different decades', category: 'special', tier: 'silver', icon: '🕰️', requirement: { type: 'year_span', value: 5, comparison: 'gte' }, points: 60 },
  { id: 'year_span_7', name: 'Anime Historian', description: 'Watch anime spanning 7 different decades', category: 'special', tier: 'gold', icon: '📜', requirement: { type: 'year_span', value: 7, comparison: 'gte' }, points: 120 },

  { id: 'favorites_10', name: 'Favorites Curator', description: 'Add 10 favorites', category: 'special', tier: 'bronze', icon: '⭐', requirement: { type: 'favorites_count', value: 10, comparison: 'gte' }, points: 30 },
  { id: 'favorites_25', name: 'Favorites Collector', description: 'Add 25 favorites', category: 'special', tier: 'silver', icon: '🌟', requirement: { type: 'favorites_count', value: 25, comparison: 'gte' }, points: 60 },
  { id: 'favorites_50', name: 'Favorites Master', description: 'Add 50 favorites', category: 'special', tier: 'gold', icon: '✨', requirement: { type: 'favorites_count', value: 50, comparison: 'gte' }, points: 120 },

  { id: 'activity_100', name: 'Active Member', description: 'Log 100 activities', category: 'social', tier: 'bronze', icon: '📊', requirement: { type: 'activity_count', value: 100, comparison: 'gte' }, points: 30 },
  { id: 'activity_500', name: 'Very Active', description: 'Log 500 activities', category: 'social', tier: 'silver', icon: '📈', requirement: { type: 'activity_count', value: 500, comparison: 'gte' }, points: 75 },
  { id: 'activity_1000', name: 'Hyper Active', description: 'Log 1000 activities', category: 'social', tier: 'gold', icon: '📉', requirement: { type: 'activity_count', value: 1000, comparison: 'gte' }, points: 150 },

  // Country/Origin Achievements
  { id: 'country_japan_50', name: 'Japan Lover', description: 'Watch 50 Japanese anime', category: 'collection', tier: 'bronze', icon: '🇯🇵', requirement: { type: 'country_japan', value: 50, comparison: 'gte' }, points: 40 },
  { id: 'country_japan_100', name: 'Japanophile', description: 'Watch 100 Japanese anime', category: 'collection', tier: 'silver', icon: '🗾', requirement: { type: 'country_japan', value: 100, comparison: 'gte' }, points: 80 },
  { id: 'country_china_10', name: 'Donghua Explorer', description: 'Watch 10 Chinese anime', category: 'collection', tier: 'bronze', icon: '🇨🇳', requirement: { type: 'country_china', value: 10, comparison: 'gte' }, points: 30 },
  { id: 'country_china_25', name: 'Donghua Fan', description: 'Watch 25 Chinese anime', category: 'collection', tier: 'silver', icon: '🐉', requirement: { type: 'country_china', value: 25, comparison: 'gte' }, points: 60 },
  { id: 'country_korea_10', name: 'Aeni Explorer', description: 'Watch 10 Korean anime', category: 'collection', tier: 'bronze', icon: '🇰🇷', requirement: { type: 'country_korea', value: 10, comparison: 'gte' }, points: 30 },
  { id: 'country_korea_25', name: 'Aeni Fan', description: 'Watch 25 Korean anime', category: 'collection', tier: 'silver', icon: '🏯', requirement: { type: 'country_korea', value: 25, comparison: 'gte' }, points: 60 },

  // === MILESTONE ACHIEVEMENTS (100 achievements) ===
  { id: 'milestone_first_favorite', name: 'First Love', description: 'Add your first favorite anime', category: 'milestones', tier: 'bronze', icon: '💝', requirement: { type: 'favorites_count', value: 1, comparison: 'gte' }, points: 15 },
  { id: 'milestone_100_ep_single', name: 'Long Runner', description: 'Complete an anime with 100+ episodes', category: 'milestones', tier: 'silver', icon: '🏃', requirement: { type: 'episodes_watched', value: 100, comparison: 'gte' }, points: 50, hidden: true },
  { id: 'milestone_same_day', name: 'Speed Demon', description: 'Complete an anime in the same day you started', category: 'milestones', tier: 'gold', icon: '⚡', requirement: { type: 'same_day_completion', value: 1, comparison: 'gte' }, points: 75, hidden: true },
];

// Generate more achievements to reach 1000+
const generateMoreAchievements = (): Achievement[] => {
  const additional: Achievement[] = [];

  // Generate incremental watching achievements (watch_15, watch_20, watch_30, etc.)
  for (let count of [15, 20, 30, 40, 60, 75, 80, 90, 120, 150, 175, 250, 350, 400, 450, 600, 700, 800, 900, 1200, 1500, 2000]) {
    const tier: AchievementTier = count < 100 ? 'bronze' : count < 300 ? 'silver' : count < 600 ? 'gold' : count < 1000 ? 'platinum' : 'diamond';
    additional.push({
      id: `watch_${count}`,
      name: `${count} Anime Watched`,
      description: `Watch ${count} anime`,
      category: 'watching',
      tier,
      icon: '📺',
      requirement: { type: 'total_anime_count', value: count, comparison: 'gte' },
      points: count * 0.5
    });
  }

  // Generate episode achievements
  for (let count of [150, 200, 300, 400, 600, 750, 1250, 1500, 1750, 2000, 3000, 3500, 4000, 6000, 7000, 8000, 9000]) {
    const tier: AchievementTier = count < 500 ? 'bronze' : count < 1500 ? 'silver' : count < 3500 ? 'gold' : count < 7000 ? 'platinum' : 'diamond';
    additional.push({
      id: `ep_${count}`,
      name: `${count} Episodes`,
      description: `Watch ${count} episodes`,
      category: 'watching',
      tier,
      icon: '📼',
      requirement: { type: 'episodes_watched', value: count, comparison: 'gte' },
      points: count * 0.1
    });
  }

  // Generate completion achievements
  for (let count of [15, 20, 30, 40, 60, 75, 80, 90, 120, 150, 175, 250, 350, 400, 450, 600, 700, 800, 900]) {
    const tier: AchievementTier = count < 50 ? 'bronze' : count < 150 ? 'silver' : count < 350 ? 'gold' : count < 600 ? 'platinum' : 'diamond';
    additional.push({
      id: `complete_${count}`,
      name: `${count} Completed`,
      description: `Complete ${count} anime`,
      category: 'completion',
      tier,
      icon: '✅',
      requirement: { type: 'completed_count', value: count, comparison: 'gte' },
      points: count * 0.8
    });
  }

  // Generate time-based achievements
  const timeMarks = [
    { hours: 2, label: 'Two Hours' },
    { hours: 5, label: 'Five Hours' },
    { hours: 12, label: 'Half Day' },
    { hours: 48, label: 'Two Days' },
    { hours: 72, label: 'Three Days' },
    { hours: 100, label: 'Hundred Hours' },
    { hours: 200, label: 'Two Hundred Hours' },
    { hours: 300, label: 'Three Hundred Hours' },
    { hours: 500, label: 'Five Hundred Hours' },
    { hours: 1000, label: 'Thousand Hours' },
    { hours: 2000, label: 'Two Thousand Hours' },
    { hours: 3000, label: 'Three Thousand Hours' },
    { hours: 5000, label: 'Five Thousand Hours' },
  ];

  for (let mark of timeMarks) {
    const tier: AchievementTier = mark.hours < 24 ? 'bronze' : mark.hours < 168 ? 'silver' : mark.hours < 1000 ? 'gold' : mark.hours < 3000 ? 'platinum' : 'diamond';
    additional.push({
      id: `time_${mark.hours}h`,
      name: mark.label,
      description: `Watch ${mark.hours} hours of anime`,
      category: 'time',
      tier,
      icon: '⏰',
      requirement: { type: 'watch_time_minutes', value: mark.hours * 60, comparison: 'gte' },
      points: mark.hours * 0.5
    });
  }

  // More genre-specific achievements for different thresholds
  const genres = ['Action', 'Comedy', 'Drama', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror', 'Mystery', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller', 'Mecha', 'Music', 'Psychological'];
  const genreThresholds = [5, 15, 20, 25, 30, 40, 60, 75, 80, 120, 150, 200, 250, 300];

  for (let genre of genres) {
    for (let threshold of genreThresholds) {
      const tier: AchievementTier = threshold < 20 ? 'bronze' : threshold < 60 ? 'silver' : threshold < 150 ? 'gold' : threshold < 250 ? 'platinum' : 'diamond';
      const iconMap: Record<string, string> = {
        'Action': '💥', 'Comedy': '😂', 'Drama': '🎭', 'Romance': '💕',
        'Sci-Fi': '🚀', 'Fantasy': '🧙', 'Horror': '😱', 'Mystery': '🔍',
        'Slice of Life': '🏡', 'Sports': '⚽', 'Supernatural': '👁️',
        'Thriller': '😰', 'Mecha': '🤖', 'Music': '🎵', 'Psychological': '🧠'
      };
      additional.push({
        id: `genre_${genre.toLowerCase().replace(/ /g, '_')}_${threshold}`,
        name: `${genre} ${threshold}`,
        description: `Watch ${threshold} ${genre} anime`,
        category: 'genres',
        tier,
        icon: iconMap[genre] || '🎬',
        requirement: { type: 'genre_count', value: threshold, comparison: 'gte', field: genre },
        points: threshold * 1.2
      });
    }
  }

  // Studio diversity achievements
  for (let count of [15, 20, 30, 40, 60, 75, 80, 90, 120, 150]) {
    const tier: AchievementTier = count < 20 ? 'bronze' : count < 50 ? 'silver' : count < 100 ? 'gold' : count < 130 ? 'platinum' : 'diamond';
    additional.push({
      id: `studio_diverse_${count}`,
      name: `${count} Studios`,
      description: `Watch anime from ${count} different studios`,
      category: 'studios',
      tier,
      icon: '🎬',
      requirement: { type: 'studio_count', value: count, comparison: 'gte' },
      points: count * 2
    });
  }

  // More rewatches achievements
  for (let count of [3, 7, 15, 20, 30, 40, 50, 75, 100]) {
    const tier: AchievementTier = count < 10 ? 'bronze' : count < 25 ? 'silver' : count < 50 ? 'gold' : count < 80 ? 'platinum' : 'diamond';
    additional.push({
      id: `rewatch_${count}`,
      name: `${count} Rewatches`,
      description: `Rewatch anime ${count} times total`,
      category: 'dedication',
      tier,
      icon: '🔄',
      requirement: { type: 'rewatches', value: count, comparison: 'gte' },
      points: count * 3
    });
  }

  // More planning achievements
  for (let count of [25, 150, 200, 300, 500, 750, 1000]) {
    const tier: AchievementTier = count < 100 ? 'bronze' : count < 250 ? 'silver' : count < 500 ? 'gold' : count < 800 ? 'platinum' : 'diamond';
    additional.push({
      id: `planning_${count}`,
      name: `${count} Planned`,
      description: `Have ${count} anime in plan to watch`,
      category: 'dedication',
      tier,
      icon: '📋',
      requirement: { type: 'planning_count', value: count, comparison: 'gte' },
      points: count * 0.3
    });
  }

  // More currently watching achievements
  for (let count of [3, 7, 15, 25, 30, 40, 50]) {
    const tier: AchievementTier = count < 10 ? 'bronze' : count < 20 ? 'silver' : count < 35 ? 'gold' : count < 45 ? 'platinum' : 'diamond';
    additional.push({
      id: `current_${count}`,
      name: `Watching ${count}`,
      description: `Watch ${count} anime at the same time`,
      category: 'dedication',
      tier,
      icon: '🎭',
      requirement: { type: 'watching_count', value: count, comparison: 'gte' },
      points: count * 4
    });
  }

  // More dropped achievements
  for (let count of [10, 25, 75, 100, 150, 200, 300]) {
    const tier: AchievementTier = count < 50 ? 'bronze' : count < 100 ? 'silver' : count < 200 ? 'gold' : count < 250 ? 'platinum' : 'diamond';
    additional.push({
      id: `drop_${count}`,
      name: `${count} Drops`,
      description: `Drop ${count} anime (picky viewer!)`,
      category: 'special',
      tier,
      icon: '🗑️',
      requirement: { type: 'dropped_count', value: count, comparison: 'gte' },
      points: count * 0.5
    });
  }

  // More paused achievements
  for (let count of [5, 10, 15, 30, 50, 75, 100]) {
    const tier: AchievementTier = count < 15 ? 'bronze' : count < 40 ? 'silver' : count < 70 ? 'gold' : count < 90 ? 'platinum' : 'diamond';
    additional.push({
      id: `paused_${count}`,
      name: `${count} On Hold`,
      description: `Have ${count} anime on hold`,
      category: 'dedication',
      tier,
      icon: '⏸️',
      requirement: { type: 'paused_count', value: count, comparison: 'gte' },
      points: count * 1.5
    });
  }

  // More seasonal achievements
  for (let count of [3, 7, 12, 18, 20, 30, 40, 50]) {
    const tier: AchievementTier = count < 10 ? 'bronze' : count < 20 ? 'silver' : count < 35 ? 'gold' : count < 45 ? 'platinum' : 'diamond';
    additional.push({
      id: `seasonal_${count}`,
      name: `${count} Seasonal Shows`,
      description: `Watch ${count} currently airing anime`,
      category: 'seasonal',
      tier,
      icon: '🌸',
      requirement: { type: 'seasonal_current', value: count, comparison: 'gte' },
      points: count * 5
    });
  }

  // More favorites achievements
  for (let count of [3, 5, 15, 20, 30, 40, 75, 100, 150, 200]) {
    const tier: AchievementTier = count < 10 ? 'bronze' : count < 30 ? 'silver' : count < 75 ? 'gold' : count < 125 ? 'platinum' : 'diamond';
    additional.push({
      id: `favorites_${count}`,
      name: `${count} Favorites`,
      description: `Add ${count} anime to favorites`,
      category: 'special',
      tier,
      icon: '⭐',
      requirement: { type: 'favorites_count', value: count, comparison: 'gte' },
      points: count * 2
    });
  }

  // More activity achievements
  for (let count of [50, 200, 300, 750, 1500, 2000, 3000, 5000]) {
    const tier: AchievementTier = count < 500 ? 'bronze' : count < 1000 ? 'silver' : count < 2500 ? 'gold' : count < 4000 ? 'platinum' : 'diamond';
    additional.push({
      id: `activity_${count}`,
      name: `${count} Activities`,
      description: `Log ${count} activities`,
      category: 'social',
      tier,
      icon: '📊',
      requirement: { type: 'activity_count', value: count, comparison: 'gte' },
      points: count * 0.1
    });
  }

  // More perfect score achievements
  for (let count of [3, 7, 15, 20, 30, 40, 75, 100]) {
    const tier: AchievementTier = count < 10 ? 'bronze' : count < 25 ? 'silver' : count < 50 ? 'gold' : count < 80 ? 'platinum' : 'diamond';
    additional.push({
      id: `perfect_${count}`,
      name: `${count} Perfect Scores`,
      description: `Give ${count} anime a 10/10 rating`,
      category: 'scores',
      tier,
      icon: '10️⃣',
      requirement: { type: 'perfect_scores', value: count, comparison: 'gte' },
      points: count * 3
    });
  }

  // More format-specific achievements
  for (let count of [5, 15, 25, 30, 40, 60, 75, 120, 150, 200, 300, 400, 500]) {
    const tier: AchievementTier = count < 30 ? 'bronze' : count < 100 ? 'silver' : count < 250 ? 'gold' : count < 400 ? 'platinum' : 'diamond';
    additional.push({
      id: `tv_${count}`,
      name: `${count} TV Series`,
      description: `Watch ${count} TV anime series`,
      category: 'collection',
      tier,
      icon: '📺',
      requirement: { type: 'format_tv', value: count, comparison: 'gte' },
      points: count * 1
    });
  }

  for (let count of [3, 10, 15, 20, 30, 40, 60, 75, 120, 150]) {
    const tier: AchievementTier = count < 15 ? 'bronze' : count < 40 ? 'silver' : count < 75 ? 'gold' : count < 100 ? 'platinum' : 'diamond';
    additional.push({
      id: `movie_${count}`,
      name: `${count} Movies`,
      description: `Watch ${count} anime movies`,
      category: 'collection',
      tier,
      icon: '🎬',
      requirement: { type: 'format_movie', value: count, comparison: 'gte' },
      points: count * 2
    });
  }

  for (let count of [3, 10, 15, 20, 30, 40, 60, 75, 100]) {
    const tier: AchievementTier = count < 15 ? 'bronze' : count < 35 ? 'silver' : count < 65 ? 'gold' : count < 85 ? 'platinum' : 'diamond';
    additional.push({
      id: `ova_${count}`,
      name: `${count} OVAs`,
      description: `Watch ${count} OVA releases`,
      category: 'collection',
      tier,
      icon: '💿',
      requirement: { type: 'format_ova', value: count, comparison: 'gte' },
      points: count * 1.5
    });
  }

  for (let count of [5, 15, 25, 40, 60, 80, 100, 150]) {
    const tier: AchievementTier = count < 20 ? 'bronze' : count < 50 ? 'silver' : count < 90 ? 'gold' : count < 120 ? 'platinum' : 'diamond';
    additional.push({
      id: `special_${count}`,
      name: `${count} Specials`,
      description: `Watch ${count} special episodes`,
      category: 'collection',
      tier,
      icon: '🎁',
      requirement: { type: 'format_special', value: count, comparison: 'gte' },
      points: count * 1.2
    });
  }

  // More country-specific achievements
  for (let count of [25, 75, 150, 200, 300, 400, 500, 750, 1000]) {
    const tier: AchievementTier = count < 100 ? 'bronze' : count < 250 ? 'silver' : count < 500 ? 'gold' : count < 800 ? 'platinum' : 'diamond';
    additional.push({
      id: `japan_${count}`,
      name: `${count} Japanese Anime`,
      description: `Watch ${count} anime from Japan`,
      category: 'collection',
      tier,
      icon: '🇯🇵',
      requirement: { type: 'country_japan', value: count, comparison: 'gte' },
      points: count * 0.5
    });
  }

  for (let count of [5, 15, 30, 50, 75, 100, 150, 200]) {
    const tier: AchievementTier = count < 20 ? 'bronze' : count < 50 ? 'silver' : count < 100 ? 'gold' : count < 150 ? 'platinum' : 'diamond';
    additional.push({
      id: `china_${count}`,
      name: `${count} Donghua`,
      description: `Watch ${count} Chinese anime (Donghua)`,
      category: 'collection',
      tier,
      icon: '🇨🇳',
      requirement: { type: 'country_china', value: count, comparison: 'gte' },
      points: count * 2
    });
  }

  for (let count of [5, 15, 30, 50, 75, 100, 150]) {
    const tier: AchievementTier = count < 20 ? 'bronze' : count < 50 ? 'silver' : count < 100 ? 'gold' : count < 125 ? 'platinum' : 'diamond';
    additional.push({
      id: `korea_${count}`,
      name: `${count} Aeni`,
      description: `Watch ${count} Korean anime (Aeni)`,
      category: 'collection',
      tier,
      icon: '🇰🇷',
      requirement: { type: 'country_korea', value: count, comparison: 'gte' },
      points: count * 2.5
    });
  }

  // Year span achievements
  for (let decades of [3, 4, 6, 8, 9, 10]) {
    const tier: AchievementTier = decades < 5 ? 'bronze' : decades < 7 ? 'silver' : decades < 9 ? 'gold' : decades < 10 ? 'platinum' : 'diamond';
    additional.push({
      id: `year_span_${decades}`,
      name: `${decades} Decades Spanned`,
      description: `Watch anime from ${decades} different decades`,
      category: 'special',
      tier,
      icon: '🕰️',
      requirement: { type: 'year_span', value: decades, comparison: 'gte' },
      points: decades * 30
    });
  }

  // Additional varied watching milestones
  for (let count of [3, 7, 12, 18, 22, 27, 33, 37, 42, 48, 55, 65, 70, 85, 95, 110, 130, 140, 160, 180, 190, 220, 240, 260, 280, 320, 340, 360, 380, 420, 480, 520, 550, 650, 850, 950, 1100, 1300, 1400, 1600, 1700, 1800, 1900, 2500, 3000, 3500, 4000, 5000]) {
    const tier: AchievementTier = count < 100 ? 'bronze' : count < 300 ? 'silver' : count < 600 ? 'gold' : count < 1000 ? 'platinum' : 'diamond';
    additional.push({
      id: `watch_milestone_${count}`,
      name: `${count} Shows`,
      description: `Reach ${count} anime in your list`,
      category: 'watching',
      tier,
      icon: '🎯',
      requirement: { type: 'total_anime_count', value: count, comparison: 'gte' },
      points: count * 0.6
    });
  }

  // Additional episode milestones
  for (let count of [75, 125, 175, 225, 275, 350, 450, 550, 650, 850, 950, 1100, 1300, 1400, 1600, 1800, 2200, 2400, 2600, 2800, 3200, 3600, 4200, 4500, 4800, 5500, 6500, 7500, 8500, 9500, 11000, 12000, 15000, 20000]) {
    const tier: AchievementTier = count < 500 ? 'bronze' : count < 1500 ? 'silver' : count < 3500 ? 'gold' : count < 7000 ? 'platinum' : 'diamond';
    additional.push({
      id: `episode_milestone_${count}`,
      name: `${count} Episodes`,
      description: `Watch ${count} total episodes`,
      category: 'watching',
      tier,
      icon: '🎞️',
      requirement: { type: 'episodes_watched', value: count, comparison: 'gte' },
      points: count * 0.15
    });
  }

  // More completion milestones
  for (let count of [3, 7, 12, 18, 22, 27, 33, 37, 42, 48, 55, 65, 70, 85, 95, 110, 130, 140, 160, 180, 190, 220, 240, 260, 280, 320, 340, 360, 380, 420, 480, 520, 550, 650, 750, 850]) {
    const tier: AchievementTier = count < 50 ? 'bronze' : count < 150 ? 'silver' : count < 350 ? 'gold' : count < 600 ? 'platinum' : 'diamond';
    additional.push({
      id: `completed_milestone_${count}`,
      name: `${count} Finished`,
      description: `Complete ${count} anime series`,
      category: 'completion',
      tier,
      icon: '🏁',
      requirement: { type: 'completed_count', value: count, comparison: 'gte' },
      points: count * 0.9
    });
  }

  // Power levels - based on total anime count with fun names
  const powerLevels = [
    { count: 2, name: 'Newbie', desc: 'Just getting started', tier: 'bronze' as AchievementTier, icon: '👶' },
    { count: 4, name: 'Beginner', desc: 'Learning the ropes', tier: 'bronze' as AchievementTier, icon: '🌱' },
    { count: 6, name: 'Apprentice', desc: 'Making progress', tier: 'bronze' as AchievementTier, icon: '📖' },
    { count: 8, name: 'Student', desc: 'Studying hard', tier: 'bronze' as AchievementTier, icon: '🎓' },
    { count: 13, name: 'Rookie', desc: 'Getting serious', tier: 'bronze' as AchievementTier, icon: '⭐' },
    { count: 17, name: 'Regular', desc: 'Consistent viewer', tier: 'bronze' as AchievementTier, icon: '👤' },
    { count: 21, name: 'Intermediate', desc: 'Halfway there', tier: 'silver' as AchievementTier, icon: '📊' },
    { count: 26, name: 'Skilled', desc: 'Building expertise', tier: 'silver' as AchievementTier, icon: '🎯' },
    { count: 31, name: 'Advanced', desc: 'Advanced level', tier: 'silver' as AchievementTier, icon: '🏅' },
    { count: 36, name: 'Expert', desc: 'Expert status', tier: 'silver' as AchievementTier, icon: '💎' },
    { count: 41, name: 'Professional', desc: 'Pro level viewer', tier: 'silver' as AchievementTier, icon: '🎖️' },
    { count: 46, name: 'Master', desc: 'Mastery achieved', tier: 'gold' as AchievementTier, icon: '👑' },
    { count: 51, name: 'Grandmaster', desc: 'Grandmaster rank', tier: 'gold' as AchievementTier, icon: '🏆' },
    { count: 56, name: 'Elite', desc: 'Elite status', tier: 'gold' as AchievementTier, icon: '⚡' },
    { count: 61, name: 'Champion', desc: 'Champion tier', tier: 'gold' as AchievementTier, icon: '🥇' },
    { count: 66, name: 'Hero', desc: 'Hero of anime', tier: 'gold' as AchievementTier, icon: '🦸' },
    { count: 71, name: 'Legend', desc: 'Legendary viewer', tier: 'platinum' as AchievementTier, icon: '🌟' },
    { count: 76, name: 'Mythic', desc: 'Mythic level', tier: 'platinum' as AchievementTier, icon: '🔮' },
    { count: 81, name: 'Divine', desc: 'Divine rank', tier: 'platinum' as AchievementTier, icon: '✨' },
    { count: 86, name: 'Immortal', desc: 'Immortal status', tier: 'platinum' as AchievementTier, icon: '♾️' },
    { count: 91, name: 'Godlike', desc: 'Godlike level', tier: 'platinum' as AchievementTier, icon: '🌈' },
    { count: 96, name: 'Supreme', desc: 'Supreme being', tier: 'diamond' as AchievementTier, icon: '👑' },
    { count: 101, name: 'Cosmic', desc: 'Cosmic level', tier: 'diamond' as AchievementTier, icon: '🌌' },
    { count: 111, name: 'Transcendent', desc: 'Beyond mortal', tier: 'diamond' as AchievementTier, icon: '🎆' },
    { count: 121, name: 'Omnipotent', desc: 'All-powerful', tier: 'diamond' as AchievementTier, icon: '💫' },
  ];

  for (let level of powerLevels) {
    additional.push({
      id: `power_${level.count}`,
      name: level.name,
      description: `${level.desc} (${level.count} anime)`,
      category: 'milestones',
      tier: level.tier,
      icon: level.icon,
      requirement: { type: 'total_anime_count', value: level.count, comparison: 'gte' },
      points: level.count * 5
    });
  }

  // Binge achievements - based on completion speed
  const bingeNames = [
    { count: 2, name: 'Weekend Warrior', desc: 'Watch 2 anime', tier: 'bronze' as AchievementTier },
    { count: 4, name: 'Night Owl', desc: 'Watch 4 anime', tier: 'bronze' as AchievementTier },
    { count: 6, name: 'Binge Starter', desc: 'Watch 6 anime', tier: 'bronze' as AchievementTier },
    { count: 8, name: 'Marathon Runner', desc: 'Watch 8 anime', tier: 'silver' as AchievementTier },
    { count: 11, name: 'Speed Watcher', desc: 'Watch 11 anime', tier: 'silver' as AchievementTier },
    { count: 14, name: 'Rapid Fire', desc: 'Watch 14 anime', tier: 'silver' as AchievementTier },
    { count: 16, name: 'Lightning Speed', desc: 'Watch 16 anime', tier: 'gold' as AchievementTier },
    { count: 19, name: 'Unstoppable', desc: 'Watch 19 anime', tier: 'gold' as AchievementTier },
    { count: 23, name: 'Binge Legend', desc: 'Watch 23 anime', tier: 'gold' as AchievementTier },
    { count: 28, name: 'No Sleep Squad', desc: 'Watch 28 anime', tier: 'platinum' as AchievementTier },
    { count: 32, name: 'Marathon God', desc: 'Watch 32 anime', tier: 'platinum' as AchievementTier },
    { count: 35, name: 'Infinity Watcher', desc: 'Watch 35 anime', tier: 'diamond' as AchievementTier },
  ];

  for (let binge of bingeNames) {
    additional.push({
      id: `binge_${binge.count}`,
      name: binge.name,
      description: binge.desc,
      category: 'milestones',
      tier: binge.tier,
      icon: '🎬',
      requirement: { type: 'completed_count', value: binge.count, comparison: 'gte' },
      points: binge.count * 6
    });
  }

  // Collector achievements - diverse types
  const collectorTypes = [
    { count: 11, name: 'Casual Collector', tier: 'bronze' as AchievementTier },
    { count: 24, name: 'Dedicated Collector', tier: 'silver' as AchievementTier },
    { count: 44, name: 'Serious Collector', tier: 'silver' as AchievementTier },
    { count: 64, name: 'Obsessive Collector', tier: 'gold' as AchievementTier },
    { count: 88, name: 'Ultimate Collector', tier: 'gold' as AchievementTier },
    { count: 99, name: 'Perfect Collector', tier: 'platinum' as AchievementTier },
    { count: 123, name: 'Legendary Collector', tier: 'platinum' as AchievementTier },
    { count: 155, name: 'Mythical Collector', tier: 'diamond' as AchievementTier },
  ];

  for (let col of collectorTypes) {
    additional.push({
      id: `collector_${col.count}`,
      name: col.name,
      description: `Collect ${col.count} anime in your list`,
      category: 'collection',
      tier: col.tier,
      icon: '🎁',
      requirement: { type: 'total_anime_count', value: col.count, comparison: 'gte' },
      points: col.count * 4
    });
  }

  // Episode count milestones with unique names
  const epNames = [
    { count: 25, name: 'First Steps', tier: 'bronze' as AchievementTier },
    { count: 42, name: 'Answer Seeker', tier: 'bronze' as AchievementTier },
    { count: 69, name: 'Nice', tier: 'bronze' as AchievementTier },
    { count: 88, name: 'Lucky Number', tier: 'bronze' as AchievementTier },
    { count: 99, name: 'Almost 100', tier: 'bronze' as AchievementTier },
    { count: 111, name: 'Triple One', tier: 'silver' as AchievementTier },
    { count: 123, name: 'Easy as ABC', tier: 'silver' as AchievementTier },
    { count: 222, name: 'Triple Two', tier: 'silver' as AchievementTier },
    { count: 321, name: 'Countdown', tier: 'silver' as AchievementTier },
    { count: 333, name: 'Triple Three', tier: 'gold' as AchievementTier },
    { count: 420, name: 'Blaze It', tier: 'gold' as AchievementTier },
    { count: 444, name: 'Quad Four', tier: 'gold' as AchievementTier },
    { count: 500, name: 'Half Thousand', tier: 'gold' as AchievementTier },
    { count: 555, name: 'Five Five Five', tier: 'platinum' as AchievementTier },
    { count: 666, name: 'Devils Number', tier: 'platinum' as AchievementTier },
    { count: 777, name: 'Lucky Sevens', tier: 'platinum' as AchievementTier },
    { count: 888, name: 'Infinite Prosperity', tier: 'platinum' as AchievementTier },
    { count: 999, name: 'Almost 1K', tier: 'diamond' as AchievementTier },
    { count: 1111, name: 'All Ones', tier: 'diamond' as AchievementTier },
    { count: 1234, name: 'Sequential', tier: 'diamond' as AchievementTier },
    { count: 1337, name: 'Elite Leet', tier: 'diamond' as AchievementTier },
    { count: 2222, name: 'All Twos', tier: 'diamond' as AchievementTier },
  ];

  for (let ep of epNames) {
    additional.push({
      id: `ep_special_${ep.count}`,
      name: ep.name,
      description: `Watch exactly ${ep.count} episodes`,
      category: 'milestones',
      tier: ep.tier,
      icon: '🎯',
      requirement: { type: 'episodes_watched', value: ep.count, comparison: 'gte' },
      points: ep.count * 0.5
    });
  }

  // Time milestones with creative names
  const timeNames = [
    { hours: 4, name: 'Movie Marathon', tier: 'bronze' as AchievementTier },
    { hours: 8, name: 'Work Day', tier: 'bronze' as AchievementTier },
    { hours: 16, name: 'Half Day Binge', tier: 'bronze' as AchievementTier },
    { hours: 36, name: 'Day and a Half', tier: 'silver' as AchievementTier },
    { hours: 50, name: 'Two Days Strong', tier: 'silver' as AchievementTier },
    { hours: 84, name: 'Half Week', tier: 'silver' as AchievementTier },
    { hours: 120, name: 'Five Days', tier: 'gold' as AchievementTier },
    { hours: 150, name: 'Full Week Work', tier: 'gold' as AchievementTier },
    { hours: 240, name: 'Ten Days', tier: 'gold' as AchievementTier },
    { hours: 336, name: 'Two Weeks', tier: 'platinum' as AchievementTier },
    { hours: 504, name: 'Three Weeks', tier: 'platinum' as AchievementTier },
    { hours: 600, name: 'Twenty Five Days', tier: 'platinum' as AchievementTier },
    { hours: 840, name: 'Five Weeks', tier: 'diamond' as AchievementTier },
    { hours: 1440, name: 'Two Months', tier: 'diamond' as AchievementTier },
    { hours: 2160, name: 'Three Months', tier: 'diamond' as AchievementTier },
    { hours: 4320, name: 'Half Year', tier: 'diamond' as AchievementTier },
  ];

  for (let time of timeNames) {
    additional.push({
      id: `time_special_${time.hours}h`,
      name: time.name,
      description: `Watch ${time.hours} hours of anime`,
      category: 'time',
      tier: time.tier,
      icon: '⌛',
      requirement: { type: 'watch_time_minutes', value: time.hours * 60, comparison: 'gte' },
      points: time.hours * 1
    });
  }

  // Mean score tier achievements
  const scoreTiers = [
    { score: 4.0, name: 'Critical Eye', desc: 'Maintain 4.0 mean', tier: 'bronze' as AchievementTier },
    { score: 4.5, name: 'Tough Critic', desc: 'Maintain 4.5 mean', tier: 'bronze' as AchievementTier },
    { score: 5.5, name: 'Moderate Viewer', desc: 'Maintain 5.5 mean', tier: 'silver' as AchievementTier },
    { score: 6.0, name: 'Fair Rater', desc: 'Maintain 6.0 mean', tier: 'silver' as AchievementTier },
    { score: 6.5, name: 'Positive Viewer', desc: 'Maintain 6.5 mean', tier: 'silver' as AchievementTier },
    { score: 7.5, name: 'Generous Viewer', desc: 'Maintain 7.5 mean', tier: 'gold' as AchievementTier },
    { score: 8.5, name: 'Loving Viewer', desc: 'Maintain 8.5 mean', tier: 'gold' as AchievementTier },
    { score: 9.5, name: 'Perfect Taste', desc: 'Maintain 9.5 mean', tier: 'platinum' as AchievementTier },
  ];

  for (let score of scoreTiers) {
    additional.push({
      id: `mean_score_${score.score.toFixed(1)}`,
      name: score.name,
      description: score.desc,
      category: 'scores',
      tier: score.tier,
      icon: '⭐',
      requirement: { type: 'mean_score', value: score.score, comparison: 'gte' },
      points: score.score * 20
    });
  }

  // Numeric milestone achievements (fun numbers for anime count)
  const numericMilestones = [
    9, 14, 19, 23, 29, 34, 39, 43, 47, 49, 53, 57, 62, 67, 72, 78, 82, 87, 92, 97,
    102, 107, 113, 117, 127, 133, 137, 143, 147, 152, 157, 163, 167, 172, 177, 183,
    187, 192, 197, 203, 207, 213, 217, 223, 227, 233, 237, 243, 247, 253, 257, 263,
    267, 272, 277, 283, 287, 292, 297, 303, 307, 313, 317, 323, 327, 333, 337, 343,
    347, 353, 357, 363, 367, 372, 377, 383, 387, 392, 397, 403, 407, 413, 417, 423,
    427, 433, 437, 443, 447, 453, 457, 463, 467, 472, 477, 483, 487, 492, 497,
  ];

  for (let num of numericMilestones) {
    const tier: AchievementTier = num < 100 ? 'bronze' : num < 250 ? 'silver' : num < 400 ? 'gold' : num < 475 ? 'platinum' : 'diamond';
    additional.push({
      id: `numeric_${num}`,
      name: `${num} Milestone`,
      description: `Reach ${num} anime watched`,
      category: 'watching',
      tier,
      icon: '🔢',
      requirement: { type: 'total_anime_count', value: num, comparison: 'gte' },
      points: num * 0.7
    });
  }

  // Episode numeric milestones
  const episodeMilestones = [
    33, 44, 55, 66, 77, 101, 133, 155, 188, 211, 233, 255, 277, 299, 311, 355,
    377, 399, 422, 455, 477, 511, 533, 566, 588, 611, 633, 666, 688, 711, 733,
    755, 777, 799, 822, 844, 866, 888, 911, 933, 955, 977, 1010, 1055, 1099,
    1122, 1155, 1188, 1211, 1244, 1277, 1333, 1366, 1399, 1422, 1455, 1488, 1511,
    1555, 1588, 1611, 1666, 1699, 1733, 1777, 1811, 1844, 1877, 1911, 1944, 1977,
  ];

  for (let ep of episodeMilestones) {
    const tier: AchievementTier = ep < 500 ? 'bronze' : ep < 1000 ? 'silver' : ep < 1500 ? 'gold' : ep < 1800 ? 'platinum' : 'diamond';
    additional.push({
      id: `ep_numeric_${ep}`,
      name: `${ep} Episodes Watched`,
      description: `Watch ${ep} episodes total`,
      category: 'watching',
      tier,
      icon: '📹',
      requirement: { type: 'episodes_watched', value: ep, comparison: 'gte' },
      points: ep * 0.2
    });
  }

  // Special number achievements for completions
  const completionSpecials = [
    { count: 2, name: 'Double Trouble' },
    { count: 4, name: 'Fantastic Four' },
    { count: 6, name: 'Half Dozen' },
    { count: 8, name: 'Crazy Eight' },
    { count: 9, name: 'Cloud Nine' },
    { count: 11, name: 'Elevenses' },
    { count: 13, name: 'Lucky Thirteen' },
    { count: 16, name: 'Sweet Sixteen' },
    { count: 17, name: 'Dancing Queen' },
    { count: 21, name: 'Coming of Age' },
    { count: 24, name: 'Full Day Hours' },
    { count: 31, name: 'Month Complete' },
    { count: 34, name: 'Rule 34' },
    { count: 44, name: 'Double Four' },
    { count: 49, name: 'Seven Squared' },
    { count: 52, name: 'Weeks in Year' },
    { count: 64, name: 'Power of Two' },
    { count: 69, name: 'Nice Completion' },
    { count: 77, name: 'Lucky Double' },
    { count: 88, name: 'Double Infinity' },
    { count: 99, name: 'Ninety Nine' },
    { count: 111, name: 'One Hundred Eleven' },
    { count: 123, name: 'One Two Three' },
    { count: 128, name: 'Byte Complete' },
    { count: 144, name: 'Gross Amount' },
    { count: 155, name: 'Speed Limit' },
    { count: 169, name: 'Thirteen Squared' },
    { count: 188, name: 'Double Lucky' },
    { count: 199, name: 'Almost 200' },
    { count: 222, name: 'Triple Deuces' },
    { count: 256, name: 'Two Fifty Six' },
    { count: 269, name: 'Prime Time' },
    { count: 299, name: 'Almost 300' },
    { count: 333, name: 'Triple Threes' },
    { count: 365, name: 'Days in Year' },
    { count: 399, name: 'Almost 400' },
    { count: 420, name: 'Four Twenty' },
    { count: 444, name: 'Quad Fours' },
    { count: 499, name: 'Almost 500' },
    { count: 512, name: 'Nine Bit' },
    { count: 555, name: 'Five Five Five' },
    { count: 599, name: 'Almost 600' },
    { count: 666, name: 'Number of the Beast' },
    { count: 699, name: 'Almost 700' },
    { count: 777, name: 'Triple Lucky' },
    { count: 799, name: 'Almost 800' },
    { count: 888, name: 'Triple Eights' },
    { count: 899, name: 'Almost 900' },
    { count: 999, name: 'Triple Nines' },
  ];

  for (let special of completionSpecials) {
    const tier: AchievementTier = special.count < 50 ? 'bronze' : special.count < 150 ? 'silver' : special.count < 350 ? 'gold' : special.count < 600 ? 'platinum' : 'diamond';
    additional.push({
      id: `completion_special_${special.count}`,
      name: special.name,
      description: `Complete ${special.count} anime`,
      category: 'completion',
      tier,
      icon: '🎊',
      requirement: { type: 'completed_count', value: special.count, comparison: 'gte' },
      points: special.count * 1.5
    });
  }

  // Extra numeric completions for variety
  const extraCompletions = [
    14, 19, 26, 29, 32, 38, 43, 46, 51, 54, 57, 59, 62, 68, 71, 73, 76, 78,
    81, 83, 86, 89, 91, 93, 96, 98, 101, 103, 106, 108, 112, 114, 116, 118,
    121, 124, 126, 129, 131, 134, 136, 138, 141, 143, 146, 148, 151, 153,
  ];

  for (let num of extraCompletions) {
    const tier: AchievementTier = num < 50 ? 'bronze' : num < 100 ? 'silver' : num < 125 ? 'gold' : num < 145 ? 'platinum' : 'diamond';
    additional.push({
      id: `extra_complete_${num}`,
      name: `${num} Completions`,
      description: `Complete ${num} anime shows`,
      category: 'completion',
      tier,
      icon: '🎉',
      requirement: { type: 'completed_count', value: num, comparison: 'gte' },
      points: num * 1.2
    });
  }

  return additional;
};

export const ALL_ACHIEVEMENTS = [...ACHIEVEMENTS, ...generateMoreAchievements()];

console.log(`Total achievements: ${ALL_ACHIEVEMENTS.length}`);
