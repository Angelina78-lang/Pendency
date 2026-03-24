"use client"

import { useState, useEffect } from "react"
import { Globe2, Loader2 } from "lucide-react"

export default function RiskIndexPage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRisk = async () => {
            try {
                const res = await fetch("/api/risk-index")
                if (res.ok) setData(await res.json())
            } catch (e) { console.error(e) }
            finally { setLoading(false) }
        }
        fetchRisk()
    }, [])

    if (loading) return (
        <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#00f3ff] animate-spin" />
        </div>
    )

    const { globalIndex, sectors } = data || { globalIndex: 50, sectors: [] }

    return (
        <div className="w-full max-w-5xl mx-auto px-6 pb-24 space-y-8 flex flex-col items-center mt-8">
            <div className="flex flex-col items-center justify-center mb-8 px-4 text-center">
                <h1 className="text-xl md:text-[22px] font-semibold tracking-tight text-[#EDEDED] mb-3">Global Risk Index</h1>
                <p className="text-[#A1A1AA] text-sm max-w-lg leading-relaxed font-normal">Macro-level structural analysis of institutional delay patterns worldwide.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {/* Global Ticket */}
                <div className="bg-[#1C1C1C] border border-transparent hover:border-[#272727] transition-colors p-8 rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-4">Global Delay Index</h2>
                        <div className="text-6xl font-black text-[#EDEDED] tracking-tighter">{globalIndex}</div>
                        <div className={`text-[11px] font-bold mt-4 flex items-center gap-2 px-3 py-1.5 rounded-sm w-fit ${globalIndex > 60 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : globalIndex > 40 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                            <Globe2 className="w-3.5 h-3.5" />
                            {globalIndex > 60 ? "HIGH RISK" : globalIndex > 40 ? "MODERATE RISK" : "STABLE"}
                        </div>
                    </div>
                    <div className="h-28 w-48 bg-gradient-to-t from-amber-500/10 to-transparent rounded-xl border-b border-amber-500/50 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-3 pb-1 gap-1">
                            {[40, 60, 45, 70, 50, 54].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-amber-500/30 rounded-t-sm hover:bg-amber-500/50 transition-colors" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sector Table */}
                <div className="bg-[#1C1C1C] border border-[#272727] rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[#272727]">
                                <th className="p-5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">Sector</th>
                                <th className="p-5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider text-right">Risk Index</th>
                                <th className="p-5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectors.map((s: any, i: number) => (
                                <tr key={i} className="border-b last:border-0 border-[#272727] hover:bg-[#1E1E1E] transition-colors">
                                    <td className="p-5 font-semibold text-sm text-[#EDEDED]">{s.name}</td>
                                    <td className="p-5 text-right font-mono text-sm text-[#A1A1AA]">{s.index}</td>
                                    <td className={`p-5 text-right text-[11px] font-bold uppercase tracking-wider ${s.trend === 'Critical' ? 'text-red-500' :
                                            s.trend === 'Safe' ? 'text-emerald-500' :
                                                'text-amber-500'
                                        }`}>{s.trend}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
