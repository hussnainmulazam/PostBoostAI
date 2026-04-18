import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LitButton } from "@/components/ui/lit-button";
import { InteractiveFAQSection } from "./InteractiveFAQSection";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const plans = [
  {
    name: "Hobby",
    price: "$199",
    period: "/ Month",
    description: "For indie hackers trying out AI for the first time.",
    features: [
      "120 projects per month",
      "Unlimited workspaces",
      "2 AI model choices",
      "History and export",
      "Basic email support",
      "1 member seat",
    ],
    popular: false,
    buttonText: "Start a free trial",
  },
  {
    name: "Pro",
    price: "$499",
    period: "/ Month",
    description: "For teams that need more power and flexibility.",
    features: [
      "Unlimited projects",
      "Unlimited workspaces",
      "All AI models included",
      "History and export",
      "Priority email support",
      "10 member seats",
    ],
    popular: true,
    buttonText: "Get started",
  },
  {
    name: "Enterprise",
    price: "690",
    period: "/ Year",
    description: "For large organizations with custom needs.",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated account manager",
      "SSO and SAML",
      "24/7 phone support",
      "Unlimited member seats",
    ],
    popular: false,
    buttonText: "Contact sales",
  },
];

export function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_38%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10 sm:mb-16"
          >
            <TextGenerateEffect
              words="Choose your perfect plan"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight text-gray-900 font-bold"
            />
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Flexible pricing for solo creators, teams, and enterprise organizations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative rounded-3xl border p-6 sm:p-8 flex flex-col transition-all duration-300 ${plan.popular
                    ? "bg-white/80 backdrop-blur-xl border-purple-200 ring-2 ring-purple-500/20 shadow-[0_10px_50px_-10px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)]"
                    : "bg-white/60 backdrop-blur-md border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300"
                  }`}
              >
                <div
                  className={`rounded-2xl border px-5 py-6 mb-8 transition-colors ${plan.popular
                      ? "border-purple-100 bg-purple-50/50"
                      : "border-gray-100 bg-gray-50/50"
                    }`}
                >
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {plan.description}
                  </p>
                </div>

                <div className="px-1">
                  <div className="mb-5">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {plan.period}
                    </span>
                  </div>

                  {plan.popular ? (
                    <LitButton
                      onClick={() => (plan.name === "Enterprise" ? navigate("/contact") : navigate("/payment", { state: { plan } }))}
                      className="w-full text-center justify-center font-semibold h-11"
                    >
                      {plan.buttonText}
                    </LitButton>
                  ) : (
                    <button
                      type="button"
                      onClick={() => (plan.name === "Enterprise" ? navigate("/contact") : navigate("/payment", { state: { plan } }))}
                      className="h-11 w-full rounded-[6px] text-sm font-semibold transition-all bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                    >
                      {plan.buttonText}
                    </button>
                  )}

                  <div className="my-5 border-t border-dashed border-gray-200" />

                  <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-gray-500">
                    {plan.name} plan includes
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          className={`mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full ${plan.popular ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm text-gray-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20">
            <InteractiveFAQSection />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

