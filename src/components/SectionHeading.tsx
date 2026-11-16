import { Divider } from "./Ornament";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      <div className={centered ? "mt-5 flex justify-center" : "mt-5"}>
        <Divider />
      </div>
      {subtitle ? (
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>
      ) : null}
    </div>
  );
}
