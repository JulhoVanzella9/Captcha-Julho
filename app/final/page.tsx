"use client"

import { useEffect, useState } from "react"
import { Volume2, Eye, Clock } from "lucide-react"
import { AnimatedBalance } from "@/components/flow/animated-balance"

interface Comment {
  id: number
  name: string
  avatar: string
  text: string
  time: string
  likes: number
  liked?: boolean
}

const allComments: Comment[] = [
  {
    id: 1,
    name: "Maria Silva",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    text: "I just received my $186 in less than 24 hours! This is incredible! Thank you Google Rewards! 🎉",
    time: "2 hours ago",
    likes: 234,
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    text: "At first I was skeptical, but I actually received my payment! Already made $312 this week alone! 🔥",
    time: "5 hours ago",
    likes: 189,
  },
  {
    id: 3,
    name: "Ana Rodriguez",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    text: "Best thing I've done this month! Super easy and fast. Already recommended to all my friends! ⭐",
    time: "8 hours ago",
    likes: 156,
  },
  {
    id: 4,
    name: "Carlos Mendez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    text: "My payment arrived faster than I expected. This program really works! Thank you! 🙌",
    time: "1 day ago",
    likes: 298,
  },
  {
    id: 5,
    name: "Jennifer Lee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    text: "Just did my third withdrawal! This is now my main source of extra income! Highly recommend!!! 💰",
    time: "1 day ago",
    likes: 427,
  },
  {
    id: 6,
    name: "Lucas Ferreira",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    text: "I showed my wife and she thought it was a scam. Then I showed her my bank statement. Now she does it too 😂",
    time: "2 days ago",
    likes: 512,
  },
  {
    id: 7,
    name: "Sophie Turner",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    text: "Received via PayPal in less than 5 minutes! I was shocked at how fast it was 🚀",
    time: "2 days ago",
    likes: 371,
  },
  {
    id: 8,
    name: "Marcus Thompson",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
    text: "3rd time withdrawing this month. Always pays on time, never had any issues. Legit program 👍",
    time: "3 days ago",
    likes: 203,
  },
]

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0">
    <path fill="#1877F2" d="M36 18C36 8.059 27.941 0 18 0S0 8.059 0 18c0 8.985 6.584 16.43 15.188 17.779V23.203h-4.57V18h4.57v-3.962c0-4.513 2.688-7.006 6.802-7.006 1.97 0 4.031.352 4.031.352v4.43h-2.271c-2.237 0-2.933 1.388-2.933 2.813V18h4.992l-.798 5.203h-4.194v12.576C29.416 34.43 36 26.985 36 18z"/>
    <path fill="#fff" d="M25.003 23.203L25.801 18h-4.992v-3.373c0-1.425.696-2.813 2.933-2.813h2.271v-4.43s-2.061-.352-4.031-.352c-4.114 0-6.802 2.493-6.802 7.006V18h-4.57v5.203h4.57v12.576a18.15 18.15 0 005.624 0V23.203h4.199z"/>
  </svg>
)

