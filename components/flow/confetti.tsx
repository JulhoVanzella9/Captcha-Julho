"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { createPortal } from "react-dom"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  w: number
  h: number
  rot: number
  rotV: number
  shape: number
  opacity: number
  gravity: number
  drag: number
  wobblePhase: number
  wobbleFreq: number
  wobbleAmp: number
  tilt: number
  tiltV: number
}

const COLORS = [
  "#4285f4", "#34a853", "#fbbc05", "#ea4335",
  "#1a73e8", "#22c55e", "#f59e0b", "#ec4899",
  "#a855f7", "#06b6d4", "#ff6b6b", "#ffd93d",
  "#10b981", "#6366f1", "#f43f5e",
]

function burst(
  cx: number,
  cy: number,
  angleMin: number,
  angleMax: number,
  n: number,
  power: number,
): Particle[] {
  const out: Particle[] = []
  for (let i = 0; i < n; i++) {
    const a = angleMin + Math.random() * (angleMax - angleMin)
    const rad = (a * Math.PI) / 180
    const spd = power * (0.6 + Math.random() * 0.8)
    const shape = Math.floor(Math.random() * 4) // 0=circle 1=square 2=rect 3=strip
    const sz = 5 + Math.random() * 9
    let w = sz, h = sz
    if (shape === 2) { w = sz * 0.5; h = sz * 1.8 }
    if (shape === 3) { w = sz * 0.25; h = sz * 2.8 }

    out.push({
      x: cx + (Math.random() - 0.5) * 16,
      y: cy + (Math.random() - 0.5) * 16,
      vx: Math.cos(rad) * spd,
      vy: Math.sin(rad) * spd,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w, h,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 14,
      shape,
      opacity: 1,
      gravity: 0.18 + Math.random() * 0.08,
      drag: 0.975 + Math.random() * 0.012,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleFreq: 1.5 + Math.random() * 3,
      wobbleAmp: 0.5 + Math.random() * 2.5,
      tilt: Math.random() * 360,
      tiltV: (Math.random() - 0.5) * 7,
    })
  }
  return out
}

function ConfettiCanvas({ trigger }: { trigger: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const raf = useRef(0)
  const frameRef = useRef(0)
  const [ready, setReady] = useState(false)
  const fired = useRef(false)

  useEffect(() => { setReady(true) }, [])

  const fire = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const W = window.innerWidth
    const H = window.innerHeight
    c.width = W
    c.height = H

    // Cannons from left and right sides, at roughly mid-height
    const leftX = -10
    const rightX = W + 10
    const originY = H * 0.55

    // Fewer particles on mobile for smooth performance
    const isMobile = W < 768
    const count1 = isMobile ? 35 : 70
    const count2 = isMobile ? 25 : 55

    // Left cannon shoots up-right, right cannon shoots up-left
    const wave1Left = burst(leftX, originY, -70, -20, count1, 22)
    const wave1Right = burst(rightX, originY, -160, -110, count1, 22)

    particles.current = [...wave1Left, ...wave1Right]
    frameRef.current = 0

    // Second wave
    setTimeout(() => {
      const w2L = burst(leftX, originY * 0.9, -65, -15, count2, 20)
      const w2R = burst(rightX, originY * 0.9, -165, -115, count2, 20)
      particles.current.push(...w2L, ...w2R)
    }, 350)

    cancelAnimationFrame(raf.current)

    const draw = () => {
      const ctx = c.getContext("2d")
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      frameRef.current++
      const t = frameRef.current

      let alive = 0

      for (const p of particles.current) {
        if (p.opacity <= 0) continue

        // Physics
        p.vy += p.gravity
        p.vx *= p.drag
        p.vy *= p.drag
        p.x += p.vx + Math.sin(t * 0.025 * p.wobbleFreq + p.wobblePhase) * p.wobbleAmp
        p.y += p.vy
        p.rot += p.rotV
        p.tilt += p.tiltV

        // Slow down rotation as it falls
        p.rotV *= 0.998
        p.tiltV *= 0.998

        // Fade
        if (p.y > H * 0.75) p.opacity -= 0.012
        if (t > 200) p.opacity -= 0.006
        if (p.opacity <= 0 || p.y > H + 60) { p.opacity = 0; continue }

        alive++

        // Render
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)

        const tiltFactor = Math.abs(Math.cos((p.tilt * Math.PI) / 180))
        const dw = p.w * (0.25 + tiltFactor * 0.75)

        ctx.fillStyle = p.color

        if (p.shape === 0) {
          ctx.beginPath()
          ctx.ellipse(0, 0, dw / 2, p.h / 2, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.shape === 3) {
          const r = Math.min(dw, p.h) * 0.15
          ctx.beginPath()
          ctx.roundRect(-dw / 2, -p.h / 2, dw, p.h, r)
          ctx.fill()
        } else {
          ctx.fillRect(-dw / 2, -p.h / 2, dw, p.h)
        }

        ctx.restore()
      }

      if (alive > 0 && t < 350) {
        raf.current = requestAnimationFrame(draw)
      }
    }

    raf.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    if (!trigger || !ready || fired.current) return
    fired.current = true
    fire()
    return () => cancelAnimationFrame(raf.current)
  }, [trigger, ready, fire])

  useEffect(() => {
    if (!trigger) fired.current = false
  }, [trigger])

  if (!ready) return null

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
      aria-hidden="true"
    />,
    document.body
  )
}

export function Confetti({ trigger }: { trigger: boolean }) {
  return <ConfettiCanvas trigger={trigger} />
}
