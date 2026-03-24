"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download, Loader2 } from "lucide-react"

export default function ReportsPage() {
    const [reports, setReports] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch("/api/reports")
                if (res.ok) setReports(await res.json())
            } catch (e) { }
            finally { setLoading(false) }
        }
        fetchReports()
    }, [])

    return (
        <div className="w-full max-w-5xl mx-auto px-6 pb-24 space-y-8 flex flex-col items-center mt-8">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#272727] pb-4">
                <div className="text-center md:text-left">
                    <h1 className="text-xl md:text-[22px] font-semibold tracking-tight text-[#EDEDED] mb-1">Reports</h1>
                    <p className="text-[#A1A1AA] text-sm">Generate and export detailed institutional delay ledgers.</p>
                </div>
                <Button className="bg-[#EDEDED] text-[#141414] hover:bg-white text-xs h-9 rounded-full px-5 font-semibold">
                    <FileText className="w-4 h-4 mr-2" /> Generate Report
                </Button>
            </div>

            <div className="w-full bg-[#1C1C1C] border border-[#272727] rounded-2xl overflow-hidden shadow-xl mt-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#272727]">
                            <th className="p-5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">Report Name</th>
                            <th className="p-5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">Generated On</th>
                            <th className="p-5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">Size</th>
                            <th className="p-5 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="p-12 text-center"><Loader2 className="w-6 h-6 text-[#A1A1AA] animate-spin inline" /></td></tr>
                        ) : reports.length === 0 ? (
                             <tr><td colSpan={4} className="p-12 text-center text-sm text-[#A1A1AA]">No reports generated yet.</td></tr>
                        ) : reports.map((r, i) => (
                            <tr key={i} className="border-b last:border-0 border-[#272727] hover:bg-[#1E1E1E] transition-colors group">
                                <td className="p-5 font-medium text-[#EDEDED] text-sm flex items-center gap-3">
                                    <div className="p-2 bg-[#2A2A2A] rounded-lg text-[#A1A1AA] border border-[#313131]"><FileText className="w-4 h-4" /></div>
                                    {r.name}
                                </td>
                                <td className="p-5 text-[#A1A1AA] text-[13px]">{r.date}</td>
                                <td className="p-5 text-[#A1A1AA] text-xs font-mono">{r.size}</td>
                                <td className="p-5 text-right">
                                    <Button size="sm" variant="outline" className="h-8 rounded-full border-[#272727] text-[#EDEDED] hover:bg-[#2A2A2A] bg-transparent text-xs font-semibold">
                                        <Download className="w-3.5 h-3.5 mr-1.5" /> Export
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
