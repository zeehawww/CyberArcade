#!/usr/bin/env python3
"""
CyberArcade - A Modern Cybersecurity Learning Platform
Backend server for the web-based gaming platform
"""

from flask import Flask, render_template, request, jsonify, send_from_directory, session
from flask_cors import CORS
import json
import os
import random
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

from .integrations import integrations_bp
from . import db
from . import auth
from .awareness_modules import STUDENT_AWARENESS, DIGITAL_CITIZEN_AWARENESS, ITPRO_AWARENESS

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
CORS(app, supports_credentials=True)
app.register_blueprint(integrations_bp)

# Initialize database on startup (SQLite or PostgreSQL from env)
db.init_db()

# Auth routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    user_type = data.get('user_type', 'student')
    
    if not username or not email or not password:
        return jsonify({"success": False, "error": "Username, email, and password required"}), 400
    
    if user_type not in ['student', 'digital_citizen', 'itpro', 'parent']:
        return jsonify({"success": False, "error": "Invalid user type"}), 400
    
    success, result = auth.register_user(username, email, password, user_type)
    if success:
        session['user_id'] = result
        return jsonify({"success": True, "user_id": result})
    return jsonify({"success": False, "error": result}), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    data = request.get_json()
    username_or_email = data.get('username', '').strip()
    password = data.get('password', '')
    
    if not username_or_email or not password:
        return jsonify({"success": False, "error": "Username/email and password required"}), 400
    
    success, result = auth.login_user(username_or_email, password)
    if success:
        session['user_id'] = result['id']
        session['user_type'] = result['user_type']
        return jsonify({"success": True, "user": result})
    return jsonify({"success": False, "error": result}), 401

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """Logout user"""
    session.clear()
    return jsonify({"success": True})

@app.route('/api/auth/me', methods=['GET'])
def get_current_user():
    """Get current logged-in user"""
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "error": "Not logged in"}), 401
    
    user = auth.get_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "error": "User not found"}), 404
    
    return jsonify({"success": True, "user": user})

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
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "error": "Not logged in"}), 401
    
    # Calculate points based on game type and performance
    points = calculate_points(game_type, data)
    
    # Update user progress in database
    conn = db.get_conn()
    try:
        db.execute(conn, 'UPDATE users SET points = points + ? WHERE id = ?', (points, user_id), commit=True)
        db.execute(conn, '''
            INSERT INTO game_sessions (user_id, game_type, score, duration)
            VALUES (?, ?, ?, ?)
        ''', (user_id, game_type, data.get('score', 0), data.get('duration', 0)), commit=True)
    finally:
        conn.close()
    
    return jsonify({
        "success": True,
        "points_earned": points,
        "total_points": get_user_points(user_id)
    })

@app.route('/api/user/progress', methods=['GET'])
def get_user_progress():
    """Get user progress data"""
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "error": "Not logged in"}), 401
    
    conn = db.get_conn()
    try:
        user = db.execute(conn, 'SELECT * FROM users WHERE id = ?', (user_id,), fetch_one=True)
        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404
        achievements = db.execute(conn, 'SELECT * FROM achievements WHERE user_id = ?', (user_id,), fetch_all=True) or []
        recent_games = db.execute(conn, '''
            SELECT game_type, score, completed_at 
            FROM game_sessions 
            WHERE user_id = ? 
            ORDER BY completed_at DESC 
            LIMIT 10
        ''', (user_id,), fetch_all=True) or []
    finally:
        conn.close()
    
    return jsonify({
        "user": {
            "id": user[0],
            "username": user[1],
            "email": user[2],
            "user_type": user[4] if len(user) > 4 else 'student',
            "level": user[5] if len(user) > 5 else 1,
            "points": user[6] if len(user) > 6 else 0,
            "badges": user[7] if len(user) > 7 else 0,
            "streak": user[8] if len(user) > 8 else 0,
            "total_time": user[9] if len(user) > 9 else 0
        },
        "achievements": [{"id": a[2], "title": a[3], "description": a[4]} for a in achievements],
        "recent_games": [{"game_type": g[0], "score": g[1], "completed_at": g[2]} for g in recent_games]
    })

