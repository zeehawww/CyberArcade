# CyberArcade - Project Block Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CYBERARCADE PLATFORM                                │
│                    Cybersecurity Awareness & Education                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            ┌───────▼──────┐  ┌─────▼─────┐  ┌─────▼─────┐
            │   FRONTEND   │  │  BACKEND   │  │ DATABASE  │
            │   (Client)   │  │  (Server)  │  │ (SQLite)  │
            └──────────────┘  └────────────┘  └───────────┘
```

## 1. Frontend Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         index.html                                  │   │
│  │  • Navigation Bar (Home, Paths, Learn, Games, Progress)            │   │
│  │  • Hero Section                                                     │   │
│  │  • Learning Paths Section                                          │   │
│  │  • Career Roadmap Section                                          │   │
│  │  • Game Center Section                                             │   │
│  │  • Progress Tracking Section                                       │   │
│  │  • Security Tips & Checklist                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┼─────────────────────────────────────┐ │
│  │                                  │                                     │ │
│  │  ┌──────────────────┐   ┌────────▼────────┐   ┌──────────────────┐  │ │
│  │  │   styles.css     │   │   script.js     │   │   games/         │  │ │
│  │  │                  │   │                 │   │                  │  │ │
│  │  │ • Responsive     │   │ • App State     │   │ • snakeLadder.js │  │ │
│  │  │   Design         │   │   Management    │   │ • phishingDetective│ │ │
│  │  │ • Dark Theme     │   │ • Navigation    │   │ • caesarCipher.js│ │ │
│  │  │ • Animations     │   │ • API Calls     │   │ • passwordCracker│ │ │
│  │  │ • Modal Windows  │   │ • Game Loading  │   │ • captureTheFlag │ │ │
│  │  │ • Grid Layouts   │   │ • Progress Sync │   │ • socialEngineering│ │ │
│  │  │                  │   │ • Module System │   │ • securityQuiz.js │ │ │
│  │  │                  │   │ • Flashcard UI  │   │ • spotTheThreat.js│ │ │
│  │  │                  │   │ • Career Map    │   │ • incidentResponse│ │ │
│  │  │                  │   │ • Learning Paths │   │                  │  │ │
│  │  └──────────────────┘   └─────────────────┘   └──────────────────┘  │ │
│  │                                                                      │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. Backend Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                            app.py (Flask)                            │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │                    GameManager Class                           │ │   │
│  │  │  • load_snake_ladder_data()                                    │ │   │
│  │  │  • load_crossword_data()                                       │ │   │
│  │  │  • load_escape_room_data()                                     │ │   │
│  │  │  • load_phishing_data()                                        │ │   │
│  │  │  • load_caesar_cipher_data()                                   │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │                      API ROUTES                                 │ │   │
│  │  │                                                                 │ │   │
│  │  │  GET  /api/game/<game_type>          → Game Data               │ │   │
│  │  │  POST /api/game/<game_type>/submit   → Submit Results          │ │   │
│  │  │  GET  /api/user/progress             → User Progress           │ │   │
│  │  │  GET  /api/learning/paths            → Learning Paths          │ │   │
│  │  │  GET  /api/learning/<module_id>       → Module Content          │ │   │
│  │  │  POST /api/learning/<module_id>/progress → Update Progress     │ │   │
│  │  │                                                                 │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │                  Helper Functions                              │ │   │
│  │  │  • calculate_points()      → Points Calculation               │ │   │
│  │  │  • get_user_points()       → Retrieve User Points             │ │   │
│  │  │  • init_db()               → Database Initialization          │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│                          ┌──────────────────┐                                │
│                          │   SQLite DB      │                                │
│                          │  cyberarcade.db  │                                │
│                          └──────────────────┘                                │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 3. Database Schema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATABASE SCHEMA                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          users TABLE                                 │   │
│  │  ┌─────────────┬──────────────┬─────────────────────────────────┐  │   │
│  │  │ id          │ INTEGER      │ PRIMARY KEY                     │  │   │
│  │  │ username    │ TEXT         │ UNIQUE, NOT NULL                │  │   │
│  │  │ email       │ TEXT         │ UNIQUE, NOT NULL                │  │   │
│  │  │ password_hash│ TEXT        │ NOT NULL                        │  │   │
│  │  │ level       │ INTEGER      │ DEFAULT 1                       │  │   │
│  │  │ points      │ INTEGER      │ DEFAULT 0                       │  │   │
│  │  │ badges      │ INTEGER      │ DEFAULT 0                       │  │   │
│  │  │ streak      │ INTEGER      │ DEFAULT 0                       │  │   │
│  │  │ total_time  │ INTEGER      │ DEFAULT 0                       │  │   │
│  │  │ created_at  │ TIMESTAMP    │ DEFAULT CURRENT_TIMESTAMP       │  │   │
│  │  └─────────────┴──────────────┴─────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      achievements TABLE                               │   │
│  │  ┌─────────────┬──────────────┬─────────────────────────────────┐  │   │
│  │  │ id          │ INTEGER      │ PRIMARY KEY                     │  │   │
│  │  │ user_id     │ INTEGER      │ FOREIGN KEY → users.id          │  │   │
│  │  │ achievement_id│ TEXT       │ NOT NULL                       │  │   │
│  │  │ title       │ TEXT         │ NOT NULL                        │  │   │
│  │  │ description │ TEXT         │                                 │  │   │
│  │  │ earned_at   │ TIMESTAMP    │ DEFAULT CURRENT_TIMESTAMP       │  │   │
│  │  └─────────────┴──────────────┴─────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      game_sessions TABLE                              │   │
│  │  ┌─────────────┬──────────────┬─────────────────────────────────┐  │   │
│  │  │ id          │ INTEGER      │ PRIMARY KEY                     │  │   │
│  │  │ user_id     │ INTEGER      │ FOREIGN KEY → users.id          │  │   │
│  │  │ game_type   │ TEXT         │ NOT NULL                        │  │   │
│  │  │ score       │ INTEGER      │ DEFAULT 0                       │  │   │
│  │  │ duration    │ INTEGER      │ DEFAULT 0                       │  │   │
│  │  │ completed_at│ TIMESTAMP    │ DEFAULT CURRENT_TIMESTAMP       │  │   │
│  │  └─────────────┴──────────────┴─────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    learning_progress TABLE                           │   │
│  │  ┌─────────────┬──────────────┬─────────────────────────────────┐  │   │
│  │  │ id          │ INTEGER      │ PRIMARY KEY                     │  │   │
│  │  │ user_id     │ INTEGER      │ FOREIGN KEY → users.id          │  │   │
│  │  │ module_id   │ TEXT         │ NOT NULL                        │  │   │
│  │  │ progress_percentage│ INTEGER│ DEFAULT 0                       │  │   │
│  │  │ last_accessed│ TIMESTAMP   │ DEFAULT CURRENT_TIMESTAMP       │  │   │
│  │  └─────────────┴──────────────┴─────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 4. Game Modules Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            GAME MODULES                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ Snake & Ladder   │  │ Phishing Detective│  │ Caesar Cipher    │         │
│  │                  │  │                  │  │                  │         │
│  │ • 2-Player Mode │  │ • Email Scenarios │  │ • Encrypt/Decrypt│         │
│  │ • Quiz Questions │  │ • WhatsApp       │  │ • Shift Cipher   │         │
│  │ • Snakes/Ladders│  │ • Website Phishing│  │ • Interactive UI │         │
│  │ • Security Tips │  │ • SMS Phishing    │  │                  │         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ Password Cracker │  │ Capture The Flag │  │ Social Engineering│        │
│  │                  │  │                  │  │                  │         │
│  │ • Password Check │  │ • Crypto Challenges│ │ • Visual Scenarios│       │
│  │ • Strength Meter │  │ • Forensics      │  │ • Phishing Emails │       │
│  │ • Cracking Time  │  │ • Reverse Eng.   │  │ • Tailgating     │       │
│  │                  │  │ • Binary Exploit │  │ • Baiting        │       │
│  │                  │  │ • Steganography  │  │ • Vishing        │       │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ Security Quiz    │  │ Spot The Threat  │  │ Incident Response│        │
│  │                  │  │                  │  │                  │         │
│  │ • Multiple Choice│  │ • Visual Scenarios│  │ • Incident Types │       │
│  │ • Various Topics│  │ • Malware ID     │  │ • Response Steps │       │
│  │ • Immediate Feedback│ • Mitigation Tips│  │ • Decision Making│       │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 5. Data Flow Diagram

```
┌──────────────┐
│    USER      │
│  (Browser)   │
└──────┬───────┘
       │
       │ 1. Request Page
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Client)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  index.html loads → script.js initializes → API calls   │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 2. HTTP Request (GET/POST)
       │    /api/learning/paths
       │    /api/game/<game_type>
       │    /api/user/progress
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Flask Server)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Route Handler → GameManager → Process Request           │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 3. Database Query
       │    SELECT/INSERT/UPDATE
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE (SQLite)                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  users, achievements, game_sessions, learning_progress   │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 4. Response Data (JSON)
       │    { paths: [...], progress: {...}, game_data: {...} }
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Client)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Receive JSON → Update UI → Display Content/Game         │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 5. User Interaction
       │    Play Game → Submit Results
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Flask Server)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Calculate Points → Update Database → Return Success     │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────┬──────────────────────────────────────────────────────────┘
       │
       │ 6. Updated Progress
       ▼
