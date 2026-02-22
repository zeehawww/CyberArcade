import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE || ''

const AUDIENCE_CONFIG = {
  student: {
    name: 'Student',
    games: [
      { id: 'snake-ladder', title: 'Cyber Snake & Ladder', desc: 'Navigate cybersecurity challenges in a classic board game' },
      { id: 'phishing-detective', title: 'Phishing Detective', desc: 'Identify phishing in emails, WhatsApp, websites, and more' },
      { id: 'caesar-cipher', title: 'Caesar Cipher', desc: 'Learn encryption with the Caesar cipher' },
      { id: 'security-quiz', title: 'Security Quiz Challenge', desc: 'Test your cybersecurity knowledge' },
      { id: 'spot-the-threat', title: 'Spot the Threat', desc: 'Visual threat detection in scenarios' },
    ],
  },
  enterprise: {
    name: 'Enterprise',
    games: [
      { id: 'phishing-detective', title: 'Phishing Detective', desc: 'Identify phishing across channels' },
      { id: 'social-engineering', title: 'Social Engineering Simulator', desc: 'Pretexting, tailgating, and other tactics' },
      { id: 'spot-the-threat', title: 'Spot the Threat', desc: 'Identify security risks in UI and scenarios' },
      { id: 'incident-response', title: 'Incident Response Simulator', desc: 'Handle incidents like a pro' },
      { id: 'password-cracker', title: 'Password Cracking Simulator', desc: 'Build better password habits' },
    ],
  },
  itpro: {
    name: 'IT Pro',
    games: [
      { id: 'capture-the-flag', title: 'Capture The Flag (CTF)', desc: 'Professional challenges: crypto, web, forensics, reverse, pwn, stego' },
      { id: 'network-scanner', title: 'Network Security Scanner', desc: 'Simulated network assessments' },
      { id: 'malware-analysis', title: 'Malware Analysis Lab', desc: 'Static and dynamic malware analysis' },
      { id: 'incident-response', title: 'Incident Response Simulator', desc: 'Handle real-time incidents' },
      { id: 'password-cracker', title: 'Password Cracking Simulator', desc: 'See how weak passwords are cracked' },
      { id: 'caesar-cipher', title: 'Caesar Cipher', desc: 'Encryption fundamentals' },
    ],
  },
}

function App() {
  const [audience, setAudience] = useState('student')
  const [paths, setPaths] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/learning/paths`)
      .then((r) => r.json())
      .then(setPaths)
      .catch(() => setPaths({}))
  }, [])

  const config = AUDIENCE_CONFIG[audience] || AUDIENCE_CONFIG.student

  return (
    <div className="app">
      <header className="header">
        <h1>CyberArcade</h1>
        <p>Cybersecurity Awareness & Education</p>
      </header>

      <nav className="audience-tabs">
        {['student', 'enterprise', 'itpro'].map((key) => (
          <button
            key={key}
            className={`audience-tab ${audience === key ? 'active' : ''}`}
            onClick={() => setAudience(key)}
          >
            {AUDIENCE_CONFIG[key].name}
          </button>
        ))}
      </nav>

      <section className="games-section">
        <h2>Game Center – {config.name}</h2>
        <div className="games-grid">
          {config.games.map((g) => (
            <div key={g.id} className="game-card">
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
              <a href={`${API_BASE}/`} className="play-link">
                Play on main app →
              </a>
            </div>
          ))}
        </div>
      </section>

      {paths && Object.keys(paths).length > 0 && (
        <section className="paths-section">
          <h2>Learning Paths</h2>
          <p>Paths loaded from API. Use the main app at {API_BASE || 'same origin'} for full experience.</p>
        </section>
      )}
    </div>
  )
}

export default App
