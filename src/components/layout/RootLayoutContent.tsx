"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? "flex-1 flex flex-col overflow-hidden h-screen" : "flex-1"}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}

