import React, { useEffect, useRef, useCallback, useState } from 'react';
import './ProfileCard.css';

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);

const TechProfileCard = ({
  avatarUrl = '/profile.png',
  name = 'Abdul Saboor',
  title = 'Software Engineer | AI Enthusiast',
  enableTilt = true,
  enableMobileTilt = true,
  className = ''
}) => {
  const wrapRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const orientationActiveRef = useRef(false);
  const lastValuesRef = useRef({ x: 0, y: 0 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches && 
                     ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop: pointer-based tilt
  const handlePointerMove = useCallback((event) => {
    if (!enableTilt || !wrapRef.current || isMobile) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const percentX = clamp((100 / rect.width) * x);
    const percentY = clamp((100 / rect.height) * y);

    wrapRef.current.style.setProperty('--mouseX', `${percentX}%`);
    wrapRef.current.style.setProperty('--mouseY', `${percentY}%`);
    wrapRef.current.style.setProperty('--parallaxX', `${(percentX - 50) / 10}`);
    wrapRef.current.style.setProperty('--parallaxY', `${(percentY - 50) / 10}`);
  }, [enableTilt, isMobile]);

  const handlePointerLeave = useCallback(() => {
    if (!wrapRef.current || isMobile) return;
    wrapRef.current.style.setProperty('--mouseX', '50%');
    wrapRef.current.style.setProperty('--mouseY', '50%');
    wrapRef.current.style.setProperty('--parallaxX', '0');
    wrapRef.current.style.setProperty('--parallaxY', '0');
  }, [isMobile]);

  // Mobile: device orientation (gyroscope/accelerometer) tilt
  useEffect(() => {
    if (!isMobile || !enableMobileTilt || !enableTilt) return;
    if (!wrapRef.current) return;

    const el = wrapRef.current;
    let animFrameId = null;

    const handleOrientation = (event) => {
      // beta: front-to-back tilt (-180 to 180), gamma: left-to-right tilt (-90 to 90)
      const beta = event.beta ?? 0;   // Y-axis rotation
      const gamma = event.gamma ?? 0; // X-axis rotation

      // Normalize: map device tilt to parallax values
      // beta ~0-90 when phone held upright, center around ~40 (typical holding angle)
      const normalizedY = Math.max(-6, Math.min(6, (beta - 40) / 6));
      const normalizedX = Math.max(-6, Math.min(6, gamma / 6));

      // Smooth interpolation — higher lerp = faster, snappier response
      const lerp = 0.35;
      lastValuesRef.current.x += (normalizedX - lastValuesRef.current.x) * lerp;
      lastValuesRef.current.y += (normalizedY - lastValuesRef.current.y) * lerp;

      const smoothX = lastValuesRef.current.x;
      const smoothY = lastValuesRef.current.y;

      // Convert to percentage for glow effect
      const percentX = 50 + smoothX * 10;
      const percentY = 50 + smoothY * 10;

      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        el.style.setProperty('--mouseX', `${clamp(percentX)}%`);
        el.style.setProperty('--mouseY', `${clamp(percentY)}%`);
        el.style.setProperty('--parallaxX', `${smoothX}`);
        el.style.setProperty('--parallaxY', `${smoothY}`);
      });
    };

    const startListening = () => {
      if (orientationActiveRef.current) return;
      orientationActiveRef.current = true;
      window.addEventListener('deviceorientation', handleOrientation, true);
    };

    // iOS 13+ requires permission request
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Auto-request on first touch of the card
      const requestOnTouch = () => {
        DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === 'granted') {
              startListening();
            }
          })
          .catch(console.error);
        el.removeEventListener('touchstart', requestOnTouch);
      };
      el.addEventListener('touchstart', requestOnTouch, { once: true, passive: true });
    } else if (typeof DeviceOrientationEvent !== 'undefined') {
      // Android / other browsers: no permission needed
      startListening();
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('deviceorientation', handleOrientation, true);
      orientationActiveRef.current = false;
    };
  }, [isMobile, enableMobileTilt, enableTilt]);

  // Initialize CSS vars
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
      className={`tech-profile-wrapper ${isMobile ? 'mobile-tilt' : ''} ${className}`.trim()}
      onPointerMove={!isMobile ? handlePointerMove : undefined}
      onPointerLeave={!isMobile ? handlePointerLeave : undefined}
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
