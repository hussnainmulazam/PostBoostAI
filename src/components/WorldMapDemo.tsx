"use client";

import WorldMap from "@/components/ui/world-map";
import { motion } from "framer-motion";
import { memo } from "react";

interface WorldMapDemoProps {
  compact?: boolean;
}

function WorldMapDemo({ compact = false }: WorldMapDemoProps) {
  const dots = [
    {
      start: {
        lat: 64.2008,
        lng: -149.4937,
      }, // Alaska (Fairbanks)
      end: {
        lat: 34.0522,
        lng: -118.2437,
      }, // Los Angeles
    },
    {
      start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
      end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
    },
    {
      start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
      end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // London
      end: { lat: 28.6139, lng: 77.209 }, // New Delhi
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
    },
  ];

  return (
    <div className={`w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 ${compact ? "py-8 sm:py-10" : "py-12 sm:py-20 lg:py-24"}`}>
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`font-bold ${compact ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"} text-white mb-3 sm:mb-4`}
        >
          Global{" "}
          <span className="text-indigo-300">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-2xl mx-auto py-3 sm:py-4 ${compact ? "text-sm sm:text-base" : "text-xs sm:text-sm md:text-base lg:text-lg"} text-slate-300`}
        >
          Connect with users worldwide. PostBoost helps you reach audiences across the globe, 
          breaking free from geographical boundaries.
        </motion.p>
      </div>
      <div className={`w-full ${compact ? "h-[300px] sm:h-[360px] md:h-[420px]" : "h-[400px] sm:h-[500px] md:h-[600px]"} mt-6 sm:mt-8`}>
        <WorldMap dots={dots} className="w-full h-full" />
      </div>
    </div>
  );
}

export default memo(WorldMapDemo);

