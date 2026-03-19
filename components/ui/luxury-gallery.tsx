"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight, Clock, Brain, Activity, Mail, Shield, BarChart3, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
    {
        title: "Smart Timeline",
        category: "Analytics",
        image: "https://images.unsplash.com/photo-1634148483500-b6330925fb3b?q=80&w=2670&auto=format&fit=crop", // Abstract Dark/Gold
        icon: <Clock className="w-5 h-5" />,
        description: "Compare your wait time against thousands of similar cases."
    },
    {
        title: "Risk Prediction",
        category: "Intelligence",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop", // Abstract Dark/Purple
        icon: <Brain className="w-5 h-5" />,
        description: "AI-calculated probability of receiving a response."
    },
    {
        title: "Context Engine",
        category: "Processing",
        image: "https://images.unsplash.com/photo-1639322537228-ad7117a39460?q=80&w=2664&auto=format&fit=crop", // Abstract Glass
        icon: <Activity className="w-5 h-5" />,
        description: "Sector-specific delay understanding and varying baselines."
    },
    {
        title: "Auto-Draft",
        category: "Communication",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", // Abstract Tech
        icon: <Mail className="w-5 h-5" />,
        description: "Tone-calibrated follow-up emails generated instantly."
    },
    {
        title: "Paper Trail",
        category: "Legal",
        image: "https://images.unsplash.com/photo-1550684848-8186b5756396?q=80&w=2670&auto=format&fit=crop", // Abstract Structure
        icon: <Shield className="w-5 h-5" />,
        description: "Immutable logging of every day of silence."
    }
];

export function LuxuryGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Exact UI Match: Dark Card Container
    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-0">
            <div className="relative bg-[#0f0f0f] rounded-[40px] p-8 md:p-14 overflow-hidden border border-white/5 shadow-2xl">

                {/* Background Texture/Gradient similar to reference "View our latest works" */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-orange-500/10 to-transparent blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-purple-500/10 to-transparent blur-[120px] pointer-events-none" />

                {/* Header Section */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <div className="text-orange-500 font-medium tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            <span>Capabilities</span>
                        </div>
                        {/* Text "OUR WORKS" style match */}
                        <h2 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-white uppercase leading-[0.9]">
                            INTEL<br />LIGENCE
                        </h2>
                        <p className="text-neutral-400 mt-6 text-lg max-w-sm leading-relaxed">
                            We tried to design a new style to view our new intelligence engine to be more different than ever.
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white px-8 h-12">
                            View All Features <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Horizontal Scroll Gallery */}
                <div className="relative z-10 w-full overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing">
                    <div className="flex gap-6 w-max px-2">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative w-[300px] aspect-[3/4] rounded-[30px] overflow-hidden group border border-white/5 shadow-lg bg-neutral-900/50"
                            >
                                {/* Image */}
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                />

                                {/* Dark Overlay Gradient from bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white mb-3 uppercase tracking-wider">
                                            {feature.category}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-neutral-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Top Right Icon/Number */}
                                    <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Nav Buttons (Matching Reference) */}
                <div className="relative z-10 flex justify-between items-center mt-8 pt-8 border-t border-white/5">
                    {/* "Visit site" style button */}
                    <Link href="/signup">
                        <div className="group flex items-center gap-4 cursor-pointer">
                            <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                            <span className="text-white font-medium text-lg">Start Analysis</span>
                        </div>
                    </Link>

                    {/* "Explore" style button */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-white font-bold">Explore</div>
                            <div className="text-neutral-500 text-sm">Scroll to view</div>
                        </div>
                        <div className="w-14 h-14 rounded-full border border-white/20 text-white flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 animate-pulse" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
