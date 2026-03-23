"use client"

import { useFlow } from "./flow-context"
import { AnimatedBalance } from "./animated-balance"

export function FlowHeader() {
  const { balance } = useFlow()

  return (
    <div className="bg-white rounded-xl border border-[#dadce0] px-4 py-3 mb-3 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      {/* Balance chip */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#e8f0fe] flex items-center justify-center">
          <svg className="w-4 h-4 text-[#4285f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-[#5f6368] font-medium uppercase tracking-wide">Balance</span>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-[#202124]">US$ </span>
            <AnimatedBalance value={balance} className="text-lg font-bold text-[#202124] tabular-nums" />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-[#e6f4ea] rounded-full px-3 py-1">
        <span className="text-xs font-semibold text-[#137333]">Active</span>
      </div>
    </div>
  )
}