@app.route('/api/learning/modules', methods=['GET'])
def get_learning_modules():
    """Get learning modules filtered by user type. Content tailored to each persona."""
    user_type = session.get('user_type', 'student')
    # Map legacy 'enterprise' to 'digital_citizen'
    if user_type == 'enterprise':
        user_type = 'digital_citizen'
    
    # Module IDs per user type — core awareness module first, then topic-based
    modules_by_type = {
        'student': ['student_awareness', 'passwords', 'phishing', 'browsing', 'social_safety'],
        'digital_citizen': ['digital_citizen_awareness', 'passwords', 'phishing', 'browsing', 'privacy', 'scams'],
        'itpro': ['itpro_awareness', 'encryption', 'network', 'incident', 'malware', 'passwords'],
        'parent': ['passwords', 'phishing', 'browsing', 'parent_guide']
    }
    
    module_ids = modules_by_type.get(user_type, modules_by_type['student'])
    
    # Awareness module metadata (core learning module per type)
    AWARENESS_MODULES = {
        'student_awareness': {'id': 'student_awareness', 'title': 'Cybersecurity Awareness for Students', 'icon': 'fa-graduation-cap', 'description': 'Structured awareness module: phishing, malware, social engineering, passwords, and privacy—with quizzes and scenarios.'},
        'digital_citizen_awareness': {'id': 'digital_citizen_awareness', 'title': 'Cybersecurity Awareness for Digital Citizens', 'icon': 'fa-user-shield', 'description': 'Banking fraud, scams, malware, passwords, and family privacy—with quizzes and scenarios.'},
        'itpro_awareness': {'id': 'itpro_awareness', 'title': 'Cybersecurity Awareness for IT Professionals', 'icon': 'fa-laptop-code', 'description': 'BEC, ransomware lifecycle, social engineering, auth best practices, and compliance awareness—with quizzes and scenarios.'},
    }
    # Titles and descriptions that "click" per user type (age-appropriate, relatable)
    MODULES_BY_USER = {
        'student': {
            'student_awareness': AWARENESS_MODULES['student_awareness'],
            'passwords': {'id': 'passwords', 'title': 'Keep Your Accounts Safe', 'icon': 'fa-key', 'description': 'Simple rules so your passwords don’t get stolen—and what to do if they do.'},
            'phishing': {'id': 'phishing', 'title': 'Spot Fake Messages & Links', 'icon': 'fa-envelope-open-text', 'description': 'Tell real messages from scams so you don’t get tricked online.'},
            'browsing': {'id': 'browsing', 'title': 'Surf the Web Safely', 'icon': 'fa-globe', 'description': 'Know when a site or download is safe—and when to bounce.'},
            'social_safety': {'id': 'social_safety', 'title': 'Stay Safe on Social Media', 'icon': 'fa-share-alt', 'description': 'Protect your profile, who you talk to, and what you share.'},
        },
        'digital_citizen': {
            'digital_citizen_awareness': AWARENESS_MODULES['digital_citizen_awareness'],
            'passwords': {'id': 'passwords', 'title': 'Protect Your Logins', 'icon': 'fa-key', 'description': 'Strong passwords and 2FA so your email, bank, and apps stay yours.'},
            'phishing': {'id': 'phishing', 'title': 'Don’t Get Tricked by Scams', 'icon': 'fa-envelope-open-text', 'description': 'Recognize phishing emails, fake sites, and urgent “act now” tricks.'},
            'browsing': {'id': 'browsing', 'title': 'Safe Browsing & Downloads', 'icon': 'fa-globe', 'description': 'HTTPS, safe downloads, and avoiding sketchy sites in daily life.'},
            'privacy': {'id': 'privacy', 'title': 'Your Privacy Online', 'icon': 'fa-user-shield', 'description': 'What companies and sites can see—and how to lock it down.'},
            'scams': {'id': 'scams', 'title': 'Real-World Scam Alerts', 'icon': 'fa-exclamation-circle', 'description': 'Common scams (refunds, tech support, prizes) and how to say no.'},
        },
        'itpro': {
            'itpro_awareness': AWARENESS_MODULES['itpro_awareness'],
            'encryption': {'id': 'encryption', 'title': 'Encryption Basics', 'icon': 'fa-lock', 'description': 'Concepts and practices for protecting data in transit and at rest.'},
            'network': {'id': 'network', 'title': 'Network Security', 'icon': 'fa-network-wired', 'description': 'Ports, scanning, and hardening network infrastructure.'},
            'incident': {'id': 'incident', 'title': 'Incident Response', 'icon': 'fa-exclamation-triangle', 'description': 'Detect, contain, and recover from security incidents.'},
            'malware': {'id': 'malware', 'title': 'Malware Analysis', 'icon': 'fa-bug', 'description': 'Static and dynamic analysis fundamentals for security work.'},
            'passwords': {'id': 'passwords', 'title': 'Password & Auth Best Practices', 'icon': 'fa-key', 'description': 'Policy, hashing, and authentication in professional environments.'},
        },
        'parent': {
            'passwords': {'id': 'passwords', 'title': 'Help Your Child Lock Down Accounts', 'icon': 'fa-key', 'description': 'Teach strong passwords and account safety in a way kids get.'},
            'phishing': {'id': 'phishing', 'title': 'Teaching Kids to Spot Scams', 'icon': 'fa-envelope-open-text', 'description': 'How to explain fake messages and “too good to be true” offers.'},
            'browsing': {'id': 'browsing', 'title': 'Safe Browsing With Your Family', 'icon': 'fa-globe', 'description': 'Safe sites, screen time, and what to do when something looks wrong.'},
            'parent_guide': {'id': 'parent_guide', 'title': 'Parental Guide Overview', 'icon': 'fa-users', 'description': 'What your child sees here and how you can support their learning.'},
        },
    }
    
    mod_map = MODULES_BY_USER.get(user_type, MODULES_BY_USER['student'])
    modules = [mod_map[mid] for mid in module_ids if mid in mod_map]
    
    return jsonify({
        'modules': modules,
        'user_type': user_type
    })

