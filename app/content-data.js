/* Case studies + industry landing pages.
   PLACEHOLDER CONTENT — customer names, numbers and quotes are illustrative. Replace before publishing. */

window.WS_CASES = [
  {
    slug: "snack-copacker",
    client: "Ridgeline Snack Co.",
    location: "Lancaster, PA",
    industry: "Snacks & Confectionery",
    landing: "snacks",
    title: "Cutting giveaway from 4.2% to 0.9% on a trail-mix line",
    summary: "A regional co-packer swapped volumetric cups for a weigher-over-bagger line and paid it back in 11 months.",
    machines: ["sensiweigh", "fastpack", "casemaster"],
    product: "Trail mix, 8–16 oz pillow bags",
    installed: "6 weeks, PO to production",
    stats: [
      { label: "Product giveaway", before: "4.2%", after: "0.9%" },
      { label: "Bags per minute", before: "45", after: "70" },
      { label: "Payback", before: "", after: "11 mo" }
    ],
    challenge: [
      "Ridgeline ran three SKUs of trail mix through a volumetric cup filler. Nuts and dried fruit settle differently, so the cups were set high to stay legal on weight. That meant almost a quarter-ounce of free product in every bag.",
      "The bagger was also near end of life. Two unplanned stops a week were normal."
    ],
    solution: [
      "We paired a 14-head SensiWeigh with a FastPack VFFS on a shared mezzanine, then added a CaseMaster erector at end of line so one operator could run the whole cell.",
      "Recipes for all three SKUs were loaded before shipping. We ran their product at our facility before the line left the building."
    ],
    result: [
      "Giveaway dropped to under 1% in the first week. Speed went from 45 to 70 bags per minute on the same film.",
      "The line paid for itself in 11 months on product savings alone."
    ],
    quote: { text: "We figured we'd need a year to dial it in. It was running clean in a week.", name: "Plant Manager", role: "Ridgeline Snack Co." }
  },
  {
    slug: "supplement-stickpack",
    client: "Northfield Nutrition",
    location: "Boise, ID",
    industry: "Nutraceuticals",
    landing: "supplements",
    title: "Bringing stick-pack production in-house",
    summary: "A growing electrolyte brand stopped paying a co-packer and started running its own 4-lane stick line.",
    machines: ["quickstick", "cartomate"],
    product: "Electrolyte powder, 7 g stick packs, 20-count cartons",
    installed: "8 weeks, PO to production",
    stats: [
      { label: "Sticks per minute", before: "0", after: "240" },
      { label: "Cost per stick", before: "$0.11", after: "$0.04" },
      { label: "Co-packer lead time", before: "9 wk", after: "None" }
    ],
    challenge: [
      "Northfield's co-packer had a nine-week queue. Every flavor launch waited in line, and margins shrank as volume grew.",
      "The team had never run packaging equipment. They needed something an operator could learn in a day."
    ],
    solution: [
      "We specified a 4-lane QuickStick with auger fillers for fine powder, feeding a CartoMate that counts and cartons 20 sticks per box.",
      "We trained two operators on site, left a spare-parts kit, and set up remote support on the HMI."
    ],
    result: [
      "Northfield now runs 240 sticks per minute on one shift. Per-stick cost dropped by roughly two-thirds.",
      "New flavors go from formula to shelf in under three weeks."
    ],
    quote: { text: "Our operators had never touched a packaging machine. They were running it alone by day two.", name: "Director of Operations", role: "Northfield Nutrition" }
  },
  {
    slug: "coffee-pouch",
    client: "Harbor Point Roasters",
    location: "Portland, ME",
    industry: "Coffee & Tea",
    landing: "coffee",
    title: "From six hand-fillers to two operators on retail pouches",
    summary: "A specialty roaster automated valved stand-up pouches without giving up its small-batch SKU mix.",
    machines: ["rapidbagger", "labelease"],
    product: "Whole-bean coffee, 12 oz stand-up pouches with one-way valve",
    installed: "5 weeks, PO to production",
    stats: [
      { label: "Operators per shift", before: "6", after: "2" },
      { label: "Pouches per minute", before: "12", after: "40" },
      { label: "Changeover", before: "", after: "< 10 min" }
    ],
    challenge: [
      "Harbor Point hand-filled and heat-sealed every retail bag. Holiday volume meant overtime and temp labor every year.",
      "They run 22 SKUs in small batches, so any machine had to change over fast."
    ],
    solution: [
      "We installed a RapidBagger pre-made pouch filler with a valve applicator and nitrogen flush, followed by a LabelEase front-back labeler.",
      "Pouch width changes are tool-free. Recipes live on the HMI by SKU."
    ],
    result: [
      "Two operators now do the work of six. The line runs 40 pouches per minute and changes SKUs in under ten minutes.",
      "The holiday rush ran on a normal schedule for the first time."
    ],
    quote: { text: "It didn't change how we roast. It changed how we go home at night.", name: "Owner", role: "Harbor Point Roasters" }
  }
];

