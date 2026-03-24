import { TopNavbar } from "@/components/layout/TopNavbar"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#141414] font-sans selection:bg-[#3B82F6]/30 text-[#EDEDED]">
            <TopNavbar />

            {/* Main Content Area */}
            <main className="pt-24 min-h-screen">
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
