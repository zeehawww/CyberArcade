#!/usr/bin/env python3
"""
CyberArcade - Cybersecurity Learning Platform
Main entry point for the application
"""

import sys
import os

# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from backend.app import app

if __name__ == '__main__':
    print("Starting CyberArcade Server...")
    print("Cybersecurity Learning Platform")
    print("Gaming + Learning Integration")
    print("Server running at http://localhost:8080")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=8080)