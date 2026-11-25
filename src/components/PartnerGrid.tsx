import Image from "next/image";
import { partners } from "@/content/partners";
import { BoxIcon } from "./decor";

export default function PartnerGrid() {
  return (
    <>
      {partners.length > 0 ? (
        <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p, i) => {
            const logo = (
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className={
                    p.logoFit === "cover" ? "object-cover" : "object-contain"
                  }
                />
              </div>
            );
            return (
              <li
                key={p.name}
                className={`sticker grid place-items-center bg-white p-5 transition-transform duration-200 motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1 ${i % 2 === 0 ? "motion-safe:hover:-rotate-1 motion-safe:focus-within:-rotate-1" : "motion-safe:hover:rotate-1 motion-safe:focus-within:rotate-1"}`}
              >
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
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
          <ul
            className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
            aria-hidden="true"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <li
                key={i}
                className="grid aspect-[3/2] place-items-center rounded-[1.25rem] border-[3px] border-dashed border-ink/40 bg-cream/60"
              >
                <BoxIcon
                  className="w-12 opacity-60"
                  color={
                    [
                      "var(--color-sky)",
                      "var(--color-blush)",
                      "var(--color-sage)",
                      "var(--color-star)",
                    ][i % 4]
                  }
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
