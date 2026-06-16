import { BrochureLayout, Section, BenefitGrid, StepList, CheckList, CTA, InfoNote } from "@/components/brochure";
import {
  IconUser, IconCalendar, IconVideo, IconLock, IconBriefcase, IconNotebook,
  IconAward, IconShield, IconClipboard, IconChartBar, IconCheckCircle, IconLifeBuoy,
} from "@/components/icons";

export default function PsychologistBrochure() {
  return (
    <BrochureLayout
      role="Психолог"
      title="PsychKG для психолога"
      tagline="Ведите частную практику онлайн: понятная комиссия, удобный календарь, безопасная видеосвязь, собственный магазин материалов и курсов."
      accent="amber"
      RoleIcon={IconUser}
    >
      <Section title="Почему мы">
        <BenefitGrid
          items={[
            { icon: IconBriefcase, title: "Прозрачные финансы", text: "Комиссия 20% на старте, на профплане — 12%. Сплит-выплата автоматически после каждой завершённой сессии." },
            { icon: IconCalendar, title: "Календарь без головной боли", text: "Правила доступности по дням, автобуферы между сессиями, no-show политика и переносы." },
            { icon: IconVideo, title: "Видеосвязь под ключ", text: "Защищённые комнаты создаются автоматически — не нужно настраивать Zoom или Google Meet." },
            { icon: IconLock, title: "Безопасность данных", text: "Приватные заметки шифруются AES-256-GCM. Запись сессии — только при двойном согласии." },
            { icon: IconNotebook, title: "Магазин материалов", text: "Продавайте статьи, PDF, аудио, тесты, рабочие тетради. Защита от копирования и водяные знаки." },
            { icon: IconAward, title: "Авторские курсы", text: "Создавайте модульные программы с уроками, прогрессом и сертификатами для учеников." },
          ]}
        />
      </Section>

      <Section title="Как присоединиться">
        <StepList
          steps={[
            { title: "Заявка и интервью", text: "Заполните профиль, загрузите дипломы, сертификаты и лицензии. Пройдите короткое онлайн-интервью." },
            { title: "Верификация", text: "Администратор проверяет документы за 1-3 рабочих дня. После одобрения профиль появляется в каталоге с бейджем." },
            { title: "Настройка кабинета", text: "Заполните био, подход, темы и методы. Настройте расписание, цену и длительность сессии." },
            { title: "Первые клиенты", text: "Клиенты находят вас в каталоге, бронируют слоты и оплачивают. Выплаты — на банковский счёт или MBank." },
          ]}
        />
      </Section>

      <Section title="Возможности кабинета психолога">
        <CheckList
          items={[
            "Расписание с автобуферами и блокировкой выходных",
            "Видеокомнаты для каждой сессии",
            "Шифрованные приватные заметки",
            "Кошелёк: доступно / в ожидании / история",
            "Запрос выплаты в один клик",
            "Сводка по доходам и завершённым сессиям",
            "Загрузка и публикация материалов",
            "Конструктор курсов: модули и уроки",
            "Список клиентов и история сессий",
            "Уведомления о новых записях",
          ]}
        />
      </Section>

      <Section title="Финансовая модель">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: IconChartBar, title: "Базовая комиссия", value: "20%", sub: "На старте, без подписки" },
            { icon: IconAward, title: "Профплан", value: "12% + 2 999 KGS/мес", sub: "Снижение комиссии и приоритет в каталоге" },
            { icon: IconLifeBuoy, title: "No-show клиента", value: "50% удерживается", sub: "Компенсация вашего времени" },
          ].map((x) => (
            <div key={x.title} className="rounded-xl border border-slate-100 bg-white p-4 avoid-break">
              <span className="icon-circle h-9 w-9">
                <x.icon size={16} />
              </span>
              <div className="mt-2 text-xs text-slate-500 uppercase tracking-wide">{x.title}</div>
              <div className="mt-0.5 font-bold text-brand-700">{x.value}</div>
              <div className="mt-1 text-xs text-slate-600">{x.sub}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Этика и ответственность">
        <InfoNote>
          Психолог обязан соблюдать профессиональную этику, конфиденциальность
          клиента и не давать рекомендаций вне зоны своей квалификации. Платформа
          вправе приостановить профиль при нарушении правил сообщества или
          обоснованных жалобах клиентов. Полный текст требований — в{" "}
          <b>Кодексе сообщества PsychKG</b>.
        </InfoNote>
      </Section>

      <CTA
        title="Начните практику с PsychKG"
        text="Зарегистрируйтесь, заполните профиль и получите первых клиентов уже на этой неделе."
        href="/register"
        cta="Стать психологом"
      />
    </BrochureLayout>
  );
}
