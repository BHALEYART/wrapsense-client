/* Generic product-category page for any machine family. Data-driven from
   window.WS_MACHINES + window.WS_FAMILY_EXTRAS. Rendered by family-<slug>.html. */

const { useState: useStateF } = React;

/* ---------- Family tab strip (cross-nav across all 10 families) ---------- */
function FamilyTabs({ current }) {
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid var(--ws-steel-200)", position: "sticky", top: 72, zIndex: 30 }}>
      <Container style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto", padding: "0 32px" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700, whiteSpace: "nowrap", paddingRight: 10 }}>
          Families
        </span>
        {window.WS_MACHINES.map(m => {
          const active = m.slug === current;
          return (
            <a key={m.slug} href={active ? "#top" : window.WS_FAMILY_HREF(m.slug)}
               style={{
                 whiteSpace: "nowrap", padding: "18px 14px", textDecoration: "none",
                 fontFamily: "var(--ws-font-sans)", fontWeight: 700, fontSize: 12,
                 letterSpacing: "0.1em", textTransform: "uppercase",
                 color: active ? "var(--ws-navy-900)" : "var(--ws-fg-2)",
                 borderBottom: active ? "2px solid var(--ws-blue-500)" : "2px solid transparent"
               }}>
              {m.name}
            </a>
          );
        })}
      </Container>
    </section>
  );
}

/* ---------- Hero ---------- */
function FamilyHero({ m, ex }) {
  return (
    <section style={{ background: "var(--ws-ink-900)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.16 }}/>
      <Container style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 48, alignItems: "center", padding: "84px 0 76px" }} className="fam-hero-grid">
          <div>
            <Eyebrow color="var(--ws-blue-400)">{m.family} · {m.name}</Eyebrow>
            <h1 style={{
              fontFamily: "var(--ws-font-display)", fontWeight: 800,
              fontSize: "clamp(44px, 6vw, 84px)", lineHeight: 0.95,
              textTransform: "uppercase", letterSpacing: "-0.025em",
              margin: "16px 0 20px", color: "#fff"
            }}>{m.name}</h1>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "0 0 28px", lineHeight: 1.55 }}>
              {m.blurb}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button href="contact.html" variant="primary" size="lg" icon="arrow-right">Request a Quote</Button>
              <Button href="#models" variant="outline-light" size="lg">See the Models</Button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 40, flexWrap: "wrap" }}>
              <Stat light value={m.speed.replace(/^Up to /, "")} label="Throughput"/>
              <Stat light value={String(m.models.length)} label={m.models.length === 1 ? "Model" : "Models"}/>
              <Stat light value={String(ex.packages ? ex.packages.length : 1)} label={ex.pkgTitle || "Formats"}/>
            </div>
          </div>
          <div style={{ position: "relative", minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 75% at 55% 45%, rgba(46,122,214,0.42) 0%, rgba(14,25,41,0) 62%)` }}/>
            <img src={m.photo} alt={m.name}
              style={{ position: "relative", width: "88%", maxWidth: 460, height: "auto", objectFit: "contain",
                       filter: "drop-shadow(0 20px 44px rgba(0,0,0,0.5))" }}/>
          </div>
        </div>
      </Container>
      <style>{`@media (max-width: 900px){ .fam-hero-grid{ grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    </section>
  );
}

/* ---------- Applications strip ---------- */
function FamilyApplications({ m }) {
  return (
    <section style={{ background: "var(--ws-steel-50)", borderBottom: "1px solid var(--ws-steel-200)", padding: "28px 0" }}>
      <Container style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Built for</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {m.bestFor.map(a => (
            <span key={a} style={{ padding: "7px 14px", background: "#fff", border: "1px solid var(--ws-steel-200)", borderRadius: 999, fontSize: 13, fontWeight: 600, color: "var(--ws-fg-2)" }}>{a}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Package / format callout ----------
   Shows the catalog's PACKAGE TYPE panel as a drop-in image slot. Pre-filled
   from ex.panelImg when we have the catalog crop; otherwise the user drops the
   screenshot for this series and it persists. Type labels caption it either way. */
function FormatPanel({ m, ex, slug }) {
  if (!ex.packages) return null;
  return (
    <section style={{ background: "#fff", padding: "64px 0 8px" }}>
      <Container>
        <SectionHead eyebrow={ex.pkgLead} title={ex.pkgTitle}/>
        <image-slot
          id={`pkg-${slug}`}
          src={ex.panelImg || ""}
          fit="contain"
          shape="rounded"
          radius="12"
          placeholder={`Drop the ${m.name} “Package Type” panel from the catalog`}
          style={{ display: "block", width: "100%", height: 260, marginTop: 24, background: "var(--ws-steel-50)", border: "1px solid var(--ws-steel-200)", borderRadius: 12 }}
        ></image-slot>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 20 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>{ex.pkgLead}</span>
          {ex.packages.map(p => (
            <span key={p.name} style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", background: m.gradient, color: "#fff", borderRadius: 999, fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.03em" }}>{p.name}</span>
          ))}
        </div>
        <p style={{ fontSize: 15, color: "var(--ws-fg-2)", maxWidth: 640, lineHeight: 1.55, margin: "16px 0 0" }}>{ex.pkgNote}</p>
      </Container>
    </section>
  );
}

/* ---------- Models grid ---------- */
function ModelCard({ m, ex, modelName }) {
  const [h, setH] = useStateF(false);
  const fmt = ex.packages ? ex.packages[0].name : null;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", background: "#fff",
        border: h ? "1px solid var(--ws-navy-900)" : "1px solid var(--ws-steel-200)",
        borderRadius: 6, overflow: "hidden", transition: "border-color 120ms var(--ws-ease-standard)" }}>
      <div style={{ position: "relative", height: 190, background: m.gradient, overflow: "hidden" }}>
        <img src={(window.WS_MODEL_PHOTOS || {})[modelName] || m.photo} alt={modelName} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          padding: "24px 22px 20px", objectFit: "contain", objectPosition: "center bottom",
          pointerEvents: "none", transition: "transform 320ms var(--ws-ease-emph)",
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.26))",
          transform: h ? "scale(1.05)" : "none"
        }}/>
        {fmt && <span style={{ position: "absolute", top: 14, right: 16, display: "inline-flex", padding: "5px 11px", background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 999, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>{fmt}</span>}
      </div>
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 22, textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0, lineHeight: 1.05 }}>{modelName}</h3>
        <a href="contact.html" style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 12, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: h ? "var(--ws-blue-500)" : "var(--ws-navy-900)", textDecoration: "none" }}>
          Get a quote <WSIcon name="arrow-right" size={14}/>
        </a>
      </div>
    </div>
  );
}

