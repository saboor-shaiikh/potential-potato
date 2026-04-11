import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-glass">
        <a href="#top" className="nav-logo">SABOOR.</a>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" className="nav-item" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" className="nav-item" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#projects" className="nav-item" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" className="nav-item" onClick={() => setMenuOpen(false)}>Contact</a>
          
          <a 
            href="/AbdulSaboor-Resume.pdf" 
            download="AbdulSaboor-Resume.pdf" 
            className="nav-btn resume-btn"
            onClick={() => setMenuOpen(false)}
          >
            <Download size={16} /> Resume
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
