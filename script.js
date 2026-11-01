/* ==========================================================================
   TRAVEL WITH SUSMA: behaviour
   Content lives in content.js. You normally do not need to edit this file.
   ========================================================================== */
(() => {
  'use strict';

  const S = window.SITE || {};
  const IM = S.images || {};
  const D = (S.destinations || []).filter(d => !d.hidden);   /* hidden destinations are kept in content.js but not shown */
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
  const byId = Object.fromEntries(D.map(d => [d.id, d]));

  const ARROW = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" style="vertical-align:-2px;margin-left:8px"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const PLAY = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';

  /* ----------------------------------------------------------------------
     Home: background video. The still image shows first; the video starts
     after the page has loaded, and is skipped when the visitor has asked for
     reduced motion or data saving.
  ---------------------------------------------------------------------- */
  (() => {
    const HR = S.hero || {};
    const vid = $('#heroVideo'), poster = $('#heroPoster'), stage = $('#heroStage'), btn = $('#heroPause');
    if (!vid || !poster || !stage) return;
    const wideQ = matchMedia('(min-aspect-ratio: 1/1)');
    const pick = (a, b) => (wideQ.matches && b) ? b : a;
    const posterSrc = pick(HR.poster, HR.posterWide);
    if (posterSrc && !poster.src.endsWith(posterSrc)) poster.src = posterSrc;
    const conn = navigator.connection || {};
    const lite = reduceMotion || conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
    const src = () => pick(HR.video, HR.videoWide);
    if (lite || !src()) return;

    let userPaused = false, visible = true;
    const sync = () => {
      const want = visible && !userPaused && !document.hidden;
      if (want && vid.paused) { const p = vid.play(); if (p && p.catch) p.catch(() => {}); }
      else if (!want && !vid.paused) vid.pause();
    };
    const start = () => {
      vid.muted = true; vid.defaultMuted = true;
      vid.src = src();
      vid.addEventListener('playing', () => { vid.classList.add('on'); btn.hidden = false; }, { once: true });
      sync();
    };
    if (document.readyState === 'complete') setTimeout(start, 0); else addEventListener('load', start, { once: true });

    btn.addEventListener('click', () => {
      userPaused = !userPaused;
      btn.classList.toggle('paused', userPaused);
      btn.setAttribute('aria-label', userPaused ? 'Play background video' : 'Pause background video');
      sync();
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(e => { visible = e[0].isIntersecting; sync(); }).observe(stage);
    document.addEventListener('visibilitychange', sync);
  })();

  /* ----------------------------------------------------------------------
     Optional portrait (only shown if you set one in content.js)
  ---------------------------------------------------------------------- */
  if (IM.portrait) {
    const fig = $('#portrait');
    const img = new Image();
    img.alt = IM.portraitAlt || '';
    img.onload = () => { fig.hidden = false; };
    img.src = IM.portrait;
    fig.append(img);
  }

  /* ----------------------------------------------------------------------
     Experiences: the journey so far, one editorial row per trek
  ---------------------------------------------------------------------- */
  const smOf = src => (/^images\/[^/]+$/.test(src || '') && !/\/sm-/.test(src)) ? src.replace('images/', 'images/sm-') : src;
  const ORD = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
  const treks = D.filter(d => d.feature || d.cover || (d.photos || []).length);
  $('#expList').innerHTML = treks.map((d, i) => {
    const cover = d.cover || (d.photos && d.photos[0] && d.photos[0].src) || '';
    const ph = (d.photos || []).find(p => p.src === cover) || {};
    const href = `#destination-${esc(d.id)}`;
    return `<li class="trek">` +
      (cover ? `<a class="trek-img" href="${href}" data-dest="${esc(d.id)}" tabindex="-1" aria-hidden="true"><img src="${esc(smOf(cover))}" alt="" loading="${i ? 'lazy' : 'eager'}" decoding="async" width="560" height="${ph.w ? Math.round(560 * ph.h / ph.w) : 700}"></a>` : '') +
      `<div class="trek-body">` +
      (d.visited ? `<span class="trek-yr">${esc(d.visited)}</span>` : '') +
      `<span class="trek-no">${esc(ORD[i] || 'Trek ' + (i + 1))} trek</span>` +
      `<h3><a href="${href}" data-dest="${esc(d.id)}">${esc(d.name)}</a></h3>` +
      `<p>${esc(d.blurb)}</p>` +
      `<ul class="trek-facts"><li>${esc(d.region)}</li>${d.elevation ? `<li>${esc(d.altitudeLabel || 'Altitude')} ${esc(d.elevation)}</li>` : ''}</ul>` +
      `<a class="link" href="${href}" data-dest="${esc(d.id)}">${d.feature ? 'Read the story' : 'View photographs'}</a>` +
      `</div></li>`;
  }).join('');

  /* ----------------------------------------------------------------------
     Journal: trek stories (added automatically) plus any entries in content.js
  ---------------------------------------------------------------------- */
  const entries = [
    ...D.filter(d => d.feature && d.feature.storyTitle).map(d => ({
      date: d.visited || '', title: d.feature.storyTitle,
      excerpt: d.feature.storySubtitle || d.feature.standfirst || d.blurb, dest: d.id
    })),
    ...(S.journal || []).map(e => ({ date: e.date || '', title: e.title, excerpt: e.excerpt || '', url: e.url || '' }))
  ];
  $('#journalList').innerHTML = entries.map(e => {
    const attrs = e.dest ? `href="#destination-${esc(e.dest)}" data-dest="${esc(e.dest)}"` : (e.url ? `href="${esc(e.url)}" target="_blank" rel="noopener"` : '');
    const inner = `<span class="entry-date">${esc(e.date)}</span><div><h3>${esc(e.title)}</h3>${e.excerpt ? `<p>${esc(e.excerpt)}</p>` : ''}</div>` + (attrs ? `<span class="entry-go">Read${ARROW}</span>` : '');
    return `<li>${attrs ? `<a class="entry" ${attrs}>${inner}</a>` : `<div class="entry">${inner}</div>`}</li>`;
  }).join('');

  /* ----------------------------------------------------------------------
     Photography Gallery: one editorial grid of every photograph, with a filter
  ---------------------------------------------------------------------- */
  const chips = $('#galChips'), galGrid = $('#galGrid');
  let items = [], galFilter = 'all';

  const filterBtns = [['all', 'All']].concat(D.filter(d => (d.photos || []).length).map(d => [d.id, d.name]));
  chips.innerHTML = filterBtns.map(([id, label]) => `<button type="button" class="chip" data-id="${esc(id)}" aria-pressed="${id === 'all'}">${esc(label)}</button>`).join('');
  chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) selectDest(b.dataset.id); });

  function renderGallery() {
    /* mix the destinations so neighbouring photographs differ */
    const lists = D.filter(d => galFilter === 'all' || d.id === galFilter).map(d => (d.photos || []).map(p => ({ d, p })));
    const mixed = [];
    for (let n = 0; lists.some(l => n < l.length); n++) lists.forEach(l => { if (l[n]) mixed.push(l[n]); });
    items = mixed.map(({ d, p }) => ({ type: 'photo', src: p.src, alt: p.alt || '', caption: p.caption || defCapFor(d) }));
    galGrid.replaceChildren(...mixed.map(({ d, p }, n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'm';
      b.setAttribute('aria-label', `View photograph: ${p.alt || d.name}`);
      const img = new Image();
      img.alt = p.alt || '';
      img.decoding = 'async';
      if (n > 5) img.loading = 'lazy';
      if (p.w && p.h) { img.width = p.w; img.height = p.h; }
      img.onerror = () => { if (img.src.indexOf('/sm-') > -1) img.src = p.src; else b.remove(); };
      img.src = smOf(p.src);
      b.append(img);
      b.addEventListener('click', () => { items = mixed.map(({ d: dd, p: pp }) => ({ type: 'photo', src: pp.src, alt: pp.alt || '', caption: pp.caption || defCapFor(dd) })); openLB(n, b); });
      return b;
    }));
  }

  function selectDest(id, opts = {}) {
    galFilter = (id === 'all' || byId[id]) ? id : 'all';
    $$('.chip', chips).forEach(t => {
      const on = t.dataset.id === galFilter;
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && chips.scrollWidth > chips.clientWidth) chips.scrollTo({ left: t.offsetLeft - 20, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    renderGallery();
    if (opts.scroll) $('#gallery').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  const defCapFor = d => d.name + (d.visited ? ', ' + d.visited : '');
  const itemsFor = d => [
    ...(d.photos || []).map(p => ({ type: 'photo', src: p.src, alt: p.alt || '', caption: p.caption || defCapFor(d) })),
    ...(d.videos || []).map(v => ({ type: 'video', ...v, caption: v.title || 'Video' }))
  ];

  /* the photograph grid, shared by the gallery and the feature page */
  function buildGrid(d) {
    const photos = d.photos || [];
    const grid = document.createElement('div');
    grid.className = 'grid';
    photos.forEach((p, n) => {
      const fig = document.createElement('figure');
      fig.className = 'shot';
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `View photograph ${n + 1} of ${photos.length}: ${p.alt || d.name}`);
      const img = new Image();
      img.alt = p.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = () => fig.remove();
      img.src = p.src;
      b.append(img);
      b.addEventListener('click', () => { items = itemsFor(d); openLB(n, b); });
      const cap = document.createElement('figcaption');
      cap.textContent = p.caption || defCapFor(d);
      fig.append(b, cap);
      grid.append(fig);
    });
    return grid;
  }

  /* the video list (null when a destination has no videos) */
  function buildVideos(d) {
    const photos = d.photos || [], videos = d.videos || [];
    if (!videos.length) return null;
    const vs = document.createElement('section');
    vs.className = 'videos';
    vs.setAttribute('aria-label', `${d.name} videos`);
    vs.innerHTML = `<div class="coll-head"><h4>Videos</h4><span>${esc(plural(videos.length, 'video'))}</span></div>`;
    const grid = document.createElement('div');
    grid.className = 'vid-grid';
    videos.forEach((v, n) => {
      const fig = document.createElement('figure');
      fig.className = 'vid';
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Play video: ${v.title || d.name}`);
      const poster = v.poster || (v.youtube ? `https://i.ytimg.com/vi/${encodeURIComponent(v.youtube)}/hqdefault.jpg` : '');
      if (poster) {
        const img = new Image();
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = () => img.remove();
        img.src = poster;
        b.append(img);
      }
      b.insertAdjacentHTML('beforeend', `<span class="play">${PLAY}</span>`);
      b.addEventListener('click', () => { items = itemsFor(d); openLB(photos.length + n, b); });
      const cap = document.createElement('figcaption');
      cap.textContent = v.title || 'Watch video';
      fig.append(b, cap);
      grid.append(fig);
    });
    vs.append(grid);
    return vs;
  }

  /* ----------------------------------------------------------------------
     Destination feature page (any destination with a "feature" in content.js)
  ---------------------------------------------------------------------- */
  const page = $('#destPage');
  const baseTitle = document.title;
  let pageOpen = false;
  const fmtM = e => e.label || `${e.approx ? '≈\u00A0' : ''}${Number(e.metres).toLocaleString('en-US')}\u00A0m`;
  const KIND = { peak: 'Peak', camp: 'Camp', hill: 'Hill', viewpoint: 'Viewpoint', village: 'Village', city: 'City', lake: 'Lake', stop: 'Stop' };
  const mapsUrl = p => 'https://www.google.com/maps/search/?api=1&query=' + (p.lat != null && p.lng != null ? encodeURIComponent(p.lat + ',' + p.lng) : encodeURIComponent(p.query || p.name));
  const paras = list => (list || []).filter(Boolean).map(p => `<p>${esc(p)}</p>`).join('');


  /* a profile of the route: stops in trekking order, height drawn to scale */
  function profileHTML(mp) {
    const all = (mp.points || []);
    if (!mp.profile || all.length < 2) return '';
    const scaled = all.every(p => p.elev);               /* every stop has a height: draw a profile; otherwise an ordered route */
    const W = 920, L = scaled ? 118 : 90, R = scaled ? 70 : 90;
    const X = i => L + i * (W - L - R) / (all.length - 1);
    let H, T = 86, B = 64, Y, g = '', line, marks;
    if (scaled) {
      H = 390;
      const ymax = Math.ceil(Math.max(...all.map(p => p.elev)) / 500) * 500;
      Y = e => H - B - e / ymax * (H - B - T);
      for (let m = 1000; m < ymax; m += 1000) {
        g += `<line class="pf-grid" x1="70" x2="${W - R + 14}" y1="${Y(m).toFixed(1)}" y2="${Y(m).toFixed(1)}"/><text class="pf-axis" x="62" text-anchor="end" y="${(Y(m) + 5).toFixed(1)}">${m.toLocaleString('en-US')} m</text>`;
      }
    } else {
      H = 230;
      Y = () => 115;
    }
    line = all.map((p, i) => `${X(i).toFixed(1)},${Y(p.elev).toFixed(1)}`).join(' ');
    marks = all.map((p, i) => {
      const x = X(i), y = Y(p.elev);
      let nameX, nameY, elevY, anchor;
      if (scaled) {
        const up = (all.length - 1 - i) % 2 === 0;       /* alternate labels above-left and below-right so they never collide */
        nameX = up ? x - 16 : x + 16; anchor = up ? 'end' : 'start';
        nameY = up ? y - 30 : y + 26; elevY = up ? y - 12 : y + 44;
      } else {
        const up = i % 2 === 0;                           /* ordered route: centred labels, alternately above and below */
        nameX = x; anchor = 'middle';
        nameY = up ? y - 38 : y + 40; elevY = up ? y - 20 : y + 58;
      }
      return `<a class="pf-mk${p.phase === 'trek' ? ' trek' : ''}" href="${esc(mapsUrl(p))}" target="_blank" rel="noopener" aria-label="${i + 1}. ${esc(p.name)}${p.elevLabel ? ', ' + esc(p.elevLabel) : ''}. Open in Google Maps">` +
        `<title>${esc(p.name)}: open in Google Maps</title>` +
        `<text class="pf-name" x="${nameX.toFixed(1)}" y="${nameY.toFixed(1)}" text-anchor="${anchor}">${esc(p.short || p.name)}</text>` +
        (p.elevLabel ? `<text class="pf-elev" x="${nameX.toFixed(1)}" y="${elevY.toFixed(1)}" text-anchor="${anchor}">${esc(p.elevLabel)}</text>` : '') +
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11"/><text class="pf-num" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle">${i + 1}</text></a>`;
    }).join('');
    const legend = (mp.legend || []).length ? `<p class="legend pf-legend">${mp.legend.map(x => `<span class="key ${x[1] === 'trek' ? 'village' : 'peak'}"></span>${esc(x[0])}`).join('')}</p>` : '';
    return (mp.caption ? `<p class="ref"><strong>General reference route.</strong> ${esc(mp.caption)}</p>` : '') +
      `<div class="prof" tabindex="0" role="group" aria-label="Route diagram, scrollable"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Diagram of the route from ${esc(all[0].name)} to ${esc(all[all.length - 1].name)}, with the stops in order">${g}<polyline class="pf-line" points="${line}"/>${marks}</svg></div>` + legend;
  }

  function renderPage(d) {
    const f = d.feature, photos = d.photos || [];
    const els = (f.elevations || []).filter(e => e && e.metres);
    const maxM = Math.max(...els.map(e => e.metres), 1);
    const r = f.route;
    const story = (f.story || []).filter(Boolean);
    const summary = photos.length ? [d.visited, plural(photos.length, 'photograph')].filter(Boolean).join(' · ') : '';

    /* text blocks: f.highlights (shown at the end) and f.blocks (after "facts" or at the end) */
    const allBlocks = [...(f.highlights ? [f.highlights] : []), ...(f.blocks || [])];
    const blocksHTML = where => allBlocks.filter(bl => (bl.items || []).length && (bl.after === 'facts' ? 'facts' : 'end') === where).map((bl, n) =>
      `<section class="f-sec" aria-label="${esc(bl.title || 'Notes')}"><div>${bl.eyebrow ? `<p class="eyebrow">${esc(bl.eyebrow)}</p>` : ''}<h2>${esc(bl.title || 'Notes')}</h2></div><div>` +
      (bl.intro ? `<p class="prose-lead">${esc(bl.intro)}</p>` : '') +
      `<ul class="why">${bl.items.map(i => `<li><strong>${esc(i.title)}</strong><span>${esc(i.text)}</span></li>`).join('')}</ul></div></section>`).join('');

    let h = `<div class="wrap"><button class="back" type="button" data-back>&larr;&ensp;All destinations</button>`;

    h += `<header class="f-head"><p class="eyebrow">Destination feature${d.type ? ' &middot; ' + esc(d.type) : ''}</p>` +
      `<h1 class="f-title">${esc(d.name)}</h1>` +
      (f.standfirst ? `<p class="f-stand">${esc(f.standfirst)}</p>` : '') +
      ((f.meta || []).length ? `<ul class="f-meta">${f.meta.map(m => `<li>${esc(m)}</li>`).join('')}</ul>` : '') +
      `</header>`;

    if ((f.intro || []).length) {
      h += `<section class="f-sec" aria-labelledby="f-intro"><h2 id="f-intro">Introduction</h2><div class="prose">${paras(f.intro)}</div></section>`;
    }
    if (story.length) {
      h += `<section class="f-sec f-story" aria-labelledby="f-story"><div><p class="eyebrow">My story</p><h2 id="f-story">${esc(f.storyTitle || 'My story')}</h2>${f.storySubtitle ? `<p class="dek">${esc(f.storySubtitle)}</p>` : ''}</div><div class="prose">${paras(story)}</div></section>`;
    }
    if ((f.journey || []).length) {
      h += `<section class="f-sec" aria-labelledby="f-journey"><h2 id="f-journey">${esc(f.journeyTitle || 'My trekking journey')}</h2><ol class="journey">${f.journey.map(x => {
        const t = byId[x.id]; if (!t) return '';
        const here = x.id === d.id;
        return `<li${here ? ' aria-current="true" class="here"' : ''}><span class="jy">${esc(x.year)}</span><span class="jl">${esc(x.label)}</span>` +
          (here ? `<strong>${esc(t.name)}</strong>` : `<a href="#destination-${esc(t.id)}" data-dest="${esc(t.id)}">${esc(t.name)}</a>`) + `</li>`;
      }).join('')}</ol></section>`;
    }
    if (els.length) {
      h += `<section class="f-sec" aria-labelledby="f-elev"><div><p class="eyebrow">${esc(f.elevEyebrow || 'The mountains')}</p><h2 id="f-elev">Elevations</h2></div><div>` +
        `<ul class="elev">${els.map(e => `<li class="el ${esc(e.kind || 'peak')}"><span class="el-name">${esc(e.name)}</span><b class="el-val">${esc(fmtM(e))}</b><span class="el-bar"><i data-w="${(e.metres / maxM * 100).toFixed(2)}"></i></span></li>`).join('')}</ul>` +
        `<p class="legend">${[...new Set(els.map(e => e.kind || 'peak'))].map(k => `<span class="key ${esc(k)}"></span>${esc(KIND[k] || k)}`).join('')}</p>` +
        (f.elevationNote ? `<p class="note">${esc(f.elevationNote)}</p>` : '') + `</div></section>`;
    }
    if ((f.facts || []).length) {
      h += `<section class="f-sec" aria-labelledby="f-facts"><h2 id="f-facts">At a glance</h2><div><dl class="f-facts">${f.facts.map(x => `<div><dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd></div>`).join('')}</dl>${f.factsNote ? `<p class="note">${esc(f.factsNote)}</p>` : ''}</div></section>`;
      h += blocksHTML('facts');
    }
    if (photos.length) {
      h += `<section class="f-sec wide" aria-labelledby="f-photos"><div class="coll-head"><h2 id="f-photos">Photographs</h2><span>${esc(summary)}</span></div><div id="fGrid"></div></section>`;
    }
    const mp = f.map;
    if (mp && (mp.points || []).length) {
      h += `<section class="f-sec" aria-labelledby="f-map"><div><p class="eyebrow">Location</p><h2 id="f-map">On the map</h2></div><div>` +
        (mp.intro ? `<p class="prose-lead">${esc(mp.intro)}</p>` : '') +
        profileHTML(mp) + `<ol class="places">${mp.points.map((p, n) => `<li><span class="pin" aria-hidden="true">${n + 1}</span><span class="pl-text"><strong>${esc(p.name)}</strong><span>${esc([p.role, p.note].filter(Boolean).join(' · '))}</span></span><a class="link" href="${esc(mapsUrl(p))}" target="_blank" rel="noopener" aria-label="Open ${esc(p.name)} in Google Maps">Google Maps</a></li>`).join('')}</ol>` +
        (mp.overall ? `<p class="overall"><a class="link" href="${esc(mapsUrl(mp.overall))}" target="_blank" rel="noopener">${esc(mp.overall.label || 'Open in Google Maps')}</a></p>` : '') +
        (mp.note ? `<p class="note">${esc(mp.note)}</p>` : '') + `</div></section>`;
    }
    if (r && (r.stages || []).length) {
      h += `<section class="f-sec" aria-labelledby="f-route"><div><p class="eyebrow">${mp ? 'Getting there' : 'Location &amp; route'}</p><h2 id="f-route">Route overview</h2></div><div>` +
        (r.intro ? `<p class="prose-lead">${esc(r.intro)}</p>` : '') +
        `<ol class="stages">${r.stages.map(s => `<li><strong>${esc(s.name)}</strong>${s.note ? `<span>${esc(s.note)}</span>` : ''}</li>`).join('')}</ol>` +
        ((r.notes || []).length ? `<ul class="route-notes">${r.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : '') +
        ((r.sources || []).length ? `<p class="note sources">Sources: ${r.sources.map(x => `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)}</a>`).join(', ')}</p>` : '') +
        `</div></section>`;
    }
    h += blocksHTML('end');
    if (f.closing) {
      h += `<section class="f-close" aria-label="Closing reflection">${f.closingTitle ? `<h2>${esc(f.closingTitle)}</h2>` : ''}<p>${esc(f.closing)}</p></section>`;
    }
    h += `<div id="fVideos"></div><nav class="f-end" aria-label="Feature navigation"><button class="back" type="button" data-back>&larr;&ensp;All destinations</button><a class="link" href="#gallery" data-gallery="${esc(d.id)}">Open in the Photography Gallery</a></nav></div>`;

    page.innerHTML = h;
    $$('.el-bar i', page).forEach(i => { i.style.width = i.dataset.w + '%'; });
    if (photos.length) {
      const g = buildGrid(d);
      if (photos.length > 2 && photos.length % 4) g.classList.add('cols-3');   /* 3, 5, 6, 7 photos sit better in threes */
      $('#fGrid', page).replaceWith(g);
    }
    const vs = buildVideos(d);
    if (vs) $('#fVideos', page).replaceWith(vs);
  }

  function openPage(id) {
    const d = byId[id];
    if (!d || !d.feature) return false;
    renderPage(d);
    page.hidden = false;
    pageOpen = true;
    document.body.classList.add('page-open');
    document.title = `${d.name} | ${baseTitle}`;
    $$('#menu a').forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
    scrollTo({ top: 0, behavior: 'auto' });
    return true;
  }
  function closePage() {
    if (!pageOpen) return;
    pageOpen = false;
    page.hidden = true;
    page.replaceChildren();
    document.body.classList.remove('page-open');
    document.title = baseTitle;
  }
  const setHash = h => { try { history.replaceState(null, '', h); } catch (err) { /* not available here */ } };
  function leave(hash) {
    closePage();
    const t = hash && hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    if (t) t.scrollIntoView({ behavior: 'auto', block: 'start' });
    setHash(hash || '#home');
  }

  /* links to a destination (home page, list, gallery) and links out of the feature page */
  document.addEventListener('click', e => {
    if (e.target.closest('[data-back]')) { e.preventDefault(); leave('#experiences'); return; }
    const g = e.target.closest('[data-gallery]');
    if (g) { e.preventDefault(); closePage(); selectDest(g.dataset.gallery, { scroll: true }); setHash('#gallery'); return; }
    const a = e.target.closest('a[data-dest]');
    if (a) {
      e.preventDefault();
      const id = a.dataset.dest;
      if (!openPage(id)) { closePage(); selectDest(id, { scroll: true }); }
      setHash('#destination-' + id);
      return;
    }
    const h = e.target.closest('a[href^="#"]');
    if (h && pageOpen) {
      const tid = h.getAttribute('href').slice(1);
      if (tid && tid !== 'main' && document.getElementById(tid)) { e.preventDefault(); leave('#' + tid); }
    }
  });
  const hashDest = () => { const m = /^#destination-([\w-]+)$/.exec(location.hash); return m && byId[m[1]] ? m[1] : null; };
  addEventListener('hashchange', () => {
    const id = hashDest();
    if (id) { if (!openPage(id)) { closePage(); selectDest(id, { scroll: true }); } }
    else if (pageOpen) leave(location.hash);
  });

  selectDest('all');
  { const hd = hashDest(); if (hd && !openPage(hd)) setTimeout(() => $('#gallery').scrollIntoView(), 60); }

  /* ----------------------------------------------------------------------
     Viewer for photographs and videos
  ---------------------------------------------------------------------- */
  const lb = $('#lightbox'), lbMedia = $('#lbMedia'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
  let cur = 0, opener = null;

  function embedFor(v) {
    if (v.youtube) {
      const id = encodeURIComponent(v.youtube);
      return { frame: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`, link: `https://www.youtube.com/watch?v=${id}`, label: 'Watch on YouTube' };
    }
    if (v.vimeo) {
      const id = encodeURIComponent(v.vimeo);
      return { frame: `https://player.vimeo.com/video/${id}?autoplay=1`, link: `https://vimeo.com/${id}`, label: 'Watch on Vimeo' };
    }
    return null;
  }

  function showLB() {
    const it = items[cur];
    lbMedia.replaceChildren();
    let extra = '';

    if (it.type === 'photo') {
      const img = new Image();
      img.alt = it.alt;
      img.src = it.src;
      lbMedia.append(img);
    } else {
      const box = document.createElement('div');
      box.className = 'lb-video';
      const emb = embedFor(it);
      if (emb) {
        const fr = document.createElement('iframe');
        fr.src = emb.frame;
        fr.title = it.title || 'Video';
        fr.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        fr.allowFullscreen = true;
        fr.referrerPolicy = 'strict-origin-when-cross-origin';
        box.append(fr);
        extra = ` <a href="${esc(emb.link)}" target="_blank" rel="noopener">${esc(emb.label)}</a>`;
      } else if (it.file) {
        const vid = document.createElement('video');
        vid.controls = true;
        vid.playsInline = true;
        vid.preload = 'metadata';
        if (it.poster) vid.poster = it.poster;
        vid.src = it.file;
        box.append(vid);
      }
      lbMedia.append(box);
    }

    lbCap.innerHTML = esc(it.caption || '') + extra;
    lbCount.textContent = items.length > 1 ? `${cur + 1} / ${items.length}` : '';
    $('#lbPrev').hidden = $('#lbNext').hidden = items.length < 2;
  }
  function openLB(i, btn) {
    cur = i;
    opener = btn;
    showLB();
    lb.hidden = false;
    document.body.classList.add('lb-open');
    $('#lbClose').focus();
  }
  function closeLB() {
    lb.hidden = true;
    lbMedia.replaceChildren();          /* stops any video that is playing */
    document.body.classList.remove('lb-open');
    if (opener && document.contains(opener)) opener.focus();
  }
  const step = d => { cur = (cur + d + items.length) % items.length; showLB(); };

  $('#lbClose').addEventListener('click', closeLB);
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    else if (e.key === 'ArrowLeft' && items.length > 1) step(-1);
    else if (e.key === 'ArrowRight' && items.length > 1) step(1);
    else if (e.key === 'Tab') {
      const f = $$('button:not([hidden]), a[href]', lb);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let touchX = null;
  lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50 && items.length > 1) step(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* ----------------------------------------------------------------------
     Navigation: mobile menu and current-section highlight
  ---------------------------------------------------------------------- */
  const header = $('#siteHeader'), menuBtn = $('#menuBtn');
  const setMenu = open => {
    header.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 960) setMenu(false); });
  document.addEventListener('click', e => { if (header.classList.contains('open') && !e.target.closest('#siteHeader')) setMenu(false); });

  if ('IntersectionObserver' in window) {
    const links = $$('#menu a');
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(l => {
          const on = l.getAttribute('href') === '#' + en.target.id;
          l.classList.toggle('active', on);
          if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach(s => spy.observe(s));
  }

  /* ----------------------------------------------------------------------
     Contact: email, social links, form
  ---------------------------------------------------------------------- */
  if (S.email) {
    $('#mailBlock').hidden = false;
    const a = $('#mailLink');
    a.textContent = S.email;
    a.href = 'mailto:' + S.email;
  }

  const socials = (S.social || []).filter(s => s && s.url);
  $$('[data-social]').forEach(el => {
    if (!socials.length) { el.hidden = true; return; }
    el.innerHTML = socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('');
  });

  const form = $('#contactForm'), status = $('#formStatus');
  const say = (msg, state) => { status.textContent = msg; status.dataset.state = state; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(form));

    if (S.formEndpoint) {
      try {
        const res = await fetch(S.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
        if (!res.ok) throw new Error('bad response');
        say('Thank you. Your message has been sent.', 'ok');
        form.reset();
      } catch (err) {
        say(S.email ? `The message could not be sent. Please write to ${S.email} instead.` : 'The message could not be sent. Please try again in a moment.', 'err');
      }
      return;
    }

    if (S.email) {
      const subject = `${d.type} enquiry from ${d.name}`;
      const body = `Name: ${d.name}\nOrganisation: ${d.org || '-'}\nEmail: ${d.email}\nTopic: ${d.type}\n\n${d.message}`;
      location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say(`Your email app should open with the message ready to send. If nothing happens, write to ${S.email}.`, 'ok');
      return;
    }

    say('This form is not connected to an inbox yet. Add an email address in content.js to switch it on.', 'err');
  });

  $('#year').textContent = new Date().getFullYear();
})();
