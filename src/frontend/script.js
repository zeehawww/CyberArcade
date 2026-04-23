// Global state management
const appState = {
    currentUser: {
        id: null,
        username: null,
        user_type: null,
        level: 1,
        points: 0,
        badges: 0,
        streak: 0,
        totalTime: 0,
        achievements: []
    },
    currentSection: 'home',
    currentAudience: 'school', // school | college | corporate | it_team
    gameInstances: {},
    moduleInstances: {},
    isAuthenticated: false
};

// User-type config: Student, Digital Citizen, IT Pro, Parental Guide (games mapping; modules are from API)
const AUDIENCE_CONFIG = {
    school: {
        name: 'School',
        gamesSectionTitle: 'Games for School Learners',
        gamesSectionSubtitle: 'Learn online safety and spot scams with Cyber Snake & Ladder.',
        heroSubtitle: 'Learn to stay safe online with content made for students. Spot fake messages, keep your accounts safe, and browse the web without getting tricked.',
        gameIds: ['snake-ladder']
    },
    college: {
        name: 'College',
        gamesSectionTitle: 'Games for College Students',
        gamesSectionSubtitle: 'Test your security knowledge with Cyber Snake & Ladder.',
        heroSubtitle: 'Stay secure throughout your academic journey. Master password safety, recognize advanced phishing, and protect your digital identity.',
        gameIds: ['snake-ladder']
    },
    corporate: {
        name: 'Corporate',
        gamesSectionTitle: 'Corporate Security Training',
        gamesSectionSubtitle: 'Protect company data while playing Cyber Snake & Ladder.',
        heroSubtitle: 'Stay safe as you work, shop, and browse. Learn to recognize scams, protect your logins, and keep your privacy in check.',
        gameIds: ['snake-ladder']
    },
    it_team: {
        name: 'IT Team',
        gamesSectionTitle: 'Security Ops Training',
        gamesSectionSubtitle: 'Professional security concepts simplified in Cyber Snake & Ladder.',
        heroSubtitle: 'Hands-on challenges for IT and security professionals. Sharpen skills with specialized cyber defense concepts.',
        gameIds: ['snake-ladder']
    }
};

// Game metadata for rendering cards. Games are distinct: Phishing Detective = messages/channels;
// Social Engineering = broader scenarios (pretexting, tailgating); Spot the Threat = visual/UI.
// Security Quiz and Snake & Ladder use separate question sets (no repeating content).
const GAME_META = {
    'snake-ladder': { title: 'Cyber Snake & Ladder', description: 'Navigate through cybersecurity challenges in this classic board game', icon: 'fa-dice', difficulty: 'Easy', duration: '10-15 min' },
    'phishing-detective': { title: 'Phishing Detective', description: 'Identify phishing in emails, WhatsApp, websites, and more', icon: 'fa-envelope-open-text', difficulty: 'Medium', duration: '15-20 min' },
    'social-engineering': { title: 'Social Engineering Simulator', description: 'Recognize pretexting, tailgating, and other social engineering tactics', icon: 'fa-user-secret', difficulty: 'Medium', duration: '8-12 min' },
    'caesar-cipher': { title: 'Caesar Cipher', description: 'Learn encryption by mastering the Caesar cipher', icon: 'fa-code', difficulty: 'Medium', duration: '10-15 min' },
    'security-quiz': { title: 'Security Quiz Challenge', description: 'Test your cybersecurity knowledge with interactive quizzes', icon: 'fa-question-circle', difficulty: 'Medium', duration: '10-15 min' },
    'spot-the-threat': { title: 'Spot the Threat', description: 'Visual threat detection – identify security risks in UI and scenarios', icon: 'fa-search', difficulty: 'Medium', duration: '12-18 min' },
    'incident-response': { title: 'Incident Response Simulator', description: 'Handle real-time cybersecurity incidents like a professional', icon: 'fa-exclamation-triangle', difficulty: 'Expert', duration: '20-25 min' },
    'password-cracker': { title: 'Password Cracking Simulator', description: 'See how weak passwords are cracked; build better password habits', icon: 'fa-unlock-alt', difficulty: 'Medium', duration: '5-10 min' },
    'capture-the-flag': { title: 'Capture The Flag (CTF)', description: 'Professional security challenges: crypto, web, forensics, reverse, pwn, stego', icon: 'fa-flag', difficulty: 'Expert', duration: '60+ min' },
    'network-scanner': { title: 'Network Security Scanner', description: 'Simulated network assessments and vulnerability scenarios', icon: 'fa-network-wired', difficulty: 'Expert', duration: '15-25 min' },
    'malware-analysis': { title: 'Malware Analysis Lab', description: 'Simulated static and dynamic malware analysis', icon: 'fa-bug', difficulty: 'Expert', duration: '20-30 min' }
};

// Registry for modular game definitions
window.CyberArcadeGames = window.CyberArcadeGames || {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setupEventListeners();
});

// Check authentication on load
function checkAuth() {
    fetch('/api/auth/me', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.user) {
                appState.isAuthenticated = true;
                appState.currentUser = { ...appState.currentUser, ...data.user };
                appState.currentAudience = data.user.user_type || 'school';
                initializeApp();
            } else {
                showLogin();
            }
        })
        .catch(() => {
            showLogin();
        });
}

// Initialize app components (after auth)
function initializeApp() {
    setAudience(appState.currentAudience);
    loadUserProgress();
    updateUserDisplay();
    showSection('home');
    loadTodaysSecurityTip();
    loadSecurityChecklist();
    loadLearningModules();
    renderGamesGrid();
    updateHeroForAudience();
    updateNavForUserType();
}

// Make functions globally accessible
window.showLogin = showLogin;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.showLoginForm = showLoginForm;
window.showRegisterForm = showRegisterForm;

// Auth functions
function showLogin() {
    document.getElementById('navAuth').style.display = 'flex';
    document.getElementById('navMenu').style.display = 'none';
    document.getElementById('navUser').style.display = 'none';
    showSection('login');
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    
    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            appState.isAuthenticated = true;
            appState.currentUser = { ...appState.currentUser, ...data.user };
            appState.currentAudience = data.user.user_type || 'school';
            initializeApp();
            showSection('home');
        } else {
            errorEl.textContent = data.error || 'Login failed';
        }
    })
    .catch(error => {
        errorEl.textContent = 'Error: ' + error.message;
    });
}

function handleRegister() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const userType = document.getElementById('regUserType').value;
    const errorEl = document.getElementById('registerError');
    
    fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: username, email: email, password: password, user_type: userType })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            checkAuth(); // Will login automatically
        } else {
            errorEl.textContent = data.error || 'Registration failed';
        }
    })
    .catch(error => {
        errorEl.textContent = 'Error: ' + error.message;
    });
}

function logout() {
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
        .then(() => {
            appState.isAuthenticated = false;
            appState.currentUser = { id: null, username: null, user_type: null, level: 1, points: 0, badges: 0, streak: 0, totalTime: 0, achievements: [] };
            showLogin();
        });
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.login-tab')[0].classList.add('active');
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.login-tab')[1].classList.add('active');
}

function updateNavForUserType() {
    document.getElementById('navAuth').style.display = 'none';
    document.getElementById('navMenu').style.display = 'flex';
    document.getElementById('navUser').style.display = 'flex';
    document.getElementById('userName').textContent = appState.currentUser.username || 'User';
    const typeBadge = document.getElementById('userType');
    var ut = appState.currentUser.user_type || 'school';
    
    let displayType = 'School';
    if (ut === 'college') displayType = 'College';
    else if (ut === 'corporate' || ut === 'digital_citizen') displayType = 'Corporate';
    else if (ut === 'it_team' || ut === 'itpro') displayType = 'IT Team';

    typeBadge.textContent = displayType;
    typeBadge.className = 'user-type-badge ' + (ut === 'digital_citizen' ? 'corporate' : ut === 'itpro' ? 'it_team' : ut);
}

function setAudience(audienceId) {
    if (!AUDIENCE_CONFIG[audienceId]) return;
    appState.currentAudience = audienceId;
    localStorage.setItem('cyberArcadeAudience', audienceId);
    document.querySelectorAll('.audience-tab').forEach(function (tab) {
        tab.classList.toggle('active', tab.getAttribute('data-audience') === audienceId);
    });
    var titleEl = document.getElementById('gamesSectionTitle');
    var subtitleEl = document.getElementById('gamesSectionSubtitle');
    if (titleEl) titleEl.textContent = AUDIENCE_CONFIG[audienceId].gamesSectionTitle;
    if (subtitleEl) subtitleEl.textContent = AUDIENCE_CONFIG[audienceId].gamesSectionSubtitle;
}

function renderGamesGrid() {
    var grid = document.getElementById('gamesGrid');
    if (!grid) return;
    // Use user_type from logged-in user; map enterprise -> digital_citizen
    var audience = appState.currentUser.user_type || appState.currentAudience;
    if (audience === 'digital_citizen' || audience === 'enterprise') audience = 'corporate';
    if (audience === 'itpro') audience = 'it_team';
    if (audience === 'student') audience = 'school';
    var gameIds = (AUDIENCE_CONFIG[audience] && AUDIENCE_CONFIG[audience].gameIds) ? AUDIENCE_CONFIG[audience].gameIds : AUDIENCE_CONFIG.school.gameIds;
    grid.innerHTML = gameIds.map(function (gameId) {
        var meta = GAME_META[gameId];
        if (!meta) return '';
        return '<div class="game-card" data-game="' + gameId + '">' +
            '<div class="game-image"><i class="fas ' + meta.icon + '"></i></div>' +
            '<div class="game-content">' +
            '<h3>' + meta.title + '</h3>' +
            '<p>' + meta.description + '</p>' +
            '<div class="game-stats">' +
            '<span class="difficulty">' + meta.difficulty + '</span>' +
            '<span class="duration">' + meta.duration + '</span>' +
            '</div></div>' +
            '<button class="btn btn-game" onclick="startGame(\'' + gameId + '\')"><i class="fas fa-play"></i> Play</button>' +
            '</div>';
    }).join('');
}

function updateHeroForAudience() {
    var audience = appState.currentUser.user_type || appState.currentAudience;
    if (audience === 'digital_citizen' || audience === 'enterprise') audience = 'corporate';
    if (audience === 'itpro') audience = 'it_team';
    if (audience === 'student') audience = 'school';
    var config = AUDIENCE_CONFIG[audience];
    var sub = document.querySelector('.hero-subtitle');
    if (sub && config) sub.textContent = config.heroSubtitle;
}

function setupAudienceTabs() {
    // Audience tabs removed - now using user_type from login
}

function loadLearningModules() {
    fetch('/api/learning/modules', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            if (!data.modules) return;
            renderModulesGrid(data.modules);
        })
        .catch(error => console.error('Error loading modules:', error));
}

function renderModulesGrid(modules) {
    const grid = document.getElementById('modulesGrid');
    if (!grid) return;
    grid.innerHTML = modules.map(module => `
        <div class="module-card" onclick="openModule('${module.id}')">
            <div class="module-icon"><i class="fas ${module.icon}"></i></div>
            <h3>${module.title}</h3>
            <p>${module.description}</p>
            <button class="btn btn-primary">Start Learning</button>
        </div>
    `).join('');
}


// Load and display career roadmap
function loadCareerRoadmap() {
    const roadmapData = {
        'penetration-tester': {
            title: '🔓 Penetration Tester (Ethical Hacker)',
            description: 'Find security vulnerabilities before attackers do',
            icon: 'fas fa-user-secret',
            color: '#ff6b6b',
            skills: ['Network Security', 'Web Exploitation', 'Social Engineering', 'CTF Challenges'],
            modules: ['Network Security', 'Secure Browsing', 'Phishing Recognition'],
            games: ['Network Security Scanner', 'Capture The Flag', 'Social Engineering Simulator'],
            nextSteps: 'Build awareness here, then explore TryHackMe, HackTheBox, or pursue CEH certification'
        },
        'security-analyst': {
            title: '🛡️ Security Analyst',
            description: 'Monitor and protect systems from cyber threats',
            icon: 'fas fa-shield-alt',
            color: '#4ecdc4',
            skills: ['Network Analysis', 'Incident Response', 'Malware Analysis', 'Threat Detection'],
            modules: ['Network Security', 'Secure Browsing', 'Encryption Basics'],
            games: ['Network Security Scanner', 'Incident Response Simulator', 'Malware Analysis Lab'],
            nextSteps: 'Build awareness here, then continue with Security+ certification, SIEM tools training, and threat intelligence courses'
        },
        'forensics-expert': {
            title: '🔍 Digital Forensics Expert',
            description: 'Investigate cybercrimes and analyze digital evidence',
            icon: 'fas fa-search',
            color: '#ffd700',
            skills: ['File Analysis', 'Data Recovery', 'Evidence Collection', 'CTF Forensics'],
            modules: ['Encryption Basics', 'Secure Browsing'],
            games: ['Capture The Flag (Forensics)', 'Malware Analysis Lab'],
            nextSteps: 'Pursue GCFA (GIAC Certified Forensics Analyst) or CHFI certification'
        },
        'cryptographer': {
            title: '🔐 Cryptographer',
            description: 'Design and break encryption systems',
            icon: 'fas fa-lock',
            color: '#00ffff',
            skills: ['Encryption Algorithms', 'Cryptanalysis', 'Caesar Cipher', 'Modern Cryptography'],
            modules: ['Encryption Basics'],
            games: ['Caesar Cipher', 'Capture The Flag (Crypto)'],
            nextSteps: 'Study advanced cryptography, mathematics, and pursue cryptography research or certifications'
        },
        'security-engineer': {
            title: '⚙️ Security Engineer',
            description: 'Build secure systems and infrastructure',
            icon: 'fas fa-cogs',
            color: '#ff00ff',
            skills: ['Network Security', 'System Hardening', 'Password Security', 'Security Architecture'],
            modules: ['Password Security', 'Network Security', 'Encryption Basics'],
            games: ['Password Cracking Simulator', 'Network Security Scanner', 'Caesar Cipher'],
            nextSteps: 'Learn cloud security (AWS, Azure), infrastructure as code, and pursue CISSP certification'
        },
        'security-educator': {
            title: '📚 Security Educator',
            description: 'Teach cybersecurity to others',
            icon: 'fas fa-chalkboard-teacher',
            color: '#00ff00',
            skills: ['All Fundamentals', 'Communication', 'Pedagogy', 'Curriculum Design'],
            modules: ['All Learning Modules'],
            games: ['All Games'],
            nextSteps: 'Gain teaching experience, pursue education certifications, and develop comprehensive curricula'
        }
    };
    
    displayCareerRoadmap(roadmapData);
}

// Load Today's Security Tip
function loadTodaysSecurityTip() {
    const tips = [
        'Always check if a website uses HTTPS (look for the padlock icon) before entering any personal information.',
        'Never reuse passwords across different accounts. If one gets hacked, all your accounts could be compromised.',
        'Enable two-factor authentication (2FA) on all important accounts - it adds an extra layer of security.',
        'Be suspicious of emails asking for personal information or urgent action. Legitimate companies rarely ask for sensitive data via email.',
        'Keep your software updated! Security patches fix vulnerabilities that hackers exploit.',
        'Use a password manager to create and store strong, unique passwords for all your accounts.',
        'Never click links in suspicious emails. Instead, go directly to the company\'s website.',
        'Public WiFi is risky - avoid accessing sensitive accounts or making purchases on public networks.',
        'Check the sender\'s email address carefully. Phishing emails often use similar-looking domains (like amaz0n.com instead of amazon.com).',
        'Back up your important data regularly. Ransomware attacks can lock you out of your files.',
        'Don\'t download files from unknown sources, especially .exe files. They could contain malware.',
        'Review your privacy settings on social media regularly. Limit what information is publicly visible.',
        'If something seems too good to be true online, it probably is. Be cautious of "free" offers and prizes.',
        'Use a VPN when connecting to public WiFi to encrypt your internet connection.',
        'Regularly check your bank and credit card statements for unauthorized transactions.',
        'Don\'t share personal information like your full address, phone number, or birthday on public platforms.',
        'Be careful with USB drives from unknown sources - they could contain malware.',
        'Use strong, unique passwords that are at least 12 characters long with a mix of letters, numbers, and symbols.',
        'Verify the legitimacy of websites before entering payment information. Look for trust badges and reviews.',
        'Keep your antivirus software updated and run regular scans to detect malware.'
    ];
    
    // Get tip based on day of year (so it changes daily)
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const tip = tips[dayOfYear % tips.length];
    
    const tipElement = document.getElementById('todaysSecurityTip');
    if (tipElement) {
        tipElement.innerHTML = `<p style="margin: 0;">💡 ${tip}</p>`;
    }
}

