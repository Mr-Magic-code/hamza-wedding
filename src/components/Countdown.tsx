"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import SectionHeading from "./SectionHeading";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function getTimeLeft(): TimeLeft {
  const distance = new Date(wedding.dateISO).getTime() - Date.now();
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / 1000 / 60) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    finished: false,
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const initial = window.setTimeout(() => setTime(getTimeLeft()), 0);
    const interval = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, []);

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
    { label: "Seconds", value: time?.seconds },
  ];

  return (
    <section id="countdown" className="relative px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Save the date"
        title={time?.finished ? "Today is the day" : "Counting the moments"}
        subtitle={
          time?.finished
            ? "Our forever begins today. Thank you for being part of it."
            : "Every second brings us a little closer to our forever."
        }
      />

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="relative overflow-hidden rounded-2xl border border-line bg-surface/70 px-3 py-6 text-center shadow-[0_24px_50px_-30px_var(--shadow)] backdrop-blur"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />
            <p className="font-display text-4xl font-light tabular-nums text-ink sm:text-5xl">
              {unit.value === undefined
                ? "--"
                : String(unit.value).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-muted">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
