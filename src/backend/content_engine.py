"""
Content Engine: file parsing, feed fetching, and AI content generation.
"""
import re, json, random, textwrap
from datetime import datetime

# ── File Parsers ──────────────────────────────────────────────
def extract_text_from_pdf(file_bytes):
    """Extract text from PDF bytes using PyPDF2 or pdfplumber."""
    try:
        import pdfplumber, io
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            return '\n'.join(p.extract_text() or '' for p in pdf.pages)
    except ImportError:
        pass
    try:
        from PyPDF2 import PdfReader
        import io
        reader = PdfReader(io.BytesIO(file_bytes))
        return '\n'.join(p.extract_text() or '' for p in reader.pages)
    except ImportError:
        return '[PDF parsing libraries not installed. Install pdfplumber or PyPDF2]'

def extract_text_from_docx(file_bytes):
    try:
        from docx import Document
        import io
        doc = Document(io.BytesIO(file_bytes))
        return '\n'.join(p.text for p in doc.paragraphs)
    except ImportError:
        return '[python-docx not installed. Run: pip install python-docx]'

def extract_text_from_pptx(file_bytes):
    try:
        from pptx import Presentation
        import io
        prs = Presentation(io.BytesIO(file_bytes))
        texts = []
        for slide in prs.slides:
            for shape in slide.shapes:
                if shape.has_text_frame:
                    texts.append(shape.text)
        return '\n'.join(texts)
    except ImportError:
        return '[python-pptx not installed. Run: pip install python-pptx]'

# ── Feed Fetchers ─────────────────────────────────────────────
def fetch_feed(url, feed_type):
    """Fetch items from an external feed. Returns list of {title, body, link}."""
    import urllib.request
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'CyberArcade/1.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
    except Exception as e:
        return [{'title': 'Feed Error', 'body': str(e), 'link': url}]

    if feed_type == 'nist':
        return _parse_nist_json(data)
    else:
        return _parse_rss(data)

def _parse_rss(data):
    import xml.etree.ElementTree as ET
    items = []
    try:
        root = ET.fromstring(data)
        for item in root.iter('item'):
            t = item.findtext('title', '')
            d = item.findtext('description', '')
            l = item.findtext('link', '')
            items.append({'title': t, 'body': _strip_html(d)[:2000], 'link': l})
        if not items:
            for entry in root.iter('{http://www.w3.org/2005/Atom}entry'):
                t = entry.findtext('{http://www.w3.org/2005/Atom}title', '')
                d = entry.findtext('{http://www.w3.org/2005/Atom}summary', '')
                lnk = entry.find('{http://www.w3.org/2005/Atom}link')
                l = lnk.get('href','') if lnk is not None else ''
                items.append({'title': t, 'body': _strip_html(d)[:2000], 'link': l})
    except Exception:
        pass
    return items[:10]

def _parse_nist_json(data):
    items = []
    try:
        obj = json.loads(data)
        for vuln in obj.get('vulnerabilities', [])[:10]:
            cve = vuln.get('cve', {})
            cid = cve.get('id', '')
            descs = cve.get('descriptions', [])
            desc = next((d['value'] for d in descs if d.get('lang') == 'en'), '')
            items.append({'title': cid, 'body': desc[:2000], 'link': f'https://nvd.nist.gov/vuln/detail/{cid}'})
    except Exception:
        pass
    return items

def _strip_html(text):
    return re.sub(r'<[^>]+>', '', text or '')

# ── Content Generation Engine ─────────────────────────────────
# These generators work locally without requiring external AI APIs.
# They use rule-based templates for deterministic, instant output.

CATEGORIES = ['phishing','ransomware','social_engineering','password_security','data_privacy','zero_day_threats']

def categorize_content(text):
    """Auto-categorize content into one of the 6 threat categories."""
    text_lower = text.lower()
    scores = {}
    kw = {
        'phishing': ['phishing','spear','email','bec','credential','harvest','lure','click'],
        'ransomware': ['ransomware','encrypt','ransom','lockbit','conti','decrypt','extort'],
        'social_engineering': ['social engineer','pretext','vishing','tailgat','impersonat','manipulat'],
        'password_security': ['password','credential','brute','mfa','2fa','authenticat','token'],
        'data_privacy': ['privacy','gdpr','pii','data breach','compliance','hipaa','leak'],
        'zero_day_threats': ['zero.day','0-day','exploit','vulnerability','cve','patch','buffer'],
    }
    for cat, words in kw.items():
        scores[cat] = sum(1 for w in words if w in text_lower)
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else 'general'

