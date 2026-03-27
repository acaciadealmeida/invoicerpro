"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";
import { Logo } from "@/components/ui/Logo";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const LogOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export function TopNav() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialise dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  function toggleDarkMode() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("darkMode", String(next));
  }

  function handleLogOut() {
    setDropdownOpen(false);
    router.push("/login");
  }

  return (
    <header className="flex items-center w-full bg-surface border-b border-border flex-shrink-0 px-4 md:px-8 h-[55px] md:h-[70px]">
      {/* Mobile: logo — hidden on desktop */}
      <div className="md:hidden">
        <Logo width={114} />
      </div>

      {/* Desktop: search bar — hidden on mobile */}
      <div
        className="hidden md:flex items-center gap-2 border border-border bg-surface rounded-lg text-[12px] w-full max-w-[400px]"
        style={{ padding: "8px 12px", color: "var(--color-ink-placeholder)" }}
      >
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-[12px]"
          style={{ color: "var(--color-ink-placeholder)" }}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center ml-auto gap-1">
        {/* Bell with badge — always visible */}
        <div className="relative flex items-center justify-center w-10 h-10">
          <span style={{ color: "#d9dae8" }}>
            <BellIcon />
          </span>
          <span
            className="absolute top-1 right-1 flex items-center justify-center rounded-full text-white font-bold"
            style={{
              backgroundColor: "var(--color-danger)",
              fontSize: 8.4,
              lineHeight: "12px",
              minWidth: 14,
              height: 14,
              padding: "0 3px",
            }}
          >
            1+
          </span>
        </div>

        {/* Mobile icon buttons: search, settings, menu */}
        <button className="md:hidden flex items-center justify-center p-3 rounded-full" style={{ color: "#d9dae8" }}>
          <SearchIcon />
        </button>
        <button className="md:hidden flex items-center justify-center p-3 rounded-full" style={{ color: "#d9dae8" }}>
          <SettingsIcon />
        </button>
        <button className="md:hidden flex items-center justify-center p-3 rounded-full" style={{ color: "#d9dae8" }}>
          <MenuIcon />
        </button>

        {/* Desktop: divider + user dropdown — hidden on mobile */}
        <div className="hidden md:flex items-center">
          <div className="border-r border-border mx-4" style={{ height: 38 }} />

          {/* User area + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 hover:bg-fill transition-colors"
            >
              <span className="text-[12px]" style={{ color: "var(--color-ink-muted)" }}>
                {config.userName}
              </span>
              <div
                className="flex items-center justify-center rounded-full text-[14px] font-semibold flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "var(--color-fill)",
                  color: "var(--color-ink)",
                }}
              >
                {config.userInitial}
              </div>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-surface border border-border rounded-xl overflow-hidden z-50">
                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-ink hover:bg-fill transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: "var(--color-ink-secondary)" }}><MoonIcon /></span>
                    <span>Dark mode</span>
                  </div>
                  {/* Toggle switch */}
                  <div
                    className="relative rounded-full transition-colors flex-shrink-0"
                    style={{
                      width: 36,
                      height: 20,
                      backgroundColor: darkMode ? "var(--color-primary)" : "var(--color-border)",
                    }}
                  >
                    <div
                      className="absolute top-0.5 rounded-full bg-white transition-transform"
                      style={{
                        width: 16,
                        height: 16,
                        transform: darkMode ? "translateX(18px)" : "translateX(2px)",
                      }}
                    />
                  </div>
                </button>

                <div className="border-t border-border" />

                {/* Log out */}
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-fill transition-colors cursor-pointer"
                >
                  <span style={{ color: "var(--color-ink-secondary)" }}><LogOutIcon /></span>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
