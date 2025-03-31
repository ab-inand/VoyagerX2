'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const packages = [
  {
    id: 'moon',
    title: 'Lunar Base Adventure',
    description: 'Experience life on the Moon with our state-of-the-art lunar base. Walk on the lunar surface and witness Earthrise from the Moon.',
    icon: '🌕',
    color: 'from-gray-400 to-slate-600',
    price: 'Starting from $1,500,000',
    duration: '7-14 days',
    model: 'LunarBase'
  },
  {
    id: 'mars',
    title: 'Mars Colony Expedition',
    description: 'Be among the first to visit the Red Planet. Experience Martian landscapes, dust storms, and the thrill of interplanetary travel.',
    icon: '🔴',
    color: 'from-red-400 to-orange-600',
    price: 'Starting from $5,000,000',
    duration: '2-3 years',
    model: 'MarsColony'
  }
];

const PackageCard = ({ package: pkg, isHovered, onHover }: { package: typeof packages[0], isHovered: boolean, onHover: (hovered: boolean) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${
        isHovered ? 'ring-2 ring-white/50' : 'hover:ring-2 hover:ring-white/30'
      }`}
    >
      {/* Holographic Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-20`} />
      
      {/* Content */}
      <div className="relative p-6 text-white">
        <div className="text-4xl mb-4">{pkg.icon}</div>
        <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
        <p className="text-gray-300 mb-4">{pkg.description}</p>
        
        {/* Details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Duration</span>
            <span className="font-semibold">{pkg.duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price</span>
            <span className="font-semibold text-blue-400">{pkg.price}</span>
          </div>
        </div>

        {/* 3D Preview */}
        {isHovered && (
          <div className="mt-4 h-48">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minDistance={3}
                maxDistance={10}
                enableDamping
                dampingFactor={0.05}
              />
              {/* Add your 3D models here based on pkg.model */}
              <mesh>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshStandardMaterial
                  color="#4a90e2"
                  metalness={0.8}
                  roughness={0.2}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </Canvas>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const FuturisticTravelPackages = () => {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

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
          
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isHovered={hoveredPackage === pkg.id}
              onHover={(hovered) => setHoveredPackage(hovered ? pkg.id : null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FuturisticTravelPackages; 