"use client";

import { signIn } from "next-auth/react";
import { Play } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-950 text-white">
      <div className="flex flex-col items-center space-y-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/20">
          <Play className="h-10 w-10 text-white" fill="currentColor" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Welcome to AniDash
          </h1>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Your personal dashboard for tracking anime and manga progress.
            Visualize your journey with beautiful charts and timelines.
          </p>
        </div>

        <button
          onClick={() => signIn("anilist", { callbackUrl: "/" })}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
        >
          <span className="mr-2">Sign in with AniList</span>
          <Play className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor" />
        </button>
      </div>
      
      <div className="absolute bottom-8 text-xs text-gray-500">
        Powered by AniList API
      </div>
    </div>
  );
}
