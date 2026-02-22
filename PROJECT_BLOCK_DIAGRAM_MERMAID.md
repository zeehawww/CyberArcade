# CyberArcade - Visual Block Diagram (Mermaid)

## System Architecture

```mermaid
graph TB
    subgraph "CyberArcade Platform"
        subgraph "Frontend Layer"
            HTML[index.html<br/>Main Structure]
            CSS[styles.css<br/>Styling & Layout]
            JS[script.js<br/>Application Logic]
            GAMES[games/<br/>Game Modules]
            
            HTML --> CSS
            HTML --> JS
            JS --> GAMES
        end
        
        subgraph "Backend Layer"
            FLASK[app.py<br/>Flask Server]
            GM[GameManager<br/>Game Data Handler]
            API[API Routes<br/>REST Endpoints]
            
            FLASK --> GM
            FLASK --> API
        end
        
        subgraph "Database Layer"
            DB[(SQLite<br/>cyberarcade.db)]
            TABLES[Tables:<br/>users, achievements,<br/>game_sessions,<br/>learning_progress]
            
            DB --> TABLES
        end
    end
    
    JS <-->|HTTP Requests| API
    API <-->|SQL Queries| DB
    GAMES <-->|Game Data| GM
```

## Frontend Components

```mermaid
graph LR
    subgraph "Frontend Components"
        INDEX[index.html]
        
        subgraph "Sections"
            HOME[Home Section]
            PATHS[Learning Paths]
            LEARN[Learn Modules]
            GAMES[Game Center]
            PROGRESS[Progress]
        end
        
        subgraph "JavaScript Modules"
            MAIN[script.js<br/>Main Logic]
            NAV[Navigation Handler]
            API_CLIENT[API Client]
            STATE[State Management]
        end
        
        subgraph "Game Files"
            SL[snakeLadder.js]
            PD[phishingDetective.js]
            CC[caesarCipher.js]
            PC[passwordCracker.js]
            CTF[captureTheFlag.js]
            SE[socialEngineering.js]
            SQ[securityQuiz.js]
            STT[spotTheThreat.js]
            IR[incidentResponse.js]
        end
    end
    
    INDEX --> HOME
    INDEX --> PATHS
    INDEX --> LEARN
    INDEX --> GAMES
    INDEX --> PROGRESS
    
    MAIN --> NAV
    MAIN --> API_CLIENT
    MAIN --> STATE
    
    GAMES --> SL
    GAMES --> PD
    GAMES --> CC
    GAMES --> PC
    GAMES --> CTF
    GAMES --> SE
    GAMES --> SQ
    GAMES --> STT
    GAMES --> IR
```

## Backend API Structure

```mermaid
graph TB
    subgraph "Flask Backend"
        APP[app.py<br/>Flask Application]
        
        subgraph "API Endpoints"
            E1[GET /api/game/<br/>&lt;game_type&gt;]
            E2[POST /api/game/<br/>&lt;game_type&gt;/submit]
            E3[GET /api/user/progress]
            E4[GET /api/learning/paths]
            E5[GET /api/learning/<br/>&lt;module_id&gt;]
            E6[POST /api/learning/<br/>&lt;module_id&gt;/progress]
        end
        
        subgraph "Game Manager"
            GM[GameManager Class]
            SL_DATA[Snake & Ladder Data]
            PH_DATA[Phishing Data]
            CC_DATA[Caesar Cipher Data]
            ER_DATA[Escape Room Data]
            CW_DATA[Crossword Data]
        end
        
        subgraph "Helper Functions"
            CALC[calculate_points]
            GET_POINTS[get_user_points]
            INIT_DB[init_db]
        end
    end
    
    APP --> E1
    APP --> E2
    APP --> E3
    APP --> E4
    APP --> E5
    APP --> E6
    
    E1 --> GM
    E2 --> CALC
    E3 --> GET_POINTS
    
    GM --> SL_DATA
    GM --> PH_DATA
    GM --> CC_DATA
    GM --> ER_DATA
    GM --> CW_DATA
```

