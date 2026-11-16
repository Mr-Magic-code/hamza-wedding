type OrnamentProps = {
  className?: string;
};

export function Divider({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 24"
      className={`h-5 w-40 text-accent ${className}`}
      fill="none"
    >
      <path d="M2 12h70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M148 12h70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M110 3.5c2.6 3.3 5.5 5.7 9.5 6.9v3.2c-4 1.2-6.9 3.6-9.5 6.9-2.6-3.3-5.5-5.7-9.5-6.9v-3.2c4-1.2 6.9-3.6 9.5-6.9Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="110" cy="12" r="1.8" fill="currentColor" />
      <path d="M78 12c4-4 8-4 12 0-4 4-8 4-12 0Z" stroke="currentColor" strokeWidth="1" />
      <path d="M142 12c-4-4-8-4-12 0 4 4 8 4 12 0Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function CornerFlourish({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 140 140"
      className={`text-accent ${className}`}
      fill="none"
    >
      <path
        d="M4 4h44M4 4v44M16 16c34 0 62 10 78 30 8 10 14 22 18 36M16 16c0 34 10 62 30 78 10 8 22 14 36 18"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M4 60c22-8 34-20 40-42M60 4c-8 22-20 34-42 40"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <circle cx="34" cy="34" r="2" fill="currentColor" opacity="0.8" />
      <circle cx="52" cy="52" r="1.4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function Monogram({ className = "", initials = "A&A" }: OrnamentProps & { initials?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={`text-accent ${className}`}
      fill="none"
    >
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle
        cx="60"
        cy="60"
        r="45"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 5"
        opacity="0.5"
      />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, serif"
        fontSize="20"
        letterSpacing="1"
      >
        {initials}
      </text>
    </svg>
  );
}
