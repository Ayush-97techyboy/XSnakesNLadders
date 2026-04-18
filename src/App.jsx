import { useState, useEffect } from "react";
import "./App.css";

const snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 10,
};

const ladders = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  63: 81,
  71: 91,
};

function App() {
  const [p1Pos, setP1Pos] = useState(1);
  const [p2Pos, setP2Pos] = useState(1);
  const [turn, setTurn] = useState(1);
  const [lastRoll, setLastRoll] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState("🎲");

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  useEffect(() => {
    if (lastRoll && !isRolling && !winner) {
      const timer = setTimeout(() => {
        setLastRoll(null);
        setCurrentDice("🎲");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [lastRoll, isRolling, winner]);

  const rollDice = () => {
    if (winner || isRolling) return;

    setIsRolling(true);

    // Dice rolling animation (cycling faces)
    const interval = setInterval(() => {
      setCurrentDice(diceFaces[Math.floor(Math.random() * 6)]);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      const roll = Math.floor(Math.random() * 6) + 1;
      setLastRoll(roll);
      setCurrentDice(diceFaces[roll - 1]);

      if (turn === 1) {
        let newPos = p1Pos + roll;
        if (newPos <= 100) {
          if (snakes[newPos]) newPos = snakes[newPos];
          else if (ladders[newPos]) newPos = ladders[newPos];
          setP1Pos(newPos);
          if (newPos === 100) setWinner(1);
        }
        if (newPos !== 100) setTurn(2);
      } else {
        let newPos = p2Pos + roll;
        if (newPos <= 100) {
          if (snakes[newPos]) newPos = snakes[newPos];
          else if (ladders[newPos]) newPos = ladders[newPos];
          setP2Pos(newPos);
          if (newPos === 100) setWinner(2);
        }
        if (newPos !== 100) setTurn(1);
      }
      setIsRolling(false);
    }, 600);
  };

  const resetGame = () => {
    setP1Pos(1);
    setP2Pos(1);
    setTurn(1);
    setLastRoll(null);
    setCurrentDice("🎲");
    setWinner(null);
  };

  const generateBoard = () => {
    const rows = [];
    for (let r = 0; r < 10; r++) {
      const cells = [];
      const isReverse = r % 2 === 0; // Row 0 (91-100) is reverse order in terms of visual layout if 100 is on left
      // Actually let's refine the logic:
      // Row 0: 100...91 (R to L)
      // Row 1: 81...90 (L to R)
      // Row 2: 80...71 (R to L)
      // Row 3: 61...70 (L to R)
      // ...
      // Row 9: 1...10 (L to R)

      const rowNum = 10 - r; // 10, 9, 8... 1
      const startVal = (rowNum - 1) * 10 + 1;
      const endVal = rowNum * 10;

      if (isReverse) {
        // 100 to 91, 80 to 71, etc.
        for (let i = endVal; i >= startVal; i--) {
          cells.push(i);
        }
      } else {
        // 81 to 90, 61 to 70, etc.
        for (let i = startVal; i <= endVal; i++) {
          cells.push(i);
        }
      }
      rows.push(cells);
    }
    return rows;
  };

  const board = generateBoard();

  return (
    <div className="app-container">
      <h1 className="header">Snake & Ladders</h1>

      <div className="status-bar">
        <div className="status-left">
          {winner ? (
            <div className="win-message">
              <span className="win-item">🏆 Player {winner} wins!</span>
              <span className="win-item">
                😅 Player {winner === 1 ? 2 : 1} loses
              </span>
            </div>
          ) : (
            <div className="turn-indicator">
              Turns{" "}
              <div
                className={`turn-dot ${turn === 1 ? "red-dot" : "blue-dot"}`}
              >
                P{turn}
              </div>
            </div>
          )}
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="small-dot red-dot"></div> P1
          </div>
          <div className="legend-item">
            <div className="small-dot blue-dot"></div> P2
          </div>
        </div>
      </div>

      <div className="board">
        {board.flat().map((num) => (
          <div key={num} className="cell">
            <div className="cell-header">
              <span className="cell-num">{num}</span>
              {snakes[num] && (
                <span className="badge snake-badge">S{snakes[num]}</span>
              )}
              {ladders[num] && (
                <span className="badge ladder-badge">L{ladders[num]}</span>
              )}
            </div>
            <div className="players-container">
              {p1Pos === num && <div className="player-token red-dot">P1</div>}
              {p2Pos === num && <div className="player-token blue-dot">P2</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button
          id="roll-dice-btn"
          className="btn btn-primary"
          onClick={rollDice}
          disabled={!!winner || isRolling}
        >
          <span className={`dice-icon ${isRolling ? "rolling" : ""}`}>
            {currentDice}
          </span>{" "}
          Roll Dice {lastRoll && !isRolling ? `(${lastRoll})` : ""}
        </button>
        <button id="reset-btn" className="btn btn-outline" onClick={resetGame}>
          Reset
        </button>
      </div>

      <p className="footer-text">
        Exact 100 is required to win. Land on a <strong>ladder</strong> to climb
        up, a <strong>snake</strong> to slide down.
      </p>
    </div>
  );
}

export default App;
