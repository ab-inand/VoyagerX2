'use client';

import { useState, useEffect } from 'react';
import RewardsProgram from '@/components/features/RewardsProgram';
import Navigation from '@/components/Navigation';
import Loading from '@/components/ui/loading';

export default function RewardsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for rewards content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <RewardsProgram />
    </div>
  );
} 