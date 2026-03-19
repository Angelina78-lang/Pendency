import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    // 1. Create Institutions
    const google = await prisma.institution.create({
        data: {
            name: 'Google',
            type: 'CORPORATE',
            healthScore: 85.0
        }
    })

    // ... (rest is same, but I need to rewrite it to be sure)
    const du = await prisma.institution.create({
        data: {
            name: 'Delhi University',
            type: 'ACADEMIC',
            healthScore: 45.0
        }
    })

    const tcs = await prisma.institution.create({
        data: {
            name: 'TCS',
            type: 'CORPORATE',
            healthScore: 60.0
        }
    })

    // 2. Create Recruiters
    await prisma.recruiter.create({
        data: {
            name: 'Priya Sharma',
            email: 'priya.s@google.com',
            linkedinProfile: 'linkedin.com/in/priya-google',
            responseRate: 78.5,
            institutionId: google.id
        }
    })

    await prisma.recruiter.create({
        data: {
            name: 'Exam Controller',
            email: 'exams@du.ac.in',
            responseRate: 15.0,
            institutionId: du.id
        }
    })

    console.log('Seed data created!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
