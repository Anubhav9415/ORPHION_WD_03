Task-3

Project Title-# Tic-Tac-Toe with Unbeatable Minimax AI

A modern, responsive Tic-Tac-Toe game featuring an **unbeatable AI opponent** powered by the **Minimax algorithm with Alpha-Beta Pruning** (optional optimization).

Play as **X** against a perfect AI (**O**) — the computer will never lose if it plays optimally.

<img width="716" height="873" alt="Screenshot 2026-02-01 200939" src="https://github.com/user-attachments/assets/7a8aea7a-eda5-4e8e-8cf5-4bd6e0a8304e" />

## Features

- Classic 3×3 Tic-Tac-Toe gameplay
- **Unbeatable AI** using Minimax algorithm
- Clean, modern dark-themed UI with glassmorphism
- Real-time status messages & win/draw detection
- Score tracking (You vs AI vs Draws)
- New Game & Reset Scores buttons
- Responsive design (mobile + desktop friendly)
- Smooth animations & hover effects

## Technologies Used

- **HTML5** – Structure
- **CSS3** – Modern styling (flexbox, grid, glassmorphism, gradients)
- **JavaScript (ES6+)** – Game logic, DOM manipulation, Minimax algorithm
- Google Fonts (Inter)

## How to Play

1. You are always **X** and go first
2. Click on any empty cell to place your **X**
3. The AI (O) will respond immediately
4. The game ends when someone wins or it's a draw
5. Use **New Game** to restart | **Reset Scores** to clear the scoreboard

> The AI is **unbeatable** — it will always play the optimal move.  
> You can only win if the AI makes a mistake (which it won't 😄)

## Project Structure
tic-tac-toe-minimax/
├── index.html        # Main HTML file
├── style.css         # All styling (modern dark theme)
├── script.js         # Game logic + Minimax AI
└── README.md

## How the AI Works (Minimax)

The AI uses the **Minimax** algorithm — a recursive decision-making algorithm used in two-player games:

- It simulates **all possible future moves**
- Assigns scores: +10 for AI win, -10 for player win, 0 for draw
- Chooses the move that maximizes its minimum guaranteed score
- (Optional optimization: Alpha-Beta Pruning can be added to reduce computation)

This makes the AI **theoretically unbeatable** in Tic-Tac-Toe.

## Live Demo

( Add your GitHub Pages / Netlify / Vercel link here once deployed )

https://your-username.github.io/tic-tac-toe-minimax/

## Future Improvements (Optional Ideas)

- Add difficulty levels (random / easy / medium / impossible)
- Sound effects on moves & win
- Confetti animation on victory
- Move history / undo (limited)
- Theme switcher (light / dark)
- Score persistence using localStorage

## Contributing

Pull requests are welcome!  
Feel free to open issues if you find bugs or have feature suggestions.

## License

This project is open-source — [MIT License](LICENSE)
