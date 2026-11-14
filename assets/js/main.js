/* =========================================================
   HR CENTER — skupna funkcionalnost strani
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNodeFields();
  initFileDrops();
  initNetlifyForms();
  renderJobList();
  renderJobDetail();
  setActiveNavLink();
});

/* ---------- Mobile nav toggle ---------- */
function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  function setOpen(open){
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Zapri meni' : 'Odpri meni');
  }
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && nav.classList.contains('open')){ setOpen(false); toggle.focus(); } });
  window.addEventListener('resize', () => { if(window.innerWidth > 1180) setOpen(false); });
}

function setActiveNavLink(){
  let page = (location.pathname.split('/').pop() || 'index.html');
  if(page === 'delovno-mesto.html') page = 'prosta-delovna-mesta.html';
  document.querySelectorAll('.main-nav a[data-page]').forEach(a => {
    if(a.dataset.page === page) a.classList.add('active');
  });
}

/* ---------- Signature node-field visual ---------- */
function initNodeFields(){
  document.querySelectorAll('.node-field[data-nodes]').forEach(el => {
    const rows = parseInt(el.dataset.rows || '4', 10);
    const cols = parseInt(el.dataset.cols || '4', 10);
    const matchIndex = el.dataset.match !== undefined
      ? parseInt(el.dataset.match, 10)
      : Math.floor((rows * cols) / 2) + 1;
    el.innerHTML = buildNodeFieldSVG(rows, cols, matchIndex);
  });
}

function buildNodeFieldSVG(rows, cols, matchIndex){
  const size = 400;
  const pad = 40;
  const stepX = (size - pad * 2) / (cols - 1);
  const stepY = (size - pad * 2) / (rows - 1);
  let i = 0;
  let shapes = '';

  for(let r = 0; r < rows; r++){
    for(let c = 0; c < cols; c++){
      i++;
      const cx = pad + c * stepX;
      const cy = pad + r * stepY;
      const isMatch = i === matchIndex;
      const cls = isMatch ? 'match' : '';
      shapes += `
        <g>
          ${isMatch ? `<circle class="match-ring" cx="${cx}" cy="${cy}" r="20"></circle>` : ''}
          <circle class="node-dot ${cls}" cx="${cx}" cy="${cy}" r="19"></circle>
          <circle class="node-glyph ${cls}" cx="${cx}" cy="${cy - 5}" r="6.4"></circle>
          <path class="node-glyph ${cls}" d="M ${cx-9} ${cy+12} Q ${cx} ${cy-2} ${cx+9} ${cy+12} Z"></path>
        </g>`;
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mreža ljudi, med katerimi izstopa pravi kandidat">${shapes}</svg>`;
}

/* ---------- Pretty file-upload buttons ---------- */
function initFileDrops(){
  document.querySelectorAll('.file-drop').forEach(drop => {
    const input = drop.querySelector('input[type=file]');
    if(!input) return;
    const label = drop.querySelector('.fname');
    input.addEventListener('change', () => {
      if(input.files && input.files.length > 0){
        label.textContent = input.files[0].name;
      } else {
        label.textContent = '';
      }
    });
  });
}

/* ---------- Netlify form submission with inline status ---------- */
function initNetlifyForms(){
  document.querySelectorAll('form[data-netlify-ajax]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const submitBtn = form.querySelector('[type=submit]');
      const formData = new FormData(form);

      if(submitBtn) submitBtn.disabled = true;

      fetch('/', {
        method: 'POST',
        body: formData
      })
      .then((res) => {
        if(!res.ok) throw new Error('Napaka pri pošiljanju: ' + res.status);
        form.reset();
        document.querySelectorAll('.file-drop .fname').forEach(l => l.textContent = '');
        if(status){ status.textContent = 'Hvala! Vaše sporočilo smo prejeli in se vam bomo kmalu oglasili.'; status.className = 'form-status ok'; }
      })
      .catch((err) => {
        console.error(err);
        if(status){ status.textContent = 'Prišlo je do napake pri pošiljanju. Prosimo, poskusite znova ali nam pišite na info@hr-center.si.'; status.className = 'form-status err'; }
      })
      .finally(() => { if(submitBtn) submitBtn.disabled = false; });
    });
  });
}

