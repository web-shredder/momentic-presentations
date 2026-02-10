import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft, ChevronRight, BarChart3, Users, Globe, Palette,
  Zap, Target, Layout, Sparkles, Clock, Phone, MapPin,
  Instagram, Mail, X, ArrowRight, Check, AlertTriangle,
  Eye, ChevronDown, Search, Camera
} from "lucide-react";

const LOGO = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNzcwLjIyIDEyMDAiPgogIDxnPgogICAgPHBhdGggZD0iTTE0NDUuMDQsNjE5LjUxYy03LjE1LTEwLjkzLTI4LjE3LTQ4LjM0LTI4LjE3LTQ4LjM0bC0xLjI2LjQyczMuNzgsNDMuMywzLjc4LDU3LjU5djExMC4xNGgtNzYuNTF2LTI3Ni42MWg3OS4wM2w3OS44NywxMjIuNzVoLjg0bDc5LjQ1LTEyMi43NWg3OS4wM3YyNzYuNjFoLTc2LjUxdi0xMTAuMTRjMC0xNC4yOSwzLjM2LTU3LjU5LDMuMzYtNTcuNTlsLTEuMjYtLjQycy0yMS4wMiwzNy40MS0yOC4xNyw0OC4zNGwtNTAuODYsNzkuMDNoLTEwLjkzbC01MS43MS03OS4wM1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0yMDAxLjg4LDU5OS40N2MwLDgzLjI0LTYwLjU0LDE0NS4wMy0xNTMuNDQsMTQ1LjAzcy0xNTMuODYtNTcuNTktMTUzLjg2LTE0NS4wM2MwLTgwLjI5LDY0Ljc0LTE0MS42NywxNTMuODYtMTQxLjY3czE1My40NCw2MS4zNywxNTMuNDQsMTQxLjY3Wk0xNzc1LjcxLDU5OS44OGMwLDQ3LjkyLDMxLjUzLDc0LjgzLDcyLjczLDc0LjgzczcyLjMtMjYuOSw3Mi4zLTc0LjgzYzAtNDMuMy0zMS4xMS03Mi4zLTcyLjMtNzIuM3MtNzIuNzMsMjkuMDEtNzIuNzMsNzIuM1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0yMTM3LjUxLDYxOC40NGMtNy4xNC0xMC45My0yOC4xNi00OC4zNC0yOC4xNi00OC4zNGwtMS4yNi40MnMzLjc4LDQzLjMsMy43OCw1Ny41OXYxMTAuMTRoLTc2LjUxdi0yNzYuNjFoNzkuMDNsNzkuODcsMTIyLjc1aC44NGw3OS40NS0xMjIuNzVoNzkuMDN2Mjc2LjYxaC03Ni41MXYtMTEwLjE0YzAtMTQuMjksMy4zNi01Ny41OSwzLjM2LTU3LjU5bC0xLjI2LS40MnMtMjEuMDIsMzcuNDEtMjguMTcsNDguMzRsLTUwLjg2LDc5LjAzaC0xMC45M2wtNTEuNzEtNzkuMDNaIiBzdHlsZT0iZmlsbDogIzE1MTYxODsgc3Ryb2tlLXdpZHRoOiAwcHg7Ii8+CiAgICA8cGF0aCBkPSJNMjQ3OS44Myw2MjguMzR2NDYuMjRoMTQ0LjYxdjY2aC0yMjEuMTJ2LTI3Ni42MWgyMTQuNHY2NmgtMTM3Ljg5djQxLjYyaDExOS4zOHY1Ni43NWgtMTE5LjM4WiIgc3R5bGU9ImZpbGw6ICMxNTE2MTg7IHN0cm9rZS13aWR0aDogMHB4OyIvPgogICAgPHBhdGggZD0iTTI4NjMuMzYsNDY3LjcyaDc2LjUxdjI3Ni42MWgtNzMuNTZsLTEyOS45LTE1OC45LS44NC40MnMzLjM2LDM3LDMuMzYsNTYuMzN2MTAyLjE1aC03Ni41MXYtMjc2LjYxaDc0LjgybDEyOC4yMiwxNTYuMzhoLjg0cy0yLjk0LTM2Ljk5LTIuOTQtNTIuOTd2LTEwMy40MVoiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0zMDUzLjY3LDUzMS42NGgtOTMuNzV2LTY3LjI2aDI2NC40MnY2Ny4yNmgtOTQuMTZ2MjA5LjM1aC03Ni41MXYtMjA5LjM1WiIgc3R5bGU9ImZpbGw6ICMxNTE2MTg7IHN0cm9rZS13aWR0aDogMHB4OyIvPgogICAgPHBhdGggZD0iTTMzMjAuODQsNDYyLjM2djI3Ni42MWgtNzYuNTF2LTI3Ni42MWg3Ni41MVoiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0zMzU0LjA4LDYwMS4zOGMwLTgwLjI5LDYwLjExLTE0NS44NywxNTQuNy0xNDUuODcsNTQuNjUsMCw4NS43NiwxOC4wOCwxMDQuNjgsMzIuMzdsLTIzLjU0LDYxLjM3Yy0xOS43Ni0xNS45Ny00NC45OC0yNi40OC03My45OS0yNi40OC00OS42LDAtNzkuNDUsMzQuNDctNzkuNDUsNzcuMzVzMjksNzQuODMsODEuMTMsNzQuODNjMzcsMCw2My45LTE4LjUsNzkuODctMzEuOTVsMjQuMzgsNTcuMTdjLTE0LjcxLDE1LjEzLTUzLjM5LDQyLjA0LTExMi42Niw0Mi4wNC0xMDguMDQsMC0xNTUuMTItNjcuMjYtMTU1LjEyLTE0MC44M1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICA8L2c+CiAgPGc+CiAgICA8cGF0aCBkPSJNMzY3OS4yMSw0NjcuNTloLTIyLjMzdi01LjIzaDUwLjQ2djUuMjNoLTIyLjMzdjQ4LjU3aC01Ljgxdi00OC41N1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0zNzI4LjM1LDQ4My4wNWMtMi4yMS0zLjc2LTcuNDQtMTMtNy40NC0xM2gtLjE3cy41OCwxMC4xNC41OCwxNC40OHYzMS42NWgtNS44MXYtNTMuODFoNi4zOGwyMC45NCwzNC4zNGguMTdsMjAuODYtMzQuMzRoNi4zN3Y1My44MWgtNS44di0zMS42NWMwLTQuMzMuNjYtMTQuNDguNjYtMTQuNDhoLS4yNXMtNS4xNSw5LjI0LTcuNDUsMTNsLTEzLjY1LDIyLjQ5aC0xLjY0bC0xMy43NC0yMi40OVoiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICA8L2c+CiAgPHBhdGggZD0iTTYwMCwxMDBjLTE0NC41MywwLTI4NC44MywyNy43LTQxNy42Miw4Mi4zOC01NC42OCwxMzIuNzgtODIuMzgsMjczLjA5LTgyLjM4LDQxNy42MnMyNy43LDI4NC44Myw4Mi4zOCw0MTcuNjJjMTMyLjc4LDU0LjY4LDI3My4wOSw4Mi4zOCw0MTcuNjIsODIuMzhzMjg0LjgzLTI3LjcsNDE3LjYyLTgyLjM4YzU0LjY4LTEzMi43OCw4Mi4zOC0yNzMuMDksODIuMzgtNDE3LjYycy0yNy43LTI4NC44My04Mi4zOC00MTcuNjJjLTEzMi43OC01NC42OC0yNzMuMDktODIuMzgtNDE3LjYyLTgyLjM4WiIgc3R5bGU9ImZpbGw6ICNmZmY7IHN0cm9rZS13aWR0aDogMHB4OyIvPgogIDxwYXRoIGQ9Ik02MDAsMEM0MjMuOTYsMCwyNTYuOTQsMzguMjIsMTA2LjMyLDEwNi4zMiwzOC4yMiwyNTYuOTQsMCw0MjMuOTYsMCw2MDBzMzguMjIsMzQzLjA2LDEwNi4zMiw0OTMuNjhjMTUwLjYyLDY4LjEsMzE3LjY0LDEwNi4zMiw0OTMuNjgsMTA2LjMyczM0My4wNi0zOC4yMiw0OTMuNjgtMTA2LjMyYzY4LjEtMTUwLjYyLDEwNi4zMi0zMTcuNjQsMTA2LjMyLTQ5My42OHMtMzguMjItMzQzLjA2LTEwNi4zMi00OTMuNjhDOTQzLjA2LDM4LjIyLDc3Ni4wNCwwLDYwMCwwWk0xMDE3LjYyLDEwMTcuNjJjLTEzMi43OCw1NC42OC0yNzMuMDksODIuMzgtNDE3LjYyLDgyLjM4cy0yODQuODMtMjcuNy00MTcuNjItODIuMzhjLTU0LjY4LTEzMi43OC04Mi4zOC0yNzMuMDktODIuMzgtNDE3LjYyczI3LjctMjg0LjgzLDgyLjM4LTQxNy42MmMxMzIuNzgtNTQuNjgsMjczLjA5LTgyLjM4LDQxNy42Mi04Mi4zOHMyODQuODMsMjcuNyw0MTcuNjIsODIuMzhjNTQuNjgsMTMyLjc4LDgyLjM4LDI3My4wOSw4Mi4zOCw0MTcuNjJzLTI3LjcsMjg0LjgzLTgyLjM4LDQxNy42MloiIHN0eWxlPSJmaWxsOiAjZmY0ZjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICA8cGF0aCBkPSJNNTA1LDYzMC44NWMtMTEuOTItMTguMjMtNDYuOTctODAuNjItNDYuOTctODAuNjJsLTIuMS43czYuMzEsNzIuMjEsNi4zMSw5Ni4wNHYxODMuNjhoLTEyNy41OXYtNDYxLjNoMTMxLjhsMTMzLjIxLDIwNC43MWgxLjRsMTMyLjUtMjA0LjcxaDEzMS44djQ2MS4zaC0xMjcuNnYtMTgzLjY4YzAtMjMuODQsNS42MS05Ni4wNCw1LjYxLTk2LjA0bC0yLjEtLjdzLTM1LjA1LDYyLjM5LTQ2Ljk3LDgwLjYybC04NC44MywxMzEuOGgtMTguMjNsLTg2LjI0LTEzMS44WiIgc3R5bGU9ImZpbGw6ICMxNTE2MTg7IHN0cm9rZS13aWR0aDogMHB4OyIvPgo8L3N2Zz4=`;

/* ─── DESIGN TOKENS (DARK MODE) ─────────────────────────── */
const C = {
  bg: '#0f1117', surface: '#161822', white: '#ffffff',
  heading: '#f0f0f2', body: '#B2C0CF', muted: '#5B6672', faint: '#3a3f4b',
  border: 'rgba(255,255,255,0.08)', borderLight: 'rgba(255,255,255,0.14)',
  cardBg: 'rgba(255,255,255,0.04)', cardHover: 'rgba(255,255,255,0.07)',
  orange: '#FE2516', yellow: '#C9FC19', green: '#24FD4F',
  gold: '#D4A03C', hhGreen: '#3a6b35', hhCream: '#FFF9F0',
  hhDark: '#1C1C1C', hhRose: '#b5695f', hhSoft: '#f5e6c8', hhAmber: '#c8882a',
};
const font = "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif";

/* ─── HOOKS ──────────────────────────────────────────────── */
function useEnter() {
  const [on, set] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => set(true)));
    return () => cancelAnimationFrame(r);
  }, []);
  return (i = 0, extra = {}) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
    transition: `all 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.13}s`,
    ...extra,
  });
}

function useCounter(target, duration = 1200, delay = 800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const iv = setInterval(() => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(target * ease));
        if (p >= 1) clearInterval(iv);
      }, 16);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
}

/* ─── MICRO COMPONENTS ───────────────────────────────────── */

function GlassCard({ children, style = {}, glow }) {
  return (
    <div style={{
      background: C.cardBg,
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderRadius: 16, padding: '24px 28px',
      boxShadow: glow
        ? `0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px ${glow}33, 0 0 24px ${glow}15`
        : '0 8px 32px rgba(0,0,0,0.2)',
      border: `1px solid ${glow ? glow + '44' : C.border}`,
      transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      ...style,
    }}>
      {children}
    </div>
  );
}

function BrowserChrome({ url, children, style = {} }) {
  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 16px 64px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)',
      border: `1px solid ${C.border}`, background: C.surface, ...style,
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)' }} />
        </div>
        <div style={{
          flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 7,
          padding: '5px 12px', fontSize: 11, color: C.muted,
          fontFamily: 'SF Mono, Menlo, monospace',
          border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {url}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Badge({ children, color = C.orange }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px',
      borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
      background: `${color}18`, color, textTransform: 'uppercase', fontFamily: font,
    }}>{children}</span>
  );
}

function ScoreRing({ score, label, icon: Icon, color, detail, size = 110 }) {
  const val = useCounter(score, 1400, 600);
  const [open, setOpen] = useState(false);
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (val / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => setOpen(!open)}>
      <div style={{ position: 'relative' }}>
        <svg width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={6} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 0.08s' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: size * 0.24, fontWeight: 700, color, fontFamily: font }}>{val}</span>
          <Icon size={size * 0.15} color={C.muted} style={{ marginTop: 2 }} />
        </div>
      </div>
      <span style={{ fontSize: 13, color: C.body, fontWeight: 500, fontFamily: font }}>{label}</span>
      {open && (
        <div style={{
          fontSize: 12, color: C.body, maxWidth: 180, textAlign: 'center', lineHeight: 1.5,
          padding: '10px 14px', borderRadius: 10, background: C.cardBg, border: `1px solid ${C.border}`, fontFamily: font,
        }}>{detail}</div>
      )}
    </div>
  );
}

/* ─── DATA ───────────────────────────────────────────────── */

const FLAVORS = [
  { name: 'Lavender & local honey', color: '#9b7ecf', desc: 'Wildflower honey from our own hives meets French lavender' },
  { name: 'Cedarburg cherry bourbon', color: '#8b2252', desc: 'Door County cherries, barrel-aged bourbon, brown sugar crumble' },
  { name: 'Spotted Cow float', color: '#d4a03c', desc: "Vanilla bean ice cream swirled with Wisconsin's favorite ale" },
  { name: 'Maple bacon crunch', color: '#a0622e', desc: "Pure Wisconsin maple syrup, candied Nueske's bacon, toffee bits" },
  { name: 'Mint chip meadow', color: '#4a9e6b', desc: 'Fresh spearmint cream with dark chocolate from Indulgence Chocolatiers' },
  { name: 'Honey butter pecan', color: '#c8882a', desc: 'Browned butter, local honey caramel, toasted Illinois pecans' },
];

const TESTIMONIALS = [
  { name: 'Sarah M.', loc: 'Mequon', text: 'We drove 30 minutes and it was absolutely worth it. The Spotted Cow Float is genius. Pure Wisconsin in a cone.', stars: 5 },
  { name: 'Jake & Emma', loc: 'Grafton', text: 'Best first-date spot on the Northshore. Ended up staying two hours. The honey flight was incredible.', stars: 5 },
  { name: 'Linda K.', loc: 'Cedarburg', text: "Astrid remembers every regular's name and favorite flavor. This place feels like home, but fancier.", stars: 5 },
];

const AUDIT_ITEMS = [
  { label: 'Performance', score: 31, icon: Zap, color: '#ef4444', detail: '8.2s load time. Uncompressed images averaging 2.4MB. No caching or CDN. Render-blocking scripts.' },
  { label: 'SEO', score: 18, icon: Search, color: '#ef4444', detail: 'No meta descriptions. Zero alt text on images. No sitemap. Only 3 indexed pages. Missing schema markup.' },
  { label: 'Mobile', score: 24, icon: Phone, color: '#ef4444', detail: 'Not responsive. Text requires pinch-zoom. Buttons too small to tap. Horizontal scroll on every page.' },
  { label: 'Accessibility', score: 38, icon: Eye, color: '#f59e0b', detail: 'Poor color contrast (2.1:1). No heading hierarchy. Missing form labels. No keyboard navigation.' },
  { label: 'Brand', score: 25, icon: Palette, color: '#ef4444', detail: '6 different fonts. No consistent color palette. Logo is a low-res JPEG. Instagram and website feel like different businesses.' },
  { label: 'Conversion', score: 12, icon: Target, color: '#ef4444', detail: 'No online ordering. No clear CTA on any page. Contact form is broken. No booking or reservation system.' },
];

const STRATEGY_ITEMS = [
  { title: 'Brand identity refresh', icon: Palette, desc: 'Cohesive visual language: new logo, color palette, typography, and photography direction that bridges the warmth of the apiary with the polish of an artisan brand.', timeline: 'Weeks 1\u20132' },
  { title: 'Website rebuild', icon: Layout, desc: 'Modern, mobile-first architecture. Fast load times. Online ordering integration. Optimized for both search engines and real humans looking for ice cream.', timeline: 'Weeks 3\u20136' },
  { title: 'Content strategy', icon: Sparkles, desc: 'Seasonal flavor spotlights, the Herd & Honey story, a behind-the-hives blog, and dedicated Cedarburg community pages that earn local search authority.', timeline: 'Weeks 4\u20138' },
  { title: 'Local SEO', icon: MapPin, desc: 'Complete Google Business Profile with photos, accurate NAP citations across 40+ directories, local schema markup, and review generation strategy.', timeline: 'Weeks 2\u20134' },
  { title: 'Social integration', icon: Instagram, desc: 'Instagram feed embedded on-site, user-generated content gallery, social proof throughout the customer journey, and cross-platform booking links.', timeline: 'Weeks 6\u20138' },
];

/* ─── SLIDE 1: TITLE ─────────────────────────────────────── */

function Slide_Title() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '60px 80px', position: 'relative' }}>
      <div style={a(0)}>
        <img src={LOGO} alt="Momentic" style={{ height: 36, marginBottom: 48, filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
      </div>
      <div style={a(1)}>
        <Badge>The Momentic method</Badge>
      </div>
      <div style={a(2)}>
        <h1 style={{
          fontFamily: font, fontSize: 68, fontWeight: 700, color: C.heading,
          lineHeight: 1.05, maxWidth: 700, margin: '28px auto 0',
        }}>
          From discovery to launch
        </h1>
      </div>
      <div style={a(3)}>
        <div style={{ width: 60, height: 4, background: C.orange, borderRadius: 2, margin: '28px auto' }} />
      </div>
      <div style={a(4)}>
        <p style={{ fontFamily: font, fontSize: 18, color: C.body, fontWeight: 400 }}>
          An interactive case study
        </p>
      </div>
      <div style={a(5)}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14, padding: '14px 24px', borderRadius: 14,
          background: C.cardBg, border: `1px solid ${C.border}`, marginTop: 36,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: `linear-gradient(135deg, ${C.gold}, ${C.hhAmber})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>🍯</div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: C.heading }}>Herd & Honey</p>
            <p style={{ fontFamily: font, fontSize: 12, color: C.muted }}>Artisan ice cream & apiary, Cedarburg, WI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 2: MEET THE CLIENT ────────────────────────────── */

