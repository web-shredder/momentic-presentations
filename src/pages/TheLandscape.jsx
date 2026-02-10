import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search, MessageSquare, MapPin, Star, Mic, Globe,
  ChevronRight, ChevronLeft, Eye, Target, Shield,
  Layers, Zap, Users, CheckCircle, ArrowRight, AlertTriangle,
  Share2, BookOpen, Navigation, ExternalLink, Menu, Phone,
  Mail, Clock, ThumbsUp, X, ChevronDown, TrendingUp,
  FileText, Monitor, Sparkles
} from "lucide-react";

const LOGO = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNzcwLjIyIDEyMDAiPgogIDxnPgogICAgPHBhdGggZD0iTTE0NDUuMDQsNjE5LjUxYy03LjE1LTEwLjkzLTI4LjE3LTQ4LjM0LTI4LjE3LTQ4LjM0bC0xLjI2LjQyczMuNzgsNDMuMywzLjc4LDU3LjU5djExMC4xNGgtNzYuNTF2LTI3Ni42MWg3OS4wM2w3OS44NywxMjIuNzVoLjg0bDc5LjQ1LTEyMi43NWg3OS4wM3YyNzYuNjFoLTc2LjUxdi0xMTAuMTRjMC0xNC4yOSwzLjM2LTU3LjU5LDMuMzYtNTcuNTlsLTEuMjYtLjQycy0yMS4wMiwzNy40MS0yOC4xNyw0OC4zNGwtNTAuODYsNzkuMDNoLTEwLjkzbC01MS43MS03OS4wM1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0yMDAxLjg4LDU5OS40N2MwLDgzLjI0LTYwLjU0LDE0NS4wMy0xNTMuNDQsMTQ1LjAzcy0xNTMuODYtNTcuNTktMTUzLjg2LTE0NS4wM2MwLTgwLjI5LDY0Ljc0LTE0MS42NywxNTMuODYtMTQxLjY3czE1My40NCw2MS4zNywxNTMuNDQsMTQxLjY3Wk0xNzc1LjcxLDU5OS44OGMwLDQ3LjkyLDMxLjUzLDc0LjgzLDcyLjczLDc0LjgzczcyLjMtMjYuOSw3Mi4zLTc0LjgzYzAtNDMuMy0zMS4xMS03Mi4zLTcyLjMtNzIuM3MtNzIuNzMsMjkuMDEtNzIuNzMsNzIuM1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0yMTM3LjUxLDYxOC40NGMtNy4xNC0xMC45My0yOC4xNi00OC4zNC0yOC4xNi00OC4zNGwtMS4yNi40MnMzLjc4LDQzLjMsMy43OCw1Ny41OXYxMTAuMTRoLTc2LjUxdi0yNzYuNjFoNzkuMDNsNzkuODcsMTIyLjc1aC44NGw3OS40NS0xMjIuNzVoNzkuMDN2Mjc2LjYxaC03Ni41MXYtMTEwLjE0YzAtMTQuMjksMy4zNi01Ny41OSwzLjM2LTU3LjU5bC0xLjI2LS40MnMtMjEuMDIsMzcuNDEtMjguMTcsNDguMzRsLTUwLjg2LDc5LjAzaC0xMC45M2wtNTEuNzEtNzkuMDNaIiBzdHlsZT0iZmlsbDogIzE1MTYxODsgc3Ryb2tlLXdpZHRoOiAwcHg7Ii8+CiAgICA8cGF0aCBkPSJNMjQ3OS44Myw2MjguMzR2NDYuMjRoMTQ0LjYxdjY2aC0yMjEuMTJ2LTI3Ni42MWgyMTQuNHY2NmgtMTM3Ljg5djQxLjYyaDExOS4zOHY1Ni43NWgtMTE5LjM4WiIgc3R5bGU9ImZpbGw6ICMxNTE2MTg7IHN0cm9rZS13aWR0aDogMHB4OyIvPgogICAgPHBhdGggZD0iTTI4NjMuMzYsNDY3LjcyaDc2LjUxdjI3Ni42MWgtNzMuNTZsLTEyOS45LTE1OC45LS44NC40MnMzLjM2LDM3LDMuMzYsNTYuMzN2MTAyLjE1aC03Ni41MXYtMjc2LjYxaDc0LjgybDEyOC4yMiwxNTYuMzhoLjg0cy0yLjk0LTM2Ljk5LTIuOTQtNTIuOTd2LTEwMy40MVoiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0zMDUzLjY3LDUzMS42NGgtOTMuNzV2LTY3LjI2aDI2NC40MnY2Ny4yNmgtOTQuMTZ2MjA5LjM1aC03Ni41MXYtMjA5LjM1WiIgc3R5bGU9ImZpbGw6ICMxNTE2MTg7IHN0cm9rZS13aWR0aDogMHB4OyIvPgogICAgPHBhdGggZD0iTTMzMjAuODQsNDYyLjM2djI3Ni42MWgtNzYuNTF2LTI3Ni42MWg3Ni41MVoiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0zMzU0LjA4LDYwMS4zOGMwLTgwLjI5LDYwLjExLTE0NS44NywxNTQuNy0xNDUuODcsNTQuNjUsMCw4NS43NiwxOC4wOCwxMDQuNjgsMzIuMzdsLTIzLjU0LDYxLjM3Yy0xOS43Ni0xNS45Ny00NC45OC0yNi40OC03My45OS0yNi40OC00OS42LDAtNzkuNDUsMzQuNDctNzkuNDUsNzcuMzVzMjksNzQuODMsODEuMTMsNzQuODNjMzcsMCw2My45LTE4LjUsNzkuODctMzEuOTVsMjQuMzgsNTcuMTdjLTE0LjcxLDE1LjEzLTUzLjM5LDQyLjA0LTExMi42Niw0Mi4wNC0xMDguMDQsMC0xNTUuMTItNjcuMjYtMTU1LjEyLTE0MC44M1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICA8L2c+CiAgPGc+CiAgICA8cGF0aCBkPSJNMzY3OS4yMSw0NjcuNTloLTIyLjMzdi01LjIzaDUwLjQ2djUuMjNoLTIyLjMzdjQ4LjU3aC01Ljgxdi00OC41N1oiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICAgIDxwYXRoIGQ9Ik0zNzI4LjM1LDQ4My4wNWMtMi4yMS0zLjc2LTcuNDQtMTMtNy40NC0xM2gtLjE3cy41OCwxMC4xNC41OCwxNC40OHYzMS42NWgtNS44MXYtNTMuODFoNi4zOGwyMC45NCwzNC4zNGguMTdsMjAuODYtMzQuMzRoNi4zN3Y1My44MWgtNS44di0zMS42NWMwLTQuMzMuNjYtMTQuNDguNjYtMTQuNDhoLS4yNXMtNS4xNSw5LjI0LTcuNDUsMTNsLTEzLjY1LDIyLjQ5aC0xLjY0bC0xMy43NC0yMi40OVoiIHN0eWxlPSJmaWxsOiAjMTUxNjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICA8L2c+CiAgPHBhdGggZD0iTTYwMCwxMDBjLTE0NC41MywwLTI4NC44MywyNy43LTQxNy42Miw4Mi4zOC01NC42OCwxMzIuNzgtODIuMzgsMjczLjA5LTgyLjM4LDQxNy42MnMyNy43LDI4NC44Myw4Mi4zOCw0MTcuNjJjMTMyLjc4LDU0LjY4LDI3My4wOSw4Mi4zOCw0MTcuNjIsODIuMzhzMjg0LjgzLTI3LjcsNDE3LjYyLTgyLjM4YzU0LjY4LTEzMi43OCw4Mi4zOC0yNzMuMDksODIuMzgtNDE3LjYycy0yNy43LTI4NC44My04Mi4zOC00MTcuNjJjLTEzMi43OC01NC42OC0yNzMuMDktODIuMzgtNDE3LjYyLTgyLjM4WiIgc3R5bGU9ImZpbGw6ICNmZmY7IHN0cm9rZS13aWR0aDogMHB4OyIvPgogIDxwYXRoIGQ9Ik02MDAsMEM0MjMuOTYsMCwyNTYuOTQsMzguMjIsMTA2LjMyLDEwNi4zMiwzOC4yMiwyNTYuOTQsMCw0MjMuOTYsMCw2MDBzMzguMjIsMzQzLjA2LDEwNi4zMiw0OTMuNjhjMTUwLjYyLDY4LjEsMzE3LjY0LDEwNi4zMiw0OTMuNjgsMTA2LjMyczM0My4wNi0zOC4yMiw0OTMuNjgtMTA2LjMyYzY4LjEtMTUwLjYyLDEwNi4zMi0zMTcuNjQsMTA2LjMyLTQ5My42OHMtMzguMjItMzQzLjA2LTEwNi4zMi00OTMuNjhDOTQzLjA2LDM4LjIyLDc3Ni4wNCwwLDYwMCwwWk0xMDE3LjYyLDEwMTcuNjJjLTEzMi43OCw1NC42OC0yNzMuMDksODIuMzgtNDE3LjYyLDgyLjM4cy0yODQuODMtMjcuNy00MTcuNjItODIuMzhjLTU0LjY4LTEzMi43OC04Mi4zOC0yNzMuMDktODIuMzgtNDE3LjYyczI3LjctMjg0LjgzLDgyLjM4LTQxNy42MmMxMzIuNzgtNTQuNjgsMjczLjA5LTgyLjM4LDQxNy42Mi04Mi4zOHMyODQuODMsMjcuNyw0MTcuNjIsODIuMzhjNTQuNjgsMTMyLjc4LDgyLjM4LDI3My4wOSw4Mi4zOCw0MTcuNjJzLTI3LjcsMjg0LjgzLTgyLjM4LDQxNy42MloiIHN0eWxlPSJmaWxsOiAjZmY0ZjE4OyBzdHJva2Utd2lkdGg6IDBweDsiLz4KICA8cGF0aCBkPSJNNTA1LDYzMC44NWMtMTEuOTItMTguMjMtNDYuOTctODAuNjItNDYuOTctODAuNjJsLTIuMS43czYuMzEsNzIuMjEsNi4zMSw5Ni4wNHYxODMuNjhoLTEyNy41OXYtNDYxLjNoMTMxLjhsMTMzLjIxLDIwNC43MWgxLjRsMTMyLjUtMjA0LjcxaDEzMS44djQ2MS4zaC0xMjcuNnYtMTgzLjY4YzAtMjMuODQsNS42MS05Ni4wNCw1LjYxLTk2LjA0bC0yLjEtLjdzLTM1LjA1LDYyLjM5LTQ2Ljk3LDgwLjYybC04NC44MywxMzEuOGgtMTguMjNsLTg2LjI0LTEzMS44WiIgc3R5bGU9ImZpbGw6ICMxNTE2MTg7IHN0cm9rZS13aWR0aDogMHB4OyIvPgo8L3N2Zz4=`;

/* ─── DESIGN TOKENS ─────────────────────────────────────── */
const C = {
  cream: '#F6F4EC', black: '#141516', gray9: '#2a2b2d', gray7: '#5B6672',
  gray5: '#B2C0CF', gray3: '#D9DFE6', gray1: '#ECEEF1', orange: '#FE2516',
  yellow: '#C9FC19', green: '#24FD4F', white: '#FFFFFF',
  google: '#4285F4', gmapGreen: '#34A853', gmapRed: '#EA4335',
  gpt: '#10A37F', gptDark: '#343541', gptMsg: '#40414f',
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

function useTypewriter(text, delay = 600, speed = 45) {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t1);
  }, [text, delay, speed]);
  return [shown, done];
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

function BrowserChrome({ url, children, style = {}, accent }) {
  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 16px 64px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.06)',
      background: C.white, ...style,
    }}>
      <div style={{
        background: '#f7f7f8', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid #ebebeb',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.1)' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.1)' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.1)' }} />
        </div>
        <div style={{
          flex: 1, background: C.white, borderRadius: 7,
          padding: '5px 12px', fontSize: 11, color: '#999',
          fontFamily: 'SF Mono, Menlo, monospace',
          border: '1px solid #e8e8e8',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {accent && <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} />}
          {url}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function StarRating({ rating = 5, size = 12 }) {
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} fill={i <= rating ? '#fbbc04' : '#e0e0e0'} color={i <= rating ? '#fbbc04' : '#e0e0e0'} />
      ))}
    </div>
  );
}

function LiveDot({ color = C.green }) {
  return (
    <div style={{ position: 'relative', width: 8, height: 8 }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%', background: color,
        position: 'absolute',
      }} />
      <div style={{
        width: 8, height: 8, borderRadius: '50%', background: color,
        position: 'absolute', animation: 'livePulse 2s ease-in-out infinite',
      }} />
    </div>
  );
}

function GlassCard({ children, style = {}, glow }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderRadius: 16, padding: '28px 32px',
      boxShadow: glow
        ? `0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px ${glow}33, 0 0 24px ${glow}15`
        : '0 8px 32px rgba(0,0,0,0.06)',
      border: `1px solid ${glow ? glow + '44' : 'rgba(255,255,255,0.6)'}`,
      transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── MINI PLATFORM MOCKUPS ──────────────────────────────── */

function GoogleSearchMini({ query, results, style = {} }) {
  return (
    <BrowserChrome url="google.com/search" accent={C.google} style={style}>
      <div style={{ padding: '14px 18px', minHeight: 180 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          padding: '8px 14px', border: `1px solid ${C.gray3}`, borderRadius: 24,
        }}>
          <Search size={14} color={C.google} />
          <span style={{ fontFamily: font, fontSize: 13, color: C.black }}>{query}</span>
        </div>
        <div style={{ borderBottom: `2px solid ${C.google}`, width: 50, marginBottom: 14 }}>
          <span style={{ fontFamily: font, fontSize: 11, color: C.google, fontWeight: 600 }}>All</span>
        </div>
        {results.map((r, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: C.gray1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={9} color={C.gray5} />
              </div>
              <span style={{ fontFamily: font, fontSize: 10, color: C.gray5 }}>{r.url}</span>
            </div>
            <p style={{ fontFamily: font, fontSize: 14, color: C.google, fontWeight: 500, marginBottom: 2, cursor: 'pointer' }}>{r.title}</p>
            <p style={{ fontFamily: font, fontSize: 11, color: C.gray7, lineHeight: 1.4 }}>{r.snippet}</p>
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
}

function ChatGPTMini({ query, answer, highlight, style = {} }) {
  return (
    <BrowserChrome url="chatgpt.com" accent={C.gpt} style={style}>
      <div style={{ background: C.white, padding: 16, minHeight: 180 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.google, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: C.white, fontSize: 11, fontWeight: 700 }}>T</span>
          </div>
          <div style={{ background: '#f7f7f8', borderRadius: 12, padding: '10px 14px', fontSize: 12, fontFamily: font, color: C.black, lineHeight: 1.5 }}>
            {query}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.gpt, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={12} color={C.white} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: font, fontSize: 12, color: C.black, lineHeight: 1.6, marginBottom: highlight ? 8 : 0 }}>
              {answer}
            </p>
            {highlight && (
              <div style={{ background: '#fff3f3', borderRadius: 6, padding: '6px 10px', borderLeft: `3px solid ${C.orange}` }}>
                <p style={{ fontFamily: font, fontSize: 11, color: C.orange, lineHeight: 1.4 }}>{highlight}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function GoogleMapsMini({ results, style = {} }) {
  return (
    <BrowserChrome url="google.com/maps" accent={C.gmapGreen} style={style}>
      <div style={{ minHeight: 180 }}>
        <div style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #bbdefb 100%)', height: 48, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: C.white, borderRadius: 8, padding: '6px 12px', fontSize: 11, fontFamily: font, color: C.gray7, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Search size={10} />
              accountant in Cedarburg
            </div>
          </div>
        </div>
        <div style={{ padding: '10px 14px' }}>
          {results.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < results.length - 1 ? `1px solid ${C.gray1}` : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: C.gray1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={16} color={C.gmapRed} />
              </div>
              <div>
                <p style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: C.black }}>{r.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <span style={{ fontFamily: font, fontSize: 11, fontWeight: 600, color: C.black }}>{r.rating}</span>
                  <StarRating rating={Math.round(r.rating)} size={10} />
                  <span style={{ fontFamily: font, fontSize: 10, color: C.gray5 }}>({r.reviews})</span>
                </div>
                <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, marginTop: 2 }}>{r.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

function MiniWebsite({ name, tagline, style = {} }) {
  return (
    <BrowserChrome url={`www.${name.toLowerCase().replace(/\s/g, '')}.com`} style={style}>
      <div style={{ minHeight: 220 }}>
        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', borderBottom: `1px solid ${C.gray1}` }}>
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: C.black }}>{name}</span>
          <div style={{ display: 'flex', gap: 14 }}>
            {['Services', 'About', 'Contact'].map(t => (
              <span key={t} style={{ fontFamily: font, fontSize: 11, color: C.gray5 }}>{t}</span>
            ))}
            <Menu size={14} color={C.gray5} />
          </div>
        </div>
        {/* Hero */}
        <div style={{ padding: '28px 18px 20px', background: `linear-gradient(180deg, ${C.gray1} 0%, ${C.white} 100%)` }}>
          <p style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: C.black, lineHeight: 1.3, marginBottom: 8 }}>{tagline}</p>
          <p style={{ fontFamily: font, fontSize: 11, color: C.gray7, lineHeight: 1.5, marginBottom: 14 }}>
            Proudly serving the greater Northshore area with comprehensive professional services for businesses of all sizes.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.orange, borderRadius: 6, padding: '7px 16px' }}>
            <span style={{ fontFamily: font, fontSize: 11, fontWeight: 600, color: C.white }}>Get Started</span>
            <ArrowRight size={11} color={C.white} />
          </div>
        </div>
        {/* Services row */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 18px' }}>
          {['Tax Prep', 'Bookkeeping', 'Advisory'].map(s => (
            <div key={s} style={{ flex: 1, background: C.gray1, borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.gray3, margin: '0 auto 6px' }} />
              <span style={{ fontFamily: font, fontSize: 10, color: C.gray7 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

function GBPMini({ style = {} }) {
  return (
    <BrowserChrome url="business.google.com" accent={C.google} style={style}>
      <div style={{ padding: '14px 18px', minHeight: 200 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 8, background: C.gray1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: C.gray5 }}>Y</span>
          </div>
          <div>
            <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.black }}>Your Business</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: C.black }}>4.8</span>
              <StarRating rating={5} size={10} />
              <span style={{ fontFamily: font, fontSize: 11, color: C.gray5 }}>(47 reviews)</span>
            </div>
            <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, marginTop: 2 }}>Accounting firm</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {[{ icon: Phone, label: 'Call' }, { icon: Navigation, label: 'Directions' }, { icon: Globe, label: 'Website' }].map(b => (
            <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 4px', background: '#e8f0fe', borderRadius: 8, cursor: 'pointer' }}>
              <b.icon size={12} color={C.google} />
              <span style={{ fontFamily: font, fontSize: 9, color: C.google, fontWeight: 500 }}>{b.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon: Clock, text: 'Open · Closes 5:00 PM' },
            { icon: MapPin, text: '123 Main St, Cedarburg, WI 53012' },
            { icon: Phone, text: '(262) 555-0100' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <item.icon size={11} color={C.gray5} />
              <span style={{ fontFamily: font, fontSize: 11, color: C.gray7 }}>{item.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '8px 10px', background: '#f8f9fa', borderRadius: 8 }}>
          <p style={{ fontFamily: font, fontSize: 10, fontWeight: 600, color: C.gray7, marginBottom: 4 }}>Reviews</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['"Great service, very thorough"', '"Highly recommend for small biz"'].map((r, i) => (
              <div key={i} style={{ flex: 1, padding: '6px 8px', background: C.white, borderRadius: 6, border: `1px solid ${C.gray1}` }}>
                <StarRating rating={5} size={8} />
                <p style={{ fontFamily: font, fontSize: 9, color: C.gray7, marginTop: 3, lineHeight: 1.3 }}>{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ─── SLIDES ─────────────────────────────────────────────── */

function Slide_Title() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '60px 80px', position: 'relative' }}>
      <div style={a(0)}>
        <img src={LOGO} alt="Momentic" style={{ height: 40, marginBottom: 56, opacity: 0.8 }} />
      </div>
      <div style={a(1)}>
        <h1 style={{
          fontFamily: font, fontSize: 72, fontWeight: 700, color: C.black,
          lineHeight: 1.05, maxWidth: 800, margin: '0 auto',
          background: `linear-gradient(135deg, ${C.black} 0%, ${C.gray7} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Building an impactful website
        </h1>
      </div>
      <div style={a(2)}>
        <div style={{ width: 60, height: 4, background: C.orange, borderRadius: 2, margin: '32px auto' }} />
      </div>
      <div style={a(3)}>
        <p style={{ fontFamily: font, fontSize: 18, color: C.gray7, fontWeight: 400 }}>
          mkedmc.org &nbsp;&middot;&nbsp; February 10, 2026
        </p>
      </div>
      <div style={a(4)}>
        <p style={{ fontFamily: font, fontSize: 15, color: C.gray5, marginTop: 12 }}>
          Tyler Einberger &nbsp;&middot;&nbsp; Co-founder &amp; COO, Momentic
        </p>
      </div>
    </div>
  );
}

