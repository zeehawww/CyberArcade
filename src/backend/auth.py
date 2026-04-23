"""
Authentication and user management.
Supports login, registration, and user type-based access (school, college, corporate, it_team).
"""

from flask import request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import os

def register_user(username, email, password, user_type='school'):
    """Register a new user. Returns (success, user_id or error_message)."""
    conn = db.get_conn()
    try:
        cursor = conn.cursor()
        # Check if username or email exists
        sql = 'SELECT id FROM users WHERE username = %s OR email = %s' if db.USE_POSTGRES else 'SELECT id FROM users WHERE username = ? OR email = ?'
        cursor.execute(sql, (username, email))
        if cursor.fetchone():
            return False, 'Username or email already exists'
        
        password_hash = generate_password_hash(password)
        if db.USE_POSTGRES:
            cursor.execute('''
                INSERT INTO users (username, email, password_hash, user_type, level, points, badges, streak, total_time)
                VALUES (%s, %s, %s, %s, 1, 0, 0, 0, 0)
                RETURNING id
            ''', (username, email, password_hash, user_type))
            user_id = cursor.fetchone()[0]
        else:
            cursor.execute('''
                INSERT INTO users (username, email, password_hash, user_type, level, points, badges, streak, total_time)
                VALUES (?, ?, ?, ?, 1, 0, 0, 0, 0)
            ''', (username, email, password_hash, user_type))
            user_id = cursor.lastrowid
        conn.commit()
        return True, user_id
    except Exception as e:
        return False, str(e)
    finally:
        conn.close()

def login_user(username_or_email, password):
    """Authenticate user. Returns (success, user_data or error_message)."""
    conn = db.get_conn()
    try:
        cursor = conn.cursor()
        sql = 'SELECT * FROM users WHERE username = %s OR email = %s' if db.USE_POSTGRES else 'SELECT * FROM users WHERE username = ? OR email = ?'
        cursor.execute(sql, (username_or_email, username_or_email))
        user = cursor.fetchone()
        if not user:
            return False, 'User not found'
        
        if not check_password_hash(user[3], password):  # password_hash is index 3
            return False, 'Invalid password'
        
        # Return user data: id, username, email, user_type, level, points, badges, streak
        return True, {
            'id': user[0],
            'username': user[1],
            'email': user[2],
            'user_type': user[4] if len(user) > 4 else 'school',
            'level': user[5] if len(user) > 5 else 1,
            'points': user[6] if len(user) > 6 else 0,
            'badges': user[7] if len(user) > 7 else 0,
            'streak': user[8] if len(user) > 8 else 0,
        }
    except Exception as e:
        return False, str(e)
    finally:
        conn.close()

def get_user_by_id(user_id):
    """Get user data by ID."""
    conn = db.get_conn()
    try:
        cursor = conn.cursor()
        sql = 'SELECT id, username, email, user_type, level, points, badges, streak FROM users WHERE id = %s' if db.USE_POSTGRES else 'SELECT id, username, email, user_type, level, points, badges, streak FROM users WHERE id = ?'
        cursor.execute(sql, (user_id,))
        user = cursor.fetchone()
        if not user:
            return None
        return {
            'id': user[0],
            'username': user[1],
            'email': user[2],
            'user_type': user[3],
            'level': user[4],
            'points': user[5],
            'badges': user[6],
            'streak': user[7],
        }
    finally:
        conn.close()
