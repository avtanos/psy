export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 520" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FAF4E8" />
          <stop offset="60%" stopColor="#F1F0E2" />
          <stop offset="100%" stopColor="#E8E5D1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#A8B8B4" />
          <stop offset="1" stopColor="#7A8E89" />
        </linearGradient>
        <linearGradient id="m2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#849C95" />
          <stop offset="1" stopColor="#5C7470" />
        </linearGradient>
        <linearGradient id="m3" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#B5C6B9" />
          <stop offset="1" stopColor="#8DA792" />
        </linearGradient>
        <linearGradient id="chair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8FA68E" />
          <stop offset="1" stopColor="#6B8268" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#7BA68A" />
          <stop offset="1" stopColor="#4F7A5E" />
        </linearGradient>
        <clipPath id="circle">
          <circle cx="300" cy="240" r="240" />
        </clipPath>
      </defs>

      {/* Soft circular background */}
      <circle cx="300" cy="240" r="240" fill="url(#bg)" />

      <g clipPath="url(#circle)">
        {/* Sky shimmer */}
        <ellipse cx="200" cy="120" rx="180" ry="50" fill="#FFFFFF" opacity="0.4" />

        {/* Far mountain */}
        <path d="M-20 280 L70 180 L130 230 L220 130 L290 200 L360 140 L450 230 L530 170 L620 270 L620 320 L-20 320 Z" fill="url(#m1)" opacity="0.7" />
        {/* Mid mountain */}
        <path d="M-20 320 L60 240 L150 290 L240 200 L320 260 L420 200 L520 280 L620 240 L620 360 L-20 360 Z" fill="url(#m2)" opacity="0.8" />
        {/* Near hills */}
        <path d="M-20 380 L80 320 L200 360 L320 300 L450 370 L620 320 L620 480 L-20 480 Z" fill="url(#m3)" />

        {/* Snow caps */}
        <path d="M210 145 l10 -15 l10 15 l-5 8 l-10 -3 z" fill="#FFFFFF" opacity="0.9" />
        <path d="M350 155 l8 -15 l8 15 l-4 7 l-8 -2 z" fill="#FFFFFF" opacity="0.9" />

        {/* Ground line / shadow */}
        <ellipse cx="350" cy="455" rx="200" ry="14" fill="#1F4030" opacity="0.08" />

        {/* Side table */}
        <rect x="200" y="385" width="80" height="48" rx="4" fill="#D8C3A5" />
        <rect x="208" y="433" width="6" height="32" fill="#B59E7E" />
        <rect x="266" y="433" width="6" height="32" fill="#B59E7E" />

        {/* Mug */}
        <ellipse cx="240" cy="378" rx="15" ry="4" fill="#E8E3D8" />
        <path d="M225 378 v-22 a15 4 0 0 0 30 0 v22 z" fill="#E8E3D8" />
        <path d="M255 365 q12 0 12 8 q0 7 -12 7" fill="none" stroke="#E8E3D8" strokeWidth="3" />

        {/* Small plant on table */}
        <ellipse cx="223" cy="378" rx="8" ry="2.5" fill="#9B7F5C" />
        <path d="M220 376 q-6 -16 -2 -28" stroke="#7BA68A" strokeWidth="2.5" fill="none" />
        <path d="M223 376 q0 -18 4 -30" stroke="#578E6B" strokeWidth="2.5" fill="none" />
        <path d="M226 376 q6 -14 4 -26" stroke="#7BA68A" strokeWidth="2.5" fill="none" />
        <ellipse cx="218" cy="350" rx="5" ry="8" fill="#7BA68A" transform="rotate(-20 218 350)" />
        <ellipse cx="227" cy="345" rx="5" ry="9" fill="#578E6B" />
        <ellipse cx="232" cy="352" rx="4" ry="7" fill="#7BA68A" transform="rotate(20 232 352)" />

        {/* Armchair */}
        <path d="M310 470 L310 400 Q310 360 350 360 L420 360 Q460 360 460 400 L460 470 Z" fill="url(#chair)" />
        {/* Back cushion */}
        <ellipse cx="385" cy="385" rx="50" ry="22" fill="#A4BAA1" />
        {/* Seat cushion */}
        <rect x="320" y="420" width="130" height="40" rx="14" fill="#B8CDB1" />
        {/* Throw pillow */}
        <rect x="335" y="395" width="38" height="36" rx="10" fill="#EFE6D4" transform="rotate(-8 354 413)" />
        {/* Arms */}
        <rect x="300" y="400" width="20" height="70" rx="10" fill="#6B8268" />
        <rect x="450" y="400" width="20" height="70" rx="10" fill="#6B8268" />
        {/* Legs */}
        <rect x="312" y="468" width="8" height="20" fill="#3D5040" />
        <rect x="450" y="468" width="8" height="20" fill="#3D5040" />

        {/* Big plant - pot */}
        <path d="M490 450 L510 470 L555 470 L575 450 Z" fill="#CFA67E" />
        <ellipse cx="532" cy="450" rx="42" ry="5" fill="#B58D63" />
        {/* Stems */}
        <path d="M520 450 q-10 -50 0 -110" stroke="#4F7A5E" strokeWidth="3" fill="none" />
        <path d="M530 450 q5 -60 -5 -130" stroke="#578E6B" strokeWidth="3" fill="none" />
        <path d="M540 450 q15 -50 5 -120" stroke="#4F7A5E" strokeWidth="3" fill="none" />
        <path d="M548 450 q20 -40 25 -80" stroke="#7BA68A" strokeWidth="3" fill="none" />
        {/* Leaves */}
        <ellipse cx="515" cy="340" rx="18" ry="42" fill="url(#leaf)" transform="rotate(-25 515 340)" />
        <ellipse cx="528" cy="310" rx="16" ry="38" fill="#578E6B" transform="rotate(-5 528 310)" />
        <ellipse cx="545" cy="335" rx="15" ry="40" fill="url(#leaf)" transform="rotate(20 545 335)" />
        <ellipse cx="560" cy="370" rx="14" ry="34" fill="#7BA68A" transform="rotate(35 560 370)" />
        <ellipse cx="500" cy="380" rx="12" ry="30" fill="#578E6B" transform="rotate(-40 500 380)" />
        <ellipse cx="572" cy="310" rx="11" ry="28" fill="#7BA68A" transform="rotate(45 572 310)" />
      </g>

      {/* Soft fronds in foreground */}
      <ellipse cx="100" cy="440" rx="80" ry="20" fill="#7BA68A" opacity="0.3" />
      <ellipse cx="80" cy="460" rx="60" ry="14" fill="#578E6B" opacity="0.3" />
    </svg>
  );
}

