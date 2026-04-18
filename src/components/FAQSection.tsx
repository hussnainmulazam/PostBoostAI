"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LitButton } from "@/components/ui/lit-button";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What social media platforms are supported?",
    answer: "We support the following platforms: Instagram, TikTok, X/Twitter, LinkedIn, YouTube, Threads, Pinterest, and Facebook."
  },
  {
    question: "How far ahead can I schedule posts?",
    answer: "3 months. You can schedule posts up to 3 months ahead of the current date/time in your timezone."
  },
  {
    question: "Is there a free-tier available?",
    answer: "Yes, our free-tier allows you to publish 5 posts per month (1 post published to 5 connected accounts equals 5 posts) and connect 5 social media accounts."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 7-day free trial. You can cancel at any time during the trial period and you won't be charged."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "You can cancel your subscription at any time. You can do this from your account settings."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. You can do this from your account settings."
  }
];

const FAQSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-medium text-blue-600 uppercase tracking-wider">FAQ.</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-2">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg px-6 py-2 border border-gray-200"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8 sm:mt-12">
          <LitButton
            onClick={() => navigate('/faq')}
            variant="outline"
            className="text-xs sm:text-sm md:text-base"
          >
            View All FAQs
          </LitButton>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

