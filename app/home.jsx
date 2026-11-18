/* Homepage. Composed of: Hero, Stats strip, Industries, Machine families, Pillars, Quote CTA */

const { useState: useStateH, useEffect: useEffectH, useMemo: useMemoH } = React;

/* ---------- HERO ---------- */
const Hero = ({ tweak }) => {
  const featured = window.WS_MACHINES.find((m) => m.slug === (tweak.heroMachine || "triservo")) || window.WS_MACHINES[0];
  const style = tweak.heroStyle || "split";

  const Copy = ({ light = false }) =>
  <div style={{ maxWidth: 620 }}>
      <h1 style={{
      fontFamily: "var(--ws-font-display)", fontWeight: 800,

      lineHeight: 0.95, letterSpacing: "-0.025em",
      textTransform: "uppercase",
      margin: "0 0 24px",
      color: light ? "#fff" : "var(--ws-ink-900)", fontSize: "48px"
    }}>
        Packaging<br />machinery,<br />
        <span style={{
        color: "rgb(240, 0, 0)"
      }}>built for small &amp; medium-sized enterprises.</span>
      </h1>
      <p style={{
      fontFamily: "var(--ws-font-sans)", fontSize: 20, lineHeight: 1.5,
      color: light ? "rgba(255,255,255,0.85)" : "var(--ws-fg-2)",
      margin: "0 0 36px", maxWidth: 540
    }}>
        Ten machine families. Assembled, integrated, and serviced stateside. For the people who actually have to run them.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Button href="machines.html" variant={light ? "inverse" : "primary"} size="lg" icon="arrow-right">See the Machines</Button>
        <Button href="contact.html" variant={light ? "outline-light" : "outline"} size="lg">Request a Quote</Button>
      </div>
    </div>;


  if (style === "dark") {
    return (
      <section style={{
        position: "relative", background: "var(--ws-ink-900)", overflow: "hidden",
        minHeight: 720
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(105deg, rgba(11,15,23,0.96) 0%, rgba(11,15,23,0.85) 45%, rgba(11,15,23,0.25) 75%, rgba(11,15,23,0.6) 100%), url(${featured.photo})`,
          backgroundSize: "cover", backgroundPosition: "center right"
        }} />
        <Container style={{ position: "relative", padding: "120px 32px 100px" }}>
          <Copy light />
        </Container>
        <StatsStrip dark />
      </section>);

  }

  if (style === "flat") {
    return (
      <section style={{ background: "var(--ws-navy-900)", color: "#fff" }}>
        <Container style={{ padding: "120px 32px 100px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "center" }} className="ws-hero-grid">
          <Copy light />
          <div style={{ position: "relative", minHeight: 420 }}>
            <div style={{
              position: "absolute", inset: 0,
              background: featured.gradient,
              borderRadius: 6, overflow: "hidden"
            }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${featured.photo})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
          </div>
        </Container>
        <StatsStrip dark />
      </section>);

  }

  /* Default: split — light copy left, machine cinematic panel right */
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid var(--ws-steel-200)" }}>
      <Container style={{ padding: "96px 32px 0", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }} className="ws-hero-grid">
        <div style={{ paddingBottom: 96 }}>
          <Copy />
          <div style={{ marginTop: 56, display: "flex", gap: 40, flexWrap: "wrap" }}>
            <Stat label="Machine families" value="10" />
            <Stat label="Industries served" value="18+" />
            <Stat label="Service" value="Backed" />
            <Stat label="Support" value="24/7" />
          </div>
        </div>
        <div style={{ alignSelf: "stretch", display: "flex" }}>
          <HeroMachinePanel machine={featured} />
        </div>
      </Container>
      <style>{`
        @media (max-width: 960px) {
          .ws-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 64px 24px 0 !important; }
        }
      `}</style>
    </section>);

};

const StatsStrip = ({ dark = false }) =>
<div style={{
  background: dark ? "rgba(0,0,0,0.4)" : "var(--ws-ink-900)",
  borderTop: dark ? "1px solid rgba(255,255,255,0.08)" : "none",
  color: "#fff", position: "relative"
}}>
    <Container style={{ padding: "28px 32px", display: "flex", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
      {[
    ["10", "Machine families"],
    ["18+", "Industries served"],
    ["50+", "US-stocked spares"],
    ["24/7", "Emergency support"],
    ["Backed", "With service"]].
    map(([v, l]) =>
    <div key={l} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 28, color: "#fff" }}>{v}</div>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{l}</div>
        </div>
    )}
    </Container>
  </div>;


const HeroMachinePanel = ({ machine }) =>
<a href={`machine.html?slug=${machine.slug}`} style={{
  position: "relative", flex: 1, minHeight: 560,
  background: machine.gradient,
  borderTopLeftRadius: 6, borderTopRightRadius: 6,
  overflow: "hidden",
  textDecoration: "none", color: "#fff",
  display: "flex", flexDirection: "column", justifyContent: "space-between"
}}>
    {/* Machine photo positioned to show the machine, hiding the bleeding text */}
    <img src={machine.photo} alt={machine.name} style={{
    position: "absolute",
    bottom: "-2%", left: "50%", transform: "translateX(-50%)",
    width: "115%", maxWidth: "none", height: "auto",
    objectFit: "contain", pointerEvents: "none"
  }} />
    {/* Top meta */}
    <div style={{ position: "relative", padding: "28px 32px", display: "flex", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Featured family</div>
        <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 36, textTransform: "uppercase", marginTop: 4 }}>{machine.name}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff", fontWeight: 600, padding: "8px 14px", background: "rgba(0,0,0,0.25)", borderRadius: 999, alignSelf: "flex-start", backdropFilter: "blur(4px)" }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ws-run-500)", boxShadow: "0 0 0 3px rgba(31,146,84,0.3)" }} />
        In production
      </div>
    </div>
    {/* Bottom meta — sits over machine */}
    <div style={{ position: "relative", padding: "24px 32px 28px", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)" }}>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", maxWidth: 360, marginBottom: 16, lineHeight: 1.5 }}>{machine.tagline}</div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Family</div>
          <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 14, color: "#fff", marginTop: 2 }}>{machine.family}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Throughput</div>
          <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 14, color: "#fff", marginTop: 2 }}>{machine.speed}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>
          View {machine.name} <WSIcon name="arrow-right" size={16} />
        </div>
      </div>
    </div>
  </a>;


/* ---------- INDUSTRIES GRID ---------- */
const IndustriesGrid = ({ tweak }) => {
  const style = tweak.categoryStyle || "icon-label";
  return (
    <section style={{ background: "var(--ws-paper)", padding: "112px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
      <Container>
        <SectionHead
          eyebrow="Built for your product"
          title={<>Optimizing the right line <span style={{ color: "var(--ws-blue-500)" }}>for your business</span>.</>}
          sub="Eighteen product categories. The machines we integrate run them every day — from artisan bakery to GMP pharma."
          right={<Button href="industries.html" variant="ghost" icon="arrow-right">See all industries</Button>} />
        
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "var(--ws-steel-200)", border: "1px solid var(--ws-steel-200)" }} className="ws-ind-grid">
          {window.WS_INDUSTRIES.map((ind) =>
          <IndustryTile key={ind.slug} ind={ind} style={style} />
          )}
        </div>
      </Container>
      <style>{`
        @media (max-width: 980px) { .ws-ind-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) { .ws-ind-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>);

};

const IndustryTile = ({ ind, style }) => {
  const [hover, setHover] = useStateH(false);
  const count = window.WS_INDUSTRY_TO_MACHINES[ind.label]?.length || 0;
  return (
    <a href={`industries.html#${ind.slug}`}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      background: hover ? "var(--ws-navy-900)" : "#fff",
      color: hover ? "#fff" : "var(--ws-navy-900)",
      padding: "36px 24px 28px", textDecoration: "none",
      display: "flex", flexDirection: "column", alignItems: style === "label-only" ? "flex-start" : "center",
      gap: 16, minHeight: 200, position: "relative",
      transition: "all 180ms var(--ws-ease-standard)"
    }}>
      {style !== "label-only" &&
      <div style={{ color: hover ? "var(--ws-blue-400)" : "var(--ws-navy-900)" }}>
          <WSIcon name={ind.icon} size={44} />
        </div>
      }
      <div style={{
        fontFamily: "var(--ws-font-sans)", fontWeight: 700,
        fontSize: style === "label-only" ? 22 : 15,
        lineHeight: 1.25,
        textAlign: style === "label-only" ? "left" : "center",
        marginTop: style === "label-only" ? "auto" : 0,
        flex: style === "label-only" ? 1 : 0,
        display: "flex", alignItems: style === "label-only" ? "flex-end" : "flex-start"
      }}>{ind.label}</div>
      <div style={{
        position: "absolute", top: 18, right: 18,
        fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
        fontWeight: 700,
        color: hover ? "var(--ws-blue-400)" : "var(--ws-fg-3)"
      }}>{count} {count === 1 ? "Machine" : "Machines"}</div>
    </a>);

};

/* ---------- MACHINE EXPLORER ---------- */
const FAMILY_GLOW_HOME = {
  flow: "rgba(56,178,172,0.55)", vffs: "rgba(46,122,214,0.55)", weigh: "rgba(110,231,183,0.50)",
  case: "rgba(56,178,172,0.50)", erector: "rgba(132,204,22,0.50)", carton: "rgba(217,70,239,0.45)",
  stick: "rgba(249,115,22,0.50)", pouch: "rgba(192,38,211,0.45)", label: "rgba(56,178,172,0.50)", cap: "rgba(168,85,247,0.45)"
};
const GLOW_PRESETS_HOME = {
  family: null,
  teal: "rgba(56,178,172,0.55)", blue: "rgba(46,122,214,0.55)", cyan: "rgba(34,211,238,0.55)",
  mint: "rgba(110,231,183,0.50)", amber: "rgba(245,158,11,0.55)", orange: "rgba(249,115,22,0.55)",
  red: "rgba(220,38,38,0.50)", purple: "rgba(168,85,247,0.50)", magenta: "rgba(217,70,239,0.50)",
  white: "rgba(255,255,255,0.18)"
};
const MachineExplorer = ({ tweak }) => {
  const variant = tweak.machineCardStyle || "gradient";
  const glowKey = tweak.machineGlow || "family";
  const [active, setActive] = useStateH("triservo");
  const machines = window.WS_MACHINES;
  const m = machines.find((x) => x.slug === active);
  const preset = GLOW_PRESETS_HOME[glowKey];
  const glow = preset !== null && preset !== undefined
    ? preset
    : (FAMILY_GLOW_HOME[m.category] || "rgba(56,178,172,0.55)");
  return (
    <section style={{ background: "var(--ws-ink-900)", padding: "112px 0", color: "#fff" }}>
      <Container>
        <SectionHead
          eyebrow={<span style={{ color: "var(--ws-blue-400)" }}>Ten families · one partner</span>}
          title={<><span style={{ color: "#fff" }}>Machines designed for modularity</span><br /><span style={{ color: "var(--ws-blue-400)" }}>and expansion — not just single machines.</span></>}
          sub={<span style={{ color: "rgba(255,255,255,0.7)" }}>Ten machine families, curated by us — vetted, integrated, and supported for the long haul. Click a family to see what's inside.</span>}
          right={<Button href="machines.html" variant="outline-light" icon="arrow-right">All 10 families</Button>} />
        
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "320px 1fr", gap: 32 }} className="ws-explorer-grid">
          {/* Left: family list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {machines.map((mac) => {
              const isActive = mac.slug === active;
              return (
                <button key={mac.slug} onClick={() => setActive(mac.slug)} style={{
                  textAlign: "left", padding: "18px 20px", background: "transparent",
                  border: "none", borderLeft: isActive ? "3px solid var(--ws-blue-400)" : "3px solid transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer", color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  transition: "all 120ms var(--ws-ease-standard)",
                  display: "flex", flexDirection: "column", gap: 4
                }}
                onMouseEnter={(e) => {if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)";}}
                onMouseLeave={(e) => {if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.55)";}}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 700, fontSize: 22, textTransform: "uppercase", letterSpacing: "0.02em" }}>{mac.name}</div>
                    {isActive && <WSIcon name="arrow-right" size={16} />}
                  </div>
                  <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, opacity: 0.8 }}>{mac.family}</div>
                </button>);

            })}
          </div>
          {/* Right: featured machine card */}
          <div style={{
            position: "relative", overflow: "hidden", borderRadius: 6,
            background: variant === "spotlight" ? "#0E1929" : m.gradient,
            border: variant === "spotlight" ? "1px solid rgba(255,255,255,0.08)" : "none",
            minHeight: 560, display: "flex", flexDirection: "column"
          }}>
            {variant === "spotlight" &&
            <React.Fragment>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at 50% -5%, ${glow} 0%, rgba(14,25,41,0) 60%)`, pointerEvents: "none" }}/>
              <img src={m.photo} alt={m.name} style={{
                position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
                width: "82%", height: "auto", objectFit: "contain", pointerEvents: "none",
                filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.5))"
              }} />
            </React.Fragment>
            }
            {variant === "gradient" &&
            <img src={m.photo} alt={m.name} style={{
              position: "absolute", bottom: "-2%", left: "50%", transform: "translateX(-50%)",
              width: "112%", height: "auto", objectFit: "contain", pointerEvents: "none"
            }} />
            }
            {variant === "white" &&
            <div style={{ position: "absolute", inset: "auto 0 0 0", height: "65%", background: "#fff" }}>
                <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom" }} />
              </div>
            }
            <div style={{ position: "relative", padding: "36px 40px 24px", color: "#fff" }}>
              <Eyebrow color="rgba(255,255,255,0.75)">{m.family}</Eyebrow>
              <h3 style={{
                fontFamily: "var(--ws-font-display)", fontWeight: 800,
                fontSize: 64, lineHeight: 1, margin: "12px 0 16px",
                textTransform: "uppercase", letterSpacing: "-0.02em"
              }}>{m.name}</h3>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", margin: 0, maxWidth: 480, lineHeight: 1.5 }}>{m.tagline}</p>
            </div>
            <div style={{ position: "relative", marginTop: "auto", padding: "24px 40px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 60%)" }}>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                <SpecMini k="Throughput" v={m.speed} />
                <SpecMini k="Models" v={m.models.length} />
                <SpecMini k="Industries" v={m.bestFor.length} />
              </div>
              <Button href={`machine.html?slug=${m.slug}`} variant="inverse" icon="arrow-right">View {m.name}</Button>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 880px) {
          .ws-explorer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>);

};

const SpecMini = ({ k, v }) =>
<div>
    <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{k}</div>
    <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 14, color: "#fff", marginTop: 4 }}>{v}</div>
  </div>;


/* ---------- PILLARS / WHY US ---------- */
const Pillars = () =>
<section style={{ background: "var(--ws-steel-50)", padding: "112px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
    <Container>
      <SectionHead
      eyebrow="Quality · Value · Service"
      title={<>The Toyota of <br />packaging machinery.</>}
      sub="You don't need a Ferrari on your first packaging machine purchase. You need a Toyota — practical, dependable, and supportable." />
    
      <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="ws-pillars-grid">
        {[
      { icon: "shield", k: "Quality", body: "Built with parts we keep on the shelf — not exotic OEM-only components. Industrial-grade where it matters, sensibly specified everywhere else." },
      { icon: "gauge", k: "Value", body: "Priced to pay back. No paying for features you don't run. Modular options instead of forced bundles — you spec what your line actually needs." },
      { icon: "wrench", k: "Service", body: "US-stocked spares ship same-day. Phone support 24/7. On-site install and operator training offered with every machine we deliver." }].
      map((p, i) =>
      <div key={p.k} style={{
        background: "#fff", border: "1px solid var(--ws-steel-200)",
        padding: 40, position: "relative"
      }}>
            <div style={{
          position: "absolute", top: 0, left: 0, width: 64, height: 4,
          background: "var(--ws-gradient)"
        }} />
            <div style={{ color: "var(--ws-blue-500)" }}>
              <WSIcon name={p.icon} size={36} />
            </div>
            <div style={{ marginTop: 18, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>0{i + 1}</div>
            <h3 style={{
          fontFamily: "var(--ws-font-display)", fontWeight: 800,
          fontSize: 36, lineHeight: 1, textTransform: "uppercase",
          margin: "10px 0 16px", color: "var(--ws-ink-900)"
        }}>{p.k}.</h3>
            <p style={{ fontSize: 15, color: "var(--ws-fg-2)", margin: 0, lineHeight: 1.6 }}>{p.body}</p>
          </div>
      )}
      </div>
      <style>{`
        @media (max-width: 880px) { .ws-pillars-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Container>
  </section>;


/* ---------- LINE INTEGRATION VISUAL ---------- */
const LineFlow = () => {
  const stages = [
  { k: "Weigh", m: "SensiWeigh", slug: "sensiweigh", gradient: "var(--ws-gradient-weigh)" },
  { k: "Form & Fill", m: "FastPack / Triservo", slug: "fastpack", gradient: "var(--ws-gradient-vffs)" },
  { k: "Carton / Pouch", m: "CartoMate / RapidBagger", slug: "cartomate", gradient: "var(--ws-gradient-carton)" },
  { k: "Cap & Label", m: "CapVantage / LabelEase", slug: "labelease", gradient: "var(--ws-gradient-label)" },
  { k: "Case & Erect", m: "CaseMaster / PickN'Pack", slug: "casemaster", gradient: "var(--ws-gradient-case)" }];

  return (
    <section style={{ background: "#fff", padding: "112px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
      <Container>
        <SectionHead
          eyebrow="Full-line capability"
          title={<>A fully integrated line.<br /><span style={{ color: "var(--ws-blue-500)" }}>Turn-key for you.</span></>}
          sub="Start with one machine or the whole line — we'll spec it, integrate it, and stand it up. Every family in the catalog talks to the next over Ethernet/IP or OPC-UA so your line acts like one machine, not five." />
        
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: `repeat(${stages.length}, 1fr)`, gap: 8 }} className="ws-flow-grid">
          {stages.map((s, i) =>
          <a key={s.k} href={`machine.html?slug=${s.slug}`} style={{
            position: "relative", padding: "0 0 24px", textDecoration: "none",
            color: "var(--ws-ink-900)"
          }}>
              <div style={{
              height: 80, background: s.gradient, borderRadius: "4px 4px 0 0",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "var(--ws-font-display)", fontWeight: 800,
              fontSize: 28, textTransform: "uppercase", letterSpacing: "-0.01em",
              position: "relative", overflow: "hidden"
            }}>
                <span style={{ position: "relative", zIndex: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ position: "absolute", inset: 0, opacity: 0.15, mixBlendMode: "overlay", background: "radial-gradient(circle at 30% 30%, #fff 0%, transparent 60%)" }} />
              </div>
              <div style={{ padding: "20px 4px 0" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Stage 0{i + 1}</div>
                <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 700, fontSize: 20, textTransform: "uppercase", marginTop: 8 }}>{s.k}</div>
                <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-fg-3)", marginTop: 4 }}>{s.m}</div>
              </div>
            </a>
          )}
        </div>
        <style>{`
          @media (max-width: 880px) { .ws-flow-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .ws-flow-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </Container>
    </section>);

};

/* ---------- HOMEPAGE ROOT ---------- */
const HOME_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroStyle": "split",
  "heroMachine": "triservo",
  "categoryStyle": "icon-label",
  "machineCardStyle": "gradient",
  "machineGlow": "family",
  "sectionOrder": "default",
  "accent": "#2E7AD6"
} /*EDITMODE-END*/;

function HomePage() {
  const [t, setTweak] = useTweaks(HOME_DEFAULTS);
  // accent override
  useEffectH(() => {
    document.documentElement.style.setProperty("--ws-accent", t.accent);
    document.documentElement.style.setProperty("--ws-blue-500", t.accent);
  }, [t.accent]);

  const sections = {
    hero: <Hero tweak={t} />,
    industries: <IndustriesGrid tweak={t} />,
    machines: <MachineExplorer tweak={t} />,
    line: <LineFlow />,
    pillars: <Pillars />,
    cta: <CtaBand />
  };
  const orders = {
    default: ["hero", "industries", "machines", "line", "pillars", "cta"],
    "machines-first": ["hero", "machines", "industries", "line", "pillars", "cta"],
    "pillars-up": ["hero", "pillars", "industries", "machines", "line", "cta"],
    "compact": ["hero", "industries", "machines", "cta"]
  };
  const order = orders[t.sectionOrder] || orders.default;

  return (
    <Page current="">
      {order.map((k) => <React.Fragment key={k}>{sections[k]}</React.Fragment>)}
      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.heroStyle}
        options={[{ value: "split", label: "Split" }, { value: "dark", label: "Cinematic" }, { value: "flat", label: "Flat navy" }]}
        onChange={(v) => setTweak("heroStyle", v)} />
        <TweakSelect label="Featured machine" value={t.heroMachine}
        options={window.WS_MACHINES.map((m) => ({ value: m.slug, label: `${m.name} — ${m.family}` }))}
        onChange={(v) => setTweak("heroMachine", v)} />
        <TweakSection label="Industries grid" />
        <TweakRadio label="Tile style" value={t.categoryStyle}
        options={[{ value: "icon-label", label: "Icons" }, { value: "label-only", label: "Labels" }]}
        onChange={(v) => setTweak("categoryStyle", v)} />
        <TweakSection label="Machine showcase" />
        <TweakSelect label="Card style" value={t.machineCardStyle}
        options={[{ value: "spotlight", label: "Spotlight (dark + glow)" }, { value: "gradient", label: "Family gradient" }, { value: "white", label: "White base" }]}
        onChange={(v) => setTweak("machineCardStyle", v)} />
        {t.machineCardStyle === "spotlight" &&
          <TweakSelect label="Glow color" value={t.machineGlow}
            options={[
              { value: "family",  label: "Per family (default)" },
              { value: "blue",    label: "Brand blue" },
              { value: "teal",    label: "Teal" },
              { value: "cyan",    label: "Cyan" },
              { value: "mint",    label: "Mint" },
              { value: "amber",   label: "Amber" },
              { value: "orange",  label: "Orange" },
              { value: "red",     label: "Red" },
              { value: "purple",  label: "Purple" },
              { value: "magenta", label: "Magenta" },
              { value: "white",   label: "Mono / white" }
            ]}
            onChange={(v) => setTweak("machineGlow", v)} />
        }
        <TweakSection label="Layout" />
        <TweakSelect label="Section order" value={t.sectionOrder}
        options={[
        { value: "default", label: "Hero → Industries → Machines → Line → Pillars → CTA" },
        { value: "machines-first", label: "Hero → Machines → Industries → Line → Pillars → CTA" },
        { value: "pillars-up", label: "Hero → Pillars → Industries → Machines → Line → CTA" },
        { value: "compact", label: "Hero → Industries → Machines → CTA (compact)" }]
        }
        onChange={(v) => setTweak("sectionOrder", v)} />
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
        options={["#2E7AD6", "#0E1E3C", "#1CA896", "#E3A008", "#C81E1E"]}
        onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </Page>);

}

window.HomePage = HomePage;