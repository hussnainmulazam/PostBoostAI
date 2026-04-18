"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize = 1,
    maxSize = 3,
    speed = 4,
    particleColor = "#ffffff",
    particleDensity = 120,
  } = props;
  
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const initParticles = () => {
      const generatedParticles = Array.from({ length: particleDensity }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * speed + 2,
        delay: Math.random() * speed
      }));
      setParticles(generatedParticles);
    };
    initParticles();
  }, [particleDensity, minSize, maxSize, speed]);

  return (
    <div
      className={cn("h-full w-full absolute inset-0 z-0", className)}
      style={{ background: background || "transparent" }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particleColor,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
