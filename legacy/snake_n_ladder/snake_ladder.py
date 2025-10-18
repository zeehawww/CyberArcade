import tkinter as tk
from tkinter import ttk, messagebox
from PIL import ImageTk, Image
import random
import sys
import os

# Add the crosswords and mini_games directories to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'crosswords')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'mini_games')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'information')))

import crosswords_game  # type: ignore # Import the crossword game module

# Import mini-games modules
import caesar_cipher  # type: ignore
import escape_room  # type: ignore
import password_checker  # type: ignore
import phishing  # type: ignore
import tic_tac_toe  # type: ignore

# Import information module
import informationss  # type: ignore

# Global variables
Dice = []
Index = {}
player_positions = {"Player 1": 1}
player_speed = 50

# Snake and Ladder Configuration
snakes = {27: 5, 40: 3, 43: 18, 54: 38, 66: 45, 76: 58, 89: 53, 99: 41}
ladders = {4: 25, 13: 46, 42: 63, 33: 49, 50: 69, 62: 81, 74: 92}

# Cybersecurity Question and Fact
questions = {
    "What is a firewall?": ["A type of malware", "A system designed to prevent unauthorized access", "A type of virus", "A kind of router"],
    "What is phishing?": ["A method to trick people into giving away sensitive information", "A way to clean your computer", "A form of encryption", "A type of malware"],
    "What is ransomware?": ["A firewall", "A form of encryption", "A type of malware that encrypts files and demands payment", "A type of malware"],
    "What is a VPN?": ["A network that allows private communication over the internet", "A type of malware", "A firewall", "A kind of router"]
}

answers = {
    "What is a firewall?": "A system designed to prevent unauthorized access",
    "What is phishing?": "A method to trick people into giving away sensitive information",
    "What is ransomware?": "A type of malware that encrypts files and demands payment",
    "What is a VPN?": "A network that allows private communication over the internet"
}

# Cybersecurity Hint
cybersecurity_hints = [
    "Always use strong, unique passwords for different accounts 💪🔐.",
    "Keep your software updated to prevent security vulnerabilities ⚡🛡️.",
    "Never share sensitive information through insecure channels like email 📧🚫.",
    "Always enable two-factor authentication when available 🔑📱.",
    "There are many types of encryption, one of them is caesar cipher!"
]

# Pop-up positions for cybersecurity facts (random but not at snakes or ladders)
popup_positions = [8, 12, 17, 26, 37, 51, 64, 78]

# Main application
root = tk.Tk()
root.geometry("800x600")
root.title("Cyber Arcade")

# Add background color
root.configure(bg="#2e2e2e")  # Dark background

style = ttk.Style()
style.theme_use("clam")

# Customize button styles
style.configure("TButton", 
                background="#3a9ad9", 
                foreground="#ffffff", 
                font=('Helvetica', 16, 'bold'),  # Increased font size
                padding=15)  # Increased padding
style.map("TButton", 
          background=[('active', '#1c7aa8')],
          foreground=[('active', '#ffcc00')])

# Customize label styles
style.configure("TLabel", 
                background="#2e2e2e", 
                foreground="#ffffff", 
                font=('Helvetica', 16, 'bold'))

