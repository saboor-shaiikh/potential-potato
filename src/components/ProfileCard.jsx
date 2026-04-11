import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));

const TechProfileCard = ({
  avatarUrl = '/profile.png',
  name = 'Abdul Saboor',
  title = 'Software Engineer | AI Enthusiast',
  enableTilt = true,
  className = ''
}) => {
  const wrapRef = useRef(null);

  const handlePointerMove = useCallback((event) => {
    if (!enableTilt || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const percentX = clamp((100 / rect.width) * x);
    const percentY = clamp((100 / rect.height) * y);

    wrapRef.current.style.setProperty('--mouseX', `${percentX}%`);
    wrapRef.current.style.setProperty('--mouseY', `${percentY}%`);
    wrapRef.current.style.setProperty('--parallaxX', `${(percentX - 50) / 10}`);
    wrapRef.current.style.setProperty('--parallaxY', `${(percentY - 50) / 10}`);
  }, [enableTilt]);

  const handlePointerLeave = useCallback(() => {
    if (!wrapRef.current) return;
    wrapRef.current.style.setProperty('--mouseX', '50%');
    wrapRef.current.style.setProperty('--mouseY', '50%');
    wrapRef.current.style.setProperty('--parallaxX', '0');
    wrapRef.current.style.setProperty('--parallaxY', '0');
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    wrapRef.current.style.setProperty('--mouseX', '50%');
    wrapRef.current.style.setProperty('--mouseY', '50%');
    wrapRef.current.style.setProperty('--parallaxX', '0');
    wrapRef.current.style.setProperty('--parallaxY', '0');
  }, []);

  return (
    <div 
      ref={wrapRef} 
      className={`tech-profile-wrapper ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      
      {/* Background Tech Panel */}
      <div className="hud-panel hud-bg-layer" style={{ transform: 'translate(calc(var(--parallaxX) * -1px), calc(var(--parallaxY) * -1px))' }}>
        <div className="hud-border-lines"></div>
        {/* Abstract Grid SVG */}
        <svg className="hud-svg grid-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#gridPattern)"/>
        </svg>
      </div>

      {/* Circuit Nodes Layer (Right) */}
      <div className="hud-layer hud-circuit-nodes" style={{ transform: 'translate(calc(var(--parallaxX) * 2px), calc(var(--parallaxY) * 2px))' }}>
        <svg viewBox="0 0 200 200" className="circuit-svg">
          <g stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" fill="none">
            <path d="M100,20 L150,50 L150,150 L100,180 L50,150 L50,50 Z" />
            <path d="M100,50 L125,65 L125,135 L100,150 L75,135 L75,65 Z" />
            <circle cx="100" cy="100" r="20" stroke="rgba(6, 182, 212, 0.5)" />
            <circle cx="100" cy="20" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="150" cy="50" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="150" cy="150" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="100" cy="180" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="50" cy="150" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="50" cy="50" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Connecting lines */}
            <line x1="100" y1="20" x2="100" y2="50" />
            <line x1="150" y1="50" x2="125" y2="65" />
            <line x1="150" y1="150" x2="125" y2="135" />
            <line x1="100" y1="180" x2="100" y2="150" />
            <line x1="50" y1="150" x2="75" y2="135" />
            <line x1="50" y1="50" x2="75" y2="65" />
          </g>
        </svg>
      </div>

      {/* Terminal Data Lines (Left) */}
      <div className="hud-layer hud-terminal-lines" style={{ transform: 'translate(calc(var(--parallaxX) * 1.5px), calc(var(--parallaxY) * 1.5px))' }}>
        <div className="terminal-code">
          <p>SYS.INIT()...</p>
          <p>LOAD: 0x8FA4</p>
          <p>MEM: OK</p>
          <p className="terminal-cursor">_</p>
        </div>
        <div className="hud-bar-chart">
          <div className="bar b1"></div>
          <div className="bar b2"></div>
          <div className="bar b3"></div>
          <div className="bar b4"></div>
        </div>
      </div>

      {/* Typography */ }
      <div className="tech-profile-header" style={{ transform: 'translate(calc(var(--parallaxX) * 3px), calc(var(--parallaxY) * 3px))' }}>
        <h3 className="tech-name">{name}</h3>
        <p className="tech-title">{title}</p>
      </div>

      {/* Floating Polygon (Bottom Left) */}
      <div className="hud-floating-polygon" style={{ transform: 'translate(calc(var(--parallaxX) * 4px), calc(var(--parallaxY) * 4px))' }}>
        <div className="polygon-shape"></div>
      </div>

      {/* Forefront Avatar */}
      <div className="tech-avatar-layer" style={{ transform: 'translate(calc(var(--parallaxX) * 5px), calc(var(--parallaxY) * 5px))' }}>
        <img 
          src={avatarUrl} 
          alt={name} 
          className="tech-avatar-img"
          draggable="false"
        />
        {/* Glow behind Avatar */}
        <div className="tech-avatar-glow"></div>
      </div>

    </div>
  );
};

export default TechProfileCard;
