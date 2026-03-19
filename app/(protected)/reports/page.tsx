
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
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Reports</h1>
                    <p className="text-neutral-500">Generate and download detailed analysis reports.</p>
                </div>
                <Button className="bg-[#00f3ff] text-black hover:bg-[#00f3ff]/80 font-bold">
                    <FileText className="w-4 h-4 mr-2" /> Generate New Report
                </Button>
            </div>

            <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase">Report Name</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase">Generated On</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase">Size</th>
                            <th className="p-4 text-xs font-bold text-neutral-500 uppercase text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="p-8 text-center"><Loader2 className="w-6 h-6 text-[#00f3ff] animate-spin inline" /></td></tr>
                        ) : reports.map((r, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white flex items-center gap-3">
                                    <div className="p-2 bg-neutral-800 rounded text-neutral-400"><FileText className="w-4 h-4" /></div>
                                    {r.name}
                                </td>
                                <td className="p-4 text-neutral-400 text-sm">{r.date}</td>
                                <td className="p-4 text-neutral-400 text-sm font-mono">{r.size}</td>
                                <td className="p-4 text-right">
                                    <Button size="sm" variant="ghost" className="text-[#00f3ff] hover:text-[#00f3ff] hover:bg-[#00f3ff]/10">
                                        <Download className="w-4 h-4 mr-2" /> Download
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
