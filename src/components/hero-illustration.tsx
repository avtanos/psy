// Акварельная сцена «арочное окно + интерьер» в духе референсов.
// Всё векторное, без внешних изображений (работает в статическом экспорте).

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 500" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="wall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F3ECDD" />
          <stop offset="1" stopColor="#EAE0CB" />
        </linearGradient>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#EAF1F2" />
          <stop offset="1" stopColor="#F4F1E6" />
        </linearGradient>
        <linearGradient id="mtnFar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#BFCBC9" />
          <stop offset="1" stopColor="#9DB0AE" />
        </linearGradient>
        <linearGradient id="mtnMid" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#9FB6A6" />
          <stop offset="1" stopColor="#7C9885" />
        </linearGradient>
        <linearGradient id="hill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8CAE8F" />
          <stop offset="1" stopColor="#5E8067" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#7FA083" />
          <stop offset="1" stopColor="#4F7458" />
        </linearGradient>
        <clipPath id="arch">
          <path d="M150 250 V120 a170 170 0 0 1 340 0 V250 a14 14 0 0 1 -14 14 H164 a14 14 0 0 1 -14 -14 Z" />
        </clipPath>
      </defs>

      {/* Стена */}
      <rect x="0" y="0" width="640" height="500" fill="url(#wall)" />

      {/* Арочное окно */}
      <path
        d="M150 250 V120 a170 170 0 0 1 340 0 V250 a14 14 0 0 1 -14 14 H164 a14 14 0 0 1 -14 -14 Z"
        fill="url(#sky)"
      />
      <g clipPath="url(#arch)">
        {/* Туманное небо */}
        <rect x="150" y="-40" width="340" height="200" fill="#EAF1F2" />
        <ellipse cx="280" cy="60" rx="150" ry="40" fill="#FFFFFF" opacity="0.55" />

        {/* Дальние горы со снегом */}
        <path d="M120 175 L200 70 L250 120 L320 40 L380 110 L450 55 L520 140 L520 200 L120 200 Z" fill="url(#mtnFar)" opacity="0.85" />
        <path d="M312 52 l8 -14 l8 14 l-4 7 l-8 -2 z" fill="#FFFFFF" opacity="0.9" />
        <path d="M444 66 l6 -12 l6 12 l-3 6 l-6 -2 z" fill="#FFFFFF" opacity="0.85" />

        {/* Средние горы */}
        <path d="M120 200 L190 130 L270 185 L350 120 L430 180 L510 130 L520 215 L120 215 Z" fill="url(#mtnMid)" opacity="0.9" />

        {/* Хвойные холмы */}
        <path d="M120 230 L200 165 L300 215 L400 160 L500 215 L520 200 L520 270 L120 270 Z" fill="url(#hill)" />
        {/* Ёлочки-силуэты */}
        {[170, 210, 250, 360, 410, 460].map((x, i) => (
          <path key={i} d={`M${x} 215 l8 16 l-16 0 z M${x} 224 l9 16 l-18 0 z`} fill="#4F7458" opacity="0.55" />
        ))}

        {/* Озеро */}
        <ellipse cx="320" cy="250" rx="150" ry="22" fill="#CFE0DB" opacity="0.7" />
        <ellipse cx="320" cy="250" rx="110" ry="12" fill="#E7F0EC" opacity="0.6" />
      </g>
      {/* Рама окна */}
      <path
        d="M150 250 V120 a170 170 0 0 1 340 0 V250 a14 14 0 0 1 -14 14 H164 a14 14 0 0 1 -14 -14 Z"
        fill="none"
        stroke="#D8CBB0"
        strokeWidth="6"
      />

      {/* Подоконник */}
      <rect x="138" y="262" width="364" height="12" rx="4" fill="#E7DAC0" />

      {/* Кресло */}
      <g>
        {/* Тень */}
        <ellipse cx="360" cy="452" rx="150" ry="16" fill="#7C6F50" opacity="0.12" />
        {/* Спинка */}
        <path d="M300 440 V340 q0 -42 46 -42 h60 q46 0 46 42 V440 Z" fill="#D9D0BC" />
        <ellipse cx="376" cy="330" rx="56" ry="24" fill="#C9C2AC" />
        {/* Подлокотники */}
        <rect x="288" y="350" width="26" height="92" rx="13" fill="#CFC6B0" />
        <rect x="438" y="350" width="26" height="92" rx="13" fill="#CFC6B0" />
        {/* Сиденье */}
        <rect x="306" y="396" width="140" height="46" rx="16" fill="#E2DAC6" />
        {/* Декоративная подушка */}
        <rect x="320" y="356" width="44" height="40" rx="12" fill="#7E9A7C" transform="rotate(-8 342 376)" />
        {/* Плед */}
        <path d="M430 360 q26 6 24 50 l-20 -4 q-2 -30 -16 -38 z" fill="#7E9A7C" opacity="0.85" />
        {/* Ножки */}
        <rect x="312" y="440" width="8" height="20" rx="2" fill="#9A8C6A" />
        <rect x="432" y="440" width="8" height="20" rx="2" fill="#9A8C6A" />
      </g>

      {/* Столик + кружка + книги */}
      <g>
        <rect x="196" y="376" width="78" height="10" rx="4" fill="#C9A87A" />
        <rect x="204" y="386" width="6" height="64" fill="#B5946A" />
        <rect x="260" y="386" width="6" height="64" fill="#B5946A" />
        {/* Книги */}
        <rect x="206" y="366" width="48" height="8" rx="2" fill="#5E8067" />
        <rect x="210" y="358" width="42" height="8" rx="2" fill="#C7B68C" />
        {/* Кружка */}
        <path d="M236 376 v-16 a13 4 0 0 0 26 0 v16 z" fill="#EFE7D4" />
        <ellipse cx="249" cy="360" rx="13" ry="3.5" fill="#DFD6BE" />
        <path d="M262 364 q11 0 11 7 q0 7 -11 7" fill="none" stroke="#EFE7D4" strokeWidth="3" />
      </g>

      {/* Большое растение справа */}
      <g>
        <path d="M520 452 L536 470 L578 470 L594 452 Z" fill="#CDA878" />
        <ellipse cx="557" cy="452" rx="40" ry="5" fill="#B5946A" />
        <path d="M545 452 q-10 -56 0 -120" stroke="#4F7458" strokeWidth="3" fill="none" />
        <path d="M556 452 q6 -64 -4 -140" stroke="#5E8067" strokeWidth="3" fill="none" />
        <path d="M566 452 q16 -54 6 -128" stroke="#4F7458" strokeWidth="3" fill="none" />
        <ellipse cx="540" cy="338" rx="17" ry="44" fill="url(#leaf)" transform="rotate(-24 540 338)" />
        <ellipse cx="554" cy="304" rx="15" ry="40" fill="#5E8067" transform="rotate(-4 554 304)" />
        <ellipse cx="572" cy="332" rx="14" ry="40" fill="url(#leaf)" transform="rotate(22 572 332)" />
        <ellipse cx="586" cy="368" rx="13" ry="32" fill="#7FA083" transform="rotate(36 586 368)" />
        <ellipse cx="528" cy="372" rx="12" ry="30" fill="#5E8067" transform="rotate(-40 528 372)" />
      </g>

      {/* Рамка-картина на стене слева */}
      <rect x="78" y="150" width="56" height="74" rx="4" fill="#FBF7EE" stroke="#D8CBB0" strokeWidth="3" />
      <path d="M86 210 q14 -28 26 -10 q6 9 14 4 v12 H86 Z" fill="#9FB6A6" opacity="0.7" />
      <circle cx="98" cy="170" r="6" fill="#D9C9A0" opacity="0.8" />
    </svg>
  );
}

