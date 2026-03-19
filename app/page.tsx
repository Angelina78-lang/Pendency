"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowUpRight, Brain, BarChart3, Shield, Zap, Clock, FileText, Globe,
  ChevronRight, Star, Check, AlertTriangle, Sparkles, Users, TrendingUp,
  Sun, Moon
} from "lucide-react"
import { createContext, useContext } from "react"

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({
  dark: true,
  toggle: () => {},
})
import { LenisProvider } from "@/components/lenis-provider"
import { CursorGlow } from "@/components/cursor-glow"
import { ParticleBackground } from "@/components/particle-background"
import { FeaturesBento } from "@/components/features-bento"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// BG: #0a0a0a | Accent: violet-500, indigo-500, blue-500 | Glass: white/5



// ─── SEARCH SECTION ───────────────────────────────────────────────────────────
function SearchSection() {
  const { dark } = useContext(ThemeCtx)
  const placeholders = [
    "Track my USCIS case status...",
    "When was my Google SWE III application updated?",
    "Search for high-risk employment cases",
    "Find my pending legal petitions",
    "Analyze risk for my recent filings",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("submitted");
  }

  return (
    <section className="pt-40 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <RevealText>
          <h2 className={`text-3xl md:text-6xl font-bold mb-8 tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
            Query your <span className="text-violet-500 text-glow-violet">Intelligence</span>
          </h2>
          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${dark ? "text-zinc-200" : "text-gray-600"}`}>
            Ask Pendency anything about your cases. From timeline predictions to risk assessments, get AI-powered answers instantly.
          </p>
        </RevealText>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl mx-auto"
        >
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-blue-500/20 blur-2xl opacity-50 rounded-full" />
          
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </motion.div>

        <div className={`mt-10 flex items-center justify-center gap-8 text-[10px] font-mono uppercase tracking-[0.2em] ${dark ? "text-zinc-500" : "text-gray-400"}`}>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Powered by Sigma v5.0</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="flex items-center gap-2"><Shield className="w-3 h-3" /> End-to-End Encrypted</span>
        </div>
      </div>

      {/* Background accents */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 blur-[120px] rounded-full pointer-events-none ${dark ? "bg-violet-600/10" : "bg-violet-200/20"}`} />
      <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 blur-[120px] rounded-full pointer-events-none ${dark ? "bg-blue-600/10" : "bg-blue-200/20"}`} />
    </section>
  )
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function RevealText({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function GlassCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`
  }
  const onMouseLeave = () => {
    const el = ref.current
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  )
}

function MagneticButton({ children, className = "", href, style }: { children: React.ReactNode; className?: string; href?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)"
  }
  const inner = (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={style}
      className={`transition-transform duration-300 ease-out cursor-pointer ${className}`}>
      {children}
    </div>
  )
  if (href) return <Link href={href}>{inner}</Link>
  return inner
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const { dark, toggle } = useContext(ThemeCtx)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        height: scrolled ? 64 : 90,
        backgroundColor: scrolled 
          ? (dark ? "rgba(10, 10, 10, 0.85)" : "rgba(255, 255, 255, 0.85)") 
          : "rgba(0, 0, 0, 0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderBottomColor: scrolled 
          ? (dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")
          : "rgba(0, 0, 0, 0)",
      }}
      transition={{ 
        duration: 0.5, 
        ease: "easeInOut",
      }}
      className="fixed top-0 inset-x-0 z-50 flex items-center border-b"
    >
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/40 border border-white/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className={`font-bold text-xl tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>Pendency</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {["Features", "How It Works", "Pricing"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className={`text-sm font-bold transition-all duration-300 ${
                dark ? "text-white hover:text-violet-400" : "text-zinc-800 hover:text-violet-600"
              }`}>
              {l}
            </a>
          ))}
        </div>

        {/* Right side: toggle + CTA */}
        <div className="flex items-center gap-3">
          {/* Theme toggle button */}
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
              dark
                ? "bg-white/8 border-white/12 text-white/60 hover:bg-white/15 hover:text-white hover:border-white/25"
                : "bg-black/5 border-black/10 text-gray-500 hover:bg-black/10 hover:text-gray-900 hover:border-black/20"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.span key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Get started CTA */}
          <MagneticButton href="/signup"
            className={`flex items-center gap-2 text-sm font-semibold pl-5 pr-2 py-1.5 rounded-full transition-shadow group ${
              dark
                ? "bg-white text-black hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : "bg-gray-900 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            }`}>
            Get started
            <span className={`w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-violet-600 transition-colors ${
              dark ? "bg-black text-white" : "bg-white text-black"
            }`}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  )
}


// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const { dark } = useContext(ThemeCtx)
  const items = ["Job Applications", "Visa Cases", "Scholarship Appeals", "Government Filings", "University Admissions", "Legal Petitions", "Insurance Claims", "Work Permits", "Research Grants", "Corporate RFPs"]
  const doubled = [...items, ...items]
  return (
    <div className={`border-y py-4 overflow-hidden ${dark ? "border-white/5" : "border-gray-200"}`} style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
      <div style={{ display: "flex", gap: "2.5rem", width: "max-content", animation: "marqueeScroll 25s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} className={`text-sm font-medium shrink-0 flex items-center gap-2.5 ${dark ? "text-white/20" : "text-gray-400"}`}>
            <span className="w-1 h-1 rounded-full bg-violet-500/60" />{item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── FEATURES (Bento Grid with Globe) ─────────────────────────────────────────
function Features() {
  const { dark } = useContext(ThemeCtx)
  return (
    <section id="features">
      <FeaturesBento dark={dark} />
    </section>
  )
}

// ─── PRODUCT DEMO ─────────────────────────────────────────────────────────────
function ProductDemo() {
  const { dark } = useContext(ThemeCtx)
  const [step, setStep] = useState(0)
  const steps = [
    { label: "Input your case", content: "Applied to Google SWE III 3 weeks ago, no response after final round interview..." },
    { label: "AI analyzes", content: "Analyzing 12,847 similar cases across FAANG institutions..." },
    { label: "Risk calculated", content: "Risk Score: 82/100 · Industry avg: 14d · You: 21d · Ghost rate: 64%" },
    { label: "Action generated", content: "Recommended: Send professional follow-up email. Template generated and ready." },
  ]

  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % steps.length), 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`py-24 px-6 border-t ${dark ? "border-white/5" : "border-gray-200"}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <RevealText>
          <p className="text-violet-500 text-sm font-semibold uppercase tracking-widest mb-4">Product Demo</p>
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
            Watch AI analyze<br />
            <span className={dark ? "text-white/40" : "text-gray-400"}>your case live</span>
          </h2>
          <p className={`leading-relaxed mb-8 ${dark ? "text-white/40" : "text-gray-500"}`}>In seconds, Pendency processes your situation, benchmarks it against industry data, and delivers a precise risk score with recommended actions.</p>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-3 transition-all duration-500 ${i === step ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold ${
                  i === step
                    ? 'border-violet-500 bg-violet-500/10 text-violet-500'
                    : dark ? 'border-white/10 text-white/20' : 'border-gray-200 text-gray-300'
                }`}>{i + 1}</div>
                <span className={`text-sm font-medium ${
                  i === step ? (dark ? 'text-white' : 'text-gray-900') : (dark ? 'text-white/30' : 'text-gray-300')
                }`}>{s.label}</span>
              </div>
            ))}
          </div>
        </RevealText>

        <RevealText delay={0.15}>
          {/* Animated terminal-style mockup */}
          <div className="relative">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500/20 via-indigo-500/10 to-transparent blur-md" />
            <div className={`relative rounded-2xl border overflow-hidden ${dark ? "border-white/10 bg-[#0d0d12]" : "border-gray-200 bg-gray-50"}`}>
              <div className={`flex items-center gap-2 px-5 py-3 border-b ${dark ? "border-white/5" : "border-gray-200"}`}>
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <span className={`text-xs font-mono ${dark ? "text-white/30" : "text-gray-400"}`}>Pendency AI · Analyzing...</span>
              </div>
              <div className="p-5 space-y-4 min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-3">
                    <div className={`text-xs font-mono ${dark ? "text-white/30" : "text-gray-400"}`}>STEP {step + 1} OF 4</div>
                    <div className="text-violet-500 text-sm font-semibold">{steps[step].label}</div>
                    <div className={`text-sm font-mono rounded-xl p-4 border leading-relaxed ${dark ? "text-white/50 bg-white/3 border-white/5" : "text-gray-600 bg-white border-gray-200"}`}>{steps[step].content}</div>
                    {step === 2 && (
                      <div className="grid grid-cols-3 gap-2">
                        {[{ l: "Risk", v: "82%", c: "text-red-500", bg: dark ? "bg-red-400/5 border-red-400/15" : "bg-red-50 border-red-200" }, { l: "Days", v: "21d", c: "text-amber-500", bg: dark ? "bg-amber-400/5 border-amber-400/15" : "bg-amber-50 border-amber-200" }, { l: "Ghost", v: "64%", c: "text-orange-500", bg: dark ? "bg-orange-400/5 border-orange-400/15" : "bg-orange-50 border-orange-200" }].map(s => (
                          <div key={s.l} className={`p-2.5 rounded-lg border text-center ${s.bg}`}>
                            <div className={`text-base font-black font-mono ${s.c}`}>{s.v}</div>
                            <div className={`text-[10px] ${dark ? "text-white/30" : "text-gray-400"}`}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {step === 3 && (
                      <div className="flex items-center gap-2 bg-green-400/5 border border-green-400/20 rounded-xl p-3">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        <span className={`text-xs ${dark ? "text-green-300" : "text-green-700"}`}>Action template ready to send</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Progress bar */}
              <div className="px-5 pb-4">
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-violet-500' : dark ? 'bg-white/10' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  )
}

// ─── WORKFLOW (Expandable Cards) ───────────────────────────────────────────────
const WORKFLOW_STEPS = [
  {
    icon: FileText,
    title: "Describe your case",
    desc: "Tell Pendency about your pending application, visa, or request in plain language.",
    num: "01",
    fullContent: `Start by describing your situation in plain language — no legal jargon needed. 
Simply tell us: what did you apply for, when did you apply, and what institution is involved?

Pendency understands context like "I applied for a Google SWE role 3 weeks ago and haven't heard back after my final round" or "My USCIS H1-B has been pending for 80 days."

Our AI extracts key signals — institution type, industry benchmarks, deadline proximity, and communication history — all from your natural language description.`,
    tags: ["Natural Language", "Any Industry", "Instant Parsing"],
    color: "violet",
  },
  {
    icon: Brain,
    title: "AI analyzes everything",
    desc: "Our model benchmarks your wait time against 50,000+ similar cases across institutions worldwide.",
    num: "02",
    fullContent: `Our model processes your case against a database of 50,000+ archived outcomes across FAANG companies, government agencies, universities, and immigration authorities in 50+ countries.

We calculate:
• Industry-specific ghost rates and average response timelines
• Seasonal hiring patterns and decision windows
• Your position relative to the benchmark distribution
• Confidence intervals based on similar case outcomes

This analysis runs in under 3 seconds and produces a deterministic, auditable risk profile.`,
    tags: ["50K+ Cases", "Real-time", "Global Benchmarks"],
    color: "indigo",
  },
  {
    icon: BarChart3,
    title: "Get your risk score",
    desc: "Receive a precise 0-100 risk score with confidence intervals and trend analysis.",
    num: "03",
    fullContent: `Your Risk Score (0–100) is a composite metric computed from weighted signals:

• Silence duration vs. benchmark (40%)  
• Institution-specific ghost rate (25%)  
• Application stage and recency (20%)  
• Economic and seasonal modifiers (15%)

A score above 70 triggers a "Critical" alert with immediate escalation recommendations. Scores update daily as your silence period grows.

Your score comes with a confidence interval, trend direction, and comparison against similar applicants at the same stage.`,
    tags: ["0–100 Score", "Daily Updates", "Confidence Intervals"],
    color: "blue",
  },
  {
    icon: Zap,
    title: "Take decisive action",
    desc: "Use AI-generated templates to follow up, escalate, or file official complaints with precision.",
    num: "04",
    fullContent: `Based on your risk score and case type, Pendency generates the exact action you need:

✉️ Follow-up Email — Professionally worded, time-sensitive, with specific reference to your application
📋 RTI Application — Right-to-Information filing for government cases (India-specific)
⚖️ Escalation Letter — Formal legal demand citing relevant statutes and delay timelines  
📊 Delay Report PDF — Court-admissible document with timestamps and financial impact calculations

All templates are jurisdiction-aware and pre-filled with your case details — ready to send in one click.`,
    tags: ["1-Click Actions", "Legal Templates", "RTI Support"],
    color: "purple",
  },
]

const colorMap: Record<string, { border: string; glow: string; badge: string; icon: string }> = {
  violet: { border: "border-violet-500/40", glow: "shadow-violet-500/25", badge: "bg-violet-500/10 text-violet-300 border-violet-500/20", icon: "text-violet-400" },
  indigo: { border: "border-indigo-500/40", glow: "shadow-indigo-500/25", badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", icon: "text-indigo-400" },
  blue:   { border: "border-blue-500/40",   glow: "shadow-blue-500/25",   badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",     icon: "text-blue-400" },
  purple: { border: "border-purple-500/40", glow: "shadow-purple-500/25", badge: "bg-purple-500/10 text-purple-300 border-purple-500/20", icon: "text-purple-400" },
}

function WorkflowCloseIcon() {
  const { dark } = useContext(ThemeCtx)
  return (
    <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`h-4 w-4 ${dark ? "text-white" : "text-gray-900"}`}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
    </motion.svg>
  )
}

function Workflow() {
  const { dark: isDark } = useContext(ThemeCtx)
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const expandRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<typeof WORKFLOW_STEPS[number] | null>(null)
  const id = "workflow"

  // GSAP scroll line
  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 70%", end: "bottom 50%", scrub: 1 } })
    tl.fromTo(lineRef.current, { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, ease: "none" })
    return () => { tl.kill() }
  }, [])

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null) }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [])

  // Lock body scroll when expanded
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [active])

  // Close on outside click
  useEffect(() => {
    if (!active) return
    const handler = (e: MouseEvent) => {
      if (expandRef.current && !expandRef.current.contains(e.target as Node)) setActive(null)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [active])

  return (
    <section id="how-it-works" className={`py-32 px-6 border-t ${isDark ? "border-white/5" : "border-gray-200"}`}>
      {/* ── Expanded overlay ── */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
            <div className="fixed inset-0 grid place-items-center z-50 px-4">
              {/* Close button (mobile) */}
              <motion.button
                key={`close-${active.title}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="absolute top-4 right-4 lg:hidden flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full h-8 w-8 border border-white/20"
                onClick={() => setActive(null)}
              >
                <WorkflowCloseIcon />
              </motion.button>

              <motion.div layoutId={`workflow-card-${active.title}-${id}`} ref={expandRef}
                className={`w-full max-w-lg border rounded-3xl overflow-hidden shadow-2xl ${isDark ? "bg-[#0d0d14] border-white/10" : "bg-white border-gray-200"}`}>
                <motion.div layoutId={`workflow-header-${active.title}-${id}`}
                  className={`p-6 border-b ${colorMap[active.color].border}`}
                  style={{ background: isDark ? `radial-gradient(ellipse at top left, rgba(139,92,246,0.08) 0%, transparent 70%)` : `radial-gradient(ellipse at top left, rgba(139,92,246,0.05) 0%, transparent 70%)` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <motion.div layoutId={`workflow-icon-${active.title}-${id}`}
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-lg ${colorMap[active.color].border} ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
                        <active.icon className={`w-6 h-6 ${colorMap[active.color].icon}`} />
                      </motion.div>
                      <div>
                        <motion.div layoutId={`workflow-num-${active.title}-${id}`} className="text-violet-500 text-xs font-mono mb-0.5">{active.num}</motion.div>
                        <motion.h3 layoutId={`workflow-title-${active.title}-${id}`} className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900"}`}>{active.title}</motion.h3>
                      </div>
                    </div>
                    <button onClick={() => setActive(null)} className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-full border transition-colors shrink-0 mt-1 ${isDark ? "bg-white/8 border-white/12 hover:bg-white/15" : "bg-gray-100 border-gray-200 hover:bg-gray-200"}`}>
                      <WorkflowCloseIcon />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {active.tags.map(t => (
                      <span key={t} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${colorMap[active.color].badge}`}>{t}</span>
                    ))}
                  </div>
                </motion.div>
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={`p-6 text-sm leading-7 whitespace-pre-line max-h-[50vh] overflow-auto [scrollbar-width:none] ${isDark ? "text-white/55" : "text-gray-600"}`}>
                  {active.fullContent}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── Section ── */}
      <div className="max-w-4xl mx-auto">
        <RevealText className="text-center mb-20">
          <p className="text-violet-500 text-sm font-semibold uppercase tracking-widest mb-4">How It Works</p>
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            From silence to clarity<br />
            <span className={isDark ? "text-white/40" : "text-gray-400"}>in four steps</span>
          </h2>
          <p className={`mt-4 text-base ${isDark ? "text-white/35" : "text-gray-500"}`}>Click any step to learn more</p>
        </RevealText>

        <div ref={containerRef} className="relative">
          {/* GSAP animated vertical line */}
          <div className="absolute left-[22px] top-6 bottom-6 w-px bg-white/5">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-violet-500 to-blue-500" />
          </div>

          <div className="space-y-5">
            {WORKFLOW_STEPS.map((s, i) => (
              <RevealText key={s.num} delay={i * 0.1}>
                <motion.div
                  layoutId={`workflow-card-${s.title}-${id}`}
                  onClick={() => setActive(s)}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className={`flex gap-8 items-start cursor-pointer rounded-2xl p-4 pr-5 border transition-colors group relative ${
                    isDark ? "border-transparent hover:border-white/8 hover:bg-white/[0.03]" : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {/* Hover glow behind */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-600/5 to-transparent pointer-events-none" />

                  <div className="relative shrink-0 z-10">
                    <motion.div
                      layoutId={`workflow-icon-${s.title}-${id}`}
                      className={`w-11 h-11 rounded-full border ${colorMap[s.color].border} flex items-center justify-center transition-shadow ${
                        isDark ? "bg-[#0a0a0a] shadow-[0_0_20px_rgba(139,92,246,0.25)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]" : "bg-white shadow-sm group-hover:shadow-md"
                      }`}
                    >
                      <s.icon className={`w-5 h-5 ${colorMap[s.color].icon}`} />
                    </motion.div>
                  </div>

                  <div className="pt-1 flex-1 z-10">
                    <motion.div layoutId={`workflow-num-${s.title}-${id}`} className="text-violet-500 text-xs font-mono mb-1">{s.num}</motion.div>
                    <motion.h3 layoutId={`workflow-title-${s.title}-${id}`} className={`font-semibold text-xl mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>{s.title}</motion.h3>
                    <p className={`leading-relaxed text-sm ${isDark ? "text-white/35" : "text-gray-500"}`}>{s.desc}</p>
                  </div>

                  {/* Expand hint */}
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="shrink-0 pt-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${colorMap[s.color].badge}`}>
                      Learn more →
                    </span>
                  </motion.div>
                </motion.div>
              </RevealText>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Software Engineer", company: "Ex-Googler", text: "Pendency told me exactly when my H1B visa was in danger. I acted immediately and got resolution 2 weeks before the deadline.", avatar: "PS" },
  { name: "James Okonkwo", role: "PhD Candidate", company: "MIT", text: "I was waiting 8 months for my scholarship decision. Pendency's risk score showed 91% critical — I escalated and got a response in days.", avatar: "JO" },
  { name: "Lena Fischer", role: "Product Manager", company: "Startup Founder", text: "Filed an RTI using Pendency's template. The government department responded within the legal 30-day window for the first time.", avatar: "LF" },
  { name: "Ahmed Al-Rashid", role: "Immigration Lawyer", company: "Al-Rashid Partners", text: "We use Pendency for all our client cases now. The delay reports are court-admissible and save us 10+ hours per case.", avatar: "AR" },
]

function Testimonials() {
  const { dark } = useContext(ThemeCtx)
  return (
    <section className={`py-32 px-6 border-t overflow-hidden ${dark ? "border-white/5" : "border-gray-200"}`}>
      <div className="max-w-6xl mx-auto">
        <RevealText className="text-center mb-16">
          <p className="text-violet-500 text-sm font-semibold uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
            Trusted by thousands<br />
            <span className={dark ? "text-white/40" : "text-gray-400"}>waiting for answers</span>
          </h2>
        </RevealText>
        <div className="grid md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <GlassCard key={t.name} delay={i * 0.1}
              className={`p-6 rounded-2xl border group ${
                dark ? "border-white/5 bg-white/2 hover:border-violet-500/20 hover:bg-violet-500/2" : "border-gray-200 bg-white hover:border-violet-300 hover:shadow-md shadow-sm"
              }`}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className={`text-sm leading-relaxed mb-5 ${dark ? "text-white/60" : "text-gray-600"}`}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                <div>
                  <div className={`text-sm font-medium ${dark ? "text-white/80" : "text-gray-800"}`}>{t.name}</div>
                  <div className={`text-xs ${dark ? "text-white/30" : "text-gray-400"}`}>{t.role}, {t.company}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  const { dark } = useContext(ThemeCtx)
  const stats = [
    { val: "50K+", label: "Cases analyzed", icon: BarChart3 },
    { val: "94%", label: "Risk prediction accuracy", icon: Brain },
    { val: "3.2x", label: "Faster resolution", icon: Zap },
    { val: "82%", label: "Escalation success rate", icon: TrendingUp },
  ]
  return (
    <section className={`py-20 px-6 border-t ${dark ? "border-white/5" : "border-gray-200"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <RevealText key={s.label} delay={i * 0.08} className="text-center">
              <div className="text-5xl font-black mb-1 bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">{s.val}</div>
              <div className={`text-sm ${dark ? "text-white/30" : "text-gray-500"}`}>{s.label}</div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function CTA() {
  const { dark } = useContext(ThemeCtx)
  return (
    <section className="py-40 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-[800px] h-[400px] blur-[100px] rounded-full ${dark ? "bg-violet-600/15" : "bg-violet-300/30"}`} style={{ animation: "pulse 4s ease-in-out infinite" }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <RevealText>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-violet-500 text-xs font-medium">Free to start · No card needed</span>
          </div>
          <h2 className={`text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
            Stop waiting in the dark.<br />
            <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Start knowing.</span>
          </h2>
          <p className={`text-xl mb-12 max-w-lg mx-auto leading-relaxed ${dark ? "text-white/40" : "text-gray-500"}`}>
            Set up your first case analysis in 2 minutes. Join thousands already decoding silence.
          </p>
          <MagneticButton href="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-base font-semibold px-10 py-4 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:shadow-[0_0_80px_rgba(139,92,246,0.8)] transition-shadow">
            Get started for free
            <ArrowUpRight className="w-5 h-5" />
          </MagneticButton>
        </RevealText>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const { dark } = useContext(ThemeCtx)
  return (
    <footer className={`border-t py-16 px-6 ${dark ? "border-white/5" : "border-gray-200"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className={`font-bold ${dark ? "text-white" : "text-gray-900"}`}>Pendency</span>
            </div>
            <p className={`text-sm leading-relaxed max-w-xs ${dark ? "text-white/25" : "text-gray-400"}`}>AI-powered case intelligence for anyone waiting on an institutional response.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "How It Works", "Pricing", "API"] },
            { title: "Use Cases", links: ["Job Applications", "Visa & Immigration", "University", "Legal"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          ].map(col => (
            <div key={col.title}>
              <div className={`text-sm font-semibold mb-4 ${dark ? "text-white/60" : "text-gray-700"}`}>{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><a href="#" className={`text-sm transition-colors ${dark ? "text-white/25 hover:text-white/60" : "text-gray-400 hover:text-gray-700"}`}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t ${dark ? "border-white/5" : "border-gray-200"}`}>
          <p className={`text-xs ${dark ? "text-white/15" : "text-gray-400"}`}>© 2026 Pendency AI. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Status"].map(l => (
              <a key={l} href="#" className={`text-xs transition-colors ${dark ? "text-white/15 hover:text-white/40" : "text-gray-400 hover:text-gray-600"}`}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── NOISE OVERLAY ────────────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [dark, setDark] = useState(true)
  const toggle = () => setDark(d => !d)

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <LenisProvider>
        <motion.div
          animate={{
            backgroundColor: dark ? "#0a0a0a" : "#f8f7ff",
            color: dark ? "#ffffff" : "#0f0f0f",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="min-h-screen overflow-x-hidden font-sans antialiased relative"
        >
          {/* Global effects */}
          {dark && <ParticleBackground />}
          <CursorGlow />
          <NoiseOverlay />

          {/* Light mode soft gradient bg */}
          {!dark && (
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-100/60 blur-[120px] rounded-full" />
              <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 blur-[100px] rounded-full" />
            </div>
          )}

          {/* Content */}
          <Nav />
          <SearchSection />
          <Marquee />
          <Stats />
          <Features />
          <ProductDemo />
          <Workflow />
          <Testimonials />
          <CTA />
          <Footer />

          {/* Global keyframes */}
          <style jsx global>{`
            @keyframes marqueeScroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.6; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.1); }
            }
            ::selection { background: rgba(139,92,246,0.3); }
            * { box-sizing: border-box; }
            html { scroll-behavior: smooth; }
          `}</style>
        </motion.div>
      </LenisProvider>
    </ThemeCtx.Provider>
  )
}
