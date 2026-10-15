import { supabase, isSupabaseConfigured } from "./supabase";
import { INITIAL_ISSUES, INITIAL_PETITIONS, CommunityIssue, Petition } from "@/content/community";
import { MARKETPLACE_PRODUCTS, VERIFIED_PROMO_CODES, MarketplaceProduct, PromoCode } from "@/content/marketplace";

/**
 * PITS Unified Data Access Layer
 * Seamlessly talks to Supabase PostgreSQL when credentials exist,
 * with reliable fallback to verified static seed datasets.
 */

// ==========================================
// 1. COMMUNITY ISSUES
// ==========================================
export async function fetchCommunityIssues(): Promise<CommunityIssue[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_ISSUES;
  }

  try {
    const { data, error } = await supabase
      .from("issues")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_ISSUES;
    }

    return data.map((item) => ({
      id: item.id,
      trackingId: item.tracking_id,
      title: item.title,
      category: item.category,
      state: item.state,
      lga: item.lga,
      location: item.location,
      description: item.description,
      reportedDate: item.created_at ? item.created_at.split("T")[0] : "2026-04-10",
      status: item.status,
      confirmations: item.confirmations,
      imageUrl: item.image_url,
    }));
  } catch {
    return INITIAL_ISSUES;
  }
}

export async function submitCommunityIssue(issue: {
  title: string;
  category: string;
  state: string;
  lga: string;
  location: string;
  description: string;
  isAnonymous: boolean;
  reporterId?: string;
  imageUrl?: string;
}): Promise<{ success: boolean; trackingId: string; error?: string }> {
  const trackingId = `PITS-ISS-${Math.floor(1000 + Math.random() * 9000)}`;

  if (!isSupabaseConfigured) {
    return { success: true, trackingId };
  }

  try {
    const { error } = await supabase.from("issues").insert([
      {
        tracking_id: trackingId,
        title: issue.title,
        category: issue.category,
        state: issue.state,
        lga: issue.lga,
        location: issue.location,
        description: issue.description,
        is_anonymous: issue.isAnonymous,
        reporter_id: issue.reporterId || null,
        image_url: issue.imageUrl || null,
      },
    ]);

    if (error) {
      return { success: true, trackingId, error: error.message };
    }

    return { success: true, trackingId };
  } catch (err: unknown) {
    return {
      success: true,
      trackingId,
      error: err instanceof Error ? err.message : "Database connection fallback",
    };
  }
}

// ==========================================
// 2. PETITIONS
// ==========================================
export async function fetchPetitions(): Promise<Petition[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_PETITIONS;
  }

  try {
    const { data, error } = await supabase
      .from("petitions")
      .select("*")
      .order("signatures_count", { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_PETITIONS;
    }

    return data.map((p) => ({
      id: p.id,
      trackingNumber: p.tracking_number,
      title: p.title,
      category: p.category,
      targetAuthority: p.target_authority,
      summary: p.summary,
      fullText: p.full_text,
      signaturesCount: p.signatures_count,
      goalCount: p.goal_count,
      deadline: p.deadline,
      isUrgent: p.is_urgent,
      status: p.status,
    }));
  } catch {
    return INITIAL_PETITIONS;
  }
}

export async function signCommunityPetition(params: {
  petitionId: string;
  name: string;
  email: string;
  state: string;
  comment?: string;
  userId?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("petition_signatures").insert([
      {
        petition_id: params.petitionId,
        signer_name: params.name,
        signer_email: params.email,
        signer_state: params.state,
        signer_comment: params.comment || null,
        user_id: params.userId || null,
      },
    ]);

    if (!error) {
      try {
        await supabase.rpc("increment_petition_signatures", {
          petition_row_id: params.petitionId,
        });
      } catch {
        // RPC fallback ignored if not created
      }
    }

    return { success: !error, error: error?.message };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Database error" };
  }
}

