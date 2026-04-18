import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
  id: number;
  category: "General" | "Features" | "Pricing & Billing" | "Account & Setup" | "Support";
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is PostBoost?",
    answer:
      "PostBoost is an all-in-one social media scheduling tool that lets you upload content once and post it across multiple social media platforms at the same time - saving you time and growing your social reach instantly.",
  },
  {
    id: 2,
    category: "General",
    question: "What social media platforms does PostBoost support?",
    answer:
      "PostBoost currently supports 8 major platforms: Instagram, TikTok, X (Twitter), LinkedIn, YouTube, Threads, Pinterest, and Facebook.",
  },
  {
    id: 3,
    category: "Features",
    question: "How does PostBoost work?",
    answer:
      "It's simple - just 4 steps: (1) Upload your content, (2) Select the social accounts, (3) Customize your caption per platform, and (4) Publish immediately or schedule for later.",
  },
  {
    id: 4,
    category: "Features",
    question: "How far in advance can I schedule posts?",
    answer:
      "You can schedule posts up to 3 months ahead of the current date and time in your timezone.",
  },
  {
    id: 5,
    category: "Features",
    question: "Can I manage and edit my scheduled posts?",
    answer:
      "Yes! PostBoost lets you view all your posted and scheduled content in one place, and you can easily edit or update any scheduled post before it goes live.",
  },
  {
    id: 6,
    category: "Pricing & Billing",
    question: "Is there a free plan available?",
    answer:
      "Yes! Our free tier allows you to publish up to 5 posts per month and connect up to 5 social media accounts - completely free, no credit card required.",
  },
  {
    id: 7,
    category: "Pricing & Billing",
    question: "Do you offer a free trial for paid plans?",
    answer:
      "Yes, we offer a 7-day free trial on our Pro plan. You can cancel at any time during the trial and you won't be charged.",
  },
  {
    id: 8,
    category: "Pricing & Billing",
    question: "How much does PostBoost cost?",
    answer:
      "PostBoost offers a Lifetime Access Pro plan for a one-time payment of $99 - unlimited accounts, unlimited posts, priority support, and lifetime updates. No monthly fees ever.",
  },
  {
    id: 9,
    category: "Pricing & Billing",
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time directly from your account settings. No questions asked.",
  },
  {
    id: 10,
    category: "Pricing & Billing",
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
  },
  {
    id: 11,
    category: "Account & Setup",
    question: "How do I connect my social media accounts?",
    answer:
      "Connecting your accounts is quick and easy - just 1 click per platform. PostBoost supports one-click integration for all 8 supported platforms.",
  },
  {
    id: 12,
    category: "Account & Setup",
    question: "How many accounts can I connect?",
    answer:
      "On the free plan, you can connect up to 5 accounts. On the Pro (Lifetime) plan, you get unlimited connected accounts across all supported platforms.",
  },
  {
    id: 13,
    category: "Account & Setup",
    question: "Can I post to multiple accounts at once?",
    answer:
      "Absolutely! Select any or all of your connected accounts and publish or schedule your content to all of them simultaneously.",
  },
  {
    id: 14,
    category: "Support",
    question: "What kind of customer support do you offer?",
    answer:
      "Pro plan users get priority customer support. You can also reach us anytime through our Contact page.",
  },
  {
    id: 15,
    category: "Support",
    question: "Where can I learn how to use PostBoost?",
    answer:
      "We provide step-by-step onboarding and help resources directly in the app so you can get started quickly and confidently.",
  },
];

const categories = [
  "All",
  "General",
  "Features",
  "Pricing & Billing",
  "Account & Setup",
  "Support",
] as const;

export function PricingFAQSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [searchValue, setSearchValue] = useState("");
  const [openItemId, setOpenItemId] = useState<number | null>(null);

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

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-5xl rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-7 lg:p-8 shadow-[0_16px_36px_rgba(15,23,42,0.12)] backdrop-blur-md"
      >
        <div className="text-center mb-6 sm:mb-7">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Everything you need to know about features, setup, and billing.
          </p>
        </div>

        <div className="relative mb-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search questions..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200/80"
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setOpenItemId(null);
              }}
              className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/90 px-6 py-10 text-center">
            <p className="text-base font-semibold text-gray-800">No results found</p>
            <p className="mt-1 text-sm text-gray-600">Try another keyword or switch category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((item) => {
              const isOpen = openItemId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border bg-white/90 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] ${
                    isOpen ? "border-indigo-300 shadow-[0_10px_24px_rgba(79,70,229,0.14)]" : "border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenItemId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
                  >
                    <div>
                      <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-gray-500">{item.category}</p>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">{item.question}</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-indigo-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`faq-content-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-100 px-4 pb-4 pt-3 sm:px-5">
                          <p className="text-sm sm:text-[15px] leading-7 text-gray-700">{item.answer}</p>

                          {item.id === 14 && (
                            <Link
                              to="/contact"
                              className="mt-3 inline-flex text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                            >
                              Contact support
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
}
