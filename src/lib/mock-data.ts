export const MOCK_PSYCHOLOGISTS = [
  {
    id: "psy-1",
    bio: "Клинический психолог, КПТ-терапевт. Работаю с тревожными расстройствами, паническими атаками, социальной фобией. Помогаю выстраивать здоровые когнитивные паттерны.",
    approach: "Когнитивно-поведенческая терапия (КПТ), техники экспозиции, поведенческие эксперименты. Работаю по протоколам с доказанной эффективностью.",
    experienceYears: 8,
    pricePerSession: 250000,
    sessionMinutes: 50,
    rating: 4.9,
    reviewsCount: 47,
    verifiedBadge: true,
    topics: '["anxiety","depression","self-esteem"]',
    methods: '["cbt","act"]',
    languages: '["ru","ky"]',
    format: '["video","chat"]',
    user: { displayName: "Айгерим Токтосунова" },
  },
  {
    id: "psy-2",
    bio: "Гештальт-терапевт. Специализируюсь на работе с парами и семьями. 12 лет практики.",
    approach: "Гештальт-подход, системная семейная терапия. Фокус на осознавании и контакте.",
    experienceYears: 12,
    pricePerSession: 300000,
    sessionMinutes: 60,
    rating: 4.8,
    reviewsCount: 35,
    verifiedBadge: true,
    topics: '["relationships","family","self-esteem"]',
    methods: '["gestalt","humanistic"]',
    languages: '["ru","en"]',
    format: '["video"]',
    user: { displayName: "Динара Алиева" },
  },
  {
    id: "psy-3",
    bio: "Психоаналитик. Работаю с глубинными конфликтами, травматическим опытом, проблемами идентичности.",
    approach: "Психоаналитическая терапия, работа с переносом, анализ сновидений.",
    experienceYears: 15,
    pricePerSession: 350000,
    sessionMinutes: 50,
    rating: 4.7,
    reviewsCount: 28,
    verifiedBadge: true,
    topics: '["trauma","depression","grief"]',
    methods: '["psychoanalysis"]',
    languages: '["ru"]',
    format: '["video"]',
    user: { displayName: "Бакыт Усенов" },
  },
  {
    id: "psy-4",
    bio: "EMDR-терапевт, работаю с ПТСР, паническими атаками и фобиями. Сертифицирована EMDR Institute.",
    approach: "EMDR (десенсибилизация и переработка движениями глаз), элементы КПТ.",
    experienceYears: 6,
    pricePerSession: 280000,
    sessionMinutes: 60,
    rating: 4.9,
    reviewsCount: 22,
    verifiedBadge: true,
    topics: '["trauma","anxiety","addiction"]',
    methods: '["emdr","cbt"]',
    languages: '["ru","ky","en"]',
    format: '["video"]',
    user: { displayName: "Нуржамал Карабекова" },
  },
  {
    id: "psy-5",
    bio: "Схема-терапевт. Помогаю людям с хроническими паттернами в отношениях и самооценке.",
    approach: "Схема-терапия, техники ограниченного репарентинга, работа с режимами.",
    experienceYears: 10,
    pricePerSession: 320000,
    sessionMinutes: 50,
    rating: 4.6,
    reviewsCount: 19,
    verifiedBadge: true,
    topics: '["relationships","self-esteem","depression"]',
    methods: '["schema-therapy","cbt"]',
    languages: '["ru","en"]',
    format: '["video","chat"]',
    user: { displayName: "Эркин Джумабаев" },
  },
  {
    id: "psy-6",
    bio: "Детский и подростковый психолог. Работаю с тревожностью, буллингом, проблемами адаптации.",
    approach: "Игровая терапия, КПТ для подростков, работа с родителями.",
    experienceYears: 9,
    pricePerSession: 200000,
    sessionMinutes: 45,
    rating: 4.8,
    reviewsCount: 31,
    verifiedBadge: true,
    topics: '["family","anxiety","self-esteem"]',
    methods: '["cbt","humanistic"]',
    languages: '["ru","ky"]',
    format: '["video"]',
    user: { displayName: "Жылдыз Маматова" },
  },
  {
    id: "psy-7",
    bio: "ACT-терапевт. Помогаю жить полноценно, несмотря на трудные мысли и эмоции. Работаю с выгоранием.",
    approach: "Терапия принятия и ответственности (ACT), майндфулнесс, ценностно-ориентированные действия.",
    experienceYears: 5,
    pricePerSession: 220000,
    sessionMinutes: 50,
    rating: 4.7,
    reviewsCount: 15,
    verifiedBadge: true,
    topics: '["career","anxiety","depression"]',
    methods: '["act","cbt"]',
    languages: '["ru"]',
    format: '["video","chat"]',
    user: { displayName: "Тимур Асанов" },
  },
  {
    id: "psy-8",
    bio: "Гуманистический психолог. Создаю безопасное пространство для самопознания и роста.",
    approach: "Клиент-центрированная терапия Роджерса, экзистенциальный подход.",
    experienceYears: 11,
    pricePerSession: 270000,
    sessionMinutes: 60,
    rating: 4.5,
    reviewsCount: 24,
    verifiedBadge: true,
    topics: '["self-esteem","grief","career"]',
    methods: '["humanistic"]',
    languages: '["ru","en"]',
    format: '["video"]',
    user: { displayName: "Алия Ибрагимова" },
  },
  {
    id: "psy-9",
    bio: "Специалист по зависимостям. Работаю с алкогольной, игровой, пищевой зависимостью и созависимостью.",
    approach: "Мотивационное интервью, КПТ зависимостей, программа предотвращения рецидивов.",
    experienceYears: 14,
    pricePerSession: 300000,
    sessionMinutes: 50,
    rating: 4.6,
    reviewsCount: 18,
    verifiedBadge: true,
    topics: '["addiction","relationships","family"]',
    methods: '["cbt","humanistic"]',
    languages: '["ru","ky"]',
    format: '["video"]',
    user: { displayName: "Марат Сыдыков" },
  },
  {
    id: "psy-10",
    bio: "Кризисный психолог. Работаю с острыми состояниями, суицидальными мыслями, посттравматическим стрессом.",
    approach: "Кризисная интервенция, стабилизация, EMDR для острой травмы.",
    experienceYears: 7,
    pricePerSession: 250000,
    sessionMinutes: 50,
    rating: 4.8,
    reviewsCount: 12,
    verifiedBadge: true,
    topics: '["trauma","grief","anxiety"]',
    methods: '["emdr","cbt","act"]',
    languages: '["ru","ky","en"]',
    format: '["video"]',
    user: { displayName: "Канат Абдыкалыков" },
  },
];

