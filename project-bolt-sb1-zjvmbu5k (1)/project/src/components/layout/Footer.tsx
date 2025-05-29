import React from 'react';
import { Instagram, Twitch, Discord, Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-purple/30 border-t border-neon-purple/20 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-orbitron text-xl font-bold bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent mb-4">
              MedForce Games
            </h3>
            <p className="text-gray-300 max-w-md">
              Made for True Gamers. Experience the next level of browser gaming with our collection of 
              beautifully crafted games designed to challenge your skills and engage your mind.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <Discord size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <Twitch size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-orbitron text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Games</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Leaderboard</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-orbitron text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 MedForce Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;