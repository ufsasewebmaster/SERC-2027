import type { Metadata } from "next";
import { Fredoka, Lexend, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationTicket from "@/components/RegistrationTicket";
import { event } from "@/content/site";
import { pageMetadata, siteUrl } from "@/lib/seo";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], weight: ["600", "800"] });
const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });

const homeTitle = `SASE ${event.name} | ${event.fullName} at UF`;
const description = `SASE's ${event.fullName} (SERC) comes to UF on ${event.dateLabel}: workshops, a career fair, a research symposium and networking. Register now!`;

const home = pageMetadata({ description, path: "/" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: `%s | SASE ${event.name}` },
  ...home,
  openGraph: { ...home.openGraph, title: homeTitle },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${unbounded.variable} ${lexend.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RegistrationTicket />
      </body>
    </html>
  );
}
