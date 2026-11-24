"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { event, registration } from "@/content/site";
import { OPEN_TICKET_EVENT } from "./ticket-events";

type Step = "form" | "sending" | "pay";

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
              className="group relative -mt-1 block w-[104px] drop-shadow-[3px_3px_0_var(--color-ink)] sm:w-62.5"
            >
              <TicketShape className="block w-full" />
              <span className="absolute inset-0 flex items-center">
                <span className="flex w-[30%] items-center justify-center self-stretch">
                  <span className="font-heading text-[0.5rem] font-bold tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 sm:text-[0.85rem]">
                    ADMIT ONE
                  </span>
                </span>
                <span className="flex flex-1 flex-col items-center leading-none">
                  <span className="font-heading text-[0.5rem] font-semibold tracking-[0.18em] sm:text-[0.9rem]">
                    SERC 2027
                  </span>
                  <span className="mt-1 font-display text-[0.62rem] font-extrabold sm:text-[1.2rem]">
                    REGISTER
                  </span>
                  <span className="mt-1 rounded-full bg-ink px-1.5 py-0.5 text-[0.55rem] font-semibold text-paper sm:text-2xl">
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
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Escape to close, Tab stays inside the pop-up, page behind doesn't scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { formId, fields } = registration.googleForm;
    setError("");

    if (!formId) {
      // No Google Form connected yet (see src/content/site.ts) — go straight to payment.
      setStep("pay");
      return;
    }

    setStep("sending");
    try {
      const body = new URLSearchParams();
      body.set(fields.name, String(data.get("name") ?? "").trim());
      body.set(fields.school, String(data.get("school") ?? "").trim());
      body.set(fields.email, String(data.get("email") ?? "").trim());
      // Google Forms doesn't allow reading the response cross-origin, so this is fire-and-forget.
      await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setStep("pay");
    } catch {
      setStep("form");
      setError(
        "We couldn't save your info — check your connection and try again.",
      );
    }
  }

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
            <p className="font-heading text-s font-bold tracking-[0.25em]">
              ADMIT ONE
            </p>
            <p className="font-display text-xl font-extrabold leading-tight">
              {event.name}
            </p>
            <p className="text-xl">{event.shortDate}</p>
            <p className="text-l">{event.venue}</p>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration"
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border-[3px] border-ink bg-paper text-xl leading-none font-bold hover:bg-peach"
          >
            ×
          </button>

          {step !== "pay" ? (
            <>
              <h2
                id={titleId}
                className="pr-12 font-display text-2xl font-extrabold sm:text-3xl"
              >
                Register for SERC!
              </h2>
              <PriceLine />
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <Field
                  label="Full name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <Field
                  label="School"
                  name="school"
                  autoComplete="organization"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                {error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-blush px-3 py-2 text-sm font-medium"
                  >
                    {error}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                  <button
                    type="submit"
                    disabled={step === "sending"}
                    className="btn bg-sage text-lg disabled:opacity-60"
                  >
                    {step === "sending" ? "Saving…" : "Save my spot →"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("pay")}
                    className="text-sm"
                  >
                    Already filled this out?{" "}
                    <span className="underline underline-offset-4">Go to payment</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2
                id={titleId}
                className="pr-12 font-display text-2xl font-extrabold sm:text-3xl"
              >
                Choose your registration
              </h2>
              <p className="mt-2 text-lg">
                Choose individual or chapter registration to complete payment.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {registration.paymentLinks.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sticker flex h-full flex-col bg-sky px-4 py-4 transition-transform hover:-translate-y-1"
                    >
                      <span className="font-display text-lg font-extrabold">
                        {p.label}&nbsp;↗
                      </span>
                      <span className="text-sm">{p.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <PriceLine />
              <button
                type="button"
                onClick={() => setStep("form")}
                className="mt-4 text-sm underline underline-offset-4"
              >
                ← Edit my info
              </button>
            </>
          )}
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
      <span className="text-2xl">per person</span>
      <span className="text-1xl">
        ({registration.latePrice} after{" "}
        {registration.lateDeadline || "the early deadline"})
      </span>
    </p>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  autoFocus,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className="w-full rounded-xl border-[3px] border-ink bg-white px-3 py-2.5 text-lg outline-none focus:border-slate focus:ring-4 focus:ring-sky"
      />
    </label>
  );
}
