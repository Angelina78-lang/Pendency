
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Connecting to database...')
    try {
        const userCount = await prisma.appUser.count()
        console.log(`Successfully connected! Found ${userCount} users.`)

        // Try to create a dummy user to verify write access
        const testUser = await prisma.appUser.create({
            data: {
                email: `test-${Date.now()}@example.com`,
                name: 'Database Check User'
            }
        })
        console.log('Write test successful:', testUser.id)

        // Clean up
        await prisma.appUser.delete({ where: { id: testUser.id } })
        console.log('Delete test successful.')

    } catch (e) {
        console.error('Database connection failed:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
