import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BoxIcon } from "@/components/decor";
import { event } from "@/content/site";
import { schedule, type ScheduleActivity } from "@/content/schedule";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Schedule",
  description:
    "Plan your day at SASE SERC 2027 on January 17, 2027 at the Reitz Union, University of Florida. Registration starts at 8 AM; the career fair ends at 8 PM.",
  path: "/schedule",
});

const activityColors: Record<ScheduleActivity["category"], string> = {
  registration: "bg-peach",
  ceremony: "bg-cream",
  workshop: "bg-sky",
  activity: "bg-blush",
  meal: "bg-sage",
  career: "bg-peach",
};

function formatTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
}

function TimeRange({ start, end }: { start: string; end: string }) {
  return (
    <>
      <time dateTime={`2027-01-17T${start}:00-05:00`}>{formatTime(start)}</time>
      <span aria-hidden="true"> – </span><span className="sr-only"> to </span>
      <time dateTime={`2027-01-17T${end}:00-05:00`}>{formatTime(end)}</time>
    </>
  );
}

export default function SchedulePage() {
  const eventDate = new Date(event.startsAt);
  const calendarMonth = eventDate.toLocaleDateString("en-US", { month: "short", timeZone: "America/New_York" });
  const calendarDay = eventDate.toLocaleDateString("en-US", { day: "numeric", timeZone: "America/New_York" });
  const dayStart = schedule[0].activities[0].start;
  const finalActivities = schedule[schedule.length - 1].activities;
  const dayEnd = finalActivities[finalActivities.length - 1].end;
  return (
    <>
      <PageHeader eyebrow="Schedule" title="Your Day at SERC" />

      <section aria-label="Conference schedule" className="bg-paper px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative mx-auto mb-10 w-full max-w-xl text-ink drop-shadow-[3px_3px_0_var(--color-ink)] sm:mb-12">
            <svg aria-hidden="true" viewBox="0 0 560 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path
                d="M16 2H544Q558 2 558 16V74A16 16 0 0 0 558 106V164Q558 178 544 178H16Q2 178 2 164V106A16 16 0 0 0 2 74V16Q2 2 16 2Z"
                fill="var(--color-star)"
                stroke="var(--color-ink)"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="relative grid min-h-44 grid-cols-[5rem_minmax(0,1fr)] px-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:px-4">
              <div aria-hidden="true" className="my-3 flex flex-col items-center justify-center border-r-[3px] border-dashed border-ink px-2 py-4 text-center">
                <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase sm:text-[0.85rem]">{calendarMonth}</span>
                <span className="mt-1 font-display text-3xl leading-none font-extrabold sm:text-5xl">{calendarDay}</span>
              </div>
              <div className="my-3 ml-2 flex min-w-0 flex-col items-center justify-center rounded-lg border border-ink/25 px-3 py-4 text-center sm:ml-3 sm:px-6">
                <p className="font-heading text-xs font-semibold tracking-[0.18em] uppercase sm:text-[0.9rem]">{event.name}</p>
                <h2 className="mt-1 font-display text-base leading-tight font-extrabold uppercase sm:text-[1.2rem]">
                  <time dateTime={event.startsAt.slice(0, 10)}>{event.dateLabel}</time>
                </h2>
                <p className="mt-3 rounded-full bg-ink px-3 py-1 text-xs leading-snug font-semibold text-paper sm:text-base">
                  {formatTime(dayStart)} – {formatTime(dayEnd)}
                </p>
                <p className="mt-2 text-xs font-semibold sm:text-sm">Eastern Time (ET)</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <ol className="relative space-y-6 sm:space-y-8">
              {schedule.map((block, index) => {
                const first = block.activities[0];
                const last = block.activities[block.activities.length - 1];
                const isGroup = block.activities.length > 1;
                return (
                  <li key={first.start} className="relative grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[9rem_2rem_minmax(0,1fr)]">
                    {index < schedule.length - 1 && (
                      <div aria-hidden="true" className="absolute top-[67px] -bottom-[91px] left-4 w-[3px] -translate-x-1/2 bg-rust/30 sm:top-[39px] sm:-bottom-[71px] sm:left-44" />
                    )}
                    <p className="hidden whitespace-nowrap pt-[23px] text-right font-heading text-xs leading-8 font-semibold tabular-nums sm:block">
                      <TimeRange start={first.start} end={last.end} />
                    </p>
                    <div className="relative mt-[51px] rounded-full bg-paper p-0.5 sm:mt-[23px]" aria-hidden="true">
                      <BoxIcon className="size-7" color="var(--color-star)" />
                    </div>
                    {isGroup ? (
                      <div className="sticker min-w-0 bg-paper p-5 sm:px-6">
                        <p className="mb-2 font-heading text-sm leading-5 font-semibold tabular-nums text-rust sm:hidden">
                          <TimeRange start={first.start} end={last.end} />
                        </p>
                        <h2 className="font-heading text-xl leading-8 font-bold sm:text-2xl">{block.title}</h2>
                        <ul className="mt-4 grid gap-3 md:grid-cols-2">
                          {block.activities.map((activity) => (
                            <li key={activity.title} className={`rounded-xl border-2 border-ink p-4 ${activityColors[activity.category]}`}>
                              <p className="font-heading text-sm font-semibold tabular-nums">
                                <TimeRange start={activity.start} end={activity.end} />
                              </p>
                              <h3 className="mt-1 font-heading text-lg font-bold">{activity.title}</h3>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className={`sticker min-w-0 px-5 py-5 sm:px-6 ${activityColors[first.category]}`}>
                        <p className="mb-2 font-heading text-sm leading-5 font-semibold tabular-nums sm:hidden">
                          <TimeRange start={first.start} end={first.end} />
                        </p>
                        <h2 className="font-heading text-xl leading-8 font-bold sm:text-2xl">{first.title}</h2>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
