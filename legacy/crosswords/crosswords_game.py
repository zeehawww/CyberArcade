import tkinter as tk

# Crossword data with distinct questions for Across and Down
crossword_data = {
    "grid": [
        ["M", "A", "L", "W", "A", "R", "E", None, None],  # MALWARE (7 letters)
        ["F", "I", "R", "E", "W", "A", "L", "L", None],   # FIREWALL (8 letters)
        ["P", "H", "I", "S", "H", None, None, None, None],  # PHISH (5 letters)
        [None, None, None, "T", None, None, None, None, None],
        [None, None, None, "O", None, None, None, None, None],
        [None, None, None, "R", None, None, None, None, None],
        [None, None, None, "A", None, None, None, None, None],
        [None, None, None, "G", None, None, None, None, None],
        [None, None, None, "E", None, None, None, None, None],
    ],
    "clues": {
        "across": [
            (0, 0, "Malicious software that harms or disrupts a system", 7),  # MALWARE
            (1, 0, "A security system that monitors and controls network traffic", 8),  # FIREWALL
            (2, 0, "A type of cyberattack where someone pretends to be a trusted entity to steal sensitive information", 5),  # PHISH
        ],
        "down": [
            (0, 3, "Avoid saving your _______ in browsers to prevent unauthorized access", 7),  # STORAGE
        ]
    }
}

# Function to check answers
def check_answers(event, r, c):
    entry = entries[r][c]
    user_input = entry.get().upper()
    correct_answer = crossword_data["grid"][r][c]

    if user_input == correct_answer:
        entry.config(bg="green", state="disabled")
    else:
        entry.config(bg="red")

# Function to reset the grid
def reset_grid():
    for r in range(len(crossword_data["grid"])):
        for c in range(len(crossword_data["grid"][r])):
            if crossword_data["grid"][r][c] is not None:
                entry = entries[r][c]
                entry.config(bg="white", state="normal", fg="black")
                entry.delete(0, tk.END)

# Create the crossword grid
def create_crossword():
    for r in range(len(crossword_data["grid"])):
        row = []
        for c in range(len(crossword_data["grid"][r])):
            if crossword_data["grid"][r][c] is not None:
                entry = tk.Entry(root, width=2, font=("Arial", 18), justify="center", bd=2, relief="solid")
                entry.grid(row=r, column=c, padx=1, pady=1)
                entry.insert(0, "")  # Empty initially
                entry.bind("<FocusOut>", lambda event, row=r, col=c: check_answers(event, row, col))
                row.append(entry)
            else:
                row.append(None)
        entries.append(row)

# Display the clues
def display_clues():
    clues_text = "Clues:\n\nAcross:\n"
    for clue in crossword_data["clues"]["across"]:
        clues_text += f"{clue[2]} (Row: {clue[0] + 1}, Col: {clue[1] + 1}) - {clue[3]} letters\n"
    clues_text += "\nDown:\n"
    for clue in crossword_data["clues"]["down"]:
        clues_text += f"{clue[2]} (Row: {clue[0] + 1}, Col: {clue[1] + 1}) - {clue[3]} letters\n"
    clues_label.config(text=clues_text)

def start_crossword_game():
    global root, entries, clues_label
    root = tk.Toplevel()
    root.title("Cybersecurity Crossword")
    root.config(bg="light cyan")

    entries = []

    # Create crossword and display clues
    create_crossword()

    # Add clue box
    clue_frame = tk.Frame(root, bd=2, relief="solid", padx=10, pady=10)
    clue_frame.grid(row=0, column=9, rowspan=15, padx=10, sticky="n")

    # Clue label inside the box
    clues_label = tk.Label(clue_frame, text="", font=("Arial", 12), justify="left", anchor="w")
    clues_label.grid(row=0, column=0, padx=10, sticky="n")
    display_clues()

    # Reset Button
    reset_button = tk.Button(root, text="Reset Crossword", font=("Arial", 14), command=reset_grid)
    reset_button.grid(row=16, column=9, pady=10)

    root.mainloop()

if __name__ == "__main__":
    start_crossword_game()