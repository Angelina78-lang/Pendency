"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, Mail, ShieldCheck, AlertTriangle, CheckCircle2, FileText, Send } from "lucide-react"
import Link from "next/link"

export default function CaseDetailPage({ params }: { params: { id: string } }) {
    // Mock Data based on ID
    const caseId = params.id || "CAS-2941"

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Back & Header */}
            <div>
                <Link href="/cases" className="text-neutral-500 hover:text-white flex items-center gap-2 mb-4 text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Cases
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            Senior SDE Application <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded border border-white/5 font-mono">{caseId}</span>
                        </h1>
                        <p className="text-neutral-400 mt-1 flex items-center gap-2">
                            <BuildingIcon className="w-4 h-4 text-[#00f3ff]" /> Google Inc.
                            <span className="text-neutral-600">•</span>
                            Submitted Sep 12, 2025
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded inline-flex items-center gap-2 border border-emerald-500/20">
                            <ShieldCheck className="w-4 h-4" /> Safe Trajectory
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">Risk Score: 1.2σ</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main: Timeline & Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#00f3ff]" /> Timeline of Silence
                        </h3>

                        <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8 py-2">
                            {/* Event 1 */}
                            <div className="relative">
                                <div className="absolute -left-[39px] w-5 h-5 bg-[#00f3ff] rounded-full border-4 border-[#151515] shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                                <div className="text-sm font-bold text-[#00f3ff] mb-1">Today (Day 154)</div>
                                <div className="bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                                    <p className="text-sm text-neutral-300">
                                        No response received. AI recommends sending a <strong>"Value-Add Update"</strong> email to the recruiter.
                                    </p>
                                    <Button size="sm" className="mt-3 bg-[#00f3ff]/10 text-[#00f3ff] hover:bg-[#00f3ff]/20 border border-[#00f3ff]/50">
                                        <Mail className="w-3 h-3 mr-2" /> Draft Email
                                    </Button>
                                </div>
                            </div>

                            {/* Event 2 */}
                            <div className="relative opacity-50">
                                <div className="absolute -left-[39px] w-5 h-5 bg-neutral-700 rounded-full border-4 border-[#151515]" />
                                <div className="text-sm font-bold text-neutral-400 mb-1">Dec 15, 2025 (Day 90)</div>
                                <p className="text-sm text-neutral-500">Sent follow-up email regarding application status. No reply.</p>
                            </div>

                            {/* Event 3 */}
                            <div className="relative opacity-30">
                                <div className="absolute -left-[39px] w-5 h-5 bg-neutral-700 rounded-full border-4 border-[#151515]" />
                                <div className="text-sm font-bold text-neutral-400 mb-1">Sep 12, 2025 (Day 0)</div>
                                <p className="text-sm text-neutral-500">Application submitted via Career Portal.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Predictions & Files */}
                <div className="space-y-6">
                    {/* Optimization Card */}
                    <div className="bg-gradient-to-b from-[#00f3ff]/10 to-transparent border border-[#00f3ff]/20 p-6 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-2">Likelihood of Success</h3>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-5xl font-black text-[#00f3ff]">88%</span>
                            <span className="text-sm text-emerald-400 font-bold mb-1.5 flex items-center">
                                <TrendingUpIcon className="w-3 h-3 mr-1" /> +2% this week
                            </span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            Based on similar SDE roles at Google, a 154-day silence often indicates a "waitlist" status rather than rejection.
                        </p>
                    </div>

                    {/* Automation Actions */}
                    <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">Quick Actions</h3>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-neutral-300">
                                <FileText className="w-4 h-4 mr-2 text-neutral-500" /> View Application
                            </Button>
                            <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-neutral-300">
                                <Send className="w-4 h-4 mr-2 text-neutral-500" /> Escalation Templates
                            </Button>
                            <Separator className="bg-white/10 my-2" />
                            <Button variant="destructive" className="w-full justify-start bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                                <AlertTriangle className="w-4 h-4 mr-2" /> Mark as Rejected
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BuildingIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    )
}

function TrendingUpIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    )
}
