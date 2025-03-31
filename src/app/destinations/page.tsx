'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import InteractiveGlobe from '@/components/3d/InteractiveGlobe';
import Loading from '@/components/ui/loading';
import Image from 'next/image';
import { FiSearch, FiMapPin, FiClock, FiCalendar, FiStar } from 'react-icons/fi';
import Navigation from '@/components/Navigation';

interface Destination {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  features: string[];
  location: {
    lat: number;
    lng: number;
  };
  category: string;
  duration: string;
  bestTimeToVisit: string;
  tags: string[];
  featured: boolean;
}

const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    description: 'Experience the magic of the City of Light with our exclusive VIP package. From the iconic Eiffel Tower to the world-renowned Louvre Museum, immerse yourself in French culture and luxury.',
    price: 'From $2,499',
    image: '/destinations/paris/main.jpg',
    rating: 4.8,
    features: ['Eiffel Tower VIP Access', 'Louvre Museum Tour', 'Seine River Cruise', 'Michelin Star Dining'],
    location: { lat: 48.8566, lng: 2.3522 },
    category: 'Europe',
    duration: '7 Days',
    bestTimeToVisit: 'April to October',
    tags: ['Culture', 'Romance', 'Art', 'Food'],
    featured: true
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    description: 'Immerse yourself in the perfect blend of tradition and future. From ancient temples to cutting-edge technology, Tokyo offers an unforgettable journey through time.',
    price: 'From $2,899',
    image: '/destinations/tokyo/main.jpg',
    rating: 4.9,
    features: ['Robot Restaurant VIP', 'Mount Fuji Tour', 'Sushi Making Class', 'Bullet Train Experience'],
    location: { lat: 35.6762, lng: 139.6503 },
    category: 'Asia',
    duration: '8 Days',
    bestTimeToVisit: 'March to May',
    tags: ['Technology', 'Culture', 'Food', 'Adventure'],
    featured: true
  },
  {
    id: 'dubai',
    name: 'Dubai',
    description: 'Discover luxury and innovation in the city of the future. Experience the perfect blend of traditional Arabian hospitality and modern extravagance.',
    price: 'From $3,299',
    image: '/destinations/dubai/main.jpg',
    rating: 4.7,
    features: ['Burj Khalifa Access', 'Desert Safari', 'Yacht Experience', 'Gold Souk Tour'],
    location: { lat: 25.2048, lng: 55.2708 },
    category: 'Middle East',
    duration: '6 Days',
    bestTimeToVisit: 'November to March',
    tags: ['Luxury', 'Adventure', 'Shopping', 'Culture'],
    featured: false
  },
  {
    id: 'bali',
    name: 'Bali',
    description: 'Escape to paradise with our exclusive Bali package. Experience pristine beaches, ancient temples, and world-class wellness retreats.',
    price: 'From $1,999',
    image: '/destinations/bali/main.jpg',
    rating: 4.9,
    features: ['Ubud Temple Tour', 'Beachfront Villa', 'Spa Experience', 'Rice Terrace Visit'],
    location: { lat: -8.3405, lng: 115.0920 },
    category: 'Southeast Asia',
    duration: '9 Days',
    bestTimeToVisit: 'April to October',
    tags: ['Beach', 'Wellness', 'Culture', 'Nature'],
    featured: true
  },
  {
    id: 'newyork',
    name: 'New York',
    description: 'The city that never sleeps awaits you. Experience the energy of NYC with exclusive access to Broadway shows and iconic landmarks.',
    price: 'From $2,199',
    image: '/destinations/newyork/main.jpg',
    rating: 4.8,
    features: ['Broadway Show', 'Central Park Tour', 'Statue of Liberty', 'Times Square Experience'],
    location: { lat: 40.7128, lng: -74.0060 },
    category: 'North America',
    duration: '5 Days',
    bestTimeToVisit: 'April to June',
    tags: ['Culture', 'Entertainment', 'Shopping', 'Food'],
    featured: false
  },
  {
    id: 'sydney',
    name: 'Sydney',
    description: 'Discover the perfect blend of urban sophistication and natural beauty in Australia\'s most iconic city.',
    price: 'From $2,799',
    image: '/destinations/sydney/main.jpg',
    rating: 4.7,
    features: ['Opera House Tour', 'Harbor Bridge Climb', 'Bondi Beach', 'Blue Mountains'],
    location: { lat: -33.8688, lng: 151.2093 },
    category: 'Oceania',
    duration: '7 Days',
    bestTimeToVisit: 'September to November',
    tags: ['Nature', 'Culture', 'Adventure', 'Beach'],
    featured: true
  }
];

const allTags = Array.from(new Set(destinations.flatMap(d => d.tags)));

export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showVR, setShowVR] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('rating');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const categories = ['all', ...Array.from(new Set(destinations.map(d => d.category)))];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredDestinations = destinations
    .filter(dest => 
      (selectedCategory === 'all' || dest.category === selectedCategory) &&
      (searchQuery === '' || 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.every(tag => dest.tags.includes(tag)))
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      }
      return b.rating - a.rating;
    });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      {/* Hero Section with Parallax */}
      <div ref={containerRef} className="h-[80vh] relative overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <InteractiveGlobe />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-6 gradient-text">Explore Our Destinations</h1>
            <p className="text-2xl text-gray-300 mb-8">Discover the world's most amazing places</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center gap-4"
            >
              <button className="px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                Start Exploring
              </button>
              <button className="px-8 py-3 border border-white rounded-full hover:bg-white/10 transition-colors">
                View All Destinations
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
          <div className="w-full md:w-1/3 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full bg-white/10 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="bg-white/10 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              className="bg-white/10 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onClick={() => setSelectedDestination(destination)}
                onVRClick={() => setShowVR(true)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Destination Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDestination(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-[300px]">
                <Image
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  fill
                  className="object-cover rounded-t-2xl"
                />
                <button
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedDestination(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{selectedDestination.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDestination.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">{selectedDestination.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-blue-400" />
                    <span>{selectedDestination.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-blue-400" />
                    <span>{selectedDestination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-blue-400" />
                    <span>Best: {selectedDestination.bestTimeToVisit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiStar className="text-blue-400" />
                    <span>{selectedDestination.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-400">{selectedDestination.price}</span>
                  <button
                    className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setSelectedDestination(null);
                      setShowVR(true);
                    }}
                  >
                    Start Virtual Tour
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DestinationCard({ destination, onClick, onVRClick }: {
  destination: Destination;
  onClick: () => void;
  onVRClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={destination.featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-4 right-4 bg-blue-500 px-3 py-1 rounded-full text-sm">
          {destination.category}
        </div>
        <button
          className="absolute top-4 left-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onVRClick();
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{destination.name}</h3>
          <span className="text-sm bg-blue-500 px-2 py-1 rounded-full">
            ★ {destination.rating}
          </span>
        </div>
        <p className="text-gray-300 mb-3 line-clamp-2 text-sm">{destination.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {destination.tags.map(tag => (
            <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-blue-400">{destination.price}</span>
          <button
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onVRClick();
            }}
          >
            Virtual Tour
          </button>
        </div>
      </div>
    </motion.div>
  );
} 