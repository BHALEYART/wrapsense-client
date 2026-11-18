/* Shared pieces for landing pages + case studies: responsive photo slots, machine tiles, lead form. */

const { useState: useStateX } = React;

/* Responsive photo slot: width 100%, height from aspect ratio. User drops an image; it fills via object-fit cover. */
const Photo = ({ id, ratio = "16/10", label, dark = false, style }) => (
  <image-slot id={id} fit="cover" placeholder={label}
    style={{ display: "block", width: "100%", aspectRatio: ratio, height: "auto", borderRadius: 6, overflow: "hidden",
      background: dark ? "rgba(255,255,255,0.06)" : "var(--ws-steel-100)",
      border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid var(--ws-steel-200)", ...style }}></image-slot>
);

const getMachine = slug => window.WS_MACHINES.find(m => m.slug === slug);

const MachineTile = ({ slug, compact = false }) => {
  const m = getMachine(slug);
  if (!m) return null;
  return (
    <a href={window.WS_FAMILY_HREF(slug)} className="ws-mtile">
      <div style={{ position: "relative", aspectRatio: compact ? "16/10" : "4/3", background: m.gradient }}>
        <img src={m.photo} alt={m.name} style={{ position: "absolute", inset: "10%", width: "80%", height: "80%", objectFit: "contain" }}/>
        <div style={{ position: "absolute", top: 12, left: 14, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>{m.family}</div>
      </div>
      <div style={{ padding: compact ? "14px 16px" : "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: compact ? 20 : 24, textTransform: "uppercase", lineHeight: 1 }}>{m.name}</div>
          <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-fg-3)", marginTop: 6 }}>{m.speed}</div>
        </div>
        <WSIcon name="arrow-right" size={18}/>
      </div>
    </a>
  );
};

const LeadForm = ({ industry, light = false }) => {
  const [sent, setSent] = useStateX(false);
  const lbl = { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: light ? "var(--ws-fg-3)" : "var(--ws-fg-3)", fontWeight: 700 };
  if (sent) return (
    <div style={{ background: "#fff", border: "1px solid var(--ws-steel-200)", borderRadius: 6, padding: 32 }}>
      <div style={{ width: 44, height: 44, borderRadius: 999, background: "var(--ws-run-100)", color: "var(--ws-run-500)", display: "flex", alignItems: "center", justifyContent: "center" }}><WSIcon name="check" size={22}/></div>
      <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 32, textTransform: "uppercase", margin: "16px 0 8px", color: "var(--ws-ink-900)" }}>Got it.</h3>
      <p style={{ margin: 0, color: "var(--ws-fg-2)", lineHeight: 1.55 }}>A project manager will reply within {window.WS_COMPANY.responseTime} with a machine recommendation.</p>
    </div>
  );
  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ background: "#fff", border: "1px solid var(--ws-steel-200)", borderRadius: 6, padding: 28, display: "grid", gap: 16 }}>
      <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 28, textTransform: "uppercase", lineHeight: 1, color: "var(--ws-ink-900)" }}>Get a line recommendation</div>
      <div className="ws-form-2">
        <label style={{ display: "grid", gap: 6 }}><span style={lbl}>Name *</span><input required style={inputStyle}/></label>
        <label style={{ display: "grid", gap: 6 }}><span style={lbl}>Company *</span><input required style={inputStyle}/></label>
      </div>
      <div className="ws-form-2">
        <label style={{ display: "grid", gap: 6 }}><span style={lbl}>Email *</span><input type="email" required style={inputStyle}/></label>
        <label style={{ display: "grid", gap: 6 }}><span style={lbl}>Phone</span><input style={inputStyle}/></label>
      </div>
      <label style={{ display: "grid", gap: 6 }}><span style={lbl}>Product & package</span><input style={inputStyle} placeholder={industry ? `e.g. ${industry.toLowerCase()} in 12 oz pouches` : ""}/></label>
      <label style={{ display: "grid", gap: 6 }}><span style={lbl}>Target speed</span>
        <select style={inputStyle} defaultValue=""><option value="" disabled>Select</option><option>Under 30 / min</option><option>30–60 / min</option><option>60–120 / min</option><option>120+ / min</option><option>Not sure yet</option></select>
      </label>
      <Button type="submit" variant="primary" size="lg" icon="arrow-right" style={{ justifyContent: "center" }}>Send request</Button>
      <div style={{ fontSize: 13, color: "var(--ws-fg-3)", display: "flex", gap: 8, alignItems: "center" }}><WSIcon name="phone" size={14}/> Or call {window.WS_COMPANY.phone}</div>
    </form>
  );
};

const SiteCSS = () => (
  <style>{`
    img { max-width: 100%; }
    .ws-mtile { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--ws-steel-200); border-radius: 6px; overflow: hidden; text-decoration: none; color: var(--ws-ink-900); transition: border-color 120ms var(--ws-ease-standard); }
    .ws-mtile:hover { border-color: var(--ws-ink-500); }
    .ws-form-2 { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 16px; }
    .ws-split { display: grid; grid-template-columns: minmax(0,1.1fr) minmax(0,0.9fr); gap: 56px; align-items: center; }
    .ws-g3 { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 24px; }
    .ws-g2 { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 24px; }
    .ws-side { display: grid; grid-template-columns: minmax(0,2fr) minmax(0,1fr); gap: 64px; align-items: start; }
    .ws-sec { padding: 96px 0; }
    details.ws-faq { border-top: 1px solid var(--ws-steel-200); padding: 20px 0; }
    details.ws-faq summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; gap: 16px; font-weight: 600; font-size: 18px; color: var(--ws-ink-900); }
    details.ws-faq summary::-webkit-details-marker { display: none; }
    details.ws-faq[open] summary svg { transform: rotate(180deg); }
    a { color: var(--ws-blue-500); } a:hover { color: var(--ws-blue-600); }
    @media (max-width: 960px) {
      .ws-split, .ws-side { grid-template-columns: 1fr; gap: 40px; }
      .ws-g3 { grid-template-columns: repeat(2, minmax(0,1fr)); }
      .ws-sticky { position: static !important; }
    }
    @media (max-width: 640px) {
      .ws-g3, .ws-g2, .ws-form-2 { grid-template-columns: 1fr; }
      .ws-sec { padding: 64px 0; }
    }
  `}</style>
);

const H1 = ({ children, light = true }) => (
  <h1 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: "clamp(44px, 6.4vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "16px 0 20px", color: light ? "#fff" : "var(--ws-ink-900)", textWrap: "balance" }}>{children}</h1>
);

Object.assign(window, { Photo, MachineTile, LeadForm, SiteCSS, H1, getMachine });
