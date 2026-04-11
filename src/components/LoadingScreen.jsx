import React, { useEffect, useState, useRef } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'complete' | 'exit'
  const intervalRef = useRef(null);

  useEffect(() => {
    // Track real asset loading
    const fontPromise = document.fonts.ready;
    const imagePromise = new Promise((resolve) => {
      const img = new Image();
      img.src = '/profile.png';
      img.onload = resolve;
      img.onerror = resolve; // Don't block on missing image
    });

    // Also give a minimum display time for visual polish
    const minDisplayPromise = new Promise((resolve) => setTimeout(resolve, 2200));

    // Animate progress bar while loading
    let current = 0;
    intervalRef.current = setInterval(() => {
      // Accelerate toward 90, then slow down
      const target = phase === 'complete' ? 100 : 90;
      const speed = current < 60 ? 2.5 : current < 85 ? 1.2 : 0.3;
      current = Math.min(current + speed, target);
      setProgress(Math.round(current));
    }, 40);

    // Wait for all assets + minimum display time
    Promise.all([fontPromise, imagePromise, minDisplayPromise]).then(() => {
      clearInterval(intervalRef.current);
      setProgress(100);
      setPhase('complete');

      // Brief pause at 100% then exit
      setTimeout(() => {
        setPhase('exit');
        // Let exit animation play before unmounting
        setTimeout(() => {
          onFinished?.();
        }, 800);
      }, 400);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`loading-screen ${phase === 'exit' ? 'exit' : ''}`}>
      {/* Background grid */}
      <div className="loading-grid-bg"></div>

      {/* Scanning line */}
      <div className="loading-scanline"></div>

      {/* Central content */}
      <div className="loading-content">
        {/* Hexagonal spinner */}
        <div className="hex-spinner">
          <div className="hex-ring hex-ring-1"></div>
          <div className="hex-ring hex-ring-2"></div>
          <div className="hex-core"></div>
        </div>

        {/* Name reveal */}
        <h1 className="loading-name">ABDUL SABOOR</h1>

        {/* Status text */}
        <div className="loading-status">
          <span className="status-indicator"></span>
          <span className="status-text">
            {phase === 'complete' || phase === 'exit'
              ? 'SYSTEM READY'
              : 'INITIALIZING INTERFACE'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="loading-progress-track">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="loading-progress-text">{progress}%</span>
        </div>

        {/* Terminal lines */}
        <div className="loading-terminal">
          <p className={progress > 10 ? 'visible' : ''}>
            &gt; Loading fonts...{' '}
            <span className={progress > 40 ? 'done' : ''}>
              {progress > 40 ? 'OK' : ''}
            </span>
          </p>
          <p className={progress > 30 ? 'visible' : ''}>
            &gt; Loading assets...{' '}
            <span className={progress > 65 ? 'done' : ''}>
              {progress > 65 ? 'OK' : ''}
            </span>
          </p>
          <p className={progress > 55 ? 'visible' : ''}>
            &gt; Building interface...{' '}
            <span className={progress > 85 ? 'done' : ''}>
              {progress > 85 ? 'OK' : ''}
            </span>
          </p>
          <p className={progress >= 100 ? 'visible' : ''}>
            &gt; Launch{' '}
            <span className={progress >= 100 ? 'done highlight' : ''}>
              {progress >= 100 ? 'READY' : ''}
            </span>
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="corner-deco top-left"></div>
      <div className="corner-deco top-right"></div>
      <div className="corner-deco bottom-left"></div>
      <div className="corner-deco bottom-right"></div>
    </div>
  );
};

export default LoadingScreen;