function Slide_Mess() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '60px 60px 60px 80px', gap: 40 }}>
      <div style={{ maxWidth: 480, flexShrink: 0 }}>
        <div style={a(0)}>
          <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 20 }}>
            The reality
          </p>
        </div>
        <div style={a(1)}>
          <h2 style={{ fontFamily: font, fontSize: 56, fontWeight: 700, color: C.black, lineHeight: 1.08, marginBottom: 20 }}>
            The landscape is a mess.
          </h2>
        </div>
        <div style={a(2)}>
          <p style={{ fontFamily: font, fontSize: 24, color: C.gray7, lineHeight: 1.5 }}>
            And nobody has it figured out.
          </p>
        </div>
      </div>
      {/* Scattered mini platform windows */}
      <div style={{ position: 'relative', width: 480, height: 420, flexShrink: 0, ...a(1) }}>
        <div style={{ position: 'absolute', top: 0, left: 20, transform: 'rotate(-3deg)', animation: 'float1 6s ease-in-out infinite', width: 230 }}>
          <ChatGPTMini query="best accountant?" answer="I'd recommend Donahue & Associates..." style={{ transform: 'scale(0.85)' }} />
        </div>
        <div style={{ position: 'absolute', top: 30, right: 0, transform: 'rotate(2deg)', animation: 'float2 7s ease-in-out infinite 0.5s', width: 230 }}>
          <GoogleSearchMini query="accountant cedarburg" results={[
            { url: 'abitz-tax.com', title: 'Abitz Tax & Accounting', snippet: 'Boutique tax preparation...' }
          ]} style={{ transform: 'scale(0.85)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: 40, transform: 'rotate(1deg)', animation: 'float3 8s ease-in-out infinite 1s', width: 240 }}>
          <GoogleMapsMini results={[
            { name: 'Baker Tilly', rating: 4.3, reviews: 3, type: 'Accounting firm' },
            { name: 'Abitz Tax', rating: 5.0, reviews: 12, type: 'Tax preparation' },
          ]} style={{ transform: 'scale(0.85)' }} />
        </div>
      </div>
    </div>
  );
}