## Database Schema

```mermaid
erDiagram
    USERS ||--o{ ACHIEVEMENTS : has
    USERS ||--o{ GAME_SESSIONS : plays
    USERS ||--o{ LEARNING_PROGRESS : tracks
    
    USERS {
        int id PK
        string username UK
        string email UK
        string password_hash
        int level
        int points
        int badges
        int streak
        int total_time
        timestamp created_at
    }
    
    ACHIEVEMENTS {
        int id PK
        int user_id FK
        string achievement_id
        string title
        string description
        timestamp earned_at
    }
    
    GAME_SESSIONS {
        int id PK
        int user_id FK
        string game_type
        int score
        int duration
        timestamp completed_at
    }
    
    LEARNING_PROGRESS {
        int id PK
        int user_id FK
        string module_id
        int progress_percentage
        timestamp last_accessed
    }
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend
    participant B as Backend (Flask)
    participant D as Database
    
    U->>F: Load Page
    F->>B: GET /api/learning/paths
    B->>D: SELECT * FROM learning_progress
    D-->>B: Return Data
    B-->>F: JSON Response
    F-->>U: Display Learning Paths
    
    U->>F: Click Game
    F->>B: GET /api/game/snake-ladder
    B->>D: Query Game Data
    D-->>B: Game Configuration
    B-->>F: Game Data JSON
    F-->>U: Launch Game
    
    U->>F: Complete Game
    F->>B: POST /api/game/snake-ladder/submit
    B->>B: Calculate Points
    B->>D: UPDATE users SET points = ...
    B->>D: INSERT INTO game_sessions
    D-->>B: Success
    B-->>F: Points Earned
    F-->>U: Show Updated Progress
```

## Learning Paths Flow

```mermaid
graph TD
    START[User Starts Learning] --> CHOOSE{Choose Path}
    
    CHOOSE -->|Beginner| BP[Beginner Path<br/>4-6 weeks]
    CHOOSE -->|Intermediate| IP[Intermediate Path<br/>6-8 weeks]
    CHOOSE -->|Advanced| AP[Advanced Path<br/>8-12 weeks]
    
    BP --> M1B[Module 1: Password Security]
    BP --> M2B[Module 2: Phishing Recognition]
    BP --> M3B[Module 3: Secure Browsing]
    
    IP --> M1I[Module 1: Encryption Basics]
    IP --> M2I[Module 2: Network Security]
    IP --> M3I[Module 3: Incident Response]
    
    AP --> M1A[Module 1: Capture The Flag]
    
    M1B --> G1B[Play: Password Cracker]
    M2B --> G2B[Play: Phishing Detective]
    M3B --> G3B[Play: Spot The Threat]
    
    M1I --> G1I[Play: Caesar Cipher]
    M2I --> G2I[Play: Network Scanner]
    M3I --> G3I[Play: Incident Response]
    
    M1A --> G1A[Play: CTF Challenges]
    
    G1B --> PROGRESS[Update Progress]
    G2B --> PROGRESS
    G3B --> PROGRESS
    G1I --> PROGRESS
    G2I --> PROGRESS
    G3I --> PROGRESS
    G1A --> PROGRESS
    
    PROGRESS --> ACHIEVE[Earn Achievements]
    ACHIEVE --> NEXT[Next Module/Path]
```

## Game Module Architecture