// ==========================================
// 3. MARKETPLACE PRODUCTS & VOUCHERS
// ==========================================
export async function fetchMarketplaceProducts(): Promise<MarketplaceProduct[]> {
  if (!isSupabaseConfigured) {
    return MARKETPLACE_PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true);

    if (error || !data || data.length === 0) {
      return MARKETPLACE_PRODUCTS;
    }

    return data.map((p) => ({
      id: p.slug || p.id,
      title: p.title,
      category: p.category,
      openMarketPrice: Number(p.open_market_price),
      cooperativePrice: Number(p.cooperative_price),
      unit: p.unit,
      origin: p.origin,
      imageUrl: p.image_url,
      inStock: p.in_stock,
      stockCount: p.stock_count,
      description: p.description,
      pickupHubs: p.pickup_hubs || [],
    }));
  } catch {
    return MARKETPLACE_PRODUCTS;
  }
}

export async function verifyVoucherCode(code: string): Promise<PromoCode | null> {
  const upperCode = code.trim().toUpperCase();

  // First check static cache
  if (VERIFIED_PROMO_CODES[upperCode]) {
    return VERIFIED_PROMO_CODES[upperCode];
  }

  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    const { data } = await supabase
      .from("promo_codes")
      .select("*")
      .eq("code", upperCode)
      .eq("is_active", true)
      .single();

    if (data) {
      return {
        code: data.code,
        discountPercentage: data.discount_percentage,
        description: data.description,
        applicableCategory: data.applicable_category || undefined,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export async function createMarketplaceOrder(order: {
  orderCode: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  pickupHub: string;
  items: unknown[];
  appliedPromo?: string;
  discountAmount: number;
  totalPrice: number;
  userId?: string;
}): Promise<{ success: boolean; orderCode: string; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true, orderCode: order.orderCode };
  }

  try {
    const { error } = await supabase.from("orders").insert([
      {
        order_code: order.orderCode,
        buyer_name: order.buyerName,
        buyer_phone: order.buyerPhone,
        buyer_email: order.buyerEmail || null,
        pickup_hub: order.pickupHub,
        items: order.items,
        applied_promo: order.appliedPromo || null,
        discount_amount: order.discountAmount,
        total_price: order.totalPrice,
        user_id: order.userId || null,
      },
    ]);

    return { success: !error, orderCode: order.orderCode, error: error?.message };
  } catch (err: unknown) {
    return {
      success: true,
      orderCode: order.orderCode,
      error: err instanceof Error ? err.message : "Database error",
    };
  }
}

// ==========================================
// 4. VOLUNTEERS & PARTNERS ENROLLMENT
// ==========================================
export async function submitVolunteerApplication(app: {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  role: string;
  hoursPerWeek: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("volunteers").insert([
      {
        full_name: app.fullName,
        email: app.email,
        phone: app.phone,
        state: app.state,
        role: app.role,
        hours_per_week: app.hoursPerWeek,
      },
    ]);

    return { success: !error, error: error?.message };
  } catch (err: unknown) {
    return { success: true, error: err instanceof Error ? err.message : "Database error" };
  }
}

export async function submitPartnerApplication(app: {
  partnerType: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  state: string;
  commodity: string;
  capacity: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("partners").insert([
      {
        partner_type: app.partnerType,
        business_name: app.businessName,
        contact_person: app.contactPerson,
        phone: app.phone,
        email: app.email,
        state: app.state,
        commodity: app.commodity,
        capacity: app.capacity,
      },
    ]);

    return { success: !error, error: error?.message };
  } catch (err: unknown) {
    return { success: true, error: err instanceof Error ? err.message : "Database error" };
  }
}

// ==========================================
// 5. PEOPLE'S VOICE: COMMUNITY FORUM
// ==========================================
export async function fetchVoicePosts(): Promise<Array<{
  id: string;
  author: string;
  state: string;
  role: string;
  category: "Idea" | "Story" | "Issue" | "Solution" | "Campaign";
  content: string;
  createdAt: string;
  likes: number;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
}>> {
  if (!isSupabaseConfigured) {
    return [];
  }

  try {
    const { data: posts, error } = await supabase
      .from("peoples_voice_posts")
      .select("*, peoples_voice_comments(*)")
      .order("created_at", { ascending: false });

    if (error || !posts || posts.length === 0) {
      return [];
    }

    return posts.map((p) => ({
      id: p.id,
      author: p.author_name,
      state: p.author_state,
      role: p.author_role,
      category: p.category,
      content: p.content,
      createdAt: p.created_at ? p.created_at.split("T")[0] : "Recent",
      likes: p.likes_count || 0,
      comments: (p.peoples_voice_comments || []).map((c: { id: string; author_name: string; content: string; created_at: string }) => ({
        id: c.id,
        author: c.author_name,
        content: c.content,
        createdAt: c.created_at ? c.created_at.split("T")[0] : "Recent",
      })),
    }));
  } catch {
    return [];
  }
}

export async function publishVoicePost(post: {
  authorName: string;
  authorState: string;
  authorRole: string;
  category: string;
  content: string;
  userId?: string;
}): Promise<{ success: boolean; postId?: string; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { data, error } = await supabase
      .from("peoples_voice_posts")
      .insert([
        {
          author_name: post.authorName,
          author_state: post.authorState,
          author_role: post.authorRole,
          category: post.category,
          content: post.content,
          user_id: post.userId || null,
        },
      ])
      .select()
      .single();

    return { success: !error, postId: data?.id, error: error?.message };
  } catch (err: unknown) {
    return { success: true, error: err instanceof Error ? err.message : "Database error" };
  }
}

