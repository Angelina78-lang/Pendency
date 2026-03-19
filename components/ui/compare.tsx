"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  firstContent?: React.ReactNode;
  secondContent?: React.ReactNode;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}

export const Compare = ({
  firstImage,
  secondImage,
  firstContent,
  secondContent,
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % autoplayDuration) / autoplayDuration;
      const x = Math.sin(progress * Math.PI * 2) * 50 + 50;
      setSliderXPercent(x);
      autoplayRef.current = setTimeout(animate, 16);
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  function mouseEnterHandler() {
    setIsMouseOver(true);
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    startAutoplay();
  }

  const handleStart = useCallback(
    (clientX: number) => {
      if (slideMode === "drag") {
        setIsDragging(true);
      }
    },
    [slideMode]
  );

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging]
  );

  return (
    <div
      ref={sliderRef}
      className={cn("w-[400px] h-[400px] overflow-hidden relative select-none", className)}
      style={{
        cursor: slideMode === "drag" ? "grab" : "col-resize",
      }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-50"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          {(showHandlebar || isMouseOver) && (
            <div className="h-5 w-5 rounded-full bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.4),0px_4px_6px_rgba(0,0,0,0.5)] z-30 flex items-center justify-center fixed top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ position: 'absolute' }}>
              <Sparkles className="w-3 h-3 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstImage || firstContent ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none overflow-hidden",
                firstImageClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              {firstImage ? (
                <img
                  alt="first image"
                  src={firstImage}
                  className={cn(
                    "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none",
                    firstImageClassName
                  )}
                  draggable={false}
                />
              ) : (
                firstContent
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondImage || secondContent ? (
          <motion.div
            className={cn(
              "absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none overflow-hidden",
              secondImageClassname
            )}
            transition={{ duration: 0 }}
          >
            {secondImage ? (
              <img
                alt="second image"
                src={secondImage}
                className={cn(
                  "absolute inset-0 z-[19] rounded-2xl w-full h-full select-none",
                  secondImageClassname
                )}
                draggable={false}
              />
            ) : (
              secondContent
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
