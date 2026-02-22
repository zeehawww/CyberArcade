# CyberArcade – React Frontend

This folder contains a **React** (Vite) frontend that can replace or run alongside the vanilla JS frontend. It uses the same Flask backend and is designed to support the same audience modes: **Student**, **Enterprise**, and **IT Professional**.

## Run with the backend

1. **Start the Flask API** (from project root):
   ```bash
   cd /path/to/CyberArcade
   python run.py
   ```
   Backend runs at `http://localhost:8080`.

2. **Run the React dev server** (from this folder):
   ```bash
   cd src/frontend-react
   npm install
   npm run dev
   ```
   Vite will run on a different port (e.g. 5173). Configure the API base URL in `.env`:
   ```env
   VITE_API_BASE=http://localhost:8080
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```
   Output is in `dist/`. You can serve it with Flask or any static host and point it at the same backend.

## Audience tabs

The app is built around three audiences:

- **Student** – Learners: Snake & Ladder, Phishing Detective, Caesar Cipher, Security Quiz, Spot the Threat.
- **Enterprise** – Employees: Phishing Detective, Social Engineering, Spot the Threat, Incident Response, Password Cracker.
- **IT Pro** – Security practitioners: CTF, Network Scanner, Malware Analysis, Incident Response, Password Cracker, Caesar Cipher.

Use the same `/api/*` endpoints as the vanilla frontend; add `VITE_API_BASE` so the React app talks to your Flask backend.
