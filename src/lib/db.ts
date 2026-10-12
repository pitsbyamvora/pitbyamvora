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
      // Increment signatures count via raw RPC or direct update
      await supabase.rpc("increment_petition_signatures", {
        petition_row_id: params.petitionId,
      }).catch(() => null);
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
