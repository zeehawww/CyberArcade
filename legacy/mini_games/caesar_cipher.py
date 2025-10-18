import tkinter as tk
from tkinter import messagebox

# Function to encrypt a message using Caesar Cipher (step by step)
def caesar_encrypt(text, shift):
    encrypted = []
    for char in text:
        if char.isalpha():
            shift_base = 65 if char.isupper() else 97
            new_char = chr((ord(char) - shift_base + shift) % 26 + shift_base)
            encrypted.append(new_char)
        else:
            encrypted.append(char)
    return ''.join(encrypted)

# Game logic
class CaesarCipherGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Learn to Encrypt with Caesar Cipher")
        
        self.explanation = """Welcome to the Caesar Cipher game!
In this game, you'll learn how to encrypt a message step by step using the Caesar Cipher.
Here's how it works:
1. Choose a shift value (for example, 3).
2. For each letter in the message, shift it by the chosen number of positions in the alphabet.
For example, if the shift is 3:
- A becomes D
- B becomes E
- C becomes F
Let's get started by encrypting a message!
"""
        self.label = tk.Label(self.root, text=self.explanation, font=("Arial", 12), justify="left")
        self.label.pack(pady=10)
        
        self.start_button = tk.Button(self.root, text="Start Encryption", font=("Arial", 12), command=self.start_game)
        self.start_button.pack(pady=5)

    def start_game(self):
        self.label.config(text="Let's begin with an example.\n\nEnter a shift value and a message to encrypt.")
        self.start_button.config(state=tk.DISABLED)
        self.show_task()

    def show_task(self):
        # Ask for shift value and message
        self.shift_label = tk.Label(self.root, text="Enter Shift Value (1-25):", font=("Arial", 12))
        self.shift_label.pack(pady=5)
        
        self.shift_entry = tk.Entry(self.root, font=("Arial", 12))
        self.shift_entry.pack(pady=5)
        
        self.message_label = tk.Label(self.root, text="Enter Message to Encrypt:", font=("Arial", 12))
        self.message_label.pack(pady=5)

        self.message_entry = tk.Entry(self.root, font=("Arial", 12))
        self.message_entry.pack(pady=5)

        self.submit_button = tk.Button(self.root, text="Submit", font=("Arial", 12), command=self.process_encryption)
        self.submit_button.pack(pady=5)

    def process_encryption(self):
        shift = int(self.shift_entry.get())
        message = self.message_entry.get()

        # Encrypt message step-by-step
        self.encrypted_message = []
        self.step_index = 0  # To track which letter we are working on

        self.shift_value = shift
        self.original_message = message
        self.total_steps = len(message)
        
        # Start the first step of encryption
        self.show_encryption_step()

    def show_encryption_step(self):
        if self.step_index < self.total_steps:
            current_char = self.original_message[self.step_index]
            
            if current_char.isalpha():
                # Show the character and the shift process
                self.label.config(
                    text=f"Step {self.step_index+1}/{self.total_steps}:\n\nEncrypt the letter: {current_char}\n\nShift by {self.shift_value} positions."
                )
                
                # Ask the user to choose the encrypted letter
                encrypted_char = caesar_encrypt(current_char, self.shift_value)
                
                self.letter_choice_label = tk.Label(self.root, text="Choose the encrypted letter:", font=("Arial", 12))
                self.letter_choice_label.pack(pady=5)
                
                # Show options for possible encrypted characters
                options = [caesar_encrypt(current_char, self.shift_value), caesar_encrypt(current_char, self.shift_value+1), caesar_encrypt(current_char, self.shift_value-1)]
                options = list(set(options))  # Remove duplicates

                self.option_var = tk.StringVar()
                for option in options:
                    tk.Radiobutton(self.root, text=option, variable=self.option_var, value=option, font=("Arial", 12)).pack(pady=3)

                self.submit_encrypted_button = tk.Button(self.root, text="Submit", font=("Arial", 12), command=self.check_step)
                self.submit_encrypted_button.pack(pady=5)

        else:
            self.show_final_result()

    def check_step(self):
        selected_char = self.option_var.get()
        original_char = self.original_message[self.step_index]
        
        encrypted_char = caesar_encrypt(original_char, self.shift_value)
        
        if selected_char == encrypted_char:
            self.encrypted_message.append(encrypted_char)
            messagebox.showinfo("Correct!", f"Step {self.step_index+1}: Correct! The letter {original_char} becomes {encrypted_char}.")
        else:
            messagebox.showerror("Incorrect", f"Step {self.step_index+1}: Incorrect! The correct letter is {encrypted_char}.")

        self.step_index += 1
        self.show_encryption_step()

    def show_final_result(self):
        encrypted_text = ''.join(self.encrypted_message)
        messagebox.showinfo("Encryption Complete!", f"Your encrypted message is: {encrypted_text}")
        self.show_congratulations()

    def show_congratulations(self):
        messagebox.showinfo("Congratulations!", "You have successfully encrypted the message using Caesar Cipher!")
        self.root.quit()

# Create the main window
root = tk.Tk()
game = CaesarCipherGame(root)
root.mainloop()
