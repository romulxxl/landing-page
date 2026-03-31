"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useModal } from "./ModalContext";

const faqs = [
  {
    question: "How does the free plan work?",
    answer:
      "Our Free plan is completely free forever — no credit card required. You get access to core features including up to 5 team members, 3 active projects, and basic Kanban boards. You can upgrade to Pro or Business at any time as your team grows.",
  },
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes! You can upgrade, downgrade, or cancel your plan at any time. When you upgrade, you're billed pro-rata for the rest of the billing period. When you downgrade, changes take effect at the end of your current billing cycle.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Flowly is SOC 2 Type II certified. All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We perform daily backups, offer 2FA, and have a 99.9% uptime SLA. Your data is never sold or shared.",
  },
  {
    question: "Does Flowly integrate with other tools?",
    answer:
      "Flowly integrates with 100+ popular tools including Slack, GitHub, Google Drive, Notion, Jira, Figma, Zapier, and more. Our REST API and webhooks let you build custom integrations. Business plans include dedicated integration support.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Free users get community forum and email support. Pro users get priority email support with a 24-hour response time. Business users get dedicated Slack support, a named account manager, and access to our technical onboarding team.",
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-indigo-100 transition-colors duration-200">
      <button
        className="w-full flex items-center justify-between p-6 text-left"
        onClick={onToggle}
      >
        <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openContact } = useModal();

  return (
    <section id="faq" className="py-24 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-3">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-500">
            Everything you need to know about Flowly. Can&apos;t find an answer?{" "}
            <button onClick={openContact} className="text-indigo-500 hover:underline">
              Chat with us.
            </button>
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