```mermaid
graph TB
    subgraph "Game Modules"
        subgraph "Educational Games"
            SL[Snake & Ladder<br/>• 2-Player Mode<br/>• Quiz Questions<br/>• Snakes/Ladders]
            PD[Phishing Detective<br/>• Email Scenarios<br/>• WhatsApp<br/>• SMS/Website]
            SE[Social Engineering<br/>• Visual Scenarios<br/>• Phishing Emails<br/>• Tailgating/Baiting]
        end
        
        subgraph "Skill-Based Games"
            CC[Caesar Cipher<br/>• Encrypt/Decrypt<br/>• Shift Cipher<br/>• Interactive UI]
            PC[Password Cracker<br/>• Password Check<br/>• Strength Meter<br/>• Cracking Time]
            CTF[Capture The Flag<br/>• Crypto Challenges<br/>• Forensics<br/>• Reverse Engineering]
        end
        
        subgraph "Awareness Games"
            SQ[Security Quiz<br/>• Multiple Choice<br/>• Various Topics<br/>• Immediate Feedback]
            STT[Spot The Threat<br/>• Visual Scenarios<br/>• Malware ID<br/>• Mitigation Tips]
            IR[Incident Response<br/>• Incident Types<br/>• Response Steps<br/>• Decision Making]
        end
    end
    
    SL --> CONTEXT[Game Context<br/>Why This Matters]
    PD --> CONTEXT
    SE --> CONTEXT
    CC --> CONTEXT
    PC --> CONTEXT
    CTF --> CONTEXT
    SQ --> CONTEXT
    STT --> CONTEXT
    IR --> CONTEXT
    
    CONTEXT --> SCORE[Score Calculation]
    SCORE --> PROGRESS[Update User Progress]
```

## Career Roadmap Structure

```mermaid
graph LR
    subgraph "Career Paths"
        PT[Penetration Tester<br/>🔓]
        SA[Security Analyst<br/>🛡️]
        DF[Digital Forensics<br/>🔍]
        CR[Cryptographer<br/>🔐]
        SE[Security Engineer<br/>⚙️]
        EDU[Security Educator<br/>📚]
    end
    
    subgraph "Required Skills"
        SK1[Network Security]
        SK2[Web Exploitation]
        SK3[Social Engineering]
        SK4[CTF Challenges]
        SK5[Incident Response]
        SK6[Malware Analysis]
        SK7[Encryption]
        SK8[Forensics]
    end
    
    subgraph "Linked Games"
        G1[Network Scanner]
        G2[CTF]
        G3[Social Engineering]
        G4[Phishing Detective]
        G5[Incident Response]
        G6[Caesar Cipher]
        G7[Password Cracker]
    end
    
    PT --> SK1
    PT --> SK2
    PT --> SK3
    PT --> SK4
    
    SA --> SK1
    SA --> SK5
    SA --> SK6
    
    DF --> SK8
    DF --> SK6
    
    CR --> SK7
    
    SE --> SK1
    SE --> SK7
    
    EDU --> SK1
    EDU --> SK2
    EDU --> SK3
    EDU --> SK4
    EDU --> SK5
    EDU --> SK6
    EDU --> SK7
    EDU --> SK8
    
    SK1 --> G1
    SK3 --> G3
    SK3 --> G4
    SK4 --> G2
    SK5 --> G5
    SK7 --> G6
    SK7 --> G7
```

## Technology Stack

```mermaid
graph TB
    subgraph "Technology Stack"
        subgraph "Frontend"
            HTML[HTML5]
            CSS[CSS3]
            JS[JavaScript ES6+]
            CANVAS[Canvas API]
            FA[Font Awesome]
            GF[Google Fonts]
        end
        
        subgraph "Backend"
            PY[Python 3.x]
            FLASK[Flask Framework]
            CORS[Flask-CORS]
            SQLITE[SQLite3]
            WERK[Werkzeug]
        end
        
        subgraph "Database"
            DB[(SQLite)]
            T1[users table]
            T2[achievements table]
            T3[game_sessions table]
            T4[learning_progress table]
        end
    end
    
    HTML --> CSS
    CSS --> JS
    JS --> CANVAS
    JS --> FA
    JS --> GF
    
    PY --> FLASK
    FLASK --> CORS
    FLASK --> SQLITE
    FLASK --> WERK
    
    SQLITE --> DB
    DB --> T1
    DB --> T2
    DB --> T3
    DB --> T4
```

---

*This Mermaid diagram can be rendered in GitHub, VS Code with Mermaid extension, or online Mermaid editors.*






