'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/ui/Footer";
import BackToEarth from "@/components/ui/BackToEarth";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <main className="flex-grow">
        {children}
      </main>
      <div className="relative py-16">
        {isHomePage && <BackToEarth />}
      </div>
      <Footer />
    </>
  );
} 