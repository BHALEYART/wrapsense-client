/* About page — story, pillars, location, team blurb */

function AboutPage() {
  return (
    <Page current="about.html">
      {/* HERO */}
      <section style={{ background: "var(--ws-paper)", padding: "96px 0 80px", borderBottom: "1px solid var(--ws-steel-200)" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "center" }} className="ws-hero-detail">
            <div>
              <Eyebrow>About WrapSense</Eyebrow>
              <h1 style={{
                fontFamily: "var(--ws-font-display)", fontWeight: 800,
                fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 0.92,
                textTransform: "uppercase", margin: "16px 0 24px", color: "var(--ws-ink-900)",
                letterSpacing: "-0.025em"
              }}>A Toyota, <br/><span style={{ background: "var(--ws-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>not a Ferrari.</span></h1>
              <p style={{ fontSize: 20, lineHeight: 1.5, color: "var(--ws-fg-2)", margin: "0 0 24px", maxWidth: 580 }}>
                We source, integrate, and service custom packaging machinery — with final assembly, integration, and support handled stateside. Founded in {window.WS_COMPANY.founded}, we've spent more than a decade on the unsexy work of making lines that actually run.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ws-fg-2)", margin: "0 0 32px", maxWidth: 580 }}>
                You don't need a Ferrari on your first packaging machine purchase. You need a Toyota — practical, dependable, and supportable. Built with parts your maintenance team can actually source. Backed by a phone that gets answered on the second ring.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="machines.html" variant="primary" size="lg" icon="arrow-right">See the Machines</Button>
                <Button href="contact.html" variant="outline" size="lg">Schedule a Demo</Button>
              </div>
            </div>
            <div style={{
              position: "relative", aspectRatio: "4 / 5", background: "var(--ws-navy-900)",
              overflow: "hidden", color: "#fff", padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between"
            }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.3 }}/>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>Operations</div>
                <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 36, textTransform: "uppercase", marginTop: 8, lineHeight: 1 }}>Assembled<br/>stateside.</div>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Stat light value="14" label="People"/>
                  <Stat light value="13" label="Years in service"/>
                  <Stat light value="10" label="Machine families"/>
                  <Stat light value="US" label="Assembly &amp; support"/>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PILLARS */}
      <section style={{ background: "var(--ws-paper)", padding: "112px 0" }}>
        <Container>
          <SectionHead eyebrow="Three pillars" title={<>{window.WS_COMPANY.tag}</>} sub="Everything we build comes back to these three. If a feature doesn't add quality, value, or service — we leave it out."/>
          <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="ws-pillars-grid">
            {PILLAR_DETAILS.map((p, i) => (
              <div key={p.k} style={{ background: "#fff", border: "1px solid var(--ws-steel-200)", padding: 40, position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 64, height: 4, background: "var(--ws-gradient)" }}/>
                <div style={{ color: "var(--ws-blue-500)" }}><WSIcon name={p.icon} size={36}/></div>
                <div style={{ marginTop: 18, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>0{i+1}</div>
                <h3 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 36, lineHeight: 1, textTransform: "uppercase", margin: "10px 0 16px", color: "var(--ws-ink-900)" }}>{p.k}.</h3>
                <p style={{ fontSize: 15, color: "var(--ws-fg-2)", margin: "0 0 20px", lineHeight: 1.6 }}>{p.body}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.bullets.map(b => (
                    <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--ws-fg-2)", lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, color: "var(--ws-blue-500)", marginTop: 2 }}><WSIcon name="check" size={16}/></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 880px) { .ws-pillars-grid { grid-template-columns: 1fr !important; } }`}</style>
        </Container>
      </section>

      {/* PROCESS */}
      <section style={{ background: "var(--ws-ink-900)", color: "#fff", padding: "112px 0" }}>
        <Container>
          <SectionHead light eyebrow="How we work" title={<>From planning to service.<br/>We handle it all.</>} sub={<span style={{ color: "rgba(255,255,255,0.75)" }}>From planning to production, to assembly and integration, to install and service — we own the whole chain. No factory required.</span>}/>
          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "rgba(255,255,255,0.1)" }} className="ws-grid-5">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.k} style={{ background: "var(--ws-ink-900)", padding: 32, minHeight: 280 }}>
                <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 64, lineHeight: 1, color: "var(--ws-blue-400)", marginBottom: 24, letterSpacing: "-0.02em" }}>0{i+1}</div>
                <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 24, textTransform: "uppercase", marginBottom: 12 }}>{s.k}</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 1100px) { .ws-grid-5 { grid-template-columns: repeat(3, 1fr) !important; } }
            @media (max-width: 720px)  { .ws-grid-5 { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 480px)  { .ws-grid-5 { grid-template-columns: 1fr !important; } }
          `}</style>
        </Container>
      </section>

      {/* COMMITMENTS */}
      <section style={{ background: "var(--ws-steel-50)", padding: "112px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
        <Container>
          <SectionHead eyebrow="What we promise" title={<>Things we won't do.</>} sub="Some of the loudest commitments in our industry are about what NOT to do."/>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="ws-grid-2">
            {[
              "We won't ship a machine without our technician running it first.",
              "We won't sell you features you don't have a use case for.",
              "We won't end-of-life a spare part for a machine still in service.",
              "We won't put you in a phone queue when your line is down.",
              "We won't quote a project we can't actually deliver in the timeframe.",
              "We won't disappear after the install — Year 1 phone support is included."
            ].map(t => (
              <div key={t} style={{ background: "#fff", border: "1px solid var(--ws-steel-200)", padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, color: "var(--ws-fault-500)" }}><WSIcon name="x" size={20}/></span>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ws-ink-900)", lineHeight: 1.45 }}>{t}</div>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 720px) { .ws-grid-2 { grid-template-columns: 1fr !important; } }`}</style>
        </Container>
      </section>

      <CtaBand/>
    </Page>
  );
}

