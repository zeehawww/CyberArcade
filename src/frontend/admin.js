/* ── CyberArcade Admin Panel JS ── */
const API = '/api/content';
let allContent = [];

// ── Tab Navigation ───────────────────────────────────────────
document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        switchTab(item.dataset.tab);
    });
});

function switchTab(tab) {
    document.querySelectorAll('.nav-item[data-tab]').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    const tabContent = document.getElementById(`tab-${tab}`);
    if (navItem) navItem.classList.add('active');
    if (tabContent) tabContent.classList.add('active');
    const titles = {dashboard:'Dashboard',content:'Content Manager',upload:'File Upload',feeds:'API Feeds',generate:'AI Content Engine',visual:'Visual Engine'};
    document.getElementById('pageTitle').textContent = titles[tab] || tab;
    if (tab === 'generate') populateContentSelect('genContentSelect');
    if (tab === 'visual') populateContentSelect('visContentSelect');
    if (tab === 'feeds') loadFeeds();
    if (tab === 'content') loadContent();
    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

// ── Toast ────────────────────────────────────────────────────
function toast(msg, type='success') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<i class="fas fa-${type==='success'?'check-circle':type==='error'?'exclamation-circle':'info-circle'}"></i> ${msg}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// ── Content CRUD ─────────────────────────────────────────────
async function loadContent() {
    try {
        const res = await fetch(`${API}/list`);
        const data = await res.json();
        allContent = data.items || [];
        renderContentList('contentList', allContent, true);
        renderContentList('recentContent', allContent.slice(0, 5), false);
        document.getElementById('statContent').textContent = allContent.length;
    } catch(e) { console.error(e); }
}

function renderContentList(elId, items, showDelete) {
    const el = document.getElementById(elId);
    if (!items.length) { el.innerHTML = '<p style="color:var(--text2);padding:1rem;">No content yet. Create or upload content to get started.</p>'; return; }
    el.innerHTML = items.map(item => `
        <div class="content-item">
            <span class="cat-badge cat-${item.category}">${(item.category||'general').replace('_',' ')}</span>
            <div class="ci-info">
                <h4>${esc(item.title)}</h4>
                <small>${item.source || 'manual'} · ${timeAgo(item.created_at)}</small>
            </div>
            <div class="ci-actions">
                <button class="btn btn-sm" onclick="viewContent(${item.id})" title="View"><i class="fas fa-eye"></i></button>
                ${showDelete ? `<button class="btn btn-sm" onclick="deleteContent(${item.id})" title="Delete"><i class="fas fa-trash"></i></button>` : ''}
            </div>
        </div>
    `).join('');
}

async function createContent(e) {
    e.preventDefault();
    const title = document.getElementById('contentTitle').value.trim();
    const body = document.getElementById('contentBody').value.trim();
    if (!title || !body) return;
    try {
        const res = await fetch(`${API}/create`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,body})});
        const data = await res.json();
        if (data.success) {
            toast(`Content saved! Auto-categorized as: ${data.category.replace('_',' ')}`);
            document.getElementById('contentForm').reset();
            loadContent();
        } else toast(data.error, 'error');
    } catch(e) { toast('Failed to save','error'); }
}

async function deleteContent(id) {
    if (!confirm('Delete this content and all generated assets?')) return;
    await fetch(`${API}/${id}`, {method:'DELETE'});
    toast('Deleted');
    loadContent();
}

async function viewContent(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const data = await res.json();
        if (!data.success) return;
        const item = data.item;
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:2rem;';
        modal.innerHTML = `<div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;max-width:700px;width:100%;max-height:80vh;overflow-y:auto;padding:2rem;">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:1rem;">
                <div><h2 style="margin-bottom:.25rem;">${esc(item.title)}</h2><span class="cat-badge cat-${item.category}">${(item.category||'').replace('_',' ')}</span> <small style="color:var(--text2);margin-left:.5rem;">${item.source} · ${item.file_type||''}</small></div>
                <button onclick="this.closest('div[style]').remove()" style="background:none;border:none;color:var(--text);font-size:1.5rem;cursor:pointer;">×</button>
            </div>
            <pre style="background:var(--bg);padding:1rem;border-radius:8px;font-size:.85rem;white-space:pre-wrap;max-height:50vh;overflow-y:auto;color:var(--text2);">${esc(item.body)}</pre>
        </div>`;
        modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
        document.body.appendChild(modal);
    } catch(e) { toast('Failed to load','error'); }
}

