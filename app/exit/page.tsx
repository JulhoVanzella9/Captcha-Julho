"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ExitPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(148)
  const [returnPage, setReturnPage] = useState("/captcha1")
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState({ minutes: 4, seconds: 59 })
  const [timerExpired, setTimerExpired] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("captcha_balance")
    if (stored) setBalance(parseInt(stored, 10))
    const ret = localStorage.getItem("exit_return_page")
    if (ret) setReturnPage(ret)

    setMounted(true)
    const t = setTimeout(() => setProgress(88), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 }
        clearInterval(interval)
        setTimerExpired(true)
        return { minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClaim = () => {
    router.push(returnPage)
  }

  const avatars = [
    { letter: "M", bg: "#4285F4" },
    { letter: "J", bg: "#34A853" },
    { letter: "A", bg: "#FBBC05" },
    { letter: "L", bg: "#EA4335" },
    { letter: "R", bg: "#9C27B0" },
  ]

  const bonusAmount = 50

  return (
    <div className="min-h-screen bg-black/70 flex items-start justify-center px-4 py-6 overflow-y-auto">
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(24px)',
          transition: 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Red header */}
        <div className="bg-[#e53935] px-5 py-4 flex items-center justify-center gap-3">
          <span className="text-xl">⚠️</span>
          <span className="text-white font-extrabold text-lg tracking-tight">Wait! Don't leave yet!</span>
          <span className="text-xl">⚠️</span>
        </div>

        {/* Body */}
        <div className="bg-white px-6 pt-5 pb-6 flex flex-col gap-4">

          {/* Money emoji + headline */}
          <div className="text-center">
            <div
              className="text-5xl mb-3 inline-block"
              style={{ animation: mounted ? 'ex-bounce 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.1s both' : 'none' }}
            >
              💸
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
              You'll lose your US$ {balance}.00!
            </h2>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
              If you leave now, your earned balance will be{" "}
              <strong className="text-[#e53935]">permanently lost.</strong>{" "}
              You're so close!
            </p>
          </div>

          {/* Bonus banner */}
          <div
            className="rounded-2xl border-2 border-dashed border-[#34a853] bg-green-50 px-4 py-3 flex items-center gap-3"
            style={{ animation: mounted ? 'ex-glow 2s ease-in-out 0.5s infinite' : 'none' }}
          >
            <span className="text-2xl flex-shrink-0">🎁</span>
            <div>
              <p className="text-sm font-extrabold text-green-700 leading-tight">
                EXCLUSIVE BONUS: +US$ {bonusAmount}.00 FREE!
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                Complete your withdrawal now and receive an extra bonus reward.
              </p>
            </div>
          </div>

          {/* Countdown timer */}
          <div className={`rounded-2xl px-4 py-3 flex items-center justify-between ${timerExpired ? 'bg-red-100 border border-red-300' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <span className="text-sm font-semibold text-gray-700">
                {timerExpired ? 'Offer almost gone!' : 'This offer expires in:'}
              </span>
            </div>
            <span
              className="text-lg font-extrabold tabular-nums"
              style={{
                color: timerExpired ? '#e53935' : timer.minutes === 0 ? '#e53935' : '#d97706',
                animation: timer.minutes === 0 && !timerExpired ? 'ex-blink 0.7s ease-in-out infinite' : 'none',
              }}
            >
              {timer.minutes}:{timer.seconds.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Progress</span>
              <span className="text-xs font-bold text-[#1a73e8]">Almost done! 🏁</span>
            </div>
            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #1a73e8, #34a853)',
                  transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1 text-right">Only 1 step left!</p>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-3 py-2.5">
            <div className="flex -space-x-2 flex-shrink-0">
              {avatars.map((a, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  style={{ background: a.bg, zIndex: avatars.length - i }}
                >
                  {a.letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">47 people</strong> withdrew in the last hour
            </p>
          </div>

          {/* What you'll get box */}
          <div className="bg-blue-50 rounded-2xl px-4 py-3 border border-blue-100">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">What you'll receive:</p>
            <div className="flex flex-col gap-1.5">
              {[
                `✅ Your earned balance: US$ ${balance}.00`,
                `🎁 Exclusive bonus: US$ ${bonusAmount}.00`,
                `⚡ Instant withdrawal available`,
              ].map((item, i) => (
                <p key={i} className="text-sm text-gray-700 font-medium">{item}</p>
              ))}
              <div className="border-t border-blue-200 mt-1 pt-1.5">
                <p className="text-sm font-extrabold text-green-700">
                  💰 Total: US$ {balance + bonusAmount}.00
                </p>
              </div>
            </div>
          </div>

          {/* CTA button */}
          <button
            onClick={handleClaim}
            className="w-full text-white font-extrabold py-4 rounded-2xl text-base transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #1a73e8, #1557b0)',
              boxShadow: '0 6px 20px rgba(26,115,232,0.4)',
              animation: mounted ? 'ex-pulse-btn 2s ease-in-out 1s infinite' : 'none',
            }}
          >
            Yes, I want my US$ {balance + bonusAmount}.00! 🎉
          </button>

          {/* Dismiss */}
          <button
            onClick={() => router.push("/")}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors text-center pb-1"
          >
            No thanks, I'll give up my US$ {balance + bonusAmount}.00
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ex-bounce {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          55%  { transform: scale(1.25) rotate(10deg); opacity: 1; }
          75%  { transform: scale(0.88) rotate(-5deg); }
          90%  { transform: scale(1.06) rotate(2deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes ex-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(52,168,83,0); }
          50%      { box-shadow: 0 0 12px 3px rgba(52,168,83,0.2); }
        }
        @keyframes ex-blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @keyframes ex-pulse-btn {
          0%,100% { box-shadow: 0 6px 20px rgba(26,115,232,0.4); transform: scale(1); }
          50%      { box-shadow: 0 8px 28px rgba(26,115,232,0.6); transform: scale(1.015); }
        }
      `}</style>
    </div>
  )
}
