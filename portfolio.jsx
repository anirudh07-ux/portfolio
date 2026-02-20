import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── EMAILJS CONFIG ───────────────────────────────────────────────────────────
// Replace these three values with your own from https://www.emailjs.com/
const EJS_SERVICE_ID = "service_x81wst2";
const EJS_TEMPLATE_ID = "template_cy1oqha";
const EJS_PUBLIC_KEY = "W9z814hJjUUwo--bo";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Anirudh",
  initials: "A",
  role: "Python Full Stack Developer | Agentic AI Developer",
  taglines: [
    "Python developer. Agentic AI builder.",
    "Django backends that actually think",
    "Full stack dev with an AI edge",
    "From REST APIs to AI agents — full stack"
  ],
  description:
    "I build full stack web apps with Python and Django, and I'm focused on pushing that further into agentic AI — systems that don't just serve data but actually respond, decide, and act. Based in India, currently working at Digital Edify Technologies.",
  stats: [
    { value: 6, label: "Months Experience", suffix: "+" },
    { value: 3, label: "Projects Delivered", suffix: "+" },
    { value: 1, label: "CRM System", suffix: "" },
  ],
  codeLines: [
    { text: "const developer = {", cls: "cw" },
    { text: '  name: "Anirudh",', cls: "cg" },
    { text: '  title: "Python Full Stack", ', cls: "cb" },
    { text: '  also: "Agentic AI Developer",', cls: "cp" },
    { text: '  stack: ["Python","Django","LLMs"],', cls: "cy" },
    { text: '  ship: () => "production-ready",', cls: "cg" },
    { text: "};", cls: "cw" },
  ],
  services: [
    { icon: "python", title: "Python Full Stack Development", desc: "I build complete web applications using Django for the backend and JavaScript for the frontend. I design clean REST APIs, structured databases, and functional admin panels focused on performance and scalability.", tags: ["Python", "Django", "REST APIs", "JavaScript", "HTML/CSS"] },
    { icon: "ai", title: "Agentic AI Development", desc: "Building backends that go beyond request-response — systems that use LLMs to make decisions, trigger workflows, and operate with minimal human input.", tags: ["AI Agents", "LLMs", "Automation", "Agentic Design"] },
    { icon: "backend", title: "Backend & API Engineering", desc: "I build structured Django REST APIs that are scalable, maintainable, and designed for real-world application use.", tags: ["Django", "Python", "REST APIs", "SQLite", "MySQL"] },
    { icon: "dashboard", title: "Dashboards & CRM Systems", desc: "Developed full stack dashboards and CRM systems with real-time data handling, admin panels, and scalable backend architecture.", tags: ["Full Stack", "CRM Systems", "Dashboards", "Admin Panels", "Real-time"] },
  ],
  skills: [
    { category: "Python & Backend", items: ["Python", "Django", "REST APIs", "Django Admin", "Django ORM"] },
    { category: "Frontend", items: ["JavaScript", "React", "HTML5", "CSS3", "Responsive Design"] },
    { category: "Databases", items: ["SQLite", "MySQL"] },
    { category: "AI & Agentic Engineering", items: ["AI Agents", "LLMs", "Agentic Design", "Automation", "Intelligent Workflows"] },
    { category: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Postman"] },
  ],
  experience: [
    { period: "Jan 2026 – Present", role: "Python Full Stack Developer & Agentic AI Developer", company: "Digital Edify Technologies", current: true, points: ["Develop and maintain full stack applications using Python, Django, and REST APIs", "Design backend systems to support AI integrations and automated workflows", "Build and integrate agent-based components for intelligent system functionality", "Deliver production-ready applications from architecture to deployment"] },
    { period: "May 2025 – Dec 2025", role: "Python Full Stack Developer", company: "Digital Edify Technologies", current: false, points: ["Built full stack web applications using Python, Django, and relational databases", "Developed and integrated REST APIs for scalable frontend-backend communication", "Designed database schemas and implemented core backend features", "Collaborated with team members to deliver stable, production-ready systems"] },
    { period: "Nov 2024 – Apr 2025", role: "Python Full Stack Developer Intern", company: "Digital Edify Technologies", current: false, points: ["Developed backend modules and REST APIs using Python and Django", "Supported development of internal and client-facing web applications", "Worked on database integration, admin panels, and system features", "Gained hands-on experience with scalable backend and full stack development"] },
  ],
  projects: [
    { type: "AI & Agentic Full Stack", category: "agentic", name: "Smart Car Agentic Dashboard", desc: "A Django-powered agentic dashboard where the backend monitors vehicle data and surfaces decisions without the user having to ask. REST APIs feed a live JavaScript frontend in real time.", tags: ["Python", "Django", "REST APIs", "SQLite", "JavaScript", "AI Agents"], image: "/smart-car-dashboard.png", github: null, live: null },
    { type: "Agentic Web Application", category: "agentic", name: "Django Agentic Web Application", desc: "A full stack Python/Django app built from the ground up to support AI agent integration. The backend is structured so agents can plug in, trigger workflows, and operate without manual intervention.", tags: ["Python", "Django", "SQLite", "Agentic Design", "Automation"], image: "/django-agentic-app.png", github: null, live: null },
    { type: "Enterprise CRM", category: "enterprise", name: "CRM System — Nagarjuna Steels", desc: "Built the complete CRM for Nagarjuna Steels — customer records, lead tracking, business workflows. Django backend, MySQL, REST APIs, and an admin panel the team could actually use.", tags: ["Python", "Django", "REST APIs", "MySQL", "JavaScript"], image: "/crm-nagarjuna.png", github: null, live: null },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/anirudh07-ux", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anirudh-v-84711b315/", icon: "linkedin" },
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
      .nlc { width:46px;height:46px;border-radius:50%;
        background:linear-gradient(135deg,var(--v),var(--c));
        display:flex;align-items:center;justify-content:center;
        font-weight:800;font-size:13px;color:#fff;flex-shrink:0;
        box-shadow:0 0 16px rgba(124,58,237,.6);
        padding:2px;overflow:hidden; }
      .nlc img { width:100%;height:100%;object-fit:cover;object-position:center;border-radius:50%;display:block; }
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
      .tag-d { background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08);color:var(--tm);
        display:inline-flex;align-items:center;gap:6px;padding:6px 12px; }
      .tag-d:hover { background:rgba(255,255,255,.08);border-color:rgba(124,58,237,.28);color:var(--text); }
      .skill-logo { width:15px;height:15px;object-fit:contain;flex-shrink:0; }
      .skill-logo-inv { filter:brightness(0) invert(1);opacity:.75; }
      .skill-svg { width:15px;height:15px;flex-shrink:0;color:var(--vl); }

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
      .svc-ico { width:56px;height:56px;border-radius:16px;margin-bottom:20px;
        background:linear-gradient(135deg,rgba(124,58,237,.18),rgba(6,182,212,.10));
        border:1px solid rgba(124,58,237,.25);
        display:flex;align-items:center;justify-content:center;
        position:relative;transition:var(--ease); }
      .svc-ico svg { width:26px;height:26px;transition:transform .3s ease; }
      .svc-ico::after { content:'';position:absolute;inset:0;border-radius:16px;
        background:linear-gradient(135deg,rgba(124,58,237,.0),rgba(6,182,212,.0));
        transition:all .3s ease; }
      .sc:hover .svc-ico { border-color:rgba(124,58,237,.5);
        box-shadow:0 0 22px rgba(124,58,237,.25); }
      .sc:hover .svc-ico svg { transform:scale(1.12); }
      .svc-t { font-size:17px;font-weight:700;margin-bottom:10px;color:var(--text); }
      .svc-d { color:var(--tm);font-size:14px;line-height:1.75;margin-bottom:18px; }

      /* ── About ── */
      .ag { display:flex;gap:64px;flex-wrap:wrap; }
      .at { flex:1 1 360px; }
      .at-ey { font-size:11px;font-weight:700;color:var(--vl);letter-spacing:.12em;
        text-transform:uppercase;margin-bottom:10px;font-family:'Courier New',monospace; }
      .at-h { font-size:clamp(22px,3vw,30px);font-weight:800;margin-bottom:24px;line-height:1.3;
        background:linear-gradient(135deg,var(--text),var(--tm));
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
      .at-blocks { display:flex;flex-direction:column;gap:14px;margin-bottom:28px; }
      .at-block { border-radius:14px;padding:18px 20px;border:1px solid;transition:var(--ease); }
      .at-block-v { background:rgba(124,58,237,.06);border-color:rgba(124,58,237,.18); }
      .at-block-c { background:rgba(6,182,212,.05);border-color:rgba(6,182,212,.15); }
      .at-block:hover { transform:translateX(4px); }
      .at-block-v:hover { background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.38); }
      .at-block-c:hover { background:rgba(6,182,212,.09);border-color:rgba(6,182,212,.32); }
      .at-block-title { display:flex;align-items:center;gap:10px;margin-bottom:10px; }
      .at-block-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }
      .at-block-dot-v { background:var(--vl);box-shadow:0 0 8px rgba(167,139,250,.6); }
      .at-block-dot-c { background:var(--c2);box-shadow:0 0 8px rgba(34,211,238,.6); }
      .at-block-label { font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
        font-family:'Courier New',monospace; }
      .at-block-label-v { color:var(--vl); }
      .at-block-label-c { color:var(--c2); }
      .at-block p { color:var(--tm);line-height:1.85;font-size:14px;margin:0; }
      .at-block strong { color:var(--text); }
      .at-act { display:flex;gap:12px;flex-wrap:wrap; }

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
      .ptb { height:200px;
        border-bottom:1px solid var(--bdr);position:relative;overflow:hidden;
        background:linear-gradient(135deg,rgba(124,58,237,.13) 0%,rgba(6,182,212,.06) 100%); }
      .ptb img { width:100%;height:100%;object-fit:cover;object-position:top;
        display:block;transition:transform .5s ease; }
      .sc:hover .ptb img { transform:scale(1.05); }
      .ptb::after { content:'';position:absolute;inset:0;
        background:linear-gradient(to bottom,transparent 50%,rgba(11,18,33,.7));
        pointer-events:none; }
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
      .socrow { display:flex;gap:12px;margin-top:32px; }
      .socb { width:52px;height:52px;border-radius:14px;
        background:rgba(124,58,237,.07);border:1px solid rgba(124,58,237,.2);
        color:var(--vl);display:flex;align-items:center;justify-content:center;
        transition:var(--ease);position:relative;overflow:hidden; }
      .socb svg { width:22px;height:22px;fill:currentColor;transition:transform .2s; }
      .socb:hover { transform:translateY(-4px);box-shadow:0 10px 28px rgba(124,58,237,.3); }
      .socb.soc-gh:hover { background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);color:#fff; }
      .socb.soc-li:hover { background:rgba(10,102,194,.25);border-color:rgba(10,102,194,.6);color:#60a5fa; }
      .socb:hover svg { transform:scale(1.15); }
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

      /* ── Cal.com button ── */
      .cal-btn { display:flex;align-items:center;gap:10px;width:100%;margin-top:20px;
        background:linear-gradient(135deg,rgba(124,58,237,.12),rgba(6,182,212,.07));
        border:1px solid rgba(124,58,237,.3);border-radius:12px;
        padding:14px 18px;cursor:pointer;transition:var(--ease);
        color:var(--text);font-size:14px;font-weight:600;font-family:inherit;
        backdrop-filter:blur(8px); }
      .cal-btn:hover { background:linear-gradient(135deg,rgba(124,58,237,.22),rgba(6,182,212,.12));
        border-color:rgba(124,58,237,.6);transform:translateY(-2px);
        box-shadow:0 8px 28px rgba(124,58,237,.25); }
      .cal-btn-icon { width:36px;height:36px;border-radius:9px;flex-shrink:0;
        background:linear-gradient(135deg,var(--v),var(--c));
        display:flex;align-items:center;justify-content:center;font-size:17px; }
      .cal-btn-text { display:flex;flex-direction:column;align-items:flex-start;gap:2px; }
      .cal-btn-label { font-size:14px;font-weight:700;color:var(--text); }
      .cal-btn-sub { font-size:11px;color:var(--tm);font-weight:400; }
      .cal-btn-arrow { margin-left:auto;color:var(--vl);font-size:16px; }

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
      <div className="svc-ico">{ServiceIconMap[service.icon]}</div>
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
        {items.map(s => {
          const logo = SKILL_LOGOS[s];
          return (
            <span key={s} className="tag tag-d">
              {logo?.src && <img src={logo.src} alt={s} className={`skill-logo${logo.invert ? " skill-logo-inv" : ""}`} />}
              {logo?.svg && <span className="skill-svg">{logo.svg}</span>}
              {s}
            </span>
          );
        })}
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
      <div className="ptb">
        <img src={project.image} alt={project.name} />
      </div>
      <div className="pb">
        <div className="pm">
          <span className="pty">{project.type}</span>
          <div className="pls">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="pl">Live ↗</a>}
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="pl">GitHub ↗</a>}
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

