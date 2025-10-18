#!/usr/bin/env python3
"""
CyberArcade - Startup Script
Run this to start the CyberArcade application
"""

import os
import sys
import subprocess
import webbrowser
import time
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import flask_cors
        print("✅ All dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Installing dependencies...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("✅ Dependencies installed successfully")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install dependencies")
            return False

def start_server():
    """Start the Flask server"""
    print("🚀 Starting CyberArcade Server...")
    print("=" * 50)
    print("📚 Cybersecurity Learning Platform")
    print("🎮 Gaming + Learning Integration")
    print("🌐 Server will be available at: http://localhost:5000")
    print("=" * 50)
    
    # Start the Flask app
    os.system("python app.py")

def main():
    """Main function"""
    print("🎯 Welcome to CyberArcade!")
    print("A Modern Cybersecurity Learning Platform")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists("app.py"):
        print("❌ Error: app.py not found. Please run this script from the CyberArcade directory.")
        sys.exit(1)
    
    # Check dependencies
    if not check_dependencies():
        print("❌ Failed to install dependencies. Please install them manually:")
        print("   pip install -r requirements.txt")
        sys.exit(1)
    
    # Start the server
    try:
        start_server()
    except KeyboardInterrupt:
        print("\n👋 Thanks for using CyberArcade! Goodbye!")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
