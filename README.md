# 🎮 CyberArcade - Cybersecurity Learning Platform

A comprehensive, gamified cybersecurity education platform that combines interactive learning with professional-grade security tools and simulations.

## 🌟 Features

### 🎯 **Professional Games & Simulations**
- **Capture The Flag (CTF)** - 15+ challenges across 6 categories
- **Network Security Scanner** - 5 different scan scenarios
- **Password Cracking Simulator** - 4 attack methods, 8 target types
- **Malware Analysis Lab** - Interactive malware disassembly
- **Social Engineering Simulator** - Real-world attack scenarios
- **Incident Response Simulator** - Professional incident handling
- **Snake & Ladder** - 50+ cybersecurity questions

### 👥 **Audience Modes**
- **Student** – Learners: Snake & Ladder, Phishing Detective, Caesar Cipher, Security Quiz, Spot the Threat
- **Enterprise** – Employees: Phishing Detective, Social Engineering, Spot the Threat, Incident Response, Password Cracker
- **IT Professional** – Security practitioners: **CTF** (flagship), Network Scanner, Malware Analysis, Incident Response, Password Cracker, Caesar Cipher

### 🏗️ **Architecture**
- **Frontend**: HTML5, CSS3, JavaScript (main app); optional **React** app in `src/frontend-react/`
- **Backend**: Flask (Python); **Active Directory** and **API** integration stubs under `/api/integrations/`
- **Database**: SQLite (default); see `ARCHITECTURE.md` for PostgreSQL path
- **Design**: Responsive, cyber-themed UI

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd CyberArcade

# Install dependencies
pip install -r requirements.txt

# Run the application
python run.py
```

### Access
Open your browser and navigate to: `http://localhost:8080`

## 📁 Project Structure

```
CyberArcade/
├── src/
│   ├── backend/           # Flask backend
│   │   ├── app.py        # Main Flask application
│   │   ├── api/          # API endpoints
│   │   ├── models/       # Data models
│   │   └── utils/        # Utility functions
│   └── frontend/         # Frontend assets
│       ├── index.html    # Main HTML file
│       ├── script.js     # JavaScript logic
│       ├── styles.css    # CSS styles
│       └── assets/       # Images, fonts, etc.
├── docs/                 # Documentation
├── tests/               # Test files
├── legacy/              # Old code (for reference)
├── run.py              # Application entry point
└── requirements.txt    # Python dependencies
```

## 🎮 Games Overview

### 🏴 Capture The Flag (CTF)
- **Cryptography**: Caesar, RSA, Vigenère, encoding challenges
- **Web Exploitation**: SQL Injection, XSS, Directory Traversal
- **Digital Forensics**: Memory, Network, File Carving, Steganography
- **Reverse Engineering**: Binary analysis and password cracking
- **Binary Exploitation**: Buffer overflows and RCE
- **Steganography**: Hidden message detection

### 🔍 Network Security Scanner
- **Corporate Network**: RDP, SMB, databases, FTP
- **Web Server Assessment**: nginx, Tomcat, Redis, Elasticsearch
- **IoT Devices**: MQTT, CoAP, RTSP, embedded systems
- **Industrial Control**: Modbus, PLCs, SCADA systems
- **Cloud Infrastructure**: MongoDB, CouchDB, Memcached

### 🔓 Password Cracking Simulator
- **Dictionary Attack**: 200+ common passwords
- **Brute Force**: Systematic character combinations
- **Hybrid Attack**: Words + numbers + symbols
- **Mask Attack**: Pattern-based attacks

## 🎯 Target Audience

Use the **audience tabs** in the nav (Student | Enterprise | IT Pro) to switch persona; games and messaging adapt automatically.

- **Students**: Learning cybersecurity fundamentals (awareness games, no heavy tools)
- **Enterprise**: Employee security awareness (phishing, social engineering, incident response)
- **IT / Security professionals**: CTF, network scanning, malware analysis, incident response
- **Educators**: Interactive teaching tool across all three modes

## 🔧 Development

### Adding New Games
1. Create game logic in `src/frontend/script.js`
2. Add game styles in `src/frontend/styles.css`
3. Update game configuration in `src/backend/app.py`

### API Endpoints
- `GET /` - Main application
- `GET /api/user/progress` - User progress data
- `GET /api/game/{game_id}` - Game-specific data
- `GET /api/learning/paths` - Learning paths (beginner, intermediate, advanced)
- `GET /api/integrations/active-directory/status` - AD integration status (stub)
- `GET /api/integrations/api/status` - External API integration status (stub)

### React frontend & database
- **React**: Run `npm install` and `npm run dev` in `src/frontend-react/`; see `src/frontend-react/README.md`. The React app uses the same Flask API.
- **Database**: Default is SQLite. For a production-grade database, see `ARCHITECTURE.md` for the PostgreSQL path.

## 📚 Learning Resources

The platform covers:
- **Basic Security Concepts**: Firewalls, VPNs, encryption
- **Password Security**: Strong passwords, 2FA, password managers
- **Malware & Viruses**: Ransomware, trojans, botnets
- **Network Security**: DDoS, port scanning, network protocols
- **Social Engineering**: Phishing, pretexting, tailgating
- **Incident Response**: Breach handling, forensics, recovery
- **Advanced Topics**: Zero-day vulnerabilities, APTs, threat hunting
- **Compliance**: GDPR, ISO 27001, PCI DSS
- **Cloud Security**: Multi-tenancy, CASB, cloud infrastructure
- **Mobile Security**: MDM, BYOD, mobile app security
- **IoT Security**: Connected devices, botnets, firmware
- **Cryptocurrency Security**: Blockchain, wallets, smart contracts
- **Emerging Threats**: AI security, quantum computing, supply chain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Cybersecurity community for best practices
- Open source tools and libraries
- Educational institutions for feedback

---

**Built with ❤️ for cybersecurity education**