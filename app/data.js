/* Shared site data — written to window for cross-script access (Babel scopes each script). */

window.WS_MACHINES = [
  {
    slug: "triservo",
    name: "Triservo",
    family: "Flow Wrappers",
    category: "flow",
    gradient: "var(--ws-gradient-flow)",
    photo: "assets/machines/cut/triservo.png",
    tagline: "Horizontal flow-wrap, servo-driven, built for speed.",
    speed: "Up to 220 packs/min",
    bestFor: ["Bakery", "Snacks & Confectionery", "Produce", "Meat & Seafood", "Medical Devices", "Contract Packaging"],
    models: ["Triservo 23000-3SP", "Triservo 33000-3SP"],
    specs: [
      { k: "Max speed", v: "220 ppm" },
      { k: "Film width", v: "450–800 mm" },
      { k: "Pack length", v: "60–500 mm" },
      { k: "Pack height", v: "5–110 mm" },
      { k: "Drive", v: "Servo (3-axis)" },
      { k: "Footprint", v: "4.8 × 0.9 m" }
    ],
    blurb: "The Triservo is our workhorse horizontal flow-wrapper — three-axis servo drive, no-product / no-bag detection, and a quick-change forming head that swaps in under 15 minutes. Built for plants that need to change SKUs without losing a shift.",
    features: [
      "Three-axis servo control with recipe memory (up to 100 SKUs)",
      "Tool-less quick-change forming head",
      "Stainless steel washdown frame (IP65 control box)",
      "Industrial PLC + 10\" color HMI, English/Spanish",
      "No-product / no-bag detection with auto-reject",
      "Backed by our full warranty and US-stocked spares"
    ]
  },
  {
    slug: "fastpack",
    name: "FastPack",
    family: "Vertical Form Fill & Seal",
    category: "vffs",
    gradient: "var(--ws-gradient-vffs)",
    photo: "assets/machines/cut/fastpack.png",
    tagline: "VFFS bagging for free-flowing product, gusseted or pillow bag.",
    speed: "Up to 90 bags/min",
    bestFor: ["Coffee & Tea", "Snacks & Confectionery", "Pet Food", "Nutraceuticals", "Natural & Organic", "Frozen Foods"],
    models: ["FastPack 43000", "FastPack 63000", "FastPack Pro 430000HS", "FastPack Pro 530000HS"],
    specs: [
      { k: "Max speed", v: "90 bpm" },
      { k: "Bag width", v: "80–400 mm" },
      { k: "Bag length", v: "100–500 mm" },
      { k: "Fill weight", v: "10 g – 5 kg" },
      { k: "Bag styles", v: "Pillow, gusset, block" },
      { k: "Drive", v: "Servo film + jaws" }
    ],
    blurb: "FastPack vertical form-fill-seal handles free-flowing solids — granola, coffee, kibble, supplements — at up to 90 bags a minute. Pair it with a SensiWeigh multihead for high-accuracy fills.",
    features: [
      "Continuous or intermittent motion (model-dependent)",
      "Servo film pull-down, no clutches, no slip",
      "Modified Atmosphere Packaging (MAP) ready",
      "Gas flush + zip-track options",
      "Standard tooling for pillow, gusset, and block-bottom bags"
    ]
  },
  {
    slug: "sensiweigh",
    name: "SensiWeigh",
    family: "Weighing & Filling",
    category: "weigh",
    gradient: "var(--ws-gradient-weigh)",
    photo: "assets/machines/cut/sensiweigh.png",
    tagline: "Multihead weigher — accuracy you can take to the giveaway report.",
    speed: "Up to 120 weighments/min",
    bestFor: ["Snacks & Confectionery", "Coffee & Tea", "Pet Food", "Frozen Foods", "Natural & Organic", "Nutraceuticals"],
    models: ["SensiWeigh Pro 1.6L / 2.5L", "SensiWeigh Pro 5L", "SensiWeigh Pro Mini 0.2L / 0.5L"],
    specs: [
      { k: "Heads", v: "10 / 14 / 24" },
      { k: "Max weighments", v: "120 / min" },
      { k: "Accuracy", v: "±0.1 g" },
      { k: "Target range", v: "5 g – 5 kg" },
      { k: "Hopper volume", v: "1.6–5.0 L" },
      { k: "Touch HMI", v: "12\" full color" }
    ],
    blurb: "The SensiWeigh family of multihead weighers pairs cleanly with FastPack VFFS and Triservo flow-wrappers. Self-tuning combination logic keeps giveaway under 1%.",
    features: [
      "Self-tuning combination algorithm",
      "Stainless 304/316L contact parts",
      "Tool-free hopper removal for sanitation",
      "Recipe library, USB recipe export",
      "OPC-UA + Ethernet/IP for line integration"
    ]
  },
  {
    slug: "picknpack",
    name: "PickN'Pack",
    family: "Case Packing",
    category: "case",
    gradient: "var(--ws-gradient-case)",
    photo: "assets/machines/cut/picknpack.png",
    tagline: "Robotic pick-and-place case packing for bags, pouches, and cartons.",
    speed: "Up to 60 packs/min",
    bestFor: ["Snacks & Confectionery", "Pet Food", "Coffee & Tea", "Personal Care & Cosmetics", "Pharmaceutical", "Contract Packaging"],
    models: ["PickN'Pack Casepacker 2", "PickN'Pack Casepacker 3"],
    specs: [
      { k: "Max speed", v: "60 ppm" },
      { k: "Robot reach", v: "1.3 m" },
      { k: "Payload", v: "5 kg" },
      { k: "Pack styles", v: "RSC, wraparound, tray" },
      { k: "Vision", v: "2D + height sensor" },
      { k: "Safety", v: "PLd category 3" }
    ],
    blurb: "Pick from the conveyor, drop into the case, indexed and ready for sealing. The PickN'Pack handles flexible bags, pouches, and cartons without retooling.",
    features: [
      "Delta or 6-axis configurations",
      "Tool-changer for multi-SKU runs",
      "Integrated case erector + sealer interface",
      "OEE dashboard included",
      "Designed to integrate with existing CaseMaster lines"
    ]
  },
  {
    slug: "casemaster",
    name: "CaseMaster",
    family: "Case Erectors & Tapers",
    category: "erector",
    gradient: "var(--ws-gradient-erector)",
    photo: "assets/machines/cut/casemaster.png",
    tagline: "Erect, fold, tape — random or fixed case sizes, all day.",
    speed: "Up to 25 cases/min",
    bestFor: ["Snacks & Confectionery", "Pet Food", "Coffee & Tea", "Household & Cleaning", "Personal Care & Cosmetics", "Contract Packaging"],
    models: ["CaseMaster Velocity Prime (VP-500-15, VP-650-15)", "CaseMaster Velocity Ultra (VU-400-25, VU-500-25)", "CaseMaster Velocity Turbo (VT-400-30, VT-500-30, VT-650-25)", "CaseMaster FastSeal (taper)", "CaseMaster PalletStakr (palletizer)"],
    specs: [
      { k: "Max speed", v: "25 cpm" },
      { k: "Case length", v: "200–600 mm" },
      { k: "Case width", v: "150–500 mm" },
      { k: "Case height", v: "100–500 mm" },
      { k: "Tape head", v: "2\" or 3\" Better Pack" },
      { k: "Changeover", v: "< 5 min" }
    ],
    blurb: "CaseMaster automatic case erectors fold and tape RSC cases at up to 25 per minute. Random-size option auto-adjusts between every case for contract packaging.",
    features: [
      "Hot-melt or pressure-sensitive tape options",
      "Random-size auto-adjustment available",
      "Magazine holds 250 cases",
      "Safety-fenced with light curtains",
      "Pairs natively with PickN'Pack"
    ]
  },
  {
    slug: "cartomate",
    name: "CartoMate",
    family: "Cartoning",
    category: "carton",
    gradient: "var(--ws-gradient-carton)",
    photo: "assets/machines/cut/cartomate.png",
    tagline: "Horizontal cartoner for pouches, blisters, and pre-counted product.",
    speed: "Up to 150 cartons/min",
    bestFor: ["Pharmaceutical", "Personal Care & Cosmetics", "Medical Devices", "Nutraceuticals", "Natural & Organic", "Cannabis"],
    models: ["CartoMate-H (horizontal)", "CartoMate-V (vertical)"],
    specs: [
      { k: "Max speed", v: "150 cpm" },
      { k: "Carton size", v: "30 × 15 × 10 mm – 220 × 90 × 70 mm" },
      { k: "Closure", v: "Tuck or glue" },
      { k: "Insert", v: "Leaflet, blister, pouch" },
      { k: "Servo axes", v: "5" },
      { k: "Validation", v: "21 CFR Part 11 ready" }
    ],
    blurb: "Continuous-motion cartoner with optional leaflet feeder and 2D code reader. Built to GAMP guidelines for pharma and dietary supplement lines.",
    features: [
      "Tuck-in or hot-melt glue close",
      "Leaflet folder + feeder option",
      "Track-and-trace ready (serialization output)",
      "Stainless steel contact, GMP-compliant",
      "Recipe-based size changeover under 10 minutes"
    ]
  },
  {
    slug: "quickstick",
    name: "QuickStick",
    family: "Stick Pack",
    category: "stick",
    gradient: "var(--ws-gradient-stick)",
    photo: "assets/machines/cut/quickstick.png",
    tagline: "Multi-lane stick packs for powders, granules, and liquids.",
    speed: "Up to 1,200 sticks/min",
    bestFor: ["Coffee & Tea", "Nutraceuticals", "Pharmaceutical", "Personal Care & Cosmetics", "Natural & Organic", "Snacks & Confectionery"],
    models: ["QuickStick Eco (E1 / E2, 1–2 lane)", "QuickStick Pro (4 / 6 / 8 lane)", "QuickStick Pro XL (6 / 8 lane)"],
    specs: [
      { k: "Lanes", v: "8 / 12 / 16" },
      { k: "Max speed", v: "1,200 sticks/min" },
      { k: "Stick width", v: "12–35 mm" },
      { k: "Stick length", v: "60–180 mm" },
      { k: "Fill", v: "Auger, piston, or cup" },
      { k: "Film", v: "PET/PE, foil laminate" }
    ],
    blurb: "Multi-lane stick packers for single-serve coffee, electrolyte powders, vitamin sticks, and on-the-go pharma. Up to 1,200 sticks a minute on a 16-lane head.",
    features: [
      "Auger, piston, or cup fillers — swappable",
      "Independent lane shut-off",
      "Servo film and seal jaws",
      "Hot-air or ultrasonic sealing options",
      "Integrated with downstream cartoners"
    ]
  },
  {
    slug: "rapidbagger",
    name: "RapidBagger",
    family: "Pre-made Pouch",
    category: "pouch",
    gradient: "var(--ws-gradient-pouch)",
    photo: "assets/machines/cut/rapidbagger.png",
    tagline: "Pre-made pouch filler — stand-up, spouted, or flat.",
    speed: "Up to 80 pouches/min",
    bestFor: ["Pet Food", "Natural & Organic", "Coffee & Tea", "Frozen Foods", "Personal Care & Cosmetics", "Cannabis"],
    models: ["RapidBagger Compact (1 / 2 / 3)", "RapidBagger Inline (1 / 2 / 3)", "RapidBagger Model X (RBX-HS-6 / -8 / -10)", "RapidBagger SideLoad (1 / 2 / 3)"],
    specs: [
      { k: "Stations", v: "6 / 8 rotary" },
      { k: "Max speed", v: "80 ppm" },
      { k: "Pouch width", v: "80–250 mm" },
      { k: "Pouch length", v: "100–350 mm" },
      { k: "Fill range", v: "10 g – 2.5 kg" },
      { k: "Closure", v: "Heat-seal or zip" }
    ],
    blurb: "Rotary pre-made pouch filler for stand-up bags, spouted pouches, and flat pillow packs. The look of a premium retail bag, automated.",
    features: [
      "Rotary 6 or 8-station carousel",
      "Auto pouch detection — no-pouch / no-fill",
      "Zip-track and spout handling",
      "Vacuum / gas flush options",
      "Quick changeover with tool-less grippers"
    ]
  },
  {
    slug: "labelease",
    name: "LabelEase",
    family: "Labeling",
    category: "label",
    gradient: "var(--ws-gradient-label)",
    photo: "assets/machines/cut/labelease.png",
    tagline: "Pressure-sensitive labeling — wrap, top, front-back.",
    speed: "Up to 300 containers/min",
    bestFor: ["Personal Care & Cosmetics", "Pharmaceutical", "Nutraceuticals", "Beverages", "Natural & Organic", "Cannabis"],
    models: ["LabelEase CL2 (cylindrical)", "LabelEase Combo FBCL (front-back + cylindrical)", "LabelEase TBL (top + bottom)"],
    specs: [
      { k: "Max speed", v: "300 cpm" },
      { k: "Container Ø", v: "20–150 mm" },
      { k: "Label width", v: "10–200 mm" },
      { k: "Accuracy", v: "±0.5 mm" },
      { k: "Print + apply", v: "Optional Zebra/SATO" },
      { k: "Vision verify", v: "Optional" }
    ],
    blurb: "Servo-driven pressure-sensitive labeler with vision verification and optional print-and-apply for variable data.",
    features: [
      "Wrap, front-back, and top labeling configs",
      "Servo dispense for ±0.5 mm placement",
      "Optional vision verification + reject",
      "Print-and-apply for date/lot/serial",
      "Stainless construction, washdown-ready"
    ]
  },
  {
    slug: "capvantage",
    name: "CapVantage",
    family: "Capping & Auxiliary",
    category: "cap",
    gradient: "var(--ws-gradient-cap)",
    photo: "assets/machines/cut/capvantage.png",
    tagline: "Cap feeders, cappers, and line-integration auxiliaries.",
    speed: "Up to 200 caps/min",
    bestFor: ["Personal Care & Cosmetics", "Pharmaceutical", "Nutraceuticals", "Household & Cleaning", "Beverages", "Cannabis"],
    models: ["CapVantage SDL-2 (capping machine)"],
    specs: [
      { k: "Max speed", v: "200 cpm" },
      { k: "Cap Ø", v: "12–80 mm" },
      { k: "Torque range", v: "0.2–8 Nm" },
      { k: "Cap types", v: "Snap, screw, pump, trigger" },
      { k: "Feeders", v: "Vibratory or elevator" },
      { k: "Verify", v: "Cap-presence + torque" }
    ],
    blurb: "Cappers and cap feeders that round out the line. Torque-verified, missing-cap rejection, and a small footprint that fits between conveyors.",
    features: [
      "Snap, screw-on, pump, and trigger heads",
      "Torque-feedback verification",
      "Missing-cap detection + reject",
      "Vibratory or elevator feeders",
      "Servo or pneumatic actuation"
    ]
  }
];

