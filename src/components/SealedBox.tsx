"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import BlindBox from "./BlindBox";

export default function SealedBox() {
  const [tries, setTries] = useState(0);
  const [shaking, setShaking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduceMotion = useReducedMotion();

  function attempt() {
    setTries((t) => t + 1);
    if (reduceMotion) return;
    clearTimeout(timer.current);
    setShaking(false);
    // restart the wiggle on every click
    requestAnimationFrame(() => {
      setShaking(true);
      timer.current = setTimeout(() => setShaking(false), 600);
    });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-xs sm:max-w-sm">
        <AnimatePresence>
          {tries > 0 && (
            <motion.div
              key="bubble"
              role="status"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="sticker absolute -top-6 left-1/2 z-10 w-[min(22rem,90vw)] -translate-x-1/2 -translate-y-full bg-paper px-5 py-4 text-center"
            >
              <p className="font-display text-lg font-extrabold">Not quite ready to unbox!</p>
              <p className="mt-1">Our full conference schedule is coming soon.</p>
              <span
                aria-hidden="true"
                className="absolute -bottom-[11px] left-1/2 size-5 -translate-x-1/2 rotate-45 border-r-[3px] border-b-[3px] border-ink bg-paper"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={attempt}
          aria-label="Try to open the schedule box"
          className={`relative mt-36 block w-full cursor-pointer sm:mt-32 ${shaking ? "animate-wiggle" : "transition-transform hover:-rotate-2"}`}
        >
          <BlindBox color="var(--color-rose)" lid={shaking ? "pop" : "closed"} className="w-full" />
          {/* packing tape + sticker so it reads as sealed */}
          <svg viewBox="0 0 120 134" className="pointer-events-none absolute inset-0 w-full" aria-hidden="true">
            <path d="M10 52 110 30" stroke="var(--color-star)" strokeWidth="11" opacity=".9" />
            <path d="M10 52 110 30" stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray="2 6" />
            <g transform="rotate(-10 86 104)">
              <rect x="66" y="96" width="42" height="16" rx="3" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.5" />
              <text x="87" y="107.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="var(--color-rust)" style={{ fontFamily: "var(--font-lexend)" }}>
                SEALED
              </text>
            </g>
          </svg>
        </button>
      </div>
      <p className="mt-6 text-lg">{tries === 0 ? "Tap the box to peek inside…" : tries < 4 ? "The tape is holding strong." : "Nice try! It's really sealed shut."}</p>
    </div>
  );
}
