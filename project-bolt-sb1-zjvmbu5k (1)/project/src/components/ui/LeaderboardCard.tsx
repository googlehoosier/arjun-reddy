import React from 'react';
import { Crown, Trophy, Medal } from 'lucide-react';

interface Player {
  id: string;
  rank: number;
  name: string;
  game: string;
  score: number;
  avatar?: string;
}

interface LeaderboardCardProps {
  title: string;
  players: Player[];
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-400" />;
    case 2:
      return <Trophy className="h-5 w-5 text-gray-300" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-700" />;
    default:
      return <span className="h-5 w-5 flex items-center justify-center text-gray-400 font-semibold">{rank}</span>;
  }
};

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ title, players }) => {
  return (
    <div className="bg-dark-purple/30 border border-neon-purple/20 rounded-lg overflow-hidden backdrop-blur-sm">
      <div className="bg-gradient-to-r from-neon-purple/20 to-electric-blue/20 px-5 py-4">
        <h3 className="font-orbitron text-lg font-semibold text-white">{title}</h3>
      </div>
      
      <div className="divide-y divide-gray-800">
        {players.map((player) => (
          <div 
            key={player.id} 
            className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {getRankIcon(player.rank)}
            </div>
            
            <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-neon-purple/30 to-electric-blue/30 flex items-center justify-center">
              {player.avatar ? (
                <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-semibold">{player.name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            
            <div className="flex-grow min-w-0">
              <p className="text-white font-medium truncate">{player.name}</p>
              <p className="text-xs text-gray-400">{player.game}</p>
            </div>
            
            <div className="flex-shrink-0 text-right">
              <span className="font-orbitron text-electric-blue font-semibold">{player.score}</span>
              <p className="text-xs text-gray-400">points</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-3 bg-dark-purple/50 text-center">
        <a href="#" className="text-electric-blue text-sm font-semibold hover:text-neon-purple transition-colors">
          View Full Leaderboard
        </a>
      </div>
    </div>
  );
};

export default LeaderboardCard;