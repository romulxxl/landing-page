"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const companies = [
  { name: "Stripe", initials: "ST" },
  { name: "Notion", initials: "NT" },
  { name: "Vercel", initials: "VC" },
  { name: "Linear", initials: "LN" },
  { name: "Figma", initials: "FG" },
];

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-lg font-semibold text-gray-500 uppercase tracking-wider">
            10,000+ teams use Flowly
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {/* Logo placeholder */}
              <div className="w-12 h-12 bg-gray-200 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-indigo-600 font-bold text-sm transition-all duration-300">
                {company.initials}
              </div>
              <span className="text-xl font-bold text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-12"
        >
          {[
            { value: "10K+", label: "Teams worldwide" },
            { value: "98%", label: "Customer satisfaction" },
            { value: "50M+", label: "Tasks completed" },
            { value: "4.9/5", label: "Average rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-extrabold text-indigo-500 mb-1">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
