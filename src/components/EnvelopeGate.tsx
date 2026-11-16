"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { Divider } from "./Ornament";

export default function EnvelopeGate() {
  const [opening, setOpening] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (gone) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gone]);

  useEffect(() => {
    buttonRef.current?.focus();
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  if (gone) return null;

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.dispatchEvent(new Event("wedding:open"));
    timers.current.push(window.setTimeout(() => setLeaving(true), 1600));
    timers.current.push(window.setTimeout(() => setGone(true), 2200));
  };

  const { bride, groom } = wedding.couple;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Open the wedding invitation"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6 py-10 transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(900px 600px at 50% 20%, var(--glow), transparent 65%), linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%)",
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line opacity-20" />

      <p
        className="relative z-10 text-[0.6rem] font-medium uppercase tracking-[0.45em] text-accent"
        style={{ animation: "fadeUp 0.9s ease both" }}
      >
        You are invited
      </p>

      <div
        className="relative z-10 mt-8 w-[min(86vw,430px)]"
        style={{ perspective: "1400px" }}
      >
        <div className="relative aspect-[1.42/1]">
          <div className="absolute inset-0 rounded-xl border border-line bg-surface-soft shadow-[0_40px_80px_-30px_var(--shadow)]" />

          <div
            className={`absolute inset-x-5 top-4 bottom-12 z-10 flex flex-col items-center justify-center rounded-md border border-line bg-surface px-5 text-center transition-all duration-[1100ms] ease-out ${
              opening ? "-translate-y-[36%] z-50 opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-[0.52rem] uppercase tracking-[0.34em] text-accent">
              {wedding.inviteLine}
            </p>
            <p className="mt-3 font-script text-3xl leading-tight gold-text sm:text-4xl">
              {groom.firstName} &amp; {bride.firstName}
            </p>
            <div className="mt-2 flex justify-center">
              <Divider className="w-28 opacity-80" />
            </div>
            <p className="mt-2 text-[0.55rem] uppercase tracking-[0.22em] text-muted">
              {wedding.displayDate}
            </p>
          </div>

          <div
            className={`absolute inset-x-0 top-0 z-30 h-[56%] origin-top transition-transform duration-[1100ms] ease-in-out ${
              opening ? "[transform:rotateX(-180deg)]" : ""
            }`}
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            <div
              className="h-full w-full border border-line"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(160deg, var(--surface) 0%, var(--surface-soft) 60%, var(--accent-soft) 140%)",
                borderBottomLeftRadius: "0.25rem",
                borderBottomRightRadius: "0.25rem",
              }}
            />
          </div>

          <div
            className="absolute inset-0 z-20 rounded-xl"
            style={{
              clipPath: "polygon(0 100%, 0 18%, 50% 52%, 100% 18%, 100% 100%)",
              background:
                "linear-gradient(200deg, var(--surface) 0%, var(--surface-soft) 55%, var(--accent-soft) 130%)",
              boxShadow: "inset 0 0 0 1px var(--line)",
            }}
          />

          <div
            className={`pointer-events-none absolute inset-x-0 bottom-[12%] z-[25] text-center transition-opacity duration-500 ${
              opening ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-[0.48rem] font-medium uppercase tracking-[0.34em] text-accent">
              The wedding of
            </p>
            <p className="mt-1 font-script text-2xl leading-none gold-text">
              {bride.firstName} &amp; {groom.firstName}
            </p>
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={handleOpen}
            aria-label="Open the wedding invitation"
            className={`absolute left-1/2 top-[46%] z-40 flex h-[4.6rem] w-[4.6rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50 bg-linear-to-br from-accent-strong via-accent to-accent-strong text-on-accent transition-all duration-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
              opening ? "scale-0 opacity-0" : "opacity-100"
            }`}
            style={{ animation: opening ? "none" : "pulseSeal 2.6s ease-in-out infinite" }}
          >
            <span className="flex h-[3.4rem] w-[3.4rem] flex-col items-center justify-center rounded-full border border-surface/30">
              <span className="font-display text-base font-medium tracking-wide">
                {bride.firstName[0]}
                <span className="mx-0.5 text-xs">&amp;</span>
                {groom.firstName[0]}
              </span>
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="relative z-10 mt-10 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-surface/60 px-7 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-ink backdrop-blur transition hover:border-accent hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="m3 9 9 6 9-6" />
        </svg>
        {opening ? "Opening…" : "Open Invitation"}
      </button>

      <p className="relative z-10 mt-6 text-[0.55rem] uppercase tracking-[0.3em] text-muted">
        {wedding.music.title} plays after opening
      </p>
    </div>
  );
}
