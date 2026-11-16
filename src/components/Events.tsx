import { wedding } from "@/config/wedding";
import { CornerFlourish, Divider } from "./Ornament";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function EventIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <path d="M12 3c2.2 3.2 5 5.4 9 6.2v2.4c-4 1.2-6.8 3.4-9 6.6-2.2-3.2-5-5.4-9-6.6V9.2c4-.8 6.8-3 9-6.2Z" />
      <path d="M12 18.2V21M8.5 20h7" strokeLinecap="round" />
    </svg>
  );
}

function toCalendarStamp(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export default function Events() {
  const event = wedding.events[0];
  if (!event) return null;

  const { bride, groom } = wedding.couple;
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(`${bride.firstName} & ${groom.firstName} — Walima`)}` +
    `&dates=${toCalendarStamp(start)}/${toCalendarStamp(end)}` +
    `&details=${encodeURIComponent(
      `Join us for the Walima of ${bride.fullName} and ${groom.fullName}.`,
    )}` +
    `&location=${encodeURIComponent(`${event.venue}, ${event.address}`)}`;

  return (
    <section id="events" className="relative overflow-hidden px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="The celebration"
        title={event.name}
        subtitle={`Join us as we celebrate the ${event.name.toLowerCase()} of ${bride.firstName} and ${groom.firstName} with an evening of love, prayers and blessings.`}
      />

      <Reveal className="relative mx-auto mt-14 max-w-3xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="spin-slow absolute h-[30rem] w-[30rem] rounded-full border border-dashed border-accent/25 sm:h-[38rem] sm:w-[38rem]" />
          <div className="absolute h-[22rem] w-[22rem] rounded-full border border-line sm:h-[28rem] sm:w-[28rem]" />
          <div className="absolute h-[15rem] w-[15rem] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)] sm:h-[20rem] sm:w-[20rem]" />
        </div>

        <article className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/80 px-6 py-10 text-center shadow-[0_50px_100px_-50px_var(--shadow)] backdrop-blur-md sm:px-12 sm:py-14">
          <div aria-hidden="true" className="shimmer-line absolute inset-x-0 top-0 h-px" />
          <CornerFlourish className="pointer-events-none absolute left-4 top-4 h-14 w-14 opacity-40" />
          <CornerFlourish className="pointer-events-none absolute right-4 top-4 h-14 w-14 rotate-90 opacity-40" />
          <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 h-14 w-14 -rotate-90 opacity-40" />
          <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 h-14 w-14 rotate-180 opacity-40" />

          <div className="glow-pulse mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
            <EventIcon />
          </div>

          <p className="mt-6 text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-accent">
            You are invited
          </p>
          <h3 className="mt-3 font-script text-5xl leading-none gold-text sm:text-6xl">
            {event.name}
          </h3>
          <p className="mt-3 font-display text-lg font-light italic text-muted sm:text-xl">
            An evening of love, prayers &amp; blessings
          </p>

          <div className="mt-7 flex justify-center">
            <Divider className="w-44" />
          </div>

          <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 divide-x divide-line border-y border-line">
            <div className="px-4 py-5">
              <p className="text-[0.52rem] font-semibold uppercase tracking-[0.3em] text-muted">
                Date
              </p>
              <p className="mt-2 font-display text-xl font-light text-ink sm:text-2xl">
                {event.date}
              </p>
            </div>
            <div className="px-4 py-5">
              <p className="text-[0.52rem] font-semibold uppercase tracking-[0.3em] text-muted">
                Time
              </p>
              <p className="mt-2 font-display text-xl font-light text-ink sm:text-2xl">
                {event.time}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[0.52rem] font-semibold uppercase tracking-[0.3em] text-muted">
              Venue
            </p>
            <p className="mt-2 font-display text-2xl font-light text-ink sm:text-3xl">
              {event.venue}
            </p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.26em] text-muted">
              {event.address}
            </p>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-8 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-on-accent shadow-lg shadow-[var(--shadow)] transition hover:bg-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto"
            >
              View location
            </a>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-accent/60 px-8 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-ink transition hover:border-accent hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 11h18M12 15v4M10 17h4" />
              </svg>
              Add to calendar
            </a>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
