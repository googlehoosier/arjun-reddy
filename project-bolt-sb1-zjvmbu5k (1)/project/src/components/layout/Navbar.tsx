import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`px-4 py-2 text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-electric-blue after:transition-all after:duration-300 hover:after:w-full ${
        isActive ? 'text-white after:w-full' : ''
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-neon-purple" />
          <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent">
            MedForce Games
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/snake">Snake</NavLink>
          <NavLink to="/memory">Memory</NavLink>
          <NavLink to="/tictactoe">Tic-Tac-Toe</NavLink>
          <NavLink to="/word-scramble">Word Scramble</NavLink>
          <NavLink to="/math-quiz">Math Quiz</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-dark-purple/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/snake" onClick={closeMenu}>Snake</NavLink>
          <NavLink to="/memory" onClick={closeMenu}>Memory</NavLink>
          <NavLink to="/tictactoe" onClick={closeMenu}>Tic-Tac-Toe</NavLink>
          <NavLink to="/word-scramble" onClick={closeMenu}>Word Scramble</NavLink>
          <NavLink to="/math-quiz" onClick={closeMenu}>Math Quiz</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;