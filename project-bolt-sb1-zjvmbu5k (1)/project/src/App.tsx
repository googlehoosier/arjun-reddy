import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SnakeGame from './games/Snake/SnakeGame';
import MemoryGame from './games/Memory/MemoryGame';
import TicTacToeGame from './games/TicTacToe/TicTacToeGame';
import WordScrambleGame from './games/WordScramble/WordScrambleGame';
import MathQuizGame from './games/MathQuiz/MathQuizGame';

function App() {
  useEffect(() => {
    document.body.classList.add('bg-background');
    document.body.classList.add('text-white');
    
    return () => {
      document.body.classList.remove('bg-background');
      document.body.classList.remove('text-white');
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snake" element={<SnakeGame />} />
            <Route path="/memory" element={<MemoryGame />} />
            <Route path="/tictactoe" element={<TicTacToeGame />} />
            <Route path="/word-scramble" element={<WordScrambleGame />} />
            <Route path="/math-quiz" element={<MathQuizGame />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;