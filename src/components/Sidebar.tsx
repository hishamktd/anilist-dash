"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, Clock, Settings, LogOut, User, Calendar, Tv } from "lucide-react";
import { clsx } from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Schedule", href: "/schedule", icon: Tv },
  { name: "Timeline", href: "/timeline", icon: Calendar },
  { name: "Watching", href: "/list/watching", icon: Clock },
  { name: "Completed", href: "/list/completed", icon: List },
  { name: "Dropped", href: "/list/dropped", icon: LogOut },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="fixed left-4 top-4 bottom-4 w-64 flex flex-col glass rounded-2xl text-white z-50 transition-all duration-300">
      <div className="flex h-20 items-center justify-center border-b border-white/5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          AniDash
        </h1>
      </div>
      
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center space-x-3 rounded-xl px-4 py-3.5 transition-all duration-300 relative overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] border border-blue-500/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
              )}
              <Icon className={clsx("h-5 w-5 transition-colors", isActive ? "text-blue-400" : "group-hover:text-blue-400")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        {session ? (
          <div className="group relative overflow-hidden rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10 border border-white/5 hover:border-white/10">
            <div className="flex items-center space-x-3">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-10 w-10 rounded-full border-2 border-blue-500/30 shadow-lg group-hover:border-blue-500 transition-colors"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-2 shadow-lg">
                  <User className="h-full w-full text-white" />
                </div>
              )}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-white truncate">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors text-left flex items-center gap-1 mt-0.5"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn("anilist")}
            className="glossy-button flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white shadow-lg"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
