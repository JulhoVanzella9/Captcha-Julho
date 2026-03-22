"use client"

import { useFlow } from "./flow-context"

export function ProgressDots() {
  const { currentStep } = useFlow()
  
  // Map step 2 to assessment 1, step 3 to assessment 2, step 4 to assessment 3
  const assessmentNumber = currentStep - 1

  return (
    <div className="flex items-center justify-between px-1">
      <span className="text-sm text-gray-600 font-medium">
        Assessment {assessmentNumber} of 3
      </span>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              step === assessmentNumber
                ? "bg-[#1a73e8] scale-110"
                : step < assessmentNumber
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
