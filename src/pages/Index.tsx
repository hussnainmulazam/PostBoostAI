import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AllInOne from "@/components/AllInOne";
import HowItWorks from "@/components/HowItWorks";
import Platforms from "@/components/Platforms";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <AllInOne />
      <HowItWorks />
      <Platforms />
      <FAQSection />
      <FinalCTA />
    </div>
  );
};

export default Index;
