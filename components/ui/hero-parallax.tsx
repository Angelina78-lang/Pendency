"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight, ChevronRight } from "lucide-react";

// Use the same ThemeCtx from page.tsx (we'll need to export it or pass dark as prop)
// For simplicity, let's pass isDark as a prop to HeroParallax

export const HeroParallax = ({
  products,
  isDark,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  isDark: boolean;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="max-h-[300vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header isDark={isDark} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-8 ${isDark ? "bg-white/5 border-white/10" : "bg-violet-50 border-violet-200"}`}
      >
        <Sparkles className="w-3.5 h-3.5 text-violet-400" />
        <span className={`text-xs font-medium ${isDark ? "text-white/60" : "text-violet-700"}`}>AI-Powered Case Intelligence · Now in Beta</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      </motion.div>

      <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.02] mb-6">
        <span className={`bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-white via-white/90 to-white/60" : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"}`}>
          AI agents for all
        </span>
        <br />
        <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
          your pending cases
        </span>
      </h1>

      <p className={`max-w-2xl text-base md:text-xl mt-8 leading-relaxed mb-12 ${isDark ? "text-white/40" : "text-gray-500"}`}>
        Pendency transforms institutional silence into actionable intelligence. Know when to wait, follow up, or escalate — with AI precision.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Primary CTA */}
        <Link href="/signup">
          <div
            className="relative flex items-center gap-2 text-white text-sm font-semibold px-8 py-4 rounded-full group cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(30,24,60,0.95) 0%, rgba(20,16,50,0.98) 100%)",
              border: "1px solid rgba(139,92,246,0.35)",
              boxShadow: "0 8px 40px rgba(139,92,246,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <span>Start analyzing free</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
        {/* Secondary CTA */}
        <div
          className="relative flex items-center gap-2 text-white text-sm font-semibold px-8 py-4 rounded-full group cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(18,22,48,0.95) 0%, rgba(14,18,40,0.98) 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 8px 40px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <span>Watch demo</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition duration-200"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white transition duration-200">
        {product.title}
      </h2>
    </motion.div>
  );
};

