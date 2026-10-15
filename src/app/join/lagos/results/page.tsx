"use client";

import { useEffect, useState, useCallback } from "react";
import type { ElementType } from "react";
import Link from "next/link";
import { TrendingUp, Users, MapPin, Trophy, ArrowLeft, RefreshCw } from "lucide-react";
import { LAGOS_LGAS } from "@/lib/lga";
import {
  fetchLGACounts,
  fetchLGAGrowth,
  fetchTotalLGARegistrations,
  type LGACount,
  type LGAGrowthPoint,
} from "@/lib/db";

export default function LGAResultsPage() {
  const [counts, setCounts] = useState<LGACount[]>([]);
  const [growth, setGrowth] = useState<LGAGrowthPoint[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshed, setRefreshed] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [c, g, t] = await Promise.all([
      fetchLGACounts(),
      fetchLGAGrowth(),
      fetchTotalLGARegistrations(),
    ]);
    setCounts(c);
    setGrowth(g);
    setTotal(t);
    setRefreshed(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Build full LGA list merging counts (zeros for unregistered)
  const allLGAs = LAGOS_LGAS.map((lga) => ({
    ...lga,
    count: counts.find((c) => c.lga === lga.name)?.count ?? 0,
  })).sort((a, b) => b.count - a.count);

  const maxCount = allLGAs[0]?.count || 1;
  const topLGA = allLGAs[0];
  const activeCount = allLGAs.filter((l) => l.count > 0).length;

  // Growth chart helpers
  const maxGrowth = Math.max(...growth.map((g) => g.count), 1);
  const todayTotal = growth.reduce((sum, g) => sum + g.count, 0);

  return (
    <div className="flex flex-col w-full text-foreground">

      {/* ── Header ── */}
      <section className="py-12 sm:py-16 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#lagos-registration"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition mb-5"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Lagos LGA List
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border border-border text-xs font-bold tracking-wider text-[#E85D04] uppercase">
                <TrendingUp className="h-3 w-3" aria-hidden="true" />
                Live Registration Results
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                Lagos LGA <br className="hidden sm:block" />
                <span className="text-[#E85D04]">Growth Board</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                Real-time member registrations across all 20 Lagos Local Government Areas.
              </p>
            </div>

            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-2 self-start sm:self-auto rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
          </div>

          {refreshed && (
            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: {refreshed.toLocaleTimeString("en-NG")}
            </p>
          )}
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <section className="py-8 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              value={loading ? "—" : total.toLocaleString()}
              label="Total Members"
            />
            <StatCard
              icon={MapPin}
              value={loading ? "—" : activeCount.toString()}
              label="Active LGAs"
            />
            <StatCard
              icon={Trophy}
              value={loading ? "—" : (topLGA?.name ?? "—")}
              label="Leading LGA"
              small
            />
            <StatCard
              icon={TrendingUp}
              value={loading ? "—" : todayTotal.toLocaleString()}
              label="Last 30 Days"
            />
          </div>
        </div>
      </section>

      {/* ── Growth Chart ── */}
      <section className="py-10 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-5">
            Registration Growth — Last 14 Days
          </h2>

          {loading ? (
            <div className="h-32 rounded-xl bg-muted/30 animate-pulse" />
          ) : growth.length === 0 ? (
            <p className="text-sm text-muted-foreground">No growth data yet.</p>
          ) : (
            <div className="flex items-end gap-1 sm:gap-2 h-32 rounded-xl bg-muted/20 border border-border p-4">
              {growth.map((point) => {
                const pct = (point.count / maxGrowth) * 100;
                const dateLabel = new Date(point.date + "T00:00:00").toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                });
                return (
                  <div
                    key={point.date}
                    className="group relative flex flex-1 flex-col items-center justify-end"
                  >
                    <div
                      className="w-full rounded-t-md bg-[#E85D04]/70 hover:bg-[#E85D04] transition-colors"
                      style={{ height: `${Math.max(pct, 4)}%` }}
                      title={`${dateLabel}: ${point.count} registrations`}
                    />
                    {/* tooltip */}
                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#171A19] px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {point.count}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {!loading && growth.length > 0 && (
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground px-4">
              <span>{new Date(growth[0].date + "T00:00:00").toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
              <span>{new Date(growth[growth.length - 1].date + "T00:00:00").toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
            </div>
          )}
        </div>
      </section>

      {/* ── LGA Leaderboard ── */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-5">
            LGA Leaderboard — All 20 LGAs
          </h2>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-muted/30 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {allLGAs.map((lga, index) => {
                const barPct = (lga.count / maxCount) * 100;
                const medal =
                  index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;
                return (
                  <div
                    key={lga.slug}
                    className="relative rounded-xl border border-border bg-card/60 overflow-hidden"
                  >
                    {/* background bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-[#E85D04]/8 transition-all duration-700"
                      style={{ width: `${barPct}%` }}
                    />
                    <div className="relative flex items-center gap-4 px-4 py-3">
                      {/* rank */}
                      <span className="w-7 text-center text-sm font-black text-muted-foreground shrink-0">
                        {medal ?? `#${index + 1}`}
                      </span>
                      {/* name */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-foreground truncate">{lga.name}</p>
                        <p className="text-[10px] text-muted-foreground">{lga.region}</p>
                      </div>
                      {/* count */}
                      <div className="text-right shrink-0">
                        <p className="text-lg font-black text-[#E85D04]">{lga.count.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">members</p>
                      </div>
                      {/* register CTA */}
                      <Link
                        href={`/join/lagos/${lga.slug}`}
                        className="shrink-0 rounded-lg border border-[#E85D04]/40 px-3 py-1.5 text-[10px] font-bold text-[#E85D04] hover:bg-[#E85D04] hover:text-white transition"
                      >
                        Join
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-border/40 bg-[#171A19] py-12 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-2">Is your LGA represented?</h2>
          <p className="text-slate-400 text-sm mb-6">
            Every registered member counts. Help build the numbers in your area.
          </p>
          <Link
            href="/#lagos-registration"
            className="inline-flex items-center gap-2 rounded-lg bg-[#E85D04] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d44f00] transition"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Register in my LGA
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  small = false,
}: {
  icon: ElementType;
  value: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-4 shadow-sm">
      <Icon className="h-4 w-4 text-[#E85D04] mb-2" aria-hidden="true" />
      <p className={`font-black text-foreground ${small ? "text-base leading-tight" : "text-2xl"}`}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
