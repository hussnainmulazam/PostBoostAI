"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./utils";

export interface TooltipItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

export const AnimatedTooltip = ({ items, className }: AnimatedTooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-row items-center justify-center -space-x-2 sm:-space-x-3 md:-space-x-2", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={() => setHoveredIndex(idx)}
          onTouchEnd={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                <div className="font-bold text-white relative z-30 text-xs sm:text-sm md:text-base">
                  {item.name}
                </div>
                <div className="text-white text-[10px] sm:text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="relative !m-0 !p-0 object-cover object-top !rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white transition duration-500"
                />
        </div>
      ))}
    </div>
  );
};

