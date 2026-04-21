"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, X, CheckCircle, XCircle } from "lucide-react"
import { AnimatedBalance } from "@/components/flow/animated-balance"

type FeedbackType = "correct" | "wrong" | null

interface CaptchaImage {
  id: number
  src: string
  isSelected: boolean
}

const captchaImages: CaptchaImage[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=150&h=150&fit=crop&q=80", isSelected: true },
  { id: 2, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&q=80", isSelected: false },
  { id: 3, src: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=150&h=150&fit=crop&q=80", isSelected: true },
  { id: 4, src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150&h=150&fit=crop&q=80", isSelected: false },
  { id: 5, src: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=150&h=150&fit=crop&q=80", isSelected: true },
  { id: 6, src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop&q=80", isSelected: false },
  { id: 7, src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=150&h=150&fit=crop&q=80", isSelected: false },
  { id: 8, src: "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=150&h=150&fit=crop&q=80", isSelected: true },
  { id: 9, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop&q=80", isSelected: false },
]

export default function Captcha1Page() {
  const router = useRouter()
  const [feedback, setFeedback] = useState<FeedbackType>(null)
  const [balance, setBalance] = useState(39)

  useEffect(() => {
    localStorage.setItem("captcha_balance", "39")
    setBalance(39)
  }, [])

  useEffect(() => {
    window.history.pushState(null, "", window.location.href)
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href)
      localStorage.setItem("exit_return_page", "/captcha1")
      router.push("/exit")
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [router])

  const handleCorrectAnswer = () => {
    setFeedback("correct")
    const newBalance = balance + 36
    setBalance(newBalance)
    localStorage.setItem("captcha_balance", newBalance.toString())
    setTimeout(() => {
      router.push("/captcha2")
    }, 1000)
  }

  const handleWrongAnswer = () => {
    setFeedback("wrong")
    const newBalance = balance + 36
    setBalance(newBalance)
    localStorage.setItem("captcha_balance", newBalance.toString())
    setTimeout(() => {
      router.push("/captcha2")
    }, 1500)
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#f1f3f4] flex flex-col">
      <main className="flex flex-col w-full max-w-md mx-auto px-3 py-3 flex-1">
        <div className="animate-page-enter">
          <section className="flex flex-col gap-3">
            <div className="bg-[#f8f9fa] rounded-2xl border border-[#dadce0] p-3 flex flex-col gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]">
              {/* Header with logo and balance - integrated */}
              <div className="flex items-center justify-between">
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

              {/* Google verification label + progress dots */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs font-medium text-[#5f6368]">Security Verification</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#4285f4] scale-110" />
                  <div className="h-2 w-2 rounded-full bg-[#dadce0]" />
                  <div className="h-2 w-2 rounded-full bg-[#dadce0]" />
                </div>
              </div>

              <div className="rounded-lg border border-[#dadce0] bg-white shadow-sm overflow-hidden">
                <div className="bg-[#4285f4] px-3 py-2">
                  <h3 className="text-white font-medium text-sm">Were all bicycles selected correctly?</h3>
                  <p className="text-blue-100 text-[10px] mt-0.5">Verify the selection below and confirm.</p>
                </div>

                <div className="grid grid-cols-3 gap-0.5 p-0.5 bg-gray-200">
                  {captchaImages.map((image) => (
                    <div
                      key={image.id}
                      className={`relative aspect-square overflow-hidden ${
                        image.isSelected ? "border-3 border-[#2196F3]" : ""
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={`Grid image ${image.id}`}
                        className="h-full w-full object-cover"
                        loading="eager"
                      />
                      {image.isSelected && (
                        <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#2196F3] shadow-md">
                          <Check className="h-3.5 w-3.5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Popup overlay feedback */}
              {feedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
                  {feedback === "correct" ? (
                    <div className="popup-result popup-correct animate-popup-bounce">
                      <CheckCircle className="h-10 w-10 text-[#34a853]" />
                      <span className="text-lg font-bold text-gray-800">Verified!</span>
                      <span className="text-sm text-gray-500">+$35.00 added to balance</span>
                    </div>
                  ) : (
                    <div className="popup-result popup-wrong animate-popup-bounce animate-shake-error">
                      <XCircle className="h-10 w-10 text-[#ea4335]" />
                      <span className="text-lg font-bold text-gray-800">Wrong answer</span>
                      <span className="text-sm text-gray-500">+$35.00 earned anyway</span>
                    </div>
                  )}
                </div>
              )}

              {/* Buttons */}
              {!feedback && (
                <>
                  <p className="text-center text-sm text-gray-700 font-medium">
                    Is this captcha selection correct?
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={handleWrongAnswer}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-red-600 font-bold text-sm
                        btn-3d-incorrect cursor-pointer
                        transition-all duration-150"
                    >
                      <X className="h-4 w-4" />
                      Incorrect
                    </button>
                    <button
                      onClick={handleCorrectAnswer}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-green-600 font-bold text-sm
                        btn-3d-correct cursor-pointer
                        transition-all duration-150"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Correct
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Bottom nav bar - Safari compatible */}
      <nav className="bg-white border-t border-[#dadce0] fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <div className="relative mx-4 mb-2">
          <div className="absolute top-[11px] left-0 right-0 h-[3px] bg-[#e8eaed] rounded-full" />
          <div className="absolute top-[11px] left-0 h-[3px] bg-gradient-to-r from-[#4285f4] to-[#4285f4] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ width: "16%" }} />

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
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-500 ease-out bg-[#4285f4] shadow-[0_0_0_2px_rgba(66,133,244,0.2)]">
                <span className="text-[9px] font-bold text-white">1/3</span>
              </div>
              <span className="text-[9px] font-semibold transition-colors duration-300 text-[#4285f4]">Tasks</span>
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-500 ease-out bg-[#e8eaed]">
                <svg className="w-3 h-3 text-[#9aa0a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[9px] font-semibold transition-colors duration-300 text-[#9aa0a6]">Rewards</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed bottom nav */}
      <div className="h-20" />
    </div>
  )
}
