'use client';

import { useState, useEffect } from 'react';
import Contact from '@/components/features/Contact';
import Navigation from '@/components/Navigation';
import Loading from '@/components/ui/loading';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for contact content
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
      <Contact />
    </div>
  );
} 