// Display career roadmap
function displayCareerRoadmap(roadmapData) {
    const container = document.getElementById('roadmapContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="roadmap-grid">
            ${Object.entries(roadmapData).map(([key, role]) => `
                <div class="roadmap-card" style="background: linear-gradient(135deg, ${role.color}15 0%, ${role.color}05 100%); border: 2px solid ${role.color}40; border-radius: 20px; padding: 2rem; transition: all 0.3s ease; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50px; right: -50px; font-size: 8rem; opacity: 0.1; color: ${role.color};">
                        <i class="${role.icon}"></i>
                    </div>
                    
                    <div class="roadmap-card-header" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; position: relative; z-index: 1;">
                        <div class="roadmap-icon" style="font-size: 3.5rem; color: ${role.color}; text-shadow: 0 0 20px ${role.color}50;">
                            <i class="${role.icon}"></i>
                        </div>
                        <div style="flex: 1;">
                            <h3 style="color: #ffffff; font-size: 1.8rem; margin-bottom: 0.5rem; font-weight: bold;">${role.title}</h3>
                            <p style="color: #cccccc; line-height: 1.6; font-size: 1.05rem;">${role.description}</p>
                        </div>
                    </div>
                    
                    <div class="roadmap-skills" style="margin: 1.5rem 0; position: relative; z-index: 1;">
                        <h4 style="color: ${role.color}; margin-bottom: 1rem; font-size: 1.2rem; font-weight: bold;">⚡ What You'll Master:</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${role.skills.map(skill => `
                                <span style="background: ${role.color}25; color: ${role.color}; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.95rem; border: 1px solid ${role.color}50; font-weight: 500;">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="roadmap-path" style="background: rgba(0,0,0,0.4); padding: 1.5rem; border-radius: 15px; margin-top: 1.5rem; border-left: 4px solid ${role.color}; position: relative; z-index: 1;">
                        <h4 style="color: ${role.color}; margin-bottom: 1rem; font-size: 1.2rem; font-weight: bold;">🎯 Your Journey:</h4>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                                <span style="font-size: 1.5rem;">📚</span>
                                <span style="color: #00ffff; font-weight: bold;">Study These Topics:</span>
                            </div>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-left: 2rem;">
                                ${role.modules.map(module => `
                                    <span style="background: rgba(0,255,255,0.15); color: #00ffff; padding: 0.4rem 0.8rem; border-radius: 10px; font-size: 0.9rem; border: 1px solid rgba(0,255,255,0.3);">${module}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                                <span style="font-size: 1.5rem;">🎮</span>
                                <span style="color: #ff6b6b; font-weight: bold;">Play These Games:</span>
                            </div>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-left: 2rem;">
                                ${role.games.map(game => `
                                    <span style="background: rgba(255,107,107,0.15); color: #ff6b6b; padding: 0.4rem 0.8rem; border-radius: 10px; font-size: 0.9rem; border: 1px solid rgba(255,107,107,0.3);">${game.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="roadmap-next-steps" style="margin-top: 1.5rem; padding: 1.25rem; background: rgba(255,215,0,0.1); border-radius: 12px; border-left: 4px solid #ffd700; position: relative; z-index: 1;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span style="font-size: 1.3rem;">🌟</span>
                            <p style="color: #ffd700; font-weight: bold; margin: 0; font-size: 1.05rem;">What's Next?</p>
                        </div>
                        <p style="color: #ffffff; font-size: 0.95rem; line-height: 1.7; margin: 0;">${role.nextSteps}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Explore career path (removed - no longer needed)
function exploreCareerPath(careerKey) {
    // Just scroll to learn section
    showSection('learn');
}

// Start a career path (removed - no longer using buttons)
function startCareerPath(careerKey) {
    const careerPaths = {
        'penetration-tester': {
            modules: ['Secure Browsing', 'Phishing Recognition'],
            games: ['network-scanner', 'social-engineering', 'capture-the-flag']
        },
        'security-analyst': {
            modules: ['Secure Browsing', 'Password Safety'],
            games: ['network-scanner', 'incident-response', 'malware-analysis']
        },
        'forensics-expert': {
            modules: ['Encryption Basics', 'Secure Browsing'],
            games: ['capture-the-flag', 'malware-analysis']
        },
        'cryptographer': {
            modules: ['Encryption Basics'],
            games: ['caesar-cipher', 'capture-the-flag']
        },
        'security-engineer': {
            modules: ['Password Safety', 'Secure Browsing', 'Encryption Basics'],
            games: ['password-cracker', 'network-scanner', 'caesar-cipher']
        },
        'security-educator': {
            modules: ['Password Safety', 'Phishing Recognition', 'Secure Browsing', 'Encryption Basics'],
            games: ['snake-ladder', 'social-engineering', 'caesar-cipher', 'password-cracker']
        }
    };
    
    const path = careerPaths[careerKey];
    if (!path) return;
    
    // Show a modal with the path
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 2rem; border-radius: 20px; border: 2px solid rgba(0,255,255,0.3); max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto;">
            <h2 style="color: #00ffff; margin-bottom: 1rem;">🎯 Your Career Path Journey</h2>
            <p style="color: #ffffff; margin-bottom: 2rem; line-height: 1.6;">Let's start your learning journey! We'll guide you through the modules and games relevant to this career path.</p>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #ffd700; margin-bottom: 1rem;">📚 Step 1: Learning Modules (Flashcards)</h3>
                <p style="color: #cccccc; font-size: 0.9rem; margin-bottom: 1rem;">Click on any flashcard to learn about these topics:</p>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${path.modules.map(module => `
                        <button onclick="closePathModal(); showSection('learn'); setTimeout(() => { const cards = document.querySelectorAll('.flashcard'); if (cards.length > 0) { const card = Array.from(cards).find(c => c.textContent.includes('${module}')); if (card) { card.click(); } else { alert('Please find and click the \\'${module}\\' flashcard in the Learn section!'); } } }, 500);" 
                                style="padding: 1rem; background: rgba(0,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); border-radius: 10px; color: #00ffff; cursor: pointer; text-align: left; transition: all 0.3s;">
                            <i class="fas fa-book"></i> ${module}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #ffd700; margin-bottom: 1rem;">🎮 Step 2: Practice Games</h3>
                <p style="color: #cccccc; font-size: 0.9rem; margin-bottom: 1rem;">Practice what you learned with these games:</p>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${path.games.map(game => `
                        <button onclick="closePathModal(); showSection('games'); setTimeout(() => startGame('${game}'), 300);" 
                                style="padding: 1rem; background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.3); border-radius: 10px; color: #ff6b6b; cursor: pointer; text-align: left; transition: all 0.3s;">
                            <i class="fas fa-gamepad"></i> ${game.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <button onclick="closePathModal()" style="width: 100%; padding: 1rem; background: rgba(255,0,0,0.2); border: 1px solid #ff0000; border-radius: 10px; color: #ff0000; font-weight: bold; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    window.closePathModal = function() {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    };
}

// Explore career path (show details)
function exploreCareerPath(careerKey) {
    // This can show more details or scroll to the path
    startCareerPath(careerKey);
}

// Load and display learning paths
async function loadLearningPaths() {
    try {
        const response = await fetch('/api/learning/paths');
        const paths = await response.json();
        displayLearningPaths(paths);
    } catch (error) {
        console.error('Error loading learning paths:', error);
    }
}

// Display learning paths
function displayLearningPaths(paths) {
    const container = document.getElementById('learningPathsContainer');
    if (!container) return;
    
    container.innerHTML = Object.values(paths).map(path => `
        <div class="learning-path-card">
            <div class="path-header">
                <div class="path-badge">${path.id === 'beginner' ? '🟢 Beginner' : path.id === 'intermediate' ? '🟡 Intermediate' : '🔴 Advanced'}</div>
                <h3>${path.title}</h3>
                <p class="path-description">${path.description}</p>
                <div class="path-meta">
                    <span><i class="fas fa-clock"></i> ${path.duration}</span>
                    <span><i class="fas fa-book"></i> ${path.modules.length} Modules</span>
                </div>
            </div>
            
            <div class="path-progress-visual">
                <h4 style="margin-bottom: 1rem; color: #00ffff;">Your Journey:</h4>
                <div class="progress-steps">
                    ${path.modules.map((module, index) => `
                        <div class="progress-step" onclick="startModuleFromPath('${path.id}', ${index})">
                            <div class="step-connector ${index === path.modules.length - 1 ? 'last' : ''}"></div>
                            <div class="step-circle">${index + 1}</div>
                            <div class="step-info">
                                <h5>${module.title}</h5>
                                <p><i class="fas fa-hourglass-half"></i> ${module.estimated_time}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="path-outcomes-compact">
                <h4>What You'll Learn:</h4>
                <div class="outcomes-grid">
                    ${path.outcomes.slice(0, 4).map(outcome => `
                        <div class="outcome-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${outcome}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button class="btn btn-primary path-start-btn" onclick="startLearningPath('${path.id}')">
                <i class="fas fa-play"></i> Start Learning Path
            </button>
        </div>
    `).join('');
}

// Start module from path (when clicking progress step)
function startModuleFromPath(pathId, moduleIndex) {
    startPathModule(pathId, moduleIndex);
}

// Start a learning path
function startLearningPath(pathId) {
    // Load the path data
    fetch('/api/learning/paths')
        .then(response => response.json())
        .then(paths => {
            const path = paths[pathId];
            if (!path || !path.modules.length) return;
            
            // Show confirmation modal with path overview
            const modal = document.createElement('div');
            modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
            modal.innerHTML = `
                <div style="background: #1a1a2e; padding: 2.5rem; border-radius: 20px; border: 2px solid rgba(0,255,255,0.3); max-width: 600px; max-height: 80vh; overflow-y: auto;">
                    <h2 style="color: #00ffff; margin-bottom: 1rem; text-align: center;">${path.title}</h2>
                    <p style="color: #cccccc; margin-bottom: 1.5rem; text-align: center;">${path.description}</p>
                    
                    <div style="margin-bottom: 2rem;">
                        <h3 style="color: #00ffff; margin-bottom: 1rem;">📚 Modules in this path:</h3>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            ${path.modules.map((module, index) => `
                                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 10px; border-left: 3px solid #00ffff;">
                                    <div style="width: 35px; height: 35px; background: linear-gradient(45deg, #00ffff, #0080ff); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">${index + 1}</div>
                                    <div style="flex: 1;">
                                        <h4 style="color: #ffffff; margin: 0 0 0.25rem 0;">${module.title}</h4>
                                        <p style="color: #cccccc; margin: 0; font-size: 0.9rem;"><i class="fas fa-hourglass-half"></i> ${module.estimated_time}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); border-radius: 5px; color: #ffffff; cursor: pointer; font-weight: bold;">Cancel</button>
                        <button onclick="startPathModule('${pathId}', 0); this.parentElement.parentElement.parentElement.remove();" style="padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; cursor: pointer; font-weight: bold;">Start Learning Path</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        })
        .catch(error => {
            console.error('Error starting learning path:', error);
        });
}

// Start a specific module from a path
function startPathModule(pathId, moduleIndex) {
    fetch('/api/learning/paths')
        .then(response => response.json())
        .then(paths => {
            const path = paths[pathId];
            if (!path || !path.modules[moduleIndex]) return;
            
            const module = path.modules[moduleIndex];
            showSection('learn');
            setTimeout(() => {
                openModule(module.id);
            }, 300);
        })
        .catch(error => {
            console.error('Error starting module:', error);
        });
}

// Load user progress from backend (after login)
function loadUserProgress() {
    if (!appState.isAuthenticated) return;
    fetch('/api/user/progress', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                appState.currentUser = { ...appState.currentUser, ...data.user };
                updateUserDisplay();
            }
        })
        .catch(error => console.error('Error loading progress:', error));
}

// Save user progress to localStorage (legacy, now using backend)
function saveUserProgress() {
    // Progress now saved to backend via API
}

// Update user display elements
function updateUserDisplay() {
    if (!appState.isAuthenticated) return;
    const u = appState.currentUser;
    const levelEl = document.getElementById('userLevel');
    const pointsEl = document.getElementById('userPoints');
    if (levelEl) levelEl.textContent = `Level ${u.level || 1}`;
    if (pointsEl) pointsEl.textContent = u.points || 0;
    const badgesEl = document.getElementById('totalBadges');
    const streakEl = document.getElementById('streakDays');
    const timeEl = document.getElementById('totalTime');
    if (badgesEl) badgesEl.textContent = u.badges || 0;
    if (streakEl) streakEl.textContent = u.streak || 0;
    if (timeEl) timeEl.textContent = `${u.totalTime || 0}h`;
    const currentStreakEl = document.getElementById('currentStreak');
    const totalPointsEl = document.getElementById('totalPoints');
    const currentLevelEl = document.getElementById('currentLevel');
    if (currentStreakEl) currentStreakEl.textContent = u.streak || 0;
    if (totalPointsEl) totalPointsEl.textContent = u.points || 0;
    if (currentLevelEl) currentLevelEl.textContent = u.level || 1;
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            showSection(section);
            updateActiveNavLink(this);
        });
    });

    // Hero buttons
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.textContent.includes('Learning') ? 'learn' : 'games';
            showSection(target);
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const gameModal = document.getElementById('gameModal');
            const moduleModal = document.getElementById('moduleModal');
            const ctfModal = document.querySelector('.ctf-challenge-modal');
            
            if (gameModal && gameModal.style.display === 'block') {
                closeGame();
            }
            if (moduleModal && moduleModal.style.display === 'block') {
                closeModule();
            }
            if (ctfModal) {
                window.closeCTFChallenge();
            }
        }
    });
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.currentSection = sectionName;
        
        // Initialize flashcards when Learn section is shown
        if (sectionName === 'learn') {
            setTimeout(initializeFlashcards, 100);
        }
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Submit game result to backend (MySQL)
window.submitGameResult = function(gameType, score, duration) {
    fetch(`/api/game/${gameType}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: score, duration: duration || 0 })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Game result saved to database:', data);
        // Update local state with backend response
        if (data.total_points !== undefined) {
            appState.currentUser.points = data.total_points;
            updateUserDisplay();
        }
    })
    .catch(error => {
        console.error('Error submitting game result:', error);
    });
};

// Add points to user
function addPoints(points) {
    appState.currentUser.points += points;
    updateUserDisplay();
    saveUserProgress();
    
    // Check for level up
    checkLevelUp();
    
    // Show points animation
    showPointsAnimation(points);
}

// Check if user should level up
function checkLevelUp() {
    const requiredPoints = appState.currentUser.level * 1000;
    if (appState.currentUser.points >= requiredPoints) {
        levelUp();
    }
}

// Level up user
function levelUp() {
    appState.currentUser.level++;
    updateUserDisplay();
    showLevelUpAnimation();
}

// Show points animation
function showPointsAnimation(points) {
    const pointsElement = document.getElementById('userPoints');
    pointsElement.classList.add('success');
    setTimeout(() => {
        pointsElement.classList.remove('success');
    }, 600);
}

// Show level up animation
function showLevelUpAnimation() {
    const levelElement = document.getElementById('userLevel');
    levelElement.classList.add('success');
    setTimeout(() => {
        levelElement.classList.remove('success');
    }, 1000);
}

// Add achievement
function addAchievement(achievementId, title, description) {
    if (!appState.currentUser.achievements.includes(achievementId)) {
        appState.currentUser.achievements.push(achievementId);
        appState.currentUser.badges++;
        updateUserDisplay();
        saveUserProgress();
        showAchievementNotification(title, description);
    }
}

// Show achievement notification
function showAchievementNotification(title, description) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-trophy"></i>
            <div>
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Awareness / topic module IDs (content loaded from API)
const AWARENESS_MODULE_IDS = [
    // Specialized Awareness Modules (Categorized by Track)
    'school_phishing', 'school_ransomware', 'school_social_engineering', 'school_passwords', 'school_privacy', 'school_zero_day',
    'college_phishing', 'college_ransomware', 'college_social_engineering', 'college_passwords', 'college_privacy', 'college_zero_day',
    'corporate_phishing', 'corporate_ransomware', 'corporate_social_engineering', 'corporate_passwords', 'corporate_privacy', 'corporate_zero_day',
    'it_team_phishing', 'it_team_ransomware', 'it_team_social_engineering', 'it_team_passwords', 'it_team_privacy', 'it_team_zero_day',
    
    // Legacy mapping support
    'school_awareness', 'college_awareness', 'digital_citizen_awareness', 'itpro_awareness',
    'student_awareness',
];

// Open learning module
function openModule(moduleName) {
    if (AWARENESS_MODULE_IDS.includes(moduleName)) {
        fetch(`/api/learning/${moduleName}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error('Module load error:', data.error);
                    return;
                }
                document.getElementById('moduleTitle').textContent = data.title || 'Learning Module';
                document.getElementById('moduleContainer').innerHTML = buildAwarenessModuleHTML(data);
                document.getElementById('moduleModal').style.display = 'block';
            })
            .catch(err => {
                console.error('Error loading awareness module:', err);
            });
        return;
    }
    const moduleData = getModuleData(moduleName);
    if (!moduleData) return;
    
    document.getElementById('moduleTitle').textContent = moduleData.title;
    document.getElementById('moduleContainer').innerHTML = moduleData.content;
    document.getElementById('moduleModal').style.display = 'block';
    
    // Initialize module
    if (moduleData.init) {
        moduleData.init();
    }
}

