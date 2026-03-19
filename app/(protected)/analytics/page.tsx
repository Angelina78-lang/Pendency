"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { Download, Calendar, Activity, Zap, TrendingUp } from "lucide-react"


import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { Download, Calendar, Activity, Zap, TrendingUp, Loader2 } from "lucide-react"

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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Advanced Analytics</h1>
                    <p className="text-neutral-500">Predictive modeling and historical delay analysis.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-neutral-300">
                        <Calendar className="w-4 h-4 mr-2" /> Last 30 Days
                    </Button>
                    <Button className="bg-[#00f3ff] text-black hover:bg-[#00f3ff]/80 font-bold">
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Chart: Risk Projection */}
                <div className="lg:col-span-2 bg-[#151515]/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#00f3ff]" /> Risk vs Safety Projection
                        </h3>
                        <div className="flex gap-2 text-xs">
                            <div className="flex items-center gap-1 text-neutral-400"><div className="w-2 h-2 rounded-full bg-red-500/50" /> Avg Risk Score</div>
                            <div className="flex items-center gap-1 text-neutral-400"><div className="w-2 h-2 rounded-full bg-emerald-500/50" /> Safe Response Rate</div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0D0D0D', borderColor: '#333', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
                                <Area type="monotone" dataKey="safe" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSafe)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Key Metrics */}
                <div className="space-y-6">
                    <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-6">Delay Distribution</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#0D0D0D', borderColor: '#333', color: '#fff' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            {categoryData.map((cat, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-400">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                    {cat.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid: Benchmarks & Scatter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#00f3ff]" /> Industry Benchmarking
                    </h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={benchmarkData}>
                                <PolarGrid stroke="#333" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Your Cases" dataKey="A" stroke="#00f3ff" strokeWidth={2} fill="#00f3ff" fillOpacity={0.3} />
                                <Radar name="Global Avg" dataKey="B" stroke="#666" strokeWidth={2} fill="#666" fillOpacity={0.1} />
                                <Tooltip contentStyle={{ backgroundColor: '#0D0D0D', borderColor: '#333', color: '#fff' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#00f3ff]/10 rounded-full flex items-center justify-center mx-auto">
                            <Zap className="w-8 h-8 text-[#00f3ff]" />
                        </div>
                        <h3 className="text-xl font-bold text-white">AI Predictive Report</h3>
                        <p className="text-sm text-neutral-400 max-w-xs mx-auto">
                            Based on your current trajectory, your average delay time is projected to decrease by <strong>18%</strong> if you follow recommended escalation paths.
                        </p>
                        <Button variant="outline" className="mt-4 border-white/10 hover:bg-white/5">View Detailed Report</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