function BadWebsite() {
  return (
    <div style={{ background: '#ffffcc', border: 'none', padding: 0, fontFamily: "'Comic Sans MS', 'Papyrus', cursive", color: '#000', fontSize: 12, textAlign: 'center' }}>
      <div style={{ background: 'linear-gradient(to right, #006600, #ffcc00)', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>🐝 HERD & HONEY 🐄</span>
        <span style={{ color: 'white', fontSize: 8 }}>Best viewed in 800x600</span>
      </div>
      <div style={{ background: '#ff0000', color: 'white', padding: 4, fontSize: 11, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <span style={{ display: 'inline-block', animation: 'marquee 8s linear infinite' }}>
          ★★★ NEW FLAVOR ALERT: We now have CHOCOLATE!!! ★★★ GRAND OPENING SALE (ended Nov 2022) ★★★ GO PACK GO!!! ★★★
        </span>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <h2 style={{ fontSize: 22, animation: 'rainbow 3s linear infinite', fontFamily: "'Papyrus', fantasy", margin: '8px 0' }}>
          ★ WELCOME TO HERD & HONEY!!! ★
        </h2>
        <p style={{ fontSize: 10, color: '#666' }}>~ Your #1 Source for Ice Cream in Cedarburg, Wisconsin ~</p>
        <hr style={{ border: '2px dashed #ff6600', margin: '10px 0' }} />
        <div style={{ animation: 'blinkFast 1s step-end infinite', color: '#ff0000', fontWeight: 'bold', fontSize: 14, margin: '6px 0' }}>
          🍦 !! NEW FLAVORS !! 🍦
        </div>
        <div style={{ textAlign: 'left', padding: '4px 20px', fontSize: 11 }}>
          <div>🟡 Vanilla</div>
          <div>🟤 Chocolate <span style={{ color: 'red', fontWeight: 'bold', fontSize: 9 }}>(NEW!!!)</span></div>
          <div>🔴 Strawberry</div>
          <div>🟡 Honey (our speciality!)</div>
        </div>
        <hr style={{ border: '1px dotted #999', margin: '10px 0' }} />
        <div style={{ marginTop: 8, padding: '6px', background: '#eee', border: '1px inset #ccc', fontSize: 10 }}>
          <span style={{ fontWeight: 'bold' }}>You are visitor </span>
          <span style={{ fontFamily: 'monospace', background: '#000', color: '#0f0', padding: '0 4px' }}>#00047</span>
        </div>
        <div style={{ fontSize: 9, color: '#999', marginTop: 8 }}>
          Last updated: November 14, 2022<br/>
          🧀 Proud member of the Cedarburg Chamber of Commerce 🧀<br/>
          <span style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>{'>>>'} SIGN OUR GUESTBOOK {'<<<'}</span>
        </div>
        <div style={{ marginTop: 8, padding: 6, background: '#ffff00', border: '2px dashed black', fontSize: 10, fontWeight: 'bold' }}>
          🚧 ONLINE ORDERING COMING SOON! 🚧<br/>
          <span style={{ fontWeight: 'normal', fontSize: 9 }}>(since March 2022)</span>
        </div>
      </div>
    </div>
  );
}

function Slide_MeetClient() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: '100%', padding: '48px 60px', gap: 40 }}>
      {/* Left: info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, ...a(0) }}>
        <div>
          <Badge color={C.gold}>Case study</Badge>
          <h2 style={{ fontFamily: font, fontSize: 44, fontWeight: 700, color: C.heading, lineHeight: 1.08, marginTop: 14 }}>
            Meet Herd & Honey
          </h2>
          <p style={{ fontFamily: font, fontSize: 16, color: C.body, lineHeight: 1.6, marginTop: 10 }}>
            Artisan ice cream and apiary, downtown Cedarburg. Incredible product. Terrible digital presence.
          </p>
        </div>
        <GlassCard style={{ flex: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: `linear-gradient(135deg, ${C.gold}, ${C.hhAmber})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>🍯</div>
            <div>
              <p style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: C.heading }}>Herd & Honey</p>
              <p style={{ fontFamily: font, fontSize: 11, color: C.muted }}>Washington Ave, Cedarburg, WI</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { l: 'Founded', v: '2021' }, { l: 'Owner', v: 'Astrid Sorenson' },
              { l: 'Instagram', v: '11.2K followers' }, { l: 'Google rating', v: '4.9 ★ (187)' },
              { l: 'Signature', v: 'Honey ice cream' }, { l: 'Bee hives', v: '42 active' },
            ].map(({ l, v }) => (
              <div key={l}>
                <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</p>
                <p style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: C.heading, marginTop: 2 }}>{v}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard style={{ flex: 1 }}>
          <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>The problem</p>
          <p style={{ fontFamily: font, fontSize: 14, color: C.body, lineHeight: 1.7 }}>
            Herd & Honey has a cult following on Instagram and lines around the block on summer weekends.
            But their website was built on a free builder in 2021 and never touched again.
            It doesn't represent the experience, it doesn't show up in search, and it can't take a single online order.
          </p>
          <p style={{ fontFamily: font, fontSize: 14, color: C.body, lineHeight: 1.7, marginTop: 10 }}>
            Astrid hears "I didn't even know you existed!" at least once a day from new walk-ins.
          </p>
        </GlassCard>
      </div>
      {/* Right: bad website */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, ...a(1) }}>
        <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Their current website</p>
        <BrowserChrome url="herdandhoney.freesite.com" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 420 }}>
            <BadWebsite />
          </div>
        </BrowserChrome>
        <p style={{ fontFamily: font, fontSize: 12, color: C.muted, fontStyle: 'italic', textAlign: 'center' }}>
          Yes, really. This was the actual state of affairs.
        </p>
      </div>
    </div>
  );
}

