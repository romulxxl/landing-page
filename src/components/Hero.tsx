"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useModal } from "./ModalContext";

export default function Hero() {
  const { openSignup, openDemo } = useModal();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(to right, #6366F1 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-indigo-600">Now with AI-powered task suggestions</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6"
        >
          Manage projects{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            without the chaos
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto mb-10"
        >
          Flowly brings your remote team together with smart task management, real-time collaboration, and beautiful dashboards — all in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => openSignup()}
            className="group flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 text-lg"
          >
            Start for free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={openDemo}
            className="group flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg text-lg"
          >
            <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <Play className="w-3.5 h-3.5 text-indigo-500 ml-0.5" />
            </div>
            Watch demo
          </button>
        </motion.div>

        {/* Social proof mini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400"
        >
          <div className="flex -space-x-2">
            {["bg-indigo-400","bg-purple-400","bg-pink-400","bg-blue-400","bg-green-400"].map((color, i) => (
              <div
                key={color}
                className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span>Trusted by <strong className="text-gray-600">10,000+</strong> remote teams worldwide</span>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center max-w-xs mx-auto border border-gray-200">
                app.flowly.io/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 bg-gray-50 min-h-[400px]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Active Tasks", value: "24", color: "bg-indigo-500" },
                  { label: "Completed", value: "128", color: "bg-green-500" },
                  { label: "In Review", value: "7", color: "bg-yellow-500" },
                  { label: "Team Members", value: "12", color: "bg-purple-500" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className={`w-8 h-1.5 ${stat.color} rounded-full mb-2`} />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "To Do", color: "bg-gray-200", tasks: ["Design new homepage", "API integration", "Write docs"] },
                  { title: "In Progress", color: "bg-indigo-500", tasks: ["Mobile app UI", "Performance audit"] },
                  { title: "Done", color: "bg-green-500", tasks: ["Auth system", "DB schema", "CI/CD setup"] },
                ].map((col) => (
                  <div key={col.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2.5 h-2.5 ${col.color} rounded-full`} />
                      <span className="text-sm font-semibold text-gray-700">{col.title}</span>
                      <span className="ml-auto text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{col.tasks.length}</span>
                    </div>
                    <div className="space-y-2">
                      {col.tasks.map((task) => (
                        <div key={task} className="bg-gray-50 rounded-lg p-2.5 text-xs text-gray-600 border border-gray-100">
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
