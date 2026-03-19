import { PrismaClient } from '@prisma/client'
import { MultimodalParser } from '../lib/modules/parser'
import { ContextEngine } from '../lib/modules/context-engine'
import { SilenceCalculator } from '../lib/modules/silence-calculator'
import 'dotenv/config'

const prisma = new PrismaClient()

async function integrationTest() {
    console.log('--- STARTING INTEGRATION TEST ---')

    // 1. Test Database Connectivity
    const institutions = await prisma.institution.findMany()
    console.log(`[DB] Found ${institutions.length} institutions saved in DB.`)
    if (institutions.length === 0) throw new Error("Database seeding failed or is empty.")

    // 2. Test Parser Module
    const input = "Applied to Google SDE2 role on Jan 15, no reply."
    console.log(`[PARSER] Testing input: "${input}"`)
    const parsed = MultimodalParser.parse(input)
    console.log(`[PARSER] Result:`, parsed)
    if (parsed.entityName !== 'Google') throw new Error("Parser failed to identify entity.")

    // 3. Test Context Engine
    const context = ContextEngine.analyze(parsed)
    console.log(`[CONTEXT] Identified category: ${context.category}`)

    // 4. Test Silence Calculator
    const silence = SilenceCalculator.calculate(parsed)
    console.log(`[SILENCE] Risk Score: ${silence.sigmaScore} sigma`)

    console.log('--- INTEGRATION TEST PASSED ---')
}

integrationTest()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('--- TEST FAILED ---')
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
