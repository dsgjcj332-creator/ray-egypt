
"use client";

import React from 'react';
import Header from '@/components/marketplace/layout/Header';
import Footer from '@/components/marketplace/layout/Footer';
import AboutView from '@/components/marketplace/views/static/AboutView';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main>
        <AboutView />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
