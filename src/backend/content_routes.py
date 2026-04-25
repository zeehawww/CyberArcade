"""
Flask blueprint: /api/content/* routes for admin content management.
"""
from flask import Blueprint, request, jsonify
from . import content_db as cdb
from . import content_engine as ce
import json, os

content_bp = Blueprint('content', __name__, url_prefix='/api/content')

# ── Manual Content Entry ──────────────────────────────────────
@content_bp.route('/create', methods=['POST'])
def create_content():
    data = request.get_json()
    title = data.get('title','').strip()
    body = data.get('body','').strip()
    if not title or not body:
        return jsonify({'success':False,'error':'Title and body required'}), 400
    category = ce.categorize_content(body)
    cid = cdb.add_content(title, body, source='manual', category=category)
    return jsonify({'success':True,'id':cid,'category':category})

@content_bp.route('/list', methods=['GET'])
def list_content():
    return jsonify({'success':True,'items':cdb.get_all_content()})

@content_bp.route('/<int:cid>', methods=['GET'])
def get_content(cid):
    item = cdb.get_content(cid)
    if not item:
        return jsonify({'success':False,'error':'Not found'}), 404
    return jsonify({'success':True,'item':item})

@content_bp.route('/<int:cid>', methods=['DELETE'])
def delete_content(cid):
    cdb.delete_content(cid)
    return jsonify({'success':True})

# ── File Upload ───────────────────────────────────────────────
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@content_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'success':False,'error':'No file provided'}), 400
    f = request.files['file']
    fname = f.filename or ''
    ext = fname.rsplit('.',1)[-1].lower() if '.' in fname else ''
    if ext not in ('pdf','docx','pptx'):
        return jsonify({'success':False,'error':'Only PDF, DOCX, PPT files accepted'}), 400

    file_bytes = f.read()
    if ext == 'pdf':
        text = ce.extract_text_from_pdf(file_bytes)
    elif ext == 'docx':
        text = ce.extract_text_from_docx(file_bytes)
    elif ext == 'pptx':
        text = ce.extract_text_from_pptx(file_bytes)
    else:
        text = ''

    title = fname.rsplit('.',1)[0] if '.' in fname else fname
    category = ce.categorize_content(text)
    cid = cdb.add_content(title, text, source='upload', category=category, file_type=ext)
    return jsonify({'success':True,'id':cid,'category':category,'text_length':len(text)})

# ── Feed Management ───────────────────────────────────────────
@content_bp.route('/feeds', methods=['GET'])
def list_feeds():
    return jsonify({'success':True,'feeds':cdb.get_feeds()})

@content_bp.route('/feeds', methods=['POST'])
def add_feed():
    data = request.get_json()
    cdb.add_feed(data.get('name',''), data.get('url',''), data.get('feed_type','rss'))
    return jsonify({'success':True})

@content_bp.route('/feeds/<int:fid>', methods=['PUT'])
def update_feed(fid):
    data = request.get_json()
    cdb.update_feed(fid, data.get('enabled', 1))
    return jsonify({'success':True})

@content_bp.route('/feeds/<int:fid>', methods=['DELETE'])
def delete_feed(fid):
    cdb.delete_feed(fid)
    return jsonify({'success':True})

@content_bp.route('/feeds/<int:fid>/fetch', methods=['POST'])
def fetch_feed(fid):
    feeds = cdb.get_feeds()
    feed = next((f for f in feeds if f['id'] == fid), None)
    if not feed:
        return jsonify({'success':False,'error':'Feed not found'}), 404
    items = ce.fetch_feed(feed['url'], feed['feed_type'])
    imported = 0
    for item in items[:10]:
        cat = ce.categorize_content(item['body'])
        cdb.add_content(item['title'], item['body'], source=feed['name'], category=cat)
        imported += 1
    return jsonify({'success':True,'imported':imported,'items':items})

@content_bp.route('/feeds/fetch-all', methods=['POST'])
def fetch_all_feeds():
    feeds = cdb.get_feeds()
    total = 0
    for feed in feeds:
        if not feed.get('enabled'):
            continue
        items = ce.fetch_feed(feed['url'], feed['feed_type'])
        for item in items[:5]:
            cat = ce.categorize_content(item['body'])
            cdb.add_content(item['title'], item['body'], source=feed['name'], category=cat)
            total += 1
    return jsonify({'success':True,'imported':total})

# ── Content Generation ────────────────────────────────────────
GENERATORS = {
    'micro_learning': ce.generate_micro_learning,
    'infographic': ce.generate_infographic,
    'poster': ce.generate_poster,
    'explainer_script': ce.generate_explainer_script,
    'quiz': ce.generate_quiz_questions,
    'scenario': ce.generate_scenario_simulation,
    'video_storyboard': ce.generate_video_storyboard,
    'comic': ce.generate_comic,
    'executive_dashboard': ce.generate_executive_dashboard,
}

@content_bp.route('/<int:cid>/generate/<gen_type>', methods=['POST'])
def generate(cid, gen_type):
    if gen_type not in GENERATORS:
        return jsonify({'success':False,'error':f'Unknown type: {gen_type}'}), 400
    item = cdb.get_content(cid)
    if not item:
        return jsonify({'success':False,'error':'Content not found'}), 404
    result = GENERATORS[gen_type](item['title'], item['body'])
    gid = cdb.save_generated(cid, result['type'], result['title'], result['body'])
    return jsonify({'success':True,'id':gid,'result':result})

@content_bp.route('/<int:cid>/generate-all', methods=['POST'])
def generate_all(cid):
    item = cdb.get_content(cid)
    if not item:
        return jsonify({'success':False,'error':'Content not found'}), 404
    results = []
    for gen_type, gen_fn in GENERATORS.items():
        result = gen_fn(item['title'], item['body'])
        gid = cdb.save_generated(cid, result['type'], result['title'], result['body'])
        results.append({'id':gid, 'type':result['type'], 'title':result['title']})
    return jsonify({'success':True,'results':results})

@content_bp.route('/<int:cid>/generated', methods=['GET'])
def list_generated(cid):
    return jsonify({'success':True,'items':cdb.get_generated(cid)})

@content_bp.route('/generated', methods=['GET'])
def list_all_generated():
    try:
        limit = int(request.args.get('limit', 60))
    except (TypeError, ValueError):
        limit = 60
    limit = max(1, min(limit, 300))
    all_items = cdb.get_generated()
    items = all_items[:limit]

    content_title_map = {c['id']: c['title'] for c in cdb.get_all_content()}
    for item in items:
        item['content_title'] = content_title_map.get(item.get('content_id'), 'Unknown Content')

    summary = {}
    for item in all_items:
        gt = item.get('gen_type', 'unknown')
        summary[gt] = summary.get(gt, 0) + 1

    return jsonify({
        'success': True,
        'items': items,
        'summary': summary,
        'total': len(all_items),
    })

# ── Tone Conversion ───────────────────────────────────────────
@content_bp.route('/<int:cid>/simplify/<tone>', methods=['POST'])
def simplify(cid, tone):
    if tone not in ('child','college','business','technical'):
        return jsonify({'success':False,'error':'Tone must be child/college/business/technical'}), 400
    item = cdb.get_content(cid)
    if not item:
        return jsonify({'success':False,'error':'Not found'}), 404
    result = ce.simplify_for_tone(item['body'], tone)
    gid = cdb.save_generated(cid, f'simplified_{tone}', f'{item["title"]} ({tone})', result)
    return jsonify({'success':True,'id':gid,'text':result})
