type IconProps = { className?: string; size?: number };

const base = (size = 20) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const IconBrain = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M9.5 3a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4 16.5a2.5 2.5 0 0 1 .5-4.95A2.5 2.5 0 0 1 4 6.5a2.5 2.5 0 0 1 3.04-2.44A2.5 2.5 0 0 1 9.5 3Z" />
    <path d="M14.5 3a2.5 2.5 0 0 0-2.5 2.5v13a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 20 16.5a2.5 2.5 0 0 0-.5-4.95A2.5 2.5 0 0 0 20 6.5a2.5 2.5 0 0 0-3.04-2.44A2.5 2.5 0 0 0 14.5 3Z" />
  </svg>
);

export const IconHeart = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

export const IconCloud = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 14.7" />
    <path d="M4 14.7A4 4 0 0 0 6.5 19h11" />
  </svg>
);

export const IconUser = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const IconLeaf = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M11 20A7 7 0 0 1 4 13c0-4.97 4.03-9 9-9h7v7c0 4.97-4.03 9-9 9Z" />
    <path d="M4 20 18 6" />
  </svg>
);

export const IconUsers = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="9" cy="8" r="3.5" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 14.5a5 5 0 0 1 5.5 5.5" />
  </svg>
);

export const IconShield = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-3Z" />
  </svg>
);

export const IconBriefcase = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

export const IconCheck = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const IconCheckCircle = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </svg>
);

export const IconLock = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 1 1 8 0v4" />
  </svg>
);

export const IconMessageCircle = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M21 12a9 9 0 1 1-3.6-7.2L21 4l-1.2 4.4A9 9 0 0 1 21 12Z" />
  </svg>
);

export const IconHeartSmall = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20 8.5a4.5 4.5 0 0 0-8-2.8 4.5 4.5 0 0 0-8 2.8c0 5 8 11 8 11s8-6 8-11Z" />
  </svg>
);

export const IconCalendar = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const IconPlay = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m10 8 6 4-6 4V8Z" fill="currentColor" />
  </svg>
);

export const IconSearch = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const IconVideo = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="7" width="13" height="10" rx="2" />
    <path d="m16 11 5-3v8l-5-3Z" />
  </svg>
);

export const IconStar = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className} fill="currentColor" stroke="none">
    <path d="m12 3 2.7 6 6.6.5-5 4.4 1.5 6.5L12 17l-5.8 3.4 1.5-6.5-5-4.4 6.6-.5L12 3Z" />
  </svg>
);

export const IconChevronRight = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const IconChevronDown = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconArrowRight = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const IconArrowLeft = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M19 12H5M11 5l-7 7 7 7" />
  </svg>
);

export const IconHome = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);

export const IconDocument = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
    <path d="M14 3v6h6" />
  </svg>
);

export const IconPdf = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
    <path d="M14 3v6h6" />
  </svg>
);

export const IconHeadphones = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 14V12a8 8 0 1 1 16 0v2" />
    <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Z" />
    <path d="M20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
  </svg>
);

export const IconGrid = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconList = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <circle cx="4" cy="6" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="4" cy="18" r="1" fill="currentColor" />
  </svg>
);

export const IconClock = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconAward = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="9" r="6" />
    <path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
  </svg>
);

export const IconChartBar = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const IconBook = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 4h10a4 4 0 0 1 4 4v13H8a4 4 0 0 1-4-4V4Z" />
    <path d="M4 18a4 4 0 0 1 4-4h10" />
  </svg>
);

export const IconLifeBuoy = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="m4.9 4.9 4.6 4.6M14.5 14.5l4.6 4.6M14.5 9.5l4.6-4.6M4.9 19.1l4.6-4.6" />
  </svg>
);

export const IconClipboard = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);

export const IconNotebook = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </svg>
);

export const IconLungs = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v10" />
    <path d="M8 7c-2 1-4 4-4 9a2 2 0 0 0 4 0V7Z" />
    <path d="M16 7c2 1 4 4 4 9a2 2 0 0 1-4 0V7Z" />
  </svg>
);

export const IconSparkles = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8" />
  </svg>
);

export const IconPhone = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 6a1 1 0 0 1 1-2Z" />
  </svg>
);

export const IconAlert = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v5M12 18h.01" />
  </svg>
);

export const IconLifeRing = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="m5 5 4.2 4.2M14.8 14.8 19 19M19 5l-4.2 4.2M5 19l4.2-4.2" />
  </svg>
);

export const IconRefresh = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 4v5h-5" />
  </svg>
);

export const IconQuote = ({ className, size }: IconProps) => (
  <svg width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M7 7h4v4c0 3-1.6 5-4.4 5.6L6 15c1.4-.3 2-1 2-2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm9 0h4v4c0 3-1.6 5-4.4 5.6L15 15c1.4-.3 2-1 2-2h-1a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
  </svg>
);

// Логотип-листок внутри марки
export const LogoMark = ({ className = "", size = 40 }: { className?: string; size?: number }) => (
  <span
    className={"inline-flex items-center justify-center rounded-xl bg-brand-700 " + className}
    style={{ width: size, height: size }}
  >
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3c-1.2 4-4 6-4 10a4 4 0 0 0 8 0c0-4-2.8-6-4-10Z"
        fill="#E4E9D6"
      />
      <path d="M12 8v9" stroke="#234C3C" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 12l2-1.6M12 14l-2-1.6" stroke="#234C3C" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </span>
);
