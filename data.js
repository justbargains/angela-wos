import React, { useState, useEffect, useRef, useCallback } from 'react';
import { dbGet, dbSet } from './supabase';
import {
  SCRIPTURES, ROMANCE_POOL, MEALS, ROLE_CFG, TIER3_MINS,
  WS_PATTERNS, SCHEDULE, RITUALS
} from './data';
import './App.css';

// ── CLOUD STORAGE HOOK ────────────────────────────────────────────────────
function useCloudStore(key, defaultVal) {
  const [val, setVal] = useState(defaultVal);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dbGet(key).then(v => {
      if (v !== null) setVal(v);
      setLoaded(true);
    });
  }, [key]);

  const set = useCallback(async (newVal) => {
    const resolved = typeof newVal === 'function' ? newVal(val) : newVal;
    setVal(resolved);
    await dbSet(key, resolved);
  }, [key, val]);

  return [val, set, loaded];
}

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────
function CheckItem({ label, checked, onToggle }) {
  return (
    <div className={`ck ${checked ? 'done' : ''}`} onClick={onToggle}>
      <div className={`ck-box ${checked ? 'on' : ''}`}>
        {checked && <span className="ck-check">✓</span>}
      </div>
      <span className={`ck-text ${checked ? 'done' : ''}`}>{label}</span>
    </div>
  );
}

function SchedBlock({ b }) {
  return (
    <div className="sched-row">
      <div className="sched-time">{b.time}</div>
      <div className={`sched-block r-${b.role}`}>
        <div className="sched-role">{ROLE_CFG[b.role]?.label || b.role}</div>
        <div className="sched-task">{b.task}</div>
        {b.sub && <div className="sched-sub">{b.sub}</div>}
        {b.gem && <div className="sched-gem">{b.gem}</div>}
      </div>
    </div>
  );
}

