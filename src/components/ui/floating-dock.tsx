"use client";

import React from "react";
import { cn } from "./utils";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
  mobileClassName?: string;
  inline?: boolean;
}

export const FloatingDock = ({ items, className, mobileClassName, inline = false }: FloatingDockProps) => {
  const handleClick = (item: DockItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={cn(
        "flex justify-center w-full",
        inline ? "relative" : "absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-full",
        mobileClassName
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center gap-2 sm:gap-3",
          "overflow-x-auto scrollbar-hide",
          "max-w-full",
          inline ? "" : className
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex-shrink-0"
            onClick={() => handleClick(item)}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10",
                "cursor-pointer"
              )}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

