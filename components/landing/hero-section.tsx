"use client"

import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { ArrowRight, CheckCircle2, Gift } from "lucide-react"

interface HeroSectionProps {
  ctaUrl?: string
}

export function HeroSection({ ctaUrl = "#" }: HeroSectionProps) {
  const handleCTAClick = () => {
    if (ctaUrl && ctaUrl !== "#") {
      window.location.href = ctaUrl
    }
  }

  return (
    <section className="flex flex-col gap-5 opacity-0 animate-fade-in-up animation-delay-100">
      {/* Urgency Banner */}
      <div className="flex items-center justify-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <span className="text-sm font-medium text-amber-800">Limited access expires in:</span>
        <CountdownTimer initialMinutes={12} />
      </div>

      {/* Main Hero Card */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white px-5 py-7 text-center shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <Gift className="h-7 w-7 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold leading-snug text-gray-900 text-balance">
            Congratulations! You have been selected.
          </h1>
          <p className="text-sm leading-relaxed text-gray-600">
            You are among the users chosen to participate in our exclusive Google Rewards program.
          </p>
        </div>

        {/* Reward Box */}
        <div className="mt-6 rounded-xl border-2 border-dashed border-green-500 bg-green-50 p-5">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium uppercase tracking-wide text-green-700">
              You have already earned
            </span>
            <span className="text-4xl font-bold text-green-600">
              $39.00
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-5 flex flex-col gap-2 text-sm text-gray-600">
          <p>
            Complete <strong className="text-gray-900">3 quick surveys</strong> to unlock your first withdrawal.
          </p>
          <p className="text-xs text-gray-400">
            Thousands of people have participated today.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={handleCTAClick}
          className="mt-6 w-full rounded-xl bg-[#1a73e8] py-6 text-base font-semibold text-white shadow-lg hover:bg-[#1557b0] animate-pulse-subtle cursor-pointer"
        >
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
