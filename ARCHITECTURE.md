# CyberArcade – Architecture & Stack

## Current stack

- **Frontend**: Vanilla HTML/CSS/JS in `src/frontend/`; optional React app in `src/frontend-react/` (Vite + React).
- **Backend**: Flask (Python) in `src/backend/`.
- **Database**: SQLite by default (`cyberarcade.db`); optional PostgreSQL for production (see below).
- **Integrations**: Stubs for Active Directory (AD) and external API (AP) in `src/backend/integrations.py`.

## Audience modes

The app exposes three personas via tabs (Student, Enterprise, IT Pro):

- **Student**: Awareness games (Snake & Ladder, Phishing Detective, Caesar Cipher, Security Quiz, Spot the Threat).
- **Enterprise**: Employee-focused (Phishing Detective, Social Engineering, Spot the Threat, Incident Response, Password Cracker).
- **IT Professional**: Security-focused (CTF, Network Scanner, Malware Analysis, Incident Response, Password Cracker, Caesar Cipher). CTF is the flagship for security practitioners.

## Framework: React option

A React frontend lives in `src/frontend-react/` (Vite + React). It consumes the same Flask API and can be developed or deployed alongside the vanilla frontend. See `src/frontend-react/README.md` for run and build instructions.

## Database: “good database” (PostgreSQL) path

- **Default**: SQLite in `src/backend/` (no extra setup).
- **Production / “good database”**: Use **PostgreSQL** and point the app at it via a `DATABASE_URL` environment variable. The backend can be extended to use `psycopg2` (or an adapter) when `DATABASE_URL` is set; schema can mirror the existing SQLite tables (`users`, `achievements`, `game_sessions`, `learning_progress`). Migrations can be handled with a small script or a tool like Alembic.

## Integrations

- **Active Directory (AD)**: Stub routes under `/api/integrations/active-directory/*`. For real AD integration, wire in LDAP or Azure AD OAuth2 and map AD groups to audience/roles.
- **API (AP)**: Stub under `/api/integrations/api/status`. Use for progress sync, webhooks, or LMS integration; the main app API is already REST at `/api/*`.

## No duplicate games

- **Phishing Detective**: Focuses on identifying phishing in **messages** (email, WhatsApp, SMS, etc.).
- **Social Engineering**: Broader **scenarios** (pretexting, tailgating, phishing as one scenario type). No duplicate scenarios with Phishing Detective.
- **Spot the Threat**: **Visual/UI** threat detection (login screens, URLs, certificates). Distinct from message-based Phishing Detective.
- **Security Quiz** vs **Snake & Ladder**: Both use quizzes; Snake & Ladder is a board game with trivia; Security Quiz is a direct quiz. Backend serves separate question sets so content does not repeat.