/* ─── SLIDE 3: DISCOVERY ──────────────────────────────────── */

function Slide_Discovery() {
  const a = useEnter();
  const [tab, setTab] = useState(0);
  const tabs = [
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Audience', icon: Users },
    { label: 'Competition', icon: Globe },
    { label: 'Brand gap', icon: Palette },
  ];

  const panels = [
    /* Analytics */
    <div key="a">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
        {[
          { l: 'Monthly visits', v: '340', sub: 'Instagram drives 62%' },
          { l: 'Bounce rate', v: '78%', sub: 'People leave immediately', bad: true },
          { l: 'Avg. session', v: '0:31', sub: 'Barely glance at it', bad: true },
          { l: 'Organic search', v: '8%', sub: 'Nearly invisible to Google', bad: true },
        ].map(({ l, v, sub, bad }) => (
          <GlassCard key={l} style={{ padding: '18px 20px' }}>
            <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{l}</p>
            <p style={{ fontFamily: font, fontSize: 30, fontWeight: 700, color: bad ? '#ef4444' : C.heading, lineHeight: 1 }}>{v}</p>
            <p style={{ fontFamily: font, fontSize: 11, color: C.muted, marginTop: 6 }}>{sub}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard style={{ padding: '16px 20px' }}>
        <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Traffic sources</p>
        <div style={{ display: 'flex', gap: 3, height: 28, borderRadius: 6, overflow: 'hidden' }}>
          {[
            { l: 'Instagram 62%', pct: 62, color: '#E1306C' },
            { l: 'Direct 24%', pct: 24, color: C.muted },
            { l: 'Organic 8%', pct: 8, color: '#34a853' },
            { l: 'Referral 6%', pct: 6, color: '#4285f4' },
          ].map(({ l, pct, color }) => (
            <div key={l} style={{ width: `${pct}%`, background: color, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: C.white, fontFamily: font, minWidth: 42 }}>{l}</div>
          ))}
        </div>
      </GlassCard>
    </div>,

    /* Audience */
    <div key="b" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
      {[
        { name: 'Weekend Wendy', age: '35, Mequon', avatar: '👩‍👧', text: "Searches 'things to do in Cedarburg this weekend.' Wants family-friendly, Instagram-worthy experiences. Checks reviews before going anywhere." },
        { name: 'Foodie Fiona', age: '28, Milwaukee', avatar: '📸', text: "Follows @herdandhoney on Instagram already. Considers herself an 'artisan food explorer.' Drives 30 minutes for the right scoop." },
        { name: 'Tourist Tom', age: '55, Illinois', avatar: '🗺️', text: "Day-tripping to Cedarburg from the Chicago suburbs. Googles 'best ice cream Cedarburg WI.' Needs clear directions, hours, and a reason to choose." },
      ].map(({ name, age, avatar, text }) => (
        <GlassCard key={name}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: C.cardHover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{avatar}</div>
            <div>
              <p style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: C.heading }}>{name}</p>
              <p style={{ fontFamily: font, fontSize: 11, color: C.muted }}>{age}</p>
            </div>
          </div>
          <p style={{ fontFamily: font, fontSize: 13, color: C.body, lineHeight: 1.6 }}>{text}</p>
        </GlassCard>
      ))}
    </div>,

    /* Competition */
    <div key="c">
      <GlassCard style={{ padding: '20px 24px', marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 0 }}>
          {['Metric', 'Herd & Honey', 'Purple Door IC', "Kopp's Custard"].map((h, i) => (
            <div key={h} style={{ fontFamily: font, fontSize: 11, fontWeight: 600, color: i === 0 ? C.muted : i === 1 ? C.gold : C.heading, textTransform: 'uppercase', letterSpacing: 0.5, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>{h}</div>
          ))}
          {[
            ['Organic keywords', '12', '1,847', '3,420'],
            ['Monthly organic traffic', '28', '4,200', '8,900'],
            ['Domain rating', '8', '42', '56'],
            ['Google Business Profile', 'Incomplete', 'Optimized', 'Optimized'],
            ['Online ordering', 'None', 'Full e-comm', 'Order ahead'],
            ['Mobile experience', 'Broken', 'Excellent', 'Good'],
          ].map(([metric, ...vals]) => (
            <div key={metric} style={{ display: 'contents' }}>
              <div style={{ fontFamily: font, fontSize: 13, color: C.body, padding: '9px 0', borderBottom: `1px solid ${C.border}06` }}>{metric}</div>
              {vals.map((v, i) => (
                <div key={i} style={{ fontFamily: font, fontSize: 13, fontWeight: i === 0 ? 600 : 400, padding: '9px 0', color: i === 0 ? '#ef4444' : C.heading, borderBottom: `1px solid ${C.border}06` }}>{v}</div>
              ))}
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard glow="#ef4444" style={{ padding: '12px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={16} color="#ef4444" />
          <span style={{ fontFamily: font, fontSize: 13, color: '#ef4444', fontWeight: 500 }}>
            Competitors are outpacing Herd & Honey in organic search by more than 100 to 1.
          </span>
        </div>
      </GlassCard>
    </div>,

    /* Brand gap */
    <div key="d" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div>
        <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Current brand perception</p>
        <GlassCard glow="#ef4444" style={{ padding: '20px 24px' }}>
          {[
            'Feels like a hobby, not a business',
            'Website looks abandoned',
            'No consistent visual identity',
            'Instagram is the only touchpoint that feels polished',
            'Google Business Profile has wrong hours and no photos',
            'Locals love it but cannot find it online',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
              <X size={14} color="#ef4444" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: font, fontSize: 13, color: C.body }}>{item}</span>
            </div>
          ))}
        </GlassCard>
      </div>
      <div>
        <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Target brand perception</p>
        <GlassCard glow={C.gold} style={{ padding: '20px 24px' }}>
          {[
            "Cedarburg's premier artisan food destination",
            'Website that matches the in-store experience',
            'Warm, sophisticated, distinctly Wisconsin',
            'Every platform tells the same cohesive story',
            'Easy to find, easy to order, easy to love',
            'A brand tourists and locals feel proud to recommend',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
              <Check size={14} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: font, fontSize: 13, color: C.body }}>{item}</span>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>,
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 60px' }}>
      <div style={a(0)}>
        <Badge color={C.orange}>Phase 1</Badge>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.heading, lineHeight: 1.08, marginTop: 14, marginBottom: 6 }}>
          Discovery deep dive
        </h2>
        <p style={{ fontFamily: font, fontSize: 15, color: C.body, marginBottom: 18 }}>
          Before we touch a single pixel, we learn everything about the business, its audience, and its competitive landscape.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, ...a(1) }}>
        {tabs.map(({ label, icon: Icon }, i) => (
          <button key={label} onClick={(e) => { e.stopPropagation(); setTab(i); }} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10,
            border: `1px solid ${i === tab ? C.orange + '50' : C.border}`,
            background: i === tab ? C.orange + '15' : C.cardBg,
            color: i === tab ? C.orange : C.muted, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: font,
          }}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, ...a(2) }}>{panels[tab]}</div>
    </div>
  );
}

