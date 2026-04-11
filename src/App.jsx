import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Constant galaxy generator 
const generateStars = (count) => {
  let boxShadow = '';
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * 100).toFixed(2); // Use viewport width dynamically to preserve high density on mobile screens
    const y = Math.floor(Math.random() * 2000);
    boxShadow += `${x}vw ${y}px #FFF, ${x}vw ${y + 2000}px #FFF, `; // Duplicated y+2000 for seamless scroll boundary
  }
  return boxShadow.slice(0, -2);
};
import Hero from './sections/Hero';
import Navbar from './sections/Navbar';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Arsenal from './sections/Arsenal';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import WhatsappWidget from './components/WhatsappWidget';

function App() {
  const aboutRef = useRef(null);

  // Generate deterministic randomized stars on load (Optimized counts for battery/performance on mobile)
  const starLayer1 = useMemo(() => generateStars(150), []);
  const starLayer2 = useMemo(() => generateStars(50), []);
  const starLayer3 = useMemo(() => generateStars(20), []);

  // Track the scroll progress of the About section as it slides up to cover the viewport
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"]
  });

  // Animate the Hero section pushing back, fading out, and blurring
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"]);

  return (
    <div className="app-container" style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      
      {/* Hero Container: Sticks to the top, animated by the scroll of the About section */}
      <motion.div 
        style={{
          position: 'sticky',
          top: 0,
          scale: heroScale,
          opacity: heroOpacity,
          filter: heroBlur,
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: 'var(--bg-base)',
          transformOrigin: '50% 50%'
        }}
      >
        <Hero />
      </motion.div>

      {/* Main Content Container: Follows standard layout but overlaps the fixed Hero perfectly */}
      <div 
        ref={aboutRef}
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: 'transparent',
          boxShadow: '0 -40px 100px rgba(0,0,0,1)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Sticky Unified Background */}
        <div style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 80% 20%, rgba(88, 28, 135, 0.15) 0%, transparent 40%), radial-gradient(circle at 10% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.8) 0%, transparent 100%)'
        }}>
          {/* Deep Space Parallax Starfield */}
          <div className="star-layer" style={{ width: '1px', height: '1px', boxShadow: starLayer1, animation: 'galaxyDrift 100s linear infinite' }} />
          <div className="star-layer" style={{ width: '2px', height: '2px', boxShadow: starLayer2, boxShadowColor: 'rgba(255,255,255,0.8)', animation: 'galaxyDrift 150s linear infinite' }} />
          <div className="star-layer" style={{ width: '3px', height: '3px', boxShadow: starLayer3, boxShadowColor: 'rgba(255,255,255,0.6)', animation: 'galaxyDrift 200s linear infinite' }} />
        </div>

        {/* Scrolling Content wrapped to overlap the sticky background perfectly */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh' }}>
          <About />
          <Experience />
          <Projects />
          <Arsenal />
          <Contact />
          <Footer />
        </div>
      </div>

      <WhatsappWidget />
    </div>
  );
}

export default App;