window.WS_LANDINGS = {
  snacks: {
    label: "Snacks & Confectionery", icon: "nuts",
    headline: ["Pack more snacks.", "Give away less."],
    sub: "Weigher-over-bagger lines for chips, nuts, candy and trail mix. Specified, integrated and serviced stateside.",
    stats: [{ v: "< 1%", l: "Typical giveaway" }, { v: "90", l: "Bags / min" }, { v: "24–48h", l: "Quote turnaround" }],
    pains: [
      { p: "Overfilling to stay legal on weight", f: "Multihead combination weighing hits target weight bag after bag." },
      { p: "Crushed or broken product", f: "Low-drop chutes and gentle vibratory feeds protect fragile product." },
      { p: "Too many SKUs, too many changeovers", f: "Recipe-driven HMIs and tool-free formers. Change bag sizes in minutes." }
    ],
    line: ["sensiweigh", "fastpack", "casemaster"],
    case: "snack-copacker",
    faqs: [
      { q: "Can one line handle both chips and nuts?", a: "Usually, yes. We size the weigher and bucket style to your heaviest and most fragile product, then store each as a recipe." },
      { q: "Pillow bags or gusseted?", a: "FastPack forms both. Swap the forming tube and set the gusset option on the HMI." },
      { q: "Do you test with our product?", a: "Yes. Send product and film and we'll run it before the machine ships." }
    ]
  },
  coffee: {
    label: "Coffee & Tea", icon: "bean",
    headline: ["Fresh coffee.", "Sealed fast."],
    sub: "Pouch, bag and stick lines for whole bean, ground and single-serve. Valve application and nitrogen flush built in.",
    stats: [{ v: "40", l: "Pouches / min" }, { v: "< 10 min", l: "SKU changeover" }, { v: "N₂", l: "Flush ready" }],
    pains: [
      { p: "Hand-filling every retail bag", f: "Pre-made pouch fillers that run stand-up, flat-bottom or zipper pouches." },
      { p: "Short shelf life", f: "One-way valve application and nitrogen flush keep oxygen out." },
      { p: "Small batches, lots of SKUs", f: "Tool-free width changes and saved recipes per blend." }
    ],
    line: ["rapidbagger", "labelease"],
    case: "coffee-pouch",
    faqs: [
      { q: "Can you apply degassing valves?", a: "Yes. The valve applicator mounts on the RapidBagger before fill." },
      { q: "What about single-serve sticks?", a: "QuickStick runs instant coffee and tea in 1–8 lane configurations." },
      { q: "Will ground coffee dust cause problems?", a: "We spec auger fillers with dust extraction for fine grinds." }
    ]
  },
  supplements: {
    label: "Nutraceuticals", icon: "capsule",
    headline: ["Stop waiting", "on your co-packer."],
    sub: "Stick pack, pouch and carton lines for powders, capsules and gummies. Sized for brands taking production in-house.",
    stats: [{ v: "1,200", l: "Sticks / min max" }, { v: "1 day", l: "Operator training" }, { v: "US", l: "Stocked spare parts" }],
    pains: [
      { p: "Long co-packer lead times", f: "Bring stick packs in-house on a line one operator can run." },
      { p: "Fine powders that dust and bridge", f: "Auger fillers with agitators and dust extraction." },
      { p: "Retail-ready cartons by hand", f: "Automatic counting and cartoning at end of line." }
    ],
    line: ["quickstick", "cartomate", "casemaster"],
    case: "supplement-stickpack",
    faqs: [
      { q: "How many lanes do I need?", a: "Most brands start with 4 lanes (about 240 sticks per minute). We'll size it to your volume." },
      { q: "Can it run liquids too?", a: "Yes, with a piston or pump filler in place of the auger." },
      { q: "Is the machine GMP-ready?", a: "Product-contact parts are 316 stainless with documentation available." }
    ]
  },
  pharma: {
    label: "Pharmaceutical", icon: "pill",
    headline: ["Validated lines.", "Documented right."],
    sub: "Cartoning, labeling and capping built for GMP environments, with the paperwork your QA team expects.",
    stats: [{ v: "21 CFR 11", l: "Audit trail option" }, { v: "IQ/OQ", l: "Docs available" }, { v: "300", l: "Containers / min" }],
    pains: [
      { p: "Validation slows every project", f: "IQ/OQ protocols and FAT documentation delivered with the machine." },
      { p: "Serialization requirements", f: "Print-and-verify stations ready for DSCSA data." },
      { p: "Label errors and recalls", f: "Vision verification on every label, with reject confirmation." }
    ],
    line: ["capvantage", "labelease", "cartomate"],
    case: null,
    faqs: [
      { q: "Do you provide FAT at your facility?", a: "Yes. Factory acceptance testing is standard on pharma projects." },
      { q: "Can the HMI log user actions?", a: "We offer 21 CFR Part 11-compliant HMIs with user levels and audit trails." },
      { q: "What materials contact product?", a: "316L stainless and FDA-compliant plastics, with certificates." }
    ]
  },
  cannabis: {
    label: "Cannabis", icon: "cannabis",
    headline: ["Compliant packs.", "Consistent weights."],
    sub: "Weighing, pouch filling and labeling for flower, pre-rolls and edibles. Built to meet state packaging rules.",
    stats: [{ v: "± 0.1 g", l: "Weighing accuracy" }, { v: "CR", l: "Child-resistant pouches" }, { v: "1 operator", l: "Per cell" }],
    pains: [
      { p: "Hand-weighing every eighth", f: "Multihead weighing gentle enough for flower, accurate to a tenth of a gram." },
      { p: "Changing state labeling rules", f: "Print-and-apply labeling you can update from the HMI." },
      { p: "Child-resistant packaging", f: "RapidBagger fills and seals CR zipper pouches." }
    ],
    line: ["sensiweigh", "rapidbagger", "labelease"],
    case: null,
    faqs: [
      { q: "Will the weigher damage flower?", a: "We use low-drop buckets and slow vibratory feed settings tuned for flower." },
      { q: "Can it fill pre-rolls or tubes?", a: "Yes. Ask about counting and tube-filling options." },
      { q: "Do you handle edibles?", a: "Yes. Gummies and chocolates run on the same weigher with different recipes." }
    ]
  }
};
