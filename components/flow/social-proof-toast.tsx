"use client"

import { useState, useEffect, useCallback } from "react"

const FIRST_NAMES = [
  "Maria", "Ana", "João", "Pedro", "Lucas", "Juliana", "Carlos", "Fernanda",
  "Rafael", "Camila", "Bruno", "Larissa", "Marcos", "Patricia", "Diego",
  "Amanda", "Gabriel", "Isabela", "Thiago", "Leticia", "Felipe", "Beatriz",
  "Matheus", "Daniela", "Gustavo", "Vanessa", "Leonardo", "Cristina",
  "Sarah", "Michael", "James", "Emma", "David", "Sofia", "Daniel", "Laura",
  "Alex", "Jessica", "Chris", "Rachel", "Kevin", "Nicole", "Jason", "Ashley",
]

const CITIES = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador",
  "Fortaleza", "Recife", "Porto Alegre", "Brasília", "Manaus",
  "New York", "Los Angeles", "Miami", "Houston", "Chicago",
  "London", "Toronto", "Buenos Aires", "Lisboa", "Madrid",
]

const TEMPLATES = [
  (name: string, city: string, amount: string) =>
    `${name} from ${city} just withdrew US$ ${amount}!`,
  (name: string, city: string, amount: string) =>
    `${name} from ${city} earned US$ ${amount} today!`,
  (name: string, city: string) =>
    `${name} from ${city} just completed all surveys!`,
  (name: string, city: string, amount: string) =>
    `${name} from ${city} claimed US$ ${amount} reward!`,
]

function randomAmount(): string {
  const amounts = [189, 224, 259, 289, 294, 312, 335, 347]
  return amounts[Math.floor(Math.random() * amounts.length)].toString()
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateNotification(): string {
  const name = randomItem(FIRST_NAMES)
  const city = randomItem(CITIES)
  const amount = randomAmount()
  const template = randomItem(TEMPLATES)
  return template(name, city, amount)
}

export function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [timeAgo, setTimeAgo] = useState("")

  const showNotification = useCallback(() => {
    const times = ["just now", "2 min ago", "5 min ago", "8 min ago", "12 min ago"]
    setMessage(generateNotification())
    setTimeAgo(randomItem(times))
    setVisible(true)

    setTimeout(() => setVisible(false), 4000)
  }, [])

  useEffect(() => {
    // First notification after 15 seconds
    const firstTimer = setTimeout(() => {
      showNotification()
    }, 15000)

    // Then every 22-35 seconds
    const interval = setInterval(() => {
      const delay = 22000 + Math.random() * 13000
      setTimeout(showNotification, delay % 8000)
    }, 28000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [showNotification])

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-[9999] max-w-sm mx-auto transition-all duration-500 pointer-events-none
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
    >
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 px-4 py-3 flex items-start gap-3">
        {/* Green check icon */}
        <div className="flex-shrink-0 w-9 h-9 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 leading-snug">{message}</p>
          <p className="text-xs text-gray-400 mt-0.5">{timeAgo}</p>
        </div>

        {/* Verified badge */}
        <div className="flex-shrink-0 mt-1">
          <div className="flex items-center gap-0.5 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-semibold">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </div>
        </div>
      </div>
    </div>
  )
}
