"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  initialMinutes?: number
  onExpire?: () => void
}

export function CountdownTimer({ initialMinutes = 12, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onExpire])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex items-center gap-1">
      <div className="min-w-[2rem] rounded bg-gray-900 px-2 py-1 text-center font-mono text-sm font-bold text-white">
        {String(minutes).padStart(2, "0")}
      </div>
      <span className="font-bold text-gray-900">:</span>
      <div className="min-w-[2rem] rounded bg-gray-900 px-2 py-1 text-center font-mono text-sm font-bold text-white">
        {String(seconds).padStart(2, "0")}
      </div>
    </div>
  )
}
