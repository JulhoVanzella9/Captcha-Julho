"use client"

import { useFlow } from "./flow-context"

const STEP_LABELS = ["Start", "Survey 1", "Survey 2", "Survey 3", "Confirm", "Withdraw"]

export function FlowProgressBar() {
  const { currentStep } = useFlow()

  // Endowed progress: start at 20%, end at 100%
  // Steps 1-6 map to 20%, 35%, 55%, 75%, 90%, 100%
  const progressMap: Record<number, number> = {
    1: 20,
    2: 35,
    3: 55,
    4: 75,
    5: 90,
    6: 100,
  }

  const percent = progressMap[currentStep] || 20

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Progress</span>
        <span className="text-xs font-bold text-green-600">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${percent}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-gray-400">
          {currentStep < 6 ? `Step ${currentStep} of 6` : "Complete!"}
        </span>
        <span className="text-[10px] text-green-600 font-medium">
          {currentStep < 5 ? `${6 - currentStep} steps to withdraw` : currentStep === 5 ? "Ready to withdraw!" : "Withdrawing..."}
        </span>
      </div>
    </div>
  )
}
