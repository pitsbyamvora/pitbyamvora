"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { NIGERIAN_STATES } from "@/types/auth";
import { fetchVoicePosts, publishVoicePost, addVoiceComment } from "@/lib/db";
import {
  Mic,
  Heart,
  MessageCircle,
  Share2,
  Send,
  Sparkles,
  Filter,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Shield,
  Lightbulb,
  AlertCircle,
  Flame,
  User,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

interface VoicePost {
  id: string;
  author: string;
  state: string;
  role: string;
  avatar?: string;
  category: "Idea" | "Story" | "Issue" | "Solution" | "Campaign";
  content: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  hasLiked?: boolean;
}

const INITIAL_POSTS: VoicePost[] = [
  {
    id: "post-1",
    author: "Dabiraoluwa Honey.A",
    state: "Lagos",
    role: "National Coordinator",
    category: "Campaign",
    content:
      "We are not here to talk about what could happen in 2027. We are proving what is possible right now with The Rice Test and community food hubs. If you have an idea for a direct farmer-to-consumer route in your ward, write it below.",
    createdAt: "2 hours ago",
    likes: 142,
    hasLiked: false,
    comments: [
      {
        id: "c-1",
        author: "Chinedu Okafor",
        content: "We can connect the yam farmers in Benue directly with Ojodu bus station hub in Lagos.",
        createdAt: "1 hour ago",
      },
      {
        id: "c-2",
        author: "Amina Bello",
        content: "Argungu rice paddy collection has already shown what happens when middlemen are bypassed. Proud of this movement!",
        createdAt: "35 mins ago",
      },
    ],
  },
  {
    id: "post-2",
    author: "Dr. Kemi Adeyemi",
    state: "Oyo",
    role: "Health Volunteer",
    category: "Solution",
    content:
      "Recommendation: Let every ward set up a community medical emergency kitty. When a neighbor needs urgent antivenom or malaria drips at night, we shouldn't wait for state bureaucracy. We can fund it collectively through our cooperative hubs.",
    createdAt: "4 hours ago",
    likes: 89,
    hasLiked: false,
    comments: [
      {
        id: "c-3",
        author: "Tunde Bakare",
        content: "Fully support this! We started something similar in Bodija and it has saved 3 families already.",
        createdAt: "2 hours ago",
      },
    ],
  },
  {
    id: "post-3",
    author: "Ibrahim Mohammed",
    state: "Kaduna",
    role: "Youth Vanguard",
    category: "Story",
    content:
      "Yesterday at Zaria market, grain cartels tried to intimidate local women buying subsidized cooperative bags. Our youth monitors stood peacefully with them and made sure every mother left with her grain at farm-gate cost. Power is truly in the street.",
    createdAt: "6 hours ago",
    likes: 215,
    hasLiked: false,
    comments: [
      {
        id: "c-4",
        author: "Fatima Garba",
        content: "Proud of Kaduna chapter! Peace, solidarity, and zero exploitation.",
        createdAt: "4 hours ago",
      },
    ],
  },
  {
    id: "post-4",
    author: "Blessing Nwachukwu",
    state: "Enugu",
    role: "Citizen Member",
    category: "Idea",
    content:
      "Can we introduce student data pooling for public university students preparing for semester exams? High data costs are blocking hundreds of smart students from accessing online academic journals.",
    createdAt: "9 hours ago",
    likes: 64,
    hasLiked: false,
    comments: [],
  },
];


export default function PeoplesVoicePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<VoicePost[]>(INITIAL_POSTS);
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<VoicePost["category"]>("Idea");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    fetchVoicePosts().then((dbPosts) => {
      if (dbPosts && dbPosts.length > 0) {
        setPosts((prev) => {
          // Combine db posts with initial default items
          const existingIds = new Set(dbPosts.map((p) => p.id));
          const uniqueDefaults = prev.filter((p) => !existingIds.has(p.id));
          return [...dbPosts, ...uniqueDefaults];
        });
      }
    });
  }, []);

  const categories: Array<VoicePost["category"]> = [
    "Idea",
    "Story",
    "Issue",
    "Solution",
    "Campaign",
  ];

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const authorName = user?.fullName || "Anonymous Citizen";
    const authorState = user?.stateOfResidence || "Lagos";
    const authorRole = user?.role === "coordinator" ? "Ward Coordinator" : "Citizen Voice";

    const newPost: VoicePost = {
      id: `post-${Date.now()}`,
      author: authorName,
      state: authorState,
      role: authorRole,
      category: newCategory,
      content: newContent.trim(),
      createdAt: "Just now",
      likes: 1,
      hasLiked: true,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewContent("");

    // Persist to Supabase if configured
    try {
      await publishVoicePost({
        authorName,
        authorState,
        authorRole,
        category: newCategory,
        content: newContent.trim(),
        userId: user?.id,
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const currentlyLiked = p.hasLiked;
          return {
            ...p,
            likes: currentlyLiked ? p.likes - 1 : p.likes + 1,
            hasLiked: !currentlyLiked,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: user?.fullName || "Fellow Citizen",
      content: commentInput.trim(),
      createdAt: "Just now",
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    setCommentInput("");
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesState =
      selectedState === "All" || p.state === selectedState;
    return matchesCategory && matchesState;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pb-24">
      {/* 1. Header Banner */}
      <section className="py-14 sm:py-16 border-b border-border/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 text-[#E85D04] text-xs font-bold uppercase tracking-wider border border-border">
            <Mic className="w-3.5 h-3.5 text-[#E85D04]" />
            <span>PEOPLE&apos;S VOICE • THE NATIONAL CONVERSATION</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            The National Conversation.
          </h1>

          <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Post ideas, share stories, discuss issues, recommend solutions, and support campaigns. A verified grassroots forum where every Nigerian has an equal microphone.
          </p>
        </div>
      </section>

      {/* 2. Main Content Feed */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Post Creation Box */}
        <div className="bg-card/85 backdrop-blur-md border border-border rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/25 flex items-center justify-center text-[#E85D04]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-sm sm:text-base text-foreground">
                What&apos;s on your mind, {user ? user.fullName.split(" ")[0] : "Citizen"}?
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Share what&apos;s happening in your ward or propose a collective solution.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-4">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write your story, proposal, community issue, or idea for the nation..."
              rows={3}
              className="w-full bg-background border border-border rounded-2xl p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#E85D04]/50 resize-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase mr-1">
                  Tag:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                      newCategory === cat
                        ? "bg-[#E85D04] text-white"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!newContent.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#E85D04] hover:bg-[#D04D00] disabled:opacity-50 text-white font-bold text-xs shadow-sm transition"
              >
                <span>Publish Voice</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-bold text-muted-foreground">Filter by Category:</span>
            <div className="flex flex-wrap gap-1">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                    selectedCategory === c
                      ? "bg-[#E85D04] text-white"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#E85D04]" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-card border border-border rounded-lg px-2.5 py-1 text-xs text-foreground focus:outline-none"
            >
              <option value="All">All States (Nationwide)</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card/85 backdrop-blur-md border border-border/80 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4 hover:border-border transition"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E85D04] to-amber-700 text-white font-black text-xs flex items-center justify-center uppercase">
                    {post.author.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-black text-sm text-foreground">
                        {post.author}
                      </h4>
                      <span className="text-[10px] font-mono text-[#E85D04] bg-[#E85D04]/10 px-2 py-0.5 rounded-full font-bold">
                        {post.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E85D04]" />
                        {post.state} State
                      </span>
                      <span>•</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted border border-border text-foreground">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <p className="font-body text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Action Buttons: Like, Comment */}
              <div className="flex items-center gap-6 pt-3 border-t border-border/40 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => handleToggleLike(post.id)}
                  className={`inline-flex items-center gap-1.5 font-bold transition ${
                    post.hasLiked ? "text-red-500" : "hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      post.hasLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span>{post.likes}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveCommentPostId(
                      activeCommentPostId === post.id ? null : post.id
                    )
                  }
                  className="inline-flex items-center gap-1.5 font-bold hover:text-[#E85D04] transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments.length} Comments</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                  className="inline-flex items-center gap-1.5 font-bold hover:text-foreground transition ml-auto"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              {activeCommentPostId === post.id && (
                <div className="pt-4 border-t border-border/40 space-y-3.5">
                  {/* Comments list */}
                  {post.comments.length > 0 ? (
                    <div className="space-y-2.5">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-muted/40 rounded-2xl p-3 sm:p-3.5 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-bold text-foreground">
                            <span>{comment.author}</span>
                            <span className="text-[10px] text-muted-foreground font-normal">
                              {comment.createdAt}
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}

                  {/* Add Comment Input */}
                  <form
                    onSubmit={(e) => handleAddComment(post.id, e)}
                    className="flex items-center gap-2 pt-1"
                  >
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Write a constructive comment or recommendation..."
                      className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#E85D04]/50"
                    />
                    <button
                      type="submit"
                      disabled={!commentInput.trim()}
                      className="p-2 rounded-full bg-[#E85D04] text-white hover:bg-[#D04D00] disabled:opacity-50 transition"
                      aria-label="Submit comment"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
