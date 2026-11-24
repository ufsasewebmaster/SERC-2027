import { Cloud, Sparkle, Star } from "./decor";

export default function PageHeader({
  eyebrow,
  title,
  children,
  color = "bg-sage",
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  color?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${color} pt-28 pb-16 sm:pt-20 sm:pb-20`}>
      <Cloud className="absolute top-6 -left-12 w-52 opacity-80" color="var(--color-paper)" />
      <Cloud className="absolute -right-14 bottom-2 w-64 opacity-80" color="var(--color-blush)" />
      <Star className="absolute top-10 right-[18%] w-9 animate-twinkle" color="var(--color-star)" />
      <Sparkle className="absolute bottom-10 left-[14%] w-6 animate-twinkle" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="inline-block rounded-full border-[3px] border-ink bg-paper px-4 py-1 font-heading text-sm font-semibold tracking-[0.15em] uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,7vw,4.5rem)] leading-[0.98] font-extrabold tracking-tight">
          {title}
        </h1>
        {children && <div className="mx-auto mt-5 max-w-2xl text-xl sm:text-2xl">{children}</div>}
      </div>
    </section>
  );
}
