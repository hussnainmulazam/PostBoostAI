"use client";
import { Users, Edit3, Send, Rocket, Check, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    icon: ArrowUp,
    number: 1,
    title: "Upload Your Content",
    description: "Upload your images, videos, or other media files to get started with creating your post."
  },
  {
    icon: Users,
    number: 2,
    title: "Select Social Accounts",
    description: "Choose which connected social media accounts you want to publish your content to."
  },
  {
    icon: Edit3,
    number: 3,
    title: "Customize Post Details",
    description: "Add your post caption or individually customize details for each selected platform."
  },
  {
    icon: Send,
    number: 4,
    title: "Schedule or Publish Post",
    description: "Publish your post immediately or schedule it for a specific date and time with timezone support."
  }
];

const HowItWorks = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-2">
            Just 4 steps to start growing your social reach
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Save time and grow your social reach with our intuitive tool
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl shadow-2xl overflow-hidden bg-black"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto rounded-2xl"
            >
              <source src="/vid.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Right Side - How It Works Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === step.number;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredStep(step.number)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`flex gap-3 sm:gap-4 items-start cursor-pointer group p-4 rounded-2xl transition-all duration-300 ${isHovered ? 'bg-blue-50/50 shadow-sm border border-blue-100' : 'bg-transparent border border-transparent'
                    }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${isHovered
                      ? 'bg-blue-600 scale-110'
                      : 'bg-gray-100'
                    }`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isHovered
                        ? 'text-white'
                        : 'text-gray-700'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 ${isHovered
                        ? 'text-blue-600'
                        : 'text-gray-900'
                      }`}>
                      {step.number}. {step.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? 'auto' : 0,
                        marginBottom: isHovered ? 0 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {step.description && (
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
