"use client";

import React from "react";
import {
    DraggableCardBody,
    DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { GraduationCap, Briefcase, Globe, Scale, MousePointer2, Clock, AlertTriangle } from "lucide-react";

export function UseCasesCards() {
    const items = [
        {
            title: "Students",
            subtitle: "University Admissions",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop", // Reliable Student Image
            className: "top-[10%] left-[20%] md:top-[15%] md:left-[25%] rotate-[-6deg]",
            icon: <GraduationCap className="h-5 w-5 text-purple-400" />,
            tag: "Waiting: 3 Months"
        },
        {
            title: "Job Seekers",
            subtitle: "Corporate Applications",
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop", // Reliable Office Image
            className: "top-[20%] left-[30%] md:top-[10%] md:left-[45%] rotate-[3deg]",
            icon: <Briefcase className="h-5 w-5 text-blue-400" />,
            tag: "Ghosted?"
        },
        {
            title: "Visa Applicants",
            subtitle: "Immigration & Travel",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop", // Book/Passport vibe
            className: "top-[40%] left-[25%] md:top-[35%] md:left-[35%] rotate-[-4deg]",
            icon: <Globe className="h-5 w-5 text-green-400" />,
            tag: "Processing..."
        },
        {
            title: "Legal Claims",
            subtitle: "Insurance & Law",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop", // Legal/Contracts
            className: "top-[30%] left-[40%] md:top-[25%] md:left-[55%] rotate-[5deg]",
            icon: <Scale className="h-5 w-5 text-red-400" />,
            tag: "No Response"
        },
        {
            title: "Freelancers",
            subtitle: "Client Invoices",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop", // Finance/Laptop
            className: "top-[50%] left-[15%] md:top-[45%] md:left-[20%] rotate-[-8deg]",
            icon: <Clock className="h-5 w-5 text-orange-400" />,
            tag: "Overdue"
        }
    ];

    return (
        <div className="w-full relative h-[950px] overflow-hidden bg-neutral-900 rounded-[3rem] border border-white/10 shadow-2xl">
            {/* Vibrant Background Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-500/30 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-400/30 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow delay-100" />
            <div className="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-pink-500/20 blur-[90px] rounded-full pointer-events-none mix-blend-screen" />

            <DraggableCardContainer className="h-full w-full relative z-10 flex flex-col items-center pt-16">
                {/* NEW HEADING - Z-INDEX BOOSTED TO 0 (Cards are absolute, so layout flow matters, but let's give this explicit relative z-0 spacing) */}
                <div className="text-center relative z-40 pointer-events-none mb-10 px-4 mt-10">
                    <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                        For Every Pending Future
                    </h2>
                    <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
                        Whether you're waiting for a degree, a job, a visa, or justice. <br />
                        <span className="text-purple-200 font-bold animate-pulse mt-2 inline-block">Hover & Drag to reveal your path.</span>
                    </p>
                </div>

                {/* Cards shifted DOWN to avoid overlap */}
                {items.map((item, index) => (
                    <DraggableCardBody key={index} className={`w-72 md:w-80 p-5 bg-neutral-800/90 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-2xl group hover:shadow-[0_0_100px_rgba(168,85,247,0.8)] hover:bg-neutral-800 hover:border-white/50 hover:scale-105 transition-all duration-500 ${item.className.replace('top-[10%]', 'top-[28%]').replace('top-[20%]', 'top-[35%]').replace('top-[40%]', 'top-[55%]').replace('top-[30%]', 'top-[45%]').replace('top-[50%]', 'top-[65%]').replace('md:top-[15%]', 'md:top-[30%]').replace('md:top-[10%]', 'md:top-[25%]').replace('md:top-[35%]', 'md:top-[45%]').replace('md:top-[25%]', 'md:top-[40%]').replace('md:top-[45%]', 'md:top-[55%]')}`}>
                        {/* Card Image */}
                        <div className="relative h-56 w-full rounded-[1.5rem] overflow-hidden mb-5 border border-white/10 shadow-inner group-hover:border-white/30 transition-colors">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-150"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            {/* Status Tag on Image */}
                            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white flex items-center gap-2 shadow-lg group-hover:bg-purple-600/80 group-hover:border-purple-400 transition-colors">
                                <AlertTriangle className="w-3.5 h-3.5 text-orange-400 group-hover:text-white" /> {item.tag}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="flex items-center gap-5 px-1 pb-1">
                            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-400 transition-all duration-300 shadow-lg scale-100 group-hover:scale-110">
                                <div className="text-white">
                                    {item.icon}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white leading-none tracking-wide group-hover:text-purple-200 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-neutral-400 mt-1.5 font-medium uppercase tracking-wider group-hover:text-neutral-200 transition-colors">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    </DraggableCardBody>
                ))}
            </DraggableCardContainer>
        </div>
    );
}
