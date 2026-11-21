import Link from "next/link";
import { whatsInTheBox } from "@/content/site";
import Accordion from "./Accordion";
import { BoxIcon, Sparkle, Wave } from "./decor";
import RegisterButton from "./RegisterButton";

const boxColors = ["var(--color-sky)", "var(--color-blush)", "var(--color-sage)", "var(--color-star)"];

export default function WhatsInTheBox() {
  return (
    <section id="box" className="relative bg-rust py-20 text-ink sm:py-24">
      <Wave color="var(--color-rust)" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-paper">
          <Sparkle className="mx-auto mb-3 w-8" color="var(--color-star)" />
          <h2 className="section-title">So, what&apos;s in the box?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-paper sm:text-xl">
            Every SERC ticket comes packed with a full day of surprises. Open each one to see what&apos;s inside.
          </p>
        </div>
        <div className="mt-10">
          <Accordion
            colors={["bg-paper", "bg-cream"]}
            items={whatsInTheBox.map((item, i) => ({
              title: item.title,
              icon: <BoxIcon className="size-9 shrink-0" color={boxColors[i % boxColors.length]} />,
              content: (
                <>
                  <p>{item.body}</p>
                  {item.link && (
                    <Link href={item.link.href} className="mt-3 inline-block font-semibold text-rust underline underline-offset-4">
                      {item.link.label} →
                    </Link>
                  )}
                </>
              ),
            }))}
          />
        </div>
        <div className="mt-12 text-center">
          <p className="font-display text-2xl font-extrabold text-paper sm:text-3xl">Ready to unbox?</p>
          <div className="mt-5">
            <RegisterButton>Register here!</RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}
