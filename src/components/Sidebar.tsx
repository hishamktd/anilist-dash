"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, Clock, Settings, LogOut, User } from "lucide-react";
import { clsx } from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Watching", href: "/list/watching", icon: Clock },
  { name: "Completed", href: "/list/completed", icon: List },
  { name: "Dropped", href: "/list/dropped", icon: LogOut }, // Using LogOut as a placeholder for Dropped
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">AniDash</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors",
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        {session ? (
          <div className="flex items-center space-x-3">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <User className="h-10 w-10 rounded-full bg-gray-700 p-2" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="text-xs text-gray-400 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn("anilist")}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sign In with AniList
          </button>
        )}
      </div>
    </div>
  );
}
