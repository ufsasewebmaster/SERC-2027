"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { event } from "@/content/site";
import RegisterButton from "./RegisterButton";

/* ──────────────────────────────────────────────────────────────
   Homepage hero: green corrugated cardboard, the crayon
   "SERC 2027" lettering beside the red panda, and a strip of
   "Unbox Your Potential" packing tape along the bottom.
   The lettering, head and stars are slices of /images/logo.png
   (see /public/images/hero).
   ────────────────────────────────────────────────────────────── */

/** Faint doodles printed on the cardboard (one repeating tile). */
const DOODLES =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='420' fill='%23809a63' stroke='%23809a63'%3E%3Cpath d='m60 50 6 13 14 2-10 10 2 14-12-7-13 7 3-14-10-10 14-2z' stroke='none'/%3E%3Cpath d='m300 90 4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z' stroke='none'/%3E%3Cpath d='m190 300 7 15 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2z' stroke='none'/%3E%3Cpath d='m370 330 4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z' stroke='none'/%3E%3Cpath d='M180 60c2 12 5 16 16 18-11 2-14 6-16 18-2-12-5-16-16-18 11-2 14-6 16-18Z' fill='none' stroke-width='2.5' stroke-linejoin='round'/%3E%3Cpath d='M70 250c2 12 5 16 16 18-11 2-14 6-16 18-2-12-5-16-16-18 11-2 14-6 16-18Z' fill='none' stroke-width='2.5' stroke-linejoin='round'/%3E%3Cpath d='M340 200c2 10 4 13 13 15-9 2-11 5-13 15-2-10-4-13-13-15 9-2 11-5 13-15Z' fill='none' stroke-width='2.5' stroke-linejoin='round'/%3E%3Cg fill='none' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M250 170v-10m0 26v10m-13-13h-10m36 0h10m-32-9-7-7m25 25 7 7m0-32-7 7m-18 18-7 7'/%3E%3Cpath d='M110 160c8-10 16 6 24-4s14 2 20-6' stroke-width='6'/%3E%3Cpath d='M260 380c8-10 16 6 24-4' stroke-width='6'/%3E%3C/g%3E%3Ccircle cx='130' cy='110' r='5' stroke='none'/%3E%3Ccircle cx='330' cy='30' r='4' stroke='none'/%3E%3Ccircle cx='30' cy='170' r='4' stroke='none'/%3E%3Ccircle cx='140' cy='380' r='5' stroke='none'/%3E%3Ccircle cx='400' cy='140' r='3' stroke='none'/%3E%3Ccircle cx='300' cy='280' r='4' stroke='none'/%3E%3C/svg%3E\")";

const CORRUGATION = "repeating-linear-gradient(90deg, rgba(70,90,40,0.1) 0 2px, transparent 2px 9px)";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .35 0 0 0 0 .4 0 0 0 0 .2 0 0 0 .5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** The little burst marks around the lettering. */
function Burst({ className, color, delay = 0, reduce }: { className: string; color: string; delay?: number; reduce: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`absolute ${className}`}
      aria-hidden="true"
      animate={reduce ? undefined : { scale: [1, 1.18, 0.94, 1] }}
      transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 2.8, delay: 1.6 + delay }}
    >
      <g fill={color} stroke="rgba(255,248,239,0.75)" strokeWidth="3" strokeLinejoin="round">
        <path d="M52 6 92 44 60 40Z" />
        <path d="M6 22 78 56 12 60Z" />
        <path d="M30 70 70 68 42 88Z" />
      </g>
    </motion.svg>
  );
}

const TAPE_WORDS = [
  { text: "Unbox", color: "#eebdc6" },
  { text: "Your", color: "#d3dc9c" },
  { text: "Potential", color: "#f6cfae" },
];

