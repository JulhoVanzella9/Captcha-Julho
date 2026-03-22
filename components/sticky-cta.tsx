"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface StickyCTAProps {
  ctaUrl?: string
}

export function StickyCTA({ ctaUrl = "#" }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCTAClick = () => {
    if (ctaUrl && ctaUrl !== "#") {
      window.location.href = ctaUrl
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 p-4 backdrop-blur-sm animate-slide-in">
      <div className="mx-auto max-w-xl">
        <Button
          size="lg"
          onClick={handleCTAClick}
          className="w-full rounded-xl bg-[#1a73e8] py-6 text-base font-semibold text-white shadow-lg hover:bg-[#1557b0] animate-pulse-subtle cursor-pointer"
        >
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
