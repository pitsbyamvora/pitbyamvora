"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User as UserIcon,
  LogOut,
  ShoppingBag,
  Coins,
  Copy,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Share2,
} from "lucide-react";
import {
  fetchMemberWallet,
  submitWithdrawalRequest,
  MemberWalletSummary,
} from "@/lib/db";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<"account" | "rewards" | "discount">("account");
  const [wallet, setWallet] = useState<MemberWalletSummary | null>(null);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Cashout Form State
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankName, setBankName] = useState("Access Bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  const userPhone = user?.phone || "";
  const referralLink = userPhone
    ? `https://amvora.com.ng/register?ref=${userPhone}`
    : "https://amvora.com.ng/register";

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (userPhone) {
      setLoadingWallet(true);
      fetchMemberWallet(userPhone).then((data) => {
        setWallet(data);
        setLoadingWallet(false);
      });
    }
  }, [userPhone]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);

    if (amount < 3000) {
      setWithdrawError("Minimum withdrawal limit is ₦3,000 (3,000 points).");
      return;
    }

    if (!accountNumber.trim() || !accountName.trim()) {
      setWithdrawError("Please enter your bank account number and account name.");
      return;
    }

    setWithdrawing(true);
    setWithdrawError("");

    const res = await submitWithdrawalRequest({
      memberPhone: userPhone,
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
      if (userPhone) {
        const updated = await fetchMemberWallet(userPhone);
        setWallet(updated);
      }
    } else {
      setWithdrawError(res.error || "Failed to submit withdrawal request.");
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#E85D04] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold text-xl">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">{user.fullName}</h1>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  {user.phone || user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition w-fit"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-8 border-b border-neutral-200 pb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab("account")}
              className={`px-4 py-2.5 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "account"
                  ? "border-[#E85D04] text-[#E85D04]"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Overview &amp; Profile
            </button>
            <button
              onClick={() => setActiveTab("rewards")}
              className={`px-4 py-2.5 text-xs font-bold transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "rewards"
                  ? "border-[#E85D04] text-[#E85D04]"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Refer &amp; Earn (Wallet)</span>
            </button>
            <button
              onClick={() => setActiveTab("discount")}
              className={`px-4 py-2.5 text-xs font-bold transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "discount"
                  ? "border-[#E85D04] text-[#E85D04]"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>50% Discount Pass (₦3,200)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: ACCOUNT OVERVIEW */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-medium block">Account Type</span>
                <p className="text-base font-bold text-neutral-900 mt-1">Free Shopper</p>
                <Link
                  href="/membership"
                  className="text-xs text-[#E85D04] font-semibold hover:underline mt-2 inline-block"
                >
                  Upgrade to 50% discount member →
                </Link>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-medium block">Referral Points</span>
                <p className="text-2xl font-black text-[#E85D04] mt-1">
                  {wallet?.availablePoints || 0} pts
                </p>
                <button
                  onClick={() => setActiveTab("rewards")}
                  className="text-xs text-neutral-500 hover:text-neutral-900 mt-2 block"
                >
                  View rewards wallet →
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-medium block">Withdrawable Naira</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">
                  ₦{(wallet?.availableBalanceNaira || 0).toLocaleString()}
                </p>
                <span className="text-[11px] text-neutral-400">Min limit: ₦3,000</span>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Ready to buy food or groceries?</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Browse products directly from vetted local millers and farmers.
                </p>
              </div>
              <Link
                href="/marketplace"
                className="px-5 py-2.5 rounded-lg bg-[#E85D04] text-white text-xs font-semibold hover:bg-[#d14e00] transition flex items-center gap-1.5 shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Open Marketplace</span>
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: REFER & EARN (WALLET & CASHOUT) */}
        {activeTab === "rewards" && (
          <div className="space-y-6">
            {/* Wallet Stat Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-medium block">Friends Invited</span>
                <p className="text-2xl font-black text-neutral-900 mt-1">{wallet?.totalReferrals || 0}</p>
                <p className="text-[11px] text-neutral-400">15 pts per friend</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-medium block">Available Points</span>
                <p className="text-2xl font-black text-[#E85D04] mt-1">{wallet?.availablePoints || 0}</p>
                <p className="text-[11px] text-neutral-400">Ready to cash out</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-medium block">Naira Equivalent</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">
                  ₦{(wallet?.availableBalanceNaira || 0).toLocaleString()}
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold">1 pt = ₦1</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-medium block">Total Paid Out</span>
                <p className="text-2xl font-black text-neutral-900 mt-1">
                  ₦{(wallet?.withdrawnAmount || 0).toLocaleString()}
                </p>
                <p className="text-[11px] text-neutral-400">Sent to bank</p>
              </div>
            </div>

            {/* Unique Invite Link Bar */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E85D04]">
                <Share2 className="w-4 h-4" />
                <span>Your Personal Referral Link</span>
              </div>
              <p className="text-xs text-neutral-600">
                Send this link to family and friends. When they register with your link, you get <strong>15 points</strong>.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2 text-xs text-neutral-800 font-mono"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-lg bg-[#E85D04] text-white text-xs font-semibold hover:bg-[#d14e00] transition flex items-center gap-1.5 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Bank Cashout Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 text-xs text-neutral-600">
                <h4 className="font-bold text-neutral-900 text-sm">How Cashout Works</h4>
                <p>1. Earn 15 points whenever someone you referred signs up.</p>
                <p>2. Once your points reach <strong>3,000 points (₦3,000)</strong>, enter your Nigerian bank details.</p>
                <p>3. Admin reviews and transfers directly to your bank account within 24 hours.</p>

                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 font-medium">
                  Current balance: <strong>₦{(wallet?.availableBalanceNaira || 0).toLocaleString()}</strong>
                  {(wallet?.availableBalanceNaira || 0) < 3000 && (
                    <span className="block text-[11px] text-neutral-500 mt-1">
                      You need ₦{(3000 - (wallet?.availableBalanceNaira || 0)).toLocaleString()} more to reach the ₦3,000 limit.
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <h4 className="font-bold text-neutral-900 text-sm">Request Bank Transfer</h4>

                {withdrawSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
                    Your withdrawal request has been received. Admin will process the transfer to your account.
                  </div>
                )}

                {withdrawError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                <form onSubmit={handleWithdrawal} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Amount (₦) — Min ₦3,000
                    </label>
                    <input
                      type="number"
                      required
                      min={3000}
                      placeholder="e.g. 3000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Bank
                      </label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                      >
                        <option value="Access Bank">Access Bank</option>
                        <option value="GTBank">GTBank</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="First Bank">First Bank</option>
                        <option value="UBA">UBA</option>
                        <option value="OPay">OPay</option>
                        <option value="Palmpay">Palmpay</option>
                        <option value="Kuda Bank">Kuda Bank</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        10-Digit Account Number
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="0123456789"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Account Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Account holder name"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={withdrawing || (wallet?.availableBalanceNaira || 0) < 3000}
                    className="w-full py-2.5 rounded-lg bg-[#E85D04] text-white text-xs font-bold hover:bg-[#d14e00] transition disabled:opacity-40"
                  >
                    {withdrawing ? "Submitting..." : "Submit Cashout Request"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 50% DISCOUNT UPGRADE PROMPT */}
        {activeTab === "discount" && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-5 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">
                Unlock 50% Member Discount
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Pay a one-time <strong>₦3,200</strong> fee to Amvora Light Foundation to get your lifetime promo code tied to your phone number.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Bank:</span>
                <span className="font-bold text-neutral-900">Access Bank PLC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Account Name:</span>
                <span className="font-bold text-neutral-900">AMVORA LIGHT FOUNDATION</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Account Number:</span>
                <span className="font-mono font-bold text-[#E85D04]">1849204812</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 font-bold">
                <span>Registration Fee:</span>
                <span className="text-emerald-600">₦3,200</span>
              </div>
            </div>

            <Link
              href="/membership"
              className="w-full py-3 rounded-lg bg-[#E85D04] text-white text-xs font-bold hover:bg-[#d14e00] transition flex items-center justify-center gap-1.5"
            >
              <span>Submit Payment Proof &amp; Activate Code</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