def simplify_for_tone(text, tone):
    """Rewrite content summary for a specific audience tone."""
    short = text[:500]
    if tone == 'child':
        return f"🛡️ Hey kids! Here's something important about staying safe online:\n\n{_childify(short)}\n\n💡 Remember: Always ask a grown-up if something online feels weird!"
    elif tone == 'college':
        return f"📚 Academic Analysis:\n\n{short}\n\nKey Takeaway: This topic intersects with information security principles including the CIA triad. Consider how institutional policies address this threat vector."
    elif tone == 'business':
        return f"📊 Business Impact Brief:\n\n{short}\n\n⚠️ Risk Level: Medium-High\n💰 Potential Impact: Operational disruption, regulatory fines\n✅ Action Required: Review organizational policies and employee training."
    elif tone == 'technical':
        return f"🔧 Technical Analysis:\n\n{short}\n\n🔍 IOCs to monitor: Check SIEM logs for anomalous patterns.\n🛡️ Mitigations: Apply defense-in-depth, update WAF rules, enable enhanced logging."
    return short

def _childify(text):
    replacements = [
        ('vulnerability','weak spot'),('exploit','trick'),('malware','bad software'),
        ('credential','password'),('authentication','login check'),('encryption','secret code'),
        ('unauthorized','not allowed'),('compromise','break into'),('exfiltrate','steal'),
    ]
    result = text
    for old, new in replacements:
        result = re.sub(old, new, result, flags=re.IGNORECASE)
    return result

def generate_micro_learning(title, text):
    cat = categorize_content(text)
    short = text[:300]
    return {
        'type': 'micro_learning',
        'title': f'⚡ Quick Learn: {title}',
        'body': json.dumps({
            'duration': '2-3 minutes',
            'category': cat,
            'objective': f'Understand the basics of {title}',
            'key_points': [s.strip()+'.' for s in short.split('.')[:3] if s.strip()],
            'action_item': f'Review your organization\'s policy on {cat.replace("_"," ")}.',
            'quiz': _make_quiz(title, cat)
        }, indent=2)
    }

def generate_infographic(title, text):
    cat = categorize_content(text)
    points = [s.strip() for s in text.split('.')[:5] if len(s.strip()) > 10]
    return {
        'type': 'infographic',
        'title': f'📊 Infographic: {title}',
        'body': json.dumps({
            'headline': title,
            'category': cat,
            'icon': _cat_icon(cat),
            'stats': [{'label': f'Point {i+1}', 'value': p[:80]} for i,p in enumerate(points)],
            'color_scheme': _cat_colors(cat),
            'footer': f'Source: CyberArcade Awareness Platform | Category: {cat.replace("_"," ").title()}'
        }, indent=2)
    }

def generate_poster(title, text):
    cat = categorize_content(text)
    return {
        'type': 'poster',
        'title': f'🖼️ Poster: {title}',
        'body': json.dumps({
            'headline': title[:60],
            'tagline': _poster_tagline(cat),
            'category': cat,
            'visual_style': 'social_media',
            'dimensions': '1080x1080',
            'key_message': text[:150],
            'call_to_action': f'Learn more about {cat.replace("_"," ")} at CyberArcade',
            'color_scheme': _cat_colors(cat)
        }, indent=2)
    }

def generate_explainer_script(title, text):
    cat = categorize_content(text)
    short = text[:400]
    return {
        'type': 'explainer_script',
        'title': f'🎬 Explainer: {title}',
        'body': json.dumps({
            'duration': '60-90 seconds',
            'script': {
                'intro': f'[NARRATOR] Today we\'re talking about {title}. This is something everyone should know about.',
                'body': f'[NARRATOR] {short}',
                'conclusion': f'[NARRATOR] Remember - staying safe online is everyone\'s responsibility. Keep learning at CyberArcade!',
            },
            'visual_notes': ['Title card with animated shield icon', f'Animated diagram of {cat.replace("_"," ")}', 'Key points appear as bullet list', 'End card with CyberArcade logo']
        }, indent=2)
    }

