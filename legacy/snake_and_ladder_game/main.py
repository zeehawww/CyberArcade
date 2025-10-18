import tkinter as tk
from tkinter import messagebox

def check_answer(answer, popup, player_position):
    """Check if the answer is correct."""
    correct_answer = "Python"  # Example correct answers
    if answer.lower() == correct_answer.lower():
        messagebox.showinfo("Correct!", "You answered correctly! Continue your game.")
        popup.destroy()  # Close the pop-up
    else:
        messagebox.showerror("Wrong!", "Wrong answer! You go back to the start.")
        player_position[0] = 1  # Reset player to square 1
        popup.destroy()

def question_popup(player_position):
    """Create a pop-up window with a question."""
    popup = tk.Toplevel()  # Create a new top-level window
    popup.title("Question Time!")
    
    # Add a question
    question_label = tk.Label(popup, text="What programming language is this game written in?")
    question_label.pack(pady=10)
    
    # Input field for the answer
    answer_entry = tk.Entry(popup)
    answer_entry.pack(pady=10)
    
    # Submit button
    submit_button = tk.Button(
        popup, 
        text="Submit", 
        command=lambda: check_answer(answer_entry.get(), popup, player_position)
    )
    submit_button.pack(pady=10)

    # Center the pop-up window
    popup.geometry("300x200")
    popup.transient(root)  # Link to the main game window
    popup.grab_set()       # Focus on the pop-up window
    root.wait_window(popup)  # Pause the game until the pop-up is closed

# Main Game Window
root = tk.Tk()
root.title("Snake and Ladder Game")
root.geometry("400x400")

player_position = [1]  # Example player position

# Button to trigger a snake encounter
snake_button = tk.Button(root, text="Land on Snake", command=lambda: question_popup(player_position))
snake_button.pack(pady=20)

root.mainloop()