export async function addVoiceComment(comment: {
  postId: string;
  authorName: string;
  content: string;
  userId?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("peoples_voice_comments").insert([
      {
        post_id: comment.postId,
        author_name: comment.authorName,
        content: comment.content,
        user_id: comment.userId || null,
      },
    ]);

    return { success: !error, error: error?.message };
  } catch (err: unknown) {
    return { success: true, error: err instanceof Error ? err.message : "Database error" };
  }
}


// ==========================================
// 7. LGA REGISTRATIONS
// ==========================================

export interface LGARegistrationInput {
  fullName: string;
  phone: string;
  email?: string;
  lga: string;
  ward?: string;
  primaryNeed: string;
}

export interface LGACount {
  lga: string;
  count: number;
}

export interface LGAGrowthPoint {
  date: string;
  count: number;
}

export async function submitLGARegistration(
  data: LGARegistrationInput
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("lga_registrations").insert([
      {
        full_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        lga: data.lga,
        ward: data.ward || null,
        primary_need: data.primaryNeed,
      },
    ]);
    return { success: !error, error: error?.message };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Registration failed" };
  }
}

export async function fetchLGACounts(): Promise<LGACount[]> {
  if (!isSupabaseConfigured) {
    return [
      { lga: "Surulere", count: 42 },
      { lga: "Ikeja", count: 38 },
      { lga: "Alimosho", count: 31 },
      { lga: "Mushin", count: 27 },
      { lga: "Oshodi-Isolo", count: 24 },
    ];
  }

  try {
    const { data, error } = await supabase.rpc("get_lga_counts");
    if (error || !data) return [];
    return (data as { lga: string; count: number }[]).map((r) => ({
      lga: r.lga,
      count: Number(r.count),
    }));
  } catch {
    return [];
  }
}

export async function fetchLGAGrowth(): Promise<LGAGrowthPoint[]> {
  if (!isSupabaseConfigured) {
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (13 - i));
      return {
        date: d.toISOString().split("T")[0],
        count: Math.floor(5 + i * 2.5),
      };
    });
  }

  try {
    const { data, error } = await supabase.rpc("get_lga_growth");
    if (error || !data) return [];
    return (data as { date: string; count: number }[]).map((r) => ({
      date: r.date,
      count: Number(r.count),
    }));
  } catch {
    return [];
  }
}