function RitualChat({ ritual, weekData, apiKey, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  async function callClaude(apiMsgs) {
    if (!apiKey) return 'Please add your Anthropic API key in Settings to enable ritual conversations.';
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: apiMsgs })
      });
      const data = await res.json();
      if (data.error) return `Error: ${data.error.message}`;
      return data.content?.[0]?.text || 'No response received.';
    } catch (e) {
      return `Connection error: ${e.message}`;
    }
  }

  async function start() {
    setStarted(true);
    setLoading(true);
    const sys = ritual.prompt(weekData);
    const reply = await callClaude([{ role: 'user', content: sys }]);
    setMsgs([{ role: 'assistant', content: reply, _sys: sys }]);
    setLoading(false);
  }

  async function send() {
    if (!input.trim() || loading) return;
    const u = input.trim();
    setInput('');
    const next = [...msgs, { role: 'user', content: u }];
    setMsgs(next);
    setLoading(true);
    const apiMsgs = [];
    next.forEach((m, i) => {
      if (i === 0 && m._sys) {
        apiMsgs.push({ role: 'user', content: m._sys });
        apiMsgs.push({ role: 'assistant', content: m.content });
        return;
      }
      apiMsgs.push({ role: m.role, content: m.content });
    });
    const reply = await callClaude(apiMsgs);
    setMsgs(p => [...p, { role: 'assistant', content: reply }]);
    setLoading(false);
  }

  return (
    <div className="ritual-panel fade-up">
      <div className="ritual-head">
        <div>
          <div className="ritual-title">{ritual.icon} {ritual.label}</div>
          <div className="ritual-sub">{ritual.desc}</div>
        </div>
        <div className="ritual-head-actions">
          {!started && <button className="btn btn-primary btn-sm" onClick={start}>Begin</button>}
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
        </div>
      </div>
      {!started ? (
        <div className="ritual-empty">Click Begin to start your {ritual.label.toLowerCase()} conversation.</div>
      ) : (
        <>
          <div className="ritual-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.role === 'user' ? 'msg-user' : 'msg-ai'}`}>{m.content}</div>
            ))}
            {loading && (
              <div className="msg msg-ai msg-thinking">
                <div className="thinking-row"><div className="spin" />Thinking...</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="ritual-input-row">
            <input
              className="ritual-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Continue the conversation..."
            />
            <button className="btn btn-primary btn-sm" onClick={send} disabled={loading}>
              {loading ? <div className="spin" /> : 'Send'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── PAGES ─────────────────────────────────────────────────────────────────

function Dashboard({ weekData, checks, setChecks, loaded }) {
  const today = new Date();
  const scripture = SCRIPTURES[today.getDay() % SCRIPTURES.length];
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const todayKey = days[today.getDay()];
  const romance = weekData.romancePicks?.[todayKey];
  const hr = today.getHours();
  const greeting = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';

  const MORNING_ITEMS = ['Light candle + stretch', 'Coffee with intention — sit', 'Dressed with joy', 'School drop-off'];
  const HEALTH_ITEMS = ['96oz water prepped', 'Daily vitamins', 'Breakfast at the table', 'PM skincare tonight'];
  const BIZ_ITEMS = ['Business block today', 'Instagram check-in', 'Weekly 2hr target on track'];

  function tog(sec, i) {
    setChecks(p => {
      const s = [...(p[sec] || [])];
      s[i] = !s[i];
      return { ...p, [sec]: s };
    });
  }
  function is(s, i) { return !!(checks[s]?.[i]); }

  const totalItems = MORNING_ITEMS.length + HEALTH_ITEMS.length + BIZ_ITEMS.length;
  const doneItems = [
    ...MORNING_ITEMS.map((_, i) => is('morning', i)),
    ...HEALTH_ITEMS.map((_, i) => is('health', i)),
    ...BIZ_ITEMS.map((_, i) => is('biz', i)),
  ].filter(Boolean).length;

  if (!loaded) return <div className="loading-state">Syncing your data...</div>;

  return (
    <div>
      <div className="page-head">
        <div className="page-title">{greeting}, Angela.</div>
        <div className="page-sub">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </div>
      <div className="page-body">
        <div className="scripture">
          <div className="scripture-text">"{scripture.text}"</div>
          <div className="scripture-ref">{scripture.ref}</div>
        </div>

        {weekData.intention && (
          <div className="intent-bar">
            <span className="intent-label">This week</span>
            <span className="intent-text">{weekData.intention}</span>
            <span className={`tier-chip tc-${weekData.tier || 2}`}>Tier {weekData.tier || 2}</span>
          </div>
        )}

        <div className="g3 mb20">
          <div className="metric">
            <div className="metric-val">{doneItems}/{totalItems}</div>
            <div className="metric-label">Daily anchors complete</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${Math.round((doneItems / totalItems) * 100)}%` }} />
            </div>
          </div>
          <div className="metric">
            <div className="metric-val metric-val-sm">{weekData.big1 || 'Set up your week'}</div>
            <div className="metric-label">Priority #1 this week</div>
          </div>
          <div className="metric">
            <div className="metric-val metric-val-sm">{weekData.weekOf || '—'}</div>
            <div className="metric-label">Week of</div>
          </div>
        </div>

        <div className="g3 mb20">
          <div className="card card-warm">
            <div className="card-label">The Elegance Hour</div>
            {MORNING_ITEMS.map((item, i) => (
              <CheckItem key={i} label={item} checked={is('morning', i)} onToggle={() => tog('morning', i)} />
            ))}
          </div>
          <div className="card card-sage">
            <div className="card-label">Health standards</div>
            {HEALTH_ITEMS.map((item, i) => (
              <CheckItem key={i} label={item} checked={is('health', i)} onToggle={() => tog('health', i)} />
            ))}
          </div>
          <div className="card card-sky">
            <div className="card-label">Side business action</div>
            {BIZ_ITEMS.map((item, i) => (
              <CheckItem key={i} label={item} checked={is('biz', i)} onToggle={() => tog('biz', i)} />
            ))}
          </div>
        </div>

        {romance && (
          <div className="romance-card">
            <div className="romance-day">🕯 Today's romance moment</div>
            <div className="romance-title">{romance.title}</div>
            <div className="romance-sub">{romance.sub}</div>
          </div>
        )}

        {!weekData.intention && (
          <div className="card card-blush setup-prompt">
            <div className="setup-prompt-title">Start with your weekly setup.</div>
            <div className="setup-prompt-sub">Go to Settings, enter your week, and click Activate. Everything else populates automatically.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Schedule({ weekData }) {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const labels = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };
  const todayIdx = [1, 2, 3, 4, 5, 6, 0][new Date().getDay()];
  const [active, setActive] = useState(days[Math.min(todayIdx, 6)]);

  return (
    <div>
      <div className="page-head">
        <div className="page-title">Schedule</div>
        <div className="page-sub">The Elegance Hour 6:00–6:45 · Drop-off 6:45–7:15 · Full get-ready after drop-off</div>
      </div>
      <div className="page-body">
        {weekData.intention && (
          <div className="intent-bar">
            <span className="intent-label">This week</span>
            <span className="intent-text">{weekData.intention}</span>
            <span className={`tier-chip tc-${weekData.tier || 2}`}>Tier {weekData.tier || 2}</span>
          </div>
        )}
        <div className="day-tabs">
          {days.map(d => (
            <button key={d} className={`day-tab ${active === d ? 'active' : ''}`} onClick={() => setActive(d)}>
              {labels[d].slice(0, 3)}
            </button>
          ))}
        </div>
        <div className="day-label-full">{labels[active]}</div>
        <div className="sched-list">
          {(SCHEDULE[active] || []).map((b, i) => <SchedBlock key={i} b={b} />)}
        </div>
      </div>
    </div>
  );
}

function Goals({ weekData }) {
  const roles = Object.keys(ROLE_CFG);
  return (
    <div>
      <div className="page-head">
        <div className="page-title">Weekly goals</div>
        <div className="page-sub">Big 3 · role goals · Tier 3 minimums</div>
      </div>
      <div className="page-body">
        {weekData.big1 ? (
          <div className="card card-warm mb20">
            <div className="card-label">Weekly Big 3</div>
            {[weekData.big1, weekData.big2, weekData.big3].filter(Boolean).map((b, i) => (
              <div key={i} className="big3-item">
                <div className="big3-num">{i + 1}</div>
                <div className="big3-text">{b}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card mb20 empty-state">Activate your week in Settings to populate your Big 3 and role goals.</div>
        )}
        <div className="card">
          <div className="card-label">Role goals this week</div>
          <table className="rtbl">
            <thead>
              <tr><th style={{ width: '130px' }}>Role</th><th>Goal this week</th><th style={{ width: '150px' }}>Tier 3 minimum</th></tr>
            </thead>
            <tbody>
              {roles.map(r => {
                const g = weekData[`goal_${r}`] || '';
                return (
                  <tr key={r}>
                    <td><span className="r-badge"><span className="r-dot" style={{ background: ROLE_CFG[r].color }} />{ROLE_CFG[r].label}</span></td>
                    <td className={g ? '' : 'td-empty'}>{g || 'Not set'}</td>
                    <td className="td-min">{TIER3_MINS[r]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Meals() {
  return (
    <div>
      <div className="page-head">
        <div className="page-title">Meal plan</div>
        <div className="page-sub">3-meal rotation · Zero decision fatigue · Sunday prep sets the whole week</div>
      </div>
      <div className="page-body">
        <div className="card mb16">
          <div className="card-label">Your dinner rotation — the system runs you</div>
          <div className="rotation-note">No more choosing. The decision is already made.</div>
          {MEALS.map((m, i) => (
            <div key={i} className="meal-row">
              <div className="meal-day-name">{m.day}</div>
              <div>
                <div className="meal-name">{m.meal}</div>
                <div className="meal-sub">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card card-sage">
          <div className="card-label">Sunday meal prep (1–2 hours)</div>
          <div className="prep-headline">Put on a good playlist. This is your gift to every version of yourself this week.</div>
          {[
            'Put on your favorite playlist first',
            'Roast 2 sheet pans of veggies (425° · 25 min)',
            'Cook a big batch of rice or quinoa',
            'Grill or bake chicken breasts',
            'Make overnight oats x5 (5 minutes, 5 jars)',
            'Portion into containers — label and done'
          ].map((s, i) => (
            <div key={i} className="prep-step">
              <span className="prep-num">{i + 1}.</span>
              <span>{s}</span>
            </div>
          ))}
          <div className="prep-footer">You just bought yourself time and peace all week.</div>
        </div>
      </div>
    </div>
  );
}

function WhiteSpace({ weekData }) {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const freeCount = days.reduce((a, d) => a + (WS_PATTERNS[d] || []).filter(s => s === 'free').length, 0);
  const picks = weekData.romancePicks || {};

  return (
    <div>
      <div className="page-head">
        <div className="page-title">White space</div>
        <div className="page-sub">Protected open time · Your romance menu · Recovery is strategy</div>
      </div>
      <div className="page-body">
        <blockquote className="ws-quote">"Protected open time is not wasted time. It is how you recover, think, and lead yourself."</blockquote>

        <div className="g3 mb20">
          <div className="metric"><div className="metric-val">{freeCount}</div><div className="metric-label">Open blocks this week</div></div>
          <div className="metric"><div className="metric-val">4</div><div className="metric-label">Protected blocks</div></div>
          <div className="metric"><div className="metric-val">7</div><div className="metric-label">Romance moments planned</div></div>
        </div>

        <div className="card mb20">
          <div className="card-label">Weekly map (6am – 10pm)</div>
          <div className="ws-grid">
            {days.map((d, i) => (
              <div key={d} className="ws-col">
                <div className="ws-col-name">{dLabels[i]}</div>
                {(WS_PATTERNS[d] || []).map((s, j) => <div key={j} className={`ws-slot ws-${s}`} title={s} />)}
              </div>
            ))}
          </div>
          <div className="ws-legend">
            <div className="ws-li"><div className="ws-ld" style={{ background: 'rgba(123,167,188,0.4)' }} />Scheduled</div>
            <div className="ws-li"><div className="ws-ld" style={{ background: 'rgba(139,168,136,0.55)' }} />Open</div>
            <div className="ws-li"><div className="ws-ld" style={{ background: 'rgba(139,112,152,0.45)' }} />Protected</div>
            <div className="ws-li"><div className="ws-ld" style={{ background: 'rgba(212,165,165,0.6)' }} />Romance</div>
          </div>
        </div>

        <div className="card">
          <div className="card-label">This week's romance menu — one per day, never the same</div>
          <div className="g2 romance-grid">
            {days.map((d, i) => {
              const p = picks[d];
              return (
                <div key={d} className={`romance-card ${!p ? 'romance-card-empty' : ''}`}>
                  <div className="romance-day">{dLabels[i]}</div>
                  <div className="romance-title">{p ? p.title : 'Activate your week to reveal'}</div>
                  {p && <div className="romance-sub">{p.sub}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Finance({ finChecks, setFinChecks, loaded }) {
  const now = new Date();
  const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
  const isLast = daysLeft <= 7;

  const WEEKLY = ['Check all account balances', 'Review new or surprise charges', 'Confirm bills due this week are paid', 'Log cash or irregular spending', 'Check savings progress', "Review kids' expenses (Ethan / Evan)"];
  const MONTHLY = ['Review full budget vs actuals', 'Update savings tracker', 'Review credit card statements', 'Check investment accounts', "Plan next month's major expenses", 'Side business revenue and expenses'];

  function tog(s, i) { setFinChecks(p => { const a = [...(p[s] || [])]; a[i] = !a[i]; return { ...p, [s]: a }; }); }
  function is(s, i) { return !!(finChecks[s]?.[i]); }

  if (!loaded) return <div className="loading-state">Syncing...</div>;

  return (
    <div>
      <div className="page-head">
        <div className="page-title">Finance</div>
        <div className="page-sub">2-min daily balance check · Weekly review Thursday · Monthly review last Friday</div>
      </div>
      <div className="page-body">
        <div className={`fin-trigger ${isLast ? 'fin-active' : 'fin-inactive'}`}>
          {isLast ? `⚡ Last week of the month — monthly review due this Friday.` : `Monthly review: last Friday of the month · ${daysLeft} days remaining`}
        </div>
        <div className="g2 mb16">
          <div className="card">
            <div className="card-label">Weekly check-in (Thursday)</div>
            {WEEKLY.map((item, i) => <CheckItem key={i} label={item} checked={is('weekly', i)} onToggle={() => tog('weekly', i)} />)}
          </div>
          <div className="card">
            <div className="card-label">Monthly review (last Friday)</div>
            {MONTHLY.map((item, i) => <CheckItem key={i} label={item} checked={is('monthly', i)} onToggle={() => tog('monthly', i)} />)}
          </div>
        </div>
        <div className="card">
          <div className="card-label">Notes this week</div>
          <textarea
            className="f-textarea"
            placeholder="Log anything financial — wins, surprises, things to follow up..."
            value={finChecks.notes || ''}
            onChange={e => setFinChecks(p => ({ ...p, notes: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
}

function Rituals({ weekData, apiKey }) {
  const [active, setActive] = useState(null);

  return (
    <div>
      <div className="page-head">
        <div className="page-title">Claude rituals</div>
        <div className="page-sub">AI-powered check-ins built around your life, your roles, your tier</div>
      </div>
      <div className="page-body">
        {!apiKey && (
          <div className="card card-blush mb16">
            <div className="api-warn-title">API key needed</div>
            <div className="api-warn-sub">Add your Anthropic API key in Settings to activate ritual conversations. Your key stays on your device only.</div>
          </div>
        )}
        <div className="ritual-cards">
          {RITUALS.map(r => (
            <div key={r.id} className={`ritual-card ${active?.id === r.id ? 'active' : ''}`} onClick={() => setActive(active?.id === r.id ? null : r)}>
              <div className="ritual-card-icon">{r.icon}</div>
              <div className="ritual-card-name">{r.label}</div>
              <div className="ritual-card-desc">{r.desc}</div>
            </div>
          ))}
        </div>
        {active && (
          <RitualChat key={active.id} ritual={active} weekData={weekData} apiKey={apiKey} onClose={() => setActive(null)} />
        )}
      </div>
    </div>
  );
}

function Settings({ weekData, setWeekData, apiKey, setApiKey }) {
  const [f, setF] = useState({ ...weekData });
  const [saved, setSaved] = useState(false);

  function fld(k) { return { value: f[k] || '', onChange: e => setF(p => ({ ...p, [k]: e.target.value })) }; }

  function activate() {
    const used = new Set();
    const picks = {};
    ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach(d => {
      let idx;
      do { idx = Math.floor(Math.random() * ROMANCE_POOL.length); } while (used.has(idx));
      used.add(idx);
      picks[d] = ROMANCE_POOL[idx];
    });
    setWeekData({ ...f, romancePicks: picks });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="page-head">
        <div className="page-title">Settings</div>
        <div className="page-sub">Weekly setup · API key · Role goals · Run every Sunday</div>
      </div>
      <div className="page-body">
        <div className="card mb16">
          <div className="card-label">Anthropic API key</div>
          <div className="api-note">Stored locally on your device only. Enables ritual conversations. Get yours at console.anthropic.com.</div>
          <div className="api-row">
            <input className="f-input" type="password" placeholder="sk-ant-..." value={apiKey} onChange={e => setApiKey(e.target.value)} />
            <button className="btn btn-primary" onClick={() => { setApiKey(apiKey); setSaved(true); setTimeout(() => setSaved(false), 2000); }}>Save</button>
          </div>
        </div>

        <div className="card mb16">
          <div className="card-label">Weekly setup</div>
          <div className="settings-g2">
            <div className="f-group"><label className="f-label">Week of</label><input className="f-input" placeholder="e.g. April 28, 2026" {...fld('weekOf')} /></div>
            <div className="f-group">
              <label className="f-label">Tier this week</label>
              <select className="f-select" value={f.tier || '2'} onChange={e => setF(p => ({ ...p, tier: e.target.value }))}>
                <option value="2">Tier 2 — Steady progress (default)</option>
                <option value="1">Tier 1 — Full execution</option>
                <option value="3">Tier 3 — Survival mode</option>
              </select>
            </div>
          </div>
          <div className="f-group"><label className="f-label">Weekly intention (one elegant sentence)</label><input className="f-input" placeholder="e.g. This week I lead with presence and protect my peace." {...fld('intention')} /></div>
          <div className="settings-g2">
            <div className="f-group"><label className="f-label">Big 3 — Priority #1</label><input className="f-input" placeholder="e.g. Finalize CLM contract templates" {...fld('big1')} /></div>
            <div className="f-group"><label className="f-label">Big 3 — Priority #2</label><input className="f-input" placeholder="e.g. 3 strength workouts" {...fld('big2')} /></div>
          </div>
          <div className="f-group"><label className="f-label">Big 3 — Priority #3</label><input className="f-input" placeholder="e.g. Instagram content batch" {...fld('big3')} /></div>
          <div className="f-group"><label className="f-label">Constraints or high-stakes events this week</label><textarea className="f-textarea" placeholder="Board meeting, scholarship deadline, travel..." {...fld('constraints')} /></div>
          <div className="f-group"><label className="f-label">Context for Claude rituals (how you are feeling, what is at stake)</label><textarea className="f-textarea" placeholder="Anything Claude should know this week..." {...fld('weekNote')} /></div>
        </div>

        <div className="card mb16">
          <div className="card-label">Role goals this week — one per role, keep it simple</div>
          <div className="settings-g2">
            {Object.keys(ROLE_CFG).map(r => (
              <div key={r} className="f-group">
                <label className="f-label">
                  <span className="r-dot-inline" style={{ background: ROLE_CFG[r].color }} />
                  {ROLE_CFG[r].label}
                </label>
                <input className="f-input" placeholder={`Goal for ${ROLE_CFG[r].label}...`} {...fld(`goal_${r}`)} />
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-gold btn-full" onClick={activate}>
          {saved ? '✓ Week activated' : 'Activate this week'}
        </button>
      </div>
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Today',       group: 'daily' },
  { id: 'schedule',  label: 'Schedule',    group: 'plan' },
  { id: 'goals',     label: 'Goals',       group: 'plan' },
  { id: 'meals',     label: 'Meals',       group: 'plan' },
  { id: 'whitespace',label: 'White space', group: 'plan' },
  { id: 'rituals',   label: 'Rituals',     group: 'ai' },
  { id: 'finance',   label: 'Finance',     group: 'life' },
  { id: 'settings',  label: 'Settings',    group: 'system' },
];

const NAV_COLORS = {
  dashboard: '#C4923A', schedule: '#7BA7BC', goals: '#8BA888',
  meals: '#C47A7A', whitespace: '#D4A5A5', rituals: '#8B7098',
  finance: '#C47A7A', settings: '#A89880'
};

const GROUPS = [
  { id: 'daily', label: 'Today' },
  { id: 'plan',  label: 'Plan' },
  { id: 'ai',    label: 'AI' },
  { id: 'life',  label: 'Life' },
  { id: 'system',label: 'System' },
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [weekData, setWeekData, weekLoaded] = useCloudStore('week_data', {});
  const [checks, setChecks, checksLoaded] = useCloudStore('daily_checks', {});
  const [finChecks, setFinChecks, finLoaded] = useCloudStore('finance_checks', {});
  const [apiKey, setApiKey, apiLoaded] = useCloudStore('api_key', '');

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-name">Angela</div>
          <div className="sidebar-sub">Weekly Operating System</div>
        </div>
        <nav className="sidebar-nav">
          {GROUPS.map(g => (
            <div key={g.id}>
              <div className="nav-group-label">{g.label}</div>
              {NAV.filter(n => n.group === g.id).map(n => (
                <div key={n.id} className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
                  <span className="nav-dot" style={{ background: page === n.id ? NAV_COLORS[n.id] : 'rgba(200,184,154,0.2)' }} />
                  {n.label}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          {weekData.tier && <div className={`tier-chip tc-${weekData.tier}`}>Tier {weekData.tier}</div>}
          <div className="north-star">
            "I will not spend my life reacting. I will spend it leading — myself first."
          </div>
        </div>
      </aside>

      <main className="main-content">
        {page === 'dashboard'  && <Dashboard weekData={weekData} checks={checks} setChecks={setChecks} loaded={checksLoaded} />}
        {page === 'schedule'   && <Schedule weekData={weekData} />}
        {page === 'goals'      && <Goals weekData={weekData} />}
        {page === 'meals'      && <Meals />}
        {page === 'whitespace' && <WhiteSpace weekData={weekData} />}
        {page === 'rituals'    && <Rituals weekData={weekData} apiKey={apiKey} />}
        {page === 'finance'    && <Finance finChecks={finChecks} setFinChecks={setFinChecks} loaded={finLoaded} />}
        {page === 'settings'   && <Settings weekData={weekData} setWeekData={setWeekData} apiKey={apiKey} setApiKey={setApiKey} />}
      </main>
    </div>
  );
}
