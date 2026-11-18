/* Contact page — full quote form with validation, plus location/contact details */

const { useState: useStateC } = React;

function ContactPage() {
  const [form, setForm] = useStateC({
    name: "", company: "", email: "", phone: "",
    industry: "", product: "", throughput: "",
    machine: "", timing: "", message: ""
  });
  const [errs, setErrs] = useStateC({});
  const [sent, setSent] = useStateC(false);

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
    if (validate()) {
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Page current="contact.html">
      {/* HERO STRIP */}
      <section style={{ background: "var(--ws-ink-900)", color: "#fff", padding: "72px 0 56px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Container>
          <Eyebrow color="var(--ws-blue-400)">Contact</Eyebrow>
          <h1 style={{
            fontFamily: "var(--ws-font-display)", fontWeight: 800,
            fontSize: "clamp(44px, 6vw, 80px)", lineHeight: 0.95,
            textTransform: "uppercase", margin: "12px 0 8px", color: "#fff",
            letterSpacing: "-0.025em"
          }}>What do you need to package?</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", margin: 0, maxWidth: 720, lineHeight: 1.5 }}>
            We respond within 24–48 hours with a real machine recommendation, not a marketing email.
          </p>
        </Container>
      </section>

      {/* FORM + SIDEBAR */}
      <section style={{ background: "var(--ws-steel-50)", padding: "64px 0 112px" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48, alignItems: "flex-start" }} className="ws-detail-cols">
            {/* Form */}
            <div style={{ background: "#fff", border: "1px solid var(--ws-steel-200)", padding: "40px" }}>
              {sent ? (
                <SuccessState onReset={() => { setSent(false); setForm({ name: "", company: "", email: "", phone: "", industry: "", product: "", throughput: "", machine: "", timing: "", message: "" }); }}/>
              ) : (
                <form onSubmit={submit}>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Quote request — step 1 of 1</div>
                  <h2 style={{
                    fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 36,
                    textTransform: "uppercase", color: "var(--ws-ink-900)", margin: "8px 0 24px",
                    letterSpacing: "-0.01em"
                  }}>Request a Quote</h2>

                  {/* Section: about you */}
                  <FormGroup label="About you">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ws-form-grid">
                      <Field label="Your name" required err={errs.name}><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle}/></Field>
                      <Field label="Company" required err={errs.company}><input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle}/></Field>
                      <Field label="Work email" required err={errs.email}><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle}/></Field>
                      <Field label="Phone (optional)" err={errs.phone}><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle}/></Field>
                    </div>
                  </FormGroup>

                  {/* Section: about the line */}
                  <FormGroup label="About the line">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ws-form-grid">
                      <Field label="Industry">
                        <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} style={inputStyle}>
                          <option value="">Select…</option>
                          {window.WS_INDUSTRIES.map(i => <option key={i.slug} value={i.label}>{i.label}</option>)}
                        </select>
                      </Field>
                      <Field label="Considering a machine?">
                        <select value={form.machine} onChange={e => setForm({ ...form, machine: e.target.value })} style={inputStyle}>
                          <option value="">Not sure — recommend one</option>
                          {window.WS_MACHINES.map(m => <option key={m.slug} value={m.name}>{m.name} — {m.family}</option>)}
                        </select>
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
                          <option>Right now — line is down</option>
                          <option>Within 3 months</option>
                          <option>This year</option>
                          <option>Just researching</option>
                        </select>
                      </Field>
                    </div>
                  </FormGroup>

                  {/* Section: anything else */}
                  <FormGroup label="Anything else">
                    <Field label="Tell us more (existing line, integration needs, certifications)">
                      <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}/>
                    </Field>
                  </FormGroup>

                  <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", paddingTop: 24, borderTop: "1px solid var(--ws-steel-200)" }}>
                    <div style={{ fontSize: 12, color: "var(--ws-fg-3)", maxWidth: 360 }}>
                      We never share your information. Replies come back within 24–48 hours from a human engineer in {window.WS_COMPANY.hq.split(",")[0]}.
                    </div>
                    <Button type="submit" variant="primary" size="lg" icon="arrow-right">Send my request</Button>
                  </div>
                  <style>{`@media (max-width: 540px) { .ws-form-grid { grid-template-columns: 1fr !important; } }`}</style>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <SidebarCard icon="phone" k="Call us" v={window.WS_COMPANY.phone} sub="Mon–Fri · 10am–5pm EST"/>
              <SidebarCard icon="mail" k="Email" v={window.WS_COMPANY.email} sub="Replies in 24–48 hours"/>
              <SidebarCard icon="map-pin" k="Demo &amp; testing" v={window.WS_COMPANY.hq} sub="Schedule a demo or get your samples tested"/>
              <SidebarCard icon="gauge" k="Emergency" v="24/7 line-down support" sub="For active customers"/>

              <div style={{
                background: "var(--ws-navy-900)", color: "#fff", padding: 28, border: "1px solid var(--ws-navy-900)",
                position: "relative", overflow: "hidden"
              }}>
                <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.25 }}/>
                <div style={{ position: "relative" }}>
                  <Eyebrow color="var(--ws-blue-400)">Already a customer?</Eyebrow>
                  <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 24, textTransform: "uppercase", margin: "10px 0 12px", color: "#fff", lineHeight: 1.1 }}>Need parts or service fast?</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: "0 0 16px", lineHeight: 1.5 }}>Skip the form. Call our 24/7 line. Most spares ship same-day from US stock.</p>
                  <Button href={`tel:${window.WS_COMPANY.phone.replace(/[^\d+]/g, "")}`} variant="inverse" size="md" icon="phone">{window.WS_COMPANY.phone}</Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* MAP-ish location banner */}
      <section style={{ background: "var(--ws-paper)", padding: "96px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32, alignItems: "stretch" }} className="ws-detail-cols">
            <div>
              <Eyebrow>Come see it run</Eyebrow>
              <h2 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 48, lineHeight: 1, textTransform: "uppercase", margin: "12px 0 16px", color: "var(--ws-ink-900)", letterSpacing: "-0.02em" }}>{window.WS_COMPANY.hq}</h2>
              <p style={{ fontSize: 16, color: "var(--ws-fg-2)", margin: "0 0 24px", lineHeight: 1.55 }}>
                We're 30 minutes from BWI and 45 from DCA. Bring product samples and we'll run them on the actual machine, or set up a consultation to walk through your line.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="#" variant="primary" icon="arrow-right">Test my samples</Button>
                <Button href="#" variant="outline">Book a consultation</Button>
              </div>
            </div>
            <div style={{
              background: "var(--ws-ink-900)", minHeight: 320, position: "relative", overflow: "hidden",
              border: "1px solid var(--ws-steel-200)"
            }}>
              {/* Stylized map placeholder */}
              <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(46,122,214,0.15)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="600" height="320" fill="var(--ws-ink-900)"/>
                <rect width="600" height="320" fill="url(#grid)"/>
                {/* squiggly roads */}
                <path d="M 0 200 Q 150 180 300 220 T 600 180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
                <path d="M 0 100 Q 200 80 400 120 T 600 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
                <path d="M 200 0 L 280 320" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                <path d="M 450 0 L 380 320" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                {/* pin */}
                <g transform="translate(300 160)">
                  <circle r="40" fill="rgba(46,122,214,0.2)"/>
                  <circle r="22" fill="rgba(46,122,214,0.4)"/>
                  <circle r="10" fill="var(--ws-blue-500)" stroke="#fff" strokeWidth="2"/>
                </g>
              </svg>
              <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", fontWeight: 700 }}>WrapSense Facility</div>
                <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 14, marginTop: 4, color: "rgba(255,255,255,0.85)" }}>{window.WS_COMPANY.address || window.WS_COMPANY.hq}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
}

