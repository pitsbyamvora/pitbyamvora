"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { INITIAL_ISSUES, CommunityIssue } from "@/content/community";
import { NIGERIAN_STATES } from "@/types/auth";
import { fetchCommunityIssues } from "@/lib/db";
import {
  AlertCircle,
  MapPin,
  ThumbsUp,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function IssuesPage() {
  const [issues, setIssues] = useState<CommunityIssue[]>(INITIAL_ISSUES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [confirmedIds, setConfirmedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchCommunityIssues().then((data) => {
      if (data && data.length > 0) {
        setIssues(data);
      }
    });
  }, []);

  const categories = [
    "All",
    "Infrastructure",
    "Food Affordability",
    "Power & Light",
    "Water & Sanitation",
    "Healthcare",
    "Security",
  ];

  const handleConfirm = (id: string) => {
    if (confirmedIds[id]) return;

    setConfirmedIds((prev) => ({ ...prev, [id]: true }));
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, confirmations: item.confirmations + 1 } : item
      )
    );
  };

  const filteredIssues = issues.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.trackingId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState = selectedState === "All" || item.state === selectedState;
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesState && matchesCategory;
  });

  const getStatusBadge = (status: CommunityIssue["status"]) => {
    switch (status) {
      case "Field Verified":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "In Progress":
        return "bg-[#ff5500]/10 text-[#ff5500] border-[#ff5500]/30";
      case "Resolved":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner with Civic Header */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff5500]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
                <AlertCircle className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>PITS Grassroots Surveillance</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Community Issues Hub
              </h1>
              <p className="font-body text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-normal">
                Verifying local infrastructure decay, food price gouging, and public service abandonment across all 36 Nigerian states. Documented by citizens, verified by foot soldiers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/report"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Report an Issue in Your Ward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Filter Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Search & State Filter Bar */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <input
                type="text"
                placeholder="Search by community name, challenge, or tracking ID (e.g. Ojodu, rice, PITS-ISS-9041)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 sm:top-3.5" />
            </div>

            {/* State Filter */}
            <div className="md:col-span-4 relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              >
                <option value="All">All States in Nigeria (36 + FCT)</option>
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-[#ff5500] absolute left-3.5 top-3 sm:top-3.5" />
            </div>
          </div>

          {/* Category Pills (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 mr-1 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#ff5500] text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
          <span>
            Showing <strong className="text-foreground">{filteredIssues.length}</strong> community reports
          </span>
          {selectedState !== "All" && (
            <span className="text-[#ff5500] font-semibold">
              Filtered for {selectedState} State
            </span>
          )}
        </div>

        {/* Grid of Community Issues */}
        {filteredIssues.length === 0 ? (
          <div className="p-12 text-center bg-card rounded-2xl border border-border space-y-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">
              No reports found matching your criteria
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Be the first to report an infrastructure breakdown or commodity price inflation in this category or state.
            </p>
            <Link
              href="/report"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff5500] text-white text-xs font-bold hover:bg-[#e04b00]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Local Report</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm hover:border-[#ff5500]/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Card Header: Tracking ID & Status */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-muted-foreground">
                      {issue.trackingId}
                    </span>
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded-full border text-[10px] uppercase tracking-wider ${getStatusBadge(
                        issue.status
                      )}`}
                    >
                      {issue.status}
                    </span>
                  </div>

                  {/* Photo thumbnail if available */}
                  {issue.imageUrl && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-black/5">
                      <Image
                        src={issue.imageUrl}
                        alt={issue.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-white font-medium">
                        Verified Photo Evidence
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-heading text-base font-bold text-foreground leading-snug group-hover:text-[#ff5500] transition-colors">
                    {issue.title}
                  </h3>

                  {/* Location & Meta */}
                  <div className="flex items-center gap-1.5 text-xs text-[#ff5500] font-semibold">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{issue.location}, {issue.lga} LGA ({issue.state})</span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {issue.description}
                  </p>
                </div>

                {/* Card Footer: Confirmations & Action */}
                <div className="pt-4 mt-5 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>{issue.reportedDate}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConfirm(issue.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      confirmedIds[issue.id]
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                        : "bg-muted text-muted-foreground hover:bg-[#ff5500]/10 hover:text-[#ff5500] border border-transparent"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>
                      {confirmedIds[issue.id] ? "Confirmed" : "Confirm"} ({issue.confirmations})
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
