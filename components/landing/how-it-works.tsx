"use client"

import { ClipboardList, Star, Wallet } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Sign Up",
    description: "Create your free account in less than 1 minute.",
  },
  {
    icon: Star,
    title: "Complete Surveys",
    description: "Answer simple questions about products and services.",
  },
  {
    icon: Wallet,
    title: "Get Paid",
    description: "Withdraw your earnings via PayPal or Google Play credit.",
  },
]

export function HowItWorks() {
  return (
    <section className="flex flex-col gap-5 opacity-0 animate-fade-in-up animation-delay-200">
      <h2 className="text-center text-lg font-semibold text-gray-900">
        How It Works
      </h2>
      
      <div className="flex flex-col gap-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
              <step.icon className="h-5 w-5 text-[#1a73e8]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400">Step {index + 1}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
