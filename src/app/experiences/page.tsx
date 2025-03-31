'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Loading from '@/components/ui/loading';

interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'vr' | 'ar' | 'interactive';
  price: string;
  duration: string;
  features: string[];
}

const experiences: Experience[] = [
  {
    id: 'paris-vr',
    title: 'Virtual Paris Tour',
    description: 'Walk through the streets of Paris and explore iconic landmarks in stunning VR.',
    image: '/experiences/paris-vr.jpg',
    category: 'vr',
    price: '$49',
    duration: '2 hours',
    features: [
      'Eiffel Tower VR Experience',
      'Notre-Dame Cathedral Tour',
      'Louvre Museum Highlights',
      'Seine River Walk'
    ]
  },
  {
    id: 'tokyo-ar',
    title: 'Tokyo AR Guide',
    description: 'Navigate Tokyo with AR overlays showing historical facts and hidden gems.',
    image: '/experiences/tokyo-ar.jpg',
    category: 'ar',
    price: '$39',
    duration: 'Unlimited',
    features: [
      'Real-time Translation',
      'Restaurant Reviews',
      'Hidden Spots Guide',
      'Metro Navigation'
    ]
  },
  {
    id: 'safari-interactive',
    title: 'Interactive Safari',
    description: 'Experience an African safari with interactive 360° videos and real-time wildlife tracking.',
    image: '/experiences/safari.jpg',
    category: 'interactive',
    price: '$69',
    duration: '3 hours',
    features: [
      'Live Wildlife Tracking',
      '360° Video Tours',
      'Expert Guide Commentary',
      'Photo Opportunities'
    ]
  }
];

export default function ExperiencesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vr' | 'ar' | 'interactive'>('all');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredExperiences = selectedCategory === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === selectedCategory);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Header */}
      <div className="pt-20 pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 gradient-text"
        >
          Immersive Experiences
        </motion.h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover our collection of virtual, augmented, and interactive experiences that bring destinations to life.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-12">
        {['all', 'vr', 'ar', 'interactive'].map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                : 'bg-white/10'
            }`}
            onClick={() => setSelectedCategory(category as typeof selectedCategory)}
          >
            {category.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience) => (
            <motion.div
              key={experience.id}
              layoutId={experience.id}
              className="glass rounded-xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedExperience(experience)}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-sm">
                  {experience.category.toUpperCase()}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
                <p className="text-gray-300 mb-4">{experience.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-400">{experience.price}</span>
                  <span className="text-gray-400">{experience.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Modal */}
      {selectedExperience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedExperience(null)}
        >
          <motion.div
            layoutId={selectedExperience.id}
            className="bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={selectedExperience.image}
                alt={selectedExperience.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{selectedExperience.title}</h2>
              <p className="text-gray-300 mb-6">{selectedExperience.description}</p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Features</h4>
                  <ul className="space-y-2">
                    {selectedExperience.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="glass p-6 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400 mb-2">
                      {selectedExperience.price}
                    </div>
                    <div className="text-gray-300 mb-4">
                      Duration: {selectedExperience.duration}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 