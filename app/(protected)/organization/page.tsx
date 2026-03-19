
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, Building2, TrendingDown, Users, Clock, Loader2 } from "lucide-react"

export default function OrganizationPage() {
    const [query, setQuery] = useState("")
    const [orgs, setOrgs] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [debouncedQuery, setDebouncedQuery] = useState("")

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 500)
        return () => clearTimeout(timer)
    }, [query])

    useEffect(() => {
        const fetchOrgs = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/organization?query=${debouncedQuery}`)
                if (res.ok) {
                    const data = await res.json()
                    setOrgs(data)
                }
            } catch (error) {
                console.error("Failed to fetch organizations")
            } finally {
                setLoading(false)
            }
        }
        fetchOrgs()
    }, [debouncedQuery])

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Organization Intelligence</h1>
                <p className="text-neutral-500">Analyze institutional performance and delay patterns.</p>
            </div>

            {/* Search Hero */}
            <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center transition-all focus-within:ring-1 focus-within:ring-[#00f3ff]/20">
                <h2 className="text-xl font-semibold text-white mb-4">Find an Institution</h2>
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <Input
                        placeholder="Search for companies, universities, or government bodies..."
                        className="bg-[#0D0D0D] border-white/10 text-white h-14 pl-12 rounded-xl text-lg focus-visible:ring-[#00f3ff]/50"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-[#00f3ff] animate-spin" />
                    </div>
                ) : orgs.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        {query ? "No organizations found." : "Enter a name to start analyzing."}
                    </div>
                ) : (
                    orgs.map((org) => (
                        <div key={org.id} className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                            <div className="h-24 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
                            <div className="px-8 pb-8 -mt-12">
                                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                                    <div className="flex items-end gap-6">
                                        <div className="w-20 h-20 bg-[#0D0D0D] border border-white/10 rounded-xl flex items-center justify-center shadow-2xl shrink-0">
                                            <Building2 className="w-8 h-8 text-neutral-400" />
                                        </div>
                                        <div className="mb-1">
                                            <h2 className="text-2xl font-bold text-white">{org.name}</h2>
                                            <div className="text-sm text-neutral-500 flex flex-wrap gap-4 mt-1">
                                                <span className="bg-white/5 px-2 py-0.5 rounded text-xs">{org.type}</span>
                                                <span className="hidden md:inline">•</span>
                                                <span className="hidden md:inline">{org.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-1 text-right w-full md:w-auto">
                                        <div className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Risk Score</div>
                                        <div className={`text-3xl font-mono font-bold ${org.riskScore > 50 ? 'text-red-500' : 'text-emerald-500'}`}>
                                            {org.riskScore > 50 ? 'High' : 'Low'} ({org.riskScore}/100)
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                    <div className="bg-[#0D0D0D] p-4 rounded-xl border border-white/5">
                                        <div className="text-xs text-neutral-500 uppercase flex items-center gap-2 mb-2">
                                            <Clock className="w-3 h-3" /> Avg Response Time
                                        </div>
                                        <div className="text-xl font-mono font-bold text-white">{org.avgResponseTime}</div>
                                        <div className="text-xs text-emerald-500 mt-1">-2 days vs Industry</div>
                                    </div>
                                    <div className="bg-[#0D0D0D] p-4 rounded-xl border border-white/5">
                                        <div className="text-xs text-neutral-500 uppercase flex items-center gap-2 mb-2">
                                            <TrendingDown className="w-3 h-3" /> Delay Probability
                                        </div>
                                        <div className="text-xl font-mono font-bold text-white">8%</div>
                                        <div className="text-xs text-emerald-500 mt-1">{org.trend}</div>
                                    </div>
                                    <div className="bg-[#0D0D0D] p-4 rounded-xl border border-white/5">
                                        <div className="text-xs text-neutral-500 uppercase flex items-center gap-2 mb-2">
                                            <Users className="w-3 h-3" /> Ghost Rate
                                        </div>
                                        <div className="text-xl font-mono font-bold text-white">{org.ghostRate}</div>
                                        <div className="text-xs text-amber-500 mt-1">Calculated Estimate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
