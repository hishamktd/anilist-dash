"use client";

import { useEffect } from "react";
import { Skull, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-purple-950 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Glitch effect background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-red-500 mix-blend-multiply animate-glitch-1" />
            <div className="absolute inset-0 bg-blue-500 mix-blend-multiply animate-glitch-2" />
          </div>

          <div className="relative z-10 text-center max-w-2xl">
            {/* Skull Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-3xl opacity-50 animate-pulse" />
                <Skull className="h-32 w-32 text-red-500 relative animate-shake" />
              </div>
            </div>

            {/* Critical Error Text */}
            <h1 className="text-6xl md:text-7xl font-black text-red-500 mb-4 animate-glitch-text">
              CRITICAL ERROR
            </h1>

            <div className="text-8xl mb-6 animate-pulse">
              ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻
            </div>

            <p className="text-gray-300 text-xl mb-4">
              A catastrophic error has occurred
            </p>

            <div className="bg-black/50 border-2 border-red-500 rounded-lg p-6 mb-8 font-mono text-left">
              <div className="text-red-400 text-sm mb-2">ERROR_LOG:</div>
              <div className="text-gray-300 text-xs break-words">
                {error.message || "Unknown fatal error"}
              </div>
              {error.digest && (
                <div className="text-gray-500 text-xs mt-2">
                  TRACE_ID: {error.digest}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={reset}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Attempt Recovery
              </button>

              <a
                href="/"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold border-2 border-gray-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home className="h-5 w-5" />
                Emergency Exit
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              If this error persists, please contact support or check the console for details.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
