"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { scenarios } from "@/lib/scenarios";

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export function ScenarioLauncher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function start(path: string) {
    setOpen(false);
    router.push(path);
  }

  return (
    <>
      {/* Floating panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-80 rounded-xl bg-surface border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-page">
            <div>
              <p className="text-sm font-semibold text-ink">Demo Scenarios</p>
              <p className="text-xs text-ink-secondary mt-0.5">Choose a flow to walk through</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-ink-secondary hover:text-ink cursor-pointer"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Scenario list */}
          <ul className="p-2">
            {scenarios.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => start(s.startPath)}
                  className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-page transition-colors cursor-pointer group"
                >
                  <span className="mt-0.5 text-primary flex-shrink-0">
                    <PlayIcon />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink leading-snug">{s.title}</p>
                    <p className="text-xs text-ink-secondary mt-0.5 leading-snug">{s.description}</p>
                  </div>
                  <span className="mt-1 text-ink-secondary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <ArrowIcon />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-page text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        aria-label="Demo scenarios"
      >
        <PlayIcon />
        Scenarios
      </button>
    </>
  );
}
