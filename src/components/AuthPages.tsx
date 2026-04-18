"use client";
import { LitButton } from "./ui/lit-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Chrome,
  Lock,
  Mail,
  Rocket,
  Sparkles,
  User,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthPagesProps {
  page: "login" | "signup" | "forgot-password";
}

const authCopy: Record<
  AuthPagesProps["page"],
  {
    heroTitle: string;
    heroDescription: string;
    formTitle: string;
    formSubtitle: string;
  }
> = {
  login: {
    heroTitle: "Pick up where you left off with PostBoost",
    heroDescription:
      "Keep your publishing calendar in sync, review approvals, and tap into AI-assisted briefs from one calm, bright workspace.",
    formTitle: "Sign in to your workspace",
    formSubtitle: "Use company email or continue with your provider of choice.",
  },
  signup: {
    heroTitle: "Create your PostBoost workspace in minutes",
    heroDescription:
      "Invite your team, automate content reviews, and let AI schedule across every channel from day one.",
    formTitle: "Create your account",
    formSubtitle: "Start your 14-day trial — no credit card required.",
  },
  "forgot-password": {
    heroTitle: "Need a hand getting back in?",
    heroDescription:
      "We'll send a magic link to your inbox so you can recover access and keep your campaigns on track.",
    formTitle: "Send a reset link",
    formSubtitle: "Enter the email tied to your workspace and we'll handle the rest.",
  },
};

export function AuthPages({ page }: AuthPagesProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (page === "login" || page === "signup") {
        navigate("/dashboard");
      }
    }, 1500);
  };

  const copy = authCopy[page];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-100px)]">
          {/* Left Side - Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col items-center justify-center text-center space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 mb-4"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-64 max-w-[250px] flex items-center justify-center"
              >
                <img src="/logo.png" alt="PostBoost" className="w-full h-auto object-contain" />
              </motion.div>
            </motion.div>
            
            <div className="space-y-6 max-w-lg">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 dark:text-white font-display"
              >
                {copy.heroTitle}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {copy.heroDescription}
              </motion.p>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 mt-8 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">
                {page === "signup" ? "Start your free 14-day trial" : "Welcome back to your workspace"}
              </span>
            </motion.div>
          </motion.div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-48 flex items-center justify-center">
                <img src="/logo.png" alt="PostBoost" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:max-w-lg"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 p-6 sm:p-8">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-900 font-display">{copy.formTitle}</h2>
                  <p className="text-sm text-gray-500">{copy.formSubtitle}</p>
                </div>

                {page !== "forgot-password" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.99 }}
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 transition-colors font-medium shadow-sm"
                    >
                      <Chrome className="h-5 w-5" />
                      Continue with Google
                    </motion.button>

                    <div className="relative text-center">
                      <span className="relative z-10 inline-flex items-center px-4 bg-white/80 backdrop-blur-xl text-gray-500 text-xs uppercase tracking-wider">
                        or continue with email
                      </span>
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                      </div>
                    </div>
                  </>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence mode="wait">
                    {page === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Alex Morgan"
                            className="h-12 border-gray-200 bg-white pl-12 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all"
                            required
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="h-12 border-gray-200 bg-white pl-12 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all"
                        required
                      />
                    </div>
                  </div>

                  {page !== "forgot-password" && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="h-12 border-gray-200 bg-white pl-12 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {page === "login" && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <LitButton
                    type="submit"
                    className="w-full h-12 justify-center text-base font-medium rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        {page === "login" && "Sign In"}
                        {page === "signup" && "Create Account"}
                        {page === "forgot-password" && "Send Reset Link"}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </LitButton>
                </form>

                <div className="text-center text-sm text-gray-600 mt-6">
                  {page === "login" && (
                    <p>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Sign up
                      </button>
                    </p>
                  )}
                  {page === "signup" && (
                    <p>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                  {page === "forgot-password" && (
                    <p>
                      Remember your password?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Back to sign in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
