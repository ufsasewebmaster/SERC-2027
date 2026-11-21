import About from "@/components/About";
import Countdown from "@/components/Countdown";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import WhatsInTheBox from "@/components/WhatsInTheBox";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatsInTheBox />
      <Team />
      <Countdown />
      <Faq />
    </>
  );
}