window.WS_INDUSTRIES = [
  { slug: "bakery",      label: "Bakery",                       icon: "bread" },
  { slug: "snacks",      label: "Snacks & Confectionery",       icon: "nuts" },
  { slug: "beverages",   label: "Beverages",                    icon: "bottle" },
  { slug: "coffee",      label: "Coffee & Tea",                 icon: "bean" },
  { slug: "dairy",       label: "Dairy",                        icon: "milk" },
  { slug: "meat",        label: "Meat & Seafood",               icon: "drumstick" },
  { slug: "produce",     label: "Produce",                      icon: "strawberry" },
  { slug: "frozen",      label: "Frozen Foods",                 icon: "snowflake" },
  { slug: "natural",     label: "Natural & Organic",            icon: "leaf" },
  { slug: "pet",         label: "Pet Food",                     icon: "paw" },
  { slug: "supplements", label: "Nutraceuticals",               icon: "capsule" },
  { slug: "pharma",      label: "Pharmaceutical",               icon: "pill" },
  { slug: "personal",    label: "Personal Care & Cosmetics",    icon: "spray" },
  { slug: "household",   label: "Household & Cleaning",         icon: "sparkle" },
  { slug: "medical",     label: "Medical Devices",              icon: "stethoscope" },
  { slug: "cannabis",    label: "Cannabis",                     icon: "cannabis" },
  { slug: "industrial",  label: "Industrial & Chemical",        icon: "factory" },
  { slug: "contract",    label: "Contract Packaging",           icon: "box" }
];

