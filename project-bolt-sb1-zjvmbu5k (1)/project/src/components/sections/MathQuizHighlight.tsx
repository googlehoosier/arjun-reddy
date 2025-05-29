import React, { useState, useEffect } from 'react';
import { Calculator, Brain, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Adaptive Difficulty',
    description: 'Questions adjust based on your performance, ensuring the perfect challenge level.',
  },
  {
    icon: Clock,
    title: 'Beat the Clock',
    description: '30 seconds per question. Think fast and build your mental math speed.',
  },
  {
    icon: Award,
    title: 'Streak Bonuses',
    description: 'Get bonus points for consecutive correct answers. How long can you maintain your streak?',
  },
];

const sampleQuestions = [
  "Solve: 2x + 5 = 15",
  "Find the area of a circle with radius 4cm",
  "If 3y - 7 = 20, what is y?",
  "What is the square root of 144?",
  "Calculate: (3 × 4) ÷ 2 + 7",
];

const MathQuizHighlight: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % sampleQuestions.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-purple/40 to-dark-blue/40"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-neon-purple/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-full bg-electric-blue/10 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              <span className="text-xs font-semibold">FEATURED GAME</span>
            </div>
            
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent">
                Math Quiz Challenge
              </span>
            </h2>
            
            <p className="text-gray-300 mb-8">
              Test your mathematical prowess with our adaptive Math Quiz Challenge. 
              From basic arithmetic to complex algebra and geometry, this game will 
              push your limits and help you sharpen your math skills in a fun, 
              engaging environment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-dark-purple/30 border border-neon-purple/20 rounded-lg p-5 backdrop-blur-sm">
                  <feature.icon className="h-8 w-8 text-neon-purple mb-4" />
                  <h3 className="font-orbitron text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <button className="px-8 py-3 bg-gradient-to-r from-neon-purple to-electric-blue text-white font-semibold rounded-md hover:shadow-neon transition-all duration-300 hover:scale-105">
              Play Math Quiz
            </button>
          </div>
          
          <div className="relative">
            <div className="relative bg-background/70 border border-neon-purple/30 rounded-lg p-8 backdrop-blur-md shadow-xl max-w-md mx-auto">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-neon-purple to-electric-blue text-white text-xs font-bold px-3 py-1 rounded">
                LIVE PREVIEW
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-orbitron text-xl font-bold text-white">Question:</h3>
                  <p className="text-gray-400 text-sm">Class 8 Level Algebra</p>
                </div>
                <div className="bg-dark-purple/50 text-electric-blue px-3 py-1 rounded font-orbitron font-bold">
                  30s
                </div>
              </div>
              
              <div className="bg-dark-purple/50 rounded-lg p-6 mb-6 min-h-[100px] flex items-center justify-center border border-neon-purple/20">
                <p className="text-white text-xl font-semibold text-center">
                  {sampleQuestions[currentQuestion]}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <button className="w-full py-3 bg-dark-purple/50 text-white text-left px-4 rounded-lg hover:bg-neon-purple/20 transition-colors border border-neon-purple/20">
                  A) 5
                </button>
                <button className="w-full py-3 bg-dark-purple/50 text-white text-left px-4 rounded-lg hover:bg-neon-purple/20 transition-colors border border-neon-purple/20">
                  B) 8
                </button>
                <button className="w-full py-3 bg-dark-purple/50 text-white text-left px-4 rounded-lg hover:bg-neon-purple/20 transition-colors border border-neon-purple/20">
                  C) 10
                </button>
                <button className="w-full py-3 bg-dark-purple/50 text-white text-left px-4 rounded-lg hover:bg-neon-purple/20 transition-colors border border-neon-purple/20">
                  D) 12
                </button>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div>Question 3/10</div>
                <div>Score: <span className="text-electric-blue font-bold">200</span></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-neon-purple/50 z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-electric-blue/50 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MathQuizHighlight;