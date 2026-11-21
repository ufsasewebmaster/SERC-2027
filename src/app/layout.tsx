import type { Metadata } from "next";
import { Fredoka, Lexend, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationTicket from "@/components/RegistrationTicket";
import { event } from "@/content/site";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], weight: ["600", "800"] });
const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });

const description = `${event.fullName} 2027, hosted by SASE at the ${event.venue} on ${event.dateLabel}. ${event.theme}!`;

export const metadata: Metadata = {
  title: { default: `${event.name} | ${event.theme}`, template: `%s | ${event.name}` },
  description,
  openGraph: {
    title: `${event.name} | ${event.theme}`,
    description,
    images: [{ url: "/images/og-lockup.jpg", width: 1200, height: 1149, alt: "SERC 2027 red panda climbing out of a box" }],
  },
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
