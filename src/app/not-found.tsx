"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className={`relative z-10 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-[180px] md:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-none tracking-tighter animate-gradient">
            404
          </h1>
          <div className="relative -mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50" />
            <p className="relative text-2xl md:text-4xl font-bold text-white mb-2">
              Page Not Found
            </p>
          </div>
        </div>

        {/* Anime Character Emoticon */}
        <div className="text-8xl mb-6 animate-bounce">
          (╯°□°)╯︵ ┻━┻
        </div>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-md mx-auto">
          Oops! Looks like this page went on an adventure and got lost in another dimension.
        </p>

        {/* Anime Quote */}
        <div className="mb-12 max-w-lg mx-auto">
          <blockquote className="text-blue-300 italic text-sm md:text-base border-l-4 border-blue-500 pl-4 py-2">
            "The world isn't perfect. But it's there for us, doing the best it can;
            that's what makes it so damn beautiful."
            <footer className="text-gray-400 text-xs mt-2">— Roy Mustang, Fullmetal Alchemist</footer>
          </blockquote>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Home className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Back to Dashboard</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-gray-700 hover:border-blue-500 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Fun Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400">404</div>
            <div className="text-xs text-gray-400 mt-1">Error Code</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="text-3xl font-bold text-purple-400">∞</div>
            <div className="text-xs text-gray-400 mt-1">Anime to Watch</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="text-3xl font-bold text-pink-400">1</div>
            <div className="text-xs text-gray-400 mt-1">Lost Page</div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">✨</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float-delayed">🌟</div>
        <div className="absolute top-1/2 right-20 text-4xl opacity-20 animate-spin-slow">⭐</div>
      </div>
    </div>
  );
}