function Slide_Disagree() {
  const a = useEnter();
  const [typed, done] = useTypewriter("I need a good accountant in Cedarburg. Who should I call?", 400, 35);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '40px 50px' }}>
      <div style={a(0)}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
          padding: '12px 20px', background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(16px)', borderRadius: 12,
          border: `1px solid ${C.gray3}`, maxWidth: 580,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        }}>
          <Search size={16} color={C.gray5} />
          <span style={{ fontFamily: font, fontSize: 15, color: C.black }}>
            {typed}{!done && <span style={{ animation: 'blink 1s step-end infinite', color: C.orange }}>|</span>}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, ...a(1) }}>
          <ChatGPTMini
            query="Who should I call?"
            answer="I'd recommend Donahue & Associates LLC, a well-established CPA firm in nearby Grafton with a long track record."
            style={{ height: '100%' }}
          />
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: C.orange }}>#1: Donahue</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 80, ...a(2) }}>
          <X size={28} color={C.orange} strokeWidth={3} />
        </div>
        <div style={{ flex: 1, ...a(2) }}>
          <GoogleSearchMini
            query="accountant cedarburg"
            results={[
              { url: 'abitztax.com', title: 'Abitz Tax & Accounting', snippet: 'Personalized, boutique approach to tax prep...' },
              { url: 'cedarburg-accounting.com', title: 'Cedarburg Accounting Services', snippet: 'Small business compliance and planning...' },
            ]}
            style={{ height: '100%' }}
          />
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: C.orange }}>#1: Abitz</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 80, ...a(3) }}>
          <X size={28} color={C.orange} strokeWidth={3} />
        </div>
        <div style={{ flex: 1, ...a(3) }}>
          <GoogleMapsMini
            results={[
              { name: 'Baker Tilly', rating: 4.3, reviews: 3, type: 'Sponsored' },
              { name: 'Abitz Tax', rating: 5.0, reviews: 12, type: 'Tax prep' },
            ]}
            style={{ height: '100%' }}
          />
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: C.orange }}>#1: Baker Tilly</span>
          </div>
        </div>
      </div>
      <div style={a(4)}>
        <p style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: C.black, marginTop: 24, textAlign: 'center' }}>
          Same question. Three platforms. <span style={{ color: C.orange }}>Three different answers.</span>
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 20 }}>
          <div style={{
            padding: '12px 20px', background: 'rgba(255,255,255,0.6)',
            borderRadius: 10, border: `1px solid ${C.gray3}`,
            backdropFilter: 'blur(10px)', textAlign: 'center', maxWidth: 280,
          }}>
            <span style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: C.orange, display: 'block' }}>&lt; 1 in 100</span>
            <p style={{ fontFamily: font, fontSize: 12, color: C.gray7, marginTop: 6, lineHeight: 1.4 }}>
              600 volunteers ran the same prompts 2,961 times. Almost never got the same recommendation list twice.
            </p>
            <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, marginTop: 6, fontStyle: 'italic' }}>SparkToro, 2025</p>
          </div>
          <div style={{
            padding: '12px 20px', background: 'rgba(255,255,255,0.6)',
            borderRadius: 10, border: `1px solid ${C.gray3}`,
            backdropFilter: 'blur(10px)', textAlign: 'center', maxWidth: 280,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: C.orange }}>1.2%</span>
              <span style={{ fontFamily: font, fontSize: 14, color: C.gray5 }}>vs</span>
              <span style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: C.orange }}>35.9%</span>
            </div>
            <p style={{ fontFamily: font, fontSize: 12, color: C.gray7, marginTop: 6, lineHeight: 1.4 }}>
              Share of local businesses recommended by ChatGPT compared to Google's Local Pack for the same searches.
            </p>
            <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, marginTop: 6, fontStyle: 'italic' }}>SOCi, 2026 Local Visibility Index</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide_NoMasterList() {
  const a = useEnter();
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 1200); }, []);
  const platforms = [
    'Google Search', 'Google Maps', 'AI Overviews', 'AI Mode',
    'ChatGPT', 'Gemini', 'Perplexity', 'Yelp',
    'Voice assistants', 'Review websites', 'Directories', 'Social media',
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '60px 80px' }}>
      <div style={a(0)}>
        <h2 style={{ fontFamily: font, fontSize: 52, fontWeight: 700, color: C.black, lineHeight: 1.1, marginBottom: 40 }}>
          There is no master list.
        </h2>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 720, ...a(1) }}>
        {platforms.map((p, i) => (
          <div key={p} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: show ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(12px)',
            padding: '10px 18px', borderRadius: 40,
            border: `1px solid ${show ? C.gray3 : 'transparent'}`,
            boxShadow: show ? '0 4px 16px rgba(0,0,0,0.05)' : 'none',
            transition: `all 0.6s ease ${0.05 * i}s`,
            transform: show ? 'translateY(0)' : `translateY(${(i % 2 === 0 ? -1 : 1) * 8}px)`,
          }}>
            <LiveDot color={[C.orange, C.google, C.gpt, C.gmapGreen, '#8B5CF6'][i % 5]} />
            <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: C.black }}>{p}</span>
          </div>
        ))}
      </div>
      <div style={a(2)}>
        <p style={{ fontFamily: font, fontSize: 20, color: C.gray7, marginTop: 36, maxWidth: 550, lineHeight: 1.6 }}>
          Each one telling a different version of who you are and whether people should trust you.
        </p>
      </div>
    </div>
  );
}

