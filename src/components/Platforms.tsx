"use client";
import { 
  SiInstagram, 
  SiTiktok, 
  SiX, 
  SiLinkedin, 
  SiYoutube, 
  SiThreads, 
  SiPinterest, 
  SiFacebook,
  SiSnapchat,
  SiDiscord,
  SiReddit,
  SiTelegram,
  SiWhatsapp,
  SiSpotify
} from "react-icons/si";
import { motion } from "framer-motion";
import { useState } from "react";

const platforms = [
  {
    name: "Instagram",
    icon: SiInstagram,
    description: "Effortlessly schedule and post across all your Instagram accounts.",
    color: "text-pink-600",
    bgGradient: "from-pink-500 to-rose-500",
    users: "2B+",
    category: "Social Media"
  },
  {
    name: "TikTok",
    icon: SiTiktok,
    description: "Easily manage and share content on all TikTok profiles.",
    color: "text-black",
    bgGradient: "from-black to-gray-900",
    users: "1B+",
    category: "Video"
  },
  {
    name: "X / Twitter",
    icon: SiX,
    description: "Seamlessly tweet and engage across all your X / Twitter accounts.",
    color: "text-black",
    bgGradient: "from-gray-900 to-black",
    users: "500M+",
    category: "Social Media"
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    description: "Professionally post and network on all LinkedIn profiles.",
    color: "text-blue-600",
    bgGradient: "from-blue-600 to-blue-700",
    users: "900M+",
    category: "Professional"
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    description: "Efficiently upload and manage videos on all YouTube channels.",
    color: "text-red-600",
    bgGradient: "from-red-600 to-red-700",
    users: "2.7B+",
    category: "Video"
  },
  {
    name: "Threads",
    icon: SiThreads,
    description: "Quickly post and interact across all Threads accounts.",
    color: "text-black",
    bgGradient: "from-gray-800 to-black",
    users: "150M+",
    category: "Social Media"
  },
  {
    name: "Pinterest",
    icon: SiPinterest,
    description: "Easily pin and organize content on all Pinterest boards.",
    color: "text-red-600",
    bgGradient: "from-red-500 to-pink-600",
    users: "500M+",
    category: "Inspiration"
  },
  {
    name: "Facebook",
    icon: SiFacebook,
    description: "Effortlessly post and connect on all Facebook profiles.",
    color: "text-blue-600",
    bgGradient: "from-blue-600 to-blue-800",
    users: "3B+",
    category: "Social Media"
  },
  {
    name: "Snapchat",
    icon: SiSnapchat,
    description: "Create and schedule engaging stories and snaps.",
    color: "text-yellow-500",
    bgGradient: "from-yellow-400 to-yellow-600",
    users: "400M+",
    category: "Messaging"
  },
  {
    name: "Discord",
    icon: SiDiscord,
    description: "Share announcements and updates across Discord servers.",
    color: "text-indigo-500",
    bgGradient: "from-indigo-500 to-purple-600",
    users: "500M+",
    category: "Community"
  },
  {
    name: "Reddit",
    icon: SiReddit,
    description: "Post and engage with communities across Reddit.",
    color: "text-orange-500",
    bgGradient: "from-orange-500 to-red-600",
    users: "430M+",
    category: "Community"
  },
  {
    name: "Telegram",
    icon: SiTelegram,
    description: "Schedule and broadcast messages to Telegram channels.",
    color: "text-blue-500",
    bgGradient: "from-blue-400 to-blue-600",
    users: "800M+",
    category: "Messaging"
  },
  {
    name: "WhatsApp",
    icon: SiWhatsapp,
    description: "Manage and schedule WhatsApp Business messages.",
    color: "text-green-500",
    bgGradient: "from-green-500 to-green-600",
    users: "2B+",
    category: "Messaging"
  },
  {
    name: "Spotify",
    icon: SiSpotify,
    description: "Share and promote your music and podcasts.",
    color: "text-green-500",
    bgGradient: "from-green-500 to-emerald-600",
    users: "600M+",
    category: "Music"
  }
];

const Platforms = () => {
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm font-medium text-blue-600 uppercase tracking-wider"
          >
            Easily connect accounts in 1-click
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-2"
          >
            Supported Platform Integrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"
          >
            Connect all your accounts from multiple social media platforms. Manage everything in one place.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isHovered = hoveredPlatform === index;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredPlatform(index)}
                onMouseLeave={() => setHoveredPlatform(null)}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <div className="relative space-y-3 sm:space-y-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${platform.bgGradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                    <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                        {platform.name}
                      </h3>
                      <span className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {platform.users}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 font-medium">
                      {platform.category}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
