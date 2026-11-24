"use client";

import { useEffect, useState } from "react";
import { event } from "@/content/site";
import { Cloud, Sparkle, Star, Wave } from "./decor";

const target = new Date(event.startsAt).getTime();

function remaining(now: number) {
  const diff = Math.max(0, target - now);
  return {
    done: diff === 0,
    parts: [
      { label: "days", value: Math.floor(diff / 86_400_000) },
      { label: "hours", value: Math.floor(diff / 3_600_000) % 24 },
      { label: "minutes", value: Math.floor(diff / 60_000) % 60 },
      { label: "seconds", value: Math.floor(diff / 1000) % 60 },
    ],
  };
}

export default function Countdown() {
  // null until mounted, so the server-rendered HTML never shows a stale time.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const state = now === null ? null : remaining(now);

  return (
    <section id="countdown" className="relative overflow-hidden bg-slate py-20 text-paper sm:py-24">
      <Wave color="var(--color-slate)" />
      <Cloud className="absolute top-8 -left-16 w-60 opacity-20" />
      <Cloud className="absolute -right-10 bottom-6 w-72 opacity-20" />
      <Star className="absolute top-16 right-[12%] w-10 animate-twinkle" color="var(--color-star)" />
      <Sparkle className="absolute bottom-16 left-[10%] w-7 animate-twinkle" color="var(--color-paper)" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2 className="section-title">Countdown to Unboxing</h2>
        {/* <p className="mt-3 text-lg text-paper sm:text-xl">
          {event.dateLabel} · {event.venue}
        </p> */}

        {state?.done ? (
          <p className="mx-auto mt-10 inline-block sticker bg-star px-8 py-6 font-display text-3xl font-extrabold text-ink">
            SERC 2027 is happening now!
          </p>
        ) : (
          <ol className="mt-10 grid grid-cols-4 gap-2 sm:gap-5" aria-label="Time until SERC 2027">
            {(state?.parts ?? remaining(target).parts).map((p, i) => (
              <li key={p.label} className={`sticker px-1 py-4 text-ink sm:py-7 ${["bg-paper", "bg-peach", "bg-sky", "bg-blush"][i]}`}>
                <span className="block font-display text-[clamp(1.75rem,7vw,4.5rem)] leading-none font-extrabold tabular-nums">
                  {state ? String(p.value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 block font-heading text-xs font-semibold tracking-[0.15em] uppercase sm:text-sm">
                  {p.label}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
