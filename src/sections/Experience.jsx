import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Experience.css';

const timelineTotalMonths = 48; // Jan 2023 to Jan 2027

// Helper to calculate top and height percentages based on inverted timeframe
const calculateSpan = (startMonth, startYear, endMonth, endYear) => {
  const toMonths = (m, y) => (y - 2023) * 12 + (m - 1);
  const startAbs = toMonths(startMonth, startYear);
  const endAbs = toMonths(endMonth, endYear);

  // Timeline expands to 50 units (padding buffer at top and bottom)
  const totalSpan = 52; 
  // Offset everything down by 2 months to prevent cutoff
  const offset = 2;

  const topPercent = ((totalSpan - (endAbs + offset)) / totalSpan) * 100;
  // Increase minimum visual height scale
  const heightPercent = ((endAbs - startAbs) / totalSpan) * 100;

  return { 
    top: `${topPercent}%`, 
    height: `${Math.max(heightPercent, 8)}%` // Guarantee a minimum visual height so text perfectly fits 
  };
};

const experiences = [
  {
    id: 'degree',
    title: "Bachelor's Degree in Computer Science",
    company: "University of Lahore",
    role: "Undergraduate",
    description: "Focusing on Core Computer Architecture, Data Structures, and Software Engineering Methodologies.",
    start: { m: 1, y: 2027, label: "Feb 2023" }, // Placed at top
    end: { m: 1, y: 2027, label: "Expected Jan 2027" },
    side: 'left',
    type: 'education',
  },
  {
    id: 'priceyra',
    title: "Final Year Project — Priceyra",
    company: "University of Lahore",
    role: "AI Integration & Full Stack Developer",
    description: "Architected an autonomous price alerting and AI discount-suggesting web app. Engineered data-scraping pipelines and real-time inference layers.",
    start: { m: 2, y: 2026, label: "Feb 2026" },
    end: { m: 1, y: 2027, label: "Jan 2027" },
    side: 'right',
    type: 'project',
  },
  {
    id: 'mavericks',
    title: "Business Developer",
    company: "Mavericks United",
    role: "B2B Tech Specialist",
    description: "Orchestrated advanced B2B client relations, expanded international market reach, and deployed analytics-driven tech workflows for pipeline conversion.",
    start: { m: 2, y: 2025, label: "Feb 2025" },
    end: { m: 4, y: 2026, label: "April 2026" },
    side: 'left',
    type: 'job',
  },
  {
    id: 'orbiz',
    title: "Software Engineering Intern",
    company: "Orbiz Tech",
    role: "Backend Engineer",
    description: "Engineered scalable backend modules, optimized nested SQL protocols, and streamlined cross-service latency across critical enterprise APIs.",
    start: { m: 5, y: 2024, label: "May 2024" },
    end: { m: 8, y: 2024, label: "August 2024" },
    side: 'right',
    type: 'job',
  },
  {
    id: 'canie',
    title: "Outbound Sales Agent",
    company: "Canie Communications Pvt Limited",
    role: "Sales Target Lead",
    description: "Operated high-volume outbound network strategies and successfully bridged systemic onboarding loops resulting in massive client retention spikes.",
    start: { m: 6, y: 2023, label: "June 2023" },
    end: { m: 9, y: 2023, label: "September 2023" },
    side: 'left',
    type: 'job',
  }
];

const Experience = () => {
  return (
    <section className="experience-section" id="experience">

      <div className="section-header">
        <h2 className="section-title">TIMELINE</h2>
        <p className="section-subtitle">PROJECTS & PROFESSIONAL EXPERIENCE</p>
      </div>

      <div className="timeline-container">
        {/* Central Axis */}
        <div className="timeline-axis">
          {/* Year Markers */}
          {[2027, 2026, 2025, 2024, 2023].map((year) => {
            const pos = calculateSpan(1, year, 1, year);
            return (
              <div 
                key={year} 
                className="year-marker" 
                style={{ top: pos.top }}
              >
                <div className="year-node"></div>
                <span className="year-label">{year}</span>
              </div>
            );
          })}
        </div>

        {/* Timeline Items */}
        <div className="timeline-items">
          {experiences.map((exp) => {
            const pos = calculateSpan(exp.start.m, exp.start.y, exp.end.m, exp.end.y);
            return (
              <motion.div
                key={exp.id}
                className={`timeline-card-wrapper ${exp.side} ${exp.type}`}
                style={{ top: pos.top, height: pos.height }}
                initial={{ opacity: 0, scale: 0.9, y: 50, x: exp.side === 'left' ? -50 : 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="timeline-card">
                  <div className="card-hud-border"></div>
                  
                  {/* Creative HUD Accent */}
                  <div className="card-accent-badge">
                    <span className="accent-dot"></span>
                    <span className="accent-text">AUTH://{exp.type.toUpperCase()}</span>
                  </div>

                  <div className="card-content">
                    <div className="card-top-row">
                      <h3 className="card-title">{exp.title}</h3>
                      <div className="duration-pill">
                        <span className="pill-text">LOG: {exp.start.label} - {exp.end.label}</span>
                      </div>
                    </div>
                    <p className="card-company">@ {exp.company}</p>
                    <p className="card-desc">{exp.description}</p>
                  </div>
                  
                  {/* Connection Line to Axis */}
                  <div className="connection-line">
                     <div className="laser-dot"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
