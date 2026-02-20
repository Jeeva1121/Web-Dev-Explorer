document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('sb-nav');
  const content = document.getElementById('content');
  const topT = document.getElementById('topbar-t');
  const search = document.getElementById('search');
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function buildNav() {
    let h = '';
    DATA.forEach((group, gi) => {
      const dc = group.type === 'html' ? 'dot-h' : 'dot-c';
      h += `<div class="nav-g" data-gi="${gi}">${group.title}</div>`;
      h += `<div class="nav-items" data-gi="${gi}">`;
      group.items.forEach(item => {
        h += `<button class="nav-i" data-t="${group.type}" data-id="${item.id}"><span class="dot ${dc}"></span>${esc(item.label)}</button>`;
      });
      h += '</div>';
    });
    nav.innerHTML = h;
  }

  function findItem(type, id) {
    for (const g of DATA) {
      if (g.type !== type) continue;
      const found = g.items.find(i => i.id === id);
      if (found) return found;
    }
    return null;
  }

  function show(item, type) {
    topT.textContent = item.label;
    sidebar.classList.remove('open');
    const ov = document.getElementById('sidebar-overlay');
    if (ov) ov.classList.remove('active');
    const bc = type === 'html' ? 'html' : 'css';
    const bt = type === 'html' ? 'HTML Tag' : 'CSS Property';
    content.innerHTML = `
    <div class="det">
      <div class="det-top">
        <div class="det-title">
          <span class="badge ${bc}">${bt}</span>
          <h2 class="det-name">${item.name}</h2>
        </div>
        <div class="det-tabs">
          <button class="det-tab active" id="tab-info">Overview</button>
          <button class="det-tab" id="tab-code">Code & Preview</button>
        </div>
      </div>
      
      <div id="view-info" class="det-view active">
        <div class="info-g">
          <article class="info-c"><h3 class="c-b">What is it?</h3><p>${item.def}</p></article>
          <article class="info-c"><h3 class="c-g">Why use it?</h3><p>${item.why}</p></article>
          <article class="info-c full"><h3 class="c-p">Where is it used?</h3><p>${item.where}</p></article>
        </div>
        ${item.props ? `
        <div class="info-props">
          <h3 class="c-p">Properties & Attributes</h3>
          <div class="props-table-wrap">
            <table class="props-table">
              <thead><tr><th>Property / Attribute</th><th>Function</th></tr></thead>
              <tbody>
                ${item.props.map(p => `<tr><td><code>${esc(p.name)}</code></td><td>${p.desc}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        ` : ''}
        <div class="syn"><div class="syn-h">Syntax</div><pre class="syn-c">${esc(item.syntax)}</pre></div>
      </div>

      <div id="view-code" class="det-view">
        <div class="editor-grid">
          <div class="ed-col">
            <div class="ed-card">
              <div class="ed-pane-h">HTML</div>
              <textarea id="ed-html" spellcheck="false">${esc(item.html)}</textarea>
            </div>
            <div class="ed-card">
              <div class="ed-pane-h">CSS</div>
              <textarea id="ed-css" spellcheck="false">${esc(item.css)}</textarea>
            </div>
          </div>
          <div class="ed-col">
            <div class="ed-card prev-card">
              <div class="ed-pane-h prev-h">
                <span>Result</span>
                <span class="ed-lbl">Live Preview</span>
              </div>
              <iframe id="ed-frame" title="Preview"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    const eH = document.getElementById('ed-html');
    const eC = document.getElementById('ed-css');
    const fr = document.getElementById('ed-frame');
    const upd = () => {
      const d = fr.contentDocument || fr.contentWindow.document;
      d.open();
      d.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Inter",system-ui,sans-serif;padding:24px;color:#1e293b;line-height:1.6}' + eC.value + '</style></head><body>' + eH.value + '</body></html>');
      d.close();
    };
    upd();
    eH.addEventListener('input', upd);
    eC.addEventListener('input', upd);

    document.getElementById('tab-info').addEventListener('click', () => {
      document.getElementById('tab-info').classList.add('active');
      document.getElementById('tab-code').classList.remove('active');
      document.getElementById('view-info').classList.add('active');
      document.getElementById('view-code').classList.remove('active');
    });

    document.getElementById('tab-code').addEventListener('click', () => {
      document.getElementById('tab-code').classList.add('active');
      document.getElementById('tab-info').classList.remove('active');
      document.getElementById('view-code').classList.add('active');
      document.getElementById('view-info').classList.remove('active');
    });
  }

  nav.addEventListener('click', e => {
    const b = e.target.closest('.nav-i');
    if (!b) return;
    nav.querySelectorAll('.nav-i').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const item = findItem(b.dataset.t, b.dataset.id);
    if (item) show(item, b.dataset.t);
  });

  search.addEventListener('input', e => {
    const t = e.target.value.toLowerCase();
    nav.querySelectorAll('.nav-i').forEach(b => { b.style.display = b.textContent.toLowerCase().includes(t) ? '' : 'none'; });
  });

  const overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  menuBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close sidebar when clicking the overlay (anywhere outside sidebar)
  overlay.addEventListener('click', closeSidebar);

  buildNav();
});
