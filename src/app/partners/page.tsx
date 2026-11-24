import type { Metadata } from "next";
import Image from "next/image";
import { BoxIcon } from "@/components/decor";
import PageHeader from "@/components/PageHeader";
import { event, partners } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Partners",
  description:
    "Meet the industry partners behind SASE SERC 2027, and learn how your company can recruit STEM students from across the Southeast at the University of Florida.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHeader eyebrow="Partners" title="Industry partners" color="bg-blush">
        <p>
          Our partners lead workshops and meet students through recruiting and networking events at SERC.
        </p>
      </PageHeader>

      <section className="bg-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Our 2027 partners</h2>
          {partners.length > 0 ? (
            <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {partners.map((p) => {
                const logo = (
                  <div className="relative aspect-[3/2] w-full">
                    <Image src={p.logo} alt={p.name} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-contain" />
                  </div>
                );
                return (
                  <li key={p.name} className="sticker grid place-items-center bg-white p-5">
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="w-full">
                        {logo}
                      </a>
                    ) : (
                      logo
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <>
              <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4" aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => (
                  <li
                    key={i}
                    className="grid aspect-[3/2] place-items-center rounded-[1.25rem] border-[3px] border-dashed border-ink/40 bg-cream/60"
                  >
                    <BoxIcon className="w-12 opacity-60" color={["var(--color-sky)", "var(--color-blush)", "var(--color-sage)", "var(--color-star)"][i % 4]} />
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="sticker mx-auto mt-16 max-w-2xl bg-sky p-6 text-center sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">Interested in partnering?</h2>
            <p className="mt-2 text-lg">We&apos;d love to have your company at SERC 2027.</p>
            <a href={`mailto:${event.contactEmail}?subject=SERC%202027%20Partnership`} className="btn mt-5 bg-paper">
              Email {event.contactEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