// Build HTML for structured awareness module (API response). Learning-only: no quizzes.
function buildAwarenessModuleHTML(data) {
    const c = data.content || {};
    const sections = c.sections || [];
    const keyTakeaways = c.key_takeaways || data.key_takeaways || [];
    let html = '<div class="module-content awareness-module">';
    html += '<p class="target-audience">' + escapeHtml(data.target_audience || '') + '</p>';
    html += '<p class="learning-objective">' + escapeHtml(data.learning_objective || '') + '</p>';
    sections.forEach((sec) => {
        html += '<div class="lesson-section awareness-section">';
        html += '<h3>' + escapeHtml(sec.section_title || '') + '</h3>';
        html += '<p>' + escapeHtml(sec.concept_explanation || '') + '</p>';
        if (sec.real_world_example) {
            html += '<div class="real-world-example">';
            html += '<h4>Real-world example</h4><p>' + escapeHtml(sec.real_world_example) + '</p></div>';
        }
        if (sec.how_attack_works) html += '<p><strong>How the attack works:</strong> ' + escapeHtml(sec.how_attack_works) + '</p>';
        if (sec.warning_signs) html += '<p><strong>Warning signs:</strong> ' + escapeHtml(sec.warning_signs) + '</p>';
        if (sec.how_to_prevent) html += '<p><strong>How to prevent it:</strong> ' + escapeHtml(sec.how_to_prevent) + '</p>';
        html += '</div>';
    });
    const riskScoreLogic = c.risk_score_logic || data.risk_score_logic;
    if (riskScoreLogic) {
        html += '<div class="lesson-section"><h4>Personal risk awareness</h4><p>' + escapeHtml(riskScoreLogic) + '</p></div>';
    }
    if (keyTakeaways.length) {
        html += '<div class="lesson-section key-takeaways"><h4>Key takeaways</h4><ul>';
        keyTakeaways.forEach(t => { html += '<li>' + escapeHtml(t) + '</li>'; });
        html += '</ul></div>';
    }
    html += '</div>';
    return html;
}

function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close learning module
function closeModule() {
    document.getElementById('moduleModal').style.display = 'none';
}

