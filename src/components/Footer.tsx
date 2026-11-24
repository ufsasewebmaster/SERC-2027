import Image from "next/image";
import Link from "next/link";
import { event, socials } from "@/content/site";
import SocialIcon from "./SocialIcon";
import { pageLinks, sectionLinks } from "./links";

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-rust text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={64} height={62} />
            <div>
              <p className="font-display text-xl font-extrabold">{event.name}</p>
              <p className="text-cream text-lg">{event.theme}</p>
            </div>
          </div>
          <p className="text-base mt-4 max-w-sm text-cream">
            The {event.fullName}, hosted by the {event.host}.
          </p>
          <ul className="mt-5 flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border-2 border-paper/70 transition-colors hover:bg-paper hover:text-rust"
                >
                  <SocialIcon icon={s.icon} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterList title="Explore" links={sectionLinks} />
        <FooterList title="Pages" links={pageLinks} extra={{ href: `mailto:${event.contactEmail}`, label: "Contact us" }} />
      </div>
      {/* <div className="border-t-2 border-paper/20 px-4 py-5 text-center font-heading text-sm tracking-[0.18em] text-paper">
        SERC 2027 | UNIVERSITY OF FLORIDA | JANUARY 17TH, 2027
      </div> */}
    </footer>
  );
}

function FooterList({
  title,
  links,
  extra,
}: {
  title: string;
  links: { href: string; label: string }[];
  extra?: { href: string; label: string };
}) {
  return (
    <div>
      <h2 className="font-heading text-sm font-semibold tracking-[0.2em] text-cream uppercase">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
        {extra && (
          <li>
            <a href={extra.href} className="hover:underline">
              {extra.label}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