export const MOCK_REVIEWS: Record<
  string,
  { id: string; authorName: string; rating: number; text: string; date: string }[]
> = {
  "psy-1": [
    { id: "r1", authorName: "Айдана К.", rating: 5, text: "Айгерим помогла мне справиться с паническими атаками за 8 сессий. Очень структурированный подход, домашние задания, дневник мыслей. Рекомендую!", date: "2026-05-12" },
    { id: "r2", authorName: "Бектур М.", rating: 5, text: "Отличный специалист. Чувствуешь себя в безопасности. После терапии тревога снизилась на порядок.", date: "2026-04-28" },
    { id: "r3", authorName: "Гулира Т.", rating: 4, text: "Профессионально и по делу. Иногда хотелось больше тёплого контакта, но результат есть.", date: "2026-04-15" },
  ],
  "psy-2": [
    { id: "r4", authorName: "Алмаз и Жаркын", rating: 5, text: "Проходили парную терапию. Динара помогла нам заново услышать друг друга. Спасибо!", date: "2026-05-20" },
    { id: "r5", authorName: "Нурия С.", rating: 5, text: "Чуткий и глубокий терапевт. Работали с темой отношений с матерью — много инсайтов.", date: "2026-03-10" },
  ],
  "psy-3": [
    { id: "r6", authorName: "Тилек А.", rating: 5, text: "Глубокая работа, которая меняет восприятие себя. Бакыт очень внимателен к деталям.", date: "2026-05-01" },
    { id: "r7", authorName: "Асель Б.", rating: 4, text: "Долгосрочная терапия, но результат стоит времени. Хороший аналитик.", date: "2026-02-18" },
  ],
};

