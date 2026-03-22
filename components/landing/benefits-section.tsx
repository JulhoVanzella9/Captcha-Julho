"use client"

import { Shield, Clock, Smartphone, CreditCard } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Surveys take 30 seconds to 2 minutes.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Participate anywhere, anytime.",
  },
  {
    icon: CreditCard,
    title: "Fast Payments",
    description: "Receive funds directly to your account.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your data is always protected.",
  },
]

export function BenefitsSection() {
  return (
    <section className="flex flex-col gap-5 opacity-0 animate-fade-in-up animation-delay-300">
      <h2 className="text-center text-lg font-semibold text-gray-900">
        Why Participate
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <benefit.icon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">{benefit.title}</h3>
            <p className="text-xs leading-relaxed text-gray-500">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
