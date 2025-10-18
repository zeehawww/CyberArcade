import tkinter as tk
from tkinter import messagebox
import re

def check_password_strength(password):
    # Define the criteria for a strong password
    length_criteria = len(password) >= 8
    uppercase_criteria = bool(re.search(r'[A-Z]', password))
    lowercase_criteria = bool(re.search(r'[a-z]', password))
    number_criteria = bool(re.search(r'[0-9]', password))
    special_char_criteria = bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password))
    
    # Check if all criteria are met
    if all([length_criteria, uppercase_criteria, lowercase_criteria, number_criteria, special_char_criteria]):
        return "Strong Password"
    else:
        # Identify which criteria are missing
        missing_criteria = []
        if not length_criteria:
            missing_criteria.append("at least 8 characters long")
        if not uppercase_criteria:
            missing_criteria.append("at least one uppercase letter")
        if not lowercase_criteria:
            missing_criteria.append("at least one lowercase letter")
        if not number_criteria:
            missing_criteria.append("at least one number")
        if not special_char_criteria:
            missing_criteria.append("at least one special character")
        
        return f"Weak Password. Missing: {', '.join(missing_criteria)}"

def start_game():
    # Create the main window
    root = tk.Toplevel()
    root.title("Password Strength Checker")

    # Display password criteria to the user
    criteria_label = tk.Label(root, text="Create a strong password with the following criteria:\n"
                                         "1. At least 8 characters long\n"
                                         "2. Contains at least one uppercase letter (A-Z)\n"
                                         "3. Contains at least one lowercase letter (a-z)\n"
                                         "4. Contains at least one number (0-9)\n"
                                         "5. Contains at least one special character (e.g., !, @, #, $)",
                              justify="left", font=("Arial", 12))
    criteria_label.pack(pady=10)

    # Entry widget for password input
    password_label = tk.Label(root, text="Enter your password:", font=("Arial", 12))
    password_label.pack(pady=5)

    password_entry = tk.Entry(root, font=("Arial", 12), show="*")
    password_entry.pack(pady=5)

    def check_password():
        password = password_entry.get()
        result = check_password_strength(password)
        messagebox.showinfo("Password Strength", result)

    # Button to check password strength
    check_button = tk.Button(root, text="Check Password", font=("Arial", 12), command=check_password)
    check_button.pack(pady=20)

    root.mainloop()

if __name__ == "__main__":
    start_game()