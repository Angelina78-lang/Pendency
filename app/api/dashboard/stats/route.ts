import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        // 1. Fetch real counts from DB
        const totalCases = await db.application.count()

        // 2. Fetch critical cases (riskScore > 80 or similar logic)
        // Assuming we save riskScore in SilenceRecord
        const criticalCases = await db.silenceRecord.count({
            where: {
                riskScore: { gt: 80 }
            }
        })

        // 3. Fetch delayed cases (daysHighSilence > expected max)
        // For MVP, just taking cases > 30 days silent
        const delayedCases = await db.silenceRecord.count({
            where: {
                daysHighSilence: { gt: 30 }
            }
        })

        // 4. Calculate safe cases
        const safeCases = totalCases - criticalCases - delayedCases

        // 5. Calculate Avg Risk
        const avgRiskAgg = await db.silenceRecord.aggregate({
            _avg: {
                riskScore: true
            }
        })
        const avgRisk = Math.round(avgRiskAgg._avg.riskScore || 0)

        // Return formatted for the Dashboard UI
        const kpis = [
            { label: "Critical Cases", value: criticalCases.toString(), trend: "+2%", status: "critical" },
            { label: "Delayed Cases", value: delayedCases.toString(), trend: "+5%", status: "warning" },
            { label: "Safe Cases", value: Math.max(0, safeCases).toString(), trend: "Stable", status: "safe" },
            { label: "Avg. Risk Score", value: `${avgRisk}%`, trend: "-1%", status: "neutral" },
        ]

        return NextResponse.json(kpis)

    } catch (error) {
        console.error("[DASHBOARD_STATS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