/* ---------- Job listing (prosta-delovna-mesta.html) ---------- */
const JOB_ICONS = {"proizvodnja": "<svg viewBox=\"0 0 64 64\"><circle class=\"badge-ring\" cx=\"32\" cy=\"32\" r=\"29\"/><path class=\"badge-glyph\" fill=\"none\" stroke-linejoin=\"round\" d=\"M16 44V28l9 6v-6l9 6v-6l9 6V22l9 8v14z\"/><line class=\"badge-glyph\" x1=\"14\" y1=\"44\" x2=\"50\" y2=\"44\"/><rect fill=\"var(--teal)\" x=\"41\" y=\"16\" width=\"4\" height=\"6\"/><circle class=\"badge-accent\" cx=\"32\" cy=\"4.5\" r=\"3\"/></svg>", "logistika": "<svg viewBox=\"0 0 64 64\"><circle class=\"badge-ring\" cx=\"32\" cy=\"32\" r=\"29\"/><rect class=\"badge-glyph\" x=\"14\" y=\"24\" width=\"20\" height=\"14\" rx=\"1.5\"/><path class=\"badge-glyph\" style=\"stroke-linejoin:round\" d=\"M34 29h7l6 6v3h-13z\"/><circle fill=\"var(--white)\" class=\"badge-glyph\" cx=\"21\" cy=\"40\" r=\"3\"/><circle fill=\"var(--white)\" class=\"badge-glyph\" cx=\"42\" cy=\"40\" r=\"3\"/><line style=\"stroke:var(--teal)\" x1=\"18\" y1=\"30\" x2=\"30\" y2=\"30\" stroke-width=\"2\"/><circle class=\"badge-accent\" cx=\"32\" cy=\"4.5\" r=\"3\"/></svg>", "prodaja": "<svg viewBox=\"0 0 64 64\"><circle class=\"badge-ring\" cx=\"32\" cy=\"32\" r=\"29\"/><path class=\"badge-glyph\" style=\"stroke-linejoin:round\" d=\"M20 26h24l-2 20a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2z\"/><path class=\"badge-glyph\" d=\"M25 26v-3a7 7 0 0 1 14 0v3\"/><circle fill=\"var(--teal)\" cx=\"32\" cy=\"34\" r=\"2.4\"/><circle class=\"badge-accent\" cx=\"32\" cy=\"4.5\" r=\"3\"/></svg>", "admin": "<svg viewBox=\"0 0 64 64\"><circle class=\"badge-ring\" cx=\"32\" cy=\"32\" r=\"29\"/><path class=\"badge-glyph\" style=\"stroke-linejoin:round\" d=\"M16 24h11l3 4h18v17a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V26a2 2 0 0 1 2-2z\"/><line style=\"stroke:var(--teal)\" x1=\"20\" y1=\"36\" x2=\"40\" y2=\"36\" stroke-width=\"2.2\"/><line style=\"stroke:var(--teal)\" x1=\"20\" y1=\"41\" x2=\"34\" y2=\"41\" stroke-width=\"2.2\"/><circle class=\"badge-accent\" cx=\"32\" cy=\"4.5\" r=\"3\"/></svg>", "gostinstvo": "<svg viewBox=\"0 0 64 64\"><circle class=\"badge-ring\" cx=\"32\" cy=\"32\" r=\"29\"/><path class=\"badge-glyph\" style=\"stroke-linejoin:round\" stroke-width=\"2.3\" d=\"M22 32a7 7 0 0 1 3-13 6 6 0 0 1 11 -2 6 6 0 0 1 8 6 7 7 0 0 1 -2 9\"/><rect class=\"badge-glyph\" stroke-width=\"2.3\" x=\"23\" y=\"31\" width=\"18\" height=\"7\"/><line style=\"stroke:var(--teal)\" x1=\"21\" y1=\"45\" x2=\"43\" y2=\"45\" stroke-width=\"2.4\"/><line class=\"badge-glyph\" stroke-width=\"2.2\" x1=\"23\" y1=\"38\" x2=\"21\" y2=\"45\"/><line class=\"badge-glyph\" stroke-width=\"2.2\" x1=\"41\" y1=\"38\" x2=\"43\" y2=\"45\"/><circle class=\"badge-accent\" cx=\"32\" cy=\"4.5\" r=\"3\"/></svg>"};
const JOB_ICON_BY_CATEGORY = { 'Logistika':'logistika', 'Proizvodnja':'proizvodnja', 'Prodaja':'prodaja', 'Kadrovska administracija':'admin', 'Gostinstvo':'gostinstvo', 'Finance in računovodstvo':'admin' };
const PIN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const CAL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function deadlineOf(job){
  if(job.deadline) return new Date(job.deadline + 'T23:59:59');
  const d = new Date(job.posted + 'T00:00:00');
  d.setMonth(d.getMonth() + 1);
  d.setHours(23, 59, 59, 0);
  return d;
}
function formatShort(d){
  const dt = (d instanceof Date) ? d : new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('sl-SI', { day:'numeric', month:'numeric', year:'numeric' });
}
function isOpen(job){ return deadlineOf(job) >= new Date(); }

