"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className={`relative z-10 max-w-2xl w-full transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-red-500/20 backdrop-blur-sm p-6 rounded-full border-4 border-red-500">
              <AlertTriangle className="h-20 w-20 text-red-400" />
            </div>
          </div>
        </div>

        {/* Error Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Oops!
          </h1>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 blur-xl opacity-50" />
            <p className="relative text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
              Something went wrong
            </p>
          </div>
        </div>

        {/* Anime Emoticon */}
        <div className="text-6xl text-center mb-6 animate-bounce">
          (×_×)
        </div>

        {/* Error Message Box */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/50 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Bug className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">Error Details</h3>
              <p className="text-gray-300 text-sm break-words">
                {error.message || "An unexpected error occurred while processing your request."}
              </p>
              {error.digest && (
                <p className="text-gray-500 text-xs mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Helpful Message */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
          <p className="text-blue-300 text-sm text-center">
            💡 Don't worry! This happens sometimes. Try refreshing the page or going back to the dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={reset}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <RefreshCw className="h-5 w-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
            <span className="relative z-10">Try Again</span>
          </button>

          <Link
            href="/"
            className="group px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-gray-700 hover:border-blue-500 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Go to Dashboard</span>
          </Link>
        </div>

        {/* Anime Quote */}
        <div className="mt-8">
          <blockquote className="text-purple-300 italic text-sm md:text-base text-center border-l-4 border-purple-500 pl-4 py-2 max-w-lg mx-auto">
            "Even if we stumble and fall, we get up and keep walking. That's the way of life."
            <footer className="text-gray-400 text-xs mt-2">— Might Guy, Naruto</footer>
          </blockquote>
        </div>

        {/* Error Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-red-400">ERROR</div>
            <div className="text-xs text-gray-400 mt-1">Status</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-yellow-400">⚠️</div>
            <div className="text-xs text-gray-400 mt-1">Alert Level</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-green-400">✓</div>
            <div className="text-xs text-gray-400 mt-1">Can Recover</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
