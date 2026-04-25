#!/usr/bin/env python3
"""
CyberArcade - Dedicated Admin Server
Serves the Admin Content Hub and associated APIs on a separate port.
"""

from flask import Flask, send_from_directory
from flask_cors import CORS
import os
import sys

# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from backend.content_routes import content_bp
from backend import db
from backend import content_db as cdb

app = Flask(__name__, static_folder='../frontend')
app.secret_key = os.environ.get('SECRET_KEY', 'admin-secret-key-change-in-production')
CORS(app, supports_credentials=True)

# Register the administrative blueprint
app.register_blueprint(content_bp)

# Initialize database on startup
db.init_db()
cdb.init_content_tables()

@app.route('/')
@app.route('/admin')
def admin_page():
    """Serve admin content hub"""
    return send_from_directory('../frontend', 'admin.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files for the admin panel"""
    if filename.endswith(('.css', '.js', '.html')):
        return send_from_directory('../frontend', filename)
    return send_from_directory('.', filename)

if __name__ == '__main__':
    print("Starting Dedicated CyberArcade Admin Server...")
    print("Admin Hub running at http://localhost:8081")
    app.run(debug=True, host='0.0.0.0', port=8081)
