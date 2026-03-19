"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimation, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export const DraggableCardContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "relative w-full h-full overflow-hidden",
                className
            )}
        >
            {children}
        </div>
    );
};

export const DraggableCardBody = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const controls = useAnimation();
    const [zIndex, setZIndex] = useState(0);

    // Random rotation for natural feel
    const randomRotate = Math.random() * 10 - 5;

    return (
        <motion.div
            drag
            dragConstraints={{
                top: -300,
                left: -300,
                right: 300,
                bottom: 300,
            }}
            dragElastic={0.1}
            whileHover={{ scale: 1.05, cursor: "grab", zIndex: 100 }}
            whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100 }}
            onDragStart={() => setZIndex(50)}
            onDragEnd={() => {
                setZIndex(0);
                controls.start({
                    x: 0,
                    y: 0,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                });
            }}
            animate={controls}
            initial={{ rotate: randomRotate, y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={cn(
                "absolute flex flex-col items-center justify-center transition-shadow shadow-xl hover:shadow-2xl",
                className
            )}
            style={{ zIndex }}
        >
            {children}
        </motion.div>
    );
};
