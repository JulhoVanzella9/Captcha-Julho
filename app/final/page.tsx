"use client"

import { useEffect, useState } from "react"
import { Volume2, ThumbsUp, MoreHorizontal, Eye, Clock } from "lucide-react"
import { AnimatedBalance } from "@/components/flow/animated-balance"

interface Comment {
  id: number
  name: string
  avatar: string
  text: string
  time: string
  likes: number
  liked?: boolean
  replies?: { name: string; avatar: string; text: string; time: string }[]
}

const allComments: Comment[] = [
  {
    id: 1,
    name: "Maria Silva",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    text: "I just received my $186 in less than 24 hours! This is Incredible! Thank you Google Rewards! 🎉",
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
    text: "Best thing I've done this month! Super easy and fast. Already recommended to all my friends! 👍",
    time: "8 hours ago",
    likes: 156,
  },
  {
    id: 4,
    name: "Carlos Mendez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    text: "My payment arrived faster than I expected. This program really works! Thank you! 🙏",
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
]

export default function FinalPage() {
  const [balance, setBalance] = useState(289)
  const [countdown, setCountdown] = useState({ minutes: 5, seconds: 57 })
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5)
  const [comments, setComments] = useState(allComments)

  useEffect(() => {
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
    <div className="min-h-screen bg-[#f1f3f4] flex flex-col">
      <main className="flex flex-col w-full max-w-md mx-auto flex-1">
        <section className="flex flex-col bg-white">
          {/* Header with attention message */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg viewBox="0 0 24 24" className="h-8 w-8 flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-medium text-gray-800">Google</span>
                <span className="text-xs font-medium text-gray-500">Rewards</span>
              </div>
              <div className="ml-auto flex items-center border-2 border-dashed border-green-400 rounded-lg px-2 py-1.5">
                <span className="text-[8px] uppercase tracking-wider text-gray-500 font-semibold mr-1.5 leading-tight text-right">Balance:</span>
                <div className="flex items-baseline">
                  <span className="text-lg font-bold text-green-600 mr-0.5">US$</span>
                  <AnimatedBalance value={balance} className="text-lg font-bold text-green-600 tabular-nums" />
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-bold text-gray-800 leading-snug">
              ATTENTION: Watch the video until the end to understand how to withdraw your available balance
            </p>
          </div>

          {/* Video stats bar */}
          <div className="flex items-center justify-center gap-4 px-4 py-2 bg-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>6M views</span>
            </div>
            <div className="flex items-center gap-1 text-red-500 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Video will be deleted in {countdown.minutes}:{countdown.seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-black">
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

          {/* Sound Notice */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 py-3 bg-gray-50">
            <Volume2 className="h-4 w-4 text-gray-500" />
            <span>Make sure your sound is on</span>
          </div>

          {/* Comments Section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#1877f2] flex items-center justify-center">
                <span className="text-white text-xs font-bold">f</span>
              </div>
              <span className="font-semibold text-gray-900">Comments</span>
              <span className="text-sm text-gray-500">1,847 comments</span>
            </div>

            <div className="flex flex-col gap-4">
              {visibleComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{comment.name}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{comment.text}</p>

                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Like</button>
                      <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Reply</button>
                      <span className="text-xs text-gray-400">{comment.time}</span>
                      <button
                        onClick={() => toggleLike(comment.id)}
                        className={`flex items-center gap-1 text-xs ml-auto ${comment.liked ? 'text-[#1877f2]' : 'text-gray-500'}`}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 ${comment.liked ? 'fill-[#1877f2]' : ''}`} />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCommentsCount < comments.length && (
              <button
                onClick={loadMoreComments}
                className="w-full text-center text-sm text-[#1877f2] font-medium py-3 hover:text-[#1557b0] transition-colors"
              >
                View more comments...
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{"© 2026 Google Rewards"}</span>
            </div>
            <div className="flex justify-center gap-3">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-600">Terms of Use</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
