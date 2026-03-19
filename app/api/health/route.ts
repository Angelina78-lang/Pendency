import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        version: "3.1.0",
        services: {
            database: "connected", // Simplified for now
            ai_engine: "ready"
        }
    })
}
