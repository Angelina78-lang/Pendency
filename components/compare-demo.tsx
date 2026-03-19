import React from "react";
import { Compare } from "@/components/ui/compare";
import { Check, X } from "lucide-react";

export function CompareDemo() {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-12 rounded-[3rem] bg-neutral-900 border border-neutral-800 relative z-20 overflow-hidden">
            {/* Background Gradient Mesh */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-neutral-900 to-neutral-900 z-0"></div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative z-10">
                <div className="text-center md:text-left max-w-lg">
                    <h3 className="text-4xl md:text-5xl font-serif font-black mb-8 text-white tracking-tight leading-none">
                        <span className="text-neutral-500 block text-2xl md:text-3xl mb-3 font-bold tracking-normal">Why Pendency is Different</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 drop-shadow-2xl">System Silence vs.<br />System Solved.</span>
                    </h3>
                    <p className="text-xl text-neutral-300 mb-10 leading-relaxed font-medium">
                        "PENDENCY does not track people. <br />
                        <span className="text-white font-bold">It protects people from system silence.</span>"
                    </p>

                    <div className="flex gap-8 justify-center md:justify-start text-base font-bold tracking-wide uppercase">
                        <div className="flex items-center gap-3 text-neutral-500">
                            <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
                            Normal
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-3 h-3 rounded-full bg-[#FF5722] shadow-[0_0_15px_#FF5722] animate-pulse"></div>
                            Pendency
                        </div>
                    </div>
                </div>

                <div className="p-1 rounded-3xl bg-gradient-to-br from-neutral-800 to-black shadow-2xl relative group">
                    <Compare
                        firstContent={
                            <div className="w-full h-full bg-[#111] p-8 font-mono text-sm text-neutral-400 flex flex-col gap-6">
                                <div className="text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Normal Tracker</div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-neutral-300 font-bold flex items-center gap-2"><X className="w-4 h-4 text-neutral-500" /> Days Passed</span>
                                    <span className="text-xs text-neutral-500">Just shows days passed</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-neutral-300 font-bold flex items-center gap-2"><X className="w-4 h-4 text-neutral-500" /> No Support</span>
                                    <span className="text-xs text-neutral-500">No decision support</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-neutral-300 font-bold flex items-center gap-2"><X className="w-4 h-4 text-neutral-500" /> Passive</span>
                                    <span className="text-xs text-neutral-500">Just waits</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-neutral-300 font-bold flex items-center gap-2"><X className="w-4 h-4 text-neutral-500" /> Display</span>
                                    <span className="text-xs text-neutral-500">Raw Data display</span>
                                </div>
                            </div>
                        }
                        secondContent={
                            <div className="w-full h-full bg-black p-8 font-sans text-sm text-white flex flex-col gap-6 relative overflow-hidden">
                                {/* Glowing Background Effect for Contrast */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-orange-900/10 animate-pulse-slow"></div>

                                <div className="relative z-10">
                                    <div className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 font-bold border-b border-white/20 pb-2 mb-4">PENDENCY</div>

                                    <div className="flex flex-col gap-1 mb-4">
                                        <span className="text-white font-bold flex items-center gap-2 text-shadow-sm"><Check className="w-4 h-4 text-green-400" /> Context</span>
                                        <span className="text-xs text-neutral-200">Explains what delay means</span>
                                    </div>

                                    <div className="flex flex-col gap-1 mb-4">
                                        <span className="text-white font-bold flex items-center gap-2 text-shadow-sm"><Check className="w-4 h-4 text-green-400" /> Guidance</span>
                                        <span className="text-xs text-neutral-200">AI-powered action guidance</span>
                                    </div>

                                    <div className="flex flex-col gap-1 mb-4">
                                        <span className="text-white font-bold flex items-center gap-2 text-shadow-sm"><Check className="w-4 h-4 text-green-400" /> Proactive</span>
                                        <span className="text-xs text-neutral-200">Proactive risk alerts</span>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold flex items-center gap-2 text-shadow-sm"><Check className="w-4 h-4 text-green-400" /> Prediction</span>
                                        <span className="text-xs text-neutral-200">Interpretation + prediction</span>
                                    </div>
                                </div>
                            </div>
                        }
                        className="h-[400px] w-[300px] md:w-[400px] rounded-2xl bg-black"
                        slideMode="hover"
                    />
                    {/* Stronger Glow Container */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-[2rem] opacity-30 blur-3xl -z-10 animate-pulse-slow"></div>
                </div>
            </div>
        </div>
    );
}
