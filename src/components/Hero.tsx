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

/* ── Fluffy clouds ────────────────────────────────────────────
   Each cloud is a union of overlapping puffs. Drawing every puff
   in ink at r+outline first, then filling them all in the cloud
   colour at r, leaves one clean outline around the whole shape. */

type Puff = [cx: number, cy: number, r: number];
type CloudShape = { fill: string; puffs: Puff[]; fillers: [x: number, y: number, w: number, h: number][] };

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

/** A row of big puffs along a baseline with smaller puffs stacked on top. */
function cloudBank(seed: number, baseY: number, minR: number, maxR: number): Puff[] {
  const rand = seeded(seed);
  const between = (lo: number, hi: number) => lo + (hi - lo) * rand();
  const puffs: Puff[] = [];
  let x = -320;
  while (x < 1920) {
    const r = between(minR, maxR);
    const cy = baseY + between(-14, 14);
    puffs.push([x, cy, r]);
    if (rand() > 0.3) {
      const sr = r * between(0.42, 0.62);
      puffs.push([x + r * between(-0.45, 0.45), cy - r * between(0.55, 0.8), sr]);
      if (rand() > 0.6) puffs.push([x + r * between(-0.2, 0.3), cy - r * between(0.95, 1.15), sr * between(0.5, 0.7)]);
    }
    if (rand() > 0.55) puffs.push([x + r * 0.7, cy + r * 0.25, r * between(0.5, 0.7)]);
    x += r * between(1.05, 1.4);
  }
  return puffs;
}

const BANK_BOTTOM = 420;
const cloudLayers: (CloudShape & { drift: number; duration: number })[] = [
  { fill: "var(--color-rust)", puffs: cloudBank(7, 140, 58, 92), fillers: [[-400, 140, 2400, BANK_BOTTOM]], drift: 18, duration: 16 },
  { fill: "var(--color-blush)", puffs: cloudBank(23, 196, 46, 74), fillers: [[-400, 196, 2400, BANK_BOTTOM]], drift: -24, duration: 13 },
  { fill: "var(--color-peach)", puffs: cloudBank(41, 248, 40, 62), fillers: [[-400, 248, 2400, BANK_BOTTOM]], drift: 14, duration: 11 },
];

const cornerLeft: CloudShape[] = [
  {
    fill: "var(--color-rust)",
    puffs: [[30, 20, 85], [130, 0, 75], [220, 14, 62], [296, -4, 52], [360, 6, 36], [-10, 112, 70], [52, 92, 40], [178, 66, 34], [36, 156, 46]],
    fillers: [[-40, -60, 340, 70], [-60, -40, 70, 200]],
  },
  {
    fill: "var(--color-blush)",
    puffs: [[8, 182, 58], [72, 160, 42], [108, 198, 36], [52, 222, 46], [-20, 236, 52], [40, 128, 26]],
    fillers: [[-60, 180, 110, 100]],
  },
];

const cornerRight: CloudShape[] = [
  {
    fill: "var(--color-peach)",
    puffs: [[342, 12, 95], [246, 2, 70], [172, 12, 50], [112, -6, 38], [302, 108, 60], [356, 152, 48], [228, 72, 42], [270, 150, 30]],
    fillers: [[160, -60, 260, 70], [300, -40, 100, 200]],
  },
];

