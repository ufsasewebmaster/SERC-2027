import type { Metadata } from "next";
import { event, registration } from "@/content/site";

export const siteUrl = "https://serc.ufsase.com";

/** Every indexable route, used by the sitemap. */
export const routes = ["/", "/symposium", "/schedule", "/partners"] as const;

const ogImage = {
  url: "/images/og-lockup.jpg",
  width: 1200,
  height: 1149,
  alt: "SERC 2027 red panda climbing out of a box",
};

/**
 * Child metadata replaces (not merges) parent keys like `openGraph` and `alternates`,
 * so each page builds them here to keep its own title, description, canonical and image.
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} | SASE ${event.name}` : undefined;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: `SASE ${event.name}`,
      locale: "en_US",
      url: path,
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
      images: [ogImage],
    },
  };
}

/** schema.org Event for the homepage, so search results can show the date, place and price. */
export function eventJsonLd() {
  const ticketUrl = registration.paymentLinks[0]?.href ?? siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `SASE ${event.fullName} (${event.name})`,
    alternateName: event.name,
    description: `${event.fullName} for STEM students from SASE chapters across the Southeast: workshops, a career fair, a research symposium, resume reviews and networking.`,
    startDate: event.startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: siteUrl,
    image: [`${siteUrl}${ogImage.url}`],
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gainesville",
        addressRegion: "FL",
        postalCode: "32611",
        addressCountry: "US",
      },
    },
    offers: {
      "@type": "Offer",
      price: registration.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: ticketUrl,
    },
    organizer: {
      "@type": "Organization",
      name: `${event.host} at the ${event.venue}`,
      url: siteUrl,
    },
  };
}

/** Serializes JSON-LD safely for a <script> tag (escapes "<" per the Next.js JSON-LD guide). */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
