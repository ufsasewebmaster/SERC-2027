"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { pageLinks, sectionLinks } from "./links";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper/95 backdrop-blur">
      {/* Right padding leaves room for the hanging registration ticket's string. */}
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-4 pl-4 pr-32 sm:pr-48 lg:pl-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="SERC 2027 home">
          <Image src="/images/logo.png" alt="" width={44} height={43} priority />
          <span className="font-display text-lg font-extrabold tracking-tight">SERC&nbsp;2027</span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1 xl:flex">
          {[...sectionLinks, ...pageLinks].map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 text-[0.95rem] font-medium transition-colors hover:bg-peach ${
                    active ? "bg-sage" : ""
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="ml-auto rounded-full border-[3px] border-ink bg-peach px-4 py-1.5 font-semibold xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t-[3px] border-ink bg-paper xl:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2">
            {[...sectionLinks, ...pageLinks].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-lg font-medium hover:bg-peach"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