// ─── SKILL LOGOS ──────────────────────────────────────────────────────────────
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SKILL_LOGOS = {
  "Python": { src: `${DI}/python/python-original.svg` },
  "Django": { src: `${DI}/django/django-plain.svg`, invert: true },
  "JavaScript": { src: `${DI}/javascript/javascript-original.svg` },
  "React": { src: `${DI}/react/react-original.svg` },
  "HTML5": { src: `${DI}/html5/html5-original.svg` },
  "CSS3": { src: `${DI}/css3/css3-original.svg` },
  "SQLite": { src: `${DI}/sqlite/sqlite-original.svg` },
  "MySQL": { src: `${DI}/mysql/mysql-original.svg` },
  "Git": { src: `${DI}/git/git-original.svg` },
  "GitHub": { src: `${DI}/github/github-original.svg`, invert: true },
  "VS Code": { src: `${DI}/vscode/vscode-original.svg` },
  "Postman": { src: `${DI}/postman/postman-original.svg` },
  "REST APIs": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="6" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M7.5 12h5M16.5 6l-7 4.5M16.5 18l-7-4.5" /></svg> },
  "Django Admin": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="3" width="18" height="4" rx="1" /><rect x="3" y="10" width="8" height="11" rx="1" /><rect x="13" y="10" width="8" height="5" rx="1" /><rect x="13" y="17" width="8" height="4" rx="1" /></svg> },
  "Django ORM": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" /></svg> },
  "Responsive Design": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="5" width="14" height="10" rx="1.5" /><rect x="16" y="8" width="6" height="7" rx="1" /><path d="M6 19h6M9 15v4" /></svg> },
  "AI Agents": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><circle cx="4" cy="7" r="2" /><circle cx="20" cy="7" r="2" /><circle cx="4" cy="17" r="2" /><circle cx="20" cy="17" r="2" /><path d="M6 7h3.5M14.5 7H18M6 17h3.5M14.5 17H18M12 9V6.5M12 17.5V15" /></svg> },
  "LLMs": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="8" width="18" height="10" rx="2" /><circle cx="8" cy="13" r="1.2" fill="currentColor" stroke="none" /><circle cx="12" cy="13" r="1.2" fill="currentColor" stroke="none" /><circle cx="16" cy="13" r="1.2" fill="currentColor" stroke="none" /><path d="M8 8V5.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V8" /></svg> },
  "Agentic Design": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="3" r="1.5" /><circle cx="21" cy="12" r="1.5" /><circle cx="12" cy="21" r="1.5" /><circle cx="3" cy="12" r="1.5" /><path d="M12 6v3M18 12h-3M12 18v-3M6 12h3" /></svg> },
  "Automation": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 2a10 10 0 0 1 7.39 16.74" /><path d="M12 22a10 10 0 0 1-7.39-16.74" /><path d="M12 8v4l3 3" /></svg> },
  "Intelligent Workflows": { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="4" width="5" height="4" rx="1" /><rect x="9.5" y="4" width="5" height="4" rx="1" /><rect x="17" y="4" width="5" height="4" rx="1" /><rect x="5.5" y="14" width="5" height="4" rx="1" /><rect x="13.5" y="14" width="5" height="4" rx="1" /><path d="M4.5 8v2.5h15V8M12 11.5V14M8 11.5v1a1 1 0 0 0 1 1h1M16 11.5v1a1 1 0 0 1-1 1h-1" /></svg> },
};

