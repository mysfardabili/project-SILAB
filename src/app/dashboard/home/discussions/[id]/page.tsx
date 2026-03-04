"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, ThumbsUp, Reply, Send, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { use } from "react";

interface HomeDiscussionDetailPageProps {
  params: Promise<{ id: string }>;
}

const discussionData: Record<string, {
  id: string;
  title: string;
  body: string;
  author: { name: string; avatar: string; role: string };
  createdAt: string;
  tags: string[];
  likes: number;
  replies: {
    id: string;
    author: { name: string; avatar: string; role: string };
    body: string;
    createdAt: string;
    likes: number;
  }[];
}> = {
  "1": {
    id: "1",
    title: "How to handle authentication in Next.js 15 App Router?",
    body: "I'm building a web application with Next.js 15 and I need to implement user authentication. I've seen various approaches like using NextAuth.js, Clerk, or custom JWT-based solutions. \n\nMy specific requirements are:\n1. Cookie-based session management\n2. Protection of server-side routes via middleware\n3. Social login (Google/GitHub) support\n\nWhat would you recommend for a production-ready solution? Has anyone implemented this recently and can share their experience?",
    author: { name: "Alex Morgan", avatar: "/avatars/instructor-1.png", role: "Student" },
    createdAt: "2 hours ago",
    tags: ["Next.js", "Auth", "Security"],
    likes: 8,
    replies: [
      {
        id: "r1",
        author: { name: "Sarah Chen", avatar: "/avatars/instructor-2.png", role: "Teaching Assistant" },
        body: "For production apps with Next.js 15, I'd strongly recommend **NextAuth.js (Auth.js)**. It handles OAuth providers out of the box, manages sessions securely, and has first-class middleware support for route protection. For cookie-based sessions, set `session: { strategy: 'jwt' }` in your config.\n\nHere's a quick middleware example to protect your routes:\n```ts\nexport { auth as middleware } from '@/auth'\nexport const config = { matcher: ['/dashboard/:path*'] }\n```",
        createdAt: "1 hour ago",
        likes: 12,
      },
      {
        id: "r2",
        author: { name: "John Doe", avatar: "", role: "Student" },
        body: "I recently used **Clerk** for a project and the DX is fantastic — pre-built UI components, webhooks, and zero backend config. The downside is it's a paid service after the free tier. If you're okay with that, it's the fastest way to get auth working.",
        createdAt: "45 minutes ago",
        likes: 5,
      },
      {
        id: "r3",
        author: { name: "Alex Morgan", avatar: "/avatars/instructor-1.png", role: "Student" },
        body: "Thanks both! @Sarah Chen — the Auth.js middleware approach looks clean. I'll go with that. Does it work well with Prisma as the session adapter?",
        createdAt: "30 minutes ago",
        likes: 2,
      },
    ],
  },
  "2": {
    id: "2",
    title: "Understanding Server Actions vs API Routes",
    body: "I'm confused about when to use Server Actions versus traditional API Routes in Next.js. Both seem to let you run server-side code, but the syntax and use cases feel different.\n\nCan someone clarify the key differences and give practical guidance on when to use each?",
    author: { name: "Sarah Chen", avatar: "/avatars/instructor-2.png", role: "Student" },
    createdAt: "5 hours ago",
    tags: ["Server Actions", "API", "Next.js"],
    likes: 15,
    replies: [
      {
        id: "r1",
        author: { name: "Alex Morgan", avatar: "/avatars/instructor-1.png", role: "Teaching Assistant" },
        body: "Great question! The key distinction:\n\n- **Server Actions** are best for form submissions and mutations that are tightly coupled to your UI. They can be called directly from Client Components without an explicit `fetch` call.\n\n- **API Routes** are better when you need an actual HTTP endpoint — for example, when integrating with third-party services, webhooks, or building a public API.\n\nFor simple CRUD forms, Server Actions reduce boilerplate significantly. For anything that needs to be publicly accessible as an HTTP endpoint, use API Routes.",
        createdAt: "4 hours ago",
        likes: 18,
      },
    ],
  },
  "3": {
    id: "3",
    title: "Best practices for Tailwind CSS architecture",
    body: "As our project grows, the Tailwind CSS classes are getting unwieldy — long className strings everywhere, lots of repetition. Looking for strategies to keep the codebase maintainable.\n\nI've heard about using @apply directives and component extraction. What's the community's take?",
    author: { name: "John Doe", avatar: "", role: "Student" },
    createdAt: "1 day ago",
    tags: ["Tailwind", "CSS", "Architecture"],
    likes: 6,
    replies: [
      {
        id: "r1",
        author: { name: "Sarah Chen", avatar: "/avatars/instructor-2.png", role: "Teaching Assistant" },
        body: "The Tailwind team actually recommends **component extraction** over `@apply` for reusability. If you're in React, just create a Button component that encapsulates all the Tailwind classes. This keeps the utilities close to the UI logic.\n\nReserve `@apply` only for third-party HTML you can't control (like markdown output or CMS content).",
        createdAt: "22 hours ago",
        likes: 9,
      },
    ],
  },
};

const DEFAULT_DISCUSSION = {
  id: "?",
  title: "Discussion Not Found",
  body: "This discussion could not be found.",
  author: { name: "Unknown", avatar: "", role: "Student" },
  createdAt: "unknown",
  tags: [],
  likes: 0,
  replies: [],
};

export default function HomeDiscussionDetailPage({ params: paramsPromise }: HomeDiscussionDetailPageProps) {
  const params = use(paramsPromise);
  const discussion = discussionData[params.id] || { ...DEFAULT_DISCUSSION, id: params.id, title: `Discussion #${params.id}` };

  const [replyText, setReplyText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleReply = () => {
    if (!replyText.trim()) return;
    setSubmitted(true);
    setReplyText("");
  };

  const handleLike = (id: string, base: number) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] ?? base) + 1 }));
  };

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 md:space-y-8">

      {/* Back */}
      <Link
        href="/dashboard/home/discussions"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Discussions
      </Link>

      {/* Thread Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {discussion.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
              <Tag className="h-3 w-3" /> {tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">{discussion.title}</h1>

        {/* Author Row */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <Avatar className="h-10 w-10">
            <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">
              {discussion.author.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{discussion.author.name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {discussion.createdAt}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {discussion.body}
        </div>

        {/* Like */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => handleLike("main", discussion.likes)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likes["main"] ?? discussion.likes} Helpful</span>
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500 flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" /> {discussion.replies.length} {discussion.replies.length === 1 ? "Reply" : "Replies"}
          </span>
        </div>
      </div>

      {/* Replies */}
      {discussion.replies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-900">Replies ({discussion.replies.length})</h2>
          {discussion.replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                  <AvatarFallback className="bg-gray-100 text-gray-600 text-xs font-semibold">
                    {reply.author.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{reply.author.name}</span>
                    {reply.author.role !== "Student" && (
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">{reply.author.role}</span>
                    )}
                    <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                      <Clock className="h-3 w-3" /> {reply.createdAt}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {reply.body}
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => handleLike(reply.id, reply.likes)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {likes[reply.id] ?? reply.likes} Helpful
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Reply className="h-4 w-4 text-indigo-500" />
          Add a Reply
        </h2>
        {submitted ? (
          <div className="text-center py-6">
            <p className="text-emerald-600 font-medium text-sm">✅ Your reply has been posted!</p>
            <button onClick={() => setSubmitted(false)} className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Post another reply
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="Share your thoughts, answer the question, or ask a follow-up..."
              className="resize-none min-h-[100px] bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Post Reply
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}