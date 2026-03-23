"use client"

import { useState, useEffect } from "react"
import { useFlow } from "./flow-context"
import { AnimatedBalance } from "./animated-balance"
import { Confetti } from "./confetti"
import { TrustBadges } from "./trust-badges"

export function StepCongrats() {
  const { balance, nextStep } = useFlow()
  const [isLoading, setIsLoading] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState(14)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => Math.max(prev - 1, 2))
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  const handleWithdraw = () => {
    setIsLoading(true)
    setTimeout(() => nextStep(), 800)
  }

  return (
    <section className="flex flex-col bg-white -mx-4 -mt-4 px-4 pt-4 pb-4">
      <Confetti trigger={showContent} />
      {/* Header */}
      <header className="flex items-center justify-between py-3 mb-3 bg-gray-50 px-4 -mx-4 rounded-b-2xl">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-10 w-10 flex-shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-medium text-gray-800">Google</span>
            <span className="text-sm font-medium text-gray-500">Rewards</span>
          </div>
        </div>

        <div className="flex items-center border-2 border-dashed border-green-400 rounded-lg px-3 py-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mr-2 leading-tight">Your Current<br/>Balance:</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-green-600 mr-1">US$</span>
            <AnimatedBalance value={balance} className="text-2xl font-bold text-green-600 tabular-nums" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`flex flex-col transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

        {/* Main Card */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center mb-5">
          {/* Google logo inside card */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg viewBox="0 0 24 24" className="h-8 w-8 flex-shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-lg font-medium text-gray-700">Google Rewards</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-2">{"🎁"} Congratulations! {"🎁"}</div>

          <p className="text-base text-gray-600 mb-4">
            {"Your balance is available for immediate withdrawal! 🎉"}
          </p>

          {/* Earnings box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <p className="text-base text-gray-800 font-medium">
              These are your earnings for the {3} surveys you just completed.
            </p>
          </div>

          <p className="text-base text-gray-600">
            {"Click the button below and see the immediate withdrawal guide! 👇"}
          </p>
        </div>

        {/* Spots left urgency */}
        <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-4">
          <span className="text-base">{"⚠️"}</span>
          <span className="text-sm text-red-600 font-bold">
            Only {spotsLeft} withdrawal spots left today!
          </span>
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={isLoading}
          className={`w-full text-white font-bold py-4 px-6 rounded-xl text-lg
            btn-3d-green cursor-pointer
            transition-all duration-150
            disabled:opacity-70 disabled:cursor-not-allowed
            ${!isLoading ? "animate-btn-breathe" : ""}`}
          style={isLoading ? { boxShadow: 'none', background: '#22c55e' } : undefined}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">{"▶"}</span>
              <span>Yes, withdraw my balance now!</span>
            </div>
          )}
        </button>

        {/* Trust Badges */}
        <div className="mt-4">
          <TrustBadges />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm text-gray-400">{"© 2026 Google Rewards"}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <a href="#" className="text-xs text-gray-400 underline">Privacy Policy</a>
          <span className="text-xs text-gray-400">|</span>
          <a href="#" className="text-xs text-gray-400 underline">Terms of use</a>
        </div>
      </footer>
    </section>
  )
}
