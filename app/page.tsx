import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import SegmentMarquee from "@/components/sections/SegmentMarquee";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Thesis from "@/components/sections/Thesis";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import WaitlistCTA from "@/components/sections/WaitlistCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SegmentMarquee />
        <Services />
        <HowItWorks />
        <Thesis />
        <Pricing />
        <FAQ />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