def generate_quiz_questions(title, text):
    cat = categorize_content(text)
    return {
        'type': 'quiz',
        'title': f'❓ Quiz: {title}',
        'body': json.dumps({
            'category': cat,
            'questions': _make_quiz_set(title, cat, text)
        }, indent=2)
    }

def generate_scenario_simulation(title, text):
    cat = categorize_content(text)
    return {
        'type': 'scenario',
        'title': f'🎯 Scenario: {title}',
        'body': json.dumps({
            'category': cat,
            'scenario': _make_scenario(cat),
            'difficulty': 'intermediate'
        }, indent=2)
    }

def generate_video_storyboard(title, text):
    cat = categorize_content(text)
    return {
        'type': 'video_storyboard',
        'title': f'🎥 Video: {title}',
        'body': json.dumps({
            'duration': '2-3 minutes',
            'scenes': [
                {'scene': 1, 'visual': 'Animated title card', 'narration': f'Welcome to CyberArcade\'s awareness video on {title}.', 'duration': '10s'},
                {'scene': 2, 'visual': f'Diagram showing {cat.replace("_"," ")} attack flow', 'narration': text[:200], 'duration': '30s'},
                {'scene': 3, 'visual': 'Warning signs checklist animation', 'narration': f'Here are the key warning signs to watch for regarding {cat.replace("_"," ")}.', 'duration': '25s'},
                {'scene': 4, 'visual': 'Protection tips with icons', 'narration': 'Follow these steps to protect yourself and your organization.', 'duration': '25s'},
                {'scene': 5, 'visual': 'End card with CyberArcade branding', 'narration': 'Stay safe, stay aware. Visit CyberArcade for more!', 'duration': '10s'},
            ]
        }, indent=2)
    }

def generate_comic(title, text):
    cat = categorize_content(text)
    return {
        'type': 'comic',
        'title': f'📖 Comic: {title}',
        'body': json.dumps({
            'panels': [
                {'panel': 1, 'character': '🦸 Cyber Hero', 'dialogue': f'Oh no! I see a {cat.replace("_"," ")} attack happening!', 'scene': 'Hero at computer'},
                {'panel': 2, 'character': '🦹 Villain', 'dialogue': _villain_line(cat), 'scene': 'Dark figure behind screen'},
                {'panel': 3, 'character': '🦸 Cyber Hero', 'dialogue': f'Not so fast! I know how to handle {cat.replace("_"," ")}!', 'scene': 'Hero activating shield'},
                {'panel': 4, 'character': '🦸 Cyber Hero', 'dialogue': _hero_tip(cat), 'scene': 'Hero teaching friends'},
                {'panel': 5, 'character': '👨‍👩‍👧‍👦 Everyone', 'dialogue': 'Thanks Cyber Hero! Now we know how to stay safe!', 'scene': 'Happy ending'},
            ],
            'style': 'child_friendly',
            'age_group': '6-12'
        }, indent=2)
    }

def generate_executive_dashboard(title, text):
    cat = categorize_content(text)
    return {
        'type': 'executive_dashboard',
        'title': f'📈 Executive Summary: {title}',
        'body': json.dumps({
            'threat_category': cat.replace('_',' ').title(),
            'risk_level': random.choice(['High','Medium','Critical']),
            'summary': text[:200],
            'metrics': {
                'threats_detected': random.randint(10,500),
                'employees_trained': f'{random.randint(60,98)}%',
                'incidents_this_quarter': random.randint(0,15),
                'avg_response_time': f'{random.randint(5,45)} min'
            },
            'recommendations': [
                f'Update {cat.replace("_"," ")} training materials',
                'Schedule quarterly awareness refresher',
                'Review incident response procedures'
            ],
            'trend': random.choice(['increasing','stable','decreasing'])
        }, indent=2)
    }

# ── Helpers ───────────────────────────────────────────────────
def _cat_icon(cat):
    icons = {'phishing':'🎣','ransomware':'🔒','social_engineering':'🎭','password_security':'🔑','data_privacy':'🛡️','zero_day_threats':'⚡'}
    return icons.get(cat, '🔐')

def _cat_colors(cat):
    colors = {
        'phishing':['#ff6b6b','#ee5a24'],
        'ransomware':['#a55eea','#8854d0'],
        'social_engineering':['#fd9644','#e67e22'],
        'password_security':['#2bcbba','#0fb9b1'],
        'data_privacy':['#4b7bec','#3867d6'],
        'zero_day_threats':['#fc5c65','#eb3b5a'],
    }
    return colors.get(cat, ['#00ffff','#0080ff'])

