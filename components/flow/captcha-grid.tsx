"use client"

import { useState, useEffect } from "react"
import { Check, X, CheckCircle, XCircle } from "lucide-react"
import { useFlow } from "./flow-context"
import { playSuccessSound, playErrorSound } from "./sounds"

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

export function CaptchaGrid() {
  const { nextStep, addBalance } = useFlow()
  const [feedback, setFeedback] = useState<FeedbackType>(null)
  const [countdown, setCountdown] = useState({ minutes: 5, seconds: 34 })

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

  // Captcha 1: "Correct" is the right answer
  const handleCorrectAnswer = () => {
    playSuccessSound()
    setFeedback("correct")
    setTimeout(() => {
      addBalance(35)
      nextStep()
    }, 1000)
  }

  const handleWrongAnswer = () => {
    playErrorSound()
    setFeedback("wrong")
    setTimeout(() => {
      addBalance(35)
      nextStep()
    }, 1500)
  }

  return (
    <div className="bg-[#f8f9fa] rounded-2xl border border-[#dadce0] p-4 flex flex-col gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]">
      {/* Google verification label + progress dots */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-medium text-[#5f6368]">Security Verification</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#4285f4] scale-110" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#dadce0]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#dadce0]" />
        </div>
      </div>

      <div className="rounded-lg border border-[#dadce0] bg-white shadow-sm overflow-hidden">
        {/* Header - asks to verify, not select */}
        <div className="bg-[#4285f4] px-4 py-2.5">
          <h3 className="text-white font-medium text-base">Were all bicycles selected correctly?</h3>
          <p className="text-blue-100 text-xs mt-0.5">Verify the selection below and confirm.</p>
        </div>

        {/* Image Grid */}
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
                <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2196F3] shadow-md">
                  <Check className="h-4 w-4 text-white stroke-[3]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-7 w-7">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-xs text-gray-500 font-medium">reCAPTCHA</span>
          </div>
        </div>
      </div>

      {/* Captcha countdown */}
      <div className="flex items-center justify-center gap-2">
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm text-gray-500">
          Captcha ends in{" "}
          <strong className="text-red-500">{countdown.minutes}:{countdown.seconds.toString().padStart(2, '0')}</strong>
        </span>
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
          <p className="text-center text-base text-gray-700 font-medium">
            Is this captcha selection correct?
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleWrongAnswer}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-red-600 font-bold text-base
                btn-3d-incorrect cursor-pointer
                transition-all duration-150"
            >
              <X className="h-5 w-5" />
              Incorrect
            </button>
            <button
              onClick={handleCorrectAnswer}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-green-600 font-bold text-base
                btn-3d-correct cursor-pointer
                transition-all duration-150"
            >
              <CheckCircle className="h-5 w-5" />
              Correct
            </button>
          </div>
        </>
      )}
    </div>
  )
}
