import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, BrainCircuit, Rocket } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import '../styles/About.css';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="about-section" ref={containerRef} id="about">

      <div className="about-container">

        {/* Left Side: Profile Card with Parallax */}
        <motion.div
          className="about-left"
          style={{ y: cardY }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <ProfileCard
            name="Abdul Saboor"
            title=""
            handle="007dev"
            status="Building the Future"
            contactText="Get in Touch"
            avatarUrl="/profile.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            behindGlowEnabled={false}
            innerGradient="linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)"
          />
        </motion.div>

        {/* Right Side: Animated Text Content */}
        <motion.div
          className="about-right"
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >

          <motion.div variants={itemVariants} className="about-header-wrap">
            <h2 className="about-heading">
              Engineering <span className="highlight-cyan">Ideas</span> into <br />
              <span className="highlight-purple">Reality.</span>
            </h2>
            <div className="heading-line"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="about-text-block">
            <p className="about-description">
              I am a <span className="keyword" data-text="Software Engineer">Software Engineer</span> and visionary creator with a deep focus on crafting
              modern, blazing-fast web experiences. I specialize in merging raw, brutalist design
              with state-of-the-art interactive graphics and robust architectures.
            </p>
            <p className="about-description">
              My core philosophy lies in translating complex logic into seamless, beautiful solutions.
              Whether I'm tinkering with <span className="keyword" data-text="Artificial Intelligence">Artificial Intelligence</span>, mastering the modern <span className="keyword" data-text="React Ecosystem">React Ecosystem</span>,
              or optimizing deep backend infrastructure, I build with purpose and precision.
            </p>
          </motion.div>

          {/* Interactive Skill Pills */}
          <motion.div variants={itemVariants} className="about-skills-row">
            <div className="skill-pill">
              <Code2 size={16} /> Clean Architecture
            </div>
            <div className="skill-pill">
              <BrainCircuit size={16} /> AI Integrations
            </div>
            <div className="skill-pill">
              <Rocket size={16} /> High Performance
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;
