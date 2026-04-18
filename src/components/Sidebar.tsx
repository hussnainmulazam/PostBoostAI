import { Rocket, X, Sparkles, MoreVertical, SlidersHorizontal, HelpCircle, ChevronRight, User, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal";

interface MenuItem {
  icon: any;
  label: string;
  page: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activePage: string;
  isSidebarOpen: boolean;
  onNavigate: (page: string, params?: any) => void;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  menuItems,
  activePage,
  isSidebarOpen,
  onNavigate,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleNavigation = (page: string, params?: any) => {
    onNavigate(page, params);
    onClose();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200 bg-white shadow-sm ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-72"}`}
    >
      {/* Logo Section */}
      <div className={`p-4 border-b border-gray-100 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} transition-all`}>
        <div
          className={`relative cursor-pointer transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-36 sm:w-44 px-2'}`}
          onClick={() => handleNavigation("dashboard")}
        >
          <img src="/logo.png" alt="PostBoost" className="w-full h-auto object-contain mix-blend-multiply" />
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="flex p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
        )}
        <button
          className={`lg:hidden text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg ${isCollapsed ? 'hidden' : ''}`}
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto space-y-1 ${isCollapsed ? 'p-2' : 'p-3'}`}>
        <div className={`mb-2 transition-all duration-300 ${isCollapsed ? 'h-0 opacity-0 overflow-hidden m-0' : 'h-auto opacity-100'}`}>
          <p className="px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Main Menu
          </p>
        </div>
        {menuItems.map((item, idx) => {
          const isActive = activePage === item.page;
          return (
            <motion.button
              key={idx}
              whileHover={isCollapsed ? {} : { x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.page)}
              className={`group flex w-full items-center rounded-lg py-2 transition-all duration-200 relative ${isCollapsed ? "justify-center px-0" : "gap-2.5 px-2.5"
                } ${isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all ${isActive
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}
              >
                <item.icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 opacity-0 overflow-hidden m-0" : "w-auto opacity-100"
                  } ${isActive ? "text-gray-900" : ""}`}
              >
                {item.label}
              </span>
              {isActive && !isCollapsed && (
                <div className="ml-auto pr-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                </div>
              )}
            </motion.button>
          );
        })}
      </nav>



      {/* Profile Menu Bottom */}
      <div className="p-3 border-t border-gray-100 relative">
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-3 bottom-[calc(100%+8px)] w-[260px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50 py-2"
            >
              {/* Header Card Area */}
              <div
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                onClick={() => { setIsProfileOpen(false); setActiveModal("account"); }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#d97706] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-white">HM</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-gray-900 leading-tight">Hussnain Mulazam</p>
                    <p className="text-[13px] text-gray-500 mt-0.5">Free</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="h-[1px] bg-gray-100 my-2 mx-4" />

              {/* Menu Items */}
              <div className="px-2 space-y-0.5">
                <button
                  onClick={() => { setIsProfileOpen(false); handleNavigation("payment"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Sparkles className="w-[18px] h-[18px] text-gray-600" strokeWidth={2} />
                  Upgrade plan
                </button>
                <button
                  onClick={() => { setIsProfileOpen(false); setActiveModal("personalization"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <SlidersHorizontal className="w-[18px] h-[18px] text-gray-600" strokeWidth={2} />
                  Personalization
                </button>
                <button
                  onClick={() => { setIsProfileOpen(false); setActiveModal("profile"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <User className="w-[18px] h-[18px] text-gray-600" strokeWidth={2} />
                  Profile
                </button>
                <button
                  onClick={() => { setIsProfileOpen(false); setActiveModal("settings"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Settings className="w-[18px] h-[18px] text-gray-600" strokeWidth={2} />
                  Settings
                </button>
              </div>

              <div className="h-[1px] bg-gray-100 my-2 mx-4" />

              {/* Footer Items */}
              <div className="px-2 space-y-0.5">
                <button
                  onClick={() => { setIsProfileOpen(false); setActiveModal("help"); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 text-[15px] text-gray-800">
                    <HelpCircle className="w-[18px] h-[18px] text-gray-600" strokeWidth={2} />
                    Help
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => { setIsProfileOpen(false); setActiveModal("logout"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-[18px] h-[18px] text-gray-600" strokeWidth={2} />
                  Log out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex items-center p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors ${isCollapsed ? 'justify-center border border-transparent hover:border-gray-100' : 'justify-between'}`}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#d97706] to-[#f59e0b] shadow-sm flex items-center justify-center flex-shrink-0 group-hover:shadow transition-all group-hover:scale-105 duration-200">
                <span className="text-[13px] font-bold text-white">HM</span>
              </div>
            </div>

            <div className={`flex flex-col items-start transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-auto opacity-100'}`}>
              <span className="text-[14px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Hussnain Mulazam</span>
              <span className="text-[12px] font-medium text-gray-500">Free Tier</span>
            </div>
          </div>

          <button
            className={`px-3 py-1.5 text-[12px] font-bold bg-white hover:bg-gray-50 border border-gray-200 shadow-sm shadow-black/5 rounded-full text-gray-900 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
            onClick={(e) => { e.stopPropagation(); setIsProfileOpen(false); handleNavigation("pricing"); }}
          >
            Upgrade
          </button>
        </div>
      </div>

      <SettingsModal
        isOpen={!!activeModal}
        initialTab={activeModal === "account" ? "account" : activeModal === "personalization" ? "personalization" : activeModal === "settings" ? "general" : activeModal === "profile" ? "account" : "general"}
        onClose={() => setActiveModal(null)}
      />
    </aside>
  );
}
