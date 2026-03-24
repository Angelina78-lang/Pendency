"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto px-6 pb-24 space-y-8 flex flex-col items-center mt-8 selection:bg-[#00f3ff]/30"
        >
            {/* Header & Controls */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center justify-center mb-10 px-4 text-center"
            >
                <div className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] mb-4" />
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[#EDEDED] mb-3 uppercase drop-shadow-md">My Cases Ledger</h1>
                <p className="text-[#A1A1AA] text-[15px] max-w-lg leading-relaxed font-medium">Manage and track your active pendencies and institutional delays with real-time risk coefficients.</p>
            </motion.div>
            
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#272727] pb-4">
                {/* Filter Tabs wearing Neon Accents */}
                <div className="flex items-center gap-2 flex-wrap py-2">
                    {['all', 'critical', 'warning', 'safe'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-5 py-2 rounded-full text-xs transition-all whitespace-nowrap ${filter === status
                                ? 'border border-[#8B5CF6]/50 text-[#00f3ff] bg-[#8B5CF6]/10 shadow-[0_0_15px_rgba(139,92,246,0.3)] font-bold tracking-wide uppercase'
                                : 'text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-white/5 border border-transparent font-medium uppercase tracking-wider'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="flex gap-4">
                    <div className="relative w-72 group shadow-[0_0_15px_transparent] focus-within:shadow-[0_0_15px_rgba(0,243,255,0.2)] rounded-full transition-shadow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA] group-focus-within:text-[#00f3ff] transition-colors" />
                        <Input
                            placeholder="Search active cases..."
                            className="bg-[#141414] border border-[#272727] pl-11 h-10 text-[14px] text-[#EDEDED] placeholder:text-[#52525B] focus-visible:ring-1 focus-visible:ring-[#00f3ff]/50 focus-visible:border-[#00f3ff]/50 rounded-full shadow-inner"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            spellCheck={false}
                        />
                    </div>
                    <Button className="bg-gradient-to-r from-[#00f3ff] to-[#0284c7] hover:from-[#00f3ff] hover:to-[#0369a1] text-[#141414] text-xs h-10 rounded-full px-6 font-bold uppercase tracking-wider shadow-[0_4px_14px_0_rgba(0,243,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,243,255,0.23)] transition-all hover:scale-105 active:scale-95">
                        New Case +
                    </Button>
                </div>
            </div>

            {/* DATA TABLE */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full bg-[#1C1C1C] border border-[#272727] rounded-3xl overflow-hidden mt-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] relative group"
            >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#272727] bg-[#141414]/50">
                            <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest w-24">Tracker ID</th>
                            <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest">Case Profile</th>
                            <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest">Institution</th>
                            <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#00f3ff] transition-colors">Days Elapsed <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest text-right">Sigma Volatility</th>
                            <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest text-center">Status Flag</th>
                            <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        <AnimatePresence>
                            {filteredCases.map((row, i) => (
                                <motion.tr 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    key={row.id} 
                                    className="border-b last:border-0 border-[#272727] hover:bg-[#141414] transition-colors relative group/row hover:shadow-[inset_4px_0_0_0_#8B5CF6]"
                                >
                                    <td className="p-5 text-[13px] font-mono font-medium text-[#71717A] tracking-wider group-hover/row:text-[#00f3ff] transition-colors">{row.id}</td>
                                    <td className="p-5">
                                        <div className="font-bold text-[#EDEDED] text-[15px] mb-1 tracking-tight">{row.title}</div>
                                        <div className="text-[11px] text-[#A1A1AA] uppercase font-semibold tracking-wider">{row.category} <span className="text-[#3F3F46]">|</span> INITIATED {row.date}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center text-[10px] text-[#A1A1AA] font-black border border-[#272727] group-hover/row:border-[#8B5CF6]/50 group-hover/row:shadow-[0_0_10px_rgba(139,92,246,0.2)] transition-all">
                                                {row.org.slice(0, 2).toUpperCase()}
                                            </div>
                                            <span className="text-[13px] font-bold text-[#EDEDED]">{row.org}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 text-[13px] font-mono text-[#A1A1AA] font-medium">{row.days}</td>
                                    <td className="p-5 text-right">
                                        <div className={`text-[14px] font-mono font-black tracking-wide ${row.risk > 3 ? 'text-red-500 drop-shadow-[0_0_5px_#ef4444]' : row.risk > 1.5 ? 'text-amber-500 drop-shadow-[0_0_5px_#f59e0b]' : 'text-emerald-500 drop-shadow-[0_0_5px_#10b981]'}`}>
                                            {row.risk.toFixed(1)}σ
                                        </div>
                                    </td>
                                    <td className="p-5 text-center">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${row.status === 'critical' ? 'bg-red-500/10 text-red-500 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                                            row.status === 'warning' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]' :
                                                'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 text-[#A1A1AA] hover:text-[#00f3ff] hover:bg-[#00f3ff]/10 rounded-lg transition-all border border-transparent hover:border-[#00f3ff]/30">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-[#141414] border-[#272727] text-[#A1A1AA] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-2">
                                                <DropdownMenuItem className="hover:bg-[#1C1C1C] hover:text-[#00f3ff] cursor-pointer text-xs font-bold uppercase tracking-wider focus:bg-[#1C1C1C] focus:text-[#00f3ff] py-2">Inspect Vector</DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-[#1C1C1C] hover:text-[#8B5CF6] cursor-pointer text-xs font-bold uppercase tracking-wider focus:bg-[#1C1C1C] focus:text-[#8B5CF6] py-2">Trigger Automation</DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-red-500/10 hover:text-red-500 cursor-pointer text-xs font-bold uppercase tracking-wider focus:bg-red-500/10 focus:text-red-500 text-red-500 py-2">Close Pipeline</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {filteredCases.length === 0 && !loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full p-16 flex flex-col items-center justify-center text-[#A1A1AA]"
                    >
                        <AlertOctagon className="w-10 h-10 text-[#272727] mb-4" />
                        <p className="text-[14px] font-medium">No intelligence vectors mapped — <span className="text-[#00f3ff] border-b border-[#00f3ff]/30 pb-0.5 cursor-pointer hover:text-white transition-colors hover:border-white font-bold tracking-wide">Initialize a new case tracking protocol</span> to begin.</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}
