import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { symposium } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Research Symposium",
  description:
    "Present your research poster at the SASE SERC 2027 Research Symposium at the University of Florida on January 17, 2027. Get judged, get feedback and win awards.",
  path: "/symposium",
});

const highlights = [
  {
    title: "Present",
    body: "Share your poster with students, researchers, and industry professionals from across the Southeast.",
    color: "bg-sky",
  },
  {
    title: "Get feedback",
    body: "Judges evaluate each presentation, and you'll swap ideas with everyone who stops by.",
    color: "bg-blush",
  },
  {
    title: "Win awards",
    body: "Awards include overall best poster, people's choice, and honorable mentions.",
    color: "bg-sage",
  },
];

export default function SymposiumPage() {
  const hasLink = Boolean(symposium.applyUrl);

  return (
    <>
      <PageHeader
        eyebrow="Research Symposium"
        title="Showcase your research"
        color="bg-sky"
      >
        <p>
          Present a research poster to students, researchers, and industry
          professionals from across the Southeast.
        </p>
      </PageHeader>

      <section className="bg-paper px-4 py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <a
            href={hasLink ? symposium.applyUrl : undefined}
            target={hasLink ? "_blank" : undefined}
            rel={hasLink ? "noopener noreferrer" : undefined}
            aria-disabled={!hasLink}
            className={`group flex flex-col items-center ${hasLink ? "" : "cursor-not-allowed"}`}
          >
            <span className="relative grid size-52 place-items-center rounded-full border-[3px] border-ink bg-star shadow-[6px_6px_0_var(--color-ink)] transition-transform group-hover:-translate-y-1 group-hover:rotate-3 sm:size-64">
              <Image
                src={symposium.mascotImage}
                alt=""
                width={260}
                height={253}
                className="h-auto w-[78%] animate-float"
              />
            </span>
            <span className="btn mt-6 bg-rust text-xl text-paper">
              Apply to present
            </span>
          </a>
          {!hasLink && (
            <p className="mt-4 text-center text-ink/80">
              Applications open soon!
            </p>
          )}

          <ul className="mt-16 grid w-full gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <li key={h.title} className={`sticker p-6 ${h.color}`}>
                <h2 className="font-display text-2xl font-extrabold">
                  {h.title}
                </h2>
                <p className="mt-2 text-lg">{h.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid w-full gap-6 sm:grid-cols-2">
            {[
              {
                src: "/images/past-research.jpg",
                alt: "A student presenting a research poster at a past symposium",
              },
              {
                src: "/images/past-poster-2.jpg",
                alt: "Attendees discussing a research poster at a past symposium",
              },
            ].map((p, i) => (
              <div
                key={p.src}
                className={`sticker bg-paper p-2 ${i ? "rotate-1" : "-rotate-1"}`}
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
