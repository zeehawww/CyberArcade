"""
Database schema and helpers for the Content Input Module.
Tables: cms_content, cms_feeds, cms_generated
"""
import os, sqlite3, json
from datetime import datetime

DB_PATH = 'cyberarcade.db'

def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_content_tables():
    conn = get_conn()
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cms_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        source TEXT DEFAULT 'manual',
        category TEXT DEFAULT 'general',
        tone TEXT DEFAULT 'original',
        file_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS cms_feeds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        feed_type TEXT NOT NULL,
        enabled INTEGER DEFAULT 1,
        last_fetched TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS cms_generated (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_id INTEGER,
        gen_type TEXT NOT NULL,
        title TEXT,
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (content_id) REFERENCES cms_content(id)
    )''')
    # Seed default feeds if empty
    c.execute('SELECT COUNT(*) FROM cms_feeds')
    if c.fetchone()[0] == 0:
        feeds = [
            ('CISA Alerts','https://www.cisa.gov/news.xml','cisa'),
            ('NIST NVD','https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=5','nist'),
            ('The Hacker News','https://feeds.feedburner.com/TheHackersNews','hackernews'),
            ('OWASP News','https://owasp.org/feed.xml','owasp'),
        ]
        for name, url, ft in feeds:
            c.execute('INSERT INTO cms_feeds (name,url,feed_type) VALUES (?,?,?)', (name,url,ft))
    conn.commit()
    conn.close()

# --- CRUD helpers ---
def add_content(title, body, source='manual', category='general', tone='original', file_type=None):
    conn = get_conn()
    c = conn.cursor()
    c.execute('INSERT INTO cms_content (title,body,source,category,tone,file_type) VALUES (?,?,?,?,?,?)',
              (title, body, source, category, tone, file_type))
    conn.commit()
    cid = c.lastrowid
    conn.close()
    return cid

def get_all_content():
    conn = get_conn()
    rows = conn.execute('SELECT * FROM cms_content ORDER BY created_at DESC').fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_content(cid):
    conn = get_conn()
    row = conn.execute('SELECT * FROM cms_content WHERE id=?', (cid,)).fetchone()
    conn.close()
    return dict(row) if row else None

def delete_content(cid):
    conn = get_conn()
    conn.execute('DELETE FROM cms_content WHERE id=?', (cid,))
    conn.execute('DELETE FROM cms_generated WHERE content_id=?', (cid,))
    conn.commit()
    conn.close()

def get_feeds():
    conn = get_conn()
    rows = conn.execute('SELECT * FROM cms_feeds ORDER BY id').fetchall()
    conn.close()
    return [dict(r) for r in rows]

def update_feed(fid, enabled):
    conn = get_conn()
    conn.execute('UPDATE cms_feeds SET enabled=? WHERE id=?', (enabled, fid))
    conn.commit()
    conn.close()

def add_feed(name, url, feed_type):
    conn = get_conn()
    conn.execute('INSERT INTO cms_feeds (name,url,feed_type) VALUES (?,?,?)', (name,url,feed_type))
    conn.commit()
    conn.close()

def delete_feed(fid):
    conn = get_conn()
    conn.execute('DELETE FROM cms_feeds WHERE id=?', (fid,))
    conn.commit()
    conn.close()

def save_generated(content_id, gen_type, title, body):
    conn = get_conn()
    c = conn.cursor()
    c.execute('INSERT INTO cms_generated (content_id,gen_type,title,body) VALUES (?,?,?,?)',
              (content_id, gen_type, title, body))
    conn.commit()
    gid = c.lastrowid
    conn.close()
    return gid

def get_generated(content_id=None):
    conn = get_conn()
    if content_id:
        rows = conn.execute('SELECT * FROM cms_generated WHERE content_id=? ORDER BY created_at DESC', (content_id,)).fetchall()
    else:
        rows = conn.execute('SELECT * FROM cms_generated ORDER BY created_at DESC').fetchall()
    conn.close()
    return [dict(r) for r in rows]