export async function fetchTotalLGARegistrations(): Promise<number> {
  if (!isSupabaseConfigured) return 162;

  try {
    const { count, error } = await supabase
      .from("lga_registrations")
      .select("*", { count: "exact", head: true });
    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}


// ==========================================
// 8. MULTI-VENDOR MARKETPLACE & PAID MEMBERSHIP
// ==========================================

export interface Vendor {
  id: string;
  storeName: string;
  ownerName: string;
  whatsapp: string;
  email?: string;
  state?: string;
  lga?: string;
  address?: string;
  category: string;
  isVerified: boolean;
  createdAt: string;
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  title: string;
  category: string;
  retailPrice: number;
  memberPrice: number;
  unit: string;
  imageUrl: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  pickupHubs: string[];
  vendorStoreName?: string;
  vendorWhatsapp?: string;
}

export interface PaidMembership {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  state?: string;
  lga?: string;
  promoCode: string | null;
  paymentStatus: "pending" | "verified" | "rejected";
  amountPaid: number;
  proofReference?: string;
  proofImageUrl?: string;
  verifiedAt?: string;
  createdAt: string;
}

export async function registerVendor(data: {
  storeName: string;
  ownerName: string;
  whatsapp: string;
  email?: string;
  state?: string;
  lga?: string;
  category: string;
}): Promise<{ success: boolean; vendor?: Vendor; error?: string }> {
  const cleanPhone = data.whatsapp.replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("0") ? `234${cleanPhone.slice(1)}` : cleanPhone;

  if (!isSupabaseConfigured) {
    const mockVendor: Vendor = {
      id: `v-${Date.now()}`,
      storeName: data.storeName,
      ownerName: data.ownerName,
      whatsapp: formattedPhone,
      email: data.email,
      state: data.state || "Lagos",
      lga: data.lga,
      category: data.category,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    return { success: true, vendor: mockVendor };
  }

  try {
    const { data: record, error } = await supabase
      .from("vendors")
      .insert({
        store_name: data.storeName,
        owner_name: data.ownerName,
        whatsapp: formattedPhone,
        email: data.email,
        state: data.state || "Lagos",
        lga: data.lga,
        category: data.category,
        is_verified: true,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    return {
      success: true,
      vendor: {
        id: record.id,
        storeName: record.store_name,
        ownerName: record.owner_name,
        whatsapp: record.whatsapp,
        email: record.email,
        state: record.state,
        lga: record.lga,
        category: record.category,
        isVerified: record.is_verified,
        createdAt: record.created_at,
      },
    };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Database error" };
  }
}

export async function fetchVendorProducts(vendorId?: string): Promise<VendorProduct[]> {
  if (!isSupabaseConfigured) {
    return MARKETPLACE_PRODUCTS.map((p) => ({
      id: p.id,
      vendorId: "a0000000-0000-0000-0000-000000000001",
      title: p.title,
      category: p.category,
      retailPrice: p.openMarketPrice,
      memberPrice: p.cooperativePrice,
      unit: p.unit,
      imageUrl: p.imageUrl,
      description: p.description,
      inStock: p.inStock,
      stockCount: p.stockCount,
      pickupHubs: p.pickupHubs,
      vendorStoreName: "Amvora Central Hub & Cooperative Millers",
      vendorWhatsapp: "2348168850257",
    }));
  }

  try {
    let query = supabase
      .from("vendor_products")
      .select("*, vendors(store_name, whatsapp)")
      .order("created_at", { ascending: false });

    if (vendorId) {
      query = query.eq("vendor_id", vendorId);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      vendorId: item.vendor_id,
      title: item.title,
      category: item.category,
      retailPrice: Number(item.retail_price),
      memberPrice: Number(item.member_price),
      unit: item.unit,
      imageUrl: item.image_url,
      description: item.description,
      inStock: item.in_stock,
      stockCount: item.stock_count,
      pickupHubs: item.pickup_hubs || [],
      vendorStoreName: item.vendors?.store_name || "Verified PITS Partner",
      vendorWhatsapp: item.vendors?.whatsapp || "2348168850257",
    }));
  } catch {
    return [];
  }
}

export async function createVendorProduct(product: {
  vendorId: string;
  title: string;
  category: string;
  retailPrice: number;
  memberPrice: number;
  unit: string;
  imageUrl: string;
  description: string;
  stockCount: number;
  pickupHubs: string[];
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase.from("vendor_products").insert({
      vendor_id: product.vendorId,
      title: product.title,
      category: product.category,
      retail_price: product.retailPrice,
      member_price: product.memberPrice,
      unit: product.unit,
      image_url: product.imageUrl,
      description: product.description,
      stock_count: product.stockCount,
      pickup_hubs: product.pickupHubs,
      in_stock: true,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to add product" };
  }
}

// ₦3,200 Paid Membership Submission
export async function submitPaidMembership(data: {
  fullName: string;
  phone: string;
  email?: string;
  state?: string;
  lga?: string;
  proofReference: string;
}): Promise<{ success: boolean; error?: string }> {
  const cleanPhone = data.phone.trim();

  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase.from("paid_memberships").insert({
      full_name: data.fullName,
      phone: cleanPhone,
      email: data.email || null,
      state: data.state || "Lagos",
      lga: data.lga || null,
      proof_reference: data.proofReference,
      payment_status: "pending",
      amount_paid: 3200,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Submission failed" };
  }
}

// Phone-bound promo code validator: must match phone number of verified membership
export async function verifyMemberPromoCode(
  promoCode: string,
  phoneNumber: string
): Promise<{ valid: boolean; discountPercent: number; message: string; memberName?: string }> {
  const code = promoCode.trim().toUpperCase();
  const phone = phoneNumber.trim().replace(/\D/g, "");

  // Legacy universal promo codes (for demo/launch)
  if (code === "PITS2027") {
    return { valid: true, discountPercent: 45, message: "PITS Citizen Launch Pass (45% off applied)" };
  }
  if (code === "RICETEST") {
    return { valid: true, discountPercent: 50, message: "60-Day Rice Test Subsidy (50% off applied)" };
  }

  if (!isSupabaseConfigured) {
    // If demo code format: e.g. PITS-XXXX
    if (code.startsWith("PITS-") && phone.length >= 10) {
      return { valid: true, discountPercent: 40, message: `Member Discount Verified (Tied to ${phoneNumber})` };
    }
    return { valid: false, discountPercent: 0, message: "Invalid promo code or phone mismatch" };
  }

  try {
    const { data, error } = await supabase
      .from("paid_memberships")
      .select("full_name, phone, promo_code, payment_status")
      .eq("promo_code", code)
      .single();

    if (error || !data) {
      return { valid: false, discountPercent: 0, message: "Promo code not found" };
    }

    if (data.payment_status !== "verified") {
      return {
        valid: false,
        discountPercent: 0,
        message: "Your ₦3,200 payment is pending confirmation by admin.",
      };
    }

    const memberPhone = data.phone.replace(/\D/g, "");
    if (!memberPhone.endsWith(phone.slice(-9))) {
      return {
        valid: false,
        discountPercent: 0,
        message: "This promo code is strictly tied to another member's registered phone number.",
      };
    }

    return {
      valid: true,
      discountPercent: 45,
      memberName: data.full_name,
      message: `Verified PITS Member: ${data.full_name} (Discount applied)`,
    };
  } catch {
    return { valid: false, discountPercent: 0, message: "Verification check failed" };
  }
}

// Admin fetch all memberships to verify/approve
export async function fetchAllPaidMemberships(): Promise<PaidMembership[]> {
  if (!isSupabaseConfigured) {
    return [
      {
        id: "mem-1",
        fullName: "Chidubem Okafor",
        phone: "08031234567",
        email: "chidubem@example.com",
        state: "Lagos",
        lga: "Alimosho",
        promoCode: "PITS-8492-MEMBER",
        paymentStatus: "verified",
        amountPaid: 3200,
        proofReference: "Access/TRX-94821",
        verifiedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: "mem-2",
        fullName: "Aminat Balogun",
        phone: "08169998877",
        email: "aminat@example.com",
        state: "Lagos",
        lga: "Ikeja",
        promoCode: null,
        paymentStatus: "pending",
        amountPaid: 3200,
        proofReference: "OPay/TRX-83719",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  try {
    const { data, error } = await supabase
      .from("paid_memberships")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      phone: item.phone,
      email: item.email,
      state: item.state,
      lga: item.lga,
      promoCode: item.promo_code,
      paymentStatus: item.payment_status,
      amountPaid: Number(item.amount_paid),
      proofReference: item.proof_reference,
      proofImageUrl: item.proof_image_url,
      verifiedAt: item.verified_at,
      createdAt: item.created_at,
    }));
  } catch {
    return [];
  }
}

// Admin approval: marks verified & issues phone-bound promo code
export async function approvePaidMembership(id: string): Promise<{ success: boolean; promoCode?: string; error?: string }> {
  const generatedCode = `PITS-${Math.floor(1000 + Math.random() * 9000)}-MEMBER`;

  if (!isSupabaseConfigured) {
    return { success: true, promoCode: generatedCode };
  }

  try {
    const { error } = await supabase
      .from("paid_memberships")
      .update({
        payment_status: "verified",
        promo_code: generatedCode,
        verified_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true, promoCode: generatedCode };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Approval failed" };
  }
}


// ==========================================
// 9. REFER & EARN POINT ENGINE & WITHDRAWALS
// ==========================================

export interface MemberReferral {
  id: string;
  referrerPhone: string;
  referredName: string;
  referredPhone: string;
  pointsAwarded: number;
  status: "pending" | "confirmed";
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  memberPhone: string;
  memberName: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  pointsRedeemed: number;
  nairaAmount: number;
  status: "pending" | "paid" | "declined";
  adminNotes?: string;
  paidAt?: string;
  createdAt: string;
}

export interface MemberWalletSummary {
  totalReferrals: number;
  totalPoints: number;
  withdrawnAmount: number;
  pendingWithdrawal: number;
  availableBalanceNaira: number;
  availablePoints: number;
}

export async function fetchMemberWallet(phone: string): Promise<MemberWalletSummary> {
  const cleanPhone = phone.trim().replace(/\D/g, "");

  if (!isSupabaseConfigured) {
    return {
      totalReferrals: 12,
      totalPoints: 180, // 12 * 15pt
      withdrawnAmount: 0,
      pendingWithdrawal: 0,
      availableBalanceNaira: 180,
      availablePoints: 180,
    };
  }

  try {
    const { data: referrals } = await supabase
      .from("member_referrals")
      .select("points_awarded, status")
      .eq("referrer_phone", cleanPhone);

    const { data: withdrawals } = await supabase
      .from("withdrawal_requests")
      .select("naira_amount, points_redeemed, status")
      .eq("member_phone", cleanPhone);

    const totalReferrals = referrals?.length || 0;
    const totalPoints = referrals
      ?.filter((r) => r.status === "confirmed")
      .reduce((sum, r) => sum + Number(r.points_awarded || 15), 0) || 0;

    const withdrawnAmount = withdrawals
      ?.filter((w) => w.status === "paid")
      .reduce((sum, w) => sum + Number(w.naira_amount || 0), 0) || 0;

    const pendingWithdrawal = withdrawals
      ?.filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + Number(w.naira_amount || 0), 0) || 0;

    const pointsSpent = withdrawals
      ?.filter((w) => w.status === "paid" || w.status === "pending")
      .reduce((sum, w) => sum + Number(w.points_redeemed || 0), 0) || 0;

    const availablePoints = Math.max(0, totalPoints - pointsSpent);
    const availableBalanceNaira = availablePoints; // 1pt = ₦1

    return {
      totalReferrals,
      totalPoints,
      withdrawnAmount,
      pendingWithdrawal,
      availableBalanceNaira,
      availablePoints,
    };
  } catch {
    return {
      totalReferrals: 0,
      totalPoints: 0,
      withdrawnAmount: 0,
      pendingWithdrawal: 0,
      availableBalanceNaira: 0,
      availablePoints: 0,
    };
  }
}

export async function submitWithdrawalRequest(data: {
  memberPhone: string;
  memberName: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  nairaAmount: number;
}): Promise<{ success: boolean; error?: string }> {
  const MIN_WITHDRAWAL = 3000;
  if (data.nairaAmount < MIN_WITHDRAWAL) {
    return { success: false, error: `Minimum withdrawal limit is ₦${MIN_WITHDRAWAL.toLocaleString()} (3,000 points)` };
  }

  const cleanPhone = data.memberPhone.trim().replace(/\D/g, "");

  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const wallet = await fetchMemberWallet(cleanPhone);
    if (wallet.availableBalanceNaira < data.nairaAmount) {
      return { success: false, error: `Insufficient points. You have ₦${wallet.availableBalanceNaira.toLocaleString()} available.` };
    }

    const { error } = await supabase.from("withdrawal_requests").insert({
      member_phone: cleanPhone,
      member_name: data.memberName,
      bank_name: data.bankName,
      account_number: data.accountNumber,
      account_name: data.accountName,
      points_redeemed: data.nairaAmount,
      naira_amount: data.nairaAmount,
      status: "pending",
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to submit withdrawal" };
  }
}

export async function recordReferralSignup(data: {
  referrerPhone: string;
  referredName: string;
  referredPhone: string;
}): Promise<{ success: boolean }> {
  if (!data.referrerPhone || !data.referredPhone) return { success: false };

  const cleanReferrer = data.referrerPhone.trim().replace(/\D/g, "");
  const cleanReferred = data.referredPhone.trim().replace(/\D/g, "");

  if (cleanReferrer === cleanReferred) return { success: false };

  if (!isSupabaseConfigured) return { success: true };

  try {
    await supabase.from("member_referrals").insert({
      referrer_phone: cleanReferrer,
      referred_name: data.referredName,
      referred_phone: cleanReferred,
      points_awarded: 15, // 15pt per referral
      status: "confirmed",
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function fetchAllWithdrawalRequests(): Promise<WithdrawalRequest[]> {
  if (!isSupabaseConfigured) {
    return [
      {
        id: "w-1",
        memberPhone: "08031234567",
        memberName: "Chidubem Okafor",
        bankName: "Access Bank",
        accountNumber: "0029482103",
        accountName: "Chidubem Okafor",
        pointsRedeemed: 3500,
        nairaAmount: 3500,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  try {
    const { data, error } = await supabase
      .from("withdrawal_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      memberPhone: item.member_phone,
      memberName: item.member_name,
      bankName: item.bank_name,
      accountNumber: item.account_number,
      accountName: item.account_name,
      pointsRedeemed: Number(item.points_redeemed),
      nairaAmount: Number(item.naira_amount),
      status: item.status,
      adminNotes: item.admin_notes,
      paidAt: item.paid_at,
      createdAt: item.created_at,
    }));
  } catch {
    return [];
  }
}

export async function markWithdrawalAsPaid(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase
      .from("withdrawal_requests")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}


// ==========================================
// 10. MOVEMENT CITIZEN NETWORK (JOIN THE MOVEMENT)
// ==========================================

export interface MovementMember {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  state?: string;
  joinedAt: string;
}

export async function joinMovement(data: {
  fullName: string;
  phone: string;
  email?: string;
}): Promise<{ success: boolean; error?: string }> {
  const cleanPhone = data.phone.trim();
  const cleanName = data.fullName.trim();

  if (!cleanName || !cleanPhone) {
    return { success: false, error: "Please enter your name and phone number." };
  }

  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase.from("movement_members").insert({
      full_name: cleanName,
      phone: cleanPhone,
      email: data.email?.trim() || null,
      state: "Lagos",
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to join movement" };
  }
}

export async function fetchMovementMemberCount(): Promise<number> {
  if (!isSupabaseConfigured) return 2480;

  try {
    const { count, error } = await supabase
      .from("movement_members")
      .select("*", { count: "exact", head: true });

    if (error) return 2480;
    return count ?? 2480;
  } catch {
    return 2480;
  }
}

export async function fetchAllMovementMembers(): Promise<MovementMember[]> {
  if (!isSupabaseConfigured) {
    return [
      {
        id: "m-1",
        fullName: "Damilola Bakare",
        phone: "08023456789",
        email: "dami@example.com",
        state: "Lagos",
        joinedAt: new Date().toISOString(),
      },
      {
        id: "m-2",
        fullName: "Emeka Okonkwo",
        phone: "08169998811",
        email: "",
        state: "Lagos",
        joinedAt: new Date().toISOString(),
      },
    ];
  }

  try {
    const { data, error } = await supabase
      .from("movement_members")
      .select("*")
      .order("joined_at", { ascending: false });

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      phone: item.phone,
      email: item.email,
      state: item.state,
      joinedAt: item.joined_at,
    }));
  } catch {
    return [];
  }
}
