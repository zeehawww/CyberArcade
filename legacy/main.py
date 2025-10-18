import tkinter as tk
from tkinter import ttk

class CyberArcadeApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Cyber Arcade")
        self.geometry("800x600")

        # Create a container
        container = ttk.Frame(self)
        container.pack(fill="both", expand=True)

        # Dictionary to keep references to the frames
        self.frames = {}

        # Initialize frames
        for F in (StartPage, SnakeLadder, Crosswords, MultipleGames, Information):
            frame = F(container, self)
            self.frames[F] = frame
            frame.grid(row=0, column=0, sticky="nsew")

        self.show_frame(StartPage)

    def show_frame(self, cont):
        frame = self.frames[cont]
        frame.tkraise()

class StartPage(ttk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)

        label = ttk.Label(self, text="Welcome to Cyber Arcade", font=("Helvetica", 18))
        label.pack(pady=10, padx=10)

        button1 = ttk.Button(self, text="Snake and Ladder",
                             command=lambda: controller.show_frame(SnakeLadder))
        button1.pack()

        button2 = ttk.Button(self, text="Crosswords",
                             command=lambda: controller.show_frame(Crosswords))
        button2.pack()

        button3 = ttk.Button(self, text="Multiple Games",
                             command=lambda: controller.show_frame(MultipleGames))
        button3.pack()

        button4 = ttk.Button(self, text="Information",
                             command=lambda: controller.show_frame(Information))
        button4.pack()

class SnakeLadder(ttk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        label = ttk.Label(self, text="Snake and Ladder", font=("Helvetica", 18))
        label.pack(pady=10, padx=10)
        # Add your Snake and Ladder game code here

        button = ttk.Button(self, text="Back to Home",
                            command=lambda: controller.show_frame(StartPage))
        button.pack()

class Crosswords(ttk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        label = ttk.Label(self, text="Crosswords", font=("Helvetica", 18))
        label.pack(pady=10, padx=10)
        # Add your Crosswords game code here

        button = ttk.Button(self, text="Back to Home",
                            command=lambda: controller.show_frame(StartPage))
        button.pack()

class MultipleGames(ttk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        label = ttk.Label(self, text="Multiple Games", font=("Helvetica", 18))
        label.pack(pady=10, padx=10)
        # Add your multiple games code here

        button = ttk.Button(self, text="Back to Home",
                            command=lambda: controller.show_frame(StartPage))
        button.pack()

class Information(ttk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        label = ttk.Label(self, text="Information", font=("Helvetica", 18))
        label.pack(pady=10, padx=10)
        # Add your information section code here

        button = ttk.Button(self, text="Back to Home",
                            command=lambda: controller.show_frame(StartPage))
        button.pack()

if __name__ == "__main__":
    app = CyberArcadeApp()
    app.mainloop()