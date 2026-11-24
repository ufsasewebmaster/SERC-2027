"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { event, registration } from "@/content/site";
import { OPEN_TICKET_EVENT } from "./ticket-events";

/**
 * The raffle ticket that hangs from the top-right corner on every page.
 * It drops in on first load, stays visible while scrolling, and opens the registration pop-up.
 */
export default function RegistrationTicket() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const ticketRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_TICKET_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_TICKET_EVENT, onOpen);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Hand focus back to the ticket so keyboard users don't lose their place.
    requestAnimationFrame(() =>
      ticketRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed top-0 right-3 z-40 sm:right-8">
        <motion.div
          className="pointer-events-auto"
          initial={reduceMotion ? false : { y: -220 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 13,
            delay: reduceMotion ? 0 : 0.35,
          }}
        >
          <motion.div
            style={{ transformOrigin: "50% 0%" }}
            initial={reduceMotion ? false : { rotate: 0 }}
            animate={
              reduceMotion ? undefined : { rotate: [0, -14, 10, -6, 3, -1, 0] }
            }
            transition={{ duration: 2.2, delay: 0.6, ease: "easeOut" }}
            whileHover={
              reduceMotion
                ? undefined
                : { rotate: [0, -4, 3, 0], transition: { duration: 0.6 } }
            }
          >
            {/* the string */}
            <div
              className="mx-auto h-[86px] w-[3px] rounded-full bg-ink sm:h-[92px]"
              aria-hidden="true"
            />
            <div
              className="mx-auto -mt-1 size-3 rounded-full border-[3px] border-ink bg-paper"
              aria-hidden="true"
            />
            <button
              ref={ticketRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="group relative -mt-1 block w-[112px] drop-shadow-[3px_3px_0_var(--color-ink)] sm:w-[224px]"
            >
              <TicketShape className="block w-full" />
              <span className="absolute inset-0 flex items-center">
                <span className="flex w-[30%] items-center justify-center self-stretch">
                  <span className="font-heading text-[0.5rem] font-bold tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 sm:text-[0.75rem]">
                    ADMIT ONE
                  </span>
                </span>
                <span className="flex flex-1 flex-col items-center leading-none">
                  <span className="font-heading text-[0.5rem] font-semibold tracking-[0.18em] sm:text-[0.8rem]">
                    SERC 2027
                  </span>
                  <span className="mt-1 font-display text-[0.62rem] font-extrabold sm:text-[1.05rem]">
                    REGISTER
                  </span>
                  <span className="mt-1 rounded-full bg-ink px-1.5 py-0.5 text-[0.55rem] font-semibold text-paper sm:text-xl">
                    {registration.price}
                  </span>
                </span>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <RegistrationDialog onClose={close} reduceMotion={!!reduceMotion} />
        )}
      </AnimatePresence>
    </>
  );
}

function TicketShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 96" className={className} aria-hidden="true">
      <path
        d="M10 2H150A8 8 0 0 1 158 10V38A10 10 0 0 0 158 58V86A8 8 0 0 1 150 94H10A8 8 0 0 1 2 86V58A10 10 0 0 0 2 38V10A8 8 0 0 1 10 2Z"
        fill="var(--color-star)"
        stroke="var(--color-ink)"
        strokeWidth="3"
      />
      <path
        d="M48 8V88"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <rect
        x="54"
        y="8"
        width="98"
        height="80"
        rx="5"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity=".25"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function RegistrationDialog({
  onClose,
  reduceMotion,
}: {
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const hasForm = Boolean(registration.formUrl);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Escape to close, Tab stays inside the pop-up, page behind doesn't scroll.
  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/55 p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="sticker relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden bg-paper sm:flex-row"
        style={{ transformOrigin: "top right" }}
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.35, x: 220, y: -260, rotate: 8 }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
        exit={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.35, x: 220, y: -260, rotate: 8 }
        }
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        {/* ticket stub */}
        <div className="relative flex shrink-0 items-center gap-4 border-b-[3px] border-dashed border-ink bg-star px-5 py-4 sm:w-52 sm:flex-col sm:justify-center sm:border-r-[3px] sm:border-b-0 sm:px-4 sm:py-8">
          <Image
            src="/images/logo.png"
            alt=""
            width={140}
            height={136}
            className="h-auto w-14 sm:w-32"
          />
          <div className="sm:text-center">
            <p className="font-heading text-sm font-bold tracking-[0.25em]">
              ADMIT ONE
            </p>
            <p className="font-display text-xl font-extrabold leading-tight">
              {event.name}
            </p>
            <p className="text-xl">{event.shortDate}</p>
            <p className="text-base">{event.venue}</p>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration"
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border-[3px] border-ink bg-paper text-xl leading-none font-bold hover:bg-peach"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="block size-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>

          <h2
            id={titleId}
            className="pr-12 font-display text-2xl font-extrabold sm:text-3xl"
          >
            Register for SERC!
          </h2>
          <PriceLine />
          <p className="mt-5 text-lg leading-relaxed">
            Ready to register? Click the button below and follow the steps in our
            registration form to secure your spot!
          </p>

          <ol aria-label="Registration steps" className="mt-6 grid grid-cols-3 gap-2 border-y-2 border-dashed border-ink/25 py-5 sm:gap-4">
            {[
              { label: "Your Details", color: "bg-sky" },
              { label: "Payment", color: "bg-blush" },
              { label: "Receipt", color: "bg-sage" },
            ].map((step, index) => (
              <li key={step.label} className="flex flex-col items-center gap-2 text-center">
                <span aria-hidden="true" className={`grid size-9 place-items-center rounded-full border-2 border-ink font-heading text-sm font-bold shadow-[2px_2px_0_var(--color-ink)] ${step.color}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-xs font-semibold sm:text-sm">{step.label}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            {hasForm ? (
              <a
                href={registration.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full bg-sage text-center text-base sm:text-lg"
              >
                Save My Spot! <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens Google Form in a new tab)</span>
              </a>
            ) : (
              <button type="button" disabled className="btn w-full cursor-not-allowed bg-sage text-base opacity-60 sm:text-lg">
                Save My Spot!
              </button>
            )}
            <p className="mt-3 text-center text-sm text-rust">
              {hasForm ? "Opens Google Forms in a new tab." : "The registration form will be available here soon."}
            </p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink/80">
            Our team will review your payment receipt and confirm your registration.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PriceLine() {
  return (
    <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
      <span className="font-display text-3xl font-extrabold text-rust">
        {registration.price}
      </span>
      <span className="text-base">per person</span>
      <span className="text-sm text-ink/75">
        ({registration.latePrice} after{" "}
        {registration.lateDeadline || "the early deadline"})
      </span>
    </p>
  );
}
