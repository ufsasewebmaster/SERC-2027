import About from "@/components/About";
import Countdown from "@/components/Countdown";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import WhatsInTheBox from "@/components/WhatsInTheBox";
import { eventJsonLd, jsonLdScript } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(eventJsonLd())} />
      <Hero />
      <About />
      <WhatsInTheBox />
      <Team />
      <Countdown />
      <Faq />
    </>
  );
}
