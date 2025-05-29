import React, { useState } from 'react';
import LeaderboardCard from '../ui/LeaderboardCard';
import { Trophy, Filter } from 'lucide-react';

const games = ['All Games', 'Snake Game', 'Memory Game', 'Tic-Tac-Toe', 'Word Scramble', 'Math Quiz'];

const players = [
  { id: '1', rank: 1, name: 'NeonSlayer', game: 'Snake Game', score: 9872 },
  { id: '2', rank: 2, name: 'MemoryMaster', game: 'Memory Game', score: 9654 },
  { id: '3', rank: 3, name: 'MathWizard', game: 'Math Quiz', score: 9520 },
  { id: '4', rank: 4, name: 'WordNinja', game: 'Word Scramble', score: 9347 },
  { id: '5', rank: 5, name: 'TicTacPro', game: 'Tic-Tac-Toe', score: 9125 },
];

const weeklyPlayers = [
  { id: '6', rank: 1, name: 'GamerX42', game: 'Math Quiz', score: 8872 },
  { id: '7', rank: 2, name: 'PixelQueen', game: 'Snake Game', score: 8654 },
  { id: '8', rank: 3, name: 'BrainTeaser', game: 'Memory Game', score: 8520 },
  { id: '9', rank: 4, name: 'WordSmith', game: 'Word Scramble', score: 8347 },
  { id: '10', rank: 5, name: 'StrategyKing', game: 'Tic-Tac-Toe', score: 8125 },
];

const LeaderboardSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState('All Games');
  
  return (
    <section id="leaderboard" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-electric-blue/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-neon-purple/5 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-dark-purple/40 border border-neon-purple/20 mb-4">
            <Trophy className="h-4 w-4 text-neon-purple mr-2" />
            <span className="text-sm font-semibold text-neon-purple">TOP PLAYERS</span>
          </div>
          
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent">
              Global Leaderboards
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compete with players from around the world and claim your spot at the top.
            Check out the current rankings and see if you have what it takes to become a legend.
          </p>
        </div>
        
        {/* Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-dark-purple/30 border border-neon-purple/20 rounded-lg p-2 inline-flex flex-wrap justify-center gap-2">
            {games.map((game) => (
              <button
                key={game}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedGame === game 
                    ? 'bg-gradient-to-r from-neon-purple to-electric-blue text-white' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                onClick={() => setSelectedGame(game)}
              >
                {game}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LeaderboardCard 
            title="All-Time Champions"
            players={players}
          />
          
          <LeaderboardCard 
            title="Weekly Challengers"
            players={weeklyPlayers}
          />
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-transparent border border-neon-purple text-white font-semibold rounded-md hover:bg-neon-purple/10 transition-all duration-300">
            View Complete Rankings
          </button>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;