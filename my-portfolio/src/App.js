import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import local image
import portraitImage from './Gouriii.jpg';

// Custom styles instead of Chakra UI
import './portfolio.css';

// Create custom motion components
const MotionDiv = motion.div;
const MotionImg = motion.img;
const MotionSpan = motion.span;
const MotionA = motion.a;

// 3D tilt effect for cards
function useCardTilt() {
  const ref = useRef();
  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };
  const handleMouseLeave = () => {
    const card = ref.current;
    if (card) card.style.transform = '';
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

const gridItemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.13,
      duration: 0.7,
      type: 'spring',
      stiffness: 60,
      damping: 18,
    },
  }),
};

// FancyCard: GridItem with 3D tilt and entrance animation
function FancyCard({ index, className, children }) {
  const { ref, handleMouseMove, handleMouseLeave } = useCardTilt();
  return (
    <MotionDiv
      ref={ref}
      className={`fancy-card ${className}`}
      variants={gridItemVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)', zIndex: 2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </MotionDiv>
  );
}

function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  // Use local image for portrait
  const portraitSrc = portraitImage;
  // Use external image URL for secondary image
  const secondarySrc = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80";

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio">
      <AnimatePresence>
        {showOverlay && (
          <MotionDiv
            key="overlay"
            className="overlay"
            initial={{ y: '0%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <h1 className="overlay-title">Aditya Rane</h1>
            <p className="overlay-subtitle">Portfolio &mdash; Vintage Spirit</p>
          </MotionDiv>
        )}
      </AnimatePresence>
      
      {!showOverlay && (
        <MotionDiv
          className="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Navbar */}
          <MotionDiv
            className="navbar"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <MotionSpan
              className="logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Gouri Pandey
            </MotionSpan>
            
            <div className="nav-links">
              {['ABOUT', 'WORK', 'CONTACT'].map((item, index) => (
                <MotionA
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </MotionA>
              ))}
            </div>
          </MotionDiv>

          {/* Main Grid */}
          <div className="grid-container">
            {/* Heading Card */}
            <FancyCard index={0} className="heading-card">
              <p className="heading-text">
                You were merely allowed to be born<i> I </i>was welcomed into creation.
              </p>
            </FancyCard>

            {/* Portrait Card */}
            <FancyCard index={1} className="portrait-card">
              <MotionImg
                src={portraitSrc}
                alt="portrait"
                className="card-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </FancyCard>

            {/* Era Card */}
            <FancyCard index={2} className="era-card">
              <h3 className="card-title">Era & Essence</h3>
              <MotionImg
                src={secondarySrc}
                alt="group"
                className="era-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </FancyCard>

            {/* Bonus Card */}
            <FancyCard index={3} className="bonus-card">
              <p className="bonus-text">Begin some questions?</p>
            </FancyCard>

            {/* Contact Card */}
            <FancyCard index={4} className="contact-card">
              <p className="contact-text">
                Contact <b>me</b>
              </p>
            </FancyCard>

            {/* Footer Card */}
            <FancyCard index={5} className="footer-card">
              <p className="footer-text">Github</p>
            </FancyCard>
          </div>
        </MotionDiv>
      )}
    </div>
  );
}

export default App;