/* Mapping from industry label → which machine slugs serve it. Used by the filter. */
window.WS_INDUSTRY_TO_MACHINES = (() => {
  const map = {};
  window.WS_INDUSTRIES.forEach(i => { map[i.label] = []; });
  window.WS_MACHINES.forEach(m => {
    m.bestFor.forEach(industryLabel => {
      if (map[industryLabel]) map[industryLabel].push(m.slug);
    });
  });
  return map;
})();

window.WS_FAMILY_HREF = slug => slug === "fastpack" ? "machines-vffs.html" : `family-${slug}.html`;

window.WS_NAV = [
  { label: "Machines", href: "machines.html", children: [
    { label: "All machines", href: "machines.html", sub: "Full catalog · 10 families" },
    ...window.WS_MACHINES.map(m => ({ label: m.name, href: window.WS_FAMILY_HREF(m.slug), sub: m.family }))
  ] },
  { label: "Industries", href: "industries.html", children: [
    { label: "Snacks & Confectionery", href: "lp-snacks.html" },
    { label: "Coffee & Tea", href: "lp-coffee.html" },
    { label: "Nutraceuticals", href: "lp-supplements.html" },
    { label: "Pharmaceutical", href: "lp-pharma.html" },
    { label: "Cannabis", href: "lp-cannabis.html" },
    { label: "All 18 industries", href: "industries.html" }
  ] },
  { label: "Packages", href: "packages.html" },
  { label: "Case Studies", href: "case-studies.html" },
  { label: "About", href: "about.html" },
  { label: "Contact", href: "contact.html" }
];

