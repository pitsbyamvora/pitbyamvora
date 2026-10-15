"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gift,
  Coins,
  ArrowRight,
  Copy,
  CheckCircle2,
  AlertCircle,
  Building2,
  Share2,
  Users,
  Wallet,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  fetchMemberWallet,
  submitWithdrawalRequest,
  MemberWalletSummary,
} from "@/lib/db";

export default function RewardsWalletPage() {
  const [phone, setPhone] = useState("");
  const [wallet, setWallet] = useState<MemberWalletSummary | null>(null);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Cashout Form
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankName, setBankName] = useState("Access Bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  const referralLink = phone
    ? `https://amvora.com.ng/membership?ref=${phone}`
    : "https://amvora.com.ng/membership";

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoadingWallet(true);
    setWithdrawSuccess(false);
    setWithdrawError("");
    const res = await fetchMemberWallet(phone);
    setWallet(res);
    setLoadingWallet(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);

    if (amount < 3000) {
      setWithdrawError("Minimum withdrawal limit is ₦3,000 (3,000 points).");
      return;
    }

    if (!accountNumber || !accountName) {
      setWithdrawError("Please enter your Bank Account Number and Account Name.");
      return;
    }

    setWithdrawing(true);
    setWithdrawError("");

    const res = await submitWithdrawalRequest({
      memberPhone: phone,
      memberName: accountName,
      bankName,
      accountNumber,
      accountName,
      nairaAmount: amount,
    });

    setWithdrawing(false);

    if (res.success) {
      setWithdrawSuccess(true);
      setWithdrawAmount("");
      // Refresh wallet
      const updated = await fetchMemberWallet(phone);
      setWallet(updated);
    } else {
      setWithdrawError(res.error || "Failed to submit withdrawal request.");
    }
  };

  return (
    <div className="min-h-screen text-foreground pb-20">
      {/* ── Header ── */}
      <section className="py-14 sm:py-20 border-b border-border/40 bg-card/40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-[#E85D04] text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>Refer &amp; Earn • Citizen Cashout Economy</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            Earn Points for Every Friend <br />
            <span className="text-[#E85D04]">Withdraw Real Cash to Your Bank</span>
          </h1>

          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Invite fellow Nigerians to join the PITS Member Club. Earn <strong>15 points</strong> every time a friend registers.
            When you reach the <strong>3,000 points (₦3,000)</strong> threshold, cash out directly to any Nigerian bank!
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Lookup Phone Box */}
        <div className="max-w-xl mx-auto bg-card border-2 border-border rounded-3xl p-6 shadow-sm space-y-4">
          <div className="space-y-1 text-center">
            <h2 className="text-lg font-black text-foreground">
              Check Your Referral Wallet &amp; Points
            </h2>
            <p className="text-xs text-muted-foreground">
              Enter the phone number you registered with to see your balance and unique referral link.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="tel"
              required
              placeholder="e.g. 08012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={loadingWallet}
              className="px-5 py-2.5 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] font-bold text-xs shadow transition disabled:opacity-50"
            >
              {loadingWallet ? "Checking..." : "View Wallet"}
            </button>
          </form>
        </div>

        {/* Active Wallet Display */}
        {wallet && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Total Referrals
                </span>
                <p className="text-3xl font-black text-foreground">{wallet.totalReferrals}</p>
                <p className="text-[11px] text-[#E85D04] font-semibold">15 pts per verified member</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Available Points
                </span>
                <p className="text-3xl font-black text-[#E85D04]">{wallet.availablePoints}</p>
                <p className="text-[11px] text-muted-foreground">Ready to redeem</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Available Naira Balance
                </span>
                <p className="text-3xl font-black text-emerald-600">₦{wallet.availableBalanceNaira.toLocaleString()}</p>
                <p className="text-[11px] text-emerald-600 font-semibold">1 pt = ₦1 real value</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Total Withdrawn
                </span>
                <p className="text-3xl font-black text-foreground">₦{wallet.withdrawnAmount.toLocaleString()}</p>
                <p className="text-[11px] text-muted-foreground">Paid out to bank</p>
              </div>
            </div>

            {/* Unique Referral Link Bar */}
            <div className="rounded-2xl border border-[#E85D04]/30 bg-[#E85D04]/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-black uppercase tracking-wider text-[#E85D04] flex items-center gap-1.5 justify-center sm:justify-start">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Your Unique Invite Link</span>
                </span>
                <p className="text-sm font-bold text-foreground">
                  Share this link. Friends will have your referral code pre-filled!
                </p>
                <p className="text-xs text-muted-foreground font-mono truncate max-w-md">
                  {referralLink}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="px-6 py-2.5 rounded-xl bg-[#E85D04] text-white hover:bg-[#d44f00] font-bold text-xs shadow transition shrink-0 flex items-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedLink ? "Copied!" : "Copy My Link"}</span>
              </button>
            </div>

            {/* Bank Withdrawal Request Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Rules Card */}
              <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
                <h3 className="font-heading font-black text-xl text-foreground">
                  Withdrawal Guidelines
                </h3>
                <ul className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                    <span><strong>15 points</strong> awarded for each verified member who signs up with your phone.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                    <span><strong>Minimum Cashout:</strong> 3,000 points (₦3,000). You cannot withdraw below 3k.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                    <span><strong>Payout Time:</strong> Admin verifies your payout and transfers directly into your account within 24 hours.</span>
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-muted/50 border border-border text-xs">
                  <p className="font-bold text-foreground">Current Available Balance:</p>
                  <p className="text-xl font-black text-emerald-600 font-mono mt-1">
                    ₦{wallet.availableBalanceNaira.toLocaleString()}
                  </p>
                  {wallet.availableBalanceNaira < 3000 && (
                    <p className="text-[11px] text-amber-600 mt-1">
                      You need ₦{(3000 - wallet.availableBalanceNaira).toLocaleString()} more to reach the ₦3,000 withdrawal limit.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Cashout Form */}
              <div className="lg:col-span-7 rounded-3xl border-2 border-border bg-card p-6 sm:p-8 space-y-5">
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-xl text-foreground">
                    Request Bank Transfer
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Enter your Nigerian bank account to receive your funds.
                  </p>
                </div>

                {withdrawSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs space-y-1">
                    <p className="font-bold">Withdrawal Request Received!</p>
                    <p>Our finance admin has received your request and will initiate transfer to your account shortly.</p>
                  </div>
                )}

                {withdrawError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                <form onSubmit={handleRequestWithdrawal} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Amount to Withdraw (₦) <span className="text-[#E85D04]">* (Min ₦3,000)</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={3000}
                      placeholder="e.g. 3000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        Bank Name
                      </label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                      >
                        <option value="Access Bank">Access Bank</option>
                        <option value="GTBank">GTBank</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="First Bank">First Bank</option>
                        <option value="UBA">UBA</option>
                        <option value="OPay">OPay</option>
                        <option value="Palmpay">Palmpay</option>
                        <option value="Kuda Bank">Kuda Bank</option>
                        <option value="Fidelity Bank">Fidelity Bank</option>
                        <option value="Stanbic IBTC">Stanbic IBTC</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Account Name (Must match your registered name)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chidubem Okafor"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-[#E85D04] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={withdrawing || wallet.availableBalanceNaira < 3000}
                      className="w-full py-3.5 rounded-xl bg-[#E85D04] hover:bg-[#d44f00] text-white font-bold text-xs tracking-wider uppercase transition shadow-md disabled:opacity-40"
                    >
                      {withdrawing ? "Submitting..." : "Submit Bank Cashout Request"}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
