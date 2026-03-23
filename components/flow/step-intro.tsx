"use client"

import { useState, useEffect } from "react"
import { useFlow } from "./flow-context"
import { AnimatedBalance } from "./animated-balance"
import { Confetti } from "./confetti"

export function StepIntro() {
  const { nextStep, balance } = useFlow()
  const [isClicked, setIsClicked] = useState(false)
  const [phase, setPhase] = useState(0) // 0=hidden, 1=card, 2=moneybox, 3=text, 4=button

  // Staggered reveal
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleGetStarted = () => {
    setIsClicked(true)
    setTimeout(() => nextStep(), 300)
  }

  return (
    <section className="flex flex-col">
      <Confetti trigger={isClicked} />

      {/* Main Card — entrance with subtle 3D perspective */}
      <div
        className={`bg-green-50/50 rounded-2xl border border-green-200/60 text-center
          ${phase >= 1 ? "animate-card-entrance" : "opacity-0"}`}
      >
        {/* Header inside card */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-green-200/60">
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
        </div>

        <div className="p-6">
        {/* Congratulations header */}
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {"🎁"} Congratulations! {"🎁"}
        </div>

        <p className={`text-base text-gray-600 leading-relaxed mb-5 transition-all duration-500
          ${phase >= 1 ? "opacity-100" : "opacity-0"}`}
        >
          You{"'"}ve been selected for Google{"'"}s new rewards program!
        </p>

        {/* Already won box — money reveal with glow */}
        <div
          className={`border-2 border-dashed border-green-400 bg-green-100/70 rounded-xl p-5 mb-5
            ${phase >= 2 ? "animate-money-glow" : ""}
          `}
        >
          <div className={`flex items-center justify-center gap-1.5 mb-1.5
            ${phase >= 2 ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          >
            <span className="text-green-600 text-base">{"✅"}</span>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">You{"'"}ve already won</span>
          </div>
          <div className={phase >= 2 ? "animate-money-reveal" : "opacity-0"}>
            <span className="text-4xl font-black animate-text-shine">
              US$ {balance}!
            </span>
          </div>
        </div>

        {/* Text below — fades in after money */}
        <div className={`transition-all duration-600 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <p className="text-base text-gray-700 mb-2">
            Take <strong className="text-gray-900">3 more assessments</strong> and make your first withdrawal!
          </p>

          <p className="text-base text-gray-600 mb-1">
            Click the button below to get started! {"👇"}
          </p>
        </div>
        </div>
      </div>

      {/* CTA Button — breathes when visible */}
      <div className={`mt-5 transition-all duration-500 ${phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <button
          type="button"
          onClick={handleGetStarted}
          disabled={isClicked}
          className={`w-full rounded-xl py-4 px-6 text-lg font-bold text-white
            btn-3d-green cursor-pointer
            transition-all duration-150
            disabled:opacity-70 disabled:cursor-not-allowed
            ${!isClicked ? "animate-btn-breathe" : ""}
          `}
          style={isClicked ? { boxShadow: 'none', background: '#22c55e' } : undefined}
        >
          {isClicked ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            "Click here and get started!"
          )}
        </button>
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
