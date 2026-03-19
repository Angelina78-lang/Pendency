import { NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET: Fetch all cases
// GET: Fetch all cases (with Simulation Mode fallback)
export async function GET() {
    try {
        const cases = await db.application.findMany({
            include: {
                silenceRecord: true,
                institution: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(cases)

    } catch (error) {
        console.warn("[CASES_GET] DB Error, falling back to Simulation Mode:", error)

        // SIMULATION MODE MOCK DATA
        return NextResponse.json([
            {
                id: "case_12345678",
                roleTitle: "Senior Software Engineer",
                institution: { name: "Google", type: "CORPORATE" },
                appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(), // 21 days ago
                silenceRecord: { daysHighSilence: 21, riskScore: 85 }
            },
            {
                id: "case_87654321",
                roleTitle: "Product Manager",
                institution: { name: "Airbnb", type: "CORPORATE" },
                appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
                silenceRecord: { daysHighSilence: 5, riskScore: 12 }
            },
            {
                id: "case_abcdef12",
                roleTitle: "PhD Application",
                institution: { name: "Stanford University", type: "ACADEMIC" },
                appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
                silenceRecord: { daysHighSilence: 45, riskScore: 40 } // Academic has higher tolerance
            },
            {
                id: "case_99887766",
                roleTitle: "Visa Sponsorship",
                institution: { name: "USCIS", type: "GOVERNMENT" },
                appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 80).toISOString(), // 80 days ago
                silenceRecord: { daysHighSilence: 80, riskScore: 92 }
            }
        ])
    }
}

// POST: Create a new case (Analysed)
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { institutionName, roleTitle, silenceType, daysSilent, riskScore } = body

        // 1. Find or create Institution
        let institution = await db.institution.findUnique({
            where: { name: institutionName }
        })

        if (!institution) {
            institution = await db.institution.create({
                data: {
                    name: institutionName,
                    type: silenceType.toUpperCase(),
                    healthScore: 100 - riskScore // Inverse of risk
                }
            })
        }

        // 2. Create User if not exists (Simulation)
        const demoUserEmail = "demo@pendency.ai"
        let user = await db.appUser.findUnique({ where: { email: demoUserEmail } })
        if (!user) {
            user = await db.appUser.create({
                data: { email: demoUserEmail, name: "Demo User" }
            })
        }

        // 3. Create Application linked to User & Institution
        const application = await db.application.create({
            data: {
                userId: user.id,
                institutionId: institution.id,
                roleTitle: roleTitle || "Pending Application",
                status: "SILENT",
                appliedDate: new Date(Date.now() - (daysSilent * 24 * 60 * 60 * 1000)), // Backdate
                silenceRecord: {
                    create: {
                        daysHighSilence: daysSilent,
                        riskScore: riskScore,
                        financialLoss: daysSilent * 1500 // Mock loss calc
                    }
                }
            },
            include: {
                silenceRecord: true
            }
        })

        return NextResponse.json(application)

    } catch (error) {
        console.error("[CASES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
