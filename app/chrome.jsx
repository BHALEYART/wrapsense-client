/* Shared chrome: Nav, Footer, Tweaks panel, atoms (Container, Button, Eyebrow). */
/* Exposes to window for cross-script use. */

const { useState, useEffect, useRef } = React;

/* ---------- Atoms ---------- */
const Container = ({ children, style, ...rest }) => (
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...style }} {...rest}>{children}</div>
);

const Eyebrow = ({ children, color = "var(--ws-accent)", style }) => (
  <div style={{
    fontFamily: "var(--ws-font-sans)", fontWeight: 600,
    fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em",
    color, ...style
  }}>{children}</div>
);

const Button = ({ children, variant = "primary", size = "md", href, onClick, icon, type = "button", style, ...rest }) => {
  const styles = {
    primary:  { bg: "var(--ws-blue-500)", fg: "#fff", border: "var(--ws-blue-500)", bgHover: "var(--ws-blue-600)" },
    inverse:  { bg: "#fff", fg: "var(--ws-navy-900)", border: "#fff", bgHover: "#F3F5F8" },
    outline:  { bg: "transparent", fg: "var(--ws-navy-900)", border: "var(--ws-navy-900)", bgHover: "var(--ws-navy-900)" },
    "outline-light": { bg: "transparent", fg: "#fff", border: "rgba(255,255,255,0.7)", bgHover: "rgba(255,255,255,0.12)" },
    ghost:    { bg: "transparent", fg: "var(--ws-navy-900)", border: "transparent", bgHover: "rgba(14,30,60,0.06)" }
  }[variant];
  const sz = size === "lg" ? { px: 28, py: 16, fs: 14 } : size === "sm" ? { px: 14, py: 8, fs: 11 } : { px: 22, py: 13, fs: 12 };
  const [h, setH] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: `${sz.py}px ${sz.px}px`,
    background: h ? styles.bgHover : styles.bg,
    color: variant === "outline" && h ? "#fff" : styles.fg,
    border: `1.5px solid ${styles.border}`,
    fontFamily: "var(--ws-font-sans)",
    fontSize: sz.fs, fontWeight: 700, letterSpacing: "0.14em",
    textTransform: "uppercase", textDecoration: "none",
    borderRadius: 4, cursor: "pointer", whiteSpace: "nowrap",
    transition: "all 120ms var(--ws-ease-standard)",
    ...style
  };
  const content = <>{children}{icon && <WSIcon name={icon} size={16}/>}</>;
  if (href) return <a href={href} style={base} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} {...rest}>{content}</a>;
  return <button type={type} onClick={onClick} style={base} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} {...rest}>{content}</button>;
};

/* ---------- Logo (PNG, sized) ---------- */
const Logo = ({ height = 28, white = false }) => (
  <a href="index.html" style={{ display: "inline-flex", alignItems: "center", gap: 0, textDecoration: "none" }}>
    <img src="assets/logo.png" alt="WrapSense Packaging"
         style={{ height, width: "auto", display: "block", filter: white ? "brightness(0) invert(1)" : "none" }} />
  </a>
);

