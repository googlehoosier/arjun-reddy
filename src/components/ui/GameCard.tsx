import React from 'react';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onClick?: () => void;
}

const difficultyColors = {
  'Easy': 'bg-green-500',
  'Medium': 'bg-yellow-500',
  'Hard': 'bg-red-500',
};

const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  difficulty, 
  onClick 
}) => {
  return (
    <div 
      className="relative group bg-gradient-to-br from-dark-purple to-dark-blue rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-card-glow"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <div className={`absolute top-3 right-3 ${difficultyColors[difficulty]} text-xs px-2 py-1 rounded font-medium`}>
          {difficulty}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-orbitron text-lg font-semibold text-white">{title}</h3>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        <button className="w-full py-2 bg-gradient-to-r from-neon-purple/80 to-electric-blue/80 hover:from-neon-purple hover:to-electric-blue text-white font-semibold rounded transition-all duration-300 group-hover:shadow-neon">
          Play Now
        </button>
      </div>
      
      <div className="absolute inset-0 border border-transparent group-hover:border-neon-purple/30 rounded-lg pointer-events-none transition-all duration-300"></div>
    </div>
  );
};

export default GameCard;