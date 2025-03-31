'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackToEarth() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isClosed, setIsClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Find the target section
      const targetSection = document.querySelector('.ready-to-start-section');
      if (targetSection) {
        const sectionBottom = targetSection.getBoundingClientRect().bottom + window.scrollY;
        const isAfterTarget = scrollY + windowHeight >= sectionBottom + 100; // 100px after the section
        setIsVisible(isAfterTarget && !isClosed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClosed]);

  const createParticle = () => {
    const newParticle = {
      id: Date.now(),
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    };
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  const scrollToTop = async () => {
    setIsLoading(true);
    const audio = new Audio('/sounds/rocket-launch.mp3');
    audio.play().catch(error => console.log('Audio play failed:', error));

    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 500));

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Reset loading state after animation starts
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed left-[43.5%] -translate-x-1/2 top-[85%] z-50"
        >
          <div className="relative">
            {/* Close button */}
            <button
              onClick={() => setIsClosed(true)}
              className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors text-sm"
            >
              ×
            </button>

            {/* Main button */}
            <motion.button
              onClick={scrollToTop}
              disabled={isLoading}
              onHoverStart={() => {
                if (!isLoading) {
                  setIsHovered(true);
                  const interval = setInterval(createParticle, 200);
                  setTimeout(() => clearInterval(interval), 1000);
                }
              }}
              onHoverEnd={() => setIsHovered(false)}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-500 flex items-center gap-2 group relative overflow-hidden backdrop-blur-lg border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Space background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800"
                animate={{
                  x: isHovered ? ['0%', '100%', '0%'] : '0%',
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Stars effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full"
                    initial={{
                      x: Math.random() * 100 + '%',
                      y: Math.random() * 100 + '%',
                      opacity: 0
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <motion.span
                className="text-sm font-semibold relative z-10"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  textShadow: isHovered ? '0 0 8px rgba(255,255,255,0.5)' : 'none'
                }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? 'Launching...' : 'Back to Earth'}
              </motion.span>

              {/* Rocket with enhanced animation */}
              <motion.span
                animate={{
                  y: isLoading ? [0, -10, 0] : [0, -5, 0],
                  rotate: isLoading ? [0, 10, -10, 0] : [0, 5, -5, 0],
                  scale: isHovered ? 1.1 : 1,
                  filter: isHovered ? 'brightness(1.2)' : 'brightness(1)'
                }}
                transition={{
                  y: {
                    duration: isLoading ? 1 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: isLoading ? 1.5 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.2
                  }
                }}
                className="text-xl relative z-10"
              >
                🚀
              </motion.span>

              {/* Loading spinner */}
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}

              {/* Dynamic particle effects */}
              {particles.map(particle => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    x: particle.x,
                    y: particle.y,
                    opacity: 0,
                    scale: [1, 0.5, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 