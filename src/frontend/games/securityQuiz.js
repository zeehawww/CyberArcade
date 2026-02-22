// Security Quiz Challenge Game
(function() {
    const quizQuestions = [
        {
            question: 'What is the minimum recommended length for a strong password?',
            options: ['6 characters', '8 characters', '12 characters', '16 characters'],
            correct: 2,
            explanation: '12 characters is the minimum recommended length. Longer passwords are exponentially harder to crack.'
        },
        {
            question: 'Which of these is a sign of a phishing email?',
            options: [
                'Urgent language demanding immediate action',
                'Asking for personal information via email',
                'Suspicious sender email address',
                'All of the above'
            ],
            correct: 3,
            explanation: 'All of these are red flags! Phishing emails often combine multiple tactics to trick you.'
        },
        {
            question: 'What does HTTPS stand for and why is it important?',
            options: [
                'HyperText Transfer Protocol Secure - it encrypts data',
                'HyperText Transfer Protocol Standard - it\'s faster',
                'HyperText Transfer Protocol Simple - it\'s easier',
                'None of the above'
            ],
            correct: 0,
            explanation: 'HTTPS encrypts data between your browser and the website, protecting your information from being intercepted.'
        },
        {
            question: 'What should you do if you receive a suspicious email?',
            options: [
                'Click the links to verify',
                'Reply to ask if it\'s legitimate',
                'Delete it and report it as spam',
                'Forward it to friends to warn them'
            ],
            correct: 2,
            explanation: 'Delete suspicious emails and report them as spam. Never click links or reply to suspicious emails.'
        },
        {
            question: 'What is two-factor authentication (2FA)?',
            options: [
                'Using two different passwords',
                'A second layer of security requiring something you know and something you have',
                'Logging in twice',
                'Using your password twice'
            ],
            correct: 1,
            explanation: '2FA adds a second verification step (like a code sent to your phone) even if someone steals your password.'
        },
        {
            question: 'Which of these is the safest way to share passwords?',
            options: [
                'Email them to yourself',
                'Text them to a friend',
                'Use a password manager',
                'Write them on a sticky note'
            ],
            correct: 2,
            explanation: 'Password managers encrypt and securely store your passwords. Never share passwords via email or text.'
        },
        {
            question: 'What is a VPN and when should you use it?',
            options: [
                'Virtual Private Network - use on public WiFi',
                'Very Private Network - use at home',
                'Virtual Public Network - use anywhere',
                'None of the above'
            ],
            correct: 0,
            explanation: 'A VPN encrypts your internet connection, especially important on public WiFi networks where hackers can intercept data.'
        },
        {
            question: 'What should you do if your account has been hacked?',
            options: [
                'Ignore it and hope it goes away',
                'Change your password immediately and enable 2FA',
                'Share it on social media',
                'Create a new account and forget the old one'
            ],
            correct: 1,
            explanation: 'Immediately change your password, enable 2FA, check for unauthorized activity, and notify the service provider.'
        },
        {
            question: 'What is malware?',
            options: [
                'Software designed to harm your computer',
                'A type of email',
                'A security feature',
                'A type of password'
            ],
            correct: 0,
            explanation: 'Malware (malicious software) includes viruses, ransomware, and spyware designed to damage or steal from your system.'
        },
        {
            question: 'Why should you keep your software updated?',
            options: [
                'Updates are annoying',
                'Updates often include security patches for vulnerabilities',
                'Updates slow down your computer',
                'Updates are optional'
            ],
            correct: 1,
            explanation: 'Software updates often fix security vulnerabilities that hackers exploit. Keeping software updated is crucial for security.'
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];
    let timeStarted = Date.now();

    function initSecurityQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        timeStarted = Date.now();
        displayQuestion();
    }

    function displayQuestion() {
        const question = quizQuestions[currentQuestion];
        const container = document.getElementById('securityQuizContainer');
        
        if (!container) return;
        
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="background: rgba(0,255,255,0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div style="color: #00ffff; font-size: 1.2rem; font-weight: bold;">
                            Question ${currentQuestion + 1} of ${quizQuestions.length}
                        </div>
                        <div style="color: #ffffff; font-size: 1.1rem;">
                            Score: <strong style="color: #00ff00;">${score}</strong>
                        </div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); height: 10px; border-radius: 5px; overflow: hidden;">
                        <div style="background: linear-gradient(45deg, #00ffff, #0080ff); height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(0,255,255,0.3); border-radius: 15px; padding: 3rem; margin-bottom: 2rem;">
                    <h2 style="color: #ffffff; font-size: 1.8rem; margin-bottom: 2rem; line-height: 1.4;">
                        ${question.question}
                    </h2>
                    
                    <div style="display: grid; gap: 1rem;">
                        ${question.options.map((option, index) => `
                            <button onclick="selectQuizAnswer(${index})" 
                                    id="quizOption${index}"
                                    style="padding: 1.5rem; background: rgba(0,255,255,0.1); border: 2px solid rgba(0,255,255,0.3); border-radius: 10px; color: #ffffff; font-size: 1.1rem; text-align: left; cursor: pointer; transition: all 0.3s ease;"
                                    onmouseover="this.style.background='rgba(0,255,255,0.2)'; this.style.borderColor='#00ffff'; this.style.transform='translateX(10px)'"
                                    onmouseout="this.style.background='rgba(0,255,255,0.1)'; this.style.borderColor='rgba(0,255,255,0.3)'; this.style.transform='translateX(0)'">
                                <span style="margin-right: 1rem; color: #00ffff; font-weight: bold;">${String.fromCharCode(65 + index)}.</span>
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    window.selectQuizAnswer = function(selectedIndex) {
        const question = quizQuestions[currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        // Disable all buttons
        for (let i = 0; i < question.options.length; i++) {
            const btn = document.getElementById(`quizOption${i}`);
            if (btn) {
                btn.style.pointerEvents = 'none';
                if (i === question.correct) {
                    btn.style.background = 'rgba(0,255,0,0.3)';
                    btn.style.borderColor = '#00ff00';
                } else if (i === selectedIndex && !isCorrect) {
                    btn.style.background = 'rgba(255,0,0,0.3)';
                    btn.style.borderColor = '#ff0000';
                }
            }
        }
        
        if (isCorrect) {
            score++;
            addPoints(30);
        }
        
        userAnswers.push({
            question: currentQuestion,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });
        
        // Show explanation after a brief delay
        setTimeout(() => {
            showQuizExplanation();
        }, 1000);
    };

    function showQuizExplanation() {
        const question = quizQuestions[currentQuestion];
        const container = document.getElementById('securityQuizContainer');
        
        const explanationHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="background: ${userAnswers[currentQuestion].isCorrect ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)'}; padding: 2rem; border-radius: 15px; border: 3px solid ${userAnswers[currentQuestion].isCorrect ? '#00ff00' : '#ff0000'}; margin-bottom: 2rem;">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <div style="font-size: 4rem; margin-bottom: 0.5rem;">${userAnswers[currentQuestion].isCorrect ? '✅' : '❌'}</div>
                        <h3 style="color: ${userAnswers[currentQuestion].isCorrect ? '#00ff00' : '#ff0000'}; font-size: 1.8rem;">
                            ${userAnswers[currentQuestion].isCorrect ? 'Correct!' : 'Incorrect'}
                        </h3>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 10px;">
                        <h4 style="color: #00ffff; margin-bottom: 1rem; font-size: 1.2rem;">💡 Explanation:</h4>
                        <p style="color: #ffffff; font-size: 1.1rem; line-height: 1.8;">
                            ${question.explanation}
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="nextQuizQuestion()" 
                            style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-3px)'"
                            onmouseout="this.style.transform='translateY(0)'">
                        ${currentQuestion < quizQuestions.length - 1 ? 'Next Question <i class="fas fa-arrow-right"></i>' : 'View Results'}
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = explanationHTML;
    }

    window.nextQuizQuestion = function() {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            displayQuestion();
        } else {
            showQuizResults();
        }
    };

    function showQuizResults() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        const timeTaken = Math.round((Date.now() - timeStarted) / 1000);
        const container = document.getElementById('securityQuizContainer');
        
        let message = '';
        let emoji = '';
        let badge = '';
        
        if (percentage === 100) {
            message = 'Perfect Score! You\'re a cybersecurity awareness expert!';
            emoji = '🏆';
            badge = 'Expert';
        } else if (percentage >= 80) {
            message = 'Excellent! You have strong cybersecurity awareness!';
            emoji = '⭐';
            badge = 'Advanced';
        } else if (percentage >= 60) {
            message = 'Good job! You\'re on the right track!';
            emoji = '👍';
            badge = 'Intermediate';
        } else {
            message = 'Keep learning! Review the explanations and try again.';
            emoji = '📚';
            badge = 'Beginner';
        }
        
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; text-align: center;">
                <div style="background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.2)); padding: 3rem; border-radius: 20px; border: 3px solid rgba(0,255,255,0.5); margin-bottom: 2rem;">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">${emoji}</div>
                    <h2 style="color: #00ffff; font-size: 2.5rem; margin-bottom: 1rem;">Quiz Complete!</h2>
                    <div style="display: inline-block; padding: 0.5rem 1.5rem; background: rgba(0,255,255,0.3); border-radius: 20px; color: #00ffff; font-weight: bold; font-size: 1.2rem; margin-bottom: 1.5rem;">
                        ${badge} Level
                    </div>
                    <div style="font-size: 4rem; color: #00ff00; margin: 1.5rem 0; font-weight: bold;">
                        ${score} / ${quizQuestions.length}
                    </div>
                    <div style="font-size: 2rem; color: #ffffff; margin-bottom: 1rem;">
                        ${percentage}% Correct
                    </div>
                    <div style="color: #cccccc; font-size: 1.1rem; margin-bottom: 1.5rem;">
                        Time: ${timeTaken} seconds
                    </div>
                    <p style="color: #ffffff; font-size: 1.3rem; line-height: 1.6;">
                        ${message}
                    </p>
                </div>
                
                <div style="background: rgba(0,255,255,0.1); padding: 2rem; border-radius: 15px; margin-bottom: 2rem; text-align: left;">
                    <h3 style="color: #00ffff; margin-bottom: 1rem; text-align: center;">📊 Your Performance:</h3>
                    <div style="display: grid; gap: 1rem;">
                        ${quizQuestions.map((q, index) => {
                            const answer = userAnswers[index];
                            return `
                                <div style="padding: 1rem; background: ${answer.isCorrect ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)'}; border-radius: 10px; border-left: 4px solid ${answer.isCorrect ? '#00ff00' : '#ff0000'};">
                                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                        <span style="font-size: 1.5rem;">${answer.isCorrect ? '✅' : '❌'}</span>
                                        <strong style="color: #ffffff;">Question ${index + 1}:</strong>
                                    </div>
                                    <p style="color: #cccccc; font-size: 0.95rem; margin: 0;">${q.question}</p>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <button onclick="initSecurityQuiz()" 
                        style="padding: 1.25rem 3rem; background: linear-gradient(45deg, #00ffff, #0080ff); border: none; border-radius: 50px; color: #000; font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-3px)'"
                        onmouseout="this.style.transform='translateY(0)'">
                    <i class="fas fa-redo"></i> Take Quiz Again
                </button>
            </div>
        `;
        
        addPoints(score * 30);
        // Submit game result to backend (MySQL)
        if (typeof submitGameResult === 'function') {
            submitGameResult('security-quiz', score, timeTaken);
        }
        if (percentage === 100) {
            addAchievement('quiz-master', 'Security Quiz Master', 'Perfect score in Security Quiz Challenge!');
        }
    }

    // Register the game
    window.CyberArcadeGames = window.CyberArcadeGames || {};
    window.CyberArcadeGames['security-quiz'] = {
        title: 'Security Quiz Challenge',
        content: `
            <div id="securityQuizContainer">
                <div style="text-align: center; padding: 2rem;">
                    <div class="spinner"></div>
                    <p style="color: #cccccc; margin-top: 1rem;">Loading quiz...</p>
                </div>
            </div>
        `,
        init: initSecurityQuiz
    };
})();








