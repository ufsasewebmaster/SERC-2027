import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { event } from "@/content/site";
import PartnerGrid from "@/components/PartnerGrid";
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
      <PageHeader eyebrow="Partners" title="Industry Partners" color="bg-blush">
        <p>
          Our industry partners help bring SERC to life, creating opportunities for students to connect, learn, and grow.
        </p>
      </PageHeader>

      <section className="bg-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Our 2027 Partners</h2>
          <PartnerGrid />
          <p className="mx-auto mt-8 w-fit max-w-full rounded-full border-[3px] border-ink bg-star px-6 py-3 text-center text-lg font-semibold tracking-[0.02em] text-ink shadow-[4px_4px_0_var(--color-ink)] sm:text-xl">More partners coming soon!</p>

          <div className="sticker mx-auto mt-16 max-w-2xl bg-sky p-6 text-center sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">Interested in Partnering?</h2>
            <p className="mt-2 text-lg">We&apos;d love to have you at SERC 2027!</p>
            <a href={`mailto:${event.partnershipEmail}?subject=SERC%202027%20Partnership`} className="btn mt-5 bg-paper">
              Email {event.partnershipEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
