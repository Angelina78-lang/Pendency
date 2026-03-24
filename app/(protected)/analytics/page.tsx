"use client"


import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { Download, Calendar, Activity, Zap, TrendingUp, Loader2 } from "lucide-react"

import { motion } from "framer-motion"

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch('/api/analytics')
                if (res.ok) {
                    const json = await res.json()
                    setData(json)
                }
            } catch (e) {
                console.error("Failed to fetch analytics")
            } finally {
                setLoading(false)
            }
        }
        fetchAnalytics()
    }, [])

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#00f3ff] animate-spin" />
            </div>
        )
    }

    const { trendData, categoryData, benchmarkData } = data || {}

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto px-6 pb-24 space-y-8 flex flex-col items-center mt-8 selection:bg-[#00f3ff]/30"
        >
            {/* Header */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#272727] pb-4">
                <div className="text-center md:text-left">
                    <h1 className="text-xl md:text-[22px] font-semibold tracking-tight text-[#EDEDED] mb-1">Advanced Analytics</h1>
                    <p className="text-[#A1A1AA] text-sm">Predictive modeling and historical delay analysis.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-transparent border-[#272727] hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/10 text-[#EDEDED] hover:text-[#00f3ff] rounded-full h-9 text-xs font-semibold px-4 transition-colors">
                        <Calendar className="w-4 h-4 mr-2" /> Last 30 Days
                    </Button>
                    <Button className="bg-[#EDEDED] text-[#141414] hover:bg-[#00f3ff] hover:text-[#141414] shadow-[0_0_15px_transparent] hover:shadow-[0_0_15px_#00f3ff] text-xs h-9 rounded-full px-5 font-bold transition-all">
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-4">

                {/* Main Chart: Risk Projection */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.01, y: -4 }}
                    className="lg:col-span-2 bg-[#1C1C1C] border border-[#272727] hover:border-[#00f3ff]/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] transition-colors p-6 rounded-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <div className="flex flex-col">
                            <h3 className="text-[16px] font-bold text-[#EDEDED] flex items-center gap-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-[#00f3ff] drop-shadow-[0_0_5px_#00f3ff]" /> Risk vs Safety Projection
                            </h3>
                            <p className="text-[11px] text-[#A1A1AA]">Charts the comparative velocity of cases crossing into critical threshold bounds.</p>
                        </div>
                        <div className="flex gap-4 text-[10px] font-bold uppercase text-[#A1A1AA] tracking-wider">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]" /> Avg Risk Score</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" /> Safe Response Rate</span>
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#272727" vertical={false} />
                                <XAxis dataKey="day" stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#141414', borderColor: '#00f3ff', color: '#EDEDED', borderRadius: '12px', fontSize: '13px', boxShadow: '0 0 20px rgba(0,243,255,0.2)' }}
                                    itemStyle={{ color: '#EDEDED', fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" vectorEffect="non-scaling-stroke" />
                                <Area type="monotone" dataKey="safe" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSafe)" vectorEffect="non-scaling-stroke" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Right Column: Key Metrics */}
                <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="bg-[#1C1C1C] border border-[#272727] hover:border-[#8B5CF6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-colors p-6 rounded-2xl h-full flex flex-col relative group"
                    >
                        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#8B5CF6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="mb-4 text-center">
                            <h3 className="text-[13px] font-bold text-[#EDEDED] uppercase tracking-wider mb-1">Delay Distribution</h3>
                            <p className="text-[10px] text-[#A1A1AA]">Clustered distribution of current systemic bottlenecks.</p>
                        </div>
                        <div className="h-[200px] flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-lg outline-none" style={{ filter: `drop-shadow(0px 0px 5px ${entry.color})` }} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#141414', borderColor: '#8B5CF6', color: '#EDEDED', borderRadius: '12px', border: '1px solid #8B5CF6', fontSize: '12px', boxShadow: '0 0 20px rgba(139,92,246,0.2)' }} itemStyle={{ color: '#A1A1AA' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-4 text-[9px] font-extrabold text-[#EDEDED] uppercase tracking-widest">
                            {categoryData.map((cat, i) => (
                                <span key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#141414] border border-[#272727]">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color, boxShadow: `0 0 5px ${cat.color}` }} />
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Grid: Benchmarks & Scatter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full border-t border-[#272727] pt-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-[#1C1C1C] border border-[#272727] hover:border-[#10B981]/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-colors p-8 rounded-2xl relative group"
                >
                    <div className="absolute top-0 w-full left-0 h-1 bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="mb-6 flex flex-col items-center">
                        <h3 className="text-[17px] font-bold text-[#EDEDED] flex justify-center items-center gap-2 mb-1">
                            <Activity className="w-5 h-5 text-[#10B981] drop-shadow-[0_0_5px_#10B981]" /> Industry Benchmarking
                        </h3>
                        <p className="text-[12px] text-[#A1A1AA]">Your organization's procedural footprint vs. global multi-sector averages.</p>
                    </div>
                    <div className="h-[250px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={benchmarkData}>
                                <PolarGrid stroke="#272727" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 700 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Your Cases" dataKey="A" stroke="#10B981" strokeWidth={3} fill="#10B981" fillOpacity={0.25} />
                                <Radar name="Global Avg" dataKey="B" stroke="#52525B" strokeWidth={2} fill="#52525B" fillOpacity={0.15} />
                                <Tooltip contentStyle={{ backgroundColor: '#141414', borderColor: '#10B981', color: '#EDEDED', borderRadius: '12px', fontSize: '13px', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-[#141414] border border-[#F43F5E]/30 relative overflow-hidden transition-colors p-8 rounded-2xl flex flex-col justify-center items-center text-center group shadow-[0_0_20px_rgba(244,63,94,0.05)] hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#F43F5E]/5 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F43F5E]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-14 h-14 bg-gradient-to-br from-[#F43F5E] to-[#9F1239] rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_#F43F5E] shadow-xl relative z-10">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="relative z-10">
                       <h3 className="text-xl font-bold text-[#EDEDED] mb-2 tracking-tight">AI Predictive Synthesis Report</h3>
                       <p className="text-[13px] text-[#A1A1AA] max-w-sm leading-relaxed mb-8">
                           Based on your current trajectory vector, your average structural delay time is predicted to dynamically decrease by <strong className="text-[#00f3ff] text-[15px] font-black drop-shadow-[0_0_5px_#00f3ff]">18%</strong> if immediate recommended escalations are actively routed.
                       </p>
                       <button className="bg-gradient-to-r from-[#F43F5E] to-[#E11D48] text-white text-xs h-10 rounded-full px-8 font-bold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_5px_15px_rgba(244,63,94,0.4)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.6)]">
                           View Tactical Report
                       </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