function ModelsGrid({ m, ex }) {
  return (
    <section id="models" style={{ background: "var(--ws-steel-50)", padding: "80px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
      <Container>
        <SectionHead eyebrow="The models" title={`Pick your ${m.name}`} sub={m.tagline}
          right={<Button href="machines.html" variant="outline" size="md">See all 10 families</Button>}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 44 }} className="fam-model-grid">
          {m.models.map(name => <ModelCard key={name} m={m} ex={ex} modelName={name}/>)}
        </div>
      </Container>
      <style>{`
        @media (max-width: 1080px){ .fam-model-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px){ .fam-model-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ---------- Specs + features ---------- */
function SpecsFeatures({ m }) {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <Container>
        <SectionHead eyebrow="Specs & features" title="What you're getting"/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40, marginTop: 48, alignItems: "start" }} className="fam-sf-grid">
          <div style={{ border: "2px solid var(--ws-blue-500)", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
            <div style={{ background: "var(--ws-navy-900)", color: "#fff", padding: "14px 22px", fontFamily: "var(--ws-font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              {m.name} — key specs
            </div>
            {m.specs.map((s, i) => (
              <div key={s.k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 22px", borderTop: i ? "1px solid var(--ws-steel-200)" : "none", background: i % 2 ? "var(--ws-steel-50)" : "#fff" }}>
                <span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>{s.k}</span>
                <span style={{ fontFamily: "var(--ws-font-mono)", fontSize: 14, color: "var(--ws-ink-900)", textAlign: "right" }}>{s.v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {m.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--ws-run-100)", color: "var(--ws-run-500)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <WSIcon name="check" size={15}/>
                  </span>
                  <span style={{ fontSize: 16, color: "var(--ws-fg-1)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <style>{`@media (max-width: 860px){ .fam-sf-grid{ grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    </section>
  );
}

/* ---------- Services & Support (shared, mirrors the catalog) ---------- */
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
            <div key={it.t} style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: 28, alignItems: "start" }} className="fam-svc-row">
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
      <style>{`@media (max-width: 560px){ .fam-svc-row{ grid-template-columns: 64px 1fr !important; gap: 18px !important; } }`}</style>
    </section>
  );
}

/* ---------- Page ---------- */
function FamilyPage({ slug }) {
  const m = window.WS_MACHINES.find(x => x.slug === slug);
  const ex = window.WS_FAMILY_EXTRAS[slug] || {};
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{ "servicesTone": "blue" }/*EDITMODE-END*/);
  if (!m) return <Page current="machines.html"><Container style={{ padding: "120px 32px" }}>Unknown machine family.</Container></Page>;
  return (
    <Page current="machines.html">
      <a id="top"></a>
      <FamilyHero m={m} ex={ex}/>
      <FamilyTabs current={slug}/>
      <FamilyApplications m={m}/>
      <FormatPanel m={m} ex={ex} slug={slug}/>
      <ModelsGrid m={m} ex={ex}/>
      <SpecsFeatures m={m}/>
      <ServicesSupport tone={t.servicesTone}/>
      <CtaBand/>
      <TweaksPanel>
        <TweakSection label={`${m.name} page`}/>
        <TweakRadio label="Services band" value={t.servicesTone}
          options={[{ value: "blue", label: "Brand blue" }, { value: "navy", label: "Navy" }]}
          onChange={(v) => setTweak("servicesTone", v)}/>
      </TweaksPanel>
    </Page>
  );
}

window.FamilyPage = FamilyPage;
