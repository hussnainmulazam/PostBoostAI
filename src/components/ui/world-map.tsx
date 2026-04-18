"use client";

import { motion } from "framer-motion";
import { cn } from "./utils";

interface Dot {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

interface WorldMapProps {
  dots?: Dot[];
  className?: string;
}

// Simple world map SVG with coordinate conversion
const WorldMap = ({ dots = [], className }: WorldMapProps) => {

  // Convert lat/lng to SVG coordinates (Mercator projection simplified)
  const latLngToXY = (lat: number, lng: number, width: number, height: number) => {
    const x = ((lng + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return { x, y };
  };

  // Generate SVG path for a line between two points
  const generatePath = (start: { lat: number; lng: number }, end: { lat: number; lng: number }, width: number, height: number) => {
    const startPoint = latLngToXY(start.lat, start.lng, width, height);
    const endPoint = latLngToXY(end.lat, end.lng, width, height);
    
    // Use great circle arc for better visualization
    const midLat = (start.lat + end.lat) / 2;
    const midLng = (start.lng + end.lng) / 2;
    const midPoint = latLngToXY(midLat, midLng, width, height);
    
    // Adjust curve height for better arc visualization
    const curveHeight = Math.abs(start.lat - end.lat) * 2;
    const controlY = midPoint.y - (curveHeight * height / 180);
    
    return `M ${startPoint.x} ${startPoint.y} Q ${midPoint.x} ${controlY} ${endPoint.x} ${endPoint.y}`;
  };

  return (
    <div className={cn("w-full h-full relative", className)}>
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* World map background (simplified continents) */}
        <g opacity={0.05}>
          {/* Simplified continent shapes - North America */}
          <path
            d="M 150 150 Q 200 130 250 150 T 350 150 Q 400 170 450 150 T 550 150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* South America */}
          <path
            d="M 250 250 Q 300 230 350 250 T 450 250 Q 500 270 550 250"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Europe/Africa */}
          <path
            d="M 450 180 Q 500 160 550 180 T 650 180 Q 700 200 750 180 T 850 180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Asia */}
          <path
            d="M 650 200 Q 700 180 750 200 T 850 200 Q 900 220 950 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Australia */}
          <path
            d="M 750 320 Q 800 300 850 320 T 900 320"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </g>

        {/* Draw connection lines */}
        {dots.map((dot, index) => {
          const path = generatePath(dot.start, dot.end, 1000, 500);
          return (
            <motion.path
              key={index}
              d={path}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Draw dots */}
        {Array.from(new Set(dots.flatMap(dot => [dot.start, dot.end]).map(p => `${p.lat},${p.lng}`)))
          .map((key, index) => {
            const [lat, lng] = key.split(',').map(Number);
            const { x, y } = latLngToXY(lat, lng, 1000, 500);
            return (
              <g key={index}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="currentColor"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.2,
                  }}
                />
              </g>
            );
          })}

        {/* Gradient definition for lines */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WorldMap;

