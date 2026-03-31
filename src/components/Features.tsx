"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  LayoutDashboard,
  Users,
  Zap,
  BarChart3,
  MessageSquare,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Visual Kanban Boards",
    description:
      "Organize work visually with drag-and-drop boards. See your entire project at a glance and move tasks seamlessly between stages.",
    color: "bg-indigo-50 text-indigo-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite teammates, assign tasks, and share files in real time. Everyone stays in sync no matter where they are in the world.",
    color: "bg-purple-50 text-purple-500",
  },
  {
    icon: Zap,
    title: "Smart Automations",
    description:
      "Automate repetitive workflows with no-code rules. Trigger actions when tasks move, deadlines approach, or priorities change.",
    color: "bg-yellow-50 text-yellow-500",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description:
      "Track velocity, workload, and deadlines with beautiful charts. Make data-driven decisions and forecast project delivery dates.",
    color: "bg-green-50 text-green-500",
  },
  {
    icon: MessageSquare,
    title: "Built-in Chat",
    description:
      "Discuss tasks directly where work happens. Threaded comments, mentions, and reactions keep conversations organized and in context.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with SSO, 2FA, and granular permissions. Your team's data is encrypted at rest and in transit.",
    color: "bg-rose-50 text-rose-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-3">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Everything your team needs
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Flowly combines all the tools your remote team needs into one beautiful, intuitive platform.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>

              {/* Hover gradient line */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