const PILLAR_DETAILS = [
  {
    k: "Quality",
    icon: "shield",
    body: "Industrial parts where it matters, sensibly specified everywhere else. Built to outlast the SKU lineup your plant is running today.",
    bullets: [
      "Food-safe contact surfaces where required",
      "Parts we stock — not exotic, OEM-only components",
      "IP65-rated control boxes",
      "Tested in our facility before shipment"
    ]
  },
  {
    k: "Value",
    icon: "gauge",
    body: "Priced to make sense for first-time automation. No SKU forces you into a tier you don't need.",
    bullets: [
      "Modular options — buy what you'll use",
      "Lead times under 16 weeks for standard configs",
      "Trade-in credit when you upgrade families",
      "Financing partnerships for new lines"
    ]
  },
  {
    k: "Service",
    icon: "wrench",
    body: "The line stops, your lot ships late, your customer is unhappy. We're built to make that not happen.",
    bullets: [
      "US-stocked spares ship same-day",
      "Phone support answered 24/7",
      "On-site install + operator training offered with every machine",
      "Remote-diagnostic option on every machine"
    ]
  }
];

const PROCESS_STEPS = [
  { k: "Plan",                    body: "Tell us what you're packing and at what rate. We come back with a real machine spec — not a brochure — in 24–48 hours." },
  { k: "Production",              body: "Machines built to spec by our vetted manufacturing partners. We publish the schedule so there are no surprises mid-build." },
  { k: "Assembly & Integration",  body: "Final assembly and line integration handled stateside. You're welcome to come walk the build before sign-off." },
  { k: "Install",                 body: "Crated, freighted, uncrated, leveled, calibrated, and signed off on your floor. Operator training offered with every install." },
  { k: "Service",                 body: "Year-one support included. Phone answered 24/7. Spares stocked in the US for every machine we've delivered." }
];

window.AboutPage = AboutPage;