window.WS_COMPANY = {
  name: "WrapSense Packaging",
  tag: "Quality. Value. Service.",
  hq: "Gaithersburg, Maryland",
  /* Street address is a placeholder — confirm and update before publishing. */
  address: "Gaithersburg, MD",
  phone: "(301) 200-0048",
  email: "sales@wrapsensepackaging.com",
  hours: "Mon–Fri · 10am–5pm EST · 24/7 emergency support",
  warranty: "US-stocked spare parts · Backed with service",
  founded: 2012,
  positioning: "A Toyota, not a Ferrari.",
  /* What we actually do — we are not an OEM manufacturer. */
  role: "We source, integrate, and service packaging machinery. Final assembly, line integration, and support all happen stateside.",
  responseTime: "24–48 hours"
};

/* Per-model photos, cut from the 2025 catalog. */
window.WS_MODEL_PHOTOS = {
 "Triservo 23000-3SP": "assets/models/triservo-23000.png",
 "Triservo 33000-3SP": "assets/models/triservo-33000.png",
 "FastPack 43000": "assets/models/fastpack-43000.png",
 "FastPack 63000": "assets/models/fastpack-63000.png",
 "FastPack Pro 430000HS": "assets/models/fastpack-pro-430000hs.png",
 "FastPack Pro 530000HS": "assets/models/fastpack-pro-530000hs.png",
 "SensiWeigh Pro 1.6L / 2.5L": "assets/models/sensiweigh-pro.png",
 "SensiWeigh Pro 5L": "assets/models/sensiweigh-pro-5l.png",
 "SensiWeigh Pro Mini 0.2L / 0.5L": "assets/models/sensiweigh-mini.png",
 "PickN'Pack Casepacker 2": "assets/models/picknpack-2.png",
 "PickN'Pack Casepacker 3": "assets/models/picknpack-3.png",
 "CaseMaster Velocity Prime (VP-500-15, VP-650-15)": "assets/models/casemaster-prime.png",
 "CaseMaster Velocity Ultra (VU-400-25, VU-500-25)": "assets/models/casemaster-ultra.png",
 "CaseMaster Velocity Turbo (VT-400-30, VT-500-30, VT-650-25)": "assets/models/casemaster-turbo.png",
 "CaseMaster FastSeal (taper)": "assets/models/casemaster-fastseal.png",
 "CaseMaster PalletStakr (palletizer)": "assets/models/casemaster-palletstakr.png",
 "CartoMate-H (horizontal)": "assets/models/cartomate-h.png",
 "CartoMate-V (vertical)": "assets/models/cartomate-v.png",
 "QuickStick Eco (E1 / E2, 1–2 lane)": "assets/models/quickstick-eco.png",
 "QuickStick Pro (4 / 6 / 8 lane)": "assets/models/quickstick-pro.png",
 "QuickStick Pro XL (6 / 8 lane)": "assets/models/quickstick-pro-xl.png",
 "RapidBagger Compact (1 / 2 / 3)": "assets/models/rapidbagger-compact.png",
 "RapidBagger Inline (1 / 2 / 3)": "assets/models/rapidbagger-inline.png",
 "RapidBagger Model X (RBX-HS-6 / -8 / -10)": "assets/models/rapidbagger-model-x.png",
 "RapidBagger SideLoad (1 / 2 / 3)": "assets/models/rapidbagger-sideload.png",
 "LabelEase CL2 (cylindrical)": "assets/models/labelease-cl2.png",
 "LabelEase Combo FBCL (front-back + cylindrical)": "assets/models/labelease-fbcl.png",
 "LabelEase TBL (top + bottom)": "assets/models/labelease-tbl.png",
 "CapVantage SDL-2 (capping machine)": "assets/models/capvantage-sdl2.png"
};
