"""
Database layer: SQLite (default) or PostgreSQL.
Set USE_POSTGRES=1 and POSTGRES_* env vars to use PostgreSQL.
"""

import os
import sqlite3

# PostgreSQL: set USE_POSTGRES=1 and POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE
USE_POSTGRES = os.environ.get('USE_POSTGRES', '').strip().lower() in ('1', 'true', 'yes')

if USE_POSTGRES:
    try:
        import psycopg2
        from psycopg2.extras import RealDictCursor
    except ImportError:
        raise ImportError('PostgreSQL requested but psycopg2 not installed. Run: pip install psycopg2-binary')

def get_conn():
    """Return a DB connection (SQLite or PostgreSQL). Returns tuple rows like SQLite."""
    if USE_POSTGRES:
        import psycopg2
        return psycopg2.connect(
            host=os.environ.get('POSTGRES_HOST', 'localhost'),
            port=int(os.environ.get('POSTGRES_PORT', '5432')),
            user=os.environ.get('POSTGRES_USER', 'postgres'),
            password=os.environ.get('POSTGRES_PASSWORD', ''),
            database=os.environ.get('POSTGRES_DATABASE', 'cyberarcade'),
        )
    return sqlite3.connect('cyberarcade.db')

def placeholder():
    """Return the param placeholder for the current DB (? for SQLite, %s for PostgreSQL)."""
    return '%s' if USE_POSTGRES else '?'

def adapt_sql(sql):
    """Convert ? placeholders to %s for PostgreSQL."""
    return sql.replace('?', '%s') if USE_POSTGRES else sql

def init_db():
    """Create tables and seed demo user. Use SQLite or PostgreSQL based on config."""
    conn = get_conn()
    try:
        if USE_POSTGRES:
            _init_postgres(conn)
        else:
            _init_sqlite(conn)
        _seed_demo_if_empty(conn)
    finally:
        conn.close()


def _seed_demo_if_empty(conn):
    """Insert demo users if no users exist."""
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] > 0:
        conn.commit()
        return
    
    # Create demo users for each type: School, College, Corporate, IT Team
    demo_users = [
        ('school1', 'school@cyberarcade.com', 'demo_hash', 'school', 1, 0, 0, 0, 0),
        ('college1', 'college@cyberarcade.com', 'demo_hash', 'college', 1, 0, 0, 0, 0),
        ('corporate1', 'corporate@cyberarcade.com', 'demo_hash', 'corporate', 1, 0, 0, 0, 0),
        ('itteam1', 'itteam@cyberarcade.com', 'demo_hash', 'it_team', 1, 0, 0, 0, 0),
    ]
    
    p = placeholder()
    for user_data in demo_users:
        cursor.execute(f'''
            INSERT INTO users (username, email, password_hash, user_type, level, points, badges, streak, total_time)
            VALUES ({p}, {p}, {p}, {p}, {p}, {p}, {p}, {p}, {p})
        ''', user_data)
    conn.commit()

def _init_sqlite(conn):
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            user_type TEXT NOT NULL DEFAULT 'student',
            level INTEGER DEFAULT 1,
            points INTEGER DEFAULT 0,
            badges INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            total_time INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            achievement_id TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS game_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            game_type TEXT NOT NULL,
            score INTEGER DEFAULT 0,
            duration INTEGER DEFAULT 0,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS learning_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            module_id TEXT NOT NULL,
            progress_percentage INTEGER DEFAULT 0,
            last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    conn.commit()

def _init_postgres(conn):
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            user_type VARCHAR(50) NOT NULL DEFAULT 'student',
            level INTEGER DEFAULT 1,
            points INTEGER DEFAULT 0,
            badges INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            total_time INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS achievements (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            achievement_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS game_sessions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            game_type VARCHAR(255) NOT NULL,
            score INTEGER DEFAULT 0,
            duration INTEGER DEFAULT 0,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS learning_progress (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            module_id VARCHAR(255) NOT NULL,
            progress_percentage INTEGER DEFAULT 0,
            last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, module_id)
        )
    ''')
    conn.commit()

def execute(conn, sql, params=None, fetch_one=False, fetch_all=False, commit=False):
    """Run SQL with ? placeholders; params are adapted for PostgreSQL. Returns tuples like SQLite."""
    params = params or ()
    sql = adapt_sql(sql)
    cursor = conn.cursor()
    cursor.execute(sql, params)
    if commit:
        conn.commit()
    if fetch_one:
        return cursor.fetchone()
    if fetch_all:
        return cursor.fetchall()
    return None


def upsert_learning_progress(conn, user_id, module_id, progress_percentage):
    """Insert or update learning_progress (SQLite: DELETE+INSERT; PostgreSQL: ON CONFLICT UPDATE)."""
    if USE_POSTGRES:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO learning_progress (user_id, module_id, progress_percentage, last_accessed)
            VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id, module_id) 
            DO UPDATE SET progress_percentage = %s, last_accessed = CURRENT_TIMESTAMP
        ''', (user_id, module_id, progress_percentage, progress_percentage))
        conn.commit()
    else:
        cursor = conn.cursor()
        cursor.execute(
            'DELETE FROM learning_progress WHERE user_id = ? AND module_id = ?',
            (user_id, module_id)
        )
        cursor.execute('''
            INSERT INTO learning_progress (user_id, module_id, progress_percentage, last_accessed)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ''', (user_id, module_id, progress_percentage))
        conn.commit()
