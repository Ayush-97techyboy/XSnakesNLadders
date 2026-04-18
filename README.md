# Snake & Ladders

A fully functional, responsive, and aesthetically pleasing Snake & Ladders game built with React and Vite.

## Features

- **Dynamic Board**: A 10x10 grid with boustrophedon (zigzag) numbering.
- **Snakes & Ladders Logic**: Includes all major obstacles and boosts with visual badges.
- **Multiplayer State**: Support for two players (P1 and P2) with unique color-coded tokens.
- **Responsive Design**: Optimized for Mobile (< 430px), Tablet (< 770px), and Desktop (1024px, 1440px+).
- **Game Mechanics**: 
  - Random dice rolls (1-6).
  - Exact 100 requirement to win.
  - Interactive turn indicator and celebratory win messages.
  - Game reset functionality.

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
