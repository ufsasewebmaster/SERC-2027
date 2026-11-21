import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SealedBox from "@/components/SealedBox";
import { socials } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Schedule",
  description:
    "The schedule for SASE SERC 2027 on January 17, 2027 at the University of Florida: workshops, career fair, research symposium and networking. Full agenda coming soon.",
  path: "/schedule",
});

export default function SchedulePage() {
  const instagram = socials.find((s) => s.icon === "instagram");
  return (
    <>
      <PageHeader eyebrow="Schedule" title="What's the plan?">
        <p>We&apos;re still packing this box. Give it a try anyway…</p>
      </PageHeader>
      <section className="bg-paper px-4 py-16 sm:py-20">
        <SealedBox />
        {instagram && (
          <p className="mt-10 text-center text-lg">
            Want to know the moment it drops? Follow{" "}
            <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-rust underline underline-offset-4">
              {instagram.handle}
            </a>{" "}
            on Instagram.
          </p>
        )}
      </section>
    </>
  );
}
