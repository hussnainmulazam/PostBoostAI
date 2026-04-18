import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ChevronDown, Search, MessagesSquare, LayoutGrid, 
  HelpCircle, Settings, CreditCard, Layers, Rocket
} from "lucide-react";

interface FAQItem {
  id: number;
  category: "General" | "Features" | "Pricing & Billing" | "Account & Setup" | "Support";
  question: string;
  answer: string;
  steps?: string[];
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is PostBoost?",
    answer: "PostBoost is an all-in-one social media scheduling tool that lets you upload content once and post it across multiple social media platforms at the same time - saving you time and growing your social reach instantly.",
  },
  {
    id: 2,
    category: "General",
    question: "What social media platforms does PostBoost support?",
    answer: "PostBoost currently supports 8 major platforms: Instagram, TikTok, X (Twitter), LinkedIn, YouTube, Threads, Pinterest, and Facebook.",
  },
  {
    id: 3,
    category: "Features",
    question: "How does PostBoost work?",
    answer: "It's simple - get started in just four steps:",
    steps: [
      "Upload your photo or video content.",
      "Select the social accounts where you want to publish.",
      "Customize your caption individually per platform.",
      "Publish immediately or schedule for later."
    ]
  },
  {
    id: 4,
    category: "Features",
    question: "How far in advance can I schedule posts?",
    answer: "You can schedule posts up to 3 months ahead of the current date and time in your timezone.",
  },
  {
    id: 5,
    category: "Pricing & Billing",
    question: "Is there a free plan available?",
    answer: "Yes! Our free tier allows you to publish up to 5 posts per month and connect up to 5 social media accounts - completely free, no credit card required.",
  },
  {
    id: 8,
    category: "Pricing & Billing",
    question: "How much does PostBoost cost?",
    answer: "PostBoost offers a Lifetime Access Pro plan for a one-time payment of $99 - unlimited accounts, unlimited posts, priority support, and lifetime updates. No monthly fees ever.",
  },
  {
    id: 11,
    category: "Account & Setup",
    question: "How do I connect my social media accounts?",
    answer: "Connecting your accounts is quick and easy. Follow these steps:",
    steps: [
      "Log into your PostBoost dashboard.",
      "Navigate to the 'Connections' tab on the sidebar.",
      "Click 'Connect' next to your preferred platform.",
      "Authorize the application in the pop-up window."
    ]
  },
  {
    id: 14,
    category: "Support",
    question: "What kind of customer support do you offer?",
    answer: "Pro plan users get priority customer support. You can also reach us anytime through our Contact page.",
  },
];

const categories = [
  { name: "All", icon: HelpCircle },
  { name: "General", icon: Rocket },
  { name: "Features", icon: Layers },
  { name: "Pricing & Billing", icon: CreditCard },
  { name: "Account & Setup", icon: Settings },
  { name: "Support", icon: MessagesSquare },
] as const;

export function InteractiveFAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchValue, setSearchValue] = useState("");
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "chat">("cards");

  const filteredFaqs = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    return faqData.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const searchMatch =
        normalizedSearch.length === 0 ||
        item.question.toLowerCase().includes(normalizedSearch) ||
        item.answer.toLowerCase().includes(normalizedSearch);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchValue]);

  // Spring physics for animations
  const springConfig = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <section className="mt-8 mb-20 relative z-10 w-full max-w-5xl mx-auto">
      {/* Controls: View Toggle and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="relative w-full md:w-96 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search anything..."
              className="h-14 w-full rounded-xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-black/50 px-12 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none backdrop-blur-md transition-all focus:border-indigo-400 focus:bg-white dark:focus:bg-black/80"
            />
          </div>
        </div>

        <div className="flex items-center bg-white/50 dark:bg-black/30 backdrop-blur-md p-1.5 rounded-xl border border-gray-200/50 dark:border-white/10 shrink-0">
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              viewMode === "cards" 
                ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Cards
          </button>
          <button
            onClick={() => setViewMode("chat")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              viewMode === "chat" 
                ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <MessagesSquare className="w-4 h-4" />
            Chat
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                setOpenItemId(null);
              }}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                isActive 
                  ? "text-white" 
                  : "bg-white/60 dark:bg-black/40 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 rounded-full"
                  transition={springConfig}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"}`} />
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results area */}
      {filteredFaqs.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/20 p-12 text-center backdrop-blur-sm"
        >
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">No results found</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Try adjusting your search or category filter.</p>
        </motion.div>
      ) : (
        <div className={viewMode === "cards" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-6"}>
          <AnimatePresence>
            {filteredFaqs.map((item) => {
              const isOpen = openItemId === item.id;
              
              if (viewMode === "chat") {
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springConfig}
                    key={`chat-${item.id}`}
                    className="flex flex-col gap-4"
                  >
                    {/* User asking question */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setOpenItemId(isOpen ? null : item.id)}
                        className="max-w-[85%] sm:max-w-[70%] text-left bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md transition-all hover:scale-[1.02]"
                      >
                        <p className="text-sm font-medium">{item.question}</p>
                      </button>
                    </div>
                    {/* Bot answering */}
                    <AnimatePresence>
                      {isOpen && (
                        <div className="flex justify-start">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="max-w-[85%] sm:max-w-[70%] bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-white/10 px-5 py-4 rounded-2xl rounded-tl-sm shadow-lg backdrop-blur-sm"
                          >
                            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{item.answer}</p>
                            
                            {item.steps && (
                              <div className="mt-4 flex flex-col gap-2">
                                {item.steps.map((step, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * (idx + 1), duration: 0.4 }}
                                    className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50"
                                  >
                                    <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                      {idx + 1}
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{step}</p>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              // Card Mode
              return (
                <motion.div
                  layout
                  key={`card-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={springConfig}
                  className={`group relative rounded-3xl backdrop-blur-md transition-all duration-500 overflow-hidden ${
                    isOpen 
                      ? "bg-white/95 dark:bg-gray-900/95 border-indigo-200 dark:border-indigo-500/30 shadow-[0_8px_32px_rgba(79,70,229,0.15)] md:col-span-2" 
                      : "bg-white/60 dark:bg-gray-900/40 border-gray-200/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-gray-900/70 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1"
                  } border`}
                >
                  <button
                    onClick={() => setOpenItemId(isOpen ? null : item.id)}
                    className="w-full px-6 py-6 text-left flex items-start gap-4"
                  >
                    <div className={`mt-0.5 flex items-center justify-center shrink-0 w-10 h-10 rounded-full transition-colors duration-300 ${isOpen ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-50 dark:group-hover:bg-gray-700 group-hover:text-indigo-500"}`}>
                      {isOpen ? <HelpCircle className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 -rotate-90 group-hover:rotate-0 transition-transform duration-300" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1.5">{item.category}</p>
                      <h4 className={`text-base sm:text-lg font-semibold transition-colors ${isOpen ? "text-indigo-900 dark:text-indigo-100" : "text-gray-900 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"}`}>
                        {item.question}
                      </h4>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-6 pb-6 pt-0 ml-14">
                          <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                            {item.answer}
                          </p>

                          {item.steps && (
                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                              {item.steps.map((step, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                                  className="flex flex-col p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100/50 dark:border-gray-700/50"
                                >
                                  <span className="text-indigo-600 dark:text-indigo-400 font-bold mb-1">Step {idx + 1}</span>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