// Get module data
function getModuleData(moduleName) {
    const modules = {
        parent_guide: {
            title: 'Parental Guide: Helping Your Child Stay Safe Online',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <h3>👨‍👩‍👧 What Your Child Sees in CyberArcade</h3>
                        <p style="font-size: 1rem; line-height: 1.8; color: #ffffff;">
                            CyberArcade teaches kids and teens about <strong>passwords</strong>, <strong>fake messages (phishing)</strong>,
                            <strong>safe browsing</strong>, <strong>social media safety</strong>, and <strong>privacy</strong> using simple language,
                            stories, and games. They practice spotting red flags instead of just memorizing rules.
                        </p>
                    </div>

                    <div class="lesson-section">
                        <h3>✅ What You <span style="color:#00ff00;">Can Do</span> With Your Child</h3>
                        <ul style="line-height: 2; color: #ffffff; padding-left: 1.2rem;">
                            <li><strong>Sit with them for the first modules or games.</strong> Ask: “What did you learn from this level?”</li>
                            <li><strong>Use the same words they see here.</strong> Talk about “strong passwords”, “phishing”, and “scams” so it feels normal, not scary.</li>
                            <li><strong>Make simple family rules together.</strong> For example:
                                <ul style="margin-top: 0.5rem; margin-left: 1.2rem; font-size: 0.9rem;">
                                    <li>“We never share passwords with friends, only with parents if needed.”</li>
                                    <li>“We don’t click links from strangers or weird messages.”</li>
                                    <li>“If something online feels wrong or confusing, we pause and tell an adult.”</li>
                                </ul>
                            </li>
                            <li><strong>Practice scenarios.</strong> Ask questions like:
                                <em>“If someone DMs you saying you won a free gift, what would you do?”</em></li>
                            <li><strong>Check devices together.</strong> Review app permissions, privacy settings, and who can contact them on social media.</li>
                            <li><strong>Model good behavior.</strong> Let them see you use strong passwords, ignore suspicious links, and talk calmly about mistakes.</li>
                        </ul>
                    </div>

                    <div class="lesson-section">
                        <h3>🚫 What You <span style="color:#ff5555;">Should Avoid</span></h3>
                        <ul style="line-height: 2; color: #ffffff; padding-left: 1.2rem;">
                            <li><strong>Don’t scare them with horror stories only.</strong> Fear can stop them from telling you when something is wrong.</li>
                            <li><strong>Don’t punish honesty.</strong> If they clicked a bad link or talked to someone strange, thank them for telling you first.</li>
                            <li><strong>Don’t post their personal details publicly.</strong> Avoid sharing school name, routine, or location in your own social media posts.</li>
                            <li><strong>Don’t assume “they already know”.</strong> Children often recognize terms (“hacking”, “scam”) but not the subtle red flags.</li>
                            <li><strong>Don’t ignore small warning signs.</strong> Sudden fear of checking messages, secretive behavior, or new “online friends” may need a gentle chat.</li>
                        </ul>
                    </div>

                    <div class="lesson-section">
                        <h3>🛡️ Simple House Rules for Cyber Safety</h3>
                        <ul style="line-height: 2; color: #ffffff; padding-left: 1.2rem;">
                            <li><strong>Device in shared spaces</strong> for younger kids (living room, kitchen), not behind closed doors for long periods.</li>
                            <li><strong>“Ask before you install.”</strong> Children check with you before installing new apps or games.</li>
                            <li><strong>“No secrets with strangers.”</strong> Anyone asking them to keep chats, photos, or calls secret from parents is a red flag.</li>
                            <li><strong>“Pause and show an adult.”</strong> For pop‑ups, prize messages, or anything asking for codes, passwords, or photos.</li>
                            <li><strong>Regular check‑ins.</strong> Once a week, ask: “Did you see anything online this week that made you confused, upset, or curious?”</li>
                        </ul>
                    </div>

                    <div class="lesson-section">
                        <h3>💬 How to Talk When Something Goes Wrong</h3>
                        <p style="font-size: 1rem; line-height: 1.8; color: #ffffff;">
                            Sooner or later, every child will click on the wrong thing, see something scary, or get a strange message.
                            What matters most is that they <strong>feel safe telling you</strong>. You can say things like:
                        </p>
                        <ul style="line-height: 2; color: #ffffff; padding-left: 1.2rem;">
                            <li>“Thank you for telling me. You did the right thing.”</li>
                            <li>“We’ll fix this together. You’re not in trouble for asking for help.”</li>
                            <li>“Let’s block/report this account and talk about how to spot it next time.”</li>
                        </ul>
                    </div>

                    <div class="next-steps" style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.1)); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); text-align: center;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.3rem;">🌱 Next Step as a Parent</h4>
                        <p style="color: #cccccc; margin-bottom: 1.5rem;">
                            Pick <strong>one rule</strong> and <strong>one conversation</strong> from this guide to try with your child this week.
                            Small, calm talks over time work better than one big lecture.
                        </p>
                        <button onclick="closeModule();" style="padding: 0.9rem 1.8rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);">
                            Close Guide
                        </button>
                    </div>
                </div>
            `,
            init: null
        },
        parental_guidelines: {
            title: 'Parental Cyber Safety Guidelines',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <h3>📋 15 Practical Rules to Protect Your Child Online</h3>
                        <p style="font-size: 0.95rem; line-height: 1.8; color: #ffffff;">
                            Use this checklist as a starting point. You don’t have to apply every rule at once—pick the
                            ones that fit your child’s age and your family values, then adjust over time.
                        </p>
                    </div>

                    <div class="lesson-section">
                        <ol style="line-height: 2; color: #ffffff; padding-left: 1.2rem;">
                            <li><strong>Use child / restricted mode on devices.</strong> Turn on child profiles, parental controls, or “Kids Mode” before handing the phone or tablet to your child.</li>
                            <li><strong>Keep devices in shared spaces.</strong> For younger kids, use devices in the living room or kitchen, not alone behind closed doors for long periods.</li>
                            <li><strong>Set “ask before install” as a family rule.</strong> Children must ask you before downloading new apps, games, or browser extensions.</li>
                            <li><strong>Limit apps with chat or DMs.</strong> Prefer apps that don’t allow strangers to contact your child, or lock down those features in settings.</li>
                            <li><strong>Turn on safe search and content filters.</strong> Enable filters on Google, YouTube, and app stores to reduce exposure to adult or violent content.</li>
                            <li><strong>Disable in‑app purchases or protect them with a PIN.</strong> Avoid surprise bills and scammy “buy more coins” pop‑ups.</li>
                            <li><strong>No sharing of personal details with strangers.</strong> Teach your child never to share real name, school, address, routine, or photos with people they only know online.</li>
                            <li><strong>Make “no secrets with online friends” non‑negotiable.</strong> Anyone asking your child to keep chats, photos, or calls secret from parents is a red flag.</li>
                            <li><strong>Set clear time limits and screen‑free zones.</strong> For example: no phones at the dinner table, and devices stay outside the bedroom at night.</li>
                            <li><strong>Review friends / followers together regularly.</strong> Go through their friend list and remove accounts they don’t actually know in real life.</li>
                            <li><strong>Teach “pause and show an adult”.</strong> If a message asks for a code, password, or photo—or feels weird—they should stop and show you before tapping anything.</li>
                            <li><strong>Keep apps and systems updated.</strong> Turn on automatic updates on phones, tablets, browsers, and security software.</li>
                            <li><strong>Use strong passwords and turn on 2FA for family accounts.</strong> Protect shared email, app store, and gaming accounts with strong passwords and two‑factor authentication.</li>
                            <li><strong>Check in emotionally, not just technically.</strong> Ask regularly: “Have you seen anything online that upset, scared, or confused you this week?”</li>
                            <li><strong>Reward honesty, not perfection.</strong> Make it clear they won’t be punished for telling you about mistakes (like clicking a bad link) so they come to you early.</strong></li>
                        </ol>
                    </div>

                    <div class="next-steps" style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.1)); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); text-align: center;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.2rem;">🧩 How to Use These Rules</h4>
                        <p style="color: #cccccc; margin-bottom: 1.5rem;">
                            Choose <strong>3–5 rules</strong> to start with and explain them calmly to your child. As they grow and
                            learn, you can relax or adjust the rules together.
                        </p>
                        <button onclick="closeModule();" style="padding: 0.9rem 1.8rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);">
                            Close Guidelines
                        </button>
                    </div>
                </div>
            `,
            init: null
        },
        passwords: {
            title: 'Password Security',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <h3>🔐 Why Passwords Matter</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                            <strong>For Kids:</strong> Think of a password like a secret code to your treehouse. You wouldn't want just anyone to know it!<br><br>
                            <strong>For Students:</strong> Passwords protect your personal information, school work, and online accounts from hackers.<br><br>
                            <strong>For Professionals:</strong> Weak passwords are the #1 cause of data breaches. A single compromised password can expose entire systems.
                        </p>
                        
                        <div class="real-world-example" style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 5px; border-left: 3px solid #ff0000; margin-bottom: 1.5rem;">
                            <h4>⚠️ Real-World Example:</h4>
                            <p>In 2021, a company lost $4.5 million because an employee used "password123" as their password. Hackers guessed it in seconds!</p>
                        </div>
                        
                        <h3>✅ What Makes a Strong Password?</h3>
                        <div class="password-rules">
                            <div class="rule-item">
                                <i class="fas fa-check-circle" style="color: #00ff00;"></i>
                                <div>
                                    <strong>At least 12 characters long</strong>
                                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.25rem;">Longer = Harder to guess. "MyDog123" (8 chars) vs "MyDogLovesPlaying123!" (22 chars)</p>
                                </div>
                            </div>
                            <div class="rule-item">
                                <i class="fas fa-check-circle" style="color: #00ff00;"></i>
                                <div>
                                    <strong>Mix of uppercase and lowercase letters</strong>
                                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.25rem;">Example: "MyDog" is better than "mydog"</p>
                                </div>
                            </div>
                            <div class="rule-item">
                                <i class="fas fa-check-circle" style="color: #00ff00;"></i>
                                <div>
                                    <strong>Include numbers and special characters</strong>
                                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.25rem;">Example: "MyDog123!" includes numbers and special characters</p>
                                </div>
                            </div>
                            <div class="rule-item">
                                <i class="fas fa-check-circle" style="color: #00ff00;"></i>
                                <div>
                                    <strong>Avoid personal information</strong>
                                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.25rem;">Don't use your name, birthday, pet's name, or favorite sports team</p>
                                </div>
                            </div>
                            <div class="rule-item">
                                <i class="fas fa-check-circle" style="color: #00ff00;"></i>
                                <div>
                                    <strong>Use unique passwords for each account</strong>
                                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.25rem;">If one password is stolen, your other accounts stay safe</p>
                            </div>
                        </div>
                    </div>
                    
                        <div class="password-examples" style="margin-top: 2rem;">
                            <h4>📝 Password Examples:</h4>
                            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                                <div style="padding: 1rem; background: rgba(255,0,0,0.1); border-radius: 5px; border-left: 3px solid #ff0000;">
                                    <strong style="color: #ff0000;">❌ Weak:</strong> "password123"<br>
                                    <small>Too common, too short, no special characters</small>
                                </div>
                                <div style="padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 5px; border-left: 3px solid #ffd700;">
                                    <strong style="color: #ffd700;">⚠️ Medium:</strong> "MyDog123"<br>
                                    <small>Has uppercase/lowercase/numbers, but too short and uses personal info</small>
                                </div>
                                <div style="padding: 1rem; background: rgba(0,255,0,0.1); border-radius: 5px; border-left: 3px solid #00ff00;">
                                    <strong style="color: #00ff00;">✅ Strong:</strong> "Tr3eH0us3!@#2024"<br>
                                    <small>Long, complex, no personal info, includes special characters</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="interactive-section" style="margin-top: 2rem;">
                        <h3>🔧 Test Your Password</h3>
                        <p style="margin-bottom: 1rem; color: #cccccc;">Enter a password below to see how strong it is:</p>
                        <div class="password-checker">
                            <input type="password" id="passwordInput" placeholder="Enter a password to test" style="width: 100%; padding: 1rem; font-size: 1.1rem; background: rgba(255,255,255,0.1); border: 2px solid rgba(0,255,255,0.3); border-radius: 5px; color: white;">
                            <div class="password-strength" id="passwordStrength" style="margin-top: 1rem;">
                                <div class="strength-bar" style="height: 20px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;">
                                    <div class="strength-fill" style="height: 100%; width: 0%; background: linear-gradient(45deg, #ff0000, #ffd700, #00ff00); transition: all 0.3s ease;"></div>
                                </div>
                                <span class="strength-text" style="display: block; margin-top: 0.5rem; font-weight: bold;">Enter a password</span>
                                <div id="passwordFeedback" style="margin-top: 0.5rem; font-size: 0.9rem; color: #cccccc;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quiz-section" style="margin-top: 2rem;">
                        <h3>🎯 Test Your Knowledge</h3>
                        <div class="quiz-question">
                            <p style="font-size: 1.1rem; margin-bottom: 1rem;"><strong>Which password is the strongest?</strong></p>
                            <div class="quiz-options" style="display: grid; gap: 0.75rem;">
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Too common and predictable')">password123</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, true, 'Perfect! Long, complex, includes special characters')">M@xS3cUrE#89</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Too short and uses common words')">iloveyou</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Only numbers, very weak')">12345678</button>
                            </div>
                            <div id="quizExplanation" style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; display: none;"></div>
                        </div>
                        <div style="margin-top: 1.5rem; text-align: center;">
                            <button onclick="closeModule(); showSection('games');" style="padding: 0.8rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,255,255,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,255,255,0.3)'">
                                <i class="fas fa-gamepad"></i> Play Games to Know More!
                            </button>
                        </div>
                    </div>
                    
                    <div class="next-steps" style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.1)); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); text-align: center;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.3rem;">🎮 Ready to Test Your Skills?</h4>
                        <p style="color: #cccccc; margin-bottom: 1.5rem;">Now that you've learned about password security, try the interactive game!</p>
                        <button onclick="closeModule(); startGame('password-cracker');" style="padding: 1rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(0,255,255,0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(0,255,255,0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(0,255,255,0.3)'">
                            <i class="fas fa-gamepad"></i> Play Password Cracker Game
                        </button>
                        <p style="color: #cccccc; margin-top: 1rem; font-size: 0.9rem;">See how easily weak passwords can be cracked!</p>
                    </div>
                </div>
            `,
            init: initPasswordModule,
            relatedGame: 'password-cracker'
        },
        phishing: {
            title: 'Phishing Recognition',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <div style="text-align: center; margin-bottom: 2rem; padding: 1.5rem; background: rgba(255,0,0,0.1); border-radius: 10px; border: 2px solid rgba(255,0,0,0.3);">
                            <h3 style="color: #ff0000; margin-bottom: 1rem; font-size: 1.8rem;">🎣 What is Phishing?</h3>
                            <p style="font-size: 1.1rem; line-height: 1.8; color: #ffffff;">
                                <strong style="color: #ffd700;">For Kids:</strong> Like a fisherman trying to catch fish, hackers "fish" for your information by tricking you!<br><br>
                                <strong style="color: #ffd700;">For Everyone:</strong> Phishing is when attackers pretend to be someone you trust (like your bank or school) to steal your passwords, money, or personal info.
                            </p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
                            <div style="padding: 1.5rem; background: rgba(255,0,0,0.1); border-radius: 10px; border-left: 4px solid #ff0000;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⚠️</div>
                                <h4 style="color: #ff0000; margin-bottom: 0.5rem;">Urgent Language</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">"Act now!", "Limited time!", "Your account will be closed!"</p>
                            </div>
                            <div style="padding: 1.5rem; background: rgba(255,0,0,0.1); border-radius: 10px; border-left: 4px solid #ff0000;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📧</div>
                                <h4 style="color: #ff0000; margin-bottom: 0.5rem;">Suspicious Sender</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Fake email addresses like "paypal-security.com" instead of "paypal.com"</p>
                            </div>
                            <div style="padding: 1.5rem; background: rgba(255,0,0,0.1); border-radius: 10px; border-left: 4px solid #ff0000;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👤</div>
                                <h4 style="color: #ff0000; margin-bottom: 0.5rem;">Generic Greetings</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">"Dear Customer" instead of your actual name</p>
                            </div>
                            <div style="padding: 1.5rem; background: rgba(255,0,0,0.1); border-radius: 10px; border-left: 4px solid #ff0000;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">❌</div>
                                <h4 style="color: #ff0000; margin-bottom: 0.5rem;">Poor Grammar</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Lots of spelling mistakes and bad grammar</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="interactive-section" style="margin-top: 2rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <h3 style="color: #00ffff; margin-bottom: 1.5rem; text-align: center;">🔍 Can You Spot the Phishing Email?</h3>
                        <div class="email-examples">
                            <div class="email-example" data-phishing="true" style="background: rgba(255,0,0,0.1); padding: 1.5rem; border-radius: 10px; border: 2px solid rgba(255,0,0,0.5); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" onclick="showPhishingAnalysis(this)">
                                <div class="email-header" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,0,0,0.3);">
                                    <div style="margin-bottom: 0.5rem;"><strong style="color: #ff0000;">From:</strong> <span style="color: #ffffff;">security@paypal-security.com</span></div>
                                    <div><strong style="color: #ff0000;">Subject:</strong> <span style="color: #ffffff; font-weight: bold;">URGENT: Your account will be closed!</span></div>
                                </div>
                                <div class="email-body" style="color: #ffffff; line-height: 1.8;">
                                    <p>Dear Customer,</p>
                                    <p>We have detected suspicious activity on your account. Click here immediately to verify your identity or your account will be closed in 24 hours.</p>
                                    <p style="margin-top: 1rem;"><a href="#" class="suspicious-link" style="color: #ff0000; text-decoration: underline; font-weight: bold;">Verify Account Now</a></p>
                                </div>
                                <div id="phishingAnalysis" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(255,215,0,0.2); border-radius: 5px; border-left: 3px solid #ffd700;">
                                    <strong style="color: #ffd700;">🔍 Red Flags Found:</strong>
                                    <ul style="margin-top: 0.5rem; color: #ffffff;">
                                        <li>Suspicious domain: "paypal-security.com" (real PayPal uses "paypal.com")</li>
                                        <li>Urgent language: "URGENT", "immediately", "24 hours"</li>
                                        <li>Generic greeting: "Dear Customer" instead of your name</li>
                                        <li>HTTP link (not secure HTTPS)</li>
                                    </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    <div class="quiz-section" style="margin-top: 2rem;">
                        <h3>🎯 Test Your Knowledge</h3>
                        <div class="quiz-question">
                            <p style="font-size: 1.1rem; margin-bottom: 1rem;"><strong>What is the most common sign of a phishing email?</strong></p>
                            <div class="quiz-options" style="display: grid; gap: 0.75rem;">
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Not always - legitimate emails can have attachments')">Has an attachment</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, true, 'Correct! Urgent language is a major red flag used to pressure victims')">Uses urgent language like "Act now!"</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Many phishing emails look professional')">Looks unprofessional</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Phishing emails often come from unknown senders')">Comes from someone you know</button>
                            </div>
                            <div id="quizExplanation" style="margin-top: 1rem; padding: 1rem; background: rgba(255,0,0,0.1); border-radius: 5px; display: none;"></div>
                        </div>
                        <div style="margin-top: 1.5rem; text-align: center;">
                            <button onclick="closeModule(); showSection('games');" style="padding: 0.8rem 1.5rem; background: linear-gradient(45deg, #ff6b6b, #ff8e53); border: none; border-radius: 50px; color: #ffffff; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255,107,107,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(255,107,107,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(255,107,107,0.3)'">
                                <i class="fas fa-gamepad"></i> Play Games to Know More!
                            </button>
                        </div>
                    </div>
                    
                    <div class="next-steps" style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(255,0,0,0.1), rgba(255,100,0,0.1)); border-radius: 10px; border: 2px solid rgba(255,0,0,0.3); text-align: center;">
                        <h4 style="color: #ff6b6b; margin-bottom: 1rem; font-size: 1.3rem;">🎮 Test Your Phishing Detection Skills!</h4>
                        <p style="color: #cccccc; margin-bottom: 1.5rem;">Practice identifying real phishing attacks in our interactive games</p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <button onclick="closeModule(); startGame('phishing-detective');" style="padding: 1rem 2rem; background: linear-gradient(45deg, #ff6b6b, #ff8e53); border: none; border-radius: 50px; color: #ffffff; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(255,107,107,0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(255,107,107,0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(255,107,107,0.3)'">
                                <i class="fas fa-gamepad"></i> Phishing Detective
                            </button>
                            <button onclick="closeModule(); startGame('social-engineering');" style="padding: 1rem 2rem; background: linear-gradient(45deg, #ff6b6b, #ff8e53); border: none; border-radius: 50px; color: #ffffff; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(255,107,107,0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(255,107,107,0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(255,107,107,0.3)'">
                                <i class="fas fa-gamepad"></i> Social Engineering
                            </button>
                        </div>
                    </div>
                </div>
            `,
            init: initPhishingModule,
            relatedGame: 'social-engineering'
        },
        browsing: {
            title: 'Secure Browsing',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <div style="text-align: center; margin-bottom: 2rem; padding: 1.5rem; background: rgba(0,255,255,0.1); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                            <h3 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.8rem;">🌐 Safe Browsing Practices</h3>
                            <p style="font-size: 1.1rem; line-height: 1.8; color: #ffffff;">
                                <strong style="color: #ffd700;">For Kids:</strong> The internet is like a big city - some places are safe, some are dangerous! Learn how to stay safe!<br><br>
                                <strong style="color: #ffd700;">For Everyone:</strong> Most cyber attacks happen through unsafe browsing. Learn to identify safe websites and protect yourself online.
                            </p>
                                </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                            <div style="padding: 1.5rem; background: rgba(0,255,0,0.1); border-radius: 10px; border-left: 4px solid #00ff00;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔒</div>
                                <h4 style="color: #00ff00; margin-bottom: 0.5rem;">Check for HTTPS</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Always look for the lock icon 🔒 and "https://" in the URL. The 'S' means Secure!</p>
                                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 5px; font-family: monospace; font-size: 0.9rem;">
                                    <span style="color: #00ff00;">✅ https://</span><span style="color: #ffffff;">bank.com</span><br>
                                    <span style="color: #ff0000;">❌ http://</span><span style="color: #ffffff;">bank.com</span>
                            </div>
                                </div>
                            <div style="padding: 1.5rem; background: rgba(0,255,0,0.1); border-radius: 10px; border-left: 4px solid #00ff00;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛡️</div>
                                <h4 style="color: #00ff00; margin-bottom: 0.5rem;">Use Antivirus Software</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Like a bodyguard for your computer! Keep it updated to protect against new threats.</p>
                            </div>
                            <div style="padding: 1.5rem; background: rgba(0,255,0,0.1); border-radius: 10px; border-left: 4px solid #00ff00;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⬇️</div>
                                <h4 style="color: #00ff00; margin-bottom: 0.5rem;">Safe Downloads</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Only download from trusted sources. If it's free and seems too good to be true, it probably is!</p>
                                </div>
                            </div>
                        
                        <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255,215,0,0.1); border-radius: 10px; border-left: 3px solid #ffd700;">
                            <h4 style="color: #ffd700; margin-bottom: 1rem;">⚠️ Red Flags to Watch For:</h4>
                            <ul style="color: #ffffff; line-height: 2;">
                                <li>❌ No lock icon in the address bar</li>
                                <li>❌ URLs with typos (amaz0n.com instead of amazon.com)</li>
                                <li>❌ Pop-ups asking for personal information</li>
                                <li>❌ Websites asking you to download software unexpectedly</li>
                                <li>❌ "Too good to be true" offers</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="quiz-section" style="margin-top: 2rem;">
                        <h3>🎯 Test Your Knowledge</h3>
                        <div class="quiz-question">
                            <p style="font-size: 1.1rem; margin-bottom: 1rem;"><strong>What should you look for to know a website is secure?</strong></p>
                            <div class="quiz-options" style="display: grid; gap: 0.75rem;">
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Not always - some safe sites use .org')">The .org domain</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, true, 'Correct! HTTPS and the lock icon indicate encrypted, secure connections')">HTTPS and a lock icon 🔒</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Many safe sites don\'t have this')">A security certificate badge</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'This doesn\'t indicate security')">A professional design</button>
                            </div>
                            <div id="quizExplanation" style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; display: none;"></div>
                        </div>
                        <div style="margin-top: 1.5rem; text-align: center;">
                            <button onclick="closeModule(); showSection('games');" style="padding: 0.8rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,255,255,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,255,255,0.3)'">
                                <i class="fas fa-gamepad"></i> Play Games to Know More!
                            </button>
                        </div>
                    </div>
                    
                    <div class="next-steps" style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.1)); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); text-align: center;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.3rem;">🎮 Practice Secure Browsing!</h4>
                        <p style="color: #cccccc; margin-bottom: 1.5rem;">Test your skills with interactive games that teach safe browsing</p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <button onclick="closeModule(); startGame('spot-the-threat');" style="padding: 1rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(0,255,255,0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(0,255,255,0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(0,255,255,0.3)'">
                                <i class="fas fa-gamepad"></i> Spot the Threat
                            </button>
                            <button onclick="closeModule(); startGame('security-quiz');" style="padding: 1rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(0,255,255,0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(0,255,255,0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(0,255,255,0.3)'">
                                <i class="fas fa-gamepad"></i> Security Quiz
                            </button>
                        </div>
                    </div>
                </div>
            `,
            init: initBrowsingModule,
            relatedGame: 'spot-the-threat'
        },
        encryption: {
            title: 'Encryption Basics',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <div style="text-align: center; margin-bottom: 2rem; padding: 1.5rem; background: rgba(0,255,255,0.1); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3);">
                            <h3 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.8rem;">🔐 What is Encryption?</h3>
                            <p style="font-size: 1.1rem; line-height: 1.8; color: #ffffff;">
                                <strong style="color: #ffd700;">For Kids:</strong> Like a secret code! You write a message that only people with the secret key can read!<br><br>
                                <strong style="color: #ffd700;">For Everyone:</strong> Encryption scrambles your data so only authorized people can read it. It's how your passwords, credit cards, and messages stay safe online!
                            </p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                            <div style="padding: 1.5rem; background: rgba(0,255,255,0.1); border-radius: 10px; border-left: 4px solid #00ffff;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔑</div>
                                <h4 style="color: #00ffff; margin-bottom: 0.5rem;">Symmetric Encryption</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Same key locks and unlocks. Like a regular door key - one key for both!</p>
                            </div>
                            <div style="padding: 1.5rem; background: rgba(0,255,255,0.1); border-radius: 10px; border-left: 4px solid #00ffff;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔓</div>
                                <h4 style="color: #00ffff; margin-bottom: 0.5rem;">Asymmetric Encryption</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Different keys! Public key locks, private key unlocks. Like a mailbox!</p>
                            </div>
                            <div style="padding: 1.5rem; background: rgba(0,255,255,0.1); border-radius: 10px; border-left: 4px solid #00ffff;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📜</div>
                                <h4 style="color: #00ffff; margin-bottom: 0.5rem;">Caesar Cipher</h4>
                                <p style="color: #cccccc; font-size: 0.9rem;">Ancient encryption! Each letter shifts by a number. Used by Julius Caesar 2000 years ago!</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="interactive-section" style="margin-top: 2rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <h3 style="color: #00ffff; margin-bottom: 1.5rem; text-align: center;">🛠️ Try Caesar Cipher Yourself!</h3>
                        <div class="cipher-tool" style="display: grid; gap: 1rem;">
                            <div>
                                <label style="color: #ffffff; display: block; margin-bottom: 0.5rem; font-weight: bold;">📝 Your Message:</label>
                                <input type="text" id="cipherMessage" placeholder="Type a secret message..." style="width: 100%; padding: 1rem; font-size: 1.1rem; background: rgba(255,255,255,0.1); border: 2px solid rgba(0,255,255,0.3); border-radius: 5px; color: white;">
                            </div>
                            <div>
                                <label style="color: #ffffff; display: block; margin-bottom: 0.5rem; font-weight: bold;">🔢 Shift Number:</label>
                                <input type="number" id="cipherShift" value="3" min="1" max="25" style="width: 100%; padding: 1rem; font-size: 1.1rem; background: rgba(255,255,255,0.1); border: 2px solid rgba(0,255,255,0.3); border-radius: 5px; color: white;">
                            </div>
                            <button onclick="encryptMessage()" style="padding: 1rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 5px; color: #000; font-weight: bold; font-size: 1.1rem; cursor: pointer;">🔒 Encrypt Message</button>
                            <div>
                                <label style="color: #ffffff; display: block; margin-bottom: 0.5rem; font-weight: bold;">🔐 Encrypted Result:</label>
                                <input type="text" id="cipherResult" readonly style="width: 100%; padding: 1rem; font-size: 1.1rem; background: rgba(0,255,0,0.1); border: 2px solid rgba(0,255,0,0.3); border-radius: 5px; color: #00ff00; font-weight: bold; font-family: monospace;">
                            </div>
                        </div>
                        <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 5px; border-left: 3px solid #ffd700;">
                            <strong style="color: #ffd700;">💡 How it works:</strong>
                            <p style="color: #cccccc; margin-top: 0.5rem; font-size: 0.9rem;">
                                With shift 3: A→D, B→E, C→F... Z→C (wraps around the alphabet!)
                            </p>
                        </div>
                    </div>
                    
                    <div class="quiz-section" style="margin-top: 2rem;">
                        <h3>🎯 Test Your Knowledge</h3>
                        <div class="quiz-question">
                            <p style="font-size: 1.1rem; margin-bottom: 1rem;"><strong>What is the main purpose of encryption?</strong></p>
                            <div class="quiz-options" style="display: grid; gap: 0.75rem;">
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Encryption doesn\'t speed up data transfer')">To make data transfer faster</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, true, 'Correct! Encryption scrambles data so only authorized people can read it')">To protect data from unauthorized access</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Encryption doesn\'t compress data')">To compress data to save space</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false, 'Encryption doesn\'t organize data')">To organize data better</button>
                            </div>
                            <div id="quizExplanation" style="margin-top: 1rem; padding: 1rem; background: rgba(0,255,255,0.1); border-radius: 5px; display: none;"></div>
                        </div>
                        <div style="margin-top: 1.5rem; text-align: center;">
                            <button onclick="closeModule(); showSection('games');" style="padding: 0.8rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,255,255,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,255,255,0.3)'">
                                <i class="fas fa-gamepad"></i> Play Games to Know More!
                            </button>
                        </div>
                    </div>
                    
                    <div class="next-steps" style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.1)); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); text-align: center;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.3rem;">🎮 Master the Caesar Cipher!</h4>
                        <p style="color: #cccccc; margin-bottom: 1.5rem;">Test your encryption skills with our interactive Caesar Cipher challenge game</p>
                        <button onclick="closeModule(); startGame('caesar-cipher');" style="padding: 1rem 2rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(0,255,255,0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(0,255,255,0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(0,255,255,0.3)'">
                            <i class="fas fa-gamepad"></i> Play Caesar Cipher Game
                        </button>
                    </div>
                </div>
            `,
            init: initEncryptionModule,
            relatedGame: 'caesar-cipher'
        }
    };
    
    return modules[moduleName];
}

