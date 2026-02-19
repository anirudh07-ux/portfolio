import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── EMAILJS CONFIG ───────────────────────────────────────────────────────────
// Replace these three values with your own from https://www.emailjs.com/
const EJS_SERVICE_ID  = "service_x81wst2";
const EJS_TEMPLATE_ID = "template_cy1oqha";
const EJS_PUBLIC_KEY  = "W9z814hJjUUwo--bo";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Anirudh",
  initials: "A",
  role: "Agentic Full-Stack Developer",
  taglines: [
    "I build intelligent systems",
    "Crafting AI-powered solutions",
    "Bridging code & intelligence",
    "Engineering scalable AI-powered applications"
  ],
  description:
    "Designing and developing full-stack applications that incorporate agent-based logic, automation, and intelligent workflows. Passionate about bridging the gap between traditional software and autonomous AI systems.",
  stats: [
    { value: 6, label: "Months Experience", suffix: "+" },
    { value: 3, label: "Projects Delivered", suffix: "+" },
    { value: 1, label: "CRM System", suffix: "" },
  ],
  codeLines: [
    { text: "const developer = {", cls: "cw" },
    { text: '  name: "Anirudh",', cls: "cg" },
    { text: '  role: "Agentic Dev",', cls: "cb" },
    { text: '  stack: ["Django","Python"],', cls: "cy" },
    { text: '  build: () => "Intelligent"', cls: "cp" },
    { text: "};", cls: "cw" },
  ],
  services: [
    { icon: "🤖", title: "Agentic Systems", desc: "Designing agent-ready architectures that support autonomous monitoring, decision-support workflows, and human-agent interaction.", tags: ["Agent Design", "Automation", "Workflows", "AI Integration"] },
    { icon: "⚙️", title: "Backend Development", desc: "Building robust Django backends with RESTful APIs, automation-ready architecture, and scalable data models for intelligent systems.", tags: ["Django", "Python", "REST APIs", "SQLite/MySQL"] },
    { icon: "🔗", title: "Full Stack Solutions", desc: "End-to-end development of web applications with dynamic frontends and structured backend communication for enterprise needs.", tags: ["Full Stack", "CRM Systems", "Dashboards", "Admin Panels"] },
    { icon: "📊", title: "Intelligent Dashboards", desc: "Developing dynamic frontend dashboards with real-time data, system observability, and intelligent monitoring capabilities.", tags: ["JavaScript", "HTML/CSS", "REST APIs", "Real-time"] },
  ],
  skills: [
    { category: "Backend", items: ["Python", "Django", "REST APIs", "Django Admin"] },
    { category: "Frontend", items: ["JavaScript", "React", "HTML5", "CSS3", "Responsive Design"] },
    { category: "Databases", items: ["SQLite", "MySQL"] },
    { category: "Agentic & Tools", items: ["Agent Design", "Automation", "LLMs",  "Git", "GitHub"] },
  ],
  experience: [
    { period: "Jan 2026 – Present", role: "Agentic Full-Stack Developer", company: "Digital Edify Technologies", current: true, points: ["Design, develop, and maintain full-stack applications incorporating agent-based logic, automation, and intelligent workflows", "Build agentic systems enabling autonomous monitoring, decision-support, and human-agent interaction", "Architect modular, automation-ready backends supporting future AI agent integration", "Lead end-to-end delivery of intelligent web applications from architecture to deployment"] },
    { period: "May 2025 – Dec 2025", role: "Full Stack Developer", company: "Digital Edify Technologies", current: false, points: ["Developed and maintained full-stack web applications using Django and Python", "Built and consumed RESTful APIs for seamless frontend-backend communication", "Designed responsive dashboards and data models for enterprise clients", "Collaborated with cross-functional teams to deliver production-ready applications"] },
    { period: "Nov 2024 – Apr 2025", role: "Full Stack Python Developer Intern", company: "Digital Edify Technologies", current: false, points: ["Designed full-stack applications incorporating agent-based logic and automation", "Built RESTful APIs enabling agent-based data access and autonomous monitoring workflows", "Contributed to enterprise CRM system development for Nagarjuna Steels", "Applied agentic design principles to create automation-ready backend architecture"] },
  ],
  projects: [
    { type: "Agentic Full Stack", category: "agentic", name: "Smart Car Agentic Dashboard", desc: "Agentic Full Stack application integrating intelligent backend systems with dynamic frontend interfaces. Features RESTful APIs for autonomous monitoring and decision-support workflows.", tags: ["Django", "Python", "REST APIs", "SQLite", "JavaScript"], icon: "🚗", github: "#", live: null },
    { type: "Agentic Web App", category: "agentic", name: "Django Agentic Web Application", desc: "Agent-ready full stack web application with automation-ready architecture supporting intelligent workflows, dynamic frontend, and scalable AI agent integration.", tags: ["Django", "Python", "SQLite"], icon: "🧠", github: "#", live: null },
    { type: "Enterprise CRM", category: "enterprise", name: "CRM System — Nagarjuna Steels", desc: "Enterprise CRM system for managing customers, leads, and business workflows. Built backend modules and REST APIs with responsive dashboards for operational monitoring.", tags: ["Python", "Django", "REST APIs", "MySQL", "JavaScript"], icon: "🏭", github: "#", live: null },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/anirudh07-ux", abbr: "GH" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anirudh-v-84711b315/", abbr: "LI" },
  ],
  email: "vellankianirudh2001@gmail.com",
  location: "India",
};

