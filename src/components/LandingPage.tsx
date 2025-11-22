"use client";

import { signIn } from "next-auth/react";
import { Play, TrendingUp, Calendar, Star, Users, BarChart2 } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      <div className="z-10 max-w-5xl w-full px-6 text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            Your Anime Life, <br />
            <span className="text-gradient">Elevated.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience your AniList data like never before. Beautiful visualizations, 
            detailed statistics, and a personalized dashboard waiting for you.
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up delay-100">
          <button
            onClick={() => signIn("anilist")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.8)]"
          >
            <Play className="w-5 h-5 fill-current" />
            Connect with AniList
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in-up delay-200">
          <FeatureCard 
            icon={<BarChart2 className="w-6 h-6 text-blue-400" />}
            title="Deep Analytics"
            description="Visualize your watching habits with interactive heatmaps and charts."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6 text-pink-400" />}
            title="Real-time Tracking"
            description="Keep up with airing schedules and track your progress effortlessly."
          />
          <FeatureCard 
            icon={<Star className="w-6 h-6 text-yellow-400" />}
            title="Smart Insights"
            description="Discover your taste profile with genre breakdowns and studio stats."
          />
        </div>

        {/* Stats Preview */}
        <div className="pt-20 border-t border-white/5 animate-fade-in-up delay-300">
          <div className="flex flex-wrap justify-center gap-12 text-center">
            <StatItem label="Active Users" value="10k+" />
            <StatItem label="Anime Tracked" value="1M+" />
            <StatItem label="Data Points" value="50M+" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card p-6 rounded-2xl text-left hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all group border border-white/5 hover:border-blue-400/40">
      <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit transition-colors group-hover:bg-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
