"use client"

import { useState, useEffect, useCallback } from "react"
import { useFlow } from "./flow-context"

export function ExitIntentModal() {
  const { balance } = useFlow()
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const handleExit = useCallback(() => {
    if (dismissed) return
    setShow(true)
  }, [dismissed])

  useEffect(() => {
    // Detect back button press
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      window.history.pushState(null, "", window.location.href)
      handleExit()
    }

    // Detect page visibility change (switching tabs / minimizing)
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !dismissed) {
        // User came back — show when they return
        handleExit()
      }
    }

    // Detect inactivity (30 seconds)
    let inactivityTimer: ReturnType<typeof setTimeout>
    const resetInactivity = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        handleExit()
      }, 35000)
    }

    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)
    document.addEventListener("visibilitychange", handleVisibility)
    document.addEventListener("touchstart", resetInactivity, { passive: true })
    document.addEventListener("scroll", resetInactivity, { passive: true })
    resetInactivity()

    return () => {
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("visibilitychange", handleVisibility)
      document.removeEventListener("touchstart", resetInactivity)
      document.removeEventListener("scroll", resetInactivity)
      clearTimeout(inactivityTimer)
    }
  }, [handleExit, dismissed])

  const handleStay = () => {
    setShow(false)
    setDismissed(true)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-5 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-slide-up-smooth">
        {/* Red warning top bar */}
        <div className="bg-red-500 px-5 py-4 flex items-center justify-center gap-3">
          <svg className="h-8 w-8 text-white animate-siren flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span className="text-white font-bold text-lg">Wait! Don{"'"}t leave yet!</span>
          <svg className="h-8 w-8 text-white animate-siren animation-delay-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <div className="p-5">
          {/* Lost money illustration */}
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">{"💸"}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              You{"'"}ll lose your US$ {balance}.00!
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              If you leave now, your earned balance will be <strong className="text-red-500">permanently lost</strong>.
              You{"'"}re so close to withdrawing!
            </p>
          </div>

          {/* Progress reminder */}
          <div className="bg-[#e8f0fe] border border-[#d2e3fc] rounded-xl p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Your Progress</span>
              <span className="text-xs font-bold text-[#1a73e8]">Almost done!</span>
            </div>
            <div className="w-full bg-[#d2e3fc] rounded-full h-2.5">
              <div className="bg-[#4285f4] h-2.5 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          {/* People withdrawing */}
          <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 mb-5">
            <div className="flex -space-x-2">
              {["bg-blue-400", "bg-green-400", "bg-purple-400", "bg-orange-400"].map((bg, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
                  <span className="text-[8px] text-white font-bold">
                    {["M", "J", "A", "L"][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-600">
              <strong>47 people</strong> withdrew in the last hour
            </span>
          </div>

          {/* CTA Buttons */}
          <button
            onClick={handleStay}
            className="w-full text-white font-bold py-3.5 px-6 rounded-xl text-base
              btn-3d-green cursor-pointer
              transition-all duration-150"
          >
            Yes, I want my US$ {balance}.00!
          </button>

{/* removed decline button */}
        </div>
      </div>
    </div>
  )
}
