import tkinter as tk
from tkinter import messagebox
import random

# MCQs on Password Security (Shuffled in order)
questions = [
    {
        "question": "Which password is the most secure?",
        "options": ["123456", "P@ssword1", "Y&x2$B7g!"],
        "answer": "Y&x2$B7g!"
    },
    {
        "question": "How often should you change your password?",
        "options": ["Never", "Every year", "Only if breached"],
        "answer": "Only if breached"
    },
    {
        "question": "What should you avoid using in a password?",
        "options": ["Special characters", "Personal info", "Random letters"],
        "answer": "Personal info"
    },
    {
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": ["A second password", "Extra security step", "Not useful"],
        "answer": "Extra security step"
    },
    {
        "question": "Which is the safest way to store passwords?",
        "options": ["Write them down", "Save in browser", "Use a password manager"],
        "answer": "Use a password manager"
    }
]
random.shuffle(questions)  # Shuffle questions at the start

class PasswordTicTacToe:
    def __init__(self, root):
        self.root = root
        self.root.title("Password Safety Tic-Tac-Toe")

        self.board = [" "] * 9
        self.current_player = "X"  # Player is X, Computer is O

        self.buttons = []
        for i in range(9):
            btn = tk.Button(root, text=" ", font=("Arial", 16), height=2, width=5, command=lambda i=i: self.ask_question(i))
            btn.grid(row=i//3, column=i%3)
            self.buttons.append(btn)

        self.question_index = 0  # Track which question to ask next

    def ask_question(self, index):
        if self.board[index] == " ":
            q = self.get_next_question()
            self.show_mcq(q["question"], q["options"], q["answer"], index)

    def get_next_question(self):
        """ Get the next question without repeating until all are used """
        if self.question_index >= len(questions):
            self.question_index = 0  # Reset index when all questions are used
            random.shuffle(questions)  # Shuffle again for variety
        
        question = questions[self.question_index]
        self.question_index += 1
        return question

    def show_mcq(self, question, options, correct_answer, index):
        """ Show a multiple-choice question with clickable buttons """
        mcq_window = tk.Toplevel(self.root)
        mcq_window.title("Security Question")
        
        tk.Label(mcq_window, text=question, font=("Arial", 12), wraplength=300).pack(pady=10)

        def check_answer(answer):
            if answer == correct_answer:
                self.board[index] = "X"
                self.buttons[index].config(text="X", fg="blue")
                if self.check_winner("X"):
                    mcq_window.destroy()
                    return
                mcq_window.destroy()
                self.computer_move()  # Let the computer play after a correct answer
            else:
                messagebox.showerror("Wrong Answer", "Incorrect! You lost your turn.")
                mcq_window.destroy()
                self.computer_move()  # Computer gets the turn if the player answers wrong

        for option in options:
            tk.Button(mcq_window, text=option, font=("Arial", 12), command=lambda opt=option: check_answer(opt)).pack(pady=5)

    def computer_move(self):
        empty_cells = [i for i, mark in enumerate(self.board) if mark == " "]
        if empty_cells:
            index = random.choice(empty_cells)
            self.board[index] = "O"
            self.buttons[index].config(text="O", fg="red")
            self.check_winner("O")

    def check_winner(self, player):
        winning_combinations = [(0,1,2), (3,4,5), (6,7,8), (0,3,6), (1,4,7), (2,5,8), (0,4,8), (2,4,6)]
        for combo in winning_combinations:
            a, b, c = combo
            if self.board[a] == self.board[b] == self.board[c] and self.board[a] != " ":
                winner = "You" if player == "X" else "Computer"
                messagebox.showinfo("Game Over", f"{winner} wins!")
                self.root.quit()
                return True
        if " " not in self.board:
            messagebox.showinfo("Game Over", "It's a tie!")
            self.root.quit()
            return True
        return False
    
    



root = tk.Tk()
game = PasswordTicTacToe(root)
root.mainloop()
