'use client';

import { useState, useEffect } from 'react';
import Blog from '@/components/features/Blog';
import Navigation from '@/components/Navigation';
import Loading from '@/components/ui/loading';

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for blog content
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
      <Blog />
    </div>
  );
} 