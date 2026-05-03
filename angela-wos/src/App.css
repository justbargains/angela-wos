/* ── VARIABLES ─────────────────────────────────────────────────────────── */
:root {
  --cream: #FAF7F2;
  --warm: #F2EBE0;
  --parchment: #E8DDD0;
  --sand: #C8B89A;
  --walnut: #7D6651;
  --espresso: #3D2B1F;
  --ink: #1C1410;
  --gold: #C4923A;
  --gold-light: #F0D9B5;
  --gold-pale: #FBF4E8;
  --blush: #D4A5A5;
  --blush-pale: #F9F0F0;
  --sage: #8BA888;
  --sage-pale: #EEF3EE;
  --sky: #7BA7BC;
  --sky-pale: #EDF3F7;
  --plum: #8B7098;
  --plum-pale: #F2EEF5;
  --rose: #C47A7A;
  --border: #E2D9CE;
  --shadow: 0 1px 3px rgba(61,43,31,0.06), 0 4px 16px rgba(61,43,31,0.04);
  --shadow-md: 0 2px 8px rgba(61,43,31,0.08), 0 8px 32px rgba(61,43,31,0.06);
}

/* ── RESET ─────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 14px; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--cream);
  color: var(--ink);
  min-height: 100vh;
  line-height: 1.5;
}
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--parchment); border-radius: 3px; }

/* ── LAYOUT ────────────────────────────────────────────────────────────── */
.shell { display: flex; min-height: 100vh; }
.sidebar {
  width: 232px; min-width: 232px;
  background: var(--espresso);
  display: flex; flex-direction: column;
  position: fixed; top: 0; left: 0; bottom: 0;
  z-index: 100; overflow-y: auto;
}
.main-content { margin-left: 232px; flex: 1; min-height: 100vh; background: var(--cream); }

/* ── SIDEBAR ───────────────────────────────────────────────────────────── */
.sidebar-top { padding: 28px 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.sidebar-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 500; color: var(--gold-light); letter-spacing: 0.01em; }
.sidebar-sub { font-size: 11px; color: rgba(200,184,154,0.6); letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px; }
.sidebar-nav { flex: 1; padding: 16px 0; }
.nav-group-label { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(200,184,154,0.4); padding: 10px 24px 4px; font-weight: 500; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 24px; cursor: pointer; font-size: 13px; color: rgba(200,184,154,0.65); transition: all 0.2s; border-left: 2px solid transparent; }
.nav-item:hover { color: var(--gold-light); background: rgba(255,255,255,0.04); }
.nav-item.active { color: var(--gold-light); border-left-color: var(--gold); background: rgba(196,146,58,0.1); }
.nav-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; transition: background 0.2s; }
.sidebar-bottom { padding: 16px 24px 20px; border-top: 1px solid rgba(255,255,255,0.08); }
.north-star { font-family: 'Playfair Display', serif; font-size: 11px; font-style: italic; color: rgba(200,184,154,0.45); line-height: 1.6; margin-top: 8px; }

