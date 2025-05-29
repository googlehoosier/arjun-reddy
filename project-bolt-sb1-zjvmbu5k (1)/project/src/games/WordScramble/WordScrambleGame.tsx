import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { words } from './words';

const WordScrambleGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [revealedLetters, setRevealedLetters] = useState<Set<number>>(new Set());
  const [shake, setShake] = useState(false);

  const [playCorrect] = useSound('/sounds/match.mp3');
  const [playWrong] = useSound('/sounds/flip.mp3');

  const scrambleWord = (word: string): string => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  const getNewWord = useCallback(() => {
    const availableWords = words.filter(word => !usedWords.has(word));
    if (availableWords.length === 0) {
      setUsedWords(new Set());
      return words[Math.floor(Math.random() * words.length)];
    }
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }, [usedWords]);

  const startNewRound = useCallback(() => {
    const newWord = getNewWord();
    setCurrentWord(newWord);
    setScrambledWord(scrambleWord(newWord));
    setUserInput('');
    setTimeLeft(30);
    setRevealedLetters(new Set());
    setUsedWords(prev => new Set([...prev, newWord]));
  }, [getNewWord]);

  useEffect(() => {
    if (!currentWord) startNewRound();
  }, [currentWord, startNewRound]);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toUpperCase() === currentWord) {
      playCorrect();
      setScore(s => s + Math.ceil(timeLeft / 3));
      startNewRound();
    } else {
      playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleHint = () => {
    const unrevealedIndices = Array.from({ length: currentWord.length }, (_, i) => i)
      .filter(i => !revealedLetters.has(i));
    
    if (unrevealedIndices.length > 0) {
      const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
      setRevealedLetters(prev => new Set([...prev, randomIndex]));
      setScore(s => Math.max(0, s - 1));
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setUsedWords(new Set());
    startNewRound();
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

        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="text-sm text-gray-400 mb-2">Time Left</div>
            <div className="h-2 bg-dark-purple/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-purple to-electric-blue transition-all duration-1000"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
            <div className="text-electric-blue mt-2">{timeLeft}s</div>
          </div>

          <div className="bg-dark-purple/30 border border-neon-purple/20 rounded-lg p-8 mb-8">
            <h2 className="font-orbitron text-3xl mb-4">{scrambledWord}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                className={`w-full bg-background border-2 border-neon-purple/30 rounded-lg px-4 py-2 text-white text-center font-orbitron text-xl mb-4 focus:outline-none focus:border-electric-blue transition-all ${
                  shake ? 'animate-shake' : ''
                }`}
                placeholder="Type your answer"
                maxLength={currentWord.length}
                disabled={gameOver}
              />
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-neon-purple to-electric-blue text-white font-semibold rounded-md hover:shadow-neon transition-all duration-300"
                  disabled={gameOver}
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={handleHint}
                  className="px-6 py-2 border border-neon-purple text-white font-semibold rounded-md hover:bg-neon-purple/10 transition-all duration-300 flex items-center"
                  disabled={gameOver}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Hint (-1 point)
                </button>
              </div>
            </form>
          </div>

          {gameOver && (
            <div className="text-center">
              <h2 className="font-orbitron text-2xl text-neon-purple mb-4">
                Game Over!
              </h2>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default WordScrambleGame;