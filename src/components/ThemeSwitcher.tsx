"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = [
  { id: "ivory-gold", name: "Ivory & Gold", bg: "#f7f1e6", accent: "#a97f3f" },
  { id: "maroon-gold", name: "Maroon & Gold", bg: "#240a0e", accent: "#d6b16c" },
  { id: "blush-rosegold", name: "Blush & Rose Gold", bg: "#fbf1ee", accent: "#bb7a68" },
  { id: "emerald-gold", name: "Emerald & Gold", bg: "#06201a", accent: "#d3b26b" },
  { id: "midnight-gold", name: "Midnight & Gold", bg: "#0a1120", accent: "#d9b877" },
];

function applyTheme(id: string) {
  document.documentElement.setAttribute("data-theme", id);
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("ivory-gold");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const current = document.documentElement.dataset.theme;
      if (current) setActive(current);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const choose = (id: string) => {
    applyTheme(id);
    try {
      localStorage.setItem("wc-theme", id);
    } catch {
      // Storage may be unavailable in private mode; the theme still applies.
    }
    setActive(id);
  };

  return (
    <div ref={panelRef} className="fixed right-5 top-5 z-40">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Choose a colour theme"
        className="flex h-11 items-center gap-2 rounded-full border border-line bg-surface/85 px-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_18px_40px_-20px_var(--shadow)] backdrop-blur transition hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
        Palette
      </button>

      {open ? (
        <div
          style={{ animation: "fadeUp 0.35s ease both" }}
          className="absolute right-0 top-14 w-64 rounded-2xl border border-line bg-surface/95 p-3 shadow-[0_30px_60px_-24px_var(--shadow)] backdrop-blur-xl"
        >
          <p className="px-2 pb-2 pt-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-muted">
            Colour palette
          </p>
          <ul className="space-y-1">
            {THEMES.map((theme) => (
              <li key={theme.id}>
                <button
                  type="button"
                  onClick={() => choose(theme.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    active === theme.id ? "bg-accent/10" : ""
                  }`}
                >
                  <span
                    className="h-7 w-7 shrink-0 rounded-full border border-line"
                    style={{
                      background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.accent} 100%)`,
                    }}
                  />
                  <span className="flex-1 text-xs font-medium text-ink">{theme.name}</span>
                  {active === theme.id ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
