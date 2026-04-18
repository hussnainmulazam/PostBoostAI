import * as React from "react";
import { cn } from "./utils";

interface LitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

const LitButton = React.forwardRef<HTMLButtonElement, LitButtonProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const baseClasses = "p-[3px] relative inline-block";
    const gradientClasses = "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg";
    const contentClasses = cn(
      "px-8 py-2 rounded-[6px] relative group transition duration-200 flex items-center justify-center",
      variant === "default" && "bg-black text-white hover:bg-transparent",
      variant === "outline" && "bg-transparent text-white border border-transparent",
      variant === "ghost" && "bg-transparent text-white",
      className
    );

    return (
      <button
        ref={ref}
        className={baseClasses}
        {...props}
      >
        <div className={gradientClasses} />
        <div className={contentClasses}>
          {children}
        </div>
      </button>
    );
  }
);

LitButton.displayName = "LitButton";

export { LitButton };

