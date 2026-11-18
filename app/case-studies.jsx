/* Case studies: index + detail. */

function CaseCard({ c }) {
  return (
    <a href={`case-study-${c.slug}.html`} className="ws-mtile">
      <Photo id={`cs-${c.slug}-card`} ratio="4/3" label={`Drop a ${c.client} photo`} style={{ borderRadius: 0, border: "none", borderBottom: "1px solid var(--ws-steel-200)" }}/>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <Eyebrow>{c.industry}</Eyebrow>
        <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 28, lineHeight: 1.02, textTransform: "uppercase", textWrap: "balance" }}>{c.title}</div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--ws-fg-2)" }}>{c.summary}</p>
        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--ws-steel-200)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {c.machines.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: "var(--ws-steel-100)", color: "var(--ws-ink-700)" }}>{getMachine(s).name}</span>)}
          </div>
          <WSIcon name="arrow-right" size={18}/>
        </div>
      </div>
    </a>
  );
}

function CaseStudiesPage() {
  return (
    <Page current="case-studies.html">
      <SiteCSS/>
      <section style={{ background: "var(--ws-ink-900)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.18 }}/>
        <Container style={{ position: "relative", padding: "96px 32px 80px" }}>
          <Eyebrow color="var(--ws-blue-400)">Case studies</Eyebrow>
          <H1>Real lines. <span style={{ color: "var(--ws-blue-400)" }}>Real numbers.</span></H1>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", margin: 0, maxWidth: 620 }}>What happened after the machines showed up. Giveaway, speed, labor and payback, in plain numbers.</p>
        </Container>
      </section>
      <section className="ws-sec" style={{ background: "var(--ws-steel-50)" }}>
        <Container>
          <div className="ws-g3">{window.WS_CASES.map(c => <CaseCard key={c.slug} c={c}/>)}</div>
        </Container>
      </section>
      <CtaBand/>
    </Page>
  );
}

function CaseStudyPage({ slug }) {
  const i = window.WS_CASES.findIndex(c => c.slug === slug);
  const c = window.WS_CASES[i];
  const next = window.WS_CASES[(i + 1) % window.WS_CASES.length];
  const lead = getMachine(c.machines[0]);
  const Block = ({ n, title, paras }) => (
    <div style={{ padding: "40px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
      <div style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-accent)", marginBottom: 10 }}>0{n}</div>
      <h2 style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 40, lineHeight: 1, textTransform: "uppercase", margin: "0 0 20px", color: "var(--ws-ink-900)" }}>{title}</h2>
      {paras.map((p, k) => <p key={k} style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ws-fg-2)", margin: "0 0 16px", maxWidth: 680, textWrap: "pretty" }}>{p}</p>)}
    </div>
  );
  const Row = ({ k, children }) => (
    <div style={{ padding: "14px 0", borderTop: "1px solid var(--ws-steel-200)" }}>
      <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700, marginBottom: 4 }}>{k}</div>
      <div style={{ fontSize: 15, color: "var(--ws-ink-900)" }}>{children}</div>
    </div>
  );
  return (
    <Page current="case-studies.html">
      <SiteCSS/>
      <section style={{ background: "var(--ws-ink-900)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: lead.gradient }}/>
        <Container style={{ position: "relative", padding: "72px 32px 56px" }}>
          <a href="case-studies.html" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>← All case studies</a>
          <div style={{ marginTop: 28 }}><Eyebrow color="var(--ws-blue-400)">{c.industry} · {c.location}</Eyebrow></div>
          <div style={{ maxWidth: 980 }}><H1>{c.title}</H1></div>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", margin: "0 0 40px", maxWidth: 680 }}>{c.summary}</p>
          <Photo id={`cs-${c.slug}-hero`} ratio="21/9" dark label={`Drop a wide photo of the ${c.client} line`}/>
        </Container>
      </section>

      {/* RESULTS */}
      <section style={{ background: "var(--ws-paper)", borderBottom: "1px solid var(--ws-steel-200)" }}>
        <Container style={{ padding: "48px 32px" }}>
          <div className="ws-g3">
            {c.stats.map(s => (
              <div key={s.label} style={{ borderLeft: "1px solid var(--ws-steel-200)", paddingLeft: 24 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>{s.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                  {s.before && <span style={{ fontFamily: "var(--ws-font-mono)", fontSize: 18, color: "var(--ws-fg-3)", textDecoration: "line-through" }}>{s.before}</span>}
                  <span style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: 56, lineHeight: 1, color: "var(--ws-ink-900)" }}>{s.after}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* STORY */}
      <section style={{ background: "var(--ws-paper)", padding: "56px 0 96px" }}>
        <Container>
          <div className="ws-side">
            <div>
              <Block n={1} title="The challenge" paras={c.challenge}/>
              <Block n={2} title="What we built" paras={c.solution}/>
              <div className="ws-g2" style={{ margin: "8px 0 8px" }}>
                <Photo id={`cs-${c.slug}-g1`} ratio="4/3" label="Drop an install photo"/>
                <Photo id={`cs-${c.slug}-g2`} ratio="4/3" label="Drop a product / package photo"/>
              </div>
              <Block n={3} title="The result" paras={c.result}/>
              <blockquote style={{ margin: "16px 0 0", padding: "40px 0 0", borderTop: "4px solid var(--ws-ink-900)" }}>
                <p style={{ fontFamily: "var(--ws-font-display)", fontWeight: 700, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1, textTransform: "uppercase", color: "var(--ws-ink-900)", margin: 0, textWrap: "balance" }}>“{c.quote.text}”</p>
                <footer style={{ marginTop: 20, fontSize: 14, color: "var(--ws-fg-3)" }}><strong style={{ color: "var(--ws-ink-900)" }}>{c.quote.name}</strong> · {c.quote.role}</footer>
              </blockquote>
            </div>
            <aside className="ws-sticky" style={{ position: "sticky", top: 96 }}>
              <div style={{ border: "1px solid var(--ws-steel-200)", borderRadius: 6, padding: "20px 24px 8px", background: "#fff" }}>
                <Eyebrow>At a glance</Eyebrow>
                <div style={{ marginTop: 16 }}>
                  <Row k="Client">{c.client}</Row>
                  <Row k="Industry"><a href={`lp-${c.landing}.html`}>{c.industry}</a></Row>
                  <Row k="Product">{c.product}</Row>
                  <Row k="Install">{c.installed}</Row>
                </div>
              </div>
              <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>Machines on this line</div>
                {c.machines.map(s => <MachineTile key={s} slug={s} compact/>)}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* NEXT */}
      <section style={{ background: "var(--ws-steel-50)", borderTop: "1px solid var(--ws-steel-200)" }}>
        <Container style={{ padding: "56px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <Eyebrow>Next case study</Eyebrow>
            <div style={{ fontFamily: "var(--ws-font-display)", fontWeight: 800, fontSize: "clamp(26px, 3vw, 36px)", textTransform: "uppercase", lineHeight: 1.05, marginTop: 10, color: "var(--ws-ink-900)", maxWidth: 760 }}>{next.title}</div>
          </div>
          <Button href={`case-study-${next.slug}.html`} variant="outline" icon="arrow-right">Read it</Button>
        </Container>
      </section>
      <CtaBand/>
    </Page>
  );
}

Object.assign(window, { CaseStudiesPage, CaseStudyPage });
