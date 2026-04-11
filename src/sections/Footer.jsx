import React from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { SiFiverr } from 'react-icons/si';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-content-wrapper">
        <div className="footer-contact-details">
          <p className="footer-detail-item">
            <strong>Email:</strong> <a href="mailto:connect.saboor@gmail.com">connect.saboor@gmail.com</a>
          </p>
          <p className="footer-detail-item">
            <strong>Phone:</strong> <a href="tel:+923071199969">+92 307 1199969</a>
          </p>
          <p className="footer-detail-item">
            <strong>Address:</strong> Lahore, Pakistan 54000
          </p>
        </div>

        <div className="footer-socials">
          <a href="https://github.com/saboor-shaiikh" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/saboorshaiikh/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/saboorshaiikh/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://linkedin.com/in/abdul-saboor6940" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://www.fiverr.com/saboorsheikh507/buying?source=avatar_menu_profile" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Fiverr">
            <SiFiverr />
          </a>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>&copy; {currentYear} Abdul Saboor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