export function BooksIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 500" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="wall2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F3ECDD" />
          <stop offset="1" stopColor="#EAE0CB" />
        </linearGradient>
        <linearGradient id="leaf2" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#7FA083" />
          <stop offset="1" stopColor="#4F7458" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="640" height="500" fill="url(#wall2)" />

      {/* Полка */}
      <rect x="80" y="350" width="480" height="14" rx="3" fill="#D8C39C" />
      <rect x="80" y="364" width="480" height="6" fill="#C2AC82" opacity="0.6" />

      {/* Картина-рамка */}
      <rect x="430" y="150" width="120" height="150" rx="6" fill="#FBF7EE" stroke="#D8CBB0" strokeWidth="5" />
      <path d="M448 280 q24 -54 46 -22 q12 16 24 6 v16 H448 Z" fill="#9FB6A6" opacity="0.7" />
      <path d="M470 286 q10 -40 24 -20" stroke="#5E8067" strokeWidth="3" fill="none" />

      {/* Стопка книг */}
      <rect x="150" y="300" width="150" height="20" rx="3" fill="#4F7458" />
      <rect x="158" y="305" width="134" height="2" fill="#FFFFFF" opacity="0.4" />
      <rect x="140" y="320" width="166" height="22" rx="3" fill="#D6C79E" />
      <rect x="148" y="325" width="150" height="2" fill="#B49A6A" />
      <rect x="160" y="342" width="146" height="8" rx="2" fill="#C9A87A" />
      {/* Стоящая книга */}
      <rect x="320" y="298" width="26" height="52" rx="2" fill="#5E8067" />
      <rect x="324" y="303" width="3" height="42" fill="#FFFFFF" opacity="0.5" />

      {/* Кружка */}
      <ellipse cx="400" cy="350" rx="30" ry="5" fill="#C2AC82" />
      <path d="M372 350 v-26 a28 5 0 0 0 56 0 v26 z" fill="#EFE7D4" />
      <ellipse cx="400" cy="324" rx="28" ry="5" fill="#DFD6BE" />
      <path d="M428 330 q13 0 13 9 q0 9 -13 9" fill="none" stroke="#EFE7D4" strokeWidth="4" />

      {/* Свеча */}
      <rect x="360" y="320" width="20" height="30" rx="3" fill="#E9DFC8" />
      <ellipse cx="370" cy="320" rx="10" ry="3" fill="#D8CCAE" />
      <path d="M370 316 q3 -6 0 -10 q-3 4 0 10Z" fill="#E8B26A" />

      {/* Растение в вазе */}
      <path d="M468 350 v-26 a18 4 0 0 0 36 0 v26 z" fill="#D8CFB8" />
      <path d="M480 324 q-8 -44 0 -78" stroke="#5E8067" strokeWidth="2.5" fill="none" />
      <path d="M490 324 q4 -50 -2 -86" stroke="#4F7458" strokeWidth="2.5" fill="none" />
      <ellipse cx="478" cy="256" rx="11" ry="26" fill="url(#leaf2)" transform="rotate(-20 478 256)" />
      <ellipse cx="490" cy="240" rx="10" ry="24" fill="#5E8067" />
      <ellipse cx="500" cy="262" rx="9" ry="22" fill="#7FA083" transform="rotate(22 500 262)" />
    </svg>
  );
}

export function CourseIllustration({ className = "" }: { className?: string }) {
  return <HeroIllustration className={className} />;
}
