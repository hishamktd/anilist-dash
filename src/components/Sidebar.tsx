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
  { name: "Dropped", href: "/list/dropped", icon: LogOut }, // Using LogOut as a placeholder for Dropped
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex h-screen w-64 flex-col glass-card text-white border-r border-white/10">
      <div className="flex h-16 items-center justify-center border-b border-white/10 backdrop-blur-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AniDash
        </h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-300",
                pathname === item.href
                  ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg shadow-blue-500/50"
                  : "text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-md"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4 backdrop-blur-sm">
        {session ? (
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-10 w-10 rounded-full border-2 border-blue-500/50 shadow-lg"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-2 shadow-lg">
                <User className="h-full w-full text-white" />
              </div>
            )}
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-white">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="text-xs text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn("anilist")}
            className="glossy-button flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white"
          >
            Sign In with AniList
          </button>
        )}
      </div>
    </div>
  );
}
