import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { addDays, addHours, subDays, subHours, subMonths } from "date-fns";

const prisma = new PrismaClient();

const PSYCH_PASS = "psych12345";
const CLIENT_PASS = "client12345";
const ADMIN_PASS = "admin12345";

async function main() {
  console.log("Seeding…");

  // ---------- Полная очистка (idempotent) ----------
  // Порядок важен из-за внешних ключей.
  await prisma.adminLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.psychologistNote.deleteMany();
  await prisma.session.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.sessionPackage.deleteMany();
  await prisma.courseLessonProgress.deleteMany();
  await prisma.courseLesson.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.courseEnrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.materialPurchase.deleteMany();
  await prisma.material.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.walletOperation.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.psychSubscription.deleteMany();
  await prisma.subscriptionPlan.deleteMany();
  await prisma.promocode.deleteMany();
  await prisma.psychologistDocument.deleteMany();
  await prisma.availabilityRule.deleteMany();
  await prisma.timeOff.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.consent.deleteMany();
  await prisma.verificationCode.deleteMany();
  await prisma.authSession.deleteMany();
  await prisma.psychologistProfile.deleteMany();
  await prisma.clientProfile.deleteMany();
  await prisma.systemSetting.deleteMany();
  await prisma.user.deleteMany();

  const adminHash = await bcrypt.hash(ADMIN_PASS, 10);
  const clientHash = await bcrypt.hash(CLIENT_PASS, 10);
  const psychHash = await bcrypt.hash(PSYCH_PASS, 10);

  // ---------- Системные настройки ----------
  await prisma.systemSetting.createMany({
    data: [
      { key: "commission_percent", value: "20" },
      { key: "no_show_hold_percent", value: "50" },
      { key: "platform_name", value: "PsychKG" },
    ],
  });

  // ---------- Админ и контент-менеджер ----------
  const admin = await prisma.user.create({
    data: {
      email: "admin@psych.kg",
      passwordHash: adminHash,
      role: "ADMIN",
      displayName: "Алина Сатарова",
      status: "ACTIVE",
    },
  });
  const contentManager = await prisma.user.create({
    data: {
      email: "content@psych.kg",
      passwordHash: adminHash,
      role: "CONTENT_MANAGER",
      displayName: "Нурлан Темиров",
      status: "ACTIVE",
    },
  });

  // ---------- Клиенты ----------
  const clientsData = [
    { email: "client@psych.kg", name: "Айдар Жумабеков", pseudonym: "Айдар" },
    { email: "client2@psych.kg", name: "Гульнара Маматова", pseudonym: "Гульнара" },
    { email: "client3@psych.kg", name: "Эльдар Турсунов", pseudonym: "Эльдар" },
    { email: "client4@psych.kg", name: "Бегимай Асанова", pseudonym: "Бегимай" },
    { email: "client5@psych.kg", name: "Темир Бекболотов", pseudonym: "Темир" },
  ];
  const clients = [] as { id: string; displayName: string }[];
  for (const c of clientsData) {
    const u = await prisma.user.create({
      data: {
        email: c.email,
        passwordHash: clientHash,
        role: "CLIENT",
        displayName: c.name,
        status: "ACTIVE",
        client: {
          create: {
            pseudonym: c.pseudonym,
            birthYear: 1990 + Math.floor(Math.random() * 15),
          },
        },
        consents: {
          create: [
            { type: "terms", version: "1.0" },
            { type: "privacy", version: "1.0" },
            { type: "data_processing", version: "1.0" },
          ],
        },
      },
    });
    clients.push({ id: u.id, displayName: u.displayName });
  }

  // ---------- Психологи ----------
  const psychSeeds = [
    {
      email: "aigerim@psych.kg",
      name: "Айгерим Орозова",
      bio: "Помогаю с тревогой, эмоциональным выгоранием и поиском смысла. Работаю в КПТ с элементами схема-терапии. 7 лет частной практики, супервизор.",
      approach: "Опираюсь на исследовательский подход. Первые 2–3 сессии — формирование запроса, далее структурированная работа с домашними заданиями.",
      price: 200000,
      topics: ["anxiety", "career", "self-esteem"],
      methods: ["cbt", "schema-therapy"],
      languages: ["ru", "ky"],
      experienceYears: 7,
      sessionMinutes: 50,
      source: "IN_HOUSE",
    },
    {
      email: "bakyt@psych.kg",
      name: "Бакыт Алиев",
      bio: "Семейный психолог. Конфликты в отношениях, родительство, развод. Гештальт-подход, парные и индивидуальные сессии.",
      approach: "Безопасное пространство для двоих. Парные сессии 75 минут, индивидуальные 50 минут.",
      price: 250000,
      topics: ["relationships", "family"],
      methods: ["gestalt"],
      languages: ["ru"],
      experienceYears: 10,
      sessionMinutes: 60,
      source: "IN_HOUSE",
    },
    {
      email: "elnura@psych.kg",
      name: "Эльнура Касымова",
      bio: "Травма, ПТСР, потеря. Сертифицированный EMDR-терапевт. Опыт работы с беженцами и людьми после ДТП.",
      approach: "Работа с травматической памятью методом EMDR, постепенная стабилизация, ресурсные техники.",
      price: 220000,
      topics: ["trauma", "grief"],
      methods: ["emdr", "humanistic"],
      languages: ["ru", "en"],
      experienceYears: 5,
      sessionMinutes: 60,
      source: "IN_HOUSE",
    },
    {
      email: "azamat@psych.kg",
      name: "Азамат Чыныбаев",
      bio: "Психоаналитик. Работаю с глубинными запросами: повторяющиеся сценарии, психосоматика, экзистенциальные вопросы.",
      approach: "Психоаналитическая терапия, регулярность 1-2 сессии в неделю. Долгосрочная работа.",
      price: 300000,
      topics: ["self-esteem", "depression"],
      methods: ["psychoanalysis"],
      languages: ["ru"],
      experienceYears: 15,
      sessionMinutes: 50,
      source: "EXTERNAL",
    },
    {
      email: "saltanat@psych.kg",
      name: "Салтанат Беккулова",
      bio: "Детский и подростковый психолог. Тревога у подростков, школьные трудности, самоповреждение.",
      approach: "Работа через арт-терапию, метафорические карты, разговорные техники. Включаю родителей в процесс.",
      price: 180000,
      topics: ["anxiety", "family"],
      methods: ["humanistic", "cbt"],
      languages: ["ru", "ky"],
      experienceYears: 6,
      sessionMinutes: 50,
      source: "IN_HOUSE",
    },
    {
      email: "ruslan@psych.kg",
      name: "Руслан Жунушев",
      bio: "Зависимости (алкоголь, азартные игры), созависимость. Подход ACT и КПТ.",
      approach: "Этапная работа: мотивация → стратегии → профилактика срыва. Без оценок и осуждения.",
      price: 200000,
      topics: ["addiction", "self-esteem"],
      methods: ["act", "cbt"],
      languages: ["ru"],
      experienceYears: 8,
      sessionMinutes: 60,
      source: "EXTERNAL",
    },
    {
      email: "nurzat@psych.kg",
      name: "Нурзат Эшимова",
      bio: "Работаю с выгоранием, стрессом руководителей, синдромом самозванца. Опыт с IT и медициной.",
      approach: "Краткосрочная коучинговая терапия + КПТ. Фокус на конкретных целях и измеримых результатах.",
      price: 280000,
      topics: ["career", "self-esteem", "anxiety"],
      methods: ["cbt", "act"],
      languages: ["ru", "en"],
      experienceYears: 9,
      sessionMinutes: 50,
      source: "IN_HOUSE",
    },
    {
      email: "almaz@psych.kg",
      name: "Алмаз Касиев",
      bio: "Депрессия, апатия, потеря смысла. Логотерапия + гуманистический подход.",
      approach: "Поиск опор и смыслов. Работаю в неспешном темпе, диалог глубже техник.",
      price: 230000,
      topics: ["depression", "grief"],
      methods: ["humanistic"],
      languages: ["ru", "ky"],
      experienceYears: 11,
      sessionMinutes: 60,
      source: "EXTERNAL",
    },
    {
      email: "diana@psych.kg",
      name: "Диана Усманова",
      bio: "Сексология, отношения, женское здоровье. Работаю с парами и индивидуально.",
      approach: "Деликатный подход, конфиденциальность, развенчание мифов. КПТ + системная семейная.",
      price: 270000,
      topics: ["relationships", "family"],
      methods: ["cbt", "humanistic"],
      languages: ["ru", "en"],
      experienceYears: 7,
      sessionMinutes: 60,
      source: "EXTERNAL",
    },
    {
      email: "marat@psych.kg",
      name: "Марат Дуйшеев",
      bio: "Тренер психологической устойчивости. Работаю с предпринимателями и спортсменами.",
      approach: "Фокус на состоянии, восстановлении, концентрации. ACT + майндфулнес-практики.",
      price: 350000,
      topics: ["career", "anxiety"],
      methods: ["act", "humanistic"],
      languages: ["ru", "en"],
      experienceYears: 12,
      sessionMinutes: 50,
      source: "EXTERNAL",
    },
    // Один «pending» — для админа в очередь верификации
    {
      email: "pending@psych.kg",
      name: "Жылдыз Кадыркулова",
      bio: "Гештальт-терапевт, 4 года опыта. Тревога, самооценка, работа с эмоциями.",
      approach: "Феноменологический подход, контакт здесь-и-сейчас.",
      price: 180000,
      topics: ["anxiety", "self-esteem"],
      methods: ["gestalt"],
      languages: ["ru"],
      experienceYears: 4,
      sessionMinutes: 50,
      source: "EXTERNAL",
      pending: true,
    },
  ];

  const psychologists: {
    id: string;
    userId: string;
    name: string;
    price: number;
    sessionMinutes: number;
  }[] = [];

  for (const seed of psychSeeds) {
    const u = await prisma.user.create({
      data: {
        email: seed.email,
        passwordHash: psychHash,
        role: "PSYCHOLOGIST",
        displayName: seed.name,
        status: seed.pending ? "PENDING_VERIFICATION" : "ACTIVE",
        consents: {
          create: [
            { type: "terms", version: "1.0" },
            { type: "privacy", version: "1.0" },
            { type: "data_processing", version: "1.0" },
          ],
        },
      },
    });
    const profile = await prisma.psychologistProfile.create({
      data: {
        userId: u.id,
        source: seed.source,
        bio: seed.bio,
        approach: seed.approach,
        pricePerSession: seed.price,
        topics: JSON.stringify(seed.topics),
        methods: JSON.stringify(seed.methods),
        languages: JSON.stringify(seed.languages),
        format: JSON.stringify(["video"]),
        experienceYears: seed.experienceYears,
        sessionMinutes: seed.sessionMinutes,
        verification: seed.pending ? "PENDING" : "VERIFIED",
        verifiedBadge: !seed.pending,
        wallet: { create: {} },
        documents: seed.pending
          ? {
              create: [
                {
                  kind: "diploma",
                  fileUrl: "https://example.com/docs/diploma.pdf",
                  comment: "Диплом КНУ, психология, 2019",
                },
                {
                  kind: "certificate",
                  fileUrl: "https://example.com/docs/cert.pdf",
                  comment: "Сертификат гештальт-института, 2022",
                },
              ],
            }
          : undefined,
      },
    });
    // Расписание: пн-пт 10:00-18:00 (для всех, кроме pending)
    if (!seed.pending) {
      for (let wd = 1; wd <= 5; wd++) {
        await prisma.availabilityRule.create({
          data: {
            psychologistId: profile.id,
            weekday: wd,
            startMinutes: 10 * 60,
            endMinutes: 18 * 60,
          },
        });
      }
      // Несколько случайных выходных в горизонте 14 дней
      if (Math.random() < 0.5) {
        await prisma.timeOff.create({
          data: {
            psychologistId: profile.id,
            startAt: addDays(new Date(), 5),
            endAt: addDays(new Date(), 6),
            reason: "Личный выходной",
          },
        });
      }
    }
    psychologists.push({
      id: profile.id,
      userId: u.id,
      name: u.displayName,
      price: seed.price,
      sessionMinutes: seed.sessionMinutes,
    });
  }

  // ---------- История бронирований и платежей ----------
  // Прошедшие COMPLETED + отзывы; будущие CONFIRMED; одно PENDING_PAYMENT для тест-клиента
  const verifiedPsychs = psychologists.filter((p) => p.id);
  const testClient = clients[0];

  const reviewTexts = [
    "Айгерим помогла мне разложить тревогу на части и научила техникам, которые работают. Через 6 сессий стало значительно легче.",
    "Очень внимательный специалист, чувствую себя в безопасности. Рекомендую.",
    "Помогли разобраться в отношениях. Через 2 месяца мы с партнёром стали понимать друг друга.",
    "Хороший психолог, ставит точные вопросы. Чуть-чуть не хватает структуры между сессиями.",
    "Спасибо за поддержку в самый сложный период. Я снова могу спать.",
    "Профессионально, чутко. Чувствуется опыт.",
    "Подход не подошёл лично мне, но видно, что специалист сильный.",
    "Десять сессий — и моё отношение к работе кардинально изменилось.",
  ];

  let reviewIdx = 0;
  for (const p of verifiedPsychs.slice(0, 8)) {
    const reviewsCount = 2 + Math.floor(Math.random() * 5); // 2-6 отзывов
    let sumRatings = 0;
    for (let r = 0; r < reviewsCount; r++) {
      const client = clients[(r + reviewIdx) % clients.length];
      const startAt = subDays(subHours(new Date(), Math.floor(Math.random() * 24)), 5 + r * 3);
      const endAt = addHours(startAt, 1);
      const rating = 4 + Math.floor(Math.random() * 2); // 4 или 5
      sumRatings += rating;

      const booking = await prisma.booking.create({
        data: {
          clientId: client.id,
          psychologistId: p.id,
          startAt,
          endAt,
          format: "VIDEO",
          status: "COMPLETED",
          pricePerSession: p.price,
          commissionPercent: 20,
        },
      });
      await prisma.session.create({
        data: {
          bookingId: booking.id,
          roomName: `bk-${booking.id.slice(0, 12)}`,
          startedAt: startAt,
          endedAt: endAt,
        },
      });
      const commission = Math.round((p.price * 20) / 100);
      const split = p.price - commission;
      await prisma.payment.create({
        data: {
          userId: client.id,
          purpose: "SESSION",
          bookingId: booking.id,
          amount: p.price,
          method: "CARD",
          status: "PAID",
          commissionAmount: commission,
          splitToPsychologist: split,
          providerRef: `dev-${booking.id}`,
          paidAt: startAt,
        },
      });
      // Зачисляем психологу
      const wallet = await prisma.wallet.findUnique({ where: { psychologistId: p.id } });
      if (wallet) {
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: { balance: { increment: split } },
        });
        await prisma.walletOperation.create({
          data: {
            walletId: wallet.id,
            kind: "CREDIT",
            amount: split,
            reason: `Завершённая сессия`,
            refId: booking.id,
          },
        });
      }

      await prisma.review.create({
        data: {
          bookingId: booking.id,
          psychologistId: p.id,
          authorId: client.id,
          rating,
          text: reviewTexts[reviewIdx % reviewTexts.length],
          isModerated: true,
          isHidden: false,
        },
      });
      reviewIdx++;
    }
    await prisma.psychologistProfile.update({
      where: { id: p.id },
      data: {
        reviewsCount,
        rating: sumRatings / reviewsCount,
      },
    });
  }

  // ---------- Будущие бронирования: тест-клиент имеет несколько ----------
  const upcoming = [
    { psych: verifiedPsychs[0], inHours: 26, status: "CONFIRMED" as const },
    { psych: verifiedPsychs[2], inHours: 50, status: "CONFIRMED" as const },
    { psych: verifiedPsychs[3], inHours: 80, status: "PENDING_PAYMENT" as const },
  ];
  for (const u of upcoming) {
    const startAt = addHours(new Date(), u.inHours);
    const endAt = addHours(startAt, 1);
    const b = await prisma.booking.create({
      data: {
        clientId: testClient.id,
        psychologistId: u.psych.id,
        startAt,
        endAt,
        format: "VIDEO",
        status: u.status,
        pricePerSession: u.psych.price,
        commissionPercent: 20,
      },
    });
    if (u.status === "CONFIRMED") {
      const commission = Math.round((u.psych.price * 20) / 100);
      await prisma.payment.create({
        data: {
          userId: testClient.id,
          purpose: "SESSION",
          bookingId: b.id,
          amount: u.psych.price,
          status: "PAID",
          method: "CARD",
          commissionAmount: commission,
          splitToPsychologist: u.psych.price - commission,
          providerRef: `dev-${b.id}`,
          paidAt: new Date(),
        },
      });
    }
  }

  // Один pending запрос на выплату (psychologist 0) — увидит админ
  {
    const psych = verifiedPsychs[0];
    const wallet = await prisma.wallet.findUnique({ where: { psychologistId: psych.id } });
    if (wallet && wallet.balance > 0) {
      const amount = Math.min(wallet.balance, 500000);
      const payout = await prisma.payout.create({
        data: {
          walletId: wallet.id,
          amount,
          details: "MBank +996 700 123 456",
        },
      });
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: amount } },
      });
      await prisma.walletOperation.create({
        data: {
          walletId: wallet.id,
          kind: "PAYOUT",
          amount: -amount,
          reason: "Запрос на выплату",
          refId: payout.id,
        },
      });
    }
  }

  // ---------- Материалы ----------
  const materialsSeed = [
    {
      authorIdx: 0,
      title: "Как справиться с тревожным приступом: 10 техник",
      description: "Подробный гид с пошаговыми техниками заземления, дыхания и когнитивной перестройки.",
      kind: "ARTICLE",
      price: 0,
      body: "Тревожный приступ — это не опасно для жизни...\n\nТехника 1. Заземление 5-4-3-2-1...\n\nТехника 2. Квадратное дыхание...",
    },
    {
      authorIdx: 1,
      title: "Рабочая тетрадь: конфликты в отношениях",
      description: "30-страничная тетрадь с упражнениями для пар. Подходит для самостоятельной работы или с психологом.",
      kind: "WORKBOOK",
      price: 80000,
      fileUrl: "https://example.com/files/relationships-workbook.pdf",
    },
    {
      authorIdx: 2,
      title: "Аудио: медитация на безопасное место (10 мин)",
      description: "Направленная визуализация для стабилизации перед работой с травмой.",
      kind: "AUDIO",
      price: 30000,
      fileUrl: "https://example.com/files/safe-place.mp3",
    },
    {
      authorIdx: 4,
      title: "Тест: подростковая тревога (HARS-A)",
      description: "Структурированный опросник для подростков 13-17 лет с интерпретацией результатов.",
      kind: "TEST",
      price: 0,
      body: "Инструкция: ответьте на 14 вопросов...",
    },
    {
      authorIdx: 6,
      title: "PDF: 7 признаков выгорания на работе",
      description: "Краткий чек-лист для самопроверки + рекомендации, что делать на каждом этапе.",
      kind: "PDF",
      price: 50000,
      fileUrl: "https://example.com/files/burnout-checklist.pdf",
    },
    {
      authorIdx: 0,
      title: "Видео: знакомство с КПТ за 15 минут",
      description: "Обзорное видео о методе когнитивно-поведенческой терапии: что это и как работает.",
      kind: "VIDEO",
      price: 0,
      fileUrl: "https://example.com/files/cbt-intro.mp4",
    },
    {
      authorIdx: 5,
      title: "Статья: созависимость — как распознать и выйти",
      description: "Признаки созависимых отношений, этапы восстановления.",
      kind: "ARTICLE",
      price: 0,
      body: "Созависимость — это паттерн отношений, в которых...",
    },
    {
      authorIdx: 8,
      title: "Аудио: дыхание для пары (5 мин)",
      description: "Синхронное дыхательное упражнение для пар. Запись для совместного прослушивания.",
      kind: "AUDIO",
      price: 20000,
      fileUrl: "https://example.com/files/couple-breath.mp3",
    },
  ];

  const createdMaterials = [];
  for (const m of materialsSeed) {
    const author = psychologists[m.authorIdx];
    if (!author) continue;
    const mat = await prisma.material.create({
      data: {
        authorId: author.id,
        title: m.title,
        description: m.description,
        kind: m.kind,
        price: m.price,
        contentBody: m.body ?? null,
        fileUrl: m.fileUrl ?? null,
        isPublished: true,
      },
    });
    createdMaterials.push(mat);
  }

  // Часть материалов уже куплена тест-клиентом
  for (const mat of createdMaterials.filter((m) => m.price > 0).slice(0, 2)) {
    await prisma.materialPurchase.create({
      data: { materialId: mat.id, userId: testClient.id },
    });
    await prisma.payment.create({
      data: {
        userId: testClient.id,
        purpose: "MATERIAL",
        materialId: mat.id,
        amount: mat.price,
        status: "PAID",
        method: "CARD",
        commissionAmount: Math.round(mat.price * 0.2),
        splitToPsychologist: Math.round(mat.price * 0.8),
        paidAt: subDays(new Date(), 7),
      },
    });
  }

  // ---------- Курсы ----------
  const coursesSeed = [
    {
      authorIdx: 0,
      title: "КПТ при тревоге: 8-недельная программа",
      description: "Структурированный курс с домашними заданиями, аудио-медитациями и тестами. Подходит для самостоятельной работы.",
      price: 450000,
      certificateEnabled: true,
      modules: [
        ["Введение в КПТ", ["Что такое тревога", "Когнитивная модель", "Дневник наблюдений"]],
        ["Работа с мыслями", ["Когнитивные искажения", "Перепроверка автоматических мыслей", "Поведенческие эксперименты"]],
        ["Поведенческая активация", ["Шкала избегания", "Экспозиция", "План маленьких шагов"]],
        ["Поддержание результата", ["Профилактика срыва", "План на будущее"]],
      ],
    },
    {
      authorIdx: 1,
      title: "Здоровые отношения: курс для пар",
      description: "6 модулей о коммуникации, границах, ритуалах. Можно проходить вдвоём или одному.",
      price: 600000,
      certificateEnabled: false,
      modules: [
        ["Основа: безопасность и доверие", ["Что разрушает доверие", "Восстановление доверия"]],
        ["Коммуникация", ["Ненасильственное общение", "Активное слушание"]],
        ["Конфликты", ["Карта конфликта", "Цикл претензий", "Тайм-аут как инструмент"]],
        ["Близость", ["Эмоциональная и физическая близость", "Ритуалы пары"]],
      ],
    },
    {
      authorIdx: 6,
      title: "Антивыгорание для руководителей",
      description: "Короткий курс из 4 уроков с тестами и шаблонами для еженедельного восстановления.",
      price: 0,
      certificateEnabled: false,
      modules: [
        ["Диагностика выгорания", ["Стадии выгорания", "Тест Маслач (адаптация)"]],
        ["Восстановление", ["Сон, движение, питание", "Микро-перерывы"]],
        ["Границы", ["Делегирование", "Отказ"]],
      ],
    },
  ];

  for (const c of coursesSeed) {
    const author = psychologists[c.authorIdx];
    if (!author) continue;
    const course = await prisma.course.create({
      data: {
        authorId: author.id,
        title: c.title,
        description: c.description,
        price: c.price,
        isPublished: true,
        certificateEnabled: c.certificateEnabled,
      },
    });
    for (let mi = 0; mi < c.modules.length; mi++) {
      const [mTitle, lessons] = c.modules[mi] as [string, string[]];
      const module = await prisma.courseModule.create({
        data: {
          courseId: course.id,
          title: mTitle,
          position: mi,
        },
      });
      for (let li = 0; li < lessons.length; li++) {
        await prisma.courseLesson.create({
          data: {
            moduleId: module.id,
            title: lessons[li],
            position: li,
            body: "Текст урока будет добавлен автором.",
          },
        });
      }
    }
  }

  // Тест-клиент записан на один бесплатный курс
  const freeCourse = await prisma.course.findFirst({ where: { price: 0 } });
  if (freeCourse) {
    await prisma.courseEnrollment.create({
      data: { courseId: freeCourse.id, userId: testClient.id },
    });
  }

  // ---------- Подписочные планы ----------
  await prisma.subscriptionPlan.createMany({
    data: [
      {
        name: "Lite",
        monthlyPrice: 150000,
        commissionPercent: 15,
        features: JSON.stringify([
          "Сниженная комиссия 15%",
          "До 5 материалов в магазине",
          "Базовая статистика",
        ]),
      },
      {
        name: "Pro",
        monthlyPrice: 350000,
        commissionPercent: 10,
        features: JSON.stringify([
          "Сниженная комиссия 10%",
          "Без ограничений на материалы",
          "Приоритет в каталоге",
          "Подробная аналитика и когорты",
        ]),
      },
    ],
  });

  // ---------- Промокоды ----------
  await prisma.promocode.createMany({
    data: [
      {
        code: "FIRST20",
        discountPercent: 20,
        maxUses: 200,
        usesCount: 47,
        appliesTo: "SESSION",
      },
      {
        code: "READKG",
        discountPercent: 30,
        maxUses: 100,
        usesCount: 12,
        appliesTo: "MATERIAL",
      },
      {
        code: "LEARN500",
        discountAmount: 50000,
        maxUses: 50,
        usesCount: 5,
        appliesTo: "COURSE",
      },
    ],
  });

  // ---------- Споры ----------
  await prisma.dispute.create({
    data: {
      bookingId: "demo-booking-id",
      reason: "Психолог не вышел на связь",
      description:
        "Подключился вовремя, но психолог не появился в комнате. Прошу вернуть оплату.",
      status: "IN_REVIEW",
      openedById: clients[1].id,
    },
  });

  // ---------- Уведомления для тест-клиента ----------
  await prisma.notification.createMany({
    data: [
      {
        userId: testClient.id,
        channel: "EMAIL",
        template: "booking_confirmed",
        title: "Запись подтверждена",
        body: "Ваша сессия с Айгерим завтра в 14:00.",
        sentAt: subHours(new Date(), 3),
      },
      {
        userId: testClient.id,
        channel: "PUSH",
        template: "booking_reminder_24h",
        title: "Сессия завтра",
        body: "Не забудьте: завтра в 14:00 у вас сессия.",
        sentAt: subHours(new Date(), 1),
      },
      {
        userId: testClient.id,
        channel: "INAPP",
        template: "new_material",
        title: "Новый материал",
        body: "Айгерим опубликовала новую статью о тревожных приступах.",
        sentAt: subDays(new Date(), 1),
      },
    ],
  });

  // ---------- AdminLog ----------
  await prisma.adminLog.createMany({
    data: [
      {
        actorId: admin.id,
        action: "psychologist.approve",
        targetType: "psychologist_profile",
        targetId: psychologists[0].id,
        diff: JSON.stringify({ note: "Проверены диплом и сертификат." }),
        createdAt: subMonths(new Date(), 1),
      },
      {
        actorId: contentManager.id,
        action: "review.moderate",
        targetType: "review",
        targetId: "demo-review-id",
        diff: JSON.stringify({ action: "publish" }),
        createdAt: subDays(new Date(), 3),
      },
    ],
  });

  console.log("✓ Готово.");
  console.log("");
  console.log("Учётные записи:");
  console.log(`  Админ:           admin@psych.kg / ${ADMIN_PASS}`);
  console.log(`  Контент-менеджер: content@psych.kg / ${ADMIN_PASS}`);
  console.log(`  Клиенты:         client@psych.kg .. client5@psych.kg / ${CLIENT_PASS}`);
  console.log(`  Психологи:       aigerim,bakyt,elnura,azamat,saltanat,ruslan,nurzat,almaz,diana,marat@psych.kg / ${PSYCH_PASS}`);
  console.log(`  Pending верификация: pending@psych.kg / ${PSYCH_PASS}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