// ─── SERVICE ICONS ────────────────────────────────────────────────────────────
const ServiceIconMap = {
  python: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gi1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v3H3V5z" stroke="url(#gi1)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 8h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="url(#gi1)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 13h4M7 17h6" stroke="url(#gi1)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="11.5" r="1" fill="url(#gi1)" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gi2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="3" stroke="url(#gi2)" strokeWidth="1.5" />
      <circle cx="4" cy="6" r="1.5" stroke="url(#gi2)" strokeWidth="1.5" />
      <circle cx="20" cy="6" r="1.5" stroke="url(#gi2)" strokeWidth="1.5" />
      <circle cx="4" cy="18" r="1.5" stroke="url(#gi2)" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="1.5" stroke="url(#gi2)" strokeWidth="1.5" />
      <path d="M5.5 6.5L9.5 10M14.5 10l4-3.5M5.5 17.5L9.5 14M14.5 14l4 3.5" stroke="url(#gi2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gi3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="3" width="20" height="5" rx="2" stroke="url(#gi3)" strokeWidth="1.5" />
      <rect x="2" y="10" width="20" height="5" rx="2" stroke="url(#gi3)" strokeWidth="1.5" />
      <rect x="2" y="17" width="20" height="4" rx="2" stroke="url(#gi3)" strokeWidth="1.5" />
      <circle cx="18" cy="5.5" r="1" fill="url(#gi3)" />
      <circle cx="18" cy="12.5" r="1" fill="url(#gi3)" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gi4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="3" width="9" height="10" rx="2" stroke="url(#gi4)" strokeWidth="1.5" />
      <rect x="13" y="3" width="9" height="5" rx="2" stroke="url(#gi4)" strokeWidth="1.5" />
      <rect x="13" y="11" width="9" height="10" rx="2" stroke="url(#gi4)" strokeWidth="1.5" />
      <rect x="2" y="16" width="9" height="5" rx="2" stroke="url(#gi4)" strokeWidth="1.5" />
      <path d="M5 19l2-2 2 2" stroke="url(#gi4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ─── SOCIAL ICONS ─────────────────────────────────────────────────────────────
const SocialIcons = {
  github: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

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
  const activeNav = useScrollSpy(NAV_IDS);
  const typeText = useTypewriter(DATA.taglines);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (window.Cal) return;
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.onload = () => {
      window.Cal("init", { origin: "https://cal.com" });
      window.Cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#7c3aed" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };
    document.head.appendChild(script);
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
              <div className="nlc">
                <img src="/photo.jpg.png" alt={DATA.name} />
              </div>
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
                  {["Python", "Django", "Agentic AI"].map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="fbadge fb1">
                <div className="pdot" /> Open to work
              </div>
              <div className="fbadge fb2">
                ⚡ AI & Agentic Engineer
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="sec">
          <div className="cnt">
            <SectionHeader num="01 / Services" title="What I Build" sub="Full stack Python development and agentic AI — from the database to the decision layer" revRef={secRef1} revOn={sec1} />
            <div className="srv-grid">
              {DATA.services.map((s) => <ServiceCard key={s.title} service={s} />)}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="sec">
          <div className="cnt">
            <SectionHeader num="02 / About" title="Who I Am" sub="Python developer by trade, agentic AI builder by focus" revRef={secRef2} revOn={sec2} />
            <div className="ag">
              <div className="at">
                <div className="at-ey">// background</div>
                <h3 className="at-h">Python Full Stack Developer<br />& Agentic AI Developer</h3>
                <div className="at-blocks">
                  <div className="at-block at-block-v">
                    <div className="at-block-title">
                      <span className="at-block-dot at-block-dot-v" />
                      <span className="at-block-label at-block-label-v">Python Full Stack</span>
                    </div>
                    <p>I joined <strong>Digital Edify Technologies</strong> as an intern in late 2024 and picked up the full stack pretty fast. Most of my work has been <strong>Python and Django</strong>  writing APIs, setting up data models, building admin panels, hooking up frontends. The <strong>Nagarjuna Steels CRM</strong> was my biggest project so far  real users, real data, had to actually hold up.</p>
                  </div>
                  <div className="at-block at-block-c">
                    <div className="at-block-title">
                      <span className="at-block-dot at-block-dot-c" />
                      <span className="at-block-label at-block-label-c">Agentic AI Developer</span>
                    </div>
                    <p>The part I find most interesting is making the backend actually think. Not just serve data  but trigger things, respond to conditions, work alongside <strong>LLMs</strong> to make decisions. I've been building toward that with projects like the <strong>Smart Car Agentic Dashboard</strong>, where the system does the monitoring so the user doesn't have to.</p>
                  </div>
                </div>
                <div className="at-act">
                  <button className="bp" onClick={() => go("contact")}>Let's Work Together →</button>
                  <button className="bo" disabled title="Resume coming soon" style={{ opacity: 0.5, cursor: "not-allowed" }}>Download Resume</button>
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
            <SectionHeader num="03 / Experience" title="Professional Journey" sub="15 months at one company — intern to Python full stack to agentic AI" revRef={secRef3} revOn={sec3} />
            <div className="timeline">
              {DATA.experience.map((exp, i) => <ExperienceItem key={i} exp={exp} delay={(i % 3) + 1} />)}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="sec">
          <div className="cnt">
            <SectionHeader num="04 / Projects" title="Featured Work" sub="Things I've built — Python, Django, and agentic AI in practice" revRef={secRef4} revOn={sec4} />
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
            <SectionHeader num="05 / Contact" title="Get In Touch" sub="Open to work — projects, roles, or just a conversation about agentic AI" revRef={secRef5} revOn={sec5} />
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
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={`socb soc-${s.icon}`} aria-label={s.label}>
                      {SocialIcons[s.icon]}
                    </a>
                  ))}
                </div>
                <button
                  className="cal-btn"
                  data-cal-link="vellanki.anirudh"
                  data-cal-origin="https://cal.com"
                  aria-label="Schedule a call via Cal.com"
                >
                  <div className="cal-btn-icon">📅</div>
                  <div className="cal-btn-text">
                    <span className="cal-btn-label">Schedule a Call</span>
                    <span className="cal-btn-sub">Book a free 30-min slot</span>
                  </div>
                  <span className="cal-btn-arrow">↗</span>
                </button>
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
              <span>© 2026 <span className="ft-hl">{DATA.name}</span></span>
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
