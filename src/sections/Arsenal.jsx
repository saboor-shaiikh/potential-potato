import React, { useEffect, useRef, useState } from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDatabase, FaPython, FaGitAlt, FaGithub, FaDocker, FaNetworkWired } from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript,
  SiExpress, SiMongodb, SiPostgresql, SiFirebase,
  SiOpenai, SiAnthropic
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';
import '../styles/Arsenal.css';

const tools = [
  // Frontend
  { id: 'react', name: 'React', category: 'Frontend', icon: FaReact, color: '#61DAFB', size: 80 },
  { id: 'next', name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: '#ffffff', size: 75 },
  { id: 'js', name: 'JavaScript', category: 'Language', icon: SiJavascript, color: '#F7DF1E', size: 70 },
  { id: 'ts', name: 'TypeScript', category: 'Language', icon: SiTypescript, color: '#3178C6', size: 70 },
  { id: 'html', name: 'HTML5', category: 'Frontend', icon: FaHtml5, color: '#E34F26', size: 60 },
  { id: 'css', name: 'CSS3', category: 'Frontend', icon: FaCss3Alt, color: '#1572B6', size: 60 },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4', size: 65 },

  // Backend & DB
  { id: 'node', name: 'Node.js', category: 'Backend', icon: FaNodeJs, color: '#339933', size: 75 },
  { id: 'express', name: 'Express.js', category: 'Backend', icon: SiExpress, color: '#ffffff', size: 65 },
  { id: 'api', name: 'REST APIs', category: 'Backend', icon: TbApi, color: '#a855f7', size: 65 },
  { id: 'mongo', name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#47A248', size: 70 },
  { id: 'sql', name: 'SQL', category: 'Database', icon: FaDatabase, color: '#003B57', size: 60 },
  { id: 'postgres', name: 'PostgreSQL', category: 'Database', icon: SiPostgresql, color: '#4169E1', size: 65 },
  { id: 'firebase', name: 'Firebase', category: 'Database', icon: SiFirebase, color: '#FFCA28', size: 65 },

  // AI & Automation
  { id: 'python', name: 'Python', category: 'Language', icon: FaPython, color: '#3776AB', size: 75 },
  { id: 'openai', name: 'OpenAI', category: 'AI', icon: SiOpenai, color: '#412991', size: 80 },
  { id: 'claude', name: 'Claude', category: 'AI', icon: SiAnthropic, color: '#D97757', size: 75 },
  { id: 'n8n', name: 'n8n', category: 'Automation', icon: FaNetworkWired, color: '#FF6D5A', size: 70 },

  // Tools
  { id: 'git', name: 'Git', category: 'Tools', icon: FaGitAlt, color: '#F05032', size: 60 },
  { id: 'github', name: 'GitHub', category: 'Tools', icon: FaGithub, color: '#ffffff', size: 65 },
  { id: 'docker', name: 'Docker', category: 'Tools', icon: FaDocker, color: '#2496ED', size: 70 },
  { id: 'vscode', name: 'VS Code', category: 'Tools', icon: VscVscode, color: '#007ACC', size: 65 },
];

const Arsenal = () => {
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  // Physics state
  const physicsRef = useRef({
    particles: [],
    mouseX: -1000,
    mouseY: -1000,
    time: 0
  });

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tweaks for look & feel dynamically adapting to mobile/desktop
  const isMobile = windowWidth < 768;
  const SIZE_MULTIPLIER = isMobile ? 1.0 : 1.35; 
  const SPREAD_MULTIPLIER = isMobile ? 26 : 75; // Adjusted beautifully tight mobile pack
  const COLLISION_PAD = isMobile ? 5 : 25;       // Standard gap
  const REPEL_RADIUS = isMobile ? 220 : 500;     // Increased interaction radius for mobile
  const REPEL_STRENGTH = isMobile ? 12.0 : 12.0; // High bounce strength upon touch

  // Initialize physics network
  useEffect(() => {
    const width = 1000;
    const height = 500;
    const centerX = 0;
    const centerY = 0;

    // Distribute nodes using a simple spiral/circular packing around center
    const particles = tools.map((tool, i) => {
      // Golden ratio spiral for organic distribution
      const angle = i * 2.39996; // Golden angle
      const radiusDist = Math.sqrt(i + 1) * SPREAD_MULTIPLIER * SIZE_MULTIPLIER; // Spread out organically

      const originX = centerX + Math.cos(angle) * radiusDist;
      const originY = centerY + Math.sin(angle) * radiusDist * 0.8; // Slightly squashed vertically

      return {
        id: tool.id,
        x: originX,
        y: originY,
        originX,
        originY,
        vx: 0,
        vy: 0,
        radius: (tool.size * SIZE_MULTIPLIER) / 2,
        randomOffset: Math.random() * Math.PI * 2 // For organic floating
      };
    });

    physicsRef.current.particles = particles;

    let animationFrameId;

    const applyPhysics = () => {
      const state = physicsRef.current;
      state.time += 0.01;

      const { mouseX, mouseY, time } = state;

      for (let i = 0; i < state.particles.length; i++) {
        const p = state.particles[i];

        // 1. Spring force towards origin
        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        p.vx += dx * 0.035; // Spring stiffness
        p.vy += dy * 0.035;

        // 2. Mouse Repel force
        if (mouseX !== -1000 && mouseY !== -1000) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const distMouse = Math.sqrt(mdx * mdx + mdy * mdy);

          if (distMouse < REPEL_RADIUS && distMouse > 0) {
            const force = (REPEL_RADIUS - distMouse) / REPEL_RADIUS;
            // Smoothly push away
            p.vx += (mdx / distMouse) * force * REPEL_STRENGTH;
            p.vy += (mdy / distMouse) * force * REPEL_STRENGTH;
          }
        }

        // 3. Collision / Separation force (repel other bubbles)
        for (let j = 0; j < state.particles.length; j++) {
          if (i === j) continue;
          const p2 = state.particles[j];
          const bdx = p.x - p2.x;
          const bdy = p.y - p2.y;
          const dist = Math.sqrt(bdx * bdx + bdy * bdy);
          const minDist = p.radius + p2.radius + COLLISION_PAD;

          if (dist < minDist && dist > 0) {
            const push = (minDist - dist) * 0.1; // Snappier collision avoid
            p.vx += (bdx / dist) * push;
            p.vy += (bdy / dist) * push;
          }
        }

        // 4. Subtle ambient float
        p.vx += Math.cos(time + p.randomOffset) * 0.05;
        p.vy += Math.sin(time + p.randomOffset) * 0.05;

        // Apply friction/damping
        p.vx *= 0.85; // Less friction for bouncier feel
        p.vy *= 0.85;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Apply to DOM directly for performance
        if (bubblesRef.current[i]) {
          bubblesRef.current[i].style.transform = `translate(${p.x - p.radius}px, ${p.y - p.radius}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(applyPhysics);
    };

    animationFrameId = requestAnimationFrame(applyPhysics);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]); // Reinitialize physics if swapping between mobile and desktop so it doesn't get stuck open!

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    physicsRef.current.mouseX = e.clientX - rect.left - (rect.width / 2);
    physicsRef.current.mouseY = e.clientY - rect.top - (rect.height / 2);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    physicsRef.current.mouseX = e.touches[0].clientX - rect.left - (rect.width / 2);
    physicsRef.current.mouseY = e.touches[0].clientY - rect.top - (rect.height / 2);
  };

  const handleMouseLeave = () => {
    physicsRef.current.mouseX = -1000;
    physicsRef.current.mouseY = -1000;
  };

  return (
    <section className="arsenal-section" id="arsenal">
      <div className="arsenal-header">
        <h2 className="arsenal-heading">My Arsenal</h2>
        <p className="arsenal-subtitle">
          Technologies I use to build, automate, and scale ideas.
        </p>
      </div>

      <div
        className="floating-cloud-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        onTouchCancel={handleMouseLeave}
      >
        {tools.map((tool, i) => {
          const Icon = tool.icon;

          const actualSize = tool.size * SIZE_MULTIPLIER;
          return (
            <div
              key={tool.id}
              ref={(el) => bubblesRef.current[i] = el}
              className={`arsenal-bubble`}
              style={{
                left: '50%',
                top: '50%',
                width: actualSize,
                height: actualSize,
                '--hover-color': tool.color,
                // Initial placement at origin
                transform: `translate(${-actualSize / 2}px, ${-actualSize / 2}px)`
              }}
            >
              <div className="bubble-icon-wrapper" style={{ color: tool.color }}>
                <Icon className="bubble-icon" />
              </div>
            </div>
          );
        })}


      </div>
    </section>
  );
};

export default Arsenal;
