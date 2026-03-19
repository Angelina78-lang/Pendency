"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ArrowUpRight, MoreHorizontal, AlertTriangle, ShieldCheck, AlertOctagon, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function MyCases() {
    const [cases, setCases] = useState<any[]>([])
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch("/api/cases")
                if (res.ok) {
                    const data = await res.json()
                    // Map DB structure to UI structure
                    const mappedCases = data.map((c: any) => ({
                        id: c.id.substring(0, 8).toUpperCase(), // Short ID
                        title: c.roleTitle,
                        org: c.institution?.name || "Unknown Org",
                        category: c.institution?.type || "OTHER",
                        date: new Date(c.appliedDate).toISOString().split('T')[0],
                        days: c.silenceRecord?.daysHighSilence || 0,
                        risk: (c.silenceRecord?.riskScore / 10) || 0, // Scale 0-100 to 0-10 sigma approx
                        prob: c.silenceRecord?.riskScore || 0,
                        status: (c.silenceRecord?.riskScore > 80) ? "critical" : (c.silenceRecord?.riskScore > 50) ? "warning" : "safe"
                    }))
                    setCases(mappedCases)
                }
            } catch (error) {
                console.error("Failed to fetch cases:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCases()
    }, [])


    const filteredCases = cases.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.org.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === "all" || c.status === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">My Cases</h1>
                    <p className="text-neutral-500 text-sm">Manage and track your active pendencies.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <Input
                            placeholder="Search..."
                            className="bg-[#151515] border-white/10 pl-9 h-10 text-white placeholder:text-neutral-600 focus-visible:ring-[#00f3ff]/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-neutral-300">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button className="bg-[#00f3ff] text-black hover:bg-[#00f3ff]/80 font-bold">
                        + New Case
                    </Button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-white/5 pb-1">
                {['all', 'critical', 'warning', 'safe'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === status
                            ? 'border-[#00f3ff] text-[#00f3ff]'
                            : 'border-transparent text-neutral-500 hover:text-white'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* DATA TABLE */}
            <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest w-20">ID</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Case Details</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Organization</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-white">Days <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest text-right">Dev. Sigma</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest text-right">Prob.</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest text-center">Status</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCases.map((row) => (
                            <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="p-4 text-xs font-mono text-neutral-500">{row.id}</td>
                                <td className="p-4">
                                    <div className="font-medium text-white">{row.title}</div>
                                    <div className="text-xs text-neutral-500 mt-0.5">{row.category} • Submitted {row.date}</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[10px] text-neutral-400 font-bold">
                                            {row.org.slice(0, 2).toUpperCase()}
                                        </div>
                                        <span className="text-sm text-neutral-300">{row.org}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm font-mono text-neutral-300">{row.days}</td>
                                <td className="p-4 text-right">
                                    <div className={`font-mono font-bold ${row.risk > 3 ? 'text-red-500' : row.risk > 1.5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                        {row.risk.toFixed(1)}σ
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: `${row.prob}%` }} />
                                        </div>
                                        <span className="text-xs font-bold text-neutral-400">{row.prob}%</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${row.status === 'critical' ? 'bg-red-500/10 text-red-500' :
                                        row.status === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                                            'bg-emerald-500/10 text-emerald-500'
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-white">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#151515] border-white/10 text-neutral-300">
                                            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">View Details</DropdownMenuItem>
                                            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer text-[#00f3ff]">Generate Follow-up</DropdownMenuItem>
                                            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer text-red-400">Mark as Resolved</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
