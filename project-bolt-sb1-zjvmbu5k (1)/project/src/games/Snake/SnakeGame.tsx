import React, { useEffect, useCallback, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SPEED = 200;
const SPEED_INCREASE = 10;
const APPLES_FOR_SPEED_INCREASE = 3;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const checkCollision = (head: Position): boolean => {
    return (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setScore(prev => {
        const newScore = prev + 1;
        if (newScore % APPLES_FOR_SPEED_INCREASE === 0) {
          setSpeed(prevSpeed => Math.max(50, prevSpeed - SPEED_INCREASE));
        }
        return newScore;
      });
      setFood(generateFood());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const currentDirection = direction;

      if (key === 'arrowup' && currentDirection !== 'DOWN') {
        setDirection('UP');
      } else if (key === 'arrowdown' && currentDirection !== 'UP') {
        setDirection('DOWN');
      } else if (key === 'arrowleft' && currentDirection !== 'RIGHT') {
        setDirection('LEFT');
      } else if (key === 'arrowright' && currentDirection !== 'LEFT') {
        setDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    const gameInterval = setInterval(moveSnake, speed);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [moveSnake, direction, speed]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
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
            Score: {score}
          </div>
        </div>

        <div className="relative">
          <div
            className="grid bg-dark-purple/30 border border-neon-purple/20 rounded-lg overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gap: '1px',
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] ${
                    isSnake
                      ? 'bg-neon-purple shadow-neon'
                      : isFood
                      ? 'bg-red-500 shadow-red-500/50'
                      : 'bg-dark-purple/20'
                  }`}
                />
              );
            })}
          </div>

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
              <div className="text-center">
                <h2 className="font-orbitron text-3xl text-neon-purple mb-4">Game Over!</h2>
                <p className="text-electric-blue mb-4">Final Score: {score}</p>
                <div className="space-x-4">
                  <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-gradient-to-r from-neon-purple to-electric-blue text-white font-semibold rounded-md hover:shadow-neon transition-all duration-300"
                  >
                    Play Again
                  </button>
                  <Link
                    to="/"
                    className="px-6 py-2 border border-neon-purple text-white font-semibold rounded-md hover:bg-neon-purple/10 transition-all duration-300 inline-block"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-400">
          Use arrow keys to control the snake
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;