// Initialize password module
function initPasswordModule() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('passwordInput').value;
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    const feedbackDiv = document.getElementById('passwordFeedback');
    
    if (!password) {
        if (strengthFill) strengthFill.style.width = '0%';
        if (strengthText) strengthText.textContent = 'Enter a password';
        if (feedbackDiv) feedbackDiv.innerHTML = '';
        return;
    }
    
    let strength = 0;
    let feedback = [];
    let color = '#ff0000';
    
    // Length check
    if (password.length >= 12) {
        strength += 20;
    } else {
        feedback.push(`❌ Too short (need at least 12 characters, you have ${password.length})`);
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
        strength += 20;
    } else {
        feedback.push('❌ Missing lowercase letters');
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 20;
    } else {
        feedback.push('❌ Missing uppercase letters');
    }
    
    // Numbers check
    if (/[0-9]/.test(password)) {
        strength += 20;
    } else {
        feedback.push('❌ Missing numbers');
    }
    
    // Special characters check
    if (/[^A-Za-z0-9]/.test(password)) {
        strength += 20;
    } else {
        feedback.push('❌ Missing special characters (!@#$%^&*)');
    }
    
    // Common password check
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome'];
    if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
        strength -= 30;
        feedback.push('⚠️ Contains common words - avoid these!');
    }
    
    // Set strength level
    if (strength <= 20) {
        strengthText.textContent = 'Very Weak';
        strengthText.style.color = '#ff0000';
        color = '#ff0000';
    } else if (strength <= 40) {
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#ff6600';
        color = '#ff6600';
    } else if (strength <= 60) {
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#ffd700';
        color = '#ffd700';
    } else if (strength <= 80) {
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#66cc00';
        color = '#66cc00';
    } else {
        strengthText.textContent = 'Very Strong!';
        strengthText.style.color = '#00ff00';
        color = '#00ff00';
        feedback = ['✅ Excellent password!'];
    }
    
    if (strengthFill) {
        strengthFill.style.width = Math.min(strength, 100) + '%';
        strengthFill.style.background = color;
    }
    
    if (feedbackDiv) {
        feedbackDiv.innerHTML = feedback.length > 0 ? feedback.join('<br>') : '';
    }
}

// Check quiz answer
function checkQuizAnswer(button, isCorrect, explanation) {
    const options = document.querySelectorAll('.quiz-option');
    const explanationDiv = document.getElementById('quizExplanation');
    
    options.forEach(opt => {
        opt.disabled = true;
        opt.style.cursor = 'not-allowed';
    });
    
    if (isCorrect) {
        button.style.background = 'rgba(0,255,0,0.3)';
        button.style.color = '#00ff00';
        button.style.border = '2px solid #00ff00';
        addPoints(50);
        if (explanationDiv) {
            explanationDiv.innerHTML = `<strong style="color: #00ff00;">✅ Correct!</strong><br>${explanation}`;
            explanationDiv.style.display = 'block';
        }
    } else {
        button.style.background = 'rgba(255,0,0,0.3)';
        button.style.color = '#ff0000';
        button.style.border = '2px solid #ff0000';
        if (explanationDiv) {
            explanationDiv.innerHTML = `<strong style="color: #ff0000;">❌ Incorrect</strong><br>${explanation}`;
            explanationDiv.style.display = 'block';
        }
    }
    
    // Show correct answer
    options.forEach(opt => {
        const onclickStr = opt.getAttribute('onclick') || '';
        if (onclickStr.includes('true')) {
            opt.style.background = 'rgba(0,255,0,0.3)';
            opt.style.color = '#00ff00';
            opt.style.border = '2px solid #00ff00';
        }
    });
}

// Initialize phishing module
function initPhishingModule() {
    // Add click handlers for email examples
    const suspiciousLinks = document.querySelectorAll('.suspicious-link');
    suspiciousLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('⚠️ This is a phishing link! Notice the suspicious domain and urgent language.');
        });
    });
}

// Show phishing analysis
window.showPhishingAnalysis = function(element) {
    const analysisDiv = element.querySelector('#phishingAnalysis');
    if (analysisDiv) {
        analysisDiv.style.display = analysisDiv.style.display === 'none' ? 'block' : 'none';
    }
};

// Initialize browsing module
function initBrowsingModule() {
    // Add interactive elements if needed
}

// Initialize encryption module
function initEncryptionModule() {
    // Add cipher functionality
}

// Encrypt message using Caesar cipher
function encryptMessage() {
    const message = document.getElementById('cipherMessage').value;
    const shift = parseInt(document.getElementById('cipherShift').value);
    const result = document.getElementById('cipherResult');
    
    if (!message) {
        alert('Please enter a message to encrypt');
        return;
    }
    
    let encrypted = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code < 91 ? 65 : 97;
            char = String.fromCharCode(((code - base + shift) % 26) + base);
        }
        encrypted += char;
    }
    
    result.value = encrypted;
    addPoints(25);
}

// Game context data - Why This Matters
const gameContext = {
    'snake-ladder': {
        whyMatters: 'Learning cybersecurity through interactive gameplay makes complex concepts easier to understand and remember.',
        realWorldImpact: 'Gamified learning increases retention by 40% compared to traditional methods.',
        quickTip: 'Answer questions correctly to advance faster on the board!'
    },
    'caesar-cipher': {
        whyMatters: 'Understanding basic encryption helps you appreciate how modern security protects your data.',
        realWorldImpact: 'Encryption protects trillions of dollars in online transactions daily.',
        quickTip: 'Try different shift values - the most common shifts are 3, 13 (ROT13), and 25.'
    },
    'social-engineering': {
        whyMatters: 'Social engineering attacks trick people into giving away sensitive information. 98% of cyberattacks use social engineering!',
        realWorldImpact: 'In 2023, a company lost $50 million when an employee was tricked into transferring funds by a fake "CEO" email.',
        quickTip: 'Always verify requests for sensitive information, even if they seem to come from someone you know.'
    },
    'phishing-detective': {
        whyMatters: 'Phishing is the #1 cyber threat. 91% of successful data breaches start with a phishing email.',
        realWorldImpact: 'A single phishing email can compromise an entire company\'s network in minutes, leading to millions in damages.',
        quickTip: 'Check the sender\'s email address carefully - attackers often use similar-looking domains.'
    },
    'security-quiz': {
        whyMatters: 'Testing your knowledge helps you identify gaps in your cybersecurity awareness.',
        realWorldImpact: 'People who regularly test their security knowledge are 3x less likely to fall for scams.',
        quickTip: 'Review wrong answers carefully - they show areas where you need more awareness.'
    },
    'spot-the-threat': {
        whyMatters: 'Visual threat detection helps you recognize suspicious activity in real-time.',
        realWorldImpact: 'Quick threat recognition can prevent data breaches and save companies millions.',
        quickTip: 'Look for unusual patterns - legitimate activity follows predictable patterns.'
    },
    'password-cracker': {
        whyMatters: 'Understanding how passwords are cracked helps you create stronger passwords that protect your accounts.',
        realWorldImpact: 'Weak passwords are responsible for 81% of data breaches. Strong passwords can prevent most attacks.',
        quickTip: 'Use long, complex passwords with a mix of letters, numbers, and symbols. Consider using a password manager!'
    },
    'incident-response': {
        whyMatters: 'Knowing how to respond to security incidents can save companies millions and protect personal data.',
        realWorldImpact: 'Companies that respond to breaches within 24 hours reduce costs by 40% compared to slower responses.',
        quickTip: 'The first 15 minutes of an incident are critical - contain the threat immediately!'
    },
    'capture-the-flag': {
        whyMatters: 'CTF challenges teach real-world security skills used by professionals to find and fix vulnerabilities.',
        realWorldImpact: 'Many security professionals started with CTF challenges - it\'s how they learned to protect systems.',
        quickTip: 'Start with cryptography challenges - they teach you how encryption works in real systems.'
    },
    'malware-analysis': {
        whyMatters: 'Understanding malware helps you protect against it. Malware causes $6 trillion in damages annually.',
        realWorldImpact: 'Security analysts who can analyze malware quickly can stop attacks before they spread.',
        quickTip: 'Always analyze malware in a safe, isolated environment - never on your main computer!'
    },
    'network-scanner': {
        whyMatters: 'Network security scanning helps find vulnerabilities before attackers do. Essential for security professionals.',
        realWorldImpact: 'Regular scans and patching reduce breach risk by up to 80% in enterprise environments.',
        quickTip: 'Always get authorization before scanning any network - unauthorized scanning is illegal.'
    }
};

// Start game with "Why This Matters" popup
function startGame(gameName) {
    const gameData = getGameData(gameName);
    if (!gameData) return;
    
    const context = gameContext[gameName];
    
    // Show "Why This Matters" popup first
    if (context) {
        showWhyThisMattersPopup(gameName, gameData, context);
    } else {
        // If no context, start game directly
        openGameDirectly(gameName, gameData);
    }
}

// Show "Why This Matters" popup
function showWhyThisMattersPopup(gameName, gameData, context) {
    const popup = document.createElement('div');
    popup.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
    popup.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 3rem; border-radius: 20px; border: 2px solid rgba(0,255,255,0.3); max-width: 700px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,255,255,0.2);">
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎯</div>
                <h2 style="color: #00ffff; font-size: 2rem; margin-bottom: 0.5rem;">Why This Matters</h2>
                <h3 style="color: #ffffff; font-size: 1.3rem;">${gameData.title}</h3>
            </div>
            
            <div style="background: rgba(0,255,255,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem; border-left: 4px solid #00ffff;">
                <h4 style="color: #00ffff; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-lightbulb"></i> Why This Matters
                </h4>
                <p style="color: #ffffff; font-size: 1.1rem; line-height: 1.6;">${context.whyMatters}</p>
            </div>
            
            <div style="background: rgba(255,107,107,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem; border-left: 4px solid #ff6b6b;">
                <h4 style="color: #ff6b6b; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-exclamation-triangle"></i> Real-World Impact
                </h4>
                <p style="color: #ffffff; font-size: 1.1rem; line-height: 1.6;">${context.realWorldImpact}</p>
            </div>
            
            <div style="background: rgba(0,255,0,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border-left: 4px solid #00ff00;">
                <h4 style="color: #00ff00; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-tip"></i> Quick Tip
                </h4>
                <p style="color: #ffffff; font-size: 1.1rem; line-height: 1.6;">${context.quickTip}</p>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove(); openGameDirectly('${gameName}', window.CyberArcadeGames['${gameName}']);" 
                        style="padding: 1rem 2.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; cursor: pointer; font-weight: bold; font-size: 1.1rem; transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 30px rgba(0,255,255,0.3)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    <i class="fas fa-play"></i> Start Game
                </button>
                <button onclick="this.parentElement.parentElement.parentElement.remove();" 
                        style="padding: 1rem 2.5rem; background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.3); border-radius: 50px; color: #ffffff; cursor: pointer; font-weight: bold; font-size: 1.1rem; transition: all 0.3s ease;"
                        onmouseover="this.style.background='rgba(255,255,255,0.2)'"
                        onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                    Cancel
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

// Open game directly (after popup or if no context)
function openGameDirectly(gameName, gameData) {
    document.getElementById('gameTitle').textContent = gameData.title;
    
    // Add back button and quick tips sidebar
    const context = gameContext[gameName];
    const quickTipSidebar = context ? `
        <div id="quickTipSidebar" style="position: fixed; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(0,255,255,0.15); padding: 1.5rem; border-radius: 15px; border: 2px solid rgba(0,255,255,0.3); max-width: 250px; z-index: 1500; box-shadow: 0 10px 30px rgba(0,255,255,0.2);">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: #00ffff;">
                <i class="fas fa-lightbulb"></i>
                <h4 style="margin: 0; font-size: 1rem;">Quick Tip</h4>
            </div>
            <p style="color: #ffffff; font-size: 0.9rem; line-height: 1.5; margin: 0;">${context.quickTip}</p>
        </div>
    ` : '';
    
    const backButton = `
        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(0,255,255,0.1); border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #cccccc; font-size: 0.9rem;">
                <i class="fas fa-info-circle"></i> Press <strong>ESC</strong> or click <strong>×</strong> to close
            </span>
            <button onclick="closeGame(); showSection('games');" style="padding: 0.5rem 1rem; background: rgba(0,255,255,0.2); border: 1px solid rgba(0,255,255,0.5); border-radius: 5px; color: #00ffff; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(0,255,255,0.3)'" onmouseout="this.style.background='rgba(0,255,255,0.2)'">
                <i class="fas fa-arrow-left"></i> Back to Games
            </button>
        </div>
    `;
    
    document.getElementById('gameContainer').innerHTML = backButton + gameData.content;
    document.getElementById('gameModal').style.display = 'block';
    
    // Add quick tip sidebar
    if (context) {
        document.body.insertAdjacentHTML('beforeend', quickTipSidebar);
    }
    
    // Initialize game
    if (gameData.init) {
        gameData.init();
    }
}

// Close game
function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
    // Remove quick tip sidebar if it exists
    const sidebar = document.getElementById('quickTipSidebar');
    if (sidebar) {
        sidebar.remove();
    }
}

// Get game data
function getGameData(gameName) {
    if (!window.CyberArcadeGames || !window.CyberArcadeGames[gameName]) {
        console.warn(`Game not found: ${gameName}`);
        return null;
    }
    return window.CyberArcadeGames[gameName];
}

