import tkinter as tk

def test_function():
    print("Button clicked!")

# Create the main window
root = tk.Tk()
root.title("Color Test Application")
root.geometry("300x200")

# Create a label
label = tk.Label(root, text="Click the buttons to test colors", font=("Arial", 14))
label.pack(pady=20)

# Create a red button
red_button = tk.Button(root, text="Red Button", command=test_function, bg="red", fg="white", font=("Arial", 14, "bold"), padx=20, pady=10)
red_button.pack(pady=10)

# Create a green button
green_button = tk.Button(root, text="Green Button", command=test_function, bg="green", fg="white", font=("Arial", 14, "bold"), padx=20, pady=10)
green_button.pack(pady=10)

# Start the main event loop
root.mainloop()