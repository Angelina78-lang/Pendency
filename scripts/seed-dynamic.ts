
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seeds = [
        { name: "Google", type: "CORPORATE", score: 85 },
        { name: "Tesla", type: "CORPORATE", score: 45 },
        { name: "United Nations", type: "GOVERNMENT", score: 20 },
        { name: "Stanford", type: "ACADEMIC", score: 60 },
    ]

    for (const s of seeds) {
        const inst = await prisma.institution.upsert({
            where: { name: s.name },
            update: {},
            create: { name: s.name, type: s.type, healthScore: s.score }
        })
        console.log(`Upserted ${inst.name}`)
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