def open_snake_and_ladder():
    # Create a new window
    game_window = tk.Toplevel(root)
    game_window.geometry("1200x800")
    game_window.title("Snake and Ladder Game")
    
    # Resize the board image to match grid dimensions (1010px width, 810px height)
    board_img = Image.open("snake_n_ladder/images/snake.png").resize((1010, 810))  # Resize board to match grid
    board_photo = ImageTk.PhotoImage(board_img)
    
    F1 = tk.Frame(game_window, width=1200, height=800, relief='raised')
    F1.place(x=0, y=0)
    Lab = tk.Label(F1, image=board_photo)
    Lab.image = board_photo
    Lab.place(x=0, y=0)
    
    # Player Canvas
    global player_1
    player_1 = tk.Canvas(game_window, width=30, height=30)
    player_1.create_oval(5, 5, 30, 30, fill='blue')
    player_1.place(x=50, y=710)
    
    # Board position mapping
    def get_Index():
        global Index
        Num = [
            100, 99, 98, 97, 96, 95, 94, 93, 92, 91,
            81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
            80, 79, 78, 77, 76, 75, 74, 73, 72, 71,
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
            60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            40, 39, 38, 37, 36, 35, 34, 33, 32, 31,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            20, 19, 18, 17, 16, 15, 14, 13, 12, 11,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]
        row, i = 20, 0
        for x in range(1, 11):
            col = 50
            for y in range(1, 11):
                Index[Num[i]] = (col, row)
                col += 101
                i += 1
            row += 81
    get_Index()
    
    # Load dice images
    def load_dice_images():
        global Dice
        for i in range(1, 7):
            img = Image.open(f"snake_n_ladder/images/{i}.png").resize((70, 70))
            Dice.append(ImageTk.PhotoImage(img))
    load_dice_images()
    
    # Dice roll
    def roll_dice():
        roll = random.randint(1, 6)
        dice_button.config(image=Dice[roll - 1])
        move_player("Player 1", roll)
    
    # Show cybersecurity info when landing on multiples of 11
    def show_cybersecurity_info():
        message = random.choice(cybersecurity_hints)
        messagebox.showinfo("Cybersecurity Info", f"Here's a cybersecurity tip: \n{message}")
    
    # Handle Snake landing with multiple choice
    def handle_snake(player, position):
        message = random.choice(list(questions.keys()))
        options = questions[message]
        correct_answer = answers[message]
    
        def on_answer(option):
            if option == correct_answer:
                messagebox.showinfo("Correct", "Correct! You can continue the game.")
                choice_window.destroy()  
                update_player_position(player)
            else:
                messagebox.showinfo("Wrong", "Incorrect! You go back to square 1.")
                player_positions[player] = 1
                choice_window.destroy()  
                update_player_position(player)
    
        # Show a message box with choices
        choice_window = tk.Toplevel(game_window)
        choice_window.title(message)
        
        label = tk.Label(choice_window, text=message, font=('Helvetica', 14))
        label.pack(pady=10)
    
        # Create a button for each option
        for option in options:
            btn = tk.Button(choice_window, text=option, command=lambda opt=option: on_answer(opt), font=('Helvetica', 12), bg="#3a9ad9", fg="#ffffff")
            btn.pack(pady=5)
    
    # Handle Ladder climbing
    def handle_ladder(player, position):
        message = random.choice(cybersecurity_hints)
        messagebox.showinfo("Ladder", f"You climbed the ladder! Here's a cybersecurity fact: \n{message}")
        player_positions[player] = ladders[position]
        update_player_position(player)
    
    # Show pop-up fun facts at random positions
    def show_fun_fact(player):
        current_pos = player_positions[player]
        if current_pos in popup_positions:  # Only show if it's one of the random positions
            message = random.choice(cybersecurity_hints)
            messagebox.showinfo(f"Fun Cybersecurity Fact at position {current_pos} 🎉", f"{message}")
    
    # Move player
    def move_player(player, steps):
        global player_positions
        current_pos = player_positions[player]
        new_pos = current_pos + steps
        if new_pos > 100:
            new_pos = 100  # Player should not exceed position 100
        player_positions[player] = new_pos
        update_player_position(player)
    
        # Trigger info popup when landing on a multiple of 11
        if new_pos % 11 == 0 and new_pos not in {66, 99}:
            show_cybersecurity_info()
    
        # Show fun fact if landing on one of the random popup positions
        show_fun_fact(player)
    
        # Now check if landed on snake or ladder (ignore for multiples of 11)
        if new_pos in snakes and new_pos % 11 != 0:
            handle_snake(player, new_pos)
        elif new_pos in ladders and new_pos % 11 != 0:
            handle_ladder(player, new_pos)
    
    # Smooth movement
    def update_player_position(player):
        global player_1
        x, y = Index[player_positions[player]]
        def move_step(cx, cy, tx, ty):
            steps, dx, dy = 30, (tx - cx) / 30, (ty - cy) / 30
            for i in range(1, steps + 1):
                player_1.place(x=cx + dx * i, y=cy + dy * i)
                game_window.update_idletasks()
                game_window.after(player_speed)
        move_step(player_1.winfo_x(), player_1.winfo_y(), x - 15, y - 15)
    
        # Congratulatory message when reaching 100
        if player_positions[player] == 100:
            messagebox.showinfo("Congratulations!", "You reached the 100th position!\nYou've completed the game and gained insights about Cybersecurity!")
            confetti_effect()
    
    # Confetti effect
    def confetti_effect():
        confetti_label = tk.Label(game_window, text="🎉🎉🎉 Congratulations! 🎉🎉🎉", font=('Cursive', 20, 'bold'), bg="#ffcc00", fg="#000000")
        confetti_label.place(x=400, y=200)
        game_window.after(3000, confetti_label.destroy)  # Remove after 3 seconds
    
    # Exit game
    def exit_game():
        game_window.destroy()
    
    # Start game
    def start_game():
        global dice_button, exit_button
        dice_button = tk.Button(game_window, image=Dice[0], command=roll_dice, relief="raised", width=100, height=100, borderwidth=3, bg="#3a9ad9", fg="#ffffff", font=('Helvetica', 14, 'bold'))
        dice_button.place(x=1100, y=250)
    
        exit_button = tk.Button(game_window, text="Exit", command=exit_game, font=("Helvetica", 16, "bold"), 
                                 fg="black", bg="yellow", activebackground="yellow", relief="solid", 
                                 width=15, height=2, borderwidth=0)
        exit_button.place(x=1100, y=400)
    
    start_game()

