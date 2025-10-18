import tkinter as tk
from tkinter import messagebox

# Escape room challenges
challenges = [
    {
        "question": "Which of these is the strongest password?",
        "options": ["password123", "Qwerty!234", "M@xS3cUrE#89", "iloveyou"],
        "answer": "M@xS3cUrE#89"
    },
    {
        "question": "Decode this: What is 01001000 01101001 in ASCII?",
        "options": ["Hello", "Hi", "Bye", "Hacker"],
        "answer": "Hi"
    },
    {
        "question": "Which website is the most secure?",
        "options": ["http://bank-login.com", "https://secure-bank.com", "www.freeloans.net", "http://official-site.org"],
        "answer": "https://secure-bank.com"
    },
    {
        "question": "What should you NOT do when receiving a suspicious email?",
        "options": ["Click on the link", "Check the sender address", "Report it as phishing", "Verify with the company"],
        "answer": "Click on the link"
    },
    {
        "question": "What is the safest way to create a password?",
        "options": ["Use your pet's name", "Use a combination of letters, numbers, and symbols", "Use your birthdate", "Keep it simple and easy to remember"],
        "answer": "Use a combination of letters, numbers, and symbols"
    },
    {
        "question": "What does HTTPS stand for?",
        "options": ["HyperText Transfer Protocol Secure", "HyperTransfer Protocol Secure", "HyperLink Transfer Protocol Secure", "None of the above"],
        "answer": "HyperText Transfer Protocol Secure"
    },
    {
        "question": "Which of these is a sign of a phishing email?",
        "options": ["The sender's email address looks unusual", "The email asks for personal details", "The email contains grammatical errors", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "What is the purpose of a VPN?",
        "options": ["To increase internet speed", "To browse securely and privately", "To access blocked websites", "To play games online"],
        "answer": "To browse securely and privately"
    },
    {
        "question": "What should you do if you receive an unexpected email asking for personal information?",
        "options": ["Ignore it", "Click on the link to see if it's legit", "Call the company directly to verify", "Respond with the requested information"],
        "answer": "Call the company directly to verify"
    },
    {
        "question": "Why is it important to use unique passwords for each account?",
        "options": ["To prevent one breach from affecting all accounts", "It's not necessary", "It's easier to remember", "To comply with regulations"],
        "answer": "To prevent one breach from affecting all accounts"
    }
]

class CyberEscapeRoom:
    def __init__(self, root):
        self.root = root
        self.root.title("Cyber Escape Room")
        self.index = 0  # Track current question
        
        self.label = tk.Label(root, text="Solve the challenges to escape!", font=("Arial", 14))
        self.label.pack(pady=10)

        self.question_label = tk.Label(root, text="", font=("Arial", 12), wraplength=400)
        self.question_label.pack(pady=10)

        self.buttons = []
        for _ in range(4):  # Create answer buttons
            btn = tk.Button(root, text="", width=30, command=lambda b=_: self.check_answer(b))
            btn.pack(pady=5)
            self.buttons.append(btn)

        self.show_next_question()

    def show_next_question(self):
        if self.index < len(challenges):
            q = challenges[self.index]
            self.question_label.config(text=q["question"])
            options = q["options"]
            for i in range(4):
                self.buttons[i].config(text=options[i])
        else:
            messagebox.showinfo("Success!", "Congratulations! You've escaped the hacker's trap! 🎉")
            self.root.quit()

    def check_answer(self, btn_index):
        chosen = self.buttons[btn_index].cget("text")
        correct = challenges[self.index]["answer"]
        
        if chosen == correct:
            messagebox.showinfo("Correct!", "Nice job! Moving to the next challenge.")
            self.index += 1
            self.show_next_question()
        else:
            messagebox.showerror("Wrong!", "Try again! Remember to think like a cybersecurity expert.")

    

root = tk.Tk()
game = CyberEscapeRoom(root)
root.mainloop()
