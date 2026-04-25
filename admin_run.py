import sys
import os
import subprocess
import time

def run_servers():
    print("Initializing CyberArcade Multi-Server Environment...")
    
    # Path to the admin server
    admin_script = os.path.join(os.getcwd(), 'src', 'backend', 'admin_app.py')
    
    # Start Admin Server (Port 8081)
    admin_proc = subprocess.Popen([sys.executable, admin_script])
    
    print("\n" + "="*50)
    print("ADMIN HUB ACTIVE: http://localhost:8081")
    print("="*50 + "\n")
    
    try:
        while True:
            time.sleep(1)
            if admin_proc.poll() is not None:
                print("Admin server stopped unexpectedly. Restarting...")
                admin_proc = subprocess.Popen([sys.executable, admin_script])
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        admin_proc.terminate()

if __name__ == "__main__":
    run_servers()
