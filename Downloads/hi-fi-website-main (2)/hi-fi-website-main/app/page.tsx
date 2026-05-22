import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import TrustedBySection from "./_components/TrustedBySection";
import FeaturesSection from "./_components/FeaturesSection";
import HowItWorks from "./_components/HowItWorks";
import TestimonialsSection from "./_components/TestimonialsSection";
import CTASection from "./_components/CTASection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
