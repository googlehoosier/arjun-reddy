import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { questions } from './questions';

const MathQuizGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);

  const [playCorrect] = useSound('/sounds/match.mp3');
  const [playWrong] = useSound('/sounds/flip.mp3');
  const [playWin] = useSound('/sounds/win.mp3');

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, gameOver]);

  const handleTimeout = () => {
    if (!gameOver) {
      playWrong();
      setStreak(0);
      nextQuestion();
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || gameOver) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      const streakBonus = Math.floor(newStreak / 3);
      setScore(s => s + 10 + streakBonus * 5);
    } else {
      playWrong();
      setStreak(0);
    }

    setTimeout(nextQuestion, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setGameOver(true);
      playWin();
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setScore(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setStreak(0);
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

        <div className="max-w-2xl mx-auto">
          {!gameOver ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-400">Time Left</div>
                  <div className="text-sm text-electric-blue">
                    Question {currentQuestionIndex + 1}/{questions.length}
                  </div>
                </div>
                <div className="h-2 bg-dark-purple/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-purple to-electric-blue transition-all duration-1000"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-dark-purple/30 border border-neon-purple/20 rounded-lg p-8 mb-8">
                <div className="text-right mb-4">
                  <span className="text-sm text-gray-400">Streak: </span>
                  <span className="text-electric-blue font-orbitron">{streak}</span>
                </div>
                
                <h2 className="font-orbitron text-xl mb-8 text-center">
                  {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-lg text-left transition-all duration-300 ${
                        selectedAnswer === null
                          ? 'bg-dark-purple/20 hover:bg-dark-purple/30 border border-neon-purple/20'
                          : selectedAnswer === index
                          ? isCorrect
                            ? 'bg-green-500/20 border-2 border-green-500'
                            : 'bg-red-500/20 border-2 border-red-500'
                          : index === currentQuestion.correctAnswer && !isCorrect
                          ? 'bg-green-500/20 border-2 border-green-500'
                          : 'bg-dark-purple/20 border border-neon-purple/20'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="font-orbitron text-3xl text-neon-purple mb-4">
                Quiz Complete!
              </h2>
              <p className="text-electric-blue mb-8">Final Score: {score}</p>
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

export default MathQuizGame;