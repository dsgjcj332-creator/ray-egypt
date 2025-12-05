
"use client";

import React from 'react';
import SystemsHub from '@/components/systems/SystemsHub';
import { useRouter } from 'next/navigation';

export default function SystemsPage() {
  const router = useRouter();

  const handleSystemSelect = (systemId: string) => {
    // Navigate to the system's informational page
    router.push(`/systems/${systemId}`);
  };

  return (
    <SystemsHub 
      onSystemSelect={handleSystemSelect} 
      onBackToMarketplace={() => router.push('/')} 
    />
  );
}