export default function FinalPage() {
  const [balance, setBalance] = useState(289)
  const [countdown, setCountdown] = useState({ minutes: 7, seconds: 3 })
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5)
  const [comments, setComments] = useState(allComments)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("captcha_balance")
    if (stored) setBalance(parseInt(stored, 10))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleLike = (commentId: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
      }
      return comment
    }))
  }

  const loadMoreComments = () => {
    setVisibleCommentsCount(prev => Math.min(prev + 5, comments.length))
  }

  const visibleComments = comments.slice(0, visibleCommentsCount)

  return (
    <div className="min-h-screen bg-[#f1f3f4]">
      <div className="w-full max-w-md mx-auto flex flex-col pb-6">

        {/* Header — rounded floating card */}
        <div
          className="mx-3 mt-3 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md px-4 py-3 flex items-center justify-between"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-12px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <div className="flex items-center gap-2">
            <GoogleIcon className="h-9 w-9 flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-medium text-gray-800">Google</span>
              <span className="text-xs font-medium text-[#1a73e8]">Rewards</span>
            </div>
          </div>
          <div className="flex items-center border-2 border-dashed border-green-400 rounded-lg px-2 py-1.5">
            <span className="text-[8px] uppercase tracking-wider text-gray-500 font-semibold mr-1.5 leading-tight text-right">Your Current<br/>Balance:</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-base font-bold text-green-600">US$</span>
              <AnimatedBalance value={balance} className="text-base font-bold text-green-600 tabular-nums" />
            </div>
          </div>
        </div>

        {/* Main video card */}
        <div
          className="mx-3 mt-3 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
          }}
        >
          {/* Attention text */}
          <div className="px-4 pt-4 pb-3 text-center">
            <p className="text-sm font-bold text-gray-900 leading-snug">
              ATTENTION: Watch the video until the end to understand how to withdraw your available balance
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-5 px-4 py-2 bg-gray-100 text-xs text-gray-600 border-t border-b border-gray-200">
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>6M views</span>
            </div>
            <div
              className="flex items-center gap-1.5 font-semibold"
              style={{ color: '#ef4444', animation: 'final-pulse-red 1.5s ease-in-out infinite' }}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Video will be deleted in {countdown.minutes}:{countdown.seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Video */}
          <div className="bg-black">
            <video
              className="w-full block"
              controls
              autoPlay
              playsInline
              preload="auto"
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/teste%20vsl-kYUFE1xRrCFKqhDNSzNSdnQlZshpH2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Sound notice */}
          <div className="flex items-center justify-center gap-2 py-3 bg-white border-t border-gray-100 text-sm text-gray-600">
            <Volume2 className="h-4 w-4 text-gray-500" />
            <span>Make sure your sound is on</span>
          </div>
        </div>

        {/* Comments card */}
        <div
          className="mx-3 mt-3 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.55s ease 0.3s, transform 0.55s ease 0.3s',
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <FacebookIcon />
              <span className="font-bold text-gray-900 text-base">Comments</span>
            </div>
            <span className="text-sm text-gray-500">1,847 comments</span>
          </div>

          {/* Comment list */}
          <div className="px-4 pt-3 pb-2 flex flex-col gap-1">
            {visibleComments.map((comment, i) => (
              <div
                key={comment.id}
                className="flex gap-3 py-2"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.4s ease ${0.35 + i * 0.08}s, transform 0.4s ease ${0.35 + i * 0.08}s`,
                }}
              >
                <img
                  src={comment.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-0.5"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="bg-[#f2f3f5] rounded-2xl px-3 py-2.5">
                    <p className="text-sm font-bold text-gray-900 leading-tight mb-1">{comment.name}</p>
                    <p className="text-sm text-gray-800 leading-snug">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 px-1">
                    <button className="text-xs text-gray-500 hover:text-gray-800 font-semibold transition-colors">Like</button>
                    <button className="text-xs text-gray-500 hover:text-gray-800 font-semibold transition-colors">Reply</button>
                    <span className="text-xs text-gray-400">{comment.time}</span>
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className="flex items-center gap-1.5 text-xs ml-auto transition-transform active:scale-90"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm transition-colors"
                        style={{ background: comment.liked ? '#1877f2' : '#1877f2' }}
                      >
                        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                        </svg>
                      </div>
                      <span className="text-gray-600 font-medium">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View more */}
          {visibleCommentsCount < comments.length && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-2">
              <button
                onClick={loadMoreComments}
                className="w-full text-center text-sm text-[#1877f2] font-semibold py-2 hover:text-[#1557b0] transition-colors flex items-center justify-center gap-1 active:scale-95"
              >
                View more comments...
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1877f2]">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="text-center text-xs text-gray-400 py-4"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.5s ease 0.6s',
          }}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <GoogleIcon className="h-4 w-4" />
            <span>© 2026 Google Rewards</span>
          </div>
          <div className="flex justify-center gap-3">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of use</a>
          </div>
        </div>

      </div>
    </div>
  )
}
