"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI parsing delay then route to organization intelligence
    setTimeout(() => {
        router.push(`/organization?search=${encodeURIComponent(query)}`);
    }, 800)
  }

  // Shared Header for Cards with contextual feature explanations
  const CardHeader = ({ title, explanation }: { title: string, explanation: string }) => (
    <div className="flex flex-col items-center mb-8 w-full text-center">
      <h3 className="text-[16px] font-bold text-[#EDEDED] flex justify-center w-full mb-2 tracking-tight">{title}</h3>
      <p className="text-[12px] text-[#A1A1AA] max-w-[280px] leading-relaxed font-medium">
        {explanation}
      </p>
    </div>
  )

  // Minimalist Mock Charts mapping Pendency Data
  
  // 1. Bar Chart (Application Volume)
  const renderBarChart = () => (
    <div className="w-full h-[120px] flex items-end justify-between px-4 gap-[2px]">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className="w-full bg-[#272727] rounded-sm hover:bg-[#3B82F6]/50 transition-colors"
          style={{ height: `${Math.random() * 60 + 20}%` }}
        />
      ))}
    </div>
  )

  // 2. Horizontal Bars (Top Institutions)
  const renderHorizontalBars = () => (
    <div className="w-full max-w-[200px] flex flex-col gap-3 items-center mt-4">
       {[70, 45, 25, 10, 5].map((w, i) => (
         <div key={i} className="w-full flex items-center gap-3">
           <div className="w-8 h-3 bg-[#2A2A2A] rounded-sm" />
           <div className="flex-1 h-3 bg-[#242424] rounded-sm overflow-hidden">
             <div className="h-full bg-[#313131]" style={{ width: `${w}%` }} />
           </div>
         </div>
       ))}
    </div>
  )

  // 3. Pie Chart (Action Origination)
  const renderPieChart = () => (
    <div className="w-24 h-24 rounded-full bg-[#2A2A2A] relative mt-2 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-[12px] border-[#313131] border-r-transparent border-b-transparent transform rotate-45" />
      <div className="absolute inset-0 rounded-full border-[12px] border-[#242424] border-t-transparent border-l-transparent transform -rotate-12" />
    </div>
  )

  // 4. Line Chart (Average Latency)
  const renderLineChart = () => (
    <div className="w-full h-[100px] relative overflow-hidden px-4 mt-4 cursor-crosshair">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path d="M0,80 Q20,60 40,75 T80,40 T120,65 T160,20 T200,50 T240,30 T280,60" fill="none" stroke="#313131" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d="M0,80 Q20,60 40,75 T80,40 T120,65 T160,20 T200,50 T240,30 T280,60 L280,100 L0,100 Z" fill="url(#grad)" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#313131" />
            <stop offset="100%" stopColor="#1C1C1C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )


  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-24 flex flex-col items-center selection:bg-[#8B5CF6]/30">
      
      {/* 
        CENTRAL SEARCH AREA 
        The primary action center for the dashboard homepage.
      */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl mt-12 mb-20 flex flex-col items-center"
      >
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 text-center"
         >
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-[#00f3ff] via-[#8B5CF6] to-[#f43f5e] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] pb-2 flex flex-col">
              <span>Decode the</span>
              <span className="text-white mt-[-5px]">Silence.</span>
            </h1>
         </motion.div>
         
         <p className="text-[#A1A1AA] text-[15px] font-medium text-center mb-10 max-w-md leading-relaxed">
           Enter an <span className="text-[#00f3ff]">institution</span>, <span className="text-[#8B5CF6]">tracking ID</span>, or case status below to instantly trace bureaucratic bottlenecks and predict structural delays.
         </p>
         
         <form onSubmit={handleSearch} className="w-full relative group shadow-[0_0_40px_-15px_rgba(139,92,246,0.4)] rounded-xl">
           {/* Animated colorful border glow on focus/hover */}
           <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#00f3ff] via-[#8B5CF6] to-[#F43F5E] opacity-40 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
           
           <div className="relative bg-[#141414] rounded-xl border border-white/10 flex items-center p-2 focus-within:border-transparent transition-colors z-10">
              <Search className="w-5 h-5 text-[#8B5CF6] ml-3 mr-2 shrink-0 group-focus-within:text-[#00f3ff] transition-colors" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search queries, authorities, or intelligence reports..." 
                className="w-full bg-transparent border-none text-[16px] font-medium text-[#EDEDED] placeholder:text-[#52525B] focus:outline-none py-3"
                spellCheck="false"
                disabled={isSearching}
              />
              <button 
                type="submit" 
                disabled={isSearching || !query.trim()}
                className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-bold text-xs px-6 py-3 rounded-lg transition-transform hover:scale-105 active:scale-95 ml-2 tracking-wider uppercase shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center shrink-0 min-w-[100px] justify-center"
              >
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Analyze"}
              </button>
           </div>
         </form>
      </motion.div>

      {/* 
        ANALYTICS GRID
        Transformed to neon/cyberpunk glowing Reown aesthetic
      */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full mb-8 flex items-center gap-3"
      >
        <div className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]" />
        <h2 className="text-[15px] font-bold text-[#EDEDED] tracking-wide uppercase">Global Micro-Intelligence Overview</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* Full Width Bar Chart */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           whileHover={{ scale: 1.015, y: -4 }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className="md:col-span-2 bg-[#1C1C1C] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#272727] hover:border-[#00f3ff]/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] transition-colors relative overflow-hidden group"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader title="Global Application Volume Throughput" explanation="Monitors the real-time velocity of cases entering global institutional pipelines. High volume correlates dynamically with structural delay risk." />
          {renderBarChart()}
        </motion.div>

        {/* Half Width Horizontal Bars */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           whileHover={{ scale: 1.02, y: -4 }}
           className="bg-[#1C1C1C] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#272727] hover:border-[#8B5CF6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-colors relative group"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader title="Top Silenced Institutions" explanation="Aggregates departments consistently displaying the highest latency coefficients (+3σ) against expected resolution deadlines." />
          {renderHorizontalBars()}
        </motion.div>

        {/* Half Width Horizontal Bars */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           whileHover={{ scale: 1.02, y: -4 }}
           className="bg-[#1C1C1C] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#272727] hover:border-[#F43F5E]/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)] transition-colors relative group"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F43F5E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader title="Calculated Risk Categories" explanation="Categorical breakdown of bureaucratic friction. Identifies exact stages (e.g. Legal, Compliance) blocking case velocity." />
          {renderHorizontalBars()}
        </motion.div>

        {/* Half Width Pie Chart */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           whileHover={{ scale: 1.02, y: -4 }}
           className="bg-[#1C1C1C] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#272727] hover:border-[#10B981]/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-colors relative group"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader title="AI Origination Index" explanation="Measures the origination source of application momentum: Internal systems vs. External systemic pressure." />
          {renderPieChart()}
          <div className="flex gap-4 mt-8 text-[11px] text-[#A1A1AA] uppercase font-bold tracking-wider">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_5px_#10B981]"/> Internal DB</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-[#10B981]"/> External APIs</span>
          </div>
        </motion.div>

        {/* Half Width Pie Chart */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           whileHover={{ scale: 1.02, y: -4 }}
           className="bg-[#1C1C1C] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#272727] hover:border-[#EAB308]/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-colors relative group"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#EAB308]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader title="Delay Factor Probabilities" explanation="AI-driven clustering mapping delays into 'Process Friction' (e.g. redundant paperwork) vs 'Review Arbitrage'." />
          {renderPieChart()}
          <div className="flex gap-4 mt-8 text-[11px] text-[#A1A1AA] uppercase font-bold tracking-wider">
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#EAB308] shadow-[0_0_5px_#EAB308]"/> Processing</span>
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-[#EAB308]"/> Review Loop</span>
          </div>
        </motion.div>

        {/* Full Width Line Chart */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           whileHover={{ scale: 1.015, y: -4 }}
           className="md:col-span-2 bg-[#1C1C1C] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#272727] hover:border-[#00f3ff]/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] transition-colors relative group"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader title="Predictive Average Latency" explanation="Longitudinal analysis plotting the time delta between application submission and definitive action. Shows predictive trajectory." />
           {renderLineChart()}
        </motion.div>

        {/* Full Width Line Chart */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           whileHover={{ scale: 1.015, y: -4 }}
           className="md:col-span-2 bg-[#1C1C1C] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#272727] hover:border-[#F43F5E]/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)] transition-colors relative group mb-8"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F43F5E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader title="Critical Escalation Triggers" explanation="Volume of cases crossing the deviation threshold into actionable status, requiring immediate human oversight." />
          {renderLineChart()}
        </motion.div>
      </div>

    </div>
  )
}
