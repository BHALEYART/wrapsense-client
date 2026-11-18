/* Machine detail page. Reads ?slug=triservo etc from URL. */

const { useState: useStateD, useEffect: useEffectD } = React;

function MachineDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "triservo";
  const m = window.WS_MACHINES.find(x => x.slug === slug) || window.WS_MACHINES[0];
  const [quoteOpen, setQuoteOpen] = useStateD(false);
  const [activeModel, setActiveModel] = useStateD(0);

  const related = window.WS_MACHINES.filter(x => x.slug !== m.slug).slice(0, 3);

  return (
    <Page current="machines.html">
      {/* HERO */}
      <section style={{ position: "relative", background: m.gradient, color: "#fff", overflow: "hidden", minHeight: 640 }}>
        <Container style={{ padding: "64px 32px 32px", position: "relative", zIndex: 2 }}>
          <Breadcrumbs trail={[
            { label: "Machines", href: "machines.html" },
            { label: m.family, href: "machines.html" },
            { label: m.name }
          ]} light/>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, marginTop: 56, alignItems: "center" }} className="ws-hero-detail">
            <div>
              <Eyebrow color="rgba(255,255,255,0.85)">{m.family}</Eyebrow>
              <h1 style={{
                fontFamily: "var(--ws-font-display)", fontWeight: 800,
                fontSize: "clamp(56px, 9vw, 144px)", lineHeight: 0.9, letterSpacing: "-0.03em",
                textTransform: "uppercase", margin: "16px 0 24px", color: "#fff"
              }}>{m.name}</h1>
              <p style={{ fontSize: 22, lineHeight: 1.45, color: "rgba(255,255,255,0.95)", margin: "0 0 32px", maxWidth: 560 }}>{m.tagline}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                <Button onClick={() => setQuoteOpen(true)} variant="inverse" size="lg" icon="arrow-right">Request a Quote</Button>
                <Button href="machines.html" variant="outline-light" size="lg">Back to catalog</Button>
              </div>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {m.specs.slice(0, 3).map(s => (
                  <div key={s.k}>
                    <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>{s.k}</div>
                    <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 18, color: "#fff", marginTop: 4 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative", minHeight: 480 }}>
              <img src={m.photo} alt={m.name} style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: "115%", height: "auto", objectFit: "contain",
                filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.35))"
              }}/>
            </div>
          </div>
        </Container>
        <style>{`@media (max-width: 880px) { .ws-hero-detail { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* MODEL TABS */}
      <section style={{ background: "var(--ws-ink-900)", color: "#fff", padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Container style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", fontWeight: 700 }}>Available models</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {m.models.map((mod, i) => (
              <button key={mod} onClick={() => setActiveModel(i)} style={{
                padding: "10px 16px",
                background: i === activeModel ? "#fff" : "transparent",
                color: i === activeModel ? "var(--ws-ink-900)" : "#fff",
                border: i === activeModel ? "1px solid #fff" : "1px solid rgba(255,255,255,0.3)",
                fontFamily: "var(--ws-font-mono)", fontSize: 13, fontWeight: 600,
                cursor: "pointer", borderRadius: 4, transition: "all 120ms var(--ws-ease-standard)"
              }}>{mod}</button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ws-blue-400)", fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ws-run-500)" }}/>
            All models in production
          </div>
        </Container>
      </section>

      {/* OVERVIEW + SPECS */}
      <section style={{ background: "#fff", padding: "96px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "flex-start" }} className="ws-detail-cols">
            <div>
              <Eyebrow>Overview</Eyebrow>
              <h2 style={{
                fontFamily: "var(--ws-font-display)", fontWeight: 800,
                fontSize: 48, lineHeight: 1.05, letterSpacing: "-0.02em",
                textTransform: "uppercase", margin: "16px 0 24px", color: "var(--ws-ink-900)"
              }}>Built for {m.bestFor[0].toLowerCase()}, ready for the rest.</h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ws-fg-2)", margin: "0 0 32px" }}>{m.blurb}</p>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700, marginBottom: 16 }}>Standard Features</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {m.features.map(f => (
                    <li key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 16, color: "var(--ws-fg-1)", lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, color: "var(--ws-blue-500)", marginTop: 2 }}><WSIcon name="check" size={20}/></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside style={{ position: "sticky", top: 96, background: "var(--ws-steel-50)", border: "1px solid var(--ws-steel-200)", padding: "32px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700, marginBottom: 4 }}>Spec sheet</div>
              <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 28, textTransform: "uppercase", color: "var(--ws-ink-900)", margin: "0 0 24px" }}>
                {m.name} {m.models[activeModel]}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {m.specs.map(s => (
                  <div key={s.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--ws-steel-200)" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>{s.k}</div>
                    <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 15, color: "var(--ws-ink-900)", fontWeight: 500 }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                <Button onClick={() => setQuoteOpen(true)} variant="primary" icon="arrow-right">Quote this machine</Button>
                <Button href="#" variant="ghost">Download PDF spec</Button>
              </div>
            </aside>
          </div>
          <style>{`@media (max-width: 880px) { .ws-detail-cols { grid-template-columns: 1fr !important; } .ws-detail-cols aside { position: static !important; } }`}</style>
        </Container>
      </section>

      {/* INDUSTRIES IT SERVES */}
      <section style={{ background: "var(--ws-steel-50)", padding: "96px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
        <Container>
          <SectionHead
            eyebrow="What it runs"
            title={<>Industries the {m.name} <br/>is built for.</>}
            sub={`This machine is currently running across ${m.bestFor.length} of our industry categories.`}
          />
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="ws-grid-3">
            {m.bestFor.map(industryLabel => {
              const ind = window.WS_INDUSTRIES.find(i => i.label === industryLabel);
              if (!ind) return null;
              return (
                <a key={ind.slug} href={`industries.html#${ind.slug}`} style={{
                  background: "#fff", border: "1px solid var(--ws-steel-200)", padding: "24px",
                  textDecoration: "none", color: "var(--ws-ink-900)", display: "flex", alignItems: "center", gap: 16,
                  transition: "border-color 120ms var(--ws-ease-standard)"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--ws-navy-900)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--ws-steel-200)"}>
                  <div style={{ color: "var(--ws-blue-500)", flexShrink: 0 }}><WSIcon name={ind.icon} size={32}/></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--ws-font-sans)", fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>{ind.label}</div>
                  </div>
                  <WSIcon name="chevron-right" size={18}/>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* RELATED */}
      <section style={{ background: "#fff", padding: "96px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
        <Container>
          <SectionHead
            eyebrow="Pairs with"
            title={<>Often run on the<br/>same line.</>}
            right={<Button href="machines.html" variant="ghost" icon="arrow-right">See all 10 families</Button>}
          />
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="ws-grid-3">
            {related.map(r => <MachineGridCard key={r.slug} m={r}/>)}
          </div>
        </Container>
      </section>

      <CtaBand/>

      {quoteOpen && <QuoteModal machineName={m.name} onClose={() => setQuoteOpen(false)}/>}
    </Page>
  );
}

