"use client"

import { useState, useEffect } from "react"
import { BrainCircuit, Lightbulb, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"

import { motion } from "framer-motion"

export default function InsightsPage() {
    const [insights, setInsights] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await fetch("/api/insights")
                if (res.ok) setInsights(await res.json())
            } catch (e) { }
            finally { setLoading(false) }
        }
        fetchInsights()
    }, [])

    if (loading) return (
        <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#00f3ff] animate-spin drop-shadow-[0_0_10px_#00f3ff]" />
        </div>
    )

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto px-6 pb-24 space-y-8 flex flex-col items-center mt-8 selection:bg-[#00f3ff]/30"
        >
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center justify-center mb-10 px-4 text-center"
            >
                <div className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] mb-4" />
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[#EDEDED] mb-3 uppercase drop-shadow-md">AI Insights</h1>
                <p className="text-[#A1A1AA] text-[15px] max-w-lg leading-relaxed font-medium">Deep learning analysis modeling and algorithmic pattern detection of your tracking history.</p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
                {insights.map((insight, i) => (
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        key={i} 
                        className={`bg-[#1C1C1C] border transition-all p-6 rounded-2xl flex flex-col relative overflow-hidden group shadow-lg ${
                            insight.type === 'risk' ? 'border-[#272727] hover:border-[#ef4444]/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]' :
                            insight.type === 'pattern' ? 'border-[#272727] hover:border-[#3b82f6]/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' :
                            'border-[#272727] hover:border-[#f59e0b]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                        }`}
                    >
                        {/* Hover Gradient Line */}
                        <div className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent to-transparent ${
                            insight.type === 'risk' ? 'via-[#ef4444]' :
                            insight.type === 'pattern' ? 'via-[#3b82f6]' :
                            'via-[#f59e0b]'
                        }`} />

                        <div className="flex items-center gap-4 mb-4 relative z-10">
                            <div className={`p-3 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-wider ${
                                insight.type === 'risk' ? 'bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
                                insight.type === 'pattern' ? 'bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]' :
                                'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            }`}>
                                {insight.type === 'risk' ? <AlertTriangle className="w-5 h-5 drop-shadow-[0_0_5px_#ef4444]" /> :
                                    insight.type === 'pattern' ? <BrainCircuit className="w-5 h-5 drop-shadow-[0_0_5px_#3b82f6]" /> :
                                        <Lightbulb className="w-5 h-5 drop-shadow-[0_0_5px_#f59e0b]" />}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-[#EDEDED] text-[15px] tracking-tight">{insight.title}</h3>
                                <span className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-widest">{insight.type} Detected</span>
                            </div>
                        </div>
                        <p className="text-[13px] text-[#A1A1AA] leading-relaxed flex-1 relative z-10">
                            {insight.description}
                        </p>

                        <button className="mt-6 w-full py-2 rounded-lg border border-[#272727] text-xs font-semibold text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-[#2A2A2A] transition-colors">
                            Analyze Parameters
                        </button>
                    </motion.div>
                ))}
            </motion.div>
            
             {insights.length === 0 && !loading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full p-16 flex flex-col items-center justify-center text-[#A1A1AA]"
                >
                    <BrainCircuit className="w-10 h-10 text-[#272727] mb-4" />
                    <p className="text-[14px] font-medium">No insights computed — <span className="text-[#00f3ff] border-b border-[#00f3ff]/30 pb-0.5 cursor-pointer hover:text-white transition-colors hover:border-white font-bold tracking-wide">analyze additional pendency records</span> to generate multi-vector AI models.</p>
                </motion.div>
            )}
        </motion.div>
    )
}
