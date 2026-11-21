"use client";

import { motion } from "motion/react";

/**
 * A blind box drawn in SVG. The lid is a separate group so it can pop off.
 * `lid` controls the lid: "closed" | "pop" (jiggles up) | "off" (flies away).
 */
export default function BlindBox({
  color,
  label,
  lid = "closed",
  className,
}: {
  color: string;
  label?: string;
  lid?: "closed" | "pop" | "off";
  className?: string;
}) {
  const lidAnim =
    lid === "off"
      ? { y: -40, x: 18, rotate: 22, opacity: 0 }
      : lid === "pop"
        ? { y: [0, -9, -3, -10, -5], rotate: [0, -6, 4, -8, -3] }
        : { y: 0, x: 0, rotate: 0, opacity: 1 };

  return (
    <svg viewBox="0 0 120 134" className={className} aria-hidden="true" overflow="visible">
      {/* shadow */}
      <ellipse cx="60" cy="127" rx="44" ry="5" fill="var(--color-ink)" opacity=".15" />
      {/* body */}
      <rect x="14" y="42" width="92" height="82" rx="7" fill={color} stroke="var(--color-ink)" strokeWidth="3" />
      <path d="M86 45v76" stroke="var(--color-ink)" strokeOpacity=".18" strokeWidth="14" />
      <rect x="53" y="42" width="14" height="82" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
      <circle cx="60" cy="84" r="17" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
      <text x="60" y="92.5" textAnchor="middle" fontSize="24" fontWeight="800" fill="var(--color-ink)" style={{ fontFamily: "var(--font-unbounded)" }}>
        ?
      </text>
      {label && (
        <text x="22" y="117" fontSize="8" fontWeight="700" fill="var(--color-ink)" style={{ fontFamily: "var(--font-lexend)" }}>
          {label}
        </text>
      )}
      {/* lid */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        animate={lidAnim}
        transition={lid === "pop" ? { duration: 0.5 } : { type: "spring", stiffness: 200, damping: 16 }}
      >
        <path d="M44 24c-10-14-26-6-16 2 6 4 14 2 16-2Zm32 0c10-14 26-6 16 2-6 4-14 2-16-2Z" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
        <rect x="7" y="26" width="106" height="22" rx="6" fill={color} stroke="var(--color-ink)" strokeWidth="3" />
        <rect x="53" y="26" width="14" height="22" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M12 32h30" stroke="var(--color-paper)" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      </motion.g>
    </svg>
  );
}
