"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { RISK_META, type RiskLevel } from "@/lib/crisis";
import { IconAlert, IconPhone, IconShield, IconClock } from "@/components/icons";

type Case = {
  id: string;
  pseudonym: string;
  riskLevel: RiskLevel;
  status: "OPEN" | "ACKNOWLEDGED" | "IN_CONTACT" | "RESOLVED";
  minutesAgo: number;
  phone: string;
  summary: string;
};

const CASES: Case[] = [
  { id: "cr-1", pseudonym: "Клиент A-204", riskLevel: "IMMINENT", status: "OPEN", minutesAgo: 3, phone: "+996700112233", summary: "Скрининг: план + намерение (q5). Требуется немедленный контакт." },
  { id: "cr-2", pseudonym: "Клиент A-198", riskLevel: "HIGH", status: "ACKNOWLEDGED", minutesAgo: 22, phone: "+996700445566", summary: "Скрининг: намерение (q4), поведение в анамнезе. Назначен дежурный." },
  { id: "cr-3", pseudonym: "Клиент A-187", riskLevel: "HIGH", status: "IN_CONTACT", minutesAgo: 64, phone: "+996700778899", summary: "На связи с супервайзером, согласован план безопасности." },
  { id: "cr-4", pseudonym: "Клиент A-165", riskLevel: "HIGH", status: "RESOLVED", minutesAgo: 320, phone: "+996700220044", summary: "Передан кризисной службе, запись к психологу на завтра." },
];

export default function AdminCrisisPage() {
  const { lang } = useLang();
  const ru = lang === "ru";

  const STATUS_LABEL: Record<Case["status"], string> = {
    OPEN: ru ? "Новый" : "Жаңы",
    ACKNOWLEDGED: ru ? "Принят" : "Кабыл алынды",
    IN_CONTACT: ru ? "На связи" : "Байланышта",
    RESOLVED: ru ? "Закрыт" : "Жабылды",
  };
  const STATUS_STYLE: Record<Case["status"], string> = {
    OPEN: "bg-rose-100 text-rose-700",
    ACKNOWLEDGED: "bg-amber-100 text-amber-800",
    IN_CONTACT: "bg-sky-100 text-sky-700",
    RESOLVED: "bg-mint-100 text-brand-700",
  };

  const openCount = CASES.filter((x) => x.status === "OPEN").length;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 md:py-8 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-brand-700 flex items-center gap-2">
            <IconAlert size={22} className="text-rose-600" />
            {ru ? "Кризисные кейсы" : "Кризистик кейстер"}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {ru
              ? "Очередь срочных обращений из скрининга безопасности. Реагируйте по протоколу: связаться — оценить риск — обеспечить безопасность — задокументировать."
              : "Коопсуздук текшерүүсүнөн келген шашылыш кайрылуулар кезеги. Протокол боюнча: байланышуу — тобокелди баалоо — коопсуздукту камсыздоо — документтештирүү."}
          </p>
        </div>
        <Link href="/admin" className="btn-secondary">← {ru ? "В админку" : "Админкага"}</Link>
      </div>

      {/* On-call banner */}
      <div className="rounded-2xl bg-brand-700 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="icon-circle h-10 w-10 bg-white/10 text-white"><IconShield size={18} /></span>
          <div>
            <div className="text-sm font-semibold">
              {ru ? "Дежурный супервайзер" : "Кезметчи супервайзер"}: Айгерим Т.
            </div>
            <div className="text-xs text-mint-200 flex items-center gap-1.5">
              <IconClock size={12} /> {ru ? "Смена до 20:00" : "Кезмет 20:00гө чейин"} · +996 312 000 000
            </div>
          </div>
        </div>
        {openCount > 0 && (
          <span className="rounded-full bg-rose-500 px-3 py-1 text-sm font-semibold">
            {ru ? "Новых" : "Жаңы"}: {openCount}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {CASES.map((cs) => {
          const meta = RISK_META[cs.riskLevel];
          return (
            <div
              key={cs.id}
              className={"card-soft border-l-4 " + (cs.status === "OPEN" ? "border-rose-500" : "border-transparent")}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-800">{cs.pseudonym}</span>
                    <span className={"badge " + meta.badge}>{cs.riskLevel}</span>
                    <span className={"badge " + STATUS_STYLE[cs.status]}>{STATUS_LABEL[cs.status]}</span>
                    <span className="text-xs text-slate-400">
                      {cs.minutesAgo < 60
                        ? `${cs.minutesAgo} ${ru ? "мин назад" : "мүн мурун"}`
                        : `${Math.floor(cs.minutesAgo / 60)} ${ru ? "ч назад" : "саат мурун"}`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{cs.summary}</p>
                </div>
                <a
                  href={`tel:${cs.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 shrink-0"
                >
                  <IconPhone size={16} /> {ru ? "Позвонить" : "Чалуу"}
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn-secondary !py-2 !text-sm opacity-60 cursor-not-allowed">
                  {ru ? "Принять" : "Кабыл алуу"}
                </button>
                <button className="btn-secondary !py-2 !text-sm opacity-60 cursor-not-allowed">
                  {ru ? "На связи" : "Байланышта"}
                </button>
                <button className="btn-secondary !py-2 !text-sm opacity-60 cursor-not-allowed">
                  {ru ? "Закрыть кейс" : "Кейсти жабуу"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-400">
        {ru
          ? "Демо: данные кейсов мок. В рабочей версии кейсы создаются автоматически из скрининга (RiskScreening → CrisisCase), супервайзер получает push/SMS, все действия журналируются."
          : "Демо: кейс маалыматы мок. Иштеген версияда кейстер скринингден автоматтык түрдө түзүлөт, супервайзер push/SMS алат, бардык аракеттер журналга жазылат."}
      </p>
    </div>
  );
}
