/* Machines index page — grid of all 10 families + industry filter. */

const { useState: useStateM, useMemo: useMemoM } = React;

/* Per-family glow color — keeps the family color story alive but at low intensity. */
const FAMILY_GLOW = {
  flow: "rgba(56,178,172,0.55)",     // teal
  vffs: "rgba(46,122,214,0.55)",     // blue
  weigh: "rgba(110,231,183,0.50)",   // mint
  case: "rgba(56,178,172,0.50)",     // teal
  erector: "rgba(132,204,22,0.50)",  // green
  carton: "rgba(217,70,239,0.45)",   // magenta
  stick: "rgba(249,115,22,0.50)",    // orange
  pouch: "rgba(192,38,211,0.45)",    // purple-magenta
  label: "rgba(56,178,172,0.50)",    // teal
  cap: "rgba(168,85,247,0.45)"       // purple
};

/* Single-color glow presets — applied to ALL cards uniformly when chosen. */
const GLOW_PRESETS = {
  family:  null, // sentinel: use per-family color
  teal:    "rgba(56,178,172,0.55)",
  blue:    "rgba(46,122,214,0.55)",
  cyan:    "rgba(34,211,238,0.55)",
  mint:    "rgba(110,231,183,0.50)",
  amber:   "rgba(245,158,11,0.55)",
  orange:  "rgba(249,115,22,0.55)",
  red:     "rgba(220,38,38,0.50)",
  purple:  "rgba(168,85,247,0.50)",
  magenta: "rgba(217,70,239,0.50)",
  white:   "rgba(255,255,255,0.18)"
};

function MachineGridCard({ m, variant = "gradient", glowKey = "family" }) {
  const [hover, setHover] = useStateM(false);

  if (variant === "spotlight") {
    const preset = GLOW_PRESETS[glowKey];
    const glow = preset !== null && preset !== undefined
      ? preset
      : (FAMILY_GLOW[m.category] || "rgba(56,178,172,0.55)");
    return (
      <a href={window.WS_FAMILY_HREF ? window.WS_FAMILY_HREF(m.slug) : `machine.html?slug=${m.slug}`}
         onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         style={{
           textDecoration: "none", color: "#fff",
           display: "flex", flexDirection: "column",
           background: "#0E1929",
           border: "1px solid rgba(255,255,255,0.06)",
           borderRadius: 8, overflow: "hidden",
           transition: "border-color 160ms var(--ws-ease-standard), transform 200ms var(--ws-ease-standard)",
           ...(hover ? { borderColor: "rgba(255,255,255,0.18)" } : {})
         }}>
        {/* Photo area with radial glow */}
        <div style={{
          position: "relative", height: 280, overflow: "hidden",
          background: `radial-gradient(ellipse 75% 95% at 50% -10%, ${glow} 0%, rgba(14,25,41,0) 60%)`
        }}>
          {/* Subtle bottom-shadow grounding the machine */}
          <div style={{
            position: "absolute", left: "50%", bottom: 16, transform: "translateX(-50%)",
            width: "55%", height: 18, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
            filter: "blur(6px)"
          }}/>
          <img src={m.photo} alt={m.name} style={{
            position: "absolute", top: "50%", left: "50%",
            transform: hover ? "translate(-50%, -50%) scale(1.05)" : "translate(-50%, -50%)",
            width: "82%", height: "82%", objectFit: "contain", pointerEvents: "none",
            transition: "transform 320ms var(--ws-ease-emph)",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))"
          }}/>
          <div style={{ position: "absolute", top: 18, left: 22, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>
            {m.family}
          </div>
          <div style={{ position: "absolute", top: 16, right: 18, padding: "5px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            {m.models.length} {m.models.length === 1 ? "model" : "models"}
          </div>
        </div>
        {/* Title + meta */}
        <div style={{ padding: "8px 28px 28px", display: "flex", flexDirection: "column", gap: 10, textAlign: "center" }}>
          <h3 style={{
            fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 36,
            textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0, lineHeight: 0.95,
            color: "#fff"
          }}>{m.name}</h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.55 }}>{m.tagline}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>Throughput</div>
              <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "#fff", marginTop: 2 }}>{m.speed}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: hover ? "var(--ws-blue-400)" : "#fff" }}>
              View specs <WSIcon name="arrow-right" size={14}/>
            </div>
          </div>
        </div>
      </a>
    );
  }

  /* Original gradient variant */
  return (
    <a href={window.WS_FAMILY_HREF ? window.WS_FAMILY_HREF(m.slug) : `machine.html?slug=${m.slug}`}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       style={{
         textDecoration: "none", color: "var(--ws-ink-900)",
         display: "flex", flexDirection: "column", background: "#fff",
         border: hover ? "1px solid var(--ws-navy-900)" : "1px solid var(--ws-steel-200)",
         overflow: "hidden", transition: "border-color 120ms var(--ws-ease-standard)"
       }}>
      <div style={{
        position: "relative", height: 260, background: m.gradient, overflow: "hidden"
      }}>
        <img src={m.photo} alt={m.name} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          padding: "34px 30px 26px", objectFit: "contain", objectPosition: "center bottom",
          pointerEvents: "none", transition: "transform 320ms var(--ws-ease-emph)",
          filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.28))",
          transform: hover ? "scale(1.04)" : "none"
        }}/>
        <div style={{ position: "absolute", top: 16, left: 20, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
          {m.family}
        </div>
        <div style={{ position: "absolute", top: 16, right: 20, padding: "5px 10px", background: "rgba(0,0,0,0.3)", borderRadius: 999, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>
          {m.models.length} {m.models.length === 1 ? "model" : "models"}
        </div>
      </div>
      <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{
          fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 36,
          textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0, lineHeight: 0.95
        }}>{m.name}</h3>
        <p style={{ fontSize: 14, color: "var(--ws-fg-2)", margin: 0, lineHeight: 1.55 }}>{m.tagline}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--ws-steel-200)" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Throughput</div>
            <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 13, color: "var(--ws-ink-900)", marginTop: 2 }}>{m.speed}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: hover ? "var(--ws-blue-500)" : "var(--ws-navy-900)" }}>
            View specs <WSIcon name="arrow-right" size={14}/>
          </div>
        </div>
      </div>
    </a>
  );
}

