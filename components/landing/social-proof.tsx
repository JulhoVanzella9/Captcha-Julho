"use client"

import { Users, TrendingUp, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "127,483",
    label: "Active Users",
  },
  {
    icon: TrendingUp,
    value: "$2.4M",
    label: "Paid This Month",
  },
  {
    icon: Award,
    value: "4.8/5",
    label: "Average Rating",
  },
]

export function SocialProof() {
  return (
    <section className="flex flex-col gap-5 opacity-0 animate-fade-in-up animation-delay-300">
      <div className="flex items-center justify-around rounded-xl border border-gray-200 bg-gray-50 px-4 py-5">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center gap-1 text-center">
            <stat.icon className="mb-1 h-5 w-5 text-gray-400" />
            <span className="text-lg font-bold text-gray-900">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-wide text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
      
      {/* Activity Feed */}
      <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4">
        <span className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Recent Activity</span>
        <ActivityItem name="Sarah M." action="withdrew $85" time="just now" />
        <ActivityItem name="James R." action="completed 5 surveys" time="2 min ago" />
        <ActivityItem name="Emily P." action="withdrew $120" time="5 min ago" />
      </div>
    </section>
  )
}

function ActivityItem({ name, action, time }: { name: string; action: string; time: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-b-0">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
          <span className="text-xs font-medium text-gray-600">{name.charAt(0)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{name}</span>
          <span className="text-xs text-gray-500">{action}</span>
        </div>
      </div>
      <span className="text-[10px] text-gray-400">{time}</span>
    </div>
  )
}
