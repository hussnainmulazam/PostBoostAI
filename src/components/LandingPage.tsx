import { lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";

// Lazy load below-the-fold components
const AllInOne = lazy(() => import("./AllInOne"));
const HowItWorks = lazy(() => import("./HowItWorks"));
const Platforms = lazy(() => import("./Platforms"));
const Footer = lazy(() => import("./Footer"));

const LoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export function LandingPage() {
  return (
    <div className="bg-transparent min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Suspense fallback={<LoadingFallback />}>
        <AllInOne />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Platforms />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}