// ── File Upload ──────────────────────────────────────────────
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');

if (uploadZone) {
    ['dragenter','dragover'].forEach(ev => uploadZone.addEventListener(ev, e => { e.preventDefault(); uploadZone.classList.add('drag-over'); }));
    ['dragleave','drop'].forEach(ev => uploadZone.addEventListener(ev, e => { e.preventDefault(); uploadZone.classList.remove('drag-over'); }));
    uploadZone.addEventListener('drop', e => { if (e.dataTransfer.files.length) uploadFile(e.dataTransfer.files[0]); });
}
if (fileInput) fileInput.addEventListener('change', () => { if (fileInput.files.length) uploadFile(fileInput.files[0]); });

async function uploadFile(file) {
    const status = document.getElementById('uploadStatus');
    status.style.display = 'block';
    status.className = 'upload-status';
    status.innerHTML = '<span class="spinner"></span> Uploading and extracting text...';
    const fd = new FormData();
    fd.append('file', file);
    try {
        const res = await fetch(`${API}/upload`, {method:'POST', body:fd});
        const data = await res.json();
        if (data.success) {
            status.className = 'upload-status success';
            status.innerHTML = `<i class="fas fa-check-circle"></i> <strong>${file.name}</strong> uploaded successfully! Extracted ${data.text_length} chars. Category: <strong>${data.category.replace('_',' ')}</strong>`;
            toast('File uploaded & processed!');
            loadContent();
        } else {
            status.className = 'upload-status error';
            status.innerHTML = `<i class="fas fa-times-circle"></i> ${data.error}`;
        }
    } catch(e) {
        status.className = 'upload-status error';
        status.innerHTML = '<i class="fas fa-times-circle"></i> Upload failed';
    }
}

