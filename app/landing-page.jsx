/* Industry landing page — driven by WS_LANDINGS[slug]. */

function LandingPage({ slug }) {
  const d = window.WS_LANDINGS[slug];
  const cs = d.case && window.WS_CASES.find(c => c.slug === d.case);
  return (
    <Page current={`lp-${slug}.html`}>
      <SiteCSS/>
      {/* HERO */}
      <section style={{ background: "var(--ws-ink-900)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.18 }}/>
        <Container style={{ position: "relative", padding: "88px 32px 96px" }}>
          <div className="ws-split">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ws-blue-400)" }}>
                <WSIcon name={d.icon} size={20}/><Eyebrow color="var(--ws-blue-400)">Packaging lines for {d.label}</Eyebrow>
              </div>
              <H1>{d.headline[0]} <span style={{ color: "var(--ws-blue-400)" }}>{d.headline[1]}</span></H1>
              <p style={{ fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", margin: "0 0 32px", maxWidth: 560 }}>{d.sub}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="#quote" variant="primary" size="lg" icon="arrow-right">Get a recommendation</Button>
                <Button href="#line" variant="outline-light" size="lg">See the line</Button>
              </div>
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                {d.stats.map(s => <Stat key={s.l} value={s.v} label={s.l} light/>)}
              </div>
            </div>
            <Photo id={`lp-${slug}-hero`} ratio="4/3" dark label={`Drop a photo of a ${d.label.toLowerCase()} line`}/>
          </div>
        </Container>
      </section>

      {/* PROBLEMS → FIXES */}
      <section className="ws-sec" style={{ background: "var(--ws-paper)" }}>
        <Container>
          <SectionHead eyebrow="What we hear most" title="Common problems. Practical fixes."/>
          <div className="ws-g3" style={{ marginTop: 48 }}>
            {d.pains.map((p, i) => (
              <div key={i} style={{ border: "1px solid var(--ws-steel-200)", borderRadius: 6, background: "#fff", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid var(--ws-steel-200)" }}>
                  <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-fault-500)", marginBottom: 10 }}>PROBLEM 0{i + 1}</div>
                  <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 26, lineHeight: 1.05, textTransform: "uppercase", color: "var(--ws-ink-900)" }}>{p.p}</div>
                </div>
                <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--ws-run-500)", flexShrink: 0, marginTop: 2 }}><WSIcon name="check" size={18}/></span>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--ws-fg-2)" }}>{p.f}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RECOMMENDED LINE */}
      <section id="line" className="ws-sec" style={{ background: "var(--ws-steel-50)", borderTop: "1px solid var(--ws-steel-200)", scrollMarginTop: 72 }}>
        <Container>
          <SectionHead eyebrow="Recommended line" title="One line. One supplier. One call for service." sub="Each machine can be bought alone. Together, we integrate, test and commission them as one line."/>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${d.line.length}, minmax(0,1fr))`, gap: 24, marginTop: 48 }} className="ws-line">
            {d.line.map((s, i) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-fg-3)" }}>STEP {i + 1}</div>
                <MachineTile slug={s}/>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 960px){ .ws-line { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } } @media (max-width: 640px){ .ws-line { grid-template-columns: 1fr !important; } }`}</style>
        </Container>
      </section>

      {/* CASE STUDY */}
      {cs && (
        <section className="ws-sec" style={{ background: "var(--ws-paper)" }}>
          <Container>
            <div className="ws-split" style={{ alignItems: "stretch" }}>
              <Photo id={`cs-${cs.slug}-hero`} ratio="4/3" label={`Drop a photo from ${cs.client}`}/>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Eyebrow>Case study · {cs.client}</Eyebrow>
                <h2 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: 1.02, textTransform: "uppercase", margin: "14px 0 16px", color: "var(--ws-ink-900)", textWrap: "balance" }}>{cs.title}</h2>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ws-fg-2)", margin: "0 0 28px" }}>{cs.summary}</p>
                <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 32 }}>
                  {cs.stats.slice(0, 2).map(s => <Stat key={s.label} value={s.after} label={s.label}/>)}
                </div>
                <div><Button href={`case-study-${cs.slug}.html`} variant="outline" icon="arrow-right">Read the case study</Button></div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ + FORM */}
      <section id="quote" className="ws-sec" style={{ background: "var(--ws-steel-50)", borderTop: "1px solid var(--ws-steel-200)", scrollMarginTop: 72 }}>
        <Container>
          <div className="ws-split" style={{ alignItems: "start" }}>
            <div>
              <SectionHead eyebrow="Questions" title="Before you call."/>
              <div style={{ marginTop: 32, borderBottom: "1px solid var(--ws-steel-200)" }}>
                {d.faqs.map(f => (
                  <details key={f.q} className="ws-faq">
                    <summary>{f.q}<WSIcon name="chevron-down" size={20}/></summary>
                    <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: "var(--ws-fg-2)" }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <LeadForm industry={d.label}/>
          </div>
        </Container>
      </section>
    </Page>
  );
}

window.LandingPage = LandingPage;
