import { useEffect, useState } from "react";
import "./App.css";
import { RefreshCcw } from "lucide-react";

const SIZE = 5;

function App() {
  const [pieces, setPieces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState("");
  const [won, setWon] = useState(false);

  useEffect(() => {
    createPuzzle();
  }, []);

  function createPuzzle() {
    let arr = [];

    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        arr.push({
          id: y * SIZE + x,
          correctX: x,
          correctY: y,
        });
      }
    }

    arr = shuffle(arr);

    setPieces(arr);
    setSelected(null);
    setWon(false);

    // 👉 новая случайная картинка
    setImage(`https://picsum.photos/600?random=${Math.random()}`);
  }

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function handleClick(index) {
    if (selected === null) {
      setSelected(index);
    } else {
      const newPieces = [...pieces];

      [newPieces[selected], newPieces[index]] = [
        newPieces[index],
        newPieces[selected],
      ];

      setPieces(newPieces);
      setSelected(null);

      // 👉 проверка победы
      const solved = newPieces.every((p, i) => p.id === i);
      if (solved) {
        setWon(true);
      }
    }
  }

  return (
    <div className="app">
      <h1>🧩 Puzzle 5x5</h1>

      <button className="reset" onClick={createPuzzle}>
        <RefreshCcw size={18} /> Новая игра
      </button>

      <div className="grid">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`piece ${selected === index ? "selected" : ""}`}
            onClick={() => handleClick(index)}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: `${SIZE * 100}%`,
              backgroundPosition: `${(piece.correctX / (SIZE - 1)) * 100}% ${
                (piece.correctY / (SIZE - 1)) * 100
              }%`,
            }}
          />
        ))}
      </div>

      {won && <h2 className="win">🎉 Ты собрал пазл!</h2>}
    </div>
  );
}

export default App;