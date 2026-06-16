import Image from "next/image";
import { asset } from "@/lib/asset";

// Полноширинный баннер с фотоизображением.
// Desktop: текст поверх левой (кремовой) части картинки с мягкой подложкой.
// Mobile: текст в потоке сверху, картинка декоративным блоком снизу.
export function Banner({
  src,
  eyebrow,
  title,
  subtitle,
  actions,
  note,
  imgHeight = "md:h-[440px]",
}: {
  src: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  note?: React.ReactNode;
  imgHeight?: string;
}) {
  const Text = (
    <div className="max-w-xl">
      {eyebrow && <div className="mb-3">{eyebrow}</div>}
      <h1 className="h-display">{title}</h1>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">{subtitle}</p>
      )}
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      {note && <div className="mt-5">{note}</div>}
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        {Text}
        <div className="mt-5 overflow-hidden rounded-3xl shadow-card">
          <Image
            src={asset(src)}
            alt=""
            width={1800}
            height={702}
            className="w-full h-44 sm:h-56 object-cover object-right"
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative overflow-hidden rounded-3xl bg-cream-100 shadow-card">
        <Image
          src={asset(src)}
          alt=""
          width={1800}
          height={702}
          priority
          className={"w-full object-cover " + imgHeight}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-cream-50/85 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-10 lg:px-14">{Text}</div>
        </div>
      </div>
    </>
  );
}
