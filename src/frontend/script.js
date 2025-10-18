// Global state management
const appState = {
    currentUser: {
        level: 1,
        points: 0,
        badges: 0,
        streak: 0,
        totalTime: 0,
        achievements: []
    },
    currentSection: 'home',
    gameInstances: {},
    moduleInstances: {}
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserProgress();
    setupEventListeners();
});

// Initialize app components
function initializeApp() {
    updateUserDisplay();
    showSection('home');
}

// Load user progress from localStorage
function loadUserProgress() {
    const savedProgress = localStorage.getItem('cyberArcadeProgress');
    if (savedProgress) {
        appState.currentUser = { ...appState.currentUser, ...JSON.parse(savedProgress) };
        updateUserDisplay();
    }
}

// Save user progress to localStorage
function saveUserProgress() {
    localStorage.setItem('cyberArcadeProgress', JSON.stringify(appState.currentUser));
}

// Update user display elements
function updateUserDisplay() {
    document.getElementById('userLevel').textContent = `Level ${appState.currentUser.level}`;
    document.getElementById('userPoints').textContent = appState.currentUser.points;
    document.getElementById('totalBadges').textContent = appState.currentUser.badges;
    document.getElementById('streakDays').textContent = appState.currentUser.streak;
    document.getElementById('totalTime').textContent = `${appState.currentUser.totalTime}h`;
    document.getElementById('currentStreak').textContent = appState.currentUser.streak;
    document.getElementById('totalPoints').textContent = appState.currentUser.points;
    document.getElementById('currentLevel').textContent = appState.currentUser.level;
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
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

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

// Open learning module
function openModule(moduleName) {
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

// Close learning module
function closeModule() {
    document.getElementById('moduleModal').style.display = 'none';
}

// Get module data
function getModuleData(moduleName) {
    const modules = {
        passwords: {
            title: 'Password Security',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <h3>What Makes a Strong Password?</h3>
                        <div class="password-rules">
                            <div class="rule-item">
                                <i class="fas fa-check-circle"></i>
                                <span>At least 12 characters long</span>
                            </div>
                            <div class="rule-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Mix of uppercase and lowercase letters</span>
                            </div>
                            <div class="rule-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Include numbers and special characters</span>
                            </div>
                            <div class="rule-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Avoid personal information</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="interactive-section">
                        <h3>Test Your Password</h3>
                        <div class="password-checker">
                            <input type="password" id="passwordInput" placeholder="Enter a password to test">
                            <div class="password-strength" id="passwordStrength">
                                <div class="strength-bar"></div>
                                <span class="strength-text">Enter a password</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quiz-section">
                        <h3>Quick Quiz</h3>
                        <div class="quiz-question">
                            <p>Which password is the strongest?</p>
                            <div class="quiz-options">
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false)">password123</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, true)">M@xS3cUrE#89</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false)">iloveyou</button>
                                <button class="quiz-option" onclick="checkQuizAnswer(this, false)">12345678</button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            init: initPasswordModule
        },
        phishing: {
            title: 'Phishing Recognition',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <h3>What is Phishing?</h3>
                        <p>Phishing is a cyber attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing that the message is something they want or need and to click a link or download an attachment.</p>
                        
                        <h4>Common Phishing Tactics:</h4>
                        <ul class="phishing-tactics">
                            <li>Urgent language ("Act now!", "Limited time!")</li>
                            <li>Suspicious sender addresses</li>
                            <li>Generic greetings ("Dear Customer")</li>
                            <li>Poor grammar and spelling</li>
                            <li>Requests for personal information</li>
                        </ul>
                    </div>
                    
                    <div class="interactive-section">
                        <h3>Spot the Phishing Email</h3>
                        <div class="email-examples">
                            <div class="email-example" data-phishing="true">
                                <div class="email-header">
                                    <strong>From:</strong> security@paypal-security.com<br>
                                    <strong>Subject:</strong> URGENT: Your account will be closed!
                                </div>
                                <div class="email-body">
                                    <p>Dear Customer,</p>
                                    <p>We have detected suspicious activity on your account. Click here immediately to verify your identity or your account will be closed in 24 hours.</p>
                                    <p><a href="#" class="suspicious-link">Verify Account Now</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            init: initPhishingModule
        },
        browsing: {
            title: 'Secure Browsing',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <h3>Safe Browsing Practices</h3>
                        <div class="browsing-tips">
                            <div class="tip-item">
                                <i class="fas fa-lock"></i>
                                <div>
                                    <h4>Check for HTTPS</h4>
                                    <p>Always look for the lock icon and "https://" in the URL</p>
                                </div>
                            </div>
                            <div class="tip-item">
                                <i class="fas fa-shield-alt"></i>
                                <div>
                                    <h4>Use Antivirus Software</h4>
                                    <p>Keep your security software updated</p>
                                </div>
                            </div>
                            <div class="tip-item">
                                <i class="fas fa-eye-slash"></i>
                                <div>
                                    <h4>Be Careful with Downloads</h4>
                                    <p>Only download from trusted sources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            init: initBrowsingModule
        },
        encryption: {
            title: 'Encryption Basics',
            content: `
                <div class="module-content">
                    <div class="lesson-section">
                        <h3>What is Encryption?</h3>
                        <p>Encryption is the process of converting information into a form that cannot be understood by unauthorized people. It's like putting your message in a locked box that only you and the intended recipient have the key to.</p>
                        
                        <h4>Types of Encryption:</h4>
                        <ul class="encryption-types">
                            <li><strong>Symmetric:</strong> Same key for encryption and decryption</li>
                            <li><strong>Asymmetric:</strong> Different keys for encryption and decryption</li>
                            <li><strong>Caesar Cipher:</strong> Simple substitution cipher</li>
                        </ul>
                    </div>
                    
                    <div class="interactive-section">
                        <h3>Try Caesar Cipher</h3>
                        <div class="cipher-tool">
                            <div class="cipher-input">
                                <label>Message:</label>
                                <input type="text" id="cipherMessage" placeholder="Enter message">
                            </div>
                            <div class="cipher-shift">
                                <label>Shift:</label>
                                <input type="number" id="cipherShift" value="3" min="1" max="25">
                            </div>
                            <button onclick="encryptMessage()" class="btn btn-primary">Encrypt</button>
                            <div class="cipher-result">
                                <label>Result:</label>
                                <input type="text" id="cipherResult" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            init: initEncryptionModule
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
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    if (strength < 25) {
        feedback = 'Very Weak';
        strengthBar.style.background = '#ff0000';
    } else if (strength < 50) {
        feedback = 'Weak';
        strengthBar.style.background = '#ff6600';
    } else if (strength < 75) {
        feedback = 'Medium';
        strengthBar.style.background = '#ffcc00';
    } else if (strength < 100) {
        feedback = 'Strong';
        strengthBar.style.background = '#66cc00';
    } else {
        feedback = 'Very Strong';
        strengthBar.style.background = '#00ff00';
    }
    
    strengthBar.style.width = Math.min(strength, 100) + '%';
    strengthText.textContent = feedback;
}

// Check quiz answer
function checkQuizAnswer(button, isCorrect) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.disabled = true);
    
    if (isCorrect) {
        button.style.background = '#00ff00';
        button.style.color = '#000';
        addPoints(50);
        addAchievement('first_quiz', 'Quiz Master', 'Completed your first quiz!');
    } else {
        button.style.background = '#ff0000';
        button.style.color = '#fff';
    }
    
    // Show correct answer
    options.forEach(opt => {
        if (opt.onclick.toString().includes('true')) {
            opt.style.background = '#00ff00';
            opt.style.color = '#000';
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
            alert('This is a phishing link! Notice the suspicious domain and urgent language.');
        });
    });
}

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

// Start game
function startGame(gameName) {
    const gameData = getGameData(gameName);
    if (!gameData) return;
    
    document.getElementById('gameTitle').textContent = gameData.title;
    document.getElementById('gameContainer').innerHTML = gameData.content;
    document.getElementById('gameModal').style.display = 'block';
    
    // Initialize game
    if (gameData.init) {
        gameData.init();
    }
}

// Close game
function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
}

// Get game data
function getGameData(gameName) {
    const games = {
        'snake-ladder': {
            title: 'Cyber Snake & Ladder',
            content: `
                <div class="game-container">
                    <div class="game-board">
                        <canvas id="snakeLadderCanvas" width="600" height="600"></canvas>
                    </div>
                    <div class="game-controls">
                        <div class="dice-container">
                            <div id="dice" class="dice">🎲</div>
                            <button id="rollDice" class="btn btn-primary">Roll Dice</button>
                        </div>
                        <div class="game-info">
                            <div class="player-info">
                                <h4>Player Position: <span id="playerPosition">1</span></h4>
                                <h4>Points: <span id="gamePoints">0</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            init: initSnakeLadderGame
        },
        'capture-the-flag': {
            title: 'Capture The Flag (CTF)',
            content: `
                <div class="ctf-container">
                    <div class="ctf-header">
                        <div class="ctf-title">🏴 Capture The Flag Challenge</div>
                        <div class="ctf-subtitle">Professional cybersecurity competition</div>
                    </div>
                    <div class="ctf-challenges">
                        <div class="challenge-card" data-challenge="crypto">
                            <div class="challenge-icon">🔐</div>
                            <div class="challenge-info">
                                <h4>Cryptography (4 Challenges)</h4>
                                <p>Caesar, RSA, Vigenère, and encoding challenges</p>
                                <div class="challenge-difficulty">Medium</div>
                            </div>
                            <button class="challenge-btn" onclick="startCTFChallenge('crypto')">Start</button>
                        </div>
                        <div class="challenge-card" data-challenge="web">
                            <div class="challenge-icon">🌐</div>
                            <div class="challenge-info">
                                <h4>Web Exploitation (4 Challenges)</h4>
                                <p>SQL Injection, XSS, Directory Traversal, and more</p>
                                <div class="challenge-difficulty">Hard</div>
                            </div>
                            <button class="challenge-btn" onclick="startCTFChallenge('web')">Start</button>
                        </div>
                        <div class="challenge-card" data-challenge="forensics">
                            <div class="challenge-icon">🔍</div>
                            <div class="challenge-info">
                                <h4>Digital Forensics (4 Challenges)</h4>
                                <p>Memory, Network, File Carving, and Steganography</p>
                                <div class="challenge-difficulty">Expert</div>
                            </div>
                            <button class="challenge-btn" onclick="startCTFChallenge('forensics')">Start</button>
                        </div>
                        <div class="challenge-card" data-challenge="reverse">
                            <div class="challenge-icon">🔄</div>
                            <div class="challenge-info">
                                <h4>Reverse Engineering</h4>
                                <p>Analyze binaries and crack password protection</p>
                                <div class="challenge-difficulty">Expert</div>
                            </div>
                            <button class="challenge-btn" onclick="startCTFChallenge('reverse')">Start</button>
                        </div>
                        <div class="challenge-card" data-challenge="pwn">
                            <div class="challenge-icon">💥</div>
                            <div class="challenge-info">
                                <h4>Binary Exploitation</h4>
                                <p>Buffer overflows and remote code execution</p>
                                <div class="challenge-difficulty">Expert</div>
                            </div>
                            <button class="challenge-btn" onclick="startCTFChallenge('pwn')">Start</button>
                        </div>
                        <div class="challenge-card" data-challenge="stego">
                            <div class="challenge-icon">🖼️</div>
                            <div class="challenge-info">
                                <h4>Steganography</h4>
                                <p>Find hidden messages in images and files</p>
                                <div class="challenge-difficulty">Medium</div>
                            </div>
                            <button class="challenge-btn" onclick="startCTFChallenge('stego')">Start</button>
                        </div>
                    </div>
                    <div class="ctf-scoreboard">
                        <h4>Scoreboard</h4>
                        <div class="score-item">
                            <span class="score-rank">1st</span>
                            <span class="score-name">CyberMaster</span>
                            <span class="score-points">1250 pts</span>
                        </div>
                        <div class="score-item">
                            <span class="score-rank">2nd</span>
                            <span class="score-name">HackNinja</span>
                            <span class="score-points">980 pts</span>
                        </div>
                        <div class="score-item">
                            <span class="score-rank">3rd</span>
                            <span class="score-name">CodeBreaker</span>
                            <span class="score-points">750 pts</span>
                        </div>
                    </div>
                </div>
            `,
            init: initCTFGame
        },
        'caesar-cipher': {
            title: 'Caesar Cipher Challenge',
            content: `
                <div class="cipher-game-container">
                    <div class="cipher-challenge">
                        <h3>Decode this message:</h3>
                        <div class="cipher-message" id="cipherMessage">Hello World</div>
                        <div class="cipher-shift-info">
                            <p>Shift: <span id="cipherShiftValue">3</span></p>
                        </div>
                        <div class="cipher-input">
                            <input type="text" id="cipherAnswer" placeholder="Your answer">
                            <button class="btn btn-primary" onclick="checkCipherAnswer()">Submit</button>
                        </div>
                    </div>
                    <div class="cipher-score">
                        <h4>Score: <span id="cipherScore">0</span></h4>
                    </div>
                </div>
            `,
            init: initCaesarCipherGame
        },
        'network-scanner': {
            title: 'Network Security Scanner',
            content: `
                <div class="network-scanner">
                    <div class="scanner-header">
                        <div class="scanner-title">🔍 Network Security Scanner v3.0</div>
                        <div class="scanner-status">READY</div>
                    </div>
                    <div class="scanner-scenarios">
                        <h4>Select Scan Scenario:</h4>
                        <div class="scenario-buttons">
                            <button class="scenario-btn active" onclick="switchScanScenario('corporate')">Corporate Network</button>
                            <button class="scenario-btn" onclick="switchScanScenario('web-server')">Web Server</button>
                            <button class="scenario-btn" onclick="switchScanScenario('iot-devices')">IoT Devices</button>
                            <button class="scenario-btn" onclick="switchScanScenario('industrial')">Industrial Control</button>
                            <button class="scenario-btn" onclick="switchScanScenario('cloud-infrastructure')">Cloud Infrastructure</button>
                        </div>
                        <div class="scenario-description" id="scenarioDescription">
                            Scan a corporate network for security assessment
                        </div>
                    </div>
                    <div class="scanner-output" id="scannerOutput">
                        <div class="code-line">Welcome to CyberArcade Network Scanner v3.0</div>
                        <div class="code-line">Initializing security protocols...</div>
                        <div class="code-line">Loading threat intelligence database...</div>
                        <div class="code-line">Ready to scan for vulnerabilities</div>
                        <div class="code-line code-comment">// Select a scenario and enter target to begin scan</div>
                    </div>
                    <div class="scanner-controls">
                        <input type="text" class="scanner-input" id="scanTarget" placeholder="Enter IP address or domain" value="192.168.1.0/24">
                        <button class="scanner-btn" onclick="startNetworkScan()">Start Scan</button>
                        <button class="scanner-btn" onclick="clearScannerOutput()">Clear</button>
                    </div>
                </div>
            `,
            init: initNetworkScannerGame
        },
        'password-cracker': {
            title: 'Password Cracking Simulator',
            content: `
                <div class="password-cracker">
                    <div class="cracker-header">
                        <div class="cracker-title">🔓 Password Cracking Simulator v3.0</div>
                        <div class="cracker-subtitle">Professional password cracking with multiple attack methods</div>
                    </div>
                    <div class="cracker-options">
                        <div class="attack-methods">
                            <h4>Attack Methods:</h4>
                            <div class="method-buttons">
                                <button class="method-btn active" onclick="switchAttackMethod('dictionary')">Dictionary</button>
                                <button class="method-btn" onclick="switchAttackMethod('brute-force')">Brute Force</button>
                                <button class="method-btn" onclick="switchAttackMethod('hybrid')">Hybrid</button>
                                <button class="method-btn" onclick="switchAttackMethod('mask')">Mask</button>
                            </div>
                            <div class="method-info">
                                <div id="attackDescription">Try common passwords from a dictionary</div>
                                <div id="attackSpeed">Speed: 200ms per attempt</div>
                                <div id="attackSize">Dictionary: 200+ passwords</div>
                            </div>
                        </div>
                        <div class="target-selection">
                            <h4>Target Selection:</h4>
                            <div class="target-buttons">
                                <button class="target-btn active" onclick="switchTarget('user')">Regular User</button>
                                <button class="target-btn" onclick="switchTarget('admin')">System Admin</button>
                                <button class="target-btn" onclick="switchTarget('ceo')">CEO Account</button>
                                <button class="target-btn" onclick="switchTarget('developer')">Developer</button>
                                <button class="target-btn" onclick="switchTarget('database')">Database Admin</button>
                                <button class="target-btn" onclick="switchTarget('webmaster')">Webmaster</button>
                                <button class="target-btn" onclick="switchTarget('security')">Security Officer</button>
                                <button class="target-btn" onclick="switchTarget('guest')">Guest Account</button>
                            </div>
                            <div class="target-info">
                                <div id="targetDescription">Regular User - Easy difficulty</div>
                            </div>
                        </div>
                    </div>
                    <div class="cracker-progress">
                        <div class="progress-label">
                            <span>Cracking Progress</span>
                            <span id="crackProgress">0%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" id="crackProgress" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="cracker-stats">
                        <div class="stat-item">
                            <div class="stat-value" id="attemptsCount">0</div>
                            <div class="stat-label">Attempts</div>
                        </div>
                    </div>
                    <div class="cracker-controls">
                        <button class="cracker-btn primary" onclick="startPasswordCrack()">Start Cracking</button>
                        <button class="cracker-btn secondary" onclick="resetPasswordCrack()">Reset</button>
                    </div>
                    <div class="cracker-output" id="crackerOutput">
                        Ready to crack passwords
                    </div>
                </div>
            `,
            init: initPasswordCrackerGame
        },
        'malware-analysis': {
            title: 'Malware Analysis Lab',
            content: `
                <div class="malware-lab">
                    <div class="lab-header">
                        <div class="lab-title">🦠 Malware Analysis Lab</div>
                        <div class="threat-level">HIGH RISK</div>
                    </div>
                    <div class="lab-tabs">
                        <div class="lab-tab active" onclick="switchTab('static')">Static Analysis</div>
                        <div class="lab-tab" onclick="switchTab('dynamic')">Dynamic Analysis</div>
                        <div class="lab-tab" onclick="switchTab('network')">Network Analysis</div>
                    </div>
                    <div class="lab-content" id="labContent">
                        <div class="code-block">
                            <div class="code-line code-comment">// Malware Sample: Trojan.Win32.Banker</div>
                            <div class="code-line code-comment">// File Size: 2.3 MB</div>
                            <div class="code-line code-comment">// Detection Date: 2024-01-15</div>
                            <div class="code-line code-comment">// Threat Level: HIGH</div>
                            <div class="code-line"></div>
                            <div class="code-line code-keyword">import</div> <div class="code-line code-string">"winapi"</div>
                            <div class="code-line code-keyword">import</div> <div class="code-line code-string">"crypto"</div>
                            <div class="code-line code-keyword">import</div> <div class="code-line code-string">"network"</div>
                            <div class="code-line"></div>
                            <div class="code-line code-comment">// Suspicious API calls detected</div>
                            <div class="code-line code-highlight">CreateProcessA()</div>
                            <div class="code-line code-highlight">WriteProcessMemory()</div>
                            <div class="code-line code-highlight">InternetOpenA()</div>
                            <div class="code-line code-highlight">HttpSendRequestA()</div>
                        </div>
                    </div>
                </div>
            `,
            init: initMalwareAnalysisGame
        },
        'social-engineering': {
            title: 'Social Engineering Simulator',
            content: `
                <div class="social-engineering">
                    <div class="se-header">
                        <div class="se-title">🎭 Social Engineering Simulator</div>
                        <div class="se-subtitle">Test your ability to identify social engineering attacks</div>
                    </div>
                    <div class="se-scenario" id="seScenario">
                        <div class="scenario-title">Scenario 1: Phishing Email</div>
                        <div class="scenario-description">
                            You receive an email claiming to be from your bank. The email asks you to verify your account information by clicking a link. What do you do?
                        </div>
                        <div class="scenario-email">
                            <div class="email-header">
                                <div class="email-from">From: security@yourbank.com</div>
                                <div class="email-subject">Subject: URGENT: Account Verification Required</div>
                            </div>
                            <div class="email-body">
                                <p>Dear Valued Customer,</p>
                                <p>We have detected suspicious activity on your account. For your security, please verify your account information immediately.</p>
                                <p><a href="http://bank-verification.com/verify">Click here to verify your account</a></p>
                                <p>If you do not verify within 24 hours, your account will be suspended.</p>
                                <p>Best regards,<br>Security Team</p>
                            </div>
                        </div>
                    </div>
                    <div class="se-options" id="seOptions">
                        <div class="se-option" onclick="selectSEOption(this, false)">
                            Click the link to verify your account
                        </div>
                        <div class="se-option" onclick="selectSEOption(this, true)">
                            Delete the email and contact the bank directly
                        </div>
                        <div class="se-option" onclick="selectSEOption(this, false)">
                            Forward the email to your IT department
                        </div>
                        <div class="se-option" onclick="selectSEOption(this, false)">
                            Reply with your account information
                        </div>
                    </div>
                    <div class="se-feedback" id="seFeedback" style="display: none;"></div>
                </div>
            `,
            init: initSocialEngineeringGame
        },
        'incident-response': {
            title: 'Incident Response Simulator',
            content: `
                <div class="incident-response">
                    <div class="ir-header">
                        <div class="ir-title">🚨 Incident Response Simulator</div>
                        <div class="ir-subtitle">Handle a real-time cybersecurity incident</div>
                    </div>
                    <div class="ir-alert">
                        <div class="alert-title">🚨 SECURITY ALERT</div>
                        <div class="alert-description">
                            Multiple failed login attempts detected from suspicious IP addresses. 
                            Potential brute force attack in progress. Immediate action required.
                        </div>
                        <div class="alert-severity">CRITICAL</div>
                    </div>
                    <div class="ir-timeline">
                        <div class="timeline-title">Incident Timeline</div>
                        <div class="timeline-item">
                            <div class="timeline-time">09:15</div>
                            <div class="timeline-action">Failed login attempts detected</div>
                            <div class="timeline-status pending">PENDING</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-time">09:16</div>
                            <div class="timeline-action">Security team notified</div>
                            <div class="timeline-status completed">COMPLETED</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-time">09:17</div>
                            <div class="timeline-action">IP addresses blocked</div>
                            <div class="timeline-status pending">PENDING</div>
                        </div>
                    </div>
                    <div class="ir-actions">
                        <div class="ir-action" onclick="executeIRAction(this, 'block-ip')">
                            <div class="ir-action-title">Block Suspicious IPs</div>
                            <div class="ir-action-description">Immediately block the attacking IP addresses</div>
                        </div>
                        <div class="ir-action" onclick="executeIRAction(this, 'reset-passwords')">
                            <div class="ir-action-title">Reset Affected Passwords</div>
                            <div class="ir-action-description">Force password reset for targeted accounts</div>
                        </div>
                        <div class="ir-action" onclick="executeIRAction(this, 'enable-2fa')">
                            <div class="ir-action-title">Enable 2FA</div>
                            <div class="ir-action-description">Activate two-factor authentication</div>
                        </div>
                        <div class="ir-action" onclick="executeIRAction(this, 'notify-users')">
                            <div class="ir-action-title">Notify Affected Users</div>
                            <div class="ir-action-description">Send security alerts to users</div>
                        </div>
                    </div>
                </div>
            `,
            init: initIncidentResponseGame
        }
    };
    
    return games[gameName];
}

// Advanced Snake & Ladder Game with Visual Board
function initSnakeLadderGame() {
    const canvas = document.getElementById('snakeLadderCanvas');
    const ctx = canvas.getContext('2d');
    
    // Game state
    let playerPosition = 1;
    let isAnimating = false;
    let diceValue = 0;
    
    // Board configuration
    const boardSize = 10;
    const cellSize = 60;
    const boardWidth = boardSize * cellSize;
    const boardHeight = boardSize * cellSize;
    
    // Snake and ladder positions
    const snakes = {27: 5, 40: 3, 43: 18, 54: 38, 66: 45, 76: 58, 89: 53, 99: 41};
    const ladders = {4: 25, 13: 46, 42: 63, 33: 49, 50: 69, 62: 81, 74: 92};
    
    // Cybersecurity questions (50+ questions across all categories)
    const questions = [
        // Basic Security Concepts
        {
            question: "What is the primary purpose of a firewall?",
            options: ["To prevent unauthorized access", "To speed up internet", "To store passwords", "To create backups"],
            correct: 0,
            explanation: "Firewalls monitor and control network traffic to prevent unauthorized access."
        },
        {
            question: "Which attack vector is most commonly used in phishing?",
            options: ["Email", "Phone calls", "Physical mail", "Television ads"],
            correct: 0,
            explanation: "Email is the most common vector for phishing attacks due to its widespread use."
        },
        {
            question: "What does '2FA' stand for?",
            options: ["Two Factor Authentication", "Two File Access", "Two Function Analysis", "Two Factor Authorization"],
            correct: 0,
            explanation: "2FA adds an extra layer of security by requiring two forms of verification."
        },
        {
            question: "What is the most common type of cyber attack?",
            options: ["Phishing", "Malware", "DDoS", "SQL Injection"],
            correct: 0,
            explanation: "Phishing is the most common cyber attack, accounting for over 80% of security incidents."
        },
        {
            question: "What does HTTPS stand for?",
            options: ["HyperText Transfer Protocol Secure", "HyperTransfer Protocol Secure", "HyperLink Transfer Protocol Secure", "None of the above"],
            correct: 0,
            explanation: "HTTPS stands for HyperText Transfer Protocol Secure, providing encrypted communication."
        },
        {
            question: "What is a VPN?",
            options: ["Virtual Private Network", "Very Private Network", "Virtual Public Network", "Verified Private Network"],
            correct: 0,
            explanation: "VPN stands for Virtual Private Network, creating a secure connection over the internet."
        },
        
        // Password Security
        {
            question: "What makes a strong password?",
            options: ["Short and simple", "Long, complex, and unique", "Your name and birth year", "123456"],
            correct: 1,
            explanation: "Strong passwords are long (12+ characters), complex (mixed case, numbers, symbols), and unique."
        },
        {
            question: "How often should you change your passwords?",
            options: ["Never", "Every 3-6 months", "Every day", "Only when hacked"],
            correct: 1,
            explanation: "Passwords should be changed every 3-6 months, or immediately if a breach is suspected."
        },
        {
            question: "What is a password manager?",
            options: ["A person who remembers passwords", "Software that stores and manages passwords", "A type of virus", "A physical device"],
            correct: 1,
            explanation: "Password managers are software tools that securely store and manage your passwords."
        },
        
        // Malware and Viruses
        {
            question: "What is malware?",
            options: ["Good software", "Malicious software", "Old software", "Expensive software"],
            correct: 1,
            explanation: "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to systems."
        },
        {
            question: "What is ransomware?",
            options: ["Software that protects from ransom", "Malware that encrypts files and demands payment", "A type of firewall", "A password manager"],
            correct: 1,
            explanation: "Ransomware encrypts files and demands payment (ransom) to restore access."
        },
        {
            question: "What is a trojan horse?",
            options: ["A wooden horse", "Malware disguised as legitimate software", "A type of firewall", "A password"],
            correct: 1,
            explanation: "A trojan horse is malware disguised as legitimate software to trick users into installing it."
        },
        
        // Network Security
        {
            question: "What is a DDoS attack?",
            options: ["A type of virus", "Distributed Denial of Service attack", "A password attack", "A firewall"],
            correct: 1,
            explanation: "DDoS attacks overwhelm servers with traffic from multiple sources to make them unavailable."
        },
        {
            question: "What is an IP address?",
            options: ["A password", "A unique identifier for devices on a network", "A type of virus", "A firewall"],
            correct: 1,
            explanation: "An IP address is a unique numerical identifier assigned to devices on a network."
        },
        {
            question: "What is port scanning?",
            options: ["Scanning for viruses", "Checking which network ports are open", "Looking for passwords", "Installing software"],
            correct: 1,
            explanation: "Port scanning checks which network ports are open on a system to identify services."
        },
        
        // Encryption
        {
            question: "What is encryption?",
            options: ["Making files smaller", "Converting data into unreadable format", "Deleting files", "Copying files"],
            correct: 1,
            explanation: "Encryption converts data into an unreadable format that can only be decoded with a key."
        },
        {
            question: "What is end-to-end encryption?",
            options: ["Encryption at the beginning only", "Encryption that only the sender can decrypt", "Encryption that travels with the data", "No encryption"],
            correct: 2,
            explanation: "End-to-end encryption ensures data remains encrypted throughout its entire journey."
        },
        {
            question: "What is a public key?",
            options: ["A key everyone knows", "A key used for encryption that can be shared", "A password", "A virus"],
            correct: 1,
            explanation: "A public key is used for encryption and can be freely shared, while the private key is kept secret."
        },
        
        // Social Engineering
        {
            question: "What is social engineering?",
            options: ["Building social networks", "Manipulating people to reveal information", "Using social media", "Making friends"],
            correct: 1,
            explanation: "Social engineering manipulates people into revealing confidential information or performing actions."
        },
        {
            question: "What is pretexting?",
            options: ["A type of virus", "Creating a false scenario to gain information", "A password", "A firewall"],
            correct: 1,
            explanation: "Pretexting involves creating a false scenario or identity to trick people into revealing information."
        },
        {
            question: "What is tailgating?",
            options: ["Following someone through a secure door", "A type of malware", "A password attack", "A firewall technique"],
            correct: 0,
            explanation: "Tailgating is following someone through a secure door without proper authorization."
        },
        
        // Incident Response
        {
            question: "What is incident response?",
            options: ["Preventing attacks", "Responding to security incidents", "Installing software", "Changing passwords"],
            correct: 1,
            explanation: "Incident response is the process of handling and managing security incidents when they occur."
        },
        {
            question: "What is a security breach?",
            options: ["A broken computer", "Unauthorized access to data or systems", "A virus", "A firewall"],
            correct: 1,
            explanation: "A security breach is unauthorized access to data, applications, or systems."
        },
        {
            question: "What is forensics in cybersecurity?",
            options: ["Preventing attacks", "Investigating security incidents", "Installing software", "Changing passwords"],
            correct: 1,
            explanation: "Digital forensics involves investigating and analyzing security incidents and evidence."
        },
        
        // Advanced Topics
        {
            question: "What is a zero-day vulnerability?",
            options: ["A vulnerability that's never been seen", "A vulnerability with no patch available", "A fake vulnerability", "A password"],
            correct: 1,
            explanation: "Zero-day vulnerabilities are unknown to vendors and have no available patches."
        },
        {
            question: "What is penetration testing?",
            options: ["Testing pens", "Authorized simulated attacks on systems", "Installing software", "Changing passwords"],
            correct: 1,
            explanation: "Penetration testing involves authorized simulated attacks to test security defenses."
        },
        {
            question: "What is a honeypot?",
            options: ["A sweet treat", "A decoy system to trap attackers", "A type of virus", "A password"],
            correct: 1,
            explanation: "A honeypot is a decoy system designed to attract and trap attackers."
        },
        
        // Compliance and Standards
        {
            question: "What is GDPR?",
            options: ["A type of virus", "General Data Protection Regulation", "A password", "A firewall"],
            correct: 1,
            explanation: "GDPR is the General Data Protection Regulation governing data privacy in the EU."
        },
        {
            question: "What is ISO 27001?",
            options: ["A type of malware", "International standard for information security", "A password", "A virus"],
            correct: 1,
            explanation: "ISO 27001 is an international standard for information security management systems."
        },
        {
            question: "What is PCI DSS?",
            options: ["A type of attack", "Payment Card Industry Data Security Standard", "A password", "A firewall"],
            correct: 1,
            explanation: "PCI DSS is a security standard for organizations that handle credit card data."
        },
        
        // Cloud Security
        {
            question: "What is cloud security?",
            options: ["Security for clouds", "Protecting data in cloud services", "A type of virus", "A password"],
            correct: 1,
            explanation: "Cloud security involves protecting data, applications, and infrastructure in cloud environments."
        },
        {
            question: "What is multi-tenancy?",
            options: ["Having multiple tenants", "Multiple customers sharing cloud resources", "A type of attack", "A password"],
            correct: 1,
            explanation: "Multi-tenancy allows multiple customers to share cloud resources while maintaining isolation."
        },
        {
            question: "What is a CASB?",
            options: ["A type of virus", "Cloud Access Security Broker", "A password", "A firewall"],
            correct: 1,
            explanation: "CASB (Cloud Access Security Broker) provides security controls for cloud services."
        },
        
        // Mobile Security
        {
            question: "What is mobile device management?",
            options: ["Managing mobile phones", "Controlling and securing mobile devices", "A type of virus", "A password"],
            correct: 1,
            explanation: "MDM involves controlling, monitoring, and securing mobile devices in an organization."
        },
        {
            question: "What is BYOD?",
            options: ["A type of attack", "Bring Your Own Device", "A password", "A virus"],
            correct: 1,
            explanation: "BYOD (Bring Your Own Device) allows employees to use personal devices for work."
        },
        {
            question: "What is mobile app security?",
            options: ["Security for mobile apps", "Protecting mobile applications", "A type of virus", "A password"],
            correct: 1,
            explanation: "Mobile app security involves protecting mobile applications from various threats."
        },
        
        // IoT Security
        {
            question: "What is IoT?",
            options: ["Internet of Things", "A type of virus", "A password", "A firewall"],
            correct: 0,
            explanation: "IoT (Internet of Things) refers to connected devices that can communicate over the internet."
        },
        {
            question: "What is IoT security?",
            options: ["Security for IoT devices", "Protecting connected devices", "A type of virus", "A password"],
            correct: 1,
            explanation: "IoT security involves protecting connected devices from cyber threats."
        },
        {
            question: "What is a botnet?",
            options: ["A type of virus", "Network of compromised devices", "A password", "A firewall"],
            correct: 1,
            explanation: "A botnet is a network of compromised devices controlled by attackers."
        },
        
        // Cryptocurrency Security
        {
            question: "What is blockchain?",
            options: ["A type of virus", "Distributed ledger technology", "A password", "A firewall"],
            correct: 1,
            explanation: "Blockchain is a distributed ledger technology that maintains a continuously growing list of records."
        },
        {
            question: "What is a cryptocurrency wallet?",
            options: ["A physical wallet", "Software that stores cryptocurrency keys", "A type of virus", "A password"],
            correct: 1,
            explanation: "A cryptocurrency wallet stores the private keys needed to access and manage cryptocurrency."
        },
        {
            question: "What is a smart contract?",
            options: ["A regular contract", "Self-executing contract with terms in code", "A type of virus", "A password"],
            correct: 1,
            explanation: "Smart contracts are self-executing contracts with terms directly written into code."
        },
        
        // Threat Intelligence
        {
            question: "What is threat intelligence?",
            options: ["A type of virus", "Information about cyber threats", "A password", "A firewall"],
            correct: 1,
            explanation: "Threat intelligence is information about cyber threats that helps organizations defend against attacks."
        },
        {
            question: "What is an APT?",
            options: ["A type of virus", "Advanced Persistent Threat", "A password", "A firewall"],
            correct: 1,
            explanation: "APT (Advanced Persistent Threat) is a long-term targeted attack by skilled adversaries."
        },
        {
            question: "What is threat hunting?",
            options: ["Hunting for threats", "Proactively searching for threats", "A type of virus", "A password"],
            correct: 1,
            explanation: "Threat hunting is proactively searching for threats that may have evaded security controls."
        },
        
        // Security Awareness
        {
            question: "What is security awareness training?",
            options: ["Training for security guards", "Educating users about security", "A type of virus", "A password"],
            correct: 1,
            explanation: "Security awareness training educates users about security threats and best practices."
        },
        {
            question: "What is the principle of least privilege?",
            options: ["Giving maximum access", "Giving minimum necessary access", "A type of virus", "A password"],
            correct: 1,
            explanation: "Least privilege means giving users only the minimum access necessary to perform their job."
        },
        {
            question: "What is defense in depth?",
            options: ["One security layer", "Multiple layers of security", "A type of virus", "A password"],
            correct: 1,
            explanation: "Defense in depth uses multiple layers of security controls to protect systems."
        },
        
        // Emerging Threats
        {
            question: "What is AI security?",
            options: ["Security for AI", "Protecting AI systems", "A type of virus", "A password"],
            correct: 1,
            explanation: "AI security involves protecting artificial intelligence systems from attacks and misuse."
        },
        {
            question: "What is quantum computing security?",
            options: ["Security for quantum computers", "Preparing for quantum threats", "A type of virus", "A password"],
            correct: 1,
            explanation: "Quantum computing security prepares for threats posed by quantum computers to current encryption."
        },
        {
            question: "What is supply chain security?",
            options: ["Security for supply chains", "Protecting software supply chains", "A type of virus", "A password"],
            correct: 1,
            explanation: "Supply chain security protects against attacks through compromised software or hardware components."
        }
    ];
    
    // Draw the game board
    function drawBoard() {
        // Clear canvas
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        
        for (let i = 0; i <= boardSize; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, boardHeight);
            ctx.stroke();
            
            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(boardWidth, i * cellSize);
            ctx.stroke();
        }
        
        // Draw numbers
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.shadowBlur = 0;
        
        let number = 100;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const x = col * cellSize + cellSize / 2;
                const y = row * cellSize + cellSize / 2;
                
                // Alternate row direction
                const displayNumber = row % 2 === 0 ? number : number - (boardSize - 1 - col);
                
                ctx.fillText(displayNumber.toString(), x - 10, y + 5);
                number--;
            }
        }
        
        // Draw snakes
        drawSnakes();
        
        // Draw ladders
        drawLadders();
        
        // Draw player
        drawPlayer();
    }
    
    function drawSnakes() {
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 8;
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 15;
        
        Object.entries(snakes).forEach(([start, end]) => {
            const startPos = getPositionFromNumber(parseInt(start));
            const endPos = getPositionFromNumber(end);
            
            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.quadraticCurveTo(
                startPos.x + (endPos.x - startPos.x) / 2,
                startPos.y - 50,
                endPos.x,
                endPos.y
            );
            ctx.stroke();
            
            // Draw snake head
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(startPos.x, startPos.y, 8, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    
    function drawLadders() {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 10;
        
        Object.entries(ladders).forEach(([start, end]) => {
            const startPos = getPositionFromNumber(parseInt(start));
            const endPos = getPositionFromNumber(end);
            
            // Draw ladder sides
            ctx.beginPath();
            ctx.moveTo(startPos.x - 15, startPos.y);
            ctx.lineTo(endPos.x - 15, endPos.y);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(startPos.x + 15, startPos.y);
            ctx.lineTo(endPos.x + 15, endPos.y);
            ctx.stroke();
            
            // Draw ladder rungs
            const steps = 5;
            for (let i = 1; i < steps; i++) {
                const ratio = i / steps;
                const x1 = startPos.x - 15 + (endPos.x - startPos.x) * ratio;
                const y1 = startPos.y + (endPos.y - startPos.y) * ratio;
                const x2 = startPos.x + 15 + (endPos.x - startPos.x) * ratio;
                const y2 = startPos.y + (endPos.y - startPos.y) * ratio;
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        });
    }
    
    function drawPlayer() {
        const pos = getPositionFromNumber(playerPosition);
        
        // Player glow effect
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        // Player body
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 12, 0, 2 * Math.PI);
        ctx.fill();
        
        // Player face
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('😎', pos.x - 6, pos.y + 4);
    }
    
    function getPositionFromNumber(number) {
        const row = Math.floor((100 - number) / boardSize);
        const col = (100 - number) % boardSize;
        
        // Alternate row direction
        const actualCol = row % 2 === 0 ? col : boardSize - 1 - col;
        
        return {
            x: actualCol * cellSize + cellSize / 2,
            y: row * cellSize + cellSize / 2
        };
    }
    
    function rollDice() {
        if (isAnimating) return;
        
        // Animate dice
        let rollCount = 0;
        const maxRolls = 10;
        const rollInterval = setInterval(() => {
            diceValue = Math.floor(Math.random() * 6) + 1;
            document.getElementById('dice').textContent = `🎲 ${diceValue}`;
            rollCount++;
            
            if (rollCount >= maxRolls) {
                clearInterval(rollInterval);
                movePlayer();
            }
        }, 100);
    }
    
    function movePlayer() {
        isAnimating = true;
        const targetPosition = Math.min(playerPosition + diceValue, 100);
        
        // Animate movement
        const startPos = getPositionFromNumber(playerPosition);
        const endPos = getPositionFromNumber(targetPosition);
        
        let progress = 0;
        const animationDuration = 1000; // 1 second
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / animationDuration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentX = startPos.x + (endPos.x - startPos.x) * easeProgress;
            const currentY = startPos.y + (endPos.y - startPos.y) * easeProgress;
            
            // Clear and redraw
            drawBoard();
            
            // Draw player at current position
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 15, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ff6600';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 12, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('😎', currentX - 6, currentY + 4);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                playerPosition = targetPosition;
                updatePlayerDisplay();
                checkSpecialSquares();
                isAnimating = false;
            }
        }
        
        animate();
    }
    
    function checkSpecialSquares() {
        if (snakes[playerPosition]) {
            showSnakeQuestion();
        } else if (ladders[playerPosition]) {
            showLadderBonus();
        } else if (playerPosition === 100) {
            showVictory();
        } else if (playerPosition % 11 === 0 && playerPosition !== 99) {
            showRandomFact();
        }
    }
    
    function showSnakeQuestion() {
        const question = questions[Math.floor(Math.random() * questions.length)];
        
        const modal = document.createElement('div');
        modal.className = 'snake-question-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🐍 Snake Challenge!</h3>
                <p>Answer correctly to avoid going down the snake!</p>
                <div class="question">
                    <h4>${question.question}</h4>
                    <div class="options">
                        ${question.options.map((option, index) => 
                            `<button class="option-btn" data-index="${index}">${option}</button>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                const isCorrect = selectedIndex === question.correct;
                
                if (isCorrect) {
                    showCorrectAnswer(question.explanation);
                    addPoints(50);
                } else {
                    showWrongAnswer(question.explanation);
                    // Move down the snake
                    playerPosition = snakes[playerPosition];
                    updatePlayerDisplay();
                    drawBoard();
                }
                
                document.body.removeChild(modal);
            });
        });
    }
    
    function showLadderBonus() {
        const bonusPoints = 100;
        addPoints(bonusPoints);
        
        // Move up the ladder
        playerPosition = ladders[playerPosition];
        updatePlayerDisplay();
        drawBoard();
        
        // Show bonus animation
        showNotification(`🪜 Ladder Bonus! +${bonusPoints} points!`, '#00ff00');
    }
    
    function showRandomFact() {
        const facts = [
            "💡 Did you know? 95% of cybersecurity breaches are due to human error!",
            "🔐 Strong passwords should be at least 12 characters long!",
            "🛡️ Two-factor authentication prevents 99.9% of automated attacks!",
            "📧 Phishing emails are getting more sophisticated every day!",
            "🌐 HTTPS encrypts data between your browser and websites!"
        ];
        
        const fact = facts[Math.floor(Math.random() * facts.length)];
        showNotification(fact, '#00ffff');
    }
    
    function showVictory() {
        const modal = document.createElement('div');
        modal.className = 'victory-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🎉 VICTORY! 🎉</h2>
                <p>Congratulations! You've mastered cybersecurity!</p>
                <div class="victory-stats">
                    <p>Final Score: <span id="finalScore">0</span></p>
                    <p>Questions Answered: <span id="questionsAnswered">0</span></p>
                </div>
                <button onclick="location.reload()">Play Again</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        addPoints(500);
        addAchievement('snake_master', 'Snake Master', 'Completed the Cyber Snake & Ladder!');
    }
    
    function showCorrectAnswer(explanation) {
        showNotification(`✅ Correct! ${explanation}`, '#00ff00');
    }
    
    function showWrongAnswer(explanation) {
        showNotification(`❌ Wrong! ${explanation}`, '#ff0000');
    }
    
    function showNotification(message, color) {
        const notification = document.createElement('div');
        notification.className = 'game-notification';
        notification.style.background = color;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    function updatePlayerDisplay() {
        document.getElementById('playerPosition').textContent = playerPosition;
        document.getElementById('gamePoints').textContent = appState.currentUser.points;
    }
    
    // Initialize the game
    drawBoard();
    updatePlayerDisplay();
    
    // Add dice roll functionality
    document.getElementById('rollDice').addEventListener('click', rollDice);
}

// Initialize Capture The Flag game
function initCTFGame() {
    window.startCTFChallenge = function(challengeType) {
        const challenges = {
            crypto: {
                title: "🔐 Cryptography Challenge",
                description: "Decrypt this message using Caesar cipher with shift 13:",
                encrypted: "GUR FRPERG ZRFFNTR VF: CTF{CRYPTO_MASTER_2024}",
                hint: "ROT13 is a special case of Caesar cipher",
                solution: "THE SECRET MESSAGE IS: CTF{CRYPTO_MASTER_2024}",
                points: 200
            },
            web: {
                title: "🌐 Web Exploitation Challenge",
                description: "Find the hidden flag in this simulated web application:",
                scenario: "You're testing a login page. The admin panel is at /admin but requires authentication. The flag is hidden in the source code.",
                hint: "Check the page source for comments or hidden elements",
                solution: "CTF{WEB_EXPLOIT_MASTER}",
                points: 300
            },
            forensics: {
                title: "🔍 Digital Forensics Challenge",
                description: "Analyze this suspicious file and find the hidden flag:",
                scenario: "A suspicious image file was found on a compromised system. The flag is hidden using steganography.",
                hint: "Look for hidden data in the image metadata or use steganography tools",
                solution: "CTF{FORENSICS_EXPERT}",
                points: 400
            },
            reverse: {
                title: "🔄 Reverse Engineering Challenge",
                description: "Analyze this binary and find the hidden flag:",
                scenario: "A suspicious executable was found. When run, it asks for a password. Find the correct password to get the flag.",
                hint: "The password is hardcoded in the binary. Look for string comparisons.",
                solution: "CTF{REVERSE_ENGINEER}",
                points: 500
            },
            pwn: {
                title: "💥 Binary Exploitation Challenge",
                description: "Exploit this vulnerable binary to get shell access:",
                scenario: "A server application has a buffer overflow vulnerability. Craft an exploit to gain remote code execution.",
                hint: "The buffer is 64 bytes. You need to overwrite the return address.",
                solution: "CTF{PWN_MASTER}",
                points: 600
            },
            stego: {
                title: "🖼️ Steganography Challenge",
                description: "Find the hidden message in this image:",
                scenario: "A suspect sent an image file. Intelligence suggests it contains hidden information.",
                hint: "Try different steganography tools. The message might be in the LSB of pixels.",
                solution: "CTF{STEGO_EXPERT}",
                points: 350
            },
            crypto2: {
                title: "🔐 Advanced Cryptography",
                description: "Break this RSA encryption:",
                scenario: "Intercepted encrypted message. The public key is (n=143, e=7). Decrypt the message.",
                hint: "Factor n to find p and q, then calculate the private key d.",
                solution: "CTF{RSA_BREAKER}",
                points: 700
            },
            web2: {
                title: "🌐 SQL Injection Challenge",
                description: "Exploit the SQL injection vulnerability:",
                scenario: "A login form is vulnerable to SQL injection. Bypass authentication and extract the flag.",
                hint: "Try ' OR '1'='1' -- as username. The flag is in the users table.",
                solution: "CTF{SQL_INJECTION_MASTER}",
                points: 450
            },
            forensics2: {
                title: "🔍 Memory Forensics",
                description: "Analyze this memory dump:",
                scenario: "A system was compromised. Analyze the memory dump to find evidence of the attack.",
                hint: "Look for suspicious processes and network connections. The flag is in a process name.",
                solution: "CTF{MEMORY_FORENSICS}",
                points: 550
            },
            crypto3: {
                title: "🔐 Vigenère Cipher",
                description: "Decrypt this Vigenère cipher:",
                scenario: "Intercepted encrypted message. The key is 'CYBER'. Decrypt using Vigenère cipher.",
                hint: "Use the Vigenère square. Each letter is shifted by the corresponding key letter.",
                solution: "CTF{VIGENERE_CRACKER}",
                points: 300
            },
            web3: {
                title: "🌐 XSS Challenge",
                description: "Exploit the Cross-Site Scripting vulnerability:",
                scenario: "A search form is vulnerable to XSS. Inject JavaScript to steal the admin's session cookie.",
                hint: "Try <script>alert('XSS')</script> first. The flag is in the admin's cookie.",
                solution: "CTF{XSS_EXPLOITER}",
                points: 400
            },
            forensics3: {
                title: "🔍 Network Forensics",
                description: "Analyze this network traffic:",
                scenario: "Suspicious network activity detected. Analyze the pcap file to find the attacker's IP.",
                hint: "Look for unusual traffic patterns. The flag is the attacker's IP address.",
                solution: "CTF{NETWORK_FORENSICS}",
                points: 450
            },
            crypto4: {
                title: "🔐 Base64 & Hex Challenge",
                description: "Decode this multi-layer encoding:",
                scenario: "Message is encoded multiple times. Decode: 48656c6c6f20576f726c64",
                hint: "First convert hex to ASCII, then decode the Base64.",
                solution: "CTF{ENCODING_MASTER}",
                points: 250
            },
            web4: {
                title: "🌐 Directory Traversal",
                description: "Exploit the path traversal vulnerability:",
                scenario: "A file download feature is vulnerable to directory traversal. Access /etc/passwd to get the flag.",
                hint: "Try ../../../etc/passwd in the filename parameter.",
                solution: "CTF{PATH_TRAVERSAL}",
                points: 350
            },
            forensics4: {
                title: "🔍 File Carving",
                description: "Recover deleted files from this disk image:",
                scenario: "A USB drive was found. Recover the deleted files to find the hidden flag.",
                hint: "Look for file signatures. The flag is in a deleted text file.",
                solution: "CTF{FILE_CARVER}",
                points: 400
            }
        };
        
        const challenge = challenges[challengeType];
        if (!challenge) return;
        
        // Create challenge modal
        const modal = document.createElement('div');
        modal.className = 'ctf-challenge-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="challenge-header">
                    <h3>${challenge.title}</h3>
                    <div class="challenge-points">${challenge.points} points</div>
                </div>
                <div class="challenge-body">
                    <p class="challenge-description">${challenge.description}</p>
                    <div class="challenge-scenario">
                        <h4>Scenario:</h4>
                        <p>${challenge.scenario}</p>
                    </div>
                    <div class="challenge-data">
                        <h4>Data:</h4>
                        <div class="data-box">${challenge.encrypted || challenge.scenario}</div>
                    </div>
                    <div class="challenge-input">
                        <label>Enter the flag (format: CTF{...}):</label>
                        <input type="text" id="flagInput" placeholder="CTF{...}">
                        <button onclick="submitFlag('${challengeType}')">Submit Flag</button>
                    </div>
                    <div class="challenge-hint">
                        <button onclick="showHint('${challengeType}')">Show Hint</button>
                        <div id="hintText" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 5px;">
                            <strong>Hint:</strong> ${challenge.hint}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Store challenge data globally
        window.currentCTFChallenge = challenge;
    };
    
    window.submitFlag = function(challengeType) {
        const userInput = document.getElementById('flagInput').value.trim();
        const challenge = window.currentCTFChallenge;
        
        if (userInput === challenge.solution) {
            alert('🎉 Correct! Flag captured successfully!');
            addPoints(challenge.points);
            addAchievement('ctf_master', 'CTF Master', `Completed ${challengeType} challenge!`);
            document.body.removeChild(document.querySelector('.ctf-challenge-modal'));
        } else {
            alert('❌ Incorrect flag. Try again!');
        }
    };
    
    window.showHint = function(challengeType) {
        const hintText = document.getElementById('hintText');
        hintText.style.display = hintText.style.display === 'none' ? 'block' : 'none';
    };
}



// Initialize Caesar Cipher game
function initCaesarCipherGame() {
    const messages = [
        { text: "Hello World", shift: 3, answer: "Khoor Zruog" },
        { text: "Cyber Security", shift: 5, answer: "Hdgjw Xjhwytw" }
    ];
    
    let currentMessage = 0;
    let score = 0;
    
    function showMessage() {
        if (currentMessage < messages.length) {
            const message = messages[currentMessage];
            document.getElementById('cipherMessage').textContent = message.text;
            document.getElementById('cipherShiftValue').textContent = message.shift;
        } else {
            alert(`Game Complete! Final Score: ${score}`);
            addAchievement('cipher_master', 'Cipher Master', 'Completed the Caesar Cipher Challenge!');
        }
    }
    
    window.checkCipherAnswer = function() {
        const userAnswer = document.getElementById('cipherAnswer').value;
        const correctAnswer = messages[currentMessage].answer;
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            score += 20;
            addPoints(20);
            alert('Correct!');
        } else {
            alert(`Incorrect! The answer was: ${correctAnswer}`);
        }
        
        currentMessage++;
        showMessage();
    };
    
    showMessage();
}

// Initialize Network Scanner game
function initNetworkScannerGame() {
    const scanScenarios = {
        'corporate': {
            name: 'Corporate Network',
            description: 'Scan a corporate network for security assessment',
            target: '192.168.1.0/24',
            ports: [
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 8.2p1'},
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'Apache 2.4.41'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'Apache 2.4.41'},
                {port: '3389/tcp', service: 'RDP', state: 'open', version: 'Microsoft Terminal Services'},
                {port: '445/tcp', service: 'SMB', state: 'open', version: 'Samba 4.7.6'},
                {port: '1433/tcp', service: 'MSSQL', state: 'open', version: 'Microsoft SQL Server 2019'},
                {port: '3306/tcp', service: 'MySQL', state: 'open', version: 'MySQL 8.0.25'},
                {port: '5432/tcp', service: 'PostgreSQL', state: 'open', version: 'PostgreSQL 13.3'},
                {port: '21/tcp', service: 'FTP', state: 'open', version: 'vsftpd 3.0.3'},
                {port: '25/tcp', service: 'SMTP', state: 'open', version: 'Postfix 3.4.13'}
            ],
            vulnerabilities: [
                'RDP exposed without proper authentication',
                'SMB version 1 enabled (CVE-2017-0144)',
                'FTP anonymous login allowed',
                'MySQL root access without password',
                'Outdated Apache version with known vulnerabilities'
            ]
        },
        'web-server': {
            name: 'Web Server Assessment',
            description: 'Comprehensive web server security scan',
            target: 'web-server.example.com',
            ports: [
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'nginx 1.18.0'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'nginx 1.18.0'},
                {port: '8080/tcp', service: 'HTTP-Alt', state: 'open', version: 'Apache Tomcat 9.0.50'},
                {port: '8443/tcp', service: 'HTTPS-Alt', state: 'open', version: 'Apache Tomcat 9.0.50'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 8.2p1'},
                {port: '3306/tcp', service: 'MySQL', state: 'open', version: 'MySQL 8.0.25'},
                {port: '6379/tcp', service: 'Redis', state: 'open', version: 'Redis 6.2.5'},
                {port: '9200/tcp', service: 'Elasticsearch', state: 'open', version: 'Elasticsearch 7.13.2'}
            ],
            vulnerabilities: [
                'HTTP to HTTPS redirect not configured',
                'Tomcat default credentials (admin:admin)',
                'Redis exposed without authentication',
                'Elasticsearch exposed without security',
                'Missing security headers (HSTS, CSP, X-Frame-Options)',
                'Outdated nginx version with CVE-2021-23017'
            ]
        },
        'iot-devices': {
            name: 'IoT Network Scan',
            description: 'Scan IoT devices for security vulnerabilities',
            target: '192.168.0.0/24',
            ports: [
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'lighttpd 1.4.59'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'lighttpd 1.4.59'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'Dropbear SSH 2020.81'},
                {port: '23/tcp', service: 'Telnet', state: 'open', version: 'BusyBox telnetd'},
                {port: '554/tcp', service: 'RTSP', state: 'open', version: 'LIVE555 Media Server'},
                {port: '8080/tcp', service: 'HTTP-Alt', state: 'open', version: 'Boa/0.94.14rc21'},
                {port: '8888/tcp', service: 'HTTP-Alt', state: 'open', version: 'uhttpd 1.0.0'},
                {port: '9999/tcp', service: 'HTTP-Alt', state: 'open', version: 'mini_httpd 1.19'},
                {port: '1883/tcp', service: 'MQTT', state: 'open', version: 'Mosquitto MQTT Broker'},
                {port: '5683/udp', service: 'CoAP', state: 'open', version: 'Eclipse Californium'}
            ],
            vulnerabilities: [
                'Telnet service enabled (unencrypted)',
                'Default credentials on web interface (admin:admin)',
                'MQTT broker without authentication',
                'Outdated firmware with known CVEs',
                'RTSP stream accessible without authentication',
                'CoAP service without proper security',
                'Missing firmware update mechanism'
            ]
        },
        'industrial': {
            name: 'Industrial Control System',
            description: 'Scan industrial control systems for OT security',
            target: '10.0.0.0/24',
            ports: [
                {port: '502/tcp', service: 'Modbus', state: 'open', version: 'Modbus TCP'},
                {port: '102/tcp', service: 'S7', state: 'open', version: 'Siemens S7 PLC'},
                {port: '44818/tcp', service: 'EtherNet/IP', state: 'open', version: 'Rockwell Automation'},
                {port: '47808/tcp', service: 'BACnet', state: 'open', version: 'BACnet Building Automation'},
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'Apache 2.4.41'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'Apache 2.4.41'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 7.4'},
                {port: '161/udp', service: 'SNMP', state: 'open', version: 'SNMP v1/v2c'},
                {port: '623/udp', service: 'IPMI', state: 'open', version: 'IPMI 2.0'},
                {port: '1911/tcp', service: 'Niagara', state: 'open', version: 'Tridium Niagara 4.8'}
            ],
            vulnerabilities: [
                'Modbus TCP without authentication',
                'SNMP using default community strings',
                'IPMI with weak authentication',
                'Outdated firmware on PLCs',
                'Industrial protocols over unencrypted connections',
                'Default credentials on HMI interfaces',
                'Missing network segmentation'
            ]
        },
        'cloud-infrastructure': {
            name: 'Cloud Infrastructure',
            description: 'Scan cloud infrastructure for misconfigurations',
            target: 'cloud.example.com',
            ports: [
                {port: '80/tcp', service: 'HTTP', state: 'open', version: 'nginx 1.20.1'},
                {port: '443/tcp', service: 'HTTPS', state: 'open', version: 'nginx 1.20.1'},
                {port: '22/tcp', service: 'SSH', state: 'open', version: 'OpenSSH 8.2p1'},
                {port: '3306/tcp', service: 'MySQL', state: 'open', version: 'MySQL 8.0.25'},
                {port: '5432/tcp', service: 'PostgreSQL', state: 'open', version: 'PostgreSQL 13.3'},
                {port: '6379/tcp', service: 'Redis', state: 'open', version: 'Redis 6.2.5'},
                {port: '9200/tcp', service: 'Elasticsearch', state: 'open', version: 'Elasticsearch 7.13.2'},
                {port: '27017/tcp', service: 'MongoDB', state: 'open', version: 'MongoDB 4.4.6'},
                {port: '5984/tcp', service: 'CouchDB', state: 'open', version: 'CouchDB 3.1.1'},
                {port: '11211/tcp', service: 'Memcached', state: 'open', version: 'Memcached 1.6.9'}
            ],
            vulnerabilities: [
                'Database exposed to public internet',
                'MongoDB without authentication',
                'CouchDB admin interface accessible',
                'Memcached exposed without authentication',
                'Elasticsearch without security enabled',
                'Missing database encryption at rest',
                'Insufficient network access controls'
            ]
        }
    };
    
    let currentScenario = 'corporate';
    
    window.startNetworkScan = function() {
        const target = document.getElementById('scanTarget').value;
        const output = document.getElementById('scannerOutput');
        
        if (!target) {
            alert('Please enter a target IP or domain');
            return;
        }
        
        // Simulate network scan with progress
        output.innerHTML = `
            <div class="code-line">🔍 Starting comprehensive network scan...</div>
            <div class="code-line">Target: ${target}</div>
            <div class="code-line">Scanning ports 1-65535...</div>
        `;
        
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 2;
            output.innerHTML += `<div class="code-line">Progress: ${progress}% - Scanning port ${Math.floor(progress * 655.35)}</div>`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                displayScanResults(target, scanScenarios[currentScenario]);
            }
        }, 100);
    };
    
    function displayScanResults(target, scenario) {
        const output = document.getElementById('scannerOutput');
        let html = `
            <div class="code-line">✅ Scan completed!</div>
            <div class="code-line code-comment">// ==========================================</div>
            <div class="code-line code-comment">// SCAN RESULTS FOR ${target.toUpperCase()}</div>
            <div class="code-line code-comment">// ==========================================</div>
            <div class="code-line">Scenario: ${scenario.name}</div>
            <div class="code-line">Description: ${scenario.description}</div>
            <div class="code-line">Scan Time: ${new Date().toLocaleTimeString()}</div>
            <div class="code-line code-comment">// Open Ports & Services</div>
        `;
        
        scenario.ports.forEach(port => {
            html += `<div class="code-line code-highlight">${port.port} - ${port.service} - ${port.version} - ${port.state.toUpperCase()}</div>`;
        });
        
        html += `
            <div class="code-line code-comment">// Security Vulnerabilities Found</div>
        `;
        
        scenario.vulnerabilities.forEach(vuln => {
            html += `<div class="code-line code-error">⚠️  ${vuln}</div>`;
        });
        
        html += `
            <div class="code-line code-comment">// Security Recommendations</div>
            <div class="code-line">1. Implement proper authentication on all services</div>
            <div class="code-line">2. Enable encryption for all network communications</div>
            <div class="code-line">3. Update all software to latest versions</div>
            <div class="code-line">4. Implement network segmentation</div>
            <div class="code-line">5. Configure proper firewall rules</div>
            <div class="code-line">6. Enable security monitoring and logging</div>
            <div class="code-line code-comment">// Risk Level: HIGH - Immediate action required</div>
        `;
        
        output.innerHTML = html;
        addPoints(200);
    }
    
    window.switchScanScenario = function(scenario) {
        currentScenario = scenario;
        const scenarioInfo = scanScenarios[scenario];
        document.getElementById('scanTarget').value = scenarioInfo.target;
        document.getElementById('scenarioDescription').textContent = scenarioInfo.description;
    };
    
    window.clearScannerOutput = function() {
        document.getElementById('scannerOutput').innerHTML = `
            <div class="code-line">Welcome to CyberArcade Network Scanner v3.0</div>
            <div class="code-line">Initializing security protocols...</div>
            <div class="code-line">Loading threat intelligence database...</div>
            <div class="code-line">Ready to scan for vulnerabilities</div>
            <div class="code-line code-comment">// Select a scenario and enter target to begin scan</div>
        `;
    };
}

// Initialize Password Cracker game
function initPasswordCrackerGame() {
    let isCracking = false;
    let attempts = 0;
    let currentAttack = 'dictionary';
    let currentTarget = 'user';
    
    const attackMethods = {
        'dictionary': {
            name: 'Dictionary Attack',
            description: 'Try common passwords from a dictionary',
            passwords: ['password', '123456', 'admin', 'qwerty', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'hello', 'iloveyou', 'princess', 'rockyou', '1234567890', 'abc123', 'nicole', 'daniel', 'babygirl', 'monkey', 'lovely', 'jessica', '654321', 'michael', 'ashley', 'qwerty', '111111', 'iloveyou', '000000', 'michelle', 'tigger', 'sunshine', 'chocolate', 'password1', 'soccer', 'anthony', 'friends', 'butterfly', 'purple', 'angel', 'jordan', 'liverpool', 'justin', 'loveme', 'fuckyou', '123123', 'football', 'secret', 'andrea', 'carlos', 'jennifer', 'joshua', 'basketball', 'superman', 'hannah', 'amanda', 'love', 'jessica', 'cheese', 'metallica', 'liverpool', 'jennifer', 'jordan23', 'believe', 'hunter', 'michelle', 'andrew', 'love', '2000', 'chicken', 'monster', 'sandra', 'harley', 'charlie', 'andrea', 'fuckme', 'tigger', 'sunshine', 'iloveyou', '2000', 'charlie', 'robert', 'thomas', 'hockey', 'ranger', 'daniel', 'starwars', 'klaster', '112233', 'george', 'asshole', 'computer', 'michelle', 'jessica', 'pepper', 'zxcvbn', '555555', '111111', '131313', 'freedom', '777777', 'pass', 'maggie', '159753', 'aaaaaa', 'ginger', 'princess', 'joshua', 'cheese', 'amanda', 'summer', 'love', 'ashley', '6969', 'nicole', 'chelsea', 'biteme', 'matthew', 'access', 'yankees', '987654321', 'dallas', 'austin', 'thunder', 'taylor', 'matrix', 'william', 'corvette', 'hello', 'martin', 'heather', 'secret', 'fucker', 'merlin', 'diamond', '1234qwer', 'gfhjkm', 'hammer', 'silver', '222222', '88888888', 'anthony', 'justin', 'test', 'bailey', 'q1w2e3r4t5', 'patrick', 'internet', 'scooter', 'orange', '11111', 'jordan', 'harley', 'rangers', 'dirty', 'bigdick', 'suckit', 'porn', 'fuck', 'alexis', 'ferrari', 'knight', 'skywalker', 'playboy', 'rainbow', 'asshole', 'thx1138', 'thomas', 'soccer', 'hockey', 'killer', 'george', 'sexy', 'andrew', 'charlie', 'superman', 'asshole', 'dallas', 'jessica', 'panties', 'pepper', '1234', 'skippy', 'zombie'],
            speed: 200
        },
        'brute-force': {
            name: 'Brute Force Attack',
            description: 'Try all possible character combinations',
            passwords: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk', 'bl', 'bm', 'bn', 'bo', 'bp', 'bq', 'br', 'bs', 'bt', 'bu', 'bv', 'bw', 'bx', 'by', 'bz', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'cg', 'ch', 'ci', 'cj', 'ck', 'cl', 'cm', 'cn', 'co', 'cp', 'cq', 'cr', 'cs', 'ct', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh', 'di', 'dj', 'dk', 'dl', 'dm', 'dn', 'do', 'dp', 'dq', 'dr', 'ds', 'dt', 'du', 'dv', 'dw', 'dx', 'dy', 'dz', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh', 'ei', 'ej', 'ek', 'el', 'em', 'en', 'eo', 'ep', 'eq', 'er', 'es', 'et', 'eu', 'ev', 'ew', 'ex', 'ey', 'ez', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 'fh', 'fi', 'fj', 'fk', 'fl', 'fm', 'fn', 'fo', 'fp', 'fq', 'fr', 'fs', 'ft', 'fu', 'fv', 'fw', 'fx', 'fy', 'fz', 'ga', 'gb', 'gc', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gj', 'gk', 'gl', 'gm', 'gn', 'go', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gv', 'gw', 'gx', 'gy', 'gz', 'ha', 'hb', 'hc', 'hd', 'he', 'hf', 'hg', 'hh', 'hi', 'hj', 'hk', 'hl', 'hm', 'hn', 'ho', 'hp', 'hq', 'hr', 'hs', 'ht', 'hu', 'hv', 'hw', 'hx', 'hy', 'hz', 'ia', 'ib', 'ic', 'id', 'ie', 'if', 'ig', 'ih', 'ii', 'ij', 'ik', 'il', 'im', 'in', 'io', 'ip', 'iq', 'ir', 'is', 'it', 'iu', 'iv', 'iw', 'ix', 'iy', 'iz', 'ja', 'jb', 'jc', 'jd', 'je', 'jf', 'jg', 'jh', 'ji', 'jj', 'jk', 'jl', 'jm', 'jn', 'jo', 'jp', 'jq', 'jr', 'js', 'jt', 'ju', 'jv', 'jw', 'jx', 'jy', 'jz', 'ka', 'kb', 'kc', 'kd', 'ke', 'kf', 'kg', 'kh', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kp', 'kq', 'kr', 'ks', 'kt', 'ku', 'kv', 'kw', 'kx', 'ky', 'kz', 'la', 'lb', 'lc', 'ld', 'le', 'lf', 'lg', 'lh', 'li', 'lj', 'lk', 'll', 'lm', 'ln', 'lo', 'lp', 'lq', 'lr', 'ls', 'lt', 'lu', 'lv', 'lw', 'lx', 'ly', 'lz', 'ma', 'mb', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mi', 'mj', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nb', 'nc', 'nd', 'ne', 'nf', 'ng', 'nh', 'ni', 'nj', 'nk', 'nl', 'nm', 'nn', 'no', 'np', 'nq', 'nr', 'ns', 'nt', 'nu', 'nv', 'nw', 'nx', 'ny', 'nz', 'oa', 'ob', 'oc', 'od', 'oe', 'of', 'og', 'oh', 'oi', 'oj', 'ok', 'ol', 'om', 'on', 'oo', 'op', 'oq', 'or', 'os', 'ot', 'ou', 'ov', 'ow', 'ox', 'oy', 'oz', 'pa', 'pb', 'pc', 'pd', 'pe', 'pf', 'pg', 'ph', 'pi', 'pj', 'pk', 'pl', 'pm', 'pn', 'po', 'pp', 'pq', 'pr', 'ps', 'pt', 'pu', 'pv', 'pw', 'px', 'py', 'pz', 'qa', 'qb', 'qc', 'qd', 'qe', 'qf', 'qg', 'qh', 'qi', 'qj', 'qk', 'ql', 'qm', 'qn', 'qo', 'qp', 'qq', 'qr', 'qs', 'qt', 'qu', 'qv', 'qw', 'qx', 'qy', 'qz', 'ra', 'rb', 'rc', 'rd', 're', 'rf', 'rg', 'rh', 'ri', 'rj', 'rk', 'rl', 'rm', 'rn', 'ro', 'rp', 'rq', 'rr', 'rs', 'rt', 'ru', 'rv', 'rw', 'rx', 'ry', 'rz', 'sa', 'sb', 'sc', 'sd', 'se', 'sf', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sp', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'sx', 'sy', 'sz', 'ta', 'tb', 'tc', 'td', 'te', 'tf', 'tg', 'th', 'ti', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tq', 'tr', 'ts', 'tt', 'tu', 'tv', 'tw', 'tx', 'ty', 'tz', 'ua', 'ub', 'uc', 'ud', 'ue', 'uf', 'ug', 'uh', 'ui', 'uj', 'uk', 'ul', 'um', 'un', 'uo', 'up', 'uq', 'ur', 'us', 'ut', 'uu', 'uv', 'uw', 'ux', 'uy', 'uz', 'va', 'vb', 'vc', 'vd', 've', 'vf', 'vg', 'vh', 'vi', 'vj', 'vk', 'vl', 'vm', 'vn', 'vo', 'vp', 'vq', 'vr', 'vs', 'vt', 'vu', 'vv', 'vw', 'vx', 'vy', 'vz', 'wa', 'wb', 'wc', 'wd', 'we', 'wf', 'wg', 'wh', 'wi', 'wj', 'wk', 'wl', 'wm', 'wn', 'wo', 'wp', 'wq', 'wr', 'ws', 'wt', 'wu', 'wv', 'ww', 'wx', 'wy', 'wz', 'xa', 'xb', 'xc', 'xd', 'xe', 'xf', 'xg', 'xh', 'xi', 'xj', 'xk', 'xl', 'xm', 'xn', 'xo', 'xp', 'xq', 'xr', 'xs', 'xt', 'xu', 'xv', 'xw', 'xx', 'xy', 'xz', 'ya', 'yb', 'yc', 'yd', 'ye', 'yf', 'yg', 'yh', 'yi', 'yj', 'yk', 'yl', 'ym', 'yn', 'yo', 'yp', 'yq', 'yr', 'ys', 'yt', 'yu', 'yv', 'yw', 'yx', 'yy', 'yz', 'za', 'zb', 'zc', 'zd', 'ze', 'zf', 'zg', 'zh', 'zi', 'zj', 'zk', 'zl', 'zm', 'zn', 'zo', 'zp', 'zq', 'zr', 'zs', 'zt', 'zu', 'zv', 'zw', 'zx', 'zy', 'zz'],
            speed: 100
        },
        'hybrid': {
            name: 'Hybrid Attack',
            description: 'Combine dictionary words with numbers and symbols',
            passwords: ['password123', 'admin123', 'qwerty123', 'letmein123', 'welcome123', 'monkey123', 'dragon123', 'master123', 'hello123', 'iloveyou123', 'princess123', 'rockyou123', 'abc123456', 'nicole123', 'daniel123', 'babygirl123', 'monkey123', 'lovely123', 'jessica123', 'michael123', 'ashley123', 'qwerty123', 'michelle123', 'tigger123', 'sunshine123', 'chocolate123', 'soccer123', 'anthony123', 'friends123', 'butterfly123', 'purple123', 'angel123', 'jordan123', 'liverpool123', 'justin123', 'loveme123', 'football123', 'secret123', 'andrea123', 'carlos123', 'jennifer123', 'joshua123', 'basketball123', 'superman123', 'hannah123', 'amanda123', 'love123', 'jessica123', 'cheese123', 'metallica123', 'liverpool123', 'jennifer123', 'jordan123', 'believe123', 'hunter123', 'michelle123', 'andrew123', 'love123', 'chicken123', 'monster123', 'sandra123', 'harley123', 'charlie123', 'andrea123', 'tigger123', 'sunshine123', 'iloveyou123', 'charlie123', 'robert123', 'thomas123', 'hockey123', 'ranger123', 'daniel123', 'starwars123', 'klaster123', 'george123', 'computer123', 'michelle123', 'jessica123', 'pepper123', 'pass123', 'maggie123', 'ginger123', 'princess123', 'joshua123', 'cheese123', 'amanda123', 'summer123', 'love123', 'ashley123', 'nicole123', 'chelsea123', 'matthew123', 'access123', 'yankees123', 'dallas123', 'austin123', 'thunder123', 'taylor123', 'matrix123', 'william123', 'corvette123', 'hello123', 'martin123', 'heather123', 'secret123', 'merlin123', 'diamond123', 'patrick123', 'internet123', 'scooter123', 'orange123', 'jordan123', 'harley123', 'rangers123', 'dirty123', 'alexis123', 'ferrari123', 'knight123', 'skywalker123', 'playboy123', 'rainbow123', 'thomas123', 'soccer123', 'hockey123', 'killer123', 'george123', 'sexy123', 'andrew123', 'charlie123', 'superman123', 'dallas123', 'jessica123', 'pepper123', 'skippy123', 'zombie123', 'password123', 'orange123', 'princess123', 'merlin123', 'diamond123', 'patrick123', 'internet123', 'scooter123', 'orange123', 'jordan123', 'harley123', 'rangers123', 'dirty123', 'alexis123', 'ferrari123', 'knight123', 'skywalker123', 'playboy123', 'rainbow123', 'thomas123', 'soccer123', 'hockey123', 'killer123', 'george123', 'sexy123', 'andrew123', 'charlie123', 'superman123', 'dallas123', 'jessica123', 'pepper123', 'skippy123', 'zombie123'],
            speed: 150
        },
        'mask': {
            name: 'Mask Attack',
            description: 'Target specific patterns (e.g., 8 digits, 4 letters + 4 digits)',
            passwords: ['12345678', '87654321', '11111111', '00000000', '99999999', '1234567890', '0987654321', 'abcdefgh', 'hgfedcba', 'qwertyui', 'iuytrewq', 'asdfghjk', 'kjhgfdsa', 'zxcvbnm,', ',mnbvcxz', 'password', 'drowssap', 'admin123', '321nimda', 'qwerty123', '321ytrewq', 'letmein123', '321niemtel', 'welcome123', '321emoclew', 'monkey123', '321yeknom', 'dragon123', '321nogard', 'master123', '321retsam', 'hello123', '321olleh', 'iloveyou123', '321uoyevoli', 'princess123', '321ssecnirp', 'rockyou123', '321uoykcor', 'abc123456', '654321cba', 'nicole123', '321elocin', 'daniel123', '321leinad', 'babygirl123', '321lrigybab', 'lovely123', '321ylevol', 'jessica123', '321acissej', 'michael123', '321leahcim', 'ashley123', '321yelhsa', 'michelle123', '321ellehcim', 'tigger123', '321reggit', 'sunshine123', '321enihsnus', 'chocolate123', '321etalocohc', 'soccer123', '321reccos', 'anthony123', '321ynohtna', 'friends123', '321sdnierf', 'butterfly123', '321ylfrettub', 'purple123', '321elprup', 'angel123', '321legna', 'jordan123', '321nadroj', 'liverpool123', '321looprevil', 'justin123', '321nitsuj', 'loveme123', '321emevol', 'football123', '321llabtoof', 'secret123', '321terces', 'andrea123', '321aerdna', 'carlos123', '321solrac', 'jennifer123', '321refinnej', 'joshua123', '321auhsoj', 'basketball123', '321llabteksab', 'superman123', '321namrepus', 'hannah123', '321hannah', 'amanda123', '321adnama', 'love123', '321evol', 'cheese123', '321eseehc', 'metallica123', '321acillatem', 'believe123', '321eveileb', 'hunter123', '321retnuh', 'andrew123', '321werdna', 'chicken123', '321nekcihc', 'monster123', '321retsnom', 'sandra123', '321ardnas', 'harley123', '321yelrah', 'charlie123', '321eilrahc', 'robert123', '321trebor', 'thomas123', '321samoh', 'hockey123', '321yekcoh', 'ranger123', '321regnar', 'daniel123', '321leinad', 'starwars123', '321srawrats', 'klaster123', '321retsalk', 'george123', '321egroeg', 'computer123', '321retupmoc', 'pepper123', '321reppep', 'pass123', '321ssap', 'maggie123', '321eiggam', 'ginger123', '321regnig', 'summer123', '321remmus', 'internet123', '321tenretni', 'scooter123', '321retoocs', 'orange123', '321egnaro', 'dirty123', '321ytrid', 'alexis123', '321sixela', 'ferrari123', '321irarref', 'knight123', '321thgink', 'skywalker123', '321reklawyks', 'playboy123', '321yobyalp', 'rainbow123', '321wobniar', 'killer123', '321rellik', 'sexy123', '321yxes', 'panties123', '321seitnap', 'skippy123', '321yppiks', 'zombie123', '321eibmoz'],
            speed: 120
        }
    };
    
    const targets = {
        'user': { name: 'Regular User', password: 'password123', difficulty: 'Easy' },
        'admin': { name: 'System Administrator', password: 'admin123', difficulty: 'Medium' },
        'ceo': { name: 'CEO Account', password: 'dragon123', difficulty: 'Hard' },
        'developer': { name: 'Developer Account', password: 'qwerty123', difficulty: 'Medium' },
        'database': { name: 'Database Admin', password: 'master123', difficulty: 'Hard' },
        'webmaster': { name: 'Webmaster', password: 'welcome123', difficulty: 'Easy' },
        'security': { name: 'Security Officer', password: 'letmein123', difficulty: 'Very Hard' },
        'guest': { name: 'Guest Account', password: 'hello123', difficulty: 'Easy' }
    };
    
    let targetPassword = targets['user'].password;
    
    window.startPasswordCrack = function() {
        if (isCracking) return;
        
        isCracking = true;
        attempts = 0;
        const output = document.getElementById('crackerOutput');
        const progressBar = document.getElementById('crackProgress');
        const attackMethod = attackMethods[currentAttack];
        
        output.innerHTML = `
            <div class="crack-line">🔓 Starting ${attackMethod.name}...</div>
            <div class="crack-line">Target: ${targets[currentTarget].name} (${targets[currentTarget].difficulty})</div>
            <div class="crack-line">Method: ${attackMethod.description}</div>
            <div class="crack-line">Dictionary size: ${attackMethod.passwords.length} passwords</div>
        `;
        progressBar.style.width = '0%';
        
        const crackInterval = setInterval(() => {
            attempts++;
            const progress = (attempts / attackMethod.passwords.length) * 100;
            progressBar.style.width = progress + '%';
            
            const currentPassword = attackMethod.passwords[attempts - 1];
            output.innerHTML += `<div class="crack-line">Attempt ${attempts}: "${currentPassword}" - FAILED</div>`;
            
            if (currentPassword === targetPassword) {
                clearInterval(crackInterval);
                output.innerHTML += `<div class="crack-line crack-success">🎉 SUCCESS! Password found: "${targetPassword}"</div>`;
                output.innerHTML += `<div class="crack-line">Cracked in ${attempts} attempts</div>`;
                output.innerHTML += `<div class="crack-line">Time taken: ${(attempts * attackMethod.speed / 1000).toFixed(1)} seconds</div>`;
                output.innerHTML += `<div class="crack-line">Attack method: ${attackMethod.name}</div>`;
                addPoints(200);
                isCracking = false;
            } else if (attempts >= attackMethod.passwords.length) {
                clearInterval(crackInterval);
                output.innerHTML += `<div class="crack-line crack-fail">❌ Password not found in dictionary</div>`;
                output.innerHTML += `<div class="crack-line">Try a different attack method or target</div>`;
                isCracking = false;
            }
        }, attackMethod.speed);
    };
    
    window.switchAttackMethod = function(method) {
        currentAttack = method;
        const methodInfo = attackMethods[method];
        document.getElementById('attackDescription').textContent = methodInfo.description;
        document.getElementById('attackSpeed').textContent = `Speed: ${methodInfo.speed}ms per attempt`;
        document.getElementById('attackSize').textContent = `Dictionary: ${methodInfo.passwords.length} passwords`;
    };
    
    window.switchTarget = function(target) {
        currentTarget = target;
        targetPassword = targets[target].password;
        const targetInfo = targets[target];
        document.getElementById('targetDescription').textContent = `${targetInfo.name} - ${targetInfo.difficulty} difficulty`;
    };
    
    window.resetPasswordCrack = function() {
        isCracking = false;
        attempts = 0;
        document.getElementById('crackerOutput').innerHTML = '<div class="crack-line">Ready to crack passwords</div>';
        document.getElementById('crackProgress').style.width = '0%';
    };
}

// Initialize Malware Analysis game
function initMalwareAnalysisGame() {
    window.switchTab = function(tab) {
        // Remove active class from all tabs
        document.querySelectorAll('.lab-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        event.target.classList.add('active');
        
        const content = document.getElementById('labContent');
        
        switch(tab) {
            case 'static':
                content.innerHTML = `
                    <div class="code-block">
                        <div class="code-line code-comment">// Static Analysis Results</div>
                        <div class="code-line code-comment">// File: malware_sample.exe</div>
                        <div class="code-line code-comment">// Size: 2.3 MB</div>
                        <div class="code-line code-comment">// MD5: a1b2c3d4e5f6...</div>
                        <div class="code-line"></div>
                        <div class="code-line code-comment">// Suspicious strings found:</div>
                        <div class="code-line code-highlight">"C:\\Windows\\System32\\"</div>
                        <div class="code-line code-highlight">"http://malicious-server.com"</div>
                        <div class="code-line code-highlight">"encrypt_user_data"</div>
                        <div class="code-line code-highlight">"keylogger.dll"</div>
                    </div>
                `;
                break;
            case 'dynamic':
                content.innerHTML = `
                    <div class="code-block">
                        <div class="code-line code-comment">// Dynamic Analysis Results</div>
                        <div class="code-line code-comment">// Running in sandbox environment...</div>
                        <div class="code-line"></div>
                        <div class="code-line code-comment">// Process activities:</div>
                        <div class="code-line code-highlight">Created process: explorer.exe</div>
                        <div class="code-line code-highlight">Modified registry: HKEY_CURRENT_USER</div>
                        <div class="code-line code-highlight">Network connection: 192.168.1.100:443</div>
                        <div class="code-line code-highlight">File created: C:\\temp\\data.txt</div>
                        <div class="code-line code-highlight">Screenshot captured: desktop.png</div>
                    </div>
                `;
                break;
            case 'network':
                content.innerHTML = `
                    <div class="code-block">
                        <div class="code-line code-comment">// Network Analysis Results</div>
                        <div class="code-line code-comment">// Monitoring network traffic...</div>
                        <div class="code-line"></div>
                        <div class="code-line code-comment">// Detected connections:</div>
                        <div class="code-line code-highlight">TCP 192.168.1.100:443 -> 45.32.123.45:80</div>
                        <div class="code-line code-highlight">UDP 192.168.1.100:53 -> 8.8.8.8:53</div>
                        <div class="code-line code-comment">// Suspicious domains:</div>
                        <div class="code-line code-highlight">malicious-site.com</div>
                        <div class="code-line code-highlight">data-exfiltrate.net</div>
                        <div class="code-line code-comment">// Data exfiltration detected!</div>
                    </div>
                `;
                break;
        }
        
        addPoints(25);
    };
}

// Initialize Social Engineering game
function initSocialEngineeringGame() {
    window.selectSEOption = function(element, isCorrect) {
        // Remove previous selections
        document.querySelectorAll('.se-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Mark selected option
        element.classList.add('selected');
        
        const feedback = document.getElementById('seFeedback');
        
        if (isCorrect) {
            element.classList.add('correct');
            feedback.className = 'se-feedback correct';
            feedback.textContent = '✅ Correct! You identified this as a phishing attempt. Always verify suspicious emails directly with the organization.';
            feedback.style.display = 'block';
            addPoints(100);
        } else {
            element.classList.add('incorrect');
            feedback.className = 'se-feedback incorrect';
            feedback.textContent = '❌ Incorrect! This is a classic phishing email. Look for suspicious domains, urgent language, and requests for personal information.';
            feedback.style.display = 'block';
        }
        
        // Show explanation
        setTimeout(() => {
            feedback.innerHTML += '<br><br><strong>Red Flags in this email:</strong><br>• Suspicious domain (bank-verification.com)<br>• Urgent language ("URGENT", "24 hours")<br>• Request for personal information<br>• HTTP instead of HTTPS link';
        }, 1000);
    };
}

// Initialize Incident Response game
function initIncidentResponseGame() {
    let completedActions = 0;
    const totalActions = 4;
    
    window.executeIRAction = function(element, actionType) {
        if (element.classList.contains('completed')) return;
        
        element.classList.add('completed');
        completedActions++;
        
        // Update timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (completedActions <= timelineItems.length) {
            const status = timelineItems[completedActions - 1].querySelector('.timeline-status');
            status.textContent = 'COMPLETED';
            status.className = 'timeline-status completed';
        }
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'ir-feedback';
        feedback.innerHTML = `
            <div style="background: rgba(0, 255, 0, 0.2); padding: 1rem; border-radius: 10px; margin-top: 1rem; border: 1px solid #00ff00;">
                <strong>✅ Action Completed: ${element.querySelector('.ir-action-title').textContent}</strong><br>
                <span style="color: #cccccc;">This action helps secure the system and prevent further attacks.</span>
            </div>
        `;
        
        element.appendChild(feedback);
        
        addPoints(75);
        
        // Check if all actions completed
        if (completedActions >= totalActions) {
            setTimeout(() => {
                alert('🎉 Incident Response Complete! You successfully contained the security breach.');
                addAchievement('incident_responder', 'Incident Responder', 'Successfully handled a cybersecurity incident!');
            }, 1000);
        }
    };
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
