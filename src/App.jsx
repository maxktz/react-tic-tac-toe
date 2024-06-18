import { useState } from "react";
import "./App.css";

function Square({ value, onClick }) {
  const size = "40px";
  return (
    <button
      className="square"
      style={{ textAlign: "center", height: size, width: size }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function App() {
  const emptyTable = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [table, setTable] = useState(emptyTable);
  const [player, setPlayer] = useState("X");

  const checkWinner = () => {
    const combinations = [
      // Rows
      [table[0][0], table[0][1], table[0][2]],
      [table[1][0], table[1][1], table[1][2]],
      [table[2][0], table[2][1], table[2][2]],
      // Columns
      [table[0][0], table[1][0], table[2][0]],
      [table[0][1], table[1][1], table[2][1]],
      [table[0][2], table[1][2], table[2][2]],
      // Diagonals
      [table[0][0], table[1][1], table[2][2]],
      [table[0][2], table[1][1], table[2][0]],
    ];
    for (const combination of combinations) {
      for (const player of ["X", "O"]) {
        if (combination.every((val) => val === player)) {
          return player;
        }
      }
    }
    return null;
  };

  const handleClick = (i, j) => {
    const newTable = [...table];
    newTable[i][j] = player;
    setTable(newTable);
    setPlayer(player === "X" ? "O" : "X");
    const winner = checkWinner();
    if (winner) {
      alert(`Player ${winner} wins!`);
      setTable(emptyTable);
    }
  };

  return (
    <div>
      <div>
        {table.map((row, i) => (
          <div key={i}>
            {row.map((val, j) => (
              <Square
                key={j}
                value={val}
                onClick={() => handleClick(i, j)}
                style={{ margin: "3px" }}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setTable(emptyTable)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
