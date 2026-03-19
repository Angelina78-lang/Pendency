
import { NextResponse } from "next/server"

export async function GET() {
    // In a real app, this would scan a storage bucket or DB table of generated PDFs
    // For now, we return a strictly typed JSON list that *could* come from a DB
    const reports = [
        { name: "Monthly Delay Analysis - Feb 2026", date: new Date().toLocaleDateString(), size: "2.4 MB" },
        { name: "Institutional Performance Review", date: "Jan 15, 2026", size: "4.1 MB" },
        { name: "Risk Assessment Summary Q4 2025", date: "Jan 05, 2026", size: "1.8 MB" },
    ]

    return NextResponse.json(reports)
}
