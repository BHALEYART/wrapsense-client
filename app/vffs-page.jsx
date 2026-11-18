/* VFFS / FastPack product-category page (v2). Structure inspired by a product-category
   landing layout, rebuilt entirely in the WrapSense system. */

const { useState: useStateV } = React;

/* ---------- FastPack model data (family specs from data.js; per-model figures below) ---------- */
const FASTPACK = window.WS_MACHINES.find(m => m.slug === "fastpack");

const FP_MODELS = [
  {
    name: "FastPack 43000",
    badge: "Workhorse",
    tag: "Intermittent-motion VFFS for everyday bagging up to 430 mm.",
    motion: "Intermittent",
    bagW: "80–430 mm",
    bagL: "100–450 mm",
    fill: "10 g – 3 kg",
    speed: "Up to 60 bpm",
    pkg: "Pillow",
    blurb: "The everyday FastPack. A single-piece 304 stainless frame, servo film pull-down, and tool-less forming-tube swaps make it the easiest bagger on the floor to run and clean. Pillow, gusset, or block-bottom bags without changing the machine.",
  },
  {
    name: "FastPack 63000",
    badge: "Big bags",
    tag: "Wide-web VFFS for bulk and club-size bags up to 630 mm.",
    motion: "Intermittent",
    bagW: "150–630 mm",
    bagL: "150–500 mm",
    fill: "250 g – 5 kg",
    speed: "Up to 45 bpm",
    pkg: "Pillow",
    blurb: "Heavy-duty tubular frame for the toughest fills — pet food, grains, hop pellets, powders, and polymers. Seals laminate, metalized, and polyethylene film structures up to 24 inches wide.",
  },
  {
    name: "FastPack Pro 430000HS",
    badge: "High speed",
    tag: "Continuous-motion, high-speed VFFS up to 430 mm.",
    motion: "Continuous",
    bagW: "80–430 mm",
    bagL: "100–450 mm",
    fill: "10 g – 2 kg",
    speed: "Up to 90 bpm",
    pkg: "Pillow",
    blurb: "The vertical sealing jaws stay in motion so the film never stops for its back seal — that's how the Pro hits up to 90 bags a minute. Built for retail and club runs where uptime is the whole game.",
  },
  {
    name: "FastPack Pro 530000HS",
    badge: "High speed · wide",
    tag: "Continuous-motion for larger bags at speed, up to 530 mm.",
    motion: "Continuous",
    bagW: "120–530 mm",
    bagL: "120–480 mm",
    fill: "50 g – 4 kg",
    speed: "Up to 75 bpm",
    pkg: "Pillow",
    blurb: "When you need both size and speed. Continuous-motion sealing on a wider web for family-size and food-service bags, MAP-ready with gas flush and zip-track options.",
  },
];

/* Bagging & wrapping families for the top tab switcher. VFFS is the current page. */
const BAGGING_TABS = [
  { slug: "fastpack",    label: "Vertical Form Fill & Seal", family: "FastPack",    current: true },
  { slug: "rapidbagger", label: "Pre-made Pouch",            family: "RapidBagger" },
  { slug: "quickstick",  label: "Stick Pack",                family: "QuickStick" },
  { slug: "triservo",    label: "Flow Wrapping",             family: "Triservo" },
];

/* ---------- Hero ---------- */
function VffsHero() {
  return (
    <section style={{ background: "var(--ws-ink-900)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.16 }}/>
      <Container style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 48, alignItems: "center", padding: "84px 0 76px" }} className="vffs-hero-grid">
          <div>
            <Eyebrow color="var(--ws-blue-400)">Vertical Form Fill &amp; Seal · FastPack</Eyebrow>
            <h1 style={{
              fontFamily: "var(--ws-font-display)", fontWeight: 800,
              fontSize: "clamp(44px, 6vw, 88px)", lineHeight: 0.95,
              textTransform: "uppercase", letterSpacing: "-0.025em",
              margin: "16px 0 20px", color: "#fff"
            }}>Vertical baggers for <span style={{ color: "var(--ws-blue-400)" }}>every footprint &amp; budget.</span></h1>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "0 0 28px", lineHeight: 1.55 }}>
              Form the bag, fill it, seal it &mdash; from a roll of flat film in one continuous motion. FastPack VFFS handles free-flowing product from single-serve to bulk, and every machine is integrated and serviced by our team stateside.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button href="contact.html" variant="primary" size="lg" icon="arrow-right">Request a Quote</Button>
              <Button href="#models" variant="outline-light" size="lg">See the Models</Button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 40, flexWrap: "wrap" }}>
              <Stat light value="90" label="Bags / min (Pro)"/>
              <Stat light value="630mm" label="Max bag width"/>
              <Stat light value="4" label="Models"/>
            </div>
          </div>
          <div style={{
            position: "relative", minHeight: 380,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 75% at 55% 45%, rgba(46,122,214,0.5) 0%, rgba(14,25,41,0) 62%)"
            }}/>
            <img src="assets/machines/cut/fastpack.png" alt="FastPack vertical form fill & seal machine"
              style={{ position: "relative", width: "88%", maxWidth: 460, height: "auto", objectFit: "contain",
                       filter: "drop-shadow(0 20px 44px rgba(0,0,0,0.5))" }}/>
          </div>
        </div>
      </Container>
      <style>{`@media (max-width: 900px){ .vffs-hero-grid{ grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    </section>
  );
}

/* ---------- Bagging tab switcher ---------- */
function BaggingTabs() {
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid var(--ws-steel-200)", position: "sticky", top: 72, zIndex: 30 }}>
      <Container style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", padding: "0 32px" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700, whiteSpace: "nowrap", paddingRight: 12 }}>
          Bagging &amp; wrapping
        </span>
        {BAGGING_TABS.map(tab => (
          <a key={tab.slug} href={tab.current ? "#top" : `family-${tab.slug}.html`}
             style={{
               display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
               padding: "18px 16px", textDecoration: "none",
               fontFamily: "var(--ws-font-sans)", fontWeight: 700, fontSize: 12,
               letterSpacing: "0.1em", textTransform: "uppercase",
               color: tab.current ? "var(--ws-navy-900)" : "var(--ws-fg-2)",
               borderBottom: tab.current ? "2px solid var(--ws-blue-500)" : "2px solid transparent"
             }}>
            {tab.label}
            <span style={{ fontSize: 10, color: "var(--ws-fg-3)", fontWeight: 600 }}>{tab.family}</span>
          </a>
        ))}
      </Container>
    </section>
  );
}

/* ---------- Applications strip ---------- */
function ApplicationsStrip() {
  const apps = ["Coffee & Tea", "Snacks & Confectionery", "Granola & Cereal", "Pet Food & Kibble", "Nutraceuticals", "Frozen Foods", "Grains & Beans", "Natural & Organic", "Hardware & Parts"];
  return (
    <section style={{ background: "var(--ws-steel-50)", borderBottom: "1px solid var(--ws-steel-200)", padding: "28px 0" }}>
      <Container style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Commonly runs</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {apps.map(a => (
            <span key={a} style={{
              padding: "7px 14px", background: "#fff", border: "1px solid var(--ws-steel-200)",
              borderRadius: 999, fontSize: 13, fontWeight: 600, color: "var(--ws-fg-2)"
            }}>{a}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Package type callout ---------- */
function PackageType() {
  return (
    <section style={{ background: "#fff", padding: "64px 0 8px" }}>
      <Container>
        <SectionHead eyebrow="Forms this bag style" title="Package Type"/>
        <image-slot
          id="pkg-fastpack"
          fit="contain"
          shape="rounded"
          radius="12"
          placeholder="Drop the FastPack “Package Type” panel from the catalog"
          style={{ display: "block", width: "100%", height: 260, marginTop: 24, background: "var(--ws-steel-50)", border: "1px solid var(--ws-steel-200)", borderRadius: 12 }}
        ></image-slot>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 20 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Forms this bag style</span>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", background: "var(--ws-gradient-vffs)", color: "#fff", borderRadius: 999, fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.03em" }}>Pillow</span>
        </div>
        <p style={{ marginTop: 16, fontSize: 15, color: "var(--ws-fg-2)", maxWidth: 640, lineHeight: 1.55 }}>
          Every FastPack forms a classic pillow bag &mdash; one vertical back seal with top and bottom horizontal seals. A forming-tube swap changes the bag size; add a gusset plow for gusseted bags.
        </p>
      </Container>
    </section>
  );
}

/* ---------- Model card ---------- */
function ModelCard({ m }) {
  const [h, setH] = useStateV(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", flexDirection: "column", background: "#fff",
        border: h ? "1px solid var(--ws-navy-900)" : "1px solid var(--ws-steel-200)",
        borderRadius: 6, overflow: "hidden", transition: "border-color 120ms var(--ws-ease-standard)"
      }}>
      <div style={{ position: "relative", height: 210, background: "var(--ws-gradient-vffs)", overflow: "hidden" }}>
        <img src={(window.WS_MODEL_PHOTOS || {})[m.name] || "assets/machines/cut/fastpack.png"} alt={m.name} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          padding: "28px 26px 22px", objectFit: "contain", objectPosition: "center bottom",
          pointerEvents: "none", transition: "transform 320ms var(--ws-ease-emph)",
          filter: "drop-shadow(0 9px 20px rgba(0,0,0,0.28))",
          transform: h ? "scale(1.05)" : "none"
        }}/>
        <span style={{ position: "absolute", top: 14, left: 16, padding: "5px 10px", background: "rgba(0,0,0,0.32)", borderRadius: 999, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>{m.badge}</span>
        <span style={{ position: "absolute", top: 14, right: 16, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 999, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>{m.pkg} bag</span>
      </div>
      <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div>
          <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 28, textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0, lineHeight: 1 }}>{m.name}</h3>
          <p style={{ fontSize: 14, color: "var(--ws-fg-2)", margin: "8px 0 0", lineHeight: 1.5 }}>{m.tag}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--ws-steel-200)" }}>
          <div style={{ display: "flex", gap: 22 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Throughput</div>
              <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-ink-900)", marginTop: 2 }}>{m.speed}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Package</div>
              <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-ink-900)", marginTop: 2 }}>{m.pkg}</div>
            </div>
          </div>
          <a href="contact.html" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: h ? "var(--ws-blue-500)" : "var(--ws-navy-900)", textDecoration: "none" }}>
            <WSIcon name="arrow-right" size={14}/>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Unwind the film", d: "A cylindrical roll of flat film feeds up through the machine — no pre-made bags, no changeover between sizes beyond the forming tube." },
    { n: "02", t: "Form over the collar", d: "The film wraps the forming collar (or plow) into a tube. Servo pull-down belts advance it with no clutches and no slip." },
    { n: "03", t: "Vertical back seal", d: "Heated seal bars close on the overlap to seal the back of the bag, forming a continuous tube ready to fill." },
    { n: "04", t: "Fill, seal & cut", d: "Product drops in, the horizontal jaws seal the bottom of one bag and the top of the next, then a knife cuts them apart — finished bag out." },
  ];
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <Container>
        <SectionHead eyebrow="How VFFS works" title="Four moves, one motion" sub="Vertical form, fill and seal turns a roll of film and a stream of product into a finished, sealed bag — top seal, bottom seal, and one vertical back seal — without ever stopping the line."/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 48 }} className="vffs-steps">
          {steps.map((s, i) => (
            <div key={s.n} style={{ position: "relative", padding: "28px 22px", background: "var(--ws-steel-50)", border: "1px solid var(--ws-steel-200)", borderRadius: 6 }}>
              <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-blue-500)", fontWeight: 700, letterSpacing: "0.1em" }}>{s.n}</div>
              <div style={{ height: 4, width: 40, background: "var(--ws-gradient-vffs)", borderRadius: 999, margin: "14px 0 18px" }}/>
              <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 700, fontSize: 22, textTransform: "uppercase", letterSpacing: "0.01em", margin: "0 0 10px", color: "var(--ws-ink-900)" }}>{s.t}</h3>
              <p style={{ fontSize: 14, color: "var(--ws-fg-2)", margin: 0, lineHeight: 1.55 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 980px){ .vffs-steps{ grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px){ .vffs-steps{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ---------- Comparison table ---------- */
function CompareTable() {
  const cols = ["Model", "Motion", "Package", "Max bag width", "Bag length", "Fill range", "Max speed"];
  return (
    <section style={{ background: "var(--ws-steel-50)", padding: "96px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
      <Container>
        <SectionHead eyebrow="Select the model that's right for you" title="Vertical Form, Fill & Seal equipment"/>
        <div style={{ marginTop: 40, overflowX: "auto", border: "2px solid var(--ws-blue-500)", borderRadius: 8, background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
            <thead>
              <tr style={{ background: "var(--ws-navy-900)" }}>
                {cols.map(c => (
                  <th key={c} style={{ textAlign: "left", padding: "16px 20px", fontFamily: "var(--ws-font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FP_MODELS.map((m, i) => (
                <tr key={m.name} style={{ borderTop: "1px solid var(--ws-steel-200)", background: i % 2 ? "var(--ws-steel-50)" : "#fff" }}>
                  <td style={{ padding: "16px 20px", fontFamily: "var(--ws-font-display)", fontWeight: 700, fontSize: 18, textTransform: "uppercase", color: "var(--ws-blue-600)", whiteSpace: "nowrap" }}>{m.name}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--ws-fg-2)" }}>{m.motion}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--ws-fg-2)" }}>{m.pkg}</td>
                  <td style={{ padding: "16px 20px", fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-ink-900)" }}>{m.bagW}</td>
                  <td style={{ padding: "16px 20px", fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-ink-900)" }}>{m.bagL}</td>
                  <td style={{ padding: "16px 20px", fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-ink-900)" }}>{m.fill}</td>
                  <td style={{ padding: "16px 20px", fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-ink-900)", whiteSpace: "nowrap" }}>{m.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--ws-fg-3)", marginTop: 14, lineHeight: 1.5, maxWidth: 760 }}>
          Speeds are mechanical estimates and depend on final bag size, bag type, film structure, product, and application. Actual performance is confirmed through validation on your product.
        </p>
      </Container>
    </section>
  );
}

/* ---------- Model write-ups ---------- */
function ModelWriteups() {
  return (
    <section id="models" style={{ background: "#fff", padding: "96px 0" }}>
      <Container>
        <SectionHead eyebrow="The FastPack family" title="Four baggers, one platform" sub="Same clean 304 stainless frame and servo drive across the line — pick the width and speed your product needs."/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginTop: 48 }} className="vffs-writeups">
          {FP_MODELS.map(m => (
            <div key={m.name} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 20, padding: 22, border: "1px solid var(--ws-steel-200)", borderRadius: 6, background: "var(--ws-steel-50)" }} className="vffs-writeup">
              <div style={{ position: "relative", background: "var(--ws-gradient-vffs)", borderRadius: 4, overflow: "hidden", minHeight: 150 }}>
                <img src={(window.WS_MODEL_PHOTOS || {})[m.name] || "assets/machines/cut/fastpack.png"} alt={m.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: "16px", objectFit: "contain", objectPosition: "center bottom" }}/>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 24, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>{m.name}</h3>
                  <span style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-blue-600)" }}>{m.speed}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--ws-fg-2)", margin: "10px 0 14px", lineHeight: 1.55 }}>{m.blurb}</p>
                <a href="contact.html" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "var(--ws-blue-500)", textDecoration: "none" }}>
                  Request a Quote <WSIcon name="arrow-right" size={14}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px){ .vffs-writeups{ grid-template-columns: 1fr !important; } }
        @media (max-width: 420px){ .vffs-writeup{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ---------- Model grid ---------- */
function ModelGrid() {
  return (
    <section style={{ background: "var(--ws-steel-50)", padding: "80px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
      <Container>
        <SectionHead eyebrow="View our models" title="Pick your FastPack" right={<Button href="machines.html" variant="outline" size="md">See all 10 families</Button>}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 44 }} className="vffs-model-grid">
          {FP_MODELS.map(m => <ModelCard key={m.name} m={m}/>)}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1080px){ .vffs-model-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px){ .vffs-model-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ---------- Services & Support ---------- */
function ServicesSupport({ tone }) {
  const items = [
    { icon: "wrench", t: "Set-Up & Installation", d: "Our team guarantees the accurate assembly of all components and checks for correct electrical and pneumatic connections. When the equipment first runs, we promptly address any adjustments to make sure the machine runs smoothly." },
    { icon: "play", t: "Training & Operation", d: "Learn the ins and outs of your machine — how to operate, run, and change over products. We walk your staff through the machine and run live production with you until you're comfortable running it yourself, so you can troubleshoot and keep it running." },
    { icon: "settings", t: "Preventative Maintenance", d: "Our field service technician reviews the requirements of equipment maintenance and proper sanitation to maintain equipment and component longevity — reducing downtime before it starts." },
  ];
  const bg = tone === "navy" ? "var(--ws-navy-900)" : "var(--ws-blue-500)";
  return (
    <section style={{ background: bg, color: "#fff", padding: "88px 0" }}>
      <Container>
        <Eyebrow color="rgba(255,255,255,0.7)">Quality · Value · Service</Eyebrow>
        <h2 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: "clamp(36px, 4.4vw, 60px)", lineHeight: 1, textTransform: "uppercase", margin: "16px 0 12px", color: "#fff" }}>Services &amp; Support</h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 620, margin: "0 0 52px", lineHeight: 1.55 }}>
          Buying the machine is the start. We install it, train your people, and keep it running.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {items.map(it => (
            <div key={it.t} style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: 28, alignItems: "start" }} className="vffs-svc-row">
              <div style={{ width: 88, height: 88, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <WSIcon name={it.icon} size={34}/>
              </div>
              <div style={{ maxWidth: 780, paddingTop: 6 }}>
                <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 700, fontSize: 26, textTransform: "uppercase", letterSpacing: "0.02em", margin: "0 0 10px", color: "#fff" }}>{it.t}</h3>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.6 }}>{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`@media (max-width: 560px){ .vffs-svc-row{ grid-template-columns: 64px 1fr !important; gap: 18px !important; } }`}</style>
    </section>
  );
}

/* ---------- Testimonial ---------- */
function VffsTestimonial() {
  return (
    <section style={{ background: "var(--ws-ink-900)", color: "#fff", padding: "88px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.12 }}/>
      <Container style={{ position: "relative", maxWidth: 900, textAlign: "center" }}>
        <div style={{ height: 4, width: 56, background: "var(--ws-gradient-vffs)", borderRadius: 999, margin: "0 auto 32px" }}/>
        <blockquote style={{ fontFamily: "var(--ws-font-display)", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.12, letterSpacing: "-0.01em", margin: 0, color: "#fff" }}>
          &ldquo;We went from hand-bagging granola to a FastPack line in under a month. It just runs &mdash; and when we had a question, someone actually picked up the phone. It&rsquo;s a good seal every time.&rdquo;
        </blockquote>
        <div style={{ marginTop: 28, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
          Operations Lead · Regional Snack Co-Packer
          <span style={{ display: "block", marginTop: 6, fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)" }}>Placeholder — swap for a real customer quote</span>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Page ---------- */
const VFFS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "servicesTone": "blue",
  "showModelGrid": true
}/*EDITMODE-END*/;

function VffsPage() {
  const [t, setTweak] = useTweaks(VFFS_DEFAULTS);
  return (
    <Page current="machines.html">
      <a id="top"></a>
      <VffsHero/>
      <BaggingTabs/>
      <ApplicationsStrip/>
      <PackageType/>
      {t.showModelGrid && <ModelGrid/>}
      <HowItWorks/>
      <CompareTable/>
      <ModelWriteups/>
      <ServicesSupport tone={t.servicesTone}/>
      <VffsTestimonial/>
      <CtaBand/>
      <TweaksPanel>
        <TweakSection label="VFFS page"/>
        <TweakRadio label="Services band" value={t.servicesTone}
          options={[{ value: "blue", label: "Brand blue" }, { value: "navy", label: "Navy" }]}
          onChange={(v) => setTweak("servicesTone", v)}/>
        <TweakToggle label="Show model grid" value={t.showModelGrid}
          onChange={(v) => setTweak("showModelGrid", v)}/>
      </TweaksPanel>
    </Page>
  );
}

window.VffsPage = VffsPage;