// Close modals when clicking outside
window.onclick = function(event) {
    const gameModal = document.getElementById('gameModal');
    const moduleModal = document.getElementById('moduleModal');
    
    if (event.target === gameModal) {
        gameModal.style.display = 'none';
    }
    if (event.target === moduleModal) {
        moduleModal.style.display = 'none';
    }
}

// Add CSS for additional styling
const additionalStyles = `
    .module-content {
        padding: 2rem;
    }
    
    .lesson-section {
        margin-bottom: 2rem;
    }
    
    .lesson-section h3 {
        color: #00ffff;
        margin-bottom: 1rem;
    }
    
    .password-rules {
        display: grid;
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .rule-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(0, 255, 255, 0.1);
        border-radius: 10px;
        border: 1px solid rgba(0, 255, 255, 0.3);
    }
    
    .rule-item i {
        color: #00ff00;
        font-size: 1.2rem;
    }
    
    .password-checker {
        margin: 2rem 0;
    }
    
    .password-checker input {
        width: 100%;
        padding: 1rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }
    
    .password-strength {
        margin-top: 1rem;
    }
    
    .strength-bar {
        width: 100%;
        height: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .strength-bar .strength-bar {
        height: 100%;
        transition: width 0.3s ease;
    }
    
    .quiz-section {
        margin-top: 2rem;
    }
    
    .quiz-options {
        display: grid;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .quiz-option {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 10px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quiz-option:hover {
        background: rgba(0, 255, 255, 0.2);
        border-color: #00ffff;
    }
    
    .achievement-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00ffff, #0080ff);
        color: #000;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 3000;
    }
    
    .achievement-notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content i {
        font-size: 2rem;
    }
    
    .game-container {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;
        height: 500px;
    }
    
    .game-board {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 10px;
        padding: 1rem;
    }
    
    .game-controls {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .dice-container {
        text-align: center;
    }
    
    .dice {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .player-info h4 {
        color: #00ffff;
        margin-bottom: 0.5rem;
    }
    
    .crossword-container {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;
    }
    
    .crossword-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2px;
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 10px;
    }
    
    .crossword-cell {
        aspect-ratio: 1;
        border: 1px solid rgba(0, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: #ffffff;
    }
    
    .crossword-clues {
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid rgba(0, 255, 255, 0.3);
    }
    
    .clue-item {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background: rgba(0, 255, 255, 0.1);
        border-radius: 5px;
        font-size: 0.9rem;
    }
    
    .escape-room-container {
        text-align: center;
    }
    
    .challenge-display {
        background: rgba(255, 255, 255, 0.05);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
    }
    
    .challenge-options {
        display: grid;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .challenge-option {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 10px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .challenge-option:hover {
        background: rgba(0, 255, 255, 0.2);
        border-color: #00ffff;
    }
    
    .escape-progress {
        margin-top: 2rem;
    }
    
    .progress-bar {
        width: 100%;
        height: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(45deg, #00ffff, #0080ff);
        transition: width 0.3s ease;
    }
    
    .phishing-game-container {
        text-align: center;
    }
    
    .email-display {
        background: rgba(255, 255, 255, 0.05);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .email-content {
        font-size: 1.2rem;
        line-height: 1.6;
        color: #ffffff;
    }
    
    .phishing-controls {
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin-bottom: 2rem;
    }
    
    .btn-danger {
        background: #ff0000;
        color: #ffffff;
    }
    
    .btn-success {
        background: #00ff00;
        color: #000000;
    }
    
    .cipher-game-container {
        text-align: center;
    }
    
    .cipher-challenge {
        background: rgba(255, 255, 255, 0.05);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
    }
    
    .cipher-message {
        font-size: 2rem;
        font-weight: bold;
        color: #00ffff;
        margin: 1rem 0;
        padding: 1rem;
        background: rgba(0, 255, 255, 0.1);
        border-radius: 10px;
    }
    
    .cipher-input {
        margin-top: 2rem;
    }
    
    .cipher-input input {
        padding: 1rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        font-size: 1.1rem;
        margin-right: 1rem;
        width: 300px;
    }
    
    .password-checker-container {
        text-align: center;
    }
    
    .password-input-section {
        background: rgba(255, 255, 255, 0.05);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
    }
    
    .password-input-section input {
        width: 100%;
        padding: 1rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }
    
    .password-strength-display {
        margin-top: 1rem;
    }
    
    .strength-fill {
        height: 100%;
        transition: width 0.3s ease;
    }
    
    .password-suggestions {
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid rgba(0, 255, 255, 0.3);
    }
    
    .suggestion-item {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background: rgba(255, 165, 0, 0.1);
        border-radius: 5px;
        color: #ffa500;
    }
`;