/* ── TIER CHIPS ────────────────────────────────────────────────────────── */
.tier-chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
.tc-1 { background: rgba(139,168,136,0.2); color: #8BA888; }
.tc-2 { background: rgba(196,146,58,0.2); color: #C4923A; }
.tc-3 { background: rgba(196,122,122,0.2); color: #C47A7A; }

/* ── PAGE ──────────────────────────────────────────────────────────────── */
.page-head { padding: 32px 40px 24px; border-bottom: 1px solid var(--border); }
.page-title { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 400; color: var(--espresso); }
.page-sub { font-size: 13px; color: var(--walnut); margin-top: 4px; }
.page-body { padding: 28px 40px; }

/* ── CARDS ─────────────────────────────────────────────────────────────── */
.card { background: white; border: 1px solid var(--border); border-radius: 14px; padding: 22px 24px; box-shadow: var(--shadow); }
.card-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sand); font-weight: 500; margin-bottom: 14px; }
.card-warm { background: var(--gold-pale); border-color: var(--gold-light); }
.card-blush { background: var(--blush-pale); border-color: #EDD5D5; }
.card-sage { background: var(--sage-pale); border-color: #D0DDCF; }
.card-sky { background: var(--sky-pale); border-color: #CCDDE6; }

/* ── GRID ──────────────────────────────────────────────────────────────── */
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.mb16 { margin-bottom: 16px; }
.mb20 { margin-bottom: 20px; }

/* ── FORM ──────────────────────────────────────────────────────────────── */
.f-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
.f-label { font-size: 12px; color: var(--walnut); font-weight: 500; display: flex; align-items: center; gap: 6px; }
.f-input, .f-select, .f-textarea { background: var(--cream); border: 1px solid var(--border); border-radius: 8px; padding: 9px 12px; font-size: 13px; color: var(--ink); font-family: 'DM Sans', sans-serif; transition: border-color 0.15s; width: 100%; }
.f-input:focus, .f-select:focus, .f-textarea:focus { outline: none; border-color: var(--gold); background: white; }
.f-textarea { resize: vertical; min-height: 72px; }
.f-select { appearance: none; }
.f-select option { background: white; }
.settings-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* ── BUTTONS ───────────────────────────────────────────────────────────── */
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; font-family: 'DM Sans', sans-serif; }
.btn-primary { background: var(--espresso); color: var(--gold-light); }
.btn-primary:hover { background: var(--ink); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-ghost { background: transparent; color: var(--walnut); border: 1px solid var(--border); }
.btn-ghost:hover { border-color: var(--sand); color: var(--espresso); }
.btn-sm { padding: 7px 14px; font-size: 12px; }
.btn-gold { background: var(--gold); color: white; font-size: 14px; }
.btn-gold:hover { background: #b5832e; }
.btn-full { width: 100%; justify-content: center; padding: 13px; }

/* ── CHECK ITEMS ───────────────────────────────────────────────────────── */
.ck { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; cursor: pointer; border-bottom: 1px solid rgba(0,0,0,0.04); transition: opacity 0.2s; }
.ck:last-child { border-bottom: none; }
.ck.done { opacity: 0.4; }
.ck-box { width: 17px; height: 17px; min-width: 17px; border: 1.5px solid var(--parchment); border-radius: 4px; margin-top: 1px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; background: white; }
.ck-box.on { background: var(--espresso); border-color: var(--espresso); }
.ck-check { color: white; font-size: 9px; font-weight: 700; }
.ck-text { font-size: 13px; color: var(--ink); line-height: 1.4; }
.ck-text.done { text-decoration: line-through; color: var(--sand); }

/* ── DASHBOARD ─────────────────────────────────────────────────────────── */
.scripture { background: var(--plum-pale); border: 1px solid #DDD7E3; border-radius: 12px; padding: 18px 22px; margin-bottom: 20px; }
.scripture-text { font-family: 'Playfair Display', serif; font-size: 16px; font-style: italic; color: var(--espresso); line-height: 1.6; }
.scripture-ref { font-size: 11px; color: var(--walnut); margin-top: 6px; }
.intent-bar { background: var(--gold-pale); border: 1px solid var(--gold-light); border-radius: 12px; padding: 14px 20px; display: flex; align-items: center; gap: 14px; margin-bottom: 20px; flex-wrap: wrap; }
.intent-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gold); font-weight: 500; min-width: 70px; }
.intent-text { font-family: 'Playfair Display', serif; font-size: 15px; color: var(--espresso); flex: 1; font-style: italic; }
.metric { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; box-shadow: var(--shadow); }
.metric-val { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--espresso); }
.metric-val-sm { font-size: 15px; padding-top: 5px; }
.metric-label { font-size: 11px; color: var(--walnut); margin-top: 3px; }
.metric-bar { height: 3px; background: var(--parchment); border-radius: 2px; overflow: hidden; margin-top: 10px; }
.metric-fill { height: 100%; background: var(--gold); border-radius: 2px; transition: width 0.4s; }
.romance-card { background: var(--blush-pale); border: 1px solid #EDD5D5; border-radius: 12px; padding: 16px; }
.romance-card-empty { opacity: 0.5; }
.romance-day { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--blush); font-weight: 500; margin-bottom: 4px; }
.romance-title { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--espresso); margin-bottom: 4px; }
.romance-sub { font-size: 12px; color: var(--walnut); line-height: 1.4; }
.romance-grid { gap: 10px; margin-top: 4px; }
.setup-prompt { text-align: center; padding: 24px; margin-top: 16px; }
.setup-prompt-title { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--espresso); margin-bottom: 8px; }
.setup-prompt-sub { font-size: 13px; color: var(--walnut); }

/* ── SCHEDULE ──────────────────────────────────────────────────────────── */
.day-tabs { display: flex; gap: 5px; margin-bottom: 22px; flex-wrap: wrap; }
.day-tab { padding: 7px 16px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1px solid var(--border); background: white; color: var(--walnut); transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
.day-tab:hover { border-color: var(--sand); color: var(--espresso); }
.day-tab.active { background: var(--espresso); color: var(--gold-light); border-color: var(--espresso); }
.day-label-full { font-family: 'Playfair Display', serif; font-size: 16px; font-style: italic; color: var(--walnut); margin-bottom: 16px; }
.sched-list { display: flex; flex-direction: column; gap: 5px; }
.sched-row { display: grid; grid-template-columns: 56px 1fr; gap: 12px; align-items: start; }
.sched-time { font-size: 11px; color: var(--sand); text-align: right; padding-top: 10px; font-variant-numeric: tabular-nums; }
.sched-block { border-radius: 10px; padding: 10px 14px; border-left: 3px solid transparent; }
.sched-role { font-size: 9px; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 600; opacity: 0.75; margin-bottom: 3px; }
.sched-task { font-size: 13px; font-weight: 500; }
.sched-sub { font-size: 11px; opacity: 0.65; margin-top: 2px; line-height: 1.4; }
.sched-gem { font-size: 11px; margin-top: 5px; opacity: 0.8; font-style: italic; }

/* role colors */
.r-morning  { background: #FBF4E8; border-left-color: #C4923A; color: #7D5020; }
.r-selfcare { background: #F2EEF5; border-left-color: #8B7098; color: #5C3D6E; }
.r-driver   { background: #FEF8EC; border-left-color: #C4923A; color: #7D5020; }
.r-work     { background: #EDF3F7; border-left-color: #7BA7BC; color: #2E5F75; }
.r-health   { background: #EEF3EE; border-left-color: #8BA888; color: #3D6B3A; }
.r-mom      { background: #FDF5F0; border-left-color: #C47A7A; color: #8B3A3A; }
.r-partner  { background: #F9F0F0; border-left-color: #D4A5A5; color: #8B3A3A; }
.r-business { background: #FBF4E8; border-left-color: #C4923A; color: #7D5020; }
.r-social   { background: #EEF3EE; border-left-color: #8BA888; color: #3D6B3A; }
.r-house    { background: #F5F3F0; border-left-color: #A89880; color: #5C4A35; }
.r-finance  { background: #FDF5F0; border-left-color: #C47A7A; color: #8B3A3A; }
.r-white    { background: var(--cream); border-left-color: var(--parchment); color: var(--walnut); }
.r-ritual   { background: #FBF4E8; border-left-color: #C4923A; color: #7D5020; }

/* ── GOALS ─────────────────────────────────────────────────────────────── */
.big3-item { display: flex; align-items: flex-start; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.big3-item:last-child { border-bottom: none; }
.big3-num { font-family: 'Playfair Display', serif; font-size: 34px; color: var(--gold); opacity: 0.4; line-height: 1; min-width: 28px; }
.big3-text { font-size: 14px; color: var(--espresso); padding-top: 7px; line-height: 1.4; font-weight: 500; }
.rtbl { width: 100%; border-collapse: collapse; font-size: 13px; }
.rtbl th { text-align: left; font-size: 10px; letter-spacing: 0.07em; text-transform: uppercase; color: var(--sand); padding: 8px 10px; border-bottom: 1px solid var(--border); font-weight: 500; }
.rtbl td { padding: 10px 10px; border-bottom: 1px solid rgba(0,0,0,0.04); vertical-align: top; }
.rtbl tr:last-child td { border-bottom: none; }
.r-badge { display: inline-flex; align-items: center; gap: 6px; font-weight: 500; color: var(--espresso); }
.r-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.r-dot-inline { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
.td-empty { color: var(--sand); }
.td-min { font-size: 12px; color: var(--walnut); }
.empty-state { color: var(--walnut); font-size: 13px; }

/* ── MEALS ─────────────────────────────────────────────────────────────── */
.rotation-note { font-size: 12px; color: var(--walnut); font-style: italic; margin: 0 0 14px; }
.meal-row { display: flex; align-items: center; gap: 14px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.meal-row:last-child { border-bottom: none; }
.meal-day-name { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--sand); font-weight: 500; min-width: 80px; }
.meal-name { font-size: 13px; font-weight: 500; color: var(--espresso); }
.meal-sub { font-size: 11px; color: var(--walnut); }
.prep-headline { font-size: 13px; color: var(--espresso); font-weight: 500; margin-bottom: 12px; }
.prep-step { display: flex; gap: 10px; padding: 7px 0; border-bottom: 1px solid rgba(0,0,0,0.05); font-size: 13px; }
.prep-step:last-of-type { border-bottom: none; }
.prep-num { color: var(--sage); font-weight: 600; min-width: 18px; }
.prep-footer { margin-top: 12px; padding: 10px 12px; background: rgba(139,168,136,0.12); border-radius: 8px; font-size: 12px; color: var(--walnut); font-style: italic; }

/* ── WHITE SPACE ───────────────────────────────────────────────────────── */
.ws-quote { font-family: 'Playfair Display', serif; font-style: italic; font-size: 15px; color: var(--walnut); margin-bottom: 20px; padding: 16px 20px; background: var(--cream); border: 1px solid var(--border); border-radius: 12px; border-left: 3px solid var(--gold); }
.ws-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; margin: 14px 0; }
.ws-col { display: flex; flex-direction: column; gap: 2px; }
.ws-col-name { font-size: 10px; color: var(--sand); text-align: center; margin-bottom: 4px; font-weight: 500; }
.ws-slot { height: 14px; border-radius: 2px; }
.ws-busy { background: rgba(123,167,188,0.3); }
.ws-free { background: rgba(139,168,136,0.45); }
.ws-protected { background: rgba(139,112,152,0.35); }
.ws-romance { background: rgba(212,165,165,0.5); }
.ws-legend { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
.ws-li { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--walnut); }
.ws-ld { width: 10px; height: 10px; border-radius: 2px; }

/* ── FINANCE ───────────────────────────────────────────────────────────── */
.fin-trigger { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 10px; font-size: 13px; margin-bottom: 16px; }
.fin-active { background: var(--sage-pale); border: 1px solid #D0DDCF; color: var(--sage); }
.fin-inactive { background: var(--cream); border: 1px solid var(--border); color: var(--walnut); }
.f-textarea { width: 100%; min-height: 100px; }

/* ── RITUALS ───────────────────────────────────────────────────────────── */
.ritual-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 20px; }
.ritual-card { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.15s; box-shadow: var(--shadow); }
.ritual-card:hover { border-color: var(--gold); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.ritual-card.active { border-color: var(--gold); background: var(--gold-pale); }
.ritual-card-icon { font-size: 20px; margin-bottom: 6px; }
.ritual-card-name { font-size: 13px; font-weight: 500; color: var(--espresso); margin-bottom: 3px; }
.ritual-card-desc { font-size: 11px; color: var(--walnut); line-height: 1.4; }
.ritual-panel { background: white; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: var(--shadow); }
.ritual-head { padding: 16px 20px; background: var(--gold-pale); border-bottom: 1px solid var(--gold-light); display: flex; align-items: center; justify-content: space-between; }
.ritual-head-actions { display: flex; gap: 8px; align-items: center; }
.ritual-title { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--espresso); }
.ritual-sub { font-size: 12px; color: var(--walnut); margin-top: 2px; }
.ritual-empty { padding: 20px; color: var(--walnut); font-size: 13px; }
.ritual-msgs { padding: 16px 20px; max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; min-height: 100px; }
.msg { border-radius: 10px; padding: 12px 14px; max-width: 88%; font-size: 13px; line-height: 1.6; white-space: pre-wrap; }
.msg-user { background: var(--espresso); color: var(--gold-light); align-self: flex-end; }
.msg-ai { background: var(--cream); color: var(--ink); align-self: flex-start; border: 1px solid var(--border); }
.msg-thinking { font-style: italic; color: var(--sand); }
.thinking-row { display: flex; align-items: center; gap: 8px; }
.ritual-input-row { padding: 12px 20px; border-top: 1px solid var(--border); display: flex; gap: 8px; background: var(--cream); }
.ritual-input { flex: 1; background: white; border: 1px solid var(--border); border-radius: 8px; padding: 9px 12px; font-size: 13px; color: var(--ink); font-family: 'DM Sans', sans-serif; }
.ritual-input:focus { outline: none; border-color: var(--gold); }
.api-warn-title { font-size: 13px; font-weight: 500; color: var(--espresso); margin-bottom: 4px; }
.api-warn-sub { font-size: 12px; color: var(--walnut); }

/* ── SETTINGS ──────────────────────────────────────────────────────────── */
.api-note { font-size: 12px; color: var(--walnut); margin-bottom: 10px; line-height: 1.5; }
.api-row { display: flex; gap: 8px; }
.api-row .f-input { flex: 1; }

/* ── UTILITIES ─────────────────────────────────────────────────────────── */
.loading-state { padding: 40px; text-align: center; color: var(--walnut); font-size: 13px; }
@keyframes spin { to { transform: rotate(360deg); } }
.spin { width: 15px; height: 15px; border: 2px solid var(--parchment); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.fade-up { animation: fadeUp 0.3s ease; }
