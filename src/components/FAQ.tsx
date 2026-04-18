import { HelpCircle, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LitButton } from "@/components/ui/lit-button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { InteractiveFAQSection } from "./InteractiveFAQSection";

export function FAQ() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative z-10 w-full overflow-hidden bg-transparent">
      
      <Navbar />
      
      <section className="pt-28 pb-16 px-4 sm:px-6 relative z-10 w-full min-h-screen flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_38%)]" />
        <div className="container mx-auto max-w-6xl flex-1 flex flex-col relative z-20">

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-purple-50 mb-6 border border-purple-200">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <TextGenerateEffect
              words="How can we help?"
              className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6 text-gray-900 font-extrabold"
            />
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Find answers, learn about features, and get the most out of PostBoost's platform.
            </p>
          </motion.div>

          {/* Interactive Section */}
          <InteractiveFAQSection />

          {/* Bottom AI Assistant / Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-auto pt-10"
          >
            <div className="group relative max-w-3xl mx-auto rounded-3xl p-[1px] overflow-hidden">
              {/* Glowing animated border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-3xl opacity-50 group-hover:opacity-100 transition duration-1000 -z-10 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
              
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 z-10 h-full border border-gray-100">
                <div className="flex gap-5 items-center sm:items-start text-center sm:text-left">
                  <div className="hidden sm:flex relative shrink-0">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur animate-pulse" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center border-2 border-white">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2">
                      Still can't find your answer?
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                      Our support team is just a click away. We're here to help you succeed.
                    </p>
                  </div>
                </div>
                
                <LitButton
                  onClick={() => navigate('/contact')}
                  className="shrink-0"
                >
                  Contact Support
                </LitButton>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
      
      {/* Footer is already themed globally if it uses normal tailwind classes, which it likely does. */}
      {/* We apply a dark wrapper manually to Footer just in case, but usually natural inheritance works. */}
      <Footer />
    </div>
  );
}

