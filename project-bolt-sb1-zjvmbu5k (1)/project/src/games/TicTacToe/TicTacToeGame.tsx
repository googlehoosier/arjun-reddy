import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';

type Player = 'X' | 'O' | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const [playMove] = useSound('/sounds/flip.mp3');
  const [playWin] = useSound('/sounds/win.mp3');

  const checkWinner = (currentBoard: Board): [Player | 'draw' | null, number[] | null] => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return [currentBoard[a], combination];
      }
    }

    if (currentBoard.every(cell => cell !== null)) {
      return ['draw', null];
    }

    return [null, null];
  };

  const makeAIMove = (currentBoard: Board): number => {
    // Check for winning move
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = 'O';
        const [testWinner] = checkWinner(testBoard);
        if (testWinner === 'O') return i;
      }
    }

    // Block player's winning move
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = 'X';
        const [testWinner] = checkWinner(testBoard);
        if (testWinner === 'X') return i;
      }
    }

    // Take center if available
    if (!currentBoard[4]) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => !currentBoard[i]);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available space
    const availableSpaces = currentBoard
      .map((cell, index) => cell === null ? index : null)
      .filter((index): index is number => index !== null);
    return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const move = makeAIMove(board);
        const newBoard = [...board];
        newBoard[move] = 'O';
        playMove();
        setBoard(newBoard);
        
        const [newWinner, newWinningLine] = checkWinner(newBoard);
        if (newWinner) {
          setWinner(newWinner);
          setWinningLine(newWinningLine);
          if (newWinner === 'O') playWin();
        }
        
        setIsPlayerTurn(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner]);

  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    playMove();
    setBoard(newBoard);

    const [newWinner, newWinningLine] = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setWinningLine(newWinningLine);
      if (newWinner === 'X') playWin();
    } else {
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="flex items-center text-neon-purple hover:text-electric-blue transition-colors"
          >
            <ChevronLeft className="h-6 w-6 mr-2" />
            Back to Home
          </Link>
          <div className="text-electric-blue font-orbitron text-xl">
            {winner
              ? winner === 'draw'
                ? "It's a Draw!"
                : `${winner} Wins!`
              : isPlayerTurn
              ? 'Your Turn (X)'
              : 'AI Turn (O)'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`aspect-square rounded-lg text-4xl font-orbitron flex items-center justify-center transition-all duration-300
                ${cell ? 'bg-dark-purple/30' : 'bg-dark-purple/20 hover:bg-dark-purple/30'}
                ${winningLine?.includes(index) ? 'border-2 border-electric-blue shadow-neon' : 'border border-neon-purple/20'}
              `}
              disabled={!!cell || !!winner || !isPlayerTurn}
            >
              <span className={`
                ${cell === 'X' ? 'text-neon-purple' : 'text-electric-blue'}
                ${winningLine?.includes(index) ? 'animate-pulse' : ''}
              `}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        {winner && (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-gradient-to-r from-neon-purple to-electric-blue text-white font-semibold rounded-md hover:shadow-neon transition-all duration-300"
            >
              Play Again
            </button>
            <Link
              to="/"
              className="px-6 py-2 border border-neon-purple text-white font-semibold rounded-md hover:bg-neon-purple/10 transition-all duration-300"
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToeGame;