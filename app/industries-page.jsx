/* Industries landing — 15 categories, each with its servicing machines */

const { useState: useStateI, useEffect: useEffectI } = React;

function IndustriesPage() {
  const [active, setActive] = useStateI(null);

  useEffectI(() => {
    // scroll to hash on load
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <Page current="industries.html">
      {/* HEADER */}
      <section style={{ background: "var(--ws-ink-900)", color: "#fff", padding: "96px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.18 }}/>
        <Container style={{ position: "relative" }}>
          <Eyebrow color="var(--ws-blue-400)">Industries we serve</Eyebrow>
          <h1 style={{
            fontFamily: "var(--ws-font-display)", fontWeight: 800,
            fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95,
            textTransform: "uppercase", margin: "16px 0 16px", color: "#fff",
            letterSpacing: "-0.025em", maxWidth: 1000
          }}>If you make it, <span style={{ color: "var(--ws-blue-400)" }}>we can pack it.</span></h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", maxWidth: 720, margin: "0 0 40px", lineHeight: 1.5 }}>
            From artisan bakery to GMP pharmaceutical &mdash; eighteen product categories, ten machine families, all integrated and serviced stateside.
          </p>
          {/* Index strip */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {window.WS_INDUSTRIES.map(ind => (
              <a key={ind.slug} href={`#${ind.slug}`} style={{
                padding: "8px 14px", border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)", textDecoration: "none", borderRadius: 999,
                fontSize: 12, letterSpacing: "0.08em", fontWeight: 600,
                transition: "all 120ms var(--ws-ease-standard)"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "var(--ws-ink-900)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>
                {ind.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* INDUSTRY BLOCKS */}
      <section style={{ background: "var(--ws-paper)" }}>
        {window.WS_INDUSTRIES.map((ind, i) => (
          <IndustryBlock key={ind.slug} ind={ind} alt={i % 2 === 1}/>
        ))}
      </section>

      <CtaBand/>
    </Page>
  );
}

function IndustryBlock({ ind, alt }) {
  const machineSlugs = window.WS_INDUSTRY_TO_MACHINES[ind.label] || [];
  const machines = machineSlugs.map(s => window.WS_MACHINES.find(m => m.slug === s)).filter(Boolean);
  return (
    <div id={ind.slug} style={{
      borderTop: "1px solid var(--ws-steel-200)",
      background: alt ? "var(--ws-steel-50)" : "var(--ws-paper)",
      padding: "96px 0", scrollMarginTop: 72
    }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "flex-start" }} className="ws-detail-cols">
          <div style={{ position: "sticky", top: 96 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 88, height: 88, background: "var(--ws-navy-900)", color: "#fff", marginBottom: 24, borderRadius: 4 }}>
              <WSIcon name={ind.icon} size={48}/>
            </div>
            <Eyebrow>{machines.length} {machines.length === 1 ? "Machine" : "Machines"}</Eyebrow>
            <h2 style={{
              fontFamily: "var(--ws-font-display)", fontWeight: 800,
              fontSize: 52, lineHeight: 1.02, textTransform: "uppercase",
              margin: "12px 0 16px", color: "var(--ws-ink-900)", letterSpacing: "-0.02em"
            }}>{ind.label}</h2>
            <p style={{ fontSize: 16, color: "var(--ws-fg-2)", margin: "0 0 24px", lineHeight: 1.55 }}>
              {INDUSTRY_BLURBS[ind.slug] || `WrapSense builds packaging machinery purpose-fit for ${ind.label.toLowerCase()} — sanitary, fast, and serviceable from day one.`}
            </p>
            <Button href="contact.html" variant="primary" icon="arrow-right">Spec a {ind.label.split(/[\/,&]/)[0].trim()} line</Button>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700, marginBottom: 20 }}>
              Recommended machines
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="ws-grid-2">
              {machines.map(m => (
                <a key={m.slug} href={`machine.html?slug=${m.slug}`} style={{
                  background: "#fff", border: "1px solid var(--ws-steel-200)",
                  textDecoration: "none", color: "var(--ws-ink-900)",
                  display: "flex", flexDirection: "column", overflow: "hidden",
                  transition: "border-color 120ms var(--ws-ease-standard)"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--ws-navy-900)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--ws-steel-200)"}>
                  <div style={{ position: "relative", height: 160, background: m.gradient, overflow: "hidden" }}>
                    <img src={m.photo} alt={m.name} style={{
                      position: "absolute", bottom: "-2%", left: "50%", transform: "translateX(-50%)",
                      width: "115%", height: "auto", objectFit: "contain"
                    }}/>
                    <div style={{ position: "absolute", top: 12, left: 16, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>{m.family}</div>
                  </div>
                  <div style={{ padding: "20px 20px 22px" }}>
                    <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 26, textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1 }}>{m.name}</div>
                    <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-fg-3)", marginTop: 8 }}>{m.speed}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .ws-detail-cols { grid-template-columns: 1fr !important; }
            .ws-detail-cols > div:first-child { position: static !important; }
            .ws-grid-2 { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Container>
    </div>
  );
}

const INDUSTRY_BLURBS = {
  bakery:      "Soft and crusty, hot or cold, single-serve to multi-pack. Our flow-wrappers and cartoners handle bakery formats from bread loaves to clamshell muffins without crushing.",
  candy:       "High speed, hot fill, tricky shapes. We've packed everything from individually-wrapped truffles to bulk gummies, and we know how to keep the line from sticking.",
  fresh:       "Cool conditions, fast lines, and HACCP-compliant stainless. From clamshell strawberries to vacuum-packed greens.",
  snacks:      "Multihead weighing into pillow bags, gusset bags, or rigid cartons. Combination logic that keeps giveaway under 1%.",
  meat:        "Stainless, washdown, USDA-friendly. Sealed packs, MAP gas flushing, and tray sealing for protein lines.",
  coffee:      "Whole bean, ground, single-serve sticks, or pre-made pouches. One-way valve installation included on our pouch and bag lines.",
  frozen:      "IQF-friendly conveyors, cold-room rated controls, and bagging that handles loose-flow frozen vegetables, fruit, and proteins.",
  natural:     "Compostable and recycled-content films, low-temp sealing, gentle product handling for organic certification.",
  pet:         "Heavy-duty bagging for kibble, treats, and supplements. Multi-wall paper, gusset, or stand-up pouch — at speeds that keep the line full.",
  supplements: "Stick packs, blister cartons, bottles, and pouches. Track-and-trace ready for FDA and supplement-facts compliance.",
  pharma:      "GMP construction, validation packages, 21 CFR Part 11 audit trails, serialization output for DSCSA.",
  personal:    "Bottle filling, capping, labeling — front-back, wrap, or top. Pump heads, trigger sprayers, lotion pumps all handled.",
  medical:     "Cleanroom-compatible packaging, sterile barrier systems, peelable seals for medical device pouches.",
  cannabis:    "State-compliant child-resistant packaging, tamper-evident sealing, and odor-control bagging for flower and edibles.",
  contract:    "Built for co-packers: fast changeover, random-size handling, OEE dashboards, recipe library for 100+ SKUs per line."
};

window.IndustriesPage = IndustriesPage;
