import tkinter as tk
from tkinter import messagebox

# Caesar Cipher Decryption Function
def caesar_decrypt(text, shift):
    decrypted_text = ""
    for char in text:
        if char.isalpha():
            shift_amount = shift % 26
            new_char = chr(((ord(char.lower()) - 97 - shift_amount) % 26) + 97)
            if char.isupper():
                decrypted_text += new_char.upper()
            else:
                decrypted_text += new_char
        else:
            decrypted_text += char
    return decrypted_text

# Function to check the user's answer
def check_answer():
    user_input = entry.get().strip()
    correct_answer = caesar_decrypt(encrypted_message, shift_value)

    if user_input.lower() == correct_answer.lower():
        messagebox.showinfo("Success", "Congratulations! You decrypted the message correctly.")
        # Move to next level (Increase the level here)
        start_next_level()
    else:
        messagebox.showerror("Try Again", "Incorrect! Please try again.")

# Function to start the next level (Level progression)
def start_next_level():
    global encrypted_message, shift_value, level  # Make them global so they can be updated

    # Update the level by changing the encrypted message and shift value
    level += 1  # Increase the level
    
    if level == 2:
        encrypted_message = "Wkh orqj phvvdjh."
        shift_value = 3
    elif level == 3:
        encrypted_message = "Uif npwfsgf dpef!"
        shift_value = 5
    elif level == 4:
        encrypted_message = "Xlmw mw xyvgi wlepp!"
        shift_value = 7
    elif level == 5:
        encrypted_message = "Zpvz pz dvjhq hsrrs!"
        shift_value = 9
    else:
        encrypted_message = "You have completed all levels!"
        shift_value = 0
        messagebox.showinfo("Game Over", "Congratulations, you've completed all levels!")
        return

    # Update the level label and encrypted message on the screen
    level_label.config(text=f"Level {level} - Decrypt the Message!")
    encrypted_label.config(text=f"Encrypted Message: {encrypted_message}")
    
    entry.delete(0, tk.END)  # Clear input field

# Function to show the hint (alphabet box interaction)
def show_hint(letter):
    # Apply Caesar Cipher shift on the clicked letter
    shifted_letter = caesar_decrypt(letter, shift_value)
    hint_label.config(text=f"Shifted Letter: {shifted_letter.upper()}")





# Setup the Tkinter Window
root = tk.Tk()
root.title("Decrypt the Code!")
root.geometry("600x600")
root.configure(bg="lightgreen")

# Initial Setup
encrypted_message = "Uif tfdsfu dpef!"  # Encrypted message for level 1
shift_value = 1  # Caesar Cipher Shift (initially simple)
level = 1  # Starting level

# Title
title_label = tk.Label(root, text="Decrypt the Code!", font=("Arial", 20, "bold"), bg="lightgreen", fg="darkblue")
title_label.pack(pady=20)

# Level Display
level_label = tk.Label(root, text=f"Level {level} - Decrypt the Message!", font=("Arial", 14), bg="lightgreen", fg="black")
level_label.pack(pady=10)

# Instructions
instructions_label = tk.Label(root, text="Use the Caesar Cipher to decrypt the message. Click on the letters for hints!", font=("Arial", 12), bg="lightgreen", fg="black")
instructions_label.pack(pady=10)

# Encrypted message display
encrypted_label = tk.Label(root, text=f"Encrypted Message: {encrypted_message}", font=("Arial", 16), bg="lightgreen", fg="black")
encrypted_label.pack(pady=20)

# User Input Field
entry_label = tk.Label(root, text="Enter your decrypted message:", font=("Arial", 12), bg="lightgreen", fg="black")
entry_label.pack(pady=5)

entry = tk.Entry(root, font=("Arial", 12))
entry.pack(pady=10)

# Alphabet Box for Hints (5x5 grid)
alphabet_box_frame = tk.Frame(root, bg="lightgreen")
alphabet_box_frame.pack(pady=10)

alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
row = 0  # To keep track of row number for placing buttons

# Create the 5x5 grid for alphabet
for i, letter in enumerate(alphabet):
    letter_button = tk.Button(alphabet_box_frame, text=letter, font=("Arial", 12), width=4, height=2, command=lambda l=letter: show_hint(l))
    letter_button.grid(row=row, column=i % 5, padx=5, pady=5)  # Using grid to organize buttons
    if i % 5 == 4:
        row += 1  # Move to the next row after every 5 letters


# Hint Label
hint_label = tk.Label(root, text="Shifted Letter: ", font=("Arial", 12), bg="lightgreen", fg="black")
hint_label.pack(pady=10)

# Check Answer Button
check_button = tk.Button(root, text="Check Answer", font=("Arial", 12), command=check_answer, bg="green", fg="white")
check_button.pack(pady=20)

# Start the game
root.mainloop()
