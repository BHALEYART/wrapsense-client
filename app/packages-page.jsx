/* Shop by package: pick your pack, go to the machines that make it. */
const WS_PACKAGES = [
  { name: "Pillow bag", img: "pillow-bag", machines: ["fastpack", "sensiweigh"] },
  { name: "Flow wrap", img: "flow-wrap", machines: ["triservo"] },
  { name: "Stick pack", img: "stick-pack-cut", machines: ["quickstick"] },
  { name: "Sachet / 3-side seal", img: "sachet-cut2", machines: ["quickstick"] },
  { name: "Stand-up pouch", img: "standup-pouch", machines: ["rapidbagger", "sensiweigh"] },
  { name: "Folding carton", img: "carton", machines: ["cartomate"] },
  { name: "Jar or bottle", img: "jar", machines: ["sensiweigh", "capvantage", "labelease"] },
  { name: "Bottle in carton", img: "bottle-carton", machines: ["cartomate", "labelease"] },
  { name: "Shipping case", img: "case-cut", machines: ["casemaster", "picknpack"] },
  { name: "Pallet load", img: "pallet", machines: ["casemaster"] }
];

const PK_GLOW = { flow:"rgba(56,178,172,0.55)", vffs:"rgba(46,122,214,0.55)", weigh:"rgba(110,231,183,0.50)", case:"rgba(56,178,172,0.50)", erector:"rgba(132,204,22,0.50)", carton:"rgba(217,70,239,0.45)", stick:"rgba(249,115,22,0.50)", pouch:"rgba(192,38,211,0.45)", label:"rgba(56,178,172,0.50)", cap:"rgba(168,85,247,0.45)" };
const PK_TWEAKS = /*EDITMODE-BEGIN*/{"cardStyle":"light"}/*EDITMODE-END*/;

function PackagesPage() {
  const [t, setT] = useTweaks(PK_TWEAKS);
  const dark = t.cardStyle === "spotlight";
  const fam = s => window.WS_MACHINES.find(m => m.slug === s);
  return (
    <Page current="packages.html">
      <SiteCSS/>
      <section className={"ws-sec" + (dark ? " ws-pk-dark" : "")} style={{ background: dark ? "#0A1320" : "var(--ws-paper)" }}>
        <Container>
          <SectionHead light={dark} eyebrow="Shop by package" title="What do you pack?" sub="Pick your package. We'll show you the machines that make it."/>
          <div className="ws-pk-grid">
            {WS_PACKAGES.map(p => {
              const ms = p.machines.map(fam).filter(Boolean);
              return (
                <div key={p.name} className="ws-pk">
                  <a href={window.WS_FAMILY_HREF(p.machines[0])} className="ws-pk-photo" style={dark ? { background: `radial-gradient(ellipse 75% 95% at 50% -10%, ${PK_GLOW[ms[0] && ms[0].category] || PK_GLOW.flow} 0%, rgba(14,25,41,0) 62%)` } : null}>
                    <img src={`assets/packages/${p.img}.png`} alt={p.name}/>
                  </a>
                  <div className="ws-pk-body">
                    <div className="ws-pk-name">{p.name}</div>
                    <div className="ws-pk-links">
                      {ms.map(m => (
                        <a key={m.slug} href={window.WS_FAMILY_HREF(m.slug)}>{m.name} <WSIcon name="arrow-right" size={14}/></a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
      <CtaBand/>
      <TweaksPanel>
        <TweakSection label="Package cards"/>
        <TweakToggle label="Spotlight cards" value={dark} onChange={v => setT("cardStyle", v ? "spotlight" : "light")}/>
      </TweaksPanel>
      <style>{`
        .ws-pk-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:24px;margin-top:48px}
        .ws-pk{display:flex;flex-direction:column;background:#fff;border:1px solid var(--ws-steel-200);border-radius:6px;overflow:hidden;transition:border-color 120ms var(--ws-ease-standard)}
        .ws-pk:hover{border-color:var(--ws-ink-500)}
        .ws-pk-photo{display:flex;align-items:center;justify-content:center;aspect-ratio:1/1;background:var(--ws-steel-50);padding:24px}
        .ws-pk-photo img{max-width:100%;max-height:100%;object-fit:contain}
        .ws-pk-body{padding:16px 16px 18px;border-top:1px solid var(--ws-steel-200);display:flex;flex-direction:column;gap:10px}
        .ws-pk-name{font-family:var(--ws-font-display);font-weight:800;font-size:22px;line-height:1.05;text-transform:uppercase;color:var(--ws-ink-900)}
        .ws-pk-links{display:flex;flex-direction:column;gap:6px}
        .ws-pk-links a{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--ws-blue-500);text-decoration:none}
        .ws-pk-links a:hover{text-decoration:underline}
        .ws-pk-photo img{transition:transform 320ms var(--ws-ease-emph)}
        .ws-pk-dark .ws-pk{background:#0E1929;border-color:rgba(255,255,255,0.06);border-radius:8px}
        .ws-pk-dark .ws-pk:hover{border-color:rgba(255,255,255,0.2)}
        .ws-pk-dark .ws-pk:hover .ws-pk-photo img{transform:scale(1.05)}
        .ws-pk-dark .ws-pk-photo{padding:32px}
        .ws-pk-dark .ws-pk-photo img{filter:drop-shadow(0 8px 24px rgba(0,0,0,0.45))}
        .ws-pk-dark .ws-pk-body{border-top:1px solid rgba(255,255,255,0.08)}
        .ws-pk-dark .ws-pk-name{color:#fff}
        .ws-pk-dark .ws-pk-links a{color:var(--ws-cyan-300)}
        @media (max-width:1100px){.ws-pk-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media (max-width:720px){.ws-pk-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}}
      `}</style>
    </Page>
  );
}
window.PackagesPage = PackagesPage;
