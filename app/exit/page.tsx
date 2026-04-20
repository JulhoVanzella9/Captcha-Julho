"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ExitPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(148)
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem("captcha_balance")
    if (stored) setBalance(parseInt(stored, 10))
    setMounted(true)
    const t = setTimeout(() => setProgress(88), 120)
    return () => clearTimeout(t)
  }, [])

  const handleClaim = () => {
    router.push("/congrats")
  }

  const avatars = [
    { letter: "M", color: "#4285F4" },
    { letter: "J", color: "#34A853" },
    { letter: "A", color: "#FBBC05" },
    { letter: "L", color: "#EA4335" },
  ]

  return (
    <div className="min-h-screen bg-black/60 flex items-center justify-center px-4 py-8">
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(20px)',
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Red header */}
        <div className="bg-[#e53935] px-5 py-4 flex items-center justify-center gap-3">
          <span className="text-white text-lg">⚠️</span>
          <span className="text-white font-extrabold text-lg tracking-tight">Wait! Don't leave yet!</span>
          <span className="text-white text-lg">⚠️</span>
        </div>

        {/* White body */}
        <div className="bg-white px-6 pt-6 pb-7 flex flex-col items-center gap-4">

          {/* Money emoji */}
          <div
            className="text-5xl"
            style={{
              animation: mounted ? 'exit-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.15s both' : 'none',
            }}
          >
            💸
          </div>

          {/* Main headline */}
          <div className="text-center">
            <p className="text-xl font-extrabold text-gray-900 leading-tight">
              You'll lose your US$ {balance}.00!
            </p>
          </div>

          {/* Subtext */}
          <p className="text-sm text-gray-600 text-center leading-relaxed -mt-1">
            If you leave now, your earned balance will be{" "}
            <strong className="text-[#e53935]">permanently lost.</strong>{" "}
            You're so close to withdrawing!
          </p>

          {/* Progress bar */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Progress</span>
              <span className="text-xs font-bold text-[#1a73e8]">Almost done!</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1a73e8] to-[#4285f4]"
                style={{
                  width: `${progress}%`,
                  transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((a, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  style={{ background: a.color, zIndex: avatars.length - i }}
                >
                  {a.letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">47 people</strong> withdrew in the last hour
            </p>
          </div>

          {/* CTA button */}
          <button
            onClick={handleClaim}
            className="w-full bg-[#1a73e8] hover:bg-[#1557b0] active:scale-95 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg"
            style={{ animation: mounted ? 'exit-pulse-btn 2s ease-in-out 0.8s infinite' : 'none' }}
          >
            Yes, I want my US$ {balance}.00!
          </button>

          {/* Dismiss */}
          <button
            onClick={() => router.push("/")}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            No thanks, I'll give up my balance
          </button>
        </div>
      </div>

      <style>{`
        @keyframes exit-bounce {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(8deg);  opacity: 1; }
          80%  { transform: scale(0.9) rotate(-4deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes exit-pulse-btn {
          0%,100% { box-shadow: 0 4px 16px rgba(26,115,232,0.35); }
          50%      { box-shadow: 0 6px 24px rgba(26,115,232,0.55); transform: scale(1.01); }
        }
      `}</style>
    </div>
  )
}