def open_crosswords():
    crosswords_game.start_crossword_game()

def open_caesar_cipher():
    window = tk.Toplevel(root)
    game = caesar_cipher.CaesarCipherGame(window)

def open_escape_room():
    window = tk.Toplevel(root)
    game = escape_room.CyberEscapeRoom(window)

def open_password_checker():
    window = tk.Toplevel(root)
    password_checker.start_game()

def open_phishing():
    window = tk.Toplevel(root)
    game = phishing.PhishingGame(window)

def open_tic_tac_toe():
    window = tk.Toplevel(root)
    game = tic_tac_toe.PasswordTicTacToe(window)

def open_mini_games():
    # Create a new window for mini games
    mini_games_window = tk.Toplevel(root)
    mini_games_window.geometry("600x400")
    mini_games_window.title("Mini Games")

    # Add buttons for each mini game
    caesar_cipher_button = ttk.Button(mini_games_window, text="Caesar Cipher", command=open_caesar_cipher)
    caesar_cipher_button.pack(pady=15)  # Increased padding

    tic_tac_toe_button = ttk.Button(mini_games_window, text="Tic Tac Toe", command=open_tic_tac_toe)
    tic_tac_toe_button.pack(pady=15)  # Increased padding

    password_checker_button = ttk.Button(mini_games_window, text="Password Checker", command=open_password_checker)
    password_checker_button.pack(pady=15)  # Increased padding

    phishing_button = ttk.Button(mini_games_window, text="Phishing", command=open_phishing)
    phishing_button.pack(pady=15)  # Increased padding

    escape_room_button = ttk.Button(mini_games_window, text="Escape Room", command=open_escape_room)
    escape_room_button.pack(pady=15)  # Increased padding

def open_information():
    informationss.start_informationss()

# Main menu
title_label = tk.Label(root, text="Welcome to Cyber Arcade", font=("Helvetica", 24, "bold"), bg="#2e2e2e", fg="#ffcc00")
title_label.pack(pady=20)

snake_ladder_button = ttk.Button(root, text="Snake and Ladder", command=open_snake_and_ladder)
snake_ladder_button.pack(pady=15)  # Increased padding

crosswords_button = ttk.Button(root, text="Crosswords", command=open_crosswords)
crosswords_button.pack(pady=15)  # Increased padding

# Mini games button
mini_games_button = ttk.Button(root, text="Mini Games", command=open_mini_games)
mini_games_button.pack(pady=15)  # Increased padding

information_button = ttk.Button(root, text="Information", command=open_information)
information_button.pack(pady=15)  # Increased padding

exit_button = ttk.Button(root, text="Exit", command=root.quit)
exit_button.pack(pady=20)  # Increased padding

root.mainloop()