function renderJobList(){
  const wrap = document.getElementById('job-list');
  const JOBS_OPEN = JOBS.filter(isOpen).sort((a,b) => b.posted.localeCompare(a.posted));
  const side = document.getElementById('job-filters');
  if(!wrap || typeof JOBS === 'undefined') return;
  const countEl = document.getElementById('results-count');

  const groups = [
    { key:'location', title:'Lokacija' },
    { key:'category', title:'Področje dela' },
    { key:'type', title:'Vrsta dela' }
  ];
  const selected = { location:new Set(), category:new Set(), type:new Set() };

  function counts(key){
    const m = {};
    JOBS_OPEN.forEach(j => { m[j[key]] = (m[j[key]] || 0) + 1; });
    return Object.keys(m).sort().map(k => [k, m[k]]);
  }

  if(side){
    side.innerHTML = `<div class="jf-head"><button type="button" class="jf-toggle" aria-expanded="true" aria-controls="jf-groups"><span>Filter</span><span class="jf-chev" aria-hidden="true">▾</span></button><button type="button" class="jf-reset">Počisti</button></div><div id="jf-groups">` +
      groups.map(g => `<div class="jf-group"><h3>${g.title}</h3>` +
        counts(g.key).map(([val, n]) => `<label class="jf-opt"><input type="checkbox" data-key="${g.key}" value="${val}"><span>${val}</span><span class="n">${n}</span></label>`).join('') +
        `</div>`).join('') + `</div>`;
    const tgl = side.querySelector('.jf-toggle');
    const setCollapsed = (c) => { side.classList.toggle('collapsed', c); tgl.setAttribute('aria-expanded', String(!c)); };
    setCollapsed(window.matchMedia('(max-width: 900px)').matches);
    tgl.addEventListener('click', () => setCollapsed(!side.classList.contains('collapsed')));
    side.addEventListener('change', (e) => {
      const el = e.target;
      if(!el.dataset || !el.dataset.key) return;
      if(el.checked) selected[el.dataset.key].add(el.value); else selected[el.dataset.key].delete(el.value);
      draw();
    });
    side.querySelector('.jf-reset').addEventListener('click', () => {
      Object.values(selected).forEach(s => s.clear());
      side.querySelectorAll('input[type=checkbox]').forEach(i => i.checked = false);
      draw();
    });
  }

  function draw(){
    const filtered = JOBS_OPEN.filter(j => groups.every(g => selected[g.key].size === 0 || selected[g.key].has(j[g.key])));
    wrap.innerHTML = '';
    if(filtered.length === 0){
      wrap.innerHTML = `<p style="padding:40px 0; text-align:center;">Trenutno ni prostih delovnih mest, ki bi ustrezala izbranim filtrom.</p>`;
    }
    filtered.forEach(job => {
      const a = document.createElement('a');
      a.href = `delovno-mesto.html?id=${encodeURIComponent(job.id)}`;
      a.className = 'job-card';
      const icon = JOB_ICONS[JOB_ICON_BY_CATEGORY[job.category] || 'admin'];
      a.innerHTML = `
        <div class="job-ico"><div class="icon-badge">${icon}</div></div>
        <div class="job-main">
          <h3>${job.title}</h3>
          <p>${job.summary}</p>
          <div class="job-chips">
            <span class="chip">${CAL_SVG}Objavljeno ${formatShort(job.posted)}</span>
            <span class="chip">${PIN_SVG}${job.location}</span>
            <span class="chip accent">${job.type}</span>${job.note ? `<span class="chip accent">${job.note}</span>` : ''}
          </div>
        </div>
        <div class="job-deadline"><span>Rok prijave</span><strong>${formatShort(deadlineOf(job))}</strong></div>
        <div class="job-arrow" aria-hidden="true">${ARROW_SVG}</div>
      `;
      wrap.appendChild(a);
    });
    if(countEl) countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'prosto delovno mesto' : 'prostih delovnih mest'}`;
  }
  draw();
}

/* ---------- Job detail (delovno-mesto.html) ---------- */
function renderJobDetail(){
  const wrap = document.getElementById('job-detail');
  if(!wrap || typeof JOBS === 'undefined') return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const job = JOBS.find(j => j.id === id) || JOBS[0];

  if(!job){
    wrap.innerHTML = '<p>Delovno mesto ni bilo najdeno.</p>';
    return;
  }

  document.title = `${job.title} — HR Center`;
  const hiddenIdField = document.getElementById('applying-for');
  if(hiddenIdField) hiddenIdField.value = job.title;
  const jobTitleLabel = document.getElementById('job-title-label');
  if(jobTitleLabel) jobTitleLabel.textContent = job.title;

  const list = (arr) => arr.map(i => `<li>${i}</li>`).join('');

  wrap.innerHTML = `
    <div class="breadcrumb">
      <a href="prosta-delovna-mesta.html">Prosta delovna mesta</a> / ${job.title}
    </div>
    <div class="job-detail-head">
      <div>
        <span class="job-tag">${job.category}</span>
        <h1 style="margin-top:14px;">${job.title}</h1>
        <div class="job-meta" style="margin-top:10px; font-size:14.5px;">
          <span>📍 ${job.location}</span>
          <span>🕘 ${job.type}</span>
          <span>🗓️ Objavljeno: ${formatDate(job.posted)}</span>
          <span>⏳ Rok prijave: ${formatDate(deadlineOf(job).toISOString().slice(0,10))}</span>
          ${job.note ? `<span>🔁 ${job.note}</span>` : ''}
        </div>
      </div>
      <a href="#prijava" class="btn btn-coral">Prijavi se</a>
    </div>
    <div class="job-detail-body">
      ${job.description.map(p => `<p>${p}</p>`).join('')}
      <h3>Naloge in odgovornosti</h3>
      <ul>${list(job.responsibilities)}</ul>
      <h3>Kaj pričakujemo</h3>
      <ul>${list(job.requirements)}</ul>
      <h3>Kaj ponujamo</h3>
      <ul>${list(job.offer)}</ul>
    </div>
  `;
}

function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
}