function highlightArc([cx, cy, r]: Puff) {
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + r * 0.66 * Math.cos(a)).toFixed(1)} ${(cy + r * 0.66 * Math.sin(a)).toFixed(1)}`;
  };
  return `M${pt(200)} A${(r * 0.66).toFixed(1)} ${(r * 0.66).toFixed(1)} 0 0 1 ${pt(250)}`;
}

/** Renders cloud shapes: ink pass, colour pass, then soft highlights. */
function Puffs({ shapes, outline, highlightMin }: { shapes: CloudShape[]; outline: number; highlightMin: number }) {
  return (
    <>
      {shapes.map((shape, s) => (
        <g key={s}>
          {shape.puffs.map(([cx, cy, r], i) => (
            <circle key={`o${i}`} cx={cx} cy={cy} r={r + outline} fill="var(--color-ink)" />
          ))}
          {shape.fillers.map(([x, y, w, h], i) => (
            <rect key={`f${i}`} x={x} y={y} width={w} height={h} fill={shape.fill} />
          ))}
          {shape.puffs.map(([cx, cy, r], i) => (
            <circle key={`c${i}`} cx={cx} cy={cy} r={r} fill={shape.fill} />
          ))}
          {shape.puffs
            .filter((p) => p[2] >= highlightMin)
            .map((p, i) => (
              <path
                key={`h${i}`}
                d={highlightArc(p)}
                fill="none"
                stroke="var(--color-paper)"
                strokeOpacity="0.45"
                strokeWidth="4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </g>
      ))}
    </>
  );
}

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
      className="relative mx-auto w-full max-w-[34rem]"
      style={{ originX: 0.85, originY: 0.95 }}
      initial={reduce ? false : { scale: 0, rotate: -14, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 11, delay: 0.75 }}
    >
      <div className={reduce ? "" : "animate-float"}>
        <svg viewBox="0 0 520 380" className="w-full drop-shadow-[0_6px_0_rgba(74,36,32,0.12)]" aria-hidden="true">
          <path
            d="M262 22c140 0 236 70 236 160 0 66-46 116-112 140l58 52-104-38c-24 6-50 8-78 8C120 344 22 274 22 182S122 22 262 22Z"
            fill="var(--color-kraft)"
          />
        </svg>
        <h1 className="absolute inset-0 flex -rotate-[4deg] flex-col items-center justify-center pb-[12%] text-center font-sans leading-[0.92] font-bold text-[#8b4436]">
          <span className="text-[clamp(2.1rem,7.4vw,3.6rem)] tracking-tight">“Unbox your</span>
          <span className="text-[clamp(2.6rem,9.4vw,4.6rem)] tracking-tight">potential!”</span>
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
      <motion.svg
        viewBox="0 0 420 260"
        className="absolute -top-10 -left-24 w-[22rem] sm:-left-16 sm:w-[30rem]"
        aria-hidden="true"
        initial={reduce ? false : { x: -80, y: -60, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Puffs shapes={cornerLeft} outline={3} highlightMin={50} />
      </motion.svg>
      <motion.svg
        viewBox="0 0 360 200"
        className="absolute -top-4 -right-6 w-[15rem] sm:top-0 sm:-right-4 sm:w-[24rem]"
        aria-hidden="true"
        initial={reduce ? false : { x: 80, y: -60, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      >
        <Puffs shapes={cornerRight} outline={3} highlightMin={50} />
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
      <div className="relative px-4 pt-28 sm:pt-40 lg:px-52 lg:pt-8">
        <motion.div
          className="relative mx-auto flex max-w-4xl items-center justify-center"
          initial={reduce ? false : { scaleX: 0.15, opacity: 0, y: -24 }}
          animate={{ scaleX: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
        >
          <RibbonCurl side="left" />
          <p className="relative z-10 flex w-full justify-center rounded-full border-[3px] border-ink bg-paper py-2 shadow-[0_4px_0_var(--color-ink)] sm:py-2.5">
            <span className="sr-only">{RIBBON}</span>
            <span aria-hidden="true" className="flex font-heading text-[0.62rem] font-bold tracking-[0.2em] text-ink uppercase sm:text-sm sm:tracking-[0.42em] xl:text-base xl:tracking-[0.55em]">
              {RIBBON.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.022 }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </span>
          </p>
          <RibbonCurl side="right" />
        </motion.div>
      </div>

      {/* main stage */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pt-8 pb-44 sm:px-6 sm:pb-56 md:grid-cols-[1.05fr_1fr] md:gap-4 md:pt-10 lg:px-8">
        <motion.div style={{ y: bubbleY }} className="order-1 flex flex-col items-center">
          <SpeechBubble reduce={reduce} />
          <motion.div
            className="mt-2 flex flex-col items-center text-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
          >
            <p className="rounded-full border-[3px] border-ink bg-paper px-4 py-1.5 font-heading font-semibold sm:text-lg">
              {event.shortDate} · {event.venue}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:gap-4">
              <RegisterButton />
              <a href="#box" className="btn bg-paper text-lg">
                What&apos;s in the box?
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: pandaY }} className="order-2 mx-auto w-[78%] max-w-[26rem] md:w-full">
          <motion.div
            style={{ originY: 1 }}
            initial={reduce ? false : { y: -520, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: [-520, 0, -26, 0], scaleY: [1, 0.86, 1.05, 1], scaleX: [1, 1.1, 0.97, 1], opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.3, times: [0, 0.5, 0.75, 1], ease: "easeOut" }}
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
                  sizes="(min-width: 768px) 26rem, 78vw"
                  className="relative h-auto w-full drop-shadow-[0_10px_0_rgba(74,36,32,0.15)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* cloud bank flowing into the About section */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-[150px] sm:h-[220px]" aria-hidden="true">
        {cloudLayers.map((layer, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 1600 300"
            preserveAspectRatio="xMidYMax slice"
            className="absolute inset-0 h-full w-full"
            initial={reduce ? false : { y: 140 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.15 * i }}
          >
            <motion.g
              animate={reduce ? undefined : { x: [0, layer.drift, 0] }}
              transition={{ duration: layer.duration, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <Puffs shapes={[layer]} outline={4} highlightMin={55} />
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
