"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import createGlobe from "cobe"
import { cn } from "@/lib/utils"
import {
  Brain, BarChart3, AlertTriangle, CheckCircle2, Clock,
} from "lucide-react"

// ─── SKELETON 1: Animated Dashboard Mockup with stagger + scan-line ───────────
const SkeletonOne = ({ dark }: { dark: boolean }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [activeRow, setActiveRow] = useState(0)

  const cases = [
    { n: "Google SWE III",   d: 21, r: "High",     c: "text-amber-400 border-amber-400/25 bg-amber-400/5",  bar: 82, bc: "bg-amber-400" },
    { n: "USCIS H1-B",       d: 80, r: "Critical", c: "text-red-400 border-red-400/25 bg-red-400/5",        bar: 95, bc: "bg-red-400"   },
    { n: "Stanford PhD",     d: 45, r: "Medium",   c: "text-blue-400 border-blue-400/25 bg-blue-400/5",     bar: 55, bc: "bg-blue-400"  },
    { n: "Insurance Claim",  d: 14, r: "Low",      c: "text-green-400 border-green-400/25 bg-green-400/5",  bar: 22, bc: "bg-green-400" },
  ]

  // Cycle active row
  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setActiveRow(r => (r + 1) % cases.length), 1800)
    return () => clearInterval(t)
  }, [inView])

  return (
    <div ref={ref} className="relative flex h-full gap-10 px-2 py-6">
      <div className={`mx-auto h-full w-full rounded-xl p-4 shadow-2xl transition-shadow duration-500 ${dark ? "bg-[#111116] border border-white/8" : "bg-white border border-gray-100 shadow-md"}`}>
        <div className="flex h-full w-full flex-col space-y-3">

          {/* Window chrome */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className={`ml-2 text-[10px] font-mono ${dark ? "text-white/20" : "text-gray-400"}`}
            >
              app.pendency.ai/dashboard
            </motion.div>
          </div>

          {/* Animated stat tiles */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "Active Cases", v: 12,   suffix: "",  color: dark ? "text-white" : "text-gray-900" },
              { l: "Critical",     v: 3,    suffix: "",  color: "text-red-400" },
              { l: "Avg Risk",     v: 67,   suffix: "%", color: "text-amber-400" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300, damping: 22 }}
                className={`p-2 rounded-lg border text-center ${dark ? "border-white/5 bg-white/3" : "border-gray-100 bg-gray-50"}`}
              >
                <div className={`text-base font-black font-mono ${s.color}`}>
                  <CountUp target={s.v} suffix={s.suffix} trigger={inView} delay={0.3 + i * 0.1} />
                </div>
                <div className={`text-[10px] mt-0.5 ${dark ? "text-white/30" : "text-gray-400"}`}>{s.l}</div>
              </motion.div>
            ))}
          </div>

          {/* Case rows with stagger + active highlight scan */}
          <div className="space-y-1.5 flex-1">
            {cases.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                className={`relative flex items-center justify-between px-3 py-2 rounded-lg border overflow-hidden transition-all duration-300 ${
                  activeRow === i
                    ? dark ? "border-violet-500/40 bg-violet-500/8" : "border-violet-300 bg-violet-50"
                    : dark ? "bg-white/2 border-white/5" : "bg-gray-50 border-gray-100"
                }`}
              >
                {/* Scan-line glow when active */}
                <AnimatePresence>
                  {activeRow === i && (
                    <motion.div
                      key="scan"
                      initial={{ x: "-100%", opacity: 0.6 }}
                      animate={{ x: "200%", opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-2 flex-1">
                  <motion.div
                    animate={activeRow === i ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0"
                  />
                  <div className="flex-1">
                    <div className={`text-[11px] font-medium ${dark ? "text-white/70" : "text-gray-700"}`}>{c.n}</div>
                    {/* Animated bar */}
                    <div className={`mt-0.5 h-1 w-full rounded-full overflow-hidden ${dark ? "bg-white/5" : "bg-gray-200"}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${c.bar}%` } : { width: 0 }}
                        transition={{ delay: 0.6 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${c.bc} opacity-70`}
                      />
                    </div>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ml-2 shrink-0 ${c.c}`}>{c.r}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fades */}
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full ${dark ? "bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" : "bg-gradient-to-t from-gray-50/90 via-gray-50/50 to-transparent"}`} />
      <div className={`pointer-events-none absolute inset-x-0 top-0 z-40 h-24 w-full ${dark ? "bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent" : "bg-gradient-to-b from-gray-50/80 via-transparent to-transparent"}`} />
    </div>
  )
}

// ─── COUNT-UP HELPER ─────────────────────────────────────────────────────────
function CountUp({ target, suffix = "", trigger, delay = 0 }: { target: number; suffix?: string; trigger: boolean; delay?: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const timeout = setTimeout(() => {
      const start = performance.now()
      const duration = 900
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setVal(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [trigger, target, delay])
  return <>{val}{suffix}</>
}

// ─── SKELETON 2: Floating stacked risk-score cards ────────────────────────────
const SkeletonTwo = ({ dark }: { dark: boolean }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  const cards = [
    { label: "Risk Score",    value: "82/100",  color: "text-red-400",    border: "border-red-400/20",    icon: AlertTriangle },
    { label: "Days Silent",   value: "21 days", color: "text-amber-400",  border: "border-amber-400/20",  icon: Clock },
    { label: "Ghost Rate",    value: "64%",     color: "text-orange-400", border: "border-orange-400/20", icon: Brain },
    { label: "vs Benchmark",  value: "+7 days", color: "text-violet-400", border: "border-violet-400/20", icon: BarChart3 },
    { label: "AI Confidence", value: "94%",     color: "text-green-400",  border: "border-green-400/20",  icon: CheckCircle2 },
  ]

  const hoverVariants = {
    whileHover: { scale: 1.1, rotate: 0, zIndex: 100, y: -6 },
    whileTap:   { scale: 1.1, rotate: 0, zIndex: 100 },
  }

  const floatY = ["-6px", "0px", "6px", "0px", "-6px"]

  return (
    <div ref={ref} className="relative flex h-full flex-col items-start gap-6 overflow-hidden p-6">
      {/* Row 1 */}
      <div className="-ml-16 flex flex-row">
        {cards.map((card, idx) => (
          <motion.div
            key={"r1-" + idx}
            variants={hoverVariants}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={inView ? {
              opacity: 1,
              y: [6, -5, 6],
              rotate: idx * 4 - 8,
            } : { opacity: 0, y: 40 }}
            transition={{
              opacity: { delay: idx * 0.1, duration: 0.5 },
              rotate: { delay: idx * 0.1, duration: 0.5 },
              y: { delay: 0.5, duration: 3 + idx * 0.4, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className={cn(
              "mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl p-3 border shadow-lg cursor-pointer",
              dark ? `border-white/10 bg-[#111116] ${card.border}` : `border-gray-200 bg-white`
            )}
          >
            <card.icon className={`w-4 h-4 mb-1 ${card.color}`} />
            <div className={`text-[10px] ${dark ? "text-white/30" : "text-gray-400"}`}>{card.label}</div>
            <div className={`text-base font-black font-mono ${card.color}`}>{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Row 2 — offset float phase */}
      <div className="flex flex-row">
        {[...cards].reverse().map((card, idx) => (
          <motion.div
            key={"r2-" + idx}
            variants={hoverVariants}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={inView ? {
              opacity: 1,
              y: [-6, 5, -6],
              rotate: idx * 3 - 6,
            } : { opacity: 0, y: 40 }}
            transition={{
              opacity: { delay: 0.15 + idx * 0.1, duration: 0.5 },
              rotate: { delay: 0.15 + idx * 0.1, duration: 0.5 },
              y: { delay: 0.6, duration: 2.8 + idx * 0.3, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className={cn(
              "mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl p-3 border shadow-lg cursor-pointer",
              dark ? `border-white/10 bg-[#111116]` : `border-gray-200 bg-white`
            )}
          >
            <card.icon className={`w-4 h-4 mb-1 ${card.color}`} />
            <div className={`text-[10px] ${dark ? "text-white/30" : "text-gray-400"}`}>{card.label}</div>
            <div className={`text-base font-black font-mono ${card.color}`}>{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Side gradient fades */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 ${dark ? "bg-gradient-to-r from-[#0a0a0a] to-transparent" : "bg-gradient-to-r from-gray-50 to-transparent"}`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 ${dark ? "bg-gradient-to-l from-[#0a0a0a] to-transparent" : "bg-gradient-to-l from-gray-50 to-transparent"}`} />
    </div>
  )
}

// ─── SKELETON 3: Action Toolkit with typewriter + badge pulse ─────────────────
const SkeletonThree = ({ dark }: { dark: boolean }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [typedIdx, setTypedIdx] = useState(0)
  const [activeBadge, setActiveBadge] = useState(-1)

  const actions = [
    { icon: "✉️", title: "Follow-up Email",   badge: "Ready",    bc: "text-green-400 border-green-400/25 bg-green-400/8",  pulse: true  },
    { icon: "📋", title: "RTI Application",   badge: "Draft",    bc: "text-amber-400 border-amber-400/25 bg-amber-400/8",  pulse: false },
    { icon: "⚖️", title: "Escalation Letter", badge: "Ready",    bc: "text-green-400 border-green-400/25 bg-green-400/8",  pulse: true  },
    { icon: "📊", title: "Delay Report PDF",  badge: "Generate", bc: dark ? "text-white/40 border-white/10 bg-white/5" : "text-gray-500 border-gray-200 bg-gray-50", pulse: false },
  ]

  // Typewriter — reveal one row at a time
  useEffect(() => {
    if (!inView) return
    if (typedIdx >= actions.length) return
    const t = setTimeout(() => setTypedIdx(i => i + 1), 350 + typedIdx * 150)
    return () => clearTimeout(t)
  }, [inView, typedIdx])

  // Cycle active badge highlight
  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setActiveBadge(i => (i + 1) % actions.length), 2200)
    return () => clearInterval(t)
  }, [inView])

  return (
    <div ref={ref} className={`group relative flex h-full flex-col gap-2 overflow-hidden rounded-xl p-4 ${dark ? "bg-[#111116] border border-white/8" : "bg-white border border-gray-100 shadow-sm"}`}>
      {/* Header with blinking cursor */}
      <div className="flex items-center gap-2 mb-1">
        <div className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-violet-400" : "text-violet-600"}`}>
          AI Action Toolkit
        </div>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className={`inline-block w-0.5 h-3.5 rounded-full ${dark ? "bg-violet-400" : "bg-violet-600"}`}
        />
      </div>

      {actions.map((a, i) => (
        <AnimatePresence key={a.title}>
          {i < typedIdx && (
            <motion.div
              initial={{ opacity: 0, x: -16, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              whileHover={{ x: 5 }}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                activeBadge === i
                  ? dark ? "border-violet-500/40 bg-violet-500/8" : "border-violet-300 bg-violet-50"
                  : dark ? "border-white/5 bg-white/2 hover:border-violet-500/25 hover:bg-violet-500/4" : "border-gray-100 bg-gray-50 hover:border-violet-200 hover:bg-violet-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  animate={activeBadge === i ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="text-base"
                >
                  {a.icon}
                </motion.span>
                <div className={`text-xs font-medium ${dark ? "text-white/70" : "text-gray-700"}`}>{a.title}</div>
              </div>
              <motion.span
                animate={a.pulse && activeBadge === i
                  ? { boxShadow: ["0 0 0px rgba(74,222,128,0)", "0 0 8px rgba(74,222,128,0.5)", "0 0 0px rgba(74,222,128,0)"] }
                  : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${a.bc}`}
              >
                {a.badge}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Hover glow overlay */}
      <div className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${dark ? "bg-gradient-to-br from-violet-600/6 to-transparent" : "bg-gradient-to-br from-violet-100/40 to-transparent"}`} />
    </div>
  )
}

// ─── SKELETON 4: Cobe Globe with pulsing rings ────────────────────────────────
const PendencyGlobe = ({ className, dark }: { className?: string; dark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    if (!canvasRef.current) return
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: dark ? 1 : 0,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: dark ? 6 : 8,
      baseColor: dark ? [0.18, 0.16, 0.32] : [0.85, 0.85, 0.95],
      markerColor: [0.55, 0.36, 1],
      glowColor: dark ? [0.5, 0.35, 0.9] : [0.65, 0.45, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.05 },
        { location: [40.7128, -74.006],   size: 0.08 },
        { location: [51.5074, -0.1278],   size: 0.06 },
        { location: [28.6139, 77.2090],   size: 0.07 },
        { location: [1.3521, 103.8198],   size: 0.05 },
        { location: [-33.865, 151.209],   size: 0.04 },
        { location: [48.8566, 2.3522],    size: 0.05 },
        { location: [35.6762, 139.6503],  size: 0.06 },
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.005
      },
    })
    return () => { globe.destroy() }
  }, [dark])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  )
}

const SkeletonFour = ({ dark }: { dark: boolean }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <div ref={ref} className="relative mt-6 flex h-60 flex-col items-center bg-transparent md:h-60 overflow-visible">
      {/* Pulsing rings */}
      {inView && [0, 1, 2].map(i => (
        <motion.div
          key={i}
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
          className={`absolute top-1/2 -translate-y-1/2 w-24 h-24 rounded-full border ${dark ? "border-violet-500/30" : "border-violet-400/25"} pointer-events-none`}
        />
      ))}

      {/* Globe fade-in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-20 md:-bottom-24"
      >
        <PendencyGlobe dark={dark} />
      </motion.div>
    </div>
  )
}

// ─── BENTO WRAPPERS ───────────────────────────────────────────────────────────
const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn("relative overflow-hidden p-6 sm:p-8", className)}>{children}</div>
)

const FeatureTitle = ({ children, dark }: { children?: React.ReactNode; dark: boolean }) => (
  <p className={`text-left text-xl font-semibold tracking-tight md:text-2xl ${dark ? "text-white" : "text-gray-900"}`}>
    {children}
  </p>
)

const FeatureDescription = ({ children, dark }: { children?: React.ReactNode; dark: boolean }) => (
  <p className={`my-2 max-w-sm text-left text-sm leading-relaxed ${dark ? "text-white/40" : "text-gray-500"}`}>
    {children}
  </p>
)

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export function FeaturesBento({ dark = true }: { dark?: boolean }) {
  const features = [
    {
      title: "Track every pending case",
      description: "A unified live dashboard monitors all your pending applications, visas, and filings with real-time risk escalation and silence tracking.",
      skeleton: <SkeletonOne dark={dark} />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r",
    },
    {
      title: "AI risk scores on demand",
      description: "Get a precise 0–100 risk score for any case. Hover cards to inspect each metric — ghost rate, silence benchmark, career impact.",
      skeleton: <SkeletonTwo dark={dark} />,
      className: "border-b col-span-1 lg:col-span-2",
    },
    {
      title: "Turn silence into action",
      description: "AI-generated follow-up emails, RTI drafts, and escalation letters — one click from analysis to action.",
      skeleton: <SkeletonThree dark={dark} />,
      className: "col-span-1 lg:col-span-3 lg:border-r",
    },
    {
      title: "Global case intelligence",
      description: "50+ countries, 200+ institution types. Our benchmarks span every continent — so you always know where you stand globally.",
      skeleton: <SkeletonFour dark={dark} />,
      className: "col-span-1 lg:col-span-3",
    },
  ]

  const borderColor = dark ? "border-white/8" : "border-gray-200"

  return (
    <div className="relative z-20 mx-auto max-w-6xl py-10 lg:py-24 px-6">
      {/* Header */}
      <div className="px-2 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? "text-violet-400" : "text-violet-600"}`}
        >
          Features
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto max-w-3xl text-3xl font-bold tracking-tight lg:text-5xl lg:leading-tight ${dark ? "text-white" : "text-gray-900"}`}
        >
          Everything you need to<br />
          <span className={dark ? "text-white/35" : "text-gray-400"}>decode the silence</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.13 }}
          className={`mx-auto mt-4 max-w-2xl text-sm lg:text-base ${dark ? "text-white/35" : "text-gray-500"}`}
        >
          A complete intelligence platform for anyone waiting on an institutional response — anywhere in the world.
        </motion.p>
      </div>

      {/* Bento grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className={`mt-4 grid grid-cols-1 rounded-2xl border lg:grid-cols-6 overflow-hidden ${borderColor}`}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
            }}
            className={cn(
              "relative",
              feature.className,
              borderColor,
              dark
                ? "hover:bg-white/[0.018] transition-colors duration-400"
                : "hover:bg-violet-50/40 transition-colors duration-400"
            )}
          >
            <FeatureCard>
              <FeatureTitle dark={dark}>{feature.title}</FeatureTitle>
              <FeatureDescription dark={dark}>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
