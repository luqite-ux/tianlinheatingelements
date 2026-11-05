# Build an English-first B2B inquiry website for Anhui Tianlin Electric Appliance Co., Ltd.

Create a complete, runnable Next.js 16 App Router frontend for `tianlinheatingelements.com`. This is the first visual design stage. The site serves appliance OEM/ODM and industrial buyers who need custom heating elements based on voltage, power, size, material, operating temperature, lead configuration, drawing and order volume.

Brand: use the supplied TL / 天林电器 logo. Derive a precise industrial visual system from the supplied blue Banner artwork and real product/factory images: deep navy, electric blue and warm metallic accents, white/light neutral product stages, disciplined typography, technical grid details and crisp spacing. Avoid a generic SaaS dashboard, interchangeable blue-tech cards, excessive glow, floating particles, oversized rounded cards or text-box-plus-photo-box composition.

Use all three supplied Banner images as the homepage hero carousel. They are complete customer-designated Banner assets and must not be replaced, filtered out or rebuilt as split cards. Keep product/equipment subjects bright and recognizable; do not cover the whole image with a dark overlay. Provide separate desktop and 390px crop/safe-area behavior, previous/next, pagination and pause. All important copy and buttons remain real HTML text.

Authoritative product families:
1. Aluminum Foil Heating Element (AH-F001): 12/24/220V, 1W–2kW, aluminum foil with PET/PVC insulation, sheet or custom die-cut, optional adhesive backing.
2. Steel Tubular Heating Element (TH-S001): diameter 6/8/10mm, 12–240V, 50–2000W, carbon steel or 304 stainless steel, optional flange/bracket.
3. Aluminum Tubular Heating Element (TH-A001): diameter 6/8/10mm, 12–240V, 30–1500W, 6063 aluminum, optional anodizing/mounting tabs.
4. Silicone-Encapsulated PTC Heating Element (PTC-S001): 12/24/230V, 40–180°C constant-temperature range, full silicone encapsulation, custom leads and mounting holes.
5. Mica Heating Plate (MH-M001): 12–230V, 10–800W, up to 500°C, natural mica, custom shapes.
6. Silicone Insulated Heating Wire (SH-W001): 12/24/230V, 5–30W/m, -60–200°C, single/dual core, custom leads.

Build full routes: Home; Products list with category filters; Product detail template; Applications; Manufacturing; Quality & Testing; Cases; Case detail; About; News list with a truthful empty state; News detail template; Contact/RFQ. Header must explicitly include Home and the logo links home. No shopping cart, checkout, price, fake news, fake case, fake form success or demo customer data.

Homepage uses the stable section order from the attached plan: hero, product families, applications, engineering proof, manufacturing, quality lab, certificates, clients, cooperation process and FAQ. Use real supplied imagery. Product images remain fully visible with object-fit contain and visually continuous clean backgrounds. Manufacturing images must not be framed inside floating white photo cards.

Certificates: create a dedicated certificate section/page where each supplied ISO, CCC, CE and explosion-proof certificate is an independent portrait item, fully visible, not combined into a collage. Use a segmented rail with manual navigation, pause, touch support and a static reduced-motion fallback.

Clients: create a real client-logo section using only supplied logos. Present a left-moving continuous logo loop with pause on hover/focus and a visible pause option; mobile and reduced-motion users get a static wrapping list. Do not add other brands.

Cases: source materials contain technical drawings/specifications rather than marketing case studies. Create the Cases information architecture and empty state, plus a template capable of showing a real application/drawing review later. Do not invent named projects or claim a drawing belongs to a public client.

Motion: progressive enhancement only. Content is visible by default. Each major section and every repeated card participates in a perceptible in-view reveal; only mark an item completed after it truly enters the viewport. No global timeout may pre-complete below-the-fold animation. Include hover/focus feedback, touch-safe controls and `prefers-reduced-motion` static fallbacks.

Facts: company founded in 2019; approximately 120 employees; approximately 15,000 m² facility; address No. 237 Meihong Road, Meilin Town, Ningguo, Anhui, China; phone +86 138 6696 2695; email info@tianlinheatingelements.com. Use the supplied workshop and test-equipment images as real evidence. Do not publish conflicting 128-person/8-million-capacity claims.

Never write warranty, guarantee, warranties, guaranteed, 质保, 保修 or any synonymous service promise. Do not state 10–15 year life, 24/7 response, 48-hour arrival, 72-hour resolution, guaranteed seasonal delivery or unsupported certifications/capacity. Do not expose internal audit wording, source notes or customer-sensitive drawing identifiers.

Technical delivery: accessible semantic HTML; one H1 per page; keyboard focus; 44px touch targets; responsive tables and forms; image alt; no video; dynamic current-year footer using `© <year> Anhui Tianlin Electric Appliance Co., Ltd. All rights reserved.` with normalized punctuation. Provide a square favicon derived from the supplied TL mark, consistent with the header logo. Keep locale-aware data interfaces so future languages do not require route/data redesign, while this first release is English only.