/* ─── SLIDE 4: AUDIT ──────────────────────────────────────── */

function Slide_Audit() {
  const a = useEnter();
  const overall = Math.round(AUDIT_ITEMS.reduce((s, x) => s + x.score, 0) / AUDIT_ITEMS.length);
  const ov = useCounter(overall, 1400, 600);
  const r = 78, circ = 2 * Math.PI * r;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '48px 60px' }}>
      <div style={{ textAlign: 'center', ...a(0) }}>
        <Badge color="#ef4444">Phase 2</Badge>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.heading, marginTop: 14, marginBottom: 6 }}>
          The audit results
        </h2>
        <p style={{ fontFamily: font, fontSize: 15, color: C.body, marginBottom: 28 }}>
          We score every dimension of the digital presence. Click any category to see the details.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 56, ...a(1) }}>
        {/* Overall ring */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <svg width={180} height={180}>
              <circle cx={90} cy={90} r={r} fill="none" stroke={C.border} strokeWidth={8} />
              <circle cx={90} cy={90} r={r} fill="none" stroke="#ef4444" strokeWidth={8}
                strokeDasharray={circ} strokeDashoffset={circ - (ov / 100) * circ}
                strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 0.08s' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: font, fontSize: 48, fontWeight: 700, color: '#ef4444' }}>{ov}</span>
              <span style={{ fontFamily: font, fontSize: 13, color: C.muted }}>Overall</span>
            </div>
          </div>
          <GlassCard glow="#ef4444" style={{ padding: '12px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: '#ef4444' }}>Critical condition</p>
            <p style={{ fontFamily: font, fontSize: 12, color: C.body, marginTop: 4 }}>This website needs emergency intervention</p>
          </GlassCard>
        </div>
        {/* Category rings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
          {AUDIT_ITEMS.map(item => <ScoreRing key={item.label} {...item} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 5: STRATEGY ───────────────────────────────────── */

function Slide_Strategy() {
  const a = useEnter();
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 60px' }}>
      <div style={a(0)}>
        <Badge color={C.gold}>Phase 3</Badge>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.heading, marginTop: 14, marginBottom: 6 }}>
          The strategy
        </h2>
        <p style={{ fontFamily: font, fontSize: 15, color: C.body, marginBottom: 18 }}>
          Five connected pillars that work together. Click any pillar to see the details.
        </p>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, ...a(1) }}>
        {STRATEGY_ITEMS.map(({ title, icon: Icon, desc, timeline }, i) => (
          <div key={title} onClick={(e) => { e.stopPropagation(); setExpanded(expanded === i ? null : i); }}
            style={{
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
              border: `1px solid ${expanded === i ? C.gold + '50' : C.border}`,
              background: expanded === i ? `${C.gold}0a` : C.cardBg,
              transition: 'all 0.3s ease',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px' }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: expanded === i ? `${C.gold}25` : C.cardHover,
              }}>
                <Icon size={17} color={expanded === i ? C.gold : C.muted} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: C.heading }}>{title}</p>
                <p style={{ fontFamily: font, fontSize: 12, color: C.muted }}>{timeline}</p>
              </div>
              <ChevronDown size={18} color={C.muted} style={{ transition: 'transform 0.3s', transform: expanded === i ? 'rotate(180deg)' : 'rotate(0)' }} />
            </div>
            {expanded === i && (
              <div style={{ padding: '0 20px 16px 72px' }}>
                <p style={{ fontFamily: font, fontSize: 14, color: C.body, lineHeight: 1.7 }}>{desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 6: THE BUILD ──────────────────────────────────── */

function Slide_Build() {
  const a = useEnter();
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Research', icon: Search, color: C.orange },
    { label: 'Wireframe', icon: Layout, color: '#8b5cf6' },
    { label: 'Design', icon: Palette, color: C.gold },
    { label: 'Launch', icon: Zap, color: '#22c55e' },
  ];

  const panels = [
    /* Research */
    <div key="r" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <GlassCard>
        <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Information architecture</p>
        {['Homepage', 'Flavors & menu', 'Our story', 'The apiary', 'Visit us', 'Order online', 'Cedarburg community', 'Blog'].map((p, i) => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? `2px solid ${C.gold}30` : 'none', marginLeft: i > 0 ? 8 : 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold }} />
            <span style={{ fontFamily: font, fontSize: 13, color: i === 0 ? C.heading : C.body }}>{p}</span>
          </div>
        ))}
      </GlassCard>
      <GlassCard>
        <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Key user flows</p>
        {[
          'Discover \u2192 Browse flavors \u2192 Order online',
          "Search 'ice cream Cedarburg' \u2192 Land on homepage \u2192 Get directions",
          'See Instagram \u2192 Visit website \u2192 Book a tasting',
          'Read blog \u2192 Explore flavors \u2192 Share with friends',
        ].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0' }}>
            <ArrowRight size={14} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: font, fontSize: 13, color: C.body }}>{f}</span>
          </div>
        ))}
      </GlassCard>
    </div>,

    /* Wireframe */
    <GlassCard key="w" style={{ padding: 20 }}>
      <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Homepage wireframe</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.cardHover, borderRadius: 8, padding: '10px 14px' }}>
          <div style={{ width: 80, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ flex: 1 }} />
          {[1,2,3,4].map(i => <div key={i} style={{ width: 50, height: 8, borderRadius: 3, background: C.border }} />)}
        </div>
        <div style={{ background: C.cardHover, borderRadius: 8, padding: 24, textAlign: 'center' }}>
          <div style={{ width: '60%', height: 16, borderRadius: 4, background: 'rgba(255,255,255,0.12)', margin: '0 auto 8px' }} />
          <div style={{ width: '40%', height: 10, borderRadius: 4, background: C.border, margin: '0 auto 16px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <div style={{ width: 100, height: 28, borderRadius: 6, background: `${C.gold}30` }} />
            <div style={{ width: 100, height: 28, borderRadius: 6, background: C.border }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ background: C.cardBg, borderRadius: 8, padding: 14 }}>
              <div style={{ width: '100%', height: 48, borderRadius: 6, background: C.cardHover, marginBottom: 8 }} />
              <div style={{ width: '70%', height: 8, borderRadius: 3, background: C.border, marginBottom: 4 }} />
              <div style={{ width: '90%', height: 6, borderRadius: 3, background: C.cardBg }} />
            </div>
          ))}
        </div>
      </div>
    </GlassCard>,

    /* Design */
    <GlassCard key="d" style={{ padding: 20 }}>
      <p style={{ fontFamily: font, fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Brand system applied</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <p style={{ fontFamily: font, fontSize: 12, color: C.muted, marginBottom: 8 }}>Color palette</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[C.gold, C.hhGreen, C.hhCream, C.hhDark, C.hhRose, C.hhSoft].map(c => (
              <div key={c} style={{ width: 36, height: 36, borderRadius: 8, background: c, border: c === C.hhCream ? '1px solid rgba(255,255,255,0.2)' : 'none' }} />
            ))}
          </div>
          <p style={{ fontFamily: font, fontSize: 12, color: C.muted, marginBottom: 8 }}>Typography</p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 4 }}>Herd & Honey</p>
          <p style={{ fontFamily: font, fontSize: 14, color: C.body }}>Serif headings with clean sans body text</p>
        </div>
        <div>
          <p style={{ fontFamily: font, fontSize: 12, color: C.muted, marginBottom: 8 }}>Design preview</p>
          <div style={{ borderRadius: 10, overflow: 'hidden', background: C.hhCream, padding: 18, color: C.hhDark }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: C.hhDark, marginBottom: 4 }}>Handcrafted with care</p>
            <p style={{ fontFamily: font, fontSize: 11, color: '#666', lineHeight: 1.5, marginBottom: 12 }}>
              From our hives to your cone, every scoop tells the story of Cedarburg.
            </p>
            <div style={{ padding: '6px 14px', borderRadius: 20, background: C.gold, color: C.white, fontSize: 11, fontWeight: 600, display: 'inline-block', fontFamily: font }}>
              View flavors
            </div>
          </div>
        </div>
      </div>
    </GlassCard>,

    /* Launch */
    <GlassCard key="l" glow="#22c55e" style={{ textAlign: 'center', padding: 32 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
      <p style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: C.heading, marginBottom: 8 }}>Ready for launch</p>
      <p style={{ fontFamily: font, fontSize: 14, color: C.body, lineHeight: 1.6, maxWidth: 500, margin: '0 auto 20px' }}>
        Performance tested, mobile optimized, SEO configured, analytics connected,
        online ordering integrated, and Google Business Profile updated.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        {[
          { l: 'Page speed', v: '97/100' },
          { l: 'SEO score', v: '94/100' },
          { l: 'Accessibility', v: '98/100' },
        ].map(({ l, v }) => (
          <div key={l} style={{ padding: '10px 22px', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <p style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: '#22c55e' }}>{v}</p>
            <p style={{ fontFamily: font, fontSize: 11, color: C.muted }}>{l}</p>
          </div>
        ))}
      </div>
    </GlassCard>,
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 60px' }}>
      <div style={a(0)}>
        <Badge color="#8b5cf6">Phase 4</Badge>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.heading, marginTop: 14, marginBottom: 6 }}>
          Watch it come together
        </h2>
        <p style={{ fontFamily: font, fontSize: 15, color: C.body, marginBottom: 18 }}>
          From architecture to launch, every step is intentional.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20, ...a(1) }}>
        {steps.map(({ label, icon: Icon, color }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <button onClick={(e) => { e.stopPropagation(); setStep(i); }} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
              background: i <= step ? `${color}15` : C.cardBg,
              border: `1px solid ${i === step ? color + '50' : C.border}`,
              color: i <= step ? color : C.muted, fontSize: 13, fontWeight: i === step ? 600 : 400, fontFamily: font,
              transition: 'all 0.2s ease',
            }}>
              {i < step ? <Check size={14} /> : <Icon size={14} />}
              {label}
            </button>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 8px', background: i < step ? `${steps[i + 1].color}40` : C.border, transition: 'background 0.3s' }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, ...a(2) }}>{panels[step]}</div>
    </div>
  );
}

