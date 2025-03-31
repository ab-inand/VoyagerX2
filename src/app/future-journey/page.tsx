'use client';

import HyperloopMap from '@/components/features/HyperloopMap';
import SpaceTourism from '@/components/features/SpaceTourism';
import UnderwaterHotel from '@/components/features/UnderwaterHotel';
import FutureTravelerQuiz from '@/components/features/FutureTravelerQuiz';
import Web3Newsletter from '@/components/features/Web3Newsletter';
import Navigation from '@/components/Navigation';

import { useRef } from 'react';

export default function FutureJourneyPage() {
  const spaceTourismRef = useRef<HTMLDivElement>(null);

  const scrollToSpaceTourism = () => {
    spaceTourismRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center px-4 perspective-1000">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000"></div>
            <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-2000"></div>
          </div>

          {/* Floating elements */}
          <div className="absolute inset-0">
            <div className="absolute w-4 h-4 bg-white/20 rounded-full top-1/4 left-1/4 animate-float"></div>
            <div className="absolute w-6 h-6 bg-white/20 rounded-full top-1/3 right-1/3 animate-float-delayed"></div>
            <div className="absolute w-5 h-5 bg-white/20 rounded-full bottom-1/4 left-1/3 animate-float-more-delayed"></div>
          </div>

          {/* Main content with 3D effect */}
          <div className="max-w-4xl mx-auto relative z-10 transform-gpu hover:scale-105 transition-transform duration-500">
            <div className="backdrop-blur-lg bg-black/30 p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 transform-gpu hover:translate-y-[-10px] transition-transform duration-500">
                Futuristic Travel Packages
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed transform-gpu hover:translate-y-[-5px] transition-transform duration-500 mb-4">
                Experience the future of travel with our cutting-edge packages. From orbital hotels to underwater luxury, discover what's next in travel.
              </p>
              <div className="mt-6 space-y-4">
                <div className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-lg font-semibold">
                  Pre-Booking Now Open for 2030 Journeys
                </div>
                <p className="text-blue-400 font-medium">
                  Early Bird Discount: 30% Off All Future Travel Packages
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button 
            onClick={scrollToSpaceTourism}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full p-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto animate-scroll"></div>
            </div>
          </button>
        </section>

        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float-more-delayed {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-25px); }
          }
          @keyframes scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 7s ease-in-out infinite;
          }
          .animate-float-more-delayed {
            animation: float-more-delayed 8s ease-in-out infinite;
          }
          .animate-scroll {
            animation: scroll 1.5s ease-in-out infinite;
          }
        `}</style>

        <div ref={spaceTourismRef}>
          <SpaceTourism />
        </div>
        
        <HyperloopMap />
        <UnderwaterHotel />
        <FutureTravelerQuiz />
        <Web3Newsletter />
      </main>
    </div>
  );
}