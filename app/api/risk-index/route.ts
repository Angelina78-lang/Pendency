
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        // Fetch all institutions aggregated by type
        const stats = await db.institution.groupBy({
            by: ['type'],
            _avg: {
                healthScore: true
            }
        })

        // Ensure we have all sectors even if DB is empty
        const allSectors = ["CORPORATE", "ACADEMIC", "GOVERNMENT", "VISA", "HEALTHCARE"]

        const sectorData = allSectors.map(sector => {
            const found = stats.find(s => s.type === sector)
            const healthScore = found?._avg.healthScore || 50 // Default 50 (Neutral)
            const riskIndex = 100 - healthScore

            let trend = "Stable"
            if (riskIndex > 70) trend = "Critical"
            else if (riskIndex > 50) trend = "Worsening"
            else if (riskIndex < 30) trend = "Safe"

            return {
                name: sector.charAt(0) + sector.slice(1).toLowerCase() + " Sector",
                index: Math.round(riskIndex),
                trend
            }
        })

        // Sort by risk (descending)
        sectorData.sort((a, b) => b.index - a.index)

        const globalAvg = Math.round(sectorData.reduce((acc, s) => acc + s.index, 0) / sectorData.length)

        return NextResponse.json({
            globalIndex: globalAvg,
            sectors: sectorData
        })

    } catch (error) {
        console.error("[RISK_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
