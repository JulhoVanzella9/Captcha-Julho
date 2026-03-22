"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FlowContextType {
  currentStep: number
  balance: number
  setStep: (step: number) => void
  nextStep: () => void
  addBalance: (amount: number) => void
}

const FlowContext = createContext<FlowContextType | undefined>(undefined)

export function FlowProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [balance, setBalance] = useState(189)

  const setStep = (step: number) => setCurrentStep(step)
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6))
  const addBalance = (amount: number) => setBalance((prev) => prev + amount)

  return (
    <FlowContext.Provider value={{ currentStep, balance, setStep, nextStep, addBalance }}>
      {children}
    </FlowContext.Provider>
  )
}

export function useFlow() {
  const context = useContext(FlowContext)
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider")
  }
  return context
}
