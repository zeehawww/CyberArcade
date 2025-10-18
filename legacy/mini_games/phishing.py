import tkinter as tk
from tkinter import messagebox
import random

# Sample emails (some legit, some phishing)
emails = [
    {"text": "Your PayPal account has been locked! Click here to restore access: http://paypal-secure-login.com", "phishing": True},
    {"text": "Your Amazon order has been shipped. Track it here: https://amazon.com/track", "phishing": False},
    {"text": "You've won a $500 gift card! Click to claim: http://freegiftcards.com", "phishing": True},
    {"text": "Reminder: Your Zoom meeting is scheduled for 3 PM. Join here: https://zoom.us/j/123456789", "phishing": False},
]

# Shuffle emails
random.shuffle(emails)

class PhishingGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Phishing Detective")
        self.index = 0

        self.label = tk.Label(root, text="Is this email phishing or legit?", font=("Arial", 16, "bold"))
        self.label.pack(pady=20)

        self.email_text = tk.Label(root, text="", wraplength=500, font=("Arial", 14), fg="blue", padx=20, pady=20, relief="solid", borderwidth=2)
        self.email_text.pack(pady=20)

        self.button_frame = tk.Frame(root)
        self.button_frame.pack(pady=20)

        # Phishing button with full red background and white text
        self.phishing_button = tk.Button(self.button_frame, text="Phishing", command=lambda: self.check_answer(True), bg="red", fg="white", font=("Arial", 14, "bold"), padx=20, pady=10)
        self.phishing_button.grid(row=0, column=0, padx=20)

        # Legit button with full green background and white text
        self.legit_button = tk.Button(self.button_frame, text="Legit", command=lambda: self.check_answer(False), bg="green", fg="white", font=("Arial", 14, "bold"), padx=20, pady=10)
        self.legit_button.grid(row=0, column=1, padx=20)

        self.show_next_email()

    def show_next_email(self):
        if self.index < len(emails):
            self.email_text.config(text=emails[self.index]["text"])
        else:
            messagebox.showinfo("Game Over", "You've reviewed all emails!")
            self.root.quit()

    def check_answer(self, user_choice):
        correct = emails[self.index]["phishing"] == user_choice
        if correct:
            messagebox.showinfo("Correct!", "Good job! You identified it correctly.")
        else:
            messagebox.showerror("Wrong!", "Oops! That was incorrect.")
        
        self.index += 1
        self.show_next_email()


root = tk.Tk()
game = PhishingGame(root)
root.mainloop()