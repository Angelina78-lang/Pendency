
import { NextResponse } from 'next/server';
import { db } from "@/lib/db"

export async function POST(request: Request) {
    // Simulator Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        const { query } = await request.json();

        // 1. Mock Analysis Logic (AI Proxy)
        let riskScore = 82;
        let sentiment = "Freezing";
        let ghostingRate = 64;
        let institutionName = "Unknown Corp"
        let institutionType = "CORPORATE"

        if (query.toLowerCase().includes("google") || query.toLowerCase().includes("faang")) {
            riskScore = 45;
            sentiment = "Competitive";
            ghostingRate = 30;
            institutionName = "Google"
        } else if (query.toLowerCase().includes("startup")) {
            riskScore = 90;
            sentiment = "Volatile";
            ghostingRate = 75;
            institutionName = "Stealth Startup"
        } else if (query.toLowerCase().includes("university") || query.toLowerCase().includes("college")) {
            riskScore = 30;
            sentiment = "Bureaucratic";
            ghostingRate = 15;
            institutionName = "University"
            institutionType = "ACADEMIC"
        }

        // 2. Persist to Database (Make it Real)
        try {
            // Find or create Institution
            let institution = await db.institution.findUnique({ where: { name: institutionName } })
            if (!institution) {
                institution = await db.institution.create({
                    data: { name: institutionName, type: institutionType, healthScore: 100 - riskScore }
                })
            }

            // Find or create Demo User
            const demoUserEmail = "demo@pendency.ai"
            let user = await db.appUser.findUnique({ where: { email: demoUserEmail } })
            if (!user) {
                user = await db.appUser.create({ data: { email: demoUserEmail, name: "Demo User" } })
            }

            // Create Application Record
            await db.application.create({
                data: {
                    userId: user.id,
                    institutionId: institution.id,
                    roleTitle: query.slice(0, 30) || "Analyzed Case",
                    status: "SILENT",
                    appliedDate: new Date(),
                    silenceRecord: {
                        create: {
                            daysHighSilence: Math.floor(Math.random() * 30),
                            riskScore: riskScore,
                            financialLoss: 0
                        }
                    }
                }
            })
        } catch (dbError) {
            console.warn("Analysis DB save failed (Simulation Mode fallback):", dbError)
        }

        return NextResponse.json({
            success: true,
            data: {
                riskScore,
                latency: {
                    user: 24,
                    avg: 18,
                    unit: "days"
                },
                sentiment,
                variance: "Top 15%",
                ghostingIndex: ghostingRate
            }
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to analyze' },
            { status: 500 }
        );
    }
}
