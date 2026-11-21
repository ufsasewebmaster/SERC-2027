import Image from "next/image";
import { event } from "@/content/site";
import { Cloud, Sparkle, Star } from "./decor";
import RegisterButton from "./RegisterButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sage pb-24 sm:pb-28">
      <Cloud className="absolute top-10 -left-10 w-48 opacity-90 sm:w-72" color="var(--color-blush)" />
      <Cloud className="absolute top-40 right-[38%] hidden w-40 lg:block" color="var(--color-paper)" />
      <Cloud className="absolute -right-12 bottom-24 w-56 sm:w-80" color="var(--color-paper)" />
      <Star className="absolute top-[18%] left-[46%] hidden w-10 animate-twinkle md:block" color="var(--color-pink)" />
      <Star className="absolute bottom-[22%] left-[8%] w-8 animate-twinkle [animation-delay:1s]" color="var(--color-skyblue)" />
      <Sparkle className="absolute top-[60%] left-[42%] w-6 animate-twinkle [animation-delay:.5s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pt-28 sm:px-6 sm:pt-14 md:grid-cols-[1.1fr_1fr] md:pt-16 lg:px-8">
        <div>
          <p className="inline-block rounded-full border-[3px] border-ink bg-paper px-4 py-1 font-heading text-xs font-semibold tracking-[0.1em] uppercase sm:text-sm sm:tracking-[0.15em]">
            SASE {event.fullName}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-extrabold tracking-tight">
            Unbox your <span className="text-rust">potential</span>
          </h1>
          <p className="mt-5 max-w-xl text-xl sm:text-2xl">
            One day of workshops, a career fair, research, and new friends from across the Southeast.
          </p>
          <dl className="mt-6 flex flex-wrap gap-3 font-heading font-semibold">
            <div className="rounded-xl border-[3px] border-ink bg-paper px-4 py-2">
              <dt className="sr-only">Date</dt>
              <dd>{event.dateLabel}</dd>
            </div>
            <div className="rounded-xl border-[3px] border-ink bg-paper px-4 py-2">
              <dt className="sr-only">Location</dt>
              <dd>{event.venue}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <RegisterButton />
            <a href="#box" className="btn bg-paper text-lg">
              What&apos;s in the box?
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <Image
            src="/images/lockup.png"
            alt="SERC 2027 red panda mascot climbing out of a box that reads Unbox Your Potential"
            width={1100}
            height={1089}
            priority
            sizes="(min-width: 768px) 45vw, 90vw"
            className="animate-float drop-shadow-[6px_8px_0_rgba(74,36,32,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}
