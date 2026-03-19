import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Starting Seeding...")

    // 1. Create Demo User
    const demoEmail = "demo@pendency.ai"
    const user = await prisma.appUser.upsert({
        where: { email: demoEmail },
        update: {},
        create: {
            email: demoEmail,
            name: "Demo User",
        },
    })
    console.log(`👤 User: ${user.email}`)

    // 2. Create Institutions
    const institutions = [
        { name: "IIT Delhi", type: "ACADEMIC" },
        { name: "NSP Portal", type: "GOVERNMENT" },
        { name: "US Consulate Chennai", type: "GOVERNMENT" }, // Visa is Gov
        { name: "Google", type: "CORPORATE" },
    ]

    for (const inst of institutions) {
        await prisma.institution.upsert({
            where: { name: inst.name },
            update: {},
            create: {
                name: inst.name,
                type: inst.type,
                healthScore: 80,
            },
        })
    }

    // 3. Create Sample Cases
    const iit = await prisma.institution.findUnique({ where: { name: "IIT Delhi" } })
    const nsp = await prisma.institution.findUnique({ where: { name: "NSP Portal" } })

    if (iit) {
        await prisma.application.create({
            data: {
                userId: user.id,
                institutionId: iit.id,
                roleTitle: "Transcript Request 2024",
                status: "SILENT",
                appliedDate: new Date("2025-10-12"),
                silenceRecord: {
                    create: {
                        daysHighSilence: 120,
                        riskScore: 92,
                        financialLoss: 5000,
                    }
                }
            }
        })
    }

    if (nsp) {
        await prisma.application.create({
            data: {
                userId: user.id,
                institutionId: nsp.id,
                roleTitle: "Post-Matric Scholarship",
                status: "SILENT",
                appliedDate: new Date("2025-08-10"),
                silenceRecord: {
                    create: {
                        daysHighSilence: 180,
                        riskScore: 85,
                        financialLoss: 25000,
                    }
                }
            }
        })
    }

    console.log("✅ Seeding Complete!")
}

main()
    .then(async () => {
        await prisma.disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.disconnect()
        process.exit(1)
    })
