"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Flowly completely transformed how our distributed team works. We went from chaotic Slack threads to a clear, organized workflow. I can't imagine going back.",
    name: "Sarah Chen",
    position: "Engineering Manager at Nova Labs",
    avatar: "SC",
    color: "bg-indigo-400",
    stars: 5,
  },
  {
    quote:
      "The automation features alone saved us 10+ hours a week. Setting up recurring tasks and deadline reminders is dead simple. Our delivery rate improved by 40%.",
    name: "Marcus Rodriguez",
    position: "Head of Product at Stackify",
    avatar: "MR",
    color: "bg-purple-400",
    stars: 5,
  },
  {
    quote:
      "We evaluated 8 tools before choosing Flowly. The UI is stunning, onboarding took minutes, and the support team is incredibly responsive. Worth every penny.",
    name: "Priya Kapoor",
    position: "CTO at Luminary.io",
    avatar: "PK",
    color: "bg-pink-400",
    stars: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Loved by teams everywhere
          </h2>
          <p className="text-xl text-gray-500">
            Don&apos;t just take our word for it.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-indigo-100">
                <Quote className="w-10 h-10" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
