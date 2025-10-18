# 📁 CyberArcade Project Structure

```
CyberArcade/
├── 📄 README.md                    # Main project documentation
├── 📄 requirements.txt             # Python dependencies
├── 📄 run.py                      # Application entry point
├── 📄 .gitignore                  # Git ignore rules
├── 📄 .python-version             # Python version specification
│
├── 📁 src/                        # Source code
│   ├── 📁 backend/                # Flask backend
│   │   ├── 📄 __init__.py         # Package init
│   │   ├── 📄 app.py              # Main Flask application
│   │   ├── 📄 requirements.txt    # Backend dependencies
│   │   ├── 📄 run.py              # Backend entry point
│   │   ├── 📄 cyberarcade.db      # SQLite database
│   │   ├── 📁 api/                # API endpoints
│   │   ├── 📁 models/             # Data models
│   │   └── 📁 utils/              # Utility functions
│   │
│   └── 📁 frontend/               # Frontend assets
│       ├── 📄 __init__.py         # Package init
│       ├── 📄 index.html          # Main HTML file
│       ├── 📄 script.js           # JavaScript logic (20,000+ lines)
│       ├── 📄 styles.css          # CSS styles (18,000+ lines)
│       └── 📁 assets/             # Images, fonts, etc.
│           └── 🖼️ techdivathon.png
│
├── 📁 docs/                       # Documentation
│   ├── 📄 README.md               # Documentation index
│   ├── 📄 cyber arcade.pdf        # Project presentation
│   └── 📄 Mobile App for Cyber Hygiene Education.docx
│
├── 📁 tests/                      # Test files
│   ├── 📁 unit/                   # Unit tests
│   └── 📁 integration/            # Integration tests
│
└── 📁 legacy/                     # Old code (for reference)
    ├── 📄 main.py                 # Original Tkinter app
    ├── 📄 CyberArcade.py          # Original main file
    ├── 📄 chumma.py               # Test file
    ├── 📄 game_functions.py       # Original game functions
    ├── 📄 games_functions.py      # Duplicate game functions
    ├── 📄 style.css               # Original basic CSS
    ├── 📁 crosswords/             # Original crossword game
    ├── 📁 information/            # Original info module
    ├── 📁 mini_games/             # Original mini games
    ├── 📁 situationship/          # Original situation module
    ├── 📁 snake_and_ladder_game/  # Original snake & ladder
    └── 📁 snake_n_ladder/         # Alternative snake & ladder
```

## 🎯 Key Features

### 🚀 **Modern Architecture**
- **Separation of Concerns**: Frontend and backend clearly separated
- **Scalable Structure**: Easy to add new features and games
- **Professional Organization**: Industry-standard folder structure

### 📱 **Frontend (src/frontend/)**
- **index.html**: Main application interface
- **script.js**: 20,000+ lines of game logic
- **styles.css**: 18,000+ lines of professional styling
- **assets/**: Images and static resources

### 🔧 **Backend (src/backend/)**
- **app.py**: Flask server with API endpoints
- **cyberarcade.db**: SQLite database for user progress
- **api/**: RESTful API endpoints
- **models/**: Data models and schemas
- **utils/**: Helper functions and utilities

### 📚 **Documentation (docs/)**
- **README.md**: Comprehensive project documentation
- **cyber arcade.pdf**: Project presentation
- **Mobile App for Cyber Hygiene Education.docx**: Original concept

### 🧪 **Testing (tests/)**
- **unit/**: Unit tests for individual components
- **integration/**: Integration tests for full workflows

### 📦 **Legacy (legacy/)**
- **Original Tkinter Code**: Preserved for reference
- **Old Game Implementations**: Historical versions
- **Development Artifacts**: Test files and experiments

## 🎮 **Games & Features**

### 🏴 **Capture The Flag (CTF)**
- 15+ professional challenges
- 6 categories: Crypto, Web, Forensics, Reverse, Pwn, Stego
- Real-world scenarios and terminology

### 🔍 **Network Security Scanner**
- 5 scan scenarios: Corporate, Web Server, IoT, Industrial, Cloud
- Professional vulnerability descriptions
- CVE references and security recommendations

### 🔓 **Password Cracking Simulator**
- 4 attack methods: Dictionary, Brute Force, Hybrid, Mask
- 8 target types: User, Admin, CEO, Developer, etc.
- 200+ password dictionaries

### 🦠 **Malware Analysis Lab**
- Interactive malware disassembly
- Static, dynamic, and network analysis
- Professional analysis tools simulation

### 🎭 **Social Engineering Simulator**
- Real-world attack scenarios
- Phishing email identification
- Social media attack simulations

### 🚨 **Incident Response Simulator**
- Professional incident handling
- Real-time response actions
- Timeline management

### 🐍 **Snake & Ladder**
- 50+ cybersecurity questions
- 15+ categories covering all security topics
- Visual board with animations

## 🚀 **Getting Started**

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python run.py

# Access at http://localhost:8080
```

## 📈 **Project Stats**
- **Total Lines of Code**: 40,000+
- **Games**: 7 professional simulations
- **Questions**: 50+ cybersecurity questions
- **Attack Methods**: 4 password cracking techniques
- **Scan Scenarios**: 5 network assessment types
- **CTF Challenges**: 15+ professional challenges

---

**This structure provides a professional, scalable foundation for the CyberArcade platform!** 🎯✨
