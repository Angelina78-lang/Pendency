"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Clock, Brain, Activity, Mail, Shield, BarChart3, X } from "lucide-react";

export function ExpandableFeatures() {
    const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
        null
    );
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100] p-4">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg z-50"
                            onClick={() => setActive(null)}
                        >
                            <X className="w-5 h-5 text-black" />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[600px] h-fit max-h-[90%] flex flex-col bg-neutral-900 border border-white/10 sm:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.4)] relative"
                        >
                            {/* GLOWING BACKGROUND EFFECT ON EXPAND */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-neutral-900 to-orange-900/40 opacity-100 z-0 pointer-events-none" />

                            <motion.div layoutId={`image-${active.title}-${id}`} className="relative z-10">
                                <img
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-64 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center brightness-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                            </motion.div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start p-6">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="text-2xl font-bold text-white flex items-center gap-2"
                                        >
                                            {active.icon} {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-400 mt-1"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>
                                </div>
                                <div className="pt-2 relative px-6 pb-8">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-300 text-base leading-relaxed h-fit flex flex-col gap-4 overflow-auto"
                                    >
                                        {active.content()}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
                {cards.map((card, index) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="group p-6 flex flex-col gap-4 bg-white/50 backdrop-blur-md border border-white/20 hover:bg-white/80 dark:hover:bg-neutral-800/80 rounded-3xl cursor-pointer hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300"
                    >
                        <div className="w-full aspect-video rounded-2xl overflow-hidden relative">
                            <motion.div layoutId={`image-${card.title}-${id}`} className="h-full w-full">
                                <img
                                    src={card.src}
                                    alt={card.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="p-3 rounded-full bg-white shadow-sm mb-3 text-neutral-900 group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <motion.h3
                                layoutId={`title-${card.title}-${id}`}
                                className="text-xl font-bold text-neutral-900 mb-1"
                            >
                                {card.title}
                            </motion.h3>
                            <motion.p
                                layoutId={`description-${card.description}-${id}`}
                                className="text-sm text-neutral-600"
                            >
                                {card.description}
                            </motion.p>
                        </div>

                        <div className="mt-auto w-full">
                            <button className="w-full py-2 rounded-xl bg-neutral-900 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                See How It Works
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}

const cards = [
    {
        title: "Smart Timeline",
        description: "Real-world wait time comparisons.",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        icon: <Clock className="w-6 h-6" />,
        content: () => (
            <p>
                Pendency doesn't just count days; it compares your specific wait time against <strong>thousands of similar cases</strong>. <br /><br />
                Our AI analyzes patterns in university admissions, corporate hiring, and visa processing to tell you if your delay is normal or if you've fallen into the "black hole" of administrative silence.
            </p>
        ),
    },
    {
        title: "Risk Prediction",
        description: "Probability calculation of being ghosted.",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Reusing chart/data images for consistency
        icon: <Brain className="w-6 h-6" />,
        content: () => (
            <p>
                Using historical data, our <strong>Risk Engine</strong> calculates the statistical probability that you will receive a response. <br /><br />
                If your probability drops below 20%, we advise you to move on or escalate. Stop waiting for a 'No' that will never come.
            </p>
        ),
    },
    {
        title: "Context Engine",
        description: "Sector-specific delay understanding.",
        src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1000&auto=format&fit=crop",
        icon: <Activity className="w-6 h-6" />,
        content: () => (
            <p>
                A 2-week delay in Sales is a disaster. A 2-week delay in Academia is a miracle. <br /><br />
                The <strong>Context Engine</strong> adjusts expectations based on the specific industry, season, and organization you are dealing with.
            </p>
        ),
    },
    {
        title: "Auto-Draft",
        description: "AI-generated follow-up emails.",
        src: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1000&auto=format&fit=crop",
        icon: <Mail className="w-6 h-6" />,
        content: () => (
            <p>
                Don't know what to say? Our AI generates the <strong>perfect, tone-calibrated follow-up email</strong> based on how long you've waited. <br /><br />
                From "Polite Nudge" to "Firm Escalation," we write the email so you don't have to stress about the wording.
            </p>
        ),
    },
    {
        title: "Paper Trail",
        description: "Official logging of your wait.",
        src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1000&auto=format&fit=crop",
        icon: <Shield className="w-6 h-6" />,
        content: () => (
            <p>
                Every day of silence is recorded. Pendency creates an <strong>immutable log</strong> of your wait time, which can be exported as a PDF. <br /><br />
                Use this as evidence when escalating to HR, Ombudsmen, or legal counsel. Proof of delay is power.
            </p>
        ),
    },
    {
        title: "Dashboard",
        description: "Central command for all pending items.",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        icon: <BarChart3 className="w-6 h-6" />,
        content: () => (
            <p>
                Stop checking 10 different portals. Track your job applications, university admissions, and legal claims in <strong>one unified dashboard</strong>. <br /><br />
                Get a "Total Wait Time" metric that visualizes how much of your life is currently on hold.
            </p>
        ),
    },
];
