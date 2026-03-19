"use client"

import { Bell, Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TopNavbar() {
    return (
        <header className="h-16 border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-md fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-6">
            {/* Left: Dynamic Title (Placeholder for now) */}
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-white tracking-tight">Dashboard</h1>
            </div>

            {/* Right: Search & Actions */}
            <div className="flex items-center gap-4">
                {/* Global Search */}
                <div className="relative w-64 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <Input
                        placeholder="Search cases, organizations..."
                        className="h-9 pl-9 bg-[#151515] border-white/10 text-sm text-white placeholder:text-neutral-600 focus-visible:ring-1 focus-visible:ring-[#00f3ff]/50 rounded-lg"
                    />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-neutral-400 hover:text-white hover:bg-white/5">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
                </Button>

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-white/10" />

                {/* User Dropdown Trigger */}
                <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                    <span className="font-medium">Admin</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                </button>
            </div>
        </header>
    )
}
