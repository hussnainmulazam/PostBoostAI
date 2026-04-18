import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import NotFound from "./pages/NotFound";

// Lazy load all page components for code splitting
const LandingPage = lazy(() => import("./components/LandingPage").then(m => ({ default: m.LandingPage })));
const AuthPages = lazy(() => import("./components/AuthPages").then(m => ({ default: m.AuthPages })));
const Dashboard = lazy(() => import("./components/Dashboard").then(m => ({ default: m.Dashboard })));
const Blog = lazy(() => import("./components/Blog").then(m => ({ default: m.Blog })));
const BlogDetail = lazy(() => import("./components/BlogDetail").then(m => ({ default: m.BlogDetail })));
const Pricing = lazy(() => import("./components/Pricing").then(m => ({ default: m.Pricing })));
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })));
const FAQ = lazy(() => import("./components/FAQ").then(m => ({ default: m.FAQ })));
const Payment = lazy(() => import("./components/Payment").then(m => ({ default: m.Payment })));

const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-transparent">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

import { GlobalBackground } from "./components/GlobalBackground";
import { FloatingChat } from "./components/FloatingChat";

const queryClient = new QueryClient();

const PaymentRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Payment
      onNavigate={(page) => navigate(`/${page}`)}
      plan={location.state?.plan}
    />
  );
};

const AppContent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen relative text-gray-900 bg-white overflow-hidden">
          <GlobalBackground />
          <FloatingChat />
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<AuthPages page="login" />} />
              <Route path="/signup" element={<AuthPages page="signup" />} />
              <Route path="/forgot-password" element={<AuthPages page="forgot-password" />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard activePage="dashboard" />} />
              <Route path="/content-agent" element={<Dashboard activePage="content-agent" />} />
              <Route path="/social-agent" element={<Dashboard activePage="social-agent" />} />
              <Route path="/connections" element={<Dashboard activePage="connections" />} />
              <Route path="/analytics" element={<Dashboard activePage="analytics" />} />
              <Route path="/settings" element={<Dashboard activePage="settings" />} />
              <Route path="/notifications" element={<Dashboard activePage="notifications" />} />
              <Route path="/data-management" element={<Dashboard activePage="data-management" />} />
              <Route path="/admin" element={<Dashboard activePage="admin" />} />
              <Route path="/all-posts" element={<Dashboard activePage="all-posts" />} />
              <Route path="/payment" element={<PaymentRoute />} />
              
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;

