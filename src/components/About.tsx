import Image from "next/image";
import { about } from "@/content/site";
import { Star } from "./decor";

export default function About() {
  return (
    <section id="about" className="relative bg-peach pt-20 pb-20 sm:pt-24 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="section-title">About SERC</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed sm:text-xl">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {about.stats.map((s, i) => (
                <li
                  key={s.label}
                  className={`sticker px-3 py-4 text-center ${["bg-sky", "bg-blush", "bg-sage"][i % 3]}`}
                >
                  <p className="font-display text-2xl font-extrabold sm:text-4xl">{s.value}</p>
                  <p className="text-sm sm:text-base">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <Star className="absolute -top-4 left-2 w-12 animate-twinkle" color="var(--color-star)" />
            <Image
              src="/images/panda-box.png"
              alt="The SERC red panda diving into a pink cardboard box labelled Unbox Your Potential, January 17"
              width={1000}
              height={1003}
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {about.pillars.map((p, i) => (
            <div key={p.title} className={`sticker p-6 ${i % 2 ? "bg-sky" : "bg-paper"}`}>
              <h3 className="font-heading text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-lg">{p.body}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-16 text-center font-heading text-xl font-semibold tracking-[0.15em] uppercase">From Past SERCs</h3>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {about.photos.map((photo, i) => (
            <li
              key={photo.src}
              className={`sticker bg-paper p-2 pb-3 transition-transform hover:rotate-0 ${
                ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1"][i % 4]
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
              </div>
              <p className="mt-2 text-center font-medium">{photo.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