function SidebarCard({ icon, k, v, sub }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--ws-steel-200)", padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ flexShrink: 0, color: "var(--ws-blue-500)", marginTop: 2 }}><WSIcon name={icon} size={20}/></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>{k}</div>
        <div style={{ fontFamily: "var(--ws-font-sans)", fontWeight: 600, fontSize: 16, color: "var(--ws-ink-900)", marginTop: 4 }}>{v}</div>
        {sub && <div style={{ fontSize: 13, color: "var(--ws-fg-3)", marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700, marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--ws-steel-200)" }}>{label}</div>
      {children}
    </div>
  );
}

function SuccessState({ onReset }) {
  return (
    <div style={{ padding: "40px 16px", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: 999, background: "var(--ws-run-100)", color: "var(--ws-run-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <WSIcon name="check" size={40}/>
      </div>
      <h2 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 48, textTransform: "uppercase", color: "var(--ws-ink-900)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Got it.</h2>
      <p style={{ fontSize: 18, color: "var(--ws-fg-2)", margin: "0 auto 24px", lineHeight: 1.5, maxWidth: 440 }}>
        Your request is in. One of our engineers will reach out within 24–48 hours with a real machine recommendation.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Button onClick={onReset} variant="outline">Send another</Button>
        <Button href="machines.html" variant="primary" icon="arrow-right">Browse the catalog</Button>
      </div>
    </div>
  );
}

window.ContactPage = ContactPage;
window.SidebarCard = SidebarCard;
window.FormGroup = FormGroup;
