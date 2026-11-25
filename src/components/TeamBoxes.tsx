"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { team, type TeamMember } from "@/content/team";
import BlindBox from "./BlindBox";

const palette = ["var(--color-sky)", "var(--color-blush)", "var(--color-sage)", "var(--color-star)", "var(--color-peach)"];

type Phase = "closed" | "shaking" | "open";

export default function TeamBoxes() {
  const [phases, setPhases] = useState<Phase[]>(() => team.map(() => "closed"));
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const reduceMotion = useReducedMotion();

  function setPhase(i: number, phase: Phase) {
    setPhases((prev) => prev.map((p, j) => (j === i ? phase : p)));
  }

  function toggle(i: number) {
    clearTimeout(timers.current.get(i));
    if (phases[i] !== "closed") {
      setPhase(i, "closed");
      return;
    }
    if (reduceMotion) {
      setPhase(i, "open");
      return;
    }
    setPhase(i, "shaking");
    timers.current.set(
      i,
      setTimeout(() => setPhase(i, "open"), 550),
    );
  }

  const allOpen = phases.every((p) => p === "open");

  return (
    <>
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            timers.current.forEach(clearTimeout);
            setPhases(team.map(() => (allOpen ? "closed" : "open")));
          }}
          className="btn bg-paper"
        >
          {allOpen ? "Close All the Boxes" : "Unbox Everyone"}
        </button>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {team.map((member, i) => (
          <li key={`${member.name}-${i}`}>
            <TeamBox
              member={member}
              index={i}
              phase={phases[i]}
              color={palette[i % palette.length]}
              onToggle={() => toggle(i)}
              reduceMotion={!!reduceMotion}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function TeamBox({
  member,
  index,
  phase,
  color,
  onToggle,
  reduceMotion,
}: {
  member: TeamMember;
  index: number;
  phase: Phase;
  color: string;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const open = phase === "open";

  return (
    <div className="group block w-full [perspective:1000px]">
      <motion.div
        className="relative aspect-[6/7] min-h-[17rem] w-full [transform-style:preserve-3d] max-md:min-h-[14.5rem]"
        animate={{ rotateY: open ? 180 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 15 }}
      >
        {/* front: the closed blind box */}
        <button
          type="button"
          onClick={onToggle}
          tabIndex={open ? -1 : 0}
          aria-hidden={open}
          aria-label={`Mystery box ${index + 1}. Open to meet a team member`}
          className={`absolute inset-0 flex w-full items-end justify-center [backface-visibility:hidden] ${
            phase === "shaking" ? "animate-wiggle" : "transition-transform group-hover:-translate-y-1 group-hover:-rotate-2"
          }`}
        >
          <BlindBox color={color} lid={phase === "shaking" ? "pop" : open ? "off" : "closed"} className="w-full" />
        </button>

        {/* back: the character card */}
        <div
          aria-hidden={!open}
          className="sticker absolute inset-0 flex flex-col items-center overflow-hidden bg-paper px-3 pt-4 pb-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <button
            type="button"
            onClick={onToggle}
            tabIndex={open ? 0 : -1}
            aria-label={`Close ${member.name}'s box`}
            className="absolute inset-0 rounded-[inherit]"
          />
          <div className="pointer-events-none relative mt-1 w-full shrink-0">
            <div aria-hidden="true" className="absolute -inset-x-3 -top-5 -bottom-2" style={{ backgroundColor: color }} />
            <div className="relative mx-auto aspect-square w-[52%] overflow-hidden rounded-full border-[3px] border-ink bg-cream">
              {member.photo ? (
                <Image src={member.photo} alt="" fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover" />
              ) : (
                <Silhouette />
              )}
            </div>
          </div>
          <p className="relative mt-3 font-display text-[clamp(0.8rem,2.6vw,1.05rem)] leading-tight font-extrabold">
            {member.linkedin ? (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="underline underline-offset-4 hover:text-rust" aria-label={`${member.name} on LinkedIn`}>
                {member.name}
              </a>
            ) : (
              <span className="pointer-events-none">{member.name}</span>
            )}
          </p>
          <p className="pointer-events-none mt-1 text-[clamp(0.7rem,2vw,0.85rem)] leading-tight text-ink/80">{member.major}</p>
          <p className="pointer-events-none mt-2 text-[clamp(0.75rem,2.2vw,0.95rem)] leading-tight">{member.position}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Silhouette() {
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      <circle cx="50" cy="40" r="18" fill="var(--color-rose)" />
      <path d="M16 100c2-22 16-34 34-34s32 12 34 34Z" fill="var(--color-rose)" />
    </svg>
  );
}
