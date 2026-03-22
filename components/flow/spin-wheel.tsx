"use client"

import { useState, useRef, useEffect } from "react"
import { playSpinSound } from "./sounds"

interface SpinWheelProps {
  onFinish: (prize: string) => void
}

const SEGMENTS = [
  { label: "US$189", color: "#34A853", textColor: "#fff" },
  { label: "US$50", color: "#FBBC05", textColor: "#333" },
  { label: "US$250", color: "#4285F4", textColor: "#fff" },
  { label: "US$25", color: "#EA4335", textColor: "#fff" },
  { label: "US$189", color: "#0D652D", textColor: "#fff" },
  { label: "US$75", color: "#F9A825", textColor: "#333" },
  { label: "US$189", color: "#1A73E8", textColor: "#fff" },
  { label: "US$10", color: "#C62828", textColor: "#fff" },
]

// The winning index (US$250 at segment 2)
const WINNING_INDEX = 2

export function SpinWheel({ onFinish }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [hasSpun, setHasSpun] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const segmentAngle = 360 / SEGMENTS.length

  useEffect(() => {
    drawWheel()
  }, [])

  const drawWheel = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = canvas.width
    const center = size / 2
    const radius = center - 4

    ctx.clearRect(0, 0, size, size)

    // Draw segments
    SEGMENTS.forEach((seg, i) => {
      const startAngle = (i * segmentAngle - 90) * (Math.PI / 180)
      const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180)

      // Segment fill
      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.arc(center, center, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = seg.color
      ctx.fill()

      // Segment border
      ctx.strokeStyle = "rgba(255,255,255,0.3)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Text
      ctx.save()
      ctx.translate(center, center)
      const textAngle = (startAngle + endAngle) / 2
      ctx.rotate(textAngle)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = seg.textColor
      ctx.font = "bold 15px Inter, system-ui, sans-serif"
      ctx.fillText(seg.label, radius * 0.65, 0)
      ctx.restore()
    })

    // Center circle
    ctx.beginPath()
    ctx.arc(center, center, 30, 0, Math.PI * 2)
    ctx.fillStyle = "#fff"
    ctx.fill()
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 2
    ctx.stroke()

    // Center dot
    ctx.beginPath()
    ctx.arc(center, center, 6, 0, Math.PI * 2)
    ctx.fillStyle = "#4285F4"
    ctx.fill()
  }

  const handleSpin = () => {
    if (spinning || hasSpun) return

    setSpinning(true)
    playSpinSound()

    // Calculate rotation to land on winning segment
    // The pointer is at the top (0 degrees / 12 o'clock)
    // We need to spin so that the winning segment aligns with the pointer
    const targetSegmentCenter = WINNING_INDEX * segmentAngle + segmentAngle / 2
    // Spin at least 5 full rotations + offset to land on target
    const fullRotations = 5 * 360
    const finalRotation = fullRotations + (360 - targetSegmentCenter)

    setRotation(prev => prev + finalRotation)

    setTimeout(() => {
      setSpinning(false)
      setHasSpun(true)
      onFinish(SEGMENTS[WINNING_INDEX].label)
    }, 4500)
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Pointer / Arrow at top */}
      <div className="relative z-10 -mb-3">
        <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-[#EA4335] drop-shadow-md" />
      </div>

      {/* Wheel container */}
      <div className="relative">
        {/* Outer ring glow */}
        <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] opacity-60 blur-sm" />

        {/* Outer ring */}
        <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] p-[3px]">
          <div className="w-full h-full rounded-full bg-white" />
        </div>

        {/* Canvas wheel */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="relative z-[1] rounded-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        />

        {/* Center button */}
        <button
          onClick={handleSpin}
          disabled={spinning || hasSpun}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] w-[64px] h-[64px] rounded-full bg-white shadow-lg border-2 border-gray-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="text-[13px] font-extrabold text-[#4285F4] tracking-wide">
            {spinning ? "..." : "SPIN"}
          </span>
        </button>
      </div>
    </div>
  )
}
