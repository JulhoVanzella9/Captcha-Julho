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
      <div className="bg-white border-t border-[#dadce0] sticky bottom-0 z-40 px-4 pt-3 pb-2 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        {/* Progress track */}
        <div className="relative mx-8 mb-3">
          {/* Background track */}
          <div className="absolute top-[13px] left-0 right-0 h-[3px] bg-[#e8eaed] rounded-full" />
          {/* Filled track */}
          <div
            className="absolute top-[13px] left-0 h-[3px] bg-gradient-to-r from-[#4285f4] to-[#4285f4] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ width: currentStep === 1 ? "0%" : currentStep === 2 ? "16%" : currentStep === 3 ? "33%" : currentStep === 4 ? "50%" : currentStep === 5 ? "80%" : "100%" }}
          />

          {/* Steps */}
          <div className="relative flex items-center justify-between">
            {/* Home */}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-500 ease-out
                ${isHome ? "bg-[#4285f4] shadow-[0_0_0_3px_rgba(66,133,244,0.2)]" : currentStep > 1 ? "bg-[#34a853] shadow-[0_0_0_3px_rgba(52,168,83,0.15)]" : "bg-[#e8eaed]"}`}>
                {currentStep > 1 ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className={`w-3.5 h-3.5 ${isHome ? "text-white" : "text-[#9aa0a6]"}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                )}
              </div>
              <span className={`text-[10px] font-semibold transition-colors duration-300 ${isHome ? "text-[#4285f4]" : currentStep > 1 ? "text-[#34a853]" : "text-[#9aa0a6]"}`}>Home</span>
            </div>

            {/* Tasks */}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-500 ease-out
                ${isTasks ? "bg-[#4285f4] shadow-[0_0_0_3px_rgba(66,133,244,0.2)]" : currentStep > 4 ? "bg-[#34a853] shadow-[0_0_0_3px_rgba(52,168,83,0.15)]" : "bg-[#e8eaed]"}`}>
                {currentStep > 4 ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className={`text-[10px] font-bold ${isTasks ? "text-white" : "text-[#9aa0a6]"}`}>{isTasks ? `${currentStep - 1}/3` : "3"}</span>
                )}
              </div>
              <span className={`text-[10px] font-semibold transition-colors duration-300 ${isTasks ? "text-[#4285f4]" : currentStep > 4 ? "text-[#34a853]" : "text-[#9aa0a6]"}`}>Tasks</span>
            </div>

            {/* Rewards */}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-500 ease-out
                ${isRewards ? "bg-[#4285f4] shadow-[0_0_0_3px_rgba(66,133,244,0.2)]" : "bg-[#e8eaed]"}`}>
                {currentStep >= 6 ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className={`w-3.5 h-3.5 ${isRewards ? "text-white" : "text-[#9aa0a6]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <span className={`text-[10px] font-semibold transition-colors duration-300 ${isRewards ? "text-[#4285f4]" : "text-[#9aa0a6]"}`}>Rewards</span>
            </div>
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