// Add the additional styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Flashcards Data
const flashcardsData = [
    {
        title: "Phishing Recognition",
        icon: "fas fa-fish",
        content: `
            <h4>🎣 The Digital Fishing Net</h4>
            <p>Imagine someone casting a fishing line with bait, hoping you'll bite. That's exactly what phishing is - but instead of fish, they're after your personal information.</p>
            
            <p style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <strong>Real Story:</strong> Sarah got a text: "Your Netflix account is suspended! Click here to reactivate." She clicked, entered her password, and within hours, someone was using her account. The link looked real, but it wasn't Netflix at all.
            </p>
            
            <h4>🎯 What They're Really After</h4>
            <p>Attackers want one thing: <strong>access to your accounts</strong>. Once they have your password or OTP, they can:</p>
            <ul>
                <li>Drain your bank account</li>
                <li>Steal your identity</li>
                <li>Access your photos and messages</li>
                <li>Use your accounts to scam your friends</li>
            </ul>
            
            <h4>📱 Where Phishing Lurks</h4>
            <p>You'll find phishing attempts everywhere:</p>
            <ul>
                <li><strong>Email:</strong> "Your package couldn't be delivered" (but you didn't order anything)</li>
                <li><strong>SMS:</strong> "Your bank account needs verification" (from a random number)</li>
                <li><strong>WhatsApp:</strong> "You've won a prize! Click here!" (from an unknown contact)</li>
                <li><strong>Social Media:</strong> Fake friend requests with suspicious links</li>
            </ul>
            
            <h4>🚨 Red Flags to Watch For</h4>
            <div style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>⚠️ Urgency:</strong> "Act now or your account will be closed in 24 hours!"</p>
                <p><strong>⚠️ Suspicious Sender:</strong> Email from "support@amaz0n.com" (notice the zero instead of 'o')</p>
                <p><strong>⚠️ Generic Greeting:</strong> "Dear Customer" instead of your name</p>
                <p><strong>⚠️ Poor Grammar:</strong> "Youre account has been suspened"</p>
                <p><strong>⚠️ Asking for Sensitive Info:</strong> Real companies never ask for passwords via email!</p>
            </div>
            
            <h4>🛡️ Your Defense Strategy</h4>
            <ol>
                <li><strong>Pause before clicking:</strong> Ask yourself - did I expect this message?</li>
                <li><strong>Check the sender:</strong> Hover over links to see the real URL</li>
                <li><strong>Type it yourself:</strong> Instead of clicking, go directly to the website</li>
                <li><strong>Never share OTPs:</strong> Legitimate services never ask for OTPs via phone/email</li>
                <li><strong>When in doubt, verify:</strong> Call the company directly using their official number</li>
            </ol>
            
            <p style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #00ff00; margin-top: 1rem;">
                <strong>💡 Pro Tip:</strong> If something feels off, it probably is. Trust your gut and verify before clicking!
            </p>
        `
    },
    {
        title: "Password Safety",
        icon: "fas fa-key",
        content: `
            <h4>🔐 Your Digital Front Door</h4>
            <p>Your password is like the key to your house. If it's weak, anyone can break in. If it's strong, you're safe.</p>
            
            <p style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <strong>Shocking Fact:</strong> "123456" and "password" are still the most common passwords. Hackers try these FIRST. Using them is like leaving your front door wide open!
            </p>
            
            <h4>💀 Passwords That Get Hacked in Seconds</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin: 1rem 0;">
                <div style="background: rgba(255,0,0,0.1); padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <code style="color: #ff0000; font-size: 1.1rem;">123456</code>
                    <p style="font-size: 0.85rem; color: #cccccc; margin-top: 0.25rem;">Hacked in 0.1 seconds</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <code style="color: #ff0000; font-size: 1.1rem;">password</code>
                    <p style="font-size: 0.85rem; color: #cccccc; margin-top: 0.25rem;">Hacked in 0.2 seconds</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <code style="color: #ff0000; font-size: 1.1rem;">qwerty</code>
                    <p style="font-size: 0.85rem; color: #cccccc; margin-top: 0.25rem;">Hacked in 0.3 seconds</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <code style="color: #ff0000; font-size: 1.1rem;">yourname123</code>
                    <p style="font-size: 0.85rem; color: #cccccc; margin-top: 0.25rem;">Hacked in 5 seconds</p>
                </div>
            </div>
            
            <h4>💪 The Password Formula</h4>
            <p>Think of it like a recipe - mix these ingredients:</p>
            <ul>
                <li><strong>Uppercase letters:</strong> A, B, C... (at least 2)</li>
                <li><strong>Lowercase letters:</strong> a, b, c... (at least 2)</li>
                <li><strong>Numbers:</strong> 0-9 (at least 2)</li>
                <li><strong>Symbols:</strong> @, #, $, !... (at least 1)</li>
                <li><strong>Length:</strong> 12+ characters (longer = stronger!)</li>
            </ul>
            
            <h4>⭐ Real Examples</h4>
            <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>Weak:</strong> <code style="color: #ff0000;">mypassword123</code> ❌ (Too simple, no symbols)</p>
                <p><strong>Better:</strong> <code style="color: #ffaa00;">MyPass123!</code> ⚠️ (Good mix, but too short)</p>
                <p><strong>Strong:</strong> <code style="color: #00ff00;">Tr0ub@dor&3</code> ✅ (Has everything, but hard to remember)</p>
                <p><strong>Perfect:</strong> <code style="color: #00ff00;">Blue$ky#2024!Mount@in</code> ✅✅ (Long, memorable phrase with symbols)</p>
            </div>
            
            <h4>🎨 The Passphrase Trick</h4>
            <p>Instead of one word, use a sentence you can remember:</p>
            <p style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <strong>Example:</strong> "I love pizza on Fridays!" becomes <code>ILovePizzaOnFridays!</code><br>
                Add numbers and symbols: <code>ILovePizzaOnFridays!2024</code>
            </p>
            
            <h4>🔑 The Golden Rules</h4>
            <ol>
                <li><strong>One password per account</strong> - If one gets hacked, others stay safe</li>
                <li><strong>Never share passwords</strong> - Not even with friends or family</li>
                <li><strong>Use a password manager</strong> - It remembers all your passwords securely</li>
                <li><strong>Change passwords if breached</strong> - Check haveibeenpwned.com</li>
            </ol>
            
            <p style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ffd700; margin-top: 1rem;">
                <strong>💡 Remember:</strong> A strong password is like a good lock - it won't stop determined thieves, but it will stop 99% of them!
            </p>
        `
    },
    {
        title: "Secure Browsing",
        icon: "fas fa-globe",
        content: `
            <h4>🌐 The Internet: Your Digital Playground</h4>
            <p>The internet is amazing - you can learn anything, connect with anyone, play games, watch videos. But just like a real playground, you need to know which areas are safe and which to avoid.</p>
            
            <p style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <strong>Real Story:</strong> Jake wanted free game currency. He clicked a link promising "Free 10,000 coins!" and downloaded an app. Within days, his phone was slow, ads popped up everywhere, and his battery drained fast. He'd downloaded malware disguised as a game hack.
            </p>
            
            <h4>🚫 The Danger Zone</h4>
            <p>These are red flags - avoid them like you'd avoid a dark alley at night:</p>
            <ul>
                <li><strong>"Free" anything suspicious:</strong> Free money, free diamonds, free premium accounts</li>
                <li><strong>Download sites:</strong> "Download latest movies free" (often full of viruses)</li>
                <li><strong>Pop-up ads:</strong> "You've won! Click here!" (you didn't win anything)</li>
                <li><strong>Adult content sites:</strong> Often loaded with malware</li>
                <li><strong>Torrent sites:</strong> Illegal downloads = high malware risk</li>
            </ul>
            
            <h4>🔒 The HTTPS Lock</h4>
            <p>Look at your browser's address bar right now. See the lock icon? That's HTTPS - your safety indicator.</p>
            
            <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>✅ Safe:</strong> <code style="color: #00ff00;">https://google.com</code> (has lock, encrypted)</p>
                <p><strong>❌ Dangerous:</strong> <code style="color: #ff0000;">http://random-site.com</code> (no lock, unencrypted)</p>
            </div>
            
            <p><strong>Rule of thumb:</strong> If there's no lock icon, don't enter any personal information!</p>
            
            <h4>🛡️ Your Browsing Safety Checklist</h4>
            <ol>
                <li><strong>Check the lock:</strong> Always look for HTTPS before entering passwords</li>
                <li><strong>Read URLs carefully:</strong> "amaz0n.com" is NOT "amazon.com" (see the zero?)</li>
                <li><strong>Don't click random links:</strong> Especially in emails or messages from strangers</li>
                <li><strong>Use incognito mode:</strong> When using public computers or browsing sensitive topics</li>
                <li><strong>Keep your browser updated:</strong> Updates fix security holes</li>
                <li><strong>Install an ad blocker:</strong> Reduces risk of malicious ads</li>
            </ol>
            
            <h4>📱 Mobile Browsing Tips</h4>
            <p>On your phone, be extra careful:</p>
            <ul>
                <li>Only download apps from official stores (Google Play, App Store)</li>
                <li>Read app reviews before downloading</li>
                <li>Check app permissions - why does a calculator need access to your contacts?</li>
                <li>Don't click links in SMS from unknown numbers</li>
            </ul>
            
            <p style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #00ffff; margin-top: 1rem;">
                <strong>💡 Pro Tip:</strong> When in doubt, don't click. If something seems too good to be true, it probably is. Trust your instincts!
            </p>
        `
    },
    {
        title: "Encryption Basics",
        icon: "fas fa-lock",
        content: `
            <h4>🔐 Your Digital Secret Code</h4>
            <p>Remember writing secret notes to friends in school? You'd use a code so only they could read it. Encryption is the same thing, but for computers - it scrambles your data so only the right person can unscramble it.</p>
            
            <h4>🎭 The Magic Trick</h4>
            <p>Imagine you write "Hello" on a piece of paper, but before sending it, you scramble it to "Khoor" (shifted by 3 letters). Anyone who intercepts it sees gibberish. Only someone who knows the "shift by 3" rule can decode it back to "Hello".</p>
            
            <p style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #00ffff; margin: 1rem 0;">
                <strong>Real Example:</strong> When you send "I love you" on WhatsApp, it gets encrypted to something like "X7#mK9@2pQ". Even if hackers intercept it, they see nonsense. Only your friend's phone has the key to decode it back to "I love you".
            </p>
            
            <h4>🏦 Where You Use Encryption Every Day</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1rem 0;">
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">💬 Messaging Apps</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">WhatsApp, Signal, iMessage</p>
                </div>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">💳 Online Payments</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Credit cards, UPI, PayPal</p>
                </div>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">🏦 Banking</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">ATM transactions, online banking</p>
                </div>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">☁️ Cloud Storage</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Google Drive, iCloud, Dropbox</p>
                </div>
            </div>
            
            <h4>🔒 Why It Matters</h4>
            <p>Without encryption, your data travels through the internet like a postcard - anyone can read it. With encryption, it's like a sealed envelope - only the recipient can open it.</p>
            
            <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <p><strong>⚠️ Without Encryption:</strong> Your password "MyPass123" travels as "MyPass123" - hackers can see it!</p>
                <p><strong>✅ With Encryption:</strong> Your password "MyPass123" becomes "9X#mP2@kL7" - hackers see gibberish!</p>
            </div>
            
            <h4>🔑 Types of Encryption</h4>
            <ul>
                <li><strong>Symmetric:</strong> Same key to lock and unlock (like a regular door key)</li>
                <li><strong>Asymmetric:</strong> Different keys to lock and unlock (like a mailbox - anyone can drop mail, only you have the key to open)</li>
                <li><strong>Caesar Cipher:</strong> Simple shift cipher (what we practice in the Caesar Cipher game!)</li>
            </ul>
            
            <h4>💡 How to Know You're Protected</h4>
            <p>Look for these signs:</p>
            <ul>
                <li>🔒 Lock icon in your browser (HTTPS)</li>
                <li>🔒 "End-to-end encrypted" message in WhatsApp</li>
                <li>🔒 "Secure connection" in banking apps</li>
            </ul>
            
            <p style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ffd700; margin-top: 1rem;">
                <strong>💡 Remember:</strong> Encryption is everywhere protecting you. You don't need to understand the math - just know that when you see that lock icon, your data is safe!
            </p>
        `
    },
    {
        title: "Firewall",
        icon: "fas fa-shield-alt",
        content: `
            <h4>🛡️ Your Digital Bodyguard</h4>
            <p>Think of a firewall as a bouncer at a club. It stands between your device and the internet, checking every single thing trying to get in or out. If something looks suspicious, it gets blocked immediately.</p>
            
            <p style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #00ffff; margin: 1rem 0;">
                <strong>Real Example:</strong> A hacker tries to connect to your computer on port 3389 (Remote Desktop). Your firewall sees this suspicious connection attempt and immediately blocks it. You never even know it happened - that's how good firewalls are!
            </p>
            
            <h4>🚪 How It Works</h4>
            <p>Your device has "ports" - like doors. Port 80 is for web browsing, port 443 for secure browsing, etc. A firewall decides which ports are open and which are closed.</p>
            
            <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>✅ Allowed:</strong> Your browser connecting to websites (port 443)</p>
                <p><strong>❌ Blocked:</strong> Random stranger trying to access your files (port 445)</p>
            </div>
            
            <h4>🔥 What Firewalls Stop</h4>
            <ul>
                <li><strong>Hackers:</strong> Trying to break into your device</li>
                <li><strong>Malware:</strong> Trying to send your data to attackers</li>
                <li><strong>Unauthorized apps:</strong> Trying to access the internet without permission</li>
                <li><strong>Port scanners:</strong> Attackers checking for open doors</li>
            </ul>
            
            <h4>💻 Built-In Protection</h4>
            <p>Good news - you probably already have one! Windows has Windows Firewall, Mac has built-in firewall, and routers have firewalls too. They're usually on by default, protecting you 24/7.</p>
            
            <p style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ffd700; margin-top: 1rem;">
                <strong>💡 Pro Tip:</strong> Keep your firewall enabled! It's like having a security guard that never sleeps, never takes breaks, and works for free.
            </p>
        `
    },
    {
        title: "VPN (Virtual Private Network)",
        icon: "fas fa-network-wired",
        content: `
            <h4>🌍 What is a VPN?</h4>
            <p>A Virtual Private Network hides your location and encrypts your internet connection.</p>
            
            <h4>🎧 Story Example</h4>
            <p>Using open Wi-Fi at a café is like talking loudly — anyone can overhear.<br>
            A VPN turns your conversation into a private whisper.</p>
            
            <h4>📌 Uses</h4>
            <ul>
                <li>Protects you on public Wi-Fi</li>
                <li>Hides your real IP address</li>
                <li>Prevents tracking</li>
            </ul>
        `
    },
    {
        title: "Ransomware",
        icon: "fas fa-bug",
        content: `
            <h4>💣 The Digital Kidnapper</h4>
            <p>Imagine someone breaking into your house, locking all your important stuff in a safe, and demanding money to give you the combination. That's ransomware - but for your digital files.</p>
            
            <p style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <strong>Real Horror Story:</strong> A hospital's entire system got hit by ransomware. Patient records, appointment schedules, everything was locked. The attackers demanded $1 million. The hospital couldn't access anything for days. They had to pay because lives were at stake. This is why ransomware is so dangerous!
            </p>
            
            <h4>🎯 How It Happens</h4>
            <p>You click a suspicious link or download a file. The ransomware installs silently, then:</p>
            <ol>
                <li>Scans your computer for important files (photos, documents, videos)</li>
                <li>Encrypts them all (locks them with a secret code)</li>
                <li>Shows a message: "Pay $500 in Bitcoin to get your files back"</li>
                <li>Your files are now useless until you pay (or restore from backup)</li>
            </ol>
            
            <h4>🚨 Warning Signs</h4>
            <ul>
                <li>Files have weird extensions (.locked, .encrypted, .crypto)</li>
                <li>You see a ransom note on your screen</li>
                <li>Your files won't open</li>
                <li>Strange file names appear (like "DECRYPT_INSTRUCTIONS.txt")</li>
            </ul>
            
            <h4>🛡️ Your Defense Plan</h4>
            <div style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>1. Backups are your lifeline:</strong> If you have backups, you can restore everything without paying</p>
                <p><strong>2. Don't click suspicious links:</strong> Especially in emails from unknown senders</p>
                <p><strong>3. Keep software updated:</strong> Updates patch security holes</p>
                <p><strong>4. Use antivirus:</strong> It can catch ransomware before it activates</p>
                <p><strong>5. Never pay the ransom:</strong> There's no guarantee you'll get your files back, and you're funding criminals</p>
            </div>
            
            <p style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ffd700; margin-top: 1rem;">
                <strong>💡 Golden Rule:</strong> If you have backups, ransomware is just an inconvenience. If you don't have backups, it's a disaster. Back up your important files regularly!
            </p>
        `
    },
    {
        title: "Two-Factor Authentication (2FA)",
        icon: "fas fa-mobile-alt",
        content: `
            <h4>🔐 Double the Security, Double the Protection</h4>
            <p>Your password is like a key. But what if someone steals your key? 2FA adds a second lock - even if they have your password, they can't get in without the second factor.</p>
            
            <p style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <strong>Real Story:</strong> Mike's password got leaked in a data breach. Hackers tried to log into his account, but he had 2FA enabled. They entered the password correctly, but then the site asked for a code from his phone. They didn't have his phone, so they couldn't get in. Mike got a notification, changed his password, and stayed safe!
            </p>
            
            <h4>🎯 How It Works</h4>
            <p>Step 1: Enter your password (something you KNOW)<br>
            Step 2: Enter a code from your phone (something you HAVE)</p>
            
            <p>Even if hackers steal your password, they don't have your phone, so they're stuck!</p>
            
            <h4>📱 Types of 2FA</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1rem 0;">
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">📲 SMS/OTP</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Code sent to your phone</p>
                </div>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">👆 Fingerprint</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Your unique fingerprint</p>
                </div>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">😊 Face ID</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Facial recognition</p>
                </div>
                <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #00ffff;">🔐 Authenticator App</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Google Authenticator, Authy</p>
                </div>
            </div>
            
            <h4>✅ Where to Enable 2FA</h4>
            <p>Enable it on these accounts ASAP:</p>
            <ul>
                <li>Email (Gmail, Outlook)</li>
                <li>Banking apps</li>
                <li>Social media (Facebook, Instagram, Twitter)</li>
                <li>Cloud storage (Google Drive, iCloud)</li>
                <li>Gaming accounts (Steam, Epic Games)</li>
            </ul>
            
            <p style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #00ff00; margin-top: 1rem;">
                <strong>💡 Remember:</strong> 2FA makes your account 99% more secure. It's like having two locks instead of one - even if someone picks the first lock, they still can't get in!
            </p>
        `
    },
    {
        title: "Malware",
        icon: "fas fa-virus",
        content: `
            <h4>🦠 The Digital Disease</h4>
            <p>Malware is like a computer virus - but for your devices. It's malicious software designed to harm, steal, or spy. Just like you can catch a cold, your computer can catch malware.</p>
            
            <p style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <strong>Real Story:</strong> Emma downloaded a "free ringtone app" that looked cool. Within hours, her phone was showing constant ads, her battery died quickly, and her data usage skyrocketed. The app was actually adware - malware that shows ads and steals data. She had to factory reset her phone to fix it.
            </p>
            
            <h4>🧟 The Malware Family</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1rem 0;">
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #ff0000;">🦠 Virus</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Spreads like a disease, infects files</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #ff0000;">🐛 Worm</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Spreads through networks automatically</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #ff0000;">🐴 Trojan</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Hides inside legitimate-looking software</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #ff0000;">👁️ Spyware</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Watches everything you do</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #ff0000;">💣 Ransomware</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Locks your files for money</p>
                </div>
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px;">
                    <strong style="color: #ff0000;">📢 Adware</strong>
                    <p style="font-size: 0.9rem; color: #cccccc; margin-top: 0.5rem;">Shows annoying ads everywhere</p>
                </div>
            </div>
            
            <h4>🚨 How You Get Infected</h4>
            <ul>
                <li><strong>Downloading pirated software:</strong> "Free" games, movies, software</li>
                <li><strong>Clicking suspicious links:</strong> In emails, messages, pop-ups</li>
                <li><strong>Using infected USB drives:</strong> From unknown sources</li>
                <li><strong>Visiting malicious websites:</strong> Especially adult or torrent sites</li>
                <li><strong>Opening email attachments:</strong> From unknown senders</li>
            </ul>
            
            <h4>🛡️ How to Stay Safe</h4>
            <ol>
                <li><strong>Use antivirus software:</strong> And keep it updated!</li>
                <li><strong>Don't download from sketchy sites:</strong> Stick to official app stores</li>
                <li><strong>Keep your system updated:</strong> Updates fix security holes</li>
                <li><strong>Think before you click:</strong> If it seems too good to be true, it probably is</li>
                <li><strong>Back up your data:</strong> So you can recover if infected</li>
            </ol>
            
            <p style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #00ff00; margin-top: 1rem;">
                <strong>💡 Remember:</strong> Prevention is easier than cure. A good antivirus and smart browsing habits will protect you from 99% of malware!
            </p>
        `
    },
    {
        title: "Social Engineering",
        icon: "fas fa-user-secret",
        content: `
            <h4>🎭 The Art of Human Hacking</h4>
            <p>Social engineering doesn't hack computers - it hacks people. Attackers use psychology, manipulation, and trust to trick you into giving them what they want. It's like a con artist, but digital.</p>
            
            <p style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ff0000; margin: 1rem 0;">
                <strong>Real Scam:</strong> A "Microsoft support" caller told John his computer had a virus. They asked him to download software to "fix" it. John did, and they got remote access to his computer. They stole all his passwords, bank details, and personal files. It wasn't Microsoft - it was scammers using social engineering!
            </p>
            
            <h4>🎯 Common Tactics</h4>
            <ul>
                <li><strong>Authority:</strong> "I'm calling from your bank" (but they're not)</li>
                <li><strong>Urgency:</strong> "Your account will be closed in 1 hour!" (creates panic)</li>
                <li><strong>Familiarity:</strong> "Hi, it's your friend from school" (pretending to know you)</li>
                <li><strong>Helpfulness:</strong> "I'm here to help fix your problem" (but they created it)</li>
                <li><strong>Rewards:</strong> "You've won a prize! Just verify your details" (too good to be true)</li>
            </ul>
            
            <h4>📞 Real-World Examples</h4>
            <div style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>Phone Call:</strong> "This is Amazon. Your account was hacked. Give me your password to secure it."</p>
                <p style="color: #ff0000; margin-top: 0.5rem;">❌ REAL companies NEVER ask for passwords over the phone!</p>
            </div>
            
            <div style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>Email:</strong> "Your Netflix payment failed. Click here to update your card."</p>
                <p style="color: #ff0000; margin-top: 0.5rem;">❌ Check the sender - it's probably not really Netflix!</p>
            </div>
            
            <div style="background: rgba(255,215,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>In Person:</strong> "I'm from IT. I need to check your computer. What's your password?"</p>
                <p style="color: #ff0000; margin-top: 0.5rem;">❌ Real IT staff have their own access - they don't need your password!</p>
            </div>
            
            <h4>🛡️ How to Protect Yourself</h4>
            <ol>
                <li><strong>Verify the source:</strong> Call the company back using their official number</li>
                <li><strong>Never share OTPs:</strong> Legitimate services never ask for OTPs</li>
                <li><strong>Question urgency:</strong> Real problems don't need immediate action</li>
                <li><strong>Trust but verify:</strong> If something feels off, it probably is</li>
                <li><strong>Hang up and call back:</strong> If someone calls you, hang up and call the official number</li>
            </ol>
            
            <p style="background: rgba(0,255,0,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #00ff00; margin-top: 1rem;">
                <strong>💡 Golden Rule:</strong> When someone asks for sensitive information, pause. Real companies have proper channels. Scammers create fake urgency. Take your time and verify!
            </p>
        `
    },
    {
        title: "Network Security",
        icon: "fas fa-server",
        content: `
            <h4>🌐 Meaning</h4>
            <p>Protecting the whole network — routers, devices, data — from attacks.</p>
            
            <h4>🏠 Story Example</h4>
            <p>Your home Wi-Fi is like your house.<br>
            Network security adds:</p>
            <ul>
                <li>Doors (passwords)</li>
                <li>Windows bars (firewall)</li>
                <li>CCTV (monitoring software)</li>
            </ul>
        `
    },
    {
        title: "HTTPS",
        icon: "fas fa-lock",
        content: `
            <h4>🔒 What is HTTPS?</h4>
            <p>HyperText Transfer Protocol Secure<br>
            It ensures a website is safe and encrypted.</p>
            
            <h4>📮 Story</h4>
            <p>HTTP = postcard (anyone can read)<br>
            HTTPS = sealed envelope (private)</p>
            
            <h4>✔️ Look for:</h4>
            <ul>
                <li>Lock symbol</li>
                <li>https://</li>
            </ul>
        `
    },
    {
        title: "Caesar Cipher",
        icon: "fas fa-code",
        content: `
            <h4>🧩 What It Is</h4>
            <p>Shift each letter by a fixed number.</p>
            
            <h4>📜 Example (Shift by 3)</h4>
            <p><strong>HELLO</strong> → <strong>KHOOR</strong></p>
            
            <h4>🤺 History</h4>
            <p>Used by Julius Caesar to secretly communicate during battles.</p>
        `
    },
    {
        title: "Password Manager",
        icon: "fas fa-database",
        content: `
            <h4>🔐 What It Does</h4>
            <p>Stores all your passwords safely.</p>
            
            <h4>🗃️ Story Example</h4>
            <p>Think of it as a vault filled with all your keys — and only you have the main master key.</p>
            
            <h4>✔️ Benefits</h4>
            <ul>
                <li>Strong auto-generated passwords</li>
                <li>No need to remember all passwords</li>
            </ul>
        `
    },
    {
        title: "DDoS Attack",
        icon: "fas fa-exclamation-triangle",
        content: `
            <h4>⚡ What Happens</h4>
            <p>Thousands of fake computers send requests to a website until it crashes.</p>
            
            <h4>🗣️ Story</h4>
            <p>Imagine thousands of people shouting your name at the same time — you can't respond to anyone.<br>
            Same happens to websites.</p>
        `
    },
    {
        title: "SQL Injection",
        icon: "fas fa-database",
        content: `
            <h4>🧨 Meaning</h4>
            <p>Hackers put harmful code into website input boxes to access or damage the database.</p>
            
            <h4>🍏 Story Example</h4>
            <p>Login box expects your name.<br>
            A hacker writes:</p>
            <p><code>'or '1'='1</code></p>
            <p>Now the system gets tricked into letting them in.</p>
        `
    },
    {
        title: "XSS (Cross-Site Scripting)",
        icon: "fas fa-code",
        content: `
            <h4>🧪 What It Is</h4>
            <p>Attackers put harmful scripts into websites that can steal cookies, show fake pages, or take control of accounts.</p>
            
            <h4>👀 Scenario</h4>
            <p>Someone posts a comment like:<br>
            <code>&lt;script&gt;stealCookie()&lt;/script&gt;</code></p>
            <p>Anyone who views that page gets affected.</p>
        `
    },
    {
        title: "Capture The Flag (CTF) - How to Play",
        icon: "fas fa-flag",
        content: `
            <h4>🏁 What is CTF?</h4>
            <p>Capture The Flag (CTF) is like a cybersecurity treasure hunt! You solve puzzles and challenges to find hidden "flags" (secret codes).</p>
            
            <h4>🎮 How CTF Works (Simple Explanation)</h4>
            <p>Think of it like a video game where:</p>
            <ul>
                <li>Each challenge is a level</li>
                <li>The flag (CTF{...}) is the treasure you need to find</li>
                <li>You use cybersecurity skills to solve puzzles</li>
            </ul>
            
            <h4>🔍 Types of CTF Challenges</h4>
            <ul>
                <li><strong>🔐 Cryptography:</strong> Decode secret messages (like Caesar Cipher)</li>
                <li><strong>🌐 Web Exploitation:</strong> Find hidden flags in websites</li>
                <li><strong>🔍 Forensics:</strong> Analyze files to find clues</li>
                <li><strong>🔄 Reverse Engineering:</strong> Understand how programs work</li>
                <li><strong>💻 Binary Exploitation:</strong> Find bugs in programs</li>
                <li><strong>📡 Network Analysis:</strong> Analyze network traffic</li>
            </ul>
            
            <h4>📝 How to Play CTF in CyberArcade</h4>
            <ol>
                <li><strong>Choose a Challenge:</strong> Click on any challenge card (Crypto, Web, Forensics, etc.)</li>
                <li><strong>Read the Tutorial:</strong> Each challenge has a step-by-step guide - read it first!</li>
                <li><strong>Use the Tools:</strong> We provide tools to help you (like the Caesar Cipher decoder)</li>
                <li><strong>Find the Flag:</strong> Look for text that looks like <code>CTF{...}</code></li>
                <li><strong>Submit Your Answer:</strong> Enter the flag in the input box and click "Submit Flag"</li>
            </ol>
            
            <h4>💡 Example: Crypto Challenge</h4>
            <p>You see: <code>GUR FRPERG ZRFFNTR VF: CTF{CRYPTO_MASTER_2024}</code></p>
            <p>This is encrypted with Caesar Cipher (shift 13).</p>
            <p>Use the decoder tool to decrypt it → Find the flag → Submit!</p>
            
            <h4>🎯 Tips for Beginners</h4>
            <ul>
                <li>Start with Cryptography challenges (they're the easiest!)</li>
                <li>Always read the tutorial first</li>
                <li>Use hints if you're stuck</li>
                <li>Flags always look like: <code>CTF{SOMETHING_HERE}</code></li>
                <li>Don't worry if you can't solve everything - it's about learning!</li>
            </ul>
            
            <h4>🚀 Why Learn CTF?</h4>
            <ul>
                <li>It's fun and gamified learning</li>
                <li>Teaches real cybersecurity skills</li>
                <li>Great practice for cybersecurity careers</li>
                <li>Builds problem-solving skills</li>
            </ul>
            
            <h4>📚 Before Playing CTF</h4>
            <p>We recommend learning these basics first:</p>
            <ul>
                <li>✅ Encryption Basics (Caesar Cipher)</li>
                <li>✅ Secure Browsing (to understand web challenges)</li>
                <li>✅ Network Security (for network challenges)</li>
            </ul>
            <p><strong>Ready to try? Go to Games → Capture The Flag!</strong></p>
        `
    },
    {
        title: "Quiz Notes - All Topics",
        icon: "fas fa-book",
        content: `
            <h4>📚 Complete Quiz Notes - Study Guide</h4>
            
            <h4>🔍 Phishing Recognition</h4>
            <ul>
                <li>Fake messages/emails/SMS that steal passwords, OTPs, bank details</li>
                <li>Red flags: Urgent language, suspicious sender, generic greetings, poor grammar</li>
                <li>Protection: Don't click unknown links, verify sender, never share OTPs, use 2FA</li>
                <li>Common tricks: "Account blocked", "You won a prize", fake delivery messages</li>
            </ul>
            
            <h4>🔐 Password Safety</h4>
            <ul>
                <li>Weak passwords: 123456, password, qwerty, personal info, birthdate</li>
                <li>Strong password needs: Uppercase, lowercase, numbers, symbols, 12+ characters</li>
                <li>Golden rule: Different password for every account</li>
                <li>Example strong: RiverSky#2035</li>
                <li>Use password manager to store unique passwords</li>
            </ul>
            
            <h4>🌐 Secure Browsing</h4>
            <ul>
                <li>Only visit websites with HTTPS (look for lock icon and https://)</li>
                <li>Don't download unknown apps or click random ads</li>
                <li>Avoid sites promising "free diamonds", "free movies", "free money"</li>
                <li>Keep browser updated, use private/incognito mode when needed</li>
            </ul>
            
            <h4>🔑 Encryption Basics</h4>
            <ul>
                <li>Turns readable data into unreadable code - only key holder can decode</li>
                <li>Used in: WhatsApp, online payments, ATM, banking apps, cloud storage</li>
                <li>Even if data is stolen, it cannot be read without the key</li>
            </ul>
            
            <h4>🧱 Firewall</h4>
            <ul>
                <li>Checks all data going in/out of device, blocks suspicious traffic</li>
                <li>Like a security guard checking bags at mall entrance</li>
                <li>Blocks: Hackers, malware, unauthorized traffic</li>
            </ul>
            
            <h4>🌍 VPN (Virtual Private Network)</h4>
            <ul>
                <li>Hides your location and encrypts internet connection</li>
                <li>Protects on public Wi-Fi (like private whisper vs loud talking)</li>
                <li>Hides real IP address, prevents tracking</li>
            </ul>
            
            <h4>💣 Ransomware</h4>
            <ul>
                <li>Malware that locks files and demands money to unlock</li>
                <li>Like someone locking your homework notebook and asking payment</li>
                <li>Protection: Don't download unknown attachments, keep backups, use antivirus</li>
            </ul>
            
            <h4>🛡️ Two-Factor Authentication (2FA)</h4>
            <ul>
                <li>Extra step after password to verify it's really you</li>
                <li>Like house with lock + fingerprint scanner</li>
                <li>Forms: OTP, Fingerprint, Face ID, Authenticator apps</li>
                <li>Protects even if password is stolen</li>
            </ul>
            
            <h4>🦠 Malware</h4>
            <ul>
                <li>Harmful software that damages systems or steals information</li>
                <li>Types: Virus, Worm, Trojan, Spyware, Ransomware, Adware</li>
                <li>Example: Downloading "game hack tool" makes phone slow - malware entered</li>
            </ul>
            
            <h4>🎭 Social Engineering</h4>
            <ul>
                <li>Hackers trick people into giving personal information</li>
                <li>Example: Fake bank officer calls asking for OTP</li>
                <li>Never share: OTP, Password, Bank info, Personal address</li>
            </ul>
            
            <h4>🏠 Network Security</h4>
            <ul>
                <li>Protects whole network (routers, devices, data) from attacks</li>
                <li>Like home security: Doors (passwords), Windows bars (firewall), CCTV (monitoring)</li>
            </ul>
            
            <h4>🔒 HTTPS</h4>
            <ul>
                <li>HyperText Transfer Protocol Secure - safe and encrypted websites</li>
                <li>HTTP = postcard (anyone can read), HTTPS = sealed envelope (private)</li>
                <li>Look for: Lock symbol and https:// in URL</li>
            </ul>
            
            <h4>🧩 Caesar Cipher</h4>
            <ul>
                <li>Shift each letter by fixed number (e.g., shift 3: HELLO → KHOOR)</li>
                <li>Used by Julius Caesar for secret communication in battles</li>
                <li>Historical encryption method, not secure today</li>
            </ul>
            
            <h4>🗃️ Password Manager</h4>
            <ul>
                <li>Stores all passwords safely - like vault with all keys</li>
                <li>Benefits: Strong auto-generated passwords, no need to remember all</li>
                <li>Only you have the master key</li>
            </ul>
            
            <h4>⚡ DDoS Attack</h4>
            <ul>
                <li>Thousands of fake computers send requests until website crashes</li>
                <li>Like thousands of people shouting your name - you can't respond</li>
            </ul>
            
            <h4>🧨 SQL Injection</h4>
            <ul>
                <li>Hackers put harmful code into website input boxes to access/damage database</li>
                <li>Example: Login box gets tricked with code like 'or '1'='1</li>
            </ul>
            
            <h4>🧪 XSS (Cross-Site Scripting)</h4>
            <ul>
                <li>Attackers put harmful scripts into websites</li>
                <li>Can steal cookies, show fake pages, take control of accounts</li>
                <li>Example: Comment with &lt;script&gt;stealCookie()&lt;/script&gt; affects viewers</li>
            </ul>
            
            <h4>💡 Quick Quiz Tips</h4>
            <ul>
                <li>Phishing = Fake messages stealing info</li>
                <li>Strong password = Mix of letters, numbers, symbols, 12+ chars</li>
                <li>HTTPS = Safe encrypted websites (look for lock)</li>
                <li>Firewall = Security guard blocking suspicious traffic</li>
                <li>VPN = Hides identity on public Wi-Fi</li>
                <li>2FA = Extra login protection (password + OTP/fingerprint)</li>
                <li>Ransomware = Locks files, demands money</li>
                <li>Malware = Harmful software (virus, trojan, worm, etc.)</li>
                <li>Social Engineering = Tricking people, not computers</li>
                <li>DDoS = Website flooding attack</li>
                <li>SQL Injection = Code attack on input boxes</li>
                <li>XSS = Harmful scripts in websites</li>
            </ul>
        `
    }
];

