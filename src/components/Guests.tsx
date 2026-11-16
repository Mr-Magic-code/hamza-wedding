import { wedding } from "@/config/wedding";
import { CornerFlourish, Divider } from "./Ornament";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Guests() {
  const { guests } = wedding;
  const { bride, groom } = wedding.couple;
  const hasOddCount = guests.length % 2 === 1;

  return (
    <section id="guests" className="relative overflow-hidden px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="With love & gratitude"
        title="RSVP"
        subtitle="The hearts that make our happiness complete. We are honoured to celebrate this blessed day in your company."
      />

      <Reveal className="relative mx-auto mt-14 max-w-3xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute h-[26rem] w-[26rem] rounded-full border border-line opacity-60 sm:h-[32rem] sm:w-[32rem]" />
          <div className="spin-slow absolute h-[32rem] w-[32rem] rounded-full border border-dashed border-accent/20 sm:h-[40rem] sm:w-[40rem]" />
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/75 px-6 py-10 shadow-[0_50px_100px_-50px_var(--shadow)] backdrop-blur-md sm:px-12 sm:py-12">
          <CornerFlourish className="pointer-events-none absolute left-4 top-4 h-12 w-12 opacity-40" />
          <CornerFlourish className="pointer-events-none absolute right-4 top-4 h-12 w-12 rotate-90 opacity-40" />
          <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 h-12 w-12 -rotate-90 opacity-40" />
          <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 rotate-180 opacity-40" />

          <div className="mx-auto mb-8 flex items-center justify-center gap-3">
            <span className="hairline w-10" />
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <circle cx="9" cy="8" r="3" />
                <circle cx="15" cy="8" r="3" />
                <path d="M3.5 20c.6-3.4 2.7-5.5 5.5-5.5 1.2 0 2.2.3 3 1M20.5 20c-.6-3.4-2.7-5.5-5.5-5.5-1.2 0-2.2.3-3 1" />
              </svg>
            </span>
            <span className="hairline w-10" />
          </div>

          <ul className="relative grid gap-x-12 sm:grid-cols-2">
            {guests.map((name, index) => (
              <li
                key={name}
                className={
                  hasOddCount && index === guests.length - 1
                    ? "sm:col-span-2 sm:mx-auto sm:w-2/3"
                    : undefined
                }
              >
                <Reveal delay={index * 60}>
                  <div className="group flex items-baseline gap-4 border-b border-line/60 py-4">
                    <span className="w-7 shrink-0 font-display text-[0.68rem] font-medium tracking-[0.18em] text-accent/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-light text-ink transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {name}
                    </span>
                    <span className="ml-auto h-px w-6 shrink-0 bg-linear-to-r from-line to-transparent transition-all duration-500 group-hover:w-12 group-hover:from-accent" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center text-center">
            <Divider className="w-40" />
            <p className="mt-4 font-script text-2xl leading-none gold-text sm:text-3xl">
              With love and prayers
            </p>
            <p className="mt-2 text-[0.58rem] uppercase tracking-[0.3em] text-muted">
              {bride.firstName} &amp; {groom.firstName}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
