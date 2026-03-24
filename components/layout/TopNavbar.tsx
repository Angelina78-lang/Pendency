"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Search", href: "/dashboard", desc: "Global query engine" },
    { name: "My Cases", href: "/cases", desc: "Active delay queues" },
    { name: "AI Insights", href: "/insights", desc: "Automated analysis" },
    { name: "Analytics", href: "/analytics", desc: "Predictive latency" },
    { name: "Org Intelligence", href: "/organization", desc: "Institution stats" },
    { name: "Risk Index", href: "/risk-index", desc: "Macro-level risks" },
    { name: "Reports", href: "/reports", desc: "Exportable ledgers" },
    { name: "Settings", href: "/settings", desc: "Platform preferences" },
]

export function TopNavbar() {
    const pathname = usePathname()

    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#141414]/80 backdrop-blur-md border-b border-[#272727] z-[100] px-4 md:px-6 flex items-center justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Left: Minimalist Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
          <div className="bg-gradient-to-tr from-[#00f3ff] to-[#8B5CF6] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black group-hover:shadow-[0_0_10px_#8B5CF6] transition-all">/</div>
          <span className="text-[#EDEDED] font-bold text-xs tracking-widest bg-[#1C1C1C] rounded-full px-3 py-1 border border-[#272727] group-hover:border-[#8B5CF6]/50 transition-colors">PENDENCY</span>
        </Link>

        {/* Center: Scrollable Horizontal Tabs with Tooltips & Neon Active States */}
        <nav className="hidden lg:flex items-center justify-center gap-1 flex-1 mx-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[13px] font-bold transition-all whitespace-nowrap block",
                    isActive
                      ? "border border-[#8B5CF6]/50 text-[#00f3ff] bg-[#8B5CF6]/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                      : "text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-white/5 border border-transparent"
                  )}
                >
                  {item.name}
                </Link>
                {/* Tooltip Popup */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-[#1C1C1C] border border-[#272727] rounded-lg text-[10px] text-[#A1A1AA] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1C1C1C] border-t border-l border-[#272727] transform rotate-45" />
                  {item.desc}
                </div>
              </div>
            )
          })}
        </nav>

        {/* Right: User Profile */}
        <div className="flex items-center gap-3 flex-shrink-0">
           <div className="hidden sm:flex flex-col items-end mr-1">
              <span className="text-[12px] font-semibold text-[#EDEDED] leading-none mb-0.5">Enterprise User</span>
              <span className="text-[10px] text-[#A1A1AA] leading-none cursor-pointer hover:text-[#EDEDED] transition-colors border-b border-transparent hover:border-[#A1A1AA]/50 pb-px">admin@pendency.ai</span>
           </div>
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-[#272727] flex items-center justify-center cursor-pointer text-[11px] font-bold text-white shadow-sm hover:ring-2 ring-blue-500/50 transition-all">
             EU
           </div>
        </div>

      </header>
    )
}