// Initialize Flashcards
// Load Security Checklist
function loadSecurityChecklist() {
    const checklistItems = [
        { id: 'strong-passwords', text: 'Use strong, unique passwords (12+ characters)' },
        { id: 'password-manager', text: 'Use a password manager' },
        { id: 'two-factor', text: 'Enable two-factor authentication (2FA) on important accounts' },
        { id: 'software-updates', text: 'Keep software and operating system updated' },
        { id: 'antivirus', text: 'Have antivirus/anti-malware software installed and updated' },
        { id: 'backup-data', text: 'Regularly back up important data' },
        { id: 'https-check', text: 'Always check for HTTPS (padlock icon) on websites' },
        { id: 'suspicious-emails', text: 'Know how to identify suspicious emails' },
        { id: 'public-wifi', text: 'Avoid sensitive activities on public WiFi' },
        { id: 'privacy-settings', text: 'Review and adjust privacy settings on social media' },
        { id: 'software-sources', text: 'Only download software from trusted sources' },
        { id: 'bank-statements', text: 'Regularly check bank/credit card statements' }
    ];
    
    const container = document.getElementById('securityChecklist');
    if (!container) return;
    
    container.innerHTML = checklistItems.map(item => `
        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 10px; border-left: 4px solid rgba(0,255,255,0.5);">
            <input type="checkbox" id="${item.id}" style="width: 20px; height: 20px; cursor: pointer;" onchange="updateChecklistProgress()">
            <label for="${item.id}" style="color: #ffffff; font-size: 1.1rem; cursor: pointer; flex: 1; margin: 0;">${item.text}</label>
        </div>
    `).join('');
    
    // Load saved checklist state
    const savedChecklist = localStorage.getItem('securityChecklist');
    if (savedChecklist) {
        const checked = JSON.parse(savedChecklist);
        checked.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) checkbox.checked = true;
        });
    }
}

// Update checklist progress
function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('#securityChecklist input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.id);
    localStorage.setItem('securityChecklist', JSON.stringify(checked));
}

// Download Security Checklist
function downloadSecurityChecklist() {
    const checklistItems = [
        'Use strong, unique passwords (12+ characters)',
        'Use a password manager',
        'Enable two-factor authentication (2FA) on important accounts',
        'Keep software and operating system updated',
        'Have antivirus/anti-malware software installed and updated',
        'Regularly back up important data',
        'Always check for HTTPS (padlock icon) on websites',
        'Know how to identify suspicious emails',
        'Avoid sensitive activities on public WiFi',
        'Review and adjust privacy settings on social media',
        'Only download software from trusted sources',
        'Regularly check bank/credit card statements'
    ];
    
    const content = `CYBERSECURITY AWARENESS CHECKLIST\n` +
                   `==================================\n\n` +
                   `Use this checklist to ensure you're following best practices:\n\n` +
                   checklistItems.map((item, index) => `[ ] ${index + 1}. ${item}`).join('\n') +
                   `\n\n` +
                   `Generated by CyberArcade - Cybersecurity Awareness & Education Platform\n` +
                   `Date: ${new Date().toLocaleDateString()}\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cybersecurity-checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function initializeFlashcards() {
    const container = document.getElementById('flashcardsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    flashcardsData.forEach((card, index) => {
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard';
        flashcard.setAttribute('data-index', index);
        
        flashcard.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <div class="flashcard-icon">
                        <i class="${card.icon}"></i>
                    </div>
                    <div class="flashcard-title">${card.title}</div>
                    <div class="flashcard-hint">
                        <i class="fas fa-hand-pointer"></i>
                        Click to learn more
                    </div>
                </div>
            </div>
        `;
        
        // Add click event to open full-screen modal
        flashcard.addEventListener('click', function() {
            openFlashcardModal(index);
        });
        
        container.appendChild(flashcard);
    });
}

// Map flashcards to related games
const flashcardGameMap = {
    'Phishing Recognition': ['phishing-detective', 'social-engineering'],
    'Password Safety': ['password-cracker'],
    'Secure Browsing': ['spot-the-threat', 'security-quiz'],
    'Encryption Basics': ['caesar-cipher'],
    'Firewall': ['security-quiz'],
    'Two-Factor Authentication (2FA)': ['security-quiz'],
    'Ransomware': ['spot-the-threat'],
    'Malware': ['spot-the-threat'],
    'Social Engineering': ['social-engineering', 'phishing-detective'],
    'Network Security': ['security-quiz'],
    'HTTPS': ['security-quiz', 'spot-the-threat'],
    'Caesar Cipher': ['caesar-cipher'],
    'Password Manager': ['password-cracker'],
    'Complete Quiz Notes': ['security-quiz', 'snake-ladder']
};

// Open flashcard in full-screen modal
function openFlashcardModal(index) {
    const card = flashcardsData[index];
    if (!card) return;
    
    const modal = document.getElementById('flashcardModal');
    const modalIcon = document.getElementById('flashcardModalIcon');
    const modalTitle = document.getElementById('flashcardModalTitle');
    const modalContent = document.getElementById('flashcardModalContent');
    
    if (!modal || !modalIcon || !modalTitle || !modalContent) return;
    
    // Set modal content
    modalIcon.innerHTML = `<i class="${card.icon}"></i>`;
    modalTitle.textContent = card.title;
    
    // Get related games for this flashcard
    const relatedGames = flashcardGameMap[card.title] || [];
    
    // Build game buttons HTML
    let gameButtonsHTML = '';
    if (relatedGames.length > 0) {
        gameButtonsHTML = `
            <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.1)); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); text-align: center;">
                <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.2rem;">🎮 Play Games to Practice!</h4>
                <p style="color: #cccccc; margin-bottom: 1rem; font-size: 0.95rem;">Test your knowledge with interactive games related to this topic:</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    ${relatedGames.map(gameId => {
                        const game = window.CyberArcadeGames && window.CyberArcadeGames[gameId];
                        const gameTitle = game ? game.title : gameId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return `
                            <button onclick="closeFlashcardModal(); startGame('${gameId}');" 
                                    style="padding: 0.8rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 0.95rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);" 
                                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,255,255,0.5)'" 
                                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,255,255,0.3)'">
                                <i class="fas fa-gamepad"></i> ${gameTitle}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    } else {
        // Generic "Play Games" button if no specific games mapped
        gameButtonsHTML = `
            <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.1)); border-radius: 10px; border: 2px solid rgba(0,255,255,0.3); text-align: center;">
                <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.2rem;">🎮 Play Games to Know More!</h4>
                <p style="color: #cccccc; margin-bottom: 1rem; font-size: 0.95rem;">Explore our interactive games to practice what you've learned!</p>
                <button onclick="closeFlashcardModal(); showSection('games');" 
                        style="padding: 0.8rem 1.5rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,255,255,0.3);" 
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,255,255,0.5)'" 
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,255,255,0.3)'">
                    <i class="fas fa-gamepad"></i> Play Games to Know More!
                </button>
            </div>
        `;
    }
    
    // Set modal content with game buttons appended
    modalContent.innerHTML = card.content + gameButtonsHTML;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close flashcard modal
function closeFlashcardModal() {
    const modal = document.getElementById('flashcardModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFlashcardModal();
    }
});
