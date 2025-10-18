# information.py
import tkinter as tk

class InformationWindow:
    def __init__(self, root):
        self.root = root
        self.root.title("Cybersecurity Awareness App")
        self.root.geometry("600x600")
        self.root.config(bg="#fef1f1")  # Pastel pink background for main window
        self.create_widgets()

    # Function to create info sections
    def create_info_section(self, title, color, info_function):
        section_frame = tk.Frame(self.root, bg=color, bd=2, relief="solid", padx=10, pady=10)
        section_frame.pack(pady=10, fill=tk.X)

        title_label = tk.Label(section_frame, text=title, font=("Arial", 16, "bold"), bg=color, fg="black")
        title_label.pack(side=tk.LEFT, padx=20)

        learn_more_button = tk.Button(section_frame, text="Learn More", font=("Arial", 12), command=info_function, bg="#ff9a8b", fg="black")
        learn_more_button.pack(side=tk.RIGHT, padx=20)

    # Function to toggle visibility of the content inside a frame
    def toggle_content(self, frame):
        if frame.winfo_ismapped():
            frame.pack_forget()  # Hide the content if it's visible
        else:
            frame.pack(pady=10, padx=20)  # Show the content if it's hidden

    # Function to show detailed info about Password Safety
    def show_password_safety_info(self):
        password_info = """
        Password Safety
        Passwords are like the keys to your online accounts. If someone gets your password, they can pretend to be you and steal your personal information, money, or even your identity.
        """
        
        more_info_window = tk.Toplevel(self.root)
        more_info_window.title("Learn More - Password Safety")
        more_info_window.attributes("-fullscreen", True)  # Make the window full-screen
        more_info_window.config(bg="#fce4ec")  # Pastel pink background for popup

        info_label = tk.Label(more_info_window, text=password_info, font=("Arial", 14), bg="#fce4ec", justify=tk.LEFT)
        info_label.pack(pady=10, padx=20)

        # Create dropdown for "How can you stay safe?"
        safety_frame = tk.Frame(more_info_window, bg="#fce4ec", bd=2, relief="solid", padx=10, pady=10)
        safety_button = tk.Button(safety_frame, text="How can you stay safe?", font=("Arial", 14), command=lambda: self.toggle_content(safety_content_frame), bg="#ff9a8b", fg="black")
        safety_button.pack(pady=10)
        safety_content_frame = tk.Frame(safety_frame, bg="#fce4ec")
        safety_content = """
        1. Create strong passwords using a mix of: 
           - Uppercase and lowercase letters (A, a).
           - Numbers (1, 2, 3).
           - Symbols (!, @, #).
           - Example: Instead of “mypassword,” try something like “Myp@55w0rd!”.
        2. Avoid using personal information like your name or birthdate in your passwords.
        3. Don’t reuse passwords for different accounts.
        4. Use a password manager to remember and securely store your passwords.
        5. Turn on two-factor authentication (2FA)—this means you’ll need both your password and a code sent to your phone or email to log in.
        """
        safety_label = tk.Label(safety_content_frame, text=safety_content, font=("Arial", 12), bg="#fce4ec", justify=tk.LEFT)
        safety_label.pack(pady=10, padx=20)
        safety_content_frame.pack_forget()  # Initially hide safety content
        safety_frame.pack(pady=10, padx=20)

        # Create dropdown for "What are the risks?" content
        risks_frame = tk.Frame(more_info_window, bg="#fce4ec", bd=2, relief="solid", padx=10, pady=10)
        risks_button = tk.Button(risks_frame, text="What are the risks?", font=("Arial", 14), command=lambda: self.toggle_content(risks_content_frame), bg="#ff9a8b", fg="black")
        risks_button.pack(pady=10)
        risks_content_frame = tk.Frame(risks_frame, bg="#fce4ec")
        risks_content = """
        1. Weak passwords (like "123456" or "password") are easy for hackers to guess.
        2. Using the same password for multiple accounts means if one is stolen, all your accounts are at risk.
        3. Hackers might try millions of combinations to guess your password (this is called a brute force attack).
        4. Sometimes, hackers steal passwords from websites and try them on other accounts (this is called credential stuffing).
        """
        risks_label = tk.Label(risks_content_frame, text=risks_content, font=("Arial", 12), bg="#fce4ec", justify=tk.LEFT)
        risks_label.pack(pady=10, padx=20)
        risks_content_frame.pack_forget()  # Initially hide risks content
        risks_frame.pack(pady=10, padx=20)

        close_button = tk.Button(more_info_window, text="Close", font=("Arial", 14), command=more_info_window.destroy, bg="#ff9a8b", fg="black")
        close_button.pack(side=tk.BOTTOM, pady=10)

    # Function to show detailed info about Phishing Recognition
    def show_phishing_recognition_info(self):
        phishing_info = """
        Phishing Recognition
        Phishing is when scammers try to trick you into giving them your personal information (like your passwords, bank details, or social security number).
        """
        
        more_info_window = tk.Toplevel(self.root)
        more_info_window.title("Learn More - Phishing Recognition")
        more_info_window.attributes("-fullscreen", True)  # Make the window full-screen
        more_info_window.config(bg="#fce4ec")  # Pastel pink background for popup

        info_label = tk.Label(more_info_window, text=phishing_info, font=("Arial", 14), bg="#fce4ec", justify=tk.LEFT)
        info_label.pack(pady=10, padx=20)

        # Create dropdown for "What does phishing look like?"
        phishing_frame = tk.Frame(more_info_window, bg="#fce4ec", bd=2, relief="solid", padx=10, pady=10)
        phishing_button = tk.Button(phishing_frame, text="What does phishing look like?", font=("Arial", 14), command=lambda: self.toggle_content(phishing_content_frame), bg="#ff9a8b", fg="black")
        phishing_button.pack(pady=10)
        phishing_content_frame = tk.Frame(phishing_frame, bg="#fce4ec")
        phishing_content = """
        1. You might get an email or text saying: 
           - “Your account has been hacked! Click this link to reset your password.”
           - “You’ve won a prize! Click here to claim it.”
           - “We’re updating our records. Please log in here.”
        2. These messages often look like they’re from trusted companies like banks, stores, or even friends—but they’re fake.
        """
        phishing_label = tk.Label(phishing_content_frame, text=phishing_content, font=("Arial", 12), bg="#fce4ec", justify=tk.LEFT)
        phishing_label.pack(pady=10, padx=20)
        phishing_content_frame.pack_forget()  # Initially hide phishing content
        phishing_frame.pack(pady=10, padx=20)

        # Create dropdown for "Types of phishing scams"
        types_frame = tk.Frame(more_info_window, bg="#fce4ec", bd=2, relief="solid", padx=10, pady=10)
        types_button = tk.Button(types_frame, text="Types of phishing scams", font=("Arial", 14), command=lambda: self.toggle_content(types_content_frame), bg="#ff9a8b", fg="black")
        types_button.pack(pady=10)
        types_content_frame = tk.Frame(types_frame, bg="#fce4ec")
        types_content = """
        1. Spear Phishing: Personalized scams where the scammer knows details about you (like your name or workplace) to make the message seem real.
        2. Whaling: Targeting important people like business executives.
        3. Vishing: Phone calls pretending to be customer service or tech support, asking for your information.
        4. Smishing: Fake texts asking you to click a link or reply with your personal info.
        """
        types_label = tk.Label(types_content_frame, text=types_content, font=("Arial", 12), bg="#fce4ec", justify=tk.LEFT)
        types_label.pack(pady=10, padx=20)
        types_content_frame.pack_forget()  # Initially hide types content
        types_frame.pack(pady=10, padx=20)

        close_button = tk.Button(more_info_window, text="Close", font=("Arial", 14), command=more_info_window.destroy, bg="#ff9a8b", fg="black")
        close_button.pack(side=tk.BOTTOM, pady=10)

    # Function to show detailed info about Secure Browsing Habits
    def show_secure_browsing_habits_info(self):
        browsing_info = """
        Secure Browsing Habits
        When you browse the internet, you share a lot of information. If you’re not careful, hackers can steal your personal details, spy on your activity, or install harmful software (malware) on your device.
        """
        
        more_info_window = tk.Toplevel(self.root)
        more_info_window.title("Learn More - Secure Browsing Habits")
        more_info_window.attributes("-fullscreen", True)  # Make the window full-screen
        more_info_window.config(bg="#fce4ec")  # Pastel pink background for popup

        info_label = tk.Label(more_info_window, text=browsing_info, font=("Arial", 14), bg="#fce4ec", justify=tk.LEFT)
        info_label.pack(pady=10, padx=20)

        # Create dropdown for "What are the risks?"
        risks_frame = tk.Frame(more_info_window, bg="#fce4ec", bd=2, relief="solid", padx=10, pady=10)
        risks_button = tk.Button(risks_frame, text="What are the risks?", font=("Arial", 14), command=lambda: self.toggle_content(risks_content_frame), bg="#ff9a8b", fg="black")
        risks_button.pack(pady=10)
        risks_content_frame = tk.Frame(risks_frame, bg="#fce4ec")
        risks_content = """
        1. Hackers can steal personal information like credit card numbers and passwords if you're on an unsecured website.
        2. Websites that look suspicious might try to install malware on your device when you click on links or download files.
        """
        risks_label = tk.Label(risks_content_frame, text=risks_content, font=("Arial", 12), bg="#fce4ec", justify=tk.LEFT)
        risks_label.pack(pady=10, padx=20)
        risks_content_frame.pack_forget()  # Initially hide risks content
        risks_frame.pack(pady=10, padx=20)

        # Create dropdown for "How can you stay safe?"
        safety_frame = tk.Frame(more_info_window, bg="#fce4ec", bd=2, relief="solid", padx=10, pady=10)
        safety_button = tk.Button(safety_frame, text="How can you stay safe?", font=("Arial", 14), command=lambda: self.toggle_content(safety_content_frame), bg="#ff9a8b", fg="black")
        safety_button.pack(pady=10)
        safety_content_frame = tk.Frame(safety_frame, bg="#fce4ec")
        safety_content = """
        1. Always check if the website's URL starts with "https://" instead of "http://". The "s" stands for secure.
        2. Avoid clicking on suspicious links or ads.
        3. Use a VPN (Virtual Private Network) for extra privacy while browsing.
        4. Install antivirus software to detect malicious websites and protect your device.
        """
        safety_label = tk.Label(safety_content_frame, text=safety_content, font=("Arial", 12), bg="#fce4ec", justify=tk.LEFT)
        safety_label.pack(pady=10, padx=20)
        safety_content_frame.pack_forget()  # Initially hide safety content
        safety_frame.pack(pady=10, padx=20)

        close_button = tk.Button(more_info_window, text="Close", font=("Arial", 14), command=more_info_window.destroy, bg="#ff9a8b", fg="black")
        close_button.pack(side=tk.BOTTOM, pady=10)

    def create_widgets(self):
        # Create the main sections of the window with buttons to learn more
        self.create_info_section("Password Safety", "#ffcccc", self.show_password_safety_info)
        self.create_info_section("Phishing Recognition", "#ffcccc", self.show_phishing_recognition_info)
        self.create_info_section("Secure Browsing Habits", "#ffcccc", self.show_secure_browsing_habits_info)

def start_informationss():
    root = tk.Toplevel()
    app = InformationWindow(root)
    root.mainloop()