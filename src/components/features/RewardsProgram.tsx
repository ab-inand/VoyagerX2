'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
}

interface Tier {
  name: string;
  points: number;
  benefits: string[];
  color: string;
}

const tiers: Tier[] = [
  {
    name: 'Explorer',
    points: 0,
    benefits: ['Basic travel tips', 'Email newsletter'],
    color: 'from-gray-500 to-gray-600'
  },
  {
    name: 'Adventurer',
    points: 1000,
    benefits: ['Priority booking', '5% off all trips', 'Exclusive travel guides'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Voyager',
    points: 5000,
    benefits: ['VIP airport lounge access', '10% off all trips', 'Personal travel concierge'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Elite',
    points: 10000,
    benefits: ['Private jet upgrades', '15% off all trips', 'Luxury hotel upgrades'],
    color: 'from-yellow-500 to-yellow-600'
  }
];

const rewards: Reward[] = [
  {
    id: '1',
    title: 'Free Airport Transfer',
    description: 'Complimentary airport transfer for your next trip',
    points: 500,
    image: '/rewards/transfer.jpg'
  },
  {
    id: '2',
    title: 'Hotel Upgrade',
    description: 'Upgrade to a suite on your next stay',
    points: 1000,
    image: '/rewards/hotel.jpg'
  },
  {
    id: '3',
    title: 'Exclusive Tour',
    description: 'Private guided tour of any destination',
    points: 2000,
    image: '/rewards/tour.jpg'
  },
  {
    id: '4',
    title: 'Flight Upgrade',
    description: 'Upgrade to business class on your next flight',
    points: 3000,
    image: '/rewards/flight.jpg'
  }
];

export default function RewardsProgram() {
  const [selectedTab, setSelectedTab] = useState<'tiers' | 'rewards'>('tiers');
  const [userPoints, setUserPoints] = useState(2500); // Example points

  const currentTier = tiers.find(tier => userPoints >= tier.points) || tiers[0];
  const nextTier = tiers.find(tier => tier.points > userPoints) || tiers[tiers.length - 1];
  const progress = ((userPoints - currentTier.points) / (nextTier.points - currentTier.points)) * 100;

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">VoyageX Rewards</h1>
          <p className="text-xl text-gray-300">
            Earn points on every journey and unlock exclusive benefits
          </p>
        </div>

        {/* Points Display */}
        <div className="glass rounded-2xl p-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Points</h2>
              <p className="text-4xl font-bold text-blue-400">{userPoints}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Current Tier</p>
              <p className="text-2xl font-bold">{currentTier.name}</p>
            </div>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${currentTier.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {nextTier.points - userPoints} points until {nextTier.name}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full ${
              selectedTab === 'tiers'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                : 'bg-white/10'
            }`}
            onClick={() => setSelectedTab('tiers')}
          >
            Membership Tiers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full ${
              selectedTab === 'rewards'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                : 'bg-white/10'
            }`}
            onClick={() => setSelectedTab('rewards')}
          >
            Available Rewards
          </motion.button>
        </div>

        {/* Content */}
        {selectedTab === 'tiers' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                whileHover={{ scale: 1.02 }}
                className={`glass rounded-xl p-6 ${
                  tier.name === currentTier.name ? 'border-2 border-blue-500' : ''
                }`}
              >
                <h3 className="text-xl font-bold mb-4">{tier.name}</h3>
                <p className="text-2xl font-bold text-blue-400 mb-4">{tier.points} pts</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <motion.div
                key={reward.id}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                  <p className="text-gray-300 mb-4">{reward.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">{reward.points} pts</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
                      disabled={userPoints < reward.points}
                    >
                      Redeem
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 