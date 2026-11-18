/* Per-family "extras" for the category pages: package/format types (from the
   WrapSense 2025 catalog), plus the small copy that frames them. Keyed by machine slug. */

window.WS_FAMILY_HREF = (slug) => slug === "fastpack" ? "machines-vffs.html" : `family-${slug}.html`;

window.WS_FAMILY_EXTRAS = {
  triservo: {
    pkgTitle: "Wrap Type",
    pkgLead: "Produces this pack",
    packages: [{ name: "Flow Wrap" }],
    pkgNote: "A horizontal fin- or lap-seal film wrap around a single item, tray, or multipack — the classic cookie, bar, or produce wrap with a back seal and two end crimps.",
  },
  fastpack: {
    pkgTitle: "Package Type",
    pkgLead: "Forms this bag style",
    packages: [{ name: "Pillow" }],
    pkgNote: "A classic pillow bag — one vertical back seal with top and bottom horizontal seals. A forming-tube swap changes the bag size; add a gusset plow for gusseted bags.",
  },
  sensiweigh: {
    pkgTitle: "Line Role",
    pkgLead: "Feeds these machines",
    packages: [{ name: "VFFS" }, { name: "Stick Pack" }, { name: "Pre-made Pouch" }],
    pkgNote: "The SensiWeigh is the dosing head, not the bag former. It drops accurate combination weights into whatever bagger sits below it — FastPack, QuickStick, or RapidBagger.",
  },
  picknpack: {
    pkgTitle: "Case Formats",
    pkgLead: "Packs product into",
    packages: [{ name: "RSC Case" }, { name: "Wraparound" }, { name: "Tray" }],
    pkgNote: "Robotic pick-and-place drops finished bags, pouches, or cartons into the case format your line runs — RSC, wraparound, or open tray — indexed and ready to seal.",
  },
  casemaster: {
    pkgTitle: "Case Style",
    pkgLead: "Erects, tapes & palletizes",
    packages: [{ name: "RSC Case" }],
    pkgNote: "Erects regular slotted cartons (RSC) from flat blanks and folds and tapes them shut. Random-size option auto-adjusts between every case for contract packaging.",
  },
  cartomate: {
    pkgTitle: "Carton Type",
    pkgLead: "Forms & closes",
    packages: [{ name: "Tuck Carton" }, { name: "Glue Carton" }],
    pkgNote: "Continuous-motion cartoning with tuck-in or hot-melt glue close, optional leaflet feeder, and serialization output for pharma and supplement lines.",
  },
  quickstick: {
    pkgTitle: "Package Type",
    pkgLead: "Produces these packs",
    panelImg: "assets/catalog/quickstick-package-type.png",
    packages: [{ name: "Stick Pack" }, { name: "3-Side Seal / Sachet" }],
    pkgNote: "Multi-lane stick packs for single-serve powders and liquids, plus three-side-seal sachets. Up to 16 lanes running in parallel for high throughput.",
  },
  rapidbagger: {
    pkgTitle: "Pouch Type",
    pkgLead: "Fills these pouch styles",
    packages: [{ name: "Stand-up / Zipper" }, { name: "Flat Pouch" }, { name: "Spout / Shaped" }],
    pkgNote: "Rotary filling of pre-made pouches — stand-up bags with zippers, flat pillow pouches, and spouted or shaped pouches. The look of a premium retail bag, automated.",
  },
  labelease: {
    pkgTitle: "Label Types",
    pkgLead: "Applies labels to",
    packages: [{ name: "Cylindrical" }, { name: "Front / Back" }, { name: "Top / Bottom" }],
    pkgNote: "Servo-driven pressure-sensitive labeling in wrap, front-back, and top/bottom configurations, with optional vision verification and print-and-apply for variable data.",
  },
  capvantage: {
    pkgTitle: "Cap Types",
    pkgLead: "Applies & torques",
    packages: [{ name: "Snap" }, { name: "Screw" }, { name: "Pump" }, { name: "Trigger" }],
    pkgNote: "Snap, screw-on, pump, and trigger heads with torque-feedback verification and missing-cap rejection — a small footprint that fits between conveyors.",
  },
};
