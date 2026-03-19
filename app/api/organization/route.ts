
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const query = searchParams.get("query")

        const whereClause = query ? {
            name: { contains: query }
        } : {}

        const orgs = await db.institution.findMany({
            where: whereClause,
            include: {
                _count: {
                    select: { applications: true }
                }
            },
            take: 10
        })

        // Format for UI
        const formattedOrgs = orgs.map(org => ({
            id: org.id,
            name: org.name,
            type: org.type,
            location: "Global", // value not in DB yet, referencing default
            riskScore: 100 - org.healthScore,
            avgResponseTime: "14 Days", // calculation placeholder
            ghostRate: Math.max(10, 100 - org.healthScore - 20) + "%", // Derived metric
            trend: "Top 5% Basin"
        }))

        return NextResponse.json(formattedOrgs)

    } catch (error) {
        console.error("[ORG_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
