"use client"

import { FlowProvider, useFlow } from "./flow-context"
import { FlowHeader } from "./flow-header"
import { ExitIntentModal } from "./exit-intent-modal"
import { StepIntro } from "./step-intro"
import { StepVerify } from "./step-verify"
import { StepVerify2 } from "./step-verify-2"
import { StepVerify3 } from "./step-verify-3"
import { StepCongrats } from "./step-congrats"
import { StepFinal } from "./step-final"

interface RewardsFlowProps {
  ctaUrl?: string
}

function FlowContent({ ctaUrl }: RewardsFlowProps) {
  const { currentStep } = useFlow()

  // Nav state: Home=1, Tasks=2-4, Rewards=5-6
  const isHome = currentStep === 1
  const isTasks = currentStep >= 2 && currentStep <= 4
  const isRewards = currentStep >= 5

  return (
    <div className="min-h-screen bg-[#f1f3f4] flex flex-col">
      <main className="flex flex-col w-full max-w-md mx-auto px-4 py-4 flex-1">
        {/* Balance header on captcha steps */}
        {currentStep >= 2 && currentStep <= 4 && <FlowHeader />}

        <div className="animate-page-enter" key={currentStep}>
          {currentStep === 1 && <StepIntro />}
          {currentStep === 2 && <StepVerify />}
          {currentStep === 3 && <StepVerify2 />}
          {currentStep === 4 && <StepVerify3 />}
          {currentStep === 5 && <StepCongrats />}
          {currentStep === 6 && <StepFinal ctaUrl={ctaUrl} />}
        </div>

        {/* Exit intent modal - shows on steps 2-5 */}
        {currentStep >= 2 && currentStep <= 5 && <ExitIntentModal />}
      </main>

      {/* Bottom nav bar with inline progress */}
      <div className="bg-white border-t border-[#dadce0] sticky bottom-0 z-40 px-6 py-2">
        <div className="flex items-center relative">
          {/* Progress bar connecting icons */}
          <div className="absolute top-[10px] left-[10%] right-[10%] h-[3px] bg-[#e8eaed] rounded-full">
            <div
              className="h-full bg-[#4285f4] rounded-full transition-all duration-700 ease-out"
              style={{ width: currentStep === 1 ? "0%" : currentStep <= 4 ? `${((currentStep - 1) / 4) * 50}%` : currentStep === 5 ? "80%" : "100%" }}
            />
          </div>

          {/* Home */}
          <div className="flex flex-col items-center gap-0.5 flex-1 z-10">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isHome ? "bg-[#4285f4]" : currentStep > 1 ? "bg-[#34a853]" : "bg-[#e8eaed]"}`}>
              {currentStep > 1 ? (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className={`w-3 h-3 ${isHome ? "text-white" : "text-[#5f6368]"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              )}
            </div>
            <span className={`text-[10px] font-medium ${isHome ? "text-[#4285f4]" : currentStep > 1 ? "text-[#34a853]" : "text-[#5f6368]"}`}>Home</span>
          </div>

          {/* Tasks */}
          <div className="flex flex-col items-center gap-0.5 flex-1 z-10">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isTasks ? "bg-[#4285f4]" : currentStep > 4 ? "bg-[#34a853]" : "bg-[#e8eaed]"}`}>
              {currentStep > 4 ? (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className={`text-[9px] font-bold ${isTasks ? "text-white" : "text-[#5f6368]"}`}>{isTasks ? `${currentStep - 1}/3` : "3"}</span>
              )}
            </div>
            <span className={`text-[10px] font-medium ${isTasks ? "text-[#4285f4]" : currentStep > 4 ? "text-[#34a853]" : "text-[#5f6368]"}`}>Tasks</span>
          </div>

          {/* Rewards */}
          <div className="flex flex-col items-center gap-0.5 flex-1 z-10">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isRewards ? "bg-[#4285f4]" : "bg-[#e8eaed]"}`}>
              <svg className={`w-3 h-3 ${isRewards ? "text-white" : "text-[#5f6368]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className={`text-[10px] font-medium ${isRewards ? "text-[#4285f4]" : "text-[#5f6368]"}`}>Rewards</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RewardsFlow({ ctaUrl }: RewardsFlowProps) {
  return (
    <FlowProvider>
      <FlowContent ctaUrl={ctaUrl} />
    </FlowProvider>
  )
}
