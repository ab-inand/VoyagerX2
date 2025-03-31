'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const routes = [
  {
    id: 1,
    from: 'Tokyo',
    to: 'Osaka',
    distance: '17min',
    price: '$150',
    year: '2027',
    image: '/1.jpg',
    description: 'Experience the future of transportation with our Tokyo-Osaka route, connecting two of Japan\'s most vibrant cities in just 17 minutes.',
    status: 'active',
    coordinates: { x: 100, y: 300 }
  },
  {
    id: 2,
    from: 'London',
    to: 'Paris',
    distance: '28min',
    price: '$180',
    year: '2027',
    image: '/2.jpg',
    description: 'Cross the English Channel in style with our London-Paris route, offering breathtaking views of both cities.',
    status: 'active',
    coordinates: { x: 250, y: 300 }
  },
  {
    id: 3,
    from: 'New York',
    to: 'Washington DC',
    distance: '29min',
    price: '$160',
    year: '2027',
    image: '/3.jpg',
    description: 'Connect the political and financial capitals of the United States with our high-speed route.',
    status: 'active',
    coordinates: { x: 400, y: 300 }
  },
  {
    id: 4,
    from: 'Dubai',
    to: 'Abu Dhabi',
    distance: '12min',
    price: '$120',
    year: '2028',
    image: '/4.jpg',
    description: 'Experience luxury travel between the UAE\'s most iconic cities with our premium route.',
    status: 'construction',
    coordinates: { x: 550, y: 300 }
  },
  {
    id: 5,
    from: 'Singapore',
    to: 'Kuala Lumpur',
    distance: '15min',
    price: '$130',
    year: '2028',
    image: '/1.jpg',
    description: 'Connect Southeast Asia\'s most dynamic cities with our cutting-edge hyperloop route.',
    status: 'construction',
    coordinates: { x: 700, y: 300 }
  },
  {
    id: 6,
    from: 'Sydney',
    to: 'Melbourne',
    distance: '25min',
    price: '$170',
    year: '2028',
    image: '/2.jpg',
    description: 'Experience Australia\'s first hyperloop route, connecting two of its most iconic cities.',
    status: 'construction',
    coordinates: { x: 850, y: 300 }
  },
  {
    id: 7,
    from: 'Seoul',
    to: 'Busan',
    distance: '20min',
    price: '$140',
    year: '2028',
    image: '/3.jpg',
    description: 'Travel between South Korea\'s capital and its largest port city in record time.',
    status: 'construction',
    coordinates: { x: 1000, y: 300 }
  }
];

const HyperloopMap = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.random() * 0.5) % 100,
        y: (particle.y + Math.random() * 0.5) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section className="relative min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Hyperloop Network
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the future of ground transportation with our revolutionary Hyperloop network.
            Connect major cities in minutes, not hours.
          </p>
        </motion.div>

        {/* Interactive Map */}
        <div 
          ref={containerRef}
          className="relative h-[600px] bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Particle System */}
            <div className="absolute inset-0">
              {particles.map(particle => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: particle.id * 0.1
                  }}
                />
              ))}
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[linear-gradient(45deg,transparent_48%,#00f2ff_50%,transparent_52%)] bg-[length:20px_20px]" />
            </div>
            
            {/* Animated Glow Effect */}
            <div 
              className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
              style={{
                left: mousePosition.x - 250,
                top: mousePosition.y - 250,
                transition: 'all 0.3s ease-out'
              }}
            />
          </div>

          {/* Route Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {routes.map((route, index) => (
              <g key={route.id}>
                {/* Main Route Line */}
                <motion.path
                  d={`M ${route.coordinates.x} ${route.coordinates.y} Q ${route.coordinates.x + 100} ${route.coordinates.y - 100} ${route.coordinates.x + 200} ${route.coordinates.y}`}
                  fill="none"
                  stroke={`url(#gradient-${route.id})`}
                  strokeWidth="4"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredRoute === route.id ? 'stroke-[6px] filter brightness-150' : ''
                  }`}
                  onMouseEnter={() => setHoveredRoute(route.id)}
                  onMouseLeave={() => setHoveredRoute(null)}
                  onClick={() => setSelectedRoute(route.id)}
                />
                
                {/* Animated Particles */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={route.coordinates.x + 100}
                    cy={route.coordinates.y - 50}
                    r="2"
                    fill="white"
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.5, 1],
                      cx: [
                        route.coordinates.x + 100,
                        route.coordinates.x + 150,
                        route.coordinates.x + 100
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5 + i * 0.2
                    }}
                  />
                ))}
              </g>
            ))}
            {routes.map((route) => (
              <defs key={route.id}>
                <linearGradient id={`gradient-${route.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="from-blue-400" />
                  <stop offset="100%" className="to-purple-600" />
                </linearGradient>
              </defs>
            ))}
          </svg>

          {/* City Nodes */}
          {routes.map((route) => (
            <motion.div
              key={route.id}
              className="absolute cursor-pointer"
              style={{
                left: `${route.coordinates.x}px`,
                top: `${route.coordinates.y}px`
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoveredRoute(route.id)}
              onMouseLeave={() => setHoveredRoute(null)}
              onClick={() => setSelectedRoute(route.id)}
            >
              {/* City Node Container */}
              <div className="relative">
                {/* Outer Rings */}
                <div className="absolute inset-0 w-16 h-16">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin-slow" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 animate-spin-slow-reverse" />
                </div>
                
                {/* Inner Circle */}
                <div className="relative w-16 h-16 rounded-full bg-black flex items-center justify-center">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    {route.from[0]}
                  </span>
                </div>

                {/* Status Indicator */}
                {route.status === 'construction' && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse" />
                )}

                {/* Hover Effect */}
                {hoveredRoute === route.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl"
                  />
                )}
              </div>

              {/* City Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredRoute === route.id ? 1 : 0,
                  y: hoveredRoute === route.id ? 0 : 10
                }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span className="text-sm font-semibold text-white bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  {route.from}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Route Details Modal */}
        <AnimatePresence>
          {selectedRoute !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedRoute(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl w-full relative border border-white/10"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative h-[300px] rounded-xl overflow-hidden group">
                    <Image
                      src={routes[selectedRoute - 1].image}
                      alt={`${routes[selectedRoute - 1].from} to ${routes[selectedRoute - 1].to}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                      {routes[selectedRoute - 1].from} → {routes[selectedRoute - 1].to}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {routes[selectedRoute - 1].description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-gray-400">Duration</p>
                        <p className="text-xl font-semibold">{routes[selectedRoute - 1].distance}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-gray-400">Price</p>
                        <p className="text-xl font-semibold">{routes[selectedRoute - 1].price}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold shadow-lg shadow-blue-500/20"
                    >
                      Book Journey
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HyperloopMap; 