import { wedding } from "@/config/wedding";
import { Divider, Monogram } from "./Ornament";

export default function Footer() {
  const { bride, groom, hashtag } = wedding.couple;

  return (
    <footer className="relative overflow-hidden border-t border-line px-6 py-16 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line opacity-40" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <Monogram
          className="h-16 w-16"
          initials={`${groom.firstName[0]}&${bride.firstName[0]}`}
        />
        <p className="mt-6 font-script text-4xl gold-text sm:text-5xl">
           {groom.firstName} &amp; {bride.firstName}
        </p>
        <div className="mt-5">
          <Divider className="w-40" />
        </div>
        <p className="mt-6 text-[0.62rem] uppercase tracking-[0.3em] text-muted">
          {wedding.displayDate} · {wedding.venue.name}
        </p>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
          Thank you for being part of our story. Your love and blessings mean the world to us.
        </p>
        <p className="mt-6 text-[0.62rem] uppercase tracking-[0.3em] text-accent">{hashtag}</p>

        <a
          href="#home"
          className="mt-10 inline-flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-muted transition hover:text-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          Back to top
        </a>

        <p className="mt-8 text-[0.52rem] uppercase tracking-[0.24em] text-muted/70">
          {bride.firstName} &amp; {groom.firstName} · {new Date(wedding.dateISO).getFullYear()}
        </p>
      </div>
    </footer>
  );
}
