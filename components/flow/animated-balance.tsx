"use client"

import { useEffect, useState, useRef } from "react"
import { preloadCoinSound, playMoneySound } from "./sounds"

interface AnimatedBalanceProps {
  value: number
  className?: string
}

export function AnimatedBalance({ value, className = "" }: AnimatedBalanceProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const prevValue = useRef(value)
  const isFirstAnimation = useRef(true)

  useEffect(() => {
    if (value !== prevValue.current) {
      // Only play money sound on initial page-load animation (first time)
      if (value > prevValue.current && isFirstAnimation.current) {
        playMoneySound()
        isFirstAnimation.current = false
      }

      const startValue = prevValue.current
      const endValue = value
      const duration = 1500
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOut)
        setDisplayValue(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          prevValue.current = value
        }
      }

      requestAnimationFrame(animate)
    }
  }, [value])

  return <span className={`tabular-nums ${className}`}>{displayValue}</span>
}
