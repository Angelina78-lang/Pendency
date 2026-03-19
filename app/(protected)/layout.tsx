import { AppSidebar } from "@/components/layout/AppSidebar"
import { TopNavbar } from "@/components/layout/TopNavbar"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#0D0D0D] font-sans selection:bg-[#00f3ff]/30 text-neutral-200">
            <AppSidebar />
            <TopNavbar />

            {/* Main Content Area */}
            <main className="pl-64 pt-16 min-h-screen">
                <div className="p-8 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
