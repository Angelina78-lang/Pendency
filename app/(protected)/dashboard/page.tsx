"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Search,
  Sparkles,
  Activity,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  BarChart3,
  PieChart,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Mail,
  FileText
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Advanced Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0 }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }


  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsAnalyzing(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const result = await response.json();

      if (result.success) {
        setAnalysisData(result.data);
        setHasSearched(true)
      }
    } catch (error) {
      console.error("Simulation failed", error);
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Real Analytics-style Data (Dynamic)
  const items = [
    {
      title: "Risk Probability Score",
      description: "AI-calculated failure probability based on silence duration.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
          <div className="text-5xl font-black text-red-500 tracking-tighter relative z-10">{analysisData?.riskScore || 82}%</div>
          <div className="text-xs font-bold text-red-400 uppercase tracking-widest mt-2">{analysisData?.riskScore > 70 ? "Critical Risk" : "Moderate Risk"}</div>
        </div>
      ),
      icon: <TrendingUp className="h-4 w-4 text-red-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Response Latency Analysis",
      description: `Your wait time vs. sector average (${analysisData?.latency?.avg || 18} days).`,
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 flex items-end p-6 gap-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/5" />
          <div className="w-8 h-[40%] bg-amber-200/50 rounded-t-md relative group-hover:h-[45%] transition-all duration-500"><div className="absolute -top-4 w-full text-center text-[10px] text-amber-400 font-bold">AVG</div></div>
          <div className="w-8 h-[30%] bg-amber-200/50 rounded-t-md relative group-hover:h-[35%] transition-all duration-500 delay-75"></div>
          <div className="w-8 h-[80%] bg-amber-500 rounded-t-md relative shadow-lg group-hover:h-[85%] transition-all duration-500 delay-150"><div className="absolute -top-4 w-full text-center text-[10px] text-amber-600 font-bold">YOU</div></div>
          <div className="w-8 h-[25%] bg-amber-200/50 rounded-t-md relative group-hover:h-[30%] transition-all duration-500 delay-100"></div>
        </div>
      ),
      icon: <Clock className="h-4 w-4 text-amber-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Market Sentiment",
      description: "Hiring freeze detected in sector.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5" />
          <Activity className="h-16 w-16 text-blue-500/20 absolute" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">{analysisData?.sentiment || "Freezing"}</span>
            <span className="text-xs text-blue-400 uppercase tracking-wider">Market Status</span>
          </div>
        </div>
      ),
      icon: <Activity className="h-4 w-4 text-blue-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Applicant Variance",
      description: "You are in the top 15% of candidates by keyword match.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5" />
          <div className="w-full h-full flex items-end gap-1">
            {[40, 60, 45, 80, 55, 70, 40, 60, 45, 80, 55, 70, 90, 60].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={cn(
                  "flex-1 rounded-t-sm",
                  i === 12 ? "bg-emerald-500" : "bg-emerald-200/50"
                )}
              />
            ))}
          </div>
        </div>
      ),
      icon: <BarChart3 className="h-4 w-4 text-emerald-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Ghosting Index",
      description: `This company ghosts ${analysisData?.ghostingIndex || 64}% of applicants.`,
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-500/5" />
          <svg className="w-24 h-24 transform -rotate-90">
            <circle className="text-purple-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="48" cy="48" />
            <circle className="text-purple-500" strokeWidth="8" strokeDasharray={251} strokeDashoffset={251 - (251 * (analysisData?.ghostingIndex || 64)) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="48" cy="48" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold text-purple-600">{analysisData?.ghostingIndex || 64}%</span>
          </div>
        </div>
      ),
      icon: <AlertTriangle className="h-4 w-4 text-purple-500" />,
      className: "md:col-span-1",
    },
  ];


  const handleBack = () => {
    setHasSearched(false)
    setQuery("")
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden font-sans selection:bg-orange-200 relative">

      {/* 
         --- BACKGROUND (EXACT MATCH TO LANDING PAGE) --- 
         No circle div, just the gradients.
      */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          layout
          className="relative w-[120vw] h-[120vw] md:w-[1200px] md:h-[1200px] flex items-center justify-center origin-center"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF5722] via-[#E91E63] to-[#9C27B0] blur-[120px] opacity-20 animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-[#2196F3] via-transparent to-[#FF9800] blur-[120px] opacity-20 mix-blend-overlay" />
        </motion.div>
      </div>

      <div className={cn(
        "container mx-auto px-6 relative z-10 flex flex-col transition-all duration-700 ease-in-out min-h-screen",
        hasSearched ? "pt-12 justify-start" : "justify-center"
      )}>

        {/* TOP BAR / BACK BUTTON */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-between items-center mb-8"
            >
              <Button
                variant="ghost"
                onClick={handleBack}
                className="group flex items-center gap-2 hover:bg-white/50 rounded-full px-4 py-6 text-neutral-600 font-medium"
              >
                <div className="p-2 rounded-full bg-white border border-neutral-200 group-hover:scale-110 transition-transform">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span>Back to Search</span>
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-3 py-1 bg-white/50 rounded-full border border-neutral-100">
                  Search Mode
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEARCH SECTION */}
        <motion.div
          layout
          className="w-full max-w-4xl mx-auto text-center"
        >
          <AnimatePresence mode="popLayout">
            {!hasSearched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-serif font-black tracking-tighter text-neutral-900 mb-6 text-6xl md:text-8xl leading-[0.9]">
                  Decode the Silence.
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-xl mx-auto font-medium">
                  Paste your job description, rejection email, or situation below.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            layout
            onSubmit={handleSearch}
            className={cn(
              "relative group mx-auto transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              hasSearched ? "w-full mb-12" : "w-full max-w-xl"
            )}
          >
            <div className="relative flex items-center">
              <Search className={cn(
                "absolute left-6 w-6 h-6 text-neutral-500 z-20 transition-all",
                hasSearched && "text-orange-500"
              )} />

              {/* GLOWING INPUT */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'Applied 2 weeks ago, no response. Is this normal for Google?'"
                readOnly={hasSearched}
                className={cn(
                  "w-full rounded-full border bg-white/70 backdrop-blur-2xl transition-all duration-500 text-xl placeholder:text-neutral-400 text-neutral-900 outline-none z-10",
                  hasSearched
                    ? "h-16 pl-16 pr-6 border-white/60 shadow-sm bg-white/40 cursor-default"
                    : "h-20 pl-16 pr-6 border-white/40 shadow-[0_0_40px_-5px_rgba(255,87,34,0.3)] focus:shadow-[0_0_80px_-10px_rgba(255,87,34,0.6)] focus:ring-4 focus:ring-orange-200"
                )}
              />

              {!hasSearched && (
                <Button
                  type="submit"
                  disabled={isAnalyzing}
                  size="icon"
                  className={cn(
                    "absolute right-3 top-3 h-14 w-14 rounded-full transition-all duration-300 z-20",
                    query ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg scale-100" : "bg-neutral-200 text-neutral-400 scale-90 opacity-0 pointer-events-none",
                    isAnalyzing && "animate-pulse cursor-wait"
                  )}
                >
                  {isAnalyzing ? <Sparkles className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                </Button>
              )}

              {/* Extra Glow Layer */}
              {!hasSearched && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 via-pink-500/30 to-purple-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-0" />
              )}
            </div>
          </motion.form>
        </motion.div>

        {/* ANALYTICS GRID (Reveals after search) */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full pb-20 max-w-6xl mx-auto"
            >
              <BentoGrid>
                {items.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={cn(item.className, "bg-white/60 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1")}
                  />
                ))}
              </BentoGrid>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
