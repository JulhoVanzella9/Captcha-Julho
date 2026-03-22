"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"

interface FinalCTAProps {
  ctaUrl?: string
}

export function FinalCTA({ ctaUrl = "#" }: FinalCTAProps) {
  const handleCTAClick = () => {
    if (ctaUrl && ctaUrl !== "#") {
      window.location.href = ctaUrl
    }
  }

  return (
    <section className="flex flex-col gap-4 opacity-0 animate-fade-in-up animation-delay-500">
      <div className="flex flex-col rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-blue-100/50 px-5 py-7 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {"Don't miss this opportunity"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Limited spots available. Over <strong className="text-gray-900">2,300 people</strong> signed up in the last hour.
        </p>
        
        <Button
          size="lg"
          onClick={handleCTAClick}
          className="mt-5 w-full rounded-xl bg-[#1a73e8] py-6 text-base font-semibold text-white shadow-lg hover:bg-[#1557b0] animate-pulse-subtle cursor-pointer"
        >
          Claim My Spot
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Offer may expire at any time</span>
        </div>
      </div>
    </section>
  )
}
