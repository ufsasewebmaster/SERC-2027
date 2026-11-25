import Link from "next/link";
import PartnerGrid from "./PartnerGrid";
import { Wave } from "./decor";

export default function Partners() {
  return (
    <section id="partners" aria-labelledby="partners-heading" className="relative bg-peach py-20 sm:py-24">
      <Wave color="var(--color-peach)" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="partners-heading" className="section-title">Our 2027 Partners</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl">Connect with our industry partners at SERC 2027!</p>
        </div>
        <PartnerGrid />
        <div className="mt-8 text-center">
          <Link href="/partners" className="btn bg-paper text-lg">
            View All Partners
          </Link>
        </div>
      </div>
    </section>
  );
}