@app.route('/api/learning/<module_id>', methods=['GET'])
def get_learning_module(module_id):
    """Get learning module content"""
    awareness_map = {
        'student_awareness': STUDENT_AWARENESS,
        'digital_citizen_awareness': DIGITAL_CITIZEN_AWARENESS,
        'itpro_awareness': ITPRO_AWARENESS,
    }
    if module_id in awareness_map:
        return jsonify(awareness_map[module_id])
    modules = {
        'passwords': {
            'title': 'Password Security',
            'learning_objectives': [
                'Understand what makes a strong password',
                'Learn to use password managers effectively',
                'Recognize common password vulnerabilities'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'What Makes a Strong Password?',
                        'content': 'A strong password is long (at least 12 characters), uses a mix of letters (upper and lower case), numbers, and symbols, and is not based on obvious things like your name, birthday, or "password123." Avoid reusing the same password on different sites—if one site is hacked, attackers will try that password elsewhere. Use a different password for email and banking especially.',
                        'interactive': 'password_checker'
                    },
                    {
                        'title': 'Password Managers',
                        'content': 'A password manager stores all your passwords in one locked place. You only need to remember one strong "master" password. The manager can create long, random passwords for each site and fill them in for you, so you don’t reuse weak ones. Popular options include Bitwarden, 1Password, and the one built into your browser or phone—turn on a master password or device lock so only you can see them.',
                        'interactive': 'password_manager_demo'
                    },
                    {
                        'title': 'Two-Factor Authentication (2FA)',
                        'content': '2FA adds a second step when you log in: something you know (password) plus something you have (phone app or code). Even if someone steals your password, they usually can’t get that second step. Turn on 2FA for your email, social accounts, and banking. Prefer an app (e.g. Google Authenticator) or a security key over SMS when possible.',
                        'interactive': None
                    }
                ]
            }
        },
        'phishing': {
            'title': 'Phishing Recognition',
            'learning_objectives': [
                'Identify phishing emails and messages',
                'Understand social engineering tactics',
                'Learn to verify legitimate communications'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'Identifying Phishing Emails',
                        'content': 'Phishing emails try to trick you into clicking a link, opening a file, or giving your password or card details. Red flags: urgent language ("Act now or your account will be closed"), sender address that looks wrong (e.g. support@amaz0n.com), generic greetings ("Dear Customer"), and links that don’t match the real company URL. When in doubt, don’t click—go to the real site by typing the address or using your bookmark.',
                        'interactive': 'email_analyzer'
                    },
                    {
                        'title': 'Common Phishing Tactics',
                        'content': 'Attackers use fear (fake fines, account suspension), curiosity (you’ve been tagged in a photo), or greed (you’ve won a prize) to get you to click or reply. They may pretend to be your bank, a delivery company, or tech support. Real organizations don’t ask for your password or full card number by email. If you’re unsure, contact the company using the phone number or website from their official page, not from the email.',
                        'interactive': 'tactics_quiz'
                    },
                    {
                        'title': 'SMS, Messaging, and Fake Sites',
                        'content': 'Phishing also happens via text, WhatsApp, and other apps. Same rules: don’t tap links or give personal details. Fake sites look like real ones but the URL is slightly wrong (e.g. paypa1.com). Always check the address bar before typing passwords or payment info. Use bookmarks or type the URL yourself for important sites.',
                        'interactive': None
                    }
                ]
            }
        },
        'browsing': {
            'title': 'Secure Browsing',
            'learning_objectives': [
                'Recognize secure websites (HTTPS)',
                'Understand safe download practices',
                'Identify suspicious websites'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'HTTPS and Website Security',
                        'content': 'HTTPS means the connection between your browser and the website is encrypted. Look for the padlock icon and "https://" in the address bar before entering passwords or payment details. Avoid entering sensitive data on sites that show "Not secure" or warnings. Browser warnings about certificates usually mean the site could be impersonated—don’t proceed unless you’re sure.',
                        'interactive': 'website_checker'
                    },
                    {
                        'title': 'Safe Download Practices',
                        'content': 'Only download from official or trusted sources. Avoid "download" buttons on random sites—they often lead to adware or malware. Prefer app stores for mobile apps. When you do download a file, scan it with your antivirus if possible. Don’t open email attachments from people you don’t know or that you weren’t expecting.',
                        'interactive': 'download_simulator'
                    },
                    {
                        'title': 'Suspicious Sites and Pop-Ups',
                        'content': 'Sites that are full of pop-ups, "Your PC is infected" messages, or offers that seem too good to be true are often malicious or scams. Close the tab or use Task Manager to close the browser if it won’t let you. Keep your browser and OS updated so security patches are applied. Use an ad blocker to reduce exposure to malicious ads.',
                        'interactive': None
                    }
                ]
            }
        },
        'encryption': {
            'title': 'Encryption Basics',
            'learning_objectives': [
                'Understand how encryption works',
                'Learn about different encryption methods',
                'Apply encryption concepts practically'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'Understanding Encryption',
                        'content': 'Encryption scrambles data so only someone with the right key can read it. When you see a padlock in your browser or use WhatsApp, encryption is protecting your data. Strong encryption uses math that is easy to do one way but practically impossible to reverse without the key.',
                        'interactive': 'encryption_demo'
                    },
                    {
                        'title': 'Caesar Cipher',
                        'content': 'The Caesar cipher is one of the oldest encryption methods: each letter is shifted by a fixed number. It teaches the idea of a "key" (the shift). Modern encryption is much stronger, but the same idea—sender and receiver share a secret—still applies.',
                        'interactive': 'caesar_cipher_tool'
                    }
                ]
            }
        },
        'network': {
            'title': 'Network Security',
            'learning_objectives': [
                'Understand ports, services, and exposure',
                'Learn the basics of network scanning and hardening',
                'Recognize common network-based attacks'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'Ports and Services',
                        'content': 'Services (web, SSH, database) listen on ports. Open ports are entry points: they must be needed and secured. Default credentials and outdated software on exposed ports are a leading cause of breaches. Principle: expose only what is necessary and keep it patched.',
                        'interactive': None
                    },
                    {
                        'title': 'Scanning and Assessment',
                        'content': 'Authorized scanning (e.g. with Nmap) helps find misconfigurations and weak points before attackers do. Always get written approval before scanning systems you do not own. Use scan results to prioritize patching and firewall rules.',
                        'interactive': None
                    },
                    {
                        'title': 'Hardening and Segmentation',
                        'content': 'Harden systems by disabling unused services, using strong auth, and applying least privilege. Segment the network so a compromise in one zone does not easily spread. Monitor for unusual traffic and failed logins.',
                        'interactive': None
                    }
                ]
            }
        },
        'incident': {
            'title': 'Incident Response',
            'learning_objectives': [
                'Understand phases of incident response',
                'Contain and recover from security events',
                'Document and learn from incidents'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'Detect and Triage',
                        'content': 'Detection comes from logs, alerts, and user reports. Triage means deciding severity and impact: Is it malware? Unauthorized access? Data loss? Speed matters—early detection limits damage. Have runbooks and contact lists ready.',
                        'interactive': None
                    },
                    {
                        'title': 'Contain and Eradicate',
                        'content': 'Containment stops the incident from spreading: isolate affected systems, block malicious IPs, disable compromised accounts. Eradication removes the cause: delete malware, patch vulnerabilities, reset credentials. Preserve evidence if legal or HR may be involved.',
                        'interactive': None
                    },
                    {
                        'title': 'Recover and Post-Incident',
                        'content': 'Recovery means restoring systems from clean backups or rebuilds and verifying they are safe. After the incident, document what happened, what was done, and what to improve. Update policies and controls to reduce the chance of a repeat.',
                        'interactive': None
                    }
                ]
            }
        },
        'malware': {
            'title': 'Malware Analysis',
            'learning_objectives': [
                'Understand types of malware and how they spread',
                'Learn static and dynamic analysis basics',
                'Use safe analysis environments'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'Types of Malware',
                        'content': 'Malware includes viruses, worms, trojans, ransomware, and spyware. It spreads via email, drives, vulnerable services, or social engineering. Understanding how it gets in and what it does helps you defend and respond. Never run unknown samples on production or personal machines.',
                        'interactive': None
                    },
                    {
                        'title': 'Static Analysis',
                        'content': 'Static analysis inspects files without running them: strings, hashes, headers, and disassembly. You can spot URLs, registry keys, and known bad signatures. Use sandboxes and isolated VMs; assume samples are dangerous.',
                        'interactive': None
                    },
                    {
                        'title': 'Dynamic Analysis',
                        'content': 'Dynamic analysis runs the sample in a controlled environment and observes behavior: network calls, file changes, processes. Tools like sandboxes and debuggers help. Always use a dedicated, isolated lab; never on a production network.',
                        'interactive': None
                    }
                ]
            }
        },
        'social_safety': {
            'title': 'Stay Safe on Social Media',
            'learning_objectives': [
                'Protect your profile and personal info',
                'Know who you talk to and what you share',
                'Handle pressure and weird messages'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'Lock Down Your Profile',
                        'content': 'Use privacy settings so only people you trust see your posts, photos, and personal details. Turn off location sharing for posts if you don’t need it. Use a strong password and two-factor authentication on your account so nobody can log in as you.',
                        'interactive': None
                    },
                    {
                        'title': 'Who You Talk To',
                        'content': 'Only accept friend or follow requests from people you know in real life or trust. If someone you don’t know keeps messaging you or asking for photos or personal stuff, block them and tell a parent or teacher. Real friends won’t pressure you.',
                        'interactive': None
                    },
                    {
                        'title': 'What You Share',
                        'content': 'Once you post something, it can be copied and shared. Don’t post your address, school name, or anything that could help a stranger find you. If someone asks you to send embarrassing or private pictures, say no and tell an adult—that’s not okay.',
                        'interactive': None
                    }
                ]
            }
        },
        'privacy': {
            'title': 'Your Privacy Online',
            'learning_objectives': [
                'Understand what sites and apps can see',
                'Control what you share and with whom',
                'Use simple habits to protect your privacy'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'What Gets Collected',
                        'content': 'Websites and apps often collect data about you: what you click, where you are, what you buy. They use it for ads or to sell to others. Read privacy policies and app permissions—if something asks for more than it needs (e.g. contacts, camera) for no clear reason, be cautious.',
                        'interactive': None
                    },
                    {
                        'title': 'Settings and Choices',
                        'content': 'Use privacy and security settings: limit ad tracking, turn off location when you don’t need it, and choose who can see your posts. Use a separate email for sign-ups and shopping so your main inbox stays cleaner and less exposed.',
                        'interactive': None
                    },
                    {
                        'title': 'Passwords and Logins',
                        'content': 'Reusing the same password everywhere means one leak can unlock many accounts. Use a password manager and strong, unique passwords. Turn on two-factor authentication (2FA) wherever possible so even if someone has your password, they still can’t get in.',
                        'interactive': None
                    }
                ]
            }
        },
        'scams': {
            'title': 'Real-World Scam Alerts',
            'learning_objectives': [
                'Recognize common refund, tech-support, and prize scams',
                'Know what to do when something feels off',
                'Protect your money and identity'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'Fake Refunds and Invoices',
                        'content': 'Scammers send emails or messages pretending to be your bank, a shop, or the tax office. They say you’re due a refund or must pay a fake invoice and ask you to click a link or call a number. Real organizations don’t ask for passwords or payments this way. Go to the real website or call the number on your card or statement.',
                        'interactive': None
                    },
                    {
                        'title': 'Tech Support Scams',
                        'content': 'Someone calls or pops up on your screen saying your computer is infected and they need remote access “to fix it.” Legitimate companies don’t contact you like this. Never give remote access or pay for “support” in these situations. Hang up or close the window and run a real antivirus scan if you’re worried.',
                        'interactive': None
                    },
                    {
                        'title': 'Prizes and Too-Good-to-Be-True',
                        'content': 'You’ve won a lottery, a gift card, or a deal that asks you to pay a fee or give your details first. Real prizes don’t require you to pay to receive them. If it’s too good to be true, it usually is. Don’t send money or personal info; report and block.',
                        'interactive': None
                    }
                ]
            }
        },
        'parent_guide': {
            'title': 'Parental Guide Overview',
            'learning_objectives': [
                'Understand what your child sees on CyberArcade',
                'Support their learning without doing it for them',
                'Have conversations about online safety'
            ],
            'content': {
                'lessons': [
                    {
                        'title': 'What’s on the Platform',
                        'content': 'CyberArcade offers learning modules and games for students: passwords, spotting fake messages, safe browsing, and social media safety. Content is written to be age-appropriate. Your child’s progress (e.g. modules completed) can be tracked in their account so you can see what they’ve done.',
                        'interactive': None
                    },
                    {
                        'title': 'How You Can Help',
                        'content': 'Go through a module or game together sometimes. Ask what they learned and whether they’ve seen anything like it online. Use the same words the platform uses (e.g. “phishing,” “strong password”) so they get used to the ideas. Encourage them to tell you if something online feels weird or pushy.',
                        'interactive': None
                    },
                    {
                        'title': 'Talking About Safety',
                        'content': 'Keep conversations calm and open. Let them know they can come to you without being in trouble. Reinforce that they should never share passwords, meet strangers from the internet alone, or send private photos. Revisit these topics as they get older and use more apps and sites.',
                        'interactive': None
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
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "error": "Not logged in"}), 401
    conn = db.get_conn()
    try:
        db.upsert_learning_progress(conn, user_id, module_id, data.get('progress', 0))
    finally:
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
    conn = db.get_conn()
    try:
        result = db.execute(conn, 'SELECT points FROM users WHERE id = ?', (user_id,), fetch_one=True)
        return result[0] if result else 0
    finally:
        conn.close()

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