/* ─── SLIDE 7: THE HOMEPAGE REVEAL ────────────────────────── */

function Slide_Homepage() {
  const a = useEnter();
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '12px 32px 0' }} onClick={e => e.stopPropagation()}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, ...a(0) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Badge color={C.gold}>The reveal</Badge>
          <span style={{ fontFamily: font, fontSize: 13, color: C.muted }}>Scroll to explore the full homepage</span>
        </div>
        <ChevronDown size={16} color={C.muted} />
      </div>

      {/* Browser chrome + website */}
      <BrowserChrome url="herdandhoney.com" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '14px 14px 0 0', ...a(1) }}>
        <div onScroll={(e) => setScrolled(e.target.scrollTop > 20)} style={{ flex: 1, overflowY: 'auto', background: C.hhCream, color: C.hhDark, fontFamily: font }}>
          <style>{`.hh-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.15)}.hh-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.08)}`}</style>

          {/* NAV */}
          <nav style={{ position: 'sticky', top: 0, zIndex: 50, padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? C.hhCream : 'transparent', boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: C.hhDark }}>🍯 Herd & Honey</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {[['hh-flavors', 'Flavors'], ['hh-story', 'Our story'], ['hh-visit', 'Visit']].map(([id, label]) => (
                <span key={id} onClick={() => scrollTo(id)} style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: C.hhDark, cursor: 'pointer' }}>{label}</span>
              ))}
              <span className="hh-btn" style={{ padding: '8px 20px', borderRadius: 24, background: C.gold, color: C.white, fontWeight: 600, fontSize: 13, fontFamily: font, cursor: 'pointer', transition: 'all 0.2s', display: 'inline-block' }}>Order online</span>
            </div>
          </nav>

          {/* HERO */}
          <div style={{ padding: '80px 32px 100px', textAlign: 'center', background: `linear-gradient(135deg, ${C.hhSoft} 0%, ${C.hhCream} 40%, #fde8d0 100%)`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 300, height: 300, opacity: 0.06, background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`, borderRadius: '50%' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Cedarburg, Wisconsin</p>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 700, lineHeight: 1.15, color: C.hhDark, maxWidth: 600, margin: '0 auto 16px' }}>Where Wisconsin dairy meets wildflower honey</h1>
              <p style={{ fontFamily: font, fontSize: 18, color: '#5a5a5a', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>Handcrafted ice cream made with milk from Ozaukee County farms and honey from our own backyard hives</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <span className="hh-btn" style={{ padding: '12px 28px', borderRadius: 28, background: C.gold, color: C.white, fontWeight: 600, fontSize: 15, fontFamily: font, cursor: 'pointer', transition: 'all 0.2s', display: 'inline-block' }}>View today's flavors</span>
                <span className="hh-btn" style={{ padding: '12px 28px', borderRadius: 28, background: C.white, color: C.hhDark, fontWeight: 600, fontSize: 15, fontFamily: font, border: '2px solid rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.2s', display: 'inline-block' }}>Plan your visit</span>
              </div>
            </div>
          </div>

          {/* TRUST STRIP */}
          <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'center', gap: 40, background: C.white, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
            {['⭐ 4.9 stars on Google (187 reviews)', '🐝 42 active hives on-site', '🧀 100% Wisconsin dairy', '🌿 All-natural ingredients'].map(t => (
              <span key={t} style={{ fontFamily: font, fontSize: 13, color: '#666' }}>{t}</span>
            ))}
          </div>

          {/* FLAVORS */}
          <div id="hh-flavors" style={{ padding: '72px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Our flavors</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 700, color: C.hhDark }}>Made fresh, inspired by Wisconsin</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
              {FLAVORS.map(({ name, color, desc }) => (
                <div key={name} className="hh-card" style={{ background: C.white, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: 120, background: `linear-gradient(135deg, ${color}30, ${color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 16px ${color}40` }} />
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 600, color: C.hhDark, marginBottom: 4 }}>{name}</p>
                    <p style={{ fontFamily: font, fontSize: 13, color: '#777', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STORY */}
          <div id="hh-story" style={{ padding: '72px 32px', background: `linear-gradient(to right, ${C.hhDark}, #2a2a3e)`, color: C.white }}>
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 16, background: `linear-gradient(135deg, ${C.gold}40, ${C.hhGreen}30)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Camera size={32} color="rgba(255,255,255,0.5)" />
                <span style={{ fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Astrid tending the hives</span>
              </div>
              <div>
                <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Our story</p>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>It started with three hives and a dream</h2>
                <p style={{ fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 12 }}>In 2021, Astrid Sorenson set up three beehives in her Cedarburg backyard. When the first harvest produced more honey than her family could eat, she started experimenting with ice cream.</p>
                <p style={{ fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>The combination of local Ozaukee County cream and her own wildflower honey created something people couldn't stop talking about. Word spread at the farmers market, then through Instagram, and by summer 2022, Herd & Honey had a permanent home on Washington Avenue.</p>
              </div>
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div style={{ padding: '72px 32px', background: C.white }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>What people are saying</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, color: C.hhDark }}>Don't take our word for it</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
              {TESTIMONIALS.map(({ name, loc, text, stars }) => (
                <div key={name} style={{ padding: 24, borderRadius: 16, background: C.hhCream, border: '1px solid rgba(0,0,0,0.04)' }}>
                  <p style={{ color: C.gold, fontSize: 18, marginBottom: 12, fontFamily: font }}>{'★'.repeat(stars)}</p>
                  <p style={{ fontFamily: font, fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16, fontStyle: 'italic' }}>"{text}"</p>
                  <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.hhDark }}>{name}</p>
                  <p style={{ fontFamily: font, fontSize: 12, color: '#999' }}>{loc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* VISIT */}
          <div id="hh-visit" style={{ padding: '72px 32px', background: C.hhCream }}>
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <div>
                <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Visit us</p>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, color: C.hhDark, marginBottom: 20 }}>Find us in the heart of downtown Cedarburg</h2>
                {[
                  { Icon: MapPin, t1: 'W62 N675 Washington Avenue', t2: 'Cedarburg, WI 53012' },
                  { Icon: Clock, t1: 'Hours', t2: 'Mon\u2013Sat: 11am\u20139pm \u00b7 Sun: 11am\u20137pm' },
                  { Icon: Phone, t1: '(262) 555-0147', t2: '' },
                ].map(({ Icon, t1, t2 }) => (
                  <div key={t1} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                    <Icon size={18} color={C.gold} style={{ marginTop: 2 }} />
                    <div>
                      <p style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: C.hhDark }}>{t1}</p>
                      {t2 && <p style={{ fontFamily: font, fontSize: 13, color: '#777' }}>{t2}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderRadius: 16, background: 'linear-gradient(135deg, #e8e4dc, #d4d0c8)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
                <div style={{ textAlign: 'center' }}>
                  <MapPin size={32} color={C.gold} style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.hhDark }}>Interactive map</p>
                  <p style={{ fontFamily: font, fontSize: 12, color: '#999' }}>Downtown Cedarburg</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: '64px 32px', background: `linear-gradient(135deg, ${C.gold}, ${C.hhAmber})`, textAlign: 'center', color: C.white }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Ready for the best scoop in Wisconsin?</h2>
            <p style={{ fontFamily: font, fontSize: 16, opacity: 0.9, maxWidth: 400, margin: '0 auto 24px' }}>Order ahead for pickup, or wander in and let your nose guide you.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <span className="hh-btn" style={{ padding: '14px 32px', borderRadius: 28, background: C.white, color: C.hhDark, fontWeight: 600, fontSize: 15, fontFamily: font, cursor: 'pointer', transition: 'all 0.2s', display: 'inline-block' }}>Order for pickup</span>
              <span className="hh-btn" style={{ padding: '14px 32px', borderRadius: 28, background: 'transparent', color: C.white, fontWeight: 600, fontSize: 15, fontFamily: font, border: '2px solid rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s', display: 'inline-block' }}>Get directions</span>
            </div>
          </div>

          {/* FOOTER */}
          <footer style={{ padding: '40px 32px', background: C.hhDark, color: 'rgba(255,255,255,0.6)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 4 }}>🍯 Herd & Honey</p>
                <p style={{ fontFamily: font, fontSize: 13 }}>Made with honey and love in Cedarburg, WI</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: font, fontSize: 13 }}>@herdandhoney</span>
                {[Instagram, Mail].map((Icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Icon size={16} color="rgba(255,255,255,0.6)" />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ maxWidth: 900, margin: '20px auto 0', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: font, fontSize: 12, textAlign: 'center' }}>
              © 2026 Herd & Honey. All rights reserved. Website by Momentic.
            </div>
          </footer>
        </div>
      </BrowserChrome>
    </div>
  );
}

/* ─── MAIN PRESENTATION ──────────────────────────────────── */

const SLIDES = [
  Slide_Title,
  Slide_MeetClient,
  Slide_Discovery,
  Slide_Audit,
  Slide_Strategy,
  Slide_Build,
  Slide_Homepage,
];

export default function Presentation() {
  const [slide, setSlide] = useState(0);
  const [locked, setLocked] = useState(false);
  const touchRef = useRef(null);
  const TOTAL = SLIDES.length;

  const go = useCallback((dir) => {
    if (locked) return;
    const next = slide + dir;
    if (next < 0 || next >= TOTAL) return;
    setLocked(true);
    setSlide(next);
    setTimeout(() => setLocked(false), 800);
  }, [slide, locked, TOTAL]);

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const Current = SLIDES[slide];

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: C.bg, fontFamily: font, overflow: 'hidden', cursor: 'pointer', userSelect: 'none' }}
      onClick={(e) => {
        if (e.target.closest?.('button, a, input, nav')) return;
        const x = e.clientX / window.innerWidth;
        if (x > 0.55) go(1);
        else if (x < 0.45) go(-1);
      }}
      onTouchStart={(e) => { touchRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchRef.current === null) return;
        const dx = e.changedTouches[0].clientX - touchRef.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchRef.current = null;
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        @keyframes drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,18px); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-18px,28px); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(12px,-18px); } }
        @keyframes blinkFast { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes marquee { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
        @keyframes rainbow { 0%{color:red} 20%{color:#ff6600} 40%{color:green} 60%{color:blue} 80%{color:purple} 100%{color:red} }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.35,
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      {/* Floating gradient blobs */}
      <div style={{ position: 'fixed', top: -140, right: -140, width: 520, height: 520, background: `radial-gradient(circle at 30% 30%, ${C.orange}, transparent 70%)`, opacity: 0.06, pointerEvents: 'none', zIndex: 1, animation: 'drift1 22s ease-in-out infinite', borderRadius: '50%' }} />
      <div style={{ position: 'fixed', bottom: -120, left: -120, width: 440, height: 440, background: `radial-gradient(circle at 50% 50%, ${C.yellow}, transparent 70%)`, opacity: 0.04, pointerEvents: 'none', zIndex: 1, animation: 'drift2 28s ease-in-out infinite', borderRadius: '50%' }} />
      <div style={{ position: 'fixed', top: '40%', right: '8%', width: 380, height: 380, background: `radial-gradient(circle at 60% 60%, ${C.green}, transparent 70%)`, opacity: 0.03, pointerEvents: 'none', zIndex: 1, animation: 'drift3 25s ease-in-out infinite', borderRadius: '50%' }} />

      {/* Slide */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
        <Current key={slide} />
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, height: 3,
        width: `${((slide + 1) / TOTAL) * 100}%`,
        background: `linear-gradient(90deg, ${C.orange}, ${C.yellow})`,
        transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 200, boxShadow: `0 0 12px ${C.orange}40`,
      }} />

      {/* Logo */}
      {slide > 0 && slide < TOTAL - 1 && (
        <img src={LOGO} alt="" style={{
          position: 'fixed', bottom: 16, left: 24,
          height: 20, opacity: 0.25, zIndex: 150, pointerEvents: 'none',
          filter: 'brightness(0) invert(1)',
        }} />
      )}

      {/* Counter */}
      <div style={{
        position: 'fixed', bottom: 12, right: 24,
        fontSize: 12, color: C.muted, fontFamily: font, zIndex: 150,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontWeight: 600, color: C.body }}>{slide + 1}</span>
        <span>/</span>
        <span>{TOTAL}</span>
      </div>

      {/* Nav hints */}
      {slide > 0 && (
        <div style={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 150, opacity: 0.15 }}>
          <ChevronLeft size={24} color={C.body} />
        </div>
      )}
      {slide < TOTAL - 1 && (
        <div style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 150, opacity: 0.15 }}>
          <ChevronRight size={24} color={C.body} />
        </div>
      )}
    </div>
  );
}