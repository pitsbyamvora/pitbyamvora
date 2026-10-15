"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Compass,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Quote,
  ExternalLink,
  BookMarked,
  X,
  FileText,
  CheckCircle2,
  Share2,
} from "lucide-react";

export interface RecommendedBook {
  title: string;
  author: string;
  category: string;
  lesson: string;
  summary: string;
  chapters: string[];
  cover: string;
  amazonUrl: string;
  openLibraryUrl?: string;
}

export const RECOMMENDED_BOOKS: RecommendedBook[] = [
  {
    title: "How China Works",
    author: "Julio Aramberri",
    category: "National Growth & Industry",
    lesson: "How discipline, state-directed infrastructure, and massive industrialization lifted 800 million citizens out of poverty in 40 years.",
    summary:
      "A comprehensive, hard-hitting analysis of China's monumental economic turnaround. Aramberri unpacks how long-range strategic state planning, prioritized public infrastructure, technological acquisition, and ruthless productive discipline transformed a poor agrarian state into the global factory floor of the 21st century.",
    chapters: [
      "The Shift from Ideology to Productivity",
      "Special Economic Zones & Foreign Capital Discipline",
      "Infrastructure-Led Acceleration: Rail, Ports & Power",
      "Lessons for Developing Global South Economies",
    ],
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=How+China+Works+Julio+Aramberri+book+read+online",
    openLibraryUrl: "https://openlibrary.org/search?q=How+China+Works+Julio+Aramberri",
  },
  {
    title: "Think Like a Billionaire",
    author: "Donald J. Trump",
    category: "Economic Mindset",
    lesson: "Developing unshakeable resilience, spotting hidden value in local assets, and cultivating the audacity to execute monumental projects.",
    summary:
      "Focuses on developing mental toughness, contrarian thinking, and relentless focus in high-stakes environments. It teaches young entrepreneurs how to negotiate from positions of strength, value tangible productive assets, maintain unwavering conviction during adversity, and turn perceived disadvantages into competitive leverage.",
    chapters: [
      "The Psychology of High-Stakes Vision",
      "Recognizing Undervalued Real Assets",
      "Negotiation Mechanics: Protecting Downside First",
      "Building Brand Equity & Public Trust",
    ],
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=Think+Like+a+Billionaire+book+read+online",
    openLibraryUrl: "https://openlibrary.org/search?q=Think+Like+a+Billionaire",
  },
  {
    title: "From Third World to First",
    author: "Lee Kuan Yew",
    category: "Governance & Discipline",
    lesson: "The Singapore story: how ruthless meritocracy, zero corruption, and a relentless focus on public trust transform a struggling nation.",
    summary:
      "The definitive memoir by Singapore's founding father detailing how a small, resource-poor island nation riddled with ethnic tensions and poverty rose into a high-income global financial and logistics superpower. Emphasizes clean governance, uncompromised rule of law, industrial education, and building a united, forward-marching civic culture.",
    chapters: [
      "Survival Without Natural Resources",
      "Eliminating Graft & Building Institutional Integrity",
      "Global Capital Strategy & World-Class Infrastructure",
      "Fostering National Cohesion & Civic Responsibility",
    ],
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=From+Third+World+to+First+Lee+Kuan+Yew+read+online",
    openLibraryUrl: "https://openlibrary.org/search?q=From+Third+World+to+First+Lee+Kuan+Yew",
  },
  {
    title: "The Wealth of Nations",
    author: "Adam Smith",
    category: "Productive Power",
    lesson: "Real national wealth is not oil in the ground or gold in vaults — it is the organized labor, skills, and productive output of the people.",
    summary:
      "The foundational cornerstone of modern economic thought. Smith demonstrates why nations that rely solely on natural resource extraction stay poor, while nations that master the division of labor, incentivize productive commerce, remove monopolistic barriers, and cultivate human skill experience compounding, generational prosperity.",
    chapters: [
      "The Division of Labor and Quantum Leaps in Productivity",
      "The Illusion of Extractive Resource Wealth",
      "Capital Accumulation and Productive Reinvestment",
      "Free Internal Trade & Local Market Expansion",
    ],
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=The+Wealth+of+Nations+Adam+Smith+read+online+free",
    openLibraryUrl: "https://openlibrary.org/books/OL7168345M/The_wealth_of_nations",
  },
  {
    title: "Why Nations Fail",
    author: "Daron Acemoglu & James A. Robinson",
    category: "Institutions & Power",
    lesson: "Countries succeed or collapse based on institutions: inclusive institutions create broad prosperity, while extractive ones trap citizens in poverty.",
    summary:
      "Drawing on fifteen hundred years of global history, the authors prove that neither geography, culture, nor weather determines a country's destiny. Prosperity is forged when institutions distribute economic and political power broadly, allowing ordinary citizens to innovate, own property securely, and hold leaders accountable.",
    chapters: [
      "The Myth of Geography and Cultural Fate",
      "Extractive vs. Inclusive Economic Frameworks",
      "Critical Historical Junctures and Divergence",
      "Breaking the Mold: Achieving Institutional Inclusion",
    ],
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=Why+Nations+Fail+Acemoglu+Robinson+read+online",
    openLibraryUrl: "https://openlibrary.org/search?q=Why+Nations+Fail+Daron+Acemoglu",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    category: "Personal Character & Leadership",
    lesson: "Private victories precede public victories. Self-mastery, proactive initiative, and empathic listening are the roots of all lasting leadership.",
    summary:
      "A timeless blueprint for character-based leadership. Covey outlines the transition from dependent victimhood to independent self-reliance, and ultimately to interdependent cooperation where teams build monumental solutions that no single individual could achieve alone.",
    chapters: [
      "Be Proactive: Taking Radical Ownership",
      "Begin with the End in Mind: Clear Civic Vision",
      "Put First Things First: Disciplined Priority Execution",
      "Think Win-Win: Cooperative Value Creation",
    ],
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=7+Habits+of+Highly+Effective+People+Stephen+Covey+read+online",
    openLibraryUrl: "https://openlibrary.org/search?q=The+7+Habits+of+Highly+Effective+People",
  },
  {
    title: "Poor Economics",
    author: "Abhijit V. Banerjee & Esther Duflo",
    category: "Practical Grassroots Relief",
    lesson: "Radical rethinking of the ways to fight global poverty through evidence-based, small-scale, highly tested direct interventions.",
    summary:
      "Nobel Prize-winning economists demonstrate why grand ideological programs often fail, while targeted empirical tests—subsidized direct food distribution, preventive healthcare nudges, and local micro-credit—deliver transformative, measurable breakthroughs in everyday lives.",
    chapters: [
      "Rethinking the Economics of Basic Nutrition",
      "Low-Hanging Fruit for Community Health",
      "Empowering Local Micro-Entrepreneurs",
      "Designing Policies Grounded in Real Proof of Work",
    ],
    cover: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=Poor+Economics+Banerjee+Duflo+read+online",
    openLibraryUrl: "https://openlibrary.org/search?q=Poor+Economics+Abhijit+Banerjee",
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    category: "Organizational Endurance",
    lesson: "Great institutions don't happen through flamboyant charisma; they are built by disciplined people, disciplined thought, and disciplined action.",
    summary:
      "An exhaustive five-year empirical research study on how good organizations make the transition to great, enduring institutions. Essential reading for organizers building community cooperatives, enterprise unions, and sustainable civic movements that outlast their founders.",
    chapters: [
      "Level 5 Leadership: Personal Humility & Professional Will",
      "First Who, Then What: Assembling the Right Core Team",
      "Confront the Brutal Facts without Losing Faith",
      "The Flywheel Effect: Relentless Compounding Progress",
    ],
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    amazonUrl: "https://www.google.com/search?q=Good+to+Great+Jim+Collins+read+online",
    openLibraryUrl: "https://openlibrary.org/search?q=Good+to+Great+Jim+Collins",
  },
];

