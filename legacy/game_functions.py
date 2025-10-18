import tkinter as tk
from tkinter import Toplevel
import threading

# Import game scripts
import snake_n_ladder.snake as snake_game 
import crosswords.crosswords_game as crosswords
from mini_games import caesar_cipher, password_checker, tic_tac_toe, decryption, escape_room, phishing

def run_snake_ladder():
    print("Running Snake and Ladder Game")
    snake_game.run_game()

def run_crosswords():
    print("Running Crosswords Game")
    crosswords.run_game()

# Mini games section
def open_mini_games_menu():
    mini_games_window = Toplevel()
    mini_games_window.title("Mini Games")
    mini_games_window.geometry("300x400")

    # Create buttons for each mini game
    btn_caesar_cipher = tk.Button(mini_games_window, text="Play Caesar Cipher", command=run_caesar_cipher)
    btn_caesar_cipher.pack(pady=5)

    btn_password_checker = tk.Button(mini_games_window, text="Play Password Checker", command=run_password_checker)
    btn_password_checker.pack(pady=5)

    btn_tic_tac_toe = tk.Button(mini_games_window, text="Play Tic Tac Toe", command=run_tic_tac_toe)
    btn_tic_tac_toe.pack(pady=5)

    btn_decryption = tk.Button(mini_games_window, text="Play Decryption", command=run_decryption)
    btn_decryption.pack(pady=5)

    btn_escape_room = tk.Button(mini_games_window, text="Play Escape Room", command=run_escape_room)
    btn_escape_room.pack(pady=5)

    btn_phishing = tk.Button(mini_games_window, text="Play Phishing Awareness", command=run_phishing)
    btn_phishing.pack(pady=5)

def run_caesar_cipher():
    print("Running Caesar Cipher Game")
    caesar_cipher.run_game()

def run_password_checker():
    print("Running Password Checker Game")
    password_checker.run_game()

def run_tic_tac_toe():
    print("Running Tic Tac Toe Game")
    tic_tac_toe.run_game()

def run_decryption():
    print("Running Decryption Game")
    decryption.run_game()

def run_escape_room():
    print("Running Escape Room Game")
    escape_room.run_game()

def run_phishing():
    print("Running Phishing Awareness Game")
    phishing.run_game()
