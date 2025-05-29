import React from 'react';
import Hero from '../components/sections/Hero';
import GameSection from '../components/sections/GameSection';
import MathQuizHighlight from '../components/sections/MathQuizHighlight';
import LeaderboardSection from '../components/sections/LeaderboardSection';
import CallToAction from '../components/sections/CallToAction';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <GameSection />
      <MathQuizHighlight />
      <LeaderboardSection />
      <CallToAction />
    </div>
  );
};

export default Home;