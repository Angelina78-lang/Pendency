"use client"

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
        <div className="w-full max-w-5xl mx-auto px-6 pb-24 space-y-8 flex flex-col items-center mt-8">
            {/* Header */}
            <div className="flex flex-col items-center justify-center mb-8 px-4 text-center">
                <h1 className="text-xl md:text-[22px] font-semibold tracking-tight text-[#EDEDED] mb-3">Organization Intelligence</h1>
                <p className="text-[#A1A1AA] text-sm max-w-lg leading-relaxed font-normal">Analyze institutional performance and specific delay patterns across entities.</p>
            </div>

            {/* Search Hero */}
            <div className="w-full bg-transparent border-b border-[#272727] pb-10 text-center">
                <div className="w-full max-w-2xl mx-auto relative group">
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#3B82F6]/50 to-[#8B5CF6]/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
                    
                    <div className="relative bg-[#1C1C1C] rounded-xl border border-[#272727] flex items-center p-2 focus-within:border-[#3B82F6]/50 transition-colors">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                        <Input
                            placeholder="Find a company, university, or government body..."
                            className="w-full bg-transparent border-none text-[15px] text-[#EDEDED] h-12 pl-12 placeholder:text-[#52525B] focus:outline-none focus-visible:ring-0 shadow-none"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="w-full space-y-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-6 h-6 text-[#A1A1AA] animate-spin" />
                    </div>
                ) : orgs.length === 0 ? (
                    <div className="w-full p-12 flex flex-col items-center justify-center text-[#A1A1AA] rounded-2xl border border-dashed border-[#272727]">
                        <p className="text-sm">{query ? "No organizations found matching your search." : "Enter a name above to start analyzing."}</p>
                    </div>
                ) : (
                    orgs.map((org) => (
                        <div key={org.id} className="bg-[#1C1C1C] rounded-2xl overflow-hidden border border-[#272727] shadow-xl group hover:border-[#3B82F6]/50 transition-colors">
                            <div className="px-6 py-6 border-b border-[#272727]">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#2A2A2A] border border-[#313131] rounded-xl flex items-center justify-center shrink-0">
                                            <span className="text-[#EDEDED] font-bold tracking-tighter text-sm">{org.name.slice(0, 2).toUpperCase()}</span>
                                        </div>
                                        <div className="mb-1">
                                            <h2 className="text-[17px] font-semibold text-[#EDEDED]">{org.name}</h2>
                                            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#A1A1AA] flex flex-wrap gap-2 mt-1">
                                                <span>{org.type}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="hidden sm:inline">{org.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 mt-2 sm:mt-0">
                                        <div className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-widest">Risk Score</div>
                                        <div className={`text-sm font-mono font-bold px-2 py-0.5 rounded-sm ${org.riskScore > 50 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                            {org.riskScore}/100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="px-6 py-5 bg-[#181818] grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                        <Clock className="w-3 h-3" /> Avg Response
                                    </div>
                                    <div className="text-[#EDEDED] font-mono text-sm">{org.avgResponseTime}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                        <TrendingDown className="w-3 h-3" /> Delay Prob
                                    </div>
                                    <div className="text-[#EDEDED] font-mono text-sm">8%</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                        <Users className="w-3 h-3" /> Ghost Rate
                                    </div>
                                    <div className="text-[#EDEDED] font-mono text-sm">{org.ghostRate}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
