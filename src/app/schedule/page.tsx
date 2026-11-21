import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SealedBox from "@/components/SealedBox";
import { socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Schedule",
  description: "The SERC 2027 conference schedule is coming soon.",
};

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
