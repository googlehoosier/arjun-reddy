import React from 'react';
import GameCard from '../ui/GameCard';
import { Snake, Brain, Hash, BookText, Calculator } from 'lucide-react';

const GameSection: React.FC = () => {
  const games = [
    {
      id: 1,
      title: 'Snake Game',
      description: 'Navigate the neon snake to collect food and grow longer without hitting walls or yourself.',
      icon: Snake,
      imageUrl: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      difficulty: 'Easy' as const,
    },
    {
      id: 2,
      title: 'Memory Card Game',
      description: 'Test your memory by matching pairs of cards with sleek retro gaming icons.',
      icon: Brain,
      imageUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      difficulty: 'Medium' as const,
    },
    {
      id: 3,
      title: 'Tic-Tac-Toe',
      description: 'Classic strategy game with a modern twist. Play against a smart AI opponent.',
      icon: Hash,
      imageUrl: 'https://images.pexels.com/photos/3520694/pexels-photo-3520694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      difficulty: 'Easy' as const,
    },
    {
      id: 4,
      title: 'Word Scramble',
      description: 'Unscramble letters to form words against the clock. How many can you solve?',
      icon: BookText,
      imageUrl: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      difficulty: 'Medium' as const,
    },
    {
      id: 5,
      title: 'Math Quiz',
      description: 'Test your math skills with challenging algebra and geometry problems.',
      icon: Calculator,
      imageUrl: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      difficulty: 'Hard' as const,
    },
  ];

  return (
    <section id="games" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-neon-purple/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-electric-blue/5 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent">
              Featured Games
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Dive into our collection of engaging games designed to challenge your skills.
            From classic arcade action to brain-teasing puzzles, we've got something for every gamer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              imageUrl={game.imageUrl}
              difficulty={game.difficulty}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-neon-purple to-electric-blue text-white font-semibold rounded-md hover:shadow-neon transition-all duration-300 hover:scale-105">
            View All Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default GameSection;