function Breadcrumbs({ trail, light = false }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
      {trail.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: light ? "rgba(255,255,255,0.4)" : "var(--ws-fg-3)" }}>/</span>}
          {t.href ? (
            <a href={t.href} style={{ color: light ? "rgba(255,255,255,0.7)" : "var(--ws-fg-3)", textDecoration: "none" }}>{t.label}</a>
          ) : (
            <span style={{ color: light ? "#fff" : "var(--ws-ink-900)" }}>{t.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

/* QUOTE MODAL — full form with validation */
function QuoteModal({ machineName, onClose }) {
  const [form, setForm] = useStateD({ name: "", company: "", email: "", phone: "", product: "", throughput: "", message: "" });
  const [errs, setErrs] = useStateD({});
  const [sent, setSent] = useStateD(false);

  useEffectD(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, []);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Use a valid email";
    if (form.phone && !/^[\d\s\-\+\(\)]{7,}$/.test(form.phone)) e.phone = "Use digits, spaces, () or -";
    if (!form.product.trim()) e.product = "Tell us briefly what you're packing";
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (validate()) setSent(true);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(11,15,23,0.7)",
      zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      backdropFilter: "blur(4px)"
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", maxWidth: 640, width: "100%", maxHeight: "90vh", overflow: "auto",
        borderRadius: 6, position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, width: 36, height: 36, background: "transparent",
          border: "none", cursor: "pointer", color: "var(--ws-fg-2)", borderRadius: 4
        }}><WSIcon name="x" size={20}/></button>
        {sent ? (
          <div style={{ padding: "64px 48px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--ws-run-100)", color: "var(--ws-run-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <WSIcon name="check" size={32}/>
            </div>
            <h2 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 36, textTransform: "uppercase", color: "var(--ws-ink-900)", margin: "0 0 12px" }}>Got it.</h2>
            <p style={{ fontSize: 16, color: "var(--ws-fg-2)", margin: "0 0 24px", lineHeight: 1.5 }}>
              We received your request for the <strong>{machineName}</strong>. An engineer will be in touch within one business day.
            </p>
            <Button onClick={onClose} variant="primary">Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: "40px 48px" }}>
            <Eyebrow>Quote request</Eyebrow>
            <h2 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 32, textTransform: "uppercase", color: "var(--ws-ink-900)", margin: "8px 0 6px", letterSpacing: "-0.01em" }}>
              {machineName} — talk to us
            </h2>
            <p style={{ fontSize: 14, color: "var(--ws-fg-2)", margin: "0 0 28px" }}>
              We reply in under 48 hours. No marketing emails — just an engineer with answers.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ws-form-grid">
              <Field label="Your name" required err={errs.name}>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle}/>
              </Field>
              <Field label="Company" required err={errs.company}>
                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle}/>
              </Field>
              <Field label="Work email" required err={errs.email}>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle}/>
              </Field>
              <Field label="Phone (optional)" err={errs.phone}>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle}/>
              </Field>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="What are you packing?" required err={errs.product}>
                  <input value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} placeholder="e.g. roasted coffee beans, 12oz stand-up pouches" style={inputStyle}/>
                </Field>
              </div>
              <Field label="Target throughput">
                <input value={form.throughput} onChange={e => setForm({ ...form, throughput: e.target.value })} placeholder="e.g. 60 bags/min" style={inputStyle}/>
              </Field>
              <Field label="Timing">
                <select value={form.timing} onChange={e => setForm({ ...form, timing: e.target.value })} style={inputStyle}>
                  <option value="">Select…</option>
                  <option>Right now</option>
                  <option>Q1 / Q2</option>
                  <option>This year</option>
                  <option>Just researching</option>
                </select>
              </Field>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="Anything else">
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 96 }}/>
                </Field>
              </div>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ fontSize: 12, color: "var(--ws-fg-3)" }}>We never share your information.</div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={onClose} variant="ghost">Cancel</Button>
                <Button type="submit" variant="primary" icon="arrow-right">Send request</Button>
              </div>
            </div>
            <style>{`@media (max-width: 540px) { .ws-form-grid { grid-template-columns: 1fr !important; } }`}</style>
          </form>
        )}
      </div>
    </div>
  );
}

window.MachineDetailPage = MachineDetailPage;
window.QuoteModal = QuoteModal;
