"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { event } from "@/content/site";
import RegisterButton from "./RegisterButton";

/* ──────────────────────────────────────────────────────────────
   The "Unbox Your Potential" banner, rebuilt as separate layers:
   ribbon, speech bubble, panda-in-box, alert marks, sparkles,
   confetti and a cloud bank — each animated on its own.
   ────────────────────────────────────────────────────────────── */

const RIBBON = "SOUTHEAST REGIONAL CONFERENCE";

/* ── Clouds ───────────────────────────────────────────────────
   Matches the banner art: wide, shallow billows that overlap one
   another, each with its own thin rust outline and a lighter band
   just inside its top edge. Every billow sits fully inside its
   SVG's viewBox, so nothing gets clipped flat. */

/** One billow: an ellipse much wider than it is tall. */
type Billow = [cx: number, cy: number, rx: number, ry: number];
type CloudLayer = { fill: string; rim: string; billows: Billow[]; base?: number };

const CLOUD_LINE = "var(--color-rust)";

/** Small deterministic PRNG so the clouds prerender identically every time. */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** A row of overlapping billows along a baseline (viewBox units, 1600 wide). */
function billowRow(seed: number, baseY: number, minRx: number, maxRx: number): Billow[] {
  const rand = seeded(seed);
  const between = (lo: number, hi: number) => lo + (hi - lo) * rand();
  const row: Billow[] = [];
  let x = between(-120, 0);
  while (x < 1720) {
    // alternate big and small billows so the edge doesn't read as a row of equal bumps
    const big = rand() > 0.4;
    const rx = big ? between((minRx + maxRx) / 2, maxRx) : between(minRx * 0.7, (minRx + maxRx) / 2);
    row.push([x, baseY + between(-30, 30) - (big ? 0 : 6), rx, rx * between(0.5, 0.62)]);
    x += rx * between(1.1, 1.5);
  }
  return row;
}

/** Top arc of a billow, inset from its outline — the lighter band seen in the art. */
function rimArc([cx, cy, rx, ry]: Billow, inset: number) {
  const ax = rx - inset;
  const ay = ry - inset;
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + ax * Math.cos(a)).toFixed(1)} ${(cy + ay * Math.sin(a)).toFixed(1)}`;
  };
  return `M${pt(205)} A${ax.toFixed(1)} ${ay.toFixed(1)} 0 0 1 ${pt(335)}`;
}

/** Draws billows in order (later ones overlap earlier ones), then fills the body below them. */
function Billows({ layer, line = 3.5, inset = 9 }: { layer: CloudLayer; line?: number; inset?: number }) {
  return (
    <g>
      {layer.billows.map((b, i) => (
        <g key={i}>
          <ellipse cx={b[0]} cy={b[1]} rx={b[2]} ry={b[3]} fill={layer.fill} stroke={CLOUD_LINE} strokeWidth={line} />
          <path d={rimArc(b, inset)} fill="none" stroke={layer.rim} strokeWidth={inset * 0.7} strokeLinecap="round" opacity="0.7" />
        </g>
      ))}
      {layer.base !== undefined && <rect x={-200} y={layer.base} width={2000} height={600} fill={layer.fill} />}
    </g>
  );
}

const BANK_H = 360;
const bankLayers: (CloudLayer & { drift: number; duration: number })[] = [
  // back layers sit lower so they only peek between the front billows, as in the banner
  { fill: "#b8705f", rim: "#cb8d7e", billows: billowRow(7, 236, 170, 250), drift: 18, duration: 16 },
  { fill: "#f2bcb2", rim: "#f9d4cc", billows: billowRow(23, 262, 150, 230), drift: -24, duration: 13 },
  { fill: "var(--color-peach)", rim: "#fff1e2", billows: billowRow(41, 306, 150, 240), drift: 14, duration: 11 },
  // body fill starts at the highest billow centre so no billow's lower outline shows
].map((l) => ({ ...l, base: Math.min(...l.billows.map((b) => b[1])) }));

/** Top-right: a cream cloud tucked into the corner (viewBox 420×240; touches only the top and right edges). */
const cornerRight: CloudLayer = {
  fill: "var(--color-peach)",
  rim: "#fff1e2",
  billows: [
    [150, -24, 110, 62],
    [282, 0, 150, 84],
    [410, 46, 120, 104],
    [430, 168, 74, 60],
  ],
};

function Sparkle({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute animate-twinkle ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true">
      <path
        d="M20 3c1.4 9.2 4.6 13 15 17-10.4 4-13.6 7.8-15 17-1.4-9.2-4.6-13-15-17 10.4-4 13.6-7.8 15-17Z"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const confetti = [
  { className: "left-[3%] top-[30%] h-7 w-4", color: "var(--color-blush)", r: -30, delay: 0 },
  { className: "left-[22%] top-[68%] h-6 w-4", color: "var(--color-star)", r: 25, delay: 1.2 },
  { className: "right-[4%] top-[58%] h-7 w-4", color: "var(--color-star)", r: 35, delay: 0.6 },
  { className: "right-[30%] top-[16%] hidden h-5 w-3 lg:block", color: "var(--color-alert-orange)", r: -15, delay: 2 },
  { className: "left-[44%] top-[80%] hidden h-5 w-3 md:block", color: "var(--color-pink)", r: 50, delay: 1.6 },
];

function Curl({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <svg viewBox="0 0 60 40" className={`absolute animate-drift ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true">
      <path d="M4 34c10 2 14-8 22-10s10 8 4 10-6-12 6-18 18 2 20-6" fill="none" stroke="var(--color-ink)" strokeWidth="7" strokeLinecap="round" />
      <path d="M4 34c10 2 14-8 22-10s10 8 4 10-6-12 6-18 18 2 20-6" fill="none" stroke="var(--color-kraft)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/** The little "!" marks beside the panda's head. */
