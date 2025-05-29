import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS = ['🎮', '🕹️', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪'];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const [playFlip] = useSound('/sounds/flip.mp3');
  const [playMatch] = useSound('/sounds/match.mp3');
  const [playWin] = useSound('/sounds/win.mp3');

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (
      isChecking ||
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    playFlip();

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].icon === cards[secondCard].icon) {
        setTimeout(() => {
          playMatch();
          setCards(cards.map((card, index) =>
            index === firstCard || index === secondCard
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === ICONS.length) {
              setGameWon(true);
              playWin();
            }
            return newMatches;
          });
          setFlippedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
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
            Matches: {matches}/{ICONS.length}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg text-4xl flex items-center justify-center transition-all duration-300 transform ${
                card.isMatched || flippedCards.includes(card.id)
                  ? 'bg-neon-purple/30 rotate-0'
                  : 'bg-dark-purple/30 rotate-180'
              } ${
                card.isMatched
                  ? 'border-2 border-electric-blue shadow-neon'
                  : 'border border-neon-purple/20'
              } hover:scale-105`}
              disabled={card.isMatched || isChecking}
            >
              <span
                className={`transition-all duration-300 transform ${
                  card.isMatched || flippedCards.includes(card.id)
                    ? 'rotate-0 opacity-100'
                    : 'rotate-180 opacity-0'
                }`}
              >
                {card.icon}
              </span>
            </button>
          ))}
        </div>

        {gameWon && (
          <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <h2 className="font-orbitron text-3xl text-neon-purple mb-4">
                Congratulations!
              </h2>
              <p className="text-electric-blue mb-4">
                You've matched all the pairs!
              </p>
              <div className="space-x-4">
                <button
                  onClick={initializeGame}
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
    </div>
  );
};

export default MemoryGame;