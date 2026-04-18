import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Settings, Bell, SlidersHorizontal, 
  LayoutGrid, Database, Key, Lock, User,
  ChevronDown
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  initialTab?: string;
  onClose: () => void;
}

const TABS = [
  { id: "general", label: "General", icon: Settings },
  { id: "personalization", label: "Personalization", icon: SlidersHorizontal },
  { id: "data", label: "Data controls", icon: Database },
  { id: "security", label: "Security", icon: Key },
  { id: "account", label: "Account", icon: User },
];

export function SettingsModal({ isOpen, initialTab = "general", onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync initialTab when modal opens
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
            className="relative w-full max-w-[1000px] h-[100dvh] md:h-[90vh] md:min-h-[600px] md:max-h-[850px] bg-white md:rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col md:flex-row overflow-hidden ring-1 ring-gray-900/5"
          >
            {/* Left Sidebar / Top Nav on Mobile */}
            <div className="w-full md:w-[280px] bg-[#f8f9fa] border-b md:border-b-0 md:border-r border-gray-100 flex flex-col shrink-0 relative z-10 pt-safe">
              <div className="p-3 md:p-4 pt-4 md:pt-6 flex justify-between items-center md:block">
                <span className="md:hidden font-bold text-[18px] text-gray-900 ml-2 tracking-tight">Settings</span>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-sm rounded-lg transition-all bg-white shadow-sm md:bg-transparent md:shadow-none"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="md:flex-1 overflow-x-auto md:overflow-y-auto px-3 md:px-4 py-3 md:py-4 flex flex-row md:flex-col gap-2 md:space-y-1 custom-scrollbar">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative shrink-0 md:w-full flex items-center gap-2.5 md:gap-3 px-4 py-2.5 md:px-4 md:py-3 rounded-full md:rounded-xl text-[13px] md:text-sm transition-all duration-200 group text-left whitespace-nowrap"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-white rounded-full md:rounded-xl shadow-sm ring-1 ring-black/5"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon 
                        className={`relative z-10 w-[16px] h-[16px] md:w-[18px] md:h-[18px] transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'}`} 
                        strokeWidth={isActive ? 2.5 : 2} 
                      />
                      <span className={`relative z-10 transition-colors ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900 font-medium'}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-white relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="max-w-[700px] mx-auto w-full px-5 py-8 md:px-12 md:py-12 min-h-full flex flex-col"
              >
                
                {/* Header Title */}
                <h2 className="hidden md:block text-[26px] font-bold text-gray-900 tracking-tight shrink-0">
                  {TABS.find(t => t.id === activeTab)?.label || "Settings"}
                </h2>
                <div className="hidden md:block h-px bg-gray-100 w-full mt-4 mb-8 shrink-0" />

                {/* Personalization Specific UI Replica */}
                {activeTab === "personalization" ? (
                  <div className="space-y-10 flex-1">
                    
                    {/* Base Style section */}
                    <div className="group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1 pr-6">
                          <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Base style and tone</label>
                          <p className="text-[13px] text-gray-500 leading-relaxed font-normal">
                            Set the style and tone of how ChatGPT responds to you. This doesn't impact ChatGPT's capabilities.
                          </p>
                        </div>
                        <button className="flex items-center gap-2 text-[14px] text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors border border-gray-200/60 shrink-0 shadow-sm mt-2 sm:mt-0">
                          Default
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Characteristics section */}
                    <div>
                      <div className="space-y-1.5 mb-6">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Characteristics</label>
                        <p className="text-[13px] text-gray-500 leading-relaxed font-normal">
                          Choose additional customizations on top of your base style and tone.
                        </p>
                      </div>

                      <div className="space-y-2">
                        {["Warm", "Enthusiastic", "Headers & Lists", "Emoji"].map((char) => (
                          <div key={char} className="flex items-center justify-between group p-3 hover:bg-gray-50 rounded-xl transition-colors -mx-3">
                            <span className="text-[14px] text-gray-700 font-medium">{char}</span>
                            <button className="flex items-center gap-2 text-[14px] text-gray-600 font-medium bg-white hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors border border-gray-200/60 shadow-sm shrink-0 opacity-80 group-hover:opacity-100">
                              Default
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom instructions section */}
                    <div className="space-y-3 pt-4 border-t border-gray-100 pb-8">
                      <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Custom instructions</label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                        <textarea 
                          placeholder="Additional behavior, style, and tone preferences..."
                          className="relative w-full min-h-[120px] bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 resize-none transition-all shadow-sm max-w-full"
                        />
                      </div>
                    </div>

                  </div>
                ) : activeTab === "general" ? (
                  <div className="space-y-10 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Theme</label>
                      </div>
                      <button className="flex items-center gap-2 text-[14px] text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors border border-gray-200/60">
                        System
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="h-px bg-gray-100 w-full" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Locale</label>
                      </div>
                      <button className="flex items-center gap-2 text-[14px] text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors border border-gray-200/60">
                        English (US)
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="h-px bg-gray-100 w-full" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Clear entire application cache</label>
                        <p className="text-[13px] text-gray-500 leading-relaxed font-normal">Free up local browser storage without logging out.</p>
                      </div>
                      <button className="text-[14px] text-red-600 font-semibold hover:text-red-700 px-3 py-1.5 transition-colors">
                        Clear cache
                      </button>
                    </div>
                  </div>
                ) : activeTab === "data" ? (
                  <div className="space-y-10 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Export data</label>
                        <p className="text-[13px] text-gray-500 leading-relaxed font-normal">Download a copy of all your generated data and logs.</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap">
                        Export
                      </button>
                    </div>
                    <div className="h-px bg-gray-100 w-full" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Delete account</label>
                        <p className="text-[13px] text-gray-500 leading-relaxed font-normal">Permanently purge your account and all associated PostBoostAI cloud data.</p>
                      </div>
                      <button className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg text-sm font-semibold transition-all whitespace-nowrap">
                        Delete my account
                      </button>
                    </div>
                  </div>
                ) : activeTab === "security" ? (
                  <div className="space-y-10 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Two-factor authentication (2FA)</label>
                        <p className="text-[13px] text-gray-500 leading-relaxed font-normal">Add an extra layer of security to your account.</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap">
                        Enable 2FA
                      </button>
                    </div>
                    <div className="h-px bg-gray-100 w-full" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-[15px] text-gray-900 font-semibold tracking-tight">Log out of all devices</label>
                        <p className="text-[13px] text-gray-500 leading-relaxed font-normal">Force sign out everywhere you are currently logged in.</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap">
                        Log out all
                      </button>
                    </div>
                  </div>
                ) : activeTab === "account" ? (
                  <div className="space-y-8 flex-1">
                    <div className="flex items-center gap-6 mb-10">
                       <div className="w-20 h-20 bg-gradient-to-br from-[#d97706] to-[#f59e0b] rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-orange-500/20">
                          HM
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-gray-900">Hussnain Mulazam</h3>
                         <p className="text-gray-500">Free Tier</p>
                       </div>
                    </div>
                    <div className="h-px bg-gray-100 w-full" />
                    
                    <div className="space-y-3">
                      <label className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                      <input 
                        disabled
                        value="hussnain@example.com"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl cursor-not-allowed opacity-70"
                      />
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <label className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Current Plan</label>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl">
                        <div>
                           <p className="font-semibold text-gray-900 text-[15px]">Free Plan</p>
                           <p className="text-sm text-gray-600 mt-1">Limited features. Great for exploration.</p>
                        </div>
                        <button className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg shadow-md transition-all whitespace-nowrap">
                           Upgrade Plan
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
