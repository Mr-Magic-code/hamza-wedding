import { wedding } from "@/config/wedding";
import { CornerFlourish, Divider, Monogram } from "./Ornament";

const petals = [
  { left: "6%", size: 7, duration: 20, delay: 0 },
  { left: "16%", size: 4, duration: 26, delay: 4 },
  { left: "27%", size: 9, duration: 23, delay: 9 },
  { left: "38%", size: 5, duration: 28, delay: 2 },
  { left: "49%", size: 6, duration: 21, delay: 12 },
  { left: "61%", size: 4, duration: 25, delay: 6 },
  { left: "72%", size: 8, duration: 22, delay: 14 },
  { left: "83%", size: 5, duration: 27, delay: 3 },
  { left: "92%", size: 6, duration: 24, delay: 10 },
];

export default function Hero() {
  const { bride, groom, hashtag } = wedding.couple;

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line opacity-20" />
        {petals.map((petal, index) => (
          <span
            key={index}
            className="petal"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.6,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
            }}
          />
        ))}
      </div>

      <CornerFlourish className="pointer-events-none absolute left-3 top-3 h-20 w-20 opacity-50 sm:left-8 sm:top-8 sm:h-28 sm:w-28" />
      <CornerFlourish className="pointer-events-none absolute right-3 top-3 h-20 w-20 rotate-90 opacity-50 sm:right-8 sm:top-8 sm:h-28 sm:w-28" />
      <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 h-20 w-20 -rotate-90 opacity-50 sm:bottom-8 sm:left-8 sm:h-28 sm:w-28" />
      <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 h-20 w-20 rotate-180 opacity-50 sm:bottom-8 sm:right-8 sm:h-28 sm:w-28" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <Monogram className="h-20 w-20 sm:h-24 sm:w-24" initials={`${groom.firstName[0]}&${bride.firstName[0]}`} />

        <p className="mt-7 text-[0.66rem] font-medium uppercase tracking-[0.42em] text-accent sm:text-xs">
          {wedding.inviteLine}
        </p>

        <h1 className="mt-6 flex flex-col items-center leading-none">
          <span className="font-script text-[clamp(3.4rem,13vw,7.5rem)] leading-[0.95] gold-text">
            {groom.firstName}
          </span>
          <span className="my-1 font-display text-2xl font-light italic text-muted sm:my-2 sm:text-3xl">
            and
          </span>
          <span className="font-script text-[clamp(3.4rem,13vw,7.5rem)] leading-[0.95] gold-text">
            {bride.firstName}
          </span>
        </h1>

        <div className="mt-8 flex justify-center">
          <Divider className="w-48" />
        </div>

        <p className="mt-6 font-display text-xl font-light tracking-wide text-ink sm:text-2xl">
          {wedding.displayDate}
        </p>
        <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-muted sm:text-xs">
          {wedding.venue.name} · {wedding.venue.address}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#events"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-on-accent shadow-lg shadow-[var(--shadow)] transition hover:bg-accent-strong hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            The Walima
          </a>
          <a
            href="#guests"
            className="inline-flex h-12 items-center justify-center rounded-full border border-accent/60 px-8 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink transition hover:border-accent hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            RSVP
          </a>
        </div>

        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.32em] text-accent/80">
          {hashtag}
        </p>
      </div>

      <a
        href="#events"
        aria-label="Scroll to the celebration"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-accent"
      >
        <span className="text-[0.55rem] uppercase tracking-[0.35em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
