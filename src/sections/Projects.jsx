import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import '../styles/Projects.css';

const GithubIcon = ({ size = 20, strokeWidth = 1.5 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.62-.3 7.5-1.8 7.5-7.98 0-1.9-.6-3.4-1.6-4.6.15-.4.7-2.2-.15-4.6 0 0-1.3-.4-4.2 1.6A14.6 14.6 0 0 0 12 3a14.6 14.6 0 0 0-4.1.6C5 1.6 3.7 2 3.7 2c-.85 2.4-.3 4.2-.15 4.6-1.1 1.2-1.7 2.7-1.7 4.6 0 6.1 3.8 7.6 7.4 8 .08.2.16.5.2.9V22"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const PROJECTS_DATA = [
  {
    id: 'p1',
    title: 'Priceyra',
    desc: 'An autonomous price alerting and decision support system that uses web scraping and machine learning to track e-commerce prices and provide predictive "Buy/Wait" suggestions.',
    tags: ['Machine Learning', 'Web Scraping', 'Automation'],
    github: 'https://github.com/saboor-shaiikh/Priceyra',
    live: ''
  },
  {
    id: 'p2',
    title: 'slate-reminder-bot',
    desc: 'A Python-based automation bot that monitors university Slate LMS calendars and sends WhatsApp reminders for assignments, quizzes, and deadlines. Includes natural language interaction powered by Gemini LLM.',
    tags: ['Python', 'Gemini LLM', 'WhatsApp API'],
    github: 'https://github.com/saboor-shaiikh/slate-reminder-bot',
    live: ''
  },
  {
    id: 'p3',
    title: 'Acrab-Creative',
    desc: 'Official web platform for Acrab Creative: a bespoke design agency showcase built with React.',
    tags: ['React', 'Web Design', 'Agency'],
    github: 'https://github.com/saboor-shaiikh/Acrab-Creative',
    live: 'https://acrabcreative.com/'
  },
  {
    id: 'p4',
    title: 'TransportManagementSystem',
    desc: 'A console-based C++ application to manage student transport operations, including route assignment, fee tracking, and admin authentication with file-based data storage.',
    tags: ['C++', 'Console Application', 'Data Storage'],
    github: 'https://github.com/saboor-shaiikh/TransportManagementSystem',
    live: ''
  },
  {
    id: 'p5',
    title: 'SABOOR.OS',
    desc: 'An interactive personal 3D System Architect portfolio Intro Page just for fun.',
    tags: ['3D Web', 'Interactive', 'Portfolio'],
    github: 'https://github.com/saboor-shaiikh/SaboorShaiikh',
    live: 'https://saboorshaiikh.web.app'
  },
  {
    id: 'p6',
    title: 'Stride-Gear',
    desc: 'StrideGear-Premium Sneaker Management. A React-based web app for managing sneaker collections with secure authentication (including Google OAuth), full CRUD inventory features, and role-based dashboards for users and admins, all wrapped in a modern Soft UI design.',
    tags: ['React', 'Firebase Auth', 'CRUD'],
    github: 'https://github.com/saboor-shaiikh/Stride-Gear',
    live: 'https://stride-gear.web.app/'
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  // Magnetic hover + Glow effect tracking
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom properties for the radial glow
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Magnetic pull calculation (pulls slightly towards the mouse)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2; // Tilt amount
    const rotateY = ((x - centerX) / centerX) * 2;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className={`bento-item-${index}`}
    >
      <div 
        ref={cardRef} 
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-links-overlay">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="plink-btn" title="Repository">
              <GithubIcon size={36} strokeWidth={1.5} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="plink-btn" title="Live Demo">
              <ExternalLink size={36} strokeWidth={1.5} />
            </a>
          )}
        </div>

        <div className="project-card-content">
          <h3 className="project-title">
            {project.title}
            {project.id === 'p1' && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 400, opacity: 0.8 }}>
                 [Coming Soon]
              </span>
            )}
          </h3>
          <p className="project-desc">{project.desc}</p>
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag} className="ptag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="projects-title">Selected Works</h2>
        </motion.div>

        <motion.div 
          className="bento-grid"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
