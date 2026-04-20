"use client"

import { useEffect, useState } from "react"
import { Volume2, ThumbsUp, MoreHorizontal, MessageCircle } from "lucide-react"
import { useFlow } from "./flow-context"
import { AnimatedBalance } from "./animated-balance"

interface StepFinalProps {
  ctaUrl?: string
}

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
    name: "Jessica Martinez",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    text: "I was skeptical but decided to try it. Followed all the steps in the video and it actually worked. Got my payout within a few hours.",
    time: "2 min",
    likes: 247,
    replies: [
      { name: "Amanda Costa", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face", text: "How long did the whole process take?", time: "1 min" },
      { name: "Jessica Martinez", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", text: "About 10 minutes total. Watch the video until the end, it explains everything clearly.", time: "45 sec" }
    ]
  },
  {
    id: 2,
    name: "Marcus Thompson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    text: "Been using Google Rewards for a few weeks now. It's legit — Google pays you for helping improve their services. Not life-changing money but a nice bonus.",
    time: "15 min",
    likes: 183,
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    text: "Just completed my withdrawal. The process was straightforward. Honestly surprised how smooth it was.",
    time: "18 min",
    likes: 156,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    text: "Is this actually from Google? Seems too good to be true",
    time: "21 min",
    likes: 89,
    replies: [
      { name: "Elena Petrova", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face", text: "I had the same doubt. Watch the full video — they explain how the program works and why Google runs it. I went through the process and got paid.", time: "19 min" }
    ]
  },
  {
    id: 5,
    name: "Lucas Ferreira",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    text: "Quick tip for anyone watching: don't skip the video. The withdrawal steps are at the end and they're important. Got my balance transferred no issues.",
    time: "1h",
    likes: 312,
  },
  {
    id: 6,
    name: "Natalie Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    text: "Third time using this program. Each time it works the same way. Simple and reliable.",
    time: "1h",
    likes: 278,
  },
  {
    id: 7,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    text: "Showed this to my wife and she thought it was a scam at first. Then I showed her my bank statement. Now she's doing it too lol",
    time: "2h",
    likes: 445,
    replies: [
      { name: "Maria Santos", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face", text: "Haha same reaction from my husband!", time: "1h" },
    ]
  },
  {
    id: 8,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    text: "The withdrawal was faster than I expected. Requested it and the money showed up same day.",
    time: "2h",
    likes: 201,
  },
  {
    id: 9,
    name: "Carlos Mendes",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    text: "3rd time withdrawing this month. Google always pays on time, never had any issues.",
    time: "3h",
    likes: 312,
  },
  {
    id: 10,
    name: "Emily Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    text: "My friend told me about this and I didn't believe her. Now I'm telling everyone I know lol",
    time: "3h",
    likes: 178,
    replies: [
      { name: "Luisa Ferreira", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", text: "Same here! Word of mouth is how I found out too", time: "2h" },
    ]
  },
  {
    id: 11,
    name: "Robert Taylor",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
    text: "Just completed everything. Easiest money I've ever made. The video explains it perfectly.",
    time: "4h",
    likes: 267,
  },
  {
    id: 12,
    name: "Ana Oliveira",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    text: "Received via Pix in less than 5 minutes! I was shocked at how fast it was.",
    time: "4h",
    likes: 394,
  },
  {
    id: 13,
    name: "Kevin Park",
    avatar: "https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?w=80&h=80&fit=crop&crop=face",
    text: "I've tried other reward programs before and they were all garbage. This one is actually real and backed by Google.",
    time: "5h",
    likes: 156,
  },
  {
    id: 14,
    name: "Fernanda Lima",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face",
    text: "Already shared with my whole family group chat. Everyone is doing it now. Thank you Google!",
    time: "5h",
    likes: 223,
  },
]

export function StepFinal({ ctaUrl = "#" }: StepFinalProps) {
  const { balance } = useFlow()
  const [countdown, setCountdown] = useState({ minutes: 14, seconds: 0 })
  const [expandedComments, setExpandedComments] = useState<number[]>([])
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5)
  const [comments, setComments] = useState(allComments)

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


  const toggleReplies = (commentId: number) => {
    setExpandedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

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
    <section className="flex flex-col gap-3 bg-white -mx-4 -mt-4 px-4 pt-4 pb-4">
      {/* Header + Important inside card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 mb-1">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-10 w-10 flex-shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-medium text-gray-800">Google</span>
              <span className="text-sm font-medium text-gray-500">Rewards</span>
            </div>
          </div>
          <div className="flex items-center border-2 border-dashed border-green-400 rounded-lg px-3 py-2">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mr-2 leading-tight text-right">Your Current<br/>Balance:</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-green-600 mr-1">US$</span>
              <AnimatedBalance value={balance} className="text-2xl font-bold text-green-600 tabular-nums" />
            </div>
          </div>
        </div>
        <div className="px-5 py-3">
          <p className="text-base text-gray-800 text-center leading-snug font-extrabold">
            {"⚠️"} Important: Watch the full video below to see how to complete your withdrawal.
          </p>
        </div>
      </div>

      {/* Deletion warning */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3 animate-fade-in-up animation-delay-100">
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">{"🚨"}</span>
          <span className="text-base font-bold text-red-600">
            This video will be deleted in {countdown.minutes}:{countdown.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-lg">{"🚨"}</span>
        </div>
        <p className="text-xs text-red-500 text-center mt-1 font-medium">
          Watch it NOW before it{"'"}s permanently removed!
        </p>
      </div>

      {/* Video Player */}
      <div className="relative animate-fade-in-up animation-delay-200 rounded-2xl overflow-hidden bg-black">
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
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 animate-fade-in-up animation-delay-300">
        <Volume2 className="h-4 w-4 text-gray-500" />
        <span>Make sure your sound is on</span>
      </div>



      {/* Comments Section */}
      <div className="mt-1 animate-fade-in-up animation-delay-400">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="h-5 w-5 text-gray-700" />
          <span className="font-semibold text-gray-900">Comments</span>
          <span className="text-sm text-gray-500">2,156</span>
        </div>

        <div className="flex flex-col gap-5">
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
                  <span className="text-sm font-medium text-gray-900">{comment.name}</span>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{comment.text}</p>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${comment.liked ? 'text-[#1a73e8]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <ThumbsUp className={`h-3.5 w-3.5 ${comment.liked ? 'fill-[#1a73e8]' : ''}`} />
                    {comment.likes}
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Reply</button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleReplies(comment.id)}
                      className="text-xs font-medium text-[#1a73e8] hover:text-[#1557b0]"
                    >
                      {expandedComments.includes(comment.id) ? 'Hide' : 'View'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </button>

                    {expandedComments.includes(comment.id) && (
                      <div className="mt-3 flex flex-col gap-3 pl-2 border-l-2 border-gray-100">
                        {comment.replies.map((reply, idx) => (
                          <div key={idx} className="flex gap-2">
                            <img src={reply.avatar} alt="" className="w-6 h-6 rounded-full object-cover flex-shrink-0" loading="lazy" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-900">{reply.name}</span>
                                <span className="text-[10px] text-gray-400">{reply.time}</span>
                              </div>
                              <p className="text-xs text-gray-700 mt-0.5">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleCommentsCount < comments.length && (
          <button
            onClick={loadMoreComments}
            className="w-full text-center text-sm text-[#1a73e8] font-medium py-3 hover:text-[#1557b0] transition-colors"
          >
            See more comments...
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-3 border-t border-gray-100">
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
  )
}