const NAV_IDS = ["home", "services", "about", "experience", "projects", "contact"];
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useTypewriter(words, ts = 75, ds = 40, pause = 2400) {
  const [{ wi, ci, del }, setState] = useState({ wi: 0, ci: 0, del: false });
  useEffect(() => {
    const cur = words[wi];
    let delay = del ? ds : ts;
    if (!del && ci === cur.length) delay = pause;
    const t = setTimeout(() => {
      if (!del && ci < cur.length) setState(s => ({ ...s, ci: s.ci + 1 }));
      else if (!del && ci === cur.length) setState(s => ({ ...s, del: true }));
      else if (del && ci > 0) setState(s => ({ ...s, ci: s.ci - 1 }));
      else setState({ wi: (wi + 1) % words.length, ci: 0, del: false });
    }, delay);
    return () => clearTimeout(t);
  }, [words, wi, ci, del, ts, ds, pause]);
  return words[wi].slice(0, ci);
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const h = () => {
      const off = window.scrollY + 130;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= off) { setActive(ids[i]); return; }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [ids]);
  return active;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      setP(tot > 0 ? (window.scrollY / tot) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ─── SPOTLIGHT CARD ───────────────────────────────────────────────────────────
function SC({ children, className = "" }) {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  return (
    <div
      ref={ref}
      className={`sc ${className}`}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
      }}
      onMouseLeave={() => setSpot(s => ({ ...s, on: false }))}
    >
      <div className="sc-glow" style={{
        opacity: spot.on ? 1 : 0,
        background: `radial-gradient(360px circle at ${spot.x}px ${spot.y}px, rgba(124,58,237,0.13), transparent 65%)`,
      }} />
      {children}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
function Styles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
      button { font-family: inherit; }
      a { text-decoration: none; }
      ul { list-style: none; }

      :root {
        --bg:    #020817;
        --bg2:   #0b1221;
        --v:     #7c3aed;
        --v2:    #9d5bf4;
        --vl:    #a78bfa;
        --c:     #06b6d4;
        --c2:    #22d3ee;
        --grn:   #34d399;
        --text:  #f1f5f9;
        --tm:    #94a3b8;
        --td:    #475569;
        --card:  rgba(11,18,33,0.72);
        --bdr:   rgba(255,255,255,0.06);
        --r:     14px;
        --ease:  all 0.3s cubic-bezier(0.4,0,0.2,1);
      }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: linear-gradient(var(--v), var(--c)); border-radius: 2px; }

      /* ── Keyframes ── */
      @keyframes pulse   { 0%,100%{opacity:1}50%{opacity:.35} }
      @keyframes float   { 0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)} }
      @keyframes blink   { 0%,100%{opacity:1}50%{opacity:0} }
      @keyframes slideIn { from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1} }
      @keyframes blob1   { 0%,100%{transform:translate(0,0)scale(1)}40%{transform:translate(50px,-70px)scale(1.1)}70%{transform:translate(-40px,40px)scale(.93)} }
      @keyframes blob2   { 0%,100%{transform:translate(0,0)scale(1)}35%{transform:translate(-70px,50px)scale(.9)}70%{transform:translate(55px,-35px)scale(1.08)} }
      @keyframes blob3   { 0%,100%{transform:translate(0,0)scale(1)}40%{transform:translate(35px,65px)scale(1.06)}70%{transform:translate(-55px,-25px)scale(.92)} }
      @keyframes scanline{ 0%{top:-20%}100%{top:110%} }

      /* ── Reveal ── */
      .rv  { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease; }
      .rv.on { opacity:1; transform:translateY(0); }
      .rv-1 { transition-delay:.1s; }
      .rv-2 { transition-delay:.2s; }
      .rv-3 { transition-delay:.3s; }
      .rv-4 { transition-delay:.4s; }

      /* ── Root layout ── */
      .pf { background: var(--bg); color: var(--text); min-height: 100vh; }
      .cnt  { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
      .cnt-s { max-width: 820px;  margin: 0 auto; padding: 0 40px; }

      /* ── Aurora ── */
      .aurora { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
      .ab { position: absolute; border-radius: 50%; filter: blur(90px); }
      .ab1 { width:700px;height:700px;top:-120px;right:-120px; background:radial-gradient(circle,rgba(124,58,237,.16) 0%,transparent 70%); animation:blob1 22s ease-in-out infinite; }
      .ab2 { width:550px;height:550px;bottom:-100px;left:-100px; background:radial-gradient(circle,rgba(6,182,212,.11) 0%,transparent 70%); animation:blob2 28s ease-in-out infinite; }
      .ab3 { width:450px;height:450px;top:42%;left:28%; background:radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 70%); animation:blob3 20s ease-in-out infinite; }

      /* ── Dot grid ── */
      .dots { position: fixed; inset: 0; z-index: 0; pointer-events: none;
        background-image: radial-gradient(rgba(148,163,184,.055) 1px, transparent 1px);
        background-size: 38px 38px; }

      /* Content above bg */
      .pc { position: relative; z-index: 1; }

      /* ── Scroll progress ── */
      .spb { position:fixed;top:0;left:0;height:2px;z-index:300;
        background:linear-gradient(90deg,var(--v),var(--c));
        transition:width .1s linear;pointer-events:none;
        box-shadow:0 0 10px rgba(124,58,237,.7); }

      /* ── Toast ── */
      .toast { position:fixed;bottom:32px;right:32px;z-index:400;
        display:flex;align-items:center;gap:10px;
        background:rgba(11,18,33,.92);border:1px solid rgba(52,211,153,.3);
        backdrop-filter:blur(20px);color:var(--text);padding:14px 20px;
        border-radius:var(--r);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 1px rgba(52,211,153,.08);
        animation:slideIn .3s ease;font-size:14px; }
      .ti { color:var(--grn);font-size:16px;font-weight:800; }
      .tx { background:none;border:none;color:var(--td);cursor:pointer;font-size:20px;line-height:1;margin-left:4px; }
      .tx:hover { color:var(--text); }

      /* ── Back to top ── */
      .btt { position:fixed;bottom:32px;left:32px;z-index:400;
        width:44px;height:44px;border-radius:50%;
        background:linear-gradient(135deg,var(--v),var(--c));
        border:none;color:#fff;font-size:18px;cursor:pointer;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 20px rgba(124,58,237,.5);transition:transform .2s,box-shadow .2s; }
      .btt:hover { transform:translateY(-3px)scale(1.05);box-shadow:0 8px 28px rgba(124,58,237,.7); }

      /* ── Buttons ── */
      .bp { background:linear-gradient(135deg,var(--v),#6d28d9);color:#fff;border:none;
        border-radius:10px;padding:13px 28px;font-size:14px;font-weight:600;cursor:pointer;
        position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;
        display:inline-flex;align-items:center;gap:6px;
        box-shadow:0 4px 16px rgba(124,58,237,.35); }
      .bp::after { content:'';position:absolute;inset:0;
        background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);
        opacity:0;transition:opacity .2s; }
      .bp:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,58,237,.55); }
      .bp:hover::after { opacity:1; }
      .bo { background:rgba(255,255,255,.04);color:var(--text);
        border:1px solid rgba(255,255,255,.12);border-radius:10px;
        padding:13px 28px;font-size:14px;font-weight:600;cursor:pointer;
        transition:var(--ease);backdrop-filter:blur(8px); }
      .bo:hover { border-color:var(--v);color:var(--vl);background:rgba(124,58,237,.08);transform:translateY(-2px); }
      .bfw { width:100%;justify-content:center; }

      /* ── Nav (floating pill) ── */
      .nav { position:fixed;top:0;left:0;right:0;z-index:200;padding:14px 0 0; }
      .nav-wrap { max-width:1100px;margin:0 auto;padding:0 24px; }
      .nav-pill { display:flex;align-items:center;justify-content:space-between;
        background:rgba(5,11,22,.8);backdrop-filter:blur(24px)saturate(200%);
        border:1px solid rgba(255,255,255,.07);border-radius:50px;
        padding:7px 7px 7px 20px;
        box-shadow:0 4px 24px rgba(0,0,0,.35),0 0 0 1px rgba(124,58,237,.06);
        transition:border-color .3s; }
      .nav-pill:hover { border-color:rgba(124,58,237,.18); }
      .nlg { display:flex;align-items:center;gap:10px;cursor:pointer; }
      .nlc { width:32px;height:32px;border-radius:50%;
        background:linear-gradient(135deg,var(--v),var(--c));
        display:flex;align-items:center;justify-content:center;
        font-weight:800;font-size:13px;color:#fff;flex-shrink:0;
        box-shadow:0 0 14px rgba(124,58,237,.55); }
      .nln { font-weight:700;font-size:15px;background:linear-gradient(90deg,var(--text),var(--tm));
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
      .nls { display:flex;gap:2px; }
      .nb { background:none;border:none;cursor:pointer;color:var(--tm);
        font-size:13px;font-weight:500;padding:7px 14px;border-radius:50px;transition:var(--ease); }
      .nb:hover { color:var(--text);background:rgba(255,255,255,.06); }
      .nb.on { color:var(--vl);background:rgba(124,58,237,.15); }
      .ncta { background:linear-gradient(135deg,var(--v),#6d28d9);color:#fff;border:none;
        border-radius:50px;padding:8px 20px;font-size:13px;font-weight:600;cursor:pointer;
        transition:var(--ease);box-shadow:0 2px 12px rgba(124,58,237,.4); }
      .ncta:hover { box-shadow:0 4px 20px rgba(124,58,237,.65);transform:translateY(-1px); }
      .hbg { display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;border-radius:8px; }
      .hbg span { display:block;width:20px;height:2px;background:var(--tm);border-radius:2px;transition:var(--ease); }
      .hbg:hover span { background:var(--text); }
      .mnav { background:rgba(5,11,22,.96);backdrop-filter:blur(20px);
        border:1px solid rgba(255,255,255,.06);border-radius:16px;
        margin:8px 24px;padding:10px;display:flex;flex-direction:column;gap:2px; }
      .mb { background:none;border:none;cursor:pointer;color:var(--tm);
        font-size:15px;font-weight:500;padding:10px 16px;text-align:left;
        border-radius:10px;transition:var(--ease); }
      .mb:hover,.mb.on { color:var(--vl);background:rgba(124,58,237,.1); }

      /* ── Sections ── */
      .sec { padding: 110px 0; }

      .sh { text-align:center;margin-bottom:72px; }
      .sn { font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
        color:var(--vl);margin-bottom:12px;font-family:'Courier New',monospace; }
      .sdiv { width:48px;height:3px;margin:0 auto 18px;
        background:linear-gradient(90deg,var(--v),var(--c));border-radius:2px; }
      .st { font-size:clamp(30px,4vw,46px);font-weight:900;margin:0 0 14px;
        background:linear-gradient(135deg,var(--text) 20%,var(--tm) 100%);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
      .ss { color:var(--tm);max-width:500px;margin:0 auto;line-height:1.8;font-size:15px; }

      /* ── Tags ── */
      .tags { display:flex;flex-wrap:wrap;gap:6px; }
      .tag  { background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.22);
        color:var(--vl);border-radius:6px;padding:4px 11px;font-size:12px;font-weight:500;
        transition:var(--ease); }
      .tag:hover { background:rgba(124,58,237,.16);border-color:rgba(124,58,237,.45); }
      .tag-c { background:rgba(6,182,212,.07);border-color:rgba(6,182,212,.22);color:var(--c2); }
      .tag-d { background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08);color:var(--tm); }

      /* ── Spotlight card ── */
      .sc { position:relative;overflow:hidden;background:var(--card);
        border:1px solid var(--bdr);border-radius:var(--r);
        transition:var(--ease);backdrop-filter:blur(10px); }
      .sc::before { content:'';position:absolute;inset:-1px;border-radius:calc(var(--r) + 1px);
        background:linear-gradient(135deg,rgba(124,58,237,0),rgba(6,182,212,0));
        -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
        -webkit-mask-composite:xor;mask-composite:exclude;
        transition:all .4s ease;z-index:0; }
      .sc:hover::before { background:linear-gradient(135deg,rgba(124,58,237,.55),rgba(6,182,212,.3)); }
      .sc:hover { border-color:transparent;transform:translateY(-5px);
        box-shadow:0 20px 50px rgba(0,0,0,.45),0 0 0 1px rgba(124,58,237,.08); }
      .sc-glow { position:absolute;inset:0;border-radius:inherit;pointer-events:none;transition:opacity .3s;z-index:0; }
      .sc > *:not(.sc-glow) { position:relative;z-index:1; }

      /* ── Hero ── */
      .hero { min-height:100vh;display:flex;align-items:center;padding:130px 0 90px;position:relative; }
      .hero-in { display:flex;align-items:center;gap:64px;flex-wrap:wrap; }
      .hl { flex:1 1 420px; }

      .hbadge { display:inline-flex;align-items:center;gap:8px;
        background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.28);
        color:var(--vl);border-radius:50px;padding:6px 14px;font-size:12px;font-weight:600;
        margin-bottom:22px;letter-spacing:.03em; }
      .pdot { width:6px;height:6px;border-radius:50%;background:var(--grn);
        animation:pulse 2s infinite;box-shadow:0 0 8px rgba(52,211,153,.7); }

      .h-role { font-size:13px;color:var(--vl);font-weight:700;margin-bottom:10px;
        letter-spacing:.1em;text-transform:uppercase;font-family:'Courier New',monospace; }

      .h-name { font-size:clamp(52px,8vw,90px);font-weight:900;line-height:.95;margin-bottom:10px;
        background:linear-gradient(135deg,var(--text) 0%,#c4b5fd 55%,var(--c2) 100%);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

      .h-tw { font-size:clamp(18px,2.5vw,28px);font-weight:600;line-height:1.3;
        margin-bottom:24px;color:var(--tm);min-height:1.5em; }
      .tw { color:var(--text); }
      .cur { color:var(--vl);animation:blink 1s infinite;font-weight:300; }

      .h-desc { font-size:15px;color:var(--tm);line-height:1.9;margin-bottom:40px;max-width:490px; }

      .h-stats { display:flex;margin-bottom:44px; }
      .stat-c { text-align:center;padding:20px 32px;position:relative;flex:1; }
      .stat-c:not(:last-child)::after { content:'';position:absolute;right:0;top:18%;height:64%;
        width:1px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.1),transparent); }
      .sv { font-size:40px;font-weight:900;line-height:1;
        background:linear-gradient(135deg,var(--vl),var(--c));
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
      .sl { font-size:11px;color:var(--td);margin-top:4px;text-transform:uppercase;letter-spacing:.06em; }

      .h-acts { display:flex;gap:14px;flex-wrap:wrap; }

      /* Terminal card */
      .term { flex:0 1 320px;background:rgba(5,10,20,.92);
        border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden;
        animation:float 5s ease-in-out infinite;
        box-shadow:0 28px 70px rgba(0,0,0,.55),0 0 0 1px rgba(124,58,237,.1),
                   inset 0 1px 0 rgba(255,255,255,.05); }
      .term-h { background:rgba(11,18,33,.97);padding:12px 16px;
        display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,.04); }
      .tdots { display:flex;gap:6px; }
      .tdots span { width:10px;height:10px;border-radius:50%;display:block; }
      .tfn { font-size:11px;color:var(--td);font-family:'Courier New',monospace;flex:1;text-align:center; }
      .term-b { padding:20px 20px 14px;font-family:'Courier New',monospace;font-size:13px;line-height:2.1; }
      .tl { display:flex;gap:12px; }
      .ln { color:rgba(71,85,105,.6);user-select:none;min-width:16px;font-size:11px; }
      .cw{color:#e2e8f0}.cg{color:#86efac}.cb{color:#93c5fd}.cy{color:#fcd34d}.cp{color:#c4b5fd}
      .term-f { padding:10px 20px 18px;display:flex;gap:8px;flex-wrap:wrap;
        border-top:1px solid rgba(255,255,255,.04); }

      /* Floating badges next to terminal */
      .term-wrap { position:relative;flex:0 1 320px; }
      .fbadge { position:absolute;background:rgba(11,18,33,.88);
        border:1px solid rgba(255,255,255,.08);border-radius:10px;
        padding:10px 14px;backdrop-filter:blur(14px);
        font-size:12px;font-weight:600;display:flex;align-items:center;gap:7px;
        box-shadow:0 8px 24px rgba(0,0,0,.35);white-space:nowrap; }
      .fb1 { top:16%;right:-20px;color:var(--grn);border-color:rgba(52,211,153,.22);
        animation:float 4s ease-in-out infinite; }
      .fb2 { bottom:18%;right:16px;color:var(--c2);border-color:rgba(6,182,212,.22);
        animation:float 5.5s ease-in-out infinite .6s; }

      /* ── Services ── */
      .srv-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(258px,1fr));gap:20px; }
      .svc { padding:28px; }
      .svc-ico { width:52px;height:52px;border-radius:14px;margin-bottom:18px;
        background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(6,182,212,.1));
        border:1px solid rgba(124,58,237,.2);
        display:flex;align-items:center;justify-content:center;font-size:22px; }
      .svc-t { font-size:17px;font-weight:700;margin-bottom:10px;color:var(--text); }
      .svc-d { color:var(--tm);font-size:14px;line-height:1.75;margin-bottom:18px; }

      /* ── About ── */
      .ag { display:flex;gap:64px;flex-wrap:wrap; }
      .at { flex:1 1 360px; }
      .at-ey { font-size:11px;font-weight:700;color:var(--vl);letter-spacing:.12em;
        text-transform:uppercase;margin-bottom:10px;font-family:'Courier New',monospace; }
      .at-h { font-size:clamp(22px,3vw,30px);font-weight:800;margin-bottom:20px;line-height:1.3;
        background:linear-gradient(135deg,var(--text),var(--tm));
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
      .at p { color:var(--tm);line-height:1.9;margin-bottom:14px;font-size:15px; }
      .at strong { color:var(--text); }
      .at-act { display:flex;gap:12px;margin-top:28px;flex-wrap:wrap; }

      .sp { flex:1 1 340px;display:flex;flex-direction:column;gap:14px; }
      .sg { background:rgba(11,18,33,.65);border:1px solid var(--bdr);
        border-radius:12px;padding:16px 18px;transition:border-color .3s; }
      .sg:hover { border-color:rgba(124,58,237,.28); }
      .sg-cat { font-size:11px;font-weight:700;color:var(--vl);margin-bottom:10px;
        text-transform:uppercase;letter-spacing:.1em;font-family:'Courier New',monospace; }

      /* ── Experience ── */
      .timeline { position:relative; }
      .timeline::before { content:'';position:absolute;left:15px;top:0;bottom:0;width:1px;
        background:linear-gradient(to bottom,var(--v),var(--c),transparent);opacity:.3; }
      .tli { display:flex;gap:28px;margin-bottom:32px; }
      .tll { display:flex;flex-direction:column;align-items:center;flex-shrink:0;padding-top:6px; }
      .tld { width:14px;height:14px;border-radius:50%;background:var(--bg2);
        border:2px solid var(--v);transition:all .25s;position:relative;z-index:1;
        box-shadow:0 0 0 4px rgba(124,58,237,.1);flex-shrink:0; }
      .tld.cur { background:var(--v);box-shadow:0 0 0 4px rgba(124,58,237,.2),0 0 14px rgba(124,58,237,.6); }
      .tli:hover .tld { background:var(--v); }
      .tlln { flex:1;width:1px;background:rgba(124,58,237,.12);margin-top:5px; }
      .tlr { flex:1;min-width:0; }
      .ec { padding:22px 24px;transition:border-color .3s; }
      .tli:hover .ec { border-color:rgba(124,58,237,.35); }
      .ep { font-size:11px;color:var(--vl);font-weight:700;margin-bottom:7px;
        letter-spacing:.07em;text-transform:uppercase;font-family:'Courier New',monospace; }
      .er { font-size:17px;font-weight:700;margin-bottom:5px;color:var(--text); }
      .eco { font-size:13px;color:var(--tm);margin-bottom:14px;
        display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
      .bcur { font-size:10px;font-weight:700;padding:3px 9px;border-radius:50px;
        background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.28);
        color:var(--grn);letter-spacing:.04em; }
      .epts li { color:var(--tm);font-size:14px;line-height:1.8;margin-bottom:5px;
        padding-left:16px;position:relative; }
      .epts li::before { content:'▹';position:absolute;left:0;color:var(--vl);font-size:11px;top:2px; }

      /* ── Projects ── */
      .fbar { display:flex;gap:8px;justify-content:center;margin-bottom:48px;flex-wrap:wrap; }
      .fb { background:rgba(255,255,255,.03);border:1px solid var(--bdr);color:var(--tm);
        border-radius:50px;padding:8px 22px;font-size:13px;font-weight:600;cursor:pointer;
        transition:var(--ease); }
      .fb:hover { border-color:rgba(124,58,237,.4);color:var(--vl);background:rgba(124,58,237,.06); }
      .fb.on { background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.55);
        color:var(--vl);box-shadow:0 0 20px rgba(124,58,237,.18); }
      .pg { display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px; }
      .pc2 { display:flex;flex-direction:column; }
      .ptb { height:150px;
        background:linear-gradient(135deg,rgba(124,58,237,.13) 0%,rgba(6,182,212,.06) 100%);
        display:flex;align-items:center;justify-content:center;
        font-size:50px;border-bottom:1px solid var(--bdr);position:relative;overflow:hidden; }
      .ptb::after { content:'';position:absolute;inset:0;
        background:linear-gradient(to bottom,transparent 40%,rgba(11,18,33,.65)); }
      .pb { padding:20px 22px 22px;flex:1;display:flex;flex-direction:column;gap:10px; }
      .pm { display:flex;justify-content:space-between;align-items:center; }
      .pty { font-size:11px;color:var(--c2);text-transform:uppercase;letter-spacing:.1em;
        font-weight:700;font-family:'Courier New',monospace; }
      .pls { display:flex;gap:14px; }
      .pl { font-size:12px;color:var(--vl);font-weight:700;transition:color .2s;letter-spacing:.02em; }
      .pl:hover { color:var(--c2); }
      .pnm { font-size:16px;font-weight:700;color:var(--text);line-height:1.3; }
      .pds { color:var(--tm);font-size:14px;line-height:1.75;flex:1; }

      /* ── Contact ── */
      .cg2 { display:flex;gap:52px;flex-wrap:wrap; }
      .ci { flex:1 1 260px; }
      .ci h3 { font-size:22px;font-weight:800;margin-bottom:28px;
        background:linear-gradient(135deg,var(--text),var(--tm));
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
      .citem { margin-bottom:22px; }
      .clbl { display:block;font-size:11px;color:var(--vl);font-weight:700;margin-bottom:5px;
        text-transform:uppercase;letter-spacing:.1em;font-family:'Courier New',monospace; }
      .cval { color:var(--text);font-size:14px; }
      a.cval:hover { color:var(--vl); }
      .cgrn { color:var(--grn); }
      .socrow { display:flex;gap:10px;margin-top:32px; }
      .socb { width:42px;height:42px;border-radius:10px;
        background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.22);
        color:var(--vl);font-size:12px;font-weight:800;
        display:flex;align-items:center;justify-content:center;
        transition:var(--ease);font-family:'Courier New',monospace; }
      .socb:hover { background:rgba(124,58,237,.2);border-color:rgba(124,58,237,.55);
        transform:translateY(-3px);box-shadow:0 8px 20px rgba(124,58,237,.28); }
      .cf { flex:2 1 360px;display:flex;flex-direction:column;gap:14px; }
      .frow { display:flex;gap:14px;flex-wrap:wrap; }
      .frow .fi { flex:1 1 180px; }
      .fi { width:100%;background:rgba(11,18,33,.72);
        border:1px solid rgba(255,255,255,.07);border-radius:10px;
        padding:13px 16px;color:var(--text);font-size:14px;
        outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit;
        backdrop-filter:blur(8px); }
      .fi::placeholder { color:var(--td); }
      .fi:focus { border-color:rgba(124,58,237,.55);box-shadow:0 0 0 3px rgba(124,58,237,.1); }
      .fta { resize:vertical;min-height:130px; }

      /* ── Footer ── */
      .ft { background:rgba(3,5,15,.99);border-top:1px solid rgba(255,255,255,.05);padding:28px 0; }
      .ft-in { display:flex;justify-content:space-between;align-items:center;
        flex-wrap:wrap;gap:14px;font-size:13px;color:var(--td); }
      .ft-brand { display:flex;align-items:center;gap:8px; }
      .ft-ls { display:flex;gap:24px;flex-wrap:wrap; }
      .ft-lb { background:none;border:none;cursor:pointer;color:var(--td);
        font-size:13px;text-transform:capitalize;transition:color .2s; }
      .ft-lb:hover { color:var(--vl); }
      .ft-hl { color:var(--vl); }

      /* ── Responsive ── */
      @media (max-width: 768px) {
        .nls,.ncta { display:none; }
        .hbg { display:flex; }
        .hero { padding:100px 0 60px; }
        .sec { padding:80px 0; }
        .cnt,.cnt-s { padding:0 24px; }
        .term,.term-wrap { flex:1 1 100%;animation:none; }
        .ag,.cg2 { gap:40px; }
        .frow { flex-direction:column; }
        .hero-in { gap:40px; }
        .h-stats { flex-wrap:wrap; }
        .stat-c { padding:14px 20px; }
        .fbadge { display:none; }
      }
      @media (max-width: 480px) {
        .h-name { font-size:44px; }
        .pg,.srv-grid { grid-template-columns:1fr; }
        .sv { font-size:32px; }
      }
    `}</style>
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="toast">
      <span className="ti">✓</span>
      <span>{message}</span>
      <button className="tx" onClick={onClose}>×</button>
    </div>
  );
}

function StatCard({ value, label, suffix, animate }) {
  const count = useCountUp(value, 1800, animate);
  return (
    <div className="stat-c">
      <div className="sv">{count}{suffix}</div>
      <div className="sl">{label}</div>
    </div>
  );
}

function SectionHeader({ num, title, sub, revRef, revOn }) {
  return (
    <div className={`sh rv${revOn ? " on" : ""}`} ref={revRef}>
      <div className="sn">{num}</div>
      <div className="sdiv" />
      <h2 className="st">{title}</h2>
      {sub && <p className="ss">{sub}</p>}
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <SC className="svc">
      <div className="svc-ico">{service.icon}</div>
      <h3 className="svc-t">{service.title}</h3>
      <p className="svc-d">{service.desc}</p>
      <div className="tags">
        {service.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </SC>
  );
}

function SkillGroup({ category, items }) {
  return (
    <div className="sg">
      <div className="sg-cat">{category}</div>
      <div className="tags">
        {items.map(s => <span key={s} className="tag tag-d">{s}</span>)}
      </div>
    </div>
  );
}

function ExperienceItem({ exp, delay }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={`tli rv rv-${delay}${on ? " on" : ""}`}>
      <div className="tll">
        <div className={`tld${exp.current ? " cur" : ""}`} />
        <div className="tlln" />
      </div>
      <div className="tlr">
        <SC className="ec">
          <div className="ep">{exp.period}</div>
          <h3 className="er">{exp.role}</h3>
          <div className="eco">
            {exp.company}
            {exp.current && <span className="bcur">● Current</span>}
          </div>
          <ul className="epts">
            {exp.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </SC>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <SC className="pc2">
      <div className="ptb">{project.icon}</div>
      <div className="pb">
        <div className="pm">
          <span className="pty">{project.type}</span>
          <div className="pls">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="pl">Live ↗</a>}
            <a href={project.github} target="_blank" rel="noreferrer" className="pl">GitHub ↗</a>
          </div>
        </div>
        <h3 className="pnm">{project.name}</h3>
        <p className="pds">{project.desc}</p>
        <div className="tags">
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </SC>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsOn, setStatsOn] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [toast, setToast] = useState(null);
  const [btt, setBtt] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const statsRef = useRef(null);
  const [secRef1, sec1] = useReveal();
  const [secRef2, sec2] = useReveal();
  const [secRef3, sec3] = useReveal();
  const [secRef4, sec4] = useReveal();
  const [secRef5, sec5] = useReveal();
  const [secRef6, sec6] = useReveal();

  const scrollProg = useScrollProgress();
  const activeNav  = useScrollSpy(NAV_IDS);
  const typeText   = useTypewriter(DATA.taglines);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const h = () => setBtt(window.scrollY > 420);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const projects = filter === "all" ? DATA.projects : DATA.projects.filter(p => p.category === filter);

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs.sendForm(EJS_SERVICE_ID, EJS_TEMPLATE_ID, formRef.current, EJS_PUBLIC_KEY)
      .then(() => {
        setToast("Message sent! I'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setToast("Something went wrong. Please email me directly.");
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="pf">
      <Styles />

      {/* Background */}
      <div className="aurora">
        <div className="ab ab1" />
        <div className="ab ab2" />
        <div className="ab ab3" />
      </div>
      <div className="dots" />

      {/* Fixed UI */}
      <div className="spb" style={{ width: `${scrollProg}%` }} />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {btt && <button className="btt" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>}

      {/* ── NAV ── */}
      <nav className="nav pc">
        <div className="nav-wrap">
          <div className="nav-pill">
            <div className="nlg" onClick={() => go("home")}>
              <div className="nlc">{DATA.initials}</div>
              <span className="nln">{DATA.name}</span>
            </div>
            <div className="nls">
              {NAV_LINKS.map(({ label, id }) => (
                <button key={id} onClick={() => go(id)} className={`nb${activeNav === id ? " on" : ""}`}>{label}</button>
              ))}
            </div>
            <button className="ncta" onClick={() => go("contact")}>Hire Me</button>
            <button className="hbg" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle navigation menu">
              <span /><span /><span />
            </button>
          </div>
          {menuOpen && (
            <div className="mnav">
              {NAV_LINKS.map(({ label, id }) => (
                <button key={id} onClick={() => go(id)} className={`mb${activeNav === id ? " on" : ""}`}>{label}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="pc">

        {/* ── HERO ── */}
        <section id="home" className="hero">
          <div className="cnt hero-in">
            <div className="hl">
              <div className="hbadge">
                <div className="pdot" />
                Available for new projects
              </div>
              <div className="h-role">{DATA.role}</div>
              <h1 className="h-name">{DATA.name}</h1>
              <div className="h-tw">
                <span className="tw">{typeText}</span>
                <span className="cur">|</span>
              </div>
              <p className="h-desc">{DATA.description}</p>
              <div ref={statsRef} className="h-stats">
                {DATA.stats.map(s => <StatCard key={s.label} {...s} animate={statsOn} />)}
              </div>
              <div className="h-acts">
                <button className="bp" onClick={() => go("projects")}>View My Work →</button>
                <button className="bo" onClick={() => go("contact")}>Get In Touch</button>
              </div>
            </div>

            <div className="term-wrap">
              <div className="term">
                <div className="term-h">
                  <div className="tdots">
                    <span style={{ background: "#ef4444" }} />
                    <span style={{ background: "#f59e0b" }} />
                    <span style={{ background: "#22c55e" }} />
                  </div>
                  <span className="tfn">developer.js</span>
                </div>
                <div className="term-b">
                  {DATA.codeLines.map((line, i) => (
                    <div key={i} className="tl">
                      <span className="ln">{i + 1}</span>
                      <span className={line.cls}>{line.text}</span>
                    </div>
                  ))}
                </div>
                <div className="term-f">
                  {["Django", "Python", "React"].map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="fbadge fb1">
                <div className="pdot" /> Open to work
              </div>
              <div className="fbadge fb2">
                ⚡ Agentic Dev
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="sec">
          <div className="cnt">
            <SectionHeader num="01 / Services" title="What I Build" sub="Transforming ideas into powerful digital solutions with intelligent architectures" revRef={secRef1} revOn={sec1} />
            <div className="srv-grid">
              {DATA.services.map((s) => <ServiceCard key={s.title} service={s} />)}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="sec">
          <div className="cnt">
            <SectionHeader num="02 / About" title="Who I Am" sub="Passionate developer with expertise in intelligent agentic web systems" revRef={secRef2} revOn={sec2} />
            <div className="ag">
              <div className="at">
                <div className="at-ey">// background</div>
                <h3 className="at-h">Building the Future,<br />One Line at a Time</h3>
                <p>I'm an Agentic Full-Stack Developer with hands-on experience building scalable, high-performance web applications that integrate AI-driven workflows and automation.</p>
                <p>My stack centers on <strong>Django & Python</strong> for backend systems, with intelligent REST APIs and automation-ready architectures. I specialize in designing agentic systems that support autonomous decision-making and human-agent workflows.</p>
                <p>Currently building enterprise-grade systems at <strong>Digital Edify Technologies</strong>, leading end-to-end delivery of intelligent web applications from architecture to deployment.</p>
                <div className="at-act">
                  <button className="bp" onClick={() => go("contact")}>Let's Work Together →</button>
                  <button className="bo" disabled title="Resume coming soon" style={{opacity:0.5,cursor:"not-allowed"}}>Download Resume</button>
                </div>
              </div>
              <div className="sp">
                {DATA.skills.map(s => <SkillGroup key={s.category} {...s} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="sec">
          <div className="cnt-s">
            <SectionHeader num="03 / Experience" title="Professional Journey" sub="My career path in software development" revRef={secRef3} revOn={sec3} />
            <div className="timeline">
              {DATA.experience.map((exp, i) => <ExperienceItem key={i} exp={exp} delay={(i % 3) + 1} />)}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="sec">
          <div className="cnt">
            <SectionHeader num="04 / Projects" title="Featured Work" sub="A showcase of my most impactful engineering projects" revRef={secRef4} revOn={sec4} />
            <div className="fbar">
              {[{ id: "all", label: "All Projects" }, { id: "agentic", label: "Agentic" }, { id: "enterprise", label: "Enterprise" }].map(f => (
                <button key={f.id} className={`fb${filter === f.id ? " on" : ""}`} onClick={() => setFilter(f.id)}>{f.label}</button>
              ))}
            </div>
            <div className="pg">
              {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="sec">
          <div className="cnt-s">
            <SectionHeader num="05 / Contact" title="Get In Touch" sub="Let's discuss your next project or opportunity" revRef={secRef5} revOn={sec5} />
            <div className="cg2">
              <div className="ci">
                <h3>Let's Connect</h3>
                <div className="citem">
                  <span className="clbl">Email</span>
                  <a href={`mailto:${DATA.email}`} className="cval">{DATA.email}</a>
                </div>
                <div className="citem">
                  <span className="clbl">Location</span>
                  <span className="cval">{DATA.location}</span>
                </div>
                <div className="citem">
                  <span className="clbl">Status</span>
                  <span className="cval cgrn">● Open to opportunities</span>
                </div>
                <div className="socrow">
                  {DATA.social.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="socb" aria-label={s.label}>{s.abbr}</a>
                  ))}
                </div>
              </div>
              <form className="cf" ref={formRef} onSubmit={onSubmit}>
                <div className="frow">
                  <input className="fi" name="from_name" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input className="fi" name="from_email" type="email" placeholder="Your Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <input className="fi" name="subject" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                <textarea className="fi fta" name="message" placeholder="Your Message" rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                <button type="submit" className="bp bfw" disabled={sending}>
                  {sending ? "Sending…" : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="ft">
          <div className="cnt ft-in">
            <div className="ft-brand">
              <div className="nlc" style={{ width: 28, height: 28, fontSize: 12 }}>{DATA.initials}</div>
              <span>© 2026 <span className="ft-hl">{DATA.name}</span>. Built with passion & Python.</span>
            </div>
            <div className="ft-ls">
              {NAV_IDS.map(id => <button key={id} onClick={() => go(id)} className="ft-lb">{id}</button>)}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
