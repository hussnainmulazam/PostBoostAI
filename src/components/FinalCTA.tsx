"use client";
import { LitButton } from "@/components/ui/lit-button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
                Start boosting your social reach
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Post content to multiple social media platforms at the same time, all-in one place.
              </p>
              <LitButton 
                className="text-xs sm:text-sm md:text-base"
                onClick={() => navigate('/signup')}
              >
                Get started for free →
              </LitButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=75"
                alt="PostBoost Dashboard"
                loading="lazy"
                decoding="async"
                className="relative rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