function Slide_Customer() {
  const a = useEnter();
  const [rings, setRings] = useState(false);
  useEffect(() => { setTimeout(() => setRings(true), 600); }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '60px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Orbiting platform labels */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        animation: rings ? 'slowSpin 40s linear infinite' : 'none',
        opacity: rings ? 0.15 : 0,
        transition: 'opacity 1.5s ease',
      }}>
        {['Google', 'ChatGPT', 'Maps', 'Yelp', 'Gemini', 'Siri', 'Reviews', 'Directories'].map((p, i) => {
          const angle = (i / 8) * 360;
          const r = 220;
          return (
            <span key={p} style={{
              position: 'absolute',
              left: 250 + r * Math.cos(angle * Math.PI / 180) - 30,
              top: 250 + r * Math.sin(angle * Math.PI / 180) - 10,
              fontFamily: font, fontSize: 14, fontWeight: 600, color: C.gray7,
              whiteSpace: 'nowrap',
            }}>{p}</span>
          );
        })}
      </div>
      <div style={a(0)}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.white}, ${C.gray1})`,
          border: `2px solid ${C.gray3}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: rings
            ? `0 0 0 20px rgba(254,37,22,0.04), 0 0 0 40px rgba(254,37,22,0.03), 0 0 0 70px rgba(254,37,22,0.02)`
            : '0 0 0 0 transparent',
          transition: 'box-shadow 1.5s ease',
        }}>
          <Users size={40} color={C.gray7} />
        </div>
      </div>
      <div style={a(1)}>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.black, lineHeight: 1.2, maxWidth: 680, margin: '20px auto 0' }}>
          Your customer is stuck trying to make a decision in the middle of all that noise.
        </h2>
      </div>
      <div style={a(2)}>
        <p style={{
          fontFamily: font, fontSize: 36, fontWeight: 700, color: C.orange,
          marginTop: 20,
          textShadow: `0 0 40px ${C.orange}30`,
        }}>
          It's a brutal job.
        </p>
      </div>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 20, marginTop: 28, ...a(3) }}>
        {[
          { value: '74%', label: 'check at least 2 review sources before deciding', source: 'BrightLocal, 2025' },
          { value: '3.6', label: 'apps used by Gen Z for a single local business decision', source: 'SOCi, 2025' },
          { value: '79% → 42%', label: 'trust in reviews vs. personal recommendations in 5 years', source: '' },
          { value: '63%', label: 'have found inaccuracies in business listings. 47% leave.', source: 'SOCi, 2024' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '10px 12px', textAlign: 'center',
            background: 'rgba(255,255,255,0.5)', borderRadius: 10,
            border: `1px solid ${C.gray3}`,
          }}>
            <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: C.orange, display: 'block' }}>{s.value}</span>
            <p style={{ fontFamily: font, fontSize: 10, color: C.gray7, marginTop: 4, lineHeight: 1.3 }}>{s.label}</p>
            {s.source && <p style={{ fontFamily: font, fontSize: 9, color: C.gray5, marginTop: 3, fontStyle: 'italic' }}>{s.source}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide_81Percent() {
  const a = useEnter();
  const count81 = useCounter(81, 1400, 400);
  const count91 = useCounter(91, 1000, 1200);
  const count58 = useCounter(58, 1000, 1400);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '50px 80px', position: 'relative' }}>
      {/* Ambient glow behind the number */}
      <div style={{
        position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 280, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${C.orange}12 0%, transparent 70%)`,
        pointerEvents: 'none', filter: 'blur(40px)',
      }} />
      <div style={a(0)}>
        <span style={{
          fontFamily: font, fontSize: 220, fontWeight: 700, lineHeight: 0.9,
          display: 'block', position: 'relative',
          background: `linear-gradient(180deg, ${C.black} 30%, ${C.orange} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: -8,
        }}>
          {count81}%
        </span>
      </div>
      <div style={a(1)}>
        <p style={{ fontFamily: font, fontSize: 24, color: C.gray7, lineHeight: 1.5, maxWidth: 600, margin: '12px auto 0' }}>
          of B2B buyers already have a preferred vendor before they ever reach out.
        </p>
        <p style={{ fontFamily: font, fontSize: 11, color: C.gray5, marginTop: 8, fontStyle: 'italic' }}>
          6sense, 2024 Buyer Experience Report
        </p>
      </div>
      <div style={a(2)}>
        <p style={{ fontFamily: font, fontSize: 17, color: C.gray7, marginTop: 20, maxWidth: 560, lineHeight: 1.5 }}>
          For local services, the behavior is the same.
        </p>
      </div>
      <div style={{ width: 48, height: 2, background: C.gray3, borderRadius: 1, margin: '28px auto', ...a(2) }} />
      <div style={{ display: 'flex', gap: 56, justifyContent: 'center', ...a(3) }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: font, fontSize: 44, fontWeight: 700, color: C.orange }}>{count91}%</span>
          <p style={{ fontFamily: font, fontSize: 13, color: C.gray7, marginTop: 6, maxWidth: 200, lineHeight: 1.4 }}>
            of consumers research you online before deciding
          </p>
          <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, marginTop: 6, fontStyle: 'italic' }}>BrightLocal, 2025</p>
        </div>
        <div style={{ width: 1, background: C.gray3, alignSelf: 'stretch' }} />
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: font, fontSize: 44, fontWeight: 700, color: C.orange }}>{count58}.5%</span>
          <p style={{ fontFamily: font, fontSize: 13, color: C.gray7, marginTop: 6, maxWidth: 220, lineHeight: 1.4 }}>
            of all Google searches now end without a single click
          </p>
          <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, marginTop: 6, fontStyle: 'italic' }}>SparkToro / Datos, 2025</p>
        </div>
      </div>
    </div>
  );
}

