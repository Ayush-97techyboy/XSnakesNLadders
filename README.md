# Snake & Ladders

A fully functional, responsive, and aesthetically pleasing Snake & Ladders game built with React and Vite.

## Features

- **Dynamic Board**: A 10x10 grid with boustrophedon (zigzag) numbering.
- **Snakes & Ladders Logic**: Includes all major obstacles and boosts with visual badges.
- **Multiplayer State**: Support for two players (P1 and P2) with unique color-coded tokens.
- **Responsive Design**: Optimized for Mobile (< 430px), Tablet (< 770px), and Desktop (1024px, 1440px+).
## Game Mechanics

- **Dice**: Standard 6-sided dice (1-6).
- **Exact Win**: Players must land exactly on cell 100. If a roll exceeds 100, the player stays in their current position.
- **Ladders (Boosts)**:
  - 4 → 14
  - 9 → 31
  - 20 → 38
  - 28 → 84
  - 40 → 59
  - 63 → 81
  - 71 → 91
- **Snakes (Obstacles)**:
  - 17 → 7
  - 54 → 34
  - 62 → 19
  - 64 → 60
  - 87 → 24
  - 93 → 73
  - 95 → 75
  - 99 → 10

## Technical Implementation

- **React State Management**: Handles player positions, turns, dice rolls, and winners.
- **Strict Grid CSS**: Uses `minmax(0, 1fr)` and CSS variables to ensure perfectly square cells on all screen sizes.
- **Fluid Layout**: Uses `clamp()` and `min()` for sizing typography and UI components.
- **Animations**: CSS transitions for smooth player token movement.

## How to Run

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`
4.  Open the local URL in your browser.

## Built With

- React.js
- Vite
- Vanilla CSS
