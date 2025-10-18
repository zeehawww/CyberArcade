#!/usr/bin/env python3
"""
CyberArcade - A Modern Cybersecurity Learning Platform
Backend server for the web-based gaming platform
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import random
from datetime import datetime, timedelta
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Database setup
def init_db():
    """Initialize the SQLite database"""
    conn = sqlite3.connect('cyberarcade.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            level INTEGER DEFAULT 1,
            points INTEGER DEFAULT 0,
            badges INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            total_time INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Achievements table
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
    
    # Game sessions table
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
    
    # Learning progress table
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
    conn.close()

# Initialize database on startup
init_db()

# Game data and logic
class GameManager:
    def __init__(self):
        self.snake_ladder_data = self.load_snake_ladder_data()
        self.crossword_data = self.load_crossword_data()
        self.escape_room_data = self.load_escape_room_data()
        self.phishing_data = self.load_phishing_data()
        self.caesar_cipher_data = self.load_caesar_cipher_data()
    
    def load_snake_ladder_data(self):
        """Load Snake & Ladder game data"""
        return {
            "snakes": {27: 5, 40: 3, 43: 18, 54: 38, 66: 45, 76: 58, 89: 53, 99: 41},
            "ladders": {4: 25, 13: 46, 42: 63, 33: 49, 50: 69, 62: 81, 74: 92},
            "questions": {
                "What is a firewall?": {
                    "options": ["A type of malware", "A system designed to prevent unauthorized access", "A type of virus", "A kind of router"],
                    "correct": 1
                },
                "What is phishing?": {
                    "options": ["A method to trick people into giving away sensitive information", "A way to clean your computer", "A form of encryption", "A type of malware"],
                    "correct": 0
                },
                "What is ransomware?": {
                    "options": ["A firewall", "A form of encryption", "A type of malware that encrypts files and demands payment", "A type of malware"],
                    "correct": 2
                },
                "What is a VPN?": {
                    "options": ["A network that allows private communication over the internet", "A type of malware", "A firewall", "A kind of router"],
                    "correct": 0
                }
            },
            "hints": [
                "Always use strong, unique passwords for different accounts 💪🔐",
                "Keep your software updated to prevent security vulnerabilities ⚡🛡️",
                "Never share sensitive information through insecure channels like email 📧🚫",
                "Always enable two-factor authentication when available 🔑📱",
                "There are many types of encryption, one of them is caesar cipher!"
            ]
        }
    
    def load_crossword_data(self):
        """Load Crossword game data"""
        return {
            "grid": [
                ["M", "A", "L", "W", "A", "R", "E", None, None],
                ["F", "I", "R", "E", "W", "A", "L", "L", None],
                ["P", "H", "I", "S", "H", None, None, None, None],
                [None, None, None, "T", None, None, None, None, None],
                [None, None, None, "O", None, None, None, None, None],
                [None, None, None, "R", None, None, None, None, None],
                [None, None, None, "A", None, None, None, None, None],
                [None, None, None, "G", None, None, None, None, None],
                [None, None, None, "E", None, None, None, None, None],
            ],
            "clues": {
                "across": [
                    (0, 0, "Malicious software that harms or disrupts a system", 7),
                    (1, 0, "A security system that monitors and controls network traffic", 8),
                    (2, 0, "A type of cyberattack where someone pretends to be a trusted entity to steal sensitive information", 5),
                ],
                "down": [
                    (0, 3, "Avoid saving your _______ in browsers to prevent unauthorized access", 7),
                ]
            }
        }
    
    def load_escape_room_data(self):
        """Load Escape Room game data"""
        return [
            {
                "question": "Which of these is the strongest password?",
                "options": ["password123", "Qwerty!234", "M@xS3cUrE#89", "iloveyou"],
                "answer": 2
            },
            {
                "question": "Decode this: What is 01001000 01101001 in ASCII?",
                "options": ["Hello", "Hi", "Bye", "Hacker"],
                "answer": 1
            },
            {
                "question": "Which website is the most secure?",
                "options": ["http://bank-login.com", "https://secure-bank.com", "www.freeloans.net", "http://official-site.org"],
                "answer": 1
            },
            {
                "question": "What should you NOT do when receiving a suspicious email?",
                "options": ["Click on the link", "Check the sender address", "Report it as phishing", "Verify with the company"],
                "answer": 0
            },
            {
                "question": "What is the safest way to create a password?",
                "options": ["Use your pet's name", "Use a combination of letters, numbers, and symbols", "Use your birthdate", "Keep it simple and easy to remember"],
                "answer": 1
            },
            {
                "question": "What does HTTPS stand for?",
                "options": ["HyperText Transfer Protocol Secure", "HyperTransfer Protocol Secure", "HyperLink Transfer Protocol Secure", "None of the above"],
                "answer": 0
            },
            {
                "question": "Which of these is a sign of a phishing email?",
                "options": ["The sender's email address looks unusual", "The email asks for personal details", "The email contains grammatical errors", "All of the above"],
                "answer": 3
            },
            {
                "question": "What is the purpose of a VPN?",
                "options": ["To increase internet speed", "To browse securely and privately", "To access blocked websites", "To play games online"],
                "answer": 1
            },
            {
                "question": "What should you do if you receive an unexpected email asking for personal information?",
                "options": ["Ignore it", "Click on the link to see if it's legit", "Call the company directly to verify", "Respond with the requested information"],
                "answer": 2
            },
            {
                "question": "Why is it important to use unique passwords for each account?",
                "options": ["To prevent one breach from affecting all accounts", "It's not necessary", "It's easier to remember", "To comply with regulations"],
                "answer": 0
            }
        ]
    
    def load_phishing_data(self):
        """Load Phishing game data"""
        return [
            {
                "text": "Your PayPal account has been locked! Click here to restore access: http://paypal-secure-login.com",
                "is_phishing": True,
                "explanation": "Suspicious domain and urgent language are red flags"
            },
            {
                "text": "Your Amazon order has been shipped. Track it here: https://amazon.com/track",
                "is_phishing": False,
                "explanation": "Legitimate domain and normal language"
            },
            {
                "text": "You've won a $500 gift card! Click to claim: http://freegiftcards.com",
                "is_phishing": True,
                "explanation": "Too good to be true offer with suspicious link"
            },
            {
                "text": "Reminder: Your Zoom meeting is scheduled for 3 PM. Join here: https://zoom.us/j/123456789",
                "is_phishing": False,
                "explanation": "Legitimate Zoom domain and normal meeting reminder"
            },
            {
                "text": "URGENT: Your bank account will be closed! Verify now: http://bank-security-verify.com",
                "is_phishing": True,
                "explanation": "Urgent language, suspicious domain, and pressure tactics"
            }
        ]
    
    def load_caesar_cipher_data(self):
        """Load Caesar Cipher game data"""
        return [
            {
                "message": "Hello World",
                "shift": 3,
                "answer": "Khoor Zruog"
            },
            {
                "message": "Cyber Security",
                "shift": 5,
                "answer": "Hdgjw Xjhwytw"
            },
            {
                "message": "Password Protection",
                "shift": 7,
                "answer": "Whzzduk Wyvjvjapvu"
            },
            {
                "message": "Data Encryption",
                "shift": 4,
                "answer": "Hexe Irgvctxmrk"
            },
            {
                "message": "Network Security",
                "shift": 2,
                "answer": "Pgyvqwt Ugetarvka"
            }
        ]

# Initialize game manager
game_manager = GameManager()

# Routes
@app.route('/')
def index():
    """Serve the main application"""
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    if filename.endswith(('.css', '.js')):
        return send_from_directory('../frontend', filename)
    return send_from_directory('.', filename)

# API Routes
@app.route('/api/game/<game_type>', methods=['GET'])
def get_game_data(game_type):
    """Get game data for a specific game type"""
    if game_type == 'snake-ladder':
        return jsonify(game_manager.snake_ladder_data)
    elif game_type == 'crossword':
        return jsonify(game_manager.crossword_data)
    elif game_type == 'escape-room':
        return jsonify(game_manager.escape_room_data)
    elif game_type == 'phishing-detective':
        return jsonify(game_manager.phishing_data)
    elif game_type == 'caesar-cipher':
        return jsonify(game_manager.caesar_cipher_data)
    else:
        return jsonify({"error": "Game type not found"}), 404

@app.route('/api/game/<game_type>/submit', methods=['POST'])
def submit_game_result(game_type):
    """Submit game results and update user progress"""
    data = request.get_json()
    
    # For now, we'll use a default user ID (in a real app, this would come from authentication)
    user_id = 1
    
    # Calculate points based on game type and performance
    points = calculate_points(game_type, data)
    
    # Update user progress in database
    conn = sqlite3.connect('cyberarcade.db')
    cursor = conn.cursor()
    
    # Update user points
    cursor.execute('UPDATE users SET points = points + ? WHERE id = ?', (points, user_id))
    
    # Record game session
    cursor.execute('''
        INSERT INTO game_sessions (user_id, game_type, score, duration)
        VALUES (?, ?, ?, ?)
    ''', (user_id, game_type, data.get('score', 0), data.get('duration', 0)))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        "success": True,
        "points_earned": points,
        "total_points": get_user_points(user_id)
    })

@app.route('/api/user/progress', methods=['GET'])
def get_user_progress():
    """Get user progress data"""
    user_id = 1  # Default user for demo
    
    conn = sqlite3.connect('cyberarcade.db')
    cursor = conn.cursor()
    
    # Get user data
    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    
    if not user:
        # Create default user
        cursor.execute('''
            INSERT INTO users (username, email, password_hash, level, points, badges, streak, total_time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', ('demo_user', 'demo@cyberarcade.com', 'demo_hash', 1, 0, 0, 0, 0))
        conn.commit()
        user = (1, 'demo_user', 'demo@cyberarcade.com', 'demo_hash', 1, 0, 0, 0, 0, datetime.now())
    
    # Get achievements
    cursor.execute('SELECT * FROM achievements WHERE user_id = ?', (user_id,))
    achievements = cursor.fetchall()
    
    # Get recent game sessions
    cursor.execute('''
        SELECT game_type, score, completed_at 
        FROM game_sessions 
        WHERE user_id = ? 
        ORDER BY completed_at DESC 
        LIMIT 10
    ''', (user_id,))
    recent_games = cursor.fetchall()
    
    conn.close()
    
    return jsonify({
        "user": {
            "id": user[0],
            "username": user[1],
            "level": user[4],
            "points": user[5],
            "badges": user[6],
            "streak": user[7],
            "total_time": user[8]
        },
        "achievements": [{"id": a[2], "title": a[3], "description": a[4]} for a in achievements],
        "recent_games": [{"game_type": g[0], "score": g[1], "completed_at": g[2]} for g in recent_games]
    })

@app.route('/api/learning/<module_id>', methods=['GET'])
def get_learning_module(module_id):
    """Get learning module content"""
    modules = {
        'passwords': {
            'title': 'Password Security',
            'content': {
                'lessons': [
                    {
                        'title': 'What Makes a Strong Password?',
                        'content': 'Learn the essential elements of creating secure passwords that protect your accounts.',
                        'interactive': 'password_checker'
                    },
                    {
                        'title': 'Password Managers',
                        'content': 'Discover how password managers can help you maintain strong, unique passwords for all your accounts.',
                        'interactive': 'password_manager_demo'
                    }
                ]
            }
        },
        'phishing': {
            'title': 'Phishing Recognition',
            'content': {
                'lessons': [
                    {
                        'title': 'Identifying Phishing Emails',
                        'content': 'Learn to spot the telltale signs of phishing attempts in your email inbox.',
                        'interactive': 'email_analyzer'
                    },
                    {
                        'title': 'Common Phishing Tactics',
                        'content': 'Understand the psychological tricks used by cybercriminals to trick victims.',
                        'interactive': 'tactics_quiz'
                    }
                ]
            }
        },
        'browsing': {
            'title': 'Secure Browsing',
            'content': {
                'lessons': [
                    {
                        'title': 'HTTPS and Website Security',
                        'content': 'Learn how to identify secure websites and protect your browsing data.',
                        'interactive': 'website_checker'
                    },
                    {
                        'title': 'Safe Download Practices',
                        'content': 'Understand how to safely download files and avoid malicious software.',
                        'interactive': 'download_simulator'
                    }
                ]
            }
        },
        'encryption': {
            'title': 'Encryption Basics',
            'content': {
                'lessons': [
                    {
                        'title': 'Understanding Encryption',
                        'content': 'Learn how encryption works to protect your data and communications.',
                        'interactive': 'encryption_demo'
                    },
                    {
                        'title': 'Caesar Cipher',
                        'content': 'Explore one of the oldest encryption methods and understand its principles.',
                        'interactive': 'caesar_cipher_tool'
                    }
                ]
            }
        }
    }
    
    return jsonify(modules.get(module_id, {"error": "Module not found"}))

@app.route('/api/learning/<module_id>/progress', methods=['POST'])
def update_learning_progress(module_id):
    """Update learning module progress"""
    data = request.get_json()
    user_id = 1  # Default user for demo
    
    conn = sqlite3.connect('cyberarcade.db')
    cursor = conn.cursor()
    
    # Update or insert learning progress
    cursor.execute('''
        INSERT OR REPLACE INTO learning_progress (user_id, module_id, progress_percentage, last_accessed)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ''', (user_id, module_id, data.get('progress', 0)))
    
    conn.commit()
    conn.close()
    
    return jsonify({"success": True})

# Helper functions
def calculate_points(game_type, data):
    """Calculate points based on game performance"""
    base_points = {
        'snake-ladder': 50,
        'crossword': 30,
        'escape-room': 100,
        'phishing-detective': 40,
        'caesar-cipher': 60,
        'password-checker': 20
    }
    
    score = data.get('score', 0)
    duration = data.get('duration', 0)
    
    # Base points for completing the game
    points = base_points.get(game_type, 20)
    
    # Bonus points for high score
    if score > 80:
        points += 50
    elif score > 60:
        points += 30
    elif score > 40:
        points += 20
    
    # Bonus points for quick completion
    if duration < 300:  # Less than 5 minutes
        points += 25
    elif duration < 600:  # Less than 10 minutes
        points += 15
    
    return points

def get_user_points(user_id):
    """Get user's total points"""
    conn = sqlite3.connect('cyberarcade.db')
    cursor = conn.cursor()
    cursor.execute('SELECT points FROM users WHERE id = ?', (user_id,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else 0

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("🚀 Starting CyberArcade Server...")
    print("📚 Cybersecurity Learning Platform")
    print("🎮 Gaming + Learning Integration")
    print("🌐 Server running at http://localhost:8080")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=8080)
