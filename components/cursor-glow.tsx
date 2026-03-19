"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    const animate = () => {
      el.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full opacity-[0.12] blur-3xl"
      style={{
        background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(99,102,241,0.4) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  )
}
