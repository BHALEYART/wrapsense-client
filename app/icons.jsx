/* Inline industry + UI icons. 24×24 viewBox, currentColor stroke 1.75. */

const I = ({ children, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const WSIcon = ({ name, size = 24 }) => {
  const c = { size };
  switch (name) {
    case "bread": return (
      <I {...c}><path d="M4 14c0-3.3 3.6-6 8-6s8 2.7 8 6c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3z"/><path d="M9 12c.5-.6 1.2-1 2-1M14 11c.8 0 1.5.4 2 1M11 7c.3-1 1.1-2 2-2"/></I>
    );
    case "candy": return (
      <I {...c}><path d="M5 12l3-3v6l-3-3zM19 12l-3-3v6l3-3zM8 9h8v6H8z"/><path d="M10 11c1 1 3 1 4 0M10 13c1-1 3-1 4 0"/></I>
    );
    case "strawberry": return (
      <I {...c}><path d="M12 21c4 0 7-3.5 7-8 0-1.5-.5-3-1.5-4-1 .5-2 .5-3 0 .5-1 .5-2 0-3-1 .5-2 .5-3 0-1 .5-2 .5-3 0-.5 1-.5 2 0 3-1-.5-2-.5-3 0C5.5 10 5 11.5 5 13c0 4.5 3 8 7 8z"/><circle cx="10" cy="13" r=".4" fill="currentColor"/><circle cx="13" cy="14" r=".4" fill="currentColor"/><circle cx="11" cy="16" r=".4" fill="currentColor"/><circle cx="14" cy="17" r=".4" fill="currentColor"/></I>
    );
    case "nuts": return (
      <I {...c}><ellipse cx="9" cy="13" rx="3" ry="5" transform="rotate(-25 9 13)"/><ellipse cx="16" cy="14" rx="2" ry="3" transform="rotate(20 16 14)"/><ellipse cx="13" cy="8" rx="2" ry="2.5" transform="rotate(40 13 8)"/></I>
    );
    case "drumstick": return (
      <I {...c}><path d="M14 4c2.5 0 4.5 2 4.5 4.5 0 1.5-.8 2.8-2 3.5l-6 6c-1 1-2.5 1.5-3.5.5-1-1-.5-2.5.5-3.5l6-6c.7-1.2 2-2 3.5-2z"/><path d="M7 17l-2.5 2.5M5 19h.01M9 19h.01"/></I>
    );
    case "bean": return (
      <I {...c}><ellipse cx="10" cy="12" rx="3.5" ry="5.5" transform="rotate(-20 10 12)"/><ellipse cx="14" cy="13" rx="3.5" ry="5.5" transform="rotate(15 14 13)"/><path d="M9 8c0 2 .5 5 2 7M14 9c0 2 .5 5-1 7"/></I>
    );
    case "snowflake": return (
      <I {...c}><path d="M12 3v18M5 7l14 10M5 17l14-10"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2M3 9l2 3-2 3M21 9l-2 3 2 3"/></I>
    );
    case "leaf": return (
      <I {...c}><path d="M11 22c-2-3-1-7 1-9 2-2 6-3 9-1-1 6-5 10-10 10z"/><path d="M3 22c2-7 6-11 12-12M3 22c1-1 2-2 4-3"/></I>
    );
    case "paw": return (
      <I {...c}><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="5" cy="13" r="1.5"/><circle cx="19" cy="13" r="1.5"/><path d="M9 18c0-2 1-3 3-3s3 1 3 3-1 3-3 3-3-1-3-3z"/></I>
    );
    case "capsule": return (
      <I {...c}><rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/><circle cx="7.5" cy="12" r=".4" fill="currentColor"/><circle cx="5.5" cy="11" r=".4" fill="currentColor"/><circle cx="6" cy="13" r=".4" fill="currentColor"/></I>
    );
    case "pill": return (
      <I {...c}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1"/><circle cx="12" cy="9" r="1"/><circle cx="16" cy="9" r="1"/><circle cx="8" cy="13" r="1"/><circle cx="12" cy="13" r="1"/><circle cx="16" cy="13" r="1"/></I>
    );
    case "spray": return (
      <I {...c}><path d="M9 21h6v-9H9zM11 12V6M13 12V6M9 7h6"/><path d="M16 4l2-1M16 6l2 1M18 4v3"/></I>
    );
    case "stethoscope": return (
      <I {...c}><path d="M6 3v6a4 4 0 0 0 8 0V3"/><circle cx="18" cy="15" r="2.5"/><path d="M10 13v3a4 4 0 0 0 5.5 3.7"/></I>
    );
    case "cannabis": return (
      <I {...c}><path d="M12 22V10"/><path d="M12 14c-3-1-5-4-5-7 3 0 5 2 5 5M12 14c3-1 5-4 5-7-3 0-5 2-5 5"/><path d="M12 11c-3-2-4-5-3-8 3 1 4 4 3 7M12 11c3-2 4-5 3-8-3 1-4 4-3 7"/></I>
    );
    case "box": return (
      <I {...c}><path d="M21 8v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8"/><path d="M3 5h18l-1 3H4z"/><path d="M10 12h4"/></I>
    );
    case "bottle": return (
      <I {...c}><path d="M10 2h4v3l1 2v13a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V7l1-2V2z"/><path d="M10 11h4"/></I>
    );
    case "milk": return (
      <I {...c}><path d="M8 2h8v3l2 3v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8l2-3V2z"/><path d="M9 13h6v5H9z"/></I>
    );
    case "sparkle": return (
      <I {...c}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 16l.7 2L22 19l-2.3.8L19 22l-.7-2.2L16 19l2.3-1L19 16z"/></I>
    );
    /* UI */
    case "arrow-right": return <I {...c}><path d="M5 12h14M13 6l6 6-6 6"/></I>;
    case "chevron-down": return <I {...c}><path d="M6 9l6 6 6-6"/></I>;
    case "chevron-right": return <I {...c}><path d="M9 6l6 6-6 6"/></I>;
    case "phone": return <I {...c}><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></I>;
    case "mail": return <I {...c}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></I>;
    case "map-pin": return <I {...c}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></I>;
    case "check": return <I {...c}><path d="M5 12l5 5 9-12"/></I>;
    case "x": return <I {...c}><path d="M6 6l12 12M18 6l-12 12"/></I>;
    case "menu": return <I {...c}><path d="M3 6h18M3 12h18M3 18h18"/></I>;
    case "play": return <I {...c}><path d="M6 4l14 8-14 8z"/></I>;
    case "settings": return <I {...c}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.65 1.65 0 0 0-1.8-.3 1.65 1.65 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.65 1.65 0 0 0-1-1.5 1.65 1.65 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.65 1.65 0 0 0 .3-1.8 1.65 1.65 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.65 1.65 0 0 0 1.5-1 1.65 1.65 0 0 0-.3-1.8L4.2 6a2 2 0 1 1 2.8-2.8l.1.1a1.65 1.65 0 0 0 1.8.3h0a1.65 1.65 0 0 0 1-1.5V2a2 2 0 0 1 4 0v.1a1.65 1.65 0 0 0 1 1.5h0a1.65 1.65 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.65 1.65 0 0 0-.3 1.8v0a1.65 1.65 0 0 0 1.5 1H22a2 2 0 0 1 0 4h-.1a1.65 1.65 0 0 0-1.5 1z"/></I>;
    case "filter": return <I {...c}><path d="M3 4h18l-7 9v6l-4 2v-8z"/></I>;
    case "search": return <I {...c}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></I>;
    case "shield": return <I {...c}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></I>;
    case "wrench": return <I {...c}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5L13 10l1.7-1.7z"/></I>;
    case "factory": return <I {...c}><path d="M3 21V9l5 3V9l5 3V9l5 3v9z"/><path d="M7 17h2M11 17h2M15 17h2"/></I>;
    case "truck": return <I {...c}><path d="M2 7h11v9H2zM13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></I>;
    case "gauge": return <I {...c}><path d="M12 14l3-5"/><circle cx="12" cy="14" r="8"/><path d="M4 14a8 8 0 0 1 16 0"/></I>;
    case "linkedin": return <I {...c}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4M16 17v-3a2 2 0 0 0-4 0"/></I>;
    case "youtube": return <I {...c}><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M10 9l5 3-5 3z"/></I>;
    default: return null;
  }
};

window.WSIcon = WSIcon;
