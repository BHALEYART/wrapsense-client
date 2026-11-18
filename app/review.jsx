/* WrapSense Content Review — section-by-section approval walkthrough.
   Pulls items from window.WS_REVIEW_ITEMS (review-items.jsx).
   State is per-item: { status: "pending"|"approved"|"changes"|"skipped", note: string }.
   Persisted to localStorage under "ws-review-v1". */

const { useState: useStateR, useEffect: useEffectR, useMemo: useMemoR, useRef: useRefR } = React;

const STORAGE_KEY = "ws-review-v1";

/* ---------- atoms ---------- */
const RvEyebrow = ({ children, color = "var(--ws-accent)", style }) => (
  <div style={{
    fontFamily: "var(--ws-font-sans)", fontWeight: 600,
    fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em",
    color, ...style
  }}>{children}</div>
);

const RvButton = ({ children, variant = "primary", size = "md", onClick, icon, disabled, style, title }) => {
  const palettes = {
    primary:  { bg: "var(--ws-navy-900)", fg: "#fff", border: "var(--ws-navy-900)", bgHover: "var(--ws-navy-700)" },
    approve:  { bg: "var(--ws-run-500)",  fg: "#fff", border: "var(--ws-run-500)",  bgHover: "#187A45" },
    changes:  { bg: "var(--ws-warn-500)", fg: "#1a1200", border: "var(--ws-warn-500)", bgHover: "#C58800" },
    ghost:    { bg: "transparent", fg: "var(--ws-fg-1)", border: "var(--ws-steel-200)", bgHover: "var(--ws-steel-100)" },
    danger:   { bg: "transparent", fg: "var(--ws-fault-500)", border: "transparent", bgHover: "var(--ws-fault-100)" }
  };
  const p = palettes[variant];
  const sz = size === "lg" ? { px: 22, py: 13, fs: 13 } : size === "sm" ? { px: 12, py: 7, fs: 11 } : { px: 16, py: 10, fs: 12 };
  const [h, setH] = useStateR(false);
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      title={title}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center",
        padding: `${sz.py}px ${sz.px}px`,
        background: disabled ? "var(--ws-steel-100)" : (h ? p.bgHover : p.bg),
        color: disabled ? "var(--ws-fg-3)" : p.fg,
        border: `1.5px solid ${disabled ? "var(--ws-steel-200)" : p.border}`,
        fontFamily: "var(--ws-font-sans)",
        fontSize: sz.fs, fontWeight: 700, letterSpacing: "0.12em",
        textTransform: "uppercase",
        borderRadius: 4, cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 120ms var(--ws-ease-standard)",
        ...style
      }}
    >{children}{icon && <span aria-hidden style={{ fontSize: sz.fs + 2 }}>{icon}</span>}</button>
  );
};

const StatusDot = ({ status, size = 10 }) => {
  const color = {
    approved: "var(--ws-run-500)",
    changes:  "var(--ws-warn-500)",
    skipped:  "var(--ws-ink-300)",
    pending:  "transparent"
  }[status] || "transparent";
  const border = status === "pending" ? "var(--ws-steel-200)" : color;
  return (
    <span aria-hidden style={{
      display: "inline-block", width: size, height: size, borderRadius: "50%",
      background: color, border: `1.5px solid ${border}`, flexShrink: 0
    }}/>
  );
};

const KeyHint = ({ k, label }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ws-fg-3)" }}>
    <kbd style={{
      fontFamily: "var(--ws-font-mono)",
      fontSize: 11, fontWeight: 600,
      padding: "2px 7px",
      background: "var(--ws-paper)",
      border: "1px solid var(--ws-steel-200)",
      borderBottomWidth: 2,
      borderRadius: 4,
      color: "var(--ws-fg-1)",
      minWidth: 18, textAlign: "center"
    }}>{k}</kbd>
    <span style={{ fontSize: 12, fontFamily: "var(--ws-font-sans)" }}>{label}</span>
  </span>
);

