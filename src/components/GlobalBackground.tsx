import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 min-h-screen w-full -z-50 bg-white overflow-hidden pointer-events-none">
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.5}
          particleDensity={80}
          className="w-full h-full opacity-60"
          particleColor="#4f46e5"
        />
      </div>
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
}
