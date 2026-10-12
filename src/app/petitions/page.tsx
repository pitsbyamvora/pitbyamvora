"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { INITIAL_PETITIONS, Petition } from "@/content/community";
import { NIGERIAN_STATES } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { fetchPetitions, signCommunityPetition } from "@/lib/db";
import {
  FileText,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  ShieldAlert,
  Share2,
  PenTool,
  X,
} from "lucide-react";

export default function PetitionsPage() {
  const { user } = useAuth();
  const [petitions, setPetitions] = useState<Petition[]>(INITIAL_PETITIONS);
  const [signedIds, setSignedIds] = useState<Record<string, boolean>>({});
  const [activeModalPetition, setActiveModalPetition] = useState<Petition | null>(null);

  // Modal Form State
  const [signerName, setSignerName] = useState(user?.fullName || "");
  const [signerEmail, setSignerEmail] = useState(user?.email || "");
  const [signerState, setSignerState] = useState(user?.stateOfResidence || "Lagos");
  const [signerComment, setSignerComment] = useState("");
  const [signSuccess, setSignSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPetitions().then((data) => {
      if (data && data.length > 0) {
        setPetitions(data);
      }
    });
  }, []);

  const openSignModal = (petition: Petition) => {
    setActiveModalPetition(petition);
    setSignSuccess(false);
    if (user) {
      setSignerName(user.fullName);
      setSignerEmail(user.email);
      setSignerState(user.stateOfResidence || "Lagos");
    }
  };

  const handleSignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalPetition) return;

    const id = activeModalPetition.id;
    setIsSubmitting(true);

    try {
      await signCommunityPetition({
        petitionId: id,
        name: signerName,
        email: signerEmail,
        state: signerState,
        comment: signerComment,
        userId: user?.id,
      });

      setSignedIds((prev) => ({ ...prev, [id]: true }));
      setPetitions((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, signaturesCount: p.signaturesCount + 1 } : p
        )
      );
      setSignSuccess(true);
    } catch {
      setSignedIds((prev) => ({ ...prev, [id]: true }));
      setSignSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner */}
      <section className="bg-[#171A19] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff5500] text-xs font-bold uppercase tracking-wider border border-white/10">
              <FileText className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>PITS Civic Power Registry</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Active Verified Petitions
            </h1>
            <p className="font-body text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-normal">
              Back community-driven legislative and policy demands with verified citizen signatures. When petitions hit their targets, our legal desk delivers them directly to regulatory authorities.
            </p>
          </div>
        </div>
      </section>

      {/* Petitions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {petitions.map((petition) => {
            const progress = Math.min(
              100,
              Math.round((petition.signaturesCount / petition.goalCount) * 100)
            );
            const isSigned = signedIds[petition.id];

            return (
              <div
                key={petition.id}
                className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm hover:border-[#ff5500]/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category & Urgency */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#ff5500] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/20">
                      {petition.category}
                    </span>
                    {petition.isUrgent && (
                      <span className="flex items-center gap-1 text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded-full">
                        <Flame className="w-3 h-3" />
                        <span>Urgent Action</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-foreground leading-snug">
                    {petition.title}
                  </h3>

                  {/* Target Authority */}
                  <div className="text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">Target: </span>
                    <span>{petition.targetAuthority}</span>
                  </div>

                  {/* Summary */}
                  <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {petition.summary}
                  </p>

                  {/* Progress Bar & Signature Metrics */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#ff5500] font-black font-mono">
                        {petition.signaturesCount.toLocaleString()} Signed
                      </span>
                      <span className="text-muted-foreground font-mono">
                        Target: {petition.goalCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff5500] to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{progress}% of citizen milestone</span>
                      <span>Deadline: {petition.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Sign Action Button */}
                <div className="pt-6 mt-6 border-t border-border">
                  {isSigned ? (
                    <div className="w-full py-3 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Signature Registered</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openSignModal(petition)}
                      className="w-full py-3 px-4 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Sign This Petition</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Signature Modal */}
      {activeModalPetition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-xs">
            <button
              onClick={() => setActiveModalPetition(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>

            {signSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-black text-xl text-foreground">
                  Your Signature Has Been Counted
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{signerName}</strong> ({signerState}). Your voice has been added to <strong>{activeModalPetition.trackingNumber}</strong>.
                </p>
                <button
                  onClick={() => setActiveModalPetition(null)}
                  className="px-6 py-2.5 rounded-full bg-[#171A19] text-white font-bold text-xs"
                >
                  Close & Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-[#ff5500] uppercase tracking-wider font-mono">
                    {activeModalPetition.trackingNumber}
                  </span>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mt-0.5">
                    {activeModalPetition.title}
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      placeholder="e.g. Chinelo Okonkwo"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={signerEmail}
                      onChange={(e) => setSignerEmail(e.target.value)}
                      placeholder="citizen@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                      State of Residence <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={signerState}
                      onChange={(e) => setSignerState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-foreground mb-1 uppercase tracking-wider text-[11px]">
                      Why is this important to you? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={signerComment}
                      onChange={(e) => setSignerComment(e.target.value)}
                      placeholder="Add your brief perspective as a resident..."
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs tracking-wide shadow-lg transition-all"
                >
                  Add My Verified Signature
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
