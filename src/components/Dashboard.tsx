import { useState, useMemo, lazy, Suspense, memo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Brain, FileText, Calendar,
  Settings, RefreshCw, Menu, Bell, Link2, User, LogOut, CreditCard, Sparkles, SlidersHorizontal, HelpCircle, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingChat } from "./FloatingChat";
import { Sidebar } from "./Sidebar";

// Lazy load heavy components for better performance
const ContentAgent = lazy(() => import("./ContentAgent").then(m => ({ default: m.ContentAgent })));
const SocialAgent = lazy(() => import("./SocialAgent").then(m => ({ default: m.SocialAgent })));
const Notifications = lazy(() => import("./Notifications").then(m => ({ default: m.Notifications })));
const DataManagement = lazy(() => import("./DataManagement").then(m => ({ default: m.DataManagement })));
const AdminDashboard = lazy(() => import("./AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const Connections = lazy(() => import("./Connections").then(m => ({ default: m.Connections })));
const AllPosts = lazy(() => import("./AllPosts").then(m => ({ default: m.AllPosts })));
const Payment = lazy(() => import("./Payment").then(m => ({ default: m.Payment })));
const DashboardOverview = lazy(() => import("./DashboardOverview").then(m => ({ default: m.DashboardOverview })));

interface DashboardProps {
  activePage: string;
}


const LoadingFallback = memo(() => (
  <div className="flex min-h-screen items-center justify-center bg-transparent">
    <div className="text-center">
      <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-500" />
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

export function Dashboard({ activePage }: DashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer state
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // Notifications dropdown state
  const [navParams, setNavParams] = useState<any>(null);

  const menuItems = useMemo(() => [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: FileText, label: "All Posts", page: "all-posts" },
    { icon: Brain, label: "Content Agent", page: "content-agent" },
    { icon: Calendar, label: "Social Agent", page: "social-agent" },
    { icon: Link2, label: "Connections", page: "connections" },
  ], []);

    const handleNavigation = useCallback((page: string, params?: any) => {
    if (params) setNavParams(params);
    navigate(`/${page}`);
  }, [navigate]);


  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardOverview />
          </Suspense>
        );
      case "content-agent":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ContentAgent onNavigate={handleNavigation} />
          </Suspense>
        );
      case "all-posts":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <AllPosts />
          </Suspense>
        );
      case "social-agent":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <SocialAgent onNavigate={handleNavigation} />
          </Suspense>
        );
      case "connections":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Connections onNavigate={handleNavigation} />
          </Suspense>
        );
      case "payment":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Payment onNavigate={handleNavigation} plan={navParams?.plan || location.state?.plan} />
          </Suspense>
        );
      case "notifications":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Notifications onNavigate={handleNavigation} />
          </Suspense>
        );
      case "data-management":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <DataManagement onNavigate={handleNavigation} />
          </Suspense>
        );
      case "admin":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard onNavigate={handleNavigation} />
          </Suspense>
        );
      default:
        return (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-500">
            Select an option from the sidebar to get started.
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent flex overflow-hidden">

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Component */}
      <Sidebar
        menuItems={menuItems}
        activePage={activePage}
        isSidebarOpen={isSidebarOpen}
        onNavigate={handleNavigation}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen relative z-10 overflow-hidden transition-all duration-300 ease-out ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-xl px-4 py-3 lg:px-8 lg:py-4 relative">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          {/* Centered Page Title */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
            <h2 className="text-lg font-bold text-gray-900 capitalize tracking-tight">
              {activePage.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative">
               <button 
                 onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                 className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
               >
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
               </button>

               <AnimatePresence>
                 {isNotificationsOpen && (
                   <>
                     <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                     <motion.div
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       transition={{ duration: 0.15 }}
                       className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50 flex flex-col"
                     >
                       <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                         <span className="font-semibold text-gray-900">Notifications</span>
                         <span className="text-[11px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">2 New</span>
                       </div>
                       <div className="max-h-[300px] overflow-y-auto">
                         <div className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                           <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                             <Sparkles className="h-4 w-4 text-blue-600" />
                           </div>
                           <div>
                             <p className="text-sm font-medium text-gray-900 leading-tight">Welcome to PostBoostAI</p>
                             <p className="text-xs text-gray-500 mt-1">Your core setup is complete.</p>
                             <p className="text-[10px] font-medium text-gray-400 mt-1.5 uppercase">Just now</p>
                           </div>
                         </div>
                         <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                           <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                             <Brain className="h-4 w-4 text-purple-600" />
                           </div>
                           <div>
                             <p className="text-sm font-medium text-gray-900 leading-tight">Agent Analysis Complete</p>
                             <p className="text-xs text-gray-500 mt-1">Your content agent finalized its review.</p>
                             <p className="text-[10px] font-medium text-gray-400 mt-1.5 uppercase">2 hours ago</p>
                           </div>
                         </div>
                       </div>
                       <button
                         onClick={() => { setIsNotificationsOpen(false); handleNavigation("notifications"); }}
                         className="w-full p-3 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
                       >
                         View all notifications
                       </button>
                     </motion.div>
                   </>
                 )}
               </AnimatePresence>
             </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
               {/* Empty header padding retained */}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