export const MOCK_MATERIALS = [
  { id: "mat-1", title: "Дневник тревожных мыслей: инструкция и шаблон", description: "Пошаговое руководство по ведению когнитивного дневника. Шаблон для заполнения с примерами типичных когнитивных искажений.", kind: "PDF", price: 0, authorName: "Айгерим Токтосунова", contentBody: "Дневник тревожных мыслей — один из ключевых инструментов когнитивно-поведенческой терапии. В этом руководстве вы найдёте:\n\n1. Как распознавать автоматические мысли\n2. Как определять когнитивные искажения\n3. Как формулировать рациональные альтернативы\n4. Шаблон для ежедневного заполнения\n\nРегулярное ведение дневника помогает снизить интенсивность тревоги на 40-60% за 4-6 недель." },
  { id: "mat-2", title: "Техники заземления при панической атаке", description: "Аудио-гид с 5 техниками быстрого заземления, которые можно использовать в момент приступа паники.", kind: "AUDIO", price: 49900, authorName: "Айгерим Токтосунова", contentBody: null },
  { id: "mat-3", title: "Как говорить с партнёром о чувствах", description: "Статья о принципах ненасильственного общения (NVC) в паре. Формулы «я-сообщений», типичные ошибки.", kind: "ARTICLE", price: 0, authorName: "Динара Алиева", contentBody: "Коммуникация — основа здоровых отношений. В этой статье рассмотрим четыре компонента ненасильственного общения по Маршаллу Розенбергу:\n\n1. **Наблюдение** — описываем факт без оценки\n2. **Чувство** — называем эмоцию\n3. **Потребность** — озвучиваем, что за чувством\n4. **Просьба** — конкретное действие\n\nПример: «Когда ты приходишь позже обещанного (наблюдение), я чувствую беспокойство (чувство), потому что мне важна предсказуемость (потребность). Мог бы ты предупреждать, если задерживаешься? (просьба)»" },
  { id: "mat-4", title: "Тест: ваш уровень стресса (PSS-10)", description: "Стандартизированный опросник воспринимаемого стресса. 10 вопросов, автоматический подсчёт баллов.", kind: "TEST", price: 0, authorName: "Тимур Асанов", contentBody: null },
  { id: "mat-5", title: "Рабочая тетрадь: работа с самооценкой", description: "12 упражнений для укрепления самооценки. Рефлексивные вопросы, визуализации, поведенческие эксперименты.", kind: "WORKBOOK", price: 79900, authorName: "Эркин Джумабаев", contentBody: null },
  { id: "mat-6", title: "Видеолекция: что такое травма и как она влияет на мозг", description: "30-минутная лекция о нейробиологии травмы, окне толерантности и путях восстановления.", kind: "VIDEO", price: 99900, authorName: "Канат Абдыкалыков", contentBody: null },
  { id: "mat-7", title: "Медитация для засыпания", description: "20-минутная управляемая медитация body-scan для снятия напряжения перед сном.", kind: "AUDIO", price: 29900, authorName: "Алия Ибрагимова", contentBody: null },
  { id: "mat-8", title: "Чек-лист: признаки эмоционального выгорания", description: "Быстрая самодиагностика по 15 признакам. PDF для печати.", kind: "PDF", price: 0, authorName: "Тимур Асанов", contentBody: null },
];

