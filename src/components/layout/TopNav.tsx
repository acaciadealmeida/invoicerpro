"use client";

import { config } from "@/lib/config";

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

export function TopNav() {
  return (
    <header className="flex items-center justify-between bg-surface border-b border-border px-6 h-[70px] flex-shrink-0">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-72 h-9 pl-9 pr-3 rounded-md border border-border bg-page text-sm text-ink placeholder:text-ink-secondary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Bell with notification badge */}
        <button className="relative text-ink-secondary hover:text-ink cursor-pointer" aria-label="Notifications">
          <BellIcon />
          {config.notificationCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white text-[10px] font-bold">
              {config.notificationCount}
            </span>
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5">
          <span className="text-sm text-ink">{config.userName}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white text-xs font-semibold">
            {config.userInitial}
          </div>
        </div>
      </div>
    </header>
  );
}
