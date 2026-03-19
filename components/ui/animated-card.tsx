"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedCard({ children, className, delay = 0, ...props }: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                duration: 0.4,
                delay: delay,
                ease: "easeOut"
            }}
            layout
            whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            }}
            className={cn(
                "rounded-xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-md p-6 shadow-sm overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