function TapeStar({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-[0.7em] w-[0.7em] shrink-0" aria-hidden="true">
      <path
        d="m20 4 4.8 10.4 11.2 1.4-8.3 7.8 2.2 11.2L20 29.2l-9.9 5.6 2.2-11.2L4 15.8l11.2-1.4z"
        fill={color}
        stroke="var(--color-rust)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One run of the slogan; repeated so the tape can loop seamlessly. */
function TapeRun() {
  return (
    <span className="flex shrink-0 items-center gap-[0.45em] pr-[0.45em]">
      {TAPE_WORDS.map((w) => (
        <span key={w.text} style={{ color: w.color }}>
          {w.text}
        </span>
      ))}
      <TapeStar color="#a9d3ea" />
      {TAPE_WORDS.map((w) => (
        <span key={w.text} style={{ color: w.color }}>
          {w.text}
        </span>
      ))}
      <TapeStar color="#f1a9b4" />
    </span>
  );
}

function PackingTape() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-1/2 overflow-hidden py-8" aria-hidden="true">
      <div
        className="-mx-6 -rotate-[1.2deg] overflow-hidden bg-[#d8b684] py-2 shadow-[0_5px_0_rgba(74,36,32,0.14)] sm:py-3"
        style={{
          backgroundImage:
            "linear-gradient(100deg, transparent 0 46%, rgba(255,255,255,0.16) 47% 49%, transparent 50%), linear-gradient(rgba(255,248,239,0.22), transparent 30%, rgba(74,36,32,0.08))",
          clipPath:
            "polygon(0 12%, 6% 4%, 13% 9%, 22% 2%, 31% 8%, 43% 3%, 55% 9%, 66% 2%, 78% 8%, 89% 3%, 100% 10%, 100% 90%, 93% 97%, 84% 91%, 73% 98%, 61% 92%, 49% 99%, 37% 93%, 25% 98%, 14% 92%, 5% 97%, 0 91%)",
        }}
      >
        <div className="tape-text flex w-max animate-marquee font-sans text-[clamp(1.6rem,4.6vw,3.6rem)] leading-none font-bold tracking-[0.06em] uppercase">
          <TapeRun />
          <TapeRun />
          <TapeRun />
          <TapeRun />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = !!useReducedMotion();
  const pop = (delay: number) => ({
    initial: reduce ? false : ({ scale: 0.6, opacity: 0 } as const),
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 190, damping: 13, delay },
  });

  return (
    <div className="relative">
    <section className="relative isolate overflow-hidden bg-[#aac38d]">
      {/* cardboard: flutes, printed doodles, paper grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: CORRUGATION }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: DOODLES }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-multiply" style={{ backgroundImage: GRAIN }} />

      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pb-28 md:pt-14 lg:px-8">
        <h1 className="sr-only">
          SASE {event.name}: {event.fullName} at the {event.venue}. {event.theme}!
        </h1>

        <div className="mx-auto grid max-w-4xl items-center gap-2 md:grid-cols-[1fr_1.05fr] md:gap-4">
          {/* crayon lettering */}
          <div className="relative mx-auto w-[72%] max-w-[19rem] -rotate-[5deg] md:w-full md:max-w-[26rem] md:translate-y-4">
            <Burst className="-top-[10%] -left-[20%] w-[22%]" color="var(--color-alert-orange)" reduce={reduce} />
            <motion.div {...pop(0.15)}>
              <Image
                src="/images/hero/serc.png"
                alt=""
                width={453}
                height={178}
                priority
                sizes="(min-width: 768px) 26rem, 72vw"
                className="h-auto w-full drop-shadow-[0_5px_0_rgba(74,36,32,0.14)]"
              />
            </motion.div>
            <motion.div {...pop(0.3)} className="relative mx-auto -mt-[2%] w-[62%] -translate-x-[6%] rotate-[1deg]">
              <Image
                src="/images/hero/2027.png"
                alt=""
                width={429}
                height={179}
                priority
                sizes="(min-width: 768px) 16rem, 45vw"
                className="h-auto w-full drop-shadow-[0_5px_0_rgba(74,36,32,0.14)]"
              />
            </motion.div>
            <Image src="/images/hero/star-yellow.png" alt="" width={122} height={124} className="absolute bottom-[6%] -left-[1%] h-auto w-[12%] animate-twinkle" />
            <Image
              src="/images/hero/star-pink.png"
              alt=""
              width={117}
              height={113}
              className="absolute right-[9%] bottom-[6%] h-auto w-[12%] animate-twinkle [animation-delay:1.2s]"
            />
            <Burst className="-right-[8%] -bottom-[6%] w-[18%] rotate-180" color="#8e6a6a" delay={0.2} reduce={reduce} />
          </div>

          {/* the red panda */}
          <motion.div
            className="mx-auto w-[64%] max-w-[17rem] md:w-full md:max-w-[31rem]"
            initial={reduce ? false : { y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.25, ease: "easeOut" }}
          >
            <div className={reduce ? "" : "animate-bob [animation-delay:1.4s]"}>
              <motion.div whileHover={reduce ? undefined : { rotate: [0, -3, 3, -2, 0], transition: { duration: 0.6 } }}>
                <Image
                  src="/images/hero/head.png"
                  alt="The SERC 2027 red panda mascot"
                  width={629}
                  height={549}
                  priority
                  sizes="(min-width: 768px) 31rem, 64vw"
                  className="h-auto w-full drop-shadow-[0_8px_0_rgba(74,36,32,0.14)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mt-6 flex flex-col items-center text-center sm:mt-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="outlined-text font-sans text-[clamp(1.35rem,4.4vw,2.9rem)] leading-tight font-bold tracking-[0.06em] text-ink [-webkit-text-stroke-color:#fff]">
            <span className="max-sm:block">
              January 17<sup className="text-[0.55em]">th</sup>
            </span>
            <span className="max-sm:hidden"> | </span>
            <span className="max-sm:block">{event.venue}</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-7 sm:gap-6 max-sm:grid max-sm:w-full max-sm:max-w-[22rem] max-sm:grid-cols-2">
            <RegisterButton className="bg-star sm:px-9 sm:py-4 sm:text-2xl max-sm:px-3 max-sm:text-sm" />
            <a href="#box" className="btn bg-paper text-lg sm:px-9 sm:py-4 sm:text-2xl max-sm:px-3 max-sm:text-sm">
              What&apos;s in the Box?
            </a>
          </div>
        </motion.div>
      </div>

    </section>
    <PackingTape />
    </div>
  );
}
