/* Review items: every section of copy + photo across the WrapSense site.
   Each item:
     id, page, pageHref, section, kind ("section" | "copy" | "photo"),
     copy: [{ role, text }],   // labelled lines for easy reading
     photos: [{ src, alt, note }],
     anchorY: optional approximate scroll y in source page (for "Open in context")
*/

const M = window.WS_MACHINES;
const I = window.WS_INDUSTRIES;
const C = window.WS_COMPANY;
const triservo = M.find(m => m.slug === "triservo");

window.WS_REVIEW_ITEMS = [
  /* ============================ HOME ============================ */
  {
    id: "home-hero",
    page: "Home", pageHref: "index.html",
    section: "Hero",
    summary: "Top of homepage — headline, sub, CTAs, featured-machine panel.",
    copy: [
      { role: "Headline", text: "Packaging machinery, built for small & medium-sized enterprises." },
      { role: "Sub",      text: "Ten machine families. Assembled, integrated, and serviced stateside. For the people who actually have to run them." },
      { role: "Primary CTA",   text: "See the Machines" },
      { role: "Secondary CTA", text: "Request a Quote" },
      { role: "Featured panel — tag",  text: "Featured family · In production" },
      { role: "Featured panel — copy", text: triservo.tagline }
    ],
    photos: [
      { src: triservo.photo, alt: "Triservo flow-wrapper", note: "Featured-machine hero photo (Triservo) — user has requested a different header photo" }
    ]
  },
  {
    id: "home-stats",
    page: "Home", pageHref: "index.html",
    section: "Hero stats strip",
    summary: "Inline stat row below hero.",
    copy: [
      { role: "Stat", text: "10 — Machine families" },
      { role: "Stat", text: "18+ — Industries served" },
      { role: "Stat", text: "50+ — US-stocked spares" },
      { role: "Stat", text: "24/7 — Emergency support" },
      { role: "Stat", text: "Backed — With service" }
    ]
  },
  {
    id: "home-industries",
    page: "Home", pageHref: "index.html",
    section: "Industries grid",
    summary: "Section header + industry tiles.",
    copy: [
      { role: "Eyebrow",  text: "Built for your product" },
      { role: "Heading",  text: "Optimizing the right line for your business." },
      { role: "Sub",      text: "Eighteen product categories. The machines we integrate run them every day — from artisan bakery to GMP pharma." },
      { role: "CTA",      text: "See all industries →" },
      { role: "Tile labels", text: I.map(i => i.label).join(" · ") }
    ]
  },
  {
    id: "home-machines",
    page: "Home", pageHref: "index.html",
    section: "Machine explorer",
    summary: "Header copy for the dark machine-family showcase.",
    copy: [
      { role: "Eyebrow", text: "Ten families · one partner" },
      { role: "Heading", text: "Machines designed for modularity and expansion, not just single machines." },
      { role: "Sub",     text: "Ten machine families, curated by us — vetted, integrated, and supported for the long haul. Click a family to see what's inside." },
      { role: "CTA",     text: "All 10 families →" }
    ]
  },
  {
    id: "home-line",
    page: "Home", pageHref: "index.html",
    section: "Full-line flow",
    summary: "Header + 5-stage line-integration visual.",
    copy: [
      { role: "Eyebrow", text: "Full-line capability" },
      { role: "Heading", text: "A fully integrated line. Turn-key for you." },
      { role: "Sub",     text: "Start with one machine or the whole line — we'll spec it, integrate it, and stand it up. Every family in the catalog talks to the next over Ethernet/IP or OPC-UA so your line acts like one machine, not five." },
      { role: "Stage 01", text: "Weigh — SensiWeigh" },
      { role: "Stage 02", text: "Form & Fill — FastPack / Triservo" },
      { role: "Stage 03", text: "Carton / Pouch — CartoMate / RapidBagger" },
      { role: "Stage 04", text: "Cap & Label — CapVantage / LabelEase" },
      { role: "Stage 05", text: "Case & Erect — CaseMaster / PickN'Pack" }
    ]
  },
  {
    id: "home-pillars",
    page: "Home", pageHref: "index.html",
    section: "Three pillars",
    summary: "Quality / Value / Service section on homepage.",
    copy: [
      { role: "Eyebrow", text: "Quality · Value · Service" },
      { role: "Heading", text: "The Toyota of packaging machinery." },
      { role: "Sub",     text: "You don't need a Ferrari on your first packaging machine purchase. You need a Toyota — practical, dependable, and supportable." },
      { role: "01 Quality", text: "Built with parts we keep on the shelf — not exotic OEM-only components. Industrial-grade where it matters, sensibly specified everywhere else." },
      { role: "02 Value",   text: "Priced to pay back. No paying for features you don't run. Modular options instead of forced bundles — you spec what your line actually needs." },
      { role: "03 Service", text: "US-stocked spares ship same-day. Phone support 24/7. On-site install and operator training offered with every machine we deliver." }
    ]
  },
  {
    id: "home-cta",
    page: "Home", pageHref: "index.html",
    section: "Closing CTA band",
    summary: "Final CTA at the bottom of the homepage.",
    copy: [
      { role: "Eyebrow",  text: "Talk to a project manager to discuss your application." },
      { role: "Headline", text: "Have something to pack? We can probably help." },
      { role: "Sub",      text: "Tell us your product, throughput target, and bag/case style. We come back with a real machine recommendation in 24–48 hours for most applications." },
      { role: "Primary CTA",   text: "Request a Quote" },
      { role: "Secondary CTA", text: "Browse the Catalog" }
    ]
  },

  /* ============================ ABOUT ============================ */
  {
    id: "about-hero",
    page: "About", pageHref: "about.html",
    section: "Hero",
    summary: "About-page hero — story intro + Operations stat card.",
    copy: [
      { role: "Eyebrow",  text: "About WrapSense" },
      { role: "Headline", text: "A Toyota, not a Ferrari." },
      { role: "Para 1",   text: `We source, integrate, and service custom packaging machinery — with final assembly, integration, and support handled stateside. Founded in ${C.founded}, we've spent more than a decade on the unsexy work of making lines that actually run.` },
      { role: "Para 2",   text: "You don't need a Ferrari on your first packaging machine purchase. You need a Toyota — practical, dependable, and supportable. Built with parts your maintenance team can actually source. Backed by a phone that gets answered on the second ring." },
      { role: "Primary CTA",   text: "See the Machines" },
      { role: "Secondary CTA", text: "Schedule a Demo" },
      { role: "Stat card", text: "Operations — Assembled stateside · 14 People · 13 Years in service · 10 Machine families · US Assembly & support" }
    ]
  },
  {
    id: "about-pillars",
    page: "About", pageHref: "about.html",
    section: "Three pillars (detailed)",
    summary: "Expanded pillars with bulleted commitments.",
    copy: [
      { role: "Eyebrow",  text: "Three pillars" },
      { role: "Heading",  text: C.tag },
      { role: "Sub",      text: "Everything we build comes back to these three. If a feature doesn't add quality, value, or service — we leave it out." },
      { role: "01 Quality body",    text: "Industrial parts where it matters, sensibly specified everywhere else. Built to outlast the SKU lineup your plant is running today." },
      { role: "01 Quality bullets", text: "Food-safe contact surfaces where required · Parts we stock — not exotic, OEM-only components · IP65-rated control boxes · Tested in our facility before shipment" },
      { role: "02 Value body",      text: "Priced to make sense for first-time automation. No SKU forces you into a tier you don't need." },
      { role: "02 Value bullets",   text: "Modular options — buy what you'll use · Lead times under 16 weeks for standard configs · Trade-in credit when you upgrade families · Financing partnerships for new lines" },
      { role: "03 Service body",    text: "The line stops, your lot ships late, your customer is unhappy. We're built to make that not happen." },
      { role: "03 Service bullets", text: "US-stocked spares ship same-day · Phone support answered 24/7 · On-site install + operator training offered with every machine · Remote-diagnostic option on every machine" }
    ]
  },
  {
    id: "about-process",
    page: "About", pageHref: "about.html",
    section: "Process — Plan / Production / Assembly & Integration / Install / Service",
    summary: "Five-step process strip.",
    copy: [
      { role: "Eyebrow", text: "How we work" },
      { role: "Heading", text: "From planning to service. We handle it all." },
      { role: "Sub",     text: "From planning to production, to assembly and integration, to install and service — we own the whole chain. No factory required." },
      { role: "01 Plan",                   text: "Tell us what you're packing and at what rate. We come back with a real machine spec — not a brochure — in 24–48 hours." },
      { role: "02 Production",             text: "Machines built to spec by our vetted manufacturing partners. We publish the schedule so there are no surprises mid-build." },
      { role: "03 Assembly & Integration", text: "Final assembly and line integration handled stateside. You're welcome to come walk the build before sign-off." },
      { role: "04 Install",                text: "Crated, freighted, uncrated, leveled, calibrated, and signed off on your floor. Operator training offered with every install." },
      { role: "05 Service",                text: "Year-one support included. Phone answered 24/7. Spares stocked in the US for every machine we've delivered." }
    ]
  },
  {
    id: "about-commitments",
    page: "About", pageHref: "about.html",
    section: "Things we won't do",
    summary: "Negative-space commitments list.",
    copy: [
      { role: "Eyebrow",  text: "What we promise" },
      { role: "Heading",  text: "Things we won't do." },
      { role: "Sub",      text: "Some of the loudest commitments in our industry are about what NOT to do." },
      { role: "Promise 1", text: "We won't ship a machine without our technician running it first." },
      { role: "Promise 2", text: "We won't sell you features you don't have a use case for." },
      { role: "Promise 3", text: "We won't end-of-life a spare part for a machine still in service." },
      { role: "Promise 4", text: "We won't put you in a phone queue when your line is down." },
      { role: "Promise 5", text: "We won't quote a project we can't actually deliver in the timeframe." },
      { role: "Promise 6", text: "We won't disappear after the install — Year 1 phone support is included." }
    ]
  },

  /* ============================ CONTACT ============================ */
  {
    id: "contact-hero",
    page: "Contact", pageHref: "contact.html",
    section: "Hero strip",
    summary: "Dark hero on contact page.",
    copy: [
      { role: "Eyebrow",  text: "Contact" },
      { role: "Headline", text: "What do you need to package?" },
      { role: "Sub",      text: "We respond within 24–48 hours with a real machine recommendation, not a marketing email." }
    ]
  },
  {
    id: "contact-form",
    page: "Contact", pageHref: "contact.html",
    section: "Quote form",
    summary: "Form title + body microcopy.",
    copy: [
      { role: "Eyebrow",  text: "Quote request — step 1 of 1" },
      { role: "Heading",  text: "Request a Quote" },
      { role: "Group 1",  text: "About you — name · company · email · phone" },
      { role: "Group 2",  text: "About the line — industry · machine · product · throughput · timing" },
      { role: "Group 3",  text: "Anything else — existing line, integration needs, certifications" },
      { role: "Footer microcopy", text: `We never share your information. Replies come back within 24–48 hours from a human engineer in ${C.hq.split(",")[0]}.` },
      { role: "Submit CTA", text: "Send my request" },
      { role: "Success",  text: "Got it. Your request is in. One of our engineers will reach out within 24–48 hours with a real machine recommendation." }
    ]
  },
  {
    id: "contact-sidebar",
    page: "Contact", pageHref: "contact.html",
    section: "Contact sidebar",
    summary: "Phone / email / demo & testing / emergency cards + customer call-out.",
    copy: [
      { role: "Call us",          text: `${C.phone} · Mon–Fri · 7am–6pm ET` },
      { role: "Email",            text: `${C.email} · Replies in 24–48 hours` },
      { role: "Demo & testing",   text: `${C.hq} · Schedule a demo or get your samples tested` },
      { role: "Emergency",        text: "24/7 line-down support (for active customers)" },
      { role: "Customer block — eyebrow", text: "Already a customer?" },
      { role: "Customer block — heading", text: "Need parts or service fast?" },
      { role: "Customer block — body",    text: "Skip the form. Call our 24/7 line. Most spares ship same-day from US stock." }
    ]
  },
  {
    id: "contact-location",
    page: "Contact", pageHref: "contact.html",
    section: "Come see it run / sample testing",
    summary: "Visit-us block with stylized map.",
    copy: [
      { role: "Eyebrow",        text: "Come see it run" },
      { role: "Heading",        text: C.hq },
      { role: "Sub",            text: "We're 30 minutes from BWI and 45 from DCA. Bring product samples and we'll run them on the actual machine, or set up a consultation to walk through your line." },
      { role: "Primary CTA",    text: "Test my samples" },
      { role: "Secondary CTA",  text: "Book a consultation" },
      { role: "Address",        text: C.address || C.hq }
    ]
  },

  /* ============================ INDUSTRIES ============================ */
  {
    id: "industries-page",
    page: "Industries", pageHref: "industries.html",
    section: "Industries page",
    summary: "Page intro + 18-category grid.",
    copy: [
      { role: "Eyebrow",  text: "Industries we serve" },
      { role: "Heading",  text: "Eighteen product categories, one partner." },
      { role: "Sub",      text: "From artisan bakery to GMP pharma. Pick your industry to see which machines fit." },
      { role: "Categories", text: I.map(i => i.label).join(" · ") }
    ]
  },

  /* ============================ MACHINES (catalog) ============================ */
  {
    id: "machines-catalog",
    page: "Machines", pageHref: "machines.html",
    section: "Catalog page",
    summary: "Catalog header + grid of 10 family cards.",
    copy: [
      { role: "Eyebrow",  text: "The catalog" },
      { role: "Heading",  text: "Ten machine families. Pick the right one." },
      { role: "Sub",      text: "Every machine on this page is sourced, integrated, and serviced by our team — final assembly handled stateside." }
    ]
  },

  /* ============================ MACHINE DETAIL (per family) ============================ */
  ...M.map(m => ({
    id: `machine-${m.slug}`,
    page: "Machine detail", pageHref: `machine.html?slug=${m.slug}`,
    section: m.name,
    family: m.family,
    gradient: m.gradient,
    summary: `${m.family} — ${m.tagline}`,
    copy: [
      { role: "Family",    text: m.family },
      { role: "Name",      text: m.name },
      { role: "Tagline",   text: m.tagline },
      { role: "Throughput", text: m.speed },
      { role: "Models",    text: m.models.join(" · ") },
      { role: "Blurb",     text: m.blurb },
      ...m.features.map((f, i) => ({ role: `Feature 0${i+1}`, text: f })),
      { role: "Best for",  text: m.bestFor.join(" · ") }
    ],
    photos: [
      { src: m.photo, alt: `${m.name} ${m.family}`, note: `Primary photo for ${m.name}` }
    ]
  }))
];

/* Group items by page for the sidebar */
window.WS_REVIEW_GROUPS = (() => {
  const order = ["Home", "About", "Contact", "Industries", "Machines", "Machine detail"];
  const groups = {};
  window.WS_REVIEW_ITEMS.forEach((it, idx) => {
    if (!groups[it.page]) groups[it.page] = [];
    groups[it.page].push({ ...it, index: idx });
  });
  return order.filter(k => groups[k]).map(k => ({ page: k, items: groups[k] }));
})();