/* ---------- TopNav ---------- */
const TopNav = ({ dark = false, current = "" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    fn(); window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const useDark = dark && !scrolled;
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: useDark ? "rgba(11,15,23,0.6)" : "#fff",
      borderBottom: useDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--ws-steel-200)",
      backdropFilter: useDark ? "blur(8px)" : "none",
      transition: "all 200ms var(--ws-ease-standard)"
    }}>
      <Container style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo height={26} white={useDark}/>
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="ws-desktop-nav">
          {window.WS_NAV.map(n => {
            const active = current === n.href || (n.children || []).some(c => c.href === current);
            const link = (
              <a key={n.href} href={n.href}
                 style={{
                   display: "inline-flex", alignItems: "center", gap: 4,
                   fontFamily: "var(--ws-font-sans)", fontWeight: 600,
                   fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase",
                   color: useDark ? (active ? "#fff" : "rgba(255,255,255,0.85)") : (active ? "var(--ws-navy-900)" : "var(--ws-fg-2)"),
                   textDecoration: "none", paddingBottom: 4,
                   borderBottom: active ? `2px solid ${useDark ? "#fff" : "var(--ws-blue-500)"}` : "2px solid transparent"
                 }}>
                {n.label}{n.children && <WSIcon name="chevron-down" size={14}/>}
              </a>
            );
            if (!n.children) return link;
            const wide = n.children.length > 7;
            return (
              <div key={n.href} className="ws-dd">
                {link}
                <div className="ws-dd-panel" style={{ gridTemplateColumns: wide ? "1fr 1fr" : "1fr", width: wide ? 520 : 280 }}>
                  {n.children.map(c => (
                    <a key={c.href + c.label} href={c.href} className="ws-dd-item">
                      <span className="ws-dd-label">{c.label}</span>
                      {c.sub && <span className="ws-dd-sub">{c.sub}</span>}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
          <Button href="contact.html" variant={useDark ? "inverse" : "primary"} size="md">
            Request a Quote
          </Button>
        </nav>
        <button onClick={() => setOpen(o => !o)} className="ws-mobile-nav-btn" style={{
          background: "transparent", border: "none", color: useDark ? "#fff" : "var(--ws-navy-900)", cursor: "pointer", display: "none"
        }}>
          <WSIcon name={open ? "x" : "menu"} size={24}/>
        </button>
      </Container>
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid var(--ws-steel-200)" }}>
          <Container style={{ display: "flex", flexDirection: "column", padding: "16px 32px" }}>
            {window.WS_NAV.map(n => (
              <div key={n.href} style={{ borderBottom: "1px solid var(--ws-steel-200)" }}>
                <a href={n.href} style={{
                  display: "block", padding: "14px 0",
                  fontWeight: 600, fontSize: 14, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "var(--ws-navy-900)", textDecoration: "none"
                }}>{n.label}</a>
                {n.children && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px", paddingBottom: 12 }}>
                    {n.children.map(c => (
                      <a key={c.href + c.label} href={c.href} style={{ padding: "8px 0", fontSize: 14, color: "var(--ws-fg-2)", textDecoration: "none" }}>{c.label}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ padding: "16px 0" }}>
              <Button href="contact.html" variant="primary">Request a Quote</Button>
            </div>
          </Container>
        </div>
      )}
      <style>{`
        .ws-dd { position: relative; display: flex; align-items: center; height: 72px; }
        .ws-dd-panel { position: absolute; top: 100%; left: -16px; display: none; gap: 2px; padding: 8px; background: #fff; border: 1px solid var(--ws-steel-200); border-radius: 6px; box-shadow: var(--ws-shadow-2); }
        .ws-dd:hover .ws-dd-panel, .ws-dd:focus-within .ws-dd-panel { display: grid; }
        .ws-dd-item { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; border-radius: 4px; text-decoration: none; transition: background 120ms var(--ws-ease-standard); }
        .ws-dd-item:hover { background: var(--ws-steel-50); }
        .ws-dd-label { font-family: var(--ws-font-display); font-weight: 700; font-size: 17px; text-transform: uppercase; letter-spacing: 0.02em; color: var(--ws-ink-900); }
        .ws-dd-sub { font-size: 12px; color: var(--ws-fg-3); }
        @media (max-width: 1100px) {
          .ws-desktop-nav { display: none !important; }
          .ws-mobile-nav-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};

/* ---------- Footer ---------- */
const Footer = () => (
  <footer style={{ background: "var(--ws-ink-900)", color: "rgba(255,255,255,0.7)", paddingTop: 80, paddingBottom: 32 }}>
    <Container>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, paddingBottom: 56, borderBottom: "1px solid rgba(255,255,255,0.1)" }} className="ws-footer-grid">
        <div>
          <Logo height={28} white />
          <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.7, maxWidth: 340 }}>
            We source, integrate, and service packaging machinery for North American food, beverage, pharma, and personal-care manufacturers. Final assembly and integration handled stateside.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.7)" }}><WSIcon name="linkedin" size={20}/></a>
            <a href="#" style={{ color: "rgba(255,255,255,0.7)" }}><WSIcon name="youtube" size={20}/></a>
          </div>
        </div>
        <FooterCol title="Machines" links={window.WS_MACHINES.slice(0, 6).map(m => ({ label: m.family, href: `machine.html?slug=${m.slug}` }))} extra={{ label: "See all 10 →", href: "machines.html" }}/>
        <FooterCol title="Company" links={[
          { label: "About", href: "about.html" },
          { label: "Industries", href: "industries.html" },
          { label: "Packages", href: "packages.html" },
          { label: "Case Studies", href: "case-studies.html" },
          { label: "Contact", href: "contact.html" },
          { label: "Request a Quote", href: "contact.html" }
        ]}/>
        <div>
          <FooterTitle>Contact</FooterTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "rgba(255,255,255,0.85)" }}>
              <WSIcon name="map-pin" size={16}/><span>{window.WS_COMPANY.hq}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", color: "rgba(255,255,255,0.85)" }}>
              <WSIcon name="phone" size={16}/><span>{window.WS_COMPANY.phone}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", color: "rgba(255,255,255,0.85)" }}>
              <WSIcon name="mail" size={16}/><span>{window.WS_COMPANY.email}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
              <WSIcon name="gauge" size={16}/><span>{window.WS_COMPANY.hours}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: 32, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
        <div>© {new Date().getFullYear()} {window.WS_COMPANY.name}. All rights reserved.</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Warranty</a>
        </div>
      </div>
    </Container>
    <style>{`
      @media (max-width: 820px) {
        .ws-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
      }
      @media (max-width: 540px) {
        .ws-footer-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </footer>
);

const FooterTitle = ({ children }) => (
  <div style={{ fontFamily: "var(--ws-font-sans)", fontWeight: 700, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>{children}</div>
);
const FooterCol = ({ title, links, extra }) => (
  <div>
    <FooterTitle>{title}</FooterTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {links.map(l => (
        <a key={l.href + l.label} href={l.href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>{l.label}</a>
      ))}
      {extra && <a href={extra.href} style={{ color: "var(--ws-blue-400)", textDecoration: "none", fontSize: 14, fontWeight: 600, marginTop: 4 }}>{extra.label}</a>}
    </div>
  </div>
);

/* ---------- Page shell (handles common body bg + min-height) ---------- */
const Page = ({ children, current, navDark = false }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--ws-paper)" }}>
    <TopNav current={current} dark={navDark}/>
    <main style={{ flex: 1 }}>{children}</main>
    <Footer/>
  </div>
);

/* ---------- Shared section atoms used across pages ---------- */
const SectionHead = ({ eyebrow, title, sub, right, light = false }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 48, flexWrap: "wrap" }}>
    <div style={{ maxWidth: 720 }}>
      <Eyebrow color={light ? "var(--ws-blue-400)" : "var(--ws-accent)"}>{eyebrow}</Eyebrow>
      <h2 style={{
        fontFamily: "var(--ws-font-display)", fontWeight: 800,
        fontSize: "clamp(36px, 4.4vw, 64px)",
        lineHeight: 1.02, letterSpacing: "-0.02em",
        textTransform: "uppercase",
        margin: "16px 0 18px",
        color: light ? "#fff" : "var(--ws-ink-900)"
      }}>{title}</h2>
      {sub && <p style={{ fontSize: 18, color: light ? "rgba(255,255,255,0.75)" : "var(--ws-fg-2)", margin: 0, maxWidth: 620, lineHeight: 1.55 }}>{sub}</p>}
    </div>
    {right && <div>{right}</div>}
  </div>
);

const Stat = ({ label, value, light = false }) => (
  <div>
    <div style={{
      fontFamily: "var(--ws-font-display)", fontWeight: 800,
      fontSize: 44, lineHeight: 1, color: light ? "#fff" : "var(--ws-ink-900)"
    }}>{value}</div>
    <div style={{
      fontFamily: "var(--ws-font-sans)", fontWeight: 600,
      fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em",
      color: light ? "rgba(255,255,255,0.65)" : "var(--ws-fg-3)",
      marginTop: 8
    }}>{label}</div>
  </div>
);

const CtaBand = () => (
  <section style={{ background: "var(--ws-navy-900)", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "var(--ws-gradient)", opacity: 0.25 }}/>
    <Container style={{ position: "relative", padding: "88px 32px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center" }} className="ws-cta-grid">
      <div>
        <Eyebrow color="var(--ws-blue-400)">Talk to a project manager to discuss your application.</Eyebrow>
        <h2 style={{
          fontFamily: "var(--ws-font-display)", fontWeight: 800,
          fontSize: "clamp(36px, 4.4vw, 56px)", lineHeight: 1.02,
          textTransform: "uppercase", color: "#fff", margin: "16px 0 16px"
        }}>Have something to pack? <span style={{ color: "var(--ws-blue-400)" }}>We can probably help.</span></h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", margin: 0, maxWidth: 540, lineHeight: 1.5 }}>
          Tell us your product, throughput target, and bag/case style. We come back with a real machine recommendation in 24–48 hours for most applications.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Button href="contact.html" variant="primary" size="lg" icon="arrow-right">Request a Quote</Button>
        <Button href="machines.html" variant="outline-light" size="lg">Browse the Catalog</Button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 8 }}>
          <WSIcon name="phone" size={16}/> Or call {window.WS_COMPANY.phone}
        </div>
      </div>
    </Container>
    <style>{`@media (max-width: 880px) { .ws-cta-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
);

/* ---------- Form atoms (shared by contact + quote modal) ---------- */
const inputStyle = {
  width: "100%", padding: "12px 14px", border: "1px solid var(--ws-steel-200)",
  borderRadius: 4, fontFamily: "var(--ws-font-sans)", fontSize: 15, color: "var(--ws-ink-900)",
  background: "#fff", outline: "none"
};
function Field({ label, required, err, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 700 }}>
        {label} {required && <span style={{ color: "var(--ws-fault-500)" }}>*</span>}
      </span>
      {React.Children.map(children, child => React.cloneElement(child, {
        style: { ...child.props.style, borderColor: err ? "var(--ws-fault-500)" : "var(--ws-steel-200)" }
      }))}
      {err && <span style={{ fontSize: 12, color: "var(--ws-fault-500)" }}>{err}</span>}
    </label>
  );
}

Object.assign(window, { Container, Eyebrow, Button, Logo, TopNav, Footer, Page, FooterCol, FooterTitle, SectionHead, Stat, CtaBand, Field, inputStyle });