export function BooksIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 520" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FAF4E8" />
          <stop offset="60%" stopColor="#F1F0E2" />
          <stop offset="100%" stopColor="#E8E5D1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="b1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#A8B8B4" />
          <stop offset="1" stopColor="#7A8E89" />
        </linearGradient>
        <linearGradient id="b2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#849C95" />
          <stop offset="1" stopColor="#5C7470" />
        </linearGradient>
        <clipPath id="circle2">
          <circle cx="300" cy="240" r="240" />
        </clipPath>
      </defs>

      <circle cx="300" cy="240" r="240" fill="url(#bg2)" />

      <g clipPath="url(#circle2)">
        <path d="M-20 280 L80 180 L160 230 L260 140 L340 210 L440 150 L540 240 L620 200 L620 320 L-20 320 Z" fill="url(#b1)" opacity="0.7" />
        <path d="M-20 320 L60 250 L160 300 L260 230 L360 280 L460 220 L560 290 L620 260 L620 380 L-20 380 Z" fill="url(#b2)" opacity="0.8" />

        {/* Surface */}
        <rect x="-20" y="395" width="640" height="120" fill="#EBE2CB" />
        <line x1="-20" y1="395" x2="620" y2="395" stroke="#C9BB9C" strokeWidth="2" />

        {/* Stack of books */}
        <rect x="220" y="280" width="180" height="34" rx="3" fill="#4F7A5E" />
        <rect x="225" y="285" width="170" height="2" fill="#FFFFFF" opacity="0.4" />
        <rect x="210" y="314" width="190" height="38" rx="3" fill="#D8C9A5" />
        <rect x="215" y="319" width="180" height="2" fill="#A88A60" />
        <rect x="230" y="352" width="170" height="32" rx="3" fill="#7BA68A" />
        <rect x="235" y="357" width="160" height="2" fill="#FFFFFF" opacity="0.4" />
        <rect x="200" y="384" width="200" height="12" rx="2" fill="#C9A77A" />

        {/* Single standing book */}
        <rect x="420" y="300" width="30" height="95" rx="2" fill="#5C7470" />
        <rect x="425" y="305" width="3" height="80" fill="#FFFFFF" opacity="0.5" />

        {/* Cup */}
        <ellipse cx="490" cy="395" rx="34" ry="6" fill="#C9BB9C" />
        <path d="M460 395 v-28 a30 6 0 0 0 60 0 v28 z" fill="#EFE6D4" />
        <ellipse cx="490" cy="368" rx="28" ry="5" fill="#D6CCB8" />
        <path d="M520 376 q14 0 14 9 q0 9 -14 9" stroke="#EFE6D4" strokeWidth="4" fill="none" />

        {/* Plant in pot */}
        <path d="M130 395 L142 415 L178 415 L190 395 Z" fill="#CFA67E" />
        <path d="M150 395 q-8 -40 0 -80" stroke="#578E6B" strokeWidth="2.5" fill="none" />
        <path d="M160 395 q4 -50 -2 -90" stroke="#4F7A5E" strokeWidth="2.5" fill="none" />
        <path d="M168 395 q12 -40 6 -75" stroke="#7BA68A" strokeWidth="2.5" fill="none" />
        <ellipse cx="148" cy="335" rx="10" ry="22" fill="#7BA68A" transform="rotate(-20 148 335)" />
        <ellipse cx="158" cy="315" rx="9" ry="22" fill="#578E6B" />
        <ellipse cx="172" cy="335" rx="9" ry="22" fill="#7BA68A" transform="rotate(20 172 335)" />
      </g>
    </svg>
  );
}

export function CourseIllustration({ className = "" }: { className?: string }) {
  return <HeroIllustration className={className} />;
}
