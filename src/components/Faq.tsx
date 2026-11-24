import Link from "next/link";
import { event, faqs } from "@/content/site";
import Accordion from "./Accordion";
import { Wave } from "./decor";

export default function Faq() {
  return (
    <section id="faq" className="relative bg-peach py-20 sm:py-24">
      <Wave color="var(--color-peach)" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">FAQs</h2>
        <div className="mt-10">
          <Accordion
            colors={["bg-paper"]}
            items={faqs.map((f) => ({
              title: f.q,
              content: (
                <>
                  <p>{f.a}</p>
                  {f.link && (
                    <Link href={f.link.href} className="mt-3 inline-block font-semibold text-rust underline underline-offset-4">
                      {f.link.label} →
                    </Link>
                  )}
                </>
              ),
            }))}
          />
        </div>
        <p className="mt-10 text-center text-lg">
          Didn&apos;t find your answer? Email us at{" "}
          <a href={`mailto:${event.partnershipEmail}`} className="font-semibold text-rust underline underline-offset-4">
            {event.partnershipEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
