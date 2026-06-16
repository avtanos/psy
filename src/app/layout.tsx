import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LangProvider } from "@/components/lang-provider";

export const metadata: Metadata = {
  title: "PsychKG — психологиялык жардам платформасы",
  description:
    "Текшерилген психологдор менен онлайн-консультациялар, материалдар жана курстар.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D3941",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ky">
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LangProvider>
      </body>
    </html>
  );
}
