import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [progress, setProgress] = useState(0);

  // console.log("board", board);
  // console.log("progress", progress);

  const handleClick = (i) => {
    if (board[i] !== null || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      setProgress(100);
    } else {
      setIsXTurn(!isXTurn);
    }
    setProgress((prev) => Math.min(prev + 11, 100));
    if (!newBoard.includes(null) && !gameWinner) {
      setWinner("Draw");
      setProgress(100);
    }
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
    setProgress(0);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-purple-800 min-h-screen w-full flex flex-col  gap-5 items-center justify-center p-3 ">
        <div className="flex gap-7">
          <div className="shadow-xl md:h-96 h-52 bg-white shadow-violet-200  md:w-5 w-3 rounded-full overflow-hidden">
            <div
              className="md:h-96 h-52 md:w-5 w-3 bg-purple-500 transition-all duration-700 shadow-inner shadow-violet-900"
              style={{ transform: `translateY(${100 - progress}%)` }}
            ></div>
          </div>
          <div className="place-items-center justify-center space-y-5">
            <div className="grid grid-cols-3 gap-2 p-5 bg-purple-300 rounded-xl shadow-inner shadow-purple-900 ">
              {board.map((value, i) => (
                <button
                  key={i}
                  className={`[text-shadow:_0_4px_4px_rgb(99_102_241_/_0.8)] text-red-600 md:h-28 md:w-28 h-12 w-12  rounded-3xl md:p-6  md:text-4xl text-lg  hover:bg-purple-400    shadow-inner shadow-purple-800 ${
                    winner ? "bg-purple-400 transition-all" : "bg-white"
                  }`}
                  onClick={() => handleClick(i)}
                >
                  {value}
                </button>
              ))}
            </div>
            <h3 className="text-2xl text-white tracking-wider">
              {winner
                ? winner === "Draw"
                  ? "It's a Draw!"
                  : `Winner is ${winner}`
                : `Next turn: ${isXTurn ? "X" : "O"}`}
            </h3>
            <button
              onClick={resetGame}
              className=" p-2 bg-violet-500 shadow-inner shadow-white text-white rounded-lg tracking-wide md:text-xl font-semibold"
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