function AlertMarks({ side, color, reduce }: { side: "left" | "right"; color: string; reduce: boolean }) {
  const flip = side === "right" ? -1 : 1;
  return (
    <motion.svg
      viewBox="0 0 60 60"
      className={`absolute w-[11%] ${side === "left" ? "top-[8%] -left-[2%]" : "top-[2%] -right-[3%]"}`}
      style={{ originX: side === "left" ? 1 : 0, originY: 1 }}
      aria-hidden="true"
      animate={reduce ? undefined : { scale: [1, 1.25, 0.92, 1], rotate: [0, -10 * flip, 6 * flip, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 2.6, delay: 1.8 + (side === "right" ? 0.15 : 0) }}
    >
      <g transform={side === "right" ? "translate(60 0) scale(-1 1)" : undefined} stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M30 8 48 20 28 26Z" fill={color} />
        <path d="M12 30 44 36 20 52Z" fill={color} />
      </g>
    </motion.svg>
  );
}

function SpeechBubble({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[34rem] max-md:order-1 max-md:max-w-[20rem]"
      style={{ originX: 0.85, originY: 0.95 }}
      initial={reduce ? false : { scale: 0, rotate: -14, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 11, delay: 0.75 }}
    >
      <div className={reduce ? "" : "animate-float max-md:animate-none"}>
        <svg viewBox="0 0 520 300" className="w-full drop-shadow-[0_6px_0_rgba(74,36,32,0.12)] md:hidden" aria-hidden="true">
          <path d="M260 18c140 0 238 52 238 124 0 54-48 96-116 114l42 36-88-26c-24 4-50 6-76 6C120 272 22 220 22 144S120 18 260 18Z" fill="var(--color-kraft)" />
        </svg>
        <svg viewBox="0 0 520 380" className="hidden w-full drop-shadow-[0_6px_0_rgba(74,36,32,0.12)] md:block" aria-hidden="true">
          <path
            d="M262 22c140 0 236 70 236 160 0 66-46 116-112 140l58 52-104-38c-24 6-50 8-78 8C120 344 22 274 22 182S122 22 262 22Z"
            fill="var(--color-kraft)"
          />
        </svg>
        {/* both lines share one font, size and case, like the banner lettering */}
        <h1 className="absolute inset-0 flex -rotate-[4deg] flex-col items-center justify-center text-center font-sans text-[clamp(2.1rem,7.6vw,3.7rem)] leading-[0.98] font-bold tracking-tight text-[#8b4436] uppercase max-md:-rotate-2 max-md:pb-[5%] max-md:text-[clamp(1.8rem,7.5vw,2.4rem)]">
          {/* search engines and screen readers get the conference name; the bubble keeps the banner slogan */}
          <span className="sr-only">SASE {event.name}: {event.fullName} at the {event.venue}. </span>
          <span>“Unbox your</span>
          <span>potential!”</span>
        </h1>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const pandaY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const bubbleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-meadow">
      {/* crayon / paper grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .4 0 0 0 0 .25 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* corner clouds */}
      {/* top-left: rust swoosh with a pink ribbon band along its edge (as in the banner) */}
      <motion.svg
        viewBox="0 0 600 360"
        className="absolute top-0 left-0 w-[18rem] sm:w-[30rem] lg:w-[40rem]"
        aria-hidden="true"
        initial={reduce ? false : { x: -80, y: -60, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* every shape leaves the SVG only through its top and left edges (the section's edges), so nothing is cut mid-screen */}
        <path d="M-20 -20H560C470 50 340 66 238 96 138 126 78 186 48 248 30 288 10 318 -20 352Z" fill="#9a5546" />
        <path
          d="M575 -14C480 56 345 80 244 110 146 140 88 198 58 260 40 298 18 328 -16 356"
          fill="none"
          stroke={CLOUD_LINE}
          strokeWidth="36"
        />
        <path
          d="M575 -14C480 56 345 80 244 110 146 140 88 198 58 260 40 298 18 328 -16 356"
          fill="none"
          stroke="#f2bcb2"
          strokeWidth="29"
        />
        <path
          d="M560 -14C468 50 338 72 240 102 142 132 84 190 54 252"
          fill="none"
          stroke="#f9d4cc"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </motion.svg>
      {/* top-right: cream cloud tucked into the corner */}
      <motion.svg
        viewBox="0 0 420 240"
        className="absolute top-0 right-0 w-[13rem] sm:w-[22rem] lg:w-[26rem]"
        aria-hidden="true"
        initial={reduce ? false : { x: 80, y: -60, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      >
        <Billows layer={cornerRight} line={3} inset={8} />
      </motion.svg>

      {/* sparkles + confetti */}
      <Sparkle className="top-[34%] left-[2%] w-8 sm:w-10" />
      <Sparkle className="top-[62%] left-[6%] w-7 sm:w-9" delay={1.1} />
      <Sparkle className="top-[22%] right-[4%] w-8 sm:w-10" delay={0.5} />
      <Sparkle className="top-[66%] right-[2%] hidden w-9 sm:block" delay={1.6} />
      {confetti.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute animate-drift rounded-[3px] border-2 border-ink ${c.className}`}
          style={{ background: c.color, ["--r" as string]: `${c.r}deg`, animationDelay: `${c.delay}s` } as React.CSSProperties}
        />
      ))}
      <Curl className="top-[18%] left-[16%] hidden w-14 md:block" />
      <Curl className="right-[6%] bottom-[34%] w-12 sm:w-16" delay={1.4} />

      {/* ribbon — side padding on lg keeps it clear of the hanging registration ticket */}
      <div className="relative px-4 pt-28 sm:pt-40 lg:px-52 lg:pt-8 max-md:pt-24">
        <div
          className="relative mx-auto flex max-w-4xl items-center justify-center max-md:max-w-[20rem]"
        >
          <RibbonCurl side="left" />
          <p className="relative z-10 flex w-full justify-center rounded-full border-[3px] border-ink bg-paper px-6 py-3 shadow-[0_4px_0_var(--color-ink)] sm:py-4 max-md:rounded-2xl max-md:px-4 max-md:py-2.5">
            <span className="sr-only">{RIBBON}</span>
            <span aria-hidden="true" className="flex flex-col items-center gap-1 font-heading text-xs leading-snug font-bold tracking-[0.12em] text-ink uppercase sm:flex-row sm:gap-[0.6em] sm:text-sm sm:tracking-[0.18em] lg:text-lg xl:text-xl xl:tracking-[0.22em] max-md:flex-col max-md:gap-0.5 max-md:text-xs max-md:tracking-[0.1em]">
              {["SOUTHEAST REGIONAL", "CONFERENCE"].map((line) => (
                <span key={line} className="flex whitespace-nowrap">
                  {line}
                </span>
              ))}
            </span>
          </p>
          <RibbonCurl side="right" />
        </div>
      </div>

      {/* main stage */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pt-8 pb-48 sm:px-6 sm:pb-64 md:grid-cols-[1.05fr_1fr] md:gap-4 md:pt-10 lg:px-8 max-md:gap-3 max-md:pt-5 max-md:pb-36">
        <motion.div style={{ y: bubbleY }} className="order-1 flex flex-col items-center max-md:contents">
          <SpeechBubble reduce={reduce} />
          <motion.div
            className="mt-2 flex flex-col items-center text-center max-md:relative max-md:z-10 max-md:order-3 max-md:mx-auto max-md:w-full max-md:max-w-[22rem]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
          >
            <p className="rounded-full border-[3px] border-ink bg-paper px-4 py-1.5 font-heading font-semibold sm:text-lg max-md:rounded-2xl max-md:text-base">
              <span className="max-md:block">{event.shortDate}</span>
              <span className="max-md:hidden"> | </span>
              <span className="max-md:block">{event.venue}</span>
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:gap-4 max-md:mt-4 max-md:grid max-md:w-full max-md:grid-cols-2">
              <RegisterButton className="bg-star max-md:px-3 max-md:text-sm" />
              <a href="#box" className="btn bg-paper text-lg max-md:px-3 max-md:text-sm">
                What&apos;s in the Box?
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: pandaY }} className="relative z-10 order-2 mx-auto w-[78%] max-w-[26rem] md:w-full max-md:w-[68%] max-md:max-w-[18rem] max-md:transform-none!">
          <motion.div
            style={{ originY: 1 }}
            initial={reduce ? false : { y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.3, ease: "easeOut" }}
          >
            <div className={reduce ? "" : "animate-bob [animation-delay:1.6s]"}>
              <motion.div
                className="relative"
                whileHover={reduce ? undefined : { rotate: [0, -3, 3, -2, 0], transition: { duration: 0.6 } }}
              >
                <AlertMarks side="left" color="var(--color-alert-orange)" reduce={reduce} />
                <AlertMarks side="right" color="var(--color-alert-blue)" reduce={reduce} />
                <Image
                  src="/images/hero-panda-box.png"
                  alt="The SERC red panda peeking over a cardboard box labelled Southeast Regional Conference, January 17th, University of Florida"
                  width={605}
                  height={715}
                  priority
                  sizes="(min-width: 768px) 26rem, 68vw"
                  className="relative h-auto w-full drop-shadow-[0_10px_0_rgba(74,36,32,0.15)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* cloud bank flowing into the About section */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-0 h-[170px] sm:h-[250px]" aria-hidden="true">
        {bankLayers.map((layer, i) => (
          <motion.svg
            key={i}
            viewBox={`0 0 1600 ${BANK_H}`}
            preserveAspectRatio="xMidYMax slice"
            // Wide screens scale the SVG taller than its box; keep the cloud tops visible.
            className="absolute inset-0 h-full w-full overflow-visible"
            initial={reduce ? false : { y: 140 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.15 * i }}
          >
            <motion.g
              animate={reduce ? undefined : { x: [0, layer.drift, 0] }}
              transition={{ duration: layer.duration, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <Billows layer={layer} line={4} inset={10} />
            </motion.g>
          </motion.svg>
        ))}
      </div>
    </section>
  );
}

function RibbonCurl({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`relative z-0 w-6 shrink-0 sm:w-9 ${side === "left" ? "-mr-3 sm:-mr-4" : "-ml-3 -scale-x-100 sm:-ml-4"}`}
      aria-hidden="true"
    >
      <path d="M36 12H18C8 12 4 20 8 26s14 6 16-2-6-10-10-6" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