const MACHINES_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardStyle": "gradient",
  "glowColor": "family"
}/*EDITMODE-END*/;

function MachinesPage() {
  const [t, setTweakMP] = useTweaks(MACHINES_DEFAULTS);
  const [filter, setFilter] = useStateM("All");
  const filtered = useMemoM(() => {
    if (filter === "All") return window.WS_MACHINES;
    return window.WS_MACHINES.filter(m => m.bestFor.includes(filter));
  }, [filter]);
  const isDark = t.cardStyle === "spotlight";

  return (
    <Page current="machines.html">
      {/* Header */}
      <section style={{ background: "var(--ws-ink-900)", color: "#fff", padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.18 }}/>
        <Container style={{ position: "relative" }}>
          <Eyebrow color="var(--ws-blue-400)">The catalog</Eyebrow>
          <h1 style={{
            fontFamily: "var(--ws-font-display)", fontWeight: 800,
            fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95,
            textTransform: "uppercase", margin: "16px 0 16px", color: "#fff",
            letterSpacing: "-0.025em", maxWidth: 1000
          }}>Ten machine families. <span style={{ color: "var(--ws-blue-400)" }}>Pick the right one.</span></h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", maxWidth: 720, margin: "0 0 32px", lineHeight: 1.5 }}>
            Every machine below is sourced, integrated, and serviced by our team &mdash; final assembly handled stateside. Filter by what you're packing.
          </p>
        </Container>
      </section>

      {/* Filter bar */}
      <section style={{
        background: isDark ? "var(--ws-ink-900)" : "#fff",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--ws-steel-200)",
        position: "sticky", top: 72, zIndex: 30
      }}>
        <Container style={{ padding: "20px 32px", display: "flex", alignItems: "center", gap: 16, overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: isDark ? "rgba(255,255,255,0.55)" : "var(--ws-fg-3)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap" }}>
            <WSIcon name="filter" size={14}/> Filter by industry
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}>
            <Chip dark={isDark} active={filter === "All"} onClick={() => setFilter("All")}>All ({window.WS_MACHINES.length})</Chip>
            {window.WS_INDUSTRIES.map(ind => {
              const count = window.WS_INDUSTRY_TO_MACHINES[ind.label]?.length || 0;
              return (
                <Chip key={ind.slug} dark={isDark} active={filter === ind.label} onClick={() => setFilter(ind.label)}>
                  {ind.label} ({count})
                </Chip>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section style={{ background: isDark ? "var(--ws-ink-900)" : "var(--ws-steel-50)", padding: "64px 0 112px" }}>
        <Container>
          <div style={{ marginBottom: 24, fontSize: 13, color: isDark ? "rgba(255,255,255,0.55)" : "var(--ws-fg-3)", fontFamily: "var(--ws-font-mono)" }}>
            {filtered.length} of {window.WS_MACHINES.length} machine families{filter !== "All" ? ` · serving ${filter}` : ""}
          </div>
          {filtered.length === 0 ? (
            <div style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#fff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--ws-steel-200)", padding: 64, textAlign: "center", color: isDark ? "rgba(255,255,255,0.65)" : "var(--ws-fg-2)" }}>
              No machines match that filter. <a href="contact.html" style={{ color: "var(--ws-blue-400)", textDecoration: "underline" }}>Ask us anyway →</a>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="ws-grid-3">
              {filtered.map(m => <MachineGridCard key={m.slug} m={m} variant={t.cardStyle} glowKey={t.glowColor}/>)}
            </div>
          )}
        </Container>
        <style>{`
          @media (max-width: 980px) { .ws-grid-3 { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 640px) { .ws-grid-3 { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
      <CtaBand/>
      <TweaksPanel>
        <TweakSection label="Machine cards"/>
        <TweakRadio label="Card style" value={t.cardStyle}
          options={[{ value: "spotlight", label: "Spotlight" }, { value: "gradient", label: "Gradient" }]}
          onChange={(v) => setTweakMP("cardStyle", v)}/>
        {t.cardStyle === "spotlight" &&
          <TweakSelect label="Glow color" value={t.glowColor}
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
            onChange={(v) => setTweakMP("glowColor", v)}/>
        }
      </TweaksPanel>
    </Page>
  );
}

function Chip({ children, active, onClick, dark = false }) {
  const styles = dark
    ? {
        border: active ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
        background: active ? "#fff" : "transparent",
        color: active ? "var(--ws-ink-900)" : "rgba(255,255,255,0.75)"
      }
    : {
        border: active ? "1px solid var(--ws-navy-900)" : "1px solid var(--ws-steel-200)",
        background: active ? "var(--ws-navy-900)" : "#fff",
        color: active ? "#fff" : "var(--ws-fg-2)"
      };
  return (
    <button onClick={onClick} style={{
      padding: "8px 14px", ...styles,
      fontFamily: "var(--ws-font-sans)", fontWeight: 600, fontSize: 12,
      letterSpacing: "0.06em", borderRadius: 999, cursor: "pointer",
      whiteSpace: "nowrap", transition: "all 120ms var(--ws-ease-standard)"
    }}>{children}</button>
  );
}

window.MachinesPage = MachinesPage;
window.MachineGridCard = MachineGridCard;
window.Chip = Chip;