function Slide_Instinct() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 60px', gap: 60 }}>
      <div style={{ maxWidth: 480 }}>
        <div style={a(0)}>
          <p style={{ fontFamily: font, fontSize: 18, color: C.gray7, lineHeight: 1.6, marginBottom: 28 }}>
            Most business owners don't think about any of that. They think about their own website. And when something feels off, the instinct is always the same:
          </p>
        </div>
        <div style={a(1)}>
          <div style={{ position: 'relative' }}>
            <span style={{ fontFamily: font, fontSize: 56, fontWeight: 700, color: C.black, lineHeight: 1.1, display: 'block' }}>
              "I need a new website."
            </span>
            <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 5, background: C.orange, borderRadius: 3 }} />
          </div>
        </div>
        <div style={a(2)}>
          <p style={{ fontFamily: font, fontSize: 16, color: C.gray5, marginTop: 36, fontStyle: 'italic' }}>
            The most expensive sentence in marketing, when it comes before the strategy.
          </p>
        </div>
      </div>
      <div style={{ ...a(3), width: 320, flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ opacity: 0.6 }}>
            <MiniWebsite name="Your Business" tagline="Welcome to Your Business" />
          </div>
          <div style={{ position: 'absolute', top: 12, left: 12, right: 12, bottom: 12, border: `2px dashed ${C.orange}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: C.orange, borderRadius: 8, padding: '8px 16px' }}>
              <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: C.white }}>Rebuild?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide_Trap() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 80px', gap: 60 }}>
      {/* Before/After mini websites that look identical */}
      <div style={{ display: 'flex', gap: 20, ...a(0) }}>
        <div>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: C.gray5, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, textAlign: 'center' }}>Before</p>
          <MiniWebsite name="Lakeside CPA" tagline="Your Trusted Accounting Partner" style={{ width: 260, opacity: 0.8 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 20 }}>
          <ArrowRight size={24} color={C.gray5} />
        </div>
        <div>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: C.gray5, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, textAlign: 'center' }}>After</p>
          <MiniWebsite name="Lakeside CPA" tagline="Your Trusted Accounting Partner" style={{ width: 260, opacity: 0.8 }} />
        </div>
      </div>
      <div style={{ maxWidth: 420 }}>
        <div style={a(1)}>
          <p style={{ fontFamily: font, fontSize: 22, color: C.gray7, lineHeight: 1.6, marginBottom: 12 }}>
            If you don't know what the website is supposed to do, and you don't know who it's actually for,
          </p>
        </div>
        <div style={a(2)}>
          <h2 style={{ fontFamily: font, fontSize: 36, fontWeight: 700, color: C.black, lineHeight: 1.2, marginBottom: 24 }}>
            you're spending money to rebuild the same problem.
          </h2>
        </div>
        <div style={a(3)}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: `${C.orange}0D`, borderRadius: 10, padding: '12px 20px',
            border: `1px solid ${C.orange}22`,
          }}>
            <AlertTriangle size={18} color={C.orange} />
            <span style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: C.orange }}>
              Strategy has to come first.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide_Strategy() {
  const a = useEnter();
  const [depth, setDepth] = useState(false);
  useEffect(() => { setTimeout(() => setDepth(true), 900); }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 80px', gap: 80 }}>
      {/* Iceberg */}
      <div style={{ ...a(0), flexShrink: 0, width: 300 }}>
        <div style={{ position: 'relative' }}>
          {/* Water line label */}
          <div style={{ position: 'absolute', top: 82, left: -40, right: -40, display: 'flex', alignItems: 'center', gap: 8, zIndex: 3 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.google}66)` }} />
            <span style={{ fontFamily: font, fontSize: 10, color: C.google, fontWeight: 600, whiteSpace: 'nowrap' }}>waterline</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.google}66, transparent)` }} />
          </div>
          {/* Above: Design */}
          <div style={{
            width: 120, height: 80, margin: '0 auto',
            background: `linear-gradient(180deg, ${C.white}, ${C.gray1})`,
            borderRadius: '12px 12px 0 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 2,
            border: `1px solid ${C.gray3}`,
            borderBottom: 'none',
          }}>
            <span style={{ fontFamily: font, fontSize: 11, fontWeight: 600, color: C.gray7 }}>Design</span>
            <span style={{ fontFamily: font, fontSize: 9, color: C.gray5, marginTop: 2 }}>Colors, fonts, layout</span>
          </div>
          {/* Below: Strategy */}
          <div style={{
            width: depth ? 300 : 120,
            height: depth ? 280 : 0,
            background: `linear-gradient(180deg, ${C.gray1} 0%, ${C.orange}15 60%, ${C.orange}25 100%)`,
            borderRadius: depth ? '0 0 50% 50%' : '0',
            margin: '0 auto',
            transition: 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8,
            border: depth ? `1px solid ${C.gray3}` : 'none',
            borderTop: 'none',
          }}>
            <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: C.black, opacity: depth ? 1 : 0, transition: 'opacity 0.6s ease 1s' }}>Strategy</span>
            {['Purpose', 'Audience', 'Experience'].map((l, i) => (
              <span key={l} style={{
                fontFamily: font, fontSize: 12, color: C.gray7,
                opacity: depth ? 1 : 0,
                transition: `opacity 0.5s ease ${1.2 + i * 0.2}s`,
              }}>{l}</span>
            ))}
          </div>
          <p style={{ fontFamily: font, fontSize: 11, color: C.gray5, textAlign: 'center', marginTop: 16, opacity: depth ? 1 : 0, transition: 'opacity 0.5s ease 1.8s' }}>
            10% above &nbsp;&middot;&nbsp; 90% below
          </p>
        </div>
      </div>
      {/* Text */}
      <div style={{ maxWidth: 480 }}>
        <div style={a(1)}>
          <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 700, color: C.black, lineHeight: 1.1, marginBottom: 24 }}>
            Strategy has to come first.
          </h2>
        </div>
        <div style={a(2)}>
          <p style={{ fontFamily: font, fontSize: 18, color: C.gray7, lineHeight: 1.65, marginBottom: 20 }}>
            Design does not mean colors and fonts. That's the 10% above the waterline. Strategy is the 90% below.
          </p>
        </div>
        <div style={a(3)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'What is this website supposed to accomplish?',
              'Who is it actually for?',
              'What does someone need to experience to make a decision?',
            ].map((q, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 14px', background: 'rgba(255,255,255,0.6)',
                borderRadius: 10, backdropFilter: 'blur(10px)',
                border: `1px solid ${C.gray3}`,
              }}>
                <span style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: C.orange, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontFamily: font, fontSize: 14, color: C.black, lineHeight: 1.4 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide_ThreePeople() {
  const a = useEnter();
  const [highlight, setHighlight] = useState(false);
  useEffect(() => { setTimeout(() => setHighlight(true), 2200); }, []);
  const stages = [
    {
      num: '01', label: 'Unaware',
      quote: '"I don\'t know I have this problem"',
      content: 'Content that surfaces the problem they did not know they had.',
      color: C.gray5, icon: Eye, active: false,
      webContent: { headline: 'Blog: 5 Signs Your Books Are Costing You', sub: 'Educational content that meets them before they search' },
    },
    {
      num: '02', label: 'Comparing',
      quote: '"I\'m comparing my options"',
      content: 'Proof. Case studies. Differentiators. Reasons to trust you over the alternative.',
      color: '#D4A017', icon: Layers, active: false,
      webContent: { headline: 'Case Study: How We Saved $42K', sub: 'Social proof and evidence that builds confidence' },
    },
    {
      num: '03', label: 'Ready to act',
      quote: '"I\'m ready to act"',
      content: 'Clear path to action. Friction removed. Confidence established.',
      color: C.green, icon: Zap, active: true,
      webContent: { headline: 'Schedule Your Free Consultation', sub: 'CTA button, phone number, form' },
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '40px 50px' }}>
      <div style={a(0)}>
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 12 }}>
          The buyer journey
        </p>
        <h2 style={{ fontFamily: font, fontSize: 42, fontWeight: 700, color: C.black, lineHeight: 1.1, marginBottom: 32 }}>
          Your customer is three different people.
        </h2>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {stages.map((s, i) => (
          <div key={i} style={{
            flex: 1, position: 'relative',
            ...a(i + 1),
          }}>
            {/* Dimmed overlay on first two when highlight triggers */}
            {!s.active && highlight && (
              <div style={{
                position: 'absolute', inset: -1, borderRadius: 16, zIndex: 5,
                background: 'rgba(246,244,236,0.55)',
                backdropFilter: 'blur(1px)',
                transition: 'opacity 0.8s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  background: `${C.orange}12`, borderRadius: 8, padding: '6px 14px',
                  border: `1px solid ${C.orange}22`,
                }}>
                  <span style={{ fontFamily: font, fontSize: 11, color: C.orange, fontWeight: 600 }}>
                    Most websites skip this
                  </span>
                </div>
              </div>
            )}
            <GlassCard glow={s.active && highlight ? C.green : undefined} style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{
                  fontFamily: font, fontSize: 11, fontWeight: 700, color: s.active ? C.green : C.gray5,
                  background: s.active ? `${C.green}15` : C.gray1,
                  padding: '4px 10px', borderRadius: 6,
                }}>{s.num}</span>
                <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: C.black }}>{s.label}</span>
              </div>
              <p style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: C.black, lineHeight: 1.3, marginBottom: 10, fontStyle: 'italic' }}>
                {s.quote}
              </p>
              <p style={{ fontFamily: font, fontSize: 13, color: C.gray7, lineHeight: 1.55, marginBottom: 16 }}>
                {s.content}
              </p>
              {/* Mini website section preview */}
              <div style={{
                padding: '10px 12px', borderRadius: 8,
                background: s.active ? `${C.green}08` : C.gray1,
                border: `1px solid ${s.active ? C.green + '33' : C.gray3}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Monitor size={10} color={s.active ? C.green : C.gray5} />
                  <span style={{ fontFamily: font, fontSize: 9, fontWeight: 600, color: s.active ? C.green : C.gray5, textTransform: 'uppercase', letterSpacing: 1 }}>Website section</span>
                </div>
                <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: C.black, marginBottom: 2 }}>{s.webContent.headline}</p>
                <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, lineHeight: 1.3 }}>{s.webContent.sub}</p>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
      <div style={a(4)}>
        <div style={{
          marginTop: 24, padding: '14px 24px',
          background: highlight ? `${C.orange}08` : 'transparent',
          borderRadius: 10, border: highlight ? `1px solid ${C.orange}22` : '1px solid transparent',
          transition: 'all 0.6s ease', textAlign: 'center',
        }}>
          <p style={{ fontFamily: font, fontSize: 17, color: C.gray7, lineHeight: 1.5 }}>
            Most websites only design for the third person.{' '}
            <span style={{ fontWeight: 700, color: C.orange }}>
              That is not lead generation. That is lead catching.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Slide_Honest() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 60px', gap: 50 }}>
      <div style={{ maxWidth: 440 }}>
        <div style={a(0)}>
          <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 16 }}>
            The hard truth
          </p>
        </div>
        <div style={a(1)}>
          <h2 style={{ fontFamily: font, fontSize: 44, fontWeight: 700, color: C.black, lineHeight: 1.12, marginBottom: 24 }}>
            Even the strategy has to be honest.
          </h2>
        </div>
        <div style={a(2)}>
          <p style={{ fontFamily: font, fontSize: 18, color: C.gray7, lineHeight: 1.6, marginBottom: 28 }}>
            You can't say whatever you want on your website, because there are a dozen other sources out there that might contradict you.
          </p>
        </div>
        <div style={a(3)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: '10px 20px', borderRadius: 8, background: `${C.orange}0A`, border: `1px solid ${C.orange}22` }}>
              <span style={{ fontFamily: font, fontSize: 16, textDecoration: 'line-through', color: C.gray5 }}>Aspirational</span>
            </div>
            <ArrowRight size={20} color={C.gray5} />
            <div style={{ padding: '10px 20px', borderRadius: 8, background: `${C.green}15`, border: `1px solid ${C.green}44` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} color="#0fa035" />
                <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: '#0fa035' }}>Accurate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mini website being "checked" by sources */}
      <div style={{ position: 'relative', ...a(2), width: 400 }}>
        <MiniWebsite name="Your Business" tagline="Award-winning. #1 rated. Best in the Northshore." style={{ width: 300, margin: '0 auto' }} />
        {/* Contradicting source cards */}
        {[
          { label: 'Google Reviews', text: '3.8 stars (14 reviews)', top: -10, left: -30, rot: -4 },
          { label: 'BBB', text: 'No accreditation found', top: 50, right: -40, rot: 3 },
          { label: 'ChatGPT', text: '"Not among the top-rated..."', bottom: 30, left: -20, rot: -2 },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            transform: `rotate(${s.rot}deg)`,
            background: C.white,
            borderRadius: 8, padding: '8px 12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            border: `1px solid ${C.orange}33`,
            animation: `float${(i % 3) + 1} ${6 + i}s ease-in-out infinite`,
            zIndex: 5,
          }}>
            <p style={{ fontFamily: font, fontSize: 9, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{s.label}</p>
            <p style={{ fontFamily: font, fontSize: 11, color: C.gray7 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide_WhatYouOwn() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '36px 50px' }}>
      <div style={a(0)}>
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 12 }}>
          What you control
        </p>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.black, lineHeight: 1.12, marginBottom: 8 }}>
          What you actually own.
        </h2>
        <p style={{ fontFamily: font, fontSize: 16, color: C.gray7, lineHeight: 1.5, marginBottom: 24 }}>
          Your website and your Google Business Profile. Everything else you can influence, but you do not control.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, ...a(1) }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${C.orange}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={14} color={C.orange} />
              </div>
              <span style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: C.black }}>Your website</span>
            </div>
          </div>
          <MiniWebsite name="Your Business" tagline="Strategic, Honest, Built for Your Customer" style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'The source every system references',
              'You control every word, image, and signal',
              'Where the closing argument happens',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <CheckCircle size={12} color={C.orange} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: font, fontSize: 12, color: C.gray7, lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 1, background: C.gray3, alignSelf: 'stretch' }} />
        <div style={{ flex: 1, ...a(2) }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${C.google}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={14} color={C.google} />
              </div>
              <span style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: C.black }}>Your Google Business Profile</span>
            </div>
          </div>
          <GBPMini style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Feeds Google\'s local knowledge graph directly',
              'Reviews, photos, posts, Q&A, all owned by you',
              'First impression in Maps, AI Overviews, and local pack',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <CheckCircle size={12} color={C.google} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: font, fontSize: 12, color: C.gray7, lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', ...a(3) }}>
        {[
          { value: '36%', label: 'of businesses have not verified their GBP', source: 'Birdeye, 2025', color: C.orange },
          { value: '80%', label: 'more often verified profiles surface in search', source: 'Google, 2025', color: C.google },
          { value: '88%', label: 'would choose a business that responds to all reviews', source: 'BrightLocal, 2025', color: '#0fa035' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, textAlign: 'center', padding: '12px 10px',
            background: 'rgba(255,255,255,0.5)', borderRadius: 10,
            border: `1px solid ${C.gray3}`,
          }}>
            <span style={{ fontFamily: font, fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</span>
            <p style={{ fontFamily: font, fontSize: 11, color: C.gray7, marginTop: 4, lineHeight: 1.35 }}>{s.label}</p>
            <p style={{ fontFamily: font, fontSize: 9, color: C.gray5, marginTop: 4, fontStyle: 'italic' }}>{s.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide_Specificity() {
  const a = useEnter();
  const [activeTab, setActiveTab] = useState(0);
  const towns = ['Mequon', 'Cedarburg', 'Grafton', 'Thiensville'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '40px 50px' }}>
      <div style={a(0)}>
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 12 }}>
          The signal
        </p>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.black, lineHeight: 1.1, marginBottom: 28 }}>
          Specificity is the signal that cuts through.
        </h2>
      </div>
      <div style={{ display: 'flex', gap: 32, marginBottom: 28 }}>
        {/* LEFT: What most businesses do */}
        <div style={{ flex: 1, ...a(1) }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: C.gray5, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>What most businesses do</p>
          <BrowserChrome url="www.yourbusiness.com/service-area" style={{ opacity: 0.75 }}>
            <div style={{ padding: '20px 18px', minHeight: 200 }}>
              <div style={{ width: 80, height: 8, background: C.gray3, borderRadius: 4, marginBottom: 16 }} />
              <p style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: C.black, lineHeight: 1.2, marginBottom: 12 }}>
                Proudly serving the greater Northshore area
              </p>
              <p style={{ fontFamily: font, fontSize: 13, color: C.gray5, lineHeight: 1.6, marginBottom: 16 }}>
                We serve businesses of all sizes across southeastern Wisconsin with comprehensive professional services.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Broad language', 'Few signals', 'One page'].map(t => (
                  <span key={t} style={{
                    fontFamily: font, fontSize: 10, color: C.gray5, padding: '4px 10px',
                    background: C.gray1, borderRadius: 4,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </BrowserChrome>
        </div>
        {/* RIGHT: What actually works */}
        <div style={{ flex: 1, ...a(2) }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: '#0fa035', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>What actually works</p>
          <BrowserChrome url={`www.yourbusiness.com/${towns[activeTab].toLowerCase()}`} accent={C.green}>
            <div style={{ minHeight: 200 }}>
              {/* Town tabs */}
              <div style={{ display: 'flex', borderBottom: `1px solid ${C.gray1}` }}>
                {towns.map((t, i) => (
                  <div key={t}
                    onClick={(e) => { e.stopPropagation(); setActiveTab(i); }}
                    style={{
                      flex: 1, padding: '8px 6px', textAlign: 'center', cursor: 'pointer',
                      fontFamily: font, fontSize: 11, fontWeight: i === activeTab ? 700 : 400,
                      color: i === activeTab ? C.orange : C.gray5,
                      borderBottom: i === activeTab ? `2px solid ${C.orange}` : '2px solid transparent',
                      transition: 'all 0.25s ease',
                    }}
                  >{t}</div>
                ))}
              </div>
              <div style={{ padding: '18px 18px' }}>
                <p style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: C.black, lineHeight: 1.2, marginBottom: 10 }}>
                  Accounting services in {towns[activeTab]}
                </p>
                <p style={{ fontFamily: font, fontSize: 12, color: C.gray7, lineHeight: 1.55, marginBottom: 14 }}>
                  Dedicated tax preparation and advisory for {towns[activeTab]} families and businesses. We understand this community because we are part of it.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Local relevance', 'Direct signals', 'Per-community'].map(t => (
                    <span key={t} style={{
                      fontFamily: font, fontSize: 10, color: '#0fa035', padding: '4px 10px',
                      background: `${C.green}10`, borderRadius: 4, border: `1px solid ${C.green}33`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </BrowserChrome>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', ...a(3) }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px',
          background: 'rgba(255,255,255,0.6)', borderRadius: 10,
          border: `1px solid ${C.gray3}`, backdropFilter: 'blur(10px)',
        }}>
          <span style={{ fontFamily: font, fontSize: 28, fontWeight: 700, color: C.orange }}>3.2x</span>
          <div>
            <p style={{ fontFamily: font, fontSize: 12, color: C.gray7, lineHeight: 1.3 }}>more likely to appear in AI Overviews</p>
            <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, fontStyle: 'italic' }}>Pages with FAQ schema</p>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px',
          background: 'rgba(255,255,255,0.6)', borderRadius: 10,
          border: `1px solid ${C.gray3}`, backdropFilter: 'blur(10px)',
        }}>
          <span style={{ fontFamily: font, fontSize: 28, fontWeight: 700, color: C.orange }}>3x</span>
          <div>
            <p style={{ fontFamily: font, fontSize: 12, color: C.gray7, lineHeight: 1.3 }}>more likely to be cited by AI systems</p>
            <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, fontStyle: 'italic' }}>Content updated within 3 months</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide_Credibility() {
  const a = useEnter();
  const [flash, setFlash] = useState(false);
  useEffect(() => { setTimeout(() => setFlash(true), 800); }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 80px', gap: 60 }}>
      <div style={{ maxWidth: 500 }}>
        <div style={a(0)}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
            <span style={{
              fontFamily: font, fontSize: 100, fontWeight: 700, color: C.black, lineHeight: 1,
              letterSpacing: -3,
            }}>50</span>
            <span style={{ fontFamily: font, fontSize: 36, fontWeight: 700, color: C.gray5 }}>ms</span>
          </div>
          <p style={{ fontFamily: font, fontSize: 22, color: C.gray7, lineHeight: 1.4, marginBottom: 4 }}>
            is how fast someone judges your credibility.
          </p>
          <p style={{ fontFamily: font, fontSize: 13, color: C.gray5, fontStyle: 'italic' }}>
            Before they read a word.
          </p>
        </div>
        {/* Speed bar animation */}
        <div style={a(1)}>
          <div style={{ marginTop: 28, marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: font, fontSize: 10, color: C.gray5 }}>Page loads</span>
              <span style={{ fontFamily: font, fontSize: 10, color: C.gray5 }}>Decision made</span>
            </div>
            <div style={{ height: 6, background: C.gray1, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: flash ? '100%' : '0%',
                background: `linear-gradient(90deg, ${C.orange}, ${C.yellow})`,
                borderRadius: 3,
                transition: flash ? 'width 0.05s ease' : 'none',
                boxShadow: flash ? `0 0 12px ${C.orange}50` : 'none',
              }} />
            </div>
            <div style={{
              textAlign: 'right', marginTop: 4,
              opacity: flash ? 1 : 0, transition: 'opacity 0.3s ease 0.1s',
            }}>
              <span style={{ fontFamily: font, fontSize: 10, fontWeight: 600, color: C.orange }}>50ms</span>
            </div>
          </div>
        </div>
        <div style={a(2)}>
          <div style={{ width: 40, height: 2, background: C.gray3, borderRadius: 1, marginBottom: 28 }} />
          <p style={{ fontFamily: font, fontSize: 20, color: C.gray7, lineHeight: 1.6, marginBottom: 12 }}>
            Can your marketing team update the website without calling a developer?
          </p>
        </div>
        <div style={a(3)}>
          <p style={{ fontFamily: font, fontSize: 18, color: C.gray7, lineHeight: 1.5 }}>
            If the answer is no, you did not build a marketing tool.
          </p>
          <p style={{
            fontFamily: font, fontSize: 28, fontWeight: 700, color: C.orange,
            marginTop: 12,
          }}>
            You built a dependency.
          </p>
        </div>
      </div>
      {/* Visual: two mini website states */}
      <div style={{ position: 'relative', flexShrink: 0, ...a(2) }}>
        <div style={{ position: 'relative' }}>
          <MiniWebsite name="Your Business" tagline="Your Trusted Partner Since 2008" style={{ width: 300, opacity: flash ? 1 : 0.4, transition: 'opacity 0.05s ease' }} />
          {/* Judgment overlay */}
          {flash && (
            <div style={{
              position: 'absolute', top: 60, left: -20, right: -20,
              display: 'flex', justifyContent: 'center',
              animation: 'float1 4s ease-in-out infinite',
            }}>
              <div style={{
                background: C.white, borderRadius: 10, padding: '8px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: `1px solid ${C.gray3}`,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Eye size={14} color={C.orange} />
                <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: C.black }}>
                  Credibility assessed in 50ms
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Slide_OnePiece() {
  const a = useEnter();
  const pieces = [
    { label: 'Google Search', active: false },
    { label: 'Google Maps', active: false },
    { label: 'ChatGPT', active: false },
    { label: 'Your website', active: true },
    { label: 'Reviews', active: false },
    { label: 'Voice search', active: false },
    { label: 'Directories', active: false },
    { label: 'AI Overviews', active: false },
    { label: 'Social', active: false },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 80px', gap: 60 }}>
      {/* Fragmented grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: 340, flexShrink: 0, ...a(0) }}>
        {pieces.map((p, i) => (
          <div key={i} style={{
            padding: '18px 12px',
            background: p.active ? C.orange : 'rgba(255,255,255,0.5)',
            borderRadius: 12,
            textAlign: 'center',
            border: p.active ? `2px solid ${C.orange}` : `1px solid ${C.gray3}`,
            boxShadow: p.active ? `0 8px 32px ${C.orange}30` : '0 2px 8px rgba(0,0,0,0.04)',
            transform: p.active ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.5s ease',
          }}>
            <span style={{
              fontFamily: font, fontSize: 11, fontWeight: p.active ? 700 : 500,
              color: p.active ? C.white : C.gray5,
            }}>{p.label}</span>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 480 }}>
        <div style={a(1)}>
          <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 700, color: C.black, lineHeight: 1.12, marginBottom: 20 }}>
            The website matters.
          </h2>
        </div>
        <div style={a(2)}>
          <p style={{ fontFamily: font, fontSize: 22, color: C.gray7, lineHeight: 1.5, marginBottom: 16 }}>
            But it's one piece of a landscape that's fragmented, inconsistent, and not fully understood by anyone.
          </p>
        </div>
        <div style={a(3)}>
          <p style={{ fontFamily: font, fontSize: 18, color: C.orange, fontWeight: 600, lineHeight: 1.5 }}>
            Including the people selling you marketing.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slide_Moving() {
  const a = useEnter();
  const count900 = useCounter(900, 1200, 600);
  const count58 = useCounter(58, 1000, 900);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '50px 80px', textAlign: 'center' }}>
      <div style={a(0)}>
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 12 }}>
          The pace of change
        </p>
        <h2 style={{ fontFamily: font, fontSize: 44, fontWeight: 700, color: C.black, lineHeight: 1.1, marginBottom: 40 }}>
          The landscape is moving.
        </h2>
      </div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginBottom: 36 }}>
        {[
          {
            value: <>{count900}M+</>,
            label: 'weekly active users on ChatGPT, doubled in 10 months',
            source: 'OpenAI, December 2025',
            icon: Sparkles, color: C.gpt,
          },
          {
            value: <>{count58}%</>,
            label: 'of consumers have used voice search to find a local business',
            source: 'BrightLocal, 2025',
            icon: Mic, color: C.google,
          },
          {
            value: <>3-30x</>,
            label: 'harder to achieve AI discoverability than to rank in Google\'s local pack',
            source: 'SOCi, 2026',
            icon: TrendingUp, color: C.orange,
          },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, ...a(i + 1) }}>
            <GlassCard style={{ height: '100%', textAlign: 'center' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${s.color}12`, margin: '0 auto 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={22} color={s.color} />
              </div>
              <span style={{
                fontFamily: font, fontSize: 40, fontWeight: 700, color: s.color,
                display: 'block', marginBottom: 10, lineHeight: 1,
              }}>{s.value}</span>
              <p style={{ fontFamily: font, fontSize: 13, color: C.gray7, lineHeight: 1.5, marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontFamily: font, fontSize: 10, color: C.gray5, fontStyle: 'italic' }}>{s.source}</p>
            </GlassCard>
          </div>
        ))}
      </div>
      <div style={a(4)}>
        <p style={{ fontFamily: font, fontSize: 18, color: C.gray7, lineHeight: 1.6, maxWidth: 620 }}>
          Nobody has this fully figured out.{' '}
          <span style={{ fontWeight: 700, color: C.orange }}>But you can be strategic about what you control.</span>
        </p>
      </div>
    </div>
  );
}

function Slide_ThreeThings() {
  const a = useEnter();
  const tasks = [
    {
      num: '1', title: 'Research yourself.',
      desc: 'Search your business name + city on Google. Then ask ChatGPT about your industry in your area. Compare. That is your baseline.',
      icon: Search, color: C.google,
    },
    {
      num: '2', title: 'Your Google Business Profile.',
      desc: '100% complete. 10+ real photos. Respond to every review. A third of businesses have not even verified theirs.',
      icon: MapPin, color: '#0fa035',
      stat: { value: '36%', label: 'unverified', source: 'Birdeye, 2025' },
    },
    {
      num: '3', title: 'Add an FAQ page.',
      desc: 'The five questions your clients always ask. Your receptionist\'s Monday morning questions are your most valuable content.',
      icon: FileText, color: C.orange,
      stat: { value: '3.2x', label: 'more likely in AI answers', source: 'Pages with FAQ schema' },
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '50px 60px' }}>
      <div style={a(0)}>
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 12 }}>
          Before next week
        </p>
        <h2 style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: C.black, marginBottom: 32, lineHeight: 1.1 }}>
          Three things you can do right now.
        </h2>
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {tasks.map((t, i) => (
          <div key={i} style={{ flex: 1, ...a(i + 1) }}>
            <GlassCard glow={t.color} style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${t.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${t.color}33`,
                }}>
                  <t.icon size={20} color={t.color} />
                </div>
                <span style={{
                  fontFamily: font, fontSize: 32, fontWeight: 700, color: t.color, lineHeight: 1,
                  opacity: 0.2,
                }}>{t.num}</span>
              </div>
              <p style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: C.black, marginBottom: 10, lineHeight: 1.3 }}>
                {t.title}
              </p>
              <p style={{ fontFamily: font, fontSize: 13, color: C.gray7, lineHeight: 1.6, marginBottom: t.stat ? 14 : 0 }}>
                {t.desc}
              </p>
              {t.stat && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 12px', borderRadius: 8,
                  background: `${t.color}08`, border: `1px solid ${t.color}22`,
                }}>
                  <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: t.color }}>{t.stat.value}</span>
                  <div>
                    <p style={{ fontFamily: font, fontSize: 10, color: C.gray7, lineHeight: 1.3 }}>{t.stat.label}</p>
                    <p style={{ fontFamily: font, fontSize: 9, color: C.gray5, fontStyle: 'italic' }}>{t.stat.source}</p>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide_Close() {
  const a = useEnter();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '60px 80px' }}>
      <div style={a(0)}>
        <img src={LOGO} alt="Momentic" style={{ height: 52, marginBottom: 48 }} />
      </div>
      <div style={a(1)}>
        <h2 style={{ fontFamily: font, fontSize: 38, fontWeight: 700, color: C.black, lineHeight: 1.3, maxWidth: 620, marginBottom: 28 }}>
          Your website is the closing argument someone is having with themselves at 11pm.
        </h2>
      </div>
      <div style={a(2)}>
        <p style={{ fontFamily: font, fontSize: 20, color: C.gray7, lineHeight: 1.5 }}>
          Make sure it's an honest one.
        </p>
      </div>
      <div style={a(3)}>
        <div style={{
          marginTop: 36, padding: '28px 44px',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16, border: `1px solid ${C.gray3}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          maxWidth: 560,
        }}>
          <p style={{ fontFamily: font, fontSize: 18, fontWeight: 600, color: C.black }}>Tyler Einberger</p>
          <p style={{ fontFamily: font, fontSize: 13, color: C.gray7, marginTop: 4 }}>Co-founder &amp; COO, Momentic</p>
          <div style={{ width: 40, height: 2, background: C.orange, borderRadius: 1, margin: '14px auto' }} />
          <p style={{ fontFamily: font, fontSize: 14, color: C.orange, fontWeight: 500, marginBottom: 6 }}>tyler@momenticmarketing.com</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 16 }}>
            {['momenticmarketing.com', 'mkedmc.org'].map(u => (
              <span key={u} style={{ fontFamily: font, fontSize: 11, color: C.gray5 }}>{u}</span>
            ))}
          </div>
          <div style={{ width: '100%', height: 1, background: C.gray3, marginBottom: 14 }} />
          <p style={{ fontFamily: font, fontSize: 13, color: C.gray7, lineHeight: 1.6, textAlign: 'left' }}>
            <span style={{ fontWeight: 600, color: C.black }}>What I recommend:</span> Start with a discoverability assessment. I will walk through what AI systems and search platforms say about your business today, how you compare to your competition, and where the gaps are. No pitch. Just what is there.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PRESENTATION ──────────────────────────────────── */

const SLIDES = [
  Slide_Title,         // 1. Title
  Slide_Mess,          // 2. The landscape is a mess
  Slide_Disagree,      // 3. Three platforms, three answers
  Slide_NoMasterList,  // 4. There is no master list
  Slide_Customer,      // 5. Your customer is in the middle
  Slide_81Percent,     // 6. 81% already have a preferred vendor
  Slide_Instinct,      // 7. "I need a new website"
  Slide_Trap,          // 8. Rebuilding the same problem
  Slide_Strategy,      // 9. Strategy has to come first
  Slide_ThreePeople,   // 10. Your customer is three different people
  Slide_Honest,        // 11. You have to be honest
  Slide_WhatYouOwn,    // 12. Two surfaces you control
  Slide_Specificity,   // 13. Specificity cuts through
  Slide_Credibility,   // 14. 50ms credibility + platform
  Slide_OnePiece,      // 15. The website is one piece
  Slide_Moving,        // 16. The landscape is moving
  Slide_ThreeThings,   // 17. Three things before next week
  Slide_Close,         // 18. Tyler + CTA
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
      style={{
        position: 'fixed', inset: 0,
        background: C.cream, fontFamily: font,
        overflow: 'hidden', cursor: 'pointer', userSelect: 'none',
      }}
      onClick={(e) => {
        if (e.target.closest?.('button, a, input')) return;
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
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-8px) rotate(-2deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0) rotate(2deg); } 50% { transform: translateY(-10px) rotate(3deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(-6px) rotate(0deg); } }
        @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
        @keyframes livePulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes slowSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: 'fixed', inset: 0,
        background: `radial-gradient(circle, ${C.gray3} 1px, transparent 1px)`,
        backgroundSize: '36px 36px', pointerEvents: 'none', zIndex: 1, opacity: 0.4,
      }} />

      {/* Floating gradient blobs */}
      <div style={{ position: 'fixed', top: -140, right: -140, width: 520, height: 520, background: `radial-gradient(circle at 30% 30%, ${C.orange}, transparent 70%)`, opacity: 0.07, pointerEvents: 'none', zIndex: 1, animation: 'drift1 22s ease-in-out infinite', borderRadius: '50%' }} />
      <div style={{ position: 'fixed', bottom: -120, left: -120, width: 440, height: 440, background: `radial-gradient(circle at 50% 50%, ${C.yellow}, transparent 70%)`, opacity: 0.05, pointerEvents: 'none', zIndex: 1, animation: 'drift2 28s ease-in-out infinite', borderRadius: '50%' }} />
      <div style={{ position: 'fixed', top: '40%', right: '8%', width: 380, height: 380, background: `radial-gradient(circle at 60% 60%, ${C.green}, transparent 70%)`, opacity: 0.04, pointerEvents: 'none', zIndex: 1, animation: 'drift3 25s ease-in-out infinite', borderRadius: '50%' }} />

      {/* Slide */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
        <Current key={slide} />
      </div>

      {/* Progress */}
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
        }} />
      )}

      {/* Counter */}
      <div style={{
        position: 'fixed', bottom: 12, right: 24,
        fontSize: 12, color: C.gray5, fontFamily: font, zIndex: 150,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontWeight: 600, color: C.gray7 }}>{slide + 1}</span>
        <span>/</span>
        <span>{TOTAL}</span>
      </div>

      {/* Nav hints */}
      {slide > 0 && (
        <div style={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 150, opacity: 0.15 }}>
          <ChevronLeft size={24} color={C.gray7} />
        </div>
      )}
      {slide < TOTAL - 1 && (
        <div style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 150, opacity: 0.15 }}>
          <ChevronRight size={24} color={C.gray7} />
        </div>
      )}
    </div>
  );
}