export const MOCK_COURSES = [
  {
    id: "course-1",
    title: "Управление тревогой: 6-недельный курс",
    description: "Структурированная программа на основе КПТ. Вы научитесь распознавать триггеры тревоги, работать с автоматическими мыслями и использовать техники релаксации.",
    price: 499900,
    authorName: "Айгерим Токтосунова",
    enrollments: 34,
    certificateEnabled: true,
    modules: [
      {
        id: "m1-1", title: "Понимание тревоги", lessons: [
          { id: "l1-1", title: "Что такое тревога и зачем она нужна" },
          { id: "l1-2", title: "Порочный круг тревоги" },
          { id: "l1-3", title: "Дневник самонаблюдения" },
        ],
      },
      {
        id: "m1-2", title: "Когнитивные техники", lessons: [
          { id: "l2-1", title: "Автоматические мысли" },
          { id: "l2-2", title: "Когнитивные искажения" },
          { id: "l2-3", title: "Рациональный ответ" },
        ],
      },
      {
        id: "m1-3", title: "Поведенческие техники", lessons: [
          { id: "l3-1", title: "Экспозиция: принцип и иерархия" },
          { id: "l3-2", title: "Техники дыхания и заземления" },
          { id: "l3-3", title: "Поведенческие эксперименты" },
        ],
      },
      {
        id: "m1-4", title: "Профилактика рецидивов", lessons: [
          { id: "l4-1", title: "План действий при рецидиве" },
          { id: "l4-2", title: "Поддержание результатов" },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "Осознанные отношения: курс для пар",
    description: "8-модульный курс на основе методов Готтмана и NVC. Для пар, которые хотят улучшить коммуникацию и укрепить связь.",
    price: 699900,
    authorName: "Динара Алиева",
    enrollments: 18,
    certificateEnabled: true,
    modules: [
      {
        id: "m2-1", title: "Карта любви", lessons: [
          { id: "l5-1", title: "Насколько хорошо вы знаете партнёра?" },
          { id: "l5-2", title: "Ритуалы связи" },
        ],
      },
      {
        id: "m2-2", title: "4 всадника апокалипсиса", lessons: [
          { id: "l6-1", title: "Критика vs. жалоба" },
          { id: "l6-2", title: "Презрение и его антидот" },
          { id: "l6-3", title: "Оборона и уход" },
        ],
      },
      {
        id: "m2-3", title: "Ненасильственное общение", lessons: [
          { id: "l7-1", title: "Наблюдение, чувство, потребность, просьба" },
          { id: "l7-2", title: "Практика я-сообщений" },
        ],
      },
    ],
  },
  {
    id: "course-3",
    title: "Восстановление после выгорания",
    description: "Практический курс для тех, кто чувствует опустошение на работе. Диагностика, границы, перезагрузка ценностей.",
    price: 0,
    authorName: "Тимур Асанов",
    enrollments: 52,
    certificateEnabled: false,
    modules: [
      {
        id: "m3-1", title: "Диагностика", lessons: [
          { id: "l8-1", title: "Шкала выгорания Маслач" },
          { id: "l8-2", title: "Мои ресурсы и стрессоры" },
        ],
      },
      {
        id: "m3-2", title: "Границы и ценности", lessons: [
          { id: "l9-1", title: "Как говорить «нет»" },
          { id: "l9-2", title: "Ценностно-ориентированные действия" },
        ],
      },
    ],
  },
];

export const MOCK_BOOKINGS = [
  { id: "bk-1", psychologistName: "Айгерим Токтосунова", startAt: "2026-06-18T10:00:00", status: "CONFIRMED", price: 250000 },
  { id: "bk-2", psychologistName: "Динара Алиева", startAt: "2026-06-20T14:00:00", status: "CONFIRMED", price: 300000 },
  { id: "bk-3", psychologistName: "Айгерим Токтосунова", startAt: "2026-06-10T10:00:00", status: "COMPLETED", price: 250000 },
  { id: "bk-4", psychologistName: "Бакыт Усенов", startAt: "2026-06-05T11:00:00", status: "COMPLETED", price: 350000 },
  { id: "bk-5", psychologistName: "Тимур Асанов", startAt: "2026-05-28T16:00:00", status: "COMPLETED", price: 220000 },
];

export const MOCK_WALLET = {
  balance: 1250000,
  pendingBalance: 300000,
  operations: [
    { id: "wo-1", kind: "SESSION_COMPLETE", amount: 200000, reason: "Сессия bk-101 (клиент: Айдана К.)" },
    { id: "wo-2", kind: "SESSION_COMPLETE", amount: 240000, reason: "Сессия bk-102 (клиент: Бектур М.)" },
    { id: "wo-3", kind: "PAYOUT", amount: -500000, reason: "Запрос на выплату #p-01" },
    { id: "wo-4", kind: "SESSION_COMPLETE", amount: 200000, reason: "Сессия bk-103 (клиент: Нурия С.)" },
    { id: "wo-5", kind: "SESSION_COMPLETE", amount: 200000, reason: "Сессия bk-104 (клиент: Тилек А.)" },
    { id: "wo-6", kind: "HOLD", amount: 250000, reason: "Холд: предстоящая сессия bk-105" },
    { id: "wo-7", kind: "SESSION_COMPLETE", amount: 160000, reason: "Сессия bk-106 (клиент: Асель Б.)" },
  ],
};

export const MOCK_ADMIN_STATS = {
  usersTotal: 156,
  clients: 127,
  psychologists: 24,
  contentManagers: 2,
  pendingVerifications: 3,
  bookingsTotal: 412,
  completedBookings: 347,
  totalRevenue: 8240000,
  totalCommission: 1648000,
  totalPsychologistPayout: 6592000,
};

export const MOCK_PENDING_VERIFICATIONS = [
  {
    id: "pv-1",
    displayName: "Анара Жолдошева",
    email: "anara@example.com",
    experienceYears: 3,
    verification: "PENDING",
    bio: "Начинающий психолог, выпускница КРСУ. Специализация — детская и подростковая психология. Стажировка в Республиканском центре психического здоровья.",
    documents: [
      { id: "d1", kind: "DIPLOMA", comment: "Диплом КРСУ, психология, 2023" },
      { id: "d2", kind: "CERTIFICATE", comment: "Сертификат КПТ, Бек Институт (онлайн)" },
    ],
  },
  {
    id: "pv-2",
    displayName: "Руслан Бекмуратов",
    email: "ruslan.b@example.com",
    experienceYears: 7,
    verification: "PENDING",
    bio: "Клинический психолог, работал в клинике «Здоровье» (Бишкек). Переход в онлайн-практику.",
    documents: [
      { id: "d3", kind: "DIPLOMA", comment: "Диплом БГУ, клиническая психология" },
    ],
  },
];

export const MOCK_PENDING_REVIEWS = [
  {
    id: "pr-1",
    authorName: "Камчыбек Т.",
    psychologistName: "Айгерим Токтосунова",
    rating: 5,
    text: "Лучший специалист, с которым мне доводилось работать. Структурный подход и тепло.",
  },
  {
    id: "pr-2",
    authorName: "Эльвира Н.",
    psychologistName: "Тимур Асанов",
    rating: 4,
    text: "Хороший терапевт, но иногда сессия заканчивалась слишком резко.",
  },
];

export const MOCK_PENDING_PAYOUTS = [
  {
    id: "po-1",
    psychologistName: "Эркин Джумабаев",
    amount: 640000,
    details: "MBank, +996 700 111 222",
  },
  {
    id: "po-2",
    psychologistName: "Жылдыз Маматова",
    amount: 400000,
    details: "РСК Банк, счёт 1234567890",
  },
];

export const MOCK_DISPUTES = [
  {
    id: "disp-1",
    bookingId: "bk-999",
    status: "OPEN",
    reason: "Психолог не вышел на связь",
    description: "Записался на сессию 10.06 в 14:00 к Марату С. Оплата прошла, но психолог не подключился к видеокомнате. Ждал 20 минут. Прошу вернуть оплату.",
  },
];

export const MOCK_SCHEDULE_RULES = [
  { id: "sr-1", weekday: 1, startMinutes: 540, endMinutes: 1080 },
  { id: "sr-2", weekday: 2, startMinutes: 540, endMinutes: 1080 },
  { id: "sr-3", weekday: 3, startMinutes: 600, endMinutes: 1020 },
  { id: "sr-4", weekday: 4, startMinutes: 540, endMinutes: 1080 },
  { id: "sr-5", weekday: 5, startMinutes: 540, endMinutes: 900 },
];

export const MOCK_ANALYTICS = {
  newUsers: 42,
  newBookings: 67,
  completedBookings: 58,
  paymentsCount: 63,
  totalRevenue: 1890000,
  totalCommission: 378000,
  avgCheck: 300000,
};
