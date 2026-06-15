# PsychKG — платформа психологической помощи

Реализация ТЗ «Платформа психологической помощи и онлайн-консультаций» для
рынка Кыргызстана. Архитектура и поэтапный запуск (Студия → Маркетплейс)
выполнены согласно ТЗ от июня 2026 г.

## Что внутри (карта реализации ТЗ)

| Раздел ТЗ | Где реализовано |
|---|---|
| 1.4 Роли пользователей (RBAC) | `prisma/schema.prisma` (enum Role), `src/middleware.ts`, `src/lib/rbac.ts` |
| 2.1 Регистрация по e-mail/телефону | `src/app/(auth)/*`, `src/app/api/auth/*` |
| 2.2 Каталог + поиск + фильтры | `src/lib/catalog.ts`, `src/app/psychologists/*` |
| 2.3 Расписание и бронирование | `src/lib/scheduling.ts`, `src/app/api/bookings/*`, `src/app/psychologist/schedule` |
| 2.4 Видеоконсультации (Daily.co) | `src/lib/video/daily.ts`, `src/app/api/sessions/[bookingId]/room` |
| 2.4 Двойное согласие на запись | `src/components/recording-consent.tsx`, `src/app/api/sessions/[bookingId]/recording-consent` |
| 2.5 Платежи (Freedom Pay + сплит) | `src/lib/payments/freedompay.ts`, `src/app/api/payments/*` |
| 2.5 Кошелёк психолога, выплаты | `src/lib/wallet.ts`, `src/app/psychologist/wallet` |
| 2.6 Магазин материалов и курсов | `src/app/materials/*`, `src/app/courses/*`, `src/app/psychologist/materials` |
| 2.7 Приватные заметки (AES-256-GCM) | `src/lib/crypto.ts`, `src/app/api/sessions/[bookingId]/notes` |
| 2.7 Экспорт и удаление данных | `src/app/api/me/export`, `src/app/me/delete` |
| 2.8 Отзывы, рейтинги | `src/app/api/reviews`, модерация в админке |
| 2.8 Уведомления (e-mail/SMS/push) | `src/lib/notifications.ts`, cron `src/app/api/cron/reminders` |
| 2.9 Админ-панель | `src/app/admin/*` |
| 3.1 Цифровой кодекс КР № 178 | юр. страницы `src/app/legal/*`, согласия при регистрации, шифрование заметок |
| 3.3 Мобильность и доступность | mobile-first вёрстка на Tailwind |
| 4.1 Платёжная инфраструктура КР | Freedom Pay основной, MBank/Элкарт через `PaymentMethod` |
| 4.2 Технологический стек | Next.js + PostgreSQL + Prisma + Tailwind |

## Технологический стек

- **Next.js 14** (App Router, Server Actions) + **TypeScript**
- **PostgreSQL 16** + **Prisma 5**
- **Tailwind CSS** (mobile-first)
- **jose** + **bcryptjs** для собственного auth (JWT-сессии)
- **Daily.co** для видеосвязи (за интерфейсом `VideoProvider`)
- **Freedom Pay / PayBox** для эквайринга и сплита (за интерфейсом `PaymentProvider`)
- AES-256-GCM шифрование приватных заметок психолога

Адаптеры провайдеров изолированы в `src/lib/video` и `src/lib/payments`, что
позволяет заменить провайдера без правок бизнес-логики (рекомендация ТЗ п.7).

## Локальный запуск

### Требования

- Node.js 20+ (рекомендован 22)
- Docker (для PostgreSQL и MinIO) или внешний PostgreSQL

### Шаги

```bash
# 1. Установить зависимости
npm install

# 2. Поднять PostgreSQL и MinIO
docker compose up -d db minio

# 3. Скопировать .env
cp .env.example .env

# 4. Сгенерировать клиент Prisma и применить схему
npm run db:generate
npm run db:push

# 5. Загрузить демо-данные
npm run db:seed

# 6. Запустить dev-сервер
npm run dev
```

Откройте http://localhost:3000.

### Тестовые аккаунты

- **Админ:** `admin@psych.kg` / `admin12345`
- **Клиент:** `client@psych.kg` / `client12345`
- **Психологи:** `anna@psych.kg`, `bakyt@psych.kg`, `elnura@psych.kg` — все с паролем `psych12345`

### Тестовая оплата

Если в `.env` не заданы `FREEDOMPAY_*`, инициация оплаты перенаправляет на
встроенный симулятор `/payments/dev`, где можно эмулировать успех или ошибку.

## Структура проекта

```
prisma/
  schema.prisma           # модель данных всех доменов
  seed.ts                 # демо-данные

src/
  app/
    (auth)/               # вход и регистрация
    psychologists/        # каталог и карточка психолога
    materials/            # магазин материалов
    courses/              # магазин курсов
    me/                   # ЛК клиента
    psychologist/         # ЛК психолога
    admin/                # админ-панель
    legal/                # оферта, политика, согласие
    api/                  # REST/Server-handlers
  components/             # UI компоненты
  lib/                    # доменная логика
    auth.ts               # JWT, RBAC
    catalog.ts            # поиск психологов
    scheduling.ts         # расчёт свободных слотов
    notifications.ts      # уведомления (e-mail/SMS/push)
    crypto.ts             # AES-256-GCM для приватных заметок
    money.ts              # тыйыны / форматирование KGS
    wallet.ts             # релиз hold→balance
    payments/freedompay.ts # PaymentProvider
    video/daily.ts        # VideoProvider
  middleware.ts           # RBAC-защита роутов
```

## Этапы запуска (по ТЗ)

Реализовано **MVP «Студия»** + стартовый набор Фазы 2 (магазин и курсы) и
заделы под Фазу 3 (подписка, верификация внешних психологов, аналитика).

- ✅ Фаза 1 (MVP «Студия»): регистрация, каталог, запись + календарь,
  видеосвязь, оплата + базовая комиссия, ЛК, админ-панель
- ✅ Фаза 2 (Контент): магазин материалов, курсы с модулями и прогрессом,
  отзывы и рейтинги
- 🟨 Фаза 3 (Маркетплейс): кошелёк психолога и сплит готовы, подписочные
  планы и реферальная программа — доменные сущности созданы, требуется UI
  и тарифные правила

## Перед запуском в продакшен

1. Подтвердить договоры с Freedom Pay (тарифы, sub-merchant ids, API сплита),
   SMS-провайдером КР, Daily.co.
2. Заменить `NOTES_ENCRYPTION_KEY` на ключ из KMS / Vault.
3. Включить TLS на балансировщике, HSTS.
4. Настроить резервное копирование БД и логи аудита (`AdminLog`).
5. Юридический пакет (оферта, политика, согласия) — согласовать с юристом по
   Цифровому кодексу КР № 178 от 31.07.2025.
6. Cron на эндпоинт `POST /api/cron/reminders` каждые 15 минут.

## Безопасность (ТЗ п. 3.1)

- TLS в передаче (на уровне инфраструктуры).
- AES-256-GCM шифрование приватных заметок (`NOTES_ENCRYPTION_KEY`).
- Bcrypt 12 раундов для паролей.
- JWT-сессии в `httpOnly` cookie.
- RBAC через middleware + проверки в API.
- Журнал админ-действий (`AdminLog`).
- Запись сессий — **только при двойном согласии**.
- Платежи — **только** через сертифицированного PCI DSS провайдера. Платформа
  не хранит и не получает номера карт.
