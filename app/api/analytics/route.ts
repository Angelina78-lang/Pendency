
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        // 1. Fetch all silence records with related app & institution data
        const records = await db.application.findMany({
            include: {
                silenceRecord: true,
                institution: true
            }
        })

        // 2. Process for Trend Data (Mocking dates slightly for MVP visualization as real data might be sparse)
        // In a real prod app, we'd group by `createdAt` or `appliedDate`
        const trendData = [
            { day: 'Mon', risk: 0, safe: 0 },
            { day: 'Tue', risk: 0, safe: 0 },
            { day: 'Wed', risk: 0, safe: 0 },
            { day: 'Thu', risk: 0, safe: 0 },
            { day: 'Fri', risk: 0, safe: 0 },
            { day: 'Sat', risk: 0, safe: 0 },
            { day: 'Sun', risk: 0, safe: 0 },
        ]

        // Simple distribution for MVP (distributing existing records across days)
        records.forEach((rec, i) => {
            const dayIndex = i % 7
            const risk = rec.silenceRecord?.riskScore || 0
            if (risk > 50) {
                trendData[dayIndex].risk += (risk / 10) // Scale down for chart
            } else {
                trendData[dayIndex].safe += ((100 - risk) / 10)
            }
        })

        // 3. Process Category Data (By Institution Type)
        const categoryMap = new Map<string, number>()
        records.forEach(r => {
            const type = r.institution?.type || "OTHER"
            categoryMap.set(type, (categoryMap.get(type) || 0) + 1)
        })

        const categoryData = Array.from(categoryMap.entries()).map(([name, value], i) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
            value,
            color: getConfigColor(i)
        }))

        // 4. Benchmarks (Aggregated averages)
        const avgRisk = records.reduce((acc, r) => acc + (r.silenceRecord?.riskScore || 0), 0) / (records.length || 1)

        const benchmarkData = [
            { subject: 'Speed', A: 150 - (avgRisk * 1.5), B: 110, fullMark: 150 },
            { subject: 'Reliability', A: 100 - (avgRisk), B: 90, fullMark: 150 },
            { subject: 'Impact', A: avgRisk, B: 60, fullMark: 150 },
        ]

        return NextResponse.json({
            trendData,
            categoryData,
            benchmarkData,
            totalAnalyzed: records.length
        })

    } catch (error) {
        console.error("[ANALYTICS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

function getConfigColor(index: number) {
    const colors = ['#00f3ff', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981']
    return colors[index % colors.length]
}