def _poster_tagline(cat):
    tags = {
        'phishing':'Think Before You Click!',
        'ransomware':'Backup Today, Breathe Easy Tomorrow',
        'social_engineering':'Trust But Verify',
        'password_security':'Strong Passwords, Strong Defense',
        'data_privacy':'Your Data, Your Rules',
        'zero_day_threats':'Patch Now, Thank Yourself Later',
    }
    return tags.get(cat, 'Stay Cyber Safe!')

def _villain_line(cat):
    lines = {
        'phishing':'Hehe! Click my fake link and give me your secrets!',
        'ransomware':'I\'ll lock all your files unless you pay me!',
        'social_engineering':'I\'ll pretend to be your friend to steal your info!',
        'password_security':'Your password is so easy, I guessed it in 1 second!',
        'data_privacy':'I\'m collecting all your personal data without you knowing!',
        'zero_day_threats':'I found a secret bug nobody knows about yet!',
    }
    return lines.get(cat, 'I\'ll hack into everything!')

def _hero_tip(cat):
    tips = {
        'phishing':'Always check the sender and hover over links before clicking!',
        'ransomware':'Keep backups of your important files and update your software!',
        'social_engineering':'Never share personal info with strangers, even if they seem nice!',
        'password_security':'Use long passwords with letters, numbers and symbols!',
        'data_privacy':'Check app permissions and don\'t share more than you need to!',
        'zero_day_threats':'Always install updates - they fix secret bugs!',
    }
    return tips.get(cat, 'Stay alert and ask a grown-up if something seems wrong!')

def _make_quiz(title, cat):
    return {'question': f'What is the best defense against {cat.replace("_"," ")}?',
            'options': ['Ignore it','Learn about it and stay alert','Turn off your computer','Tell nobody'],
            'correct': 1}

def _make_quiz_set(title, cat, text):
    return [
        _make_quiz(title, cat),
        {'question': f'Which category does "{title}" belong to?',
         'options': ['Phishing','Ransomware','Social Engineering','Password Security'],
         'correct': CATEGORIES.index(cat) if cat in CATEGORIES[:4] else 0},
        {'question': 'What should you do if you suspect a cyber threat?',
         'options': ['Ignore it','Report to IT/security team immediately','Delete everything','Share on social media'],
         'correct': 1},
    ]

def _make_scenario(cat):
    scenarios = {
        'phishing': {'situation':'You receive an urgent email from "IT Support" asking you to verify your password.','choices':['Click the link','Report to IT security','Reply with password','Forward to colleagues'],'correct':1,'explanation':'Never click credential links in email. Report to IT.'},
        'ransomware': {'situation':'Your screen shows a message saying all files are encrypted and demands Bitcoin payment.','choices':['Pay the ransom','Disconnect from network and contact IT','Try to hack back','Restart computer'],'correct':1,'explanation':'Isolate the system and contact incident response immediately.'},
        'social_engineering': {'situation':'Someone calls claiming to be from tech support needing remote access to fix your computer.','choices':['Grant access','Hang up and verify through official channels','Ask for their employee ID only','Let them connect briefly'],'correct':1,'explanation':'Always verify through official channels. Legitimate support won\'t cold-call.'},
        'password_security': {'situation':'A colleague asks to borrow your login credentials to finish an urgent report.','choices':['Share credentials','Decline and suggest they contact IT for their own access','Give temporary password','Write it on a sticky note'],'correct':1,'explanation':'Never share credentials. Direct them to proper access channels.'},
        'data_privacy': {'situation':'You find a USB drive in the parking lot with your company\'s logo on it.','choices':['Plug it into your computer','Turn it in to security/IT without plugging it in','Check files on a personal device','Throw it away'],'correct':1,'explanation':'Unknown USB drives may contain malware. Always turn in to security.'},
        'zero_day_threats': {'situation':'You receive an urgent patch notification for critical software during a busy project deadline.','choices':['Postpone until after deadline','Apply the patch immediately','Ignore the notification','Wait for IT to do it'],'correct':1,'explanation':'Critical patches fix active exploits. Apply immediately to prevent compromise.'},
    }
    return scenarios.get(cat, scenarios['phishing'])