/* ---------- the walkthrough app ---------- */
function ReviewApp() {
  const items = window.WS_REVIEW_ITEMS;
  const groups = window.WS_REVIEW_GROUPS;

  /* ----- persisted decisions ----- */
  const [decisions, setDecisions] = useStateR(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const init = {};
    items.forEach(it => { init[it.id] = { status: "pending", note: "" }; });
    return init;
  });

  useEffectR(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions)); } catch (e) {}
  }, [decisions]);

  /* ----- current item ----- */
  const [activeIdx, setActiveIdx] = useStateR(() => {
    // Resume on first pending item, or first item if all decided.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        const idx = items.findIndex(it => (d[it.id]?.status || "pending") === "pending");
        return idx === -1 ? 0 : idx;
      }
    } catch (e) {}
    return 0;
  });

  const [showSummary, setShowSummary] = useStateR(false);
  /* Filter mode lets the user walk only the items they previously requested
     changes on \u2014 useful when revisiting after edits have been made. */
  const [filterMode, setFilterMode] = useStateR("all"); // "all" | "changes"
  const item = items[activeIdx];
  const dec = decisions[item.id] || { status: "pending", note: "" };

  /* ----- decision helpers ----- */
  const setStatus = (id, status) => {
    setDecisions(d => ({ ...d, [id]: { ...(d[id] || { note: "" }), status } }));
  };
  const setNote = (id, note) => {
    setDecisions(d => ({ ...d, [id]: { ...(d[id] || { status: "pending" }), note } }));
  };

  /* ----- visible-set helpers (respect filter mode) ----- */
  const visibleIdxs = useMemoR(() => {
    if (filterMode === "changes") {
      return items.map((it, i) => ({ it, i }))
        .filter(({ it }) => (decisions[it.id]?.status || "pending") === "changes")
        .map(({ i }) => i);
    }
    return items.map((_, i) => i);
  }, [filterMode, items, decisions]);

  /* ----- navigation ----- */
  const goTo = (idx) => {
    if (idx < 0 || idx >= items.length) return;
    setShowSummary(false);
    setActiveIdx(idx);
    // scroll the active item into view inside the sidebar
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-rv-side="${items[idx].id}"]`);
      if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
      // scroll the main scroll region to top
      const main = document.getElementById("rv-main-scroll");
      if (main) main.scrollTop = 0;
    });
  };
  const advance = () => {
    const pos = visibleIdxs.indexOf(activeIdx);
    if (pos === -1) {
      // current item is no longer in the visible set \u2014 jump to first visible
      if (visibleIdxs.length > 0) goTo(visibleIdxs[0]);
      else setShowSummary(true);
      return;
    }
    if (pos < visibleIdxs.length - 1) goTo(visibleIdxs[pos + 1]);
    else setShowSummary(true);
  };
  const back = () => {
    const pos = visibleIdxs.indexOf(activeIdx);
    if (pos === -1) {
      if (visibleIdxs.length > 0) goTo(visibleIdxs[visibleIdxs.length - 1]);
      return;
    }
    if (pos > 0) goTo(visibleIdxs[pos - 1]);
  };

  /* Enter "review changes" mode \u2014 jump to first changes-requested item. */
  const enterChangesMode = () => {
    const firstChanges = items.findIndex(it => (decisions[it.id]?.status || "pending") === "changes");
    if (firstChanges === -1) return;
    setFilterMode("changes");
    setShowSummary(false);
    setActiveIdx(firstChanges);
    requestAnimationFrame(() => {
      const main = document.getElementById("rv-main-scroll");
      if (main) main.scrollTop = 0;
      const el = document.querySelector(`[data-rv-side="${items[firstChanges].id}"]`);
      if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
    });
  };
  const exitFilterMode = () => setFilterMode("all");

  const decideAndAdvance = (status) => {
    setStatus(item.id, status);
    setTimeout(advance, 80); // small delay so the dot flips visibly before nav
  };

  /* ----- keyboard shortcuts ----- */
  useEffectR(() => {
    const onKey = (e) => {
      if (showSummary) {
        if (e.key === "Escape") setShowSummary(false);
        return;
      }
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "textarea" || tag === "input") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "a" || e.key === "A") { e.preventDefault(); decideAndAdvance("approved"); }
      else if (e.key === "c" || e.key === "C") { e.preventDefault(); decideAndAdvance("changes"); }
      else if (e.key === "s" || e.key === "S") { e.preventDefault(); decideAndAdvance("skipped"); }
      else if (e.key === "ArrowRight" || e.key === "j") { e.preventDefault(); advance(); }
      else if (e.key === "ArrowLeft"  || e.key === "k") { e.preventDefault(); back(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, showSummary, decisions]);

  /* ----- stats ----- */
  const stats = useMemoR(() => {
    const s = { approved: 0, changes: 0, skipped: 0, pending: 0 };
    items.forEach(it => { s[decisions[it.id]?.status || "pending"]++; });
    return s;
  }, [decisions, items]);
  const decidedCount = items.length - stats.pending;
  const pct = Math.round(((items.length - stats.pending) / items.length) * 100);

  /* ----- reset ----- */
  const reset = () => {
    if (!confirm("Reset all review decisions? This cannot be undone.")) return;
    const init = {};
    items.forEach(it => { init[it.id] = { status: "pending", note: "" }; });
    setDecisions(init);
    setShowSummary(false);
    setActiveIdx(0);
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "320px 1fr",
      height: "100vh",
      background: "var(--ws-steel-50)"
    }}>
      <Sidebar
        groups={groups}
        items={items}
        decisions={decisions}
        activeId={item.id}
        onPick={(idx) => goTo(idx)}
        onOpenSummary={() => setShowSummary(true)}
        stats={stats}
        decidedCount={decidedCount}
        pct={pct}
        onReset={reset}
        filterMode={filterMode}
        onEnterChangesMode={enterChangesMode}
        onExitFilterMode={exitFilterMode}
      />
      <main style={{ display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        <TopBar
          item={item}
          activeIdx={activeIdx}
          total={items.length}
          pct={pct}
          stats={stats}
          onOpenSummary={() => setShowSummary(true)}
        />
        <div id="rv-main-scroll" style={{ flex: 1, overflow: "auto", padding: "32px 56px 200px" }}>
          <ReviewCard
            item={item}
            decision={dec}
            onNote={(v) => setNote(item.id, v)}
          />
        </div>
        <ActionBar
          item={item}
          activeIdx={activeIdx}
          total={items.length}
          decision={dec}
          onApprove={() => decideAndAdvance("approved")}
          onChanges={() => decideAndAdvance("changes")}
          onSkip={() => decideAndAdvance("skipped")}
          onPrev={back}
          onNext={advance}
          onClear={() => setStatus(item.id, "pending")}
        />
        {showSummary && (
          <SummaryOverlay
            items={items}
            groups={groups}
            decisions={decisions}
            stats={stats}
            onClose={() => setShowSummary(false)}
            onJump={(idx) => { setShowSummary(false); goTo(idx); }}
            onReset={reset}
          />
        )}
      </main>
    </div>
  );
}

/* ---------- Sidebar ---------- */
function Sidebar({ groups, items, decisions, activeId, onPick, onOpenSummary, stats, decidedCount, pct, onReset, filterMode, onEnterChangesMode, onExitFilterMode }) {
  // When filterMode === "changes", show only items that currently have status "changes"
  const filteredGroups = useMemoR(() => {
    if (filterMode !== "changes") return groups;
    return groups
      .map(g => ({
        ...g,
        items: g.items.filter(it => (decisions[it.id]?.status || "pending") === "changes")
      }))
      .filter(g => g.items.length > 0);
  }, [groups, decisions, filterMode]);

  return (
    <aside style={{
      background: "var(--ws-paper)",
      borderRight: "1px solid var(--ws-steel-200)",
      display: "flex", flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* header */}
      <div style={{ padding: "22px 22px 16px", borderBottom: "1px solid var(--ws-steel-100)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <img src="assets/logo.png" alt="WrapSense" style={{ height: 22 }}/>
          <span style={{
            fontFamily: "var(--ws-font-sans)", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--ws-fg-3)", borderLeft: "1px solid var(--ws-steel-200)",
            paddingLeft: 10
          }}>Content Review</span>
        </div>
        <div style={{
          fontFamily: "var(--ws-font-display)", fontSize: 22, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.1,
          color: "var(--ws-fg-1)"
        }}>
          Approve every section of copy & photo.
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: "var(--ws-font-mono)", fontSize: 11, color: "var(--ws-fg-3)", letterSpacing: "0.04em" }}>
              {decidedCount} / {items.length} REVIEWED
            </span>
            <span style={{ fontFamily: "var(--ws-font-mono)", fontSize: 11, fontWeight: 700, color: "var(--ws-fg-1)" }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: "var(--ws-steel-100)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: "var(--ws-gradient)",
              transition: "width 200ms var(--ws-ease-standard)"
            }}/>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            <SidebarStat label="Approved" count={stats.approved} status="approved"/>
            <SidebarStat label="Changes"  count={stats.changes}  status="changes"/>
            <SidebarStat label="Skipped"  count={stats.skipped}  status="skipped"/>
          </div>
        </div>

        {/* Filter mode toggle \u2014 only visible when there are changes-requested items */}
        {(filterMode === "changes" || stats.changes > 0) && (
          <div style={{ marginTop: 14 }}>
            {filterMode === "changes" ? (
              <button
                onClick={onExitFilterMode}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 8, padding: "10px 12px",
                  background: "var(--ws-warn-100)",
                  border: "1px solid var(--ws-warn-500)",
                  borderRadius: 4, cursor: "pointer",
                  fontFamily: "var(--ws-font-sans)", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#7A540A"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FBE3A0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--ws-warn-100)"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StatusDot status="changes" size={9}/>
                  Reviewing changes ({stats.changes})
                </span>
                <span style={{ opacity: 0.7 }}>Show all ✕</span>
              </button>
            ) : (
              <button
                onClick={onEnterChangesMode}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 8, padding: "10px 12px",
                  background: "var(--ws-paper)",
                  border: "1px solid var(--ws-warn-500)",
                  borderRadius: 4, cursor: "pointer",
                  fontFamily: "var(--ws-font-sans)", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#7A540A"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ws-warn-100)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--ws-paper)"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StatusDot status="changes" size={9}/>
                  Review my {stats.changes} change{stats.changes === 1 ? "" : "s"}
                </span>
                <span aria-hidden style={{ opacity: 0.6 }}>→</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* item list */}
      <div className="rv-scroll" style={{ flex: 1, overflowY: "auto", padding: "10px 0 18px" }}>
        {filteredGroups.length === 0 ? (
          <div style={{
            margin: "20px 22px", padding: "20px 16px",
            background: "var(--ws-steel-50)", border: "1px dashed var(--ws-steel-200)",
            borderRadius: 4, textAlign: "center",
            fontFamily: "var(--ws-font-sans)", fontSize: 13,
            color: "var(--ws-fg-3)", lineHeight: 1.5
          }}>
            No sections to show in this view.
          </div>
        ) : filteredGroups.map(grp => (
          <div key={grp.page} style={{ marginTop: 10 }}>
            <div style={{
              padding: "8px 22px 6px",
              fontFamily: "var(--ws-font-sans)", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--ws-fg-3)",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span>{grp.page}</span>
              <span style={{ fontFamily: "var(--ws-font-mono)" }}>{grp.items.length}</span>
            </div>
            {grp.items.map(it => {
              const status = decisions[it.id]?.status || "pending";
              const active = it.id === activeId;
              return (
                <button
                  key={it.id}
                  data-rv-side={it.id}
                  onClick={() => onPick(it.index)}
                  style={{
                    display: "grid", gridTemplateColumns: "16px 1fr 22px",
                    alignItems: "center", gap: 10,
                    width: "100%", padding: "10px 22px",
                    background: active ? "var(--ws-info-100)" : "transparent",
                    border: "none", borderLeft: `3px solid ${active ? "var(--ws-blue-500)" : "transparent"}`,
                    textAlign: "left", cursor: "pointer",
                    color: "var(--ws-fg-1)",
                    transition: "background 80ms"
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--ws-steel-50)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <StatusDot status={status}/>
                  <span style={{
                    fontFamily: "var(--ws-font-sans)",
                    fontSize: 13, fontWeight: active ? 600 : 500,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                  }}>{it.section}</span>
                  <span style={{
                    fontFamily: "var(--ws-font-mono)", fontSize: 10,
                    color: "var(--ws-fg-3)", textAlign: "right"
                  }}>{String(it.index + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* footer */}
      <div style={{
        padding: "14px 22px",
        borderTop: "1px solid var(--ws-steel-100)",
        background: "var(--ws-steel-50)",
        display: "flex", gap: 8
      }}>
        <RvButton variant="primary" size="sm" onClick={onOpenSummary} style={{ flex: 1 }}>View summary</RvButton>
        <RvButton variant="ghost" size="sm" onClick={onReset} title="Reset all decisions">Reset</RvButton>
      </div>
    </aside>
  );
}

function SidebarStat({ label, count, status }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <StatusDot status={status} size={9}/>
      <span style={{
        fontFamily: "var(--ws-font-mono)", fontSize: 12, fontWeight: 700, color: "var(--ws-fg-1)"
      }}>{count}</span>
      <span style={{ fontFamily: "var(--ws-font-sans)", fontSize: 11, color: "var(--ws-fg-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
    </div>
  );
}

/* ---------- TopBar ---------- */
function TopBar({ item, activeIdx, total, pct, stats, onOpenSummary }) {
  return (
    <div style={{
      padding: "16px 56px",
      background: "var(--ws-paper)",
      borderBottom: "1px solid var(--ws-steel-200)",
      display: "flex", alignItems: "center", gap: 24, justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--ws-font-mono)", fontSize: 12, fontWeight: 700,
          color: "var(--ws-fg-1)",
          padding: "5px 10px", border: "1px solid var(--ws-steel-200)", borderRadius: 4,
          background: "var(--ws-steel-50)"
        }}>{String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
        <div style={{
          fontFamily: "var(--ws-font-sans)", fontSize: 12, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--ws-fg-3)", fontWeight: 600
        }}>
          {item.page} <span style={{ margin: "0 8px", color: "var(--ws-steel-200)" }}>/</span> {item.section}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <a
          href={item.pageHref}
          target="_blank"
          rel="noopener"
          style={{
            fontFamily: "var(--ws-font-sans)", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--ws-blue-500)", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6
          }}
        >Open in context <span aria-hidden>↗</span></a>
      </div>
    </div>
  );
}

/* ---------- Card ---------- */
function ReviewCard({ item, decision, onNote }) {
  const hasPhotos = item.photos && item.photos.length > 0;
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      {/* header */}
      <div style={{ marginBottom: 28 }}>
        <RvEyebrow>{item.page} · Section {item.section}</RvEyebrow>
        <h1 style={{
          fontFamily: "var(--ws-font-display)", fontWeight: 800,
          fontSize: 44, lineHeight: 1.05, textTransform: "uppercase",
          letterSpacing: "-0.015em",
          margin: "10px 0 12px", color: "var(--ws-fg-1)"
        }}>{item.section}</h1>
        {item.summary && (
          <p style={{
            fontFamily: "var(--ws-font-sans)", fontSize: 16, lineHeight: 1.5,
            color: "var(--ws-fg-2)", margin: 0, maxWidth: 720
          }}>{item.summary}</p>
        )}
      </div>

      {/* Photos */}
      {hasPhotos && (
        <section style={{ marginBottom: 32 }}>
          <SectionLabel n="01" title="Photos" count={item.photos.length}/>
          <div style={{ display: "grid", gridTemplateColumns: item.photos.length > 1 ? "repeat(2, 1fr)" : "1fr", gap: 16 }}>
            {item.photos.map((p, i) => (
              <figure key={i} style={{
                margin: 0,
                background: "var(--ws-paper)",
                border: "1px solid var(--ws-steel-200)",
                borderRadius: 4, overflow: "hidden",
                boxShadow: "var(--ws-shadow-1)"
              }}>
                <div style={{
                  height: 360,
                  background: `${item.gradient || "var(--ws-steel-100)"}`,
                  position: "relative", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <img
                    src={p.src}
                    alt={p.alt || ""}
                    style={{
                      maxWidth: "82%", maxHeight: "84%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 14px 24px rgba(11,15,23,0.25))"
                    }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <figcaption style={{ padding: "14px 16px", borderTop: "1px solid var(--ws-steel-100)" }}>
                  <div style={{
                    fontFamily: "var(--ws-font-mono)", fontSize: 11,
                    color: "var(--ws-fg-3)", letterSpacing: "0.04em",
                    marginBottom: 2, wordBreak: "break-all"
                  }}>{p.src}</div>
                  <div style={{
                    fontFamily: "var(--ws-font-sans)", fontSize: 14,
                    color: "var(--ws-fg-1)", fontWeight: 500
                  }}>{p.note || p.alt}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Copy */}
      {item.copy && item.copy.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <SectionLabel n={hasPhotos ? "02" : "01"} title="Copy" count={item.copy.length}/>
          <div style={{
            background: "var(--ws-paper)",
            border: "1px solid var(--ws-steel-200)",
            borderRadius: 4, overflow: "hidden"
          }}>
            {item.copy.map((line, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "200px 1fr",
                borderTop: i === 0 ? "none" : "1px solid var(--ws-steel-100)",
                minHeight: 56
              }}>
                <div style={{
                  padding: "16px 18px",
                  background: "var(--ws-steel-50)",
                  borderRight: "1px solid var(--ws-steel-100)",
                  fontFamily: "var(--ws-font-sans)", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--ws-fg-3)",
                  display: "flex", alignItems: "flex-start"
                }}>{line.role}</div>
                <div style={{
                  padding: "16px 22px",
                  fontFamily: "var(--ws-font-sans)", fontSize: 16,
                  lineHeight: 1.5, color: "var(--ws-fg-1)",
                  fontWeight: line.role === "Headline" || line.role === "Heading" || line.role === "Name" ? 600 : 400
                }}>{line.text}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notes */}
      <section>
        <SectionLabel
          n={hasPhotos ? "03" : "02"}
          title={decision.status === "changes" ? "Requested changes" : "Notes (optional)"}
          tone={decision.status === "changes" ? "warn" : "default"}
        />
        <textarea
          value={decision.note || ""}
          onChange={(e) => onNote(e.target.value)}
          placeholder={decision.status === "changes"
            ? "What should change? Be specific — replace this headline, swap this photo, tighten this line…"
            : "Optional: a note about this section."}
          rows={4}
          style={{
            width: "100%", resize: "vertical",
            padding: "14px 16px",
            fontFamily: "var(--ws-font-sans)", fontSize: 15, lineHeight: 1.5,
            color: "var(--ws-fg-1)",
            background: "var(--ws-paper)",
            border: `1px solid ${decision.status === "changes" ? "var(--ws-warn-500)" : "var(--ws-steel-200)"}`,
            borderRadius: 4,
            outline: "none",
            boxShadow: decision.status === "changes" ? "0 0 0 3px rgba(227,160,8,0.18)" : "none"
          }}
        />
      </section>
    </div>
  );
}

function SectionLabel({ n, title, count, tone = "default" }) {
  const color = tone === "warn" ? "var(--ws-warn-500)" : "var(--ws-fg-1)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <span style={{
        fontFamily: "var(--ws-font-mono)", fontSize: 11,
        color: "var(--ws-fg-3)", letterSpacing: "0.04em"
      }}>{n}</span>
      <span style={{
        fontFamily: "var(--ws-font-sans)", fontSize: 12, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase", color
      }}>{title}</span>
      {typeof count === "number" && (
        <span style={{
          fontFamily: "var(--ws-font-mono)", fontSize: 11, fontWeight: 600,
          color: "var(--ws-fg-3)",
          padding: "1px 7px", border: "1px solid var(--ws-steel-200)",
          borderRadius: 999, background: "var(--ws-paper)"
        }}>{count}</span>
      )}
      <span style={{ flex: 1, height: 1, background: "var(--ws-steel-200)", marginLeft: 6 }}/>
    </div>
  );
}

/* ---------- Action bar ---------- */
function ActionBar({ item, activeIdx, total, decision, onApprove, onChanges, onSkip, onPrev, onNext, onClear }) {
  const isLast = activeIdx === total - 1;
  const status = decision.status || "pending";
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      background: "var(--ws-paper)",
      borderTop: "1px solid var(--ws-steel-200)",
      padding: "14px 56px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      boxShadow: "0 -8px 24px rgba(14, 30, 60, 0.06)"
    }}>
      {/* Left: prev + current status badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <RvButton variant="ghost" size="md" onClick={onPrev} disabled={activeIdx === 0} title="Previous (←)">
          <span aria-hidden style={{ fontSize: 14 }}>←</span> Prev
        </RvButton>
        {status !== "pending" && (
          <button
            type="button"
            onClick={onClear}
            title="Clear decision"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 12px",
              background: status === "approved" ? "var(--ws-run-100)" :
                          status === "changes"  ? "var(--ws-warn-100)" : "var(--ws-steel-100)",
              border: "none", borderRadius: 999,
              fontFamily: "var(--ws-font-sans)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: status === "approved" ? "#0E5C32" :
                     status === "changes"  ? "#7A540A" : "var(--ws-fg-3)",
              cursor: "pointer"
            }}
          >
            <StatusDot status={status} size={8}/>
            {status === "approved" ? "Approved" :
             status === "changes"  ? "Changes requested" :
             status === "skipped"  ? "Skipped" : ""}
            <span aria-hidden style={{ marginLeft: 4, opacity: 0.6 }}>✕</span>
          </button>
        )}
      </div>

      {/* Center: decision actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <RvButton variant="ghost" size="md" onClick={onSkip} title="Skip (S)">Skip</RvButton>
        <RvButton variant="changes" size="md" onClick={onChanges} title="Request changes (C)">
          <span aria-hidden style={{ fontSize: 14, marginRight: 2 }}>✎</span> Request changes
        </RvButton>
        <RvButton variant="approve" size="md" onClick={onApprove} title="Approve (A)">
          <span aria-hidden style={{ fontSize: 14, marginRight: 2 }}>✓</span> Approve
        </RvButton>
      </div>

      {/* Right: next + keys */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", gap: 14 }}>
          <KeyHint k="A" label="approve"/>
          <KeyHint k="C" label="changes"/>
          <KeyHint k="S" label="skip"/>
        </div>
        <RvButton variant="primary" size="md" onClick={onNext} title="Next (→)">
          {isLast ? "Finish" : "Next"} <span aria-hidden style={{ fontSize: 14 }}>→</span>
        </RvButton>
      </div>
    </div>
  );
}

/* ---------- Summary overlay ---------- */
function SummaryOverlay({ items, groups, decisions, stats, onClose, onJump, onReset }) {
  const changesList = items
    .map((it, i) => ({ it, i, d: decisions[it.id] || {} }))
    .filter(x => x.d.status === "changes");

  const summaryText = useMemoR(() => {
    const lines = [];
    lines.push(`WrapSense — Content Review Summary`);
    lines.push(`Approved: ${stats.approved}  ·  Changes: ${stats.changes}  ·  Skipped: ${stats.skipped}  ·  Pending: ${stats.pending}`);
    lines.push("");
    if (changesList.length === 0) {
      lines.push("No changes requested.");
    } else {
      lines.push("CHANGES REQUESTED");
      lines.push("──────────────────");
      changesList.forEach(({ it, d }) => {
        lines.push(`• ${it.page} / ${it.section}`);
        if (d.note) d.note.split("\n").forEach(l => lines.push(`    ${l}`));
        else lines.push(`    (no note provided)`);
        lines.push("");
      });
    }
    return lines.join("\n");
  }, [stats, changesList]);

  const [copied, setCopied] = useStateR(false);
  const [showText, setShowText] = useStateR(false);
  const textRef = useRefR(null);

  const doCopy = async () => {
    let ok = false;
    // Try modern clipboard API
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
        ok = true;
      }
    } catch (e) { /* fall through */ }
    // Fallback: use execCommand on a hidden textarea
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = summaryText;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (e) { /* still failed */ }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } else {
      // Last resort: reveal the text inline so the user can select-all + copy manually
      setShowText(true);
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.focus();
          textRef.current.select();
        }
      }, 30);
    }
  };

  const revealText = () => {
    setShowText(true);
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.focus();
        textRef.current.select();
      }
    }, 30);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(11,15,23,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 40
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(960px, 96vw)", maxHeight: "92vh", overflow: "hidden",
          background: "var(--ws-paper)", borderRadius: 6,
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          display: "flex", flexDirection: "column"
        }}>
        {/* Header */}
        <div style={{
          padding: "22px 28px",
          background: "var(--ws-navy-900)", color: "#fff",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end"
        }}>
          <div>
            <RvEyebrow color="var(--ws-blue-400)">Review summary</RvEyebrow>
            <h2 style={{
              fontFamily: "var(--ws-font-display)", fontSize: 32, fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "-0.01em",
              margin: "6px 0 0", color: "#fff"
            }}>
              {stats.pending === 0 ? "All sections reviewed." : `${stats.pending} section${stats.pending === 1 ? "" : "s"} still pending.`}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff", fontSize: 18, padding: "6px 12px", borderRadius: 4,
              cursor: "pointer", fontFamily: "var(--ws-font-sans)"
            }}>✕</button>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid var(--ws-steel-200)"
        }}>
          <SummaryStat label="Approved" count={stats.approved} total={items.length} status="approved"/>
          <SummaryStat label="Changes"  count={stats.changes}  total={items.length} status="changes"/>
          <SummaryStat label="Skipped"  count={stats.skipped}  total={items.length} status="skipped"/>
          <SummaryStat label="Pending"  count={stats.pending}  total={items.length} status="pending"/>
        </div>

        {/* List */}
        <div className="rv-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {showText && (
            <div style={{
              marginBottom: 20, padding: 14, background: "var(--ws-steel-50)",
              border: "1px solid var(--ws-steel-200)", borderRadius: 4
            }}>
              <div style={{
                fontFamily: "var(--ws-font-sans)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "var(--ws-fg-3)", marginBottom: 8,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span>Plain-text summary — select all + copy</span>
                <button
                  onClick={() => setShowText(false)}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer",
                    color: "var(--ws-fg-3)", fontFamily: "var(--ws-font-sans)",
                    fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700
                  }}>Hide</button>
              </div>
              <textarea
                ref={textRef}
                readOnly
                value={summaryText}
                onFocus={(e) => e.target.select()}
                style={{
                  width: "100%", minHeight: 220, resize: "vertical",
                  padding: 12, fontFamily: "var(--ws-font-mono)", fontSize: 12,
                  lineHeight: 1.5, color: "var(--ws-fg-1)",
                  background: "#fff", border: "1px solid var(--ws-steel-200)",
                  borderRadius: 4, outline: "none", whiteSpace: "pre"
                }}
              />
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              fontFamily: "var(--ws-font-sans)", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ws-warn-500)"
            }}>Changes requested</span>
            <span style={{
              fontFamily: "var(--ws-font-mono)", fontSize: 11, fontWeight: 600,
              color: "var(--ws-fg-3)",
              padding: "1px 7px", border: "1px solid var(--ws-steel-200)",
              borderRadius: 999, background: "var(--ws-paper)"
            }}>{changesList.length}</span>
            <span style={{ flex: 1, height: 1, background: "var(--ws-steel-200)", marginLeft: 6 }}/>
          </div>

          {changesList.length === 0 ? (
            <div style={{
              padding: "32px 20px", textAlign: "center",
              background: "var(--ws-steel-50)", borderRadius: 4,
              fontFamily: "var(--ws-font-sans)", color: "var(--ws-fg-3)",
              fontSize: 14
            }}>No changes have been requested.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {changesList.map(({ it, i, d }) => (
                <button
                  key={it.id}
                  onClick={() => onJump(i)}
                  style={{
                    textAlign: "left", padding: "16px 18px",
                    background: "var(--ws-warn-100)",
                    border: "1px solid var(--ws-warn-500)",
                    borderLeftWidth: 4, borderRadius: 4, cursor: "pointer",
                    display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#FBE3A0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--ws-warn-100)"; }}
                >
                  <div>
                    <div style={{
                      fontFamily: "var(--ws-font-sans)", fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "#7A540A", marginBottom: 4
                    }}>{it.page} · {it.section}</div>
                    <div style={{
                      fontFamily: "var(--ws-font-sans)", fontSize: 14,
                      color: "var(--ws-fg-1)", lineHeight: 1.5,
                      whiteSpace: "pre-wrap"
                    }}>{d.note ? d.note : <span style={{ color: "var(--ws-fg-3)", fontStyle: "italic" }}>(no note provided)</span>}</div>
                  </div>
                  <span style={{
                    fontFamily: "var(--ws-font-sans)", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#7A540A"
                  }}>Open ↗</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: "16px 28px",
          borderTop: "1px solid var(--ws-steel-200)",
          background: "var(--ws-steel-50)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12
        }}>
          <RvButton variant="danger" size="sm" onClick={onReset}>Reset all decisions</RvButton>
          <div style={{ display: "flex", gap: 10 }}>
            <RvButton variant="ghost" size="md" onClick={onClose}>Close</RvButton>
            <RvButton variant="primary" size="md" onClick={doCopy}>
              {copied ? "Copied ✓" : "Copy summary"}
            </RvButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryStat({ label, count, total, status }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{
      padding: "18px 22px",
      borderRight: "1px solid var(--ws-steel-100)",
      display: "flex", flexDirection: "column", gap: 4
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <StatusDot status={status} size={9}/>
        <span style={{
          fontFamily: "var(--ws-font-sans)", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--ws-fg-3)"
        }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{
          fontFamily: "var(--ws-font-display)", fontSize: 36, fontWeight: 800,
          color: "var(--ws-fg-1)", lineHeight: 1
        }}>{count}</span>
        <span style={{ fontFamily: "var(--ws-font-mono)", fontSize: 12, color: "var(--ws-fg-3)" }}>{pct}%</span>
      </div>
    </div>
  );
}
