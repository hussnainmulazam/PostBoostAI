"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { 
  SiInstagram, SiTiktok, SiX, SiLinkedin, 
  SiYoutube, SiThreads, SiPinterest, SiFacebook 
} from "react-icons/si";
import { BarChart3, MessageSquareText, CalendarDays, Sparkles, TrendingUp, Users } from "lucide-react";

const FeatureCard = ({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.2 }}
      className={`relative group overflow-hidden rounded-3xl bg-white border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.1)] transition-shadow duration-500 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 p-8 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-slate-50 relative overflow-hidden" id="features">
      {/* Background patterns */}
      <div className="absolute inset-0 h-full w-full bg-slate-50">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 xl:px-12">
        <div className="text-center mb-16 sm:mb-20 lg:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 border border-indigo-200"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700 tracking-wide">Next-Gen Capabilities</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight max-w-3xl mx-auto leading-tight px-2">
            Automate your growth. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Multiply your reach.
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 font-medium">
            PostBoost replaces your entire social media team with a single, intelligent platform designed to execute flawlessly at scale.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 mx-auto">
          
          {/* Box 1: Omnichannel */}
          <FeatureCard className="md:col-span-2" delay={0.1}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Omnichannel Master Control</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Upload your content once. Let PostBoost automatically format, resize, and publish it natively across 8 different networks simultaneously.
              </p>
            </div>
            
            <div className="mt-auto pt-6 flex flex-wrap gap-4 items-center bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:-translate-y-1 transition-transform duration-300">
                <SiTiktok size={24} color="#000000" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                <SiInstagram size={24} color="#E1306C" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:-translate-y-1 transition-transform duration-300 delay-100">
                <SiX size={24} color="#000000" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                <SiLinkedin size={24} color="#0A66C2" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:-translate-y-1 transition-transform duration-300 delay-200">
                <SiYoutube size={24} color="#FF0000" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:-translate-y-1 transition-transform duration-300 delay-300">
                <SiPinterest size={24} color="#E60023" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                +2
              </div>
            </div>
          </FeatureCard>

          {/* Box 2: AI Scheduling */}
          <FeatureCard className="md:col-span-1 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white" delay={0.2}>
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pt-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-500/30 blur-xl rounded-full animate-pulse" />
                <CalendarDays className="w-16 h-16 text-indigo-300 relative z-10" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Predictive AI Scheduling</h3>
                <p className="text-indigo-200/80 leading-relaxed text-sm">
                  Stop guessing. Our AI engine continuously scans global algorithmic patterns to literally pinpoint the exact optimal minute to post for maximum organic reach.
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Box 3: Analytics */}
          <FeatureCard className="md:col-span-1" delay={0.3}>
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Unified Analytics Hub</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Track your combined impressions, clicks, and follower growth across all connected accounts inside one breathtaking master dashboard.
            </p>
          </FeatureCard>

          {/* Box 4: Auto-Reply */}
          <FeatureCard className="md:col-span-1 md:col-start-2" delay={0.4}>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <MessageSquareText className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Auto-Reply Agent</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Automatically detect high-value comments from your top fans and engage with personalized AI-generated replies instantly to foster deep community.
            </p>
          </FeatureCard>

          {/* Box 5: Team Collaboration */}
          <FeatureCard className="md:col-span-1 md:col-start-3" delay={0.5}>
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Collaboration</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Invite team members, assign specific platform access, and require approval workflows before any content goes live on your branded social channels.
            </p>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
};

export default memo(Features);
