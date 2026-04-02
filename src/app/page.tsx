import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export default function Home() {
  return (
    <ClientShell>
      <main className="overflow-x-hidden">
        <Navbar />
        <Hero />
        <SocialProof />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </ClientShell>
  );
}
