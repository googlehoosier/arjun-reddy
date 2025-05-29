import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const gameSlides = [
  {
    id: 1,
    title: 'Snake Game',
    description: 'Classic arcade action with a neon twist',
    imageUrl: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Memory Card Game',
    description: 'Test your memory in this challenging card game',
    imageUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Tic-Tac-Toe',
    description: 'Strategic gameplay with a modern aesthetic',
    imageUrl: 'https://images.pexels.com/photos/3520694/pexels-photo-3520694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'Word Scramble',
    description: 'Challenge your vocabulary with word puzzles',
    imageUrl: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    title: 'Math Quiz',
    description: 'Test your math skills with challenging problems',
    imageUrl: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gameSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gameSlides.length) % gameSlides.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gameSlides.length);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/70 z-10"></div>
        {gameSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="block bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent animate-pulse-slow">
                Made for True Gamers
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Experience the next level of browser gaming with our collection of 
              beautifully crafted games designed to challenge your skills.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 bg-gradient-to-r from-neon-purple to-electric-blue text-white font-semibold rounded-md hover:shadow-neon transition-all duration-300 hover:scale-105">
                Play Now
              </button>
              <button className="px-8 py-3 bg-transparent border border-neon-purple text-white font-semibold rounded-md hover:bg-neon-purple/10 transition-all duration-300">
                Explore Games
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-xl border border-neon-purple/30 bg-background/50 backdrop-blur-sm">
              {/* Carousel */}
              <div className="relative">
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                  {gameSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-transform duration-500 ${
                        currentSlide === index 
                          ? 'translate-x-0' 
                          : currentSlide < index 
                            ? 'translate-x-full' 
                            : '-translate-x-full'
                      }`}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-orbitron text-xl font-bold text-white mb-2">{slide.title}</h3>
                        <p className="text-gray-300">{slide.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-neon-purple/30 transition-colors"
                  onClick={goToPrevSlide}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-neon-purple/30 transition-colors"
                  onClick={goToNextSlide}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {gameSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-neon-purple w-4' 
                        : 'bg-gray-400/50 hover:bg-gray-400'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-neon-purple/50"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-electric-blue/50"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;