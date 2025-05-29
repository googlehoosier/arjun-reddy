import React from 'react';
import { Zap, ArrowRight, Users } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-electric-blue/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-neon-purple/10 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-electric-blue/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-dark-purple/40 border border-neon-purple/20 mb-6">
            <Users className="h-4 w-4 text-electric-blue mr-2" />
            <span className="text-sm font-semibold text-electric-blue">JOIN 10,000+ GAMERS</span>
          </div>
          
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent">
              Ready to Level Up Your Gaming Experience?
            </span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8">
            Sign up today and join our community of passionate gamers. 
            Get access to all games, track your progress, compete on the global leaderboard, 
            and unlock exclusive achievements.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-neon-purple to-electric-blue text-white font-semibold rounded-md hover:shadow-neon transition-all duration-300 hover:scale-105 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Create Free Account
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-md hover:bg-white/5 transition-all duration-300 flex items-center">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;