┌──────────────┐
│    USER      │
│  (Browser)   │
│  Sees Updated Points/Progress
└──────────────┘
```

## 6. Learning Paths Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          LEARNING PATHS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    BEGINNER PATH                                     │   │
│  │  Duration: 4-6 weeks                                                │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 1: Password Security                                    │ │   │
│  │  │   → Game: Password Cracker                                     │ │   │
│  │  │   → Objectives: Strong passwords, password managers            │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 2: Phishing Recognition                                 │ │   │
│  │  │   → Game: Social Engineering, Phishing Detective              │ │   │
│  │  │   → Objectives: Identify phishing, social engineering tactics  │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 3: Secure Browsing                                     │ │   │
│  │  │   → Game: Spot The Threat                                     │ │   │
│  │  │   → Objectives: HTTPS, safe downloads, suspicious sites     │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                  INTERMEDIATE PATH                                  │   │
│  │  Duration: 6-8 weeks                                                │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 1: Encryption Basics                                    │ │   │
│  │  │   → Game: Caesar Cipher                                        │ │   │
│  │  │   → Objectives: Encryption concepts, cipher methods           │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 2: Network Security                                    │ │   │
│  │  │   → Game: Network Security Scanner                            │ │   │
│  │  │   → Objectives: Network vulnerabilities, port scanning       │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 3: Incident Response                                    │ │   │
│  │  │   → Game: Incident Response Simulator                          │ │   │
│  │  │   → Objectives: Response procedures, real-world scenarios     │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    ADVANCED PATH                                    │   │
│  │  Duration: 8-12 weeks                                               │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 1: Capture The Flag                                      │ │   │
│  │  │   → Game: CTF Challenges                                        │ │   │
│  │  │   → Objectives: Crypto, forensics, reverse engineering         │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ Module 2: Malware Analysis (Removed)                          │ │   │
│  │  │   → Integrated into Spot The Threat                            │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 7. Career Roadmap Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CAREER ROADMAP                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                     │
│  │ Penetration  │  │   Security    │  │   Digital    │                     │
│  │   Tester     │  │   Analyst     │  │  Forensics   │                     │
│  │              │  │               │  │   Expert     │                     │
│  │ Skills:      │  │ Skills:       │  │ Skills:      │                     │
│  │ • Network    │  │ • Network     │  │ • File       │                     │
│  │   Security   │  │   Analysis    │  │   Analysis   │                     │
│  │ • Web Exploit│  │ • Incident    │  │ • Evidence   │                     │
│  │ • Social Eng │  │   Response    │  │   Collection│                     │
│  │ • CTF        │  │ • Malware     │  │ • CTF        │                     │
│  │              │  │   Analysis    │  │   Forensics  │                     │
│  │ Games:       │  │               │  │              │                     │
│  │ • Network    │  │ Games:        │  │ Games:       │                     │
│  │   Scanner    │  │ • Network     │  │ • CTF        │                     │
│  │ • CTF        │  │   Scanner     │  │   (Forensics)│                     │
│  │ • Social Eng │  │ • Incident    │  │              │                     │
│  │              │  │   Response    │  │              │                     │
│  └──────────────┘  └──────────────┘  └──────────────┘                     │
│                                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                     │
│  │Cryptographer │  │   Security    │  │   Security   │                     │
│  │              │  │   Engineer    │  │   Educator   │                     │
│  │ Skills:      │  │               │  │              │                     │
│  │ • Encryption │  │ Skills:       │  │ Skills:      │                     │
│  │   Algorithms │  │ • Network     │  │ • All        │                     │
│  │ • Cryptanalysis│ Security      │  │   Fundamentals│                    │
│  │ • Caesar     │  │ • System      │  │ • Communication│                   │
│  │   Cipher     │  │   Hardening   │  │ • Pedagogy   │                     │
│  │              │  │ • Password    │  │              │                     │
│  │ Games:       │  │   Security    │  │ Games:      │                     │
│  │ • Caesar     │  │               │  │ • All Games  │                     │
│  │   Cipher     │  │ Games:        │  │              │                     │
│  │ • CTF (Crypto)│ • Password     │  │              │                     │
│  │              │  │   Cracker     │  │              │                     │
│  │              │  │ • Network    │  │              │                     │
│  │              │  │   Scanner    │  │              │                     │
│  └──────────────┘  └──────────────┘  └──────────────┘                     │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 8. Technology Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          TECHNOLOGY STACK                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  FRONTEND:                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ • HTML5                    → Structure & Semantics                 │   │
│  │ • CSS3                     → Styling & Responsive Design           │   │
│  │ • JavaScript (ES6+)        → Interactivity & Logic                 │   │
│  │ • Canvas API               → Game Rendering (Snake & Ladder)       │   │
│  │ • Font Awesome             → Icons                                  │   │
│  │ • Google Fonts (Orbitron)  → Typography                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  BACKEND:                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ • Python 3.x                → Programming Language                  │   │
│  │ • Flask                     → Web Framework                         │   │
│  │ • Flask-CORS                → Cross-Origin Resource Sharing         │   │
│  │ • SQLite3                   → Database (via Python)                 │   │
│  │ • Werkzeug                  → Password Hashing                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  DATABASE:                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ • SQLite                    → Lightweight Database                  │   │
│  │ • Tables: users, achievements, game_sessions, learning_progress     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  DEPLOYMENT:                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ • Local Development         → Flask Development Server              │   │
│  │ • Port: 8080                → Default Server Port                    │   │
│  │ • Static File Serving       → Flask send_from_directory             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9. Key Features & Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        KEY FEATURES & COMPONENTS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  USER INTERFACE:                                                             │
│  • Responsive Navigation Bar with User Stats (Level, Points)                │
│  • Hero Section with Value Propositions                                      │
│  • Learning Paths Display (Beginner, Intermediate, Advanced)                 │
│  • Career Roadmap Visualization                                              │
│  • Game Center with Interactive Game Cards                                   │
│  • Progress Tracking Dashboard                                               │
│  • Today's Security Tip Feature                                              │
│  • Security Checklist Download                                               │
│                                                                               │
│  GAMIFICATION:                                                               │
│  • Points System (Earned through games)                                      │
│  • Level Progression                                                         │
│  • Badges & Achievements                                                     │
│  • Streak Tracking                                                           │
│  • Game Session History                                                      │
│                                                                               │
│  LEARNING SYSTEM:                                                            │
│  • Structured Learning Paths                                                 │
│  • Interactive Modules with Flashcards                                       │
│  • Module-to-Game Linking                                                    │
│  • Progress Tracking per Module                                              │
│  • "Why This Matters" Context for Games                                      │
│                                                                               │
│  GAME FEATURES:                                                              │
│  • Two-Player Snake & Ladder with Quiz Integration                           │
│  • Multi-Scenario Phishing Detection (Email, WhatsApp, SMS, Website)         │
│  • Interactive CTF Challenges with Simulations                                │
│  • Visual Threat Identification                                              │
│  • Real-World Scenario Simulations                                           │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 10. File Structure

```
CyberArcade/
├── src/
│   ├── frontend/
│   │   ├── index.html              # Main HTML file
│   │   ├── styles.css              # Global styles
│   │   ├── script.js               # Main application logic
│   │   ├── assets/                 # Images, logos
│   │   └── games/                  # Individual game modules
│   │       ├── snakeLadder.js
│   │       ├── phishingDetective.js
│   │       ├── caesarCipher.js
│   │       ├── passwordCracker.js
│   │       ├── captureTheFlag.js
│   │       ├── socialEngineering.js
│   │       ├── securityQuiz.js
│   │       ├── spotTheThreat.js
│   │       └── incidentResponse.js
│   │
│   └── backend/
│       ├── app.py                  # Flask application
│       ├── run.py                  # Server entry point
│       ├── models/                 # Data models (if any)
│       ├── utils/                  # Utility functions
│       └── cyberarcade.db         # SQLite database
│
├── docs/                           # Documentation
├── legacy/                         # Legacy code
├── tests/                          # Test files
├── requirements.txt                # Python dependencies
├── run.py                          # Main entry point
├── README.md                       # Project documentation
└── PROJECT_STRUCTURE.md            # Project structure doc
```

---

## Summary

**CyberArcade** is a comprehensive cybersecurity awareness and education platform that combines:

- **Frontend**: Modern, responsive web interface with interactive games
- **Backend**: Flask-based REST API serving game data and managing user progress
- **Database**: SQLite for persistent storage of users, achievements, and progress
- **Games**: 11 interactive cybersecurity games covering various topics
- **Learning**: Structured paths with modules, flashcards, and progress tracking
- **Gamification**: Points, levels, badges, and achievements system

The platform emphasizes **practical awareness** over theoretical knowledge, making cybersecurity education accessible and engaging through interactive gameplay and real-world scenarios.

---

*Generated: 2024*
*Project: CyberArcade - Cybersecurity Awareness & Education Platform*






