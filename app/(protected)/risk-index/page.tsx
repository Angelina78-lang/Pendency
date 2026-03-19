
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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Global Risk Index</h1>
                <p className="text-neutral-500">Macro-level analysis of institutional delay patterns worldwide.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Global Ticket */}
                <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-400 uppercase tracking-widest mb-2">Global Delay Index</h2>
                        <div className="text-6xl font-black text-white tracking-tighter">{globalIndex}</div>
                        <div className="text-sm text-amber-500 font-bold mt-2 flex items-center gap-2">
                            <Globe2 className="w-4 h-4" />
                            {globalIndex > 60 ? "High Risk Level" : globalIndex > 40 ? "Moderate Risk Level" : "Low Risk Level"}
                        </div>
                    </div>
                    <div className="h-24 w-48 bg-gradient-to-t from-amber-500/20 to-transparent rounded-xl border-b-2 border-amber-500 relative">
                        <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-2 pb-1">
                            {[40, 60, 45, 70, 50, 54].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-4 bg-amber-500/50 rounded-t-sm" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sector Table */}
                <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="p-4 text-xs font-bold text-neutral-500 uppercase">Sector</th>
                                <th className="p-4 text-xs font-bold text-neutral-500 uppercase text-right">Risk Index</th>
                                <th className="p-4 text-xs font-bold text-neutral-500 uppercase text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectors.map((s: any, i: number) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4 font-medium text-white">{s.name}</td>
                                    <td className="p-4 text-right font-mono text-neutral-300">{s.index}</td>
                                    <td className={`p-4 text-right text-xs font-bold uppercase ${s.trend === 'Critical' ? 'text-red-500' :
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
