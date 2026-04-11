import React, { useEffect, useState } from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`hero-section ${isLoaded ? 'is-loaded' : ''}`}>
      {/* Background Layers */}
      <div className="hero-gradient-bg"></div>
      <div className="hero-grain-overlay"></div>

      {/* HUD Scanning Line */}
      <div className="hud-scanline"></div>

      {/* Main Structural Line */}
      <div className="hero-line"></div>
      <div className="circuit-node node-1"></div>
      <div className="circuit-node node-2"></div>

      {/* Decorative Crosshairs & Dots */}
      <div className="crosshair top-left"></div>
      <div className="crosshair bottom-right"></div>
      <div className="dot top-right"></div>

      {/* Content Container */}
      <div className="hero-content">
        {/* Left Info Area */}
        <div className="hero-left">
          <p className="hero-info-text">
            <span className="indicator"></span>

          </p>
        </div>

        {/* Right Typography Area */}
        <div className="hero-right">
          <h1 className="hero-title">
            ABDUL SABOOR
          </h1>
          <div className="hud-data-block">
            <div className="data-line">
              <span className="label">SYS.STATUS:</span>
              <span className="value ok">OPTIMAL</span>
            </div>
            <div className="data-line">
              <span className="label">PRIMARY_ROLE:</span>
              <span className="value">SOFTWARE_ENGINEER</span>
            </div>
            <div className="data-line">
              <span className="label">SECONDARY_SPEC:</span>
              <span className="value highlight">AI_ENTHUSIAST</span>
            </div>
          </div>

          {/* CTA Action */}
          <div className="hero-cta-wrapper">
            <a href="#contact" className="hero-cta-btn">
              <span>HIRE ME</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Right Glowing Icon */}
      <div className="hero-glowing-icon">
        <div className="diamond"></div>
      </div>
    </section>
  );
};

export default Hero;
