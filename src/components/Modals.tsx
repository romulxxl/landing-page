"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Zap, Mail, Lock, User, Phone, Building, CheckCircle, Play, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useModal } from "./ModalContext";

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={onClick}
    />
  );
}

function ModalWrapper({
  children,
  onClose,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabel: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}

/* ─── LOGIN MODAL ─── */
function LoginModal() {
  const { close, openSignup } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  return (
    <ModalWrapper onClose={close} ariaLabel="Sign in to your account">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-8 pt-8 pb-6 text-white relative">
          <button onClick={close} aria-label="Close" className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Flowly</span>
          </div>
          <h2 className="text-2xl font-extrabold">Welcome back</h2>
          <p className="text-indigo-200 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="px-8 py-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-9 h-9 text-indigo-500" />
              </div>
              <p className="text-gray-900 font-semibold text-lg">Welcome back!</p>
              <p className="text-gray-500 text-sm mt-1">Redirecting you to your workspace...</p>
              <button onClick={close} className="mt-4 text-indigo-500 hover:underline text-sm">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button type="button" className="text-xs text-indigo-500 hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign in <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
                <div className="relative text-center text-xs text-gray-400 bg-white px-2 mx-auto w-fit">or continue with</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["Google", "GitHub"].map((p) => (
                  <button key={p} type="button" className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    {p}
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-gray-500 pt-2">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => openSignup()} className="text-indigo-500 font-medium hover:underline">
                  Sign up free
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

/* ─── SIGNUP MODAL ─── */
function SignupModal() {
  const { close, openLogin, selectedPlan } = useModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  return (
    <ModalWrapper onClose={close} ariaLabel="Create your account">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-8 pt-8 pb-6 text-white relative">
          <button onClick={close} aria-label="Close" className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Flowly</span>
          </div>
          <h2 className="text-2xl font-extrabold">Create your account</h2>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-sm">
            <Zap className="w-3.5 h-3.5" />
            {selectedPlan} plan selected
          </div>
        </div>

        <div className="px-8 py-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-9 h-9 text-indigo-500" />
              </div>
              <p className="text-gray-900 font-semibold text-lg">You&apos;re all set!</p>
              <p className="text-gray-500 text-sm mt-1">Check your inbox to confirm your email and get started.</p>
              <button onClick={close} className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors">
                Got it
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" required placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Work email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" required minLength={8} placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100 flex items-center justify-center gap-2">
                {loading
                  ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><ArrowRight className="w-4 h-4" /> Create account — it&apos;s free</>}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By signing up you agree to our{" "}
                <button type="button" onClick={close} className="text-indigo-500 hover:underline">Terms</button>
                {" & "}
                <button type="button" onClick={close} className="text-indigo-500 hover:underline">Privacy Policy</button>
              </p>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button type="button" onClick={openLogin} className="text-indigo-500 font-medium hover:underline">Log in</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

/* ─── DEMO MODAL ─── */
function DemoModal() {
  const { close, openSignup } = useModal();
  const [playing, setPlaying] = useState(false);

  return (
    <ModalWrapper onClose={close} ariaLabel="Product demo video">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Flowly Product Demo</span>
          </div>
          <button onClick={close} aria-label="Close" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video area */}
        <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
          {!playing ? (
            <div className="text-center">
              <div className="absolute inset-0 opacity-30 p-6">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {["24 Tasks", "128 Done", "7 Review", "12 Members"].map((s) => (
                    <div key={s} className="bg-white/10 rounded-lg p-3 text-white text-xs text-center">{s}</div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["To Do", "In Progress", "Done"].map((col) => (
                    <div key={col} className="bg-white/10 rounded-lg p-3">
                      <div className="text-white/60 text-xs mb-2">{col}</div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/10 rounded p-2 mb-1.5 text-white/50 text-xs">Task item {i}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setPlaying(true)}
                aria-label="Play demo video"
                className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
              >
                <Play className="w-8 h-8 text-indigo-500 ml-1 group-hover:text-indigo-600" />
              </button>
              <p className="relative z-10 text-white/70 text-sm mt-4">Click to play — 2 min overview</p>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/70 text-sm">Loading demo video...</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-5 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900">Ready to try it yourself?</p>
            <p className="text-sm text-gray-500">Set up your workspace in under 2 minutes.</p>
          </div>
          <button
            onClick={() => { close(); setTimeout(() => openSignup(), 300); }}
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-100 flex items-center gap-2"
          >
            Start for free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

/* ─── CONTACT SALES MODAL ─── */
function ContactModal() {
  const { close } = useModal();
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  return (
    <ModalWrapper onClose={close} ariaLabel="Contact sales form">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-8 pt-8 pb-6 text-white relative">
          <button onClick={close} aria-label="Close" className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Flowly</span>
          </div>
          <h2 className="text-2xl font-extrabold">Talk to our team</h2>
          <p className="text-gray-400 text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
        </div>

        <div className="px-8 py-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-9 h-9 text-indigo-500" />
              </div>
              <p className="text-gray-900 font-semibold text-lg">Message received!</p>
              <p className="text-gray-500 text-sm mt-1">Our team will get back to you within 24 hours.</p>
              <button onClick={close} className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" required placeholder="Jane Smith" value={form.name} onChange={set("name")}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Work email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" required placeholder="you@company.com" value={form.email} onChange={set("email")}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Acme Inc." value={form.company} onChange={set("company")}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" placeholder="+1 555 0100" value={form.phone} onChange={set("phone")}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">How can we help?</label>
                <textarea required rows={3} placeholder="Tell us about your team size and needs..."
                  value={form.message} onChange={set("message")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                {loading
                  ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <>Send message <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

/* ─── ROOT MODALS CONTROLLER ─── */
export default function Modals() {
  const { modal } = useModal();

  return (
    <AnimatePresence>
      {modal === "login" && <LoginModal key="login" />}
      {modal === "signup" && <SignupModal key="signup" />}
      {modal === "demo" && <DemoModal key="demo" />}
      {modal === "contact" && <ContactModal key="contact" />}
    </AnimatePresence>
  );
}
