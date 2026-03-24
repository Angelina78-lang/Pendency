"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FolderKanban, BrainCircuit, LineChart, Building2, Globe2, FileText, Settings, UserCircle, LogOut, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Search", href: "/dashboard", icon: Search },
    { name: "My Cases", href: "/cases", icon: FolderKanban },
    { name: "AI Insights", href: "/insights", icon: BrainCircuit },
    { name: "Analytics", href: "/analytics", icon: LineChart },
    { name: "Org Intelligence", href: "/organization", icon: Building2 },
    { name: "Risk Index", href: "/risk-index", icon: Globe2 },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#141C30] border-r border-[#1e293b] flex flex-col z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/5">
                <div className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] font-mono">
                    PENDENCY
                </div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
                    Silence is a Signal
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group",
                                isActive
                                    ? "bg-neutral-900/50 text-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.1)] border border-white/5"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", isActive ? "text-[#00f3ff]" : "text-neutral-500 group-hover:text-white")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* User / Bottom */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
                        <UserCircle className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">Enterprise User</div>
                        <div className="text-[10px] text-neutral-500 truncate">admin@pendency.ai</div>
                    </div>
                    <LogOut className="w-4 h-4 text-neutral-500 hover:text-red-400 transition-colors" />
                </div>
            </div>
        </aside>
    )
}