export function LeadershipMindsetSection() {
  const [selectedBook, setSelectedBook] = useState<RecommendedBook | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-card/40 border-b border-border relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#356B45]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-xs font-bold uppercase tracking-widest text-[#E85D04]">
            <Compass className="w-3.5 h-3.5" />
            <span>Youth Leadership & National Mindset</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
            Nations Don’t Grow by Chance. <br className="hidden sm:inline" />
            <span className="text-[#E85D04]">They Grow by Deliberate Minds.</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            The foundation of Power in the Streets is not just community relief — it is intellectual empowerment.
            No nation rises beyond the quality of thinking of its youth. We are building a generation that reads, produces, and builds lasting institutions.
          </p>
        </div>

        {/* 3 Core Pillars: Leadership, Discipline, Execution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-3 hover:border-[#E85D04]/40 transition-all hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg text-foreground">
              Mental Decolonization
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We reject victimhood and dependency. Real leadership begins when youth stop waiting for political handouts and start organizing their own streets, cooperatives, and small businesses.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-3 hover:border-[#E85D04]/40 transition-all hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg text-foreground">
              Production Over Consumption
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              A country grows when it makes what it eats and manufactures what it uses. Every community has soil, youth energy, and local talent waiting for structure and capital.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-3 hover:border-[#E85D04]/40 transition-all hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#356B45]/15 text-[#356B45] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg text-foreground">
              High Standard of Evidence
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Leadership is proof of work, not oratory. We measure costs, track public data, celebrate wins, and openly report shortcomings so systems keep getting sharper.
            </p>
          </div>
        </div>

        {/* Recommended Books Section */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E85D04]">
                <BookOpen className="w-4 h-4" />
                <span>The Leader’s Bookshelf</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                Books That Shift How You See Power &amp; Progress
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm">
              Click any book below to view key takeaways, chapter roadmaps, or access verified online links to read and download.
            </p>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECOMMENDED_BOOKS.map((book) => (
              <div
                key={book.title}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-[#E85D04]/60 hover:shadow-xl transition-all duration-300"
              >
                {/* Book Cover Image with Quick Action triggers */}
                <div
                  onClick={() => setSelectedBook(book)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Category tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/10">
                      {book.category}
                    </span>
                  </div>

                  {/* Title and Author */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-heading font-black text-lg leading-tight drop-shadow-md">
                      {book.title}
                    </h4>
                    <p className="text-xs text-white/80 font-medium mt-0.5">
                      by {book.author}
                    </p>
                  </div>
                </div>

                {/* Core Takeaway Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 bg-card">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E85D04]">
                      Core Insight
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {book.lesson}
                    </p>
                  </div>

                  {/* Functional Action Buttons */}
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBook(book)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E85D04] hover:underline"
                    >
                      <BookMarked className="w-3.5 h-3.5" />
                      <span>Read Overview</span>
                    </button>

                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted px-2.5 py-1 rounded-md border border-border transition-colors"
                      title={`Find ${book.title} online`}
                    >
                      <span>Find Online</span>
                      <ExternalLink className="w-3 h-3 text-[#E85D04]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Callout Banner */}
        <div className="rounded-2xl border border-border bg-gradient-to-br from-[#171A19] to-neutral-900 p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-[#E85D04]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <Quote className="w-8 h-8 text-[#E85D04] opacity-80" />
            <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-black leading-snug">
              “We are not waiting for leaders. We are becoming them. The undermined is unstoppable.”
            </blockquote>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              Equip yourself with knowledge, join a local ward team, and let’s demonstrate that Nigerian youth have both the capacity to lead and the discipline to build an enduring nation.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d44f00] text-white font-bold text-xs transition-all shadow-md"
              >
                <span>Explore Youth &amp; Student Programs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/peoples-voice"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
              >
                <span>Join National Conversation</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ================================================================
          BOOK DETAILS & READING MODAL
      ================================================================ */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 text-foreground shadow-2xl space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-28 sm:w-36 aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-border shadow-md">
                <Image
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-[10px] font-bold uppercase tracking-wider">
                  {selectedBook.category}
                </span>
                <h3 className="font-heading text-2xl font-black text-foreground">
                  {selectedBook.title}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground">
                  Author: <span className="text-foreground">{selectedBook.author}</span>
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {selectedBook.lesson}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2 pt-2 border-t border-border">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#E85D04] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Summary &amp; Application for Nigeria</span>
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedBook.summary}
              </p>
            </div>

            {/* Chapters / Topics Covered */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Key Frameworks Covered:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedBook.chapters.map((chap) => (
                  <div key={chap} className="flex items-start gap-2 p-2 rounded-lg bg-muted/40 border border-border/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E85D04] shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{chap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links Bar */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {selectedBook.openLibraryUrl && (
                  <a
                    href={selectedBook.openLibraryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-muted/50 hover:bg-muted text-xs font-bold text-foreground transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#E85D04]" />
                    <span>Open Library Free Edition</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 text-muted-foreground" />
                  </a>
                )}
                <a
                  href={selectedBook.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d44f00] text-xs font-bold text-white transition-colors shadow-md"
                >
                  <span>Search Book Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBook(null)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
