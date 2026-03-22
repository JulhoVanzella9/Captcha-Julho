"use client"

import { useState, useEffect } from "react"
import { SpinWheel } from "@/components/flow/spin-wheel"

export default function RoletaPage() {
  const [prize, setPrize] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [countdown, setCountdown] = useState({ minutes: 4, seconds: 59 })
  const [onlineUsers, setOnlineUsers] = useState(2847)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSpinFinish = (wonPrize: string) => {
    setPrize(wonPrize)
    setTimeout(() => setShowResult(true), 600)
  }

  return (
    <main className="flex flex-col w-full max-w-md mx-auto min-h-dvh bg-white px-4 py-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-8 w-8 flex-shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-medium text-gray-800">Google</span>
            <span className="text-sm font-medium text-[#1a73e8]">Rewards</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {onlineUsers.toLocaleString()} online
        </div>
      </header>

      {/* Main Card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 text-center mb-4">
        <div className="text-3xl mb-2">{"🏆"}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Congratulations!
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          You{"'"}ve unlocked <strong className="text-gray-900">1 free spin</strong> on the exclusive Google Rewards wheel.
        </p>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-5">
        <span className="text-base">{"⏰"}</span>
        <span className="text-base text-red-600 font-bold">
          Offer expires in {countdown.minutes}:{countdown.seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Spin Wheel */}
      <div className="flex justify-center mb-4">
        <SpinWheel onFinish={handleSpinFinish} />
      </div>

      {/* Instruction */}
      {!prize && (
        <p className="text-center text-base text-gray-600 mb-2">
          Tap <strong className="text-[#4285F4]">SPIN</strong> and wait for the wheel to stop.
        </p>
      )}

      {!prize && (
        <p className="text-center text-sm text-gray-400 mb-4">
          Please don{"'"}t refresh while the wheel is spinning.
        </p>
      )}

      {/* Result Modal */}
      {showResult && prize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-slide-up-smooth">
            <div className="text-5xl text-center mb-3">{"🎉"}</div>

            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              You Won!
            </h2>

            <p className="text-center text-gray-500 text-base mb-4">
              Your exclusive reward is ready to claim
            </p>

            {/* Prize display */}
            <div className="border-2 border-dashed border-green-400 bg-green-50 rounded-xl p-5 text-center mb-5">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium block mb-1">Your Prize</span>
              <span className="text-4xl font-bold text-green-600">{prize}</span>
              <span className="text-lg text-gray-400">.00</span>
            </div>

            {/* CTA Button - 3D */}
            <a
              href="https://checkout.example.com/google-rewards/claim?ref=roleta"
              className="block w-full text-white font-bold py-4 px-6 rounded-xl text-lg text-center
                btn-3d-green cursor-pointer
                transition-all duration-150
                animate-btn-breathe"
            >
              Claim My {prize}.00 Now!
            </a>

            <p className="text-center text-xs text-gray-400 mt-3">
              {"By clicking, you agree to Google's Terms of Service."}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto pt-4 text-center">
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
    </main>
  )
}
