import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/WhatsappWidget.css';

import { Download } from 'lucide-react';

const WhatsappWidget = () => {
  return (
    <div className="global-floating-actions">
      <a 
        href="/AbdulSaboor-Resume.pdf" 
        download="AbdulSaboor-Resume.pdf" 
        className="floating-resume-btn"
        title="Download Resume"
      >
        <Download size={16} /> Resume
      </a>

      <a 
        href="https://wa.me/923071199969" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-widget"
        aria-label="Chat on WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </div>
  );
};

export default WhatsappWidget;
