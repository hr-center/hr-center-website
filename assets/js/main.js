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
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

function setActiveNavLink(){
  const page = (location.pathname.split('/').pop() || 'index.html');
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
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        form.reset();
        document.querySelectorAll('.file-drop .fname').forEach(l => l.textContent = '');
        if(status){ status.textContent = 'Hvala! Vaše sporočilo smo prejeli in se vam bomo kmalu oglasili.'; status.className = 'form-status ok'; }
      })
      .catch(() => {
        if(status){ status.textContent = 'Prišlo je do napake pri pošiljanju. Prosimo, poskusite znova ali nam pišite na info@hr-center.si.'; status.className = 'form-status err'; }
      })
      .finally(() => { if(submitBtn) submitBtn.disabled = false; });
    });
  });
}

/* ---------- Job listing (prosta-delovna-mesta.html) ---------- */
function renderJobList(){
  const wrap = document.getElementById('job-list');
  if(!wrap || typeof JOBS === 'undefined') return;

  const locationFilter = document.getElementById('filter-location');
  const categoryFilter = document.getElementById('filter-category');
  const countEl = document.getElementById('results-count');

  function uniq(arr){ return [...new Set(arr)]; }
  if(locationFilter){
    uniq(JOBS.map(j => j.location)).sort().forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc; opt.textContent = loc;
      locationFilter.appendChild(opt);
    });
  }
  if(categoryFilter){
    uniq(JOBS.map(j => j.category)).sort().forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });
  }

  function draw(){
    const locVal = locationFilter ? locationFilter.value : '';
    const catVal = categoryFilter ? categoryFilter.value : '';
    const filtered = JOBS.filter(j =>
      (!locVal || j.location === locVal) &&
      (!catVal || j.category === catVal)
    );

    wrap.innerHTML = '';
    if(filtered.length === 0){
      wrap.innerHTML = `<p style="padding:40px 0; text-align:center;">Trenutno ni prostih delovnih mest, ki bi ustrezala izbranim filtrom.</p>`;
    }
    filtered.forEach(job => {
      const a = document.createElement('a');
      a.href = `delovno-mesto.html?id=${encodeURIComponent(job.id)}`;
      a.className = 'job-card';
      a.innerHTML = `
        <div>
          <h3>${job.title}</h3>
          <div class="job-meta">
            <span>📍 ${job.location}</span>
            <span>🕘 ${job.type}</span>
          </div>
          <span class="job-tag">${job.category}</span>
        </div>
        <div class="btn btn-outline" aria-hidden="true">Poglej razpis →</div>
      `;
      wrap.appendChild(a);
    });
    if(countEl) countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'prosto delovno mesto' : 'prostih delovnih mest'}`;
  }

  if(locationFilter) locationFilter.addEventListener('change', draw);
  if(categoryFilter) categoryFilter.addEventListener('change', draw);
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
