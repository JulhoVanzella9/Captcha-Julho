"use client"

import { FlowProvider, useFlow } from "./flow-context"
import { FlowHeader } from "./flow-header"
import { ProgressDots } from "./progress-dots"
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
    <main className="flex flex-col w-full max-w-md mx-auto px-4 py-4">
      {/* Only show header on captcha steps 2-4 */}
      {currentStep > 1 && currentStep < 5 && <FlowHeader />}

      {currentStep > 1 && currentStep < 5 && (
        <div className="mb-2">
          <ProgressDots />
        </div>
      )}

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
  )
}

export function RewardsFlow({ ctaUrl }: RewardsFlowProps) {
  return (
    <FlowProvider>
      <FlowContent ctaUrl={ctaUrl} />
    </FlowProvider>
  )
}
