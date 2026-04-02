"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Zap } from "lucide-react";
import { useModal } from "./ModalContext";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for solo projects and small teams just getting started.",
    features: [
      "Up to 5 team members",
      "3 active projects",
      "Basic Kanban boards",
      "2GB file storage",
      "Email support",
    ],
    cta: "Get started free",
    highlight: false,
    action: "signup" as const,
  },
  {
    name: "Pro",
    price: { monthly: 12, annual: 9 },
    description: "For growing teams that need more power and collaboration tools.",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Advanced automations",
      "20GB file storage",
      "Priority support",
      "Custom fields & views",
      "Time tracking",
    ],
    cta: "Start Pro trial",
    highlight: true,
    action: "signup" as const,
  },
  {
    name: "Business",
    price: { monthly: 29, annual: 23 },
    description: "For large organizations that need security, control, and scale.",
    features: [
      "Everything in Pro",
      "SSO & advanced security",
      "100GB file storage",
      "Dedicated support",
      "Custom integrations",
      "Advanced analytics",
      "SLA guarantee",
      "Admin controls",
    ],
    cta: "Contact sales",
    highlight: false,
    action: "contact" as const,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [annual, setAnnual] = useState(false);
  const { openSignup, openContact } = useModal();

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.action === "contact") {
      openContact();
    } else {
      openSignup(plan.name);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-3">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !annual ? "bg-white text-gray-900 shadow" : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                annual ? "bg-white text-gray-900 shadow" : "text-gray-500"
              }`}
            >
              Annual
              <span className="ml-2 text-xs text-green-600 font-semibold">Save 20%</span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? "bg-indigo-500 text-white shadow-2xl shadow-indigo-200 scale-105"
                  : "bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-indigo-200" : "text-gray-500"}`}>
                  {plan.description}
                </p>
                {plan.price.monthly === 0 ? (
                  <span className={`text-5xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    Free
                  </span>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                      ${annual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className={`text-sm mb-2 ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>
                      /mo
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-3 rounded-xl font-semibold text-sm mb-8 transition-all duration-200 ${
                  plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-indigo-50 hover:shadow-lg"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-100"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.highlight ? "bg-indigo-400" : "bg-indigo-50"
                      }`}
                    >
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-white" : "text-indigo-500"}`} />
                    </div>
                    <span className={`text-sm ${plan.highlight ? "text-indigo-100" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
