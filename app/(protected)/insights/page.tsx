
import { useState, useEffect } from "react"
import { BrainCircuit, Lightbulb, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"

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
            <Loader2 className="w-8 h-8 text-[#00f3ff] animate-spin" />
        </div>
    )

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">AI Insights</h1>
                <p className="text-neutral-500">Deep learning analysis of your pending cases.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.map((insight, i) => (
                    <div key={i} className="bg-[#151515]/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${insight.type === 'risk' ? 'bg-red-500/10 text-red-500' :
                                    insight.type === 'pattern' ? 'bg-purple-500/10 text-purple-500' :
                                        'bg-amber-500/10 text-amber-500'
                                }`}>
                                {insight.type === 'risk' ? <AlertTriangle className="w-5 h-5" /> :
                                    insight.type === 'pattern' ? <BrainCircuit className="w-5 h-5" /> :
                                        <Lightbulb className="w-5 h-5" />}
                            </div>
                            <h3 className="font-semibold text-white">{insight.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            {insight.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
