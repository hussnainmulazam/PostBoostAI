"use client";
import { LitButton } from "@/components/ui/lit-button";
import { Star, Sparkles } from "lucide-react";
import { useState, useEffect, useMemo, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FloatingDock } from "@/components/ui/floating-dock";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { X as CloseIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { 
  SiInstagram, 
  SiTiktok, 
  SiX, 
  SiYoutube, 
  SiThreads, 
  SiPinterest, 
  SiFacebook 
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

const platforms = ["TikTok", "Instagram", "X", "LinkedIn", "YouTube", "Threads", "Pinterest", "Facebook"];

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
];

const socialPlatforms = [
  { title: "TikTok", icon: SiTiktok, color: "#000000" },
  { title: "Instagram", icon: SiInstagram, color: "#E1306C" },
  { title: "X (Twitter)", icon: SiX, color: "#000000" },
  { title: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2" },
  { title: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { title: "Threads", icon: SiThreads, color: "#000000" },
  { title: "Pinterest", icon: SiPinterest, color: "#E60023" },
  { title: "Facebook", icon: SiFacebook, color: "#1877F2" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const Hero = () => {
  const navigate = useNavigate();
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const hoverCooldownRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverCooldownRef.current) return;
    setIsVideoHovered(true);
  };

  const handleClose = () => {
    setIsVideoHovered(false);
    hoverCooldownRef.current = setTimeout(() => {
      hoverCooldownRef.current = null;
    }, 500);
  };

  useEffect(() => {
    let initialScrollY = window.scrollY;

    const handleScroll = () => {
      if (isVideoHovered && Math.abs(window.scrollY - initialScrollY) > 10) {
        handleClose();
      }
    };

    if (isVideoHovered) {
      initialScrollY = window.scrollY;
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVideoHovered]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatformIndex((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const dockItems = useMemo(
    () =>
      socialPlatforms.map(({ title, icon: Icon, color }) => ({
        title,
        icon: <Icon className="h-full w-full" style={{ color }} />,
        href: "#",
      })),
    [],
  );

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-12 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-transparent">
      <div className="container mx-auto relative z-10 px-2 sm:px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 xl:gap-32 items-center text-left"
        >
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-purple-50 border border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                <span className="text-xs sm:text-sm font-medium text-purple-600">
                  The simplest tool to boost your social reach is now live
                </span>
                <span className="text-purple-600 text-xs sm:text-sm">{'>'}</span>
              </motion.div>

              <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] sm:leading-tight tracking-tight">
                Schedule content on{" "}
                <span className="inline-block relative min-w-[140px] sm:min-w-[160px] md:min-w-[180px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentPlatformIndex}
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, rotateX: 90 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                      {platforms[currentPlatformIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                <span className="text-gray-900">- in seconds</span>
              </h1>

              <div className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                <TextGenerateEffect
                  words="Schedule and post content across multiple social media platforms using PostBoost. Boost your social reach instantly."
                  className="font-normal"
                />
              </div>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <LitButton
                className="px-8 sm:px-16 md:px-24 lg:px-40 py-3 sm:py-2 text-sm md:text-base w-full sm:w-auto overflow-hidden text-center justify-center"
                onClick={() => navigate('/signup')}
            >
                Get Lifetime Access
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </LitButton>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-5">
              <AnimatedTooltip items={people} />
              <div className="flex flex-col gap-1 items-center sm:items-start">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium text-center sm:text-left">
                  Trusted by 100s of creators
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative lg:mt-0 mt-8 sm:mt-10 md:mt-12 group"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-20"
            />
            {/* The Normal Video Thumbnail */}
            <motion.div
              onMouseEnter={handleMouseEnter}
              className={`relative rounded-2xl shadow-2xl overflow-hidden bg-black border border-gray-800 cursor-pointer transition-all duration-300 ${isVideoHovered ? 'opacity-0 scale-95' : 'opacity-100 hover:scale-[1.02]'}`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto"
              >
                <source src="/vid.mp4" type="video/mp4" />
              </video>
            </motion.div>

            {/* The Fullscreen Video Overlay */}
            {typeof document !== 'undefined' && createPortal(
              <AnimatePresence>
                {isVideoHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
                  >
                    <div 
                      className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-pointer" 
                      onClick={handleClose}
                    />
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleClose(); }}
                      className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer pointer-events-auto border border-white/10 shadow-lg"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </button>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      className="relative z-[9999] w-full max-w-6xl rounded-3xl shadow-[0_0_100px_rgba(79,70,229,0.4)] overflow-hidden bg-black ring-1 ring-white/10"
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto max-h-[85vh] object-contain"
                      >
                        <source src="/vid.mp4" type="video/mp4" />
                      </video>

                      {/* Subtle close hint for users */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest font-medium pointer-events-none">
                        CLICK ANYWHERE TO CLOSE
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 w-full"
        >
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 px-2 sm:px-4">
            <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-600 text-center">
              Supported platforms:
            </h3>
            <FloatingDock
              inline={true}
              mobileClassName="translate-y-0 w-full"
              className="w-full sm:w-auto"
              items={dockItems}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);
