# Requirements and Discovery Report — Amvora / PITS

## 1. Executive Summary
Amvora is a civic engagement platform associated with the **PITS (Power in the Streets)** movement in Nigeria (target domain: `https://amvora.com.ng`). 
The platform combines:
- Public civic movement communications and editorial campaign hubs (such as the 60-day proof-of-work initiative: *"Not a bag of rice. A system."*).
- Civic engagement tools (petitions, issue reporting, volunteering, community events).
- A community marketplace (essential household items, meals, airtime, electricity, partner logistics).
- A secure member portal with granular access controls.
- An administrative moderation and operations dashboard.

---

## 2. Requirements Classification Matrix

| Feature / Domain | Description | Classification | Notes / Dependencies |
| :--- | :--- | :--- | :--- |
| **Public Homepage** | Editorial civic homepage communicating mission, current campaigns, and quick engagement | Confirmed Requirement | Polished editorial style, mobile-first |
| **About & Movement** | Organizational history, PITS movement principles, leadership overview | Confirmed Requirement | Factual, no unverified claims |
| **60-Day Campaign Hub** | The 60-day proof-of-work initiative on food affordability and systems | Confirmed Requirement | Configurable milestone timeline & updates |
| **Initiatives & Programs** | Directory of initiatives with dynamic detail routes (`/initiatives/[slug]`) | Confirmed Requirement | Server-rendered, structured content |
| **Issue Reporting** | Public submission of local civic/community issues with category & attachments | Confirmed Requirement | Private by default; moderation workflow required |
| **Petitions** | Civic petitions with verifiable signature collection and spam prevention | Confirmed Requirement | Prevent duplicate votes, privacy protection |
| **Volunteer Registration** | Civic registration collecting minimal necessary data with consent | Confirmed Requirement | Restricted administrative access |
| **Community Events** | Calendar of civic actions, community meetings, registration tracking | Confirmed Requirement | Verified publishers only |
| **News & Stories** | Editorial publishing for official announcements and verified impact | Confirmed Requirement | Attributable to authorized publishers |
| **Member Portal** | Secure auth (register, login, password recovery, profile, activity history) | Confirmed Requirement | Supabase Auth, strictly enforced server authorization |
| **Marketplace (Food/Essentials)** | Catalog, ordering, and fulfillment for community food and essentials | Confirmed Requirement | Server-side price & order verification |
| **Marketplace (Utilities/Airtime/Power)** | Purchase of airtime and electricity tokens | Requires Owner Decision | Requires verified Nigerian VTU provider API credentials |
| **Marketplace (Rides/Flights)** | Transport and flight bookings through partner APIs | Requires Owner Decision | Clarify if active partner integration exists |
| **Administration Dashboard** | Comprehensive RBAC dashboard for content, petitions, issues, orders, and audits | Confirmed Requirement | Deny by default, audit logging for sensitive actions |

---

## 3. Data Privacy & Classification
- **Public Data:** Approved campaign pages, public petitions (titles, text, aggregate counts), verified news articles, public event listings, product catalog.
- **Protected Member Data:** User profiles, contact numbers, order histories, notification preferences, volunteer application data.
- **Confidential / Sensitive Data:** Unmoderated civic issue reports, personal addresses, payment webhook signatures, admin audit logs, session secrets.
- **Compliance:** Nigeria Data Protection Act (NDPA) compliance: minimal data collection, explicit consent, right to erasure, no unauthorized disclosure of personal identity documents or reports.

---

## 4. Missing Information & Open Questions
1. **Existing Base44 Content/Assets:** Because Base44 credits are exhausted, do we have an export of existing text, branding logos, photography, or copy, or should we curate content based on the live `amvora.com.ng` site and approved assets?
2. **Launch Scope for Marketplace:** Which categories are required for Day-1 launch vs. phased expansion?
3. **External API Providers:** Which specific payment processor (e.g., Paystack, Flutterwave) and VTU/telecom gateway accounts are confirmed for Amvora?
4. **Editorial Staffing & Roles:** What specific administrative roles should be configured initially (e.g., Super Admin, Content Editor, Community Moderator, Support Agent)?