// ── Feeds ────────────────────────────────────────────────────
async function loadFeeds() {
    try {
        const res = await fetch(`${API}/feeds`);
        const data = await res.json();
        const feeds = data.feeds || [];
        document.getElementById('statFeeds').textContent = feeds.filter(f=>f.enabled).length;
        const el = document.getElementById('feedsList');
        const icons = {cisa:'fa-shield-alt',nist:'fa-database',hackernews:'fa-newspaper',owasp:'fa-spider',rss:'fa-rss'};
        const colors = {cisa:'#3b82f6',nist:'#10b981',hackernews:'#ef4444',owasp:'#8b5cf6',rss:'#f59e0b'};
        el.innerHTML = feeds.map(f => `
            <div class="feed-item">
                <div class="feed-icon" style="background:${colors[f.feed_type]||'#666'}20;color:${colors[f.feed_type]||'#666'}"><i class="fas ${icons[f.feed_type]||'fa-rss'}"></i></div>
                <div class="feed-info"><h4>${esc(f.name)}</h4><p>${esc(f.url)}</p></div>
                <div class="feed-actions">
                    <label class="toggle-switch"><input type="checkbox" ${f.enabled?'checked':''} onchange="toggleFeed(${f.id},this.checked)"><span class="toggle-slider"></span></label>
                    <button class="btn btn-sm" onclick="fetchFeed(${f.id})" title="Fetch"><i class="fas fa-download"></i></button>
                    <button class="btn btn-sm" onclick="deleteFeed(${f.id})" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    } catch(e) { console.error(e); }
}

async function toggleFeed(id, enabled) {
    await fetch(`${API}/feeds/${id}`, {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({enabled:enabled?1:0})});
    toast(enabled?'Feed enabled':'Feed disabled','info');
}

async function fetchFeed(id) {
    toast('Fetching feed...','info');
    const res = await fetch(`${API}/feeds/${id}/fetch`, {method:'POST'});
    const data = await res.json();
    if (data.success) { toast(`Imported ${data.imported} items`); loadContent(); }
    else toast(data.error||'Failed','error');
}

async function fetchAllFeeds() {
    toast('Fetching all feeds...','info');
    const res = await fetch(`${API}/feeds/fetch-all`, {method:'POST'});
    const data = await res.json();
    if (data.success) { toast(`Imported ${data.imported} items from all feeds`); loadContent(); }
    else toast('Failed','error');
}

async function addFeed(e) {
    e.preventDefault();
    const name = document.getElementById('feedName').value.trim();
    const url = document.getElementById('feedUrl').value.trim();
    const feed_type = document.getElementById('feedType').value;
    await fetch(`${API}/feeds`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,url,feed_type})});
    toast('Feed added');
    document.getElementById('feedForm').reset();
    loadFeeds();
}

async function deleteFeed(id) {
    if (!confirm('Remove this feed?')) return;
    await fetch(`${API}/feeds/${id}`, {method:'DELETE'});
    toast('Feed removed');
    loadFeeds();
}

// ── Content Generation ───────────────────────────────────────
function populateContentSelect(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const val = sel.value;
    sel.innerHTML = '<option value="">-- Choose content --</option>';
    allContent.forEach(c => {
        sel.innerHTML += `<option value="${c.id}">${esc(c.title)} [${(c.category||'').replace('_',' ')}]</option>`;
    });
    if (val) sel.value = val;
}

function loadContentPreview() {
    const cid = document.getElementById('genContentSelect').value;
    const preview = document.getElementById('genPreview');
    const actions = document.getElementById('genActions');
    if (!cid) { preview.style.display='none'; actions.style.display='none'; return; }
    const item = allContent.find(c => c.id == cid);
    if (!item) return;
    preview.style.display = 'block';
    actions.style.display = 'block';
    preview.innerHTML = `<h4>${esc(item.title)}</h4><p style="color:var(--text2);font-size:.85rem;">${esc((item.body||'').substring(0,300))}...</p>`;
}

function loadVisPreview() {
    const cid = document.getElementById('visContentSelect').value;
    const preview = document.getElementById('visPreview');
    const actions = document.getElementById('visActions');
    if (!cid) { preview.style.display='none'; actions.style.display='none'; return; }
    const item = allContent.find(c => c.id == cid);
    if (!item) return;
    preview.style.display = 'block';
    actions.style.display = 'block';
    preview.innerHTML = `<h4>${esc(item.title)}</h4><p style="color:var(--text2);font-size:.85rem;">${esc((item.body||'').substring(0,300))}...</p>`;
}

async function simplifyContent(tone) {
    const cid = document.getElementById('genContentSelect').value;
    if (!cid) return toast('Select content first','error');
    toast('Generating...','info');
    const res = await fetch(`${API}/${cid}/simplify/${tone}`, {method:'POST'});
    const data = await res.json();
    if (data.success) {
        showGenResult({type:`simplified_${tone}`,title:`${tone.charAt(0).toUpperCase()+tone.slice(1)} Version`,body:data.text}, 'genResults','genOutput');
        toast(`${tone} version generated!`);
    } else toast(data.error||'Failed','error');
}

async function generateType(type, target) {
    const selectId = target === 'vis' ? 'visContentSelect' : 'genContentSelect';
    const resultsId = target === 'vis' ? 'visResults' : 'genResults';
    const outputId = target === 'vis' ? 'visOutput' : 'genOutput';
    const cid = document.getElementById(selectId).value;
    if (!cid) return toast('Select content first','error');
    toast('Generating...','info');
    const res = await fetch(`${API}/${cid}/generate/${type}`, {method:'POST'});
    const data = await res.json();
    if (data.success) {
        showGenResult(data.result, resultsId, outputId);
        toast(`${type.replace('_',' ')} generated!`);
    } else toast(data.error||'Failed','error');
}

async function generateAll() {
    const cid = document.getElementById('genContentSelect').value;
    if (!cid) return toast('Select content first','error');
    toast('Generating all types...','info');
    const res = await fetch(`${API}/${cid}/generate-all`, {method:'POST'});
    const data = await res.json();
    if (data.success) {
        const el = document.getElementById('genOutput');
        const container = document.getElementById('genResults');
        container.style.display = 'block';
        el.innerHTML = data.results.map(r => `
            <div class="gen-output-item">
                <h4>${esc(r.title)}</h4>
                <small style="color:var(--text2);">Type: ${r.type}</small>
            </div>
        `).join('');
        toast(`Generated ${data.results.length} assets!`);
        loadGenerated(cid);
    } else toast('Failed','error');
}

function showGenResult(result, resultsId, outputId) {
    const container = document.getElementById(resultsId);
    const el = document.getElementById(outputId);
    container.style.display = 'block';
    el.innerHTML = `<div class="gen-output-item" style="border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:1rem;">${renderAdminAsset(result)}</div>` + el.innerHTML;
}

function renderAdminAsset(result) {
    let body;
    try { body = JSON.parse(result.body); } catch(e) { body = result.body; }
    const type = result.type || '';
    const title = esc(result.title || type);
    const e = esc; // alias

    if (type === 'infographic' && typeof body === 'object') {
        const colors = body.color_scheme || ['#00d4ff','#0080ff'];
        const stats = body.stats || [];
        return `<div style="background:linear-gradient(135deg,${colors[0]}15,${colors[1]}10);padding:1.5rem;">
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;"><span style="font-size:1.5rem;">${body.icon||'📊'}</span><h3 style="color:${colors[0]};margin:0;">${e(body.headline||title)}</h3></div>
            <div style="display:grid;gap:.5rem;">${stats.map((s,i)=>`<div style="padding:.6rem .75rem;background:rgba(0,0,0,0.15);border-radius:8px;border-left:3px solid ${colors[i%2]};"><span style="color:${colors[0]};font-size:.75rem;font-weight:600;">${e(s.label)}</span><p style="color:var(--text2);font-size:.85rem;margin:.2rem 0 0;line-height:1.4;">${e(s.value)}</p></div>`).join('')}</div>
            <p style="color:var(--text2);font-size:.7rem;margin-top:.75rem;opacity:.7;">${e(body.footer||'')}</p></div>`;
    }
    if (type === 'poster' && typeof body === 'object') {
        const colors = body.color_scheme || ['#ff6b6b','#ee5a24'];
        const catIcons = {phishing:'🎣',ransomware:'🔒',social_engineering:'🎭',password_security:'🔑',data_privacy:'🛡️',zero_day_threats:'⚡'};
        return `<div style="background:linear-gradient(135deg,${colors[0]},${colors[1]});padding:2.5rem;text-align:center;min-height:280px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
            <div style="font-size:3rem;margin-bottom:.75rem;">${catIcons[body.category]||'🛡️'}</div>
            <h3 style="color:#fff;font-size:1.4rem;margin-bottom:.5rem;text-shadow:0 2px 8px rgba(0,0,0,0.3);">${e(body.headline||title)}</h3>
            <p style="color:rgba(255,255,255,0.95);font-size:1.15rem;font-weight:700;margin-bottom:.75rem;font-style:italic;">"${e(body.tagline||'')}"</p>
            <p style="color:rgba(255,255,255,0.85);font-size:.9rem;max-width:400px;line-height:1.5;">${e(body.key_message||'')}</p>
            <div style="margin-top:1rem;padding:.4rem 1.2rem;background:rgba(0,0,0,0.25);border-radius:20px;color:rgba(255,255,255,0.9);font-size:.8rem;">${e(body.call_to_action||'')}</div></div>`;
    }
    if (type === 'comic' && typeof body === 'object') {
        const panels = body.panels || [];
        return `<div style="padding:1.5rem;">
            <h3 style="color:#fbbf24;margin-bottom:1rem;">📖 ${e(title)}</h3>
            <div style="display:grid;gap:.75rem;">${panels.map((p,i)=>`<div style="display:flex;gap:.75rem;padding:.75rem;background:${i%2===0?'rgba(251,191,36,0.08)':'rgba(124,58,237,0.08)'};border-radius:10px;">
                <div style="font-size:1.5rem;flex-shrink:0;">${e(p.character).split(' ')[0]}</div>
                <div><div style="color:var(--text);font-size:.85rem;font-weight:600;margin-bottom:.15rem;">${e(p.character)}</div>
                <p style="color:var(--text2);font-size:.85rem;margin:0;line-height:1.4;font-style:italic;">"${e(p.dialogue)}"</p>
                <p style="color:var(--text2);font-size:.72rem;margin-top:.15rem;opacity:.6;">${e(p.scene)}</p></div></div>`).join('')}</div>
            <div style="text-align:center;margin-top:.75rem;color:var(--text2);font-size:.75rem;">For ages ${body.age_group||'6-12'}</div></div>`;
    }
    if (type === 'video_storyboard' && typeof body === 'object') {
        const scenes = body.scenes || [];
        return `<div style="padding:1.5rem;">
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;"><span style="font-size:1.3rem;">🎥</span><h3 style="color:#a78bfa;margin:0;">${e(title)}</h3></div>
            <div style="color:var(--text2);font-size:.8rem;margin-bottom:1rem;">Duration: ${body.duration||'2-3 min'}</div>
            <div style="position:relative;padding-left:1.5rem;">
                <div style="position:absolute;left:.45rem;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#a78bfa,#7c3aed);border-radius:1px;"></div>
                ${scenes.map(s=>`<div style="position:relative;margin-bottom:1rem;padding-left:1rem;">
                    <div style="position:absolute;left:-1.3rem;top:.3rem;width:12px;height:12px;background:#a78bfa;border-radius:50%;border:2px solid var(--bg);"></div>
                    <div style="color:#a78bfa;font-size:.75rem;font-weight:600;margin-bottom:.15rem;">Scene ${s.scene} • ${s.duration}</div>
                    <div style="color:var(--text);font-size:.85rem;margin-bottom:.15rem;">${e(s.visual)}</div>
                    <p style="color:var(--text2);font-size:.8rem;line-height:1.4;margin:0;font-style:italic;">${e(s.narration).slice(0,200)}</p></div>`).join('')}
            </div></div>`;
    }
    if (type === 'quiz' && typeof body === 'object') {
        const qs = body.questions || [];
        return `<div style="padding:1.5rem;">
            <h3 style="color:#10b981;margin-bottom:1rem;">❓ ${e(title)}</h3>
            ${qs.map((q,i)=>`<div style="margin-bottom:.75rem;padding:.75rem;background:rgba(16,185,129,0.06);border-radius:10px;border:1px solid rgba(16,185,129,0.15);">
                <p style="color:var(--text);font-size:.9rem;margin-bottom:.5rem;font-weight:500;">Q${i+1}. ${e(q.question)}</p>
                <div style="display:grid;gap:.35rem;">${(q.options||[]).map((o,oi)=>`<div style="padding:.4rem .7rem;background:${oi===q.correct?'rgba(16,185,129,0.12)':'rgba(255,255,255,0.03)'};border:1px solid ${oi===q.correct?'#10b981':'rgba(255,255,255,0.08)'};border-radius:6px;color:${oi===q.correct?'#34d399':'var(--text2)'};font-size:.82rem;">${String.fromCharCode(65+oi)}. ${e(o)} ${oi===q.correct?'✓':''}</div>`).join('')}</div></div>`).join('')}</div>`;
    }
    if (type === 'scenario' && typeof body === 'object') {
        const sc = body.scenario || {};
        return `<div style="padding:1.5rem;">
            <h3 style="color:#f59e0b;margin-bottom:.75rem;">🎯 ${e(title)}</h3>
            <div style="padding:.75rem;background:rgba(245,158,11,0.08);border-radius:10px;border:1px solid rgba(245,158,11,0.15);margin-bottom:.75rem;">
                <p style="color:var(--text);font-size:.9rem;line-height:1.5;margin:0;">${e(sc.situation||'')}</p></div>
            <div style="display:grid;gap:.35rem;">${(sc.choices||[]).map((c,i)=>`<div style="padding:.5rem .75rem;background:${i===sc.correct?'rgba(16,185,129,0.12)':'rgba(255,255,255,0.03)'};border:1px solid ${i===sc.correct?'#10b981':'rgba(255,255,255,0.08)'};border-radius:6px;color:${i===sc.correct?'#34d399':'var(--text2)'};font-size:.85rem;">${String.fromCharCode(65+i)}. ${e(c)} ${i===sc.correct?'✓':''}</div>`).join('')}</div>
            ${sc.explanation?`<p style="color:var(--text2);font-size:.8rem;margin-top:.5rem;font-style:italic;">💡 ${e(sc.explanation)}</p>`:''}</div>`;
    }
    if (type === 'executive_dashboard' && typeof body === 'object') {
        const m = body.metrics || {};
        const riskColors = {Critical:'#ef4444',High:'#f59e0b',Medium:'#3b82f6',Low:'#10b981'};
        const rc = riskColors[body.risk_level]||'#3b82f6';
        return `<div style="padding:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                <h3 style="color:var(--primary);margin:0;">📈 ${e(body.threat_category||title)}</h3>
                <span style="padding:.3rem .75rem;background:${rc}22;border:1px solid ${rc};border-radius:20px;color:${rc};font-size:.75rem;font-weight:600;">${body.risk_level||'Medium'} Risk</span></div>
            <p style="color:var(--text2);font-size:.85rem;line-height:1.5;margin-bottom:1rem;">${e(body.summary||'')}</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem;">${Object.entries(m).map(([k,v])=>`<div style="padding:.6rem;background:rgba(0,0,0,0.15);border-radius:8px;text-align:center;"><div style="color:var(--primary);font-size:1.1rem;font-weight:700;">${e(String(v))}</div><div style="color:var(--text2);font-size:.7rem;">${e(k.replace(/_/g,' '))}</div></div>`).join('')}</div>
            ${(body.recommendations||[]).length?`<div style="border-top:1px solid var(--border);padding-top:.75rem;"><div style="color:var(--text2);font-size:.75rem;margin-bottom:.4rem;">Recommendations:</div>${body.recommendations.map(r=>`<div style="color:var(--text2);font-size:.8rem;padding:.15rem 0;">• ${e(r)}</div>`).join('')}</div>`:''}</div>`;
    }
    if (type === 'explainer_script' && typeof body === 'object') {
        const s = body.script || {};
        return `<div style="padding:1.5rem;">
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;"><span style="font-size:1.2rem;">🎬</span><h3 style="color:#ec4899;margin:0;">${e(title)}</h3></div>
            <div style="color:var(--text2);font-size:.78rem;margin-bottom:.75rem;">Duration: ${body.duration||'60-90 seconds'}</div>
            ${['intro','body','conclusion'].map(k=>s[k]?`<div style="padding:.6rem .75rem;background:rgba(236,72,153,0.06);border-radius:8px;margin-bottom:.5rem;border-left:2px solid #ec4899;"><p style="color:var(--text2);font-size:.85rem;line-height:1.5;margin:0;font-style:italic;">${e(s[k])}</p></div>`:'').join('')}
            ${(body.visual_notes||[]).length?`<div style="margin-top:.5rem;"><div style="color:var(--text2);font-size:.75rem;margin-bottom:.3rem;">Visual notes:</div>${body.visual_notes.map(n=>`<div style="color:var(--text2);font-size:.78rem;padding:.1rem 0;">🎞️ ${e(n)}</div>`).join('')}</div>`:''}</div>`;
    }
    if (type === 'micro_learning' && typeof body === 'object') {
        return `<div style="padding:1.5rem;">
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;"><span style="font-size:1.2rem;">⚡</span><h3 style="color:#fbbf24;margin:0;">${e(title)}</h3></div>
            <div style="display:flex;gap:.75rem;margin-bottom:.75rem;"><span style="color:var(--text2);font-size:.78rem;">⏱ ${body.duration||'2-3 min'}</span><span style="color:var(--text2);font-size:.78rem;">📂 ${(body.category||'').replace(/_/g,' ')}</span></div>
            <p style="color:var(--primary);font-size:.85rem;margin-bottom:.75rem;font-weight:500;">🎯 ${e(body.objective||'')}</p>
            ${(body.key_points||[]).map(p=>`<div style="padding:.4rem .6rem;background:rgba(251,191,36,0.06);border-radius:6px;margin-bottom:.35rem;border-left:2px solid #fbbf24;"><p style="color:var(--text2);font-size:.83rem;line-height:1.4;margin:0;">${e(p)}</p></div>`).join('')}
            <p style="color:#10b981;font-size:.82rem;margin-top:.75rem;">✅ ${e(body.action_item||'')}</p></div>`;
    }
    // Fallback: tone conversions or unknown types
    let bodyDisplay = typeof body === 'string' ? body : JSON.stringify(body, null, 2);
    return `<div style="padding:1.5rem;"><h4 style="margin-bottom:.5rem;">${e(title)}</h4><p style="color:var(--text2);font-size:.88rem;white-space:pre-wrap;line-height:1.6;">${e(bodyDisplay).slice(0,1500)}</p></div>`;
}

async function loadGenerated(cid) {
    try {
        const res = await fetch(`${API}/${cid}/generated`);
        const data = await res.json();
        document.getElementById('statGenerated').textContent = (data.items||[]).length;
    } catch(e) {}
}

// ── Helpers ──────────────────────────────────────────────────
function esc(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
}

// ── Init ─────────────────────────────────────────────────────
loadContent();
loadFeeds();
